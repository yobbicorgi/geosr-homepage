"""Build the reviewed technology media catalogue without changing source assets."""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
editorial = json.loads((ROOT/'docs/media/current-image-provenance.json').read_text(encoding='utf8'))
editorial_by_id = {record['id']: record for record in editorial['records']}
spec = {
 '15': ('하구와 하천의 흐름 및 수질 변화를 관측과 모델로 분석합니다', 'We study river and estuary flows and water quality through observations and modelling', 2,
        ['하구의 지형과 계산 영역|Estuary terrain and model domain','하구의 염분과 흐름|Estuarine salinity and circulation','입체 지형과 수리 모의|Terrain and hydrodynamic simulation','수심별 염분과 유속|Salinity and velocity through the water column']),
 '46': ('대기와 유역 및 하천과 해역을 연결해 물환경 변화를 해석합니다', 'We link the atmosphere and watershed with rivers and coastal waters to analyse environmental change', 1,
        ['하구 통합정보시스템|Estuary information system','하구 유동 모의|Estuarine circulation modelling','유역과 하구 및 해역의 연계|Linked watershed and coastal domains','물리·수질·생태 모델의 연결|Coupled physical and ecosystem models']),
 '47': ('해양 이용 현황과 환경 특성을 공간정보로 분석해 이용과 보전 계획을 지원합니다', 'Spatial analysis of marine uses and environmental conditions supports planning and conservation', 0,
        ['해양 이용과 보전의 공간 분포|Spatial distribution of marine uses','해양 용도와 관리 구역|Marine use and management zones','공간분석 자료|Spatial analysis layer','어업활동 분포 분석|Fishing activity analysis']),
 '48': ('개발사업에 따른 해양환경 영향을 조사하고 평가합니다', 'We investigate and assess the marine environmental effects of development projects', 0,
        ['항만과 연안 개발 환경|Port and coastal development','해상풍력과 주변 해역|Offshore wind and coastal waters','항만시설 주변 환경|Waters surrounding port facilities','해저 지형 조사 자료|Seabed survey data']),
 '50': ('하천과 해양의 쓰레기 분포를 조사하고 이동과 확산을 분석합니다', 'We survey debris in rivers and coastal waters and analyse its transport and dispersion', 1,
        ['하천 유입수와 해역의 흐름|River discharge and coastal circulation','부유물 이동과 확산 분석|Floating debris transport analysis',None,None]),
 '51': ('염생식물과 퇴적물을 조사해 연안 생태계 복원과 탄소흡수 연구를 수행합니다', 'We investigate saltmarsh vegetation and sediment for coastal restoration and blue carbon research', 0,
        ['염생식물 시료 채취|Saltmarsh vegetation sampling','방형구를 이용한 식생 조사|Vegetation survey with a quadrat','퇴적물 시료 조사|Sediment sampling','염생식물 생육 실험|Saltmarsh plant growth experiment']),
 '52': ('생태계와 수질의 변화를 모델링하고 적조와 병원성 미생물의 발생 조건을 분석합니다', 'We model ecosystem and water quality changes and study harmful algal blooms and microbial conditions', 0,
        ['비브리오패혈증균 예측시스템|Vibrio forecast system','수질과 미생물 분포 예측|Water quality and microbial distribution',None,None]),
 '53': ('영상과 현장조사 자료로 해안선 변화를 추적하고 침식 원인을 분석합니다', 'Video monitoring and field surveys track shoreline changes and help identify erosion causes', 1,
        ['해빈 지형의 입체 자료|Three dimensional beach survey','해빈과 연안시설 조사|Beach and coastal structure survey','연안 영상관측 카메라|Coastal video monitoring camera','해안선 영상관측 시설|Shoreline monitoring installation']),
 '54': ('연안의 재해 위험과 취약성을 분석해 지역별 대응 계획을 지원합니다', 'We assess coastal hazards and vulnerability to support local response planning', 2,
        ['연안재해 취약성 평가 체계|Coastal vulnerability assessment framework','평가자료 분석과 검증 절차|Assessment and verification workflow','연안재해 취약성 평가시스템|Coastal disaster assessment system',None]),
 '55': ('태풍과 파랑 및 해수면 변화를 반영해 침수와 월파를 예측합니다', 'We model coastal flooding and overtopping under typhoon and wave conditions and changing sea levels', 0,
        ['복합재난 침수예측 화면|Compound coastal flood simulation',None,'구조물 월파 수치모의|Numerical wave overtopping simulation','태풍과 폭풍해일 모의|Typhoon and storm surge simulation']),
 '56': ('위성자료를 처리하고 검보정해 해수온과 수환경 변화를 분석합니다', 'We process and validate satellite data to analyse sea surface temperature and water environments', 2,
        ['위성 해수면 온도 자료 비교|Comparison of satellite sea surface temperature data','천리안 위성 해수면 온도 자료|GEO-KOMPSAT sea surface temperature','해수면 온도 공간 분포|Sea surface temperature distribution','다종 위성 관측영상 비교|Comparison of satellite observations']),
 '57': ('연안과 하천 및 하구의 천부지층 탄성파 자료를 처리해 지층 구조를 분석합니다', 'We process shallow sub-bottom seismic data from coasts, rivers and estuaries to analyse sedimentary structures', 1,
        ['해저 지층탐사 단면|Sub-bottom acoustic profile','지층 반사 신호 분석|Sub-bottom reflection analysis','음향 신호 파형|Acoustic signal waveform','천부지층탐사 자료처리 절차|Sub-bottom data processing workflow']),
 '58': ('카메라 영상을 보정하고 분석해 해빈과 해안선의 변화를 모니터링합니다', 'We correct and analyse camera imagery to monitor beach and shoreline change', 2,
        ['영상과 공간정보의 정합|Image and spatial data registration','입체 영상 보정|Three dimensional image correction','다중 카메라 해빈 영상|Multi-camera beach observations']),
 '59': ('영상에서 수중 생물을 탐지하고 개체 수와 크기를 분석합니다', 'We detect aquatic organisms in imagery and analyse their number and size', 2,
        ['어류 영상 탐지|Fish detection in video','다중 개체 탐지|Detection of multiple fish','개체 식별과 크기 계측|Object identification and size estimation',None]),
 '60': ('관측과 모델 및 위성자료를 수집하고 분석과 활용을 위한 시스템을 구축합니다', 'We integrate observations and model and satellite data into systems for analysis and practical use', 1,
        ['해양수산 데이터 활용 구조|Marine data integration framework','수산과학 빅데이터 플랫폼 구조|Fisheries science data platform','관측 장비와 데이터 수집|Observation equipment and data collection',None]),
 '61': ('영상 분석과 시계열 예측 및 결측자료 복원에 인공지능을 활용합니다', 'We apply AI to image analysis and time series forecasting and the reconstruction of missing data', 1,
        ['해수면 유동의 인공지능 예측|AI prediction of surface currents','조위 관측과 예측 비교|Observed and predicted tidal levels','해양환경 변수의 공간 예측|Spatial prediction of marine variables',None]),
 '62': ('환경과 이용 현황을 분석해 해상풍력 입지 검토를 위한 공간자료를 구축합니다', 'We analyse environmental conditions and marine uses to support offshore wind site assessment', 1,
        ['해상풍력 입지정보 서비스|Offshore wind site information service','입지 검토를 위한 해양 공간자료|Marine spatial data for site assessment','선박항행 분포|Vessel traffic distribution','어업활동 밀도|Fishing activity density']),
 '63': ('무인선에 관측 센서를 결합해 해양과 하천 및 호소를 조사합니다', 'Sensor-equipped uncrewed vessels survey coastal waters and rivers and lakes', 1,
        ['해양 관측 무인선|Uncrewed vessel for marine observation','수환경 조사 무인선|Uncrewed vessel for water environment surveys','무인선 센서 구성|Uncrewed vessel sensor configuration']),
 '64': ('드론 사진측량과 LiDAR로 지형과 시설물의 공간정보를 구축합니다', 'UAV photogrammetry and LiDAR capture terrain and structures as spatial data', 0,
        ['고정익 드론을 이용한 연안 조사|Fixed-wing UAV coastal survey','현장 이착륙 준비|UAV field preparation','회전익 드론 조사|Multirotor survey operation','해안 지형 무인항공 조사|UAV survey of coastal terrain']),
 '65': ('관측자료와 수치모델을 결합해 해류와 수온 및 파랑을 예측합니다', 'We combine observations and numerical models to forecast ocean currents and temperature and waves', 1,
        ['대기 입력자료별 해양모델 비교|Ocean models with different atmospheric forcing','광역 해류와 수온 모의|Regional circulation and temperature simulation','자료동화에 따른 수온 비교|Temperature comparison with data assimilation','해양예측 결과 조회 화면|Ocean forecast results viewer']),
 '84': ('현장 정량조사와 생물 분석으로 수생태계의 상태와 변화를 평가합니다', 'Field surveys and biological analysis assess aquatic ecosystem conditions and change', 0,
        ['방형구 생태 조사|Ecological quadrat survey','조간대 생물 조사|Intertidal biological survey','채집 생물 분류와 분석|Identification and analysis of sampled organisms','갯벌 현장 조사|Tidal flat field survey'])
}

def main():
    inventory = json.loads((ROOT/'docs/company-audit/technology-image-inventory.json').read_text(encoding='utf8'))
    output = {}
    posters = ROOT/'dist/assets/source-records/posters'
    posters.mkdir(exist_ok=True)
    for row in inventory:
        tid = row['technologyId']
        ko, en, hero, captions = spec[tid]
        original = row['detailImages']
        assert len(original) == len(captions), tid
        selected = []
        for i, (asset, caption) in enumerate(zip(original, captions)):
            if caption is None:
                continue
            item = {**asset, 'captionKo': caption.split('|')[0], 'captionEn': caption.split('|')[1], 'sourceImageIndex': i+1}
            src = ROOT/'dist'/asset['src']
            if src.suffix.lower() == '.gif':
                im = Image.open(src)
                item['animated'] = im.n_frames > 1
                # An unchanged GIF frame provides a still preview and reduced-motion fallback
                im.seek(min(im.n_frames-1, im.n_frames//3))
                poster = posters/(src.stem+'.webp')
                im.convert('RGB').save(poster, lossless=True)
                item['poster'] = poster.relative_to(ROOT/'dist').as_posix()
                item['posterFrame'] = im.tell()
            selected.append(item)
        hero_item = next(x for x in selected if x['sourceImageIndex'] == hero+1)
        concept_heroes = {
            '15': ('estuary-modelling.webp', '하구와 연안 수환경을 보여주는 콘셉트 이미지', 'Concept image of an estuary and coastal water environment'),
            '46': ('integrated-water-modeling.webp', '유역·하천·연안 연계 모델 대상 환경 · 콘셉트 이미지', 'Concept image of a linked watershed, river and coastal model environment'),
            '47': ('marine-use-planning.webp', '해양 이용 계획 콘셉트 이미지', 'Concept image of marine use planning'),
            '48': ('marine-impact-assessment.webp', '항만과 연안 개발 환경 영향 검토 콘셉트', 'Concept image for assessing the environmental effects of port and coastal development'),
            '50': ('river-debris-fieldwork-v2.webp', '하구 부유물 조사 콘셉트 이미지', 'Concept image of floating-debris monitoring in an estuary'),
            '51': ('saltmarsh-research.webp', '염생식물과 퇴적물 현장 조사 콘셉트', 'Concept image of saltmarsh vegetation and sediment field research'),
            '53': ('coastal-erosion-monitoring.webp', '연안침식 모니터링 콘셉트 이미지', 'Concept image for coastal erosion monitoring'),
            '55': ('coastal-overtopping.webp', '해안 방호시설에 작용하는 고파랑 콘셉트', 'Concept image of high-wave impact on coastal protection'),
            '56': ('satellite-optical-native-20260929.webp', '연안과 하구의 위성영상 처리 콘셉트', 'Concept of coastal and estuarine satellite-image processing'),
            '57': ('technology57-seismic-curtain-native-20260929.webp', '천부지층 탄성파 탐사와 단면 처리를 표현한 콘셉트 이미지', 'Concept image of sub-bottom seismic surveying and section processing'),
            '58': ('shoreline-video-monitoring.webp', '고정 카메라 기반 해빈·해안선 모니터링 콘셉트', 'Concept image of fixed-camera beach and shoreline monitoring'),
            '60': ('data-system-network.svg', '관측 자료와 분석 시스템의 연결을 표현한 개념도', 'Concept diagram linking observations and analysis systems'),
            '61': ('ai-fish-corrected-native-20260929.webp', '수중 영상의 어류 탐지와 형상 분할 이미지', 'Fish detection and segmentation in underwater imagery'),
            '62': ('marine-wind-siting.webp', '해상풍력 입지 검토 콘셉트', 'Concept image of offshore wind site assessment'),
            '64': ('uav-coastal-native-20260929.webp', '연안 해빈 드론 조사 이미지', 'UAV coastal beach survey image'),
            '65': ('regional-ocean-forecast-v2.webp', '섬 군락과 넓은 외해를 보여주는 해양예측 적용 해역 · 콘셉트 이미지', 'Concept image of open ocean and islands within a regional forecasting domain')
        }
        if tid in concept_heroes:
            # The original technical figures remain in `images`; these independent
            # concepts only open the detail page and must never read as evidence.
            filename, caption_ko, caption_en = concept_heroes[tid]
            asset_id = filename.removesuffix('.webp').removesuffix('.svg')
            asset = editorial_by_id.get(asset_id)
            hero_item = {
                'src': 'assets/editorial/' + filename,
                'width': asset['width'] if asset else 1672,
                'height': asset['height'] if asset else 941,
                'mime': 'image/svg+xml' if filename.endswith('.svg') else 'image/webp',
                'concept': True,
                'captionKo': caption_ko,
                'captionEn': caption_en
            }
        output[tid] = {'summaryKo':ko,'summaryEn':en,'sourceId':row['sourceId'],'hero':hero_item,'images':selected}
    (ROOT/'dist/technology-media.js').write_text('window.GeoSRTechnologyMedia='+json.dumps(output,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf8')
    print(f'Reviewed {len(output)} technologies and selected {sum(len(r["images"]) for r in output.values())} source images')

if __name__ == '__main__':
    main()
