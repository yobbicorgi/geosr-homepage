import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

// Exercise the actual player with a small DOM boundary, without fetching media.
class Element extends EventTarget {
  constructor() {
    super(); this.dataset = {}; this.children = []; this.isConnected = true;
    this.hidden = false; this.paused = true; this.attrs = new Map();
    const classes = new Set();
    this.classList = { add: x => classes.add(x), remove: x => classes.delete(x), contains: x => classes.has(x) };
  }
  append(item) { this.children.push(item); }
  closest() { return this.hidden ? this : null; }
  querySelector(selector) { return selector === '[data-film-error]' ? this.children.find(x => 'filmError' in x.dataset) : null; }
  setAttribute(k, v) { this.attrs.set(k, String(v)); }
  play() { this.paused = false; this.dispatchEvent(new Event('playing')); return Promise.resolve(); }
  pause() { this.paused = true; this.dispatchEvent(new Event('pause')); }
  remove() { this.isConnected = false; }
}

const source = await readFile(new URL('../dist/film-player.js', import.meta.url), 'utf8');
const host = new Element(); host.dataset.filmSlot = 'geosr-hero';
const pendingHost = new Element(); pendingHost.dataset.filmSlot = 'ax-concept-film';
const unsafeHost = new Element(); unsafeHost.dataset.filmSlot = 'unsafe';
const draftHost = new Element(); draftHost.dataset.filmSlot = 'draft';
const hosts = new Map([['geosr-hero', host], ['ax-concept-film', pendingHost], ['unsafe', unsafeHost]]);
hosts.set('draft', draftHost);
const button = new Element();
const doc = new EventTarget();
doc.documentElement = { lang: 'ko' }; doc.hidden = false;
doc.querySelector = selector => selector.startsWith('[data-film-slot=') ? hosts.get(selector.match(/"([^"]+)"/)[1]) : selector === '[data-film-toggle="geosr-hero"]' ? button : null;
doc.querySelectorAll = selector => selector === '[data-film-slot]' ? [...hosts.values()] : [];
doc.createElement = () => new Element();
const reduced = new EventTarget(); reduced.matches = false;
let observer;
class Observer {
  constructor(callback) { this.callback = callback; this.hosts = new Set(); observer = this; }
  observe(host) { this.hosts.add(host); }
  unobserve(host) { this.hosts.delete(host); }
  visibility(host, on) { this.callback([{ target: host, isIntersecting: on }]); }
}
class Custom extends Event { constructor(type, options) { super(type); this.detail = options?.detail; } }
const win = { IntersectionObserver: Observer };
vm.runInNewContext(source, {
  window: win, document: doc, navigator: {}, matchMedia: () => reduced,
  IntersectionObserver: Observer, Event, CustomEvent: Custom, console,
  fetch: async () => ({ ok: true, json: async () => ({ slots: [
    { id: 'geosr-hero', mode: 'loop', src: 'assets/films/geosr-hero.mp4', approval: 'approved' },
    { id: 'ax-concept-film', mode: 'loop', src: null, approval: 'pending' },
    { id: 'unsafe', mode: 'loop', src: 'https://example.com/video.mp4', approval: 'approved' },
    { id: 'draft', mode: 'loop', src: 'assets/films/test-draft.mp4', approval: 'draft-reviewed' }
  ] }) })
});
const status = await win.GeoSRFilm.ready;
assert.equal(status.approved, 2);
assert.equal(draftHost.classList.contains('film-draft'), true);
assert.equal(draftHost.children[0].textContent, '720p 콘셉트 초안');
observer.visibility(draftHost, true);
assert.equal(draftHost.children.find(x => x.className === 'film-video').paused, false);
observer.visibility(pendingHost, true); observer.visibility(unsafeHost, true);
assert.equal(pendingHost.children.length, 0, 'Pending media must make no video request');
assert.equal(unsafeHost.children.length, 0, 'Only local delivery paths are allowed');
observer.visibility(host, true);
const video = host.children[0];
assert.equal(video.loop, true); assert.equal(video.paused, false);
assert.equal(button.attrs.get('aria-pressed'), 'true');
doc.hidden = true; doc.dispatchEvent(new Event('visibilitychange'));
assert.equal(video.paused, true, 'Background page pauses video');
doc.hidden = false; reduced.matches = true; reduced.dispatchEvent(new Event('change'));
assert.equal(video.paused, true, 'Reduced motion stops autoplay');
button.dispatchEvent(new Event('click'));
assert.equal(video.paused, false, 'Explicit play remains available');
video.dispatchEvent(new Event('loadedmetadata'));
assert.equal(video.paused, false, 'Metadata arrival must not cancel explicit playback under reduced motion');
button.dispatchEvent(new Event('click'));
reduced.matches = false; reduced.dispatchEvent(new Event('change'));
assert.equal(video.paused, true, 'User pause survives environmental changes');
host.isConnected = false;
const replacement = new Element(); replacement.dataset.filmSlot = 'geosr-hero'; hosts.set('geosr-hero', replacement);
doc.dispatchEvent(new Event('geosr:media-updated'));
assert.equal(observer.hosts.has(host), false, 'Removed stage is unobserved');
observer.visibility(replacement, true);
assert.equal(replacement.children.length, 1, 'New stage reconnects to approved media');
win.GeoSRFilm.refresh();
assert.equal(replacement.children.length, 1, 'Repeated initialization is idempotent');
const replacementVideo = replacement.children[0]; replacementVideo.dispatchEvent(new Event('error'));
assert.equal(replacement.dataset.filmState, 'error'); assert.equal(button.hidden, true);
assert.equal(replacement.classList.contains('film-loaded'), false, 'Failure returns to poster');
assert.ok(replacement.querySelector('[data-film-error]'));
console.log('PASS film lifecycle: pending/local boundary, visibility, reduced motion, explicit control, stage replacement, idempotency, error fallback');
