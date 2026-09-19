# GeoSR 60초 기업 필름 · AX Platform 30초 필름 단일 제작 콘티 v3

**기준:** 2026-09-20. v3는 회사 60초와 AX Platform 30초를 분리한 단일 기본 제작 경로다. v2의 연출 자료와 readiness source 상태를 참고하되, shot 순서·timecode·기본 production path는 이 문서를 따른다. 기존 Corporate Film Fallback A/B는 보존용 대안 기록이며 사용자 선택이 v3 착수 조건은 아니다. 이 문서는 영상이 제작됐거나 공개 권리 승인을 받았다는 뜻이 아니다.

## 연출 우선순위와 공통 게이트

1. 회사 필름의 한 여정과 AX 필름의 별도 제품 이야기부터 고정한다.
2. 데스크톱에서 첫 화면 전체를 차지할 16:9 영상/교체 가능 poster를 우선 설계한다. 화면 제목과 제작 상태는 영상 바깥의 웹 오버레이로 둔다.
3. 장면을 잇는 카메라 방향·스크롤·전환 리듬을 먼저 검토한다.
4. 장비는 필요한 장면의 일부로만 보인다. 모델을 확인할 수 없으면 멀리 두거나 화면에서 제외하고, 제품처럼 확대하거나 사양을 주장하지 않는다. 장비 카탈로그나 장비별 장면을 추가하지 않는다.
5. ImageGen은 환경 plate와 비사실적 연결 장면에만 쓴다. 유료 Higgsfield는 shot별 start/end frame과 motion prompt를 검토한 뒤 진행한다.

**공통 금지:** 사람·얼굴·손·다이버·인물 반사, 생성 글자/로고, 가짜 지도·지명·지형, 가짜 데이터·결과·수치·그래프·UI, 과장된 네온·HUD·그리드, 실제처럼 보이는 미확인 설치·운용 관계. 실제 데이터나 UI에는 ImageGen/영상 모델을 적용하지 않고 원본 픽셀과 결측·비율을 보존한다.

**단일 production path:** 아래 콘티를 A/B 선택 없이 진행한다. 실제 현장 footage가 없는 C05–C07은 비식별 환경 concept plate를 기본 배경으로 사용하고, GeoSR 실제 작업·특정 지역으로 주장하지 않는다. C05에는 권리 확인 뒤 해누리호 원본 또는 공식 USV 원본 중 하나, C06에는 권리 확인 뒤 BlueROV2 원본을 짧고 작은 보조 근거로 더할 수 있다. 권리가 확인되지 않으면 장비를 생략하고 concept plate QA로 진행한다.

자연 풍경을 길게 나열하지 않는다. C05–C06은 연안 관측에서 수상·수중으로 이어지는 하나의 짧은 연결부이고, 바로 실험·분석으로 넘어간다. 각 환경 frame은 관측·공간 전환을 설명하는 역할을 해야 한다.

**Readiness authority:** [FILM-GENERATION-READINESS-v1](FILM-GENERATION-READINESS-v1.md)와 [JSON](FILM-GENERATION-READINESS-v1.json)은 출처·권리·파일 상태의 이력이다. v3가 production timecode와 story authority다. 이전 [Corporate Film Fallback A/B](CORPORATE-FILM-FALLBACK-A-B-v1.md)와 [JSON](CORPORATE-FILM-FALLBACK-A-B-v1.json)의 `userChoiceRequired`는 그 대안안을 선택할 때의 조건이며 v3를 막지 않는다.

## 회사 메인 필름 — 00:00–01:00

16:9, 화면 속 문구는 후반 합성만 허용한다. C01의 지구 프레임이 첫 프레임이자 마지막 프레임이다.

### C01 · 00:00–00:05 — 지구가 드러나다

- **Visual purpose:** 우주에서 지구를 천천히 발견하고 동아시아·북서태평양 방향을 이야기의 지리 축으로 잡는다.
- **Start / end frame:** 검정에서 `dist/assets/concepts/corporate-film/hero-earth-00s-v4.png`의 원본 프레임이 드러난다. 끝은 같은 frame의 더 안정된 hold. 최종 loop의 마지막 frame도 이 원본과 일치한다.
- **Camera / motion:** 아주 느린 forward drift와 미세한 광량 변화만 사용한다. 지형·구름·해안선 픽셀은 고정한다.
- **Web handoff:** `dist/home.js`의 `geosr-hero`가 같은 이미지를 pending film poster로 사용한다. 연결 전 KO/EN 제작 상태 label과 100svh hero를 유지한다.
- **Source truth gate:** NASA Blue Marble 기반 deterministic image다. 실제 위성 촬영 시각 또는 실시간 관측으로 표현하지 말고 NASA credit/public-use 검토를 남긴다.
- **ImageGen prompt core:** ImageGen을 사용하지 않는다. 제공된 Earth frame만 사용한다.
- **Negative constraints:** 재생성 지리·구름·문자·로고·별 무늬·beam 금지. 과한 bloom/neon 금지.

### C02 · 00:05–00:09 — 관측 위성

- **Visual purpose:** 지구를 관측하는 기술 맥락을 짧게 제시하고 C03의 시선축을 만든다.
- **Start / end frame:** C01의 변경 없는 Earth plate 위에 `docs/redesign-production/keyframes-v2/generated/corp-c02-satellite-cutout-small-v2.png`로 시작해 `docs/redesign-production/keyframes-v2/generated/corp-c02-satellite-cutout-close-v2.png` reference로 끝낸다.
- **Camera / motion:** cutout은 아주 작고 먼 배치에서 한 번의 완만한 접근만 한다. 실제 지구 픽셀을 변형하지 않는다.
- **Web handoff:** 메인 hero poster에는 위성을 합성하지 않는다. 최종 승인된 film이 생겨도 header 카피는 HTML overlay로 둔다.
- **Source truth gate:** 두 cutout은 특정 기종이나 임무를 증명하지 않는 ImageGen concept다. 내부 합성의 권리·최종 프레임 검토를 통과하지 못하면 cutout 없이 Earth 장면을 유지한다.
- **ImageGen prompt core:** “generic, small Earth-observation satellite silhouette, distant three-quarter view, subdued neutral material, placed above an unchanged supplied Earth plate; no identifying marks.”
- **Negative constraints:** 실제 위성 모델·임무·태양전지판 수 추정, 광선·레이저·HUD·지형 변경·큰 제품샷 금지.

### C03 · 00:09–00:14 — 한반도와 북서태평양으로 접근

- **Visual purpose:** 지구관측에서 공간자료 해석으로 카메라를 이어준다.
- **Start / end frame:** `hero-earth-12s-v1.png`에서 시작해 `hero-earth-15s-v1.png`를 거쳐 `hero-earth-18s-v1.png`로 끝낸다. 파일 이름의 초 표기는 reference 식별자이며 편집 timecode가 아니다.
- **Camera / motion:** 동일한 deterministic projection에서 느린 push-in만 한다. C02 위성 cutout은 이 shot 시작 전 사라진다.
- **Web handoff:** 공식 홈의 지구관측 story panel은 승인된 Earth poster를 유지한다. 별도 geographic map이나 생성을 연결하지 않는다.
- **Source truth gate:** 검증된 NASA 기반 geographic render만 사용한다. 한반도·일본·중국 동부·섬의 해안선을 새로 그리거나 특정 연안 촬영지로 주장하지 않는다.
- **ImageGen prompt core:** ImageGen을 사용하지 않는다. deterministic source frames만 연결한다.
- **Negative constraints:** 가짜 해안·섬·경계·도로·항만, map labels, pin/marker, 화면 왜곡·warp 금지.

### C04 · 00:14–00:24 — 관측 레이어를 순서대로 해석

- **Visual purpose:** 수온·염분·클로로필이 서로 다른 관측 자료임을 한 장씩 전환하며 보여준다.
- **Start / end frame:** 00:14–00:17 NASA GIBS monthly SST `hero-earth-22s-a-sst-v1.png`; 00:17–00:20 Aquarius monthly salinity `hero-earth-22s-b-salinity-v1.png`; 00:20–00:23 MODIS Aqua L2 chlorophyll-a `hero-earth-22s-c-chlorophyll-v1.png`; 00:23–00:24 `hero-earth-24s-v1.png`의 연안 frame으로 전환한다.
- **Camera / motion:** full-frame 2D plates. 각 경계에서 짧은 whole-frame crossfade만 사용하고 이전 레이어를 동시에 쌓지 않는다.
- **Web handoff:** 네 개 story panels 중 기술 설명의 개념 이미지는 데이터 결과 화면으로 대체하지 않는다. 실제 상세는 출처가 표시된 자료 viewer에서만 다룬다.
- **Source truth gate:** 2012-08-01 request, EPSG:4326, BBOX `90,15,166,57.75`의 기존 source record를 따른다. SST와 Aquarius는 monthly, MODIS는 daily L2다. 날짜가 같아도 동시 관측이 아니다. MODIS coverage 10.7248%와 no-data gaps를 그대로 보존한다. 범례·수치·단위·출처는 필요한 경우 별도 후반 caption으로 정확히 표기한다.
- **ImageGen prompt core:** ImageGen을 사용하지 않는다. source pixels만 사용한다.
- **Negative constraints:** 겹친 레이어·보간·결측 채움·새 색상표·가짜 해상도·측정값·범례·데이터 움직임 금지.

### C05 · 00:24–00:30 — 연안·항만 조사 맥락과 짧은 현장 근거

- **Visual purpose:** 해안 지리에서 실제 조사 맥락으로 전환한다. 자연 풍경만 이어지지 않도록 확인된 선박 또는 USV 원본 한 점을 짧고 작게 과정 증거로 넣는다. 제품 영웅 컷이나 장비 나열은 하지 않는다.
- **Start / end frame:** `hero-earth-24s-v1.png` 연안 frame에서 비식별 temperate coast concept plate로 이동한다. 권리 확인 뒤 사용할 source-backed 후보는 `dist/assets/equipment-vessel.jpg` 한 장만 사용한다. 이 파일은 공식 해누리호 이미지와 SHA-256 바이트가 일치하며 공식 표기는 측량조사선, 19톤이다. 대안이 필요하면 공식 USV 원본 세트 중 한 장만 선택한다. 같은 shot에서 선박과 USV를 함께 보여주지 않으며, 권리가 pending이면 둘 다 쓰지 않는다.
- **Camera / motion:** 넓고 안정된 해안 frame을 주로 유지한다. 선택한 원본 장비는 1초 안팎의 작은 과정 삽입 또는 원본 비율을 보존한 작은 합성 요소로 한 번만 보여준 뒤 해안 frame으로 돌아간다. 잘라내기나 마스킹으로 원본 픽셀을 변형해야 한다면 합성하지 말고 원본 전체 이미지를 비율 그대로 짧게 제시한다.
- **Web handoff:** 공식 홈 Observation panel은 교체 가능한 poster/source slot로 둔다. 실제 현장으로 오인되지 않는 concept 배경과 출처가 확인된 장비 원본을 구분해 관리한다.
- **Source truth gate:** [장비 근거 manifest](equipment-source-manifest.md)에서 해누리호 표기·이미지 일치와 USV 페이지 원본을 확인한다. 해누리호의 제조사·별도 모델, USV 각 이미지의 모델·탑재체는 미확인이다. 위치, 촬영 시점, 실제 운용 및 구체적 선박/USV 조합을 주장하지 않는다. 두 선택지 모두 재사용·파생 사용권은 확인 전까지 pending이며 허가 후에만 사용한다.
- **ImageGen prompt core:** “wide, quiet, non-identifiable temperate coast and harbor-edge background plate, neutral overcast daylight, documentary restraint, no vessel, no USV, no equipment, no people, no signage or readable text; leave clean negative space for one separately supplied original-source insert.”
- **Negative constraints:** 장비의 AI 재생성·재그림·형상 보정·비율 변형, 두 장비를 한 장면에 함께 두기, 특정 한국 항만이나 설치 현장 주장, 지명·배 이름·번호·모델 추정, 인물·손, 지도·격자·가짜 survey result 금지.

### C06 · 00:30–00:34 — 수상에서 수중으로 이어지는 관측

- **Visual purpose:** 수면에서 수중으로 공간을 짧게 연결한다. 권리가 확인된 경우에만 `dist/assets/equipment-rov.png`의 검증된 장비 원본을 한 번만 작은 source-backed 과정 증거로 보여준다. 제품 hero나 장비 카탈로그처럼 확대하지 않는다.
- **Start / end frame:** 수면 위 물결의 넓은 frame에서 시작해 수면선을 지나는 match-cut으로 온대 해역의 녹청색 water column에 끝난다. 중간에 BlueROV2 공식 이미지와 SHA-256이 일치하는 로컬 원본을 1초 안팎의 작은 insert 또는 원본 픽셀을 유지한 cutout으로 한 번만 사용한다. RBR 센서나 계류선을 같은 배치로 추가하지 않는다.
- **Camera / motion:** 수면선을 천천히 가로지르는 단일 축 이동. ROV 원본은 비율을 보존하고 재그림·warp·조명 재생성 없이 짧게 노출한다. 깨끗한 cutout이 불가능하면 원본 전체 이미지를 작은 16:9 삽입 화면으로 쓰고, 원본 장비 픽셀을 보존할 수 없으면 사용하지 않는다.
- **Web handoff:** 실제 ROV/센서 제품 이미지나 AX UI로 자동 연결하지 않는다. 실제 플랫폼 탐색은 별도 manual UI 탭을 유지한다.
- **Source truth gate:** [장비 근거 manifest](equipment-source-manifest.md)에서 BlueROV2 표기와 로컬 원본 일치를 확인한다. 정확한 실제 운용·장착물·배치·현장 및 재사용 권리는 미확인이다. 권리 확인 전 실제 필름 사용은 보류하며, 이 insert를 특정 GeoSR 운용 기록으로 주장하지 않는다.
- **ImageGen prompt core:** “a calm, non-identifiable temperate coastal water surface transitions to a realistic muted green-blue water column, natural suspended particles, subdued daylight and neutral illumination, no identifiable location, no vehicle or instrument; reserve clean negative space for one separately supplied, unmodified original-source ROV insert.”
- **Negative constraints:** 생성형 ROV/센서, ROV와 센서를 하나의 장비처럼 융합, 가짜 계류 배치, 사람·다이버·손·열대어·산호·난파선·심해 생물, laser/grid/HUD, saturated neon, generated readings 금지.
### C07 · 00:34–00:40 — 실험과 분석

- **Visual purpose:** 현장 관측과 해석 사이에 시료 분석 환경을 짧게 둔다.
- **Start / end frame:** wide, people-free lab composition에서 조용한 instrument-area detail로 이동한다. `dist/assets/analysis-lab-v1.webp`는 현재 lighting/composition reference이며 실제 GeoSR 공간·모델을 주장하지 않는다.
- **Camera / motion:** 느린 lateral push-in과 얕은 focus transition. 스크린은 꺼져 있거나 frame 밖에 둔다. 샘플 출처로 보이는 표식은 노출하지 않는다.
- **Web handoff:** 공식 홈 Interpretation panel의 alt와 concept status를 유지한다. 실험실 영상을 실제 자료로 교체하려면 이 scene asset만 교체한다.
- **Source truth gate:** 실험실 source가 없으면 외부 편집물에서 concept reconstruction임을 표시한다. 실제 공간/장비 명칭과 샘플·결과를 주장하려면 source와 권리가 필요하다.
- **ImageGen prompt core:** “unidentified modern environmental laboratory, quiet wide-to-medium composition, instruments secondary and partly out of focus, neutral cool-white practical lighting, no people, no labels or readable display. Treat `dist/assets/analysis-lab-v1.webp` as a concept/composition reference only; do not claim a real GeoSR facility.”
- **Negative constraints:** ICP-MS 등 특정 모델 복제, sample labels, values, charts, plots, readable text, people/hands, false result/ownership claim 금지.

### C08 · 00:40–00:46 — 분석을 예측과 의사결정으로 연결

- **Visual purpose:** 분석 뒤 예측을 살피고 판단에 활용한다는 메시지를 한 번 연결한다.
- **Start / end frame:** C07의 조용한 lab frame에서 시작해 딥 네이비의 clean slate로 끝난다. 후반 타이포그래피에 `분석을 예측과 의사결정 지원으로 연결합니다`를 넣는다.
- **Camera / motion:** lab에서 slate로 한 번 dissolve한 뒤 텍스트를 천천히 드러내고 안정적으로 hold한다. 데이터나 UI transition을 만들지 않는다.
- **Web handoff:** 실제 Predict UI는 아래 홈 AX product sequence의 수동 선택 화면과 별개다. website capture를 autoplay로 바꾸지 않는다.
- **Source truth gate:** 이 문구는 제공 가능한 기술 범위를 설명하며 특정 분석 결과·정책 결정·성과를 주장하지 않는다. 실제 예측 UI는 다음 shot에서만 원본 상태 그대로 보여준다.
- **ImageGen prompt core:** ImageGen을 사용하지 않는다. slate는 편집 단계의 단색 navy와 별도 타이포그래피로 만든다.
- **Negative constraints:** 새 지도·예측 raster·수위·피해값·결과·그래프·가짜 UI, 화면 crop/cover/retime 금지.

### C09 · 00:46–00:55.5 — 실제 제품 화면 증거

- **Visual purpose:** 제품의 세 기능을 짧게 실제 화면으로 확인시킨다. 같은 데이터가 연속 처리되는 workflow라고 주장하지 않는다.
- **Start / end frame:** Discover `ax-discover-fast.mp4` 00:46–00:49.03, Predict `ax-predict-fast.mp4` 00:49.03–00:52.06, Monitor `ax-monitor-fast.mp4` 00:52.06–00:55.09. 각 3.03초 source clip을 native speed로 사용하고, 마지막 0.41초는 Monitor의 안정 frame을 그대로 hold한다.
- **Camera / motion:** 16:9 화면 전체를 정지된 edit stage에 맞춘다. 각 clip은 원본 비율과 UI 픽셀을 유지한다.
- **Web handoff:** 홈 AX product sequence와 상세 AX UI는 keyboard-accessible manual tabs로 유지한다. 영상 clip 삽입으로 tabs나 수동 탐색을 대체하지 않는다.
- **Source truth gate:** manifest의 실제 capture가 내부 사용 승인된 source다. 공개 전 계정, 사용자명, 내부 IP, 개인정보, third-party imagery 및 capture 시점 값을 재확인한다.
- **ImageGen prompt core:** ImageGen/Higgsfield는 이 구간의 UI에 적용하지 않는다. source clip만 사용한다.
- **Negative constraints:** 재생성·재구성·crop·speed-up·cursor·hover simulation·자막을 UI 내부에 합성하거나 clip 사이를 한 장면으로 morph하는 것 금지.

### C10 · 00:55.5–01:00 — 첫 지구로 회귀

- **Visual purpose:** 현장과 기술 이야기를 지구 축으로 닫고 seamless loop를 만든다.
- **Start / end frame:** 00:55.5에 navy로 전환한 뒤 `hero-earth-00s-v4.png`에 돌아온다. 01:00 마지막 frame은 C01 첫 frame과 source, crop, grade가 일치한다.
- **Camera / motion:** 마지막 1.5초는 완전한 frame hold. loop 연결부에서는 crossfade를 반복하지 않는다.
- **Web handoff:** 홈 hero와 동일한 Earth poster 경로를 쓴다. 메인 영상이 연결되면 pending label만 승인된 status로 전환한다.
- **Source truth gate:** Earth frame은 NASA-derived geography reference다. footage가 실제 한반도 관측이나 현재 지구 상황을 보여준다고 주장하지 않는다.
- **ImageGen prompt core:** ImageGen을 사용하지 않는다. C01 frame을 재사용한다.
- **Negative constraints:** 끝 프레임의 지형·구름·색·크롭을 새로 생성하지 않는다. text baked into frame 금지.

## AX Platform 별도 필름 — 00:00–00:30

AX는 입력 자료가 탐지·예측·모니터링으로 해석되는 개념 흐름을 보여준 뒤 실제 UI로 근거를 제시한다. 회사 메인 필름과 촬영·사운드·편집을 섞지 않는다. 각 기능은 **개념 전환 약 4초 + 실제 16:9 화면 녹화 약 3초**로 구성한다. 실제 화면의 앞뒤 구간은 별도 제작에서 안정 프레임을 확인한다.

### A01 · 00:00–00:07 — 여러 입력의 시작

- **Visual purpose:** 위성·현장·환경자료가 서비스로 들어오는 입력의 다양성을 추상적으로 보여준다.
- **Start / end frame:** 웹 poster로 쓰이는 `dist/assets/concepts/ax-platform/ax-a01-flow-start-v3.png`에서 `docs/redesign-production/keyframes-v2/generated/ax-a01-flow-end-v3.png`로 이동하는 abstract plate. A01 v3 pair는 조건부 selected concept이며 실제 데이터나 UI가 아니다.
- **Camera / motion:** 16:9 딥 네이비 공간에서 분리된 무채색 재료 면이 한 방향으로 느리게 이동한다. 00:07에는 다음 장면의 정돈된 frame 경계에서 멈춘다.
- **Web handoff:** `ax-concept-film` 100svh hero는 이 첫 poster를 유지하고, 실제 영상 연결 전까지 KO/EN pending label을 둔다.
- **Source truth gate:** 입력 종류의 표현은 개념 은유다. 특정 화면, dataset, coordinate, 실제 workflow에 연결됐다고 주장하지 않는다.
- **ImageGen prompt core:** “minimal deep-navy cinematic space, three restrained matte translucent material forms enter separately and begin to align, subtle depth, no interface or map, wide 16:9 negative space.”
- **Negative constraints:** 사람·문자·숫자·지도·coastline·grid·chart·button·menu·marker·HUD·neon 금지.

### A02 · 00:07–00:14 — Detect

- **Visual purpose:** 입력이 탐지 관점으로 정리된다는 개념 전환 뒤 실제 Detect evidence를 보여준다.
- **Start / end frame:** 00:07–00:11 abstract stage에서 시작해 빈 frame의 한 면에 빛이 정착한다. 00:11–00:14에는 actual `ax-discover-fast.mp4` 화면이 full 16:9로 재생된다.
- **Camera / motion:** conceptual 4초는 느린 forward alignment만 사용한다. 실제 clip 3초에는 pan/zoom/scale/overlay를 얹지 않는다.
- **Web handoff:** actual clip은 홈/상세 AX의 Detect/Discover manual panel 근거로 연결한다. manual tab semantics와 keyboard focus를 유지한다.
- **Source truth gate:** 캡처는 Satellite Facility Detection 실제 화면이다. 후반 label은 `Detect · Satellite Facility Detection`으로 분리해 넣고, 캡처 내 날짜·지역·탐지 내용을 바꾸지 않는다.
- **ImageGen prompt core:** “a neutral empty 16:9 editorial frame resolves from the supplied abstract plate; one soft plane settles into focus, no target icon or detection mark.”
- **Negative constraints:** generated satellite image, map, pin, bounding box, detection badge, fake UI/text/value, UI movement, crop 금지.

### A03 · 00:14–00:21 — Predict

- **Visual purpose:** 탐지 다음 예측 기능을 concept-to-evidence 순서로 분리해 보여준다.
- **Start / end frame:** 00:14–00:18은 deep-navy abstract stage의 층 깊이가 부드럽게 바뀌는 conceptual frame. 00:18–00:21은 actual `ax-predict-fast.mp4` full-screen recording.
- **Camera / motion:** conceptual stage에 얕은 parallax만 허용한다. 실측 지형처럼 보이는 변형은 금지한다. source UI는 정지된 frame에서 native playback한다.
- **Web handoff:** 실제 Predict tab 화면으로만 아래 product sequence와 연결한다. 장면 cut이 같은 지역/사건에서 연속된 것처럼 보이지 않게 한다.
- **Source truth gate:** source clip은 Flood 3D/예측 화면이다. 표시된 연구 시나리오·날짜·values는 촬영 당시 상태 그대로 유지하고 새 피해·수위·정확도를 주장하지 않는다.
- **ImageGen prompt core:** “two abstract, smooth depth planes shift in light and shadow, hinting at comparing possible conditions without depicting terrain, maps, water levels, or numbers.”
- **Negative constraints:** real Korean coastline, fabricated 3D terrain, flood extent, numerical results, graph, legend, chart, UI, glowing grid, neon, text 금지.

### A04 · 00:21–00:28 — Monitor

- **Visual purpose:** 관측망과 환경 변화가 시간의 흐름 속에서 이어지는 개념을 제시하고 실제 Monitor 화면으로 증명한다.
- **Start / end frame:** 00:21–00:25에는 어두운 층 사이를 부드럽게 지나가는 차분한 light passage. 00:25–00:28은 actual `ax-monitor-fast.mp4` 16:9 recording. 필요할 경우 `buoy-poster.webp` 또는 `env-poster.webp`를 frame 확인 reference로만 쓴다.
- **Camera / motion:** concept 구간은 한 번의 매우 느린 horizontal drift. 실제 recording은 편집·확대 없이 고정한다.
- **Web handoff:** actual Monitor capture는 아래 실제 product panel의 source 증거다. website는 autoplay가 아니라 수동 선택으로 동작한다.
- **Source truth gate:** clip에 나타난 날짜, station, variable, observation state는 capture 당시 값이다. 현재값·실시간 연결로 표시하지 않는다.
- **ImageGen prompt core:** “quiet navy material with a soft light passage moving once across two translucent layers, abstract continuity only, no plotted timeline or data.”
- **Negative constraints:** time-series graph, value, buoy icon, map, named station, fake live status, text, dashboard, grid, neon, human 금지.

### A05 · 00:28–00:30 — 실제 AX로 인계

- **Visual purpose:** 추상 편집을 끝내고 바로 실제 AX 서비스 화면으로 연결한다.
- **Start / end frame:** Monitor recording 마지막 안정 frame에서 hard-cut해 actual `ax-overview-poster.webp`로 끝낸다. 전체 이미지와 16:9 crop-safe 영역을 유지한다.
- **Camera / motion:** 0.25초의 얕은 opacity settle 후 완전 정지.
- **Web handoff:** 실제 상세 페이지의 100svh concept hero 다음에 있는 actual UI section으로 이어진다. tab focus 순서와 manual selection을 유지한다.
- **Source truth gate:** overview poster의 실제 화면에 포함된 메뉴·제품명만 증거다. 특정 기능이 연속 실행됐다는 주장은 하지 않는다.
- **ImageGen prompt core:** ImageGen을 사용하지 않는다. 승인된 실제 Overview screenshot만 사용한다.
- **Negative constraints:** UI 재생성·재배치·글자 수정·fake loading/result·cursor movement·crop·cover 금지.

## 생성 직전 체크리스트

- [ ] 이 문서의 회사 60초와 AX 30초 timecode가 각기 00:00부터 끝까지 연속이고, 두 영상의 장면·사운드·파일을 섞지 않는다.
- [ ] 모든 shot에 start/end frame source, 실제·concept 구분, negative prompt, 카메라 속도, in/out match point를 지정한다. 새 source가 들어오면 해당 shot만 교체한다.
- [ ] C01/C03/C04 지도·데이터 픽셀, C09 및 AX 실제 UI pixels, 날짜·단위·coverage·원본 비율을 frame-by-frame 대조한다.
- [ ] 실제 footage의 source, 권리, 공개 사용 조건, 촬영지/시각, 개인정보·계정·내부 IP·third-party content를 확인한다. 불명확하면 관련 장면의 factual claim을 낮추고 다른 scene의 구조는 유지한다.
- [ ] C05에서는 해누리호 원본 또는 공식 USV 원본 중 하나만 선택해 짧고 작게 사용하고, 원본 픽셀·비율을 보존하며 권리 확인을 마친다. ImageGen은 배경 plate만 만들며 선박/USV를 생성하거나 재그리지 않는다.
- [ ] 16:9 contact sheet와 장면별 start/end pair, camera/motion test를 먼저 main review에 공유한다. 사용자가 수정할 수 있는 checkpoint를 두고 승인 전 유료 생성하지 않는다.
- [ ] C06에서는 `dist/assets/equipment-rov.png`를 권리 확인 후 한 번만 짧고 작게 source-backed insert/cutout 후보로 사용한다. 원본 장비 픽셀을 보정·재그림·변형하지 않으며 ROV-센서 배치 주장을 만들지 않는다.
- [ ] ImageGen은 허용된 concept/background plate만 만든다. 실제 지형, 데이터, 플랫폼 화면, 장비 외형은 생성·수정하지 않는다.
- [ ] Higgsfield에는 shot 하나씩 승인된 start/end reference와 이 문서의 camera/motion 제한을 전달한다. 원본 대상물이 morph하거나 위치·구성이 달라지지 않는지 확인한다.
- [ ] 최종 rough cut에서 영상 길이, loop, UI trim, no-people, no-fake-geo/data/UI, caption/credit, KO/EN 및 웹 pending-label 교체를 검수한다.
- [ ] 데스크톱 1440×900, 1920×1080, 2560×1440에 100svh hero·poster crop·콘솔·network·reduced-motion fallback을 확인한다. 영상이 없어도 poster와 pending status가 정상 동작해야 한다.

## 연결 문서와 현 상태

- [v3 storyboard](FILM-STORYBOARD-DIRECTOR-v3.md) — 회사·AX story authority. v2는 기존 source·연출 기록으로만 참고한다.
- [Film readiness v1](FILM-GENERATION-READINESS-v1.md) · [JSON](FILM-GENERATION-READINESS-v1.json) — source 상태와 검수 이력.
- [기존 Corporate Film Fallback A/B](CORPORATE-FILM-FALLBACK-A-B-v1.md) · [JSON](CORPORATE-FILM-FALLBACK-A-B-v1.json) — v3 기본 경로 선택을 막지 않는 과거 대안 기록.
- [C04 자료 레이어의 출처·한계](keyframes/corporate-film-data-layers-crossfade-v1.md).
- [AX concept film 준비안과 actual UI 원칙](imagegen-prompts/ax-concept-film-a01-a06-v1.md).
- [공식 홈 renderer](../../dist/home.js), [AX renderer](../../dist/ax-v2.js), [홈 cinematic CSS](../../dist/cinematic.css), [AX CSS](../../dist/ax-v2.css), [film slot CSS](../../dist/film-slots.css).

**현재 상태:** v3 storyboard baseline은 확정된 기본 경로다. 완성된 회사 60초 영상과 AX 30초 영상은 아직 없으며, C05–C07은 source 권리 확인 또는 concept plate 검수가 남아 있다. 미확인 장비는 생성하지 않고, 사용할 경우 승인된 원본 픽셀을 작은 과정 증거로만 보존한다. 이 문서 작성은 영상 생성, 배포, 최종 승인을 뜻하지 않는다.
