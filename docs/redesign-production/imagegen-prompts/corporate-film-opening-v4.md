> **역사 기록 — 현재 제작 지시 아님**
> 2026-09-22 [현재 인계 기준](../../redesign-next/00-START-HERE.md)으로 대체됨
> 아래의 완료·자체 점수·generationReady·모바일 제외·회사/AX 혼합 지시는 현재 승인으로 사용하지 않음
> 원본 근거와 실패·검수 이력만 보존

---

# Corporate film opening: selected v4 orbital reference

**Status:** Selected by main review as the factual-geography and camera-continuity reference for the opening. This is an internal reference pair, not a final website poster or final cinematic artwork. It has not been wired into the site.

## Frames

| Frame | Asset | Dimensions | SHA-256 | Visible elements |
|---|---|---:|---|---|
| H01 · 00s | [hero-earth-00s-v4.png](../../../dist/assets/concepts/corporate-film/hero-earth-00s-v4.png) | 2560 × 1440 | `3D6117DC1E397DA56C815C299E8C84142BBBD9083CB5F01C60A2D20185130D5C` | NASA-derived Earth, dark space, sparse stars; no spacecraft |
| H02 · 07s | [hero-earth-satellite-07s-v4.png](../../../dist/assets/concepts/corporate-film/hero-earth-satellite-07s-v4.png) | 2560 × 1440 | `377D0D3A8CCC4EAA1A3FFF73D0B4645155599ABD8C8EF3C87CBFC7539421E0A6` | Identical Earth/space pixels with one conceptual satellite overlay |

The H01/H02 pixel difference is confined to the satellite overlay at approximately x=2096–2358, y=720–835. The Earth source pixels, camera, scale, crop, lighting and space background are identical in the pair.

## Source and deterministic renderer

- **Earth texture:** NASA Blue Marble Next Generation August global true-color composite, 5400 × 2700: [official August texture](https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/august/world.200408.3x5400x2700.jpg). The [NASA BMNG page](https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-map/) describes the monthly global product; the [technical readme](https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74343/readme.pdf) documents its Plate Carrée source coordinates. The texture is historical and does not represent current conditions or a live observation.
- **Projection:** `scripts/render_corporate_earth_reference.py` samples the source raster using inverse orthographic mapping. The view center is 130°E, 30°N; the 2560 × 1440 output places the globe center at (1890, 745) with a 910 px radius. The left 36–40% remains quiet for title placement. These are render parameters, not reported environmental measurements.
- **H02 spacecraft:** The satellite is a concept element isolated from an earlier generated draft and preserved in the selected v4 frame. It is not verified hardware, a specific mission, or a faithful model of Sentinel-2 or another satellite. No generated geography is used for the globe surface.
- **Clouds:** No separate cloud composite is included. NASA SVS cloud/no-cloud overlays were tested in v5/v6 and rejected because their output looked dark or dirty; do not reinstate those layers without a cleaner, source-registered method and review.

The renderer requires Python 3, NumPy and Pillow. It downloads the official NASA texture when `--texture` is omitted. To rebuild the pair, the existing selected v4 H01/H02 pair is also needed: the H02 satellite-only pixel patch is preserved from that approved pair rather than regenerated. Example:

```powershell
python scripts/render_corporate_earth_reference.py
```

## Satellite concept and motion prompt

V4 itself was not produced by ImageGen. Its only generated element is the spacecraft cutout carried forward from the rejected v2 visual draft. That earlier concept brief called for one generic Earth-observation satellite with a compact bus and a single deployable array, placed over the upper-right dark northwest Pacific and oriented toward Earth. It prohibited a visible beam, logos, mission markings, additional craft, UI, text, people, neon and invented map layers. This describes the concept request only; it does not validate the satellite's design or dimensions.

For Higgsfield, use v4 H01 as the opening state and v4 H02 as the 07-second continuity state. Keep the source-backed Earth surface and the H01/H02 camera, scale and crop locked. The next move may approach the Korean Peninsula, but motion should transform the camera only; coastlines must remain tied to the unchanged NASA texture. Atmosphere, clouds and light are optional separate layers and require a fresh coastline check. Do not treat the satellite as a verified mission asset.

## Rejection history

- **v1:** ImageGen-generated Earth geography was inaccurate; rejected.
- **v2:** More visually appealing, but the Korean Peninsula, Japanese archipelago and adjacent coasts were distorted; rejected. The satellite concept was retained only as a separate overlay source for H02.
- **v3:** The deterministic NASA geography passed, but polar snow dominated, the Korean Peninsula read too small, and the composition did not lead clearly into the next zoom; rejected.
- **v4:** Selected for accurate source geography, readable East Asia/NW Pacific framing, scale, title-safe area and H01/H02 continuity.
- **v5/v6:** NASA cloud composites were tested but created dark/dirty-looking artifacts; rejected. They are not in the selected pair.

## Higgsfield continuity brief

Use v4 as the locked C01 reference. Preserve the NASA coastline pixels, the East Asia view axis, globe scale and crop as the motion proceeds toward the Korean Peninsula. Do not ask a generative model to redraw coastlines or invent surface detail. A separate source-checked atmospheric, cloud or lighting treatment may be added only if it leaves the coastlines unchanged; inspect Korea, Japan, the east China coast and the northwest Pacific after every pass. Keep the H02 satellite marked as conceptual until a documented equipment reference verifies its form. These frames are not final website assets.

## Visual self-review

- **Geography:** Main review accepted the deterministic coastline render and East Asia/NW Pacific orientation. Coastlines are mapped from the NASA source rather than redrawn by ImageGen.
- **Composition:** Main review accepted the larger globe and crop, readable Korean Peninsula/Japan region, dark left title-safe area, and shared H01/H02 geography.
- **Lighting:** v4 was judged sufficient as a continuity reference, though it is not approved as final cinematic lighting or poster art.
- **Satellite:** One complete concept spacecraft is visible in H02 over a dark northwest-Pacific area. Its shape and configuration remain unverified; H02 is not a factual equipment depiction.

See [MEDIA-FACTCHECK-SOURCES.md](../MEDIA-FACTCHECK-SOURCES.md) for the source and use gate.
