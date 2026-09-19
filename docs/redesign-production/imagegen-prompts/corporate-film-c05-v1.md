# Corporate film C05 field-observation keyframe v1

Status: **composition study only — rejected for final equipment fidelity**. The generated study was discarded from the repository; its SHA-256 is retained here as provenance. It is not a website or final-film asset. See [the equipment accuracy gate](../EQUIPMENT-ACCURACY-GATE.md).

## Rejected study provenance

- Artifact status: discarded from repository; hash retained in record. Not for production.
- Dimensions: 2560×1440 PNG, 16:9
- SHA-256: `4D236FEB0FA064165008283CD06E2980B7FBAC8B8383F168DACF47A5CEBB73BB`
- Selected built-in ImageGen edit output: `C:\Users\user\.codex\generated_images\01a0b20b-422b-7b83-bbc6-0eb19e5600e7\exec-6f4e182a-a8a2-413a-b283-1209d1d3feec.png`, 1672×941, SHA-256 `9445EA739E62699498718F6DB2FF9AF7B267ADBE752D5AECFF3CD197ECF878C3`
- Previous candidate (rejected by main because it rendered a large ocean-going ship rather than the actual compact coastal vessel): SHA-256 `3F574C5EA82B750ECD1D75EE5DB6A65BF498EE7A4A5DEBE06119468DF5FBE7EC`. That iteration was superseded during editing; no generated still is retained in the repository.
- Prior hull-mark cleanup edit, superseded by the main-review vessel edit: `C:\Users\user\.codex\generated_images\01a0b20b-422b-7b83-bbc6-0eb19e5600e7\exec-a04fafa8-31db-4b3e-a799-9a267a8e72f9.png`, 1672×941, SHA-256 `26BC4433578A3F5EFFA62C5CD506405B8203ED978609F72A2DFC8F7DBE9DF3CF`
- First generated draft (not selected; contained tiny gibberish-like hull marks): `C:\Users\user\.codex\generated_images\01a0b20b-422b-7b83-bbc6-0eb19e5600e7\exec-9862d402-9980-4455-b09b-e7233a486a3c.png`, 1672×941, SHA-256 `22FC8842A415ADF03FFCE2D8F882D543001E84C2A34A4B45640BBD66DE4ED37E`
- The selected image was resized to 2560×1440 with Pillow Lanczos, without cropping. The native output was close to 16:9; the resize makes a negligible aspect adjustment.

## Reference assets and limits

The supplied [equipment-vessel.jpg](../../../dist/assets/equipment-vessel.jpg) (440×251, SHA-256 `9B41F4616C5CC022C53C7676292E15B198F7EE4157710A82511CE3A5F17FDEA3) and [usv-source.jpg](../../../dist/assets/usv-source.jpg) (740×580, SHA-256 `2967130902E41A6EA67ADB6E8E0756CE950D3027FBD4F732EF43905D3A61DD73) were visually inspected before prompting. The first fresh-generation call used text descriptions of their broad shapes; the final targeted edit supplied `equipment-vessel.jpg` as the primary vessel-shape reference and the current frame as the composition/background/USV edit target. The expected nearshore silhouette is a short black hull with low freeboard, a compact central angular wheelhouse, broad forward metal work platform and railings, and a simple aft A-frame. The source image identifies the actual GeoSR vessel, while exact payloads, dimensions, and generated equipment details remain unverified. `usv-source.jpg` informed only the first prompt's broad yellow twin-hull shape; the final edit preserved the USV already in the frame. No reference lettering or branding was requested or retained.

The shoreline is a generic Korean coastal context with low wooded islands and distant coastal infrastructure. It does not claim to reproduce a named harbor, island group, or survey location. The image contains no readable measurements, map, bathymetry, or analysis result.

## Generation prompt

Built-in `image_gen` was used. The local equipment photos were inspected and their unverified shapes were described in the text prompt; they were not treated as exact product identities or evidence of a particular operation.

```text
Use case: photorealistic-natural
Asset type: internal 16:9 corporate film keyframe for the C05 coastal field-observation scene; compose for a 2560×1440 desktop film frame
Primary request: Create a premium, restrained photorealistic engineering-documentary aerial still of a larger coastal research vessel and a much smaller yellow twin-hull unmanned surface vehicle conducting parallel observations in the same generic Korean nearshore survey area. This is an internal concept, not documentary evidence of a specific GeoSR operation.
Scene/backdrop: Generic Korean coast in natural daylight: low wooded islands and a modest harbor or aquaculture boundary far in the background, with no distinctive landmark or claimed exact location. Calm-to-lightly-choppy blue-green seawater fills most of the frame.
Subject: One practical coastal survey vessel, several times longer than the USV, with a dark navy working hull, white compact wheelhouse, antenna mast, and a modest aft deck handling frame or winch. Beside it, one clearly smaller yellow twin-hull catamaran USV with a low gray equipment deck and a small, plausible sensor mast. Use the supplied equipment-vessel.jpg and usv-source.jpg only as unverified shape references: the boat silhouettes and equipment proportions are not confirmed model specifications; do not reproduce any visible markings or text.
Style/medium: Photorealistic editorial documentary photography; real marine materials, restrained natural color, believable Korean coastal engineering context, no sci-fi treatment.
Composition/framing: High three-quarter oblique aerial view, not straight down. Both vessels fully visible with clearly different scale, traveling on parallel headings within the same survey area, with realistic separation and no collision course. Place the two vessels around the center-right at a readable scale. Preserve broad open-water space in the foreground and around their wakes for later camera motion and a shallow-water reveal; keep distant shoreline to the upper part of the image. Wide 16:9 landscape.
Lighting/mood: Soft clear coastal daylight with physically plausible reflections and natural contrast; visibility good enough to read hull shape, sensors, wakes, and shoreline.
Materials/textures: Weathered dark hull, matte white superstructure, realistic yellow composite USV hulls and gray equipment, subtle wind ripples, two modest narrow wakes trailing behind the moving craft.
Text (verbatim): none.
Constraints: No people, faces, silhouettes, hands, arms, gloves, or human reflections. One research vessel and one USV only. No logos, lettering, flags with text, labels, charts, numbers, UI, HUD, data overlays, bathymetry graphics, scan grid, neon lines, beams, exaggerated fog, giant waves, artificial storm, fantasy hardware, extra vessels, extra islands, or precise recognizable port geography. Do not copy markings from the shape-reference images. Maintain believable size difference, sensor placement, vessel orientation, water contact, and wake physics.
```

## Initial cleanup edit

Close inspection of the first generated draft found tiny gibberish-like hull markings. One targeted built-in ImageGen edit removed those marks, but main review later rejected that candidate because the vessel silhouette was too large and ocean-going.

```text
Use case: precise-object-edit
Asset type: internal C05 corporate film keyframe cleanup
Input images: Image 1: edit target; preserve this exact aerial survey scene and all its framing.
Primary request: Remove only the tiny gibberish-like lettering or logo marks on the dark research-vessel hull. Restore those few areas as clean, continuous dark navy painted hull texture with the same light, reflection, and waterline. The result must contain no lettering, numbers, labels, logos, flags, or watermark anywhere.
Constraints: Preserve the research vessel's size, hull shape, wheelhouse, deck gear, mast, wake, the yellow twin-hull USV and its sensor mast, their positions and headings, the Korean coastal island/harbor background, water texture, lighting, camera angle, and exact wide 16:9 composition. Change only illegible hull markings into plain hull paint. Do not add, remove, or redesign any object. Keep the scene free of people and hands.
```

## Main-review silhouette edit

Main review rejected the previous candidate because the research vessel looked like a large ocean-going survey ship rather than the compact nearshore vessel in `equipment-vessel.jpg`. This one targeted edit used the current frame as the edit target and the actual vessel photo as the primary shape reference. It preserved the background and yellow USV while replacing only the research vessel with the lower, shorter working-boat profile. The composition-only approval is withdrawn for final equipment fidelity. The generated frame does not preserve the actual vessel pixels and depicts a yellow twin-hull USV unlike the verified official single-hull black/red craft. Field operation, exact vessel configuration, any USV model/payload and image rights remain unverified.

```text
Use case: precise-object-edit
Asset type: internal C05 corporate-film keyframe revision
Input images: Image 1: edit target and source of the existing coast, camera, composition, water, wakes, and yellow USV. Image 2: primary vessel-silhouette reference, the real compact GeoSR coastal survey vessel in equipment-vessel.jpg.
Primary request: Replace only the oversized research ship in Image 1 with a short, low-profile nearshore survey workboat matching the physical silhouette and proportions in Image 2. EXACT SILHOUETTE PRIORITY: when the current ship and Image 2 conflict, use Image 2's compact, low-deck coastal-vessel shape. The result should read as the small actual coastal survey boat represented in Image 2, not an ocean-going research ship.
Vessel shape requirements: Low black hull with low freeboard and short overall length; broad metal working platform at the bow with simple safety railings; one short, angular white wheelhouse near the middle; low practical mast; a modest, simple aft A-frame or small deck crane only. Keep the vessel's bow pointing left and stern pointing right as in Image 1. Reduce the tall superstructure and large-ship profile; remove the multi-level high bridge and oversized industrial gantry. Do not add unsupported sensor payloads. No text, Korean characters, numbers, logos, flags, or marks on the vessel.
Preserve from Image 1: Keep the exact camera angle, location in the frame, generic Korean coastal island/harbor background, daylight, sea texture and color, and wide 16:9 framing. Keep the existing yellow twin-hull USV exactly the same shape, size, color, position, heading, sensor mast, and wake. The compact vessel must remain clearly larger than the USV but proportionate to a small coastal craft. Adjust only the main vessel's scale/geometry and its immediate waterline/wake so that it sits naturally in the water; do not change the USV wake.
Constraints: No people, faces, silhouettes, hands, arms, gloves, human reflections, readable text, logos, HUD, data graphics, scan beams, grids, neon, or extra vessels. Do not invent a named location. Do not turn the vessel into a large offshore, oceanographic, naval, or commercial ship. Preserve the factual reference's short length, low deck, simple working layout, and compact wheelhouse.
```

## Visual review

- The compact dark hull, low freeboard, short central angular wheelhouse, broad forward work platform and railings, and modest aft A-frame now follow the actual vessel photo's broad silhouette. The earlier tall multi-level ship shape was removed.
- The yellow twin-hull USV and its sensor mast, size, frame position, heading and wake remain visually consistent with the target image; both craft are visible in the same survey area with the workboat still clearly larger.
- Close inspection after the edit found no people, faces, hands, readable hull text, or logos. No HUD, neon, beams, grids, or fake data were added.
- The high three-quarter view leaves extensive open water around the wakes for later motion and a shallow-water reveal, with a generic coast across the upper frame to support a transition toward C06.
- Coastline and facility detail are generated concept art, not location-accurate geography; verify any future site-specific framing from a factual source before presenting it as a real place.
