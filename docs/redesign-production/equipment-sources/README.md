# GeoSR equipment source archive

This folder preserves eight people-free images exposed by official GeoSR equipment or technology detail pages. It is a factual reference archive, not permission to reuse images. Public availability on geosr.com does not grant copyright or derivative-work rights; get written permission from GeoSR and any third-party rightsholder before publishing, editing, or using an image as an AI-generation reference. Do not reproduce visible logos or text without permission.

`manifest.json` records each file's source page and image URL, exposure type, dimensions, SHA-256, source claims, visual review, and usage caveats. The page audit inspected `img src`, `srcset`, enclosing `a href`, `onclick`/lightbox attributes, and visible content-image links. No guessed upload URLs were used. All eight archived assets were visually reviewed for people and hands; the six-frame USV GIF was checked frame by frame, and none were visible.

Only the three USV assets are exposed by their detail page as original-size image URLs: `usvCom.png`, `USV20S.png`, and the six-frame catamaran GIF. The Hanuri, FireFly6, BlueROV2, and RBR pages expose thumbnails only. For those records, the manifest explicitly marks the archive as thumbnail-only; it does not infer an unlinked higher-resolution path.

Use claims conservatively. GeoSR's FireFly6 detail page identifies the VTOL aircraft and BIRDSEYEVIEW; its BlueROV2 detail page identifies the underwater drone and BlueRobotics & Sexton Co. The RBR detail page names Solo-TU, but the linked thumbnail filename says Solo-T, so the pictured variant remains unresolved. The three USV image files are useful shape/scene references, but the page does not establish a model specification for each image; the `USV20S` filename alone is not treated as model proof.

The old local `dist/assets/usv-source.jpg` is not byte-identical to any inspected official USV file. It looks visually consistent with a crop/resize of the official `USV20S.png` scene, but that lineage is unverified. Treat the archived page-exposed file as the canonical reference. `dist/assets/equipment-vessel.jpg`, `equipment-rov.png`, `usv.png`, and `equipment-icp.png` are byte-identical to the respective page thumbnails noted in `manifest.json`.

No actual buoy/mooring equipment photo or exact TPRBM image source was found on the reviewed official pages. Patent thumbnails that mention buoys or moorings are documents, not physical-equipment photos, and are not archived here as equipment references. These sources remain missing rather than inferred.
