> **역사 기록 — 현재 제작 지시 아님**
> 2026-09-22 [현재 인계 기준](../redesign-next/00-START-HERE.md)으로 대체됨
> 아래의 완료·자체 점수·generationReady·모바일 제외·회사/AX 혼합 지시는 현재 승인으로 사용하지 않음
> 원본 근거와 실패·검수 이력만 보존

---

# Film generation readiness v1

**Current story authority:** [FILM-STORYBOARD-DIRECTOR-v3.md](FILM-STORYBOARD-DIRECTOR-v3.md) is the single default production path for the 60-second company film and separate 30-second AX film. The v2 storyboard and fallback A/B files remain historical source and alternate-plan records; choosing A or B is not a blocker for v3.

**Role of this v1 record:** The companion [JSON](FILM-GENERATION-READINESS-v1.json) preserves an older 12-corporate/6-AX scene register and schema for provenance and asset checks. Its old scene count and timecodes are not the current edit map. Use v3 for story, shot order, and timing. Both finished films remain pending in the [film manifest](../../dist/film-manifest.json).

**Current generation checkpoint:** [v3 readiness JSON](FILM-GENERATION-READINESS-v3.json) reports `generationReady=true`, `remainingPreGenerationGates=[]`, and `releaseReady=false`. This means the selected 60-second company and 30-second AX shot packages are ready to start generation, not that either final film exists or is approved for release. Optional equipment inserts, if used, still need rights/pixel review; public source rights/privacy, final motion/edit, export wiring, and deployment are post-generation gates.

## Current readiness

| Film | Ready references and structure | Actual remaining work | Readiness |
|---|---|---|---|
| Company, 60 seconds | v3 defines all 10 shots. C01-C04 use deterministic Earth and verified sequential 2D observation references; C05/C06 have main-reviewed selected concept backgrounds plus optional source-backed equipment-image candidates; C07 has a main-approved concept lab still; C08 is an authored typographic bridge; C09 uses actual Discover/Predict/Monitor captures; C10 returns to the Earth loop frame. | Optional C05 vessel/USV and C06 ROV insert rights and source-pixel/aspect review; omit uncleared inserts. Keep C05/C06 backgrounds and C07 lab still explicitly identified as generated concepts, not actual GeoSR evidence. Final image/video generation, editing, release review, and production deployment remain. | Story and sources are defined; final film not made. |
| AX, 30 seconds | v3 defines A01-A05 as inputs → Detect → Predict → Monitor → actual Overview. Actual 16:9 UI captures are available for Discover/Predict/Monitor and stay source-preserved. | Complete the concept film generation/edit, confirm A01 concept treatment and public rights/privacy, review final export, and deploy production media. | Story and UI evidence are defined; final film not made. |

“Ready” means a source can enter internal review or assembly; it does not establish public reuse rights, a factual claim about an installation, or publication approval.

## Current v3 scene register

| ID / time | Purpose and selected source | Gate |
|---|---|---|
| C01 · 00:00–00:05 | Earth reveal and East Asia axis; reuse [hero-earth-00s-v4.png](../../dist/assets/concepts/corporate-film/hero-earth-00s-v4.png). | Preserve source geography and exact loop reference. |
| C02 · 00:05–00:09 | Generic observation satellite over the locked Earth reference. | Concept cutout only; no real mission or satellite-model claim. |
| C03 · 00:09–00:14 | Deterministic approach to Korea/NW Pacific. | Use source-backed geography only; generated coastlines are prohibited. |
| C04 · 00:14–00:24 | Sequential SST → salinity → chlorophyll 2D plates, then coast entry. | Keep one layer at a time and preserve source dates, periods, units, coverage gaps, and colors. |
| C05 · 00:24–00:30 | Main-reviewed concept background [c05-coast-end-v1.png](../../dist/assets/concepts/corporate-film-v3/c05-coast-end-v1.png), not actual GeoSR field evidence. At most one optional source-backed vessel or USV cue. | Optional insert reuse rights and source-pixel/aspect review remain open; omit if uncleared. Do not claim site, date, operation, or vessel/USV pairing. |
| C06 · 00:30–00:34 | Main-reviewed concept pair [waterline start](../../dist/assets/concepts/corporate-film-v3/c06-waterline-start-v1.png) → [underwater end](../../dist/assets/concepts/corporate-film-v3/c06-underwater-end-v1.png); not actual GeoSR deployment evidence. Optional small [BlueROV2 source insert](../../dist/assets/equipment-rov.png). | Optional ROV insert reuse rights and source-pixel/aspect review remain open; omit if uncleared. No sensor/mooring/deployment claim. |
| C07 · 00:34–00:40 | Main-approved generated lab concept [analysis-lab-v1.webp](../../dist/assets/analysis-lab-v1.webp), start/end still. | Keep concept disclosure; no GeoSR facility, equipment ownership, sample, procedure, or result claim. Review final slow-push/focus motion. |
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
- **C07 laboratory:** The main-approved `analysis-lab-v1.webp` is a generated concept, not evidence of a real GeoSR lab. Keep the disclosure and do not claim facility, equipment inventory, sample, procedure, or result.
- **C09/A02-A04 UI:** Use only the source captures, without generated UI or alteration. Review accounts, names, internal IPs, personal data, third-party imagery, and capture-time values before external release.
- **Fallback A/B:** These remain optional historical alternatives. They do not require a user choice before v3 work proceeds.

## Next production order

1. Review v3 shot pairs, timing, and user-editable checkpoints before paid video generation.
2. C05 background is selected and main-reviewed. If using an official vessel or one USV source, confirm reuse rights and source-pixel/aspect preservation; otherwise keep the concept background only.
3. C06 background pair is selected and main-reviewed. If using a small original BlueROV2 insert, confirm rights and source-pixel/aspect preservation; do not infer deployment or pair it with a sensor.
4. Keep the main-approved C07 lab still identified as generated concept and review the final slow-push/focus motion; a rights-cleared real lab source is optional.
5. Assemble C01-C04 from their deterministic/official references; preserve layer provenance and review match points.
6. Generate and edit the 60-second company film and the separate 30-second AX film; review factual claims, UI pixels, privacy, aspect ratio, timing, and loop.
7. Complete production media deployment and verify the published routes and playback.

## Validation contract

The companion JSON retains the original v1 schema and historical 12/6 scene map. Its existing validator remains useful for that record's required fields, enum values, asset paths, and legacy timeline continuity; it does not supersede v3. The current v3 storyboard defines 10 company shots across 00:00–01:00 and 5 AX shots across 00:00–00:30. Confirm current assets, links, source rights, and the final manifest separately before release.