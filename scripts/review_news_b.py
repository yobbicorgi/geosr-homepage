"""Incremental checkpoint writer for reviewer B's assigned news slice.

Accepts one JSON object on stdin:
{"checked":[{"id":"...","summary":"...","correction":{"title":"...","text":"..."}}]}
Each correction is a complete replacement title/body. Omitting correction records
that the source was checked and the existing translation was acceptable.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE_PATH = ROOT / "dist/source-archive.json"
TRANSLATION_PATH = ROOT / "dist/source-translations-news-review-b.en.json"
BASE_TRANSLATION_PATH = ROOT / "dist/source-translations-news.en.json"
REPORT_PATH = ROOT / "docs/source-migration/news-review-b-20260928.json"


def read_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    payload = json.load(sys.stdin)
    source_records = read_json(SOURCE_PATH)["records"]
    source_by_id = {row["id"]: row for row in source_records}
    active_rows = sorted(
        (row for row in source_records if row["section"] == "news" and row["kind"] in {"notices", "press"}),
        key=lambda row: row["id"],
    )
    report = read_json(REPORT_PATH)
    translations = read_json(TRANSLATION_PATH)
    base_translations = read_json(BASE_TRANSLATION_PATH)
    checked_ids = report["checkedIds"]
    correction_rows = {row["id"]: row for row in report["corrections"]}
    slice_start = report["scope"]["sliceStart"]
    slice_end = report["scope"]["sliceEndExclusive"]
    active_ids = {row["id"] for row in active_rows[slice_start:slice_end]}

    for item in payload["checked"]:
        record_id = item["id"]
        if record_id not in active_ids:
            raise ValueError(f"ID is outside B's active scope: {record_id}")
        if record_id in checked_ids:
            raise ValueError(f"ID already checkpointed: {record_id}")
        source = source_by_id[record_id]
        if record_id not in base_translations["records"]:
            raise ValueError(f"Missing existing English translation: {record_id}")
        canonical_hash = source["sourceTextSha256"]
        if base_translations["records"][record_id].get("sourceTextSha256") != canonical_hash:
            raise ValueError(f"Translation references a stale source hash: {record_id}")

        correction = item.get("correction")
        if correction is not None:
            if not isinstance(correction.get("title"), str) or not isinstance(correction.get("text"), str):
                raise ValueError(f"Correction must include full title and text: {record_id}")
            translations["records"][record_id] = {
                "sourceTextSha256": canonical_hash,
                "title": correction["title"],
                "text": correction["text"],
                "reviewStatus": "source-compared",
            }
            correction_rows[record_id] = {"id": record_id, "summary": item["summary"]}
        elif item.get("summary"):
            raise ValueError(f"Summary supplied without a correction: {record_id}")

        checked_ids.append(record_id)

    references = report.setdefault("referenceChecks", [])
    for reference in payload.get("referenceChecks", []):
        existing = next((row for row in references if row.get("url") == reference["url"]), None)
        if existing is None:
            references.append(reference)
            continue
        existing_ids = existing.setdefault("recordIds", [])
        for record_id in reference.get("recordIds", []):
            if record_id not in existing_ids:
                existing_ids.append(record_id)

    order = {row["id"]: idx for idx, row in enumerate(active_rows)}
    checked_ids.sort(key=order.__getitem__)
    report["corrections"] = sorted(correction_rows.values(), key=lambda row: order[row["id"]])
    report["checkedCount"] = len(checked_ids)
    report["totalCount"] = len(active_ids)
    report["complete"] = len(checked_ids) == len(active_ids)
    report["limitations"] = [
        limitation
        for limitation in report.get("limitations", [])
        if not limitation.startswith("In progress:")
    ]
    if not report["complete"]:
        report["limitations"].insert(0, "In progress: only checkedIds are source-compared; all remaining scope IDs are not reviewed.")

    write_json(TRANSLATION_PATH, translations)
    write_json(REPORT_PATH, report)
    print(json.dumps({"checkedCount": report["checkedCount"], "totalCount": report["totalCount"], "complete": report["complete"], "correctionCount": len(report["corrections"]), "savedIds": [item["id"] for item in payload["checked"]]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
