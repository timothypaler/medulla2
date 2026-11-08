import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import ts from 'typescript';
const cache=new Map();
function load(file){
 const full=path.resolve(file);if(cache.has(full))return cache.get(full).exports;
 const mod={exports:{}};cache.set(full,mod);
 const native=createRequire(full);
 const local=(id)=>{if(id.startsWith('.')){const candidate=path.resolve(path.dirname(full),id);if(candidate.endsWith('.json'))return JSON.parse(readFileSync(candidate,'utf8'));for(const p of [candidate,candidate+'.ts',candidate+'.tsx'])if(existsSync(p)&&/\.tsx?$/.test(p))return load(p);}return native(id);};
 const js=ts.transpileModule(readFileSync(full,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText;
 new Function('exports','require','module',js)(mod.exports,local,mod);return mod.exports;
}
const {answerLetters,answerCapacity,limitAnswer,answerState}=load('app/typing.ts');
const {regions,allParts}=load('app/atlas.ts');
const {secondsForStructure,remainingSeconds,answerTiming,clockLabel}=load('app/challenge.ts');
const {curriculumModules,anatomyCurriculum,appliedCases,relatedPlates,matchedCaseTarget,secondsForCase,validObjectiveKeys}=load('app/curriculum.ts');
const notes=JSON.parse(readFileSync('app/module-study-notes.json','utf8'));
const figures=JSON.parse(readFileSync('app/module-figures.json','utf8'));
for(const [n,seconds] of [[1,20],[8,20],[9,30],[16,30],[17,45],[38,45]])assert.equal(secondsForStructure(n),seconds);
assert.equal(remainingSeconds(21000,1000),20);assert.equal(remainingSeconds(21000,20999),1);assert.equal(remainingSeconds(21000,21000),0);assert.equal(remainingSeconds(21000,50000),0);
assert.deepEqual(answerTiming(20,21000,1500),{timedOut:false,secondsUsed:.5});assert.deepEqual(answerTiming(20,21000,20999),{timedOut:false,secondsUsed:20});assert.deepEqual(answerTiming(20,21000,21000),{timedOut:true,secondsUsed:20});assert.deepEqual(answerTiming(20,21000,91000),{timedOut:true,secondsUsed:20});assert.equal(clockLabel(65),'1:05');
assert.equal(limitAnswer('  ThUmB-proximal phalanxEXTRA','Thumb proximal phalanx'),'thumbproximalphalanx');assert.equal(answerLetters('Scáphoid!'),'scaphoid');
assert.equal(answerState('Scaphoid',[],'scaphoi'),'typing');assert.equal(answerState('Scaphoid',[],'scaphoid'),'correct');assert.equal(answerState('Scaphoid',[],'xxxxxxxxMORE'),'incorrect');assert.equal(answerState('Mandible',['Lower jaw'],'lowerjaw'),'correct');assert.equal(answerState('Fourth metacarpal',['Metacarpal IV'],'metacarpaliv'),'correct');
assert.equal(regions.length,39);assert.equal(allParts.length,402);assert.equal(new Set(allParts.map(p=>p.key)).size,402);
const baseline=['hand','foot','leg','arm','thorax','skull','brain','eye','ear','heart','lungs','digestive','kidney','spine','pelvis','urinary','muscles','skin','endocrine','female','male'];
for(const r of regions){
 assert.ok(r.source.startsWith('https://'),r.id);assert.equal(new Set(r.parts.map(p=>p.id)).size,r.parts.length);
 for(const p of r.parts){assert.ok(p.shapes.length,p.name);assert.equal(p.hints.length,3,p.name);assert.ok(p.hints.every(h=>h.length>8),p.name);assert.ok(p.anchor.every(Number.isFinite),p.name);assert.ok(p.anchor[0]>0&&p.anchor[0]<450&&p.anchor[1]>0&&p.anchor[1]<540,p.name);for(const shape of p.shapes)assert.ok(shape.d.length>5);assert.equal(answerState(p.name,p.aliases,p.name),'correct',p.name);for(let n=0;n<answerCapacity(p.name);n++)assert.notEqual(answerState(p.name,p.aliases,answerLetters(p.name).slice(0,n)),'incorrect',p.name);}
 if(r.detailedPlate){const plate=r.detailedPlate;assert.deepEqual(new Set(Object.keys(plate.anchors)),new Set(r.parts.map(p=>p.id)),r.id);assert.ok(plate.creator&&plate.license&&plate.sourceUrl&&plate.licenseUrl,r.id);for(const [part,svg] of Object.entries(plate.variants)){assert.ok(r.parts.some(p=>p.id===part),part);assert.ok(svg.includes('<svg')||svg.startsWith('./anatomy/'));}for(const value of [plate.baseSvg,...Object.values(plate.variants)]){const svg=value.startsWith('./anatomy/')?readFileSync('public'+value.slice(1),'utf8'):value;assert.ok(svg.includes('viewBox="0 0 450 540"'),r.id);assert.ok(!/<(?:script|foreignObject)\b|\bon(?:load|click|error)=/i.test(svg),r.id);assert.ok(!/(?:href|xlink:href)=["']https?:/i.test(svg),r.id);}}
}
for(const r of regions.filter(r=>r.detailedPlate?.views)){const plate=r.detailedPlate;const ids=plate.views.flatMap(v=>v.partIds);assert.equal(ids.length,r.parts.length,r.id);assert.deepEqual(new Set(ids),new Set(r.parts.map(p=>p.id)),r.id);for(const v of plate.views){assert.ok(v.partIds.length,r.id);const svg=readFileSync('public'+v.baseSvg.slice(1),'utf8');assert.ok(svg.includes('viewBox="0 0 450 540"'),r.id+'/'+v.id);assert.ok(!/<(?:script|foreignObject)\b|\bon(?:load|click|error)=/i.test(svg),r.id);assert.ok(svg.includes('data:image/png;base64,'),r.id);assert.ok(!/(?:href|xlink:href)=["']https?:/i.test(svg),r.id);}}
for(const [id,count] of [['upper-respiratory',26],['lower-respiratory',47]]){const r=regions.find(r=>r.id===id);assert.equal(r.parts.length,count);assert.ok(r.detailedPlate?.views.length>=4);}
for(const id of baseline)assert.ok(['hand','foot','leg'].includes(id)||regions.find(r=>r.id===id).detailedPlate,id);
assert.equal(regions.filter(r=>r.detailedPlate).length,36);
for(const [id,count] of [['hand',29],['foot',26],['leg',4]]){const r=regions.find(r=>r.id===id);const art=JSON.parse(readFileSync(`app/${id}-art.json`));assert.equal(Object.keys(art).length,count);assert.deepEqual(new Set(Object.keys(art)),new Set(r.parts.map(p=>p.id)));for(const p of r.parts)assert.deepEqual(p.shapes,art[p.id].shapes);}
assert.ok(!regions.find(r=>r.id==='hand').parts.some(p=>p.id==='ph1-middle'));assert.ok(!regions.find(r=>r.id==='foot').parts.some(p=>p.id==='toe1-middle'));
assert.equal(curriculumModules.length,60);assert.equal(validObjectiveKeys.size,243);assert.equal(Object.keys(notes.notes).length,60);
const moduleIds=new Set(curriculumModules.map(m=>m.id));const visit=new Set(),done=new Set();
function walk(id){assert.ok(!visit.has(id),'Prerequisite cycle: '+id);if(done.has(id))return;visit.add(id);const m=curriculumModules.find(m=>m.id===id);for(const p of m.prerequisites){assert.ok(moduleIds.has(p),p);walk(p);}visit.delete(id);done.add(id);}
for(const m of curriculumModules){walk(m.id);assert.ok(relatedPlates(m).length,'No diagram: '+m.id);assert.equal(notes.notes[m.id].keyPoints.length,4,m.id);assert.ok(notes.notes[m.id].sourceUrls.every(s=>s.startsWith('https://')),m.id);assert.ok(m.sourceIds.every(id=>anatomyCurriculum.sources[id]),m.id);}
assert.equal(Object.values(figures).flat().length,9);assert.equal(Object.keys(figures).length,5);
assert.equal(appliedCases.length,64);assert.equal(new Set(appliedCases.map(c=>c.id)).size,64);
for(const c of appliedCases){assert.ok(c.hints.length>=3,c.id);assert.ok(c.explanation.length>20,c.id);assert.ok(c.sourceUrl.startsWith('https://'),c.id);const match=matchedCaseTarget(c);assert.ok(match,c.id);assert.equal(answerLetters(match.target.name),answerLetters(c.canonicalAnswer),c.id);assert.equal(answerState(c.canonicalAnswer,c.acceptedAnswers,c.canonicalAnswer),'correct');assert.ok(c.acceptedAnswers.every(s=>answerCapacity(s)<=answerCapacity(c.canonicalAnswer)));}
const plane=appliedCases.find(c=>c.canonicalAnswer==='Coronal plane');assert.ok(plane);assert.equal(matchedCaseTarget(plane).region.id,'clinical-spinal-orientation');
assert.equal(secondsForCase('Pons'),45);assert.equal(secondsForCase('Axillary nerve'),60);assert.equal(secondsForCase('Anterior spinal artery'),75);
console.log('Passed: 39 plates, 402 valid targets, 402 source-art mappings, 60 illustrated module guides, 243 objective keys, 9 reading figures, 64 matched applied cases, capped grading and timer boundaries. These checks validate app data and behavior, not clinical accuracy.');
