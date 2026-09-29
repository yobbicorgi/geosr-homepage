"""Reviewed English translations of Korean research entries and missing equipment.

Original records are immutable. Exact canonical Korean record IDs and source
hashes bind translations to their source, including separately posted entries.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

TITLES = {
    "하구역 종합관리시스템 개발연구": "Research and development of an integrated estuary management system",
    "연안 이상현상(이상고파, 이안류) 발생원인 규명 및 대응체계 구축": "Identifying the causes of coastal anomalies including abnormal high waves and rip currents and developing a response system",
    "새만금 주변해역 해양환경 및 생태계관리 연구개발": "Research and development for marine environmental and ecosystem management around Saemangeum",
    "해양수치모델링과 지능정보기술을 활용한 해양예측 정확도 향상 연구": "Improving marine forecast accuracy through ocean numerical modelling and intelligent information technology",
    "종합해양과학기지 구축 및 활용연구(2단계)": "Establishment and application of integrated ocean research stations (Phase 2)",
    "Bigdata 분석을 통한 해역별 해양사고 위험도 평가 및 대응지원시스템 구축(유류오염 민감도 기반 위해도 평가 및 방제대응전략 수립)": "Sea-area-specific marine accident risk assessment and response support using big data analysis (oil-spill sensitivity-based risk assessment and response strategy development)",
    "생태계기반 해양공간분석 및 활용기술 개발": "Development of ecosystem-based marine spatial analysis and application technologies",
    "독립전원시스템을 이용한 실시간 장기/광역 해양관측용 드론 개발": "Development of drones with independent power systems for real-time long-term and wide-area marine observation",
    "해안가 복합재난 위험지역 피해저감 기술 개발": "Development of damage reduction technologies for coastal areas exposed to compound hazards",
    "연안침식 관리 및 대응기술 실용화": "Practical application of coastal erosion management and response technologies",
    "트롤피해방지 해저면 계류장치를 이용한 실시간 연속층별 해양환경 감시시스템": "Real-time continuous marine environmental monitoring across water depths using a trawl-resistant seabed mooring system",
    "인공지능기반 위성영상 복원 및 예측기술 개발": "Development of AI-based satellite image restoration and prediction technologies",
    "수중글라이더 핵심부품장비 기술개발 및 운용센터 구축": "Development of underwater glider core components and equipment and establishment of an operations centre",
    "지능형 해양쓰레기 수거지원 기술개발": "Development of intelligent technologies to support marine debris collection",
    "디지털 해상풍력 정보도 개발": "Development of digital offshore wind information maps",
    "항공기상 자동관측기술 개발": "Development of automated aviation weather observation technologies",
    "해양재난 대응을 위한 3차원 해수유동(조류, 해류) 관측기술 개발": "Development of three-dimensional tidal and ocean current observation technologies for marine disaster response",
    "해양위성영상 분석 활용 기술개발": "Development of technologies for analysing and applying ocean satellite imagery",
    "IoT 기반 3차원 수질유량 모니터링 무인 원격 이동체 개발": "Development of an unmanned remotely operated mobile platform for IoT-based three-dimensional water quality and flow monitoring",
    "과학기술 기반 해역이용 영향평가기술개발": "Development of science-based technologies for assessing the impacts of sea area use",
    "방사성물질 해양 확산 평가 코드 개발": "Development of numerical code for assessing the marine dispersion of radioactive substances",
    "선체부착생물 관리 및 평가기술개발": "Development of ship hull biofouling management and assessment technologies",
    "AI기반 해양수색구조 의사결정지원시스템 개발": "Development of an AI-based decision support system for maritime search and rescue",
    "블루카본 기반 기후변화 적응형 해안 조성 기술개발": "Development of blue-carbon-based technologies for climate-adaptive coastal restoration",
    "해양 유해물질 오염원 추적기법 개발": "Development of source tracing methods for hazardous marine pollutants",
    "드론영상 AI 인지 기술 기반 해수욕장 모니터링 및 진단 기술 개발": "Development of beach monitoring and assessment technologies using AI recognition of drone imagery",
    "해양 디지털트윈 구축 및 활용기반 기술 연구": "Research on enabling technologies for the development and use of marine digital twins",
    "맞춤형 해양예측정보 제공을 위한 서비스 플랫폼 개발": "Development of a service platform for tailored marine forecast information",
    "대기-해양 결합 기반 위험기상 예측기술 개발": "Development of hazardous weather prediction technologies based on atmosphere-ocean coupling",
    "4대강 연안하구역 환경, 생태계 모니터링 및 변화 연구": "Environmental and ecosystem monitoring and change assessment in the coastal and estuarine areas of Korea's four major rivers",
    "광역 해양생태계 변동요인 대응·관리를 위한 AI기반 해양생태계 진단 예측 기술개발": "Development of AI-based marine ecosystem assessment and prediction technologies to respond to and manage drivers of large-scale ecosystem change",
    "순환적응형 연안침식 관리기술 개발": "Development of iterative adaptive coastal erosion management technologies",
    "디지털 해상풍력 입지정보도 시스템 확장 구축": "Expansion of the digital offshore wind site information system",
    "심해 잠수사 임무수행을 위한 정보증강 HUD 개발": "Development of an information-augmented head-up display to support deep-sea diver operations",
    "국내 고유종 기반 퇴적물 수생태계 통합 위해성 평가 기술 개발": "Development of integrated sediment and aquatic ecosystem risk assessment technologies based on species native to Korea",
    "상세 해양 기후변화 시나리오 산출기술 개발": "Development of technologies for producing detailed marine climate change scenarios",
    "수량-수질 센서 기반 하천 모니터링 기술 개발": "Development of river monitoring technologies using water quantity and water quality sensors",
    "초음파 및 광학기반 하천 유사량 연속 자동측정 기술개발": "Development of continuous automated river sediment load measurement technologies using ultrasonic and optical methods",
    "수량-수질 센서 기반 하천 통합 모니터링 기술 개발": "Development of integrated river monitoring technologies using water quantity and water quality sensors",
    "고품질 준실시간 해양그리드 데이터서비스 체계 개발": "Development of a high-quality near-real-time gridded marine data service system",
    "해양위험기상 발생 메커니즘 및 예측기술 개발": "Research into the mechanisms of hazardous marine weather and development of prediction technologies",
    "한국형 연안재해 정밀예측 기술개발": "Development of high-resolution coastal hazard prediction technologies for Korea",
    "걸프만 해수온도 상승이 BNPP 최종 열침원 및 운영 전략에 미치는 영향 평가": "Assessment of the effects of rising Gulf sea temperatures on the BNPP ultimate heat sink and operational strategies",
    "침수재난 환경(도시 및 도시 하천 등)에서 요구조자 탐색 및 구조를 위한 유무인 복합운용 수륙양용 장비": "Amphibious equipment for integrated manned and unmanned search and rescue in flood disaster environments including cities and urban rivers",
    "한국형 연안재해 발생요인 예측기술 개발": "Development of technologies to predict the drivers of coastal hazards in Korea",
}

CLIENTS = {
    "국토해양부": "Ministry of Land, Transport and Maritime Affairs",
    "해양수산부": "Ministry of Oceans and Fisheries",
    "해양경찰청": "Korea Coast Guard",
    "행정안전부": "Ministry of the Interior and Safety",
    "산업통상자원부, 방위사업청": "Ministry of Trade, Industry and Energy; Defense Acquisition Program Administration",
    "산업통상자원부": "Ministry of Trade, Industry and Energy",
    "기상청": "Korea Meteorological Administration",
    "환경부": "Ministry of Environment",
    "원자력안전위원회": "Nuclear Safety and Security Commission",
    "중소벤처기업부": "Ministry of SMEs and Startups",
    "해양수산과학기술진흥원": "Korea Institute of Marine Science & Technology Promotion",
    "한국원자력안전재단": "Korea Foundation of Nuclear Safety",
    "한국환경산업기술원": "Korea Environmental Industry & Technology Institute",
    "한국에너지기술평가원": "Korea Institute of Energy Technology Evaluation and Planning",
    "민군협력진흥원": "Institute of Civil-Military Technology Cooperation",
    "한국기상산업기술원": "Korea Meteorological Institute",
    "한국연구재단": "National Research Foundation of Korea",
    "한국산업기술기획평가원": "Korea Planning & Evaluation Institute of Industrial Technology",
}

EQUIPMENT = {
    "1288": ("Manual level", "Manual level (G32)\nMeasurement of benchmark elevations\nPrecise measurement of height differences between two points\nManufacturer: Survey One\nSurvey/analysis: Levelling"),
    "2963": ("Echosounder", "Echosounder (Sonic 2024V multibeam system)\nAcoustic seabed topographic surveying\nAcquisition of backscatter data\nSeafloor coverage mapping\nManufacturer: R2SONIC\nSurvey/analysis: Multibeam bathymetric surveying"),
    "2965": ("Seismic survey set", "Seismic survey set (UHR 48 channel Geo-Sense 1 m streamer)\nUltra-high-resolution seismic surveying\nAnalysis of shallow stratigraphy and estimation of bedrock depth\nDetection of buried and embedded objects beneath the seabed\nInterpretation of stratigraphic boundaries and sedimentary structures\nManufacturer: Geo Marine Survey Systems\nSurvey/analysis: Seismic surveying"),
    "2966": ("Magnetometer", "Magnetometer (G-882TVG SYSTEM)\nMagnetic anomaly surveying\nDetection of buried seabed objects and interpretation of geological structures\nManufacturer: Geometrics\nSurvey/analysis: Magnetic surveying"),
}

PROJECT_CORRECTIONS = {
    "747": ("Detailed coastal survey around Jinju Bay", "Korea Hydrographic and Oceanographic Agency"),
    "668": ("Detailed hydrographic surveys of the waters around Pyeongtaek and Boryeong and Daecheon and Biin ports", "Korea Hydrographic and Oceanographic Agency"),
    "1652": ("Study of the physical and geochemical environmental characteristics of river and lake sediments (2)", "National Institute of Environmental Research"),
    "1988": ("Study of the physical and geochemical environmental characteristics of river and lake sediments (III): Focus on heavy metal behaviour", "National Institute of Environmental Research"),
    "1969": ("Development of iterative adaptive coastal erosion management technologies (Phase 1 Year 2)", "KIMST"),
}

# Full names checked against the publisher article or the authors' NOAA record
PAPER_AUTHORS = {
    "1816": "Kyuwon Hwang, Junghyun Lee, Inha Kwon, Shin Yeong Park, Seo Joon Yoon, Jongmin Lee, Beomgi Kim, Taewoo Kim, Bong-Oh Kwon, Seongjin Hong, Moo Joon Lee, Wenyou Hu, Tieyu Wang, Kyungsik Choi, Jongseong Ryu, Jong Seong Khim",
    "1880": "Sok Kuh Kang, Eun Jin Kim, Sunghun Kim, Joseph Cione, Dongkyu Lee, Sebastian Landwehr, Hyoun-Woo Kang, Kyeong-Ok Kim, Chang Su Hong, Min Ho Kwon, Kyung-Hee Oh, Jae Hak Lee, Suyun Noh, Jae Kwi So, Dong-Jin Kang, Dongseon Kim, Jae-Hyoung Park, SungHyun Nam, Yang Ki Cho, Brian Ward, Isaac Ginis",
    "2935": "Taewoo Kim, Changkeun Lee, Inha Kwon, Junghyun Lee, Shin Yeong Park, Dong-U Kim, Jongmin Lee, Gayoung Jin, Mehdi Yousefzadeh, Hanna Bae, Yeonjae Yoo, Jae-Jin Kim, Junsung Noh, Seongjin Hong, Bong-Oh Kwon, Won Keun Chang, Gap Soo Chang, Jong Seong Khim",
}


def key(text):
    return re.sub(r"\s+", "", text)


def main():
    records = json.loads((ROOT / "dist/source-archive.json").read_text(encoding="utf-8"))["records"]
    title_map = {key(k): v for k, v in TITLES.items()}
    translated = {}
    for record in records:
        if record["lang"] != "ko":
            continue
        numeric_id = record["id"].split("-")[-2]
        if record["kind"] == "research":
            title = title_map[key(record["title"])]
            date = re.search(r"\b20\d\d-\d\d-\d\d\b", record["text"])[0]
            client = record["text"].split("발주처")[-1].strip()
            text = f"{title}\n{date}\nClient\n{CLIENTS[client]}"
        elif record["section"] == "equipment" and numeric_id in EQUIPMENT:
            title, text = EQUIPMENT[numeric_id]
        elif record["kind"] == "projects" and numeric_id in PROJECT_CORRECTIONS:
            title, client = PROJECT_CORRECTIONS[numeric_id]
            date = re.search(r"\b20\d\d-\d\d-\d\d\b", record["text"])[0]
            text = f"{title}\n{date}\nClient\n{client}"
        elif record["kind"] == "publications" and numeric_id in PAPER_AUTHORS:
            title = record["title"].replace("largelatent", "large latent").replace("windconditions", "wind conditions")
            date = re.search(r"\b20\d\d-\d\d-\d\d\b", record["text"])[0]
            year = record["text"].split("발행연도\n")[1].split("\n")[0]
            paper_title = record["text"].split("\n논문\n")[1].split("\n저자\n")[0].replace("largelatent", "large latent").replace("windconditions", "wind conditions")
            journal = record["text"].split("\n학회지\n")[1].split("\n주소\n")[0]
            doi = record["text"].split("\n주소\n")[1].strip()
            text = f"{title}\n{date}\nPublication year\n{year}\nThesis\n{paper_title}\nAuthors\n{PAPER_AUTHORS[numeric_id]}\nJournal\n{journal}\nAddress\n{doi}"
        elif record["kind"] == "privacy":
            title = "Privacy Policy"
            text = """Privacy Policy
Privacy Policy
1. Personal information collected
This website collects the following personal information for website enquiries and service requests
Information collected: Name, contact details and email address
Collection method: Website enquiries and consultations
2. Purposes of collecting and using personal information
This website uses collected personal information for the following purposes
Member management: Identification, handling complaints and other enquiries, and delivering notices
3. Retention and use period
In principle, personal information is destroyed without delay once the purpose of collection and use has been fulfilled
However, the following information is retained for the period stated below on the specified grounds
Retained information: Name, contact details and email address
Basis for retention: Document management regulations
Retention period: 3 years"""
        else:
            continue
        translated[record["id"]] = {
            "sourceTextSha256": record["sourceTextSha256"],
            "title": title, "text": text,
            "reviewStatus": "source-compared",
        }
    output = {"schemaVersion": 1, "sourceLanguage": "ko", "targetLanguage": "en", "records": translated}
    (ROOT / "dist/source-translations.en.json").write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Reviewed English translations: {len(translated)}")


if __name__ == "__main__":
    main()
