#!/usr/bin/env python3
"""Build a local, searchable text archive from the existing public-source capture.

The capture is immutable evidence. This derived file keeps one copy per original
detail record or standalone page and preserves source hashes and URLs.
"""
from __future__ import annotations

import json
import hashlib
import re
from collections import Counter
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/source-migration/pages.jsonl"
DEST = ROOT / "dist/source-archive.json"


def label_for(path: str) -> tuple[str, str]:
    parts = path.strip("/").split("/")
    if parts and parts[0] == "en":
        parts = parts[1:]
    if len(parts) >= 3 and parts[0] == "sub":
        section = parts[1]
        leaf = parts[-1].removesuffix(".asp")
        if section == "achieve":
            return "research", {"busines": "projects", "research": "research", "academic": "publications"}.get(leaf, leaf)
        if section == "news":
            return "news", {"notice": "notices", "press": "press"}.get(leaf, leaf)
        return section, leaf
    return "home", "home"


def clean_title(title: str, path: str, idx: str | None) -> str:
    result = re.sub(r"\s+-\s+(?:지오시스템리서치|GeoSR)$", "", title).strip()
    if idx and " - " in result:
        result = result.rsplit(" - ", 1)[0].strip()
    if not result or result == "지오시스템리서치":
        result = path.strip("/").split("/")[-1].removesuffix(".asp") or "Home"
    return result


def main_text(source: str, title: str, detail: bool, *, start_at: int | None = None, section: str = "") -> str:
    lines = source.splitlines()
    copyright_at = next((i for i, line in enumerate(lines) if "Copyright by 2021. GeoSR" in line), None)
    if copyright_at is not None:
        lines = lines[:max(0, copyright_at - 3)]
    if not detail:
        # The common ASP header occupies the first 32 visible-text lines. The
        # final copyright block is page chrome, not part of each source record.
        body = lines[32:] if len(lines) > 32 else lines
        while body and body[-1].strip() in {"Go to top", "TOP"}:
            body.pop()
        return "\n".join(body).strip()
    # The public ASP detail template has a common 30–38-line menu before the
    # record and ends in List/previous/next controls. Keep the record verbatim.
    start = start_at if start_at is not None else next((i for i, line in enumerate(lines[30:], 30) if line.strip() == title), None)
    if start is None:
        start = next((i for i, line in enumerate(lines[30:], 30) if line.strip().startswith(title)), None)
    if start is None:
        start = min(38, len(lines))
    end = next((i for i, line in enumerate(lines[start:], start) if line.strip() in {"List", "이전글", "다음글"}), len(lines))
    return "\n".join(lines[start:end]).strip()


records: dict[tuple[str, str, str], dict] = {}
variants: Counter[tuple[str, str, str]] = Counter()
with SOURCE.open(encoding="utf-8") as handle:
    for line in handle:
        page = json.loads(line)
        if page.get("status") != 200:
            continue
        parsed = urlparse(page["url"])
        params = parse_qs(parsed.query)
        idx = (params.get("idx") or [None])[0]
        section, kind = label_for(parsed.path)
        detail = idx is not None and (params.get("mode") == ["view"] or "/sub/business/" in parsed.path)
        standalone = not params and section in {"company", "career", "policy"}
        home = parsed.path in {"/", "/en", "/en/"} and not params
        if not (detail or standalone or home):
            continue
        language = page.get("source_language", "ko")
        source = page.get("source_text_ko_preserved") if language == "ko" else page.get("source_text_original")
        if not source:
            continue
        normalized_path = parsed.path.rstrip("/") or "/"
        key = (normalized_path, idx or "", language)
        variants[key] += 1
        title = clean_title(page.get("title") or "", parsed.path, idx)
        source_lines = source.splitlines()
        start_at = None
        if section == "business":
            if kind == "conserve_view":
                start_at = 34 if language == "en" else 36
                title = source_lines[start_at] if len(source_lines) > start_at else title
            elif kind == "conserve":
                start_at = 34 if language == "en" else 36
                title = (params.get("s_cate") or ["Business areas" if language == "en" else "사업 분야"])[0]
        elif not detail:
            static_titles = {
                "company": {"aboutUs": ("인사말과 연혁", "Greeting and history"), "contactUs": ("조직도와 오시는 길", "Organization and location"), "ci": ("CI", "Corporate identity"), "license": ("인증·면허", "Certifications and licenses")},
                "equipment": {"surveying": ("측량 장비", "Surveying equipment"), "investigation": ("물리조사 장비", "Geophysical equipment"), "biological": ("생물조사 장비", "Biological equipment"), "experiment": ("실험 장비", "Laboratory equipment"), "ship": ("조사선박", "Survey vessels")},
                "career": {"recruit": ("채용과 복리후생", "Careers and benefits")},
                "policy": {"privacy": ("개인정보 처리방침", "Privacy policy")},
                "home": {"home": ("기존 홈페이지", "Original homepage")},
            }
            pair = static_titles.get(section, {}).get(kind)
            if pair:
                title = pair[language == "en"]
        record = {
            "id": f"{language}-{section}-{kind}-{idx or 'page'}-{hashlib.sha1(normalized_path.encode('utf-8')).hexdigest()[:10]}",
            "lang": language,
            "section": section,
            "kind": kind,
            "title": title,
            "text": main_text(source, title, detail, start_at=start_at, section=section),
            "sourceUrl": page["url"],
            "sourceTextSha256": page["text_sha256"],
            "retrievedAt": page["retrieved_at"],
            "attachments": page.get("attachment_urls") or [],
            "imageReferences": [item["url"] for item in page.get("images") or [] if item.get("url")],
            "detail": detail,
        }
        if key not in records or len(record["text"]) > len(records[key]["text"]):
            records[key] = record

for key, record in records.items():
    record["capturedUrlVariants"] = variants[key]

ordered = sorted(records.values(), key=lambda item: (item["lang"], item["section"], item["kind"], item["title"]))
payload = {
    "source": "docs/source-migration/pages.jsonl",
    "note": "Public-site visible text capture. Original page structure and restricted media are not reproduced.",
    "records": ordered,
}
DEST.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
print(f"{len(ordered)} records -> {DEST.relative_to(ROOT)} ({DEST.stat().st_size:,} bytes)")
print(dict(Counter((r["lang"], r["section"]) for r in ordered)))
