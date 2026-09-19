# Local high-resolution equipment image audit

## Result

Scanned the repository's 68 JPG, JPEG, PNG, WEBP, and GIF files, excluding `.git`, `node_modules`, `build`, cache/temp directories, and the eight source-pack reference files themselves. No unreadable images were skipped. The source-pack references were checked against the remaining repository images using SHA-256, 64-bit grayscale dHash/pHash, and ORB feature matching with RANSAC homography for resize/crop candidates. The animated USV reference and any candidate GIFs were compared frame by frame.

Only two candidates are byte-for-byte copies by SHA-256. Several same-size transparent cutouts and thumbnail copies are strong visual matches, but none supplies higher resolution than its archived reference. One existing USV JPEG is a visually confirmed crop of the official USV20S-labelled scene, but is smaller than that source. No repository asset provides a higher-resolution photo of the target equipment than the official source pack.

Similarity values below use this notation: `ORB inliers / reference-feature coverage; pHash/dHash distance`. ORB coverage is the fraction of reference keypoints included in the geometrically consistent match. Hash distances are Hamming distances out of 64 (lower is closer). SHA-256 equality is definitive byte identity; feature/hash scores nominate visual matches and are not source provenance by themselves.

## Equipment matches

| Equipment reference | Largest matching repository file | Match evidence and visual review | High-resolution result |
|---|---|---|---|
| Hanuri survey vessel (`hanuri-ship-page-thumbnail.jpg`, 440×251) | [`dist/assets/equipment-vessel.jpg`](../../../dist/assets/equipment-vessel.jpg) — 440×251; also [`cutouts/hanuri-ship-cutout.png`](cutouts/hanuri-ship-cutout.png) — 440×251 | `equipment-vessel.jpg` is SHA-256 identical. The cutout is a visually matching background-removed version (ORB 1800 inliers, 100% reference coverage; pHash/dHash 0/0). Contact-sheet matches were manually rejected as embedded thumbnails. | None above 440×251. The cutout does not add detail. |
| FireFly6 image 1 (`firefly6-page-thumbnail-01.png`, 440×267) | [`cutouts/firefly6-01-cutout.png`](cutouts/firefly6-01-cutout.png) — 440×267 | Visually the same aircraft view after background removal (ORB 1690 inliers, 100% coverage; pHash/dHash 0/0). Dimensions remain thumbnail-sized. | None above 440×267. |
| FireFly6 image 2 (`firefly6-page-thumbnail-02.png`, 440×267) | None | The highest-ranked result was [`equipment-source-contact-sheet.png`](equipment-source-contact-sheet.png), which contains the reference as a small panel; this is a contact-sheet false positive, not a larger source. No standalone same-image or crop candidate survived visual review. | None found. |
| BlueROV2 (`bluerov2-page-thumbnail.png`, 440×267) | [`dist/assets/equipment-rov.png`](../../../dist/assets/equipment-rov.png) — 440×267; also [`cutouts/bluerov2-cutout.png`](cutouts/bluerov2-cutout.png) — 440×267 | `equipment-rov.png` is SHA-256 identical. The cutout is a visually matching background-removed version (ORB 1800 inliers, 100% coverage; pHash/dHash 0/0). Larger contact-sheet matches are only small embedded panels. | None above 440×267. |
| RBR Solo-TU page thumbnail (`rbr-solo-tu-page-thumbnail.png`, 440×267) | [`cutouts/rbr-solo-t-cutout.png`](cutouts/rbr-solo-t-cutout.png) — 440×267 | Visually the same product image after background removal (ORB 1095 inliers, 100% coverage; pHash/dHash 0/0). This does not resolve the source-pack's Solo-T/Solo-TU variant mismatch. | None above 440×267. |
| USV, `usvCom.png` (`usv-usvcom-page-original.png`, 1001×601) | [`cutouts/usvcom-cutout.png`](cutouts/usvcom-cutout.png) — 1001×601 | Same image with background removed (ORB 1800 inliers, 100% coverage; pHash/dHash 0/0). [`dist/assets/usv.png`](../../../dist/assets/usv.png) — 440×264 is a smaller same-scene rendition (pHash/dHash 0/0); it is not a high-resolution lead. | None above 1001×601. |
| USV, `USV20S.png`-labelled scene (`usv-usv20s-page-original.png`, 1771×1068) | [`cutouts/usv20s-cutout.png`](cutouts/usv20s-cutout.png) — 1771×1068 | Same source scene with background removed (ORB 1800 inliers, 100% coverage; pHash/dHash 0/0). [`dist/assets/usv-source.jpg`](../../../dist/assets/usv-source.jpg) — 740×580 was manually confirmed as a crop of this scene (591 inliers, 32.8% reference coverage; pHash/dHash 24/20); it is smaller and adds no detail. `.debug-usv20s-grid.png` is a same-size debug-derived match, not a cleaner source. | None above 1771×1068. Keep the official page-exposed file as the highest-resolution reference; do not infer a model from the filename. |
| USV catamaran GIF (`usv-catamaran-page-original.gif`, 1000×608, 6 frames) | None | No byte-identical, resized, or crop-matched repository image was found. The highest-ranked unrelated candidates had at most 9 homography inliers and pHash distance of at least 24/64; visual review rejected them. | None found. |

## False-positive review and limits

Contact sheets contain small copies of some source photos and can produce local feature matches; they are not equipment-photo candidates. Transparent cutouts are same-resolution derivatives rather than higher-resolution sources. The `.debug-usv20s-grid.png` candidate is identified as debug output by both its filename and visible grid-derived treatment, so it is not counted as a usable source. The `usv-source.jpg` crop is visually consistent with the official `USV20S.png`-labelled scene, but the match establishes only shared image content, not the JPEG's original provenance or exact model.

The audit identifies repository files and visual relationships only. It does not grant image reuse rights. The source-pack [README](README.md) and [manifest](manifest.json) remain authoritative for page exposure, model wording, and usage limitations.

## Reproduction

From the repository root, run:

```powershell
python scripts/audit_equipment_image_matches.py --top 10
```

The script excludes the source reference files from the candidate list to prevent trivial self-matches, scans GIF frames, and reports exact hash status, dimensions, ORB/RANSAC matches, feature coverage, and perceptual hash distances. It does not write files unless `--json-out` is explicitly provided. Results still require visual review before identifying two files as the same underlying photo.
