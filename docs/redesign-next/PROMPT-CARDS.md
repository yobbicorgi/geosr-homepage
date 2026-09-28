# 장면별 복사용 제작 카드

원본은 `production-plan.json`이며 이 파일은 `node scripts/render_continuation_prompts.mjs`로 다시 생성

**이 문서가 완비되어 있어도 생성물 검수가 끝난 것은 아님**

`source-composite`는 원본 보존 합성 지시이며 ImageGen에 그대로 재도색 요청하지 않음

`imagegen-reference`는 참조 파일을 실제로 확인하고 붙인 뒤 사용 / 생성 전에 sourceRequirements 해결

`higgsfield-concept`는 실제 장소·성과로 주장하지 않는 생성형 영상 후보 / 전체 재생과 지형·물리 검수 뒤에만 웹에 사용

모션 프롬프트는 시작·중간·끝 keyframe 검수를 통과한 뒤 사용 / 비용은 실제 UI에서 확인

## CF01 — 넓은 하구와 외해의 시작

편집 0–5초 / 5초 / higgsfield-concept / planned-or-concept-candidate-needs-review

넓은 바다와 하구가 한 프레임에 읽히는 실제 세계 같은 첫인상

### 참조와 남은 확인

- 확인 필요 — 실제 공개 시 지형·촬영 출처 또는 생성 콘셉트 표기 결정

### 구도

- 시작 — 넓은 해안·하구와 외해, 왼쪽 제목 여백
- 중간 — 드론이 천천히 전진하며 강과 바다의 규모가 커짐
- 종료 — 수평선과 해안 형상을 유지한 채 다음 광역 컷으로 연결

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 넓은 해안·하구와 외해, 왼쪽 제목 여백
FRAME MIDDLE: 드론이 천천히 전진하며 강과 바다의 규모가 커짐
FRAME END: 수평선과 해안 형상을 유지한 채 다음 광역 컷으로 연결

```text
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

Generate a premium photoreal wide aerial of an unspecified coastal estuary and open sea. Broad river mouth, natural shorelines, distant islands and mountains, deep ocean blue and warm late-day light. No identifiable landmark or invented scientific overlay. Reserve the left third for HTML title.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

One smooth forward drone move with a slight bank over five editorial seconds. Landforms and cloud shadows stay stable; no sudden geographic transformation.
```

### 후반 합성과 연결

Add title in HTML only. If a geospatial overlay is desired, use a separately verified source layer after generation. Keep the conceptual-location label in review.

CF13과 동일한 해역·빛으로 돌아오거나 명확한 컷으로 루프를 만든다.

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- 허구 해안을 실제 사업지로 제시
- 지형·수평선 변형

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF01-start.png`
- middle — `docs/redesign-next/keyframes/CF01-middle.png`
- end — `docs/redesign-next/keyframes/CF01-end.png`
- candidate — `docs/redesign-next/renders/CF01-take01.mp4`
- review — `docs/redesign-next/reviews/CF01-take01.json`

## CF02 — 강·도시·해안의 광역 연결

편집 5–10초 / 5초 / higgsfield-concept / planned-or-concept-candidate-needs-review

현실 환경의 또 다른 큰 뷰로 사업 범위를 확장

### 참조와 남은 확인

- 확인 필요 — 실사 대체 후보의 권리·위치 확인

### 구도

- 시작 — 강과 도시가 해안으로 이어지는 넓은 시야
- 중간 — 카메라가 강의 진행 방향을 따라 유려하게 이동
- 종료 — 수면 방향을 유지하며 다음 연안 광역 컷으로 편집

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 강과 도시가 해안으로 이어지는 넓은 시야
FRAME MIDDLE: 카메라가 강의 진행 방향을 따라 유려하게 이동
FRAME END: 수면 방향을 유지하며 다음 연안 광역 컷으로 편집

```text
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

Show a believable wide aerial where a river, city edge and coastline share one environment. Natural urban density, credible bridges, vast water and clear horizon. Cinematic blue-gold light; no famous skyline or exact Korean place claim.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

A controlled drone move follows the water corridor; bridges and buildings remain rigid. Use a clean cut instead of pretending CF01 and CF02 are the same location.
```

### 후반 합성과 연결

Technical accents may be added only from verified spatial data. Keep the generated city as an illustrative location, not a project record.

CF01과 이동 방향·수평선 높이·노출을 맞춘 편집 컷이다.

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- 유명 도시 복제
- 도로·건물 변형

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF02-start.png`
- middle — `docs/redesign-next/keyframes/CF02-middle.png`
- end — `docs/redesign-next/keyframes/CF02-end.png`
- candidate — `docs/redesign-next/renders/CF02-take01.mp4`
- review — `docs/redesign-next/reviews/CF02-take01.json`

## CF03 — 연안·섬·항만의 규모

편집 10–15초 / 5초 / higgsfield-concept / planned-or-concept-candidate-needs-review

해양과 연안의 다층 환경을 한 화면에 제시

### 참조와 남은 확인

- 확인 필요 — 항만이나 섬을 특정 지역으로 표시할 경우 실제 출처 확보

### 구도

- 시작 — 바다·섬·연안 인프라가 넓게 보임
- 중간 — 부드러운 선회로 육지와 외해의 관계를 드러냄
- 종료 — 조사선이 들어올 수 있는 바다 여백을 남김

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 바다·섬·연안 인프라가 넓게 보임
FRAME MIDDLE: 부드러운 선회로 육지와 외해의 관계를 드러냄
FRAME END: 조사선이 들어올 수 있는 바다 여백을 남김

```text
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

Create a wide, realistic aerial of open coastal water, distant islands and restrained port infrastructure. The sea occupies most of the frame and the scene feels like documentary drone footage. No invented named port or readable signage.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

One slow aerial arc across the coast. Water motion and shore geometry remain coherent; no exaggerated speed or fantasy vessels.
```

### 후반 합성과 연결

A later verified survey route can be composited sparingly, not generated as a false track.

CF04의 선박 장면과 해수면 방향이 자연스럽게 이어지도록 컷한다.

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- 가짜 방파제 과장
- 건물·섬 형태 변형

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF03-start.png`
- middle — `docs/redesign-next/keyframes/CF03-middle.png`
- end — `docs/redesign-next/keyframes/CF03-end.png`
- candidate — `docs/redesign-next/renders/CF03-take01.mp4`
- review — `docs/redesign-next/reviews/CF03-take01.json`

## CF04 — 큰 해역 속 조사선

편집 15–20초 / 5초 / higgsfield-concept / planned-or-concept-candidate-needs-review

현장 관측을 넓은 해양 환경 안에서 보여줌

### 참조와 남은 확인

- [equipment](../../docs/redesign-production/equipment-sources/manifest.json) — 후보 또는 근거이며 최종 합격 아님
- [usv](../../dist/assets/equipment-usv-original.png) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 선박 유형·원본 형상·사용 권리 대조

### 구도

- 시작 — 선박이 작은 비중으로 넓은 해역에 등장
- 중간 — 카메라가 항적을 따라 이동하면서 관측 행동을 읽힘
- 종료 — 선박을 한 단계 가까이 보는 CF05로 연결

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 선박이 작은 비중으로 넓은 해역에 등장
FRAME MIDDLE: 카메라가 항적을 따라 이동하면서 관측 행동을 읽힘
FRAME END: 선박을 한 단계 가까이 보는 CF05로 연결

```text
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

A marine survey vessel or unmanned survey craft moves through broad open water. The credible hull is smaller than the environment, with modest wake and natural daylight. Match any visible GeoSR hardware only when source reference supports it.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

Parallel drone tracking at plausible survey speed; a continuous wake trails behind. No hull morphing, extra sensors or dramatic acceleration.
```

### 후반 합성과 연결

Use a concept label until vessel identity is verified. Do not imply a precise surveyed location or depth result.

CF05에서 같은 장비라고 주장할 경우 선체·방향을 실제로 일치시킨다.

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- 선체 변화
- 항적 방향 오류

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF04-start.png`
- middle — `docs/redesign-next/keyframes/CF04-middle.png`
- end — `docs/redesign-next/keyframes/CF04-end.png`
- candidate — `docs/redesign-next/renders/CF04-take01.mp4`
- review — `docs/redesign-next/reviews/CF04-take01.json`

## CF05 — 현장 무인선과 측량 행동

편집 20–24초 / 4초 / imagegen-reference / planned-or-concept-candidate-needs-review

넓은 바다 안의 실제 조사 수단을 짧게 보여줌

### 참조와 남은 확인

- [equipment](../../docs/redesign-production/equipment-sources/manifest.json) — 후보 또는 근거이며 최종 합격 아님
- [usv](../../dist/assets/equipment-usv-original.png) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 회사 장비 원본과 선택 스틸 상세 비교

### 구도

- 시작 — 바다 맥락과 선체 전체가 함께 보임
- 중간 — 무인선의 일정 속도 이동과 작은 항적
- 종료 — 수면의 관측 지점을 CF06으로 넘김

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 바다 맥락과 선체 전체가 함께 보임
FRAME MIDDLE: 무인선의 일정 속도 이동과 작은 항적
FRAME END: 수면의 관측 지점을 CF06으로 넘김

```text
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

Keep the source-referenced unmanned survey craft visible in a medium-wide ocean view, not a heroic close-up. Preserve hull, deck fittings and antenna positions only where source pixels verify them.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

Track the craft at modest speed in one direction. Keep fittings rigid, wake behind the stern and draft consistent.
```

### 후반 합성과 연결

No luminous sonar rays; any survey track is a source-controlled later overlay.

CF04와 동일 선박이 아니라면 명확한 다른 조사 컷으로 연결한다.

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- 가짜 GeoSR 로고·장비
- 선체·항적 불일치

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF05-start.png`
- middle — `docs/redesign-next/keyframes/CF05-middle.png`
- end — `docs/redesign-next/keyframes/CF05-end.png`
- candidate — `docs/redesign-next/renders/CF05-take01.mp4`
- review — `docs/redesign-next/reviews/CF05-take01.json`

### 실제 생성하고 검수한 이미지

이미지 후보 채택은 영상 합격이나 연속 프레임 승인과 다름

- [CF05_WIDE](../../dist/assets/concepts/reviewed-20260922/cf05-usv-wide-v2.png) — selected-concept-still
  - 검수 — 원본의 황색 쌍동선·회색 프레임·장비 배치를 육안 대조 / 전체 선체가 보이는 넓은 프레임 / 배경은 생성형이며 실제 출항지·운용사진으로 주장하지 않음 / 정밀 부속과 로고는 최종 출력 전 원본 대조
  - 다음 모션 — 4초 완만한 평행 추적 / 선체·상부 장비를 강체로 유지 / 관측 장비가 새로 생기거나 항적이 선수 앞에 나타나면 탈락 / 무인선은 CF05 하나의 선택지

## CF06 — 관측 지점이 놓인 바다

편집 24–28초 / 4초 / imagegen-reference / planned-or-concept-candidate-needs-review

장비보다 바다와 관측 맥락을 먼저 읽힘

### 참조와 남은 확인

- [equipment](../../docs/redesign-production/equipment-sources/manifest.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 센서·부이 모델과 계류 구조 확인

### 구도

- 시작 — 넓은 수면에 작은 관측 부이 또는 지점
- 중간 — 잔잔한 파도와 부이의 물리적인 움직임
- 종료 — 수면 경계를 이용해 CF07 수중으로 연결

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 넓은 수면에 작은 관측 부이 또는 지점
FRAME MIDDLE: 잔잔한 파도와 부이의 물리적인 움직임
FRAME END: 수면 경계를 이용해 CF07 수중으로 연결

```text
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

Show a broad ocean observation setting with a small source-verified buoy only if its model is identified. Otherwise use a wide water-level shot without detailed equipment.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

One slow camera descent toward the surface. Buoy motion follows waves and any tether has a plausible load path.
```

### 후반 합성과 연결

Do not invent sensor readouts or unsupported platform names.

CF07 수중 컷으로 넘어갈 때 같은 위치라는 주장은 출처가 있어야 한다.

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- 불가능한 케이블
- 부이 과장

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF06-start.png`
- middle — `docs/redesign-next/keyframes/CF06-middle.png`
- end — `docs/redesign-next/keyframes/CF06-end.png`
- candidate — `docs/redesign-next/renders/CF06-take01.mp4`
- review — `docs/redesign-next/reviews/CF06-take01.json`

### 실제 원본 대조에서 발견한 제한

제조사 현행 RBRsolo³ Tu는 Seapoint 탁도 센서 계열 / 회사 과거 페이지의 수온계와 동일 제품임을 확인하지 못함 / 명칭만으로 생성 참조를 선택하지 않음

- 원본 — [회사 보존 자료](../../docs/redesign-production/equipment-sources/originals/rbr-solo-tu-page-thumbnail.png)
- 제조사 — [제품 안내](https://rbr-global.com/products/compact-loggers/rbrsolo-do-tu-par/)

## CF07 — 수면에서 수중 환경으로

편집 28–33초 / 5초 / imagegen-reference / planned-or-concept-candidate-needs-review

넓은 환경에서 수중 조사로 시점을 바꿈

### 참조와 남은 확인

- [rov](../../docs/redesign-production/equipment-sources/originals/bluerov2-page-thumbnail.png) — 후보 또는 근거이며 최종 합격 아님
- [equipment](../../docs/redesign-production/equipment-sources/manifest.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — ROV 형상·테더·환경 스케일 원본 대조

### 구도

- 시작 — 수면 경계가 읽히는 넓은 수중 시야
- 중간 — 카메라가 완만히 내려가며 해저 맥락을 보여줌
- 종료 — 수중 기록을 연안 자료의 평면으로 편집

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 수면 경계가 읽히는 넓은 수중 시야
FRAME MIDDLE: 카메라가 완만히 내려가며 해저 맥락을 보여줌
FRAME END: 수중 기록을 연안 자료의 평면으로 편집

```text
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

A credible underwater view with water column, seafloor context and optional source-verified ROV. No fantasy lighting, invented species or cable disconnected from the vehicle.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

One controlled descent, stable scale and water motion; if a ROV is present its rigid body and tether remain coherent.
```

### 후반 합성과 연결

Treat generated seafloor as illustrative. Do not name it as a real surveyed site.

수중에서 지도 자료로 바뀔 때 기록→분석의 편집 컷을 쓴다.

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- 테더 단절
- 해저 지형 급변

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF07-start.png`
- middle — `docs/redesign-next/keyframes/CF07-middle.png`
- end — `docs/redesign-next/keyframes/CF07-end.png`
- candidate — `docs/redesign-next/renders/CF07-take01.mp4`
- review — `docs/redesign-next/reviews/CF07-take01.json`

### 실제 생성하고 검수한 이미지

이미지 후보 채택은 영상 합격이나 연속 프레임 승인과 다름

- [CF07](../../dist/assets/concepts/reviewed-20260922/cf07-rov-v1.png) — selected-concept-still
  - 검수 — 회사 원본의 정면 형상과 부력재·카메라·프레임을 대조 / 테더는 뒤쪽으로 이어짐 / 후면 연결부는 가려져 정확한 결선 미확인 / 실제 운용사진이나 사양 증거로 사용 금지
  - 다음 모션 — 4초 정지 관찰에 가까운 완만한 이동 / 테더가 카메라에 붙거나 프레임을 관통하면 탈락 / 배경과 조명의 작은 변화만 허용

## CF08 — 연안 지형을 실제 자료로 읽기

편집 33–38초 / 5초 / source-composite / planned-or-concept-candidate-needs-review

현실 풍경과 지도·측량 자료의 관계를 보여줌

### 참조와 남은 확인

- [migration](../../docs/source-migration/migration-coverage.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 실제 연안·항공 자료와 위치·사용 권리 확인

### 구도

- 시작 — 출처 확인된 연안 항공 또는 정사영상
- 중간 — 동일 좌표계의 측선·점군을 절제해 드러냄
- 종료 — 같은 자료 영역을 CF09의 원격탐사로 확장

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 출처 확인된 연안 항공 또는 정사영상
FRAME MIDDLE: 동일 좌표계의 측선·점군을 절제해 드러냄
FRAME END: 같은 자료 영역을 CF09의 원격탐사로 확장

```text
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

Use documented real coastal imagery or orthophoto as an immutable base. Do not paint a new coast or replace breakwaters with generated geometry.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

A gentle camera reframe over the source image. Source-registered points or lines may reveal in post but the ground image does not morph.
```

### 후반 합성과 연결

Store imagery source, location, rights, projection and acquisition date. If any is missing, this remains a concept placeholder.

CF09와 동일 지역인 경우 extent·북쪽 방향·촬영 시기를 명시한다.

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- 가짜 해안
- 좌표 불일치

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF08-start.png`
- middle — `docs/redesign-next/keyframes/CF08-middle.png`
- end — `docs/redesign-next/keyframes/CF08-end.png`
- candidate — `docs/redesign-next/renders/CF08-take01.mp4`
- review — `docs/redesign-next/reviews/CF08-take01.json`

## CF09 — 원격탐사와 관측의 관계

편집 38–43초 / 5초 / source-composite / planned-or-concept-candidate-needs-review

광역 해양 환경을 데이터로 이해하는 순간

### 참조와 남은 확인

- [data](../../docs/redesign-production/keyframes/sources/corporate-film-c04-v1/gibs-c04-source-manifest.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 제품·기간·단위·결측·범례 확인

### 구도

- 시작 — 실제 지도 또는 광역 해양 영상
- 중간 — 서로 다른 관측 자료가 차례로 별도 표시
- 종료 — 자료 층을 연구 환경으로 명확히 컷

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 실제 지도 또는 광역 해양 영상
FRAME MIDDLE: 서로 다른 관측 자료가 차례로 별도 표시
FRAME END: 자료 층을 연구 환경으로 명확히 컷

```text
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

Preserve actual satellite and observation rasters with their land masks, no-data holes, periods and variable identity. Show only source-backed layers over a verified regional extent.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

Reveal layers sequentially with a stable camera. Do not generate colors that resemble new measurements or suggest one sensor captured all variables simultaneously.
```

### 후반 합성과 연결

Post-label product, period, unit and limitations. Avoid unreadable floating panels and invented real-time indicators.

CF08과 동일 지역이 아니면 공간을 관통하는 가짜 원테이크를 쓰지 않는다.

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- 결측 채움
- 변수 혼용

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF09-start.png`
- middle — `docs/redesign-next/keyframes/CF09-middle.png`
- end — `docs/redesign-next/keyframes/CF09-end.png`
- candidate — `docs/redesign-next/renders/CF09-take01.mp4`
- review — `docs/redesign-next/reviews/CF09-take01.json`

## CF10 — 연구 환경과 시료 분석

편집 43–47초 / 4초 / imagegen-reference / planned-or-concept-candidate-needs-review

광역 환경 다음에 분석 방법을 짧게 설명

### 참조와 남은 확인

- [lab](../../dist/assets/concepts/reviewed-20260922/cf10-chemistry-wide-v1.png) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 시료·용기·분석 단계의 물리 검토

### 구도

- 시작 — 사람 없는 연구실의 넓은 작업 환경
- 중간 — 천천히 움직이는 카메라로 시료와 분석기 관계를 읽힘
- 종료 — 현미경 보조 컷으로 짧게 전환

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 사람 없는 연구실의 넓은 작업 환경
FRAME MIDDLE: 천천히 움직이는 카메라로 시료와 분석기 관계를 읽힘
FRAME END: 현미경 보조 컷으로 짧게 전환

```text
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

Use a wide, clean marine chemistry lab composition. The bench and analysis equipment sit within a believable room; do not let bottles fill the frame. No people, invented result displays or false GeoSR facility claim.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

A subtle lateral camera move for four editorial seconds. Equipment, bottles and vial rack remain stable with plausible reflections.
```

### 후반 합성과 연결

This generated lab is a conceptual illustration, not a photograph of an actual GeoSR facility or result.

CF11과 분석 과정의 이어짐만 보여주고 실험 절차를 지어내지 않는다.

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- 실제 시설로 오인
- 용기·장비 형태 변화

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF10-start.png`
- middle — `docs/redesign-next/keyframes/CF10-middle.png`
- end — `docs/redesign-next/keyframes/CF10-end.png`
- candidate — `docs/redesign-next/renders/CF10-take01.mp4`
- review — `docs/redesign-next/reviews/CF10-take01.json`

### 실제 생성하고 검수한 이미지

이미지 후보 채택은 영상 합격이나 연속 프레임 승인과 다름

- [CF10](../../dist/assets/concepts/reviewed-20260922/cf10-chemistry-wide-v1.png) — selected-concept-still
  - 검수 — 사람 없음 / 닫힌 용기와 분석기 / 분석 전 시료 준비 장면으로 사용 / 장비 작동이나 실제 GeoSR 시설로 주장하지 않음
  - 다음 모션 — 4초의 3–5% 카메라 접근 또는 초점 이동만 허용 / 병 개수와 액면 및 뚜껑 상태 고정 / 소품 변경 시 재작업
- [CF10_END](../../dist/assets/concepts/reviewed-20260922/cf10-chemistry-close-v1.png) — selected-alternate-still-not-continuity-pair
  - 검수 — 별도 클로즈업 컷으로 보존 / 확대하면서 주변 소품·프레이밍이 변하므로 wide의 확정 끝 프레임으로 사용하지 않음
  - 다음 모션 — wide→close 생성 보간 금지 / 별도 인서트 컷 또는 wide 자체의 소폭 접근을 사용

## CF11 — 생태 분석의 보조 컷

편집 47–50초 / 3초 / imagegen-reference / planned-or-concept-candidate-needs-review

분석의 다양성을 짧게 제시

### 참조와 남은 확인

- [microscope](../../dist/assets/concepts/reviewed-20260922/cf11-microscope-v2.png) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 현미경·시료 형태 검토

### 구도

- 시작 — 현미경이 연구 공간 속에 보임
- 중간 — 차분한 카메라 이동으로 관찰 행동을 암시
- 종료 — 결과를 특정 종으로 단정하지 않고 모델 장면으로

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 현미경이 연구 공간 속에 보임
FRAME MIDDLE: 차분한 카메라 이동으로 관찰 행동을 암시
FRAME END: 결과를 특정 종으로 단정하지 않고 모델 장면으로

```text
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

A brief medium-wide ecology-lab view centered on a source-referenced microscope and sample preparation area. No person, specimen identity or generated scientific labels.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

One small camera movement, stable optical structure and sample positions. Do not animate impossible microscope use.
```

### 후반 합성과 연결

No species identification or measured result may be inferred from generated imagery.

CF12에 입력된 실제 분석 결과라는 직접 주장은 별도 근거가 있어야 한다.

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- 가짜 종 설명
- 광학 구조 변형

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF11-start.png`
- middle — `docs/redesign-next/keyframes/CF11-middle.png`
- end — `docs/redesign-next/keyframes/CF11-end.png`
- candidate — `docs/redesign-next/renders/CF11-take01.mp4`
- review — `docs/redesign-next/reviews/CF11-take01.json`

### 실제 생성하고 검수한 이미지

이미지 후보 채택은 영상 합격이나 연속 프레임 승인과 다름

- [CF11_FIX](../../dist/assets/concepts/reviewed-20260922/cf11-microscope-v2.png) — selected-concept-still
  - 검수 — 대물렌즈 간격과 하부 조명을 수정 / 슬라이드 지지·수직 광축·하부 콘덴서 육안 확인 / 현미경 배율이나 실제 생물 종을 주장하지 않음 / 작은 렌즈 각인은 최종 확대본에서 다시 확인
  - 다음 모션 — 4초 미세한 카메라 접근 / 렌즈와 스테이지를 독립적으로 변형하지 않음 / 생물 확대 영상은 실제 원본을 별도 합성하며 생성 생물로 종을 단정하지 않음

## CF12 — 지형 위 모델·시나리오의 광역 조망

편집 50–56초 / 6초 / source-composite / planned-or-concept-candidate-needs-review

관측에서 계산과 판단으로 이어지는 회사 역량을 크게 보여줌

### 참조와 남은 확인

- [wave-concept](../../dist/assets/concepts/reviewed-20260922/cf12-wave-model-v1.png) — 후보 또는 근거이며 최종 합격 아님
- [technology](../../docs/redesign-production/TECHNOLOGY-MAP.md) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 실제 지형·모델 결과 또는 명시적 개념 경로 결정

### 구도

- 시작 — 출처가 있는 광역 연안·수면 지형
- 중간 — 격자나 변수 층이 해역 위에 절제해 정렬
- 종료 — 결과를 단정하지 않고 다시 넓은 현실 뷰로

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 출처가 있는 광역 연안·수면 지형
FRAME MIDDLE: 격자나 변수 층이 해역 위에 절제해 정렬
FRAME END: 결과를 단정하지 않고 다시 넓은 현실 뷰로

```text
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

Use a documented coastal base and physically meaningful model grid. If only a generated wave concept exists, present it explicitly as a concept without results, values or forecast claims.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

A measured aerial pullback over the source coast; source-aligned grid reveals in post. No generated flooding, currents or probabilities.
```

### 후반 합성과 연결

Keep model variables, boundaries, units and time explicit when actual outputs are shown. Otherwise use the concept fallback only.

CF13으로 장면 규모와 카메라 방향을 넓히며 명확하게 편집한다.

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- 실제 예측처럼 보이는 허구 결과
- 격자 지형 불일치

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF12-start.png`
- middle — `docs/redesign-next/keyframes/CF12-middle.png`
- end — `docs/redesign-next/keyframes/CF12-end.png`
- candidate — `docs/redesign-next/renders/CF12-take01.mp4`
- review — `docs/redesign-next/reviews/CF12-take01.json`

### 실제 생성하고 검수한 이미지

이미지 후보 채택은 영상 합격이나 연속 프레임 승인과 다름

- [CF12_WAVE](../../dist/assets/concepts/reviewed-20260922/cf12-wave-model-v1.png) — selected-concept-still
  - 검수 — 파랑의 연속된 자유수면과 그 표면을 따르는 국소 격자를 육안 확인 / 네온·가상 항구·허구 지형 없음 / 절단면은 개념적 도식이며 실제 물탱크나 특정 해역을 뜻하지 않음 / 격자는 생성형 설명 요소로 실제 모델 격자·결과·경계조건 검증 자료가 아님
  - 다음 모션 — 4초의 미세한 측방 이동 / 수면과 격자가 함께 변형되어야 함 / 측면 절단면에서 물이 쏟아지거나 격자가 따로 미끄러지면 탈락 / 실제 결과를 제시할 때에는 검증한 원본 자료로 교체

## CF13 — 넓은 바다로 돌아오는 루프

편집 56–60초 / 4초 / source-composite / planned-or-concept-candidate-needs-review

광역 환경의 첫인상으로 돌아와 회사 제목과 반복을 마무리

### 참조와 남은 확인

- 확인 필요 — CF01과 루프 연결 프레임·환경 비교

### 구도

- 시작 — 다시 넓어진 바다·연안
- 중간 — 움직임이 서서히 안정되고 제목 여백 확보
- 종료 — CF01의 환경·빛·수평선이 이어지는 끝 프레임

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 다시 넓어진 바다·연안
FRAME MIDDLE: 움직임이 서서히 안정되고 제목 여백 확보
FRAME END: CF01의 환경·빛·수평선이 이어지는 끝 프레임

```text
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

Use the reviewed CF01 footage or a sourced companion shot to return to a broad ocean and coast view. Do not invent a matching coastline or imply two different sites are one.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

A smooth pullback or editorial cut into the CF01 opening. Match exposure, horizon, water motion and directional flow at the loop seam.
```

### 후반 합성과 연결

HTML title and any logo remain web layers. If no exact loop is possible, use a visible editorial cut rather than a geographic morph.

CF01 시작과 컷 지점을 전체 재생과 반복 재생으로 검수한다.

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
- 다른 지형을 한 장소로 변형
- 루프의 밝기 급변

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
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

Compose a high-end editorial concept stage with three genuinely different input types: a source aerial image of offshore facilities, a verified simplified terrain surface, and a sparse station-location field. These are independent analysis contexts, not glass browser windows. Use natural material and source map colors with restrained white structural accents. No actual application UI or imaginary dashboards. Make the facility imagery dominant toward the end so detection follows logically.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

Three source panels enter with subtle depth parallax and settle without flipping. The facility input expands to the next shot while other contexts recede. No suggestion of data being automatically exchanged among existing GeoSR services.
```

### 후반 합성과 연결

Use controlled source layers and preserve each context identity. The visual workspace is explicitly conceptual. Keep AX title in HTML.

AX02의 동일 facility plate로 확대

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
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
- [ax-review](../../docs/redesign-next/11-AX-EMBED-REVIEW.md) — 후보 또는 근거이며 최종 합격 아님
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
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

Use the existing AX detection concept references as a candidate plate, not a real facility survey. Keep a coherent small set of offshore facility groups on open water with physically plausible spacing and mooring context. The facility shapes remain identical from start to end. No coastline is introduced. Left third stays visually quiet for the page title. Thin ivory outlines may identify the same objects, but no fictional confidence values or invented class names.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

A seven-second restrained detection reveal. Hold the image first, then trace the accepted object outlines without moving the facilities. Finish with an uncluttered result. No multiplied facilities, object disappearance or glowing scanning laser. Prefer deterministic outline animation over generating masks.
```

### 후반 합성과 연결

Use only a newly reviewed Higgsfield visual plate or verified source material. Source geometry and conceptual status remain explicit. If objects are not physically plausible, replace the base plate before animating.

분석 대상을 정리하는 동작에서 AX03의 다른 예측 문제로 명확한 컷

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
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
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

Construct an AX prediction concept using a verified coastal terrain source or an explicitly simplified analytical surface. The land-water boundary and terrain elevations must be coherent. Show one scenario changing the affected water extent rather than a tsunami spectacle. Keep the rendering refined and legible, with natural land materials and restrained water treatment. No invented Korean port, no actual platform UI and no fake warning numbers.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

Over seven seconds, hold a baseline, advance one reviewed scenario and settle into a comparison at the same camera angle. Water must not climb arbitrary disconnected hills. Do not substitute storm-surge, river flooding and tsunami causes for one another.
```

### 후반 합성과 연결

Use source model outputs or a physically reviewed conceptual schematic. Camera animation and result layers are composited; the generator must not invent a fluid solution. Identify scenario status in surrounding copy.

다른 서비스로 바뀜을 보여주는 컷 뒤 AX04 관측 지점

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
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
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

Build a restrained monitoring concept from documented station positions or explicitly schematic positions. A small set of discrete location markers sits on a source map. Selecting one location reveals one meaningful temporal view or source water-property field. Use clean typography only in post, no transparent dashboard proliferation. The marine field retains its real mask and source palette. Do not invent live status values.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

Seven seconds: select one station, reveal its reviewed temporal context, then return attention to the spatial field. Use actual archived source dates when data appear. Keep the animation readable rather than flashing several charts too quickly.
```

### 후반 합성과 연결

Source station data and map products are separately identified. If the scene uses different products, avoid implying they are directly co-located observations. Actual interface recording belongs below the hero, not here.

관측 결과 면을 AX05의 세 기능 정리 화면 안에 같은 방향과 크기로 배치해 모니터링의 맥락 유지

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
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
Create a 16:9 cinematic company-film concept led by a broad, credible real-world-like environment. Preserve stable landforms, water, scale and lighting. Keep the left third usable for the HTML title when specified. Use deep ocean blues with natural warm highlights. No generated typography, logos, UI, numerical results or faux measurement maps. Imaginary locations remain labelled as concept footage, never as actual GeoSR project sites. For source-composite shots preserve all source geography and scientific data pixels.

Compose the three established results from AX02, AX03 and AX04 in one quiet editorial arrangement. Preserve their distinct domains and avoid a combined super-platform diagram. The central or left title-safe region is clear. Dark navy, realistic source textures and a small amount of blue accent, no new icons or generated branding.
```

### 모션 지시

```text
Use one deliberate camera motion per shot, with physically stable terrain, water, vessels and equipment. Prefer wide aerial movement and clear geographic context. Use a visible editorial cut between different locations. Add only provenance-backed data overlays in post; do not ask the video model to invent grids, coastlines or metrics. Review full playback and start, middle and end before use.

A gentle four-second settle and return toward AX01 composition. No rapid card flips. End frame matches the beginning well enough for a seamless silent website loop.
```

### 후반 합성과 연결

AX Platform and section labels remain live HTML. Retain separate source labels in the production provenance. Export the complete30s edit after a whole-film review.

AX01 시작의 세 입력 배치와 밝기에 맞춰 종료하며 서로 독립된 서비스를 하나의 자동 처리망으로 연결하지 않음

### 금지 및 재작업 조건

- No copied Allforland footage, landmarks, text or graphics
- No invented Korean coastline or implied actual GeoSR site for a generated setting
- No fabricated measurements, real-time UI or glowing data web
- No unstable terrain, morphing hulls, implausible wake or disconnected cables
- No generated actual AX platform interface or AX-only concept in the company film
- No people in laboratory concepts
- No previously rejected coastal-survey-source.png
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
