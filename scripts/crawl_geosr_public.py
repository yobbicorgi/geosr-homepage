#!/usr/bin/env python3
"""Respectful, resumable inventory of public first-party GeoSR website pages.

Does not fetch robots-disallowed paths, third-party URLs, or pages requiring auth.
Run from the repository root: python scripts/crawl_geosr_public.py
"""
from __future__ import annotations
import csv, hashlib, html, json, mimetypes, os, re, sys, time
from collections import Counter, defaultdict, deque
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse, urlunparse, parse_qsl, urlencode, unquote, quote
from urllib.robotparser import RobotFileParser
from urllib.request import Request, urlopen, build_opener, HTTPRedirectHandler

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "source-migration"
ASSET_DIR = OUT / "assets"
UA = "GeoSRSourceMigrationInventory/1.0 (public-site research; rate-limited)"
HOSTS = {"www.geosr.com", "geosr.com"}
BASE = "https://www.geosr.com/"
DELAY = 1.25
# Queue-drain mode: no URL-count ceiling. Seen URLs are deduplicated; only an actually
# unbounded server-generated URL sequence can prolong the crawl and will be documented.
MAX_ASSET_BYTES = 20 * 1024 * 1024
MAX_TOTAL_ASSET_BYTES = 250 * 1024 * 1024
BOT = "GeoSRSourceMigrationInventory"
BLOCKED_PREFIXES = ("/upload/", "/site/")
PAGE_EXT = {"", ".asp", ".aspx", ".php", ".html", ".htm"}
ASSET_EXT = {".pdf", ".hwp", ".hwpx", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".zip"}
SCOPE = re.compile(r"^/(?:$|index\.(?:asp|html?)$|sub/|en(?:/|$))", re.I)
SKIP_QUERY_KEYS = {"utm_source", "utm_medium", "utm_campaign", "fbclid", "gclid"}

def utcnow(): return datetime.now(timezone.utc).isoformat(timespec="seconds")
def norm_url(url):
    p = urlparse(url)
    scheme = "https" if p.scheme.lower() in {"http", "https"} else p.scheme
    host = p.netloc.lower().split(":")[0]
    query = [(k, v) for k, v in parse_qsl(p.query, keep_blank_values=True) if k.lower() not in SKIP_QUERY_KEYS]
    # urllib requires non-ASCII URL bytes to be percent-encoded. In particular, public
    # Korean attachment names otherwise fail locally before an HTTP request is sent.
    path = quote(p.path or "/", safe="/%:@!$&'()*+,;=-._~")
    return urlunparse((scheme, host, path, "", urlencode(query, doseq=True), ""))
def in_scope(url):
    p = urlparse(url)
    return p.hostname in HOSTS and bool(SCOPE.match(p.path or "/"))
def robots_blocked(url):
    return urlparse(url).path.lower().startswith(BLOCKED_PREFIXES)
def category(url):
    parts = [x for x in urlparse(url).path.split("/") if x]
    if parts and parts[0].lower() == "en": parts = parts[1:]
    return parts[1] if len(parts) > 1 and parts[0].lower() == "sub" else "home"
def sha256(data): return hashlib.sha256(data).hexdigest()

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links=[]; self.images=[]; self.forms=[]; self.text=[]; self.title=[]
        self._in_title=False; self._skip=0; self._form=None; self.lang=""
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag.lower()=="html": self.lang=a.get("lang","")
        if tag.lower()=="title": self._in_title=True
        if tag.lower() in {"script","style","noscript"}: self._skip+=1
        if tag.lower()=="a" and a.get("href"):
            self.links.append({"href":a["href"],"text":""})
            self._last_link=self.links[-1]
        elif tag.lower()=="img":
            for key in ("src","data-src","data-original","srcset"):
                if a.get(key): self.images.append({"attribute":key,"value":a[key],"alt":a.get("alt","")})
        if tag.lower()=="form": self._form={"action":a.get("action",""),"method":a.get("method","get")}; self.forms.append(self._form)
        if tag.lower() in {"br","p","div","li","tr","h1","h2","h3","h4","td","th"}: self.text.append("\n")
    def handle_endtag(self, tag):
        if tag.lower()=="title": self._in_title=False
        if tag.lower() in {"script","style","noscript"}: self._skip=max(0,self._skip-1)
        if tag.lower()=="a": self._last_link=None
        if tag.lower()=="form": self._form=None
        if tag.lower() in {"p","div","li","tr","h1","h2","h3","h4","td","th"}: self.text.append("\n")
    def handle_data(self, data):
        if self._in_title: self.title.append(data)
        if self._skip==0 and data.strip():
            self.text.append(data)
            if getattr(self,"_last_link",None): self._last_link["text"] += data

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl): return None

def fetch_once(url, timeout=30):
    request=Request(url,headers={"User-Agent":UA,"Accept":"text/html,application/xhtml+xml,application/xml,image/avif,image/webp,*/*;q=0.8"})
    opener=build_opener(NoRedirect)
    try:
        with opener.open(request,timeout=timeout) as r: return r.status,r.geturl(),r.headers,r.read()
    except HTTPError as e:
        if 300 <= e.code < 400: return e.code,e.geturl(),e.headers,b""
        raise

def fetch(url, timeout=30):
    current=url
    for _ in range(6):
        status,final,headers,data=fetch_once(current,timeout)
        if status not in {301,302,303,307,308}: return status,final,headers,data
        target=urljoin(current,headers.get("Location", ""))
        if not target or urlparse(target).hostname not in HOSTS or robots_blocked(target):
            raise RuntimeError(f"redirect not followed by policy: {current} -> {target}")
        current=target
    raise RuntimeError(f"redirect limit exceeded: {url}")

def main():
    OUT.mkdir(parents=True,exist_ok=True); ASSET_DIR.mkdir(parents=True,exist_ok=True)
    logpath=OUT/"request-log.jsonl"; pagespath=OUT/"pages.jsonl"; assetspath=OUT/"assets.jsonl"
    robots={}; log=[]; pages=[]; assets=[]; queue=deque([BASE])
    # On a follow-up run, resume from the previously committed local inventory without
    # re-requesting captured pages or assets. The current run remains in-memory until done.
    for path, target in ((pagespath,pages),(assetspath,assets),(logpath,log)):
        if path.exists():
            for line in path.read_text(encoding="utf-8").splitlines():
                try: target.append(json.loads(line))
                except Exception: pass
    # Canonicalize captured references when resuming so percent-encoded Korean URLs
    # deduplicate correctly. Failed safe asset downloads are retried; robots-denied
    # records and confirmed 404s remain closed and are never retried.
    for page in pages:
        if page.get("url"): page["url"]=norm_url(page["url"])
        if page.get("final_url"): page["final_url"]=norm_url(page["final_url"])
        if not page.get("source_language"):
            path=urlparse(page.get("final_url") or page.get("url","")).path.lower()
            page["source_language"]="en" if path=="/en" or path.startswith("/en/") else "ko"
        for link in page.get("links",[]):
            if link.get("url"): link["url"]=norm_url(link["url"])
        for image in page.get("images",[]):
            if image.get("url"): image["url"]=norm_url(image["url"])
    for asset in assets:
        if asset.get("url"): asset["url"]=norm_url(asset["url"])
        if asset.get("linked_from"): asset["linked_from"]=norm_url(asset["linked_from"])
    seen={norm_url(x.get("url","")) for x in pages if x.get("url")}
    seen.update(norm_url(a.get("url","")) for a in assets if a.get("url") and not (a.get("status")=="not_downloaded" and a.get("status_code")!=200))
    for page in pages:
        for link in page.get("links",[]):
            u=link.get("url","")
            if in_scope(u) or Path(urlparse(u).path).suffix.lower() in ASSET_EXT: queue.append(u)
        for image in page.get("images",[]):
            u=image.get("url","")
            if Path(urlparse(u).path).suffix.lower() in ASSET_EXT: queue.append(u)
    downloaded_total=sum((Path(ROOT/a["local_path"]).stat().st_size for a in assets if a.get("local_path") and (ROOT/a["local_path"]).exists()),0)
    last_req=0.0
    # Load robots over HTTPS without attempting any blocked path.
    try:
        _,_,_, rb=fetch("https://www.geosr.com/robots.txt")
        rp=RobotFileParser(); rp.set_url("https://www.geosr.com/robots.txt"); rp.parse(rb.decode("utf-8","replace").splitlines()); robots["www.geosr.com"]=rp
    except Exception as e:
        print("ROBOTS_ERROR",repr(e),file=sys.stderr); return 2
    def allowed(url):
        p=urlparse(url); rp=robots.get(p.hostname)
        return not robots_blocked(url) and (rp is None or rp.can_fetch(BOT,url))
    def req(url):
        nonlocal last_req
        wait=DELAY-(time.monotonic()-last_req)
        if wait>0: time.sleep(wait)
        last_req=time.monotonic()
        try:
            status,final,headers,data=fetch(url)
            log.append({"requested_url":url,"final_url":final,"status":status,"bytes":len(data),"retrieved_at":utcnow()})
            return status,final,headers,data,None
        except HTTPError as e:
            log.append({"requested_url":url,"final_url":e.geturl(),"status":e.code,"bytes":0,"retrieved_at":utcnow(),"error":str(e.reason)})
            return e.code,e.geturl(),e.headers,b"",str(e.reason)
        except Exception as e:
            log.append({"requested_url":url,"status":None,"bytes":0,"retrieved_at":utcnow(),"error":f"{type(e).__name__}: {e}"})
            return None,url,{},b"",f"{type(e).__name__}: {e}"
    # URLs from site links are authoritative; standard sitemap probes are used only if not linked.
    try:
        _,_,_,rb=fetch("https://www.geosr.com/robots.txt")
        for line in rb.decode("utf-8","replace").splitlines():
            if line.lower().startswith("sitemap:"): queue.append(line.split(":",1)[1].strip())
    except Exception: pass
    queue.extend(["https://www.geosr.com/sitemap.xml","https://www.geosr.com/sitemap_index.xml"])
    while queue:
        url=norm_url(queue.popleft())
        if url in seen: continue
        seen.add(url)
        p=urlparse(url)
        if p.hostname not in HOSTS: continue
        if robots_blocked(url) or not allowed(url):
            assets.append({"url":url,"kind":"robots_disallowed","status":"not_fetched","retrieved_at":utcnow()}); continue
        if p.path.lower().endswith(".xml") and "sitemap" in p.path.lower():
            status,final,hdr,data,err=req(url)
            if status==200:
                for loc in re.findall(rb"<loc[^>]*>(.*?)</loc>",data,re.I|re.S):
                    child=html.unescape(loc.decode("utf-8","replace").strip())
                    if urlparse(child).hostname in HOSTS: queue.append(child)
            else: assets.append({"url":url,"kind":"sitemap","status":status,"error":err,"retrieved_at":utcnow()})
            continue
        ext=Path(p.path).suffix.lower()
        if ext in ASSET_EXT:
            item={"url":url,"category":category(url),"extension":ext,"status":"not_downloaded","retrieved_at":utcnow()}
            # CV templates may invite submission of sensitive personal data; inventory
            # the link but do not copy the template into the migration package.
            if ext in {".hwp",".hwpx"} and re.search(r"이력서|resume|cv|application",unquote(p.path),re.I):
                item.update({"status":"requires_human_privacy_review","reason":"Publicly linked CV/resume template; not downloaded because it can collect personal data."})
            # Only linked first-party materials on allowed paths; skip credential scans and person images.
            elif ext in {".jpg",".jpeg",".png",".gif",".webp",".svg"} and re.search(r"cert|license|patent|person|member|staff|profile|sign",p.path,re.I):
                item["status"]="requires_human_rights_privacy_review"
            else:
                status,final,hdr,data,err=req(url)
                item.update({"status_code":status,"final_url":final,"content_type":hdr.get("Content-Type"),"size_bytes":len(data) if data else None})
                if status==200 and data and len(data)<=MAX_ASSET_BYTES and downloaded_total+len(data)<=MAX_TOTAL_ASSET_BYTES:
                    # Preserve source basename; add stable URL digest only on collision.
                    name=unquote(Path(urlparse(final).path).name) or (sha256(final.encode())[:12]+ext)
                    dst=ASSET_DIR/name
                    if dst.exists() and sha256(dst.read_bytes())!=sha256(data): dst=ASSET_DIR/(Path(name).stem+"-"+sha256(final.encode())[:8]+Path(name).suffix)
                    dst.write_bytes(data); downloaded_total+=len(data)
                    item.update({"status":"downloaded","local_path":str(dst.relative_to(ROOT)).replace("\\","/"),"sha256":sha256(data)})
                elif status==200 and data: item["status"]="over_download_limit"
            assets.append(item); continue
        if not in_scope(url): continue
        status,final,hdr,data,err=req(url)
        rec={"url":url,"final_url":final,"category":category(url),"status":status,"retrieved_at":utcnow()}
        if status!=200 or not data:
            rec["error"]=err; pages.append(rec); continue
        ctype=(hdr.get("Content-Type") or "").lower()
        if "html" not in ctype and not data.lstrip().startswith((b"<",b"<!")):
            rec.update({"status":"non_html","content_type":ctype}); pages.append(rec); continue
        charset="utf-8"
        m=re.search(r"charset=([\w\-]+)",ctype,re.I)
        if m: charset=m.group(1)
        raw=data.decode(charset,"replace")
        parser=PageParser()
        try: parser.feed(raw)
        except Exception as e: rec["parse_warning"]=str(e)
        title=html.unescape(" ".join("".join(parser.title).split()))
        text="\n".join(line.strip() for line in "".join(parser.text).splitlines() if line.strip())
        text=html.unescape(text)
        source_language=(parser.lang or ("en" if urlparse(final).path.lower()=="/en/" or urlparse(final).path.lower().startswith("/en/") else "ko")).split("-",1)[0].lower()
        links=[]
        for link in parser.links:
            absurl=norm_url(urljoin(final,html.unescape(link["href"])))
            links.append({"url":absurl,"text":html.unescape(" ".join(link["text"].split()))})
            if urlparse(absurl).hostname in HOSTS and (in_scope(absurl) or Path(urlparse(absurl).path).suffix.lower() in ASSET_EXT): queue.append(absurl)
            elif urlparse(absurl).hostname in HOSTS and robots_blocked(absurl): assets.append({"url":absurl,"kind":"robots_disallowed","status":"not_fetched","linked_from":url,"retrieved_at":utcnow()})
        imgs=[]
        for im in parser.images:
            val=html.unescape(im["value"])
            vals=val.split(",") if im["attribute"]=="srcset" else [val]
            for v in vals:
                # Only srcset has a trailing density/width descriptor
                # Plain src values legitimately contain spaces in Korean filenames
                rawsrc=v.strip().rsplit(" ",1)[0] if im["attribute"]=="srcset" else v.strip()
                if not rawsrc or rawsrc.startswith("data:"): continue
                absurl=norm_url(urljoin(final,rawsrc))
                imgs.append({"url":absurl,"alt":im["alt"],"attribute":im["attribute"]})
                if urlparse(absurl).hostname in HOSTS and Path(urlparse(absurl).path).suffix.lower() in ASSET_EXT: queue.append(absurl)
                elif urlparse(absurl).hostname not in HOSTS: assets.append({"url":absurl,"kind":"external_image_reference","status":"not_fetched","linked_from":url,"alt":im["alt"]})
        rec.update({"title":title,"source_language":source_language,"text_sha256":sha256(text.encode("utf-8")),"links":links,"images":imgs,"forms":parser.forms,"content_type":ctype})
        if source_language=="ko": rec["source_text_ko_preserved"]=text
        else: rec["source_text_original"]=text
        pages.append(rec)
        if len(pages)%25==0: print(f"pages={len(pages)} queue={len(queue)} assets={len(assets)}",flush=True)
    # Merge repeated URL references, preferring the strongest retrieval result while
    # retaining every page that referenced the item.
    asset_priority={"downloaded":7,"requires_human_rights_privacy_review":6,"requires_human_privacy_review":6,"over_download_limit":5,"404":4,"not_downloaded":3,"not_fetched":2}
    amap={}
    for a in assets:
        key=norm_url(a.get("url",""))
        if not key: continue
        a["url"]=key
        prev=amap.get(key)
        refs=set((prev or {}).get("linked_from_urls",[]))
        refs.update(x for x in ((prev or {}).get("linked_from"),a.get("linked_from")) if x)
        if prev and (asset_priority.get(a.get("status"),0)>asset_priority.get(prev.get("status"),0)):
            chosen=a
        else: chosen=prev or a
        if refs: chosen["linked_from_urls"]=sorted(refs)
        amap[key]=chosen
    assets=list(amap.values())
    # Persist exact source captures; current page text is public source material, not approved site copy.
    pages.sort(key=lambda x:x.get("url","")); assets.sort(key=lambda x:x.get("url",""))
    pagespath.write_text("".join(json.dumps(x,ensure_ascii=False)+"\n" for x in pages),encoding="utf-8")
    assetspath.write_text("".join(json.dumps(x,ensure_ascii=False)+"\n" for x in assets),encoding="utf-8")
    logpath.write_text("".join(json.dumps(x,ensure_ascii=False)+"\n" for x in log),encoding="utf-8")
    with (OUT/"inventory.csv").open("w",newline="",encoding="utf-8-sig") as f:
        w=csv.DictWriter(f,fieldnames=["url","final_url","category","source_language","title","status","retrieved_at","text_sha256"]); w.writeheader()
        for p in pages: w.writerow({k:p.get(k,"") for k in w.fieldnames})
    summary={"retrieved_at":utcnow(),"base":"https://www.geosr.com/","robots_respected":True,"requests":len(log),"unique_urls_visited":len(seen),"frontier_drained":len(queue)==0,"pages":len(pages),"page_statuses":dict(Counter(str(p.get("status")) for p in pages)),"categories":dict(Counter(p.get("category","unknown") for p in pages)),"asset_references":len(assets),"downloaded_assets":sum(a.get("status")=="downloaded" for a in assets),"robots_disallowed_refs":sum(a.get("kind")=="robots_disallowed" for a in assets),"downloaded_bytes":downloaded_total,"notes":["Source text is exact visible public page text after HTML decoding and whitespace normalization.","/upload/ and /site/ are not fetched because robots.txt disallows them.","No third-party resources were fetched.","Queue-drain mode has no arbitrary URL-count cap."]}
    summary["pages_jsonl"]="pages.jsonl"; summary["assets_jsonl"]="assets.jsonl"; summary["inventory_csv"]="inventory.csv"
    summary["pages_index"]=[{"url":p.get("url"),"final_url":p.get("final_url"),"category":p.get("category"),"source_language":p.get("source_language"),"title":p.get("title"),"status":p.get("status"),"retrieved_at":p.get("retrieved_at"),"text_sha256":p.get("text_sha256")} for p in pages]
    summary["assets_index"]=[{"url":a.get("url"),"kind":a.get("kind"),"status":a.get("status"),"local_path":a.get("local_path"),"sha256":a.get("sha256")} for a in assets]
    (OUT/"inventory.json").write_text(json.dumps(summary,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(f"crawl done: pages={summary['pages']} unique_urls={summary['unique_urls_visited']} assets={summary['asset_references']} frontier_drained={summary['frontier_drained']}")
    return 0
if __name__=="__main__": raise SystemExit(main())
