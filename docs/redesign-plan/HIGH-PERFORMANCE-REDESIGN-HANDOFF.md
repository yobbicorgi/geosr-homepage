# GeoSR 홈페이지·필름 재설계 핸드오프

> 2026-09-21 갱신 — 사용자가 현재 디자인의 색상·폰트·배치에 추가 개선을 요청했다
> 이전 웹 구현 완료는 디자인 최종 승인이 아니다
> [데스크톱 개선 기준](../redesign-production/DESKTOP-DESIGN-REVISION-20260921.md)과 저장소 루트 AGENTS.md를 적용한다
> FHD·QHD·UHD의 상대 배치 일관성과 메인의 독립 시각 검수가 이번 변경의 필수 조건이다

> 2026-09-20 최신 지시 — 영상 제작을 제외하고 설계안의 웹 구현과 검수를 완료한다
> [웹 구현 완료 기록](../redesign-production/WEB-COMPLETION-20260920.md)이 현재 화면과 검증 범위의 기준이다
> 홈과 세부 페이지에 콘텐츠별 표현을 적용했고 한글·영문 및 모바일 탐색을 검수했다
> 영상은 제작하지 않았으며 [영상 연결 규격](../redesign-production/VIDEO-DELIVERY-CONTRACT.md)에 따라 이후 승인된 파일을 연결한다
> 과거의 구현 중단 및 모바일 제외 지시는 더 이상 적용하지 않는다

## 현재 작업 위치와 상태

- 저장소: `C:\Users\user\Documents\Codex\Projects\geosr-homepage`
- 브랜치: `redesign/production-2026-09-19`
- 이번 콘텐츠별 표현 구현의 기준 커밋: `f5a098d3462b3f8e05562f4f821c7823db59e8cb` — 최신 작업 결과는 현재 브랜치의 Git HEAD와 완료 기록에서 확인한다
- Downloads junction: `C:\Users\user\Downloads\GeoSR_Homepage` → `C:\Users\user\Documents\Codex\Projects\geosr-homepage`
- 공식 홈페이지: localhost의 [KO](http://127.0.0.1:18102/index.html?lang=ko) · [EN](http://127.0.0.1:18102/index.html?lang=en), LAN의 [KO](http://192.168.6.85:18102/index.html?lang=ko) · [EN](http://192.168.6.85:18102/index.html?lang=en). AX 상세: localhost의 [KO](http://127.0.0.1:18102/ax-platform.html?lang=ko) · [EN](http://127.0.0.1:18102/ax-platform.html?lang=en), LAN의 [KO](http://192.168.6.85:18102/ax-platform.html?lang=ko) · [EN](http://192.168.6.85:18102/ax-platform.html?lang=en). `dist/index.html`이 공식 홈 진입점이고 `redesign-preview.html`은 별도 디자인 미리보기다.
- 최종 60초 회사 영상과 30초 AX 콘셉트 영상은 아직 생성·편집되지 않았다. `ax-*-fast.mp4`는 제품 UI 원본 클립이며 완성 필름을 뜻하지 않는다.
- 이전 handoff의 “새 디자인 보드 세 개를 먼저 만들고 페이지를 다시 구현” 지시는 stale 상태다. 현재 공식 홈 미디어 연결을 보존하고, 우선순위에 따라 콘티와 데스크톱 웹디자인·스크롤 리듬을 다듬은 뒤 제작·검수 단계로 간다.

## 확정된 디자인·브랜드 기준

- 데스크톱 우선으로 구현하고 모바일까지 대응한다 — 실제 검수한 화면 크기는 최신 완료 기록에 남긴다
- 한국의 해양·환경 엔지니어링 기업답고 자연스러운 한글 문장과 자신 있는 톤을 유지한다. 회사의 실제 조사·관측·분석·예측 역량을 자연 환경 사진만으로 대체하지 않는다.
- 메인 기업 필름은 정확히 60초, AX Platform 콘셉트 필름은 별도의 30초다. 두 영상의 목적과 편집은 섞지 않는다. GeoDAP도 AX와 별개의 서비스다.
- 색은 검정, 딥 네이비, 블루그레이, 아이스 블루, 흰색을 중심으로 한다. 연두색, 과한 블루 네온, HUD·격자 장식을 피한다.
- 사람·손·얼굴·다이버, 생성된 글자·로고, 가짜 UI, 가짜 수치·그래프·관측 상태, 가짜 지리와 장소 식별 표현은 금지한다. 생성형 장면은 특정 현장·설치·운용을 증명하는 자료가 아니다.
- 실제 장비는 승인된 GeoSR 원본으로 외형을 확인한다. 공개 게시 이미지의 저작권·파생 사용권은 별도 확인 전까지 미확정이다.
- 검토 지점마다 사용자가 장면, 표현, 모델, 색, 카메라, 타이밍을 수정할 수 있다. 아직 유료 영상 생성에 들어가지 않았다.

## 최신 연출 콘티 v3

[FILM-STORYBOARD-DIRECTOR-v3.md](../redesign-production/FILM-STORYBOARD-DIRECTOR-v3.md)가 60초 회사 필름과 별도 30초 AX 필름의 유일한 story·timecode authority다. 아래 장면 구조와 검수 상태는 v3에 맞춘다. v2와 A/B 문서는 출처·검수 이력 및 선택적 과거 대안으로만 보존하며, A/B 중 사용자 선택은 기본 제작 경로의 blocker가 아니다. v3는 source가 확보되면 대응하는 shot만 교체하고 나머지 구성을 유지한다.

**v3 기계 판독 준비표:** [FILM-GENERATION-READINESS-v3.json](../redesign-production/FILM-GENERATION-READINESS-v3.json) · [검증기](../../scripts/verify_film_readiness_v3.mjs).

## 현재 작업 우선순위

이 순서는 다음 작업을 고르는 기준이며, 어느 단계도 완료됐다고 간주하지 않는다.

1. **회사·AX 콘티:** 회사 60초와 AX 30초의 이야기·장면 목적·시간·전환을 각각 정리하고 검토한다.
2. **데스크톱 전체 화면 영상 중심 웹디자인:** 첫 화면의 100svh 미디어 무대와 교체 가능한 영상/poster slot을 중심으로 공식 홈과 AX 진입을 다듬는다.
3. **스크롤·전환 리듬:** 장면별 메시지와 스크롤 진입·전환·여백의 리듬을 정리한다.
4. **장비 사실성 검수:** 장비 자료는 콘티에 이미 있는 shot의 외형·모델·운용 관계를 확인하는 보조 자료로만 쓴다. **장비 카탈로그 작성이나 장비별 장면 확장은 하지 않는다.** 미확인 사항은 pending으로 남긴다.
5. **ImageGen 키프레임·향후 Higgsfield:** 앞의 콘티와 웹 흐름이 검토된 다음, 기존 shot에 필요한 프레임과 motion prompt를 연결한다. ImageGen은 허용된 배경·공간 표현만 만들고, 유료 Higgsfield 제작은 사용자 결제와 검토 후 메인이 직접 수행한다.

기존 장비 근거·정확성 문서는 4번의 사실 확인 자료로 보존한다. 해당 문서의 목록을 새 페이지나 장면 분량으로 확장하지 않는다.

## 보존된 제작 상태 자료 — v3가 story authority

아래는 현재 단일 콘티인 [v3](../redesign-production/FILM-STORYBOARD-DIRECTOR-v3.md)의 장면·타임코드다. 기존 v2 자료와 readiness JSON은 출처·연출 이력을 보존하지만, 이전 장면 수나 타이밍은 제작 기준으로 사용하지 않는다. 새 source는 해당 shot만 교체하며 회사 필름과 AX 필름은 별도 제작한다.

### 회사 메인 필름 C01–C10

| 장면 | 구간 | 내용과 연결 | 현재 기준 자산 |
| --- | --- | --- | --- |
| C01 | 00–05초 | 지구 등장, 동아시아 축 설정, 마지막 loop 기준과 같은 시작 프레임. | [Earth 시작·loop 프레임](../../dist/assets/concepts/corporate-film/hero-earth-00s-v4.png) |
| C02 | 05–09초 | 지구 관측 위성 진입. 위성은 생성 concept이며 특정 실제 임무나 기체가 아니다. | [위성 콘셉트 프레임](../../dist/assets/concepts/corporate-film/hero-earth-satellite-07s-v4.png) |
| C03 | 09–14초 | 결정적 NASA 기반 지리 frame으로 한반도·북서태평양에 접근. | [접근 frame 자료](../../dist/assets/concepts/corporate-film/hero-earth-10s-v1.png), [C04 source 기록](../redesign-production/keyframes/corporate-film-data-layers-crossfade-v1.md). 해안선은 생성·왜곡하지 않는다. |
| C04 | 14–24초 | SST → salinity → chlorophyll 2D 관측 plate를 한 장씩 전환하고 연안으로 이동. | [SST](../../dist/assets/concepts/corporate-film/hero-earth-22s-a-sst-v1.png) → [Aquarius salinity](../../dist/assets/concepts/corporate-film/hero-earth-22s-b-salinity-v1.png) → [MODIS chlorophyll-a](../../dist/assets/concepts/corporate-film/hero-earth-22s-c-chlorophyll-v1.png). 겹쳐 쌓지 않는다. |
| C05 | 24–30초 | main-reviewed 비식별 concept background로 연안 공간 전환을 만든다. | 선택 배경: [c05-coast-end-v1.png](../../dist/assets/concepts/corporate-film-v3/c05-coast-end-v1.png). 실제 GeoSR 현장·한국 항만 증거가 아니다. 선택적 해누리호 또는 USV insert는 권리와 원본 픽셀/비율 확인 뒤 한 종류만 사용한다. |
| C06 | 30–34초 | main-reviewed concept pair로 수면에서 수중으로 전환한다. | 선택 frame: [c06-waterline-start-v1.png](../../dist/assets/concepts/corporate-film-v3/c06-waterline-start-v1.png) → [c06-underwater-end-v1.png](../../dist/assets/concepts/corporate-film-v3/c06-underwater-end-v1.png). 실제 GeoSR 배치 증거가 아니다. 선택적 BlueROV2 insert는 권리와 원본 픽셀/비율 확인 뒤 사용하고, 센서·계류선과 한 설치로 주장하지 않는다. |
| C07 | 34–40초 | main-approved 실험실 concept에서 분석 연결로 이동한다. | 선택 frame: [analysis-lab-v1.webp](../../dist/assets/analysis-lab-v1.webp). 실제 GeoSR 시설·장비·시료·결과 근거가 아니다. Concept disclosure와 slow-push/focus QA를 유지한다. |
| C08 | 40–46초 | 짧은 타이포그래피로 분석을 예측·의사결정 지원에 연결. | 편집 단계의 navy slate와 검수된 문구. fake UI/data 없음. |
| C09 | 46–55.5초 | Discover → Predict → Monitor 후보 화면을 약 3초씩 독립된 full-frame으로 순차 제시한다. | [Discover](../../dist/assets/films/ax-discover-fast.mp4) → [Predict](../../dist/assets/films/ax-predict-fast.mp4) → [Monitor](../../dist/assets/films/ax-monitor-fast.mp4). 로컬 clip은 이미 존재하지만 이 작업에서 새로 캡처한 자료가 아니며, live URL·촬영 시점·제품 버전·공개 사용 권리는 미확인이다. 출처를 검증한 뒤 원본 UI pixels와 16:9 비율을 그대로 사용하고, 검증 전에는 최종 증거 컷으로 취급하지 않는다. |
| C10 | 55.5–60초 | 첫 지구 frame으로 돌아와 exact loop. | [Earth loop frame](../../dist/assets/concepts/corporate-film/hero-earth-00s-v4.png). C01과 지리·crop·grade를 일치시킨다. |

C05·C06의 main-reviewed background concept plates는 선택 상태이며 실제 현장 evidence가 아니다. 선택적 장비 이미지는 scene 중심이 아니며 한 shot에서 최대 하나만 짧게 사용하고, 권리와 가로세로 비율·원본 픽셀 보존을 확인한다. ImageGen은 장비를 새로 그리거나 복구·변형하지 않는다. source cutout이 깔끔하지 않으면 원본 전체 이미지를 유지한 짧은 insert로 바꾸거나 생략한다. 장비 자료와 권리 한계는 [equipment manifest](../redesign-production/equipment-source-manifest.md)와 [source pack](../redesign-production/equipment-sources/README.md)에 따른다. C05의 해누리호 외 별도 모델, USV 이미지별 모델·탑재체 및 C06의 현장·운용 배치 주장은 미확인이다.

## C04 NASA 자료의 정확성과 한계

세 C04 판은 NASA GIBS 자료와 같은 지리 배경을 사용한 단일 레이어 참고다. 사용 요청은 2012-08-01, WMS 1.1.1, EPSG:4326, BBOX `90,15,166,57.75`, 2560×1440이다. 바탕은 NASA Blue Marble Next Generation이며, 관측 결측은 그 바탕으로 보인다. 결측을 관측값으로 채우지 않는다.

- SST와 Aquarius 해수면 염분은 월별 제품이고 MODIS Aqua chlorophyll-a는 일별 swath다. 같은 날짜로 요청했어도 동시 관측을 뜻하지 않는다.
- chlorophyll의 구름·궤도 결측은 비관측 범위로 남긴다.
- Aquarius 원자료는 거친 공간 해상도다. 색 표시의 bilinear 처리본은 시각화 처리일 뿐 측정을 보간하거나 해상도를 높이지 않는다.
- 메인 검토는 단일 plate 자료 참고와 교차 전환 방향을 승인했다. 동시에 세 판이 떠 있는 최종 이미지나 영상으로 사용하지 않는다.
- 자세한 출처·해시·결측 규칙은 [C04 단일 레이어 교차 전환 기록](../redesign-production/keyframes/corporate-film-data-layers-crossfade-v1.md)을 따른다.

## 이전 C05–C08 composition-study 장비 정확성 기록

- 아래 C05–C08 표는 과거 composition-study prompt ID와 fidelity 판단을 기록한다. 장면 배치와 timecode는 v3 authority를 따르며, 이 표를 현재 shot map으로 사용하지 않는다.
- Generated still files were discarded from the repository; their SHA-256 provenance remains in the shot prompt records.

| 장면 | 자산 / prompt 기록 | 확인된 근거와 제한 | 검토 상태 |
| --- | --- | --- | --- |
| C05 | The C05 composition study was discarded from the repository; its SHA-256 remains in the C05 prompt record · [프롬프트 기록](../redesign-production/imagegen-prompts/corporate-film-c05-v1.md) | 공식 해누리호는 19톤으로 표기된다. USV 페이지는 usvCom, USV20S, catamaran GIF를 직접 노출하지만 각 이미지의 모델·사양은 확인되지 않는다. usv-source.jpg는 USV20S 장면의 crop/resize처럼 보이나 계보와 모델은 미확인. study는 공식 source pixels를 보존하지 않았고 해누리호도 재그림했다. | final equipment fidelity 거절. 근거는 [equipment source pack](../redesign-production/equipment-sources/README.md)과 [manifest](../redesign-production/equipment-sources/manifest.json). |
| C06 | The C06 composition study was discarded from the repository; its SHA-256 remains in the C06 prompt record · [프롬프트 기록](../redesign-production/imagegen-prompts/corporate-film-c06-v1.md) | FireFly6 VTOL과 LiDAR 제품명은 확인되지만 생성된 기체는 원본 사진을 보존하지 않은 재그림이며 정확한 기하·부품 배치는 확정할 수 없다. 특정 FireFly6/LiDAR 페어링 근거도 없다. | 거절: clean base 여부와 무관하게 최종 장비 스틸로 사용 금지. |
| C07 | The C07 composition study was discarded from the repository; its SHA-256 remains in the C07 prompt record · [프롬프트 기록](../redesign-production/imagegen-prompts/corporate-film-c07-v1.md) | 사람 없는 공식 부이·계류 사진이 없고 TPRBM도 미확인이다. 생성된 float, solar panel, mast, cable 및 sensor housings는 실제 장비 원본과 비교할 근거가 없다. | 실제 장비 장면으로 사용 금지. 명확한 일반 과정 삽화로 표시할 때만 별도 검토 가능. |
| C08 | The C08 composition study was discarded from the repository; its SHA-256 remains in the C08 prompt record · [프롬프트·출처·검수 기록](../redesign-production/imagegen-prompts/corporate-film-c08-v1.md) | BlueROV2와 RBR Solo-TU 공식 항목은 각각 확인되지만, 공식 ROV 이미지는 Heavy 8-thruster 배치를 증명하지 않으며 센서가 특정 계류선에 붙었다는 자료도 없다. 생성 그림은 이들을 한 설치처럼 배치했다. | 거절: ROV·센서 같은 실제 배치로 합성 금지. 증거 전에는 독립된 제품 컷만 허용. |

전체 공식 URL, 모델 표기, 로컬 매칭, 권리 한계는 [장비 근거 감사](../redesign-production/equipment-source-manifest.md)에 있다. 자세한 원본 보존과 재제작 조건은 [C05–C08 장비 정확성 gate](../redesign-production/EQUIPMENT-ACCURACY-GATE.md)를 따른다.

## v3의 C09·C10 및 실제 제품 화면

- C07의 `analysis-lab-v1.webp`는 main-approved generated lab concept다. 실제 GeoSR 연구실 주장을 하지 않고 concept disclosure를 유지하며 slow-push/focus motion을 검수한다.
- C09는 검증된 Discover·Predict·Monitor source clip이 있을 때만 각 약 3초씩 독립적인 16:9 full-frame 컷으로 차례대로 보여준다. 현재 로컬 clip은 재사용 후보이며 새 live capture가 아니다. capture URL·제품 버전·촬영 시점·공개 권리를 확인하기 전에는 화면을 검증된 제품 증거라고 부르지 않고, 검증이 끝나지 않으면 C09는 16:9 준비 화면으로 둔다. 동시 화면·picture-in-picture·가짜 workflow는 금지한다. C10은 55.5–60초 Earth frame으로 돌아가 C01과 정확히 loop한다.
- 자세한 구간·전환·검수 기준은 [C09–C10 제작 기록](../redesign-production/imagegen-prompts/corporate-film-c09-c10-v1.md)과 [keyframe production package](../redesign-production/KEYFRAME-PRODUCTION-PACKAGE.md)을 따른다.

### AX Platform 별도 30초 콘티 A01–A05

AX는 회사 필름과 분리된 제품 콘셉트 흐름이다. 입력 자료 → Detect → Predict → Monitor의 개념 장면 사이에 출처·제품 버전·사용 권리를 검증한 16:9 화면을 기능별 약 3초씩 넣고, 마지막에 Overview로 인계한다. 현재 로컬 포스터와 clip은 새로 캡처한 자료가 아니며 출처를 확인하기 전까지 대표 미리보기/재사용 후보로만 취급한다. Satellite Facility Detect의 검증된 캡처는 아직 없으므로 화면을 꾸며 채우지 않고 16:9 준비 상태로 둔다. 실제 화면은 ImageGen으로 만들지 않는다.

| 샷 | 구간 | 구성 기준 |
| --- | --- | --- |
| A01 | 00–07초 | 입력 종류를 추상 재료와 공간 전환으로 표현한다. 실제 데이터/UI처럼 보이지 않게 한다. |
| A02 | 07–14초 | Detect 개념 뒤, live source·버전·권리를 확인한 Discover 화면이 확보되면 약 3초 연결한다. 미확보 상태에서는 16:9 준비 화면을 유지한다. |
| A03 | 14–21초 | Predict 개념 뒤 검증된 화면을 약 3초 연결한다. 기존 poster/clip은 미리보기·재사용 후보이며 검증 전에는 제품 증거로 부르지 않는다. |
| A04 | 21–28초 | Monitor 개념 뒤 검증된 화면을 약 3초 연결한다. 기존 poster/clip은 미리보기·재사용 후보이며 검증 전에는 제품 증거로 부르지 않는다. |
| A05 | 28–30초 | 출처가 확인된 Overview 화면이 확보되면 짧게 인계한다. 검증 전에는 기존 poster/frame을 실제 화면이라고 표기하지 않는다. |

[AX A01–A06 ImageGen/Higgsfield 준비 문서](../redesign-production/imagegen-prompts/ax-concept-film-a01-a06-v1.md)는 이전 상세 shot 기록으로 보존한다. 현재 구조와 타이밍은 v3 콘티를 따른다. ImageGen은 화면 바깥의 배경·공간 분위기만 만든다. 지도, 실제 데이터, 지형, UI·문자·마커를 생성하거나 원본 UI pixels를 덮지 않는다.

## 현재 웹 구현과 필름 슬롯

- 공식 홈페이지는 [index.html](../../dist/index.html)이 진입점이며 [home.js](../../dist/home.js)와 [cinematic.css](../../dist/cinematic.css)가 콘텐츠와 화면을 구성한다. Home story는 승인된 다섯 단계 `OBSERVE → ANALYZE → MODEL → PREDICT → DELIVER`다. 앞선 네 장면 `Observation → Interpretation → Prediction → Action`은 이전 버전이며 더 이상 story authority가 아니다. 현재 media slot에는 Earth poster, lab concept, satellite-layer concept, coastal-model concept, 마지막 타이포그래피 장면이 연결돼 있다. 마지막 세 개의 concept 이미지는 실측·예측 결과나 검증 지리 자료가 아니며 페이지에서도 개념 표현으로 고지한다.
- 홈의 첫 화면은 사용자가 승인한 `Geo Data Intelligence` 정체성, Earth poster와 제작 준비 상태를 유지한다. 이 제목은 디자인 방향 문서의 이전 유사성 우려를 supersede한다. hero typography는 1920/2560 데스크톱에서 Earth 시각물의 주도권을 남기도록 축소했다.
- AX 소개에서 Detect/위성 시설물은 검증 가능한 16:9 캡처가 없어 이미지 없이 준비 상태로 표시한다. Predict/Flood3D 및 Monitor/Buoy poster는 이 작업에서 새로 촬영·캡처된 자료가 아니다. 출처, 제품 버전, 공개 권리가 확인되지 않은 대표 미리보기로만 표시하고 검토 상태를 붙인다. 기존 16:9 포스터를 실제 제품 화면으로 부르지 않는다. AX 플랫폼 캡처 상세는 [source inventory](../redesign-production/SOURCE-INVENTORY.md)를 참고한다.
- 공식 홈의 첫 메인 필름은 전체 화면 100vh/100svh hero slot이다. 최종 영상은 아직 pending이며 KO `메인 필름 제작 준비 중` / EN `Main film in preparation` 상태를 유지한다. hero Earth poster와 아래 다섯 단계의 media slot은 poster/source 연결 지점이며 실제 영상이나 분석 결과를 뜻하지 않는다.
- [메인 디자인 미리보기 HTML](../../dist/redesign-preview.html)은 별도 가안으로 보존한다. 공식 홈페이지의 현재 미디어와 라우팅 기준은 `index.html` 및 해당 renderer다. 내용을 복제해 별도 아키텍처를 만들거나 공식 연결을 미리보기 쪽으로 되돌리지 않는다.
- 메인 페이지의 AX 콘셉트 필름은 제품 미리보기보다 먼저 오는 16:9 full-width pending slot이다. KO `영상 제작 준비 중` 상태를 유지한다. 기능 탭의 Discover는 16:9 준비 상태이며 Predict/Monitor의 기존 16:9 poster는 출처·버전·공개 권리를 검토 중인 대표 미리보기다.
- [AX 상세 페이지 shell](../../dist/ax-platform.html)은 콘텐츠를 [ax-v2.js](../../dist/ax-v2.js)가 렌더한다. 상단에는 100svh AX concept-film slot과 `AX CONCEPT FILM · 영상 제작 준비 중` 상태가 있고, 그 아래에는 Discover 준비 상태 및 Predict/Monitor 대표 미리보기와 3열 원리 소개가 이어진다. 이 자료는 새로 캡처한 실제 제품 화면으로 표기하지 않는다.
- AX A01 hero의 현재 임시 poster는 dist/assets/concepts/ax-platform-v4/ax-data-planes-start-v1.png다. [v4 pair 생성·검수 로그](../redesign-production/keyframes-v3/AX-DATA-PLANES-IMAGEGEN-LOG.md)를 참고한다. film manifest는 src=null, approval=pending, duration=30을 유지하므로 poster 연결은 final film 승인과 다르며 실제 data/UI 결과를 나타내지 않는다.
- 이 상태 문구는 최종 승인 영상이 연결되고 로딩 확인되기 전까지 유지한다. 이미 존재하는 포스터나 AX fast clips를 완성 콘셉트 영상으로 표시하지 않는다.
- 현재 미리보기 200 응답은 서버 연결만 확인한 것이다. 최종 업데이트 후 아래 QA를 다시 수행한다.
- [웹 구현·자산 완료도 감사](../redesign-production/WEB-COMPLETION-AUDIT-v1.md)는 현재 구현 상태와 남은 검증 항목의 인계 자료다.
- 공용 renderer는 공식 호스트 `https://www.geosr.com`을 canonical 및 `og:url`로 생성한다. 실제 배포에서 route·언어별 URL이 의도한 페이지를 제공하는지 확인한다. crop-safe 비율과 공개 권리를 확인한 공유 자산은 아직 없어 `og:image`/`twitter:image`는 지정하지 않는다.

## 다음 제작 순서와 사용자 검토 checkpoint

**키프레임 상태:** [AX v4 pair 생성·검수 로그](../redesign-production/keyframes-v3/AX-DATA-PLANES-IMAGEGEN-LOG.md)가 현재 A01 start/end 및 웹 poster 기준이다. 기존 droplets/mist/points A01 v3 pair는 superseded 처리하고 active selection에서 제외했으며, 원본은 keyframes-v2 기록에서 역사 provenance로만 보존한다. C02 위성 cutout과 C03 결정론적 NASA frame 상태는 v2 generation log를 따른다.

**영상 생성 준비도:** [현재 기계 판독 v3](../redesign-production/FILM-GENERATION-READINESS-v3.json)는 `generationReady=true`, `remainingPreGenerationGates=[]`다. 선택 프레임·source 경로와 15개 shot의 시간 연속성 검증이 완료되어 회사 60초와 AX 30초 영상 생성을 시작할 수 있다. 이는 최종 영상 생성·편집이나 공개 승인을 뜻하지 않는다. `releaseReady=false`, `productionReady=false`이며 post-generation gates에는 최종 motion/edit, 공개 source 권리·개인정보, film-manifest wiring 및 배포가 남아 있다. C05/C06 concept 배경과 C07 lab still은 main-reviewed selected 상태다. 선택 장비 권리는 실제 insert에 쓸 때만 확인하며 불확실하면 배경 경로를 유지한다. [v1 문서](../redesign-production/FILM-GENERATION-READINESS-v1.md)와 [v1 JSON](../redesign-production/FILM-GENERATION-READINESS-v1.json)은 과거 기록이다.

**Legacy fallback reference:** [Corporate film fallback A/B](../redesign-production/CORPORATE-FILM-FALLBACK-A-B-v1.md) · [기계 판독 JSON](../redesign-production/CORPORATE-FILM-FALLBACK-A-B-v1.json)은 선택 가능한 과거 대안 기록이다. v3가 기본 제작 경로이며 A/B user choice는 진행 blocker가 아니다.

1. 회사 60초와 AX 30초 콘티의 이야기·장면 목적·시간·전환을 별도로 검토한다. 사용자는 이 단계에서 장면과 표현을 수정할 수 있다.
2. 공식 홈과 AX의 데스크톱 전체 화면 미디어 구성을 검토한다. hero는 100svh를 유지하고 영상·poster 슬롯, 제목, pending 상태를 분리한다. 공식 홈의 현재 이미지 경로와 `data-media-poster` 연결은 보존한다.
3. 스크롤에 따른 장면 진입, 미디어 전환, 타이포 reveal, 섹션 간 여백과 속도를 조정한다. 각 화면에서 한 가지 메시지가 먼저 읽히는지 사용자가 검토한다.
4. 장비는 이미 정해진 shot의 외형·모델·운용 사실만 확인한다. 새 장비 카탈로그를 만들거나 장비별 shot을 추가하지 않는다. 근거가 없으면 해당 부분을 pending으로 남기고 장면을 확장해 채우지 않는다.
5. 앞선 콘티와 웹 연출을 검토한 뒤에만 필요한 기존 shot의 start/end frame 및 motion prompt를 준비한다. ImageGen은 허용된 배경·공간 콘셉트에 한정한다. 시작/끝 프레임과 매치컷 계획은 다음 단계 전에 사용자에게 보여준다.
6. Higgsfield 유료 생성은 사용자가 결제하고 프레임·모션을 검토한 뒤 진행한다. **메인이 직접 제작**하며 두 필름을 분리해 순서대로 만든다. 스킬이나 agent에 생성 실행을 위임하지 않는다.
7. rough cut을 사용자에게 보여주고 회사 60초와 AX 30초를 각기 검토한다. C04 자료의 정확성, C09 source URL·제품 버전·권리·16:9 비율·개인정보, C10 Earth loop를 확인한다. 화면 출처를 확인하지 못하면 해당 증거 컷은 준비 상태로 남긴다. 사용자는 매 checkpoint에서 수정하거나 보류할 수 있다.
8. 최종 영상 연결 뒤 KO/EN, pending label 전환, 키보드·탭, 저모션, 링크, 자산 경로, desktop 폭과 console/network를 검수한다. 전체 QA를 통과하면 허가된 작업 브랜치에 commit/push하고, 원격 동기화와 clean state를 재검증한다.

## 최종 QA 체크리스트

- 1440, 1920, 2560 데스크톱 폭 및 1920×1080 FHD에서 메인/AX 상세 시각 검수. hero가 첫 viewport 전체를 차지하고 뒤 섹션이 미리 보이지 않는지 확인한다.
- C04 배경 지리·결측·층 순서 및 영상 60초 → 00초 완전 일치; C09는 검증된 UI만 순차 컷으로 사용하고 미검증이면 16:9 준비 상태 유지; C10 Earth loop; AX A05 Overview는 출처 확인 뒤 아래 Discover로 연결.
- 브라우저 콘솔 오류 0, 이미지/영상 broken reference 0, 영상 로딩/정지 포스터 fallback 확인.
- `git diff --check`, 수정 JavaScript `node --check`, KO/EN 전환, keyboard tab semantics/focus, prefers-reduced-motion 확인.
- diff와 QA 결과를 main review에 공유한다. 필수 QA 통과 후 허가된 작업 브랜치에 commit/push한다.
- 웹 메타데이터·접근성 QA: [감사 문서](../redesign-production/WEB-METADATA-ACCESSIBILITY-AUDIT-v1.md), [검증 스크립트](../../scripts/verify_metadata_accessibility.mjs).

## 거절된 표현 — 다시 사용하지 않음

- 과거 C05–C08 장비 composition-study stills는 equipment fidelity 불합격으로 삭제했다. 이 과거 후보 기록은 현재 main-reviewed C05/C06 background concept plates와 별개다. SHA-256 provenance는 각 prompt 기록에 남겼고, 삭제된 장비 study를 final equipment asset으로 사용하지 않는다.

- C04의 SST·염분·chlorophyll 동시 적층 프레임. 한 장씩 교차 전환한다.
- C05 composition study는 USV 색상·선체 형태가 공식 자료와 모순이라서가 아니라, 공식 source pixels와 확인된 모델·탑재체를 보존하지 않았고 해누리호도 재그림했기 때문에 final fidelity에서 거절됐다.
- C06의 이미지에 구워 넣은(mesh/point-cloud) 삼각 스캔 오버레이. clean base에도 장비 fidelity 승인은 부여되지 않았으며 원본 기체 cutout부터 다시 제작한다.

## 보존된 참고 문서

- [최신 필름 연출 콘티 v3 — 60초 회사 + 별도 30초 AX](../redesign-production/FILM-STORYBOARD-DIRECTOR-v3.md)
- [Keyframe production package — C01–C10, A01–A06, 거절 기준](../redesign-production/KEYFRAME-PRODUCTION-PACKAGE.md)
- [ImageGen keyframe v2 — conditional selections and rejected-history summary](../redesign-production/keyframes-v2/KEYFRAME-GENERATION-LOG-v2.md)
- [Film generation readiness v1 — scene sources, motion drafts and gates](../redesign-production/FILM-GENERATION-READINESS-v1.md) · [JSON](../redesign-production/FILM-GENERATION-READINESS-v1.json)
- [C01–C02 selected orbital reference and source record](../redesign-production/imagegen-prompts/corporate-film-opening-v4.md)
- [C09 lab still prompt and main-approved candidate](../redesign-production/imagegen-prompts/homepage-lab-equipment-v1.md)
- [Film slot implementation brief](FILM-SLOT-PRODUCTION-BRIEF.md)
- [장비 출처·모델·사용권 감사](../redesign-production/equipment-source-manifest.md)
- [equipment source pack README](../redesign-production/equipment-sources/README.md) · [manifest](../redesign-production/equipment-sources/manifest.json)
- [C05–C08 장비 정확성 gate](../redesign-production/EQUIPMENT-ACCURACY-GATE.md)
- 아래 C05–C08 표는 과거 composition-study prompt ID와 fidelity 판단을 기록한다. 장면 배치와 timecode는 v3 authority를 따르며, 이 표를 현재 shot map으로 사용하지 않는다.
- Generated still files were discarded from the repository; their SHA-256 provenance remains in the shot prompt records.
- [C04 NASA crossfade 근거와 한계](../redesign-production/keyframes/corporate-film-data-layers-crossfade-v1.md)
- [C05](../redesign-production/imagegen-prompts/corporate-film-c05-v1.md) · [C06](../redesign-production/imagegen-prompts/corporate-film-c06-v1.md) · [C07](../redesign-production/imagegen-prompts/corporate-film-c07-v1.md) · [C08](../redesign-production/imagegen-prompts/corporate-film-c08-v1.md) prompt/source/review records
- [C09–C10 sequence and loop](../redesign-production/imagegen-prompts/corporate-film-c09-c10-v1.md)
- [AX A01–A06 ImageGen/Higgsfield preparation](../redesign-production/imagegen-prompts/ax-concept-film-a01-a06-v1.md)
- Previous analysis and execution notes are preserved in [MASTER-REDESIGN-ANALYSIS.md](MASTER-REDESIGN-ANALYSIS.md) and [EXECUTION-PLAN-2026-09-19.md](EXECUTION-PLAN-2026-09-19.md). They are background only where they conflict with this current handoff.

## 2026-09-20 구현 상태

8개 KO/EN route를 업데이트하고 공용 nav, research/news 상태 행, company 자격문서 rail, equipment 분류 탐색, contact 위치/문의 preview를 정리했다. 인증서 03/04는 얼굴 이미지 대신 검토 중 slate다. USV 원본 사진은 equipment의 ‘무인선 이용 관측’에만 사용하고 모델명을 추정하지 않는다.

44개 viewport 상태 QA(1920 KO/EN, 390 KO, 768 KO, 2560 KO, English mobile 3개, reduced motion)를 완료했다. route/metadata 검사, 로컬 참조 2xx, 이미지·fragment·console·overflow 점검과 모바일 drawer keyboard 동작이 통과했다. 검수 캡처는 C:\Users\user\AppData\Local\Temp\geosr-fullsite-final에 KO desktop 8장과 mobile 8장(01-index부터 08-contact, 각 1920×1080/390×844)이다.

영상 drop-in 경로(dist 기준): assets/films/geosr-hero.mp4, expertise-observation.mp4, expertise-environment.mp4, expertise-modelling.mp4, expertise-satellite.mp4, business-environment.mp4, company-overview.mp4, ax-discover.mp4, ax-detect.mp4, ax-predict.mp4, ax-monitor.mp4, ax-concept-film.mp4. 회사 60초·AX 30초 최종 영상과 business/company insert는 미제작이다. 실제 플랫폼 화면의 최신성·출처·사용권 검증, 문서 이미지의 공개 권리/인증 현행성 검토도 남아 있다. 준비 영상은 승인된 로컬 파일이 없으면 요청하지 않고 slate를 표시한다.

웹 구현은 commit `fad8bc0`으로 `redesign/production-2026-09-19` 브랜치에 push했다. local HEAD와 origin이 일치하고 Downloads의 `GeoSR_Homepage` junction이 canonical repo를 가리키는 것을 확인했다.
