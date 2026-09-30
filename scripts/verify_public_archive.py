#!/usr/bin/env python3
"""Check that the published text index is a faithful subset of the capture."""
from __future__ import annotations

import json
import argparse
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--capture', type=Path, required=True, help='External archived pages.jsonl capture')
CAPTURE = parser.parse_args().capture
ARCHIVE = ROOT / "dist/source-archive.json"

source_by_url: dict[str, list[str]] = defaultdict(list)
with CAPTURE.open(encoding="utf-8") as handle:
    for line in handle:
        page = json.loads(line)
        if page.get("status") != 200:
            continue
        source = page.get("source_text_ko_preserved") or page.get("source_text_original")
        if source:
            source_by_url[page["url"]].append(source)

records = json.loads(ARCHIVE.read_text(encoding="utf-8"))["records"]
ids = [record["id"] for record in records]
assert len(ids) == len(set(ids)), "archive IDs are not unique"
assert len(records) == 2024, f"unexpected record count: {len(records)}"

for record in records:
    assert record["sourceUrl"] in source_by_url, record["id"]
    assert record["title"].strip() and record["text"].strip(), record["id"]
    assert "\ufffd" not in record["title"] and "\ufffd" not in record["text"], record["id"]
    assert any(record["text"] in original for original in source_by_url[record["sourceUrl"]]), record["id"]

print("archive verified:", len(records), "records", dict(Counter(r["lang"] for r in records)))
