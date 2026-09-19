#!/usr/bin/env node

import path from 'node:path';

const origin = new URL(process.env.REDESIGN_PREVIEW_URL || 'http://127.0.0.1:18102/');
const routes = ['index', 'business', 'research', 'ax-platform', 'company', 'news', 'equipment', 'contact'];
const checked = new Set();
const failures = [];
const textExtensions = new Set(['.html', '.js', '.css', '.json']);

function localUrl(reference, base) {
  if (!reference || /^(?:#|data:|mailto:|tel:|javascript:)/i.test(reference)) return null;
  let url;
  try {
    url = new URL(reference, base);
  } catch {
    return null;
  }
  if (url.origin !== origin.origin) return null;
  url.hash = '';
  return url;
}

function collectReferences(body, kind) {
  const refs = new Set();
  if (kind === 'json') {
    const collectMedia = value => {
      if (Array.isArray(value)) {
        for (const item of value) collectMedia(item);
      } else if (value && typeof value === 'object') {
        for (const [key, item] of Object.entries(value)) {
          if (['src', 'image', 'poster'].includes(key) && typeof item === 'string') refs.add(item);
          else collectMedia(item);
        }
      }
    };
    try {
      collectMedia(JSON.parse(body));
    } catch {
      return refs;
    }
    return refs;
  }
  const attributePattern = kind === 'html' ? /\b(?:href|src)\s*=\s*["']([^"']+)["']/gi : null;
  if (attributePattern) {
    for (const match of body.matchAll(attributePattern)) refs.add(match[1]);
  }
  for (const match of body.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) refs.add(match[1]);
  const assetReferencePattern = /(?:assets\/|\.\.\/assets\/)[A-Za-z0-9_./@%+~-]+\.(?:png|jpe?g|webp|gif|svg|pdf|mp4|webm|json|woff2?|ttf|otf)(?:\?[^"'`\s)]*)?/gi;
  for (const match of body.matchAll(assetReferencePattern)) {
    refs.add(match[0].replace(/^\.\.\//, ''));
  }
  for (const match of body.matchAll(/(?:^|["'`(\s])((?:content|film-manifest)\.json)(?:["'`?\s)]|$)/g)) refs.add(match[1]);
  return refs;
}

async function checkUrl(url, source) {
  const key = url.href;
  if (checked.has(key)) return;
  checked.add(key);
  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    failures.push(`${response?.status || 'ERR'} ${url.pathname} (from ${source}: ${error.message})`);
    return;
  }
  if (!response.ok) {
    failures.push(`${response.status} ${url.pathname} (from ${source})`);
    return;
  }
  const ext = path.extname(url.pathname).toLowerCase();
  if (textExtensions.has(ext)) {
    const body = await response.text();
    const kind = ext === '.html' ? 'html' : ext === '.css' ? 'css' : ext === '.json' ? 'json' : 'text';
    for (const reference of collectReferences(body, kind)) {
      const resolved = localUrl(reference, url);
      if (resolved) await checkUrl(resolved, url.pathname);
    }
  }
}

for (const route of routes) {
  for (const lang of ['ko', 'en']) {
    const page = new URL(`${route}.html?lang=${lang}`, origin);
    await checkUrl(page, 'route matrix');
  }
}

// The client fetches these documents at runtime rather than declaring them in HTML.
for (const runtimeJson of ['content.json', 'film-manifest.json']) {
  await checkUrl(new URL(runtimeJson, origin), 'runtime fetch');
}

const checkedPaths = [...checked].map(value => new URL(value).pathname);
const routeChecks = routes.length * 2;
const assetCount = checkedPaths.filter(value => !value.endsWith('.html')).length;
if (failures.length) {
  console.error(`Route checks: ${routeChecks}; local files checked: ${checked.size}; failures: ${failures.length}`);
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`PASS ${routeChecks} KO/EN route requests; ${assetCount} local script, style, data, and media references returned 2xx.`);
  console.log(`Preview origin: ${origin.origin}`);
}
