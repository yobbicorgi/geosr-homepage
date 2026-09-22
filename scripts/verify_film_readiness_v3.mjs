import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const manifestPath = path.join(repoRoot, "docs/redesign-production/FILM-GENERATION-READINESS-v3.json");
const filmManifestPath = path.join(repoRoot, "dist/film-manifest.json");
const requiredShotFields = [
  "id", "start", "end", "duration", "purpose", "visualType",
  "startFrame", "endFrame", "sourceAssets", "sourceTruthGate",
  "imageGenAllowed", "imageGenPromptCore", "negativeConstraints",
  "webSlot", "status", "remainingGates"
];
const errors = [];
let checkedAssets = 0;

function fail(message) {
  errors.push(message);
}

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(label + ": " + error.message);
    return null;
  }
}

function checkAsset(assetPath, shotId, requireLocal = false, allowNull = false) {
  if (assetPath === null) {
    if (!allowNull) fail(shotId + ": selected asset path cannot be null.");
    return;
  }
  if (typeof assetPath !== "string" || assetPath.trim() === "") {
    fail(shotId + ": asset path must be a non-empty string or null.");
    return;
  }
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(assetPath)) {
    if (requireLocal) fail(shotId + ": generation-ready asset references must be locally verifiable: " + assetPath);
    return;
  }
  if (path.isAbsolute(assetPath)) {
    fail(shotId + ": asset path must be repository-relative: " + assetPath);
    return;
  }
  const resolved = path.resolve(repoRoot, assetPath);
  const rel = path.relative(repoRoot, resolved);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    fail(shotId + ": asset path escapes repository root: " + assetPath);
    return;
  }
  checkedAssets += 1;
  if (!fs.existsSync(resolved)) fail(shotId + ": local asset is missing: " + assetPath);
  else if (!fs.statSync(resolved).isFile()) fail(shotId + ": selected asset path is not a file: " + assetPath);
}

function checkTimeline(shots, filmName, expectedPrefix, expectedCount, expectedDuration, ids, allowedStatus, allowedVisualType) {
  if (!Array.isArray(shots)) {
    fail(filmName + ": expected an array of shots.");
    return;
  }
  if (shots.length !== expectedCount) fail(filmName + ": expected " + expectedCount + " shots, found " + shots.length + ".");
  const expectedIds = Array.from({ length: expectedCount }, (_, i) => expectedPrefix + String(i + 1).padStart(2, "0"));
  if (JSON.stringify(shots.map((shot) => shot?.id)) !== JSON.stringify(expectedIds)) {
    fail(filmName + ": expected ordered IDs " + expectedIds.join(", ") + ".");
  }

  let cursor = 0;
  for (const [index, shot] of shots.entries()) {
    if (!shot || typeof shot !== "object" || Array.isArray(shot)) {
      fail(filmName + "[" + index + "]: expected a shot object.");
      continue;
    }
    const label = shot.id || filmName + "[" + index + "]";
    for (const field of requiredShotFields) {
      if (!(field in shot)) fail(label + ': missing required field "' + field + '".');
    }
    if (typeof shot.id !== "string" || !shot.id) {
      fail(label + ": id must be a non-empty string.");
    } else if (ids.has(shot.id)) {
      fail(label + ": duplicate shot ID.");
    } else {
      ids.add(shot.id);
    }
    if (typeof shot.timecode !== "string" || !shot.timecode) fail(label + ": timecode must be a non-empty string.");
    for (const field of ["start", "end", "duration"]) {
      if (!Number.isFinite(shot[field])) fail(label + ": " + field + " must be a finite number.");
    }
    if (Number.isFinite(shot.start) && Number.isFinite(shot.end) && Number.isFinite(shot.duration)) {
      if (shot.end <= shot.start) fail(label + ": end must be greater than start.");
      if (Math.abs((shot.end - shot.start) - shot.duration) > 0.0001) {
        fail(label + ": duration does not equal end - start.");
      }
      if (Math.abs(shot.start - cursor) > 0.0001) {
        fail(label + ": gap or overlap at " + shot.start + "s; expected " + cursor + "s.");
      }
      cursor = shot.end;
    }
    if (typeof shot.purpose !== "string" || !shot.purpose.trim()) fail(label + ": purpose is required.");
    if (!allowedVisualType.has(shot.visualType)) fail(label + ': unknown visualType "' + shot.visualType + '".');
    if (!allowedStatus.has(shot.status)) fail(label + ': unknown status "' + shot.status + '".');
    if (typeof shot.sourceTruthGate !== "string" || !shot.sourceTruthGate.trim()) fail(label + ": sourceTruthGate is required.");
    if (typeof shot.imageGenAllowed !== "boolean") fail(label + ": imageGenAllowed must be boolean.");
    if (typeof shot.imageGenPromptCore !== "string" || !shot.imageGenPromptCore.trim()) fail(label + ": imageGenPromptCore is required.");
    if (!Array.isArray(shot.negativeConstraints) || shot.negativeConstraints.length === 0 || shot.negativeConstraints.some((item) => typeof item !== "string" || !item.trim())) {
      fail(label + ": negativeConstraints must be a non-empty string array.");
    }
    if (!Array.isArray(shot.sourceAssets)) fail(label + ": sourceAssets must be an array.");
    if (Array.isArray(shot.sourceAssets)) for (const asset of shot.sourceAssets) checkAsset(asset, label, manifest?.generationReady === true);
    if (shot.startFrame !== null) checkAsset(shot.startFrame, label, manifest?.generationReady === true);
    if (shot.endFrame !== null) checkAsset(shot.endFrame, label, manifest?.generationReady === true);
    if (typeof shot.webSlot !== "string" || !shot.webSlot.trim()) fail(label + ": webSlot must be a non-empty slot ID.");
    if (!Array.isArray(shot.remainingGates) || shot.remainingGates.some((item) => typeof item !== "string" || !item.trim())) {
      fail(label + ": remainingGates must be a string array.");
    }
    if (shot.visualType === "actual-ui" && shot.imageGenAllowed !== false) {
      fail(label + ": actual-ui shots must set imageGenAllowed=false.");
    }
    if (shot.visualType === "source" && shot.imageGenAllowed !== false) {
      fail(label + ": source-factual shots must set imageGenAllowed=false.");
    }
  }
  if (Math.abs(cursor - expectedDuration) > 0.0001) {
    fail(filmName + ": timeline ends at " + cursor + "s, expected " + expectedDuration + "s.");
  }
}

const manifest = readJson(manifestPath, "v3 manifest");
if (manifest?.supersededBy) {
  console.error("ARCHIVED readiness contract — do not use it to approve production");
  console.error("Read " + manifest.supersededBy + " and run node scripts/verify_continuation_package.mjs");
  process.exit(1);
}
const filmManifest = readJson(filmManifestPath, "film-manifest");
if (manifest) {
  if (manifest.schemaVersion !== "3.0.0") fail("schemaVersion must be 3.0.0.");
  if (typeof manifest.storyAuthority !== "string" || !manifest.storyAuthority.includes("FILM-STORYBOARD-DIRECTOR-v3.md")) {
    fail("storyAuthority must identify FILM-STORYBOARD-DIRECTOR-v3.md.");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(manifest.generatedOn || "")) fail("generatedOn must be YYYY-MM-DD.");
  if (manifest.companyDuration !== 60) fail("companyDuration must be 60 seconds.");
  if (manifest.axDuration !== 30) fail("axDuration must be 30 seconds.");
  if (manifest.productionReady !== false) fail("productionReady must remain false until final release/deployment gates are complete.");
  if (manifest.abChoiceRequired !== false || !/not a blocker/i.test(manifest.storyAuthority || "")) {
    fail("A/B choice must be explicitly recorded as not a blocker.");
  }
  if (!Array.isArray(manifest.remainingGlobalGates) || manifest.remainingGlobalGates.length === 0) {
    fail("remainingGlobalGates must be a non-empty string array.");
  }
  const allowedStatus = new Set(manifest.statusEnum || []);
  const allowedVisualType = new Set(manifest.visualTypeEnum || []);
  if (allowedStatus.size === 0) fail("statusEnum must be a non-empty array.");
  if (allowedVisualType.size === 0) fail("visualTypeEnum must be a non-empty array.");

  const ids = new Set();
  checkTimeline(manifest.companyShots, "companyShots", "C", 10, manifest.companyDuration, ids, allowedStatus, allowedVisualType);
  checkTimeline(manifest.axShots, "axShots", "A", 5, manifest.axDuration, ids, allowedStatus, allowedVisualType);

  const allShots = [...(manifest.companyShots || []), ...(manifest.axShots || [])];
  if (manifest.generationReady !== true) fail("generationReady must be true for the approved pre-generation state.");
  if (manifest.releaseReady !== false) fail("releaseReady must remain false until final generation/edit and public release review are complete.");
  if (manifest.productionReady !== false) fail("productionReady must remain false until release/deployment gates are complete.");
  if (!Array.isArray(manifest.remainingPreGenerationGates) || manifest.remainingPreGenerationGates.length !== 0) {
    fail("remainingPreGenerationGates must be an empty array when generationReady is true.");
  }
  if (!Array.isArray(manifest.remainingPostGenerationGates) || manifest.remainingPostGenerationGates.length === 0) {
    fail("remainingPostGenerationGates must list release/production work that follows generation.");
  }
  if (JSON.stringify(manifest.remainingGlobalGates) !== JSON.stringify(manifest.remainingPostGenerationGates)) {
    fail("remainingGlobalGates must match remainingPostGenerationGates to avoid stale readiness wording.");
  }
  const postText = (manifest.remainingPostGenerationGates || []).join(" ").toLowerCase();
  for (const [label, pattern] of [["motion/edit", /motion|edit/], ["rights", /rights/], ["privacy", /privacy/], ["film-manifest wiring", /film-manifest/], ["deployment", /deploy/]]) {
    if (!pattern.test(postText)) fail("remainingPostGenerationGates must include " + label + ".");
  }
  if (!manifest.readinessDefinitions || !/pre-generation/i.test(manifest.readinessDefinitions.generationReady || "") || !/release/i.test(manifest.readinessDefinitions.productionReady || "")) {
    fail("readinessDefinitions must distinguish generation readiness from release/production readiness.");
  }
  for (const shot of allShots) {
    const label = shot?.id || "shot";
    if (["SOURCE_PENDING", "REJECTED"].includes(shot?.status)) {
      fail("generationReady cannot be true while " + label + " is " + shot.status + ".");
    }
    if (!shot?.startFrame) fail(label + ": generation-ready shots need a selected startFrame path.");
    if (!shot?.endFrame && shot?.visualType !== "authored") {
      fail(label + ": only an authored bridge may omit an endFrame path.");
    }
    if (!Array.isArray(shot?.sourceAssets) || shot.sourceAssets.length === 0) {
      fail(label + ": generation-ready shots need at least one selected source asset path.");
    }
  }

  if (filmManifest && Array.isArray(filmManifest.slots)) {
    for (const [slotId, expectedDuration] of [["geosr-hero", 60], ["ax-concept-film", 30]]) {
      const slot = filmManifest.slots.find((item) => item?.id === slotId);
      if (!slot) {
        fail("film-manifest is missing " + slotId + ".");
        continue;
      }
      if (slot.duration !== expectedDuration) fail("film-manifest " + slotId + " duration must be " + expectedDuration + "s.");
      const shots = slotId === "geosr-hero" ? manifest.companyShots : manifest.axShots;
      for (const shot of shots || []) {
        if (shot.webSlot !== slotId) fail(shot.id + ": webSlot " + shot.webSlot + " does not match the expected " + slotId + ".");
      }
      console.log("film-manifest " + slotId + ": " + slot.duration + "s, src=" + (slot.src ?? "null") + ", approval=" + slot.approval);
    }
  } else {
    fail("film-manifest.slots is missing.");
  }
}

if (errors.length) {
  console.error("FAIL " + errors.length + " issue(s):");
  for (const error of errors) console.error("- " + error);
  process.exitCode = 1;
} else {
  console.log("PASS v3 readiness: 10 company shots/60s + 5 AX shots/30s; contiguous timelines, valid enums, " + checkedAssets + " existing local asset references; actual-ui ImageGen gate and web slots verified.");
  console.log("generationReady=true; remainingPreGenerationGates=0. releaseReady=false and productionReady=false; post-generation gates are recorded.");
}

