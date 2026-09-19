# Film generation readiness v1

**Status:** This is an internal generation/edit readiness audit, not a final-film approval or public-use license. The current timeline and direction follow [FILM-STORYBOARD-DIRECTOR-v2.md](FILM-STORYBOARD-DIRECTOR-v2.md). The older scene timings in the package are retained only as provenance.

The [machine-readable companion](FILM-GENERATION-READINESS-v1.json) records each of the 12 corporate scenes and 6 AX scenes with exact time ranges, selected start/mid/end paths, source and rights state, ImageGen decision, a shot-specific Higgsfield prompt, negative constraints, transitions, crop safety, equipment/UI gates and a readiness enum. It embeds the JSON Schema for the shot record.

## Readiness result

| Film | Can enter internal generation/edit now | Requires new or clarified source | Readiness |
|---|---|---|---|
| Corporate, 60 seconds | 00.0–24.0: deterministic NASA Earth and official GIBS references; 51.0–60.0: manifest-approved Discover/Predict/Monitor clips plus the Earth loop reference. The 00–24 block still needs deterministic time remapping, compositing and motion review. | 24.0–51.0 (27 seconds): rights-cleared field, vessel/USV, UAV, buoy/mooring, ROV/sensor and actual laboratory material; verify configuration, location and pairing claims. | 33 seconds can enter assembly; 27 seconds remain source-pending. None is cleared for external release. |
| AX, 30 seconds | 00.0–30.0: conditional abstract A01, authored blank A02 stage, approved source clips A03–A05, and the actual Overview poster fallback for A06. | An operator-approved AX entry recording is an optional replacement for the A06 poster hold. Public rights and privacy approval remain open. | All 30 seconds can enter assembly using the storyboard-approved poster fallback; actual UI stays source footage. |

“Ready” means the selected source can enter internal editing or source-preserving motion work. It does not mean finished artwork, a product claim, or publication authorization. The film manifest still marks the 60-second and 30-second deliverables pending.

## Scene register

| ID / exact time | Purpose | Status | Source and hard gate |
|---|---|---|---|
| C01 · 00.0–05.0 | Reveal source-backed Earth and establish the East Asia axis/loop. | READY_WITH_COMPOSITE | [H01 v4](../../dist/assets/concepts/corporate-film/hero-earth-00s-v4.png) is a NASA-derived geography reference, not final art. Left 40% stays quiet. |
| C02 · 05.0–09.0 | Introduce one generic observation satellite. | READY_WITH_COMPOSITE | [Two conditional transparent cutouts](keyframes-v2/KEYFRAME-GENERATION-LOG-v2.md) are separate overlays over unchanged NASA Earth; no model or mission claim. |
| C03 · 09.0–14.0 | Deterministic Korea/NW Pacific approach; satellite exits by 12s. | READY_WITH_COMPOSITE | [Deterministic 12/15/18s anchors](keyframes/corporate-film-approach-v1.md) only. Render exact 09/11.5/14 edit anchors; generated C03 geography is rejected. |
| C04 · 14.0–24.0 | Official SST → salinity → chlorophyll crossfades, then coastal entry. | READY_WITH_COMPOSITE | [Approved data references](keyframes/corporate-film-data-layers-crossfade-v1.md). One plate at a time; preserve 2012-08-01 source pixels and chlorophyll gaps; the products are not simultaneous observations. |
| C05 · 24.0–30.0 | Real coastal vessel/USV observation. | SOURCE_PENDING | Official references exist, but rights, real footage, exact USV model and vessel/USV pairing are unverified. Use separate shots absent evidence. |
| C06 · 30.0–35.0 | Varied field-observation details. | SOURCE_PENDING | Obtain real, rights-cleared sample/instrument/field sources. Do not infer site, measurements or device pairing. |
| C07 · 35.0–40.0 | Harbor/beach/estuary aerial survey. | SOURCE_PENDING | FireFly6 reference alone does not prove an actual flight or UAV/LiDAR pairing. Need source footage and sensor evidence. |
| C08 · 40.0–44.0 | Real buoy/mooring from surface toward sensors. | SOURCE_PENDING | No verified people-free GeoSR buoy/mooring source was found. Model, setup and deployment remain unknown. |
| C09 · 44.0–48.0 | Separate underwater sensor and ROV shots. | SOURCE_PENDING | BlueROV2/RBR thumbnails exist, but rights, exact RBR variant, ROV configuration and shared-deployment evidence are open. |
| C10 · 48.0–51.0 | People-free lab bridge to platform evidence. | SOURCE_PENDING | [analysis-lab-v1.webp](../../dist/assets/analysis-lab-v1.webp) is generated concept art for lighting/layout, not evidence of a GeoSR lab. Replace with actual source or explicitly approve concept-only use. |
| C11 · 51.0–55.5 | Actual Discover, Predict and Monitor evidence cuts. | READY | Use only the [Discover](../../dist/assets/films/ax-discover-fast.mp4), [Predict](../../dist/assets/films/ax-predict-fast.mp4) and [Monitor](../../dist/assets/films/ax-monitor-fast.mp4) captures, 1.5 seconds each, sequential and full-frame. External release checks remain. |
| C12 · 55.5–60.0 | Return to C01’s exact Earth frame and close the loop. | READY_WITH_COMPOSITE | Reuse H01 v4 as the exact match frame. Geography, crop and grade must match; no generated Earth or UI residue. |
| A01 · 00.0–05.0 | Abstract material-flow opener, not actual data/UI. | READY_WITH_COMPOSITE | [A01 v3 conditional pair](keyframes-v2/KEYFRAME-GENERATION-LOG-v2.md) only. Current web use is a temporary poster, not final film approval. |
| A02 · 05.0–10.0 | Resolve to three empty editorial 16:9 boundaries. | READY_WITH_COMPOSITE | Author the blank stage in post; no content, generated dashboard or interface in the windows. |
| A03 · 10.0–15.0 | Actual Discover capture. | READY | Actual satellite poster and approved Discover clip; preserve the captured UI and source speed. |
| A04 · 15.0–20.0 | Actual Predict capture. | READY | Actual Flood3D poster and approved Predict clip; do not alter terrain or scenario. |
| A05 · 20.0–25.0 | Actual Monitor capture. | READY | Actual Monitor clip and approved posters; add no hardware, values or live status. |
| A06 · 25.0–30.0 | Actual AX entry state. | READY_WITH_COMPOSITE | Use an operator-approved entry recording if available; otherwise hold the actual [Overview poster](../../dist/assets/platforms/ax-overview-poster.webp) full-frame. No simulated clicks. |

The JSON contains the complete per-scene motion drafts and source paths. C03’s 12-second frame is a shared geography/camera anchor, not its literal edit start. C04 source filenames also retain historical reference timestamps; the film’s actual C04 range is 14–24 seconds.

## Source and image decisions

- **C01/C03/C04/C12 geography:** Deterministic rendering from the official NASA Blue Marble Next Generation August texture. Preserve source geography. Generated C03 Earth is rejected.
- **C02 satellite:** Two conditionally selected generic transparent cutouts. Composite only over locked NASA Earth pixels; do not identify them as a real mission or verified hardware.
- **C04 layers:** Official NASA GIBS captures requested for 2012-08-01 in a shared BBOX. SST and salinity are monthly; chlorophyll-a is a daily L2 swath. Its coverage gaps remain unfilled. The salinity display is a documented derived visualization, not higher-resolution measurement.
- **C05–C09 equipment:** Official images are references, not cleared film assets. Written permission, exact configuration and pairing evidence remain required. No people or hands.
- **C10 laboratory:** The available lab image is generated concept art for light/composition only.
- **C11/A03–A05 UI:** Use only the exact approved source captures. Do not generate or alter UI; preserve full 16:9 framing and capture-time context.
- **A01/A02:** A01 v3 is abstract-only; A02 is a blank post-authored transition. Neither may imply actual data or UI.

## Next production order

1. Confirm rights, attribution, release and privacy status for NASA/GIBS, screen captures, equipment imagery and concept assets.
2. Render and review exact C03 edit anchors (09.0, 11.5, 14.0) from the deterministic NASA path.
3. Composite a generic C02 satellite cutout over locked NASA Earth and review silhouette, scale and exit.
4. Assemble C04’s official single-layer SST → salinity → chlorophyll sequence, preserving source pixels, periods, units and gaps.
5. Obtain real, rights-cleared C05–C10 field/equipment/lab sources; verify configuration, location and pairing claims.
6. Build A02 as an empty authored stage and animate A01 v3 only as an abstract concept.
7. Edit approved AX and corporate UI clips sequentially at exact timecodes; keep interfaces full-frame and unaltered.
8. Review exact 60s/30s duration, C01/C12 loop, facts, crop safety and release authorization before publication.

## Validation contract

The companion JSON embeds its record schema. Validation checks all required fields and enum values, unique scene IDs, contiguous non-overlapping timelines (C01–C12: 00–60; A01–A06: 00–30), and existing paths for every selected/reference asset. It also checks that C03 excludes generated geography, C02 overlays only generic cutouts, A01 remains conditional/abstract, and actual UI rows use only source captures.

