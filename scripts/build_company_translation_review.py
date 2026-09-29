"""Source-bound English company history and current mission from the Korean record."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
records = json.loads((ROOT / 'dist/source-archive.json').read_text(encoding='utf-8'))['records']
ko = next(r for r in records if r['lang'] == 'ko' and r['section'] == 'company' and r['kind'] == 'aboutUs')
en = next(r for r in records if r['lang'] == 'en' and r['section'] == 'company' and r['kind'] == 'aboutUs')

def parse(record):
    end = '목표 및 사명' if record['lang'] == 'ko' else 'Mission & Vision'
    text = record['text'].split('\n2026\n')[1].split('\n' + end)[0]
    result = {}; year = '2026'; month = ''
    for line in text.splitlines():
        if not line.strip():
            continue
        if re.fullmatch(r'(?:19|20)\d{2}', line):
            year = line; month = ''; continue
        match = re.match(r'^(0[1-9]|1[0-2])(.+)$', line)
        if match:
            month, line = match.groups()
        result.setdefault(year, []).append({'month': month, 'title': line.strip()})
    return result

canonical = parse(ko)
translated = parse(en)
# The old English page combined two March 2021 registrations into one event
translated['2021'][5:6] = [
    {'month': '03', 'title': 'Registered for hydrographic surveying under the marine survey and information business category (Korea Hydrographic and Oceanographic Agency)'},
    {'month': '03', 'title': 'Registered for marine observation under the marine survey and information business category (Korea Hydrographic and Oceanographic Agency)'},
]
corrections = {
    ('2025', 2): 'Registered as a marine use impact assessment agency (Pyeongtaek Regional Office of Oceans and Fisheries)',
    ('2022', 0): 'ISO 45001 occupational health and safety management system certification (KQCSA)',
    ('2021', 4): 'Registered for marine information services under the marine survey and information business category (Korea Hydrographic and Oceanographic Agency)',
    ('2021', 7): 'Selected as a training company under the work-study programme (Ministry of Employment and Labor)',
    ('2020', 0): 'Smart marine observation system designated as an innovative procurement product from a venture or startup company (Public Procurement Service)',
    ('2020', 1): 'Selected as a youth-friendly small giant company (Ministry of Employment and Labor)',
    ('2019', 3): 'Added surveying and cadastral engineering to registered engineering specialisations (Korea Engineering and Consulting Association)',
    ('2017', 0): 'Received the marine engineering award at the Korea Oceans and Fisheries Industry Awards',
    ('2016', 1): 'Certified as a promising SME in Gyeonggi Province (Gyeonggi Provincial Government)',
    ('2014', 0): 'Registered as a sea area utilisation impact assessment agency (Pyeongtaek Regional Office of Oceans and Fisheries)',
    ('2011', 1): 'Certified for measurement and analysis capabilities as a marine environmental survey institution (Ministry of Land Transport and Maritime Affairs)',
    ('2010', 0): 'Received the Gyeonggi SME Award (Gyeonggi Provincial Government)',
    ('2009', 0): 'Selected as an outstanding new growth engine company in Korea (Ministry of Knowledge Economy)',
    ('2008', 0): 'Registered as a sea area utilisation impact assessment agency (Pyeongtaek Regional Maritime Affairs and Port Office)',
    ('2008', 1): 'Reported registration as a research and development service business (Ministry of Education Science and Technology)',
    ('2008', 2): 'Updated hydrographic business registration to hydrographic surveying',
    ('2007', 3): 'Registered as a contracted aids-to-navigation management business (Ministry of Maritime Affairs and Fisheries)',
    ('2007', 4): 'Registered as an Inno-Biz company (Small and Medium Business Administration)',
    ('2006', 0): 'Registered a factory (Gunpo City)',
    ('2005', 1): 'Registered as a hydrographic survey business (National Oceanographic Research Institute)',
    ('2004', 2): 'Added port and marine engineering to registered engineering specialisations (Korea Engineering Promotion Association)',
    ('2002', 0): 'Added water resources development to registered engineering specialisations (Korea Engineering Promotion Association)',
    ('2002', 1): 'Designated as a company eligible for alternative military service (Military Manpower Administration)',
    ('2001', 0): 'Added aquaculture to registered engineering specialisations (Korea Engineering Promotion Association)',
    ('2001', 1): 'Registered as a venture company (Gyeonggi Regional Small and Medium Business Administration)',
    ('2000', 0): 'Filed as an engineering business specialising in marine engineering (Korea Engineering Promotion Association)',
    ('2000', 1): 'Filed as a software business (Korea Software Industry Association)',
    ('2000', 2): 'Established the affiliated Water Environment Research Institute',
}
history = []
for year, events in canonical.items():
    assert len(events) == len(translated[year]), year
    for index, event in enumerate(events):
        english = translated[year][index]
        assert event['month'] == english['month'], (year, index)
        history.append({'year': year, 'month': event['month'], 'sourceTitle': event['title'], 'title': corrections.get((year, index), english['title'])})
assert len(history) == 67
result = {
    'schemaVersion': 1,
    'sourceId': ko['id'],
    'sourceTextSha256': ko['sourceTextSha256'],
    'referenceEnglishId': en['id'],
    'reviewStatus': 'source-compared',
    'history': history,
    'principles': {
        'mission': 'A company leading sustainable geosystem solutions for a better life',
        'vision': 'Sustainable Geosystems\nfor a better Life',
        'values': [
            {'title': 'Ethical management', 'text': 'We comply with relevant laws and regulations and act with the interests of the company and the public in mind'},
            {'title': 'Customer satisfaction', 'text': 'We achieve customer satisfaction by ensuring the quality of our results through suitable technology'},
            {'title': 'Continuous innovation', 'text': 'We provide differentiated services through continuous innovation'},
            {'title': 'Pursuit of happiness', 'text': 'We work to improve health safety and quality of life for our employees and their families as well as our customers and partners'},
            {'title': 'Cooperation and communication', 'text': 'We develop our collective intelligence through cooperation and communication'},
            {'title': 'Thrift', 'text': 'We conserve the Earth’s environment by practising thrift and reducing waste in everyday life'},
        ],
    },
    'notes': [
        'Korean chronology is canonical and all 67 events remain separate',
        'Current Korean mission and vision replace the outdated English statements',
        '2026 ICT registration wording follows the published English counterpart because the Korean entry has an abbreviated source label',
        'Historical registrations and awards are dated records and do not establish current validity',
    ],
}
(ROOT / 'dist/company-translations.en.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print('Built 67 source-bound English history events and current mission/vision')
