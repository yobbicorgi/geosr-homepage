"""Preserve explicit geosr.com technology-to-record links without keyword inference."""
import json
import argparse
from pathlib import Path
from urllib.parse import urlparse, parse_qs

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--capture', type=Path, required=True, help='External archived pages.jsonl capture')
args = parser.parse_args()
records = json.loads((ROOT / 'dist/source-archive.json').read_text(encoding='utf8'))['records']
by_source = {}
for record in records:
    if record['lang'] != 'ko':
        continue
    url = urlparse(record['sourceUrl'])
    idx = parse_qs(url.query).get('idx', [''])[0]
    by_source[(url.path, idx)] = record['id']
details = json.loads((ROOT / 'dist/business-details-data.js').read_text(encoding='utf8').split('=', 1)[1].rstrip(';\r\n'))
result = {key: {'titleKo': value['ko']['title'], 'titleEn': value['en']['title'], 'recordIds': [], 'sourcePages': []} for key, value in details.items()}
missing = []
for line in args.capture.read_text(encoding='utf8').splitlines():
    page = json.loads(line)
    url = urlparse(page['url'])
    query = parse_qs(url.query)
    tech = query.get('s_addtext2', [''])[0]
    if tech not in result or '/en/' in url.path or '/achieve/' not in url.path or query.get('mode') == ['view']:
        continue
    if page['url'] not in result[tech]['sourcePages']:
        result[tech]['sourcePages'].append(page['url'])
    for link in page['links']:
        target = urlparse(link['url'])
        target_query = parse_qs(target.query)
        if target.path != url.path or target_query.get('mode') != ['view'] or target_query.get('s_addtext2') != [tech]:
            continue
        identity = (target.path, target_query.get('idx', [''])[0])
        if identity not in by_source:
            missing.append(identity)
            continue
        record_id = by_source[identity]
        if record_id not in result[tech]['recordIds']:
            result[tech]['recordIds'].append(record_id)
assert not missing, missing
assert len(result) == 21
payload = {'schemaVersion': 1, 'basis': 'Explicit source-site s_addtext2 links captured 2026-09-20', 'technologies': result}
(ROOT / 'dist/technology-relations.json').write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
print(json.dumps({key: len(value['recordIds']) for key, value in result.items()}))
