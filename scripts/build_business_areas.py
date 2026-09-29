"""Single editorial taxonomy shared by navigation, homepage and business pages."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
media = json.loads((ROOT / 'dist/technology-media.js').read_text(encoding='utf8').split('=', 1)[1].rstrip(';\n'))
editorial = json.loads((ROOT / 'media-source/editorial/manifest.json').read_text(encoding='utf8'))
editorial_by_id = {record['id']: record for record in editorial['records']}
areas = [
    ('ai', '인공지능', 'Artificial intelligence', [61, 59], '영상에서 대상을 식별하고 계측하며 시계열 예측과 자료 복원 기술을 연구합니다', 'We develop AI methods for image detection and measurement as well as time-series forecasting and data restoration', '59', 2, 'contain'),
    ('modelling', '수치모델·예측', 'Numerical modelling', [15, 46, 52, 65], '유역과 하천에서 하구와 해역까지 유동과 수질 및 생태 변화를 수치모델로 분석합니다', 'We model flow and changes in water quality and ecosystems across watersheds and rivers through to estuaries and coastal waters', '46', 1, 'contain'),
    ('satellite', '위성·원격탐사', 'Satellite remote sensing', [56], '위성영상과 초분광 자료를 처리하고 검보정과 환경 분석에 활용합니다', 'We process satellite and hyperspectral imagery for calibration and validation and environmental analysis', '56', 2, 'contain'),
    ('spatial', '공간정보·측량', 'Geospatial surveying', [64, 47, 62], '항공 측량과 GIS 분석으로 지형을 조사하고 공간 이용과 입지 검토를 지원합니다', 'Aerial surveying and GIS analysis support terrain surveys and spatial planning and site assessment', '64', 0, 'contain'),
    ('observation', '관측·조사', 'Observation and surveys', [63, 57], '해양과 하천 및 호소에서 관측을 수행하고 해저 탐사와 관측망 구축·운영을 지원합니다', 'We observe marine and river and lake environments and support seabed surveys and the installation and operation of monitoring networks', '63', 1, 'contain'),
    ('environment', '환경분석·생태', 'Environment and ecology', [48, 84, 50, 51], '수질과 퇴적물 및 생태계를 조사하고 환경영향 평가와 생태 복원에 활용합니다', 'We survey water quality and sediments and ecosystems to support environmental impact assessment and ecological restoration', '84', 0, 'contain'),
    ('hazards', '연안재해·방재', 'Coastal hazards', [53, 54, 55, 58], '해안선 변화와 침식·월파·침수 위험을 분석하고 연안 관리와 방재 대책을 지원합니다', 'We analyse shoreline change and erosion and overtopping and inundation risks to support coastal management and hazard mitigation', '53', 0, 'contain'),
    ('systems', '데이터·시스템', 'Data and systems', [60], '관측자료 수집과 품질관리에서 가시화와 디지털트윈까지 연구·운영 시스템을 개발합니다', 'We develop research and operational systems for observation data collection and quality control through to visualisation and digital twins', '60', 2, 'contain'),
]
out = []
concepts = {
    'ai': ('ai-fish-corrected-native-20260929', '수중 영상의 어류 다섯 개체에 탐지 박스와 형상 마스크를 표시한 AI 분석 콘셉트', 'AI analysis concept with detection boxes and silhouette masks aligned to five fish in underwater imagery'),
    'modelling': ('integrated-water-modeling', '유역과 하구 및 해역의 흐름을 함께 살펴보는 이미지', 'Linked watershed and estuary and coastal flow image'),
    'satellite': ('satellite-optical-native-20260929', '연안과 하구의 광역 위성영상 처리 과정을 표현한 콘셉트 이미지', 'Concept image of coastal satellite-image processing across an estuary'),
    'spatial': ('uav-coastal-native-20260929', '연안 해빈을 드론으로 조사하는 이미지', 'UAV survey of a coastal beach'),
    'observation': ('marine-observation', '해양 현장 관측을 표현한 콘셉트 이미지', 'Concept of field observations at sea'),
    'environment': ('environmental-analysis', '수질 시료 분석과 환경 실험을 표현한 콘셉트 이미지', 'Concept of water sample analysis and environmental testing'),
    'hazards': ('coastal-monitoring-native-20260929', '해빈과 해안 경계의 모니터링을 표현한 설명용 콘셉트', 'Illustrative coastal shoreline monitoring concept'),
}
gallery_records = {
    # These are original GeoSR technical figures. Each is selected by its reviewed source order.
    'ai': [('61', 0)],
    'modelling': [('65', 1)],
    'satellite': [('56', 3)],
    'spatial': [('47', 0), ('62', 0)],
    'observation': [('57', 0)],
    'environment': [('51', 0)],
    'hazards': [('55', 0)],
    'systems': [('60', 0)],
}
gallery_concepts = {
    'spatial': [('marine-use-planning', '항로·어업·보전 구역을 함께 보는 해양 이용 계획 콘셉트', 'Concept of marine use planning across shipping fishing and conservation areas')],
    'observation': [('technology57-seismic-curtain-native-20260929', '천부지층 탄성파 조사와 자료처리 콘셉트', 'Concept of sub-bottom seismic surveying and processing')],
    'environment': [('ecology-survey-wide', '연안 생태 현장 조사 콘셉트', 'Concept of a coastal ecology field survey')],
    'hazards': [('coastal-aerial', '연안 지형과 침식 조사 콘셉트', 'Concept of coastal terrain and erosion surveys')],
}

def source_slide(technology_id, image_index):
    image = media[technology_id]['images'][image_index]
    return {
        'id': f'source-{technology_id}-{image_index + 1}',
        'src': image.get('poster', image['src']),
        'w': image['width'],
        'h': image['height'],
        'ko': image['captionKo'],
        'en': image['captionEn'],
        'kind': 'record',
        'sourceId': media[technology_id]['sourceId'],
        'technologyId': technology_id,
    }

for index, (key, ko, en, ids, body_ko, body_en, tech, image_index, fit) in enumerate(areas):
    picture = media[tech]['images'][image_index]
    out.append({'id': key, 'n': f'{index + 1:02}', 'k': ko, 'e': en, 'ids': ids, 'bodyK': body_ko, 'bodyE': body_en,
                'visual': {'src': picture.get('poster', picture['src']), 'w': picture['width'], 'h': picture['height'], 'ko': picture['captionKo'], 'en': picture['captionEn'], 'fit': fit, 'sourceId': media[tech]['sourceId']}})
    if key in concepts:
        filename, alt_ko, alt_en = concepts[key]
        asset_id = filename.removesuffix('.webp')
        asset = editorial_by_id[asset_id]
        out[-1]['evidence'] = out[-1]['visual']
        out[-1]['visual'] = {'src': asset['web'].replace('dist/', ''), 'w': asset['width'], 'h': asset['height'], 'ko': alt_ko, 'en': alt_en, 'fit': 'cover', 'kind': 'original-concept'}
    elif key == 'systems':
        out[-1]['evidence'] = out[-1]['visual']
        out[-1]['visual'] = {
            'src': 'assets/editorial/data-system-network.svg', 'w': 1672, 'h': 941,
            'ko': '관측 자료가 분석과 활용 시스템으로 이어지는 개념도',
            'en': 'Concept diagram linking observations to analysis and operational systems',
            'fit': 'cover', 'kind': 'original-vector-concept'
        }
    visual = out[-1]['visual']
    gallery = [{
        'id': visual['src'].rsplit('/', 1)[-1].rsplit('.', 1)[0],
        'src': visual['src'], 'w': visual['w'], 'h': visual['h'],
        'ko': visual['ko'], 'en': visual['en'],
        'kind': 'concept' if 'concept' in visual.get('kind', '') else 'record',
        'videoPlanned': 'concept' in visual.get('kind', '') and key in ['modelling', 'satellite', 'spatial', 'observation', 'environment'],
        'sourceId': visual.get('sourceId'),
    }]
    for name, caption_ko, caption_en in gallery_concepts.get(key, []):
        asset = editorial_by_id[name]
        gallery.append({
            'id': name,
            'src': asset['web'].replace('dist/', ''), 'w': asset['width'], 'h': asset['height'],
            'ko': caption_ko, 'en': caption_en, 'kind': 'concept',
        })
    evidence = out[-1].get('evidence')
    if evidence and evidence['src'] != visual['src']:
        gallery.append({
            'id': evidence['src'].rsplit('/', 1)[-1].rsplit('.', 1)[0],
            'src': evidence['src'], 'w': evidence['w'], 'h': evidence['h'],
            'ko': evidence['ko'], 'en': evidence['en'],
            'kind': 'record', 'sourceId': evidence.get('sourceId'),
        })
    gallery.extend(source_slide(technology_id, source_index) for technology_id, source_index in gallery_records.get(key, []))
    # Keep each source image once; the satellite evidence and its gallery record
    # can refer to the same original file.
    unique_gallery = []
    seen_sources = set()
    for slide in gallery:
        if slide['src'] in seen_sources:
            continue
        seen_sources.add(slide['src'])
        unique_gallery.append(slide)
    gallery = unique_gallery
    out[-1]['slides'] = gallery
assert set(sum([a['ids'] for a in out], [])) == set(map(int, media))
(ROOT / 'dist/business-areas.js').write_text('window.GeoSRBusinessAreas=' + json.dumps(out, ensure_ascii=False, indent=2) + ';\n', encoding='utf8')
print(f'{len(out)} areas covering all {len(media)} source technologies')
