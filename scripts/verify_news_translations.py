#!/usr/bin/env python3
"""Check the Korean-canonical news overlay without modifying source records."""
import collections
import argparse
import datetime as dt
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def urls(text):
    return [re.split(r'[가-힣]', value)[0].rstrip(').,]') for value in re.findall(r'https?://[^\s<>"\']+', text)]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--report', type=Path, help='Optional JSON output path outside tracked audit evidence')
    args = parser.parse_args()
    source = json.loads((ROOT / 'dist/source-archive.json').read_text(encoding='utf-8'))['records']
    news = [r for r in source if r['lang'] == 'ko' and r['section'] == 'news']
    target = json.loads((ROOT / 'dist/source-translations-news.en.json').read_text(encoding='utf-8'))['records']
    audit = json.loads((ROOT / 'docs/source-migration/news-translation-review-20260928.json').read_text(encoding='utf-8'))
    errors = []
    for row in news:
        key = row['id']
        translated = target.get(key)
        if not translated:
            errors.append([key, 'missing_translation'])
            continue
        checks = {
            'canonical_source_hash': translated['sourceTextSha256'] == row['sourceTextSha256'],
            'registration_date': translated['text'].splitlines()[1] == row['text'].splitlines()[1],
            'title_first': translated['text'].startswith(translated['title'] + '\n'),
            'all_original_urls': all(url in translated['text'] for url in urls(row['text'])),
            'all_original_emails': all(email in translated['text'] for email in re.findall(r'[A-Za-z0-9_.+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+', row['text'])),
            'no_untranslated_korean': not re.search(r'[가-힣]', translated['text']),
            'no_url_placeholders': 'GEOSRURLTOKEN' not in translated['text'],
            'year_tokens_preserved': all(year in translated['text'].replace(',', '') for year in re.findall(r'((?:19|20)\d{2})\s*년', row['text'])),
        }
        errors.extend([key, name] for name, passed in checks.items() if not passed)
    extras = sorted(set(target) - {r['id'] for r in news})
    if extras:
        errors.append(['extra_records', extras])
    report = {
        'checkedAt': dt.datetime.now(dt.timezone.utc).isoformat(),
        'expected': len(news), 'translated': len(target),
        'koreanCharacters': sum(len(r['text']) for r in news),
        'englishCharacters': sum(len(r['text']) for r in target.values()),
        'reviewStatusCounts': dict(collections.Counter(r['status'] for r in audit['records'].values())),
        'sourceCheckedTitleCount': sum('titleReview' in r for r in audit['records'].values()),
        'institutionNameCheckedCount': sum('institutionReview' in r for r in audit['records'].values()),
        'errors': errors,
        'scope': 'Completeness and source-hash binding, original registration dates, explicit URLs/emails, year tokens and untranslated Hangul. Source hash is the preserved canonical original hash field rather than a new hash of normalized display text.',
        'limits': 'Structural success does not certify every sentence. Full direct editorial review covers source_checked_editorial_translation records. Other records retain the machine draft with targeted terminology/title corrections and structural checks. Numerical-token differences include English number words, month names and KRW unit conversions and remain diagnostic in the per-record review audit.'
    }
    if args.report:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    raise SystemExit(bool(errors))


if __name__ == '__main__':
    main()
