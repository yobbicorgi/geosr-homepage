#!/usr/bin/env python3
"""Build review-only, deterministic alpha cutouts from archived GeoSR source images.

Source RGB samples are copied byte-for-byte into each RGBA output. This script
never changes source files, performs no color correction, inpainting, scaling,
or image generation. The two vessel photographs use manually bounded GrabCut
seeds; Hanuri uses an intentionally provisional polygon because its source is
too small and visually complex for a trustworthy automatic cutout.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont


REPO = Path(__file__).resolve().parents[1]
SOURCE_DIR = REPO / "docs/redesign-production/equipment-sources/originals"
OUTPUT_DIR = REPO / "docs/redesign-production/equipment-sources/cutouts"
MANIFEST_PATH = OUTPUT_DIR / "cutout-manifest.json"
CONTACT_PATH = OUTPUT_DIR / "equipment-cutout-contact-sheet.png"
USV20S_COMPARISON_PATH = OUTPUT_DIR / "usv20s-cutout-v1-v2-comparison.png"


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest().upper()


def polygon_mask(shape: tuple[int, int], points: list[tuple[int, int]]) -> np.ndarray:
    height, width = shape
    mask = np.zeros((height, width), dtype=np.uint8)
    cv2.fillPoly(mask, [np.asarray(points, dtype=np.int32)], 255)
    return mask


def one_pixel_inner_feather(binary: np.ndarray) -> np.ndarray:
    """Return a <=1 px inward antialias ramp; no RGB sample is modified."""
    solid = np.where(binary > 0, 255, 0).astype(np.uint8)
    distance = cv2.distanceTransform((solid > 0).astype(np.uint8), cv2.DIST_L2, 3)
    alpha = np.clip(np.rint(distance * 255.0), 0, 255).astype(np.uint8)
    # Keep the feather confined to the foreground side of the edge.
    alpha[solid == 0] = 0
    return alpha


def white_background_mask(rgb: np.ndarray, threshold: int, protect_polygon: list[tuple[int, int]] | None = None) -> np.ndarray:
    """Remove only near-background pixels connected to the image border."""
    height, width, _ = rgb.shape
    corners = np.concatenate(
        [
            rgb[:8, :8].reshape(-1, 3),
            rgb[:8, -8:].reshape(-1, 3),
            rgb[-8:, :8].reshape(-1, 3),
            rgb[-8:, -8:].reshape(-1, 3),
        ],
        axis=0,
    )
    background_color = np.median(corners, axis=0)
    distance = np.max(np.abs(rgb.astype(np.int16) - background_color.astype(np.int16)), axis=2)
    near_background = (distance <= threshold).astype(np.uint8)
    count, labels = cv2.connectedComponents(near_background, connectivity=8)
    edge_labels = set(np.unique(labels[0, :]).tolist())
    edge_labels.update(np.unique(labels[-1, :]).tolist())
    edge_labels.update(np.unique(labels[:, 0]).tolist())
    edge_labels.update(np.unique(labels[:, -1]).tolist())
    edge_labels.discard(0)
    exterior = np.isin(labels, list(edge_labels))
    if protect_polygon:
        protect = polygon_mask((height, width), protect_polygon) > 0
        exterior &= ~protect
    return np.where(exterior, 0, 255).astype(np.uint8)


def seeded_grabcut_mask(
    rgb: np.ndarray,
    object_polygon: list[tuple[int, int]],
    foreground_polygons: list[list[tuple[int, int]]],
    background_polygons: list[list[tuple[int, int]]],
    iterations: int = 8,
) -> np.ndarray:
    """Segment inside a reviewed polygon with explicit foreground/background seeds."""
    height, width, _ = rgb.shape
    bounded = polygon_mask((height, width), object_polygon)
    gc_mask = np.full((height, width), cv2.GC_BGD, dtype=np.uint8)
    gc_mask[bounded > 0] = cv2.GC_PR_FGD
    for points in background_polygons:
        patch = polygon_mask((height, width), points) > 0
        gc_mask[patch] = cv2.GC_BGD
    for points in foreground_polygons:
        patch = polygon_mask((height, width), points) > 0
        gc_mask[patch] = cv2.GC_FGD
    bgd_model = np.zeros((1, 65), dtype=np.float64)
    fgd_model = np.zeros((1, 65), dtype=np.float64)
    cv2.setRNGSeed(271828)
    cv2.grabCut(
        cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR),
        gc_mask,
        None,
        bgd_model,
        fgd_model,
        iterations,
        cv2.GC_INIT_WITH_MASK,
    )
    foreground = np.isin(gc_mask, (cv2.GC_FGD, cv2.GC_PR_FGD))
    foreground &= bounded > 0
    return np.where(foreground, 255, 0).astype(np.uint8)


def specifications() -> list[dict]:
    return [
        {
            "id": "hanuri-ship",
            "source": "hanuri-ship-page-thumbnail.jpg",
            "output": "hanuri-ship-cutout.png",
            "method": "manual polygon silhouette (provisional; too low-resolution/complex for trusted automatic extraction)",
            "polygon": [(24, 157), (37, 150), (45, 138), (59, 132), (148, 132), (177, 125), (185, 113), (197, 109), (199, 94), (211, 91), (216, 70), (224, 69), (228, 105), (237, 112), (247, 111), (248, 102), (260, 101), (271, 105), (278, 88), (289, 86), (297, 92), (301, 112), (348, 113), (355, 119), (390, 121), (391, 131), (380, 139), (356, 146), (333, 150), (310, 160), (307, 174), (286, 182), (266, 191), (232, 199), (84, 201), (72, 190), (55, 181), (37, 180), (28, 171)],
            "decision": "manual mask/new photo required",
            "review_note": "Low-resolution 440x251 boat photo with busy water/background and thin deck railings. Polygon is a non-approved review aid; request a high-resolution isolated or shared-scene photo before production.",
        },
        {
            "id": "usv20s",
            "source": "usv-usv20s-page-original.png",
            "output": "usv20s-cutout.png",
            "method": "OpenCV GrabCut with explicit probable-object polygon and foreground/background seed polygons; reflection clipped outside the reviewed vessel envelope",
            "polygon": [(350, 565), (394, 548), (475, 548), (576, 552), (620, 538), (653, 507), (674, 457), (702, 417), (751, 379), (773, 332), (797, 316), (821, 319), (837, 340), (851, 410), (923, 421), (955, 399), (986, 402), (1027, 415), (1066, 435), (1082, 403), (1114, 401), (1152, 428), (1179, 465), (1202, 481), (1243, 523), (1281, 563), (1290, 590), (1274, 613), (1233, 628), (1180, 637), (1128, 633), (1065, 647), (993, 660), (920, 672), (850, 684), (757, 698), (672, 710), (581, 707), (500, 696), (436, 681), (384, 656), (358, 616)],
            "foreground": [
                [(405, 587), (535, 572), (616, 585), (618, 658), (520, 670), (438, 650)],
                [(700, 520), (758, 485), (838, 467), (1000, 470), (1103, 501), (1160, 558), (1100, 598), (865, 620), (682, 590)],
                [(700, 615), (930, 604), (1118, 591), (1250, 575), (1261, 608), (1115, 641), (940, 660), (780, 679), (658, 680)],
            ],
            "background": [
                [(650, 710), (770, 712), (920, 710), (1100, 710), (1260, 710), (1260, 735), (650, 735)],
                [(340, 510), (465, 510), (520, 535), (420, 540), (340, 535)],
                [(1245, 490), (1340, 500), (1380, 550), (1310, 560), (1270, 540)],
            ],
            "decision": "manual mask/new photo required",
            "review_note": "Higher-resolution vessel photo than the page thumbnails, but the open sensor frame exposes woodland behind the craft and water reflection sits close to the lower hull. The current review mask still retains visible background through the frame; do not approve as a clean cutout. A careful manual mask or new isolated/shared-scene photo is required.",
            "v2_open_frame_polygons": [[(685, 414), (722, 405), (760, 406), (784, 397), (820, 398), (860, 399), (905, 399), (951, 397), (1000, 399), (1046, 403), (1091, 407), (1135, 420), (1164, 441), (1174, 473), (1162, 508), (1138, 531), (1100, 540), (1064, 535), (1020, 531), (980, 531), (941, 535), (900, 537), (857, 538), (817, 541), (780, 538), (748, 524), (718, 507), (695, 486), (660, 514), (620, 535), (600, 520), (604, 480), (625, 450), (660, 433)], [(600, 425), (795, 425), (795, 550), (600, 550)]],
            "v2_interior_background_seed_polygons": [[(685, 414), (722, 405), (760, 406), (784, 397), (820, 398), (860, 399), (905, 399), (951, 397), (1000, 399), (1046, 403), (1091, 407), (1135, 420), (1164, 441), (1174, 473), (1162, 508), (1138, 531), (1100, 540), (1064, 535), (1020, 531), (980, 531), (941, 535), (900, 537), (857, 538), (817, 541), (780, 538), (748, 524), (718, 507), (695, 486), (660, 514), (620, 535), (600, 520), (604, 480), (625, 450), (660, 433)], [(600, 425), (795, 425), (795, 550), (600, 550)]],
            "v2_review_note": "The HSV-connected pass removes the green tree/lake backdrop in the manually inspected open sensor-frame windows, including the left opening. Low-saturation gray/black frame, cables, antenna and yellow hull are outside the green threshold. Green pixels remain near the lower hull where the source reflection/shadow cannot be safely separated; those pixels are intentionally retained. Inspect supports and lower-hull fringe at native size.",
        },
        {
            "id": "usvcom",
            "source": "usv-usvcom-page-original.png",
            "output": "usvcom-cutout.png",
            "method": "OpenCV GrabCut with explicit probable-object polygon and foreground/background seed polygons; hull/wake boundary kept inside the reviewed craft envelope",
            "polygon": [(354, 346), (382, 330), (410, 307), (449, 294), (491, 287), (522, 279), (557, 278), (581, 283), (591, 258), (601, 255), (610, 281), (641, 275), (660, 260), (688, 263), (708, 283), (725, 304), (746, 319), (758, 333), (750, 354), (736, 372), (719, 385), (700, 392), (678, 400), (652, 405), (619, 412), (575, 414), (522, 411), (473, 403), (430, 394), (398, 386), (373, 373), (360, 360)],
            "foreground": [
                [(396, 352), (450, 337), (504, 337), (554, 347), (598, 359), (641, 356), (692, 344), (737, 345), (730, 374), (683, 396), (622, 408), (556, 410), (493, 401), (432, 390), (397, 375)],
                [(617, 289), (641, 281), (672, 279), (693, 294), (707, 321), (674, 339), (634, 340)],
            ],
            "background": [
                [(280, 300), (340, 290), (352, 340), (345, 390), (300, 410), (270, 365)],
                [(770, 320), (830, 320), (860, 375), (810, 420), (760, 390)],
                [(380, 440), (490, 447), (610, 447), (750, 445), (780, 460), (380, 460)],
            ],
            "decision": "manual mask/new photo required",
            "review_note": "Open-water photo has white foam close to the underside. A tighter hull envelope suppresses more wake, but the preview remains vulnerable to clipped black hull detail at the bow/stern; review at native size before accepting. Alpha channel in the source is not a cutout (only its final row was transparent).",
        },
        {
            "id": "firefly6-01",
            "source": "firefly6-page-thumbnail-01.png",
            "output": "firefly6-01-cutout.png",
            "method": "near-white corner-color distance threshold, 8-connected exterior-only background removal, aircraft-protect polygon, <=1 px inward feather",
            "threshold": 33,
            "polygon": [(42, 116), (186, 114), (199, 101), (209, 82), (219, 68), (229, 86), (240, 106), (250, 115), (389, 107), (391, 124), (275, 137), (253, 144), (239, 173), (229, 201), (213, 207), (200, 186), (190, 161), (178, 145), (42, 131)],
            "decision": "small catalog/reference use only; high-resolution photo recommended",
            "review_note": "White wings can be mistaken for the white page background. The aircraft-protect polygon intentionally preserves internal white pixels, including some enclosed gaps. A faint light matte edge remains around parts of the wing; check wing tips and lift propellers, and do not place this low-resolution cutout over a dark background without manual approval.",
        },
        {
            "id": "bluerov2",
            "source": "bluerov2-page-thumbnail.png",
            "output": "bluerov2-cutout.png",
            "method": "near-white corner-color distance threshold, 8-connected exterior-only background removal, <=1 px inward feather",
            "threshold": 35,
            "decision": "small catalog/reference use only; high-resolution photo recommended",
            "review_note": "Open cage rails and thrusters are delicate at 440x267. Exterior-only flood removal preserves enclosed white product details; inspect thin rail intersections and blue pod edges before use.",
        },
        {
            "id": "rbr-solo-t",
            "source": "rbr-solo-tu-page-thumbnail.png",
            "output": "rbr-solo-t-cutout.png",
            "method": "near-white corner-color distance threshold, 8-connected exterior-only background removal, <=1 px inward feather",
            "threshold": 32,
            "decision": "small detail insert only; exact model/photo verification required",
            "review_note": "Clean white product field can be removed; preserve the printed RBR Solo-T label. Source page title says Solo-TU while this image filename says Solo-T, so do not represent the cutout as a confirmed Solo-TU unit.",
        },
    ]


def build_mask(rgb: np.ndarray, spec: dict) -> np.ndarray:
    method = spec["method"]
    if method.startswith("near-white"):
        protect = spec.get("polygon")
        binary = white_background_mask(rgb, spec["threshold"], protect)
    elif spec["id"] == "hanuri-ship":
        binary = polygon_mask(rgb.shape[:2], spec["polygon"])
    else:
        binary = seeded_grabcut_mask(
            rgb,
            spec["polygon"],
            spec["foreground"],
            spec["background"],
        )
    return one_pixel_inner_feather(binary)


def make_checkerboard(size: tuple[int, int], cell: int = 18) -> Image.Image:
    width, height = size
    board = Image.new("RGB", size, "#f2f2f2")
    draw = ImageDraw.Draw(board)
    for y in range(0, height, cell):
        for x in range(0, width, cell):
            if (x // cell + y // cell) % 2:
                draw.rectangle((x, y, min(x + cell - 1, width - 1), min(y + cell - 1, height - 1)), fill="#d8d8d8")
    return board


def build_contact_sheet(records: list[dict]) -> None:
    columns, tile_width, tile_height, margin, gap = 3, 760, 520, 24, 20
    rows = (len(records) + columns - 1) // columns
    sheet = Image.new(
        "RGB",
        (2 * margin + columns * tile_width + (columns - 1) * gap, 2 * margin + rows * tile_height + (rows - 1) * gap),
        "#e8edf0",
    )
    draw = ImageDraw.Draw(sheet)
    try:
        name_font = ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", 21)
        status_font = ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", 17)
    except OSError:
        name_font = status_font = ImageFont.load_default()

    for i, item in enumerate(records):
        col, row = i % columns, i // columns
        x = margin + col * (tile_width + gap)
        y = margin + row * (tile_height + gap)
        draw.rounded_rectangle((x, y, x + tile_width - 1, y + tile_height - 1), radius=10, fill="#f8f9fa", outline="#bbc5cc", width=2)
        rgba = Image.open(OUTPUT_DIR / item["output"]).convert("RGBA")
        max_w, max_h = tile_width - 36, 432
        scale = min(max_w / rgba.width, max_h / rgba.height)
        w, h = max(1, round(rgba.width * scale)), max(1, round(rgba.height * scale))
        rgba = rgba.resize((w, h), Image.Resampling.LANCZOS)
        preview = make_checkerboard((w, h))
        preview.paste(rgba, (0, 0), rgba.getchannel("A"))
        px = x + (tile_width - w) // 2
        py = y + 10 + (max_h - h) // 2
        sheet.paste(preview, (px, py))
        draw.text((x + 16, y + 454), item["output"], fill="#172833", font=name_font)
        draw.text((x + 16, y + 485), f'{item["decision"]} · {item["source_dimensions"]}', fill="#52616a", font=status_font)
    sheet.save(CONTACT_PATH, format="PNG", optimize=True)


def usv20s_v2_mask(rgb: np.ndarray, v1_alpha: np.ndarray, spec: dict) -> np.ndarray:
    """Remove green forest/lake pixels in the reviewed open-frame window only."""
    hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV)
    hue, saturation, value = cv2.split(hsv)
    green_background = (
        (hue >= 28)
        & (hue <= 105)
        & (saturation >= 40)
        & (value <= 215)
    ).astype(np.uint8)

    _, labels = cv2.connectedComponents(green_background, connectivity=8)
    background_labels = set(np.unique(labels[0, :]).tolist())
    background_labels.update(np.unique(labels[-1, :]).tolist())
    background_labels.update(np.unique(labels[:, 0]).tolist())
    background_labels.update(np.unique(labels[:, -1]).tolist())
    background_labels.discard(0)

    height, width = rgb.shape[:2]
    open_frame = np.zeros((height, width), dtype=bool)
    for points in spec["v2_open_frame_polygons"]:
        open_frame |= polygon_mask((height, width), points) > 0
    interior_seed = np.zeros((height, width), dtype=bool)
    for points in spec["v2_interior_background_seed_polygons"]:
        interior_seed |= polygon_mask((height, width), points) > 0
    interior_labels = set(np.unique(labels[interior_seed & (green_background > 0)]).tolist())
    interior_labels.discard(0)
    background_labels.update(interior_labels)

    connected_bg = np.isin(labels, list(background_labels)) & (green_background > 0)
    remove = connected_bg & open_frame & (v1_alpha > 0)
    refined = v1_alpha.copy()
    refined[remove] = 0
    return one_pixel_inner_feather(refined > 0)


def build_usv20s_comparison() -> None:
    """Create a two-panel checkerboard comparison without replacing v1."""
    tile_w, tile_h, margin, gap = 1100, 720, 24, 22
    sheet = Image.new("RGB", (2 * margin + 2 * tile_w + gap, 2 * margin + tile_h), "#e8edf0")
    draw = ImageDraw.Draw(sheet)
    try:
        title_font = ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", 24)
        note_font = ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", 18)
    except OSError:
        title_font = note_font = ImageFont.load_default()
    panels = [
        ("USV20S cutout v1 · GrabCut baseline", OUTPUT_DIR / "usv20s-cutout.png", "Original v1 file; unchanged"),
        ("USV20S cutout v2 · green-background refinement", OUTPUT_DIR / "usv20s-cutout-v2.png", "HSV + connected components + interior background seeds"),
    ]
    for i, (title, path, note) in enumerate(panels):
        x, y = margin + i * (tile_w + gap), margin
        draw.rounded_rectangle((x, y, x + tile_w - 1, y + tile_h - 1), radius=10, fill="#f8f9fa", outline="#bbc5cc", width=2)
        rgba = Image.open(path).convert("RGBA")
        max_w, max_h = tile_w - 32, tile_h - 86
        scale = min(max_w / rgba.width, max_h / rgba.height)
        w, h = max(1, round(rgba.width * scale)), max(1, round(rgba.height * scale))
        rgba = rgba.resize((w, h), Image.Resampling.LANCZOS)
        preview = make_checkerboard((w, h))
        preview.paste(rgba, (0, 0), rgba.getchannel("A"))
        sheet.paste(preview, (x + (tile_w - w) // 2, y + 10 + (max_h - h) // 2))
        draw.text((x + 16, y + tile_h - 67), title, fill="#172833", font=title_font)
        draw.text((x + 16, y + tile_h - 34), note, fill="#52616a", font=note_font)
    sheet.save(USV20S_COMPARISON_PATH, format="PNG", optimize=True)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest: dict = {
        "title": "GeoSR equipment alpha cutout review set",
        "revision": 1,
        "generated_at": "2026-09-20",
        "purpose": "Deterministic, review-only alpha masks from archived official page images. Not a publication-ready cutout approval.",
        "source_rgb_policy": "Output RGB bytes at every alpha>0 pixel are copied exactly from the source image's RGB conversion. No color correction, inpainting, resizing of cutout outputs, or image generation.",
        "rights_notice": "Archive and cutouts remain subject to source-image permission requirements. Alpha extraction does not grant reuse rights.",
        "items": [],
    }
    records: list[dict] = []
    errors: list[str] = []

    for spec in specifications():
        source_path = SOURCE_DIR / spec["source"]
        output_path = OUTPUT_DIR / spec["output"]
        with Image.open(source_path) as opened:
            source_rgb = np.asarray(opened.convert("RGB"), dtype=np.uint8)
        alpha = build_mask(source_rgb, spec)
        rgba = np.dstack((source_rgb, alpha))
        Image.fromarray(rgba, mode="RGBA").save(output_path, format="PNG", optimize=True)

        alpha_positive = alpha > 0
        alpha_opaque = alpha == 255
        if np.any(alpha_positive):
            ys, xs = np.where(alpha_positive)
            visible_bbox = [int(xs.min()), int(ys.min()), int(xs.max() + 1), int(ys.max() + 1)]
        else:
            visible_bbox = None
        if np.any(alpha_opaque):
            ys, xs = np.where(alpha_opaque)
            opaque_bbox = [int(xs.min()), int(ys.min()), int(xs.max() + 1), int(ys.max() + 1)]
        else:
            opaque_bbox = None
        preserved = bool(np.array_equal(rgba[alpha_positive, :3], source_rgb[alpha_positive]))
        if not preserved:
            errors.append(f"RGB mismatch in {spec['output']}")

        record = {
            "id": spec["id"],
            "source_file": f"../originals/{spec['source']}",
            "output_file": spec["output"],
            "source_sha256": sha256(source_path),
            "output_sha256": sha256(output_path),
            "source_dimensions": f"{source_rgb.shape[1]}x{source_rgb.shape[0]}",
            "output_dimensions": f"{rgba.shape[1]}x{rgba.shape[0]}",
            "opaque_bbox_xyxy": opaque_bbox,
            "visible_bbox_xyxy": visible_bbox,
            "alpha_coverage_fraction": round(float(alpha_positive.mean()), 6),
            "opaque_coverage_fraction": round(float(alpha_opaque.mean()), 6),
            "nonzero_alpha_pixel_count": int(alpha_positive.sum()),
            "partial_alpha_pixel_count": int(np.count_nonzero((alpha > 0) & (alpha < 255))),
            "rgb_preserved_for_all_alpha_positive_pixels": preserved,
            "mask_method": spec["method"],
            "maximum_feather_px": 1,
            "decision": spec["decision"],
            "visual_review_note": spec["review_note"],
        }
        manifest["items"].append(record)
        records.append({**record, **spec})

    usv20s_spec = next(item for item in specifications() if item["id"] == "usv20s")
    usv20s_source = SOURCE_DIR / usv20s_spec["source"]
    with Image.open(usv20s_source) as opened:
        usv20s_rgb = np.asarray(opened.convert("RGB"), dtype=np.uint8)
    usv20s_v1_alpha = build_mask(usv20s_rgb, usv20s_spec)
    usv20s_v2_alpha = usv20s_v2_mask(usv20s_rgb, usv20s_v1_alpha, usv20s_spec)
    usv20s_v2_rgba = np.dstack((usv20s_rgb, usv20s_v2_alpha))
    usv20s_v2_path = OUTPUT_DIR / "usv20s-cutout-v2.png"
    Image.fromarray(usv20s_v2_rgba, mode="RGBA").save(usv20s_v2_path, format="PNG", optimize=True)
    v2_positive = usv20s_v2_alpha > 0
    v2_opaque = usv20s_v2_alpha == 255
    v2_ys, v2_xs = np.where(v2_opaque)
    v2_bbox = [int(v2_xs.min()), int(v2_ys.min()), int(v2_xs.max() + 1), int(v2_ys.max() + 1)] if len(v2_xs) else None
    v2_visible_ys, v2_visible_xs = np.where(v2_positive)
    v2_visible_bbox = [int(v2_visible_xs.min()), int(v2_visible_ys.min()), int(v2_visible_xs.max() + 1), int(v2_visible_ys.max() + 1)] if len(v2_visible_xs) else None
    v2_rgb_preserved = bool(np.array_equal(usv20s_v2_rgba[v2_positive, :3], usv20s_rgb[v2_positive]))
    if not v2_rgb_preserved:
        errors.append("RGB mismatch in usv20s-cutout-v2.png")
    original_v1 = next(item for item in manifest["items"] if item["id"] == "usv20s")
    manifest["variants"] = [
        {
            "id": "usv20s-v2",
            "source_file": f"../originals/{usv20s_spec['source']}",
            "output_file": "usv20s-cutout-v2.png",
            "source_sha256": sha256(usv20s_source),
            "output_sha256": sha256(usv20s_v2_path),
            "source_dimensions": f"{usv20s_rgb.shape[1]}x{usv20s_rgb.shape[0]}",
            "output_dimensions": f"{usv20s_v2_rgba.shape[1]}x{usv20s_v2_rgba.shape[0]}",
            "v1_output_sha256": sha256(OUTPUT_DIR / "usv20s-cutout.png"),
            "v1_output_preserved": True,
            "same_source_as_v1": sha256(usv20s_source) == original_v1["source_sha256"],
            "opaque_bbox_xyxy": v2_bbox,
            "visible_bbox_xyxy": v2_visible_bbox,
            "alpha_coverage_fraction": round(float(v2_positive.mean()), 6),
            "opaque_coverage_fraction": round(float(v2_opaque.mean()), 6),
            "nonzero_alpha_pixel_count": int(v2_positive.sum()),
            "partial_alpha_pixel_count": int(np.count_nonzero((usv20s_v2_alpha > 0) & (usv20s_v2_alpha < 255))),
            "rgb_preserved_for_all_alpha_positive_pixels": v2_rgb_preserved,
            "mask_method": "v1 GrabCut alpha refined with HSV green-background threshold, connected components, explicit open-frame polygon and interior background seed window",
            "hsv_background_range_opencv": {"hue": [28, 105], "saturation_min": 40, "value_max": 215},
            "maximum_feather_px": 1,
            "quality_status": "candidate for main review; not approved for final compositing",
            "remaining_risk": usv20s_spec["v2_review_note"],
        }
    ]

    if errors:
        raise RuntimeError("; ".join(errors))

    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    build_contact_sheet(records)
    build_usv20s_comparison()
    print(f"Created {len(records)} cutouts in {OUTPUT_DIR}")
    print(f"Manifest: {MANIFEST_PATH}")
    print(f"Contact sheet: {CONTACT_PATH}")
    print(f"USV20S v1/v2 comparison: {USV20S_COMPARISON_PATH}")
    print("All RGB preservation checks passed.")


if __name__ == "__main__":
    main()
