import type {Region,Shape,Part} from './atlas';
import rawCases from './applied-cases.json';

// Original schematic geometry, authored for the applied-case bank.
// This is an educational projection set, not radiology or a 3-D atlas.
// Reference links support the relationships and target definitions, not the artwork.
const line=(d:string,kind:Shape['kind']='outline',sw=2):Shape=>({d,kind,open:true,sw});
const area=(d:string,kind:Shape['kind']='tissue'):Shape=>({d,kind});
const oval=(x:number,y:number,rx:number,ry:number)=>`M${x-rx} ${y}a${rx} ${ry} 0 1 0 ${rx*2} 0a${rx} ${ry} 0 1 0 -${rx*2} 0`;
const box=(x:number,y:number,w:number,h:number)=>`M${x} ${y}h${w}v${h}h-${w}Z`;
const src='https://anatomy.ttuhscep.edu/';
const sourceCases=rawCases as {id:string;canonicalAnswer:string;acceptedAnswers:string[];hints:string[];explanation:string;sourceUrl:string}[];
const bank=new Map(sourceCases.map(c=>[c.id,c]));
export const clinicalRegions:Region[]=[];
export const clinicalCaseTargetKeys:Record<string,string>={};
function region(id:string,name:string,group:string,subtitle:string,view:string,source:string):Region{
 const r:Region={id,name,group,subtitle,view,source,parts:[],details:[],position:[50,50],color:'#c6a7ff'};
 clinicalRegions.push(r);return r;
}
function add(r:Region,caseId:string,id:string,shapes:Shape[],anchor:[number,number]):Part&{source:string}{
 const c=bank.get(caseId);if(!c)throw new Error(`Missing case ${caseId}`);
 const p:Part&{source:string}={id,name:c.canonicalAnswer,aliases:c.acceptedAnswers,hints:[c.hints[0],c.hints[1],c.hints[2]],note:c.explanation,source:c.sourceUrl,shapes,anchor};
 r.parts.push(p);clinicalCaseTargetKeys[caseId]=`${r.id}/${p.id}`;return p;
}

// 1. Upper limb: distinct anterior, posterior-arm and deep-forearm panels.
const upper=region('clinical-upper-courses','Upper limb neurovascular courses','Upper limb','Arterial continuity & the anterior interosseous branch','Right limb · anterior main panel; posterior arm and deep anterior forearm insets',src+'musculoskeletal_system/forearm_tables.html');
upper.details=[
 line('M105 75Q75 110 88 150L90 248Q65 273 75 318L77 462Q87 493 117 510L145 508Q166 490 170 463L165 313Q175 275 152 247L154 142Q175 112 153 79'),
 line('M121 101L121 240', 'outline',13),line('M100 275L91 464','outline',7),line('M146 274L150 467','outline',7),
 line('M104 78H155M90 257H155'),line('M129 265C145 310 160 389 161 480','vessel',4),
 line('M275 83L282 222','outline',13),line('M252 65V242','vessel',4),
 line('M260 314L255 494M335 314L342 494','outline',7),line('M267 333L330 352M266 358L333 378M264 386L336 405M262 415L338 433'),
 line('M263 278L273 311L260 464','nerve',3)
];
add(upper,'applied-ul-06','brachial',[line('M129 89L129 244Q130 256 129 265','vessel',8)],[129,193]);
add(upper,'applied-ul-08','radial',[line('M129 265Q112 296 104 342L92 480','vessel',7)],[101,395]);
add(upper,'applied-ul-07','deep-brachial',[line('M252 99C295 97 325 128 311 157Q299 190 274 205L264 238','vessel',7)],[311,148]);
add(upper,'applied-ul-05','anterior-interosseous',[line('M273 311Q294 336 294 366L296 453M296 427L280 454M296 440L315 463','nerve',6)],[295,394]);
upper.guides=[{x:125,y:41,text:'ANTERIOR LIMB'},{x:286,y:42,text:'POSTERIOR ARM'},{x:298,y:276,text:'DEEP ANTERIOR FOREARM'},{x:83,y:525,text:'LATERAL'},{x:160,y:525,text:'MEDIAL'}];

// 2. Lower limb: main arterial course and separate medial superficial venous view.
const lower=region('clinical-lower-vessels','Lower limb vascular courses','Lower limb','Femoral continuity, dorsal foot supply & superficial return','Anterior arterial projection; separate medial venous projection with anterior to the left',src+'musculoskeletal_system/superficial_limbs_tables.html');
lower.details=[
 line('M96 72Q70 100 79 166L92 271L83 403Q72 433 82 461L91 498Q127 521 169 499L165 468L151 427L153 277L168 160Q180 104 146 74'),
 line('M117 102V260','outline',13),line('M110 293L110 423','outline',9),line('M143 300L143 423','outline',5),
 line('M70 117L164 137'),line('M128 264L128 289Q121 306 112 319L107 434','vessel',4),
 line('M284 77Q271 108 281 183L288 277L302 409Q298 429 274 449L247 472L239 493Q289 514 341 493L339 466L330 420L332 276L340 178Q349 116 327 81'),
 line('M304 104L308 274L318 416','outline',9),line(oval(316,422,8,10)),line('M277 91L277 156','vessel',4)
];
add(lower,'applied-ll-06','femoral',[line('M126 130L126 254Q127 263 128 271','vessel',8)],[126,208]);
add(lower,'applied-ll-07','dorsalis-pedis',[line('M107 434Q112 462 127 479L127 498','vessel',7)],[116,463]);
add(lower,'applied-ll-08','great-saphenous',[line('M251 485Q276 470 296 432L302 410L295 280L291 177Q290 148 277 144','vessel',7)],[296,322]);
lower.guides=[{x:126,y:42,text:'ANTERIOR ARTERIAL PROJECTION'},{x:302,y:42,text:'MEDIAL VENOUS PROJECTION'},{x:253,y:525,text:'ANTERIOR'},{x:351,y:525,text:'POSTERIOR'}];

// 3. Pleural/pericardial relationships. The upper strip is a relation inset,
// not a transverse CT slice. Its target is the interval behind arterial outflow.
const thoracic=region('clinical-thoracic-relations','Pleural & pericardial relationships','Thorax','Reflections, sac and diaphragmatic nerve course','Anterior thoracic projection; superior relation inset has anterior at the top',src+'schemes/thorax_wall_tables.html');
thoracic.details=[
 line(oval(194,74,16,18)),line(oval(246,74,19,18)),line(oval(250,128,15,14)),
 line('M123 173C87 191 71 259 72 325Q69 382 110 412Q139 408 156 363L171 251Q161 208 123 173Z'),
 line('M327 173C363 191 379 259 378 325Q381 382 340 412Q311 408 294 363L279 251Q289 208 327 173Z'),
 line('M84 185Q48 291 61 410L75 468Q119 487 165 440M366 185Q402 291 389 410L375 468Q331 487 285 440'),
 line('M173 257L148 244M277 257L302 244','outline',9),
 line('M185 238Q216 212 244 238Q283 270 269 335L232 386Q198 378 181 337Q163 286 185 238Z'),
 line('M62 453Q114 367 179 421Q225 452 271 421Q336 383 388 453'),
 line('M199 176V219M246 174V219','outline',9)
];
add(thoracic,'applied-th-01','transverse-pericardial-sinus',[area('M157 100Q206 94 281 100L280 113Q215 108 158 114Z')],[219,104]);
add(thoracic,'applied-th-02','fibrous-pericardium',[area('M171 220Q217 187 263 218Q300 259 285 345Q277 392 248 420L199 420Q171 392 159 344Q144 267 171 220Z M178 230Q219 203 256 230Q285 267 273 340Q264 385 241 408L205 408Q181 382 171 340Q159 272 178 230Z')],[163,309]);
add(thoracic,'applied-th-03','costodiaphragmatic-recess',[area('M61 410Q71 430 80 441Q94 419 108 408Q130 409 151 432Q126 470 77 468Z M389 410Q379 430 370 441Q356 419 342 408Q320 409 299 432Q324 470 373 468Z')],[90,449]);
add(thoracic,'applied-th-04','phrenic',[line('M166 170Q178 221 174 281L175 344Q176 383 208 420M284 170Q272 221 276 281L275 344Q274 383 242 420','nerve',6)],[175,320]);
thoracic.guides=[{x:225,y:30,text:'PERICARDIAL RELATION INSET'},{x:194,y:53,text:'AORTA'},{x:247,y:53,text:'PULMONARY TRUNK'},{x:284,y:132,text:'SVC'},{x:225,y:157,text:'ANTERIOR THORACIC PROJECTION'},{x:225,y:499,text:'PHRENIC COURSES PROJECTED ANTERIOR TO ROOTS'}];

// 4. Posterior thoracic routes and separately oriented heart surfaces.
const posterior=region('clinical-posterior-thorax','Thoracic routes & coronary surfaces','Thorax','Splanchnic inputs, lymphatic ascent & coronary grooves','Posterior mediastinal projection; separate anterior and posterior heart insets',src+'cardiovascular_system/heart_tables.html');
posterior.details=[
 line('M225 71V296','outline',13),...Array.from({length:7},(_,i)=>line(`M213 ${83+i*29}H237`)),
 line('M194 80Q186 175 194 282','outline',8),line('M167 169L175 299','vessel',5),
 line('M292 105V264','nerve',3),...Array.from({length:5},(_,i)=>line(oval(292,120+i*28,4,6))),
 line('M87 302Q147 266 208 302M246 302Q302 265 365 302'),
 line('M111 363C88 340 52 358 62 406Q77 466 159 512Q210 472 210 411Q210 357 172 367Q150 380 134 364Z'),
 line('M142 377C136 412 145 454 164 495'),
 line('M282 364Q254 370 264 414Q274 470 305 509Q384 485 410 433Q426 377 390 362Q364 349 343 367Q309 349 282 364Z'),
 line('M272 410Q337 398 402 417'),line('M307 496Q337 450 358 418','vessel',3),
 line('M398 341L398 376','outline',8),line('M401 432L407 473','outline',8)
];
add(posterior,'applied-th-08','thoracic-duct',[line('M241 300Q248 260 246 217Q245 178 218 151Q188 122 185 86Q171 63 133 58','vessel',6)],[245,228]);
add(posterior,'applied-th-05','greater-thoracic-splanchnic',[line('M292 120L322 184M292 148L322 195M292 176L322 205M292 204L322 219M292 232L322 237M322 184V266Q312 287 288 306','nerve',6)],[322,250]);
add(posterior,'applied-th-06','anterior-interventricular',[line('M153 374Q136 405 141 435Q149 473 161 500','vessel',7)],[142,433]);
add(posterior,'applied-th-07','coronary-sinus',[line('M275 416Q328 401 395 422','vessel',8)],[351,411]);
posterior.guides=[{x:225,y:31,text:'POSTERIOR MEDIASTINAL PROJECTION'},{x:105,y:49,text:'LEFT VENOUS ANGLE'},{x:355,y:154,text:'T5–T9 INPUTS'},{x:105,y:326,text:'ANTERIOR HEART'},{x:340,y:326,text:'POSTERIOR HEART'},{x:307,y:347,text:'LEFT'},{x:410,y:347,text:'RIGHT'},{x:225,y:535,text:'HEART PANELS ARE SEPARATE VIEWS'}];

// 5. Two separate abdominal projections: biliary/portal connectivity and left renal vein.
const abdomen=region('clinical-abdominal-relations','Portal, biliary & renal relationships','Abdomen & pelvis','Confluences and crossing vessels','Separate anterior abdominal projections · projected overlap, not a CT section',src+'gastrointestinal_system/duodenum_tables.html');
abdomen.details=[
 line('M126 63Q246 31 371 73L396 146Q363 175 317 162L291 133Q218 164 142 148Z'),
 line('M150 129Q124 151 137 176Q161 187 168 153L160 135Z'),
 line('M243 85L264 125M331 89L264 125M264 125L220 183M153 163Q176 187 220 183','outline',4),
 line('M294 316V253M400 251L294 253','vessel',4),
 line('M219 228Q275 218 376 230L384 247Q293 267 219 248Z'),
 line('M205 253Q163 251 161 284Q160 315 202 318L222 314'),
 line('M225 360V404M225 443V520','vessel',12),line('M185 360V520','vessel',11),
 line('M117 399Q68 380 66 435Q65 482 109 477Q130 462 106 438Q128 421 117 399Z'),
 line('M333 399Q382 380 384 435Q385 482 341 477Q320 462 344 438Q322 421 333 399Z'),
 line('M327 438L314 431M123 436L185 430','vessel',4),line('M286 519V432','vessel',3)
];
add(abdomen,'applied-ab-02','portal-vein',[line('M294 253L291 164Q286 143 269 130M291 164Q317 139 350 128','vessel',8)],[292,200]);
add(abdomen,'applied-ab-04','common-bile-duct',[line('M220 183L220 243Q213 270 188 282','tissue',8)],[220,221]);
add(abdomen,'applied-pp-05','left-renal-vein',[line('M327 438Q273 418 229 425L185 430','vessel',8)],[264,425]);
abdomen.guides=[{x:225,y:24,text:'PORTAL / BILIARY CONNECTIVITY'},{x:396,y:268,text:'SPLENIC INFLOW'},{x:309,y:327,text:'SMV INFLOW'},{x:225,y:348,text:'ANTERIOR RENAL VENOUS PROJECTION'},{x:106,y:387,text:'SUBJECT’S RIGHT'},{x:349,y:387,text:'SUBJECT’S LEFT'},{x:225,y:535,text:'RENAL VEIN CROSSES ANTERIOR TO AORTA'}];

// 6. Right isolated inguinal wall: explicitly medial-to-lateral rather than
// suggesting that a rotated internal wall is a frontal whole-body projection.
const inguinal=region('clinical-inguinal-wall','Inguinal wall & epigastric landmarks','Abdomen & pelvis','Deep ring, vessels and the direct-hernia region','Internal wall schematic · isolated right inguinal region · medial at left, lateral at right',src+'schemes/abdo_wall_ing_tables.html');
inguinal.details=[
 line('M67 102L118 116L165 190L120 430L68 413Z'),
 line('M64 144L131 158M68 188L153 203M69 239L146 255M69 296L137 308M69 354L129 363'),
 line('M120 430L365 308','outline',6),line('M358 277L365 308L382 315','outline',8),
 line('M291 303Q222 350 126 415','outline',13),line('M245 418L230 377L217 350','vessel',4),
 line('M80 471Q120 447 166 468L195 487'),line('M92 91Q237 61 390 122L396 416Q305 494 209 483')
];
add(inguinal,'applied-ab-07','inguinal-triangle',[area('M120 430L225 377L165 190Z')],[165,344]);
add(inguinal,'applied-ab-06','inferior-epigastric',[line('M225 377Q196 318 183 251L165 190','vessel',7),line('M233 373Q204 314 191 247L173 188','vessel',4)],[194,288]);
add(inguinal,'applied-ab-05','deep-inguinal-ring',[area(oval(291,303,26,18)+' '+oval(291,303,16,10))],[291,303]);
inguinal.guides=[{x:225,y:42,text:'INTERNAL SURFACE OF ISOLATED WALL'},{x:57,y:72,text:'MEDIAL'},{x:389,y:72,text:'LATERAL'},{x:118,y:500,text:'PUBIC END'},{x:365,y:340,text:'ASIS END'},{x:225,y:531,text:'CANAL ROUTE PROJECTED DOWNWARD AND MEDIALLY'}];

// 7. Pelvic and perineal anatomy requires separate projections.
const pelvic=region('clinical-perineal-relations','Pelvic & perineal relationships','Abdomen & pelvis','Autonomic inputs, sling, canal and erectile body','Four separate schematics: autonomic connections; lateral anorectal sling; coronal perineum; transverse penile section',src+'reproductive_system/perineum_tables.html');
pelvic.details=[
 line('M48 72H82M48 105H82M48 138H82','outline',3),line(oval(165,165,16,24)),
 line('M165 185L128 225M175 186L194 224','outline',4),
 line('M348 72Q354 125 332 168Q325 191 340 232','outline',18),
 line('M247 103L253 159L242 166L235 111Z','outline',4),
 line('M122 341L122 460','outline',18),line(oval(122,421,17,25)),
 line('M185 326Q206 373 211 456','outline',10),line('M122 344Q147 316 183 324'),
 line(oval(190,389,3,3)),line(oval(197,395,3,3)),line(oval(189,398,3,3)),
 line(oval(302,390,23,31)),line(oval(359,390,23,31)),line('M275 360Q331 335 388 360Q412 412 378 459Q331 480 284 459Q251 414 275 360Z'),
 line(oval(330,441,5,5))
];
add(pelvic,'applied-pp-02','pelvic-splanchnics',[line('M82 72C123 84 131 140 154 151M82 105C117 113 128 149 151 162M82 138C113 147 127 166 151 172','nerve',6)],[122,140]);
add(pelvic,'applied-pp-03','puborectalis',[line('M251 157Q298 176 359 174Q376 182 361 195Q313 207 250 170','tissue',13)],[360,185]);
add(pelvic,'applied-pp-07','pudendal-canal',[area(oval(193,394,13,14)+' '+oval(193,394,8,9))],[193,394]);
add(pelvic,'applied-pp-08','inferior-rectal',[line('M186 397Q159 403 138 420','nerve',6)],[162,409]);
add(pelvic,'applied-pp-06','corpus-spongiosum',[area(oval(330,441,27,21)+' '+oval(330,441,5,5))],[318,447]);
pelvic.guides=[{x:119,y:31,text:'AUTONOMIC CONNECTIONS'},{x:40,y:75,text:'S2'},{x:40,y:108,text:'S3'},{x:40,y:141,text:'S4'},{x:315,y:31,text:'LATERAL ANORECTAL SCHEMATIC'},{x:247,y:250,text:'ANTERIOR'},{x:378,y:250,text:'POSTERIOR'},{x:128,y:296,text:'CORONAL PERINEAL RELATION'},{x:330,y:296,text:'TRANSVERSE PENILE SECTION'},{x:331,y:331,text:'DORSAL'},{x:331,y:494,text:'VENTRAL'},{x:148,y:486,text:'ANAL CANAL → LATERAL WALL'}];

// 8. Neural pathways are connection schematics. Colored segments identify a
// named nerve/tract or crossing, not a fabricated brainstem MRI footprint.
const neural=region('clinical-neural-pathways','Visual & brainstem pathways','Head & neck','Visual crossing, cranial outputs & ascending/descending pathways','Connection schematic · visual pathway above; brainstem levels and efferent targets below', 'https://openstax.org/books/anatomy-and-physiology-2e/pages/14-2-central-processing');
neural.details=[
 line(oval(109,78,29,24)),line(oval(341,78,29,24)),line('M111 102L198 151M339 102L252 151','nerve',5),
 line('M199 174L165 204M251 174L285 204','nerve',5),
 line('M169 249H258V490H169ZM167 301H260M167 357H260'),
 line('M186 438V513M245 438V513','outline',2),
 line(oval(365,274,22,17)),line('M344 274H386','outline',2),line(oval(365,333,22,17)),line('M381 326L390 330L381 338','outline',4),
 line('M343 413Q362 395 389 407Q396 423 380 432Q357 440 343 425Z'),
 line('M188 266V436M240 266V436','outline',3),line('M188 502V485M241 502V485','outline',3),
 line('M158 448Q183 432 202 421','outline',3),line('M213 265L213 236','outline',2)
];
add(neural,'applied-ne-01','optic-chiasm',[area('M192 143L225 158L258 143L268 158L240 168L268 181L258 193L225 178L192 193L182 181L210 168L182 158Z','nerve')],[225,168]);
add(neural,'applied-ne-05','oculomotor',[line('M257 274Q300 256 343 274','nerve',7)],[300,264]);
add(neural,'applied-hn-01','abducens',[line('M257 352Q300 354 344 333','nerve',7)],[301,347]);
add(neural,'applied-hn-02','hypoglossal',[line('M258 402Q306 394 344 417','nerve',7)],[303,400]);
add(neural,'applied-ne-02','medial-lemniscus',[line('M202 421Q223 407 225 381V273','nerve',7)],[225,323]);
add(neural,'applied-ne-06','pyramidal-decussation',[line('M188 436Q188 458 241 485M240 436Q240 458 188 485','nerve',7)],[213,460]);
neural.guides=[{x:225,y:30,text:'VISUAL CONNECTIVITY · ANTERIOR AT TOP'},{x:212,y:234,text:'BRAINSTEM LEVELS'},{x:119,y:278,text:'MIDBRAIN'},{x:132,y:333,text:'PONS'},{x:127,y:401,text:'MEDULLA'},{x:365,y:250,text:'ORBITAL TARGETS'},{x:365,y:388,text:'TONGUE TARGET'},{x:225,y:535,text:'CONNECTIONS, NOT SPATIAL ROOT-EXIT POSITIONS'}];

// 9. Vagal laryngeal branches plus a separately oriented posterior muscle inset.
const larynx=region('clinical-laryngeal-relations','Laryngeal nerves & posterior muscle','Head & neck','Recurrent loop, superior branch and vocal-fold abductor','Anterior left-neck nerve-route projection; separate posterior laryngeal muscle inset',src+'anatomytables/muscles_head_neck.html');
larynx.details=[
 line('M217 175V441M249 175V441'),...Array.from({length:10},(_,i)=>line(`M217 ${194+i*23}Q233 ${201+i*23} 249 ${194+i*23}`)),
 line('M185 91L231 76L279 91L265 148L233 170L200 148Z'),line('M206 165Q232 178 261 165L259 187L207 187Z'),
 line('M345 55V422','nerve',4),line('M345 98L295 113L276 139','nerve',4),
 line('M231 383V330Q232 290 279 291Q321 289 331 326L337 427','vessel',13),
 line('M68 400Q120 381 180 400L178 446Q127 472 69 446Z'),
 line('M92 394L103 374L115 396ZM139 396L151 374L163 394Z'),
 line('M89 454Q128 466 171 454'),line('M91 397L112 408M163 397L142 408')
];
add(larynx,'applied-hn-03','left-recurrent-laryngeal',[line('M345 286Q354 340 337 358Q314 374 286 344Q263 323 261 292L258 190','nerve',7)],[262,266]);
add(larynx,'applied-hn-04','external-laryngeal',[line('M295 113Q275 135 264 159L252 174','nerve',6)],[272,144]);
add(larynx,'applied-hn-05','posterior-cricoarytenoid',[area('M91 398Q78 428 79 445Q105 450 122 436L105 405Z M163 398Q176 428 177 445Q151 450 134 436L151 405Z')],[96,429]);
larynx.guides=[{x:251,y:29,text:'ANTERIOR LEFT-NECK COURSE PROJECTION'},{x:390,y:57,text:'LEFT VAGUS'},{x:356,y:319,text:'AORTIC ARCH'},{x:124,y:348,text:'POSTERIOR LARYNX INSET'},{x:124,y:492,text:'MUSCLE FANS ON CRICOID LAMINA'},{x:225,y:530,text:'LEFT RECURRENT COURSE ASCENDS TOWARD LARYNX'}];

// 10. Planes and separate spinal views. The volumes represent body axes,
// not organs. Bony lateral projections are not mislabeled as a midline slice.
const spine=region('clinical-spinal-orientation','Body planes & spinal relationships','Trunk','Three planes, meninges, roots and bony openings','Body-axis volumes above; lateral spinal relationship and separate upper-cervical/lumbar bony insets below',src+'schemes/back_tables.html');
function bodyVolume(offset:number){
 const p=(x:number,y:number,z:number)=>`${offset+24+x+y*.32} ${162-y*.24-z}`;
 return [
 line(`M${p(0,0,0)}L${p(66,0,0)}L${p(66,48,0)}L${p(0,48,0)}Z`),
 line(`M${p(0,0,85)}L${p(66,0,85)}L${p(66,48,85)}L${p(0,48,85)}Z`),
 line(`M${p(0,0,0)}L${p(0,0,85)}M${p(66,0,0)}L${p(66,0,85)}M${p(66,48,0)}L${p(66,48,85)}M${p(0,48,0)}L${p(0,48,85)}`)
 ];
}
spine.details=[...bodyVolume(9),...bodyVolume(154),...bodyVolume(299),
 ...[246,303,360,417].flatMap(y=>[line(box(39,y,37,36)),line(`M76 ${y+4}L136 ${y+13}L153 ${y+22}M76 ${y+32}L134 ${y+28}L153 ${y+22}`)]),
 line('M88 233L88 485M132 233L132 485'),
 line('M108 238L108 320Q116 330 111 342Q106 330 100 320L100 238Z'),
 line('M239 250Q280 219 329 245L330 264Q282 249 240 267Z'),line('M272 217Q293 207 315 218Q324 228 315 236Q292 244 271 235Z'),
 line(box(274,281,42,31)),
 line(box(267,397,43,40)),line(box(267,469,43,40)),
 line('M310 402L347 412L381 430L348 436L310 431M310 474L347 484L381 502L348 508L310 503'),
 line('M347 412L347 436M347 484L347 508'),
 line('M262 437L313 437M262 467L313 467','outline',3)
];
// Coronal: fixed anterior-posterior coordinate; sagittal: fixed left-right;
// transverse: fixed superior-inferior coordinate.
add(spine,'applied-bs-01','coronal-plane',[area('M41 156L107 156L107 71L41 71Z')],[72,113]);
add(spine,'applied-bs-02','sagittal-plane',[area('M211 162L226 150L226 65L211 77Z')],[218,112]);
add(spine,'applied-bs-03','transverse-plane',[area('M323 120L389 120L404 108L338 108Z')],[364,114]);
add(spine,'applied-bs-05','subarachnoid-space',[area('M91 235L129 235L129 483L91 483Z M99 237L117 237L117 321L109 344L101 321Z')],[123,290]);
add(spine,'applied-bs-04','cauda-equina',[line('M109 342Q96 374 99 478M109 342L106 481M109 342Q120 379 121 478M109 342Q112 398 115 481','nerve',4)],[109,413]);
add(spine,'applied-bs-06','ligamentum-flavum',[area('M132 276L141 274L141 315L133 317Z')],[137,294]);
add(spine,'applied-bs-08','dens',[area('M286 282L284 239Q283 224 292 221Q303 222 303 238L303 282Z','bone')],[294,247]);
add(spine,'applied-bs-07','intervertebral-foramen',[area(oval(328,452,18,14),'tissue')],[328,452]);
spine.guides=[{x:225,y:27,text:'BODY-AXIS VOLUMES · SUPERIOR AT TOP'},{x:75,y:185,text:'R → L ACROSS FRONT'},{x:220,y:185,text:'A → P IN DEPTH'},{x:365,y:185,text:'HORIZONTAL SECTION'},{x:109,y:217,text:'LATERAL CANAL RELATION'},{x:295,y:198,text:'UPPER CERVICAL BONY PROJECTION'},{x:321,y:374,text:'LUMBAR LATERAL BONY PROJECTION'},{x:107,y:512,text:'ANTERIOR LEFT · POSTERIOR RIGHT'},{x:314,y:336,text:'AXIS BELOW ATLAS'},{x:225,y:535,text:'INSETS ARE SEPARATE VIEWS; DISTANCES ARE NOT TO SCALE'}];
