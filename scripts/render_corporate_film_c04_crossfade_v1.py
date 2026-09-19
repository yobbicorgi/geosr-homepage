"""Render three single-layer C04 crossfade references from NASA/GIBS sources.

Each frame contains one complete plate over the same factual NASA basemap.
Transparent GIBS gaps show that plate's matching basemap rather than invented
data. These are internal motion references, not final film frames/results.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path
import tempfile
import urllib.request

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

REPO = Path(__file__).resolve().parents[1]
SOURCE_DIR = REPO / "docs/redesign-production/keyframes/sources/corporate-film-c04-v1"
SOURCE_MANIFEST = SOURCE_DIR / "gibs-c04-source-manifest.json"
ASSET_DIR = REPO / "dist/assets/concepts/corporate-film"
DOC_DIR = REPO / "docs/redesign-production/keyframes"
SIZE = (2560, 1440)
OUTPUTS = {
    "sst": "hero-earth-22s-a-sst-v1.png",
    "sss": "hero-earth-22s-b-salinity-v1.png",
    "chlorophyll": "hero-earth-22s-c-chlorophyll-v1.png",
}
CONTACT_SHEET = "corporate-c04-data-layers-crossfade-v1-contact-sheet.png"
MANIFEST = "corporate-film-data-layers-crossfade-v1-render-manifest.json"
FRAME_SIZE = (1333, 750)
PROJECTED_HEIGHT = FRAME_SIZE[1]
PLATE_X = (SIZE[0] - FRAME_SIZE[0] - 2) // 2
PLATE_Y = {
    key: (SIZE[1] - FRAME_SIZE[1] - 2) // 2
    for key in ("sst", "sss", "chlorophyll")
}
SKEW = 16
NASA_BASEMAP_URL = "https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/august/world.200408.3x5400x2700.jpg"
NASA_BASEMAP_FILE = SOURCE_DIR / "nasa-blue-marble-august-2004-5400x2700.jpg"
NASA_BASEMAP_SHA256 = "2048023CCC62250C677C0F4B03D4362F997B130EB0154A6CAD00AA1B27C390B9"
CAMERA_18 = {
    "center_lon_deg": 128.0,
    "center_lat_deg": 36.0,
    "frame_center_px": [1280, 720],
    "globe_radius_px": 2700,
    "source_reference": "accepted C03 hero-earth-18s-v1.png",
}
CAMERA_24 = {
    "center_lon_deg": 127.4,
    "center_lat_deg": 35.0,
    "frame_center_px": [1280, 720],
    "globe_radius_px": 4100,
    "source_reference": "accepted deterministic hero-earth-24s-v1.png, reused byte-for-byte",
}
SOURCE_FILES = {
    "sst": "gibs-modis-aqua-sst-monthly-2012-08-01-epsg4326.png",
    "sss": "gibs-aquarius-salinity-monthly-2012-08-01-epsg4326.png",
    "chlorophyll": "gibs-modis-aqua-chlorophyll-l2-daily-2012-08-01-epsg4326.png",
}


def digest(path: Path) -> str:
    sha = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            sha.update(block)
    return sha.hexdigest().upper()


def load_sources() -> tuple[dict, dict[str, Image.Image]]:
    manifest = json.loads(SOURCE_MANIFEST.read_text(encoding="utf-8"))
    common = manifest["request_common"]
    if manifest["requested_time"] != "2012-08-01" or manifest["nearest_value"] != 0:
        raise ValueError("Unexpected GIBS requested date or nearestValue.")
    if common["SRS"] != "EPSG:4326" or common["BBOX"] != "90,15,166,57.75":
        raise ValueError("Unexpected GIBS projection or shared extent.")
    records = {record["key"]: record for record in manifest["captures"]}
    images: dict[str, Image.Image] = {}
    for key, name in SOURCE_FILES.items():
        path = SOURCE_DIR / name
        if digest(path) != records[key]["sha256"]:
            raise ValueError(f"GIBS source capture hash mismatch: {path}")
        image = Image.open(path).convert("RGBA")
        if image.size != SIZE:
            raise ValueError(f"Unexpected GIBS source dimensions: {path} {image.size}")
        images[key] = image
    return records, images


def render_nasa_basemap() -> tuple[Image.Image, str]:
    if not NASA_BASEMAP_FILE.is_file():
        raise FileNotFoundError(f"NASA August BMNG source not found: {NASA_BASEMAP_FILE}")
    texture_sha = digest(NASA_BASEMAP_FILE)
    if texture_sha != NASA_BASEMAP_SHA256:
        raise ValueError("NASA August BMNG source checksum mismatch.")
    texture = Image.open(NASA_BASEMAP_FILE).convert("RGB")
    if texture.size != (5400, 2700):
        raise ValueError(f"Expected 5400x2700 NASA global Plate Carrée texture, got {texture.size}.")
    # Global Plate Carrée crop for the exact GIBS EPSG:4326 extent.
    crop = texture.crop((4050.0, 483.75, 5190.0, 1125.0))
    region = crop.resize(FRAME_SIZE, Image.Resampling.LANCZOS)
    gray = ImageOps.grayscale(region)
    base_map = ImageOps.colorize(gray, black=(9, 17, 25), white=(124, 139, 149))
    base_map = ImageEnhance.Contrast(base_map).enhance(0.82)
    return base_map.convert("RGB"), texture_sha


def bilinear_colormap_keep_mask(source: Image.Image, output_size: tuple[int, int]) -> Image.Image:
    """Build a soft display derivative while preserving the categorical gaps."""
    source_array = np.asarray(source.convert("RGBA"), dtype=np.uint8)
    valid = source_array[:, :, 3] > 0
    control_size = (max(2, output_size[0] // 4), max(2, output_size[1] // 4))
    weights_image = Image.fromarray((valid.astype(np.uint8) * 255), mode="L")
    weights_control = weights_image.resize(control_size, Image.Resampling.BOX)
    weights = np.asarray(weights_control.resize(output_size, Image.Resampling.BILINEAR), dtype=np.float32) / 255.0
    # Nearest sampling preserves a categorical observed/unobserved mask. No
    # interpolation, filling, or alpha feathering is applied to no-data gaps.
    alpha = np.asarray(
        Image.fromarray(source_array[:, :, 3], mode="L").resize(output_size, Image.Resampling.NEAREST),
        dtype=np.uint8,
    )
    rgb = np.zeros((output_size[1], output_size[0], 3), dtype=np.uint8)
    for channel in range(3):
        premultiplied = np.where(valid, source_array[:, :, channel], 0).astype(np.uint8)
        control = Image.fromarray(premultiplied, mode="L").resize(control_size, Image.Resampling.BOX)
        resized = np.asarray(control.resize(output_size, Image.Resampling.BILINEAR), dtype=np.float32)
        values = np.divide(resized, weights, out=np.zeros_like(resized), where=weights > 0.001)
        rgb[:, :, channel] = np.clip(values, 0, 255).astype(np.uint8)
    rgba = np.dstack((rgb, alpha))
    return Image.fromarray(rgba, mode="RGBA")


def plate_raster(source: Image.Image, base_map: Image.Image, smooth_rgb: bool = False) -> Image.Image:
    """Overlay observed cells on the identical-extent NASA geographic base."""
    width, height = FRAME_SIZE
    resized = (
        bilinear_colormap_keep_mask(source, FRAME_SIZE)
        if smooth_rgb
        else source.resize(FRAME_SIZE, Image.Resampling.NEAREST)
    )
    if base_map.size != FRAME_SIZE:
        raise ValueError("NASA plate basemap and GIBS layers must have identical dimensions.")
    inner_plate = base_map.convert("RGBA").copy()
    inner_plate.alpha_composite(resized)
    # Transparent source cells show the same factual base map, never a fill.
    source_alpha = np.asarray(source.getchannel("A").resize(FRAME_SIZE, Image.Resampling.NEAREST))
    underlay_pixels = np.asarray(base_map.convert("RGB"))
    composed_pixels = np.asarray(inner_plate.convert("RGB"))
    if not np.array_equal(composed_pixels[source_alpha == 0], underlay_pixels[source_alpha == 0]):
        raise ValueError("A no-data cell does not reveal the NASA base map unchanged.")
    plate = Image.new("RGBA", (width + 2, height + 2), (0, 0, 0, 0))
    plate.alpha_composite(inner_plate, (1, 1))
    ImageDraw.Draw(plate).rectangle(
        (0, 0, width + 1, height + 1),
        outline=(177, 198, 207, 145),
        width=1,
    )
    return plate


def perspective_coefficients(source_size: tuple[int, int], quad: list[tuple[float, float]]) -> tuple[float, ...]:
    source_points = [
        (0.0, 0.0),
        (source_size[0] - 1.0, 0.0),
        (source_size[0] - 1.0, source_size[1] - 1.0),
        (0.0, source_size[1] - 1.0),
    ]
    matrix: list[list[float]] = []
    values: list[float] = []
    for (x, y), (u, v) in zip(quad, source_points):
        matrix.append([x, y, 1.0, 0.0, 0.0, 0.0, -u * x, -u * y])
        values.append(u)
        matrix.append([0.0, 0.0, 0.0, x, y, 1.0, -v * x, -v * y])
        values.append(v)
    return tuple(float(v) for v in np.linalg.solve(np.asarray(matrix), np.asarray(values)))


def plate_quad(position: tuple[int, int]) -> list[tuple[float, float]]:
    width, height = FRAME_SIZE
    x, y = position
    return [
        (x + SKEW, y),
        (x + width + 2 - SKEW, y + 8),
        (x + width + 2, y + PROJECTED_HEIGHT),
        (x, y + PROJECTED_HEIGHT - 8),
    ]


def warp_plate(
    source: Image.Image,
    quad: list[tuple[float, float]],
    smooth_colormap: bool = False,
) -> Image.Image:
    coefficients = perspective_coefficients(source.size, quad)
    if not smooth_colormap:
        return source.transform(
            SIZE,
            Image.Transform.PERSPECTIVE,
            coefficients,
            resample=Image.Resampling.NEAREST,
            fillcolor=(0, 0, 0, 0),
        )

    # Smooth only the salinity color field. Keep its categorical alpha mask on
    # nearest sampling, then restore only the neutral border color so no-data
    # remains transparent and interpolation cannot paint into a gap.
    source_rgba = source.convert("RGBA")
    warped_rgb = np.stack(
        [
            np.asarray(
                source_rgba.getchannel(channel).transform(
                    SIZE,
                    Image.Transform.PERSPECTIVE,
                    coefficients,
                    resample=Image.Resampling.BILINEAR,
                    fillcolor=0,
                ),
                dtype=np.uint8,
            )
            for channel in range(3)
        ],
        axis=2,
    )
    alpha = np.asarray(
        source_rgba.getchannel("A").transform(
            SIZE,
            Image.Transform.PERSPECTIVE,
            coefficients,
            resample=Image.Resampling.NEAREST,
            fillcolor=0,
        ),
        dtype=np.uint8,
    )
    warped_rgb[alpha == 145] = (177, 198, 207)
    warped_rgb[alpha == 0] = (0, 0, 0)
    return Image.fromarray(np.dstack((warped_rgb, alpha)), mode="RGBA")


def layer_frame(background: Image.Image, layers: list[tuple[Image.Image, str, bool]]) -> Image.Image:
    frame = background.convert("RGBA")
    for plate, key, smooth_colormap in layers:
        quad = plate_quad((PLATE_X, PLATE_Y[key]))
        warped = warp_plate(plate, quad, smooth_colormap)
        shifted_mask = Image.new("L", SIZE, 0)
        shifted_mask.paste(warped.getchannel("A"), (5, 8))
        shadow_alpha = shifted_mask.filter(ImageFilter.GaussianBlur(7)).point(lambda value: min(18, round(value * 0.07)))
        shadow = Image.new("RGBA", SIZE, (0, 0, 0, 0))
        shadow.putalpha(shadow_alpha)
        frame = Image.alpha_composite(frame, shadow)
        frame = Image.alpha_composite(
            frame,
            warped,
        )
    return frame.convert("RGB")


def make_contact_sheet(frame_paths: list[tuple[str, Path]]) -> Path:
    thumb_w, thumb_h, footer_h = 800, 450, 58
    margin, gap = 28, 22
    sheet = Image.new(
        "RGB",
        (margin * 2 + len(frame_paths) * thumb_w + (len(frame_paths) - 1) * gap, margin * 2 + thumb_h + footer_h),
        (7, 13, 20),
    )
    draw = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 22)
    except OSError:
        font = ImageFont.load_default()
    for index, (label, path) in enumerate(frame_paths):
        x, y = margin + index * (thumb_w + gap), margin
        thumb = Image.open(path).convert("RGB").resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
        sheet.paste(thumb, (x, y))
        draw.text((x, y + thumb_h + 14), label, fill=(219, 230, 235), font=font)
    contact = DOC_DIR / CONTACT_SHEET
    sheet.save(contact, format="PNG", optimize=True)
    return contact


def main() -> None:
    records, sources = load_sources()
    base_path = ASSET_DIR / "hero-earth-18s-v1.png"
    approved_20_path = ASSET_DIR / "hero-earth-20s-v2.png"
    approved_24_path = ASSET_DIR / "hero-earth-24s-v1.png"
    base = Image.open(base_path).convert("RGB")
    if base.size != SIZE:
        raise ValueError("The accepted 18s geography reference must be 2560x1440.")

    basemap, basemap_sha = render_nasa_basemap()
    # One centered full plate per frame. The only visual change between frames
    # is the selected source layer, making a simple crossfade honest and clear.
    ordered_layers = ["sst", "sss", "chlorophyll"]
    output_paths: dict[str, Path] = {}
    frame_entries: dict[str, dict] = {}
    contact_items: list[tuple[str, Path]] = [("20s · approved factual SST reference", approved_20_path)]
    shared_quad = [list(point) for point in plate_quad((PLATE_X, PLATE_Y["sst"]))]
    shared_plate = {
        "source_dimensions_px": [FRAME_SIZE[0] + 2, FRAME_SIZE[1] + 2],
        "position_xy_px": [PLATE_X, PLATE_Y["sst"]],
        "quad_xy_px": shared_quad,
        "source_bbox_same": True,
        "same_camera_and_perspective_across_frames": True,
        "screen_width_fraction": round((FRAME_SIZE[0] + 2) / SIZE[0], 4),
        "source_rgb_resampling": "per-layer method listed on each frame",
        "data_alpha_mask": "nearest-neighbor source GIBS alpha; no-data gets no colored overlay and shows only the same NASA underlay",
        "base_map_underlay": "NASA August BMNG same-extent grayscale/navy map",
        "edge_rgba": [177, 198, 207, 145],
        "edge_width_px": 1,
        "shadow": {"offset_px": [5, 8], "gaussian_blur_px": 7, "max_alpha": 18},
    }

    for index, key in enumerate(ordered_layers, start=1):
        plate = plate_raster(sources[key], basemap, smooth_rgb=(key == "sss"))
        frame = layer_frame(base, [(plate, key, key == "sss")])
        file_name = OUTPUTS[key]
        output_path = ASSET_DIR / file_name
        frame.save(output_path, format="PNG", optimize=True)
        if Image.open(output_path).size != SIZE:
            raise ValueError(f"Unexpected output dimensions: {output_path}")
        output_paths[key] = output_path
        frame_id = f"22s-{chr(96 + index)}"
        data_rgb_resampling = (
            "quarter-resolution colorized control raster then bilinear expansion; derived visualization, not source-value interpolation"
            if key == "sss"
            else "nearest-neighbor source colormap"
        )
        frame_entries[frame_id] = {
            "file": file_name,
            "dimensions": list(SIZE),
            "sha256": digest(output_path),
            "visible_layer": key,
            "sequence_index": index,
            "visible_data_plate_count": 1,
            "camera": CAMERA_18,
            "plate": shared_plate,
            "data_rgb_resampling": data_rgb_resampling,
            "review": "main-approved as a factual single-layer reference; final-video crossfade and camera approach motion still to be authored; internal only",
        }
        contact_items.append((f"{frame_id} · {key}", output_path))
        print(f"{output_path}: {SIZE} sha256={digest(output_path)}")

    contact_items.append(("24s · accepted factual coast reference", approved_24_path))
    contact = make_contact_sheet(contact_items)
    source_layers = {
        key: {
            "file": SOURCE_FILES[key],
            "layer": records[key]["wms_layer_identifier"],
            "period": records[key]["aggregation"],
            "units": records[key]["units_from_gibs_colormap"],
            "sha256": records[key]["sha256"],
            "source_alpha_coverage_fraction": records[key]["alpha_coverage_fraction"],
        }
        for key in SOURCE_FILES
    }
    manifest = {
        "title": "GeoSR corporate film C04 single-layer crossfade references v1",
        "status": "main-approved factual single-layer references; final-video crossfades and camera approach motion remain to be authored; v1-v4 simultaneous stacks rejected; v5 retained as factual audit reference only; internal only; no page wiring",
        "renderer": "scripts/render_corporate_film_c04_crossfade_v1.py",
        "sequence_direction": "Show one complete plate at a time and crossfade SST → salinity → chlorophyll; never stack the three data layers simultaneously.",
        "base_map": {
            "source": NASA_BASEMAP_URL,
            "file": str(NASA_BASEMAP_FILE.relative_to(REPO)).replace("\\", "/"),
            "dimensions": [5400, 2700],
            "sha256": basemap_sha,
            "projection": "NASA global Plate Carrée / geographic longitude-latitude",
            "crop_bbox_lon_lat": [90.0, 15.0, 166.0, 57.75],
            "crop_pixel_bounds_float": [4050.0, 483.75, 5190.0, 1125.0],
            "display_grade": "grayscale, subdued navy-to-blue-gray; exactly the same base pixels and grade in every frame",
        },
        "request": {
            "service": records["sst"]["request_url"].split("?")[0],
            "service_version": "1.1.1",
            "srs": "EPSG:4326",
            "bbox_lon_lat": [90.0, 15.0, 166.0, 57.75],
            "date": "2012-08-01",
            "nearestValue": 0,
            "dimensions": list(SIZE),
            "source_manifest": str(SOURCE_MANIFEST.relative_to(REPO)).replace("\\", "/"),
        },
        "source_layers": source_layers,
        "sequence": {
            "20s": {
                "file": "hero-earth-20s-v2.png",
                "dimensions": list(SIZE),
                "sha256": digest(approved_20_path),
                "review": "main-approved factual SST reference; reused byte-for-byte",
            },
            **frame_entries,
            "24s": {
                "file": "hero-earth-24s-v1.png",
                "dimensions": list(SIZE),
                "sha256": digest(approved_24_path),
                "camera": CAMERA_24,
                "review": "accepted exact factual coastline reference; reused byte-for-byte",
            },
        },
        "contact_sheet": {"file": str(contact.relative_to(REPO)).replace("\\", "/"), "sha256": digest(contact)},
        "limitations": [
            "SST and Aquarius salinity are monthly composites; MODIS L2 chlorophyll is a daily swath. A shared calendar date does not imply simultaneous observations.",
            "Chlorophyll no-data gaps remain without colored overlay and show only the shared NASA base map.",
            "Aquarius colormap is a documented bilinear-derived display only; source measurement values and the original alpha mask are not interpolated or filled.",
            "Each crossfade frame contains one data layer only. All frames reuse the same exact NASA coastline crop, C03 Earth background, camera and plate transform.",
            "These keyframes are internal references, not final cinematic artwork, public results, or website media.",
        ],
    }
    manifest_path = DOC_DIR / MANIFEST
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Contact sheet: {contact} sha256={digest(contact)}")
    print(f"NASA base: {NASA_BASEMAP_FILE} sha256={basemap_sha}")
    print(f"20s reference unchanged: {approved_20_path} sha256={digest(approved_20_path)}")
    print(f"24s reference unchanged: {approved_24_path} sha256={digest(approved_24_path)}")
    print(f"Render manifest: {manifest_path}")


if __name__ == "__main__":
    main()
