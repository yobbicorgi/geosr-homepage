# 국문 기준 영문 자료 연결과 번역 보완

## 확정 대응

`dist/source-record-locales.json`은 국문 원문 ID를 기준으로 기존 영문 808건을 연결한다
사업 406쌍의 제목을 모두 대조했으며 순서가 바뀐 11건을 교정했다
학술 231쌍은 논문 주소와 제목으로 대응시켰다 DOI가 아닌 학회 공통 주소를 공유하는 항목은 제목과 등록 순서를 함께 확인했다
장비 77쌍 중 75쌍은 이미지 원본 바이트도 같으며 DGNSS와 LiDAR 2쌍은 같은 모델의 다른 크기 이미지다
이 매핑은 원문 간 관계이며 기존 영문 번역 품질이 모두 합격했다는 의미가 아니다

## 정확한 차이

| 구분 | 국문 | 기존 영문 | 국문 기준 필요한 보완 |
|---|---:|---:|---|
| 공지 | 333 | 0 | 전체 244346자 |
| 보도 | 51 | 0 | 전체 17399자 |
| 연구 | 82 | 62 | 일대일 원문 대응이 없는 20건 1011자이며 상당수 과제 재등록 포함 |
| 측량장비 | 44 | 42 | 국문에만 2963·2965·2966 3건 338자 및 영문에만 2856 1건 |
| 개인정보 | 1 | 1 | 기존 영문 본문도 국문 243개 한글 문자 |

상세 ID와 원문 해시 및 글자 수는 `locale-source-pairs-20260928.json`을 따른다
연구는 기존 영문 발주처 오류 때문에 82건 모두 국문 기준 새 overlay를 우선한다
영문에만 있는 5503 DR200+ 토탈스테이션은 원문 저장소에 남기고 국문 기준 목록에서는 제외한다
기존 EN 2862 Auto level G32에는 `수준 측량`이 남아 있어 `Leveling survey`로 보완한다

## 기존 사업 영문에서 발견한 실제 오류와 누락

아래는 원문 영문을 고치는 대신 국문 해시를 가진 번역 overlay에 적용할 내용이다

| KO ID / EN ID | 문제 | 권장 표시 제목 |
|---|---|---|
| 668 / 2313 | 평택·보령·대천·비인항이 다른 항구명으로 축약됨 | Detailed hydrographic survey of the port waters of Pyeongtaek Boryeong Daecheon and Biin |
| 747 / 2392 | 진주만을 미국 Pearl Harbor로 오역 | Detailed coastal waters survey near Jinju Bay |
| 1652 / 2570 | 하천·호소를 하구로 오역 | Study on the physical and geochemical characteristics of river and lake sediments (2) |
| 1988 / 2603 | 하천·호소 오역 및 제목 앞 불필요한 닫는 대괄호 | Study on the physical and geochemical characteristics of river and lake sediments (III) — Focus on heavy metal behavior |
| 1623 / 2541 | 2품목을 카메라에 추가된 보조 장비 2개로 오역 | Supply of 2 equipment items including 1 set of underwater marine life monitoring cameras |
| 1634 / 2552 | 천리안 2B를 기상 위성으로 임의 수식 | Research on improving the accuracy of GEO-KOMPSAT-2B products — Development of technology for safe port construction and management |
| 1158 / 2433 | 조사 정점 평가 누락 및 model 잘림 | Evaluation of sanitary survey stations in shellfish production waters and research on pollutant dispersion prediction models |
| 1167 / 2440 | 조파 프로그램을 tidal wave program으로 오역 | Review of wave CFD model applicability and improvement of the wave generation program |
| 1413 / 2496 | 부제 수환경·수생태 모델 연계기능 강화 누락 | Development and applicability assessment of next-generation water quality and aquatic ecosystem prediction models (2) — Strengthening the coupling of water environment and aquatic ecosystem models |
| 607 / 2252 | 신월성을 Wolseong으로 축약 | Fisheries damage assessment for marine construction of Shin-Wolsong Units 1 and 2 |
| 1204 / 2449 | 지정해제 조건 누락 | Marine environmental impact survey of the West Sea EEZ aggregate extraction complex — Following cancellation of the site designation |
| 1205 / 2450 | 지정해제 조건 누락 | Marine environmental impact survey of the South Sea EEZ aggregate extraction complex — Following cancellation of the site designation |
| 758 / 2403 | 5차 지정변경 조건 누락 | Sea area use impact assessment for the fifth revision of the designated South Sea EEZ aggregate extraction complex |
| 1987 / 2602 | 기수생태계 복원 의미 생략 | Water environment monitoring for restoration of the brackish ecosystem of the Nakdong River estuary in 2024 |
| 1989 / 2604 | 기수역을 하구로만 한정 | Study on restoration plans for brackish water areas nationwide |
| 1969 / 2584 | EN 본문이 KIMST 한 줄뿐 | 국문 등록일 2024-12-09와 제목 및 Client 필드로 본문 구조 복원 |

기존 EN 제목의 `28` `29` `31` `62` `68` `136` `183` `292` `307` `363` 같은 순번 오염도 제거가 필요하다
해당 EN ID는 2231·2232·2234·2265·2271·2339·2386·2495·2510·2598이다
사업 원문 406개의 대응이 확인됐더라도 발주처의 영문 기관명과 원문 등록일은 계속 국문 기준으로 대조한다

## 영문 소식

소식 전체 번역은 원문에 해시로 연결된 `dist/source-translations-news.en.json`에 저장 중이다
기계 초벌은 회사 인물의 선임·전임을 selected·former로 해석하는 오류가 있어 직급과 관계를 별도로 교정한다
개인 수상과 법인 인증을 구분하고 칼럼 및 다른 업체의 성과를 GeoSR 연구실적으로 바꾸지 않는다
원문 URL은 번역 요청에서 분리해 바이트 그대로 되돌리며 숫자·금액 변경 의심 항목을 별도로 검수한다

## 학술 영문 저자 목록 생략 확인

원문 EN의 `etc`를 실제 누락 저자 대신 그대로 재사용하면 국문 기준 완전한 번역이 아니므로 KO 저자 필드 전체를 기준으로 표출해야 한다

- KO 1816 → EN 2769: 국문 16명 중 영문은 최경식 이후 생략 — 류종성과 김종성 누락
- KO 1880 → EN 2830: 국문 21명 중 영문은 소재귀 부근에서 생략 — 강동진 김동선 박재형 남성현 조양기 Brian Ward Isaac Ginis 등이 빠짐
- KO 2935 → EN 2934: 국문 18명 중 영문은 홍성진 이후 생략 — 권봉오 장원근 장갑수 김종성 누락

저자명 영문 표기는 임의로 기존 논문과 다른 표기를 만들지 않도록 DOI/원문 출판사 표기를 확인하는 것이 필요하다 원문 records는 변경하지 않는다
