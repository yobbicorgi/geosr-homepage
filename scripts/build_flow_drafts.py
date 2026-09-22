"""Reproducible 720p editorial drafts from reviewed sources, without AI edits to data/UI."""
if __name__ == '__main__':
    raise SystemExit('RETIRED: this assembly used rejected image/video bases. Follow docs/redesign-next/production-plan.json and 05-IMAGE-REBUILD.md instead')
from pathlib import Path
import json
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'dist/assets'
FILMS = ASSETS / 'films'

def run(args):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *args], check=True)

# Durations are final timeline contributions; 0.4s handles are included before crossfade
company = [
    ('films/flow-c01-earth-draft.mp4', 5, 0, 'video'),
    ('films/flow-c02-satellite-draft.mp4', 5, 0, 'video'),
    ('concepts/corporate-film/hero-earth-18s-v1.png', 4, 0, 'still'),
    ('concepts/corporate-film/hero-earth-22s-a-sst-v1.png', 3, 0, 'still'),
    ('concepts/corporate-film/hero-earth-22s-b-salinity-v1.png', 3, 0, 'still'),
    ('concepts/corporate-film/hero-earth-22s-c-chlorophyll-v1.png', 3, 0, 'still'),
    ('films/flow-c05-multibeam-draft.mp4', 7, 0, 'video'),
    ('films/flow-usv-existing-draft.mp4', 5, 0, 'video'),
    ('films/flow-c06-underwater-draft.mp4', 3, 0, 'video'),
    ('films/flow-c07-lab-draft.mp4', 8, 0, 'video'),
    ('concepts/corporate-film/hero-earth-22s-a-sst-v1.png', 4, 0, 'still'),
    ('concepts/corporate-film/hero-earth-22s-b-salinity-v1.png', 5, 0, 'still'),
    ('concepts/corporate-film/hero-earth-00s-v4.png', 5, 0, 'still'),
]
ax = [
    ('films/flow-ax01-layers-draft.mp4', 8, 0, 'video'),
    ('films/flow-ax03-monitor-draft.mp4', 8, 0, 'video'),
    ('films/flow-ax01-layers-draft.mp4', 7, 1, 'video'),
    ('concepts/ax-platform-v4/ax-data-planes-aligned-v1.png', 7, 0, 'still'),
]

def build(name, shots):
    with tempfile.TemporaryDirectory(prefix='geosr-film-') as tmp:
        folder = Path(tmp)
        for i, (src, seconds, start, kind) in enumerate(shots):
            duration = seconds + (0.4 if i < len(shots)-1 else 0)
            inp = ['-loop', '1', '-framerate', '24'] if kind == 'still' else ['-ss', str(start)]
            inp += ['-i', str(ASSETS / src)]
            filters = 'scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=24'
            # Old UI montages end with narrow menu crops; only use their first full-width 3.8s
            if kind == 'ui':
                filters += ',trim=duration=3.8,setpts=PTS-STARTPTS,tpad=stop_mode=clone:stop_duration=4'
            else:
                filters += ',tpad=stop_mode=clone:stop_duration=1'
            filters += ',format=yuv420p'
            run([*inp, '-an', '-vf', filters, '-t', str(duration), '-c:v', 'libx264', '-preset', 'fast', '-crf', '20', str(folder / f'{i}.mp4')])
        args=[]
        for i in range(len(shots)): args += ['-i', str(folder / f'{i}.mp4')]
        filters=[]
        last='0:v'; offset=0
        for i in range(1,len(shots)):
            offset += shots[i-1][1]
            dest=f'v{i}'
            filters.append(f'[{last}][{i}:v]xfade=transition=fade:duration=0.4:offset={offset}[{dest}]')
            last=dest
        run([*args, '-filter_complex_threads', '1', '-filter_complex', ';'.join(filters), '-map', f'[{last}]', '-an', '-t', str(sum(s[1] for s in shots)), '-c:v', 'libx264', '-preset', 'fast', '-crf', '21', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(FILMS / name)])
    print(name, sum(s[1] for s in shots), 'seconds', flush=True)

if __name__ == '__main__':
    build('geosr-hero-720p-draft.mp4', company)
    build('ax-concept-720p-draft.mp4', ax)
    (ROOT / 'docs/redesign-production/flow-review/edit-timeline.json').write_text(json.dumps({'company':company,'ax':ax,'note':'Concept drafts and archival UI previews, not live measurements or original field footage'},ensure_ascii=False,indent=2),encoding='utf-8')
