#!/usr/bin/env python3
"""Refresh first-party HTML media references without fetching protected media paths.

The old immutable capture remains intact. This audit repairs URL parsing evidence
only; it does not certify the referenced files or publish them into dist.
"""
from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import time
from pathlib import Path
from urllib.parse import parse_qs, quote, urljoin, urlparse, urlunparse
from urllib.request import Request, urlopen

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "docs/source-migration/fresh-media-reference-audit-20260928.json"


def normalize(base: str, url: str) -> str:
    parsed = urlparse(urljoin(base, url.strip()))
    return urlunparse((parsed.scheme, parsed.netloc, quote(parsed.path, safe="/%:@!$&'()*+,;=-._~"), "", quote(parsed.query, safe="%=&+?/:@!$'()*,-._~"), ""))


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--refresh", action="store_true", help="Fetch uncached public HTML pages sequentially")
    parser.add_argument("--limit", type=int, default=0, help="Optional maximum new HTML requests")
    args = parser.parse_args()
    records = json.loads((ROOT / "dist/source-archive.json").read_text(encoding="utf-8"))["records"]
    pages = [json.loads(line) for line in (ROOT / "docs/source-migration/pages.jsonl").read_text(encoding="utf-8").splitlines()]
    by_url = {page["url"]: page for page in pages}
    selected = []
    for record in records:
        references = [url for url in record["imageReferences"] if "/img/common/" not in url and "/img/main/download-btn" not in url]
        attachment_links = [link for link in by_url.get(record["sourceUrl"], {}).get("links", []) if "/site/download.asp" in link.get("url", "")]
        if references or attachment_links:
            selected.append(record)
    data = json.loads(DEST.read_text(encoding="utf-8")) if DEST.exists() else {"note": "First-party HTML only; referenced media has not been downloaded or approved for publication", "pages": []}
    existing = {row["recordId"] for row in data["pages"] if row.get("status") == 200}
    requested = 0
    for record in selected:
        if not args.refresh or record["id"] in existing:
            continue
        parsed = urlparse(record["sourceUrl"])
        assert parsed.hostname in {"www.geosr.com", "geosr.com"} and not parsed.path.startswith(("/site/", "/upload/"))
        if args.limit and requested >= args.limit:
            break
        row = {"recordId": record["id"], "sourceUrl": record["sourceUrl"], "retrievedAt": dt.datetime.now(dt.timezone.utc).isoformat()}
        try:
            request = Request(record["sourceUrl"], headers={"User-Agent": "GeoSR-public-content-migration-audit/1.0"})
            with urlopen(request, timeout=20) as response:
                raw = response.read()
                html = BeautifulSoup(raw, "html.parser")
                row.update(status=response.status, htmlSha256=hashlib.sha256(raw).hexdigest(), bytes=len(raw))
                row["images"] = [{"url": normalize(record["sourceUrl"], image["src"]), "alt": image.get("alt", ""), "status": "reference_only"} for image in html.select("img[src]") if not any(part in image["src"] for part in ("/img/common/", "/img/main/download-btn"))]
                row["attachments"] = [{"url": normalize(record["sourceUrl"], link["href"]), "name": link.get_text(" ", strip=True), "status": "reference_only"} for link in html.select("a[href]") if "/site/download.asp" in link["href"] or urlparse(link["href"]).path.lower().endswith((".pdf", ".zip", ".hwp", ".hwpx", ".doc", ".docx", ".xls", ".xlsx"))]
        except Exception as exc:
            row.update(status="error", error=str(exc))
        data["pages"] = [prior for prior in data["pages"] if prior["recordId"] != record["id"]] + [row]
        requested += 1
        if requested % 20 == 0:
            print(f"Refreshed {requested} new HTML pages; {len(data['pages'])}/{len(selected)} cached", flush=True)
        data["updatedAt"] = dt.datetime.now(dt.timezone.utc).isoformat()
        data["targetRecordCount"] = len(selected)
        DEST.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        time.sleep(1.25)
    ok = [row for row in data["pages"] if row.get("status") == 200]
    print(json.dumps({"targetRecordCount": len(selected), "successfulHtmlPages": len(ok), "uniqueImageReferences": len({image['url'] for row in ok for image in row.get('images', [])}), "uniqueAttachmentReferences": len({attachment['url'] for row in ok for attachment in row.get('attachments', [])}), "newRequests": requested}, ensure_ascii=False))


if __name__ == "__main__":
    main()
