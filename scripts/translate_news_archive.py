#!/usr/bin/env python3
"""Create a resumable English draft overlay without changing source records.

Public company archive text only. No authentication or paid generation is used.
The result is a translation draft with structural checks, not certified editorial
approval. External URLs are protected byte-for-byte and never summarized.
"""
from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import re
import time
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "dist/source-translations-news.en.json"
AUDIT = ROOT / "docs/source-migration/news-translation-review-20260928.json"
CACHE = ROOT / "docs/source-migration/translation-chunk-cache.json"
HANGUL = re.compile("[가-힣]")
URL = re.compile(r"https?://[^\s<>\"']+")
GLOSSARY = {
    "지오시스템리서치": "GeoSR",
    "지오시스템 리서치": "GeoSR",
    "해양수산부": "Ministry of Oceans and Fisheries",
    "국토해양부": "Ministry of Land, Transport and Maritime Affairs",
    "국립해양조사원": "Korea Hydrographic and Oceanographic Agency",
    "국립수산과학원": "National Institute of Fisheries Science",
    "해양경찰청": "Korea Coast Guard",
    "국립환경과학원": "National Institute of Environmental Research",
    "환경생태부": "Environmental Ecology Department",
}


def save(path: Path, data: dict):
    temporary = path.with_suffix(path.suffix + ".pending")
    temporary.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temporary.replace(path)


def chunks(text: str, limit=2400):
    result, chunk = [], ""
    for line in text.splitlines(keepends=True):
        if len(chunk) + len(line) > limit and chunk:
            result.append(chunk)
            chunk = ""
        while len(line) > limit:
            cut = line.rfind(" ", 0, limit)
            if cut < limit // 2:
                cut = limit
            result.append(line[:cut])
            line = line[cut:]
        chunk += line
    if chunk:
        result.append(chunk)
    return result


def prepare_body(text: str):
    """Join source hard-wrapped Korean fragments without changing text content."""
    paragraphs = []
    for line in text.splitlines():
        if paragraphs and line and len(paragraphs[-1]) >= 45 and re.search(r"[가-힣]$", paragraphs[-1]) and re.match(r"[가-힣]", line) and not re.search(r"(?:습니다|니다|했다|한다|됐다|된다|있다|없다)$", paragraphs[-1]) and not re.match(r"(?:첨부파일|출처|등록|일시|장소|발표|내용|문의|접수|자격|지원)\s*[:：]", line):
            paragraphs[-1] += line
        else:
            paragraphs.append(line)
    prepared = "\n".join(paragraphs)
    assert re.sub(r"\s+", "", prepared) == re.sub(r"\s+", "", text)
    return prepared


def translate(text: str, cache: dict):
    if not HANGUL.search(text):
        return text
    key = hashlib.sha256(text.encode()).hexdigest()
    if key in cache:
        return cache[key]
    # Keep hyperlinks outside translation requests so the service cannot rename
    # marker text or alter any encoded character in an original URL
    matches = list(URL.finditer(text))
    if matches:
        parts, position = [], 0
        for match in matches:
            parts.extend((translate(text[position:match.start()], cache), match[0]))
            position = match.end()
        parts.append(translate(text[position:], cache))
        translated = "".join(parts)
        cache[key] = translated
        save(CACHE, cache)
        return translated
    urls = []

    def protect(match):
        urls.append(match[0])
        return f"GEOSRURLTOKEN{len(urls)-1:04d}END"

    prepared = URL.sub(protect, text)
    for korean, english in GLOSSARY.items():
        prepared = prepared.replace(korean, english)
    query = urlencode({"client": "gtx", "sl": "ko", "tl": "en", "dt": "t", "q": prepared})
    request = Request("https://translate.googleapis.com/translate_a/single?" + query, headers={"User-Agent": "Mozilla/5.0"})
    error = None
    for attempt in range(3):
        try:
            with urlopen(request, timeout=35) as response:
                payload = json.load(response)
            translated = "".join(segment[0] for segment in payload[0] if segment[0])
            for index, url in enumerate(urls):
                token = f"GEOSRURLTOKEN{index:04d}END"
                assert translated.count(token) == 1, f"URL token not preserved: {index}"
                translated = translated.replace(token, url)
            # Preserve structural newline boundaries when translating chunks
            translated = re.match(r"\s*", text)[0] + translated.strip() + re.search(r"\s*$", text)[0]
            assert translated.strip(), "Empty translated response"
            cache[key] = translated
            save(CACHE, cache)
            time.sleep(1.0)
            return translated
        except Exception as exc:
            error = exc
            if attempt < 2:
                time.sleep(4 * (attempt + 1))
    raise RuntimeError(str(error))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=0)
    args = parser.parse_args()
    source = json.loads((ROOT / "dist/source-archive.json").read_text(encoding="utf-8"))["records"]
    source = [row for row in source if row["lang"] == "ko" and row["kind"] in {"notices", "press"}]
    source.sort(key=lambda row: int(row["id"].split("-")[-2]), reverse=True)
    overlay = json.loads(DEST.read_text(encoding="utf-8")) if DEST.exists() else {"schemaVersion": 1, "sourceLanguage": "ko", "targetLanguage": "en", "records": {}}
    audit = json.loads(AUDIT.read_text(encoding="utf-8")) if AUDIT.exists() else {"method": "Google public translation endpoint draft with company glossary, protected URLs, source hashes and structural checks; semantic editorial review is separate", "records": {}, "errors": {}}
    cache = json.loads(CACHE.read_text(encoding="utf-8")) if CACHE.exists() else {}
    completed = 0
    for row in source:
        previous = overlay["records"].get(row["id"])
        source_body = row["text"][len(row["title"]):].lstrip("\n")
        source_date = re.match(r"^(20\d\d-\d\d-\d\d)(?:\n|$)", source_body)
        if source_date:
            source_body = source_body[source_date.end():]
        prepared_body = prepare_body(source_body)
        prepared_hash = hashlib.sha256(prepared_body.encode()).hexdigest()
        if previous and previous["sourceTextSha256"] == row["sourceTextSha256"]:
            if prepared_body == source_body or audit["records"].get(row["id"], {}).get("preparedBodySha256") == prepared_hash:
                continue
        if args.limit and completed >= args.limit:
            break
        try:
            title = translate(row["title"], cache).strip()
            body = row["text"]
            assert body.startswith(row["title"]), "Source body does not begin with its database title"
            remainder = body[len(row["title"]):].lstrip("\n")
            date = re.match(r"^(20\d\d-\d\d-\d\d)(?:\n|$)", remainder)
            if date:
                remainder = remainder[date.end():]
            translated_body = "".join(translate(chunk, cache) for chunk in chunks(prepared_body)).strip()
            translated_text = "\n".join(part for part in (title, date[1] if date else "", translated_body) if part)
            original_urls = URL.findall(row["text"])
            assert all(url in translated_text for url in original_urls), "An original URL is missing"
            overlay["records"][row["id"]] = {"sourceTextSha256": row["sourceTextSha256"], "title": title, "text": translated_text}
            audit["records"][row["id"]] = {
                "sourceCharacters": len(row["text"]), "translatedCharacters": len(translated_text),
                "sourceTextSha256": row["sourceTextSha256"], "generatedAt": dt.datetime.now(dt.timezone.utc).isoformat(),
                "status": "machine_draft_structural_checks_passed", "sourceUrlCount": len(original_urls),
                "remainingHangul": len(HANGUL.findall(translated_text)),
                "preparedBodySha256": prepared_hash,
                "sourceHardWrapsJoined": prepared_body != source_body,
                "numbersAbsentFromTranslation": sorted(set(re.findall(r"\d+(?:[.,]\d+)*", row["text"])) - set(re.findall(r"\d+(?:[.,]\d+)*", translated_text))),
            }
            audit["errors"].pop(row["id"], None)
            completed += 1
            save(DEST, overlay)
            save(AUDIT, audit)
            print(f"Translated {len(overlay['records'])}/{len(source)} {row['id']}", flush=True)
        except Exception as exc:
            audit["errors"][row["id"]] = str(exc)
            save(AUDIT, audit)
            print(f"Translation deferred {row['id']}: {exc}", flush=True)
    print(json.dumps({"completed": len(overlay["records"]), "required": len(source), "errors": audit["errors"]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
