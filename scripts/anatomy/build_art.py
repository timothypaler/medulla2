"""Rebuild per-bone SVG data from retained licensed source artwork.
Optional authoring dependencies: lxml, svgelements. No runtime dependencies.
Run from the repository root: python scripts/anatomy/build_art.py
See assets/anatomy/NOTICE.md for provenance, viewing directions and licenses.
"""
from pathlib import Path as File
from lxml import etree as E
from svgelements import SVG, Path, Matrix
import json, re
NS={'s':'http://www.w3.org/2000/svg'}
def compact(d):
    return re.sub(r'-?\d*\.?\d+(?:[eE][+-]?\d+)?',lambda m:format(round(float(m[0]),3),'g'),d)
def save(plate,data):
    File(f'app/{plate}-art.json').write_text(json.dumps(data,separators=(',',':'))+'\n')
def item(shapes):
    b=Path(shapes[0]['d']).bbox()
    return {'shapes':shapes,'anchor':[round(float((b[0]+b[2])/2),2),round(float((b[1]+b[3])/2),2)]}
# Palmar hand: proximal-row pisiform overlays the triquetrum.
r=E.parse('assets/anatomy/hand-source.svg').getroot()
mapping={'g119-7':'radius','g119-7-5':'ulna','g109':'scaphoid','g127':'lunate','g155':'triquetrum','g165':'pisiform','g253':'trapezium','g299':'trapezoid','g117':'capitate','g143':'hamate','g285':'mc1','g323':'mc2','g207':'mc3','g173':'mc4','g187':'mc5','g259':'ph1-proximal','g271':'ph1-distal','g305':'ph2-proximal','g315':'ph2-middle','g243':'ph2-distal','g219':'ph3-proximal','g229':'ph3-middle','g237':'ph3-distal','g17':'ph4-proximal','g25':'ph4-middle','g43':'ph4-distal','g55':'ph5-proximal','g75':'ph5-middle','g95':'ph5-distal'}
scale=470/(435.1-7.8); out={}
for gid,pid in mapping.items():
    g=r.xpath(f'//*[@id="{gid}"]')[0]; arr=[]
    for i,e in enumerate(g.findall('.//s:path',NS)):
        q=Path(e.get('d'));q*=Matrix(g.get('transform',''));q.reify();q*=Matrix(f'translate({225-168.2*scale},{35-7.8*scale}) scale({scale})');q.reify()
        arr.append({'d':compact(q.d()),'kind':'bone',**({'detail':True} if i else {})})
    out[pid]=item(arr)
out['triquetrum']['anchor']=[round(225+(211-168.2)*scale,2),round(35+(360-7.8)*scale,2)]
assert len(out)==29
save('hand',out)
# Dorsal foot: map tarsals to the source's numbered key (6 calcaneus, 7 talus).
source=SVG.parse('assets/anatomy/foot-source.svg');paths={e.id:e for e in source.elements() if isinstance(e,Path)}
mapping={'calcaneus':'path2468-6','talus':'path2470-75','navicular':'path2478','cuboid':'path2480','medial-cuneiform':'path2482','intermediate-cuneiform':'path2486','lateral-cuneiform':'path2488'}
for i in range(5):
    mapping[f'mt{i+1}']=f'path{2492+i*2}';mapping[f'toe{i+1}-proximal']=f'path{2504+i*2}';mapping[f'toe{i+1}-distal']=f'path{2530+i*2}'
    if i:mapping[f'toe{i+1}-middle']=f'path{2518+i*2}'
scale=470/(383.4-51.5);out={}
for pid,sid in mapping.items():
    q=Path(paths[sid]);q*=Matrix(f'translate({225-267.75*scale},{35-51.5*scale}) scale({scale})');q.reify()
    out[pid]=item([{'d':compact(q.d()),'kind':'bone'}])
# Place the calcaneus marker on its exposed heel, outside the overlying talus.
out['calcaneus']['anchor']=[round(225+(282-267.75)*scale,2),round(35+(370-51.5)*scale,2)]
assert len(out)==26
save('foot',out)
# Anterior right leg: source XML groups preserve the original contour layers.
r=E.parse('assets/anatomy/skeleton-source.svg').getroot()
raw={'femur':r[28][0],'patella':r[28][1],'tibia':r[26],'fibula':r[25]};out={};scale=470/(849.7-426.5)
for pid,g in raw.items():
    es=[g] if E.QName(g).localname=='path' else g.findall('.//s:path',NS);arr=[]
    for e in es:
        q=Path(e.get('d'));q*=Matrix(f'translate({225-162.75*scale},{35-426.5*scale}) scale({scale})');q.reify()
        arr.append({'d':compact(q.d()),'kind':'bone',**({'detail':True} if e.get('stroke') is None else {})})
    out[pid]=item(arr)
save('leg',out)
print('Rebuilt 59 mapped bones: hand 29, foot 26, thigh/leg 4.')
