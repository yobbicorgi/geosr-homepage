# 장면별 제작·검수 카드

원본은 `production-plan.json`이며 `node scripts/render_continuation_prompts.mjs`로 생성합니다

스키마 2 / company-film-scene-system-20260929-v3

- 시작점 — [00-START-HERE](../../docs/redesign-next/00-START-HERE.md)
- 현재 기준 — [CURRENT-DIRECTION](../../docs/redesign-next/CURRENT-DIRECTION.md)
- 미디어 방향 — [02-MEDIA-DIRECTION](../../docs/redesign-next/02-MEDIA-DIRECTION.md)
- 제작·실패 원장 — [미디어 인계 원장](../../media-source/editorial/media-production-handoff.json)

**generationReady: false / releaseReady: false**

The active main film is the approximately 48-second ten-subject sequence in activeMainFilmDirection. Satellite acquisition and analysis are two four-second clips within one subject. Older MAIN-CTD and MAIN-SPATIAL cards below are retained as historical slot references, not the current main cut or paid job authorization. Only accepted native 1080p clips may be assembled.

Latest user instruction resumes immediate Seedance2.0 video from vetted native originals one scene at a time. AX detail six-second single attempt authorized; no bulk generation or same-input jellyfish retry. Actual UI sources remain generationAllowed=false. Overall generationReady/releaseReady remain false until gates pass.

## 공통 제작 조건

- 이미지 — Create images only with native ChatGPT WEB and download the original. No Higgsfield image model or Codex image_gen. Choose one concrete research subject and prepared start state. All boxes, masks, mesh, analysis panels and UI-like concept graphics must be generated as part of the original. Compose every essential subject and panel completely within16:9; adjacent website text stays outside the media. Generated concepts are not actual observations, company property or product screens.
- 영상 — Seedance2.0 MCP preferred,1080p silent, using vetted native ChatGPT originals. Specify start,2-3causal subject actions and end. The subject/data distribution must actually change; camera motion alone is not acceptance. Preserve physical connections and geographic/annotation registration. Review complete playback plus critical continuous frames.
- 편집 — Only join reviewed clips and add transitions. No postproduction boxes, masks, UI, grid, data graphics or other internal overlays. Faithful format export does not create approval.

분석 그래픽은 원본 생성 단계에 포함합니다 실제 제품 UI는 생성하지 않습니다 확정 정지와 영상 합격을 구분합니다

### 접수·배치 전 확인

- Confirm subject and evidence
- Download original and preserve metadata/hash
- Original-resolution geometry and16:9composition QA
- Start/middle/end plus critical-action semantic QA
- Exact live balance/model/input cost before one approved submission
- Complete playback and per-slot provenance before web integration

## 슬롯과 장면 연결

| 슬롯 | 장면 | 출처 | 상태 | 생성 허용 |
|---|---|---|---|---|
| geosr-hero | MAIN-SATELLITE · MAIN-CTD · MAIN-AI · MAIN-MODEL · MAIN-SPATIAL | native-chatgpt-concept | plan-only-originals-pending | false |
| company-overview | COMPANY-ANALYSIS | native-chatgpt-concept | plan-only-originals-pending | false |
| ax-discover | UI-AX-DISCOVER | actual-ui | source-not-reviewed | false |
| ax-detect | UI-AX-DETECT | actual-ui | source-not-reviewed | false |
| ax-predict | UI-AX-PREDICT | actual-ui | source-not-reviewed | false |
| ax-monitor | UI-AX-MONITOR | actual-ui | source-not-reviewed | false |
| ax-concept-film | AX-MAIN-CONCEPT | native-chatgpt-concept | plan-only-originals-pending | false |
| platform-satellite | UI-PLATFORM-SATELLITE | actual-ui | source-not-reviewed | false |
| platform-flood3d | UI-PLATFORM-FLOOD3D | actual-ui | source-not-reviewed | false |
| platform-buoy | UI-PLATFORM-BUOY | actual-ui | source-not-reviewed | false |
| geosr-wave-bridge | WAVE-ROCK · WAVE-OPEN | native-chatgpt-concept | plan-only-originals-pending | false |
| expertise-ai | EXP-AI | native-chatgpt-concept | accepted-still | false |
| expertise-modelling | EXP-MODEL | native-chatgpt-concept | plan-only-originals-pending | false |
| expertise-satellite | EXP-SATELLITE | native-chatgpt-concept | plan-only-originals-pending | false |
| expertise-spatial | EXP-SPATIAL | native-chatgpt-concept | plan-only-originals-pending | false |
| expertise-observation | EXP-OBSERVATION | native-chatgpt-concept | plan-only-originals-pending | false |
| expertise-environment | EXP-ENVIRONMENT | native-chatgpt-concept | plan-only-originals-pending | false |
| expertise-hazards | EXP-HAZARDS | native-chatgpt-concept | accepted-still | false |
| expertise-systems | EXP-SYSTEMS | native-chatgpt-concept | plan-only-originals-pending | false |
| ax-platform-intro | AX-DETAIL-FLOW | native-chatgpt-concept | source-reviewed-awaiting-reference-upload | true |

## MAIN-SATELLITE — 대공간 관측

main / video-proposal / 6초 · proposed source seconds, mutable after scene QA

상태 **original-missing** / generationReady **false** / generationAllowed **false**

Large-area observation becomes an aligned environmental product

- 출처 — planned-native-chatgpt-concept
- 원본 — **없음 · original-missing**

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [higgsfield-procedure](../../docs/redesign-next/10-HIGGSFIELD-PRODUCTION.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — not-reviewed
- requirement — New native satellite-data start/end pair; scenic coast candidate unsuitable

### 시작·전개·종료

- 시작 — Registered true-colour satellite tiles with subtle seam
- 전개 — Tile mosaic settles, then valid-water environmental layer resolves
- 종료 — One coherent regional environmental image
- 카메라 — Orthographic fixed data view preserves pixel registration; mosaic and environmental-layer changes provide the motion.

### 원본 이미지 설계 문안 · 접수 승인 아님

```text
Create images only with native ChatGPT WEB and download the original. No Higgsfield image model or Codex image_gen. Choose one concrete research subject and prepared start state. All boxes, masks, mesh, analysis panels and UI-like concept graphics must be generated as part of the original. Compose every essential subject and panel completely within16:9; adjacent website text stays outside the media. Generated concepts are not actual observations, company property or product screens.

Native ChatGPT image creation only. High-quality original16:9 at maximum downloadable resolution. All panels and graphics generated inside the original. Realistic restrained materials and light. No logo, fabricated readings, scores, dates or numerical legends. Fictional editorial method concept, not an actual observation, company site, computation or product screen. Crisp orthographic satellite-data scene of a plausible temperate Korean coast, inland river, fields and hills. Large observation extent and authentic raster texture, not a perspective drone view. FIRST state: two adjacent true-colour tiles already have exactly matching coastlines and roads, with a subtle visible join. A small greyscale spectral inset depicts the SAME area. A faint incipient blue-teal water layer lies only inside valid water; a small cloud area stays visibly unclassified. No spacecraft, scan beam or coordinates. Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
```

### 영상 설계 문안 · 원본과 동작 검수 후 개별 접수

```text
Seedance2.0 MCP preferred,1080p silent, using vetted native ChatGPT originals. Specify start,2-3causal subject actions and end. The subject/data distribution must actually change; camera motion alone is not acceptance. Preserve physical connections and geographic/annotation registration. Review complete playback plus critical continuous frames.

Six seconds. Two already registered satellite tiles settle into a seamless mosaic without changing land or coast. Then a restrained blue-teal environmental layer resolves across valid river/coastal-water pixels, precisely aligned to shore; cloud/no-data areas stay unclassified. Preserve the corresponding spectral inset. The changing data product is the subject, not zooming scenery. No beams, new geography, numbers or audio.
```

### 연결과 의미 검수

Blue-water match cut to physical field water

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Reject if this constraint is violated: Identical coastline and raster alignment across tiles and spectral inset.
- Reject if this constraint is violated: Derived field only on valid water; cloud/no-data stays unclassified.
- Reject if this constraint is violated: Illustrative environmental product, no acquisition or measurement claim.

## MAIN-CTD — 현장 취득

main / video-proposal / 6초 · proposed source seconds, mutable after scene QA

상태 **original-missing** / generationReady **false** / generationAllowed **false**

Completed water-column instrument deployment

- 출처 — planned-native-chatgpt-concept
- 원본 — **없음 · original-missing**

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [higgsfield-procedure](../../docs/redesign-next/10-HIGGSFIELD-PRODUCTION.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — parent-browser-observed; local-original-unavailable; reference-only
- candidateNumber — 8
- sourceConversation — https://chatgpt.com/c/6abb1735-33cc-83e9-be90-b98861543611
- localDownload — original-missing
- pixelReview — pending
- preserveCandidate — true

### 시작·전개·종료

- 시작 — Whole CTD cage visibly above water, lower ring just above the surface, with a taut connected cable and full vessel/context still visible.
- 전개 — Winch pays out cable continuously; the complete rigid cage progressively enters water, produces proportionate ripples, and lowers until the top ring is submerged.
- 종료 — Top ring submerges; connected cable and causal ripples visible
- 카메라 — A short broad oblique arc keeps the entire working vessel, load path and water context readable; do not finish in a device close-up. CTD is one6s field shot only.

### 원본 이미지 설계 문안 · 접수 승인 아님

```text
Create images only with native ChatGPT WEB and download the original. No Higgsfield image model or Codex image_gen. Choose one concrete research subject and prepared start state. All boxes, masks, mesh, analysis panels and UI-like concept graphics must be generated as part of the original. Compose every essential subject and panel completely within16:9; adjacent website text stays outside the media. Generated concepts are not actual observations, company property or product screens.

Native ChatGPT original16:9 documentary wide coastal research scene. Keep entire modest research vessel in right third with broad water and distant low Korean coast. One plausible stern A-frame and taut cable connect to the central lifting bail of a compact12-bottle CTD rosette. The entire cage is clear above water with its lower ring just above the surface, ready for complete vertical lowering. Exactly2rear-facing crew in helmets and life jackets remain clear of the load. Preserve realistic boat, cage and cable scale. All intended analysis panels, if any, must be generated natively and must not obscure the load path. No fictional measured values, logos or company ownership claim. Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
```

### 영상 설계 문안 · 원본과 동작 검수 후 개별 접수

```text
Seedance2.0 MCP preferred,1080p silent, using vetted native ChatGPT originals. Specify start,2-3causal subject actions and end. The subject/data distribution must actually change; camera motion alone is not acceptance. Preserve physical connections and geographic/annotation registration. Review complete playback plus critical continuous frames.

Six-second broad field-operation shot. One connected winch cable pays out smoothly, lowering the same rigid CTD rosette vertically from entirely above water. The cage progressively crosses the surface, creates a proportionate brief splash and outward ripples, then its top ring submerges while the connected cable remains visible. A short broad oblique arc keeps the entire vessel and water context in view. Preserve geometry, scale and2safe PPEcrew. No disconnected cables, duplicate gear, unsafe gestures, text or audio.
```

### 연결과 의미 검수

Cut from water entry to a fixed underwater camera without claiming same site

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Reject if this constraint is violated: One rosette and taut connected hoist; cage rigid and vertical.
- Reject if this constraint is violated: Cable pays out continuously; splash/ripples proportional to cage entry.
- Reject if this constraint is violated: Crew remain clear with life jackets/helmets.

## MAIN-AI — AI 분석

main / video-proposal / 6초 · proposed source seconds, mutable after scene QA

상태 **original-missing** / generationReady **false** / generationAllowed **false**

Every target stays linked to one box and one silhouette mask

- 출처 — planned-native-chatgpt-concept
- 원본 — **없음 · original-missing**

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [higgsfield-procedure](../../docs/redesign-next/10-HIGGSFIELD-PRODUCTION.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — not-reviewed
- requirement — New unique TWO-fish pair; business five-fish and homepage jellyfish stay unchanged

### 시작·전개·종료

- 시작 — Two separated fish with complete boxes and silhouette masks
- 전개 — Fish swim one body length in separate bands; annotations follow
- 종료 — Different fish positions with all corresponding annotations still aligned
- 카메라 — Fixed underwater camera is method-appropriate; fish travel and native annotation tracking provide the action.

### 원본 이미지 설계 문안 · 접수 승인 아님

```text
Create images only with native ChatGPT WEB and download the original. No Higgsfield image model or Codex image_gen. Choose one concrete research subject and prepared start state. All boxes, masks, mesh, analysis panels and UI-like concept graphics must be generated as part of the original. Compose every essential subject and panel completely within16:9; adjacent website text stays outside the media. Generated concepts are not actual observations, company property or product screens.

Native ChatGPT image creation only. High-quality original16:9 at maximum downloadable resolution. All panels and graphics generated inside the original. Realistic restrained materials and light. No logo, fabricated readings, scores, dates or numerical legends. Fictional editorial method concept, not an actual observation, company site, computation or product screen. Fixed temperate underwater camera over sand. Exactly two plausible silver-grey fish, complete bodies visible: A in upper-left-middle facing right; B in lower-centre-right facing left. Both have clear swimming room and stay far from frame edges. Each fish carries exactly one thin complete blue box with modest margin and one faint blue silhouette mask including fins and tail. No other animals. Fish and analyses are prominent, not tiny. Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
```

### 영상 설계 문안 · 원본과 동작 검수 후 개별 접수

```text
Seedance2.0 MCP preferred,1080p silent, using vetted native ChatGPT originals. Specify start,2-3causal subject actions and end. The subject/data distribution must actually change; camera motion alone is not acceptance. Preserve physical connections and geographic/annotation registration. Review complete playback plus critical continuous frames.

Six seconds. Fish A swims rightward one body length in the upper band; fish B swims leftward one body length in the separate lower band, propelled by natural tail beats. Exactly two native boxes and two silhouette masks continuously follow their corresponding fish, including every fin and tail, in every frame including first and last. Keep all subjects in frame and camera fixed. No extra targets, detached/static annotations, text or audio.
```

### 연결과 의미 검수

Clear cut from organism analysis to intentional numerical-model CG

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Reject if this constraint is violated: Exactly2fish,2boxes,2masks in all frames.
- Reject if this constraint is violated: No target crossing, shape distortion or frame exit.
- Reject if this constraint is violated: No static or detached annotations; reject rather than repair.

## MAIN-MODEL — 수치예측

main / video-proposal / 6초 · proposed source seconds, mutable after scene QA

상태 **original-missing** / generationReady **false** / generationAllowed **false**

A changing model-field distribution on unchanged geography

- 출처 — planned-native-chatgpt-concept
- 원본 — **없음 · original-missing**

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [higgsfield-procedure](../../docs/redesign-next/10-HIGGSFIELD-PRODUCTION.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — parent-browser-qa-passed-editorial-model-introduction; original-download-and-pixel-qa-pending
- candidateNumber — 9
- sourceConversation — https://chatgpt.com/c/6abb1735-33cc-83e9-be90-b98861543611
- localDownload — original-missing
- pixelReview — pending
- preserveCandidate — true
- currentViewerLabel — Generated image7

### 시작·전개·종료

- 시작 — Use the candidate's existing river-estuary-sea mesh, arrows and teal field as the initial distribution, without substituting a different map or adding a section panel.
- 전개 — 0-2s the existing upstream portion advects toward the estuary;2-4s the mouth/front widens into the open-water domain;4-6s the leading field extends farther toward the left-side sea and becomes broader and more diffuse. The spatial extent and concentration distribution change visibly.
- 종료 — A visibly larger and differently distributed coastal/offshore field compared with the first frame, while every shore, sandbar, marsh and mesh location remains fixed.
- 카메라 — A restrained broad oblique move may support spatial reading, but the entire connected river-estuary-sea domain remains inside frame. Camera motion alone does not satisfy the shot.

### 원본 이미지 설계 문안 · 접수 승인 아님

```text
Create images only with native ChatGPT WEB and download the original. No Higgsfield image model or Codex image_gen. Choose one concrete research subject and prepared start state. All boxes, masks, mesh, analysis panels and UI-like concept graphics must be generated as part of the original. Compose every essential subject and panel completely within16:9; adjacent website text stays outside the media. Generated concepts are not actual observations, company property or product screens.

Native ChatGPT original16:9 explanatory numerical-model scene, matching the selected reference direction: a continuous river from upper-right through a natural estuary with coherent marshes and sandbars to the sea on the left. Fine triangular cells near shore and coarser cells offshore are restricted to water. Restrained white flow arrows point consistently downstream and outward. A translucent teal dispersion field is integrated into the water surface. Preserve realistic connected terrain and make every water-domain element readable within the complete frame. No actual place identity, claimed calculation, numerical legend or extra section inset. All analysis graphics must be generated natively. Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
```

### 영상 설계 문안 · 원본과 동작 검수 후 개별 접수

```text
Seedance2.0 MCP preferred,1080p silent, using vetted native ChatGPT originals. Specify start,2-3causal subject actions and end. The subject/data distribution must actually change; camera motion alone is not acceptance. Preserve physical connections and geographic/annotation registration. Review complete playback plus critical continuous frames.

Six-second accelerated explanatory model evolution from the supplied river-estuary-sea image. First the existing upstream teal field advects toward the mouth. Then its front widens and spreads from the estuary into open water. Finally the leading field extends farther toward the left-side sea, becoming broader and more diffuse so its extent and distribution clearly differ from the first frame. Keep terrain, marshes, sandbars, shoreline and water-only mesh fixed. Existing white arrows remain coherently downstream and seaward. Preserve connected water boundaries; no land spill, disconnected tracer, new panels, numbers or sound. Any restrained broad camera move only supports the evolving field; a camera-only result fails. Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
```

### 연결과 의미 검수

Cut from intentional model CG to a compatible real-terrain view; spatial point-cloud/surface construction closes the film at broad scale.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Reject if this constraint is violated: Mesh remains confined to water and unchanged in position; shore-fine/offshore-coarse structure is preserved.
- Reject if this constraint is violated: White arrows stay coherently oriented from upstream through the estuary toward open sea.
- Reject if this constraint is violated: Teal field changes smoothly by transport and dispersion within connected wet areas; it never crosses dry land, teleports or appears as disconnected patches.
- Reject if this constraint is violated: This is an accelerated explanatory sequence, not actual calculated output or literal6-second real transport.
- Reject if this constraint is violated: No new section panels, numbers, labels or postproduction graphical additions.

## MAIN-SPATIAL — 공간정보 구축

main / video-proposal / 6초 · proposed source seconds, mutable after scene QA

상태 **original-missing** / generationReady **false** / generationAllowed **false**

Legible shape/elevation product suitable for mapping and spatial review

- 출처 — planned-native-chatgpt-concept
- 원본 — **없음 · original-missing**

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [higgsfield-procedure](../../docs/redesign-next/10-HIGGSFIELD-PRODUCTION.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — not-reviewed
- requirement — New unique native start/end pair required. The final wide view must depict the same terrain and features, not invented geometry beyond an unrelated starting image.

### 시작·전개·종료

- 시작 — A broad real-looking coastal and inland terrain view with coherent roads, bluff, low structures and a wide water boundary; a sparse registered point cloud is ready to resolve on the same visible surface.
- 전개 — 0-2s the fixed real-world features become represented by a denser registered natural-colour point cloud; 2-4s that point cloud resolves into a continuous corresponding surface; 4-6s the camera rises and pulls back to reveal the broader connected land-and-water extent.
- 종료 — A wide geographic closing view: the constructed surface remains visibly tied to real terrain, roads and coastline, with a readable regional extent rather than a desk or isolated floating model.
- 카메라 — Begin at a broad oblique survey view, hold enough registration to read point-cloud-to-surface construction, then smoothly ascend and pull back to a wider regional framing. Reconstruction is the action; camera widening supplies the ending scale.

### 원본 이미지 설계 문안 · 접수 승인 아님

```text
Create images only with native ChatGPT WEB and download the original. No Higgsfield image model or Codex image_gen. Choose one concrete research subject and prepared start state. All boxes, masks, mesh, analysis panels and UI-like concept graphics must be generated as part of the original. Compose every essential subject and panel completely within16:9; adjacent website text stays outside the media. Generated concepts are not actual observations, company property or product screens.

Create a high-quality original16:9 using native ChatGPT image generation. A broad oblique view of a plausible temperate Korean coast extending inland through a low wooded bluff, a modest road and ordinary low-rise structures. Sea, continuous shoreline and inland extent stay connected in one real-looking landscape. This is the FIRST construction state: most terrain is photographic, with a restrained sparse natural-colour point cloud precisely registered on one central bluff/road area. All points describe actual visible surface features, not decoration. Leave enough broad surrounding land and water for a later wider closing view. No isolated model plinth, floating land slab, scan beam, invented numbers, logos or purported measured result. Generate all analytical graphics natively. Fictional explanatory survey concept; highest available original download.
```

### 영상 설계 문안 · 원본과 동작 검수 후 개별 접수

```text
Seedance2.0 MCP preferred,1080p silent, using vetted native ChatGPT originals. Specify start,2-3causal subject actions and end. The subject/data distribution must actually change; camera motion alone is not acceptance. Preserve physical connections and geographic/annotation registration. Review complete playback plus critical continuous frames.

Six-second geospatial construction sequence on the supplied unchanged landscape. First, a registered natural-colour point cloud becomes denser over the same bluff, road and structures. Then those points resolve into a continuous corresponding surface without changing any terrain or building shape. During the final two seconds ascend and pull back smoothly, revealing a broader connected coastal-and-inland extent while the reconstructed area remains registered and readable. End on the expansive geographic view. The surface construction is the central action, not camera motion alone. No floating terrain, arbitrary particles, scan beams, new buildings, invented values, text or audio.
```

### 연결과 의미 검수

Cut from the model-domain scene to a real terrain view with compatible shoreline orientation. Finish wide and use a simple cut or short dissolve back to the opening regional satellite scene.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Reject if this constraint is violated: Natural terrain, roads, roofs and coastline stay in identical coordinates across photographic, point-cloud and surface representations.
- Reject if this constraint is violated: Point density and surface continuity change; physical topography and building shapes do not morph.
- Reject if this constraint is violated: A surface model may follow visible roofs and vegetation; do not claim validated bare-earth DEM or survey accuracy.
- Reject if this constraint is violated: No floating terrain slabs, undersea cliff walls, scan beams or particles unrelated to actual surface points.
- Reject if this constraint is violated: All point-cloud and surface graphics originate inside the generated image/video.

## EXP-AI — 인공지능

expertise-ai / still / 확정 정지 · 영상 길이 미정

상태 **accepted-still** / generationReady **false** / generationAllowed **false**

Every target stays linked to one box and one silhouette mask

- 출처 — native-chatgpt-concept
- 원본 — [로컬 보존 파일](../../media-source/editorial/ai-jellyfish-native-20260929.png)
- 검수 웹 이미지 — [WebP](../../dist/assets/editorial/ai-jellyfish-native-20260929.webp)

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [ai-jellyfish-native-20260929](../../media-source/editorial/ai-jellyfish-native-20260929.png) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — accepted-editorial-concept-still
- width — 1672
- height — 941
- sha256 — d748b6ba5cc2239c8413a1245098dbb623e455cc4f23c756f19afc4415f49eb4

### 시작·전개·종료

- 시작 — Four distinct moon-jellyfish forms with disk-shaped bells, visible four-lobed gonads and short oral arms. All four boxes enclose the corresponding organism. Blue contours and translucent masks follow all four silhouettes. No unboxed organisms or empty-water boxes. Natural underwater background. Parent independently inspected the original
- 전개 — Retain the accepted complete still; no automatic zoom/shake.
- 종료 — Same final still; do not imply accepted tracking or a completed video.

### 검수 정지 보존 지시

```text
Preserve the reviewed native ChatGPT original unchanged. All internal boxes, masks or analysis marks are already in the original. No new generation or postproduction graphics.
```

### 영상 전환 상태

```text
No video submission. Keep final still. For jellyfish, the same-input paid video retry remains prohibited.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — Still semantics and every depicted target/graphic remain coherent.
- result — No implied video or measured-result acceptance.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Same-shot jellyfish video retry
- Reuses business five-fish or main AI input
- Adds meaningless pan/zoom or video-production badge to a final still

## EXP-MODEL — 하천·호소의 수질 분포

expertise-modelling / video-proposal / 6초 · proposed source seconds, mutable after scene QA

상태 **original-missing** / generationReady **false** / generationAllowed **false**

메인 하구와 다른 내륙 수계에서 유동·확산의 시간 변화를 설명

- 출처 — planned-native-chatgpt-concept
- 원본 — **없음 · original-missing**

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [higgsfield-procedure](../../docs/redesign-next/10-HIGGSFIELD-PRODUCTION.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — not-reviewed
- requirement — New unique native original required; planned role does not equal approved source.

### 시작·전개·종료

- 시작 — Distinct inland river entering a lake; compact tracer near the inflow, fitted water-only mesh.
- 전개 — Tracer follows the inflow path and broadens within the lake circulation.
- 종료 — Broader diluted lake distribution on the same terrain and mesh.

### 원본 이미지 설계 문안 · 접수 승인 아님

```text
Create images only with native ChatGPT WEB and download the original. No Higgsfield image model or Codex image_gen. Choose one concrete research subject and prepared start state. All boxes, masks, mesh, analysis panels and UI-like concept graphics must be generated as part of the original. Compose every essential subject and panel completely within16:9; adjacent website text stays outside the media. Generated concepts are not actual observations, company property or product screens.

Create a unique native16:9 inland river/lake modelling concept, not the main estuary. Coherent banks and hills, restrained fitted water-only computational mesh and compact initial teal tracer at the river inflow. No impossible dam/weir. Show the whole connected domain. All graphics native; no calculated-value claims.
```

### 영상 설계 문안 · 원본과 동작 검수 후 개별 접수

```text
Seedance2.0 MCP preferred,1080p silent, using vetted native ChatGPT originals. Specify start,2-3causal subject actions and end. The subject/data distribution must actually change; camera motion alone is not acceptance. Preserve physical connections and geographic/annotation registration. Review complete playback plus critical continuous frames.

Six-second accelerated model concept: inflow tracer moves into the lake, spreads with coherent circulation and dilutes. Preserve all terrain and mesh; no dry-land spill or teleportation. Camera motion alone is insufficient.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Reuses main model source or detail AX estuary
- Tracer crosses dry ground or terrain changes
- Only camera/colour flicker changes

## EXP-SATELLITE — 위성 수환경 분석

expertise-satellite / video-proposal / 6초 · proposed source seconds, mutable after scene QA

상태 **original-missing** / generationReady **false** / generationAllowed **false**

메인 광역 연안과 다른 호소 위성영상에서 입력 밴드와 수환경 층의 관계를 표현

- 출처 — planned-native-chatgpt-concept
- 원본 — **없음 · original-missing**

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [higgsfield-procedure](../../docs/redesign-next/10-HIGGSFIELD-PRODUCTION.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — not-reviewed
- requirement — New unique native original required; planned role does not equal approved source.

### 시작·전개·종료

- 시작 — Orthographic satellite view of a distinct inland lake with coherent true-colour land and a same-area spectral inset.
- 전개 — A restrained environmental layer resolves only over valid lake pixels.
- 종료 — Matched raw and derived views remain legible with cloud/no-data preserved.

### 원본 이미지 설계 문안 · 접수 승인 아님

```text
Create images only with native ChatGPT WEB and download the original. No Higgsfield image model or Codex image_gen. Choose one concrete research subject and prepared start state. All boxes, masks, mesh, analysis panels and UI-like concept graphics must be generated as part of the original. Compose every essential subject and panel completely within16:9; adjacent website text stays outside the media. Generated concepts are not actual observations, company property or product screens.

New unique native16:9 satellite-data view of an inland lake and catchment. Orthographic raster texture, matching small spectral inset and a restrained incipient water-environment layer. Not a perspective drone image. No spacecraft or scan beam. Do not reuse main coastal satellite input or claim measured values.
```

### 영상 설계 문안 · 원본과 동작 검수 후 개별 접수

```text
Seedance2.0 MCP preferred,1080p silent, using vetted native ChatGPT originals. Specify start,2-3causal subject actions and end. The subject/data distribution must actually change; camera motion alone is not acceptance. Preserve physical connections and geographic/annotation registration. Review complete playback plus critical continuous frames.

Six seconds: the spectral/true-colour data resolve into a shore-aligned water-environment layer over the lake, then settle into clearly corresponding raw/derived views. Cloud/no-data stays unclassified. Keep geography fixed; no fake numbers or camera-only motion.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Generic aerial scenery with no data relationship
- Shares main satellite source
- Derived field crosses land or invents cloud-covered observations

## EXP-SPATIAL — 공간정보·측량

expertise-spatial / video-proposal / 6초 · proposed source seconds, mutable after scene QA

상태 **original-missing** / generationReady **false** / generationAllowed **false**

Legible shape/elevation product suitable for mapping and spatial review

- 출처 — planned-native-chatgpt-concept
- 원본 — **없음 · original-missing**

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [higgsfield-procedure](../../docs/redesign-next/10-HIGGSFIELD-PRODUCTION.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — not-reviewed
- requirement — New unique native original required; planned role does not equal approved source.

### 시작·전개·종료

- 시작 — One concrete coastal bluff/road object in matched photogrammetry, point-cloud and terrain representations; prepared before the selected action.
- 전개 — Point cloud densifies on fixed geometry; a continuous surface resolves from it
- 종료 — Legible shape/elevation product suitable for mapping and spatial review

### 원본 이미지 설계 문안 · 접수 승인 아님

```text
Create images only with native ChatGPT WEB and download the original. No Higgsfield image model or Codex image_gen. Choose one concrete research subject and prepared start state. All boxes, masks, mesh, analysis panels and UI-like concept graphics must be generated as part of the original. Compose every essential subject and panel completely within16:9; adjacent website text stays outside the media. Generated concepts are not actual observations, company property or product screens.

Native ChatGPT image creation only. High-quality original16:9 at maximum downloadable resolution. All panels and graphics generated inside the original. Realistic restrained materials and light. No logo, fabricated readings, scores, dates or numerical legends. Fictional editorial method concept, not an actual observation, company site, computation or product screen. A surveyed temperate coastal bluff, one ordinary road and modest dry-land structures form a large coherent central terrain object. One side is a complete sparse natural-colour point cloud registered exactly to each feature; the other is a matte terrain surface of that same object. Two small aligned panels show its orthophoto and elevation rendering. Plausible continuous geometry, clean neutral scientific presentation. No floating land slab, spacecraft, laser beam or arbitrary cliff wall. Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
```

### 영상 설계 문안 · 원본과 동작 검수 후 개별 접수

```text
Seedance2.0 MCP preferred,1080p silent, using vetted native ChatGPT originals. Specify start,2-3causal subject actions and end. The subject/data distribution must actually change; camera motion alone is not acceptance. Preserve physical connections and geographic/annotation registration. Review complete playback plus critical continuous frames.

Six seconds. The registered natural-colour point cloud gains density on unchanged terrain. Then a connected clean terrain surface resolves from those same points while the matching ortho/elevation panels remain registered. A shallow lateral camera move reveals relief. No terrain morphing, invented buildings, scan beams, numbers or audio.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Do not substitute satellite water-quality imagery; point cloud, orthophoto and terrain must correspond.
- Exact source or clip duplicates main/company/AX assets

## EXP-OBSERVATION — 무인선 조사와 탐사 단면

expertise-observation / video-proposal / 6초 · proposed source seconds, mutable after scene QA

상태 **original-missing** / generationReady **false** / generationAllowed **false**

CTD 메인 장면과 구별되는 하천 무인선 자료 취득을 보여줌

- 출처 — planned-native-chatgpt-concept
- 원본 — **없음 · original-missing**

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [equipment](../../docs/redesign-production/equipment-sources/manifest.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [usv](../../dist/assets/equipment-usv-original.png) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [brochure-review](../../docs/company-audit/brochure-review.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [higgsfield-procedure](../../docs/redesign-next/10-HIGGSFIELD-PRODUCTION.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — not-reviewed
- requirement — New unique native original required; planned role does not equal approved source.

### 시작·전개·종료

- 시작 — A modest plausible survey USV on a straight river transect; one quiet native acoustic-return panel begins at the current survey position.
- 전개 — USV advances steadily with a proportional wake while acoustic-return columns accumulate in sequence.
- 종료 — A readable continuous survey section and vessel progress remain in geographic context.

### 원본 이미지 설계 문안 · 접수 승인 아님

```text
Create images only with native ChatGPT WEB and download the original. No Higgsfield image model or Codex image_gen. Choose one concrete research subject and prepared start state. All boxes, masks, mesh, analysis panels and UI-like concept graphics must be generated as part of the original. Compose every essential subject and panel completely within16:9; adjacent website text stays outside the media. Generated concepts are not actual observations, company property or product screens.

Unique native16:9 river survey scene with a plausible small USV, ordinary banks and a clear survey route. Use documented company USV/equipment evidence for proportions, not a claimed photograph. A restrained native inset shows qualitative acoustic returns from the same survey, without numerical depth or velocity labels. Whole vessel, wake and inset fit the frame. Do not reuse main CTD image.
```

### 영상 설계 문안 · 원본과 동작 검수 후 개별 접수

```text
Seedance2.0 MCP preferred,1080p silent, using vetted native ChatGPT originals. Specify start,2-3causal subject actions and end. The subject/data distribution must actually change; camera motion alone is not acceptance. Preserve physical connections and geographic/annotation registration. Review complete playback plus critical continuous frames.

Six seconds: the USV advances along one straight survey line, producing a physically proportionate wake; its native acoustic-return section accumulates consecutively with survey progress. Preserve hull and sensor geometry. No emitted visible sonar laser, fabricated measurements or unrelated data panel.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Hull/sensor shape changes
- Wake does not follow vessel motion
- Acoustic return is mislabeled as velocity or fabricated measured bathymetry
- Uses CTD source

## EXP-ENVIRONMENT — 환경분석·생태

expertise-environment / video-proposal / 6초 · proposed source seconds, mutable after scene QA

상태 **original-missing** / generationReady **false** / generationAllowed **false**

A concrete environmental/ecological sample in field context

- 출처 — planned-native-chatgpt-concept
- 원본 — **없음 · original-missing**

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [higgsfield-procedure](../../docs/redesign-next/10-HIGGSFIELD-PRODUCTION.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — not-reviewed
- requirement — New unique native original required; planned role does not equal approved source.

### 시작·전개·종료

- 시작 — Saltmarsh survey quadrat and intact sediment core, with separate lab evidence; prepared before the selected action.
- 전개 — Physical sampling preserves layers; specimen detail connects sediment/roots to investigation
- 종료 — A concrete environmental/ecological sample in field context

### 원본 이미지 설계 문안 · 접수 승인 아님

```text
Create images only with native ChatGPT WEB and download the original. No Higgsfield image model or Codex image_gen. Choose one concrete research subject and prepared start state. All boxes, masks, mesh, analysis panels and UI-like concept graphics must be generated as part of the original. Compose every essential subject and panel completely within16:9; adjacent website text stays outside the media. Generated concepts are not actual observations, company property or product screens.

Native ChatGPT image creation only. High-quality original16:9 at maximum downloadable resolution. All panels and graphics generated inside the original. Realistic restrained materials and light. No logo, fabricated readings, scores, dates or numerical legends. Fictional editorial method concept, not an actual observation, company site, computation or product screen. Documentary temperate Korean saltmarsh field scene. A survey quadrat rests naturally over low salt-tolerant plants and wet sediment beside one freshly recovered transparent sediment core held upright in a proper simple support. Core preserves plausible horizontal mud layers and fine roots. Sample and quadrat are large clear subjects, tidal-flat context behind. One small native inset magnifies the SAME core layers. No tropical reef, decorative forest, rainbow strata or laboratory people. Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
```

### 영상 설계 문안 · 원본과 동작 검수 후 개별 접수

```text
Seedance2.0 MCP preferred,1080p silent, using vetted native ChatGPT originals. Specify start,2-3causal subject actions and end. The subject/data distribution must actually change; camera motion alone is not acceptance. Preserve physical connections and geographic/annotation registration. Review complete playback plus critical continuous frames.

Optional six-second clip only with an extraction-ready native start image: gloved field hands withdraw one intact vertical sediment core smoothly from wet ground, then support it upright without mixing its strata. A little exterior water drains naturally; quadrat and surrounding plants stay stable. Native sample inset retains the same layer order. No duplicated hands, manufactured layers, labels or audio.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Do not animate a completed core as if still buried. A strong still is valid; no mandatory video quantity.
- Exact source or clip duplicates main/company/AX assets

## EXP-HAZARDS — 연안재해·방재

expertise-hazards / still / 확정 정지 · 영상 길이 미정

상태 **accepted-still** / generationReady **false** / generationAllowed **false**

Coastal target and derived monitoring result are visibly linked

- 출처 — native-chatgpt-concept
- 원본 — [로컬 보존 파일](../../media-source/editorial/coastal-monitoring-native-20260929.png)
- 검수 웹 이미지 — [WebP](../../dist/assets/editorial/coastal-monitoring-native-20260929.webp)

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [coastal-monitoring-native-20260929](../../media-source/editorial/coastal-monitoring-native-20260929.png) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — accepted-editorial-concept-still
- width — 1672
- height — 941
- sha256 — 0554d53a0830a93886380253b310bf4a42f77fea0798734635dc6b0bba0f1c62

### 시작·전개·종료

- 시작 — Continuous gently curving sandy coastline with natural surf, coherent land-water relationship, plausible low-rise town and road on dry land. No impossible breakwaters or offshore structures. Thin blue boundary line tracks the swash edge. All perspective scales plausible at original resolution.
- 전개 — Retain the accepted complete still; no automatic zoom/shake.
- 종료 — Same final still; do not imply accepted tracking or a completed video.

### 검수 정지 보존 지시

```text
Preserve the reviewed native ChatGPT original unchanged. All internal boxes, masks or analysis marks are already in the original. No new generation or postproduction graphics.
```

### 영상 전환 상태

```text
No video submission. Keep final still. For jellyfish, the same-input paid video retry remains prohibited.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — Still semantics and every depicted target/graphic remain coherent.
- result — No implied video or measured-result acceptance.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Same-shot jellyfish video retry
- Reuses business five-fish or main AI input
- Adds meaningless pan/zoom or video-production badge to a final still

## EXP-SYSTEMS — 데이터·시스템

expertise-systems / video-proposal / 6초 · proposed source seconds, mutable after scene QA

상태 **original-missing** / generationReady **false** / generationAllowed **false**

Data support a specific spatial review task

- 출처 — planned-native-chatgpt-concept
- 원본 — **없음 · original-missing**

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [higgsfield-procedure](../../docs/redesign-next/10-HIGGSFIELD-PRODUCTION.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — not-reviewed
- requirement — New unique native original required; planned role does not equal approved source.

### 시작·전개·종료

- 시작 — Physical environmental analysis workstation, logger and a large purposeful map display; prepared before the selected action.
- 전개 — Observation layer switches to registered model result; relevant review extent becomes focused
- 종료 — Data support a specific spatial review task

### 원본 이미지 설계 문안 · 접수 승인 아님

```text
Create images only with native ChatGPT WEB and download the original. No Higgsfield image model or Codex image_gen. Choose one concrete research subject and prepared start state. All boxes, masks, mesh, analysis panels and UI-like concept graphics must be generated as part of the original. Compose every essential subject and panel completely within16:9; adjacent website text stays outside the media. Generated concepts are not actual observations, company property or product screens.

Native ChatGPT image creation only. High-quality original16:9 at maximum downloadable resolution. All panels and graphics generated inside the original. Realistic restrained materials and light. No logo, fabricated readings, scores, dates or numerical legends. Fictional editorial method concept, not an actual observation, company site, computation or product screen. A precise realistic environmental analysis workstation. Large professional display viewed obliquely but clearly, compact rugged field logger with plausible connected leads beside it. Display shows one coherent river/coast base with two small restrained native panels for observed water coverage and model transport. FIRST state: observation layer selected, model and hypothetical nearshore review region subdued. No person necessary. Screen/bezel/desk/connectors look physical; display60% of frame, logger15%. No fake live timestamps, random charts or purported actual product branding. Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
```

### 영상 설계 문안 · 원본과 동작 검수 후 개별 접수

```text
Seedance2.0 MCP preferred,1080p silent, using vetted native ChatGPT originals. Specify start,2-3causal subject actions and end. The subject/data distribution must actually change; camera motion alone is not acceptance. Preserve physical connections and geographic/annotation registration. Review complete playback plus critical continuous frames.

Six seconds. On the physical display, select the model-result layer in place of the observation layer while retaining identical geography. Then focus one hypothetical nearshore review extent reached by the model field and its matching detail panel, reducing unrelated layers. A short natural camera slide reveals monitor and connected logger. Every screen transition is natively generated and purposeful, not random blinking. No invented metrics, fake branding, new panels or audio.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Generated panels explain concepts only and must not impersonate an actual AX product screen. Detailed product evidence comes from actual provided AX material.
- Exact source or clip duplicates main/company/AX assets

## COMPANY-ANALYSIS — 시료 분석의 실제 동작

company / video-proposal / 6초 · proposed source seconds, mutable after scene QA

상태 **original-missing** / generationReady **false** / generationAllowed **false**

회사 소개 확장 미디어에 연구 방법이 읽히는 독립적인 실험 장면을 배치

- 출처 — planned-native-chatgpt-concept
- 원본 — **없음 · original-missing**

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [brochure-review](../../docs/company-audit/brochure-review.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [equipment](../../docs/redesign-production/equipment-sources/manifest.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [higgsfield-procedure](../../docs/redesign-next/10-HIGGSFIELD-PRODUCTION.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님

### 시작·전개·종료

- 시작 — A realistic automated sample rack and one sampling needle at an environmental-analysis bench, needle raised above a vial.
- 전개 — Rack settles at one position; needle descends into that same vial.
- 종료 — Needle retracts and the intact sample rack remains ready for the next sample.

### 원본 이미지 설계 문안 · 접수 승인 아님

```text
Create images only with native ChatGPT WEB and download the original. No Higgsfield image model or Codex image_gen. Choose one concrete research subject and prepared start state. All boxes, masks, mesh, analysis panels and UI-like concept graphics must be generated as part of the original. Compose every essential subject and panel completely within16:9; adjacent website text stays outside the media. Generated concepts are not actual observations, company property or product screens.

New native16:9 documentary environmental-analysis bench with a plausible automated liquid sampler, intact sample vials, one connected sampling needle and nearby analytical instrument. No people. Device and sample path read clearly in a complete frame. Neutral light and realistic laboratory materials. No fake results, brand/ownership claim or reuse of the equipment-page laboratory still.
```

### 영상 설계 문안 · 원본과 동작 검수 후 개별 접수

```text
Seedance2.0 MCP preferred,1080p silent, using vetted native ChatGPT originals. Specify start,2-3causal subject actions and end. The subject/data distribution must actually change; camera motion alone is not acceptance. Preserve physical connections and geographic/annotation registration. Review complete playback plus critical continuous frames.

Six seconds: the sample rack positions one vial beneath the connected needle; the needle lowers into it, then retracts after sampling. Preserve all vial geometry and physical connections. No floating pipette, extra hands, liquid appearing from nowhere or numeric result display.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Device is decorative with no sampling event
- Needle/vials pass through each other or change shape
- Repeats equipment lab or main CTD source

## AX-MAIN-CONCEPT — 같은 공간에 연결되는 자료

ax-main / video-proposal / 6초 · proposed source seconds, mutable after scene QA

상태 **original-missing** / generationReady **false** / generationAllowed **false**

AX 메인 도입의 공간·자료 관계를 보여주며 실제 제품 갤러리와 역할 구분

- 출처 — planned-native-chatgpt-concept
- 원본 — **없음 · original-missing**

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [higgsfield-procedure](../../docs/redesign-next/10-HIGGSFIELD-PRODUCTION.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님

### 시작·전개·종료

- 시작 — A unique broad freshwater catchment with registered observation-coverage and model-field concept panels.
- 전개 — Observation information gives way to a corresponding environmental model layer on the same geography.
- 종료 — One relevant water-area review region and its linked panel become clear.

### 원본 이미지 설계 문안 · 접수 승인 아님

```text
Create images only with native ChatGPT WEB and download the original. No Higgsfield image model or Codex image_gen. Choose one concrete research subject and prepared start state. All boxes, masks, mesh, analysis panels and UI-like concept graphics must be generated as part of the original. Compose every essential subject and panel completely within16:9; adjacent website text stays outside the media. Generated concepts are not actual observations, company property or product screens.

Unique native16:9 broad catchment analysis concept, distinct from main closing terrain and AX detail estuary. Keep the real-looking terrain dominant and fit two restrained native panels showing matching observation coverage and model field. All layers use the same shore/river coordinates. No product controls, fake metrics, branding or claim this is actual AX software.
```

### 영상 설계 문안 · 원본과 동작 검수 후 개별 접수

```text
Seedance2.0 MCP preferred,1080p silent, using vetted native ChatGPT originals. Specify start,2-3causal subject actions and end. The subject/data distribution must actually change; camera motion alone is not acceptance. Preserve physical connections and geographic/annotation registration. Review complete playback plus critical continuous frames.

Six seconds: switch the same registered catchment from observation coverage to a corresponding environmental model layer, then focus a relevant water-area review extent and matching panel. Preserve terrain and data alignment. No random blinking, floating HUD or postproduction overlay.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Copies main or AX detail source
- Panels do not depict the central geography
- Generated controls impersonate actual AX UI
- Only camera zoom changes

## WAVE-ROCK — 암반 연안의 파쇄와 되밀림

wave / video-proposal / 6초 · proposed source seconds, mutable after scene QA

상태 **original-missing** / generationReady **false** / generationAllowed **false**

기술 대표가 아닌 별도 전환 구간에서 물의 움직임을 보여줌

- 출처 — planned-native-chatgpt-concept
- 원본 — **없음 · original-missing**

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [higgsfield-procedure](../../docs/redesign-next/10-HIGGSFIELD-PRODUCTION.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님

### 시작·전개·종료

- 시작 — An unbroken moderate crest approaches a low granite headland, open sea remains broad.
- 전개 — Crest breaks along fixed rocks and whitewater fans around them.
- 종료 — Foam drains naturally as the next swell approaches.

### 원본 이미지 설계 문안 · 접수 승인 아님

```text
Create images only with native ChatGPT WEB and download the original. No Higgsfield image model or Codex image_gen. Choose one concrete research subject and prepared start state. All boxes, masks, mesh, analysis panels and UI-like concept graphics must be generated as part of the original. Compose every essential subject and panel completely within16:9; adjacent website text stays outside the media. Generated concepts are not actual observations, company property or product screens.

New native16:9 wide temperate rocky coast, low granite headland at one side and broad navy open water. A coherent moderate unbroken swell is ready to reach the rocks. Realistic foam/depth/light, no invented structure or disaster spectacle. Unique source, not a main hero or hazards image.
```

### 영상 설계 문안 · 원본과 동작 검수 후 개별 접수

```text
Seedance2.0 MCP preferred,1080p silent, using vetted native ChatGPT originals. Specify start,2-3causal subject actions and end. The subject/data distribution must actually change; camera motion alone is not acceptance. Preserve physical connections and geographic/annotation registration. Review complete playback plus critical continuous frames.

Six seconds: the incoming crest reaches the fixed rocky shore, breaks progressively, and the resulting foam spreads then drains back around the same rocks. Natural moderate water movement, no giant storm surge. Keep full coast/wave context visible.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Only still-image pan or tiny shimmer
- Water flows through rocks
- Fake harbour or giant disaster wave
- Used as a technology explanation

## WAVE-OPEN — 외해의 이어지는 파면

wave / video-proposal / 6초 · proposed source seconds, mutable after scene QA

상태 **original-missing** / generationReady **false** / generationAllowed **false**

암반 장면에 연결되는 별도 외해 물성 장면

- 출처 — planned-native-chatgpt-concept
- 원본 — **없음 · original-missing**

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [higgsfield-procedure](../../docs/redesign-next/10-HIGGSFIELD-PRODUCTION.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님

### 시작·전개·종료

- 시작 — Broad open-water swell fronts, coherent horizon and no foreground structure.
- 전개 — A crest advances and forms sparse wind-driven foam.
- 종료 — Foam dissipates as the following swell progresses coherently.

### 원본 이미지 설계 문안 · 접수 승인 아님

```text
Create images only with native ChatGPT WEB and download the original. No Higgsfield image model or Codex image_gen. Choose one concrete research subject and prepared start state. All boxes, masks, mesh, analysis panels and UI-like concept graphics must be generated as part of the original. Compose every essential subject and panel completely within16:9; adjacent website text stays outside the media. Generated concepts are not actual observations, company property or product screens.

New native16:9 open temperate sea with clear moderate navy swell fronts and sparse realistic foam; broad horizon, natural light and no vessel, structure or graphics. Different source and angle from rocky transition shot.
```

### 영상 설계 문안 · 원본과 동작 검수 후 개별 접수

```text
Seedance2.0 MCP preferred,1080p silent, using vetted native ChatGPT originals. Specify start,2-3causal subject actions and end. The subject/data distribution must actually change; camera motion alone is not acceptance. Preserve physical connections and geographic/annotation registration. Review complete playback plus critical continuous frames.

Six seconds: coherent swell fronts travel across the view, one crest forms sparse foam and that foam dissipates naturally as the next wave advances. Stable horizon and physically consistent wave direction. The water action, not camera movement, carries the scene.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Static photo merely zooms
- Waves move in contradictory directions
- Storm/structure added
- Same source as rocky clip

## AX-DETAIL-FLOW — AX 상세 공간분석 도입

ax-detail / image-to-video / 6초 · one authorized6s derivative attempt; accepted still remains until video passes QA

상태 **source-reviewed-awaiting-reference-upload** / generationReady **false** / generationAllowed **true**

메인 AX 및 메인 모델과 중복하지 않는 검수 정지 소개

- 출처 — native-chatgpt-concept
- 원본 — [로컬 보존 파일](../../media-source/editorial/ax-estuary-analysis-native-20260929.png)
- 검수 웹 이미지 — [WebP](../../dist/assets/editorial/ax-estuary-analysis-native-20260929.webp)

### 근거와 원본 상태

- [company-technology-audit](../../docs/company-audit/technology-analysis.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [presentation-direction](../../docs/company-audit/presentation-direction.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [native-handoff](../../media-source/editorial/media-production-handoff.json) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [ax-estuary-analysis-native-20260929](../../media-source/editorial/ax-estuary-analysis-native-20260929.png) — 근거 또는 보존 자료이며 자동 생성 승인이 아님

### 시작·전개·종료

- 시작 — Preserve original terrain, native water mesh and compact bright river-mouth plume.
- 전개 — Continuous plume extends farther offshore from river mouth, remaining connected to inflow.
- 종료 — Clearly broader offshore footprint and softened diluted margins; terrain and water-only mesh fixed.

### 원본 이미지 설계 문안 · 접수 승인 아님

```text
Create images only with native ChatGPT WEB and download the original. No Higgsfield image model or Codex image_gen. Choose one concrete research subject and prepared start state. All boxes, masks, mesh, analysis panels and UI-like concept graphics must be generated as part of the original. Compose every essential subject and panel completely within16:9; adjacent website text stays outside the media. Generated concepts are not actual observations, company property or product screens.

Use the unchanged vetted native AX estuary original with existing water-only mesh and plume. Preserve its original first frame; no new source or postproduction graphics.
```

### 영상 설계 문안 · 원본과 동작 검수 후 개별 접수

```text
Seedance2.0 MCP preferred,1080p silent, using vetted native ChatGPT originals. Specify start,2-3causal subject actions and end. The subject/data distribution must actually change; camera motion alone is not acceptance. Preserve physical connections and geographic/annotation registration. Review complete playback plus critical continuous frames.

Use the supplied original image as the exact first frame. Create one 6-second 16:9 scientific editorial shot of this SAME river estuary and its already visible cyan numerical-model mesh and turquoise concentration field. Subject: an illustrative water-quality plume being advected from the river into the open sea. The terrain, coast, sandbars, bridge, roads, fields and computational mesh stay geometrically fixed and registered to the original throughout; this is an evolving model field on a fixed geographic domain. At 0 seconds preserve the original compact bright plume at the river mouth. From 0 to 3 seconds a continuous supply travels down the existing river channel from upper left, exits the mouth toward the right and smoothly pushes the plume's leading edge farther offshore while the near-mouth core remains connected to the river. From 3 to 6 seconds the offshore plume visibly widens sideways through diffusion, its outer edge softens and becomes less concentrated while the elongated brighter core continues moving seaward. The final plume footprint must be clearly farther offshore and broader than at the start, with a coherent connected gradient rather than flicker or simple opacity pulsing. Keep the analytic color field strictly in water, never over dry land or bridge; keep every existing mesh line stable and readable from first through last frame. Orthographic overhead camera holds this complete domain so the change of the actual field extent and distribution is unmistakable; camera movement cannot substitute for field evolution. Retain the documentary satellite-like texture and restrained natural colors. This is an explanatory simulation concept, not an actual site or measured result. No new objects, text, labels, numeric metrics, controls, extra panels, scan beams or decorative particles. All internal analysis graphics are part of the generated video itself. Silent.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — Existing plume advects offshore, widens and dilutes with connected river supply; inspect every output frame for native-graphics stability.
- result — Distinct broader, farther-offshore final field. Qualitative illustration, not real simulation output.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Shares source with main film or main AX
- Concept presented as actual AX screen
- Only camera motion or opacity pulsing without changing plume extent/distribution
- Changing terrain, mesh or shoreline
- Plume or mesh crossing dry land/bridge
- New numeric metrics, fake product UI or particles

## UI-AX-DISCOVER — ax-discover actual UI

actual-ui / actual-ui-clip / 3.03초 · Existing runtime clip duration; not a new generation request

상태 **source-not-reviewed** / generationReady **false** / generationAllowed **false**

Preserve authentic product footage in its own product slot

- 출처 — actual-ui
- 원본 — [로컬 보존 파일](../../dist/assets/films/ax-discover-fast.mp4)

### 근거와 원본 상태

- [actual-ax-discover](../../dist/assets/films/ax-discover-fast.mp4) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [capture-review](../../docs/redesign-production/PLATFORM-CAPTURE-20260920.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [ax-review](../../docs/redesign-next/11-AX-EMBED-REVIEW.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — existing-file; playback-not-rechecked-in-this-pass
- runtimeApproval — approved
- capturePlans — []

### 시작·전개·종료

- 시작 — Authentic full16:9 product context from the existing clip.
- 전개 — Only the actual recorded interaction/result; no AI replacement.
- 종료 — Authentic result remains legible with its geographic/product context.

### 실제 UI 보존 지시 · 생성 금지

```text
Do not generate or repaint product UI. Use only verified actual captures and the preserved platformCaptures instructions.
```

### 실제 캡처·편집 지시

```text
No generative model. Retain or recapture authentic interaction; editing only joins/transitions and faithful export, without invented screen elements.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Generated or repainted product UI
- Claims archival screen is live data
- Substitutes one product recording for another

## UI-AX-DETECT — ax-detect actual UI

actual-ui / actual-ui-clip / 3.03초 · Existing runtime clip duration; not a new generation request

상태 **source-not-reviewed** / generationReady **false** / generationAllowed **false**

Preserve authentic product footage in its own product slot

- 출처 — actual-ui
- 원본 — [로컬 보존 파일](../../dist/assets/films/ax-detect-fast.mp4)

### 근거와 원본 상태

- [actual-ax-detect](../../dist/assets/films/ax-detect-fast.mp4) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [capture-review](../../docs/redesign-production/PLATFORM-CAPTURE-20260920.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [ax-review](../../docs/redesign-next/11-AX-EMBED-REVIEW.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — existing-file; playback-not-rechecked-in-this-pass
- runtimeApproval — approved
- capturePlans — ["satellite"]

### 시작·전개·종료

- 시작 — Authentic full16:9 product context from the existing clip.
- 전개 — Only the actual recorded interaction/result; no AI replacement.
- 종료 — Authentic result remains legible with its geographic/product context.

### 실제 UI 보존 지시 · 생성 금지

```text
Do not generate or repaint product UI. Use only verified actual captures and the preserved platformCaptures instructions.
```

### 실제 캡처·편집 지시

```text
No generative model. Retain or recapture authentic interaction; editing only joins/transitions and faithful export, without invented screen elements.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Generated or repainted product UI
- Claims archival screen is live data
- Substitutes one product recording for another

## UI-AX-PREDICT — ax-predict actual UI

actual-ui / actual-ui-clip / 3.03초 · Existing runtime clip duration; not a new generation request

상태 **source-not-reviewed** / generationReady **false** / generationAllowed **false**

Preserve authentic product footage in its own product slot

- 출처 — actual-ui
- 원본 — [로컬 보존 파일](../../dist/assets/films/ax-predict-fast.mp4)

### 근거와 원본 상태

- [actual-ax-predict](../../dist/assets/films/ax-predict-fast.mp4) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [capture-review](../../docs/redesign-production/PLATFORM-CAPTURE-20260920.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [ax-review](../../docs/redesign-next/11-AX-EMBED-REVIEW.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — existing-file; playback-not-rechecked-in-this-pass
- runtimeApproval — approved
- capturePlans — ["flood3d","surge","sealevel"]

### 시작·전개·종료

- 시작 — Authentic full16:9 product context from the existing clip.
- 전개 — Only the actual recorded interaction/result; no AI replacement.
- 종료 — Authentic result remains legible with its geographic/product context.

### 실제 UI 보존 지시 · 생성 금지

```text
Do not generate or repaint product UI. Use only verified actual captures and the preserved platformCaptures instructions.
```

### 실제 캡처·편집 지시

```text
No generative model. Retain or recapture authentic interaction; editing only joins/transitions and faithful export, without invented screen elements.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Generated or repainted product UI
- Claims archival screen is live data
- Substitutes one product recording for another

## UI-AX-MONITOR — ax-monitor actual UI

actual-ui / actual-ui-clip / 3.03초 · Existing runtime clip duration; not a new generation request

상태 **source-not-reviewed** / generationReady **false** / generationAllowed **false**

Preserve authentic product footage in its own product slot

- 출처 — actual-ui
- 원본 — [로컬 보존 파일](../../dist/assets/films/ax-monitor-fast.mp4)

### 근거와 원본 상태

- [actual-ax-monitor](../../dist/assets/films/ax-monitor-fast.mp4) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [capture-review](../../docs/redesign-production/PLATFORM-CAPTURE-20260920.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [ax-review](../../docs/redesign-next/11-AX-EMBED-REVIEW.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — existing-file; playback-not-rechecked-in-this-pass
- runtimeApproval — approved
- capturePlans — ["buoy","env","rip"]

### 시작·전개·종료

- 시작 — Authentic full16:9 product context from the existing clip.
- 전개 — Only the actual recorded interaction/result; no AI replacement.
- 종료 — Authentic result remains legible with its geographic/product context.

### 실제 UI 보존 지시 · 생성 금지

```text
Do not generate or repaint product UI. Use only verified actual captures and the preserved platformCaptures instructions.
```

### 실제 캡처·편집 지시

```text
No generative model. Retain or recapture authentic interaction; editing only joins/transitions and faithful export, without invented screen elements.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Generated or repainted product UI
- Claims archival screen is live data
- Substitutes one product recording for another

## UI-PLATFORM-SATELLITE — platform-satellite actual UI

actual-ui / actual-ui-clip / 3.8초 · Existing runtime clip duration; not a new generation request

상태 **source-not-reviewed** / generationReady **false** / generationAllowed **false**

Preserve authentic product footage in its own product slot

- 출처 — actual-ui
- 원본 — [로컬 보존 파일](../../dist/assets/films/platform-satellite-preview.mp4)

### 근거와 원본 상태

- [actual-platform-satellite](../../dist/assets/films/platform-satellite-preview.mp4) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [capture-review](../../docs/redesign-production/PLATFORM-CAPTURE-20260920.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [ax-review](../../docs/redesign-next/11-AX-EMBED-REVIEW.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — existing-file; playback-not-rechecked-in-this-pass
- runtimeApproval — draft-reviewed
- capturePlans — []

### 시작·전개·종료

- 시작 — Authentic full16:9 product context from the existing clip.
- 전개 — Only the actual recorded interaction/result; no AI replacement.
- 종료 — Authentic result remains legible with its geographic/product context.

### 실제 UI 보존 지시 · 생성 금지

```text
Do not generate or repaint product UI. Use only verified actual captures and the preserved platformCaptures instructions.
```

### 실제 캡처·편집 지시

```text
No generative model. Retain or recapture authentic interaction; editing only joins/transitions and faithful export, without invented screen elements.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Generated or repainted product UI
- Claims archival screen is live data
- Substitutes one product recording for another

## UI-PLATFORM-FLOOD3D — platform-flood3d actual UI

actual-ui / actual-ui-clip / 3.8초 · Existing runtime clip duration; not a new generation request

상태 **source-not-reviewed** / generationReady **false** / generationAllowed **false**

Preserve authentic product footage in its own product slot

- 출처 — actual-ui
- 원본 — [로컬 보존 파일](../../dist/assets/films/platform-flood3d-preview.mp4)

### 근거와 원본 상태

- [actual-platform-flood3d](../../dist/assets/films/platform-flood3d-preview.mp4) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [capture-review](../../docs/redesign-production/PLATFORM-CAPTURE-20260920.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [ax-review](../../docs/redesign-next/11-AX-EMBED-REVIEW.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — existing-file; playback-not-rechecked-in-this-pass
- runtimeApproval — draft-reviewed
- capturePlans — []

### 시작·전개·종료

- 시작 — Authentic full16:9 product context from the existing clip.
- 전개 — Only the actual recorded interaction/result; no AI replacement.
- 종료 — Authentic result remains legible with its geographic/product context.

### 실제 UI 보존 지시 · 생성 금지

```text
Do not generate or repaint product UI. Use only verified actual captures and the preserved platformCaptures instructions.
```

### 실제 캡처·편집 지시

```text
No generative model. Retain or recapture authentic interaction; editing only joins/transitions and faithful export, without invented screen elements.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Generated or repainted product UI
- Claims archival screen is live data
- Substitutes one product recording for another

## UI-PLATFORM-BUOY — platform-buoy actual UI

actual-ui / actual-ui-clip / 3.8초 · Existing runtime clip duration; not a new generation request

상태 **source-not-reviewed** / generationReady **false** / generationAllowed **false**

Preserve authentic product footage in its own product slot

- 출처 — actual-ui
- 원본 — [로컬 보존 파일](../../dist/assets/films/platform-buoy-preview.mp4)

### 근거와 원본 상태

- [actual-platform-buoy](../../dist/assets/films/platform-buoy-preview.mp4) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [capture-review](../../docs/redesign-production/PLATFORM-CAPTURE-20260920.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- [ax-review](../../docs/redesign-next/11-AX-EMBED-REVIEW.md) — 근거 또는 보존 자료이며 자동 생성 승인이 아님
- status — existing-file; playback-not-rechecked-in-this-pass
- runtimeApproval — draft-reviewed
- capturePlans — []

### 시작·전개·종료

- 시작 — Authentic full16:9 product context from the existing clip.
- 전개 — Only the actual recorded interaction/result; no AI replacement.
- 종료 — Authentic result remains legible with its geographic/product context.

### 실제 UI 보존 지시 · 생성 금지

```text
Do not generate or repaint product UI. Use only verified actual captures and the preserved platformCaptures instructions.
```

### 실제 캡처·편집 지시

```text
No generative model. Retain or recapture authentic interaction; editing only joins/transitions and faithful export, without invented screen elements.
```

### 연결과 의미 검수

Unique input for this slot. Use only editorial joins/transitions to connect reviewed clips; no internal graphic additions.

- subject — The chosen research subject or data product is recognizable before reading a title.
- action — The stated physical or analytical event must occur; not camera-only motion.
- result — End state visibly follows the event without fabricated claims.
- composition — Compose every essential subject, instrument connection, geographic domain and analytical panel completely inside a16:9 frame with modest safe margins. The business layout puts its description beside the full media; do not reserve a large empty area for baked-in headings or crop panels at image edges. No text needs to be embedded for the website heading.
- review — Original-resolution source review, first/middle/end and continuous frames around critical action, then full playback for video.

### 제외 조건

- Only pan/zoom, particle drift or tiny environmental motion without the planned subject action
- Internal graphics added in postproduction
- Generated imagery claimed as an actual place, company project, measurement, owned device or product screen
- Physically broken equipment, changing terrain or disconnected data representations
- Essential subjects/panels cut off by the16:9 frame
- Meaningless neon patterns, spacecraft/underwater scan beams or constellation HUD
- Invented measured values, accuracy, ownership or claimed actual product operation
- Same-input jellyfish paid retry after tracking failure
- Generated or repainted product UI
- Claims archival screen is live data
- Substitutes one product recording for another

## 실제 플랫폼 캡처 지시

Preserve these9actual-UI capture instructions. They are independent product evidence, never mandatory ingredients of a30-second AX concept film. generationAllowed=false; do not fabricate screens.

아래 제품 캡처 계획은 메인이나 AX 개념 영상의 필수 장면 수·길이가 아닙니다

### satellite / detect

상태 recapture-planned / generationAllowed false

- 접근 — https://geosr.ai/ 의 실제 서비스 링크로 이동
- 화면 조건 — 1920x1080 or 2560x1440 CSS pixels; 16:9; document OS scale and browser zoom
- 시작 — 기존 완도 예시의 실제 분석 결과가 로드된16:9화면 / 계정정보 숨김
- 실제 동작 — 관심 객체 또는 이미 완료된 분석의 레이어 표시를 전환 / 새 유료 분석 실행 금지
- 결과 — 원본 영상과 대응 탐지 윤곽이 같은 위치에 보임
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 보존 참조 — [dist/assets/platforms/satellite-poster.webp](../../dist/assets/platforms/satellite-poster.webp)
- 보존 참조 — [dist/assets/films/platform-satellite-preview.mp4](../../dist/assets/films/platform-satellite-preview.mp4)
- 검수 — 검출 수·정확도 조작 금지
- 검수 — 일부 메뉴만 잘라 확대 금지
- 출력 예정 — `dist/assets/films/platform-satellite-feature.mp4`
- 포스터 예정 — `dist/assets/platforms/satellite-feature-poster.webp`

### news / detect

상태 recapture-planned / generationAllowed false

- 접근 — https://geosr.ai/ 의 실제 서비스 링크로 이동
- 화면 조건 — 1920x1080 or 2560x1440 CSS pixels; 16:9; document OS scale and browser zoom
- 시작 — 실제 기사 목록과 지도가 함께 보이는 화면
- 실제 동작 — 기존 검색어 또는 분류를 선택하고 지역 표시나 기사 결과를 보여줌
- 결과 — 선택한 분류와 실제 기사 결과가 대응
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 보존 참조 — [dist/assets/platforms/news-poster.webp](../../dist/assets/platforms/news-poster.webp)
- 검수 — 기사 제목·날짜를 생성하지 않음
- 검수 — 외부 기사 전문을 무단 대량 복제하지 않음
- 출력 예정 — `dist/assets/films/platform-news-feature.mp4`
- 포스터 예정 — `dist/assets/platforms/news-feature-poster.webp`

### flood3d / predict

상태 recapture-planned / generationAllowed false

- 접근 — https://geosr.ai/ 의 실제 서비스 링크로 이동
- 화면 조건 — 1920x1080 or 2560x1440 CSS pixels; 16:9; document OS scale and browser zoom
- 시작 — 기존 로드된2022힌남노 시나리오 등 실제 저장 사례와 지도 범위 확인
- 실제 동작 — 시간 슬라이더 이동 또는 저장된 시나리오 재생 / 카메라 완만한 이동
- 결과 — 같은 지형의 침수 범위·수심 변화와 범례 표시
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 보존 참조 — [dist/assets/platforms/flood3d-poster.webp](../../dist/assets/platforms/flood3d-poster.webp)
- 보존 참조 — [dist/assets/films/platform-flood3d-preview.mp4](../../dist/assets/films/platform-flood3d-preview.mp4)
- 검수 — 과거 시나리오를 현재 재난으로 표시 금지
- 검수 — 지형 잘림·표면 누락 확인
- 출력 예정 — `dist/assets/films/platform-flood3d-feature.mp4`
- 포스터 예정 — `dist/assets/platforms/flood3d-feature-poster.webp`

### surge / predict

상태 recapture-planned / generationAllowed false

- 접근 — https://geosr.ai/ 의 실제 서비스 링크로 이동
- 화면 조건 — 1920x1080 or 2560x1440 CSS pixels; 16:9; document OS scale and browser zoom
- 시작 — 실제 태풍 경로와 관측소가 함께 보이는 저장 사례
- 실제 동작 — 관측소 선택 후 시계열 또는 예측 정보를 열기
- 결과 — 경로·선택 관측소·시계열의 관계가 읽힘
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 보존 참조 — [dist/assets/platforms/surge-poster.webp](../../dist/assets/platforms/surge-poster.webp)
- 검수 — 2024산산 같은 예시명은 실제 화면 확인 후 표기
- 검수 — flood3d영상을 이 서비스에 재사용 금지
- 출력 예정 — `dist/assets/films/platform-surge-feature.mp4`
- 포스터 예정 — `dist/assets/platforms/surge-feature-poster.webp`

### sealevel / predict

상태 recapture-planned / generationAllowed false

- 접근 — https://geosr.ai/ 의 실제 서비스 링크로 이동
- 화면 조건 — 1920x1080 or 2560x1440 CSS pixels; 16:9; document OS scale and browser zoom
- 시작 — 극치해면고 관련 실제 사례와 선택 관측소 표시
- 실제 동작 — 다른 관측소 또는 시점을 선택해 결과 비교
- 결과 — 관측소별 해면고와 최고 시점의 차이
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 보존 참조 — [dist/assets/platforms/sealevel-poster.webp](../../dist/assets/platforms/sealevel-poster.webp)
- 검수 — 2003매미 사례 여부 재확인
- 검수 — AI해일 플랫폼과 모델 방법을 혼동하지 않음
- 출력 예정 — `dist/assets/films/platform-sealevel-feature.mp4`
- 포스터 예정 — `dist/assets/platforms/sealevel-feature-poster.webp`

### buoy / monitor

상태 recapture-planned / generationAllowed false

- 접근 — https://geosr.ai/ 의 실제 서비스 링크로 이동
- 화면 조건 — 1920x1080 or 2560x1440 CSS pixels; 16:9; document OS scale and browser zoom
- 시작 — 부이 목록·위치·관측 요약이 함께 로드된 전체 화면
- 실제 동작 — 남해111 등 실제 지점 선택 후 수온·파랑 중 존재하는 시계열 열기
- 결과 — 선택 지점과 시간 변화가 같은 화면에 보임
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 보존 참조 — [dist/assets/platforms/buoy-poster.webp](../../dist/assets/platforms/buoy-poster.webp)
- 보존 참조 — [dist/assets/films/platform-buoy-preview.mp4](../../dist/assets/films/platform-buoy-preview.mp4)
- 검수 — 실제 데이터 시각 기록
- 검수 — 좌측 목록만 커지고 지도가 사라지는 확대 금지
- 출력 예정 — `dist/assets/films/platform-buoy-feature.mp4`
- 포스터 예정 — `dist/assets/platforms/buoy-feature-poster.webp`

### env / monitor

상태 recapture-planned / generationAllowed false

- 접근 — https://geosr.ai/ 의 실제 서비스 링크로 이동
- 화면 조건 — 1920x1080 or 2560x1440 CSS pixels; 16:9; document OS scale and browser zoom
- 시작 — 현재 확보한SST2026-09-18과SSS2026-09-19 기간 자료는 과거 캡처임 / 재녹화 날짜 재확인
- 실제 동작 — 수온 또는 염분 중 정상 로드된 한 변수를 선택하고 날짜·레이어 변화 보여주기
- 결과 — 지도 전체와 해당 변수 범례가 선명함
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 보존 참조 — [dist/assets/platforms/env-full-temperature.jpg](../../dist/assets/platforms/env-full-temperature.jpg)
- 보존 참조 — [dist/assets/platforms/env-full-salinity.jpg](../../dist/assets/platforms/env-full-salinity.jpg)
- 검수 — 결측 보존
- 검수 — chlorophyll 타일 누락·줄무늬 있으면 촬영 보류
- 검수 — 월·일·8일 합성 기간 혼동 금지
- 출력 예정 — `dist/assets/films/platform-env-feature.mp4`
- 포스터 예정 — `dist/assets/platforms/env-feature-poster.webp`

### rip / monitor

상태 recapture-planned / generationAllowed false

- 접근 — https://geosr.ai/ 의 실제 서비스 링크로 이동
- 화면 조건 — 1920x1080 or 2560x1440 CSS pixels; 16:9; document OS scale and browser zoom
- 시작 — 실제 해수욕장 위치와 공개 가능한CCTV 또는 위험 정보
- 실제 동작 — 저장·현재 화면에서 지점 선택 후 대응 영상과 위험 정보를 표시
- 결과 — 해변·영상·선택 지점의 관계 확인
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 보존 참조 — [dist/assets/platforms/rip-poster.webp](../../dist/assets/platforms/rip-poster.webp)
- 검수 — 사람 식별 가능한 영상은 공개 적합성 검토
- 검수 — 위험 수치를 생성하거나 과장하지 않음
- 출력 예정 — `dist/assets/films/platform-rip-feature.mp4`
- 포스터 예정 — `dist/assets/platforms/rip-feature-poster.webp`

### flood-xai / predict

상태 development-no-recording / generationAllowed false

- 접근 — https://geosr.ai/ 의 실제 서비스 링크로 이동
- 화면 조건 — 1920x1080 or 2560x1440 CSS pixels; 16:9; document OS scale and browser zoom
- 시작 — 개발 중 서비스로 표시 / 실제 완성 기능 화면 없음
- 실제 동작 — 현재는 녹화하지 않음 / 실제 기능이 제공될 때 동작 계약부터 검토
- 결과 — 개발 상태와 설명 자료만 공개
- 편집 — 실제 전체 화면1초 → 실제 동작1.5초 → 결과1초 → 전체 맥락0.5초 / 기본4초 / 결과 가독성에 따라3–5초
- 검수 — 생성 UI 금지
- 검수 — 다른 플랫폼 녹화로 대체 금지
- 출력 예정 — `dist/assets/films/platform-flood-xai-feature.mp4`
- 포스터 예정 — `dist/assets/platforms/flood-xai-feature-poster.webp`

## 영상 외 보존 자산

### business-ai-final-still

native-chatgpt-concept / generationAllowed false

Business AI introduction only; keep all5boxes/masks; do not reuse as main video.

- [ai-fish-native-20260929](../../media-source/editorial/ai-fish-native-20260929.png)

### equipment-lab-final-still

native-chatgpt-concept / generationAllowed false

Equipment introduction only; actual inventory photos remain original records.

- [environmental-lab-native-20260929](../../media-source/editorial/environmental-lab-native-20260929.png)

### geodap

actual-ui / generationAllowed false

Preserve full aspect and uncropped actual service screen; external service link.

- [geodap](../../dist/assets/geodap-home-full-20260928.webp)

### technical-records

actual-records / generationAllowed false

Original technical diagrams, equipment photos and records remain unchanged below introductions.

- [migration](../../docs/source-migration/migration-coverage.json)
- [source-archive](../../dist/source-archive.json)
- [company-brochure](../../docs/source-migration/assets/지오시스템_회사소개서_국문_2506.pdf)
- [equipment](../../docs/redesign-production/equipment-sources/manifest.json)

## 비용과 다음 단계

- 원장에 마지막 기록된 잔액 — 980.75크레딧 · 이번 문서 갱신에서 실시간 재확인 없음
- 이번 갱신의 신규 유료 접수 — 0건
- 메인 설정 견적 — 270크레딧 · 5x6s at last quoted54credits; not authorization; exact final-input preflight required.

Parent connected web UI uploads reviewed AX-estuary native original. Media agent obtains confirmed UUID, re-estimates exact input, then submits one6s1080p silent Seedance2.0 job and reviews full playback/continuous frames. CTD8/model9 remain original-missing.
