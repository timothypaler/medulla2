"""Reproducible source-plate adaptations. No generated medical anatomy.
Original files remain untouched. Editable labels are removed; printed labels are
masked without moving source anatomy. Per-target coordinates are recorded before
aspect-preserving placement. See source manifest and review contact sheets.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps, ImageFilter
from lxml import etree as E
import json, re, base64, io, subprocess, html, numpy as np, hashlib, copy
import fcntl, os, time
from concurrent.futures import ThreadPoolExecutor
B=Path(__file__).resolve().parent
REPO=B.parent/'medulla-hosted/.sites-checkout'
OUT=B/'built';OUT.mkdir(exist_ok=True)
CACHE=B/'prepared';CACHE.mkdir(exist_ok=True)
SVG='http://www.w3.org/2000/svg'; XLINK='http://www.w3.org/1999/xlink'
metadata={}
for f in B.rglob('*metadata*.json'):
 try:
  data=json.loads(f.read_text()); pages=data.get('query',{}).get('pages',{})
  if data.get('imageinfo'):pages={'single':data}
  if not pages and any(str(k).startswith('File:') for k in data):pages={k:v for k,v in data.items() if isinstance(v,dict) and v.get('imageinfo')}
  for p in pages.values():
   if p.get('imageinfo'):metadata[p['title'][5:].replace(' ','_')]=p['imageinfo'][0]
 except (ValueError,AttributeError):pass
OVERRIDES={
 'neuro-assets/Lower_pons_horizontal_KB.svg':('Lower pons horizontal KB.svg','Marshall Strother; locator source by Patrick J. Lynch (locator omitted in this adaptation)','CC BY 3.0','https://creativecommons.org/licenses/by/3.0/'),
 'respiratory-assets/lungs-unlabelled.svg':('Respiratory system complete no labels.svg','Bibi Saint-Pol; Jmarchn','CC BY-SA 3.0','https://creativecommons.org/licenses/by-sa/3.0/'),
 'neuro-assets/brain-inferior.svg':('Brain human normal inferior view with labels en-2.svg','Patrick J. Lynch, medical illustrator; C. Carl Jaffe, MD, cardiologist','CC BY 2.5','https://creativecommons.org/licenses/by/2.5/'),
 'body-assets/human-planes-source.svg':('Human anatomy planes, labeled.svg','David Richfield; Mikael Häggström, MD; CMG Lee','CC BY-SA 4.0','https://creativecommons.org/licenses/by-sa/4.0/'),
 'neuro-assets/Henry_Gray_Figura_516.svg':('Henry Gray Figura 516.svg','Henry Vandyke Carter; Jmarchn (SVG adaptation)','CC BY-SA 3.0','https://creativecommons.org/licenses/by-sa/3.0/'),
 'pelvic-larynx-assets/Recurrent_laryngeal_nerve.svg':('Recurrent laryngeal nerve.svg','Jkwchui, based on Truth-seeker2004','CC BY-SA 3.0','https://creativecommons.org/licenses/by-sa/3.0/'),
 'respiratory-assets/upper-airway-openstax.jpg':('2303 Anatomy of Nose-Pharynx-Mouth-Larynx.jpg','OpenStax College','CC BY 3.0','https://creativecommons.org/licenses/by/3.0/'),
 'respiratory-assets/respiratory-zone-openstax.jpg':('2310 Structures of the Respiratory Zone.jpg','OpenStax College','CC BY 3.0','https://creativecommons.org/licenses/by/3.0/'),
 'respiratory-assets/pleura-source.jpg':('2313 The Lung Pleurea.jpg','OpenStax College','CC BY 3.0','https://creativecommons.org/licenses/by/3.0/'),
}
def credit(rel):
 name=Path(rel).name
 if rel in OVERRIDES:
  title,creator,license,url=OVERRIDES[rel]
  return dict(sourceUrl='https://commons.wikimedia.org/wiki/File:'+title.replace(' ','_'),creator=creator,license=license,licenseUrl=url,sourceFile=rel)
 m=metadata.get({'sinuses.svg':'Paranasal_sinuses.svg'}.get(name,name),{})
 ext=m.get('extmetadata',{})
 clean=lambda k:html.unescape(re.sub('<[^>]+>','',ext.get(k,{}).get('value',''))).strip()
 if name.startswith('Gray'):
  return dict(sourceUrl=m.get('descriptionurl','https://commons.wikimedia.org/wiki/File:'+name),creator='Henry Vandyke Carter; Gray’s Anatomy (1918)',license='Public domain',licenseUrl='https://creativecommons.org/publicdomain/mark/1.0/',sourceFile=rel)
 if not m:raise ValueError('Missing licence metadata: '+rel)
 return dict(sourceUrl=m['descriptionurl'],creator=clean('Artist') or clean('Credit'),license=clean('LicenseShortName'),licenseUrl=clean('LicenseUrl') or 'https://commons.wikimedia.org/wiki/Commons:Licensing',sourceFile=rel)

def prepare(rel,**kwargs):
 key=hashlib.sha1(json.dumps([rel,kwargs],sort_keys=True).encode()).hexdigest()[:16]
 with open(CACHE/(key+'.lock'),'w') as lock:
  fcntl.flock(lock,fcntl.LOCK_EX)
  return _prepare(rel,**kwargs)

def _prepare(rel,extract=False,remove_layers=(),ocr=True,mask=(),preserve=False):
 """Return label-cleaned raster with original source coordinate system."""
 key=hashlib.sha1(json.dumps([rel,extract,remove_layers,ocr,mask,preserve]).encode()).hexdigest()[:15]
 dest=CACHE/(key+'-palette4.png');ref=CACHE/(key+'-original.png')
 if dest.exists():
  try:return Image.open(dest).convert('RGBA')
  except (OSError,SyntaxError):dest.unlink(missing_ok=True)
 src=B/rel
 if src.suffix=='.svg':
  root=E.parse(str(src)).getroot()
  if extract:
   ims=root.findall('.//{'+SVG+'}image');im=ims[0]
   data=im.get('{'+XLINK+'}href') or im.get('href')
   raw=base64.b64decode(data.split(',',1)[1]);image=Image.open(io.BytesIO(raw)).convert('RGBA')
  else:
   if rel=='neuro-assets/brain-inferior.svg':
    for el in list(root):
     if el.get('id') not in ['metadata304','namedview302','defs969','g3879','use2853','path3877']:root.remove(el)
   for el in list(root.iter()):
    if not isinstance(el.tag,str):continue
    label=el.get('{http://www.inkscape.org/namespaces/inkscape}label','')
    tag=E.QName(el).localname
    if tag in ['text','script','foreignObject','metadata','namedview'] or el.get('id') in remove_layers or label in remove_layers:
     par=el.getparent()
     if par is not None:par.remove(el)
   clean=CACHE/(key+'.svg');clean.write_bytes(E.tostring(root))
   subprocess.run(['inkscape',str(clean),'--export-type=png','--export-width=1800',f'--export-filename={ref}'],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
   image=Image.open(ref).convert('RGBA')
 else:image=Image.open(src).convert('RGBA')
 # Composite on paper before printed-label removal.
 paper=Image.new('RGBA',image.size,'white');paper.alpha_composite(image);image=paper.convert('RGB')
 image.save(ref)
 boxes=[]
 if ocr:
  scale=max(1,min(3,1500/image.width))
  ocrfile=CACHE/(key+'-ocr.png');image.resize((round(image.width*scale),round(image.height*scale))).save(ocrfile)
  tsv=CACHE/(key+'-hi.tsv')
  if not tsv.exists():
   run=subprocess.run(['tesseract',str(ocrfile),'stdout','--psm','11','tsv'],capture_output=True,text=True,check=True);tsv.write_text(run.stdout)
  for line in tsv.read_text().splitlines()[1:]:
   fields=line.split('\t')
   if len(fields)<12:continue
   word=fields[11].strip();conf=float(fields[10])
   if conf<30 or len(re.sub('[^A-Za-z]','',word))<3:continue
   x,y,w,h=[float(v)/scale for v in fields[6:10]];pad=1
   boxes.append((max(0,round(x-pad)),max(0,round(y-pad)),min(image.width,round(x+w+pad)),min(image.height,round(y+h+pad))))
 for x0,y0,x1,y1 in mask:boxes.append(tuple(round(q*z) for q,z in zip((x0,y0,x1,y1),(image.width,image.height,image.width,image.height))))
 # Remove printed editorial lettering with its immediate paper/tissue tone.
 # Only label rectangles change; source structure coordinates do not move.
 original=image.copy()
 for box in boxes:
  x0,y0,x1,y1=box
  if x1<=x0 or y1<=y0:continue
  border=original.crop((max(0,x0-2),max(0,y0-2),min(image.width,x1+2),min(image.height,y1+2)))
  ar=np.array(border);edge=np.concatenate([ar[:2].reshape(-1,3),ar[-2:].reshape(-1,3),ar[:,:2].reshape(-1,3),ar[:,-2:].reshape(-1,3)])
  tone=tuple(np.median(edge,axis=0).astype('uint8'))
  patch=Image.new('RGB',(x1-x0,y1-y0),tone)
  image.paste(patch,box)
 if preserve:
  result=image.convert('RGBA')
 else:
  a=np.array(image).astype(float);lum=a[:,:,:3]@np.array([.2126,.7152,.0722]);ink=np.clip((249-lum)/220,0,1)
  # Off-white paper becomes transparent. Dark source engraving becomes pale
  # lavender with tonal depth, like the original Medulla source plates.
  saturation=(a[:,:,:3].max(axis=2)-a[:,:,:3].min(axis=2))/255
  ink=np.maximum(np.clip((236-lum)/140,0,1),np.clip((saturation-.08)*1.65,0,.85))
  alpha=(np.power(ink,.72)*245).astype('uint8');tone=1-ink
  bright=np.clip((saturation-.10)*3,0,1)
  rgb=np.stack([153+tone*25+bright*59,146+tone*25+bright*58,177+tone*25+bright*53],axis=2).clip(0,255).astype('uint8')
  result=Image.fromarray(np.dstack([rgb,alpha]),'RGBA')
 temp=dest.with_suffix('.working.png');result.save(temp,compress_level=4);os.replace(temp,dest);return result

def panel(rel, targets, crop=(0,0,1,1), rect=(18,42,414,464), **kwargs):
 return dict(file=rel,targets=targets,crop=crop,rect=rect,**kwargs)
def view(id,label,*panels,note='Source anatomy, with labels removed; target pins indicate visible landmarks.'):
 return dict(id=id,label=label,panels=list(panels),note=note)
def dot(x,y,r=4):return f'M{x-r},{y}a{r},{r} 0 1,0 {r*2},0a{r},{r} 0 1,0 -{r*2},0'

def render_view(region,v):
 root=E.Element('svg',nsmap={None:SVG},viewBox='0 0 450 540',width='450',height='540')
 anchors={};targetmeta={};sources=[]
 for j,p in enumerate(v['panels']):
  im=prepare(p['file'],**{k:p[k] for k in ['extract','remove_layers','ocr','mask','preserve'] if k in p})
  W,H=im.size;x0,y0,x1,y1=p['crop'];crop=(round(x0*W),round(y0*H),round(x1*W),round(y1*H));im=im.crop(crop)
  x,y,w,h=p['rect'];s=min(w/im.width,h/im.height);tx=x+(w-im.width*s)/2;ty=y+(h-im.height*s)/2
  data=io.BytesIO();im.save(data,format='PNG',compress_level=4)
  E.SubElement(root,'image',**{'{'+XLINK+'}href':'data:image/png;base64,'+base64.b64encode(data.getvalue()).decode()},x=str(round(tx,3)),y=str(round(ty,3)),width=str(round(im.width*s,3)),height=str(round(im.height*s,3)))
  c=credit(p['file']);sources.append(c)
  for id,(fx,fy) in p['targets'].items():
   assert x0<=fx<=x1 and y0<=fy<=y1,(region,id,'outside source crop')
   at=[round(tx+(fx*W-crop[0])*s,2),round(ty+(fy*H-crop[1])*s,2)];anchors[id]=at
   targetmeta[id]=dict(highlightMode='source-specific-pin',sourceCoordinate=[fx,fy],sourceFile=p['file'],sourceUrl=c['sourceUrl'],viewId=v['id'])
 # Orientation text is not an answer label.
 t=E.SubElement(root,'text',x='225',y='24',fill='#aca2c7',**{'text-anchor':'middle','font-family':'Arial, sans-serif','font-size':'8','letter-spacing':'1.2'});t.text=v['label'].upper()
 raw=E.tostring(root).decode();path=OUT/region;path.mkdir(exist_ok=True);(path/(v['id']+'.svg')).write_text(raw)
 # Also produce compact thumbnail and a numbered QA key from the same geometry.
 png=path/(v['id']+'.png');subprocess.run(['inkscape',str(path/(v['id']+'.svg')),'--export-type=png','--export-width=900',f'--export-filename={png}'],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
 thumb=np.array(Image.open(png).convert('RGBA').resize((450,540)));thumb[:,:,:3]=(thumb[:,:,:3].astype(float)*.62).astype('uint8');Image.fromarray(thumb).save(path/(v['id']+'.webp'),quality=89,method=4)
 qa=copy.deepcopy(root)
 for i,(id,at) in enumerate(anchors.items()):
  E.SubElement(qa,'circle',cx=str(at[0]),cy=str(at[1]),r='3.4',fill='#e0005b',stroke='white',**{'stroke-width':'.8'})
  t=E.SubElement(qa,'text',x=str(at[0]+4),y=str(at[1]-4),fill='#e0005b',**{'font-family':'Arial','font-size':'8','font-weight':'bold'});t.text=str(i+1)
 q=path/(v['id']+'-qa.svg');q.write_bytes(E.tostring(qa));subprocess.run(['inkscape',str(q),'--export-type=png','--export-width=900',f'--export-filename={path}/{v["id"]}-qa.png'],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
 (path/(v['id']+'-key.json')).write_text(json.dumps({str(i+1):id for i,id in enumerate(anchors)},indent=2))
 return dict(id=v['id'],label=v['label'],baseSvg=raw,previewSrc='',partIds=list(anchors),view=v['label'],limitations=[v['note']],sourceCredits=sources),anchors,targetmeta

def render_region(item):
 region,vs=item
 views=[];anchors={};targetmeta={};credits=[]
 for v in vs:
  rv,aa,tm=render_view(region,v);views.append(rv)
  assert not set(anchors)&set(aa),(region,'duplicate target view')
  anchors.update(aa);targetmeta.update(tm);credits.extend(rv['sourceCredits'])
 cs=list({c['sourceUrl']:c for c in credits}.values());first=cs[0]
 record=dict(baseSvg=views[0]['baseSvg'],variants={},anchors=anchors,views=views,sourceUrl=first['sourceUrl'],sourceUrls=[c['sourceUrl'] for c in cs],creator='; '.join(dict.fromkeys(c['creator'] for c in cs)),license='Individual source licences',licenseUrl='/anatomy-credits.md',sourceCredits=cs,view=' · '.join(v['label'] for v in vs),limitations=['Multiple source views; pins identify visible representative points, not a complete boundary or all anatomical variants.'],targetMetadata=targetmeta,reviewStatus='source-mapped-draft-needs-anatomist-review',adaptation='Source anatomy retained; editorial labels removed or masked; palette adapted; aspect-preserving placement; explicit per-view target coordinates.')
 print(region,len(anchors),'targets',len(views),'views',flush=True)
 return region,record

def build(specs):
 with ThreadPoolExecutor(max_workers=4) as pool:records=dict(pool.map(render_region,specs.items()))
 (OUT/'plates-embedded.json').write_text(json.dumps(records,separators=(',',':')))
 return records
if __name__=='__main__':
 from plate_specs import specs
 build(specs)
