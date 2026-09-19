# GeoSR film keyframe production package

## Production rule

The current deliverable is a reviewable sequence of still frames rather than a generated film. Every scene receives a start, middle and end state. Adjacent scenes share a transition frame where possible so geography, equipment, lighting and camera direction do not jump. Approved frames and the motion specification become the direct input package for later Higgsfield production.

Google Flow is optional. It may be used for a low-resolution motion test when credits are available, but no acceptance gate depends on it.

All frames are 16:9 desktop compositions. No mobile crop is produced in this phase. The Home opening frame reserves a quiet title-safe field while the film itself fills the entire first viewport.

## Corporate film

Target duration is about 60 seconds. It explains GeoSR as one connected engineering company from observation to analysis and prediction. It is not a nature film and is not an AX product demo.

| ID | Time | Start → middle → end | Required source and fact gate |
|---|---:|---|---|
| C01 | 00–06 | Earth emerges from darkness → atmosphere and East Asia-facing curvature become readable → orbital camera stabilises | NASA Earth base or another approved factual globe render; East Asia and the northwest Pacific must support the next zoom |
| C02 | 06–12 | One observation satellite enters → points toward Earth without a visible beam → observation footprint is implied by camera direction | Verified generic Earth-observation spacecraft geometry; no logo, false mission identity, laser or neon scan |
| C03 | 12–18 | Camera approaches East Asia → Korean Peninsula and adjacent seas resolve → orbital layer space opens above the map | Geography is a deterministic map/globe composite; AI must not redraw coastlines |
| C04 | 18–24 | One verified 2D field appears → a second and third scientific layer separate by depth → camera passes through the stack toward the coast | Use only approved SST, salinity, chlorophyll or model fields with source, date, extent, variable and units; otherwise use neutral unlabeled material planes marked concept during review |
| C05 | 24–31 | Korean coastal or harbour context appears → research vessel and USV perform distinct observation roles → wake and camera motion lead shoreward | Vessel and USV shapes and sensors come from approved GeoSR source photographs; no invented payload and no people |
| C06 | 31–38 | Shoreline or harbour survey corridor appears → drone path and LiDAR coverage are revealed with restrained geometry → verified terrain or point-cloud material replaces the view | Drone type and survey method must match a documented case; no decorative grid, fake coordinates or impossible scan cone |
| C07 | 38–44 | Offshore observation point emerges → buoy and mooring context become readable → camera follows the instrument line beneath the surface | Approved buoy and sensor references; no fabricated station ID, live value, chart or status |
| C08 | 44–51 | Camera crosses the water surface → ROV and water-column sensor appear → the seabed observation direction leads toward the laboratory transition | Approved GeoSR ROV and underwater sensor source; confirm formal equipment name and configuration before generation |
| C09 | 51–56 | Sample or sensor detail match-cuts to a sealed laboratory setup → analysis equipment becomes the subject → physical sample detail becomes a clean spatial field | Approved equipment and sample procedure; no people, hands, false sample label, result or measurement |
| C10 | 56–60 | Spatial field resolves into modelling and AI interpretation → observation, model and analysis layers align → the blue atmospheric edge returns to the C01 lighting direction | Use verified output or an explicitly abstract transition; no fake dashboard, metric or claim; final frame must loop to C01 |

### Corporate frame count

- Ten scenes
- Three review states per scene
- Shared boundary frames reduce the minimum unique set to 21 frames
- Each generated or composited frame receives a source record, prompt record, dimensions, hash, review status and rejection history
- C01 and C02 are the first production pair; they are not accepted until East Asia and the northwest Pacific are compositionally correct

## AX Platform concept film

Target duration is about 30 seconds. It shows how observations become a usable decision context. It stays separate from the corporate film and does not pretend that independent applications are one deployed end-to-end product.

| ID | Time | Start → middle → end | Required source and fact gate |
|---|---:|---|---|
| A01 | 00–05 | A source-backed Korean coast or harbour context appears → distinct observation inputs become visible → view moves into a neutral analysis space | Approved spatial source; no fake incident, alert or result |
| A02 | 05–11 | Satellite, survey and sensor inputs remain distinct → relevant spatial objects are organised → the composition opens for Discover | Real source categories only; no invented product UI |
| A03 | 11–16 | Discover question appears through object focus → candidate area becomes readable → transition points to Detect | No generated readable UI text inside the film; web copy supplies the label |
| A04 | 16–21 | Detect context isolates a feature → evidence and uncertainty remain visually separate → camera carries the selected area into Predict | No fabricated bounding box, confidence score or classification claim |
| A05 | 21–26 | Predict context introduces time and scenario depth → change is shown without false values → viewpoint settles into Monitor | Use approved model outputs or clearly abstract material states only |
| A06 | 26–30 | Monitor context connects observation points and change → concept layers fold into one clean frame → actual AX capture below becomes the next visual object | End on a shape and camera angle that match the first approved real platform clip |

### AX frame count

- Six scenes
- Three review states per scene
- Shared boundary frames reduce the minimum unique set to 13 frames
- The concept film ends before actual UI demonstration
- The following website section uses real 16:9 screen recordings of each platform feature, usually about three seconds per selected interaction

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
