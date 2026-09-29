"""Compare observed source menus and board IDs with the preserved records.

This is an audit of content coverage, not a claim that every linked paper or
every pixel in a historical scan has been reviewed.
"""
import collections
import datetime
import hashlib
import json
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).resolve().parents[1]
AUDIT = ROOT / "docs/company-audit"


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))


def main():
    archive = read(ROOT / "dist/source-archive.json")
    records = archive["records"]
    menus = read(AUDIT / "live-menu-content.json")
    boards = []
    for language, filename in [("ko", "live-board-counts.json"), ("en", "live-board-counts-en.json")]:
        for path, observed in read(AUDIT / filename).items():
            stored = {
                parse_qs(urlparse(r["sourceUrl"]).query).get("idx", [""])[0]
                for r in records
                if r["lang"] == language and urlparse(r["sourceUrl"]).path == path and r.get("detail")
            }
            current = set(observed["ids"])
            boards.append({
                "language": language, "path": path,
                "pagesObserved": len(set(observed["pages"])),
                "currentRecordCount": len(current), "preservedRecordCount": len(stored),
                "missingFromArchive": sorted(current - stored),
                "archiveIdsNotInCurrentList": sorted(stored - current),
            })
    credentials = read(ROOT / "dist/credentials-index.json")["records"]
    media_path = ROOT / "docs/source-migration/public-media-mirror-20260928.json"
    result = {
        "checkedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "source": "https://www.geosr.com/",
        "archiveSha256": hashlib.sha256((ROOT / "dist/source-archive.json").read_bytes()).hexdigest(),
        "archiveRecordCount": len(records),
        "archiveCountsByLanguage": dict(collections.Counter(r["lang"] for r in records)),
        "archiveCounts": [
            {"language": lang, "section": section, "kind": kind, "count": count}
            for (lang, section, kind), count in sorted(collections.Counter((r["lang"], r["section"], r["kind"]) for r in records).items())
        ],
        "boards": boards,
        "observedMenuAndPaginationUrls": len(menus),
        "technologyDetailsVisited": {language: sum(x["label"].startswith(prefix) for x in menus) for language, prefix in [("ko", "기술 상세 "), ("en", "EN 기술 상세 ")]},
        "credentialCounts": dict(collections.Counter(r["category"] for r in credentials)),
        "mediaAudit": str(media_path.relative_to(ROOT)).replace("\\", "/") if media_path.exists() else None,
        "reviewBoundary": {
            "menuAndBoardCheckDate": "2026-09-28",
            "preservedRecordCaptureDates": sorted(set(r["retrievedAt"][:10] for r in records)),
            "recordText": "All Korean records reviewed using the preserved body plus current menu and list observations",
            "recentDetailRefresh": "300 source detail pages with media rechecked separately in the media audit",
            "papers": "Published bibliographic entries reviewed; full external papers are not all included or read",
            "historicalScanText": "Original scans retained; every word embedded in images has not been transcribed or translated",
            "englishPolicy": "Korean content is canonical; missing English titles and bodies are translated in separate files without mutating the original records",
            "completion": "Content inventory and list comparison only; translation, design and media acceptance are separate work",
        },
    }
    (AUDIT / "record-coverage.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"records": len(records), "observedPages": len(menus), "boardPages": sum(x["pagesObserved"] for x in boards), "missing": sum(len(x["missingFromArchive"]) for x in boards), "credentials": result["credentialCounts"]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
