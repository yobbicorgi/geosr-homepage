# Corporate film C04 single-layer data plates v1

Status: **main-approved as factual data-plate references only**. The three plates are shown one at a time and connected by crossfades in the final film, with camera approach motion handled in the edit. This internal reference set is not a finished film frame, public result, website poster, or simultaneous-observation claim. Nothing is wired to a page.

## Sequence direction

Use the accepted 20s SST reference as the lead-in, then show one complete data plate at a time in this order: SST → Aquarius sea-surface salinity → MODIS L2 chlorophyll-a. Continue to the accepted 24s coastline reference. Do not stack all three plates together. Main review approved the contact sheet and specified crossfades plus camera approach motion for the final video; timing and motion polish belong to the film edit.

All three 22s frames reuse the accepted C03 18s Earth background, the same 128°E / 36°N camera reference, the same NASA geographic base-map crop, plate extent, perspective and on-screen position. The 1335×752 plate occupies about 52.15% of the 2560px frame width. The frame uses a thin neutral edge and a minimal shadow. No labels, legends, values, HUD, neon, or fabricated fields are added.

| Frame | File | One visible source layer | SHA-256 |
|---|---|---|---|
| 22s-a | `dist/assets/concepts/corporate-film/hero-earth-22s-a-sst-v1.png` | MODIS Aqua monthly SST | `C104455F2F8533AC68A4179D1AC395CCEAF3EFEF067DA59072B197CC849164DE` |
| 22s-b | `dist/assets/concepts/corporate-film/hero-earth-22s-b-salinity-v1.png` | Aquarius monthly sea-surface salinity | `296E44FC7881F9393663E10A41C55EC70408631872F31B48CD4E123B6B9D49A9` |
| 22s-c | `dist/assets/concepts/corporate-film/hero-earth-22s-c-chlorophyll-v1.png` | MODIS Aqua Level 2 daily chlorophyll-a swath | `A08B7B55395D9AC7639A9C36A4F0DDF0FA885472B60AD131A8FA0400E3134BE6` |

The three plates use the same GIBS request: WMS 1.1.1, EPSG:4326, BBOX `90,15,166,57.75`, requested date `2012-08-01`, `nearestValue=0`, and 2560×1440 source captures. The underlying geographic pixels come from NASA's August Blue Marble Next Generation texture, cropped to the same extent as the data. No-data reveals that identical basemap; it is never filled with invented observations.

| Layer | Official GIBS identifier | Period and units | Source alpha coverage |
|---|---|---|---:|
| SST | `MODIS_Aqua_L3_SST_Thermal_4km_Day_Monthly_v2019.0_STD` | Monthly P1M; °C | 50.3468% |
| Salinity | `Aquarius_Sea_Surface_Salinity_L3_Monthly_v5_STD` | Monthly P1M; psu | 46.7737% |
| Chlorophyll-a | `MODIS_Aqua_L2_Chlorophyll_A_v2022.0_STD` | Daily P1D Level 2 swath; mg/m³ | 10.7248% |

The two monthly products and the daily chlorophyll swath do not represent simultaneous measurements merely because the requested date matches. Chlorophyll's transparent cloud and orbital gaps are unobserved coverage and remain unfilled. The Aquarius source is coarse. Its displayed color field is a documented bilinear-derived visualization of the mapped colors only; source measurements are not interpolated, and the original observed/unobserved mask is preserved. Keep this qualification in the production note and do not present the softened display as higher-resolution science.

## Review artifacts and provenance

- [Contact sheet](corporate-c04-data-layers-crossfade-v1-contact-sheet.png) — SHA-256 `1114D7A915829768E74D81B2AB1D8A8BA73FF30AC90BADAD9F4769BC8216DF6A`.
- [Render manifest](corporate-film-data-layers-crossfade-v1-render-manifest.json) — output hashes, identical plate geometry, camera and NASA crop, request details, source layer metadata and limitations.
- [GIBS source manifest and captured rasters](sources/corporate-film-c04-v1/gibs-c04-source-manifest.json).
- [Reproducible renderer](../../../scripts/render_corporate_film_c04_crossfade_v1.py).

All earlier C04 drafts are rejected as final-facing visuals. The ImageGen drafts changed coastlines; deterministic v1/v2 plates read like clipped map fragments and exposed the coarse salinity grid; v3 read as horizontal strips; v4's transparent no-data broke the plates into fragments; v5 restored a factual base map but the simultaneous planes read like dividers and the salinity grid remained too prominent. V5's source handling and no-data behavior remain recorded as factual audit notes, while rejected images, contact sheets, version manifests, and individual renderers have been removed from active assets. The accepted direction is these single-layer references followed by crossfades, not a simultaneous stack. The accepted 20s SST reference and 24s deterministic coastline reference remain unchanged.
