# GeoSR 홈페이지·필름 재설계 핸드오프

> 이 문서는 2026-09-20 기준 실행 핸드오프다. 아래 내용을 기존의 “디자인부터 다시 시작” 지시보다 우선한다. 현재 홈페이지 구현과 검토된 제작 자료를 이어서 사용한다. 이전 분석 문서들은 보존하고 배경 참고로만 본다.

## 현재 작업 위치와 상태

- 저장소: `C:\Users\user\Documents\Codex\Projects\geosr-homepage`
- 브랜치: `redesign/production-2026-09-19`
- 최신 커밋 기준: `58736d00554cf081038f9fbce072b6e025e26af5`
- Downloads junction: `C:\Users\user\Downloads\GeoSR_Homepage` → `C:\Users\user\Documents\Codex\Projects\geosr-homepage`
- 공식 홈페이지: localhost의 [KO](http://127.0.0.1:18102/index.html?lang=ko) · [EN](http://127.0.0.1:18102/index.html?lang=en), LAN의 [KO](http://192.168.6.85:18102/index.html?lang=ko) · [EN](http://192.168.6.85:18102/index.html?lang=en). AX 상세: localhost의 [KO](http://127.0.0.1:18102/ax-platform.html?lang=ko) · [EN](http://127.0.0.1:18102/ax-platform.html?lang=en), LAN의 [KO](http://192.168.6.85:18102/ax-platform.html?lang=ko) · [EN](http://192.168.6.85:18102/ax-platform.html?lang=en). `dist/index.html`이 공식 홈 진입점이고 `redesign-preview.html`은 별도 디자인 미리보기다.
- 최종 60초 회사 영상과 30초 AX 콘셉트 영상은 아직 생성·편집되지 않았다. `ax-*-fast.mp4`는 제품 UI 원본 클립이며 완성 필름을 뜻하지 않는다.
- 이전 handoff의 “새 디자인 보드 세 개를 먼저 만들고 페이지를 다시 구현” 지시는 stale 상태다. 현재 공식 홈 미디어 연결을 보존하고, 우선순위에 따라 콘티와 데스크톱 웹디자인·스크롤 리듬을 다듬은 뒤 제작·검수 단계로 간다.

## 확정된 디자인·브랜드 기준

- 데스크톱 우선 범위: 1440, 1920, 2560 CSS px. 모바일은 새로 확장하지 않고 기존 fallback만 유지한다.
- 한국의 해양·환경 엔지니어링 기업답고 자연스러운 한글 문장과 자신 있는 톤을 유지한다. 회사의 실제 조사·관측·분석·예측 역량을 자연 환경 사진만으로 대체하지 않는다.
- 메인 기업 필름은 정확히 60초, AX Platform 콘셉트 필름은 별도의 30초다. 두 영상의 목적과 편집은 섞지 않는다. GeoDAP도 AX와 별개의 서비스다.
- 색은 검정, 딥 네이비, 블루그레이, 아이스 블루, 흰색을 중심으로 한다. 연두색, 과한 블루 네온, HUD·격자 장식을 피한다.
- 사람·손·얼굴·다이버, 생성된 글자·로고, 가짜 UI, 가짜 수치·그래프·관측 상태, 가짜 지리와 장소 식별 표현은 금지한다. 생성형 장면은 특정 현장·설치·운용을 증명하는 자료가 아니다.
- 실제 장비는 승인된 GeoSR 원본으로 외형을 확인한다. 공개 게시 이미지의 저작권·파생 사용권은 별도 확인 전까지 미확정이다.
- 검토 지점마다 사용자가 장면, 표현, 모델, 색, 카메라, 타이밍을 수정할 수 있다. 아직 유료 영상 생성에 들어가지 않았다.

## 최신 연출 콘티 v3

[FILM-STORYBOARD-DIRECTOR-v3.md](../redesign-production/FILM-STORYBOARD-DIRECTOR-v3.md)가 60초 회사 필름과 별도 30초 AX 필름의 유일한 story·timecode authority다. 아래 장면 구조와 검수 상태는 v3에 맞춘다. v2와 A/B 문서는 출처·검수 이력 및 선택적 과거 대안으로만 보존하며, A/B 중 사용자 선택은 기본 제작 경로의 blocker가 아니다. v3는 source가 확보되면 대응하는 shot만 교체하고 나머지 구성을 유지한다.

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
| C05 | 24–30초 | 비식별 연안·항만 조사 배경에 실제 source-backed 근거 한 점을 짧고 작게 연결한다. | 기본 후보는 [공식 해누리호 원본](../../dist/assets/equipment-vessel.jpg): 공식 페이지 표기 19톤·측량조사선, 로컬 바이트 일치. 대안으로 공식 USV 원본 한 장을 선택할 수 있다. 같은 shot에 둘 다 보여주지 않는다. 사용권 pending. |
| C06 | 30–34초 | 수면에서 수중으로 짧게 전환하며 검증된 장비 원본 한 점을 보조 근거로 보여준다. | [BlueROV2 원본](../../dist/assets/equipment-rov.png)은 공식 이미지와 SHA-256 일치. 작은 1초 안팎의 cutout/shot 후보이며 권리 pending. ROV·RBR 센서·계류선 배치를 한 설치처럼 합성하지 않는다. |
| C07 | 34–40초 | 시료 분석 환경에서 예측 연결로 이동. | [실험실 concept reference](../../dist/assets/analysis-lab-v1.webp)는 실제 GeoSR 시설 근거가 아니다. concept plate QA 또는 권리 확인된 실제 source가 필요하다. |
| C08 | 40–46초 | 짧은 타이포그래피로 분석을 예측·의사결정 지원에 연결. | 편집 단계의 navy slate와 검수된 문구. fake UI/data 없음. |
| C09 | 46–55.5초 | Discover → Predict → Monitor 실제 화면을 각 약 3초씩 독립된 full-frame으로 순차 제시. | [Discover](../../dist/assets/films/ax-discover-fast.mp4) → [Predict](../../dist/assets/films/ax-predict-fast.mp4) → [Monitor](../../dist/assets/films/ax-monitor-fast.mp4). 원본 UI pixels 유지. |
| C10 | 55.5–60초 | 첫 지구 frame으로 돌아와 exact loop. | [Earth loop frame](../../dist/assets/concepts/corporate-film/hero-earth-00s-v4.png). C01과 지리·crop·grade를 일치시킨다. |

C05·C06 장비 이미지는 scene 중심이 아니다. 한 shot에서 하나만 짧게 사용하고, 가로세로 비율과 원본 픽셀을 보존한다. ImageGen은 주변 환경의 background plate만 생성한다. 장비를 새로 그리거나 복구·변형하지 않으며, source cutout이 깔끔하게 불가능하면 원본 전체 이미지를 보존한 짧은 insert로 바꾼다. 장비 자료와 권리 한계는 [equipment manifest](../redesign-production/equipment-source-manifest.md)와 [source pack](../redesign-production/equipment-sources/README.md)에 따른다. C05의 해누리호 외 별도 모델, USV 이미지별 모델·탑재체 및 C06의 현장·운용 배치 주장은 미확인이다.

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

- C07의 `analysis-lab-v1.webp`는 사람·손·라벨·분석값이 없는 lab concept reference다. 실제 GeoSR 연구실이라는 주장을 하지 않으며 concept plate QA 또는 rights-cleared original source가 필요하다.
- C09에서는 `ax-discover-fast.mp4`, `ax-predict-fast.mp4`, `ax-monitor-fast.mp4`를 각 약 3초씩 독립적인 16:9 full-frame 컷으로 차례대로 보여준다. 동시 화면·picture-in-picture·가짜 workflow는 금지한다. C10은 55.5–60초 Earth frame으로 돌아가 C01과 정확히 loop한다.
- 자세한 구간·전환·검수 기준은 [C09–C10 제작 기록](../redesign-production/imagegen-prompts/corporate-film-c09-c10-v1.md)과 [keyframe production package](../redesign-production/KEYFRAME-PRODUCTION-PACKAGE.md)을 따른다.

### AX Platform 별도 30초 콘티 A01–A05

AX는 회사 필름과 분리된 제품 콘셉트 흐름이다. 입력 데이터 → Detect → Predict → Monitor의 개념 장면 사이에 확인된 실제 16:9 화면을 각 기능별 약 3초씩 그대로 사용하고, 마지막에 실제 Overview로 인계한다. 실제 화면은 ImageGen으로 만들지 않는다.

| 샷 | 구간 | 구성 기준 |
| --- | --- | --- |
| A01 | 00–07초 | 입력 종류를 추상 재료와 공간 전환으로 표현한다. 실제 데이터/UI처럼 보이지 않게 한다. |
| A02 | 07–14초 | Detect 개념에서 실제 Discover 화면 약 3초로 연결한다. |
| A03 | 14–21초 | Predict 개념에서 실제 Predict 화면 약 3초로 연결한다. |
| A04 | 21–28초 | Monitor 개념에서 실제 Monitor 화면 약 3초로 연결한다. |
| A05 | 28–30초 | 실제 Overview poster/frame로 짧게 인계한다. |

[AX A01–A06 ImageGen/Higgsfield 준비 문서](../redesign-production/imagegen-prompts/ax-concept-film-a01-a06-v1.md)는 이전 상세 shot 기록으로 보존한다. 현재 구조와 타이밍은 v3 콘티를 따른다. ImageGen은 화면 바깥의 배경·공간 분위기만 만든다. 지도, 실제 데이터, 지형, UI·문자·마커를 생성하거나 원본 UI pixels를 덮지 않는다.

## 현재 웹 구현과 필름 슬롯

- 공식 홈페이지는 [index.html](../../dist/index.html)이 진입점이며 [home.js](../../dist/home.js)와 [cinematic.css](../../dist/cinematic.css)가 콘텐츠와 화면을 구성한다. 현재 변경은 `hero-earth-00s-v4.png`를 메인 hero와 첫 관측 장면에 연결하고, 네 장면을 `Observation → Interpretation → Prediction → Action`으로 구성한다. media slot/poster hook과 경로는 유지한다: `assets/concepts/corporate-film/hero-earth-00s-v4.png`, `assets/analysis-lab-v1.webp`, `assets/satellite-layers-v3.png`, `assets/coastal-model-v3.png`.
- 공식 홈의 첫 메인 필름은 전체 화면 100vh/100svh hero slot이다. 최종 영상은 아직 pending이며 KO `메인 필름 제작 준비 중` / EN `Main film in preparation` 상태를 유지한다. 네 장면의 이미지는 승인 poster/source 연결 지점이며 실제 영상이나 분석 결과를 뜻하지 않는다.
- [메인 디자인 미리보기 HTML](../../dist/redesign-preview.html)은 별도 가안으로 보존한다. 공식 홈페이지의 현재 미디어와 라우팅 기준은 `index.html` 및 해당 renderer다. 내용을 복제해 별도 아키텍처를 만들거나 공식 연결을 미리보기 쪽으로 되돌리지 않는다.
- 메인 페이지의 AX 콘셉트 필름은 실제 제품 증거 영역보다 먼저 오는 16:9 full-width pending slot이다. KO `영상 제작 준비 중` 라벨과 Discover/Predict/Monitor 실제 캡처 탭이 있다.
- [AX 상세 페이지 shell](../../dist/ax-platform.html)은 콘텐츠를 [ax-v2.js](../../dist/ax-v2.js)가 렌더한다. 상단에는 100svh AX concept-film slot과 `AX CONCEPT FILM · 영상 제작 준비 중` 상태가 있고, 실제 제품 시퀀스와 아래 3열 원리 카드가 이어진다.
- AX A01 v3 이미지는 현재 웹의 임시 poster로만 연결돼 있다. 이는 final film frame이나 최종 영상 승인 상태가 아니며, 실제 data/UI 결과를 나타내지 않는다.
- 이 상태 문구는 최종 승인 영상이 연결되고 로딩 확인되기 전까지 유지한다. 이미 존재하는 포스터나 AX fast clips를 완성 콘셉트 영상으로 표시하지 않는다.
- 현재 미리보기 200 응답은 서버 연결만 확인한 것이다. 최종 업데이트 후 아래 QA를 다시 수행한다.
- [웹 구현·자산 완료도 감사](../redesign-production/WEB-COMPLETION-AUDIT-v1.md)는 현재 구현 상태와 남은 검증 항목의 인계 자료다.
- canonical 및 og:image는 운영 URL과 crop-safe 공유 자산이 확정된 뒤에만 설정한다.

## 다음 제작 순서와 사용자 검토 checkpoint

**기존 키프레임 상태 참고:** [ImageGen 키프레임 v2 기록](../redesign-production/keyframes-v2/KEYFRAME-GENERATION-LOG-v2.md)을 따른다. C02 위성 cutout 2장과 AX A01 v3 2장은 조건부 selected다. C03의 생성 지형은 거절됐으므로 결정론적 NASA frame만 사용한다. AX A01 v3는 임시 웹 poster이며 final film 승인이나 실제 data/UI 표현이 아니다. 이 자료의 존재가 현재 작업 우선순위를 앞당기지는 않는다.

**영상 생성 준비도:** [FILM-GENERATION-READINESS-v1.md](../redesign-production/FILM-GENERATION-READINESS-v1.md) · [기계 판독 JSON](../redesign-production/FILM-GENERATION-READINESS-v1.json). 현재 스토리와 타임코드는 v3를 따른다. 실제 미완료 항목은 C05–C07의 source 권리 확인 또는 concept plate QA, 회사·AX 최종 영상의 generation/editing, 그리고 production deployment다. 기존 장비 원본은 작은 process-evidence 후보이며 허가 전 사용이 승인된 것은 아니다.

**Legacy fallback reference:** [Corporate film fallback A/B](../redesign-production/CORPORATE-FILM-FALLBACK-A-B-v1.md) · [기계 판독 JSON](../redesign-production/CORPORATE-FILM-FALLBACK-A-B-v1.json)은 선택 가능한 과거 대안 기록이다. v3가 기본 제작 경로이며 A/B user choice는 진행 blocker가 아니다.

1. 회사 60초와 AX 30초 콘티의 이야기·장면 목적·시간·전환을 별도로 검토한다. 사용자는 이 단계에서 장면과 표현을 수정할 수 있다.
2. 공식 홈과 AX의 데스크톱 전체 화면 미디어 구성을 검토한다. hero는 100svh를 유지하고 영상·poster 슬롯, 제목, pending 상태를 분리한다. 공식 홈의 현재 이미지 경로와 `data-media-poster` 연결은 보존한다.
3. 스크롤에 따른 장면 진입, 미디어 전환, 타이포 reveal, 섹션 간 여백과 속도를 조정한다. 각 화면에서 한 가지 메시지가 먼저 읽히는지 사용자가 검토한다.
4. 장비는 이미 정해진 shot의 외형·모델·운용 사실만 확인한다. 새 장비 카탈로그를 만들거나 장비별 shot을 추가하지 않는다. 근거가 없으면 해당 부분을 pending으로 남기고 장면을 확장해 채우지 않는다.
5. 앞선 콘티와 웹 연출을 검토한 뒤에만 필요한 기존 shot의 start/end frame 및 motion prompt를 준비한다. ImageGen은 허용된 배경·공간 콘셉트에 한정한다. 시작/끝 프레임과 매치컷 계획은 다음 단계 전에 사용자에게 보여준다.
6. Higgsfield 유료 생성은 사용자가 결제하고 프레임·모션을 검토한 뒤 진행한다. **메인이 직접 제작**하며 두 필름을 분리해 순서대로 만든다. 스킬이나 agent에 생성 실행을 위임하지 않는다.
7. rough cut을 사용자에게 보여주고 회사 60초와 AX 30초를 각기 검토한다. C04 자료의 정확성, C09 실제 Discover/Predict/Monitor 화면 비율과 개인정보, C10 Earth loop를 확인한다. 사용자는 매 checkpoint에서 수정하거나 보류할 수 있다.
8. 최종 영상 연결 뒤 KO/EN, pending label 전환, 키보드·탭, 저모션, 링크, 자산 경로, desktop 폭과 console/network를 검수한다. 전체 QA를 통과하면 허가된 작업 브랜치에 commit/push하고, 원격 동기화와 clean state를 재검증한다.

## 최종 QA 체크리스트

- 1440, 1920, 2560 데스크톱 폭 및 1920×1080 FHD에서 메인/AX 상세 시각 검수. hero가 첫 viewport 전체를 차지하고 뒤 섹션이 미리 보이지 않는지 확인한다.
- C04 배경 지리·결측·층 순서 및 영상 60초 → 00초 완전 일치; C09 실제 UI 순차 컷; C10 Earth loop; AX A05 Overview에서 아래 Discover로 연결.
- 브라우저 콘솔 오류 0, 이미지/영상 broken reference 0, 영상 로딩/정지 포스터 fallback 확인.
- `git diff --check`, 수정 JavaScript `node --check`, KO/EN 전환, keyboard tab semantics/focus, prefers-reduced-motion 확인.
- diff와 QA 결과를 main review에 공유한다. 필수 QA 통과 후 허가된 작업 브랜치에 commit/push한다.
- 웹 메타데이터·접근성 QA: [감사 문서](../redesign-production/WEB-METADATA-ACCESSIBILITY-AUDIT-v1.md), [검증 스크립트](../../scripts/verify_metadata_accessibility.mjs).

## 거절된 표현 — 다시 사용하지 않음

- C05–C08의 생성 스틸은 composition study only — rejected for final equipment fidelity 상태이며 저장소에서 삭제했다. SHA-256 provenance는 각 prompt 기록에 남겼고, 최종 제작에 사용하지 않는다.

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
