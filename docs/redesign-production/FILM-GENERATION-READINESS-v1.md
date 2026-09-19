# Film generation readiness v1

**Current story authority:** [FILM-STORYBOARD-DIRECTOR-v3.md](FILM-STORYBOARD-DIRECTOR-v3.md) is the single default production path for the 60-second company film and separate 30-second AX film. The v2 storyboard and fallback A/B files remain historical source and alternate-plan records; choosing A or B is not a blocker for v3.

**Role of this v1 record:** The companion [JSON](FILM-GENERATION-READINESS-v1.json) preserves an older 12-corporate/6-AX scene register and schema for provenance and asset checks. Its old scene count and timecodes are not the current edit map. Use v3 for story, shot order, and timing. Both finished films remain pending in the [film manifest](../../dist/film-manifest.json).

## Current readiness

| Film | Ready references and structure | Actual remaining work | Readiness |
|---|---|---|---|
| Company, 60 seconds | v3 defines all 10 shots. C01-C04 use deterministic Earth and verified sequential 2D observation references; C05/C06 have source-backed local equipment-image candidates; C07 has a concept lab reference; C08 is an authored typographic bridge; C09 uses actual Discover/Predict/Monitor captures; C10 returns to the Earth loop frame. | C05/C06 image reuse rights and pixel-preserving insert review, or a non-claiming background-only concept plate QA if those inserts are not cleared. C07 needs concept-plate QA or rights-cleared real source. Final image/video generation, editing, release review, and production deployment remain. | Story and sources are defined; final film not made. |
| AX, 30 seconds | v3 defines A01-A05 as inputs → Detect → Predict → Monitor → actual Overview. Actual 16:9 UI captures are available for Discover/Predict/Monitor and stay source-preserved. | Complete the concept film generation/edit, confirm A01 concept treatment and public rights/privacy, review final export, and deploy production media. | Story and UI evidence are defined; final film not made. |

“Ready” means a source can enter internal review or assembly; it does not establish public reuse rights, a factual claim about an installation, or publication approval.

## Current v3 scene register

| ID / time | Purpose and selected source | Gate |
|---|---|---|
| C01 · 00:00–00:05 | Earth reveal and East Asia axis; reuse [hero-earth-00s-v4.png](../../dist/assets/concepts/corporate-film/hero-earth-00s-v4.png). | Preserve source geography and exact loop reference. |
| C02 · 00:05–00:09 | Generic observation satellite over the locked Earth reference. | Concept cutout only; no real mission or satellite-model claim. |
| C03 · 00:09–00:14 | Deterministic approach to Korea/NW Pacific. | Use source-backed geography only; generated coastlines are prohibited. |
| C04 · 00:14–00:24 | Sequential SST → salinity → chlorophyll 2D plates, then coast entry. | Keep one layer at a time and preserve source dates, periods, units, coverage gaps, and colors. |
| C05 · 00:24–00:30 | Non-identifiable coastal/harbor context plus one brief, small source-backed process cue. Default candidate: [equipment-vessel.jpg](../../dist/assets/equipment-vessel.jpg), exact-byte match to official GeoSR vessel image; the official page states survey vessel, 19 tons. One official USV original may be used instead, never both in this shot. | Rights are pending. Vessel manufacturer/model and USV image-specific model/payload are unverified. Preserve original pixels/aspect; do not claim site, date, operation, or vessel/USV pairing. |
| C06 · 00:30–00:34 | Water-surface to underwater transition with one brief, small [BlueROV2 source-image](../../dist/assets/equipment-rov.png) insert/cutout candidate. | Rights and composition/use review are pending. Keep original equipment pixels and proportions; no generated ROV, RBR sensor, tether, mooring, or deployment relationship. |
| C07 · 00:34–00:40 | Laboratory analysis concept using [analysis-lab-v1.webp](../../dist/assets/analysis-lab-v1.webp) as a lighting/composition reference. | QA the non-claiming concept plate or use a rights-cleared real source. Do not claim it is a GeoSR facility or show invented labels/results. |
| C08 · 00:40–00:46 | Authored typography bridge from analysis toward prediction and decision support. | No generated data, UI, charts, or performance claim. |
| C09 · 00:46–00:55.5 | Actual Discover → Predict → Monitor clips, roughly 3 seconds each, sequential and full-frame. | Preserve the actual 16:9 UI pixels, capture state, and source speed; complete public privacy/rights review. |
| C10 · 00:55.5–01:00 | Return to the exact C01 Earth frame. | Match source, crop, and grade to close the loop. |
| A01 · 00:00–00:07 | Abstract input-material concept, not real data or UI. | Conditional concept reference; no map, readable text, data, or interface. |
| A02 · 00:07–00:14 | Detect concept flows into the actual Discover capture for about 3 seconds. | Keep capture native, full 16:9, and unaltered. |
| A03 · 00:14–00:21 | Predict concept flows into actual Predict capture for about 3 seconds. | Preserve scenario and all displayed values as captured. |
| A04 · 00:21–00:28 | Monitor concept flows into actual Monitor capture for about 3 seconds. | Do not imply live status or add values. |
| A05 · 00:28–00:30 | Actual Overview poster/frame hands off to the platform section. | No simulated clicks or generated interface. |

## Source and image decisions

- **C01/C03/C10 geography:** Use deterministic NASA-derived geography references and preserve source pixels. The generated C03 geography remains rejected.
- **C02 satellite:** Use a generic concept cutout only over locked Earth pixels. Do not identify it as a real mission or verified hardware.
- **C04 observation plates:** Follow [the source and limits record](keyframes/corporate-film-data-layers-crossfade-v1.md). SST and salinity are monthly; chlorophyll-a is a daily L2 swath with gaps. Do not stack them as simultaneous measurements or fill missing coverage.
- **C05 vessel/USV:** The [equipment source manifest](equipment-source-manifest.md) and [official-source pack](equipment-sources/README.md) verify the local vessel byte match and the official USV source images. This establishes image provenance and listed facts, not reuse rights, actual location, operational date, or a vessel/USV pairing.
- **C06 ROV:** The manifest verifies the local BlueROV2 image byte match. It does not verify an actual field deployment, RBR attachment, mooring configuration, or reuse rights.
- **Equipment pixels:** ImageGen may create background plates only. It must not draw, repair, restyle, or alter the equipment. A post composite may use one original source item at small scale while preserving its pixels and proportions. If a clean cutout cannot preserve the image, use the whole original image as a brief insert or omit it.
- **C07 laboratory:** The available lab still is a concept/composition reference, not evidence of a real GeoSR lab. The plate needs review or replacement with rights-cleared footage.
- **C09/A02-A04 UI:** Use only the source captures, without generated UI or alteration. Review accounts, names, internal IPs, personal data, third-party imagery, and capture-time values before external release.
- **Fallback A/B:** These remain optional historical alternatives. They do not require a user choice before v3 work proceeds.

## Next production order

1. Review v3 shot pairs, timing, and user-editable checkpoints before paid video generation.
2. For C05, select at most one of the official vessel or USV sources, confirm reuse rights, and approve a small source-pixel-preserving insert; otherwise use a no-equipment concept plate after QA.
3. For C06, confirm rights and review a small original BlueROV2 insert; do not infer deployment or pair it with a sensor. Otherwise use a background-only concept plate after QA.
4. QA C07 as a clearly conceptual lab plate or secure rights-cleared real lab footage.
5. Assemble C01-C04 from their deterministic/official references; preserve layer provenance and review match points.
6. Generate and edit the 60-second company film and the separate 30-second AX film; review factual claims, UI pixels, privacy, aspect ratio, timing, and loop.
7. Complete production media deployment and verify the published routes and playback.

## Validation contract

The companion JSON retains the original v1 schema and historical 12/6 scene map. Its existing validator remains useful for that record's required fields, enum values, asset paths, and legacy timeline continuity; it does not supersede v3. The current v3 storyboard defines 10 company shots across 00:00–01:00 and 5 AX shots across 00:00–00:30. Confirm current assets, links, source rights, and the final manifest separately before release.