# 장면별 복사용 제작 카드

원본은 `production-plan.json`이며 이 파일은 `node scripts/render_continuation_prompts.mjs`로 다시 생성

**이 문서가 완비되어 있어도 생성물 검수가 끝난 것은 아님**

`source-composite`는 원본 보존 합성 지시이며 ImageGen에 그대로 재도색 요청하지 않음

`imagegen-reference`는 참조 파일을 실제로 확인하고 붙인 뒤 사용 / 생성 전에 sourceRequirements 해결

`higgsfield-concept`는 실제 장소·성과로 주장하지 않는 생성형 영상 후보 / 전체 재생과 지형·물리 검수 뒤에만 웹에 사용

모션 프롬프트는 시작·중간·끝 keyframe 검수를 통과한 뒤 사용 / 비용은 실제 UI에서 확인

## CF01 — 실제 연안의 광역 오프닝

편집 0–5초 / 5초 / source-composite / evidence-mapped-source-frames-pending

실제 한국 연안에서 도시·해안·외해의 규모를 동시에 보여준다

### 참조와 남은 확인

- [coastal-hero](../../dist/assets/geosr-brochure-coast-2025.jpg) — 후보 또는 근거이며 최종 합격 아님
- [company-brochure](../../docs/source-migration/assets/지오시스템_회사소개서_국문_2506.pdf) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — Need a dated, licensable native-1080p aerial and location identity

### 구도

- 시작 — 넓은 실사와 왼쪽 제목 여백
- 중간 — 카메라가 느리게 측면 전진
- 종료 — 다음 위성 시점으로 올라갈 공간

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 넓은 실사와 왼쪽 제목 여백
FRAME MIDDLE: 카메라가 느리게 측면 전진
FRAME END: 다음 위성 시점으로 올라갈 공간

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Use a source-approved real aerial. Match the real shoreline and leave the left third readable. The brochure photograph is only a temporary poster, not approved film footage.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

One slow lateral aerial move. No new coastal geography.
```

### 후반 합성과 연결

HTML title only; location label only after footage provenance check.

Different source locations receive editorial cuts.

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- Reject fabricated or unstable coast

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF01-start.png`
- middle — `docs/redesign-next/keyframes/CF01-middle.png`
- end — `docs/redesign-next/keyframes/CF01-end.png`
- candidate — `docs/redesign-next/renders/CF01-take01.mp4`
- review — `docs/redesign-next/reviews/CF01-take01.json`

## CF02 — 한반도 위성 관측 범위

편집 5–10초 / 5초 / source-composite / evidence-mapped-source-frames-pending

진짜 한반도 지형에서 위성영상의 공간 범위로 시점을 이동한다

### 참조와 남은 확인

- [data](../../docs/redesign-production/keyframes/sources/corporate-film-c04-v1/gibs-c04-source-manifest.json) — 후보 또는 근거이며 최종 합격 아님
- [source-archive](../../dist/source-archive.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — Need a dated sensor/product and public rights

### 구도

- 시작 — 실사에서 실제 한반도 지도로 컷
- 중간 — 센서 범위 도식이 짧게 나타남
- 종료 — 검증된 위성 래스터로 전환

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 실사에서 실제 한반도 지도로 컷
FRAME MIDDLE: 센서 범위 도식이 짧게 나타남
FRAME END: 검증된 위성 래스터로 전환

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Use a documented real geography plate. Satellite silhouette can be generated as a separate illustrative layer only.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

Controlled upward camera transition; coastline geometry stays fixed.
```

### 후반 합성과 연결

Composite source satellite product, date, sensor and swath after generation.

Cut on camera direction from CF01; do not pretend unrelated footage is one shot.

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- Reject fake peninsula or laser scan

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF02-start.png`
- middle — `docs/redesign-next/keyframes/CF02-middle.png`
- end — `docs/redesign-next/keyframes/CF02-end.png`
- candidate — `docs/redesign-next/renders/CF02-take01.mp4`
- review — `docs/redesign-next/reviews/CF02-take01.json`

## CF03 — 위성 제품과 자료 처리

편집 10–14초 / 4초 / source-composite / evidence-mapped-source-frames-pending

하나의 실제 위성 제품에서 분석 가능한 해양 자료로 이어진다

### 참조와 남은 확인

- [data](../../docs/redesign-production/keyframes/sources/corporate-film-c04-v1/gibs-c04-source-manifest.json) — 후보 또는 근거이며 최종 합격 아님
- [source-archive](../../dist/source-archive.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — Need matched raw and processed raster with product metadata

### 구도

- 시작 — 원래 위성영상과 결측 영역
- 중간 — 한 제품의 검증된 자료층
- 종료 — 분석 대상으로 진입

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 원래 위성영상과 결측 영역
FRAME MIDDLE: 한 제품의 검증된 자료층
FRAME END: 분석 대상으로 진입

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Provide subtle ambient motion behind an authentic data plate; no map or raster generation.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

Slow push toward a selected real analysis area.
```

### 후반 합성과 연결

Keep product pixels, land mask, legend, unit and timestamp exact.

CF02 and CF03 use the same documented geographic extent or a clear cut.

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- Reject false multisensor simultaneity

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF03-start.png`
- middle — `docs/redesign-next/keyframes/CF03-middle.png`
- end — `docs/redesign-next/keyframes/CF03-end.png`
- candidate — `docs/redesign-next/renders/CF03-take01.mp4`
- review — `docs/redesign-next/reviews/CF03-take01.json`

## CF04 — 검증된 AI 영상분석

편집 14–18초 / 4초 / source-composite / evidence-mapped-source-frames-pending

실제 원영상과 실제 모델 출력을 한 사례로 읽게 한다

### 참조와 남은 확인

- [source-archive](../../dist/source-archive.json) — 후보 또는 근거이며 최종 합격 아님
- [company-evidence](../../docs/redesign-next/16-COMPANY-FILM-EVIDENCE-20260928.md) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — Need releasable source video, model output and class definitions

### 구도

- 시작 — 원영상의 분석 대상
- 중간 — 원본과 정합된 mask 또는 box
- 종료 — 결과를 1초 이상 유지

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 원영상의 분석 대상
FRAME MIDDLE: 원본과 정합된 mask 또는 box
FRAME END: 결과를 1초 이상 유지

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Use the source video as the sole scene. No synthetic detection result.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

The camera is stable while the verified output appears.
```

### 후반 합성과 연결

Overlay only checked instance segmentation or detection data from the same model and frames.

Do not merge marine-life boxes with trash masks.

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- Reject fabricated predictions or false positives concealed as truth

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF04-start.png`
- middle — `docs/redesign-next/keyframes/CF04-middle.png`
- end — `docs/redesign-next/keyframes/CF04-end.png`
- candidate — `docs/redesign-next/renders/CF04-take01.mp4`
- review — `docs/redesign-next/reviews/CF04-take01.json`

## CF05 — 해수욕장 드론 조사

편집 18–22초 / 4초 / source-composite / evidence-mapped-source-frames-pending

현실 해안의 넓은 비행 장면에서 정사영상 제작 맥락을 보여준다

### 참조와 남은 확인

- [source-archive](../../dist/source-archive.json) — 후보 또는 근거이며 최종 합격 아님
- [company-brochure](../../docs/source-migration/assets/지오시스템_회사소개서_국문_2506.pdf) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — Need dated drone source, orthophoto and matching location

### 구도

- 시작 — 실제 해수욕장·해안 항공 뷰
- 중간 — 드론 비행방향을 따라 해빈이 보임
- 종료 — 동일 장소 정사영상으로 컷

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 실제 해수욕장·해안 항공 뷰
FRAME MIDDLE: 드론 비행방향을 따라 해빈이 보임
FRAME END: 동일 장소 정사영상으로 컷

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Use actual licensed coastal drone footage; generated camera interpolation is a candidate only after reference frames match.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

One slow forward drone path at credible height.
```

### 후반 합성과 연결

Correct orthophoto and DEM are source overlays, never invented imagery.

Different location from CF04 requires an editorial cut.

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- Reject drone scanning deep seabed

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

## CF06 — 해안선 변화와 조사 범위

편집 22–27초 / 5초 / source-composite / evidence-mapped-source-frames-pending

해안선·해빈 단면과 수중 조사 영역의 경계를 분명히 한다

### 참조와 남은 확인

- [source-archive](../../dist/source-archive.json) — 후보 또는 근거이며 최종 합격 아님
- [company-evidence](../../docs/redesign-next/16-COMPANY-FILM-EVIDENCE-20260928.md) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — Need matched survey dates and shoreline geometry

### 구도

- 시작 — 실제 정사영상과 해안선
- 중간 — 검증된 다른 시기 해안선 또는 단면
- 종료 — 조사선 측선으로 컷

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 실제 정사영상과 해안선
FRAME MIDDLE: 검증된 다른 시기 해안선 또는 단면
FRAME END: 조사선 측선으로 컷

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Do not invent shoreline change or point clouds. Use source maps only.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

Measured camera move over actual orthophoto.
```

### 후반 합성과 연결

Separate beach DEM from bathymetric survey. Preserve date, datum and units.

Use a visible cut to CF07 marine survey.

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- Reject morphing unmatched coastlines

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

## CF07 — 멀티빔 해저지형 조사

편집 27–32초 / 5초 / source-composite / evidence-mapped-source-frames-pending

조사선 항해와 멀티빔 수심자료의 관계를 설명한다

### 참조와 남은 확인

- [equipment](../../docs/redesign-production/equipment-sources/manifest.json) — 후보 또는 근거이며 최종 합격 아님
- [source-archive](../../dist/source-archive.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — Need vessel footage, sensor mounting and releasable bathymetry

### 구도

- 시작 — 넓은 해역 속 실제 조사선
- 중간 — 선저 음향 부채꼴 설명 도식
- 종료 — 실제 측선·수심점이 지형도로 구성

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 넓은 해역 속 실제 조사선
FRAME MIDDLE: 선저 음향 부채꼴 설명 도식
FRAME END: 실제 측선·수심점이 지형도로 구성

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Real vessel photo or video and sensor geometry required. Do not generate branded vessel details.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

Track survey vessel slowly; fixed transducer relation and credible wake.
```

### 후반 합성과 연결

Sonar fan is a separate transparent explanatory graphic; bathymetry pixels are actual source data.

CF06 shoreline mapping and CF07 depth mapping remain distinct.

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- Reject luminous underwater light or fake depth values

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

## CF08 — ADCP와 부이 관측

편집 32–36초 / 4초 / source-composite / evidence-mapped-source-frames-pending

수층별 유속과 부이 시계열을 각각의 관측으로 짧게 보여준다

### 참조와 남은 확인

- [equipment](../../docs/redesign-production/equipment-sources/manifest.json) — 후보 또는 근거이며 최종 합격 아님
- [source-archive](../../dist/source-archive.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — Need ADCP data and buoy footage with mooring configuration

### 구도

- 시작 — 실제 관측 해역
- 중간 — ADCP 수층 유속 도식
- 종료 — 실제 부이 점검·설치 장면으로 컷

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 실제 관측 해역
FRAME MIDDLE: ADCP 수층 유속 도식
FRAME END: 실제 부이 점검·설치 장면으로 컷

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Use actual instrument and buoy reference; generation may supply only nontechnical ocean background.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

One calm field move, then an explicit cut to the buoy.
```

### 후반 합성과 연결

Velocity vectors and buoy observations use separate source-verified legends and dates.

Keep ADCP separate from CF07 depth soundings.

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- Reject invented mooring and confused depth-current graphic

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF08-start.png`
- middle — `docs/redesign-next/keyframes/CF08-middle.png`
- end — `docs/redesign-next/keyframes/CF08-end.png`
- candidate — `docs/redesign-next/renders/CF08-take01.mp4`
- review — `docs/redesign-next/reviews/CF08-take01.json`

## CF09 — 채수와 환경화학 분석

편집 36–41초 / 5초 / source-composite / evidence-mapped-source-frames-pending

시료 채취에서 한 가지 분석기로 이어지는 과정을 보여준다

### 참조와 남은 확인

- [company-brochure](../../docs/source-migration/assets/지오시스템_회사소개서_국문_2506.pdf) — 후보 또는 근거이며 최종 합격 아님
- [source-archive](../../dist/source-archive.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — Need sample/lab releases and analyte-instrument mapping

### 구도

- 시작 — 수역 현장의 실제 시료 채취
- 중간 — 시료 밀봉·준비
- 종료 — 실제 ICP-MS 또는 영양염 분석기

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 수역 현장의 실제 시료 채취
FRAME MIDDLE: 시료 밀봉·준비
FRAME END: 실제 ICP-MS 또는 영양염 분석기

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Use documented field and lab footage. Generative footage only when no false GeoSR lab identity is implied.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

Edit three distinct actions; no implausible continuous morph.
```

### 후반 합성과 연결

Match sample type to assay and remove private sample labels.

The sample process follows field observation without implying same site if unverified.

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- Reject fake lab measurement or incorrect instrument

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF09-start.png`
- middle — `docs/redesign-next/keyframes/CF09-middle.png`
- end — `docs/redesign-next/keyframes/CF09-end.png`
- candidate — `docs/redesign-next/renders/CF09-take01.mp4`
- review — `docs/redesign-next/reviews/CF09-take01.json`

## CF10 — 갯벌 생태와 블루카본 조사

편집 41–45초 / 4초 / source-composite / evidence-mapped-source-frames-pending

넓은 실제 갯벌·염습지와 현장 조사구를 연결한다

### 참조와 남은 확인

- [company-brochure](../../docs/source-migration/assets/지오시스템_회사소개서_국문_2506.pdf) — 후보 또는 근거이며 최종 합격 아님
- [source-archive](../../dist/source-archive.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — Need real field photos and sampling method

### 구도

- 시작 — 갯벌·염습지 광역 실사
- 중간 — 방형구 또는 식생 조사
- 종료 — 조사 지점 지도로 종료

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 갯벌·염습지 광역 실사
FRAME MIDDLE: 방형구 또는 식생 조사
FRAME END: 조사 지점 지도로 종료

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Use a real dated intertidal scene. Generated motion may only stabilize a source-led environmental transition.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

Slow elevated movement maintaining tide and light continuity.
```

### 후반 합성과 연결

Do not overlay species, carbon flux or habitat area without source data.

A clear cut separates laboratory and ecosystem field scenes.

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- Reject invented species or carbon number

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

## CF11 — 유동과 입자 확산 모델

편집 45–50초 / 5초 / source-composite / evidence-mapped-source-frames-pending

실제 지형·관측 입력에서 하나의 변수별 모델 결과를 보여준다

### 참조와 남은 확인

- [data](../../docs/redesign-production/keyframes/sources/corporate-film-c04-v1/gibs-c04-source-manifest.json) — 후보 또는 근거이며 최종 합격 아님
- [source-archive](../../dist/source-archive.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — Need releasable model output with variables and timestamps

### 구도

- 시작 — 연안 지형·관측 입력
- 중간 — 계산 격자와 한 변수의 결과
- 종료 — 시간 변화가 읽히는 장면

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 연안 지형·관측 입력
FRAME MIDDLE: 계산 격자와 한 변수의 결과
FRAME END: 시간 변화가 읽히는 장면

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Use an atmospheric real-world coastal plate only. Model grid and result are source composites.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

Keep camera nearly fixed while verified time steps change.
```

### 후반 합성과 연결

Preserve land mask, time, units, run identity and legend.

CF10 and CF11 relate through environmental question, not fake direct causality.

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- Reject generic glowing particle field as prediction

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

## CF12 — 연안재해와 시계열 예측

편집 50–56초 / 6초 / source-composite / evidence-mapped-source-frames-pending

파랑·해일·강우 조건의 실제 예측/검증 관계를 보여준다

### 참조와 남은 확인

- [data](../../docs/redesign-production/keyframes/sources/corporate-film-c04-v1/gibs-c04-source-manifest.json) — 후보 또는 근거이며 최종 합격 아님
- [source-archive](../../dist/source-archive.json) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — Need approved scenario and validation plot

### 구도

- 시작 — 실제 해안과 입력 조건
- 중간 — 검증된 한 시나리오의 범위 변화
- 종료 — 그래프와 공간 결과가 같이 읽힘

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 실제 해안과 입력 조건
FRAME MIDDLE: 검증된 한 시나리오의 범위 변화
FRAME END: 그래프와 공간 결과가 같이 읽힘

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Real coast footage may underpin the scene; all hazard/model information is authentic post-production.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

One slow pull-back reveals temporal result.
```

### 후반 합성과 연결

Label scenario, forecast time, variable, vertical datum and verification clearly.

Model prediction is not footage of an occurred disaster.

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- Reject false live observation or fabricated inundation

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

## CF13 — 광역 연안으로 귀환

편집 56–60초 / 4초 / source-composite / evidence-mapped-source-frames-pending

예측 장면을 정리하고 첫 실제 연안 화면으로 돌아온다

### 참조와 남은 확인

- [coastal-hero](../../dist/assets/geosr-brochure-coast-2025.jpg) — 후보 또는 근거이며 최종 합격 아님
- [company-evidence](../../docs/redesign-next/16-COMPANY-FILM-EVIDENCE-20260928.md) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — Need matching opening coastal source and approved CF12 ending frame

### 구도

- 시작 — CF12의 실제 예측 결과가 마무리되는 장면
- 중간 — 출처가 확인된 광역 연안 영상으로 편집 컷
- 종료 — CF01과 같은 실제 연안 뷰로 귀환

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: CF12의 실제 예측 결과가 마무리되는 장면
FRAME MIDDLE: 출처가 확인된 광역 연안 영상으로 편집 컷
FRAME END: CF01과 같은 실제 연안 뷰로 귀환

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Return to the same documented coastal footage used at opening. No platform UI in the company film.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

Use a clean editorial match cut to the opening footage.
```

### 후반 합성과 연결

Keep forecast data on its source frame and the final title in HTML. AX and GeoDAP UI belong only in their separate films.

Final geography and direction match CF01 for a true web loop.

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- Reject platform UI collage or inconsistent coast

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/CF13-start.png`
- middle — `docs/redesign-next/keyframes/CF13-middle.png`
- end — `docs/redesign-next/keyframes/CF13-end.png`
- candidate — `docs/redesign-next/renders/CF13-take01.mp4`
- review — `docs/redesign-next/reviews/CF13-take01.json`

## AX01 — 실제 해역에서 AX 화면으로

편집 0–6초 / 6초 / source-composite / actual-ui-capture-pending

현실 해역의 규모에서 직원 제작 AX 갤러리의 실제 화면으로 진입한다

### 참조와 남은 확인

- [coastal-hero](../../dist/assets/geosr-brochure-coast-2025.jpg) — 후보 또는 근거이며 최종 합격 아님
- [ax-review](../../docs/redesign-next/11-AX-EMBED-REVIEW.md) — 후보 또는 근거이며 최종 합격 아님
- [capture-review](../../docs/redesign-production/PLATFORM-CAPTURE-20260920.md) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 첫 해역 원본의 장소·권리·1080p 확인
- 확인 필요 — 직원 AX 갤러리 1920×1080 실제 녹화
- 확인 필요 — 제품 화면의 공개 가능 상태 확인

### 구도

- 시작 — 출처를 확인한 실제 광역 해역
- 중간 — 해역 이미지가 정리되며 실제 AX 제품 화면의 영역이 열림
- 종료 — 직원 제작 AX 갤러리의 첫 실제 화면이 읽힘

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 출처를 확인한 실제 광역 해역
FRAME MIDDLE: 해역 이미지가 정리되며 실제 AX 제품 화면의 영역이 열림
FRAME END: 직원 제작 AX 갤러리의 첫 실제 화면이 읽힘

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Use only documented real coastal footage for the opening and direct capture of the employee AX interface. Never generate browser chrome, labels, controls, result pixels or a fictional map.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

Use a restrained editorial transition from the coast to a full-resolution AX screen. Hold the real interface long enough for a viewer to recognize it.
```

### 후반 합성과 연결

The final editor inserts the actual employee-built AX interface as source pixels; any Higgsfield transition is outside the UI boundary. Brand and title remain HTML.

AX01 종료 화면의 동일한 실제 탐지 화면을 AX02 첫 프레임으로 사용한다

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- 생성된 가짜 UI
- 지역이나 사업지 오인
- 제품 첫 화면이 읽히지 않음

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/AX01-start.png`
- middle — `docs/redesign-next/keyframes/AX01-middle.png`
- end — `docs/redesign-next/keyframes/AX01-end.png`
- candidate — `docs/redesign-next/renders/AX01-take01.mp4`
- review — `docs/redesign-next/reviews/AX01-take01.json`

## AX02 — 위성영상 탐지 화면

편집 6–14초 / 8초 / source-composite / actual-ui-capture-pending

직원 제작 AX의 탐지 기능을 실제 화면 동작과 결과로 보여준다

### 참조와 남은 확인

- [ax-review](../../docs/redesign-next/11-AX-EMBED-REVIEW.md) — 후보 또는 근거이며 최종 합격 아님
- [capture-review](../../docs/redesign-production/PLATFORM-CAPTURE-20260920.md) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 탐지 서비스 실제 화면 및 동작 재캡처
- 확인 필요 — 마스크·시설물 표시의 실제 출처와 공개 여부
- 확인 필요 — 16:9 글자 가독성 검수

### 구도

- 시작 — 직원 갤러리의 실제 위성영상 탐지 화면
- 중간 — 실제 슬라이드 또는 레이어 전환을 녹화한 장면
- 종료 — 검수된 탐지 결과가 화면에 남는 장면

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 직원 갤러리의 실제 위성영상 탐지 화면
FRAME MIDDLE: 실제 슬라이드 또는 레이어 전환을 녹화한 장면
FRAME END: 검수된 탐지 결과가 화면에 남는 장면

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Record the actual employee-built detection interface at 1920x1080 or higher. Do not synthesize detection masks, facility shapes, labels, confidence or screen controls.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

Capture one deliberate real UI interaction and let the resulting screen settle for at least two seconds. Use editorial crop or mask only when the full feature remains understandable.
```

### 후반 합성과 연결

Preserve the actual UI pixels and original screen ratio. Higgsfield may provide only an external environmental bridge; do not send the UI frame for regeneration.

화면 전체가 닫힌 뒤 AX03의 별도 예측 서비스로 컷한다

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- 기존 개념 시설 이미지를 실제 탐지로 오인
- 생성된 mask·box
- 화면 일부만 잘라 기능을 알 수 없음

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/AX02-start.png`
- middle — `docs/redesign-next/keyframes/AX02-middle.png`
- end — `docs/redesign-next/keyframes/AX02-end.png`
- candidate — `docs/redesign-next/renders/AX02-take01.mp4`
- review — `docs/redesign-next/reviews/AX02-take01.json`

## AX03 — 연안재해 예측 화면

편집 14–22초 / 8초 / source-composite / actual-ui-capture-pending

직원 제작 AX의 연안재해 예측 화면과 시나리오 전환을 실제 인터페이스로 보여준다

### 참조와 남은 확인

- [ax-review](../../docs/redesign-next/11-AX-EMBED-REVIEW.md) — 후보 또는 근거이며 최종 합격 아님
- [capture-review](../../docs/redesign-production/PLATFORM-CAPTURE-20260920.md) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 예측 서비스 실제 화면 및 가능한 조작 확인
- 확인 필요 — 결과가 시뮬레이션인지 정적 캡처인지 표기
- 확인 필요 — 지형·범례·시나리오 공개 가능성 확인

### 구도

- 시작 — 직원 갤러리의 실제 3D 또는 지도 기반 예측 화면
- 중간 — 실제 가능한 시나리오·시점 전환의 녹화
- 종료 — 범례와 결과가 읽히는 정지 프레임

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 직원 갤러리의 실제 3D 또는 지도 기반 예측 화면
FRAME MIDDLE: 실제 가능한 시나리오·시점 전환의 녹화
FRAME END: 범례와 결과가 읽히는 정지 프레임

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Record the real employee-built flood or surge platform screen. Keep its real geography, interface, labels and scenario output unchanged. Generate no replacement water field or Korean text.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

Show one actual control transition, then hold the result. Keep camera movement outside the screen capture and avoid zooming into unreadable texture.
```

### 후반 합성과 연결

Use the captured AX screen as a protected source layer. The film must not imply a validated live forecast if the provided gallery is a static prototype.

제품 종류가 바뀜을 분명히 한 뒤 AX04 관측 화면으로 편집한다

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- 개념 침수 영상을 실제 예측 결과처럼 사용
- 가짜 경보 수치
- 육상 경계가 어긋난 생성 장면

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/AX03-start.png`
- middle — `docs/redesign-next/keyframes/AX03-middle.png`
- end — `docs/redesign-next/keyframes/AX03-end.png`
- candidate — `docs/redesign-next/renders/AX03-take01.mp4`
- review — `docs/redesign-next/reviews/AX03-take01.json`

## AX04 — 관측 화면

편집 22–27초 / 5초 / source-composite / actual-ui-capture-pending

직원 제작 AX의 관측·모니터링 화면을 실제 UI로 보여준다

### 참조와 남은 확인

- [ax-review](../../docs/redesign-next/11-AX-EMBED-REVIEW.md) — 후보 또는 근거이며 최종 합격 아님
- [capture-review](../../docs/redesign-production/PLATFORM-CAPTURE-20260920.md) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — 부이·관측 화면 실제 녹화
- 확인 필요 — 표시된 시간·단위·관측 상태 확인
- 확인 필요 — 실시간 운영 주장 여부 검토

### 구도

- 시작 — 직원 갤러리의 실제 관측 서비스 화면
- 중간 — 실제 지점 또는 시간 전환을 녹화한 장면
- 종료 — 지점과 그래프의 관계가 읽히는 화면

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: 직원 갤러리의 실제 관측 서비스 화면
FRAME MIDDLE: 실제 지점 또는 시간 전환을 녹화한 장면
FRAME END: 지점과 그래프의 관계가 읽히는 화면

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Capture the real monitoring screen from the employee repository. Preserve the displayed map, controls, chart and text exactly; do not fabricate live status or station values.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

Use one real pointer or keyboard action to focus a station or time series. Hold the resulting interface without rapid montage.
```

### 후반 합성과 연결

Source UI remains full-resolution and visually legible. An external transition can be generated but no UI element or value can be regenerated.

실제 UI의 시각적 연결을 유지하며 AX05의 제품 전체 화면으로 마감한다

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- 가짜 실시간 상태
- 관측소 위치 단정
- 그래프 수치 생성

### 계획 산출물 — 아직 생성된 파일이 아님

- start — `docs/redesign-next/keyframes/AX04-start.png`
- middle — `docs/redesign-next/keyframes/AX04-middle.png`
- end — `docs/redesign-next/keyframes/AX04-end.png`
- candidate — `docs/redesign-next/renders/AX04-take01.mp4`
- review — `docs/redesign-next/reviews/AX04-take01.json`

## AX05 — AX 제품 마감

편집 27–30초 / 3초 / source-composite / actual-ui-capture-pending

세 분야의 실제 화면을 정돈해 AX 제품의 별도 영상으로 마무리한다

### 참조와 남은 확인

- [ax-review](../../docs/redesign-next/11-AX-EMBED-REVIEW.md) — 후보 또는 근거이며 최종 합격 아님
- [capture-review](../../docs/redesign-production/PLATFORM-CAPTURE-20260920.md) — 후보 또는 근거이며 최종 합격 아님
- 확인 필요 — AX02–04 합격 FHD 녹화
- 확인 필요 — 전체 30초 편집과 반복 접합 검토

### 구도

- 시작 — AX02–04에서 검수한 실제 화면의 축약된 관계
- 중간 — 직원 제작 갤러리의 실제 전체 프레임
- 종료 — 첫 화면과 접합되는 어두운 해역 또는 제품 화면

### 이미지 또는 원본 합성 지시

아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음

FRAME START: AX02–04에서 검수한 실제 화면의 축약된 관계
FRAME MIDDLE: 직원 제작 갤러리의 실제 전체 프레임
FRAME END: 첫 화면과 접합되는 어두운 해역 또는 제품 화면

```text
Silent 16:9 native 1920x1080 film. Real Korean geography and documented company technologies lead the company film; captured employee-built screens lead the separate AX film. Preserve source landforms, equipment, optics, scale, lighting, water physics and clean title space. Generate only a missing camera or environmental transition when source frames exist. Do not generate map pixels, sensor results, interfaces, readings, text or project locations.

Use only the three recorded employee-built screens. Do not generate a new unified dashboard or imply automatic data exchange between products.
```

### 모션 지시

```text
One deliberate camera action per cut. Use clean editorial cuts between different places, sensors and times. Real source imagery, georegistered maps, sonar bathymetry, ADCP velocity, laboratory results, model fields and platform UI are separate compositing layers with their own provenance. Verify the full clip and start, middle, end frames.

A calm three-second editorial close with readable actual screen. Match brightness and direction to AX01 for the web loop.
```

### 후반 합성과 연결

All product labels are source UI or editable postproduction layers. Deliver AX as a separate 30-second 1080p file after full-film review.

AX05 종료 화면의 밝기와 동작 방향을 AX01 시작 화면에 맞춰 반복 접합을 확인한다

### 금지 및 재작업 조건

- No copied Allforland footage or design
- No invented Korean coastline, city, harbor, beach or implied GeoSR site
- No laser-like satellite or underwater sonar beams presented as observed light
- No fabricated measurements, segmentation masks, bounding boxes, bathymetry, current vectors, model outputs or UI
- No mixing multibeam depth with ADCP velocity or scenario forecasts with observations
- No morphing hulls, vessels, buoy moorings, sensors, terrain or laboratory apparatus
- No previously rejected coastal-estuary concept poster as an input frame
- 새 통합 대시보드 발명
- 세 기능의 자동 연동 암시
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
