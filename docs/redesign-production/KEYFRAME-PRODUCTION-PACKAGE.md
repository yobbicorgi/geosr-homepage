> **역사 기록 — 현재 제작 지시 아님**
> 2026-09-22 [현재 인계 기준](../redesign-next/00-START-HERE.md)으로 대체됨
> 아래의 완료·자체 점수·generationReady·모바일 제외·회사/AX 혼합 지시는 현재 승인으로 사용하지 않음
> 원본 근거와 실패·검수 이력만 보존

---

# GeoSR film keyframe production package

## Production rule

The current deliverable is a reviewable sequence of still frames rather than a generated film. Every scene receives a start, middle and end state. Adjacent scenes share a transition frame where possible so geography, equipment, lighting and camera direction do not jump. Approved frames and the motion specification become the direct input package for later Higgsfield production.

Google Flow is optional. It may be used for a low-resolution motion test when credits are available, but no acceptance gate depends on it.

**연출·타임코드 우선순위:** [FILM-STORYBOARD-DIRECTOR-v2.md](FILM-STORYBOARD-DIRECTOR-v2.md)가 60초 회사 필름과 별도 30초 AX 필름의 최신 편집 구조와 시간표다. 아래 C01–C10/A01–A06 표는 source·continuity·검수 상태를 보존하는 기존 frame package이며, 숏 분할·타임코드·연출이 다르면 v2를 따른다. 기존 asset 이름의 초 표기는 그 reference의 과거 시점을 뜻할 뿐 v2 편집 시각이 아니다.

All frames are 16:9 desktop compositions. No mobile crop is produced in this phase. The Home opening frame reserves a quiet title-safe field while the film itself fills the entire first viewport.

## Corporate film

Target duration is about 60 seconds. It explains GeoSR as one connected engineering company from observation to analysis and prediction. It is not a nature film and is not an AX product demo.

| ID | Time | Start → middle → end | Required source and fact gate |
|---|---:|---|---|
| C01 | 00–06 | Earth emerges from darkness → atmosphere and East Asia-facing curvature become readable → orbital camera stabilises | NASA Earth base or another approved factual globe render; East Asia and the northwest Pacific must support the next zoom |
| C02 | 06–12 | One observation satellite enters → points toward Earth without a visible beam → observation footprint is implied by camera direction | Verified generic Earth-observation spacecraft geometry; no logo, false mission identity, laser or neon scan |
| C03 | 12–18 | Camera approaches East Asia → Korean Peninsula and adjacent seas resolve → orbital layer space opens above the map | Geography is a deterministic map/globe composite; AI must not redraw coastlines |
| C04 | 18–24 | One verified 2D field appears → a second and third scientific layer separate by depth → camera passes through the stack toward the coast | Use only approved SST, salinity, chlorophyll or model fields with source, date, extent, variable and units; otherwise use neutral unlabeled material planes marked concept during review |
| C05 | 24–31 | Korean coastal or harbour context appears → research vessel and USV perform distinct observation roles → wake and camera motion lead shoreward | The rejected generated composition study was discarded from the repository; its SHA-256 hash remains in the C05 prompt record. Preserve official vessel and USV photo pixels as cutouts; generate only the environment and composite in post. Confirm rights, source angle/resolution and device pairing. See [equipment accuracy gate](EQUIPMENT-ACCURACY-GATE.md). |
| C06 | 31–38 | Use a verified FireFly6 source cutout over a separately generated coastal background → move camera toward the surface for C07 | The rejected generated composition study was discarded from the repository; its SHA-256 hash remains in the C06 prompt record. Preserve official FireFly6 geometry; do not attach LiDAR without pairing evidence. See [equipment accuracy gate](EQUIPMENT-ACCURACY-GATE.md). |
| C07 | 38–44 | Offshore observation context emerges → camera follows a generic observation-process cue beneath the surface | The rejected generated composition study was discarded from the repository; its SHA-256 hash remains in the C07 prompt record. No official people-free buoy/mooring equipment photo was identified; a generic process illustration must be clearly labeled and make no GeoSR/model/site claims. See [equipment accuracy gate](EQUIPMENT-ACCURACY-GATE.md). |
| C08 | 44–51 | Camera crosses the water surface → show separately verified ROV and sensor product imagery in independent shots → lead toward the laboratory transition | The rejected generated composition study was discarded from the repository; its SHA-256 hash remains in the C08 prompt record. Official materials do not establish a shared ROV/mooring deployment or the rendered Heavy configuration. Keep ROV and sensor separate unless actual deployment evidence exists. See [equipment accuracy gate](EQUIPMENT-ACCURACY-GATE.md). |
| C09 | 51–54 | C08 sensor detail match-cuts to the approved people-free laboratory scene → hold on sample-analysis equipment around 52s → end on a clean instrument/sample detail that can cut to real platform evidence | Reuse `dist/assets/analysis-lab-v1.webp` as-is; no new image, hands, sample label, result, measurement, or generated spatial field |
| C10 | 54–60 | 54–55.5 Discover full frame → 55.5–57 Predict full frame → 57–58.5 Monitor full frame → 58.5–60 pull back on the approved Earth frame and match the C01 first frame exactly | Use only `ax-discover-fast.mp4`, `ax-predict-fast.mp4`, `ax-monitor-fast.mp4` as separate sequential full-frame cuts; no simultaneous UI, crop, generated UI, AI graphic, fake result, or product-workflow claim. Final Earth frame uses `hero-earth-00s-v4.png`; preserve geography and seamless-loop framing. |

### Corporate frame count

- Ten scenes
- Three review states per scene
- Shared boundary frames reduce the minimum unique set to 21 frames
- Each generated or composited frame receives a source record, prompt record, dimensions, hash, review status and rejection history
- C01 and C02 are the first production pair; they are not accepted until East Asia and the northwest Pacific are compositionally correct

## AX Platform concept film

Target duration is 30 seconds. This film is separate from the corporate film and shows the AX Platform flow Discover → Predict → Monitor. The detailed shot, still, source, ImageGen and Higgsfield handoff is in [AX Platform concept film A01–A06 preparation](imagegen-prompts/ax-concept-film-a01-a06-v1.md). Actual UI remains source footage composited in post; ImageGen supplies background and spatial atmosphere only.

| ID | Time | Start → middle → end | Required source and fact gate |
|---|---:|---|---|
| A01 | 00–05 | 실제 연안·항만·하구 공간을 소개 → 관측 입력을 별도 컷으로 제시 → AX 공간 개요로 정착 | `ax-overview`와 입력별 실제 포스터; 장소·위치 추정 및 허구 결과 금지 |
| A02 | 05–10 | 서로 다른 입력이 공간 기준으로 정돈되는 흐름 → 단일 지도 구도로 수렴 | 실제 source 화면만 후반 합성; CRS·시간 정합 확인 전 원본 지도를 겹치지 않음 |
| A03 | 10–15 | 위성 영상에서 시설물·현상 위치를 탐지 → 실제 Discover 캡처로 이어짐 | `satellite-poster`, `ax-discover-fast`; 캡처에 없는 마커·분류·정확도 금지 |
| A04 | 15–20 | 실제 3D 지형과 수면 조건 시뮬레이션 → Predict 화면에서 상태를 확인 | `flood3d-poster`, `ax-predict-fast`; 원본 밖 침수 범위·수위·피해 금지 |
| A05 | 20–25 | 부이·환경 관측 시계열과 지도를 함께 모니터링 → 실제 Monitor 캡처 유지 | `buoy-poster`, `env-poster`, `ax-monitor-fast`; 새 관측값·실시간 상태 생성 금지 |
| A06 | 25–30 | 세 기능의 실제 화면이 같은 AX 프레임에서 차례로 수렴 → 아래 실제 Discover 시퀀스로 match-cut | 세 원본을 동시에 합성하거나 새 UI를 만들지 않음; 원본 16:9 비율과 캡처 내용 보존 |

### AX frame count

- Six scenes of five seconds each, 30 seconds total
- Three review states per scene; shared boundaries reduce the minimum unique set to 13 frames
- A03–A06 use exact, approved Discover, Predict and Monitor screen captures as post-composited footage; they are not generated or redrawn
- The following website section retains manual tabs and actual 16:9 screen captures, usually about three seconds per feature

## Higgsfield handoff contents

Each accepted scene package contains:

1. Start, middle and end PNG frames
2. Reference asset list with rights and fact status
3. Positive prompt and exact negative constraints
4. Camera move, lens impression, subject motion and duration
5. Transition relationship to previous and next scenes
6. Elements that must remain fixed
7. Elements that may move or transform
8. Frame-level rejection checklist
9. Target output ratio, duration, frame rate and web encoding note
10. Final approval status from the main design review

## Rejection gates

- Incorrect Korean Peninsula, Japanese archipelago, Chinese coast or northwest Pacific geography
- Invented equipment, sensor layout or vessel configuration
- People, hands, faces or crew
- Decorative neon beam, excessive blue line, HUD or generic science-fiction interface
- Fake measurement, coordinate, legend, station, prediction, confidence, chart or live status
- Unexplained change of weather, coastline, object count, light direction or camera axis between adjacent frames
- AI texture, duplicated structure, melted hardware, unreadable instrument geometry or synthetic storm pattern
- Film frame that looks attractive but breaks the transition into the next verified scene

## C01 selected orbital reference: v4

- Use the v4 H01/H02 pair as the selected source-backed geography and camera-continuity reference. It is an internal reference only, not a final website poster or final cinematic artwork; it is not wired into any page.
- The deterministic NASA BMNG Earth pixels, camera axis, 130°E / 30°N view center, scale and crop stay fixed through the next East Asia and Korean Peninsula move. Preserve coastlines exactly; do not ask a generative model to redraw or reinterpret them.
- H02's satellite is a generated concept overlay, not verified hardware or a specific mission design. Keep it labeled as conceptual until equipment review approves a source-backed spacecraft reference.
- Higgsfield may add or regenerate cinematic atmosphere, clouds, and lighting as separate treatments only when the Earth coastline pixels remain fixed. Inspect the Korean Peninsula, Japanese archipelago, China coast and northwest Pacific after every motion or compositing pass.
- Do not use v2, v3, v5 or v6 as continuity sources: v2 geography was rejected, v3 framing was rejected, and v5/v6 cloud composites were rejected for dirty-looking artifacts.

## C02/C03 approach keyframes v1

The 10s, 12s, 15s and 18s deterministic NASA-texture approach frames are accepted by main review as geography and camera-path references only. The 12s frame is shared by C02 and C03. The satellite motion remains a conceptual guide and requires a more natural Higgsfield pass; it is absent from the 15s and 18s frames. See [the keyframe record and contact sheet](keyframes/corporate-film-approach-v1.md).

## ImageGen keyframe package v2 — conditional selections

See the [v2 generation log](keyframes-v2/KEYFRAME-GENERATION-LOG-v2.md) for source, prompts, review decisions and hashes. `keyframes-v2/generated/` contains exactly four conditionally selected frames: two generic C02 satellite cutouts and the AX A01 v3 start/end pair. C02 cutouts are separate post-production overlays only; preserve the deterministic NASA Earth pixels and do not claim a specific satellite or mission. Generated C03 geography is rejected; C03 must use only the deterministic NASA 12s/15s/18s frames.

AX A01 v3 is currently connected as a temporary web poster only. It is an abstract transition/poster candidate, not the final film frame or final film approval, and it must not be presented as actual data or UI.

## C04 official data-layer references

Main review approved the 20s SST reference and accepted the 24s deterministic coastline frame unchanged. The final-facing C04 direction is the approved 22s-a/b/c single-layer sequence: SST, Aquarius salinity, then MODIS L2 chlorophyll, connected by crossfades and camera approach motion in the film edit. Do not show the three plates simultaneously. The frames are internal factual data-plate references only; they are not finished film artwork or wired to the site. See [the approved sequence, source metadata, limitations, hashes, and contact sheet](keyframes/corporate-film-data-layers-crossfade-v1.md).

The monthly SST and salinity composites and daily chlorophyll swath are not simultaneous observations. Keep chlorophyll's actual no-data gaps unfilled. Salinity's bilinear colorized display is a derived visual treatment only; it does not interpolate measurements or establish higher spatial resolution. V1–v4 simultaneous-stack compositions are rejected as final-facing visuals. V5's source and no-data handling remain documented in the crossfade record; its rejected image, contact sheet, render manifest, and renderer have been removed from active assets. Preserve the NASA geography, source footprint and no-data mask in any motion treatment.
