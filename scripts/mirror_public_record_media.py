#!/usr/bin/env python3
"""Mirror owner-authorized public GeoSR record media with a publication manifest.

Only files directly linked by captured public HTML are eligible. Credential
documents continue through their separate reviewed gallery. No login or access
restriction is bypassed and failed requests remain in the audit manifest.
"""
from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import io
import json
import time
from pathlib import Path
from urllib.parse import parse_qs, quote, unquote, urlparse, urlunparse
from urllib.request import Request, urlopen

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
AUDIT = ROOT / "docs/source-migration/public-media-mirror-20260928.json"
PUBLIC = ROOT / "dist/source-media.json"
FILES = ROOT / "dist/assets/source-records"
HOSTS = {"geosr.com", "www.geosr.com"}
ALLOWED_MIME = {"image/jpeg": ".jpg", "image/png": ".png", "image/gif": ".gif", "image/webp": ".webp", "application/pdf": ".pdf", "application/zip": ".zip", "application/x-zip-compressed": ".zip", "application/hwp": ".hwp", "application/x-hwp": ".hwp", "application/haansofthwp": ".hwp"}
REVIEWED_TEMPLATES = {
    "73eff567f2b5eeb2d46e50aafac34135b13418910b97348eba60ae89709ac0e9": "2026-09-28 HWP BodyText sections inspected as an unfilled application, self-introduction, career history and consent template; no completed applicant record; original company wording preserved",
}


def canonical(url: str) -> str:
    parsed = urlparse(url)
    return urlunparse(("https", parsed.hostname, quote(unquote(parsed.path), safe="/():@!$&'*,;=-._~"), "", parsed.query, ""))


def permitted_public_url(url: str) -> bool:
    parsed = urlparse(url)
    if parsed.hostname in HOSTS:
        return True
    # Seven existing public news articles embed these image URLs directly
    # No mailbox, account, login or other API endpoints are accessed
    return parsed.hostname == "me180.mailplug.com" and parsed.path == "/api/showImage.php" and parse_qs(parsed.query).get("host_domain") == ["geosr.com"]


def export(ledger: dict, record_lookup: dict) -> None:
    public_records = {}
    for item in ledger["files"]:
        if item.get("status") != "downloaded" or not item.get("publicPath"):
            continue
        for reference in item["references"]:
            record_id = reference["recordId"]
            if record_lookup[record_id]["kind"] == "license":
                continue
            media = {"src": item["publicPath"], "kind": reference["kind"], "label": reference.get("label", ""), "mime": item["contentType"], "bytes": item["sizeBytes"]}
            if item.get("width"):
                media.update(width=item["width"], height=item["height"])
            bucket = public_records.setdefault(record_id, [])
            if not any(prior["src"] == media["src"] and prior["kind"] == media["kind"] for prior in bucket):
                bucket.append(media)
    PUBLIC.write_text(json.dumps({"records": public_records}, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    AUDIT.write_text(json.dumps(ledger, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def deduplicate_local_files(ledger: dict) -> int:
    """Reuse byte-identical public files while retaining every original URL."""
    known = {}
    for name in ("geosr-ci.zip", "geosr-ci.png", "geosr-profile-ko-2025.pdf", "geosr-profile-en-2025.pdf"):
        path = ROOT / "dist/assets/company" / name
        if path.is_file():
            known[hashlib.sha256(path.read_bytes()).hexdigest()] = path.relative_to(ROOT / "dist").as_posix()
    obsolete = set()
    for item in ledger["files"]:
        if item["status"] != "downloaded":
            continue
        item.pop("error", None)
        path = ROOT / "dist" / item["publicPath"]
        assert path.is_file() and hashlib.sha256(path.read_bytes()).hexdigest() == item["sha256"]
        canonical_path = known.setdefault(item["sha256"], item["publicPath"])
        if canonical_path != item["publicPath"]:
            obsolete.add(path)
            item["publicPath"] = canonical_path
    retained = {str((ROOT / "dist" / item["publicPath"]).resolve()) for item in ledger["files"] if item.get("publicPath")}
    removed = 0
    for path in obsolete:
        resolved = path.resolve()
        assert resolved.parent == FILES.resolve(), "Only mirror-created duplicates can be removed"
        if str(resolved) not in retained:
            path.unlink()
            removed += 1
    return removed


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--fetch", action="store_true")
    parser.add_argument("--retry-errors", action="store_true")
    parser.add_argument("--limit", type=int, default=0)
    args = parser.parse_args()
    records = json.loads((ROOT / "dist/source-archive.json").read_text(encoding="utf-8"))["records"]
    lookup = {record["id"]: record for record in records}
    pages = json.loads((ROOT / "docs/source-migration/fresh-media-reference-audit-20260928.json").read_text(encoding="utf-8"))["pages"]
    credentials = json.loads((ROOT / "dist/credentials-index.json").read_text(encoding="utf-8"))["records"]
    protected = {canonical(record["sourceImageUrl"]) for record in credentials if not record.get("image") and record.get("sourceImageUrl")}
    ledger = json.loads(AUDIT.read_text(encoding="utf-8")) if AUDIT.exists() else {"authorization": "2026-09-28 owner explicitly requested migration of all linked public company images and attachments; credential privacy exclusions remain", "files": []}
    existing = {item["url"]: item for item in ledger["files"]}
    for page in pages:
        if page.get("status") != 200:
            continue
        if lookup[page["recordId"]]["kind"] == "license":
            continue
        for kind, key in (("image", "images"), ("attachment", "attachments")):
            for resource in page.get(key, []):
                url = canonical(resource["url"])
                item = existing.setdefault(url, {"url": url, "status": "pending", "references": []})
                reference = {"recordId": page["recordId"], "sourcePage": page["sourceUrl"], "kind": kind, "label": resource.get("name") or resource.get("alt") or ""}
                if reference not in item["references"]:
                    item["references"].append(reference)
                if url in protected:
                    item["status"] = "withheld_credential_privacy_review"
                elif not permitted_public_url(url):
                    item["status"] = "external_reference_review"
                elif item["status"] == "external_reference_review":
                    item["status"] = "pending"
    ledger["files"] = list(existing.values())
    FILES.mkdir(parents=True, exist_ok=True)
    for item in ledger["files"]:
        if item["status"] == "downloaded_template_pending_content_review" and item.get("sha256") in REVIEWED_TEMPLATES:
            original = ROOT / item["localPath"]
            assert hashlib.sha256(original.read_bytes()).hexdigest() == item["sha256"]
            target = FILES / (hashlib.sha256(item["url"].encode()).hexdigest()[:20] + ".hwp")
            target.write_bytes(original.read_bytes())
            item.update(status="downloaded", publicPath=target.relative_to(ROOT / "dist").as_posix(), contentReview=REVIEWED_TEMPLATES[item["sha256"]])
    requested = 0
    for item in ledger["files"]:
        eligible = item["status"] == "pending" or (args.retry_errors and item["status"] == "error")
        if not args.fetch or not eligible:
            continue
        if args.limit and requested >= args.limit:
            break
        item["retrievedAt"] = dt.datetime.now(dt.timezone.utc).isoformat()
        try:
            request = Request(item["url"], headers={"User-Agent": "GeoSR-owner-authorized-content-migration/1.0"})
            with urlopen(request, timeout=30) as response:
                assert permitted_public_url(response.geturl()), "Redirected outside the authorized public file endpoints"
                assert response.status == 200, f"HTTP {response.status}"
                raw = response.read(64 * 1024 * 1024 + 1)
                assert len(raw) <= 64 * 1024 * 1024, "File exceeds 64 MiB review threshold"
                mime = response.headers.get_content_type()
                item.update(httpStatus=response.status, finalUrl=response.geturl(), contentType=mime, sizeBytes=len(raw), sha256=hashlib.sha256(raw).hexdigest())
                item.pop("error", None)
                suffix = ALLOWED_MIME.get(mime)
                if raw.startswith(b"%PDF"):
                    suffix = ".pdf"
                    item["contentType"] = "application/pdf"
                else:
                    try:
                        with Image.open(io.BytesIO(raw)) as image:
                            image.verify()
                            suffix = {"JPEG": ".jpg", "PNG": ".png", "GIF": ".gif", "WEBP": ".webp"}.get(image.format)
                        with Image.open(io.BytesIO(raw)) as image:
                            item.update(width=image.width, height=image.height)
                            item["contentType"] = Image.MIME.get(image.format, mime)
                    except Exception:
                        if not suffix:
                            raise ValueError(f"Unsupported or invalid file content: {mime}")
                assert suffix, "Unsupported file format"
                if suffix == ".hwp":
                    assert raw.startswith(bytes.fromhex("D0CF11E0A1B11AE1")), "Invalid HWP compound document signature"
                    item.update(status="downloaded_template_pending_content_review")
                    target = ROOT / "docs/source-migration/assets" / ("resume-2026" + suffix)
                    target.write_bytes(raw)
                    item["localPath"] = target.relative_to(ROOT).as_posix()
                else:
                    filename = hashlib.sha256(item["url"].encode()).hexdigest()[:20] + suffix
                    target = FILES / filename
                    target.write_bytes(raw)
                    item.update(status="downloaded", publicPath=target.relative_to(ROOT / "dist").as_posix())
        except Exception as exc:
            item.update(status="error", error=str(exc))
        requested += 1
        ledger["updatedAt"] = dt.datetime.now(dt.timezone.utc).isoformat()
        export(ledger, lookup)
        if requested % 20 == 0:
            print(f"Fetched {requested} files in this run", flush=True)
        time.sleep(1.25)
    removed = deduplicate_local_files(ledger)
    export(ledger, lookup)
    counts = {}
    for item in ledger["files"]:
        counts[item["status"]] = counts.get(item["status"], 0) + 1
    print(json.dumps({"newRequests": requested, "statuses": counts, "byteIdenticalFilesRemoved": removed}, ensure_ascii=False))


if __name__ == "__main__":
    main()
