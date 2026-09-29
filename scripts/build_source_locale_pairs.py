#!/usr/bin/env python3
"""Build verified original-language relationships without translating source data."""
import collections
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main():
    records = json.loads((ROOT / "dist/source-archive.json").read_text(encoding="utf-8"))["records"]
    media = json.loads((ROOT / "dist/source-media.json").read_text(encoding="utf-8"))["records"]
    number = lambda row: int(row["id"].split("-")[-2])
    rows = lambda language, kind: sorted([row for row in records if row["lang"] == language and row["kind"] == kind], key=number)
    lookup = {row["id"]: row for row in records}
    pairs, evidence = {}, []

    def add(ko, en, method):
        assert ko["id"] not in pairs
        assert en["id"] not in pairs.values()
        pairs[ko["id"]] = en["id"]
        photos = lambda row: {item["src"] for item in media.get(row["id"], []) if item["kind"] == "image"}
        links = lambda row: {item["url"] for item in row.get("externalLinks", [])}
        evidence.append({"koId": ko["id"], "enId": en["id"], "koTitle": ko["title"], "enTitle": en["title"], "method": method, "sameImageBytes": sorted(photos(ko) & photos(en)), "sameExternalLinks": sorted(links(ko) & links(en))})

    # All 406 paired titles read; these 11 entries have a different source order
    project_override = {73: 2213, 74: 2212, 701: 2348, 702: 2346, 703: 2347, 766: 2412, 767: 2411, 1609: 2528, 1610: 2527, 1978: 2595, 1980: 2593}
    english_projects = {number(row): row for row in rows("en", "projects")}
    for ko, en in zip(rows("ko", "projects"), rows("en", "projects")):
        add(ko, english_projects.get(project_override.get(number(ko)), en), "title_semantics_checked_406_pairs_and_source_order_exceptions")

    # DOI/article URL determines the identity; three reversed pairs in source order
    english_publications = rows("en", "publications")
    for index, ko in enumerate(rows("ko", "publications")):
        urls = {item["url"] for item in ko.get("externalLinks", [])}
        matches = [en for en in english_publications if en["id"] not in pairs.values() and urls & {item["url"] for item in en.get("externalLinks", [])}]
        if len(matches) > 1 and english_publications[index] in matches:
            add(ko, english_publications[index], "shared_journal_url_and_title_source_order")
        else:
            assert len(matches) == 1, (ko["id"], len(matches))
            add(ko, matches[0], "identical_original_publication_url_unique_pair")

    # Equipment model, manufacturer and uses were read in both languages
    for kind in ("surveying", "investigation", "biological", "experiment", "ship"):
        korean, english = rows("ko", kind), rows("en", kind)
        if kind == "surveying":
            korean = [row for row in korean if number(row) not in (2963, 2965, 2966)]
            english = [row for row in english if number(row) != 2856]
        for ko, en in zip(korean, english):
            if kind == "surveying" and number(ko) in (1925, 1926):
                en = next(row for row in english if number(row) == {1925: 2889, 1926: 2888}[number(ko)])
            add(ko, en, "same_equipment_model_manufacturer_and_use")

    # Preserve historic original pairs even where later KO duplicate records exist
    english_research = {number(row): row for row in rows("en", "research")}
    for ko in rows("ko", "research"):
        n = number(ko)
        target = None
        if 1888 <= n <= 1923:
            target = n + 722
        elif 1948 <= n <= 1950:
            target = n + 698
        elif 2995 <= n <= 3019 and n not in (2999, 3016):
            target = n + (25 if n < 2999 else 24 if n < 3016 else 23)
        if target:
            add(ko, english_research[target], "original_batch_title_and_client_relationship_research_overlay_takes_precedence")

    for kind in ("conserve", "conserve_view"):
        for ko, en in zip(rows("ko", kind), rows("en", kind)):
            add(ko, en, "business_area_and_technology_title_pair")
    for kind in ("home", "aboutUs", "contactUs", "license", "ci", "recruit", "privacy"):
        ko = [row for row in records if row["lang"] == "ko" and row["kind"] == kind]
        en = [row for row in records if row["lang"] == "en" and row["kind"] == kind]
        assert len(ko) == len(en) == 1
        add(ko[0], en[0], "same_singleton_page_kind")

    missing = [row for row in records if row["lang"] == "ko" and row["id"] not in pairs]
    unmatched_english = [row for row in records if row["lang"] == "en" and row["id"] not in pairs.values()]
    hangul = [{"id": row["id"], "title": row["title"], "hangulCharacters": len(re.findall("[가-힣]", row["text"]))} for row in records if row["lang"] == "en" and re.search("[가-힣]", row["text"])]
    report = {"pairCount": len(pairs), "countsByKind": dict(collections.Counter(lookup[key]["kind"] for key in pairs)), "pairs": evidence,
        "koreanRecordsWithoutOneToOneOriginalEnglish": [{"id": row["id"], "kind": row["kind"], "title": row["title"], "characters": len(row["text"]), "sourceTextSha256": row["sourceTextSha256"]} for row in missing],
        "unmatchedEnglish": [{"id": row["id"], "title": row["title"]} for row in unmatched_english], "originalEnglishRemainingHangul": hangul,
        "missingCharactersByKind": dict((kind, sum(len(row["text"]) for row in missing if row["kind"] == kind)) for kind in sorted({row["kind"] for row in missing})),
        "notes": ["One-to-one archive identity mapping does not certify translation accuracy", "All 82 research records receive a separate KO-based English overlay because the original EN client fields contain errors", "The 20 unmatched Korean research entries include repeated projects from later publication batches", "EN-only total station remains in original archive but is excluded from the Korean canonical catalog"]}
    assert len(pairs) == 808
    (ROOT / "dist/source-record-locales.json").write_text(json.dumps({"schemaVersion": 1, "canonicalLanguage": "ko", "koToEn": pairs}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (ROOT / "docs/source-migration/locale-source-pairs-20260928.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: value for key, value in report.items() if key not in ("pairs", "koreanRecordsWithoutOneToOneOriginalEnglish")}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
