# 장면별 복사용 제작 카드

원본은 `production-plan.json`이며 이 파일은 `node scripts/render_continuation_prompts.mjs`로 다시 생성

**이 문서가 완비되어 있어도 생성물 검수가 끝난 것은 아님**

`source-composite`는 원본 보존 합성 지시이며 ImageGen에 그대로 재도색 요청하지 않음

`imagegen-reference`는 참조 파일을 실제로 확인하고 붙인 뒤 사용 / 생성 전에 sourceRequirements 해결

모션 프롬프트는 시작·중간·끝 keyframe 검수를 통과한 뒤 사용 / 비용은 실제 UI에서 확인

## CF01 — 지구에서 시작

편집 0–4초 / 4초 / source-composite / planned-needs-source-and-frame-review

회사의 관측 범위를 먼저 보여주고 위성을 주인공보다 관측 수단으로 도입

### 참조와 남은 확인

- [earth](../../dist/assets/concepts/corporate-film/hero-earth-00s-v4.png) — 후보 또는 근거이며 최종 합격 아님
- [opening-review](../../docs/redesign-production/OPENING-V4-REVIEW.md) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 지구 texture 원본 출처와 해상도 확인
- 확인 필요 — 최종 조명·카메라 master 저장

### 구도

- 시작 — 동아시아가 읽히는 지구 우측70% / 좌측35% 제목 여백
- 중간 — 같은 지구 표면의 미세한 접근
- 종료 — CF02와 동일한 지구·구름·조명

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 동아시아가 읽히는 지구 우측70% / 좌측35% 제목 여백
FRAME MIDDLE: 같은 지구 표면의 미세한 접근
FRAME END: CF02와 동일한 지구·구름·조명

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Use the existing East Asia Earth reference as a geographical anchor, not an invitation to repaint geography. Compose the curved Earth over the right two thirds, a thin realistic atmospheric rim and deep near-black space on the left. Natural ocean navy, restrained cloud whites, visible Korea only at its correct scale. No satellite in the opening still. Avoid toy-like globe relief and city-light fantasy. Improve depth through illumination and source resolution, not coastline alteration.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

A very slow continuous camera approach over four editorial seconds. Earth remains a rigid sphere with the same cloud texture and light direction. No fast spin, stretching of countries or atmospheric pulse. Preserve the final camera and exposure for CF02.
```

### 후반 합성과 연결

Build one Earth master from a documented texture and a fixed camera. Reuse its exact transform in CF02 and CF13. Keep web title as HTML.

CF13 끝 프레임과 밝기·구도 동일 / CF02 첫 프레임과 무컷 연결

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- 한반도·일본 상대 위치 오류
- 지구 표면이 젤리처럼 움직임
- 검은 배경만 커지고 지구 디테일 부족

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF01-start.png`
- middle — `docs/redesign-next/keyframes/CF01-middle.png`
- end — `docs/redesign-next/keyframes/CF01-end.png`
- candidate — `docs/redesign-next/renders/CF01-take01.mp4`
- review — `docs/redesign-next/reviews/CF01-take01.json`

## CF02 — 위성의 관측

편집 4–8초 / 4초 / source-composite / planned-needs-source-and-frame-review

위성 등장과 관측 대상을 이해시키되 특정 센서가 모든 변수를 측정한다는 오해 방지

### 참조와 남은 확인

- [satellite](../../dist/assets/concepts/corporate-film/hero-earth-satellite-07s-v4.png) — 후보 또는 근거이며 최종 합격 아님
- [opening-review](../../docs/redesign-production/OPENING-V4-REVIEW.md) — 후보 또는 근거이며 최종 합격 아님
- [earth](../../dist/assets/concepts/corporate-film/hero-earth-00s-v4.png) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 위성 구조·관측 방향을 검토할 원본 또는 검증된 모델 선택
- 확인 필요 — 본체와 지구 분리 가능 상태 확보

### 구도

- 시작 — CF01 마지막 지구 / 화면 우측 밖 위성
- 중간 — 화면 우상단의 작은 위성 / 센서 지구 방향
- 종료 — 위성이 가장자리를 지나고 지구가 시각 중심

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: CF01 마지막 지구 / 화면 우측 밖 위성
FRAME MIDDLE: 화면 우상단의 작은 위성 / 센서 지구 방향
FRAME END: 위성이 가장자리를 지나고 지구가 시각 중심

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Prepare an isolated physically coherent Earth-observation spacecraft reference or verified spacecraft model. Rigid rectangular solar arrays, a stable central bus, plausible sensor aperture directed toward Earth. The craft is a small foreground accent in the upper-right region, not a giant fantasy space station. Match Earth illumination and cast shadows consistently. Do not imply a named real mission unless its configuration is verified.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

Translate the spacecraft smoothly across the upper-right over a near-constant depth range while the Earth camera continues CF01. Keep panel count, bus proportions and sensor orientation unchanged. A subtle observation footprint may appear only in the later source overlay. No visible laser beam. Use separate spacecraft and Earth layers if the generator changes shape.
```

### 후반 합성과 연결

Do not repeat the rejected opening-v4 one-pass animation. Animate an isolated rigid spacecraft layer or verified 3D model over the fixed Earth master. Add a restrained observation area in post only when sensor geometry is justified.

CF01 지구 master 공유 / CF03는 위성 이동 방향과 같은 방향의 지역 접근

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- 위성 크기·패널 수 변화
- 센서가 우주를 보는데 지구 촬영으로 표현
- SF 레이저

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF02-start.png`
- middle — `docs/redesign-next/keyframes/CF02-middle.png`
- end — `docs/redesign-next/keyframes/CF02-end.png`
- candidate — `docs/redesign-next/renders/CF02-take01.mp4`
- review — `docs/redesign-next/reviews/CF02-take01.json`

## CF03 — 한반도와 북서태평양

편집 8–13초 / 5초 / source-composite / planned-needs-source-and-frame-review

글로벌 관측에서 국내 해양·환경 연구 영역으로 연결

### 참조와 남은 확인

- [regional](../../dist/assets/concepts/corporate-film/hero-earth-18s-v1.png) — 후보 또는 근거이며 최종 합격 아님
- [data](../../docs/redesign-production/keyframes/sources/corporate-film-c04-v1/gibs-c04-source-manifest.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 공통 지도 extent·projection·north 기준 기록

### 구도

- 시작 — 동아시아가 보이는 구면 지구
- 중간 — 한반도와 인근 해역 중심으로 완만히 접근
- 종료 — 북서태평양 일부와 한국·일본이 포함된 지역 시야

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 동아시아가 보이는 구면 지구
FRAME MIDDLE: 한반도와 인근 해역 중심으로 완만히 접근
FRAME END: 북서태평양 일부와 한국·일본이 포함된 지역 시야

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Create the regional keyframes by camera movement and geographic projection of the same source Earth. Show the Korean Peninsula, Jeju, the Korea Strait, Japan and adjacent Northwest Pacific without inventing coastlines or exaggerating mountains. A clear oblique-to-near-plan transition, moderate cloud cover that does not hide the area of interest. Keep north orientation documented across frames.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

Five seconds of controlled camera approach. Ease the Earth curvature into a readable regional view without morphing land. End on a stable source-registered map plane for at least half a second. Do not dive through clouds into an unrelated generated coast.
```

### 후반 합성과 연결

Use a geographic camera or source-image reprojection; manually verify landmarks at all keyframes. Derived map layers in CF04 share this extent and orientation.

CF04의 모든 자료 평면은 CF03 종료 영역과 정합

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- 제주 누락 또는 한반도 형태 변형
- 카메라 전환 중 일본 위치 이동
- 다른 해역으로 숨은 점프

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF03-start.png`
- middle — `docs/redesign-next/keyframes/CF03-middle.png`
- end — `docs/redesign-next/keyframes/CF03-end.png`
- candidate — `docs/redesign-next/renders/CF03-take01.mp4`
- review — `docs/redesign-next/reviews/CF03-take01.json`

## CF04 — 관측자료의 분리와 해석

편집 13–19초 / 6초 / source-composite / planned-needs-source-and-frame-review

수온·염분·클로로필의 서로 다른 정보를 여러 층으로 읽는 장면

### 참조와 남은 확인

- [data](../../docs/redesign-production/keyframes/sources/corporate-film-c04-v1/gibs-c04-source-manifest.json) — 후보 또는 근거이며 최종 합격 아님
- [regional](../../dist/assets/concepts/corporate-film/hero-earth-18s-v1.png) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 실제 제품·관측 기간·범례·단위·결측 확인
- 확인 필요 — 같은 extent 재투영과 coastline alignment 확인

### 구도

- 시작 — 지역 지도가 읽히는 한 평면
- 중간 — 수온과 염분의 별도 자료 평면이 얕게 분리
- 종료 — 세 변수의 평면이 같은 지역 위에 정렬 / 분석할 한 영역 강조

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 지역 지도가 읽히는 한 평면
FRAME MIDDLE: 수온과 염분의 별도 자료 평면이 얕게 분리
FRAME END: 세 변수의 평면이 같은 지역 위에 정렬 / 분석할 한 영역 강조

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Compose three restrained two-dimensional scientific data planes over the same regional Earth view, using supplied SST, SSS and chlorophyll rasters without repainting them. Each plane retains identical geographic registration, land masks and missing-data holes. Physical separation is a visual metaphor only. Use the source palettes, a fine neutral edge and shallow perspective; no neon holographic glow. Allow only one or two planes to dominate at a time so the region stays legible.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

Over six editorial seconds, reveal SST first, separate SSS above it, then reveal chlorophyll. Hold the combined relationship briefly. A small source-backed region is then selected for an editorial cut to field observation. Do not animate one variable turning into another. No interpolated fake measurements.
```

### 후반 합성과 연결

Composite exact rasters and small HTML/post labels for product and period. Monthly SST, monthly SSS and daily chlorophyll currently have different sampling support; keep this difference in provenance and avoid any simultaneous-measurement claim. Preserve no-data regions. If labels cannot be readable, simplify the number of layers rather than invent certainty.

해역 선택에서 CF05로 명확한 매치 컷 / 조사선의 실제 지역을 모르면 동일 위치 관통 전환 금지

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- 결측을 임의 보간
- 염분장을 고해상도 연안 실측처럼 표현
- 육지에 해양 자료 색칠
- 하나의 센서가 세 변수를 직접 측정하는 서사

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF04-start.png`
- middle — `docs/redesign-next/keyframes/CF04-middle.png`
- end — `docs/redesign-next/keyframes/CF04-end.png`
- candidate — `docs/redesign-next/renders/CF04-take01.mp4`
- review — `docs/redesign-next/reviews/CF04-take01.json`

## CF05 — 현장 관측과 측량

편집 19–23초 / 4초 / imagegen-reference / planned-needs-source-and-frame-review

풍경보다 장비가 수행하는 측량 행동이 먼저 보이는 컷

### 참조와 남은 확인

- [equipment](../../docs/redesign-production/equipment-sources/manifest.json) — 후보 또는 근거이며 최종 합격 아님
- [usv](../../dist/assets/equipment-usv-original.png) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 사용 선체 참조 결정과 충분한 해상도
- 확인 필요 — 실제 GeoSR 장비로 주장하려면 모델·원본 확인

### 구도

- 시작 — 선박 또는 무인선의 전체 윤곽과 수면 접점
- 중간 — 같은 선체가 일정 방향으로 이동 / 관측 행위 중심
- 종료 — 이동 방향과 낮은 수평선 유지

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 선박 또는 무인선의 전체 윤곽과 수면 접점
FRAME MIDDLE: 같은 선체가 일정 방향으로 이동 / 관측 행위 중심
FRAME END: 이동 방향과 낮은 수평선 유지

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Create a low oblique engineering-documentary view of one source-referenced survey vessel or unmanned survey boat on Korean coastal water. Choose one hull from the reference, preserve its beam, deck arrangement and antenna positions. The boat occupies roughly the right half of the frame with enough water to read its modest wake. Natural daylight, credible draft and water displacement, no dramatic storm. Keep people absent. Do not invent a harbor or populate the scene with extra vessels. If detailed hardware is not visible in the source, use a wider view rather than inventing it.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

A parallel tracking move follows the craft at a modest survey speed. Wake develops continuously behind the stern and matches the travel direction. The hull never stretches or changes fittings. Keep the device stable and let moving water convey operation. No vessel leap or abrupt acceleration.
```

### 후반 합성과 연결

If verified multibeam data are available, add a brief separate cutaway of the under-hull acoustic sampling fan and source bathymetry. It is an explanatory overlay, not visible light in water. Otherwise use a clean survey shot with no invented output.

진행 방향을 CF06의 부이 또는 관측 지점 접근과 맞춤

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- 원본과 다른 선체
- 수면에 뜨지 않는 흘수
- 소나 레이저
- 새로 만든 해안·항만

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF05-start.png`
- middle — `docs/redesign-next/keyframes/CF05-middle.png`
- end — `docs/redesign-next/keyframes/CF05-end.png`
- candidate — `docs/redesign-next/renders/CF05-take01.mp4`
- review — `docs/redesign-next/reviews/CF05-take01.json`

## CF06 — 수면에서 수층으로

편집 23–26초 / 3초 / imagegen-reference / planned-needs-source-and-frame-review

해수 관측과 물속 센서가 연결되는 수직 구조

### 참조와 남은 확인

- [equipment](../../docs/redesign-production/equipment-sources/manifest.json) — 후보 또는 근거이며 최종 합격 아님
- [technology](../../docs/redesign-production/TECHNOLOGY-MAP.md) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 부이 또는 수층장비 한 종류의 실물 구조 확인
- 확인 필요 — 장비 선택 전에는 생성하지 않음

### 구도

- 시작 — 부이 수면 접점 또는 검증된 채수·관측 장치
- 중간 — 수면을 기준으로 계류 또는 케이블이 아래로 이어짐
- 종료 — 어두운 수중 시야로 전환 준비

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 부이 수면 접점 또는 검증된 채수·관측 장치
FRAME MIDDLE: 수면을 기준으로 계류 또는 케이블이 아래로 이어짐
FRAME END: 어두운 수중 시야로 전환 준비

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Prepare one modest-scale surface observation scene based on a verified buoy or deployed water-column instrument reference. Show a credible waterline and attachment geometry. For a buoy, the mooring leads downward from the appropriate submerged attachment; for a lowered instrument, one continuous load-bearing cable comes from a supported lifting point. Choose only one configuration. Natural water, restrained reflections, no people, no floating unsupported cables and no invented sensor name.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

Three editorial seconds with slight wave-driven heave and continuous cable attachment. Move the camera toward the water surface, then make a clean cut beneath it. Do not ask the generator to transform a buoy into a CTD or a vehicle.
```

### 후반 합성과 연결

Use source-based above/below-water plates if a single take distorts waterline geometry. Keep CTD measurements separate from chemical sample analysis. No fabricated real-time display.

수면의 수직 방향을 CF07 수중 카메라 방향과 연결 / 같은 장비라고 단정하지 않음

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- 케이블이 공중에서 시작
- 계류가 부력·하중과 불일치
- CTD와 채수기를 같은 기능으로 단정

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF06-start.png`
- middle — `docs/redesign-next/keyframes/CF06-middle.png`
- end — `docs/redesign-next/keyframes/CF06-end.png`
- candidate — `docs/redesign-next/renders/CF06-take01.mp4`
- review — `docs/redesign-next/reviews/CF06-take01.json`

## CF07 — 수중 조사

편집 26–30초 / 4초 / imagegen-reference / planned-needs-source-and-frame-review

수중 영상과 센서 기반 연구 역량을 정확한 스케일로 표현

### 참조와 남은 확인

- [equipment](../../docs/redesign-production/equipment-sources/manifest.json) — 후보 또는 근거이며 최종 합격 아님
- [technology](../../docs/redesign-production/TECHNOLOGY-MAP.md) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — ROV 원본 또는 다른 검증된 수중 관측 장면 선택
- 확인 필요 — 수중 시야·스케일·테더 검토

### 구도

- 시작 — 입자가 약간 있는 근해 수중 시야
- 중간 — 참조 ROV의 느린 조사 또는 검증된 고정 센서의 관측 맥락
- 종료 — 관찰 대상이 화면 중심에 남음

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 입자가 약간 있는 근해 수중 시야
FRAME MIDDLE: 참조 ROV의 느린 조사 또는 검증된 고정 센서의 관측 맥락
FRAME END: 관찰 대상이 화면 중심에 남음

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Create a sober underwater engineering concept with a source-referenced ROV viewed three-quarter rear at modest distance. Preserve the actual frame, thruster arrangement and tether attachment from the accepted reference. A tether extends plausibly out of frame with slack consistent with motion. Moderate coastal turbidity, limited light range, believable scale against seabed texture. Do not add coral reefs, tropical fish or giant ruins. If using a fixed sensor instead, make a separate composition and use its verified mounting, never convert the vehicle into a sensor.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

A slow lateral inspection pass over four seconds with minimal suspended particles and fixed vehicle geometry. Lighting illuminates only a plausible nearby area. End on a stable inspected feature suitable for an image-record cut. No impossible high-speed underwater flight.
```

### 후반 합성과 연결

Keep the ROV footage source-grounded. Any inspection annotations are post-composited and explicitly conceptual unless an actual reviewed result is supplied. TPRBM identity remains unverified and must not be replaced with an assumed instrument.

수중 기록의 평면에서 CF08 측량 결과 평면으로 매치 컷 / 동일 장소 연속 주장 없음

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- ROV 테더 단절
- 추진기 수 변화
- 열대 수중 환경
- 미확인 센서 모델 단정

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF07-start.png`
- middle — `docs/redesign-next/keyframes/CF07-middle.png`
- end — `docs/redesign-next/keyframes/CF07-end.png`
- candidate — `docs/redesign-next/renders/CF07-take01.mp4`
- review — `docs/redesign-next/reviews/CF07-take01.json`

## CF08 — 연안과 하구의 공간정보

편집 30–35초 / 5초 / source-composite / planned-needs-source-and-frame-review

육상·연안 측량과 공간정보 구축을 보여줌

### 참조와 남은 확인

- [technology](../../docs/redesign-production/TECHNOLOGY-MAP.md) — 후보 또는 근거이며 최종 합격 아님
- [migration](../../docs/source-migration/migration-coverage.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 위치 확인된 항공 원본
- 확인 필요 — 정사영상·점군 대응 자료 또는 개념 표시

### 구도

- 시작 — 출처 확인된 한국 연안 또는 하구의 실제 항공 영상
- 중간 — 같은 지형 위 부분 점군·촬영 범위가 나타남
- 종료 — 정사영상 또는 지표면 모델이 정합된 상태

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 출처 확인된 한국 연안 또는 하구의 실제 항공 영상
FRAME MIDDLE: 같은 지형 위 부분 점군·촬영 범위가 나타남
FRAME END: 정사영상 또는 지표면 모델이 정합된 상태

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Use a documented Korean coast or river-estuary aerial source and its own orthophoto or point cloud. Keep roads, shoreline, breakwaters and vegetation precisely registered. The concept finishing should feel like engineering visualization over reality: a localized white-to-muted-blue sampling reveal transitions to the actual measured surface. Do not generate a new harbor. A drone may be shown only from an accepted hardware reference and only when its presence explains the acquisition.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

A slow aerial lateral move retains the shoreline. Reveal the source point cloud progressively across a limited region, then settle into the corresponding terrain surface. Five seconds, one region, one sensing method. Do not sweep a laser across deep water and reveal unsupported bathymetry.
```

### 후반 합성과 연결

Georeferenced data overlays are deterministic. Photogrammetry and ordinary topographic LiDAR concern visible terrain; bathymetric LiDAR requires a distinct verified system and suitable water conditions. If only a photograph exists, use it without manufacturing measured point-cloud evidence.

CF09에 동일 입력 자료를 넘겨 처리 관계가 읽히게 함

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- 사용자 거부 해안 사용
- 방파제·항로 재창작
- 사진만 있는데 실측 점군이라고 주장
- 일반 LiDAR로 깊은 해저 탐사

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF08-start.png`
- middle — `docs/redesign-next/keyframes/CF08-middle.png`
- end — `docs/redesign-next/keyframes/CF08-end.png`
- candidate — `docs/redesign-next/renders/CF08-take01.mp4`
- review — `docs/redesign-next/reviews/CF08-take01.json`

## CF09 — 자료에서 분석으로

편집 35–40초 / 5초 / source-composite / planned-needs-source-and-frame-review

AI와 분석이 자료를 어떻게 해석하는지 과장 없는 시각으로 표현

### 참조와 남은 확인

- [technology](../../docs/redesign-production/TECHNOLOGY-MAP.md) — 후보 또는 근거이며 최종 합격 아님
- [migration](../../docs/source-migration/migration-coverage.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 회사 연구 사례의 입력·출력 짝 확보
- 확인 필요 — 없으면 개념 도식임을 명시

### 구도

- 시작 — CF08의 실제 입력 이미지 또는 별도 검증된 연구 입력
- 중간 — 선택 영역과 검토한 중간 표현
- 종료 — 실제 또는 명시된 개념 결과가 입력 옆에 정렬

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: CF08의 실제 입력 이미지 또는 별도 검증된 연구 입력
FRAME MIDDLE: 선택 영역과 검토한 중간 표현
FRAME END: 실제 또는 명시된 개념 결과가 입력 옆에 정렬

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Build an editorial scientific analysis plate with one real input and one clearly related output. Use a documented GeoSR research example where input and result can be matched. Prefer a semantic segmentation boundary, quality mask or forecast comparison over floating code and neural-network spheres. Keep the input visible and the result spatially aligned. Use large clean fields with ample negative space, no application chrome and no AX-specific screen.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

A five-second deterministic sequence: identify an input region, reveal the reviewed result over that region, then separate the result slightly for comparison. Do not display fabricated neural activity or invented accuracy numbers. The process is a visual explanation, not a claim of live computation.
```

### 후반 합성과 연결

Use actual research output where available. Without it, use an explicitly conceptual unquantified processing diagram and keep it out of research-result claims. Post labels distinguish input and interpretation. Do not reassign AX facility detection footage to the company film.

결과 선택 영역의 원형 디테일에서 CF10 시료 디테일로 명확한 편집 컷

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- 가짜 정확도
- 입력과 무관한 결과
- AX UI 또는 AX 전용 장면 유입

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF09-start.png`
- middle — `docs/redesign-next/keyframes/CF09-middle.png`
- end — `docs/redesign-next/keyframes/CF09-end.png`
- candidate — `docs/redesign-next/renders/CF09-take01.mp4`
- review — `docs/redesign-next/reviews/CF09-take01.json`

## CF10 — 해수와 환경 시료 분석

편집 40–44초 / 4초 / imagegen-reference / planned-needs-source-and-frame-review

좋은 실험 이미지의 분위기를 유지하며 장비 연결과 분석 단계 교정

### 참조와 남은 확인

- [lab](../../dist/assets/generated/candidates-v2/flow-lab-ecology-v1.png) — 후보 또는 근거이며 최종 합격 아님
- [technology](../../docs/redesign-production/TECHNOLOGY-MAP.md) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 여과 장치 사용 단계와 관 연결 검토
- 확인 필요 — 회사 실제 실험실 사진으로 오인되지 않는 문맥

### 구도

- 시작 — 사람 없는 정돈된 실험대와 해수 시료 용기
- 중간 — 검증된 여과 또는 시료 준비 장치의 근접
- 종료 — 시료 용기와 분석 장비 사이 관계가 읽힘

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 사람 없는 정돈된 실험대와 해수 시료 용기
FRAME MIDDLE: 검증된 여과 또는 시료 준비 장치의 근접
FRAME END: 시료 용기와 분석 장비 사이 관계가 읽힘

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Create a people-free environmental chemistry laboratory concept inspired by the supplied laboratory image. Simplify it to a small group of seawater sample bottles and one physically coherent sample-preparation station. Realistic borosilicate glass, neutral benchtop, restrained stainless steel, soft side light. If vacuum filtration is included, show a continuous hose from the flask side arm to its appropriate downstream trap and pump with no floating ends. Do not show measurement taking place in an open-lid spectrometer. Keep the back of the bench uncluttered and left third available for web copy. No fake instrument labels.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

A gentle four-second macro dolly across a fixed sample bottle and prepared filtration apparatus. Only plausible tiny liquid movement and lighting variation. No spontaneous liquid transfer, moving hoses, invented pipetting or hands. Finish on a circular vial or optical opening for the next match cut.
```

### 후반 합성과 연결

Keep actual lab identification out of the concept. Add sample context in HTML rather than generating text labels. If apparatus geometry remains uncertain, reduce the shot to verified closed sample vessels and documented equipment surfaces.

시료 원형 디테일을 CF11 현미경 시야에 맞춤

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- 손·사람 생성
- 튜브가 잘못 연결됨
- 열린 장비에서 측정 광선
- 가짜 실험 결과

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF10-start.png`
- middle — `docs/redesign-next/keyframes/CF10-middle.png`
- end — `docs/redesign-next/keyframes/CF10-end.png`
- candidate — `docs/redesign-next/renders/CF10-take01.mp4`
- review — `docs/redesign-next/reviews/CF10-take01.json`

## CF11 — 생물과 플랑크톤 분석

편집 44–48초 / 4초 / imagegen-reference / planned-needs-source-and-frame-review

화학 분석과 다른 생태·생물 연구 업무를 분명히 보여줌

### 참조와 남은 확인

- [lab](../../dist/assets/generated/candidates-v2/flow-lab-ecology-v1.png) — 후보 또는 근거이며 최종 합격 아님
- [technology](../../docs/redesign-production/TECHNOLOGY-MAP.md) — 후보 또는 근거이며 최종 합격 아님
- [migration](../../docs/source-migration/migration-coverage.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 실제 현미경 자료의 출처·배율 확인 또는 장비 컷으로 제한

### 구도

- 시작 — 검증된 현미경과 시료 준비 구도
- 중간 — 실제 시료 영상의 제한된 시야
- 종료 — 영상 분석 대상과 분류 맥락

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 검증된 현미경과 시료 준비 구도
FRAME MIDDLE: 실제 시료 영상의 제한된 시야
FRAME END: 영상 분석 대상과 분류 맥락

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Create a people-free microscope sample-preparation still with one realistic microscope, a slide or sample chamber in the correct stage position, and a small number of appropriate covered sample containers. Use the supplied lab image as tonal reference only. Do not generate species-specific organisms or claim specimen identification. Reserve a clean area for compositing a separately sourced, scale-documented microscopy image. Natural scientific photography rather than a glowing sci-fi laboratory.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

A controlled short push toward the microscope optical area followed by an editorial cut to the genuine microscopy plate. If no genuine plate is available, remain on the instrument and specimen-preparation context. Do not fabricate swimming behavior, cell division or automated species labels.
```

### 후반 합성과 연결

Microscopy imagery, species names and scale bars must come from reviewed source material. A generic concept organism cannot serve as a biological finding. Use a clean match cut, not a physical flight through the microscope optics.

분석 결과의 의미가 CF12 입력과 관계있을 때만 데이터 전달 연출 / 없으면 연구 분야 간 컷

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- 생성 플랑크톤을 특정 종으로 표기
- 과장된 생물 형태
- 측정 배율 조작

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF11-start.png`
- middle — `docs/redesign-next/keyframes/CF11-middle.png`
- end — `docs/redesign-next/keyframes/CF11-end.png`
- candidate — `docs/redesign-next/renders/CF11-take01.mp4`
- review — `docs/redesign-next/reviews/CF11-take01.json`

## CF12 — 모델과 예측

편집 48–55초 / 7초 / source-composite / planned-needs-source-and-frame-review

관측·분석에서 환경 변화 예측으로 확장하는 연구 역량

### 참조와 남은 확인

- [technology](../../docs/redesign-production/TECHNOLOGY-MAP.md) — 후보 또는 근거이며 최종 합격 아님
- [migration](../../docs/source-migration/migration-coverage.json) — 후보 또는 근거이며 최종 합격 아님
- [data](../../docs/redesign-production/keyframes/sources/corporate-film-c04-v1/gibs-c04-source-manifest.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 연구 사례와 결과 파일 및 시나리오 조건 대응
- 확인 필요 — 없으면 개념 표현 범위 축소

### 구도

- 시작 — 확인된 연구 영역과 입력 자료
- 중간 — 같은 영역에서 한 변수의 시간 변화
- 종료 — 같은 범례를 가진 두 조건 또는 관측·모델 비교

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 확인된 연구 영역과 입력 자료
FRAME MIDDLE: 같은 영역에서 한 변수의 시간 변화
FRAME END: 같은 범례를 가진 두 조건 또는 관측·모델 비교

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Create a cinematic but scientifically controlled model-result composition from a documented GeoSR numerical study. Choose one physical quantity and one real domain: for example temperature dispersion, coastal water level or a reviewed transport case. Keep the source terrain, wet/dry mask, boundary treatment and palette intact. Use an oblique contextual base with a readable two-dimensional result layer rather than a report chart enlarged as wallpaper. No generic blue currents applied to every sea.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

Over seven editorial seconds, show source time steps with a visible distinction between observed input and model scenario. Reveal one meaningful change, then widen toward the regional context. Do not change the colormap between scenarios or animate unsupported forecasts between unrelated datasets.
```

### 후반 합성과 연결

Model rasters and vector outputs remain deterministic. Labels, time and scenario metadata are post-composited. If no validated output can be located, render a clearly marked conceptual scenario without measurements and do not present it as a company achievement.

CF13 지역·지구 master와 같은 시야로 widen / 회사 본편 마지막까지 AX 제외

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- 모델링을 관측으로 표시
- 해류·염분·침수를 혼합
- 범례 변화로 성과 과장
- 미확인 연구 수치

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF12-start.png`
- middle — `docs/redesign-next/keyframes/CF12-middle.png`
- end — `docs/redesign-next/keyframes/CF12-end.png`
- candidate — `docs/redesign-next/renders/CF12-take01.mp4`
- review — `docs/redesign-next/reviews/CF12-take01.json`

## CF13 — 연구의 범위와 루프

편집 55–60초 / 5초 / source-composite / planned-needs-source-and-frame-review

회사 전체 연구 범위를 조망하고 자연스러운 첫 장면 복귀

### 참조와 남은 확인

- [earth](../../dist/assets/concepts/corporate-film/hero-earth-00s-v4.png) — 후보 또는 근거이며 최종 합격 아님
- [regional](../../dist/assets/concepts/corporate-film/hero-earth-18s-v1.png) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — CF01 master와 동일 프레임 사용
- 확인 필요 — 합성 타임라인의 정확한60초 길이

### 구도

- 시작 — CF12 종료 지역 시야
- 중간 — 지구 표면이 다시 읽히는 넓은 시야
- 종료 — CF01 시작 master와 동일한 위치·밝기·구름

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: CF12 종료 지역 시야
FRAME MIDDLE: 지구 표면이 다시 읽히는 넓은 시야
FRAME END: CF01 시작 master와 동일한 위치·밝기·구름

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Use the exact CF01 Earth master and documented regional camera path in reverse editorial context. The ending frame must match the opening composition, atmosphere, exposure and cloud texture. Do not add AX product screens, corporate statistics or a giant rendered logo. Preserve space for the persistent HTML company title.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

Five-second calm pullback with the apparent speed easing to the initial CF01 speed. Use the identical opening frame as the final seam target. If the approach is not physically smooth, use a short controlled luminance-matched dissolve between identical Earth plates rather than a geographic morph.
```

### 후반 합성과 연결

Check the actual loop as ten repeated cycles at playback speed. Avoid repeated fade-to-black that makes the hero look like a video advert restart.

CF01 시작 master와 동일한 지구 위치·구름·밝기로 종료하고 반복 재생에서 속도와 노출 이음새 확인

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- 마지막과 처음 지구 위치 점프
- 갑작스러운 밝기 변화
- 마지막에 AX 끼워넣기

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF13-start.png`
- middle — `docs/redesign-next/keyframes/CF13-middle.png`
- end — `docs/redesign-next/keyframes/CF13-end.png`
- candidate — `docs/redesign-next/renders/CF13-take01.mp4`
- review — `docs/redesign-next/reviews/CF13-take01.json`

## AX01 — 서로 다른 입력 자료

편집 0–5초 / 5초 / source-composite / planned-needs-source-and-frame-review

각 서비스가 다루는 입력 자료와 세 기능의 범위를 소개

### 참조와 남은 확인

- [technology](../../docs/redesign-production/TECHNOLOGY-MAP.md) — 후보 또는 근거이며 최종 합격 아님
- [ax-detect-start](../../dist/assets/concepts/ax-detection-v3/ax-detect-start.png) — 후보 또는 근거이며 최종 합격 아님
- [data](../../docs/redesign-production/keyframes/sources/corporate-film-c04-v1/gibs-c04-source-manifest.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 세 주제의 정확한 source·concept 분류

### 구도

- 시작 — 상단45% 또는 좌측35% 타이틀 여백의 짙은 남색 공간
- 중간 — 영상·지형·관측 지점의 세 실제 주제
- 종료 — 탐지 대상 영상이 중심에 남음

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 상단45% 또는 좌측35% 타이틀 여백의 짙은 남색 공간
FRAME MIDDLE: 영상·지형·관측 지점의 세 실제 주제
FRAME END: 탐지 대상 영상이 중심에 남음

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Compose a high-end editorial concept stage with three genuinely different input types: a source aerial image of offshore facilities, a verified simplified terrain surface, and a sparse station-location field. These are independent analysis contexts, not glass browser windows. Use natural material and source map colors with restrained white structural accents. No actual application UI or imaginary dashboards. Make the facility imagery dominant toward the end so detection follows logically.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

Three source panels enter with subtle depth parallax and settle without flipping. The facility input expands to the next shot while other contexts recede. No suggestion of data being automatically exchanged among existing GeoSR services.
```

### 후반 합성과 연결

Use controlled source layers and preserve each context identity. The visual workspace is explicitly conceptual. Keep AX title in HTML.

AX02의 동일 facility plate로 확대

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- 내용 없는 유리 패널
- 실제 UI 사용
- 서로 다른 플랫폼 자동 연동 주장

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/AX01-start.png`
- middle — `docs/redesign-next/keyframes/AX01-middle.png`
- end — `docs/redesign-next/keyframes/AX01-end.png`
- candidate — `docs/redesign-next/renders/AX01-take01.mp4`
- review — `docs/redesign-next/reviews/AX01-take01.json`

## AX02 — 탐지

편집 5–12초 / 7초 / source-composite / planned-needs-source-and-frame-review

영상에서 시설물 대상을 추출하는 개념을 한눈에 전달

### 참조와 남은 확인

- [ax-detect-start](../../dist/assets/concepts/ax-detection-v3/ax-detect-start.png) — 후보 또는 근거이며 최종 합격 아님
- [ax-detect-end](../../dist/assets/concepts/ax-detection-v3/ax-detect-end.png) — 후보 또는 근거이며 최종 합격 아님
- [ax-review](../../docs/redesign-production/AX-DETECTION-V3-REVIEW.md) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 시설물 구조·간격 검토
- 확인 필요 — 기존8초 후보 전체 재검수

### 구도

- 시작 — 세 시설물 그룹과 여백 / 현재 시작 이미지 후보
- 중간 — 같은 시설 윤곽에 얇은 중성색 선이 등장
- 종료 — 대상만 정리된 결과 / 현재 종료 이미지 후보

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 세 시설물 그룹과 여백 / 현재 시작 이미지 후보
FRAME MIDDLE: 같은 시설 윤곽에 얇은 중성색 선이 등장
FRAME END: 대상만 정리된 결과 / 현재 종료 이미지 후보

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Use the existing AX detection concept references as a candidate plate, not a real facility survey. Keep a coherent small set of offshore facility groups on open water with physically plausible spacing and mooring context. The facility shapes remain identical from start to end. No coastline is introduced. Left third stays visually quiet for the page title. Thin ivory outlines may identify the same objects, but no fictional confidence values or invented class names.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

A seven-second restrained detection reveal. Hold the image first, then trace the accepted object outlines without moving the facilities. Finish with an uncluttered result. No multiplied facilities, object disappearance or glowing scanning laser. Prefer deterministic outline animation over generating masks.
```

### 후반 합성과 연결

The existing 8s Flow candidate can provide base motion only after review; trim with handles to the 7s edit. Source geometry and conceptual status remain explicit. If objects are not physically plausible, replace the base plate before animating.

분석 대상을 정리하는 동작에서 AX03의 다른 예측 문제로 명확한 컷

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- 시설물 복제·소실
- 실제 위치·탐지 성과로 표기
- 네온 윤곽 과밀

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/AX02-start.png`
- middle — `docs/redesign-next/keyframes/AX02-middle.png`
- end — `docs/redesign-next/keyframes/AX02-end.png`
- candidate — `docs/redesign-next/renders/AX02-take01.mp4`
- review — `docs/redesign-next/reviews/AX02-take01.json`

## AX03 — 예측

편집 12–19초 / 7초 / source-composite / planned-needs-source-and-frame-review

조건 변화가 결과에 미치는 영향을 공간적으로 설명

### 참조와 남은 확인

- [technology](../../docs/redesign-production/TECHNOLOGY-MAP.md) — 후보 또는 근거이며 최종 합격 아님
- [migration](../../docs/source-migration/migration-coverage.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 예측 주제 한 가지와 일치하는 지형·조건·결과 확보

### 구도

- 시작 — 검증된 연안 지형과 기준 조건
- 중간 — 같은 지형에서 시나리오 수위·범위 변화
- 종료 — 같은 카메라와 범례로 비교 결과 정리

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 검증된 연안 지형과 기준 조건
FRAME MIDDLE: 같은 지형에서 시나리오 수위·범위 변화
FRAME END: 같은 카메라와 범례로 비교 결과 정리

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Construct an AX prediction concept using a verified coastal terrain source or an explicitly simplified analytical surface. The land-water boundary and terrain elevations must be coherent. Show one scenario changing the affected water extent rather than a tsunami spectacle. Keep the rendering refined and legible, with natural land materials and restrained water treatment. No invented Korean port, no actual platform UI and no fake warning numbers.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

Over seven seconds, hold a baseline, advance one reviewed scenario and settle into a comparison at the same camera angle. Water must not climb arbitrary disconnected hills. Do not substitute storm-surge, river flooding and tsunami causes for one another.
```

### 후반 합성과 연결

Use source model outputs or a physically reviewed conceptual schematic. Camera animation and result layers are composited; the generator must not invent a fluid solution. Identify scenario status in surrounding copy.

다른 서비스로 바뀜을 보여주는 컷 뒤 AX04 관측 지점

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- 육상 경계·높이 무시
- 실제 예측 정확도 암시
- 다른 재해 원인 혼용

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/AX03-start.png`
- middle — `docs/redesign-next/keyframes/AX03-middle.png`
- end — `docs/redesign-next/keyframes/AX03-end.png`
- candidate — `docs/redesign-next/renders/AX03-take01.mp4`
- review — `docs/redesign-next/reviews/AX03-take01.json`

## AX04 — 모니터링

편집 19–26초 / 7초 / source-composite / planned-needs-source-and-frame-review

관측 지점과 시간 변화를 읽는 기능을 실제 UI와 구분된 콘셉트로 표현

### 참조와 남은 확인

- [data](../../docs/redesign-production/keyframes/sources/corporate-film-c04-v1/gibs-c04-source-manifest.json) — 후보 또는 근거이며 최종 합격 아님
- [capture-review](../../docs/redesign-production/PLATFORM-CAPTURE-20260920.md) — 후보 또는 근거이며 최종 합격 아님
- [technology](../../docs/redesign-production/TECHNOLOGY-MAP.md) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 관측 위치·시계열 출처 또는 도식 표시
- 확인 필요 — 데이터 기간과 단위 확인

### 구도

- 시작 — 출처 확인된 지역과 작은 관측 지점
- 중간 — 한 지점을 선택하고 그 관측 맥락을 보여줌
- 종료 — 시간 변화와 공간 자료가 같은 지점 기준으로 정리

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 출처 확인된 지역과 작은 관측 지점
FRAME MIDDLE: 한 지점을 선택하고 그 관측 맥락을 보여줌
FRAME END: 시간 변화와 공간 자료가 같은 지점 기준으로 정리

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Build a restrained monitoring concept from documented station positions or explicitly schematic positions. A small set of discrete location markers sits on a source map. Selecting one location reveals one meaningful temporal view or source water-property field. Use clean typography only in post, no transparent dashboard proliferation. The marine field retains its real mask and source palette. Do not invent live status values.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

Seven seconds: select one station, reveal its reviewed temporal context, then return attention to the spatial field. Use actual archived source dates when data appear. Keep the animation readable rather than flashing several charts too quickly.
```

### 후반 합성과 연결

Source station data and map products are separately identified. If the scene uses different products, avoid implying they are directly co-located observations. Actual interface recording belongs below the hero, not here.

관측 결과 면을 AX05의 세 기능 정리 화면 안에 같은 방향과 크기로 배치해 모니터링의 맥락 유지

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- 가짜 실시간 상태
- 관측소 위치 임의 단정
- 같은 variable 색 혼동

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/AX04-start.png`
- middle — `docs/redesign-next/keyframes/AX04-middle.png`
- end — `docs/redesign-next/keyframes/AX04-end.png`
- candidate — `docs/redesign-next/renders/AX04-take01.mp4`
- review — `docs/redesign-next/reviews/AX04-take01.json`

## AX05 — 세 기능과 브랜드

편집 26–30초 / 4초 / source-composite / planned-needs-source-and-frame-review

탐지·예측·모니터링을 독립 기능으로 기억시키고 루프

### 참조와 남은 확인

- [ax-detect-end](../../dist/assets/concepts/ax-detection-v3/ax-detect-end.png) — 후보 또는 근거이며 최종 합격 아님
- [technology](../../docs/redesign-production/TECHNOLOGY-MAP.md) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — AX02–04 합격 결과
- 확인 필요 — 총30초와 시작·종료 seam 검토

### 구도

- 시작 — 앞선 세 기능 결과의 정돈된 관계
- 중간 — 타이틀 빈 공간이 넓어지고 결과는 배경으로
- 종료 — AX01 시작 구도와 연결되는 배치

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 앞선 세 기능 결과의 정돈된 관계
FRAME MIDDLE: 타이틀 빈 공간이 넓어지고 결과는 배경으로
FRAME END: AX01 시작 구도와 연결되는 배치

```text
Create a restrained cinematic engineering concept still in landscape 16:9 with physically plausible materials, light, scale and apparatus. Match the supplied references for all verifiable objects. Keep a deliberate dark or uncluttered text-safe region where specified. No people or hands. Do not generate typography, logos, UI, measurement labels or numerical results. Scientific data, geography and exact device details must remain source-controlled layers rather than newly invented pixels. The image is a concept, not evidence of a real GeoSR deployment. When the method is source-composite this paragraph describes finishing intent only; preserve the supplied source pixels instead of sending the whole composition for generative repainting.

Compose the three established results from AX02, AX03 and AX04 in one quiet editorial arrangement. Preserve their distinct domains and avoid a combined super-platform diagram. The central or left title-safe region is clear. Dark navy, realistic source textures and a small amount of blue accent, no new icons or generated branding.
```

### 모션 지시

```text
Use the accepted start and end frames for this shot only. Preserve rigid object geometry, geographic topology and lighting direction. Perform one controlled camera move and the specified subject action. Do not morph between unrelated scenes or add objects to fill gaps. Keep foreground text-safe space stable. Data overlays and typography are composited deterministically after base motion. No music, narration or invented interface. Generate no batch until the references have passed review. If an exact endpoint cannot be preserved, use a clean editorial cut or a source-layer composite rather than disguising the mismatch.

A gentle four-second settle and return toward AX01 composition. No rapid card flips. End frame matches the beginning well enough for a seamless silent website loop.
```

### 후반 합성과 연결

AX Platform and section labels remain live HTML. Retain separate source labels in the production provenance. Export the complete30s edit after a whole-film review.

AX01 시작의 세 입력 배치와 밝기에 맞춰 종료하며 서로 독립된 서비스를 하나의 자동 처리망으로 연결하지 않음

### 금지 및 재작업 조건

- No blue neon webs or arbitrary flowing ocean lines
- No invented Korean coastline, port, breakwater or mountain chain
- No unsupported real-time metrics or performance claims
- No geometry morphing or physically disconnected cables
- No AI-generated actual platform interface
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- No source gap filling presented as measurement
- 하나의 통합 서비스로 오인
- 또 다른 기능을 마지막에 갑자기 추가
- 루프 점프

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/AX05-start.png`
- middle — `docs/redesign-next/keyframes/AX05-middle.png`
- end — `docs/redesign-next/keyframes/AX05-end.png`
- candidate — `docs/redesign-next/renders/AX05-take01.mp4`
- review — `docs/redesign-next/reviews/AX05-take01.json`

## 실제 플랫폼 캡처 지시

이 영역은 ImageGen과 영상 생성 모델을 사용하지 않음

### satellite / detect

상태 recapture-planned

- 시작 — 기존 완도 예시의 실제 분석 결과가 로드된16:9화면 / 계정정보 숨김
- 실제 동작 — 관심 객체 또는 이미 완료된 분석의 레이어 표시를 전환 / 새 유료 분석 실행 금지
- 결과 — 원본 영상과 대응 탐지 윤곽이 같은 위치에 보임
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 검수 — 검출 수·정확도 조작 금지
- 검수 — 일부 메뉴만 잘라 확대 금지
- 출력 예정 — `dist/assets/films/platform-satellite-feature.mp4`

### news / detect

상태 recapture-planned

- 시작 — 실제 기사 목록과 지도가 함께 보이는 화면
- 실제 동작 — 기존 검색어 또는 분류를 선택하고 지역 표시나 기사 결과를 보여줌
- 결과 — 선택한 분류와 실제 기사 결과가 대응
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 검수 — 기사 제목·날짜를 생성하지 않음
- 검수 — 외부 기사 전문을 무단 대량 복제하지 않음
- 출력 예정 — `dist/assets/films/platform-news-feature.mp4`

### flood3d / predict

상태 recapture-planned

- 시작 — 기존 로드된2022힌남노 시나리오 등 실제 저장 사례와 지도 범위 확인
- 실제 동작 — 시간 슬라이더 이동 또는 저장된 시나리오 재생 / 카메라 완만한 이동
- 결과 — 같은 지형의 침수 범위·수심 변화와 범례 표시
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 검수 — 과거 시나리오를 현재 재난으로 표시 금지
- 검수 — 지형 잘림·표면 누락 확인
- 출력 예정 — `dist/assets/films/platform-flood3d-feature.mp4`

### surge / predict

상태 recapture-planned

- 시작 — 실제 태풍 경로와 관측소가 함께 보이는 저장 사례
- 실제 동작 — 관측소 선택 후 시계열 또는 예측 정보를 열기
- 결과 — 경로·선택 관측소·시계열의 관계가 읽힘
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 검수 — 2024산산 같은 예시명은 실제 화면 확인 후 표기
- 검수 — flood3d영상을 이 서비스에 재사용 금지
- 출력 예정 — `dist/assets/films/platform-surge-feature.mp4`

### sealevel / predict

상태 recapture-planned

- 시작 — 극치해면고 관련 실제 사례와 선택 관측소 표시
- 실제 동작 — 다른 관측소 또는 시점을 선택해 결과 비교
- 결과 — 관측소별 해면고와 최고 시점의 차이
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 검수 — 2003매미 사례 여부 재확인
- 검수 — AI해일 플랫폼과 모델 방법을 혼동하지 않음
- 출력 예정 — `dist/assets/films/platform-sealevel-feature.mp4`

### buoy / monitor

상태 recapture-planned

- 시작 — 부이 목록·위치·관측 요약이 함께 로드된 전체 화면
- 실제 동작 — 남해111 등 실제 지점 선택 후 수온·파랑 중 존재하는 시계열 열기
- 결과 — 선택 지점과 시간 변화가 같은 화면에 보임
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 검수 — 실제 데이터 시각 기록
- 검수 — 좌측 목록만 커지고 지도가 사라지는 확대 금지
- 출력 예정 — `dist/assets/films/platform-buoy-feature.mp4`

### env / monitor

상태 recapture-planned

- 시작 — 현재 확보한SST2026-09-18과SSS2026-09-19 기간 자료는 과거 캡처임 / 재녹화 날짜 재확인
- 실제 동작 — 수온 또는 염분 중 정상 로드된 한 변수를 선택하고 날짜·레이어 변화 보여주기
- 결과 — 지도 전체와 해당 변수 범례가 선명함
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 검수 — 결측 보존
- 검수 — chlorophyll 타일 누락·줄무늬 있으면 촬영 보류
- 검수 — 월·일·8일 합성 기간 혼동 금지
- 출력 예정 — `dist/assets/films/platform-env-feature.mp4`

### rip / monitor

상태 recapture-planned

- 시작 — 실제 해수욕장 위치와 공개 가능한CCTV 또는 위험 정보
- 실제 동작 — 저장·현재 화면에서 지점 선택 후 대응 영상과 위험 정보를 표시
- 결과 — 해변·영상·선택 지점의 관계 확인
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 검수 — 사람 식별 가능한 영상은 공개 적합성 검토
- 검수 — 위험 수치를 생성하거나 과장하지 않음
- 출력 예정 — `dist/assets/films/platform-rip-feature.mp4`

### flood-xai / predict

상태 development-no-recording

- 시작 — 개발 중 서비스로 표시 / 실제 완성 기능 화면 없음
- 실제 동작 — 현재는 녹화하지 않음 / 실제 기능이 제공될 때 동작 계약부터 검토
- 결과 — 개발 상태와 설명 자료만 공개
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 검수 — 생성 UI 금지
- 검수 — 다른 플랫폼 녹화로 대체 금지
- 출력 예정 — `dist/assets/films/platform-flood-xai-feature.mp4`
