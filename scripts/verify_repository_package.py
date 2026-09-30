"""Verify the current-version Git package, asset dependencies and handoff links."""
import hashlib
import html
import json
import re
import subprocess
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
errors = []


def check(condition, message):
    if not condition:
        errors.append(message)


tracked = [p for p in subprocess.check_output(['git', 'ls-files', '-z'], cwd=ROOT).decode('utf8').split('\0') if p and (ROOT / p).is_file()]
expected_scripts = {
    'build_business_details.mjs', 'build_business_areas.py', 'build_technology_media.py',
    'build_technology_relations.py', 'sync_page_metadata.mjs', 'verify_redesign_routes.mjs',
    'verify_metadata_accessibility.mjs', 'verify_film_lifecycle.mjs', 'verify_public_archive.py',
    'verify_news_translations.py', 'verify_repository_package.py',
}
doc_prefixes = (
    'docs/handoff/', 'docs/media/', 'docs/company-audit/', 'docs/source-migration/',
    'docs/redesign-next/', 'docs/screenshots/20260929-design-review/',
)
excluded_prefixes = (
    'media-source/', 'docs/redesign-plan/', 'docs/redesign-production/',
    'docs/redesign-next/qa/', 'docs/redesign-next/keyframes/', 'docs/source-migration/assets/',
    'tmp/', '.source-review/', '.openai/local/', 'archives/', 'downloads/',
    'docs/source-migration/inventory.', 'docs/source-migration/request-log.',
    'docs/source-migration/pages.', 'docs/source-migration/ui-copy-provenance.',
)
for p in tracked:
    allowed = p in {'README.md', 'AGENTS.md', '.gitignore', '.openai/hosting.json', 'docs/screenshots/20260929/menu-mobile.png'} or p.startswith('dist/') or p.startswith(doc_prefixes) or (p.startswith('scripts/') and Path(p).name in expected_scripts)
    check(allowed and not p.startswith(excluded_prefixes), f'Unexpected tracked package member: {p}')
    check(not p.endswith(('.log', '.jsonl')) and '/__pycache__/' not in p, f'Raw or temporary output tracked: {p}')

baseline = ROOT / 'docs/handoff/site-files.sha256'
expected = {}
text_suffixes = {'.html', '.css', '.js', '.json', '.svg', '.txt'}


def file_digest(path):
    data = path.read_bytes()
    # Git checkouts may use LF or CRLF; text content must be portable
    if path.suffix.lower() in text_suffixes:
        data = data.replace(b'\r\n', b'\n')
    return hashlib.sha256(data).hexdigest()


for line in baseline.read_text(encoding='utf8').splitlines():
    if not line or line.startswith('#'):
        continue
    digest, relative = line.split('  ', 1)
    expected[relative] = digest
    path = ROOT / relative
    check(path.is_file(), f'Missing baseline file: {relative}')
    if path.is_file():
        check(file_digest(path) == digest, f'Changed baseline file: {relative}')
actual = {p.relative_to(ROOT).as_posix() for p in DIST.rglob('*') if p.is_file()}
check(actual == set(expected), f'Unregistered website files: added={sorted(actual-set(expected))} missing={sorted(set(expected)-actual)}')

text_files = [p for p in DIST.iterdir() if p.suffix in {'.html', '.js', '.css', '.json', '.svg'}]
parts = []
for path in text_files:
    text = path.read_text(encoding='utf8')
    if path.suffix == '.json':
        text += '\n' + json.dumps(json.loads(text), ensure_ascii=False)
    parts.append(html.unescape(unquote(text)).replace('\\/', '/'))
haystack = '\n'.join(parts).lower()
# Service IDs deliberately construct filenames at runtime rather than list them literally
service_text = (DIST / 'ax-v2.js').read_text(encoding='utf8')
service_ids = set(re.findall(r"\{id:'([^']+)'", service_text)) - {'flood-xai'}
dynamic_assets = {'dist/assets/ax-embedded/' + ident + '.webp' for ident in service_ids}
check(len(service_ids) == 8, 'AX capture service ID set changed')
for relative in dynamic_assets:
    check((ROOT / relative).is_file(), f'Missing dynamic AX image: {relative}')
for page in ['ax-platform.html', 'platforms.html']:
    text = (DIST / page).read_text(encoding='utf8')
    order = [text.find(f'src="{name}') for name in ['ax-v2.js', 'ax-embedded-gallery.js', 'site.js']]
    check(all(i >= 0 for i in order) and order == sorted(order), f'AX route script order changed: {page}')

asset_count = 0
for asset in (DIST / 'assets').rglob('*'):
    if not asset.is_file():
        continue
    asset_count += 1
    relative = asset.relative_to(ROOT).as_posix()
    check(asset.name.lower() in haystack or relative in dynamic_assets or asset.name == 'OFL.txt', f'Asset has no runtime reference: {relative}')


def local_reference(base, value):
    value = html.unescape(value).strip()
    if not value or value.startswith(('#', 'data:', '//')) or urlsplit(value).scheme or '${' in value:
        return
    target = unquote(urlsplit(value).path)
    if target:
        check((base / target).is_file(), f'Missing local reference: {base.relative_to(ROOT)}/{target}')


for path in text_files:
    text = path.read_text(encoding='utf8')
    if path.suffix == '.html':
        for value in re.findall(r'(?:src|href)=["\']([^"\']+)', text):
            local_reference(path.parent, value)
    elif path.suffix == '.css':
        for value in re.findall(r'url\(["\']?([^"\')]+)', text):
            local_reference(path.parent, value)
    elif path.suffix == '.js':
        for value in re.findall(r'["\'`](assets/[^"\'`\s<>]+\.[a-zA-Z0-9]{2,5})["\'`]', text):
            local_reference(DIST, value)
    elif path.suffix == '.json':
        def visit(node):
            if isinstance(node, dict):
                for key, value in node.items():
                    if key in {'src', 'poster', 'image'} and isinstance(value, str) and value.startswith('assets/'):
                        local_reference(DIST, value)
                    visit(value)
            elif isinstance(node, list):
                for value in node:
                    visit(value)
        visit(json.loads(text))

link_count = 0
for document in [ROOT / 'README.md'] + list((ROOT / 'docs').rglob('*.md')):
    for title, value in re.findall(r'\[([^\]]+)\]\(([^)]+)\)', document.read_text(encoding='utf8')):
        if not value.startswith('#') and not urlsplit(value).scheme and not value.startswith('//'):
            link_count += 1
        local_reference(document.parent, value)

check((DIST / 'assets/fonts/pretendard/LICENSE.txt').is_file(), 'Missing font license')
if errors:
    print(json.dumps({'errors': errors}, ensure_ascii=False, indent=2))
    raise SystemExit(1)
print(json.dumps({'result': 'PASS', 'trackedFilesPresent': len(tracked), 'websiteFiles': len(expected), 'assets': asset_count, 'dynamicAXImages': len(dynamic_assets), 'handoffLocalLinks': link_count, 'boundary': 'File integrity, package scope and static/dynamic dependencies; not visual approval or scientific validation'}, ensure_ascii=False, indent=2))
