"""Rebuild the internal v4 GeoSR orbital reference from NASA's August BMNG texture.

This is a deterministic orthographic globe renderer, not a data-analysis product.
The H02 satellite is a concept element preserved from the existing selected pair;
it is not validated spacecraft geometry. See the v4 keyframe fact-check document.

Requires Python 3, NumPy, and Pillow. The source texture URL and projection are
documented in docs/redesign-production/imagegen-prompts/corporate-film-opening-v4.md.
"""

from __future__ import annotations

import argparse
import hashlib
import tempfile
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw


REPO = Path(__file__).resolve().parents[1]
OUT_DEFAULT = REPO / "dist/assets/concepts/corporate-film"
SOURCE_URL = (
    "https://assets.science.nasa.gov/content/dam/science/esd/eo/images/"
    "bmng/bmng-base/august/world.200408.3x5400x2700.jpg"
)
W, H = 2560, 1440
CENTER_LON, CENTER_LAT = 130.0, 30.0
CENTER_X, CENTER_Y, RADIUS = 1890.0, 745.0, 910.0


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest().upper()


def get_texture(path: Path | None) -> tuple[Path, tempfile.TemporaryDirectory[str] | None]:
    if path is not None:
        if not path.is_file():
            raise FileNotFoundError(f"NASA texture not found: {path}")
        return path, None
    temp = tempfile.TemporaryDirectory(prefix="geosr-bmng-")
    target = Path(temp.name) / "nasa-blue-marble-august-5400.jpg"
    request = urllib.request.Request(SOURCE_URL, headers={"User-Agent": "GeoSR internal renderer"})
    with urllib.request.urlopen(request, timeout=45) as response, target.open("wb") as output:
        output.write(response.read())
    return target, temp


def render_globe(texture_path: Path) -> Image.Image:
    tex = np.asarray(Image.open(texture_path).convert("RGB"), dtype=np.float32)
    th, tw, _ = tex.shape
    x = np.arange(W, dtype=np.float32)[None, :]
    y = np.arange(H, dtype=np.float32)[:, None]
    xe = (x - CENTER_X) / RADIUS
    y_north = (CENTER_Y - y) / RADIUS
    rho2 = xe * xe + y_north * y_north
    visible = rho2 <= 1.0
    z = np.sqrt(np.maximum(0.0, 1.0 - rho2))
    phi0, lam0 = np.deg2rad(CENTER_LAT), np.deg2rad(CENTER_LON)
    px = z * np.cos(phi0) * np.cos(lam0) - xe * np.sin(lam0) - y_north * np.sin(phi0) * np.cos(lam0)
    py = z * np.cos(phi0) * np.sin(lam0) + xe * np.cos(lam0) - y_north * np.sin(phi0) * np.sin(lam0)
    pz = z * np.sin(phi0) + y_north * np.cos(phi0)
    lat = np.arcsin(np.clip(pz, -1.0, 1.0))
    lon = np.arctan2(py, px)
    # NASA BMNG is a global Plate Carrée raster, longitude -180..180, latitude 90..-90.
    u = np.mod((lon + np.pi) / (2.0 * np.pi) * tw, tw)
    v = np.clip((np.pi / 2.0 - lat) / np.pi * (th - 1), 0, th - 1)
    x0 = np.floor(u).astype(np.int32)
    y0 = np.floor(v).astype(np.int32)
    fx = (u - x0)[..., None]
    fy = (v - y0)[..., None]
    x1 = (x0 + 1) % tw
    y1 = np.minimum(y0 + 1, th - 1)
    c00, c10 = tex[y0, x0], tex[y0, x1]
    c01, c11 = tex[y1, x0], tex[y1, x1]
    rgb = (c00 * (1 - fx) + c10 * fx) * (1 - fy) + (c01 * (1 - fx) + c11 * fx) * fy

    # Keep the selected v4 directional shading exactly; no data layer is introduced.
    light = np.asarray([0.32, 0.32, 0.89], dtype=np.float32)
    light /= np.linalg.norm(light)
    diffuse = np.maximum(0.0, xe * light[0] + y_north * light[1] + z * light[2])
    illum = 0.56 + 0.44 * diffuse
    rgb *= illum[..., None]

    # Restrained deterministic pale-marine inner limb, as in the selected v4 render.
    rho = np.sqrt(np.maximum(0.0, rho2))
    inner = np.clip((rho - 0.976) / 0.024, 0.0, 1.0)
    inner = inner * inner * (3.0 - 2.0 * inner)
    rim = np.asarray([128.0, 190.0, 218.0], dtype=np.float32)
    rgb = rgb * (1.0 - 0.16 * inner[..., None]) + rim * (0.16 * inner[..., None])

    background = np.empty((H, W, 3), dtype=np.uint8)
    background[:] = (1, 3, 8)
    base = Image.fromarray(background, "RGB")
    draw = ImageDraw.Draw(base)
    rng = np.random.default_rng(20260919)
    for _ in range(125):
        sx = int(rng.integers(1060, W - 12))
        sy = int(rng.integers(10, H - 10))
        if ((sx - CENTER_X) / RADIUS) ** 2 + ((sy - CENTER_Y) / RADIUS) ** 2 < 1.025 ** 2:
            continue
        radius = int(rng.choice([0, 0, 0, 1]))
        intensity = int(rng.integers(18, 48))
        draw.ellipse(
            (sx - radius, sy - radius, sx + radius, sy + radius),
            fill=(intensity, intensity + 2, intensity + 5),
        )
    glow_alpha = np.clip(np.exp(-((rho - 1.004) / 0.018) ** 2) * 11.0, 0, 11).astype(np.uint8)
    glow = np.zeros((H, W, 4), dtype=np.uint8)
    glow[..., :3] = (61, 120, 154)
    glow[..., 3] = glow_alpha
    base = Image.alpha_composite(base.convert("RGBA"), Image.fromarray(glow, "RGBA"))
    earth_layer = np.zeros((H, W, 4), dtype=np.uint8)
    earth_layer[..., :3] = np.clip(rgb, 0, 255).astype(np.uint8)
    edge_alpha = np.clip((1.0 - rho) * RADIUS + 0.5, 0.0, 1.0) * visible
    earth_layer[..., 3] = np.uint8(edge_alpha * 255.0)
    return Image.alpha_composite(base, Image.fromarray(earth_layer, "RGBA")).convert("RGB")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--texture", type=Path, help="Use a local NASA August BMNG JPEG instead of downloading it.")
    parser.add_argument("--output-dir", type=Path, default=OUT_DEFAULT)
    parser.add_argument(
        "--reference-h01", type=Path, default=OUT_DEFAULT / "hero-earth-00s-v4.png",
        help="Existing selected H01 used to identify the H02 satellite-only pixel patch.",
    )
    parser.add_argument(
        "--reference-h02", type=Path, default=OUT_DEFAULT / "hero-earth-satellite-07s-v4.png",
        help="Existing selected H02 used to preserve the concept satellite pixel patch.",
    )
    args = parser.parse_args()
    for source in (args.reference_h01, args.reference_h02):
        if not source.is_file():
            raise FileNotFoundError(f"Selected v4 pair is required to preserve the concept satellite: {source}")
    ref_h01 = Image.open(args.reference_h01).convert("RGB")
    ref_h02 = Image.open(args.reference_h02).convert("RGB")
    if ref_h01.size != (W, H) or ref_h02.size != (W, H):
        raise ValueError("Reference v4 pair must both be 2560x1440.")
    ref_a = np.asarray(ref_h01, dtype=np.int16)
    ref_b = np.asarray(ref_h02, dtype=np.int16)
    satellite_mask = Image.fromarray(np.where(np.max(np.abs(ref_b - ref_a), axis=2) > 0, 255, 0).astype(np.uint8), "L")
    if satellite_mask.getbbox() is None:
        raise ValueError("H02 reference has no satellite-only pixels relative to H01.")

    texture_path, temp = get_texture(args.texture)
    try:
        h01 = render_globe(texture_path)
    finally:
        if temp is not None:
            temp.cleanup()
    h02 = h01.copy()
    # The v4 Earth layers are identical. Copy only differing satellite pixels from H02.
    h02.paste(ref_h02, (0, 0), satellite_mask)

    args.output_dir.mkdir(parents=True, exist_ok=True)
    h01_path = args.output_dir / "hero-earth-00s-v4.png"
    h02_path = args.output_dir / "hero-earth-satellite-07s-v4.png"
    h01.save(h01_path, format="PNG", optimize=True)
    h02.save(h02_path, format="PNG", optimize=True)
    print(f"NASA texture: {texture_path}")
    print(f"H01: {h01_path} {h01.size} sha256={sha256(h01_path)}")
    print(f"H02: {h02_path} {h02.size} sha256={sha256(h02_path)}")
    print(f"Preserved spacecraft pixel patch bbox: {satellite_mask.getbbox()}")


if __name__ == "__main__":
    main()
