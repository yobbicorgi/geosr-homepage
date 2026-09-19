# Media fact-check and sources: corporate film opening

**Current selection:** The v4 pair is selected as an internal, source-backed orbital geography reference. It is not a final website poster or final cinematic artwork, and it is not connected to any page or manifest. Only its Earth base is NASA-derived; its satellite remains a conceptual, unverified element.

**Version history:** v1 and v2 were rejected for inaccurate generated geography; v3 used accurate source geography but was rejected for snow-heavy framing and scale; v5 and v6 cloud composites were rejected because the cloud treatment looked dark or dirty. Keep those versions out of public pages.

## Rejected v1 deliverables

| Frame | File | Dimensions | SHA-256 | Intended use |
|---|---|---:|---|---|
| H01, 00s | dist/assets/concepts/corporate-film/hero-earth-00s-v1.png | 1672 × 941 | A422798E3727C5ADFE9AFF712424406C7886ABDA6DB54C3808CFD8E172AF96D4 | Earth emerging from dark space; no spacecraft |
| H02, 07s | dist/assets/concepts/corporate-film/hero-earth-satellite-07s-v1.png | 1672 × 941 | 736178AD264FBEE9C738D44C788CA14157DF7E922F52E15F88344BFD169C3858 | Same composition with one Earth-observation spacecraft |

The pair is 16:9. H01 was edited from the corrected H02 output so the Earth, crop, stars, and illumination remain continuous. Neither image has been added to a page or manifest.

## Source record

| Source | Role in generation | Verified facts and limits |
|---|---|---|
| [NASA SVS: NPP Blue Marble](https://svs.gsfc.nasa.gov/4550) and [provided still](https://svs.gsfc.nasa.gov/vis/a000000/a004500/a004550/BlueMarble_starfield_4k_2160p30_v2.00001_print.jpg) | Earth appearance, broad geography, clouds, and lighting reference. | NASA SVS describes the visualization as a Suomi NPP VIIRS composite showing Earth on 2015-10-14. The generated geography and clouds are illustrative and were not copied as verified data. Credit NASA's Scientific Visualization Studio when the source image itself is used. |
| [ESA Sentinel-2 high-resolution image](https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2014/07/sentinel-2_high-resolution_and_multispectral/14622617-1-eng-GB/Sentinel-2_high-resolution_and_multispectral_pillars.jpg) | Spacecraft geometry reference only. | This reference was supplied to ImageGen to guide a Sentinel-2-class concept. It does not establish that the generated spacecraft is a faithful Sentinel-2 model. |
| [ESA Sentinel-2 facts and figures](https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-2/Facts_and_figures) | Mission/specification cross-check source. | ESA lists dimensions of 3.4 m × 1.8 m × 2.35 m and a multispectral imager. The generated frame's geometry and solar-array depiction still require engineering review. |
| User-provided concept reference: C:\Users\user\AppData\Local\Temp\codex-clipboard-667cc6f9-4e87-4314-bec8-93c66041ec79.png | Composition/story sequencing reference only. | Used only for the future idea of an opening progression. No data layers were requested or included in H01/H02. The temporary reference was not copied into the repository. |

Temporary NASA and ESA downloads were held under tmp/imagegen/20260919-corporate-opening-v1/ during generation and are removed after this record is complete.

## Visual review and open checks

- **H01:** No spacecraft is visible. The Africa–Europe–Middle East–India-facing globe, cloud pattern, black space, and framing visually match H02. A specialist still needs to verify the coastline and cloud detail before any factual use.
- **H02:** One spacecraft is visible in the upper-right with one apparent rectangular solar-array wing and a compact bus. No beam is visible. The depicted configuration is conceptual, not a verified Sentinel-2 engineering view.
- **Earth and lighting:** Both frames have a natural-looking rim and stars at a glance. AI-generated coastlines, clouds, and surface detail can be distorted; do not describe them as accurate geography or live data.
- **Composition:** Earth sits in the lower/right portion and leaves a dark left title-safe region. There is no Korea close-up, label, logo, person, UI, chart, neon line, or data layer.
- **Iteration:** The first H02 draft presented the wrong Pacific/Australia-facing view and an oversized storm-like pattern. One targeted correction aligned the visible hemisphere to the NASA reference. This is a visual correction only, not geographic validation.

## Rights and attribution gate

NASA says its imagery is generally not subject to U.S. copyright, requires source acknowledgement, and must not imply NASA endorsement; commercial/promotional use has additional limits. See [NASA Images and Media Usage Guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/).

ESA states that its website material is protected and that creating derivative works requires prior written authorization. Because the ESA image was supplied as a geometry reference, keep these outputs internal until rights review confirms whether the concept may be redistributed or published. See [ESA Terms and Conditions](https://www.esa.int/Services/Terms_and_conditions).

**Required before public use:** final geography check; spacecraft/array check; NASA/ESA rights and attribution review; confirm no agency endorsement is implied; keep a visible internal-concept label in review materials. No verified fact or license approval is claimed by these drafts.

## Selected v4 orbital reference (internal only)

| Frame | File | Dimensions | SHA-256 | Status |
|---|---|---:|---|---|
| H01, 00s | `dist/assets/concepts/corporate-film/hero-earth-00s-v4.png` | 2560 × 1440 | `3D6117DC1E397DA56C815C299E8C84142BBBD9083CB5F01C60A2D20185130D5C` | Selected reference; no spacecraft |
| H02, 07s | `dist/assets/concepts/corporate-film/hero-earth-satellite-07s-v4.png` | 2560 × 1440 | `377D0D3A8CCC4EAA1A3FFF73D0B4645155599ABD8C8EF3C87CBFC7539421E0A6` | Selected reference; one conceptual spacecraft |

The Earth in both frames is a deterministic orthographic render of NASA's August Blue Marble Next Generation monthly global true-color texture. The image uses the same mapped source pixels, camera, framing and crop in H01 and H02. H02 differs only by the spacecraft overlay. The base map is a historical monthly composite, not a live or current observation; no measurement, analysis layer or claim of real-time data is shown.

| Source | Use and fact limits |
|---|---|
| [NASA Blue Marble Next Generation base map](https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-map/) and [August 5400 × 2700 texture](https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/august/world.200408.3x5400x2700.jpg) | Deterministic source texture for the Earth surface and coastlines. NASA describes BMNG as a monthly, MODIS-derived global true-color dataset; it is not a live data layer. |
| [NASA BMNG technical readme](https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74343/readme.pdf) | Projection and source-dataset reference. The renderer samples the source in its global Plate Carrée coordinates and projects it to an orthographic globe. |
| Existing v2 generated spacecraft concept | Source for the cutout overlaid in H02 only. This is not a NASA, ESA or verified mission spacecraft; its body, dish and array configuration require hardware review before any factual or public use. |

The selected composition keeps the globe center at 130°E, 30°N, with a 910 px radius centered at (1890, 745) on the 2560 × 1440 frame. East Asia, the Korean Peninsula, Japan and the northwest Pacific remain readable, while the left side stays dark for title use. The positions describe the render setup, not a claimed measured observation.

**Use gate:** v4 is the selected factual-geography continuity reference for the corporate-film opening, not a final poster, final film frame, or production-approved spacecraft depiction. Do not wire it into the website. Preserve its coastline geography, viewing axis, scale and crop in downstream motion work. Clouds or cinematic lighting may be added only as separate treatment that leaves coastlines unchanged; use source-backed layers and visually verify the Korean Peninsula, Japanese archipelago and adjacent coasts after each pass. No cloud overlay is included in the selected v4 pair.

**Rejection record:** v2 had stronger visual appeal but generated inaccurate coasts; v3 preserved source geography but had excessive polar snow and a weak East Asia close-up; v5/v6 cloud overlays created dark or dirty-looking artifacts. These files were removed from `dist`; v4 remains the selected reference pair.
