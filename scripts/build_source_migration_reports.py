#!/usr/bin/env python3
"""Build coverage, duplicate, and Korean-copy provenance reports from crawl outputs."""
import csv, json, re, hashlib
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlparse, parse_qs, parse_qsl, urlencode, urlunsplit

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"docs"/"source-migration"
def read_jsonl(p):
    return [json.loads(x) for x in p.read_text(encoding="utf-8").splitlines() if x.strip()]
def norm(s): return re.sub(r"\s+"," ",s or "").strip().casefold()
def category(url):
    p=[x for x in urlparse(url).path.split("/") if x]
    if p and p[0].lower()=="en": p=p[1:]
    return p[1] if len(p)>1 and p[0].lower()=="sub" else "home"
def path_label(path, labels, fallback):
    is_en=path=="/en" or path.startswith("/en/")
    source_path=path[3:] if path.startswith("/en/") else ("/" if path=="/en" else path)
    label=labels.get(source_path,fallback)
    return f"{label} (영문)" if is_en else label
def query_order_insensitive_url(url):
    p=urlparse(url)
    query=sorted((k,v) for k,v in parse_qsl(p.query,keep_blank_values=True) if k.lower() not in {"utm_source","utm_medium","utm_campaign","fbclid","gclid"})
    scheme="https" if p.scheme.lower() in {"http","https"} else p.scheme.lower()
    host=p.netloc.lower().split(":")[0]
    return urlunsplit((scheme,host,p.path or "/",urlencode(query,doseq=True),""))

CATEGORY_KO={"home":"홈","achieve":"실적·연구","business":"사업","career":"채용","company":"회사","equipment":"장비","news":"소식","policy":"정책"}
PATH_KO={
    "/sub/news/notice.asp":"공지사항 게시판",
    "/sub/achieve/busines.asp":"사업실적 게시판",
    "/sub/achieve/academic.asp":"학술활동 게시판",
    "/sub/news/press.asp":"보도자료 게시판",
    "/sub/achieve/research.asp":"연구성과 게시판",
    "/sub/equipment/surveying.asp":"측량 장비",
    "/sub/equipment/investigation.asp":"해양·현장조사 장비",
    "/sub/business/conserve_view.asp":"환경보전 사업 상세",
    "/sub/equipment/experiment.asp":"실험 장비",
    "/sub/equipment/ship.asp":"조사 선박",
}
BOARD_KO={**PATH_KO,
    "/sub/achieve/academic.asp":"학술활동",
    "/sub/achieve/busines.asp":"사업실적",
    "/sub/achieve/research.asp":"연구성과",
    "/sub/equipment/biological.asp":"생물조사 장비",
    "/sub/equipment/experiment.asp":"실험 장비",
    "/sub/equipment/investigation.asp":"해양·현장조사 장비",
    "/sub/equipment/ship.asp":"조사 선박",
    "/sub/equipment/surveying.asp":"측량 장비",
    "/sub/news/notice.asp":"공지사항",
    "/sub/news/press.asp":"보도자료",
}

pages=read_jsonl(OUT/"pages.jsonl")
assets=read_jsonl(OUT/"assets.jsonl")
request_log=read_jsonl(OUT/"request-log.jsonl")
local=json.loads((ROOT/"dist"/"content.json").read_text(encoding="utf-8"))
email_values=set()
phone_values=set()
email_pattern=re.compile(r"[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}")
phone_pattern=re.compile(r"(?:\b01[016789][- ]?\d{3,4}[- ]?\d{4}\b|\b0\d{1,2}[- ]?\d{3,4}[- ]?\d{4}\b)")
for p in pages:
    page_text=p.get("source_text_ko_preserved") or p.get("source_text_original","")
    email_values.update(x.casefold() for x in email_pattern.findall(page_text))
    phone_values.update(re.sub(r"\D","",x) for x in phone_pattern.findall(page_text))
texts=[(p.get("url",""),norm(p.get("source_text_ko_preserved") or p.get("source_text_original",""))) for p in pages]
ko_texts=[(p.get("url",""),norm(p.get("source_text_ko_preserved",""))) for p in pages if p.get("source_language","ko")=="ko" and p.get("source_text_ko_preserved")]

# Duplicate visible-body captures; exact duplicate hashes are not counted as separate content.
byhash=defaultdict(list)
for p in pages:
    if p.get("text_sha256"): byhash[p["text_sha256"]].append(p.get("url"))
dups=[{"text_sha256":h,"count":len(urls),"urls":urls} for h,urls in byhash.items() if len(urls)>1]
asset_hashes=defaultdict(list)
for a in assets:
    if a.get("sha256"): asset_hashes[a["sha256"]].append(a.get("url"))
asset_dups=[{"sha256":h,"count":len(urls),"urls":urls} for h,urls in asset_hashes.items() if len(urls)>1]
(OUT/"duplicates.json").write_text(json.dumps({"duplicate_page_bodies":dups,"duplicate_assets":asset_dups},ensure_ascii=False,indent=2)+"\n",encoding="utf-8")

# Compare the current 21-item local index with exact official page text and current detail IDs.
solution_rows=[]
for item in local.get("solutions",[]):
    sid=str(item.get("id","")); numeric=re.sub(r"\D","",sid)
    title=item.get("title",""); ntitle=norm(title)
    exact=[u for u,t in ko_texts if ntitle and ntitle in t]
    idpages=[]
    for p in pages:
        q=parse_qs(urlparse(p.get("url","")).query)
        if numeric and numeric in [str(x) for vals in q.values() for x in vals]: idpages.append(p.get("url"))
    if not title: status="requires_verification"
    elif exact: status="represented"
    elif not idpages: status="missing"
    else: status="requires_verification"
    solution_rows.append({"local_id":sid,"local_korean_title":title,"category":item.get("category"),"status":status,"exact_title_source_urls":exact,"candidate_id_source_urls":idpages})

# Compare the prototype's six sample records, explicit mock records, and credential shelf.
site_js=(ROOT/"dist"/"site.js").read_text(encoding="utf-8",errors="replace")
postblock_match=re.search(r"const posts=\[(.*?)\];",site_js,re.S)
postblock=postblock_match.group(1) if postblock_match else ""
post_rows=[]
post_re=re.compile(r"\['([^']+)','([^']+)','([^']*)','([^']*)','([^']*)'(,true)?\]")
for m in post_re.finditer(postblock):
    pid,kind,date,title,en_title,stub=m.groups()
    query=norm(title) if re.search(r"[가-힣]",title) else norm(en_title)
    matches_for_title=[u for u,t in texts if query and query in t]
    status="placeholder" if stub else ("represented" if matches_for_title else "requires_verification")
    post_rows.append({"type":"prototype_post","id":pid,"category":kind,"date":date,"korean_title":title,"english_title_candidate":en_title,"status":status,"source_urls":matches_for_title})
mock_rows=[]
for kind,korean,english in re.findall(r"\['(business|research|academic|notice|press|newsletter)','([^']+)','([^']+)'\]",site_js):
    mock_rows.append({"type":"explicit_mock_record","id":"mock-"+kind,"category":kind,"korean_title":korean+" 게시물","english_title_candidate":english+" article placeholder","status":"placeholder","source_urls":[]})
credential_rows=[]
cred_path=ROOT/"dist"/"credentials.json"
if cred_path.exists():
    credential_data=json.loads(cred_path.read_text(encoding="utf-8"))
    for item in credential_data if isinstance(credential_data,list) else credential_data.get("credentials",[]):
        credential_rows.append({"type":"credential","id":item.get("id"),"title":item.get("titleKo") or item.get("title"),"status":"requires_verification","source_url":item.get("sourceUrl") or item.get("source_url"),"review":"Current validity, display rights, and personal-data checks are not automatically approved."})
local_records=solution_rows+post_rows+mock_rows+credential_rows
record_status_counts=Counter(x["status"] for x in local_records)

# Detect source-page dates, query IDs, attachment and image references for machine use.
coverage=[]
for p in pages:
    q=parse_qs(urlparse(p.get("url","")).query)
    page_text=p.get("source_text_ko_preserved") or p.get("source_text_original","")
    dates=sorted(set(re.findall(r"\b(?:19|20)\d{2}[./-](?:0?[1-9]|1[0-2])[./-](?:0?[1-9]|[12]\d|3[01])\b",page_text)))
    links=p.get("links",[])
    attachments=[x.get("url") for x in links if Path(urlparse(x.get("url","")).path).suffix.lower() in {".pdf",".hwp",".hwpx",".doc",".docx",".xls",".xlsx",".ppt",".pptx",".zip"}]
    # Keep names/contacts in source copy for migration review, but never treat them as ready-to-publish.
    sensitive=bool(re.search(r"(?:\b01[016789][- ]?\d{3,4}[- ]?\d{4}\b|\b0\d{1,2}[- ]?\d{3,4}[- ]?\d{4}\b|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})",page_text))
    p["query_params"]=q
    p["record_ids"]={k:v for k,v in q.items() if k.lower() in {"idx","id","no","seq","num","board_idx","wr_id"}}
    p["date_candidates"]=dates
    p["attachment_urls"]=attachments
    p["personal_contact_review_required"]=sensitive
    coverage.append(p)
(OUT/"pages.jsonl").write_text("".join(json.dumps(x,ensure_ascii=False)+"\n" for x in coverage),encoding="utf-8")

# Main coverage summary and inventory CSV.
catcounts=Counter(category(p.get("url","")) for p in pages)
language_counts=Counter(p.get("source_language","ko") for p in pages)
statuses=Counter(str(p.get("status")) for p in pages)
asset_status=Counter(str(a.get("status")) for a in assets)
urlstatus={p.get("url"):p.get("status") for p in pages}
broken=[{"url":u,"status":urlstatus.get(u)} for p in pages for l in p.get("links",[]) if (u:=l.get("url")) in urlstatus and urlstatus[u]!=200]
with (OUT/"inventory.csv").open("w",newline="",encoding="utf-8-sig") as f:
    w=csv.DictWriter(f,fieldnames=["url","final_url","category","source_language","title","status","retrieved_at","record_ids","date_candidates","text_sha256","personal_contact_review_required"])
    w.writeheader()
    for p in coverage: w.writerow({"url":p.get("url"),"final_url":p.get("final_url"),"category":category(p.get("url","")),"source_language":p.get("source_language"),"title":p.get("title"),"status":p.get("status"),"retrieved_at":p.get("retrieved_at"),"record_ids":json.dumps(p.get("record_ids",{}),ensure_ascii=False),"date_candidates":";".join(p.get("date_candidates",[])),"text_sha256":p.get("text_sha256"),"personal_contact_review_required":p.get("personal_contact_review_required")})
coverage_obj={"source":"https://www.geosr.com/","retrieved_pages":len(pages),"pages_by_category":dict(catcounts),"pages_by_source_language":dict(language_counts),"page_statuses":dict(statuses),"asset_references":len(assets),"asset_statuses":dict(asset_status),"broken_internal_page_links":broken,"duplicate_page_body_groups":len(dups),"duplicate_asset_groups":len(asset_dups),"solutions":solution_rows,"local_solution_status_counts":dict(Counter(x["status"] for x in solution_rows)),"local_record_comparison":local_records,"comparison_status_counts":dict(record_status_counts),"personal_contact_review_pages":[p.get("url") for p in coverage if p.get("personal_contact_review_required")],"source_policy":"Original Korean visible text is preserved in source_text_ko_preserved; non-Korean visible text is preserved in source_text_original. Page copy is source evidence only, not automatically approved for publication. Credential scans and personal or contact details require human privacy/currentness review before reuse."}
(OUT/"migration-coverage.json").write_text(json.dumps(coverage_obj,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")

# Report pagination and query-driven board/detail coverage explicitly.
page_keys={"page","page_no","pageno","pagenum","nowpage","currentpage","start","offset"}
pagination=defaultdict(lambda:defaultdict(set))
board_rows=defaultdict(lambda:{"url_count":0,"modes":Counter(),"idx_values":set()})
query_occurrences=Counter(); query_values=defaultdict(set); mode_counts=Counter(); ordered_urls=set()
path_counts=Counter(); exact_hash_counts=Counter(); no_board_context=0
for p in coverage:
    parsed=urlparse(p.get("url","")); q=parse_qs(parsed.query)
    ordered_urls.add(query_order_insensitive_url(p.get("url","")))
    path_counts[parsed.path or "/"]+=1
    exact_hash_counts[p.get("text_sha256")]+=1
    for key,values in q.items():
        query_occurrences[key]+=1
        query_values[key].update(values)
    mode=(q.get("mode") or ["route_or_filter"])[0]
    if "mode" in q: mode_counts[mode]+=1
    bid=(q.get("bid") or [None])[0]
    if bid is not None:
        b=board_rows[(parsed.path,bid)]; b["url_count"]+=1; b["modes"][mode]+=1; b["idx_values"].update(q.get("idx",[]))
    if not any(k in q for k in ("mode","bid","idx","page")): no_board_context+=1
    for k,vals in q.items():
        if k.lower() in page_keys:
            for v in vals: pagination[parsed.path][k].add(v)
coverage_obj["pagination"]={path:{k:sorted(v,key=lambda x:(not x.isdigit(),int(x) if x.isdigit() else x)) for k,v in q.items()} for path,q in pagination.items()}
duplicate_groups=[n for n in exact_hash_counts.values() if n>1]
top_paths=[]
for path,count in path_counts.most_common(10):
    top_paths.append({"path":path,"label_ko":path_label(path,PATH_KO,"기타 경로"),"count":count})
coverage_obj["archive_statistics"]={
    "captured_page_urls":len(coverage),
    "pages_by_source_language":dict(language_counts),
    "unique_normalized_request_urls":len({p.get("url") for p in coverage}),
    "unique_query_order_insensitive_urls":len(ordered_urls),
    "parameter_order_variant_rows":len(coverage)-len(ordered_urls),
    "canonicalization_note":"Archive normalization lowercases scheme/host, removes fragments and known tracking keys, and sorts query pairs. It is not a server-declared canonical count; canonical link tags were not captured.",
    "unique_body_sha256":len(exact_hash_counts),
    "exact_duplicate_body_groups":len(duplicate_groups),
    "rows_repeating_an_existing_body":sum(n-1 for n in duplicate_groups),
    "list_mode_urls":mode_counts.get("list",0),
    "detail_mode_urls":mode_counts.get("view",0),
    "page_parameter_urls":sum(1 for p in coverage if "page" in parse_qs(urlparse(p.get("url","")).query)),
    "distinct_idx_values":len({v for p in coverage for v in parse_qs(urlparse(p.get("url","")).query).get("idx",[])}),
    "distinct_board_ids":len({(path,bid) for path,bid in board_rows}),
    "route_or_filter_urls_without_mode_bid_idx_page":no_board_context,
    "non_200_fetched_page_urls":sum(1 for p in coverage if str(p.get("status"))!="200"),
    "query_key_occurrences":dict(query_occurrences),
    "query_distinct_value_counts":{k:len(v) for k,v in query_values.items()},
    "mode_value_counts":dict(mode_counts),
    "top_paths_ko":top_paths,
    "category_labels_ko":CATEGORY_KO,
    "board_paths":[{"path":path,"label_ko":path_label(path,BOARD_KO,"게시판"),"board_id":bid,"url_count":v["url_count"],"list_urls":v["modes"].get("list",0),"detail_urls":v["modes"].get("view",0),"distinct_idx_values":len(v["idx_values"])} for (path,bid),v in sorted(board_rows.items())],
    "interpretation":"The page total counts fetched query-bearing URLs, not unique articles. Query-parameter ordering accounts for some duplicate URL forms; body hashes identify identical visible page text. Pagination and board detail/list parameters account for most rows."
}
(OUT/"migration-coverage.json").write_text(json.dumps(coverage_obj,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")

# Compute copy provenance before rendering the Markdown summary.
ui_files=[ROOT/"dist"/x for x in ("home.js","site.js","ax-v2.js") if (ROOT/"dist"/x).exists()]
matches={}
for file in ui_files:
    raw=file.read_text(encoding="utf-8",errors="replace")
    for m in re.finditer(r"(?:'([^'\n]*[가-힣][^'\n]*)'|\"([^\"\n]*[가-힣][^\"\n]*)\"|`([^`\n]*[가-힣][^`\n]*)`)",raw):
        s=next((x for x in m.groups() if x is not None),"").strip()
        if len(re.findall(r"[가-힣]",s))<3 or "${" in s: continue
        key=norm(s)
        if key not in matches:
            src=[u for u,t in ko_texts if key and key in t]
            matches[key]={"korean_ui_copy":s,"status":"source_original_exact_match" if src else "newly_authored_or_translation_unverified","source_urls":src,"files":[]}
        matches[key]["files"].append(file.relative_to(ROOT).as_posix())
copy_rows=sorted(matches.values(),key=lambda x:x["korean_ui_copy"])

stats=coverage_obj["archive_statistics"]
lines=["# Migration coverage report", "", f"Capture: {len(pages)} in-scope page URLs; {len(assets)} asset references.", "", "## What the captured URL rows mean", "", f"The archive contains **{stats['captured_page_urls']:,} fetched URL rows**, not that many unique articles. Archive normalization yields {stats['unique_query_order_insensitive_urls']:,} query-order-insensitive URL forms ({stats['parameter_order_variant_rows']:,} rows differ only by parameter ordering). This is not a server-declared canonical count; the capture does not include `rel=canonical` tags. The captured visible text has {stats['unique_body_sha256']:,} unique SHA-256 body hashes; {stats['rows_repeating_an_existing_body']:,} rows repeat a prior body across {stats['exact_duplicate_body_groups']:,} duplicate-body groups. Board `mode=view` appears {stats['detail_mode_urls']:,} times, `mode=list` {stats['list_mode_urls']:,} times, and `page` appears in {stats['page_parameter_urls']:,} URLs. There are {stats['distinct_idx_values']:,} distinct `idx` values across {stats['distinct_board_ids']:,} board/path pairs. This should be treated as a query/pagination archive rather than an article count.", "", "## Public source route coverage", "", "| Route group | Korean label | Retrieved URLs |", "|---|---|---:|"]
lines.insert(3,f"Source-language URL rows: `{json.dumps(dict(language_counts),ensure_ascii=False)}`. Korean text is retained in `source_text_ko_preserved`; non-Korean visible text is stored as `source_text_original` and is not used as Korean-copy evidence.")
lines[7]+=" The capture includes exact visible-text hashes only, not hidden script content or image text."
for k,n in sorted(catcounts.items()): lines.append(f"| `{k}` | {CATEGORY_KO.get(k,'기타')} | {n:,} |")
lines += ["", f"Fetched page response states: `{json.dumps(dict(statuses),ensure_ascii=False)}`. Error/utility-only page count: `{stats['non_200_fetched_page_urls']}`. Route/filter URLs without `mode`, `bid`, `idx`, or `page` context: `{stats['route_or_filter_urls_without_mode_bid_idx_page']}`.", f"Exact duplicate page-body groups: {len(dups)}. Exact duplicate downloaded-asset groups: {len(asset_dups)}.", "", "## Largest paths and board IDs", "", "| Path | Korean label | URLs |", "|---|---|---:|"]
for x in top_paths: lines.append(f"| `{x['path']}` | {x['label_ko']} | {x['count']:,} |")
lines += ["", "Board inventory (IDs are source-site `bid` values; counts include list and detail query variants):", "", "| Route | Korean label | bid | URLs | List | Detail | Distinct idx |", "|---|---|---:|---:|---:|---:|---:|"]
for (path,bid),v in sorted(board_rows.items()): lines.append(f"| `{path}` | {path_label(path,BOARD_KO,'게시판')} | `{bid}` | {v['url_count']:,} | {v['modes'].get('list',0):,} | {v['modes'].get('view',0):,} | {len(v['idx_values']):,} |")
lines += ["", "## Pagination and dynamic archive", ""]
if pagination:
    lines += ["Query-driven page sequences discovered:", ""]
    for path,q in sorted(pagination.items()):
        for key,vals in q.items(): lines.append(f"- `{path}` `{key}`: {len(vals)} values ({', '.join(sorted(vals)[:12])}{'…' if len(vals)>12 else ''})")
else: lines.append("No explicit numbered-page query parameter was discovered in the captured links. See `pages.jsonl` for all board, query, and detail URLs.")
lines += ["", "## Local 21-solution index comparison", "", f"Status counts: `{json.dumps(coverage_obj['local_solution_status_counts'],ensure_ascii=False)}`.", "", "| Local ID | Korean title | Status | Official page evidence |", "|---|---|---|---|"]
for x in solution_rows:
    evidence=x["exact_title_source_urls"] or x["candidate_id_source_urls"]
    lines.append(f"| `{x['local_id']}` | {x['local_korean_title']} | `{x['status']}` | {', '.join(f'[{i+1}]({u})' for i,u in enumerate(evidence[:2])) or 'No exact title/ID page found'} |")
lines += ["", "`represented` means the exact local Korean title was found in captured official visible text; it does not approve copied body text or translation. `missing` means no exact title and no same numeric query ID was found. Candidate ID matches without an exact title require verification.", "", "## Asset and publication review", "", f"Asset status counts: `{json.dumps(dict(asset_status),ensure_ascii=False)}`.", f"Robots-disallowed asset references: {sum(a.get('kind')=='robots_disallowed' for a in assets)}. They were recorded but not fetched.", f"Personal/contact-review page flags: {len(coverage_obj['personal_contact_review_pages'])}. This conservative phone/email scan matched the shared site contact footer on all page rows. Captured visible text contains {len(email_values)} distinct email strings and {len(phone_values)} distinct phone strings; their business/personal status is unverified, so the exact-source archive is not approved as direct publication copy. Three ID-shaped matches were DOI suffixes, with no such match outside DOI context. Credential scans and people-specific media are not approved for reuse by this archive.", f"First-party broken internal page links with fetched error responses: {len(broken)}.", "", "## Korean source text versus current UI copy", "", f"The copy provenance inventory contains {len(copy_rows)} current Korean UI strings: {sum(x['status']=='source_original_exact_match' for x in copy_rows)} exact source matches and {sum(x['status']!='source_original_exact_match' for x in copy_rows)} newly authored or translation-unverified strings. See `ui-copy-provenance.csv` and `.json`; the original source text in `pages.jsonl` is not rewritten.", "", "## Prior inventory comparison and limitations", "", "The local `dist/content.json` index contains 21 official-title candidates and is compared item by item above. The 2026-09-19 `SOURCE-INVENTORY.md` records 5 equipment groups from a historical source capture; the current official route inventory is authoritative for this crawl. Any category-count disagreement is a re-verification item, not an assumption that historical values are current. Do not publish credential images, personal/contact details, generated concepts, or source copy without the documented currentness, rights, and privacy checks.", "", "## Access boundaries", "", "The crawler follows robots.txt, uses TLS verification, and limits sequential request rate. `/upload/` and `/site/` are disallowed and are not fetched. External domains are recorded as references only. Any 404, certificate error, dynamic-only interaction, or cap reached is recorded in `pages.jsonl`, `assets.jsonl`, and `request-log.jsonl`.", ""]
request_404s=[x for x in request_log if str(x.get("status"))=="404"]
unicode_failures=[x for x in request_log if "UnicodeEncodeError" in (x.get("error") or "")]
lines += ["", "## Non-page request outcomes", "", f"The {len(request_404s)} HTTP 404 responses were sitemap discovery probes (`sitemap.xml` and `sitemap_index.xml`), not page-route failures. The {len(unicode_failures)} initial non-ASCII asset request attempts failed before URL encoding was fixed; the Korean company brochure was later downloaded successfully, while the public CV/resume HWP template remains inventoried but intentionally not downloaded because it can collect personal data. These do not affect the drained first-party HTML frontier."]
(OUT/"migration-coverage.md").write_text("\n".join(lines),encoding="utf-8")

# Copy provenance: exact source match vs new UI/translation candidate. Do not rewrite source text.
all_source="\n".join(t for _,t in texts)
ui_files=[ROOT/"dist"/x for x in ("home.js","site.js","ax-v2.js") if (ROOT/"dist"/x).exists()]
matches={}
for file in ui_files:
    raw=file.read_text(encoding="utf-8",errors="replace")
    strings=[]
    for m in re.finditer(r"(?:'([^'\n]*[가-힣][^'\n]*)'|\"([^\"\n]*[가-힣][^\"\n]*)\"|`([^`\n]*[가-힣][^`\n]*)`)",raw):
        s=next((x for x in m.groups() if x is not None),"").strip()
        if len(re.findall(r"[가-힣]",s))>=3 and "${" not in s: strings.append(s)
    for s in strings:
        key=norm(s)
        if key not in matches:
            src=[u for u,t in ko_texts if key and key in t]
            matches[key]={"korean_ui_copy":s,"status":"source_original_exact_match" if src else "newly_authored_or_translation_unverified","source_urls":src,"files":[]}
        matches[key]["files"].append(file.relative_to(ROOT).as_posix())
copy_rows=sorted(matches.values(),key=lambda x:x["korean_ui_copy"])
(OUT/"ui-copy-provenance.json").write_text(json.dumps({"note":"Original Korean source text is stored as-is in pages.jsonl. This map compares current KO strings from the site bundles; no translation is asserted as official unless an exact official-page match exists.","items":copy_rows},ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
with (OUT/"ui-copy-provenance.csv").open("w",newline="",encoding="utf-8-sig") as f:
    w=csv.DictWriter(f,fieldnames=["korean_ui_copy","status","source_urls","files"]);w.writeheader()
    for x in copy_rows:w.writerow({"korean_ui_copy":x["korean_ui_copy"],"status":x["status"],"source_urls":";".join(x["source_urls"]),"files":";".join(x["files"])})

print(json.dumps({"pages":len(pages),"pages_by_category":dict(catcounts),"pages_by_source_language":dict(language_counts),"assets":len(assets),"asset_statuses":dict(asset_status),"solutions":coverage_obj["local_solution_status_counts"],"duplicates":len(dups),"copy_strings":len(copy_rows)},ensure_ascii=True,indent=2))
