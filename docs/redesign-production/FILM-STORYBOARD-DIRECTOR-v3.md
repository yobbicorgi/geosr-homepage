> **역사 기록 — 현재 제작 지시 아님**
> 2026-09-22 [현재 인계 기준](../redesign-next/00-START-HERE.md)으로 대체됨
> 아래의 완료·자체 점수·generationReady·모바일 제외·회사/AX 혼합 지시는 현재 승인으로 사용하지 않음
> 원본 근거와 실패·검수 이력만 보존

---

# GeoSR 60초 기업 필름 · AX Platform 30초 필름 단일 제작 콘티 v3

**기준:** 2026-09-20. v3는 회사 60초와 AX Platform 30초를 분리한 단일 기본 제작 경로다. v2의 연출 자료와 readiness source 상태를 참고하되, shot 순서·timecode·기본 production path는 이 문서를 따른다. 기존 Corporate Film Fallback A/B는 보존용 대안 기록이며 사용자 선택이 v3 착수 조건은 아니다. 이 문서는 영상이 제작됐거나 공개 권리 승인을 받았다는 뜻이 아니다.

## 연출 우선순위와 공통 게이트

1. 회사 필름의 한 여정과 AX 필름의 별도 제품 이야기부터 고정한다.
2. 데스크톱에서 첫 화면 전체를 차지할 16:9 영상/교체 가능 poster를 우선 설계한다. 화면 제목과 제작 상태는 영상 바깥의 웹 오버레이로 둔다.
3. 장면을 잇는 카메라 방향·스크롤·전환 리듬을 먼저 검토한다.
4. 장비는 필요한 장면의 일부로만 보인다. 모델을 확인할 수 없으면 멀리 두거나 화면에서 제외하고, 제품처럼 확대하거나 사양을 주장하지 않는다. 장비 카탈로그나 장비별 장면을 추가하지 않는다.
5. ImageGen은 환경 plate와 비사실적 연결 장면에만 쓴다. 유료 Higgsfield는 shot별 start/end frame과 motion prompt를 검토한 뒤 진행한다.

**공통 금지:** 사람·얼굴·손·다이버·인물 반사, 생성 글자/로고, 가짜 지도·지명·지형, 가짜 데이터·결과·수치·그래프·UI, 과장된 네온·HUD·그리드, 실제처럼 보이는 미확인 설치·운용 관계. 실제 데이터나 UI에는 ImageGen/영상 모델을 적용하지 않고 원본 픽셀과 결측·비율을 보존한다.

**단일 production path:** 아래 콘티를 A/B 선택 없이 진행한다. C05·C06은 main-reviewed 비식별 concept background plate를 선택했으며 실제 GeoSR 현장 footage나 특정 지역 증거가 아니다. C07은 승인된 lab concept still을 사용하며 실제 GeoSR 시설·장비·시료·결과 증거가 아니다. C05의 해누리호 또는 USV, C06의 BlueROV2는 별도 권리·원본 픽셀/비율 검토를 통과할 때만 작은 보조 insert로 쓸 수 있고, 아니면 생략한다.

자연 풍경을 길게 나열하지 않는다. C05–C06은 연안 관측에서 수상·수중으로 이어지는 하나의 짧은 연결부이고, 바로 실험·분석으로 넘어간다. 각 환경 frame은 관측·공간 전환을 설명하는 역할을 해야 한다.

**Readiness authority:** [FILM-GENERATION-READINESS-v1](FILM-GENERATION-READINESS-v1.md)와 [JSON](FILM-GENERATION-READINESS-v1.json)은 출처·권리·파일 상태의 이력이다. v3가 production timecode와 story authority다. 이전 [Corporate Film Fallback A/B](CORPORATE-FILM-FALLBACK-A-B-v1.md)와 [JSON](CORPORATE-FILM-FALLBACK-A-B-v1.json)의 `userChoiceRequired`는 그 대안안을 선택할 때의 조건이며 v3를 막지 않는다.

**생성 준비 checkpoint:** [v3 readiness JSON](FILM-GENERATION-READINESS-v3.json)은 `generationReady=true`와 빈 `remainingPreGenerationGates`로 생성 시작 준비 완료를 표시한다. `releaseReady=false`와 `productionReady=false`는 최종 영상 생성·편집·공개 검수·배포가 아직 남았음을 뜻한다. 선택된 비식별 배경 경로가 있으므로 장비 insert 권리는 실제로 삽입할 때만 확인하면 되며 기본 생성 경로의 blocker가 아니다.

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
- **Start / end frame:** `hero-earth-24s-v1.png`에서 main-reviewed 비식별 해안 concept plate [`c05-coast-end-v1.png`](../../dist/assets/concepts/corporate-film-v3/c05-coast-end-v1.png)로 이동한다. 이 배경은 실제 GeoSR 현장, 실제 한국 항만 또는 조사 증거가 아니다. 권리와 원본 픽셀/비율 보존을 별도로 확인한 경우에만 해누리호 또는 USV 중 하나를 작은 insert로 사용할 수 있다. 같은 shot에 둘 다 두지 않고, 확인 전에는 장비를 생략한다.
- **Camera / motion:** 선택된 배경 plate에서 최종 편집의 느린 해안 방향 push를 검토한다. 선택적인 장비 insert는 별도 권리·픽셀 보존을 통과해야 하며, 통과하지 않으면 concept 배경만 사용한다.
- **Web handoff:** 공식 홈 Observation panel은 교체 가능한 poster/source slot로 둔다. 실제 현장으로 오인되지 않는 concept 배경과 출처가 확인된 장비 원본을 구분해 관리한다.
- **Source truth gate:** [장비 근거 manifest](equipment-source-manifest.md)에서 해누리호 표기·이미지 일치와 USV 페이지 원본을 확인한다. 해누리호의 제조사·별도 모델, USV 각 이미지의 모델·탑재체는 미확인이다. 위치, 촬영 시점, 실제 운용 및 구체적 선박/USV 조합을 주장하지 않는다. 두 선택지 모두 재사용·파생 사용권은 확인 전까지 pending이며 허가 후에만 사용한다.
- **ImageGen prompt core:** 이미 선택된 `dist/assets/concepts/corporate-film-v3/c05-coast-end-v1.png`를 배경으로 사용하고 재생성하지 않는다. Prompt 및 시각 검수 기록은 [C05–C06 ImageGen log](keyframes-v3/C05-C06-IMAGEGEN-LOG.md)를 따른다.
- **Negative constraints:** 장비의 AI 재생성·재그림·형상 보정·비율 변형, 두 장비를 한 장면에 함께 두기, 특정 한국 항만이나 설치 현장 주장, 지명·배 이름·번호·모델 추정, 인물·손, 지도·격자·가짜 survey result 금지.

### C06 · 00:30–00:34 — 수상에서 수중으로 이어지는 관측

- **Visual purpose:** 수면에서 수중으로 공간을 짧게 연결한다. 권리가 확인된 경우에만 `dist/assets/equipment-rov.png`의 검증된 장비 원본을 한 번만 작은 source-backed 과정 증거로 보여준다. 제품 hero나 장비 카탈로그처럼 확대하지 않는다.
- **Start / end frame:** [`c06-waterline-start-v1.png`](../../dist/assets/concepts/corporate-film-v3/c06-waterline-start-v1.png)에서 [`c06-underwater-end-v1.png`](../../dist/assets/concepts/corporate-film-v3/c06-underwater-end-v1.png)까지 수면선을 지나는 match-cut을 구성한다. 두 파일은 main-reviewed generic concept pair이며 실제 GeoSR 수중 운용을 나타내지 않는다. 권리와 픽셀 보존 검토를 통과한 경우에만 BlueROV2 원본을 작은 insert로 사용할 수 있다. RBR 센서나 계류선을 같은 배치로 추가하지 않는다.
- **Camera / motion:** 선택된 두 concept frame 사이를 느린 단일 축으로 이동한다. 선택적인 ROV source insert는 비율·픽셀을 그대로 보존하고, 불가능하면 생략한다.
- **Web handoff:** 실제 ROV/센서 제품 이미지나 AX UI로 자동 연결하지 않는다. 실제 플랫폼 탐색은 별도 manual UI 탭을 유지한다.
- **Source truth gate:** [장비 근거 manifest](equipment-source-manifest.md)에서 BlueROV2 표기와 로컬 원본 일치를 확인한다. 정확한 실제 운용·장착물·배치·현장 및 재사용 권리는 미확인이다. 권리 확인 전 실제 필름 사용은 보류하며, 이 insert를 특정 GeoSR 운용 기록으로 주장하지 않는다.
- **ImageGen prompt core:** 선택된 `c06-waterline-start-v1.png` / `c06-underwater-end-v1.png`만 사용한다. 재생성하거나 장비를 추가하지 않는다. Prompt 및 시각 검수 기록은 [C05–C06 ImageGen log](keyframes-v3/C05-C06-IMAGEGEN-LOG.md)를 따른다.
- **Negative constraints:** 생성형 ROV/센서, ROV와 센서를 하나의 장비처럼 융합, 가짜 계류 배치, 사람·다이버·손·열대어·산호·난파선·심해 생물, laser/grid/HUD, saturated neon, generated readings 금지.
### C07 · 00:34–00:40 — 실험과 분석

- **Visual purpose:** 현장 관측과 해석 사이에 시료 분석 환경을 짧게 둔다.
- **Start / end frame:** `dist/assets/analysis-lab-v1.webp`를 start/end에 같은 기준 frame으로 사용한다. main-approved generated concept이며 실제 GeoSR 공간·모델을 주장하지 않는다. [승인 prompt/provenance](imagegen-prompts/homepage-lab-equipment-v1.md)를 따른다.
- **Camera / motion:** 같은 still에서 느린 lateral push-in과 얕은 focus 전환만 만든다. 새 디테일·라벨·결과를 생성하지 않고, 화면과 시료 표식은 노출하지 않는다.
- **Web handoff:** 공식 홈 Interpretation panel의 alt와 concept status를 유지한다. 실험실 영상을 실제 자료로 교체하려면 이 scene asset만 교체한다.
- **Source truth gate:** 이미지와 편집물에 generated-concept disclosure를 유지한다. 실제 공간/장비 명칭과 샘플·결과를 주장하려면 별도 source와 권리가 필요하다.
- **ImageGen prompt core:** 새 생성이나 재생성은 하지 않는다. `dist/assets/analysis-lab-v1.webp`만 main-approved concept still로 사용한다. Prompt와 provenance는 [승인 기록](imagegen-prompts/homepage-lab-equipment-v1.md)에 있다.
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

- **Visual purpose:** 위성·현장·환경 입력의 다양성을 실제 자료로 그리지 않고 추상 재질면의 정렬로 소개한다.
- **Start / end frame:** dist/assets/concepts/ax-platform-v4/ax-data-planes-start-v1.png에서 dist/assets/concepts/ax-platform-v4/ax-data-planes-aligned-v1.png로 이동한다. 조건부 승인된 v4 pair는 실제 데이터나 UI가 아니다.
- **Camera / motion:** 16:9 딥 네이비 공간의 세 얇은 물질면이 분리된 상태에서 시작해 중심 우측에서 차분하게 정렬된다. 좌측 여백을 유지하고 00:07에 compact stack으로 멈춘다.
- **Web handoff:** AX hero의 임시 poster는 v4 start 이미지다. 최종 필름 연결 전까지 100svh slot과 KO/EN pending label을 유지한다.
- **Source truth gate:** 세 면은 입력 종류를 위한 비의미적 시각 은유다. 실제 dataset, 지도, 좌표, 분석 결과나 workflow를 나타내지 않는다. 이전 droplets/mist/points A01 v3 pair는 superseded이며 active selection에서 제외하고 keyframe log의 이력으로만 보존한다.
- **ImageGen prompt core:** 이미 생성된 v4 start/end plate를 기준 frame으로 사용한다. 분리된 세 물질면이 절제된 움직임으로 정렬되게 하고 새 형상·문자·화면을 만들지 않는다.
- **Negative constraints:** 사람·문자·숫자·지도·coastline·terrain·grid·chart·button·menu·marker·HUD·neon·추가 오브젝트 금지.

### A02 · 00:07–00:14 — Detect

- **Visual purpose:** 같은 추상 material bridge를 짧게 재사용한 뒤 실제 Discover evidence로 hard cut한다.
- **Start / end frame:** 00:07–00:11은 A01과 같은 dist/assets/concepts/ax-platform-v4/ax-data-planes-start-v1.png 및 ax-data-planes-aligned-v1.png pair를 shared base로 사용한다. 00:11에 실제 dist/assets/films/ax-discover-fast.mp4로 hard cut해 00:14까지 full 16:9로 재생한다.
- **Camera / motion:** conceptual 4초는 세 면의 아주 얕은 depth shift만 허용한다. 00:11 cut 이후 실제 clip에는 pan·zoom·scale·overlay를 얹지 않는다.
- **Web handoff:** actual clip은 홈/상세 AX의 수동 Discover panel 근거로 연결한다. keyboard focus와 manual tab semantics를 유지한다.
- **Source truth gate:** 00:11–00:14 캡처는 Satellite Facility Detection 실제 UI다. 날짜·지역·내용·픽셀을 보존하고 concept frame과 실제 화면을 crossfade하지 않는다.
- **ImageGen prompt core:** 동일한 v4 material pair만 concept bridge의 shared base로 사용한다. 빈 공간과 얕은 면 정렬만 움직이고 00:11에 source UI를 변경 없이 hard cut한다.
- **Negative constraints:** generated satellite image, map, pin, bounding box, detection badge, fake UI/text/value, UI movement, crop, crossfade 금지.

### A03 · 00:14–00:21 — Predict

- **Visual purpose:** 실제 Discover capture 뒤 같은 추상 material bridge를 재사용하고 실제 Predict evidence로 hard cut한다.
- **Start / end frame:** 00:14–00:18은 A01/A02와 같은 v4 start/aligned pair를 shared base로 쓴다. 00:18에 실제 dist/assets/films/ax-predict-fast.mp4로 hard cut해 00:21까지 full 16:9 recording을 보여준다.
- **Camera / motion:** concept 4초에는 같은 세 면의 깊이와 정렬만 매우 얕게 이동한다. 실측 지형처럼 보이는 변형은 금지하며, source UI는 crop·pan·zoom 없이 native playback한다.
- **Web handoff:** 실제 Predict tab 화면으로만 아래 product sequence와 연결한다. 장면 cut이 같은 지역이나 사건의 연속처럼 보이지 않게 한다.
- **Source truth gate:** 00:18–00:21 source clip은 Flood 3D/Predict 실제 UI다. 촬영 당시 연구 시나리오·날짜·값·픽셀을 유지하고 새로운 피해·수위·정확도를 주장하지 않는다.
- **ImageGen prompt core:** 같은 v4 material pair를 shared bridge base로 유지한다. 추상 plate에만 약한 depth shift를 주고 00:18에 실제 Predict recording으로 hard cut한다.
- **Negative constraints:** real Korean coastline, fabricated 3D terrain, flood extent, numerical results, graph, legend, chart, UI, glowing grid, neon, text, crossfade 금지.

### A04 · 00:21–00:28 — Monitor

- **Visual purpose:** A01부터 이어 온 동일한 추상 material pair를 짧게 재사용한 뒤 실제 Monitor evidence로 hard cut한다.
- **Start / end frame:** 00:21–00:25은 v4 start/aligned pair를 같은 shared base로 사용한다. 00:25에 실제 dist/assets/films/ax-monitor-fast.mp4로 hard cut해 00:28까지 full 16:9 recording을 보여준다. 필요하면 buoy-poster.webp 또는 env-poster.webp는 별도의 frame 확인 reference로만 쓴다.
- **Camera / motion:** concept 구간은 같은 세 면에 한 번의 아주 느린 horizontal drift만 적용한다. 00:25 hard cut 이후 recording은 편집·확대 없이 고정한다.
- **Web handoff:** actual Monitor capture는 아래 실제 product panel의 source evidence다. website는 autoplay가 아니라 수동 선택으로 동작한다.
- **Source truth gate:** clip의 날짜·station·variable·observation state는 capture 당시 값이다. 현재값이나 실시간 연결로 표시하지 않으며, concept frame과 UI는 crossfade하지 않는다.
- **ImageGen prompt core:** shared v4 material pair에서 restrained light/depth passage만 만든 뒤 00:25에 actual Monitor clip으로 hard cut한다. plotted timeline이나 새 data는 생성하지 않는다.
- **Negative constraints:** time-series graph, value, buoy icon, map, named station, fake live status, text, dashboard, grid, neon, human, crossfade 금지.

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
- [ ] C05 배경은 main-reviewed `dist/assets/concepts/corporate-film-v3/c05-coast-end-v1.png`를 사용한다. 선택적 해누리호/USV insert는 권리와 원본 픽셀·비율 검토를 통과할 때만 한 종류를 사용하며, 미확인 시 생략한다.
- [ ] 16:9 contact sheet와 장면별 start/end pair, camera/motion test를 먼저 main review에 공유한다. 사용자가 수정할 수 있는 checkpoint를 두고 승인 전 유료 생성하지 않는다.
- [ ] C06 배경은 main-reviewed `dist/assets/concepts/corporate-film-v3/c06-waterline-start-v1.png` 및 `c06-underwater-end-v1.png`를 사용한다. 선택적 `dist/assets/equipment-rov.png` insert는 권리와 원본 픽셀·비율 검토를 통과할 때만 쓴다. ROV-센서 배치 주장을 만들지 않는다.
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

**현재 상태:** v3 storyboard baseline은 확정된 기본 경로다. C05·C06의 concept background와 C07 lab concept는 main-reviewed selected 상태이며 실제 GeoSR 현장 증거가 아니다. C05/C06의 선택적 장비 insert는 권리와 픽셀 보존 검토가 남아 있고, 모든 장면의 최종 motion/edit 및 회사 60초·AX 30초 영상은 아직 완료되지 않았다. 이 문서 작성은 배포나 최종 공개 승인을 뜻하지 않는다.
