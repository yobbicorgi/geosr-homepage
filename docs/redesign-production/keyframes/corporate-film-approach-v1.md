# Corporate film C02/C03 approach keyframes v1

**Status:** Main review accepted these as factual geography and camera-path references only. They are internal keyframes, not final cinematic artwork, a final poster, or website assets. Nothing here is wired to a page or film manifest.

## Sequence

The frames extend the selected v4 C01 reference from the 07-second satellite state toward Korea and the northwest Pacific. Every Earth pixel is sampled deterministically from the same NASA Blue Marble Next Generation August source texture with inverse orthographic projection. Coastlines are never AI-generated or warped. The renderer retains the v4 directional lighting and restrained atmosphere treatment.

| Time | Frame role | File | Size | Camera center | Render center / radius | Satellite concept | SHA-256 |
|---:|---|---|---:|---|---|---|---|
| 10s | C02 observation mid | `dist/assets/concepts/corporate-film/hero-earth-10s-v1.png` | 2560 × 1440 | 130.0°E, 30.5°N | 1770, 760 / 1050 px | v4 H02 patch, scale 0.82, at (2210, 590) | `18DB897EDF953DE924B4E3CD405CAEA9A83B09F25F3334C25253D85E585A40F3` |
| 12s | Shared C02 end / C03 start | `dist/assets/concepts/corporate-film/hero-earth-12s-v1.png` | 2560 × 1440 | 130.0°E, 31.5°N | 1560, 745 / 1380 px | v4 H02 patch, scale 0.65, at (2330, 445) | `7B7545FB2BF0A0D2FAB4ACBF69C385ED135DC79EF8C49CE5B736EACDCC41CA1B` |
| 15s | C03 approach mid | `dist/assets/concepts/corporate-film/hero-earth-15s-v1.png` | 2560 × 1440 | 129.0°E, 34.0°N | 1400, 730 / 1950 px | None | `58FAD8C636327E1411593B774D6E1494E1836900B33C2783DDE0D60CB61D05C7` |
| 18s | Korea / northwest Pacific close | `dist/assets/concepts/corporate-film/hero-earth-18s-v1.png` | 2560 × 1440 | 128.0°E, 36.0°N | 1280, 720 / 2700 px | None | `01705F49A88A8EECFC486FEAD06E801D1B22EA8E51EAEB253F810A667E15A9A7` |

The 12-second frame is the shared transition between scenes C02 and C03. The projected view center progresses from 130°E / 30°N to Korea, while the globe scale increases gradually. The satellite element is only a scaled and repositioned crop from the difference between selected v4 H02 and H01. Its equipment shape is unverified and remains conceptual. Its motion in these stills suggests an upper-right exit; the final Higgsfield sequence must redesign that motion naturally, and the spacecraft must be absent by 15 seconds.

## Source and reproduction

- **Earth texture:** NASA Blue Marble Next Generation August global true-color composite, 5400 × 2700: [official August source](https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/august/world.200408.3x5400x2700.jpg). NASA's [Blue Marble Next Generation page](https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-map/) describes the monthly global product; the [technical readme](https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74343/readme.pdf) documents the Plate Carrée source coordinates. The composite is historical and does not represent current conditions or live observations.
- **Projection and lighting:** `scripts/render_corporate_earth_reference.py` performs the same inverse orthographic sampling, source interpolation, directional shading and limb treatment as v4. Only camera center, frame center, and globe radius vary in the sequence.
- **Satellite source:** the v4 H02/H01 difference mask, which isolates the existing concept overlay. No new spacecraft was generated.
- **Reproduction:** `python scripts/render_corporate_earth_approach_v1.py`. The script writes four PNGs to `dist/assets/concepts/corporate-film/` and the review contact sheet to this folder. Python 3, NumPy and Pillow are required; the official NASA texture is downloaded temporarily if `--texture` is omitted.
- **Review sheet:** [corporate-approach-v1-contact-sheet.png](corporate-approach-v1-contact-sheet.png). It is an internal review artifact with filename labels; no lettering is present in the four keyframes.

## Review and use limits

- Main review accepted the 10 → 12 → 15 → 18 camera path as a source-backed geography and continuity reference. Korea, Japan, the east China coast, and the northwest Pacific are sufficiently visible in the 18-second base frame for later verified 2D data-layer compositing.
- The source texture is unchanged geographically across the sequence; differences come from deterministic camera sampling and the satellite overlay in only the first two frames. The 15- and 18-second frames contain no satellite.
- There are no people, beams, HUD elements, grids, labels, fake data, live values, or UI.
- These renders do not validate environmental measurements, present-day coast conditions, satellite identity, or spacecraft geometry. Do not present them as analyzed data or final imagery.
- Keep them out of the homepage and manifest until a separate main approval. In Higgsfield, preserve the NASA coastline and camera path; the concept satellite animation needs a more natural motion pass before use.
