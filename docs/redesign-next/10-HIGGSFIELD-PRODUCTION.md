# Higgsfield 회사 메인 영상 제작 카드 · 2026-09-28

## 목표와 입력

회사 홈페이지 첫 화면에서 시작하는 60초 무음 반복 영상의 초안을 제작한다. [09 메인 영상 방향](09-20260928-HOME-FILM-REVISION.md)의 13컷 편집안을 사용하되, 한 번의 생성으로 본편을 완성했다고 주장하지 않는다. 광역 해양·연안·하구·도시 장면을 주로 사용하고 관측·연구 장면은 짧게 배치한다. 실제 GeoSR 사업지와 특정 한국 해안을 생성 모델이 재현했다고 소개하지 않는다.

## 계정·비용·실행 기록

2026-09-28 Higgsfield 개인 워크스페이스 `db63c999-4103-4429-b641-9bb0f9027562`: free 요금제, 10 크레딧. 제작 전용 프로젝트 `GeoSR Homepage Film 2026-09-28` ID `61b2be97-efd1-4f12-8280-0dcb73755da3`을 생성했다. 요금제 변경과 크레딧 구매는 하지 않았다.

| 모델 | 동일 조건 견적 | 상태 |
| --- | ---: | --- |
| Seedance 2.0 Mini | 5초·720p·16:9·무음 5크레딧 | CF01 요청이 `Requires basic plan or higher.`로 거절. 생성 작업 ID 없음 |
| Kling 3.0 Turbo | 5초·720p·16:9 7.5크레딧 | 견적만 확인 |
| Seedance 2.5 | 5초·720p·16:9·무음 35크레딧 | 견적만 확인 |
| Cinema Studio 3.0 | 5초·720p·16:9·무음 25크레딧 | 견적만 확인 |

첫 요청은 접수되지 않아 결과 영상과 검수 프레임이 없다. 차감이 있었다는 근거도 없다. 현재 `film-manifest.json`의 이전 생성 영상 연결은 해제하고 새 결과가 실제로 생성·검수될 때만 연결한다.

## 현재 메인 화면의 정지 이미지

영상이 없는 동안 첫 화면에 사용할 광역 연안·하구 콘셉트 이미지를 내장 이미지 생성 도구로 만들었다. `dist/assets/hero-coastal-estuary-concept-20260928.webp` (1672×941, 160,696바이트, SHA-256 `744e116197ca4fa8f500c82a8c79dce46bfaeb66d1b94645873aa89dedb70024`)를 로컬 사이트에 연결했다. 데스크톱 내부 미리보기에서 제목 대비와 강·외해·섬·도시의 광역 구도를 확인했다. 이 이미지는 Higgsfield 영상 프레임이나 실제 GeoSR 사업지 사진이 아니다. 화면에도 콘셉트와 비실제 지역임을 표시한다.

정지 이미지에 사용한 프롬프트:

```text
Use case: photorealistic-natural. Asset type: GeoSR Korean technology company homepage hero image and visual direction plate for a later Higgsfield film. A majestic, believable real-world-scale view from a high stabilized drone over a broad estuary connecting a winding river, deep blue open sea, low coastal mountains, several islands and a small distant urban edge. Geographic relationships must look coherent and physically plausible, no identifiable real location. Premium cinematic atmosphere with rich navy and teal water, warm late-afternoon sun glints, atmospheric depth, crisp but natural texture, visually more vivid and technologically refined than a conventional corporate landscape film. Wide horizontal 16:9 composition, coastline and horizon clearly legible, darker uncluttered left third for HTML headline, important geography in center and right, usable cropping on desktop and mobile. Pure visual plate: no lettering, logo, frame, UI, grid, maps, contour lines, data labels, invented survey instrument, close-up, people, space-view Earth, or watermark. This is an illustrative unnamed landscape, not a documented GeoSR site.
```

## 공통 생성 규칙

- 화면비 16:9, 무음, 영상에 자막·로고·UI·수치·가짜 지도와 발광 격자를 굽지 않는다. 한영 문구는 HTML에서 관리한다.
- 한 컷에서 카메라 움직임 하나만 요청한다. 지형·수평선·건물·선박·그림자·물의 연결성을 시작/중간/끝과 전체 재생으로 확인한다.
- 넓은 실제 세계 같은 뷰가 우선이다. 지역을 특정할 근거가 없으면 `illustrative unnamed landscape`로만 표현한다.
- 올포랜드는 구도 규모와 다중 뷰 편집 리듬의 참고다. 영상·프레임·식별 가능한 장소·그래픽을 복제하지 않는다.
- 기술 그래픽은 검증된 관측·지형 자료가 있을 때 후반 작업으로만 더한다. 없으면 풍경을 깨끗하게 유지한다.

## 생성 프롬프트

### CF01 · 하구에서 외해로 · 5초

아래 문장을 Seedance 2.0 Mini에 720p, 16:9, 무음, 5초 조건으로 제출했으나 요금제 조건으로 거절됐다. 이후 재시도에는 모델·요금제·비용을 다시 확인한다.

```text
GeoSR corporate homepage film concept, one continuous five-second shot. A vast believable coastal estuary seen from a high stabilized drone: a broad river mouth joins the deep blue open sea; distant islands, low mountains, long natural shoreline, and a small distant city edge establish real-world scale. The camera advances smoothly and banks gently, revealing several environmental layers in one majestic view. Premium Korean technology-company cinema: rich ocean blues, luminous late-afternoon highlights, elegant contrast, crisp atmospheric depth, subtle sense of geospatial intelligence from camera choreography alone. Composition leaves the left third darker and uncluttered for later HTML title. Physically stable coast, water, buildings, shadows and horizon. This is an illustrative unnamed landscape, not a real GeoSR survey site. No people, close-up equipment, satellite in space, text, logo, UI, map, chart, grid, neon lines, fake measurements, copied landmark or watermark. Silent visual plate.
```

### CF02 · 강·도시·해안의 광역 연결 · 5초

```text
One continuous cinematic drone shot across a believable large river delta where the urban edge, broad waterway and open coast coexist in a single geographic space. Start high enough to see the whole relationship, then move gently forward and slightly sideways; stable bridges, districts, water and shoreline throughout. Deep marine blue with precise warm highlights, elegant atmospheric depth, premium technology-company visual quality. Leave usable dark negative space for later HTML copy. An unnamed illustrative place, not a documented GeoSR project site. No close-up, people, logos, text, UI, simulated measurements, fake map overlay, copied landmark or morphing geography. Silent 16:9 visual plate.
```

### CF03 · 섬과 연안 항공 · 5초

```text
A sweeping but physically credible high-altitude aerial over a wide coastal archipelago: multiple islands, open sea, distant mainland, a subtle port at the far horizon. Smooth lateral glide with one gentle reveal; no rapid zoom. Clear sense of regional scale, crisp marine atmosphere, cinematic contrast, luminous sunlight on water, technologically refined but never science-fiction. Preserve coastlines, horizon, vessels and shadows from start to finish. The setting is illustrative and unnamed. No identifiable real landmark, text, logo, interface, glowing grid, fabricated sensor readings or close-up apparatus. Silent 16:9 visual plate.
```

### CF04 · 관측 맥락의 넓은 해역 · 5초

```text
Wide real-world-like open-sea aerial with one small distant survey vessel moving steadily through an expansive marine environment. Keep the vessel secondary to coastline, horizon and water scale. Camera tracks gently parallel to the vessel; a coherent wake trails behind it, the hull shape remains stable, and the sea behaves naturally. Rich navy-blue water, restrained sun glints and cinematic atmosphere. This is a generic concept vessel, not GeoSR equipment or proof of a particular survey. No logo, close-up technical detail, invented instrument, people, text, UI, data overlay or fake Korean location. Silent 16:9 visual plate.
```

CF05 이후의 원본·장비·지리·자료 조건은 `production-plan.json`과 [복사용 장면 카드](PROMPT-CARDS.md)를 따른다. 장비나 실제 결과를 암시하는 컷은 근거 자료가 없으면 생성으로 대체하지 않는다.

## 검수와 연결 조건

영상이 실제 생성되면 모델·설정·작업 ID·크레딧 차감·원본 URL 또는 저장 파일·SHA-256·시작/중간/끝 프레임·전체 재생 판정을 컷별 기록에 남긴다. 불합격 출력은 이유를 남긴 뒤 제거한다. CF01 화면에서 `Geo Data Intelligence`의 한영 텍스트 대비와 모바일 자르기, 무음 반복 이음새까지 확인한 결과만 사이트에 연결한다.
