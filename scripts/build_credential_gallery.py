"""Build the local GeoSR credential gallery from the company's public document page."""
from __future__ import annotations

import argparse
import io
import json
import re
import unicodedata
from pathlib import Path
from urllib.parse import quote, urljoin, urlsplit, urlunsplit

import requests
import truststore
from bs4 import BeautifulSoup
from PIL import Image, ImageOps

truststore.inject_into_ssl()

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "dist" / "credentials-index.json"
ASSET_DIR = ROOT / "dist" / "assets" / "credentials" / "gallery"
SOURCE = "https://www.geosr.com/sub/company/license.asp"
CATEGORIES = ("certification", "registration", "intellectual-property")
REVIEW_TITLES = {
    "해양조사정보업 등록증 (수로측량)",
    "기상사업 등록증 (기상예보업, 기상컨설팅업, 기상장비업)",
}


def key(text: str) -> str:
    return re.sub(r"\s+", "", unicodedata.normalize("NFKC", text))


def safe_url(path: str) -> str:
    parts = urlsplit(urljoin(SOURCE, path))
    return urlunsplit((parts.scheme, parts.netloc, quote(parts.path, safe="/%"), parts.query, ""))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--audit", action="store_true", help="compare titles without downloading")
    args = parser.parse_args()
    response = requests.get(SOURCE, timeout=30)
    response.raise_for_status()
    soup = BeautifulSoup(response.content, "html.parser")
    groups = [group for group in soup.select("#subContents ul.list-con") if group.select_one("img[src*='/upload/']")]
    if len(groups) != 3:
        raise RuntimeError(f"Expected 3 document groups, got {len(groups)}")
    gallery: dict[tuple[str, str], list[str]] = {}
    for category, group in zip(CATEGORIES, groups):
        for item in group.find_all("li", recursive=False):
            image = item.select_one("img[src*='/upload/']")
            title = item.select_one("p")
            if image and title:
                gallery.setdefault((category, key(title.get_text(" ", strip=True))), []).append(safe_url(image["src"]))
    data = json.loads(INDEX.read_text(encoding="utf-8"))
    records = data["records"]
    unmatched = [record["title"] for record in records if (record["category"], key(record["title"])) not in gallery]
    print(f"Source documents: {sum(len(values) for values in gallery.values())}; unique keys: {len(gallery)}; index: {len(records)}; unmatched: {len(unmatched)}")
    if unmatched:
        for title in unmatched:
            print("UNMATCHED", title)
        raise RuntimeError("Title matching requires review")
    if args.audit:
        return
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    session = requests.Session()
    failures = []
    for number, record in enumerate(records, 1):
        source_url = gallery[(record["category"], key(record["title"]))][0]
        record["sourceImageUrl"] = source_url
        if record["title"] in REVIEW_TITLES:
            record["previewStatus"] = "review"
            record.pop("image", None)
            record.pop("sourceImageUrl", None)
            continue
        filename = f"document-{number:03d}.webp"
        path = ASSET_DIR / filename
        try:
            download = session.get(source_url, timeout=30)
            download.raise_for_status()
            with Image.open(io.BytesIO(download.content)) as image:
                image = ImageOps.exif_transpose(image).convert("RGB")
                image.thumbnail((1100, 1500), Image.Resampling.LANCZOS)
                image.save(path, "WEBP", quality=83, method=6)
            record["image"] = f"assets/credentials/gallery/{filename}"
            record.pop("previewStatus", None)
        except Exception as error:  # keep the title, withhold failed previews
            failures.append((record["title"], str(error)))
            record["previewStatus"] = "unavailable"
            record.pop("image", None)
    INDEX.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Downloaded {len(records)-len(REVIEW_TITLES)-len(failures)} images; withheld {len(REVIEW_TITLES)} for review; failed {len(failures)}")
    for title, error in failures:
        print("FAILED", title, error)


if __name__ == "__main__":
    main()
