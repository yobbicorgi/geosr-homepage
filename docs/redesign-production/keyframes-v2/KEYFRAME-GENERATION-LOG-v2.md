# Keyframe generation log v2

**Status:** Main review conditionally selected the two C02 satellite cutouts v2 and the two AX A01 v3 frames. C02 cutouts are generic concept assets for separate post-production compositing over the unchanged deterministic NASA Earth; they do not represent a specific satellite. AX A01 v3 is limited to an abstract A01 transition/poster and must not imply actual data or UI. All generated C03 geography is rejected; use only deterministic NASA frames. Rejected binaries were deleted; this log retains their filenames, versions, rejection reasons, and prompt summaries. Nothing is connected to the site or film manifest.

**Method:** OpenAI built-in ImageGen only. No image-generation CLI, API, upscaling, or post-generation repaint was used. The four current candidates are native ImageGen outputs, copied without pixel changes. Each is 1672 × 941 px (16:9 within rounding); this is the highest resolution returned for these requests, below the requested 4K target. Keep the left 38% quiet for headline placement. Rejected v1 and v2 binaries are deleted; their decision records remain below.

**Shared negative constraints:** No people, faces, hands, text, logos, labels, numbers, maps, charts, grids, UI, HUD, fabricated measurements, laser/observation beams, neon blue lines, sci-fi glow, excessive gloss, crowded particles, or artificial storms. For Earth scenes, do not invent or alter coastlines, islands, clouds, or surface features. Earth outputs remain concept images even when they appear plausible.

## Source references

- C02 Earth base: selected deterministic NASA Blue Marble Next Generation August reference, [H01 v4](../../../dist/assets/concepts/corporate-film/hero-earth-00s-v4.png). NASA texture provenance and renderer are recorded in [the selected opening reference record](../imagegen-prompts/corporate-film-opening-v4.md) and [media fact-check](../MEDIA-FACTCHECK-SOURCES.md). The source texture is the [NASA August BMNG raster](https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/august/world.200408.3x5400x2700.jpg); it is historical and not a live Earth view.
- C02 satellite appearance reference: [H02 v4](../../../dist/assets/concepts/corporate-film/hero-earth-satellite-07s-v4.png). This satellite is explicitly conceptual and is not verified hardware or a particular mission.
- C03 Earth/camera references: approved deterministic [12-second shared C02/C03 frame](../../../dist/assets/concepts/corporate-film/hero-earth-12s-v1.png), [15-second approach](../../../dist/assets/concepts/corporate-film/hero-earth-15s-v1.png), and [18-second Korea/NW Pacific view](../../../dist/assets/concepts/corporate-film/hero-earth-18s-v1.png). Their coastline source and camera path are documented in [the approach keyframe record](../keyframes/corporate-film-approach-v1.md).
- AX A01: no geographic or measurement reference. These are abstract material studies only; they do not depict data or platform behavior.

## C02 rejected — full-frame Earth v1

| Filename | Version | Rejection reason | Prompt summary |
|---|---|---|---|
| `corp-c02-satellite-start-v1.png` | v1 | ImageGen redrew the source Earth and coastlines; not a factual background. | Orbital Earth emerges from dark space, no spacecraft. |
| `corp-c02-satellite-end-v1.png` | v1 | Same generated-Earth geography failure; superseded by transparent satellite cutouts. | Continue the orbital frame and add one generic satellite. |

The binary files were deleted after review. Keep the deterministic NASA globe as the only Earth background.

## C02 — transparent satellite cutouts v2

| Role | Candidate file | Native size | SHA-256 | Alpha bounds (x0,y0,x1,y1) | Default generated file |
|---|---|---:|---|---|---|
| Smaller three-quarter cutout | [corp-c02-satellite-cutout-small-v2.png](generated/corp-c02-satellite-cutout-small-v2.png) | 1672 × 941 | `bb6a1186303b579ae98affb0b788f90aadd3ad6d6bed8a08dee436ca98a6edfe` | `(336,21,1475,884)` | `C:\Users\user\.codex\generated_images\01a0b20b-422b-7b83-bbc6-0eb19e5600e7\exec-3ca41edf-3c9f-4a5e-bb85-d2614a40443b.png` |
| Slightly closer cutout | [corp-c02-satellite-cutout-close-v2.png](generated/corp-c02-satellite-cutout-close-v2.png) | 1672 × 941 | `4727fb80643d56427a4406b9e730b672e5f3bfdeb5f54270fe042ae3bff57a91` | `(71,21,1461,917)` | `C:\Users\user\.codex\generated_images\01a0b20b-422b-7b83-bbc6-0eb19e5600e7\exec-0f72b3f5-84aa-4c07-9b02-dd0f77b48879.png` |

**Small-cutout prompt:** Create a single isolated photorealistic-concept Earth-observation satellite for later compositing over an existing NASA Earth image. Use a genuinely transparent PNG background, no checkerboard or shadow. Show a compact plausible modern satellite in a three-quarter view, one rectangular bus, one single deployable dark-blue solar-array wing with coherent cells and hinge, a modest sensor aperture and antenna, credible joints and thermal blankets. Point its sensor toward lower-left; array extends upper-right. Matte metallic silver/graphite with restrained pale-gold details and soft studio lighting. Generic, unverified hardware, not a specific mission or spacecraft copy. No text, logo, label, people, Earth, environment, beam, laser, HUD, grid, neon, extra craft, detached panels, impossible appendages, or cropped array.

**Closer-cutout prompt:** Edit the small-cutout source into the same satellite from a slightly closer view. Preserve the identical silhouette, one bus, one solar-array wing, hinge, sensor, joints, material, orientation and light. Enlarge modestly, keep the entire craft on true transparency and retain clear margins. Do not add, remove, duplicate, or redesign components. No markings, text, mission name, people, background, beam, HUD or neon.

**Targeted framing correction:** The dependent closer draft touched the bottom edge. A single ImageGen edit preserved structure and orientation, reduced/recentered the craft, and produced the retained smaller cutout with transparent corners. The initial three-quarter prompt had rendered a slightly larger craft and is retained as the closer variant. Both files have actual alpha (all four canvas corners alpha 0); the closer candidate has a 24 px lower margin, while the smaller candidate has a 57 px lower margin. Maintain their framing and do not crop during later compositing.

The first prompt result became the closer variant because its actual object bounding box was larger than requested. The follow-up closer prompt overscaled the craft and touched the frame edge; its single targeted correction became the smaller variant. Filenames describe the reviewed relative framing, not the first prompt labels.

**Review:** Both candidates show one coherent generic spacecraft with one deployable panel in a three-quarter view. Their scale difference supports a modest approach transition. Alpha is present with transparent corners; no people, text, logos, beams, or HUD were seen. The design remains unverified concept art. Composite only over the unchanged deterministic NASA globe, never over an ImageGen Earth.

**Main review — CONDITIONALLY SELECTED:** Generic concept assets only. Use as separate post-production overlays on the deterministic NASA Earth; keep the Earth pixels unchanged. Do not identify the design as a specific satellite, mission, or verified hardware. This selection does not authorize website wiring.

## C03 generated approach v1 — REJECTED

| Filename | Version | Rejection reason | Prompt summary |
|---|---|---|---|
| `corp-c03-korea-approach-start-v1.png` | v1 | Korean Peninsula and surrounding coastlines were visibly transformed. | Broad East Asia approach based on deterministic 15 s and 18 s references. |
| `corp-c03-korea-approach-end-v1.png` | v1 | Korean Peninsula and surrounding coastlines were visibly transformed. | Move closer to Korea/NW Pacific from the generated start frame. |

The binary files were deleted after review. Do not generate another C03 Earth. Use only the approved deterministic NASA [12 s shared frame](../../../dist/assets/concepts/corporate-film/hero-earth-12s-v1.png), [15 s frame](../../../dist/assets/concepts/corporate-film/hero-earth-15s-v1.png), and [18 s frame](../../../dist/assets/concepts/corporate-film/hero-earth-18s-v1.png).

## AX A01 v1 — REJECTED

| Filename | Version | Rejection reason | Prompt summary |
|---|---|---|---|
| `ax-a01-flow-start-v1.png` | v1 | Generic glass-panel appearance did not fit the requested abstract material flow. | Navy void with separated translucent layers beginning to align. |
| `ax-a01-flow-end-v1.png` | v1 | Generic glass-panel appearance; no useful distinction from start. | Same layers settle into a restrained abstract flow. |

The binary files were deleted after review.

## AX A01 v2 — REJECTED

| Filename | Version | Rejection reason | Prompt summary |
|---|---|---|---|
| `ax-a01-flow-start-v2.png` | v2 | Floating forms read as rocks, disaster debris, and dust. | Separate water reflection, mist, matte particles, and warm fragments. |
| `ax-a01-flow-end-v2.png` | v2 | Same rock/debris reading; failed the requested abstract input-flow look. | Arrange those materials into three depth-directional flows. |

The binary files were deleted after review.

## AX A01 — material flow v3

| Role | Candidate file | Native size | SHA-256 | Default generated file |
|---|---|---:|---|---|
| Start: separated droplets, mist, and points | [ax-a01-flow-start-v3.png](generated/ax-a01-flow-start-v3.png) | 1672 × 941 | `4fe8d975fea7c3a061176a12d102c18652aca558b81f532d8f57eeeee62a969a` | `C:\Users\user\.codex\generated_images\01a0b20b-422b-7b83-bbc6-0eb19e5600e7\exec-7451f8f0-ed5c-4c56-a511-b26350608d46.png` |
| End: three shallow parallel flows | [ax-a01-flow-end-v3.png](generated/ax-a01-flow-end-v3.png) | 1672 × 941 | `cd5265276d6f74418853f87243e0b0d45d67648488041f393f96619e94b4bc22` | `C:\Users\user\.codex\generated_images\01a0b20b-422b-7b83-bbc6-0eb19e5600e7\exec-ba6813ff-eeb0-411b-9a24-20d7d23fc258.png` |

**Start prompt:** Create a refined macro-photography concept frame in a dark navy/charcoal studio. Show only three delicate material elements on the right 60%: a small cluster of clear microscopic water droplets, one thin translucent mist ribbon, and a sparse orderly flow of tiny matte soft-white dots. Keep the three visibly separate and gently oriented as if beginning to approach. Leave the left 38% near-black for title. Use restrained studio light, navy/soft white, and at most a faint muted-cyan reflection. No rocks, metal fragments, glass sheets, cards, panels, soil, dust clouds, debris, storms, disasters, space, stars, planets, maps, coastlines, UI, grids, numbers, text, logos, neon, beams, HUD, people, hands, dramatic effects, or extra particle fields.

**End prompt:** Edit the start frame with the same camera, studio, lighting, materials, and left title-safe space. Keep exactly the same droplets, mist ribbon, and small matte dots; add or remove nothing. Organize these same three materials on the right into three very shallow, separated, nearly parallel flows receding in depth: droplets in one, mist in one, soft-white dots in one. Keep their material identities visible and do not merge them. No stones, metal, glass, panels, dust, debris, map, UI, grid, text, people, beams, HUD, neon, or extra glow.

**Review — CONDITIONALLY SELECTED:** Main review selected v3 for the A01 abstract transition/poster only. It contains no actual data or UI and must not be described as a platform output or measurement result. No rocks, glass panels, map, grid, numbers, people, text, beams, HUD, or neon were seen. Website wiring remains a separate decision.

## Shared acceptance limits and next handoff

- `generated/` contains exactly four conditionally selected images: two C02 satellite cutouts v2 and two AX A01 v3 frames. Rejected binaries were deleted; only their file/version/reason/prompt summaries remain in this log.
- C02 cutouts are generic concept assets for separate post-production compositing over deterministic NASA Earth. They are not a claim about a specific satellite or verified hardware; preserve the Earth pixels.
- C03 must use the accepted deterministic NASA 12/15/18-second frames. Do not generate or use an AI-rendered Earth surface for the Korean, Japanese, east-China, or northwest-Pacific geography.
- AX A01 v3 is an abstract transition/poster only. It contains no actual data or UI and must not be presented as a measured output or product workflow.
- For the later Higgsfield handoff, treat these as start/end timing and composition references only. Preserve the facts and source pixels from approved deterministic frames; any motion between them must not invent intermediate geography or environmental values.
