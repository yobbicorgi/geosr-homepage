#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const origin = new URL(process.env.REDESIGN_PREVIEW_URL || "http://127.0.0.1:18102/");
const routes = ["index", "business", "research", "ax-platform", "company", "news", "equipment", "contact", "source-archive"];
const failures = [];

function fail(message) {
  failures.push(message);
}

function readMeta(html, attribute, key) {
  const match = html.match(new RegExp("<meta\\s+" + attribute + "=\"" + key + "\"\\s+content=\"([^\"]*)\"", "i"));
  return match?.[1] ?? null;
}

const sitePath = path.join(dist, "site.js");
const siteSource = fs.readFileSync(sitePath, "utf8");
const configMatch = siteSource.match(/const metadataConfig=(\{[\s\S]*?\n\});/);
assert(configMatch, "site.js must expose the shared JSON metadata map");
const metadataConfig = JSON.parse(configMatch[1]);
assert(siteSource.includes('document.title="GeoSR"'), "Runtime browser title must remain GeoSR");
assert(fs.statSync(path.join(dist, "assets", "favicon.png")).size > 1000, "Official logo favicon must exist");

for (const route of routes) {
  const config = metadataConfig[route];
  assert(config, "Missing metadata config for " + route);
  assert.equal(config.title.length, 2, route + " needs KO and EN titles");
  assert.equal(config.description.length, 2, route + " needs KO and EN descriptions");
  assert(config.title.every(value => value.trim()), route + " titles must be non-empty");
  assert(config.description.every(value => value.trim()), route + " descriptions must be non-empty");

  const htmlPath = path.join(dist, route + ".html");
  const html = fs.readFileSync(htmlPath, "utf8");
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? null;
  const description = readMeta(html, "name", "description");
  assert.equal(title, "GeoSR", route + " browser tab title must be brand only");
  assert.equal(description, config.description[0], route + " static KO description must match its route");
  assert.equal(readMeta(html, "property", "og:type"), "website", route + " OG type");
  assert.equal(readMeta(html, "property", "og:site_name"), "GeoSR", route + " OG site name");
  assert.equal(readMeta(html, "property", "og:title"), config.title[0] + " | GeoSR", route + " OG title");
  assert.equal(readMeta(html, "property", "og:description"), description, route + " OG description");
  assert.equal(readMeta(html, "property", "og:locale"), "ko_KR", route + " default OG locale");
  assert.equal(readMeta(html, "name", "twitter:card"), "summary", route + " Twitter card type");
  assert.equal(readMeta(html, "name", "twitter:title"), config.title[0] + " | GeoSR", route + " Twitter title");
  assert.match(html, /<link rel="icon" type="image\/png" href="assets\/favicon\.png\?v=20260928-r1">/, route + " official logo icon");
  assert.equal(readMeta(html, "name", "twitter:description"), description, route + " Twitter description");
  assert.match(html, /<html lang="ko">/, route + " static language default");
  assert.match(html, /site\.js\?v=\d{8}-r\d+/, route + " current metadata script");
  assert.doesNotMatch(html, /rel="canonical"|property="og:image"|name="twitter:image"/i, route + " static HTML must not hard-code a canonical or unverified social image");
  assert.doesNotMatch(html, /(?:localhost|127\.0\.0\.1|192\.168\.\d+\.\d+)/i, route + " must not publish a local origin");

  const response = await fetch(new URL(route + ".html?lang=ko", origin));
  if (!response.ok) fail(response.status + " " + route + ".html?lang=ko");
  const responseEn = await fetch(new URL(route + ".html?lang=en", origin));
  if (!responseEn.ok) fail(responseEn.status + " " + route + ".html?lang=en");
}

const accessibilitySource = {
  skipLink: siteSource.includes('class="skip" href="#main"'),
  focusableMain: siteSource.includes('<main id="main" tabindex="-1">'),
  namedNavigation: siteSource.includes('id="primary-navigation" aria-label='),
  menuControl: siteSource.includes('aria-controls="primary-navigation"'),
  languageActionLabels: siteSource.includes("영어로 전환") && siteSource.includes("Switch to Korean"),
  runtimeLanguage: siteSource.includes("document.documentElement.lang=L"),
  canonicalRuntime: siteSource.includes('canonical=`https://www.geosr.com${canonicalPath}') && siteSource.includes('canonicalLink.href=canonical') && siteSource.includes('setMeta("property","og:url",canonical)'),
  openGraphRuntime: siteSource.includes('setMeta("property","og:title"') && siteSource.includes('setMeta("property","og:description"'),
  twitterRuntime: siteSource.includes('setMeta("name","twitter:title"') && siteSource.includes('setMeta("name","twitter:description"')
};
for (const [check, passed] of Object.entries(accessibilitySource)) {
  if (!passed) fail("site.js accessibility/metadata contract: " + check);
}

const css = fs.readFileSync(path.join(dist, "design.css"), "utf8");
if (!css.includes(":focus-visible")) fail("shared focus-visible rule missing");
if (!css.includes("@media (prefers-reduced-motion: reduce)")) fail("shared reduced-motion fallback missing");
const homeJs = fs.readFileSync(path.join(dist, "home.js"), "utf8");
for (const marker of ['role="tablist"', 'role="tab"', 'aria-selected=', 'aria-controls=']) {
  if (!homeJs.includes(marker)) fail("home AX tab semantics missing: " + marker);
}
if (!homeJs.includes('id="credential-category-cert" role="tab" aria-controls="credential-stage"')) fail("home credential tabs need stable IDs and panel controls");
if (!homeJs.includes('id="credential-stage" role="tabpanel" aria-labelledby="credential-category-cert" tabindex="0"')) fail("home credential panel needs a labelled tabpanel");
const interactions = fs.readFileSync(path.join(dist, "interactions.js"), "utf8");
if (!interactions.includes("tab.setAttribute('aria-selected',i===index)")) fail("home expertise roving tab state missing");
if (!interactions.includes("const selected=tab===button;tab.setAttribute('aria-selected',String(selected))")) fail("home credential tab selected state missing");
if (!interactions.includes("categoryTabs[next].focus();activateCategory(categoryTabs[next])")) fail("home credential keyboard tab navigation missing");
if (!/b\.setAttribute\('aria-pressed',(?:String\()?b===button\)?\)/.test(interactions)) fail("company credential filter button state missing");
const axSource = fs.readFileSync(path.join(dist, "ax-source-gallery.js"), "utf8");
if (!axSource.includes("prefers-reduced-motion: reduce") || !axSource.includes('if(reduced.matches)')) fail("Active AX gallery reduced-motion branch missing");

const indexHtml = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const siteScript = indexHtml.match(/<script[^>]+src="([^"]*site\.js\?[^"]+)"/)?.[1] ?? null;
assert(siteScript, "index route must load site.js");
const scriptResponse = await fetch(new URL(siteScript, origin));
if (!scriptResponse.ok) fail(scriptResponse.status + " " + siteScript);

if (failures.length) {
  console.error("FAIL metadata/accessibility audit: " + failures.length + " issue(s)");
  for (const item of failures) console.error(" - " + item);
  process.exitCode = 1;
} else {
  console.log(`PASS ${routes.length * 2} KO/EN route responses; ${routes.length} static metadata heads; shared KO/EN metadata map and accessibility contracts.`);
  console.log("Canonical/og:url are generated from the official geosr.com host at runtime; social images remain omitted until crop and rights are verified.");
  console.log("Preview origin: " + origin.origin);
}
