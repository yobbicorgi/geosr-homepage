#!/usr/bin/env python3
"""Audit repository images for resized or cropped copies of official GeoSR equipment references.

Usage: python scripts/audit_equipment_image_matches.py [--root REPO] [--top 8] [--json-out PATH]
Requires Pillow, NumPy, OpenCV, and ImageHash. Source-pack originals are excluded from candidates
so each reference cannot trivially match itself. No files are modified except optional JSON output.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
from typing import Any

import cv2
import imagehash
import numpy as np
from PIL import Image, ImageOps, UnidentifiedImageError

EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
EXCLUDED_DIRS = {
    ".git", "node_modules", "build", "cache", "temp", "tmp", ".cache",
    ".pytest_cache", "__pycache__", ".next", ".vite", "coverage",
}
REFERENCE_DIR = Path("docs/redesign-production/equipment-sources/originals")
REFERENCES = {
    "Hanuri survey vessel": "hanuri-ship-page-thumbnail.jpg",
    "FireFly6 image 1": "firefly6-page-thumbnail-01.png",
    "FireFly6 image 2": "firefly6-page-thumbnail-02.png",
    "BlueROV2": "bluerov2-page-thumbnail.png",
    "RBR Solo-TU page thumbnail": "rbr-solo-tu-page-thumbnail.png",
    "USV usvCom": "usv-usvcom-page-original.png",
    "USV USV20S-labelled scene": "usv-usv20s-page-original.png",
    "USV catamaran GIF": "usv-catamaran-page-original.gif",
}


def file_sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def load_frames(path: Path) -> tuple[tuple[int, int], int, list[Image.Image]]:
    with Image.open(path) as source:
        size = source.size
        frame_count = int(getattr(source, "n_frames", 1))
        frames: list[Image.Image] = []
        for index in range(frame_count):
            source.seek(index)
            frame = ImageOps.exif_transpose(source.copy()).convert("RGB")
            frames.append(frame)
        return size, frame_count, frames


def prepared(frame: Image.Image) -> tuple[np.ndarray, list[cv2.KeyPoint], np.ndarray | None, str, str]:
    work = frame.copy()
    work.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
    gray = cv2.cvtColor(np.asarray(work), cv2.COLOR_RGB2GRAY)
    orb = cv2.ORB_create(nfeatures=1800, scaleFactor=1.2, nlevels=8, edgeThreshold=15, fastThreshold=7)
    keypoints, descriptors = orb.detectAndCompute(gray, None)
    return gray, keypoints, descriptors, str(imagehash.phash(work)), str(imagehash.dhash(work))


def compare_features(ref: tuple[Any, ...], candidate: tuple[Any, ...]) -> dict[str, Any]:
    _, ref_kp, ref_desc, ref_phash, ref_dhash = ref
    _, cand_kp, cand_desc, cand_phash, cand_dhash = candidate
    phash_dist = (imagehash.hex_to_hash(ref_phash) - imagehash.hex_to_hash(cand_phash))
    dhash_dist = (imagehash.hex_to_hash(ref_dhash) - imagehash.hex_to_hash(cand_dhash))
    base: dict[str, Any] = {
        "phash_distance": int(phash_dist), "dhash_distance": int(dhash_dist),
        "ref_keypoints": len(ref_kp), "candidate_keypoints": len(cand_kp),
        "good_matches": 0, "homography_inliers": 0, "ref_feature_coverage": 0.0,
        "inlier_fraction": 0.0,
    }
    if ref_desc is None or cand_desc is None or len(ref_desc) < 4 or len(cand_desc) < 4:
        return base
    matcher = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=False)
    pairs = matcher.knnMatch(ref_desc, cand_desc, k=2)
    good = [first for first, second in pairs if first.distance < 0.76 * second.distance]
    base["good_matches"] = len(good)
    if len(good) < 4:
        return base
    src = np.float32([ref_kp[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
    dst = np.float32([cand_kp[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)
    _, inlier_mask = cv2.findHomography(src, dst, cv2.RANSAC, 4.0)
    if inlier_mask is None:
        return base
    inliers = int(inlier_mask.ravel().sum())
    unique_ref = len({good[index].queryIdx for index, keep in enumerate(inlier_mask.ravel()) if keep})
    base["homography_inliers"] = inliers
    base["ref_feature_coverage"] = round(unique_ref / max(1, len(ref_kp)), 4)
    base["inlier_fraction"] = round(inliers / max(1, len(good)), 4)
    return base


def image_inventory(root: Path, excluded_files: set[Path]) -> list[Path]:
    result: list[Path] = []
    for folder, dirs, names in os.walk(root):
        dirs[:] = sorted(d for d in dirs if d.lower() not in EXCLUDED_DIRS)
        parent = Path(folder)
        for name in names:
            path = parent / name
            if path.suffix.lower() in EXTENSIONS and path.resolve() not in excluded_files:
                result.append(path)
    return sorted(result)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--top", type=int, default=8, help="number of candidates shown for each reference")
    parser.add_argument("--json-out", type=Path, help="optional machine-readable result file")
    args = parser.parse_args()
    root = args.root.resolve()
    ref_dir = root / REFERENCE_DIR
    if not ref_dir.is_dir():
        parser.error(f"source reference directory not found: {ref_dir}")

    refs: dict[str, dict[str, Any]] = {}
    excluded_files: set[Path] = set()
    for label, filename in REFERENCES.items():
        path = ref_dir / filename
        if not path.is_file():
            parser.error(f"reference not found: {path}")
        size, frame_count, frames = load_frames(path)
        refs[label] = {
            "path": path, "size": list(size), "frame_count": frame_count,
            "sha256": file_sha256(path),
            "features": [prepared(frame) for frame in frames],
        }
        excluded_files.add(path.resolve())

    candidates = image_inventory(root, excluded_files)
    best: dict[str, list[dict[str, Any]]] = {label: [] for label in refs}
    exact_counts = {label: 0 for label in refs}
    skipped: list[dict[str, str]] = []
    for index, path in enumerate(candidates, 1):
        try:
            size, frame_count, frames = load_frames(path)
            sha = file_sha256(path)
            candidate_features = [prepared(frame) for frame in frames]
        except (OSError, ValueError, UnidentifiedImageError, cv2.error) as error:
            skipped.append({"path": path.relative_to(root).as_posix(), "error": str(error)[:240]})
            continue
        relative = path.relative_to(root).as_posix()
        for label, reference in refs.items():
            strongest: dict[str, Any] | None = None
            for ref_index, ref_feature in enumerate(reference["features"]):
                for frame_index, candidate_feature in enumerate(candidate_features):
                    metrics = compare_features(ref_feature, candidate_feature)
                    metrics.update({"reference_frame": ref_index, "candidate_frame": frame_index})
                    key = (metrics["homography_inliers"], metrics["ref_feature_coverage"],
                           -metrics["phash_distance"], metrics["good_matches"])
                    if strongest is None or key > strongest["_rank"]:
                        strongest = {**metrics, "_rank": key}
            assert strongest is not None
            row = {
                "path": relative, "width": size[0], "height": size[1],
                "frame_count": frame_count, "sha256": sha,
                "exact_file_hash": sha.lower() == reference["sha256"].lower(),
                **{k: v for k, v in strongest.items() if k != "_rank"},
            }
            if row["exact_file_hash"]:
                exact_counts[label] += 1
            best[label].append(row)

    for label in best:
        best[label].sort(key=lambda row: (
            row["exact_file_hash"], row["homography_inliers"], row["ref_feature_coverage"],
            -row["phash_distance"], row["good_matches"], row["width"] * row["height"]
        ), reverse=True)

    output = {
        "root": str(root), "image_count": len(candidates), "skipped_count": len(skipped),
        "excluded_reference_files": len(excluded_files), "excluded_directories": sorted(EXCLUDED_DIRS),
        "references": {
            label: {"path": ref["path"].relative_to(root).as_posix(), "width": ref["size"][0],
                   "height": ref["size"][1], "frame_count": ref["frame_count"], "sha256": ref["sha256"],
                   "candidate_exact_hash_count": exact_counts[label], "top_candidates": rows[:args.top]}
            for (label, ref), rows in zip(refs.items(), best.values())
        },
        "skipped": skipped,
        "metric_note": "ORB homography inliers and reference-feature coverage indicate geometric local matches; pHash/dHash distances are 64-bit Hamming distances (lower is closer). These are candidate scores, not proof; visually review before attribution.",
    }
    serialized = json.dumps(output, ensure_ascii=False, indent=2)
    if args.json_out:
        args.json_out.parent.mkdir(parents=True, exist_ok=True)
        args.json_out.write_text(serialized + "\n", encoding="utf-8")
    print(f"Scanned {len(candidates)} raster files; skipped {len(skipped)} unreadable; excluded {len(excluded_files)} reference source files.")
    for label, reference in output["references"].items():
        print(f"\n{label} [{reference['width']}x{reference['height']}, {reference['frame_count']} frame(s)]")
        for row in reference["top_candidates"]:
            print(
                f"  {row['path']} | {row['width']}x{row['height']} | exact={row['exact_file_hash']} "
                f"ORB-inliers={row['homography_inliers']} ref-coverage={row['ref_feature_coverage']:.1%} "
                f"good={row['good_matches']} pHash-d={row['phash_distance']} dHash-d={row['dhash_distance']}"
            )
    if args.json_out:
        print(f"\nJSON: {args.json_out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
