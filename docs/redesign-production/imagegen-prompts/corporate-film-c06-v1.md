# Corporate film C06 UAV/LiDAR keyframe v1

Status: **composition study only — rejected for final equipment fidelity**. The generated study was discarded from the repository; its SHA-256 is retained here as provenance. It is not a website or final-film asset. See [the equipment accuracy gate](../EQUIPMENT-ACCURACY-GATE.md).

## Rejected study provenance

- Artifact status: discarded from repository; hash retained in record. Not for production.
- Dimensions: 2560×1440 PNG, 16:9
- SHA-256: `69A4D81F03F151FEA80FA8E557188ADC065F8ABB8B73FEBC4291D06CA23EE842`
- Selected built-in ImageGen edit output: `C:\Users\user\.codex\generated_images\01a0b20b-422b-7b83-bbc6-0eb19e5600e7\exec-756422a2-8354-4045-a314-d4192fff809d.png`, 1672×941, SHA-256 `CF5CE276B7485253FBFA69A03BA0CCCCA6DD74866CDB7FCF4C824A6498E02A32`
- The selected native output was resized to 2560×1440 with Pillow Lanczos without cropping; the native image was within 1 pixel of a 16:9 ratio.
- First draft (superseded by the targeted edit): `C:\Users\user\.codex\generated_images\01a0b20b-422b-7b83-bbc6-0eb19e5600e7\exec-50ce1c11-5bbe-4edd-963f-d8b71119b137.png`, SHA-256 `FAD7B26810AEC01BC406BC8FD75DCB0CB6A1B900046004263523005BBB1E4BE6`. It had an aircraft too close to the frame edge and an oversized cone-like scan effect. It is not retained in the repository.
- Main-review-rejected selected frame, replaced at the same project path: SHA-256 `D820595A15A910668AE5F3939FBDC1EE39BB0BA1513446923E99BB9C06EFF8FA`. Its white triangular overlay looked like an artificial road structure or fence. The clean-base edit removed that overlay; the image was later discarded from the repository, and its SHA-256 is retained above.

## Official evidence and limits

The official [GeoSR FireFly6 equipment page](https://www.geosr.com/sub/equipment/surveying.asp?mode=view&bid=18&s_type=&s_keyword=&s_cate=&s_addtext2=&idx=1312&page=1) lists a VTOL unmanned aircraft, UAV photogrammetric survey/3D mapping, coastline-change monitoring, and manufacturer Birdseyeview. The [official FireFly6 image](https://www.geosr.com/upload/thumb/33.fireFly6_1.png) was downloaded to a temporary local reference and visually inspected. It shows a people-free, red-and-white fixed-wing VTOL silhouette. The official image was used only as a broad aircraft-shape reference; its rights are unconfirmed, and no logos or exact markings were requested. Temporary copies were removed after the edits. Reference SHA-256: `A5206F62A976882E5EC112C0B70942336F6122908E9FAC1503D51842CAF4C706`.

The official [UAV photogrammetry and LiDAR survey page](https://www.geosr.com/sub/business/conserve_view.asp?idx=64&s_cate=%EC%8A%A4%EB%A7%88%ED%8A%B8%20%EA%B8%B0%EC%88%A0) describes UAV survey work. The equipment manifest separately lists [Polarlis LiDAR LR](https://www.geosr.com/sub/equipment/surveying.asp?mode=view&bid=18&s_type=&s_keyword=&s_cate=&s_addtext2=&idx=1926&page=1) and [Pandar-XT mobile LiDAR](https://www.geosr.com/sub/equipment/surveying.asp?mode=view&bid=18&s_type=&s_keyword=&s_cate=&s_addtext2=&idx=1306&page=1), but does not establish either device as a FireFly6 payload. Their isolated official thumbnails were visually inspected but not used as aircraft references. The rendered point/mesh swath is therefore only a conceptual visual cue; it is not an observed data product and does not depict a confirmed sensor installation.

The C05 composition study discarded from repository; hash retained in record was supplied only for broad daylight and marine color continuity; it was not an equipment reference. Its SHA-256 is `4D236FEB0FA064165008283CD06E2980B7FBAC8B8383F168DACF47A5CEBB73BB`.

## Initial generation prompt

Built-in `image_gen.imagegen` was used. The first draft was generated from text only; the official aircraft and C05 composition-study reference were supplied in the subsequent targeted edit.

```text
Use case: photorealistic-natural
Asset type: 16:9 corporate film keyframe, internal concept preview for C06 at 36 seconds
Primary request: A realistic high oblique aerial view of a small generic Korean coast engineering survey setting. A single compact FireFly6-class hybrid VTOL fixed-wing survey aircraft is actively traversing above a concrete breakwater and adjacent coastal terrain. Show a restrained, very narrow temporary photogrammetry/LiDAR-style observation swath on the land directly beneath and just behind the aircraft: a few fine, sparse pale neutral point marks and short triangulated terrain facets briefly reveal the actual breakwater and ground surface, then fade naturally. This is a conceptual visual explanation, not a literal scan beam or a claim about a specific sensor payload.
Scene/backdrop: Generic Korean South or West coast context, not a named or recognizable site: modest harbor or estuary edge, low wooded islands in the distance, believable concrete breakwater, a small band of sand beach, calm blue-gray sea and shallow coastal slopes. Daylight continuity matching a restrained premium marine engineering film.
Subject: One medium-small hybrid fixed-wing VTOL aircraft with straight fixed wings, slim central fuselage, four small vertical-lift propellers mounted along the wing area, and a separate conventional forward flight propeller. Use the broad silhouette proportions and red/white general color blocking visible in official GeoSR FireFly6 reference photos, but omit all logos, markings, text and exact decals. Do not show or imply a specific LiDAR unit attached; no payload details beyond a small neutral survey-camera shape if needed.
Style/medium: Naturalistic aerial documentary photography, physically plausible Korean coastal engineering field scene, refined and understated, not science fiction.
Composition/framing: Landscape 16:9, high three-quarter aerial camera looking diagonally across the coast, aircraft clearly readable in the upper-right / right-center at realistic scale and fully within frame, breakwater and shoreline visible below. Leave a broad uninterrupted sea area toward the lower-left and foreground to support the following camera move down to a buoy scene. Keep enough terrain visible for the narrow swath to read, but the effect must cover only a small strip of ground and breakwater, never the sea.
Lighting/mood: Soft clear daylight with natural shadows, subtle marine haze only at the far horizon, coherent neutral daylight consistent with the prior coastal survey frame; no dramatic sunset.
Color palette: Deep marine blue, natural sea blue-gray, muted coastal greens, concrete gray, mist white, restrained red/white aircraft body.
Materials/textures: Real concrete breakwater blocks and parapet, natural small waves, believable coastal vegetation and sand; aircraft surfaces and rotors mechanically coherent.
Text (verbatim): none.
Constraints: One hybrid VTOL fixed-wing aircraft only, not a quadcopter. Aircraft must visibly have fixed wings and vertical lift rotors plus a separate forward propeller; no people anywhere. Narrow terrain-only observation swath with sparse subtle points/short triangulated facets; preserve ordinary ground appearance around it. No actual geographic claim to a specific Korean location. No readable text, no logos, no numbers, no watermark.
Avoid: quadcopter-only shape, multiple drones, people, faces, hands, boats as subjects, vehicle plates, labels, maps, fake measurements, UI, HUD, grids over the water, sea-wide blue lines, neon, laser beams, oversized scan cone, dramatic sci-fi glow, impossible coastline, fantasy terrain, dense point-cloud blanket, perfect geometric symmetry, heavy fog, lens flare.
```

## Targeted edit prompt

The official FireFly6 photograph was used as a shape reference, and the C05 image only as a daylight/color reference. The first draft was the composition target.

```text
Use case: precise-object-edit
Asset type: 16:9 corporate film keyframe, internal concept preview for C06 at 36 seconds
Input images: Image 1 is the current scene composition target; preserve its generic coastal setting, camera angle, day lighting and restrained marine color. Image 2 is the official GeoSR FireFly6 aircraft photograph and is a silhouette/structure reference only; do not reproduce any logos, markings or exact decals. Image 3 is the rejected C05 composition study and is a daylight color-continuity reference only.
Primary request: Refine the current image for a credible Korean coastal engineering survey film. Keep the same high-oblique view over generic Korean coast, concrete breakwater, modest harbor, small beach, low wooded islands and open sea. Keep the coastal scene calm and realistic. Correct the single aircraft to a compact hybrid fixed-wing VTOL shape based on Image 2: fully visible straight fixed wing, slim fuselage, vertical-lift rotors attached at wing positions, and the aircraft's separate flight-propeller arrangement; do not turn it into a quadcopter. Scale the aircraft down about 25 percent and move it inward from the right edge so every wingtip and rotor has generous clear margin from all frame edges. Keep its flight direction and overall pose broadly consistent with Image 1.
Observation visualization: Remove the entire bright cone, beam, and airborne triangulated net. In its place, show only a very small localized strip of sparse pale gray-white point marks and a few extremely fine short triangular facets laid directly onto the actual concrete breakwater and adjoining land surface immediately below/behind the aircraft. The strip must follow the visible terrain surface, cover at most about 5 percent of the image area, and be subtle enough that ordinary geography remains dominant. No line or effect may extend into the sky or across open water. This is a quiet editorial visualization of photogrammetry/LiDAR-style observation, not a literal beam and not a claim that a specific sensor is attached to FireFly6.
Scene/backdrop: Unnamed, generic Korean coastal harbor or estuary, not a named or exact real location.
Style/medium: Naturalistic aerial engineering documentary photography, soft daytime marine light.
Composition/framing: 16:9 landscape, maintain the current camera and coastline placement; reserve broad open water in the lower-left foreground for a later camera move toward a buoy.
Lighting/mood: Match Image 3's calm, clean daylight and blue-gray sea; physically coherent shadows and atmospheric perspective, no dramatic effects.
Color palette: Natural marine blue-gray, muted green shoreline, concrete gray, modest red/white aircraft, restrained mist white.
Constraints: Change only aircraft scale/placement/shape fidelity, remove the oversized scan visualization and replace with a tiny terrain-only surface swath. Preserve the framing, shoreline and overall location layout. One aircraft only; no humans. No actual lidar device or payload shown. No text, logos, labels, values, UI, HUD, map, watermark.
Avoid: quadcopter, giant aircraft, clipped wings, beam/cone, scan rays, glowing blue line, neon, grid over water, triangle net in air, fake data, people, readable signs, license plates, duplicate aircraft, fake named Korean geography, heavy fog, fantasy coast, lens flare.
```

## Main-review clean-base edit

An earlier review accepted the aircraft composition and rejected the white triangle mesh because it read as a road structure or fence. The later equipment-fidelity review rejects this generated aircraft for final use. The following targeted edit used the current frame as Image 1 and the official FireFly6 image as Image 2, only to preserve the broad hybrid fixed-wing VTOL silhouette. A second focused pass removed residual dot-like water marks. No data visualization is baked into the selected still; any survey-coverage cue belongs in a separate transparent post-production overlay after review.

```text
Use case: precise-object-edit
Asset type: clean 16:9 corporate film base keyframe, C06 at 36 seconds
Input images: Image 1 is the current edited target. Image 2 is the official FireFly6 reference and is only a check for the fixed-wing hybrid VTOL silhouette.
Primary request: Remove all visible point-cloud dots, white triangular mesh, scan traces and surveying overlays from Image 1. Restore the covered road, breakwater, beach, vegetation and shoreline as clean, continuous natural materials that match their immediate surroundings. This must be a clean base still with no LiDAR, photogrammetry, mapping or analysis effect visible anywhere.
Preserve exactly from Image 1: camera angle, 16:9 framing, horizon, coastline, island and harbor placement, road and breakwater geometry, aircraft position, scale, orientation, wing/rotor silhouette, aircraft color, daylight, shadows, marine color grade and open foreground water. Do not redesign, move, resize, crop, add to or remove the aircraft. Use Image 2 only as a geometry check that the visible aircraft remains a hybrid fixed-wing VTOL and is not a quadcopter; do not copy decals or markings.
Repair guidance: Where the white mesh crosses the road or breakwater, restore the original-looking continuous gray paved/concrete surface, natural rail edge and surrounding tree/ground texture. Restore ordinary coastal water texture under any scan marks. Keep the existing scene unchanged beyond removing the overlay.
Scene/backdrop: Same generic Korean coastal harbor / estuary concept as Image 1; no exact named location claim.
Style/medium: Naturalistic aerial engineering documentary still, calm daytime continuity.
Constraints: No visible data effect at all in this still. The scan visualization will be added later as a separate transparent post-production overlay after motion review. No people, faces, hands, text, logos, numbers, sensor hardware, boat additions, vehicle changes, map, HUD, chart, labels or watermark.
Avoid: point cloud, dots in a pattern, triangle mesh, fence-like crosshatching, road markings added, scan lines, beam, cone, grid, neon, glow, fake data, location changes, aircraft edits, new objects, image-wide repaint.
```

The selected output is from this follow-up edit of the clean-base pass, using that image as Image 1 and the same official aircraft reference as Image 2:

```text
Use case: precise-object-edit
Asset type: clean 16:9 corporate film base keyframe, C06 at 36 seconds
Input images: Image 1 is the current edited target. Image 2 is the official FireFly6 reference and is only a check for the fixed-wing hybrid VTOL silhouette.
Primary request: Finish the clean base still by removing every remaining isolated white point, dotted track, short bright line, speckled cluster or other survey-like trace from the sea surface in Image 1. Restore the open water as calm, natural blue-gray sea with coherent low-contrast small wave ripples only, no scattered point patterns and no geometric repetition. The earlier white triangle network has already been removed from the road and breakwater; keep those surfaces clean and continuous.
Preserve exactly: the current aircraft shape, position, scale and orientation; all aircraft rotors and wings; the same coast, road, breakwater, houses, vegetation, beach, islands, marina, lighthouse, camera, horizon, framing, daylight, shadows, color grade and open foreground sea area. Use Image 2 only to confirm that the aircraft is a hybrid fixed-wing VTOL; do not alter it or add markings.
Constraints: Clean still only; no LiDAR, photogrammetry, point cloud, scan marks, surveying traces or data visualization anywhere. The scan effect will be composited later as a separate transparent overlay in post-production. No people, text, logos, labels, map, HUD, beam, grid, triangle mesh, neon, glow, fake values or extra objects. Change only residual dot/line-like water artifacts into natural continuous water texture.
Avoid: isolated bright dots on water, repeated streaks, scan pattern, data overlay, changing the aircraft or shore scene, repainting the composition, adding wave foam or wake not already present.
```

## Visual review

- The C06 white point/triangle visualization and scan traces are absent from the selected still. The road, breakwater, beach and vegetation read as continuous surfaces rather than a mesh-covered structure.
- The image retains its hybrid fixed-wing VTOL aircraft, scale, position, orientation, generic shoreline composition, daylight, shadows and color grade. The aircraft remains a concept shape, not verified exact product geometry.
- No people, hands, legible text, logos, triangular mesh, or survey-overlay artifact were found on visual inspection at full 2560×1440 output. Small highlights remaining on the sea follow the natural wave texture rather than a point-cloud pattern.
- The coast contains a generic breakwater, small harbor edge, beach, wooded islands, and open water. It is not geospatially verified and must not be presented as a particular Korean location.
- The still is a clean base only. Add any later survey cue as a separate, localized transparent overlay in Higgsfield/post-production after method and source review; do not describe it as observed data or a confirmed FireFly6 LiDAR configuration. Sensor pairing and image rights remain open for production clearance.
