"""Render deterministic C02/C03 approach keyframes from NASA August BMNG.

The only non-source pixels are the optional satellite concept overlay in the
10s and 12s frames, extracted from the selected v4 H02/H01 difference. No
geography, weather, data layer, label, or interface is generated.
"""

from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

from render_corporate_earth_reference import (
    Camera,
    OUT_DEFAULT,
    get_texture,
    render_globe,
    sha256,
)


@dataclass(frozen=True)
class Keyframe:
    filename: str
    time_label: str
    camera: Camera
    satellite_scale: float = 0.0
    satellite_xy: tuple[int, int] | None = None


KEYFRAMES = (
    Keyframe(
        "hero-earth-10s-v1.png",
        "10s · C02 observation",
        Camera(center_lon=130.0, center_lat=30.5, center_x=1770.0, center_y=760.0, radius=1050.0),
        satellite_scale=0.82,
        satellite_xy=(2210, 590),
    ),
    Keyframe(
        "hero-earth-12s-v1.png",
        "12s · C02/C03 transition",
        Camera(center_lon=130.0, center_lat=31.5, center_x=1560.0, center_y=745.0, radius=1380.0),
        satellite_scale=0.65,
        satellite_xy=(2330, 445),
    ),
    Keyframe(
        "hero-earth-15s-v1.png",
        "15s · C03 approach",
        Camera(center_lon=129.0, center_lat=34.0, center_x=1400.0, center_y=730.0, radius=1950.0),
    ),
    Keyframe(
        "hero-earth-18s-v1.png",
        "18s · Korea / NW Pacific close",
        Camera(center_lon=128.0, center_lat=36.0, center_x=1280.0, center_y=720.0, radius=2700.0),
    ),
)


def satellite_patch(h01_path: Path, h02_path: Path) -> tuple[Image.Image, Image.Image, tuple[int, int, int, int]]:
    h01 = Image.open(h01_path).convert("RGB")
    h02 = Image.open(h02_path).convert("RGB")
    if h01.size != (2560, 1440) or h02.size != (2560, 1440):
        raise ValueError("The selected v4 reference pair must both be 2560x1440.")
    a = np.asarray(h01, dtype=np.int16)
    b = np.asarray(h02, dtype=np.int16)
    mask = Image.fromarray((np.max(np.abs(b - a), axis=2) > 0).astype(np.uint8) * 255, "L")
    bbox = mask.getbbox()
    if bbox is None:
        raise ValueError("The v4 H02/H01 pair has no satellite-only pixel patch.")
    return h02.crop(bbox), mask.crop(bbox), bbox


def paste_satellite(frame: Image.Image, patch: Image.Image, mask: Image.Image, keyframe: Keyframe) -> None:
    if keyframe.satellite_xy is None or keyframe.satellite_scale <= 0:
        return
    size = (
        max(1, round(patch.width * keyframe.satellite_scale)),
        max(1, round(patch.height * keyframe.satellite_scale)),
    )
    resized_patch = patch.resize(size, Image.Resampling.LANCZOS)
    resized_mask = mask.resize(size, Image.Resampling.LANCZOS)
    frame.paste(resized_patch, keyframe.satellite_xy, resized_mask)


def render_contact_sheet(paths: list[Path], output: Path) -> None:
    thumb_w, thumb_h = 768, 432
    margin, label_h = 28, 48
    sheet = Image.new("RGB", (margin * 2 + thumb_w * 2, margin * 2 + (thumb_h + label_h) * 2), (6, 16, 25))
    draw = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype("arial.ttf", 22)
    except OSError:
        font = ImageFont.load_default()
    for i, path in enumerate(paths):
        x = margin + (i % 2) * thumb_w
        y = margin + (i // 2) * (thumb_h + label_h)
        im = Image.open(path).convert("RGB")
        im.thumbnail((thumb_w, thumb_h), Image.Resampling.LANCZOS)
        sheet.paste(im, (x, y))
        draw.text((x, y + thumb_h + 10), f"{path.stem}", font=font, fill=(226, 238, 243))
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, format="PNG", optimize=True)


def main() -> None:
    repo = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--texture", type=Path, help="Use a local official NASA August BMNG JPEG.")
    parser.add_argument("--output-dir", type=Path, default=OUT_DEFAULT)
    parser.add_argument(
        "--contact-sheet",
        type=Path,
        default=repo / "docs/redesign-production/keyframes/corporate-approach-v1-contact-sheet.png",
    )
    parser.add_argument(
        "--reference-h01",
        type=Path,
        default=OUT_DEFAULT / "hero-earth-00s-v4.png",
    )
    parser.add_argument(
        "--reference-h02",
        type=Path,
        default=OUT_DEFAULT / "hero-earth-satellite-07s-v4.png",
    )
    args = parser.parse_args()

    patch, mask, bbox = satellite_patch(args.reference_h01, args.reference_h02)
    texture_path, temporary = get_texture(args.texture)
    paths: list[Path] = []
    try:
        args.output_dir.mkdir(parents=True, exist_ok=True)
        for keyframe in KEYFRAMES:
            frame = render_globe(texture_path, keyframe.camera)
            paste_satellite(frame, patch, mask, keyframe)
            target = args.output_dir / keyframe.filename
            frame.save(target, format="PNG", optimize=True)
            paths.append(target)
            print(
                f"{keyframe.time_label}: {target} {frame.size} "
                f"sha256={sha256(target)} camera="
                f"({keyframe.camera.center_lon:.2f}E,{keyframe.camera.center_lat:.2f}N; "
                f"center={keyframe.camera.center_x:.1f},{keyframe.camera.center_y:.1f}; "
                f"radius={keyframe.camera.radius:.1f}) "
                f"satellite_scale={keyframe.satellite_scale:.2f} "
                f"satellite_xy={keyframe.satellite_xy}"
            )
        render_contact_sheet(paths, args.contact_sheet)
        print(f"Satellite reference bbox: {bbox}")
        print(f"Contact sheet: {args.contact_sheet} sha256={sha256(args.contact_sheet)}")
    finally:
        if temporary is not None:
            temporary.cleanup()


if __name__ == "__main__":
    main()
