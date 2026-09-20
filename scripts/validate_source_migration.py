#!/usr/bin/env python3
"""Validate public GeoSR source-migration capture integrity without network access."""
from __future__ import annotations

import csv
import hashlib
import json
import re
import sys
from collections import Counter
from pathlib import Path
from urllib.parse import urlparse, parse_qsl, urlencode, urlunsplit

try:
    from PIL import Image
except ImportError:  # optional local QA; no package dependency is required
    Image = None

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "source-migration"
MAX_FILE = 20 * 1024 * 1024
MAX_TOTAL = 250 * 1024 * 1024
HOSTS = {"geosr.com", "www.geosr.com"}
BLOCKED = ("/site/", "/upload/")


def read_jsonl(path: Path):
    rows = []
    for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip():
            continue
        try:
            rows.append(json.loads(line))
        except json.JSONDecodeError as exc:
            raise AssertionError(f"{path.name}:{number}: invalid JSON: {exc}") from exc
    return rows


def signature_ok(path: Path, ext: str) -> bool:
    head = path.read_bytes()[:16]
    ext = ext.lower()
    return {
        ".jpg": head.startswith(b"\xff\xd8\xff"),
        ".jpeg": head.startswith(b"\xff\xd8\xff"),
        ".png": head.startswith(b"\x89PNG\r\n\x1a\n"),
        ".pdf": head.startswith(b"%PDF-"),
        ".zip": head.startswith(b"PK\x03\x04"),
        ".gif": head.startswith((b"GIF87a", b"GIF89a")),
        ".webp": head.startswith(b"RIFF") and path.read_bytes()[8:12] == b"WEBP",
        ".svg": b"<svg" in path.read_bytes()[:2048].lower(),
    }.get(ext, True)


def orderless_url(url: str) -> str:
    p = urlparse(url)
    pairs = sorted((k, v) for k, v in parse_qsl(p.query, keep_blank_values=True) if k.lower() not in {"utm_source", "utm_medium", "utm_campaign", "fbclid", "gclid"})
    scheme = "https" if p.scheme.lower() in {"http", "https"} else p.scheme.lower()
    host = p.netloc.lower().split(":")[0]
    return urlunsplit((scheme, host, p.path or "/", urlencode(pairs, doseq=True), ""))


def page_candidate(url: str) -> bool:
    p = urlparse(url)
    path = p.path.lower()
    return path in {"/", "/en", "/en/"} or path.endswith((".asp", ".aspx", ".php", ".html", ".htm"))


def main() -> int:
    summary = json.loads((OUT / "inventory.json").read_text(encoding="utf-8"))
    pages = read_jsonl(OUT / "pages.jsonl")
    assets = read_jsonl(OUT / "assets.jsonl")
    log = read_jsonl(OUT / "request-log.jsonl")
    errors = []
    page_urls = [p.get("url") for p in pages]
    page_url_keys = {orderless_url(u) for u in page_urls if u}
    asset_url_keys = {orderless_url(a.get("url", "")) for a in assets if a.get("url")}
    if len(pages) != summary.get("pages"):
        errors.append(f"inventory page count={summary.get('pages')} but pages.jsonl={len(pages)}")
    if len(set(page_urls)) != len(page_urls):
        errors.append("duplicate normalized page URLs remain in pages.jsonl")
    if not summary.get("frontier_drained"):
        errors.append("crawler frontier is not drained")
    if any(str(p.get("status")) != "200" for p in pages):
        errors.append("one or more fetched page responses are not HTTP 200")
    language_counts = Counter(p.get("source_language", "missing") for p in pages)
    for page in pages:
        lang = page.get("source_language")
        if lang == "ko" and not page.get("source_text_ko_preserved"):
            errors.append(f"Korean source text missing: {page.get('url')}")
        if lang and lang != "ko" and not page.get("source_text_original"):
            errors.append(f"original non-Korean text missing: {page.get('url')}")

    downloaded_total = 0
    for asset in assets:
        url = urlparse(asset.get("url", ""))
        if asset.get("kind") == "robots_disallowed":
            if asset.get("status") != "not_fetched" or asset.get("local_path"):
                errors.append(f"robots-disallowed asset fetched or saved: {asset.get('url')}")
            continue
        if asset.get("status") != "downloaded":
            continue
        if url.hostname not in HOSTS:
            errors.append(f"non-first-party asset was downloaded: {asset.get('url')}")
            continue
        if any(url.path.lower().startswith(prefix) for prefix in BLOCKED):
            errors.append(f"robots-blocked path was downloaded: {asset.get('url')}")
            continue
        local = ROOT / asset.get("local_path", "")
        if not local.is_file():
            errors.append(f"downloaded local file missing: {asset.get('local_path')}")
            continue
        data = local.read_bytes()
        downloaded_total += len(data)
        if len(data) > MAX_FILE:
            errors.append(f"asset exceeds per-file cap: {asset.get('local_path')}")
        if hashlib.sha256(data).hexdigest() != asset.get("sha256"):
            errors.append(f"SHA-256 mismatch: {asset.get('local_path')}")
        if not signature_ok(local, local.suffix):
            errors.append(f"file signature does not match extension: {asset.get('local_path')}")
        if Image is not None and local.suffix.lower() in {".jpg", ".jpeg", ".png", ".gif", ".webp"}:
            try:
                with Image.open(local) as image:
                    image.verify()
            except Exception as exc:
                errors.append(f"image decode failed: {asset.get('local_path')}: {exc}")
        if "\ufffd" in str(asset.get("url", "")):
            errors.append(f"replacement character in asset URL: {asset.get('url')}")
    if downloaded_total > MAX_TOTAL:
        errors.append("total downloaded assets exceed cap")
    if downloaded_total != summary.get("downloaded_bytes"):
        errors.append(f"inventory downloaded_bytes={summary.get('downloaded_bytes')} but files={downloaded_total}")

    robots_pages = [p.get("url") for p in pages if urlparse(p.get("url", "")).path.lower().startswith(BLOCKED)]
    if robots_pages:
        errors.append(f"robots-blocked pages were fetched: {len(robots_pages)}")
    if any("\ufffd" in (p.get("source_text_ko_preserved", "") or "") for p in pages):
        errors.append("replacement character found in captured Korean visible text")

    missing_page_links = set()
    missing_asset_links = set()
    first_party_link_refs = 0
    robots_blocked_refs = 0
    for page in pages:
        for link in page.get("links", []):
            target = link.get("url", "")
            p = urlparse(target)
            if p.hostname not in HOSTS:
                continue
            if any(p.path.lower().startswith(prefix) for prefix in BLOCKED):
                robots_blocked_refs += 1
                continue
            first_party_link_refs += 1
            key = orderless_url(target)
            if page_candidate(target) and key not in page_url_keys:
                missing_page_links.add(target)
            elif Path(p.path).suffix.lower() in {".pdf", ".hwp", ".hwpx", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".zip", ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"} and key not in asset_url_keys:
                missing_asset_links.add(target)
    if missing_page_links:
        errors.append(f"unresolved in-scope first-party HTML links: {len(missing_page_links)}")
    if missing_asset_links:
        errors.append(f"unresolved first-party file/image links: {len(missing_asset_links)}")

    with (OUT / "inventory.csv").open(encoding="utf-8-sig", newline="") as handle:
        csv_rows = sum(1 for _ in csv.DictReader(handle))
    if csv_rows != len(pages):
        errors.append(f"inventory.csv rows={csv_rows}, pages.jsonl rows={len(pages)}")
    if not isinstance(summary.get("pages_index"), list) or len(summary["pages_index"]) != len(pages):
        errors.append("inventory.json pages_index length does not match pages.jsonl")

    requests = Counter(str(x.get("status")) for x in log)
    status_counts = Counter(str(x.get("status")) for x in pages)
    result = {
        "pages": len(pages),
        "unique_page_urls": len(set(page_urls)),
        "unique_query_order_insensitive_urls": len({orderless_url(u) for u in page_urls if u}),
        "unique_body_sha256": len({p.get("text_sha256") for p in pages if p.get("text_sha256")}),
        "source_languages": dict(language_counts),
        "first_party_link_refs_checked": first_party_link_refs,
        "robots_blocked_link_refs_not_fetched": robots_blocked_refs,
        "unresolved_first_party_html_links": len(missing_page_links),
        "unresolved_first_party_asset_links": len(missing_asset_links),
        "assets": len(assets),
        "downloaded_assets": sum(x.get("status") == "downloaded" for x in assets),
        "downloaded_bytes_verified": downloaded_total,
        "request_log_entries": len(log),
        "request_status_counts": dict(requests),
        "page_status_counts": dict(status_counts),
        "errors": errors,
    }
    print(json.dumps(result, ensure_ascii=True, indent=2))
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
