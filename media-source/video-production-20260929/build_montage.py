import json, subprocess
from pathlib import Path

base=Path(__file__).resolve().parent
rows=json.loads((base/'user-seven-verified.json').read_text(encoding='utf-8-sig'))
lookup={r['id']:r['path'] for r in rows}
lookup['bed9f422-2a2d-4cf7-b558-b2f195e0d349']=str(base/'sat-reviewed.mp4')
cuts=[
 ('bed9f422-2a2d-4cf7-b558-b2f195e0d349','Satellite observation',0.5,3),
 ('7128a0e7-e8a0-46b6-80c6-4085bea8f2c9','UAV flight',0.5,4),
 ('1b5e3ea6-16ba-4a9d-a588-a07fe282c7cd','CTD observation',0,3),
 ('be16f288-63c4-4207-9027-31f5a2673347','Seismic section',0.5,4),
 ('1ed7775c-dd67-41ef-97e4-1ea18c8688a6','Model mesh',0.5,5),
 ('5880996e-6f0b-444b-8458-82112dd1dc3d','Diffusion concept',0.5,5),
 ('4ba035ad-fb8d-4e36-a230-8e0498dd4386','Ocean flow',0,5),
]
cmd=['ffmpeg','-hide_banner','-loglevel','warning','-y','-filter_complex_threads','1']
for ident,_,start,dur in cuts:
 cmd += ['-ss',str(start),'-t',str(dur),'-i',lookup[ident]]
filters=[f'[{i}:v]fps=24,settb=AVTB,setpts=PTS-STARTPTS,setsar=1,format=yuv420p[v{i}]' for i in range(len(cuts))]
timeline=[];total=0;last='v0'
for i,(ident,title,start,dur) in enumerate(cuts):
 at=0 if i==0 else total-.25
 timeline.append(dict(id=ident,title=title,source=lookup[ident],sourceStart=start,sourceDuration=dur,timelineStart=at))
 if i:
  filters.append(f'[{last}][v{i}]xfade=transition=fade:duration=0.25:offset={at}[x{i}]')
  last=f'x{i}'
 total=at+dur
cmd += ['-filter_complex',';'.join(filters),'-map',f'[{last}]','-an','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(base/'geosr-main-montage-candidate.mp4')]
(base/'montage-timeline.json').write_text(json.dumps({'duration':total,'transition':'0.25s dissolve','graphicsAdded':False,'colorGrading':False,'cuts':timeline},indent=2),encoding='utf-8')
subprocess.run(cmd,check=True)



