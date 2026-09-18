# Flow 저비용 영상 가안 트래커

기준일: 2026-09-18  
범위: 현재 `dist/film-manifest.json`과 `dist` 코드에서 보이는 11개 film slot  
제작 목표: 슬롯별 **Flow low-cost 단일 출력, 무음 5초, 16:9**. 모든 결과는 웹 삽입 전에 사실성·권리·사람 포함 여부를 검토하고 승인한다.

현재 manifest의 모든 슬롯은 `src: null`, `approval: "pending"`이다. 아래 방향은 프롬프트 초안과 검수 기준이며, 미디어 생성·웹 연결을 의미하지 않는다.

공통 프롬프트 제한: 사람·손·얼굴·선박 승무원, 텍스트·로고·UI, 가짜 측정값·분석 결과·범례, 네온 청색 격자와 과장된 데이터 선을 만들지 않는다. 한국 연안·항만·하천 맥락은 확인된 원본이 있을 때만 사용하고, 지명을 새로 만들거나 실제 지형처럼 보이는 합성을 하지 않는다. 위성·지도 레이어는 기관·취득일·좌표·처리 이력이 확인된 경우에만 참조한다.

| 슬롯 / 현재 노출 위치 | manifest 상태 | 현재 코드의 참조 스틸 | Flow 5초 단일 출력 방향 | 삽입 전 검수 게이트 |
|---|---|---|---|---|
| `geosr-hero` · 홈페이지 landscape hero | `loop`, 24초 delivery | 없음. 현재는 fallback film frame이며 `estuary-hero-v4.png`는 hero 코드에서 참조하지 않음 | 해무와 어두운 광물성·해안 표면의 절제된 추상 질감, 느린 깊이 이동, 특정 장소·지도·데이터 의미 없이 GeoSR 환경공학 분위기만 제시 | 실제 장소나 데이터로 읽히지 않는지, 텍스트·로고·사람이 없는지 확인 |
| `expertise-1` · 관측·공간정보 field frame 1 | `scroll`, 6초 delivery | `assets/coastal-survey-source.png` · `source:true` 현장 참고 | 확인된 한국 연안·수로 조사 맥락의 CTD 케이스·측량 폴·부이·삼각대 장비를 정지에 가깝게 보여주고 한 번만 느리게 lateral pan | 장비·장소·권리와 원본 설명을 대조하고, 수치·사람·손·가짜 지형이 없는지 확인 |
| `expertise-2` · 환경·생태 분석 field frame 2 | `scroll`, 6초 delivery | `assets/coastal-survey-source.png` 재사용 · 현재는 concept 처리 | 봉인된 해수 시료병, 플랑크톤 네트, 퇴적물 jar, 현미경 케이스와 작업 트레이를 사람 없이 detail focus; 검출 결과나 종 이미지는 만들지 않음 | 실제 채집·분석 절차와 도구가 맞는지, 시료 라벨·측정값·생물 판정이 없는지 확인 |
| `expertise-3` · 유역·연안 모델링 field frame 3 | `scroll`, 6초 delivery | `assets/coastal-model-v3.png` · concept still, 표면 mesh 표현 포함 | 승인된 하구·연안 원본의 물리적 질감만 사용해 낮은 속도의 depth push; mesh·등치선·경계·예측값·범례를 제거 | 원본 위치·촬영일·권리를 확인하고 모델 결과처럼 보이는 색·선·숫자를 금지 |
| `expertise-4` · 위성·AI 해석 field frame 4 | `scroll`, 6초 delivery | `assets/satellite-layers-v3.png` · concept still, 위성·한반도 레이어 연출 | 새 지리 이미지를 생성하지 말고 승인된 실제 한반도 주변 레이어가 있을 때만 전체 비율로 미세 lateral pan; 분류 마스크·UI·수치를 추가하지 않음 | 기관·취득일·좌표·해상도·처리 이력과 지리 일치를 확인. 현재 concept still은 사실 자료로 사용하지 않음 |
| `business-environment` · business 환경·생태 분석 행 | `sequence`, 6초 delivery, `src:null` | 없음. `route-film-frame`의 제작 준비 fallback | 위 expertise-2와 같은 시료·채집 도구를 더 넓은 연구 트레이 구도로 두고 한 번의 느린 detail focus; 사람·손·결과 화면 없음 | 실제 장비·SOP와 일치하고, 미디어가 없을 때 준비 상태가 유지되는지 확인 |
| `company-overview` · company overview film frame | `sequence`, 6초 delivery, `src:null` | 없음. `route-film-frame`의 제작 준비 fallback | 현장 관측 케이스와 봉인 시료 트레이를 해무 백색·deep navy 공간에 배치하고 field-to-analysis 관계만 짧게 이동; 브랜드 로고·사람·가짜 자료 없음 | 회사가 실제 보유·사용하는 장비인지와 권리를 확인하고 소개 이미지가 사실 주장처럼 보이지 않는지 확인 |
| `ax-discover` · AX Platform Discover 무대 | `sequence`, 6초 delivery | 없음. `platform-preview` fallback | 승인된 관측 장비와 검증된 위성·관측 reference still의 일부만 detail focus; 지도·검색 UI·탐지 결과·텍스트를 새로 만들지 않음 | 실제 캡처 또는 원본의 출처·취득일·대상 정의가 있고, 가안과 실제 화면이 구분되는지 확인 |
| `ax-detect` · 홈페이지 AX in focus Detect 무대 | `sequence`, 6초 delivery | 없음. `ax-reel` fallback; 현재 라벨은 Satellite Facility Detection | 검증된 시설물 관측 reference 한 장면을 전체 비율로 천천히 확대하고 시설물 위치를 임의 표시하지 않음; bounding box·네온 선·수치 없음 | 시설물 분류 근거와 오탐·미탐 범위를 확인하고 실제 플랫폼 UI를 재구성하지 않음 |
| `ax-predict` · 홈페이지 및 AX Predict 무대 | `sequence`, 6초 delivery | 없음. `ax-reel`/`platform-preview` fallback | 승인된 하구·연안 terrain 또는 실제 화면 placeholder에 한 번의 restrained depth move; 침수 경계·위험 등급·시나리오 값·가짜 지도 없음 | 모델 버전·입력 자료·시나리오·검증 기간과 오차 근거가 있을 때만 실제 화면 사용 |
| `ax-monitor` · 홈페이지 및 AX Monitor 무대 | `sequence`, 6초 delivery | 없음. `ax-reel`/`platform-preview` fallback | 부이·해안 관측 장비·시료 용기를 사물 중심으로 lateral pan; 실시간 수치·CCTV 인물·대시보드 UI를 생성하지 않음 | 관측소 ID·센서·변수·기간·권리를 확인하고 임의 실시간 데이터가 없는지 확인 |

검수 통과 전에는 모든 슬롯을 `pending` fallback으로 유지한다. 승인 후에도 실제 자료의 전체 비율을 보존하고 `object-fit: contain` 무대에 연결하며, Flow 가안은 최종 영상이나 분석 결과로 표시하지 않는다.

## 60초 메인 필름 조립 기준

Flow는 현재 10초 결과물 단위로 제작한다. 홈페이지 메인에는 아래 6개 장면을 60초 내외의 하나의 루프로 조립한다. 각 장면의 첫 프레임과 마지막 프레임은 다음 장면의 연결을 고려해 고정하며 모든 가안은 `DRAFT` 상태로만 취급한다.

| 시간 | 장면 | 웹 연결 | 제작 상태 |
|---|---|---|---|
| 00–10초 | 궤도에서 한반도 주변 관측 레이어가 절제되게 펼쳐짐 | hero opening | Flow 가안 01 생성됨 · 아티팩트 재검수 필요 |
| 10–20초 | 다중 관측 장비와 측량 준비 상태를 전면에 둔 현장 장면 | hero field transition | ImageGen concept v1 준비됨 · Flow 가안 제작 전 |
| 20–30초 | 해수·퇴적물·플랑크톤 시료와 분석 도구의 무인 연구 장면 | expertise ecology transition | 다음 제작 |
| 30–40초 | 측량 자료가 모델링 공간으로 깊이 이동하는 공학적 전환 | expertise modelling transition | 다음 제작 |
| 40–50초 | 관측 자료가 AX의 Detect·Predict·Monitor 관점으로 정렬됨 | AX handoff | 다음 제작 |
| 50–60초 | 어두운 해양 표면과 Environmental Intelligence 타이틀 여백으로 귀결 | hero loop return | 다음 제작 |

AX Platform은 별도 30초 내외 필름으로 제작한다. Discover 10초 · Predict 10초 · Monitor 10초의 순서이며 메인 필름의 40–50초 장면은 이 세 장면의 요약 전환으로만 사용한다.

Flow 각 생성은 16:9 · 무음 · 10초 · 1출력으로 제한한다. 최종 Higgsfield 제작 전에는 연결성, 한국 지형 사실성, 장비 사실성, 사람·가짜 데이터·텍스트·로고 부재를 프레임 단위로 검수한다.

## 방향 수정 기록

- `2026-09-18` Flow 연안 항공 장면은 해안 풍경 비중이 높아 `메인 본편 제외`로 분류했다. 생성본은 시간축과 Flow 연결 동작 검증용으로만 남기며 웹에 연결하지 않는다.
- 메인 10–20초는 자연 경관이 아니라 장비 중심 조사 장면으로 교체한다. ImageGen 가안 `dist/assets/film-stills/hero-survey-equipment-concept-v1.png`은 무인 조사 플랫폼, GNSS·CTD 계열 장비, 봉인 시료의 구성을 검토하는 컨셉 가안이다. 실제 GeoSR 보유 장비나 특정 장소의 사진이라는 주장에 사용하지 않는다.

## Flow 가안 검수 기록

| 가안 | 길이 | 결과 | 판정 |
|---|---:|---|---|
| 01 위성 레이어 | 10초 | 궤도 접근과 레이어 순서가 맞음. 4초 부근의 작은 백색 아티팩트와 레이어 경계 흐림 확인 | `보류` · 최종 삽입 금지 |
| 02 연안 항공 | 10초 | 실제 해안선 보존은 양호하나 자연 풍경이 전면에 있어 메인 목적과 불일치 | `제외` · 연결 방식 검증용 |
| 03 장비 중심 조사 | 10초 | GNSS·수질 관측 장비·봉인 시료가 전면에 오고 느린 이동은 맞음. 중간 프레임 오른쪽에 작은 반짝임 아티팩트 확인 | `보류` · 후속 고품질 재제작 기준 |

현재 Flow 가안은 웹 manifest에 연결하지 않는다. 각 결과는 컷 구성과 전환 길이를 검증하는 목적이며 실제 사이트에는 승인된 최종 영상만 `src`로 연결한다.
- `2026-09-18` 메인 20–30초 분석 장면 가안은 `dist/assets/film-stills/hero-sample-analysis-concept-v1.png`으로 준비했다. 봉인 해수 시료, 퇴적물 코어, 플랑크톤 네트, 수질 센서가 보이는 컨셉이며 실제 분석 결과나 특정 GeoSR 장비 사진으로 주장하지 않는다.
