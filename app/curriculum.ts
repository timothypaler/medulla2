import curriculum from './anatomy-curriculum.json';
import rawCases from './applied-cases.json';
import {allParts,regions} from './atlas';
import {answerCapacity,answerLetters} from './typing';

export const anatomyCurriculum=curriculum;
export const curriculumModules=curriculum.modules;
export type AnatomyModule=typeof curriculumModules[number];
export type AppliedCase={id:string;region:string;title:string;prompt:string;canonicalAnswer:string;acceptedAnswers:string[];hints:string[];explanation:string;sourceUrl:string;sourceTitle:string;stage:string;tags:string[];reviewStatus:string};
export const appliedCases=(rawCases as AppliedCase[]).map(c=>({...c,acceptedAnswers:c.acceptedAnswers.filter(n=>answerCapacity(n)<=answerCapacity(c.canonicalAnswer))}));
export const caseRegions:Record<string,string>={'upper-limb':'Upper limb','lower-limb':'Lower limb',thorax:'Thorax',abdomen:'Abdomen','pelvis-perineum':'Pelvis and perineum','head-neck':'Head and neck',neuroanatomy:'Neuroanatomy','back-surface-imaging':'Back / orientation'};
export const atlasReferences=[
 {title:'Netter Atlas of Human Anatomy',kind:'Illustrated atlas',description:'Compare structures and relationships in the regional or systems approach in your own edition.',url:'https://www.us.elsevierhealth.com/netter-atlas-of-human-anatomy-classic-regional-approach-9780443118685.html'},
 {title:'Complete Anatomy',kind:'Interactive atlas app',description:'Compare layers, isolate structures and examine anatomy from different views in your app.',url:'https://3d4medical.com/'},
 {title:'Visible Body · Human Anatomy Atlas',kind:'Interactive atlas app',description:'Use regional models, sectional views and structure information alongside your course.',url:'https://help.cengage.com/visible-body/student/visible-body/atlas-content-windows.html'},
 {title:'Netter ↔ Complete Anatomy',kind:'Official publisher companion',description:'The publisher’s ninth-edition guide links selected plates to matching app screens. Some links require an app login.',url:'https://www.us.elsevierhealth.com/media/wysiwyg/PDF/NetterAtlas9e_3DcorrelatesCompleteAnatomy.pdf'}
];
const regionLinks:Record<string,string[]>={Foundations:['clinical-spinal-orientation','muscles'],Back:['spine','spinal-section','clinical-spinal-orientation'],'Upper limb':['arm','hand','brachial-plexus','clinical-upper-courses'],'Lower limb':['leg','foot','lower-limb-nerves','clinical-lower-vessels'],Thorax:['heart','lungs','lower-respiratory','clinical-thoracic-relations','clinical-posterior-thorax'],Abdomen:['digestive','kidney','abdominal-arteries','clinical-inguinal-wall'],'Pelvis and perineum':['pelvis','female','male','clinical-perineal-relations'],'Head and neck':['upper-respiratory','skull','eye','ear','cranial-foramina','clinical-laryngeal-relations'],Neuroanatomy:['brain','cerebral-arteries','spinal-section','clinical-neural-pathways'],'Imaging anatomy':['clinical-spinal-orientation','spine','thorax'],'Developmental anatomy':['heart','female','male']};
const exact:Record<string,string[]>={'ul-hand':['hand'],'ul-brachial-plexus':['brachial-plexus'],'ll-neurovascular':['lower-limb-nerves'],'nr-blood-meninges':['cerebral-arteries'],'nr-spinal-pathways':['spinal-section'],'back-cord-meninges':['spinal-section','clinical-spinal-orientation'],'hn-cranial-nerves':['cranial-foramina'],'hn-orbit':['eye'],'hn-ear':['ear'],'ab-midgut-hindgut':['abdominal-arteries','digestive'],'ab-retroperitoneum':['kidney','urinary']};
export function relatedPlates(module:AnatomyModule){return (exact[module.id]||regionLinks[module.region]||[]).map(id=>regions.find(r=>r.id===id)).filter((r):r is typeof regions[number]=>!!r);}
export function relatedCases(region:string){const map:Record<string,string>={'Upper limb':'upper-limb','Lower limb':'lower-limb',Thorax:'thorax',Abdomen:'abdomen','Pelvis and perineum':'pelvis-perineum','Head and neck':'head-neck',Neuroanatomy:'neuroanatomy',Back:'back-surface-imaging','Imaging anatomy':'back-surface-imaging',Foundations:'back-surface-imaging'};return appliedCases.filter(c=>c.region===map[region]);}
export function matchedCaseTarget(question:AppliedCase){const target=allParts.find(p=>answerLetters(p.name)===answerLetters(question.canonicalAnswer));if(!target)return null;return {target,region:regions.find(r=>r.id===target.regionId)!};}
export function secondsForCase(name:string):45|60|75{const n=answerCapacity(name);return n<=8?45:n<=16?60:75;}
export const objectiveKey=(moduleId:string,index:number)=>`${moduleId}:${index}`;
export const validObjectiveKeys=new Set(curriculumModules.flatMap(m=>m.objectives.map((_,i)=>objectiveKey(m.id,i))));
