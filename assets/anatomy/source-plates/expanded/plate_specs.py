from build_atlas_upgrade import panel as p, view as v
# All points are fractions of the original source canvas, before crops/scaling.
specs={
'brachial-plexus':[
 v('in-situ','Right neck & axilla · anterior',p('limb-assets/Gray808.png',{'suprascapular':(.439,.523),'long-thoracic':(.574,.309)},crop=(.02,.025,.87,.99),mask=((.355,.268,.468,.32),(.047,.353,.229,.386))),note='Dissection view of the right plexus. Pins mark the suprascapular and long thoracic branches; the network view separates roots, trunks, divisions and cords.'),
 v('network','Plexus network · roots at image right',p('limb-assets/Brachial_plexus_color.svg',{
 'root-0':(.88,.215),'root-1':(.88,.339),'root-2':(.88,.463),'root-3':(.88,.587),'root-4':(.88,.711),
 'superior-trunk':(.735,.216),'middle-trunk':(.73,.463),'inferior-trunk':(.73,.711),
 'superior-anterior':(.589,.216),'superior-posterior':(.636,.274),'middle-anterior':(.61,.345),'middle-posterior':(.61,.463),'inferior-anterior':(.61,.711),'inferior-posterior':(.61,.59),
 'lateral-cord':(.405,.216),'posterior-cord':(.405,.463),'medial-cord':(.405,.711),
 'musculocutaneous':(.175,.216),'axillary':(.175,.337),'radial':(.175,.584),'ulnar':(.175,.711),
 'lateral-median-root':(.235,.323),'medial-median-root':(.235,.595),'median':(.155,.463)},crop=(.13,.05,.92,.91),ocr=False,rect=(12,65,426,310)),p('limb-assets/Gray808.png',{},crop=(.2,.04,.84,.98),rect=(148,382,154,138)),note='A topology view paired with source dissection context. The diagram separates branches for teaching and is not a literal three-dimensional course.')],
'lower-limb-nerves':[
 v('lumbar','Lumbar plexus · anterior dissection',p('limb-assets/Gray823.png',{'femoral':(.245,.663),'obturator':(.359,.622),'lateral-femoral-cutaneous':(.147,.588),'genitofemoral':(.611,.49)},crop=(.05,.025,.98,.99))),
 v('posterior','Right lower limb · posterior',p('limb-assets/Gray832.png',{'sciatic':(.55,.30),'tibial':(.532,.59),'common-fibular':(.661,.50),'superior-gluteal':(.553,.093),'inferior-gluteal':(.644,.14),'posterior-femoral-cutaneous':(.436,.27)},crop=(.18,.01,.95,.99))),
 v('anterior','Right lower limb · anterior',p('limb-assets/Gray827.png',{'deep-fibular':(.534,.74),'superficial-fibular':(.421,.683),'saphenous':(.63,.36)},crop=(.16,.01,.87,.99))),
 v('pelvic','Sacral plexus · medial pelvic wall',p('limb-assets/Gray829.png',{'pudendal':(.73,.631)},crop=(.03,.025,.94,.94)))],
'cerebral-arteries':[
 v('inferior','Brain arterial supply · inferior surface',p('neuro-assets/Henry_Gray_Figura_516.svg',{
 'internal-carotid':(.459,.383),'anterior-cerebral':(.483,.343),'anterior-communicating':(.511,.361),'middle-cerebral':(.342,.348),'posterior-communicating':(.471,.414),'posterior-cerebral':(.455,.455),'basilar':(.505,.544),'vertebral':(.461,.675),'superior-cerebellar':(.462,.507),'anterior-inferior-cerebellar':(.468,.579),'posterior-inferior-cerebellar':(.568,.753)},extract=True,crop=(.025,.005,.99,.995)),note='Inferior view of source arterial anatomy; pins mark one representative segment of each vessel. Circle-of-Willis configurations vary.')],
'abdominal-arteries':[
 v('posterior-wall','Abdominal aorta · anterior dissection',p('trunk-assets/Gray531.png',{'aorta':(.482,.60),'renal':(.35,.442),'gonadal':(.572,.57),'common-iliac':(.542,.79),'external-iliac':(.639,.912),'internal-iliac':(.583,.877)},crop=(.04,.02,.89,.99))),
 v('celiac','Foregut vessels · stomach reflected',p('trunk-assets/Gray533.png',{'celiac':(.344,.576),'left-gastric':(.347,.511),'splenic':(.59,.63),'common-hepatic':(.28,.562),'gastroduodenal':(.222,.641),'proper-hepatic':(.235,.537),'superior-mesenteric':(.35,.793)},crop=(.035,.01,.99,.99))),
 v('mesenteric','Posterior abdominal vessels · anterior',p('trunk-assets/Gray531.png',{'inferior-mesenteric':(.595,.748)},crop=(.21,.38,.78,.97)))],
'spinal-section':[
 v('cord','Upper thoracic cord · transverse section',p('neuro-assets/Spinal_cord_tracts_-_English.svg',{'gray-commissure':(.484,.539),'dorsal-horn':(.411,.292),'ventral-horn':(.413,.635),'lateral-horn':(.404,.517),'central-canal':(.501,.532),'gracile-fasciculus':(.476,.31),'cuneate-fasciculus':(.443,.209),'lateral-corticospinal':(.361,.394),'spinothalamic':(.627,.73),'anterior-white-commissure':(.50,.584)},crop=(.247,.055,.752,.982),ocr=False),note='Teaching distribution of major tracts in an upper thoracic cord section; dorsal is up. Tract territories are approximate and overlap.'),
 v('roots','Spinal nerve roots · sectional relationship',p('extra-assets/Spinal_nerve_Sympathetic_ganglion_multilingual.svg',{'dorsal-root':(.487,.169),'dorsal-root-ganglion':(.349,.391),'ventral-root':(.537,.486),'spinal-nerve':(.204,.49)},remove_layers=('layer1',),ocr=False,crop=(.06,.04,.975,.62)),note='Cord lies at image right. This sectional teaching view retains the dorsal root ganglion and the union of sensory and motor roots; fibres are schematic.')],
'cranial-foramina':[
 v('base','Cranial base · superior view',p('neuro-assets/Skull_foramina_labeled.svg',{'cribriform':(.503,.214),'optic-canal':(.581,.335),'superior-orbital-fissure':(.646,.334),'rotundum':(.619,.386),'ovale':(.648,.449),'spinosum':(.685,.468),'magnum':(.49,.666)},extract=True,ocr=False),note='Superior view into the cranial base. Pins identify visible openings; some foramina are better exposed in the accompanying hemicranial view.'),
 v('petrous','Right cranial base · internal surface',p('extra-assets/Gray193.png',{'internal-acoustic':(.574,.545),'jugular':(.575,.584),'hypoglossal':(.572,.60)},crop=(.405,.275,.99,.738)))],
'clinical-upper-courses':[
 v('arm','Right arm arteries · anterior',p('limb-assets/Gray526.png',{'brachial':(.549,.363),'deep-brachial':(.585,.085)},crop=(.30,.015,.72,.99))),
 v('forearm','Right forearm · anterior dissection',p('limb-assets/Gray527.png',{'radial':(.356,.48)},crop=(.14,.01,.84,.99))),
 # Anterior interosseous nerve uses a labelled cadaveric source, not an artery substitute.
 v('interosseous','Anterior forearm · deep dissection',p('extra-assets/Slide8MMMM.JPG',{'anterior-interosseous':(.441,.206)},crop=(.238,.035,.684,.965)),note='Deep dissection identifying the anterior interosseous neurovascular course. The target pin is mapped to the nerve, separate from the accompanying artery.')],
'clinical-lower-vessels':[
 v('femoral-triangle','Right femoral triangle · anterior',p('limb-assets/Gray549.png',{'femoral':(.537,.40),'great-saphenous':(.383,.617)},crop=(.09,.035,.95,.98))),
 v('dorsum','Right leg & dorsal foot · anterior',p('extra-assets/Gray554.png',{'dorsalis-pedis':(.455,.345)},crop=(.015,.01,.99,.99)))],
'clinical-thoracic-relations':[
 v('pericardial-sac','Opened pericardial sac · anterior',p('extra-assets/Gray489.png',{'transverse-pericardial-sinus':(.445,.512)},crop=(.14,.05,.94,.98)),note='Heart removed: the transverse sinus is the interval posterior to the arterial outflow reflections and anterior to the venous inflow reflections.'),
 v('phrenic','Mediastinum · anterior dissection',p('extra-assets/Gray806.png',{'fibrous-pericardium':(.506,.547),'phrenic':(.422,.566)},crop=(.15,.02,.92,.99))),
 v('pleural-recess','Pleura & diaphragm · anterior cutaway',p('respiratory-assets/pleura-source.jpg',{'costodiaphragmatic-recess':(.548,.633)},crop=(.03,.01,.596,.851)),note='Pin marks the inferior pleural reflection adjacent to the diaphragm; pleural recess size changes with respiration.')],
'clinical-posterior-thorax':[
 v('thoracic-duct','Thoracic lymphatic course · posterior',p('trunk-assets/Gray599.png',{'thoracic-duct':(.568,.476)},crop=(.08,.01,.93,.98))),
 v('sympathetic','Posterior mediastinum · lateral dissection',p('extra-assets/Gray846.png',{'greater-thoracic-splanchnic':(.595,.65)},crop=(.03,.01,.98,.99))),
 v('anterior-coronary','Heart & lungs · anterior',p('extra-assets/Gray490.png',{'anterior-interventricular':(.628,.689)},crop=(.10,.015,.94,.99))),
 v('posterior-coronary','Heart · posterior surface',p('extra-assets/Gray491.png',{'coronary-sinus':(.506,.627)},crop=(.22,.01,.86,.95)))],
'clinical-abdominal-relations':[
 v('portal','Portal circulation · anterior dissection',p('extra-assets/Gray591.png',{'portal-vein':(.397,.224)},crop=(.03,.015,.99,.99))),
 v('biliary','Gallbladder & ducts · opened specimen',p('extra-assets/Gray1095-gall_bladder.png',{'common-bile-duct':(.55,.864)},ocr=True)),
 v('renal','Posterior abdominal wall · anterior',p('trunk-assets/Gray531.png',{'left-renal-vein':(.542,.43)},crop=(.21,.22,.79,.65)))],
'clinical-inguinal-wall':[
 v('internal','Right inguinal wall · internal view',p('trunk-assets/Inguinal_Region_Interior_View.jpg',{'inguinal-triangle':(.307,.465),'inferior-epigastric':(.296,.322),'deep-inguinal-ring':(.431,.464)},crop=(.02,.02,.98,.99)))],
'clinical-perineal-relations':[
 v('perineum','Male perineum · inferior dissection',p('pelvic-larynx-assets/Gray542.png',{'pudendal-canal':(.577,.646),'inferior-rectal':(.521,.684)},crop=(.13,.05,.75,.92)),note='Inferior dissection of the male perineum. Canal pin marks the pudendal bundle in the lateral fascial tunnel; the roof of the tunnel is opened in this view.'),
 v('erectile-body','Penile erectile bodies · ventrolateral dissection',p('extra-assets/Gray1158.png',{'corpus-spongiosum':(.499,.505)},crop=(.045,.12,.97,.75))),
 v('pelvic-wall','Pelvic autonomic course · medial wall',p('limb-assets/Gray829.png',{'pelvic-splanchnics':(.745,.67)},crop=(.08,.03,.93,.94)),note='Pin marks the pelvic visceral branches from the sacral anterior rami, not the sympathetic trunk. Fine autonomic fibres are represented in a teaching dissection.'),
 v('anorectal','Anorectal sling · oblique sectional view',p('extra-assets/(155)_Stylized_depiction_of_action_of_puborectalis_sling.png',{'puborectalis':(.408,.526)},crop=(.08,.08,.95,.91)),note='An explicit sectional teaching view of the puborectalis sling supplements the detailed perineal dissection; muscle geometry is stylised.')],
'clinical-neural-pathways':[
 v('brain-base','Brain & cranial nerves · inferior',p('neuro-assets/brain-inferior.svg',{'optic-chiasm':(.501,.387),'oculomotor':(.435,.448),'abducens':(.425,.57),'hypoglossal':(.408,.659)},remove_layers=('Labels','labels'),ocr=False)),
 v('lower-pons','Caudal pons · transverse section',p('neuro-assets/Lower_pons_horizontal_KB.svg',{'medial-lemniscus':(.510,.468)},remove_layers=('layer4','layer3','layer5'),ocr=False,crop=(.18,.15,.96,.905)),note='Caudal pontine section: dorsal is up. The medial lemniscus is shown as a teaching territory within the tegmentum.'),
 v('medulla','Caudal medulla · transverse section',p('neuro-assets/Gray687.png',{'pyramidal-decussation':(.515,.671)},crop=(.04,.015,.99,.99)),note='Crossing corticospinal fibres are shown in the caudal medulla, ventral to the central canal.')],
'clinical-laryngeal-relations':[
 v('vagus','Left vagal branches · lateral',p('pelvic-larynx-assets/Recurrent_laryngeal_nerve.svg',{'left-recurrent-laryngeal':(.758,.785),'external-laryngeal':(.435,.47)},remove_layers=('annotations',),ocr=False),note='The left recurrent laryngeal nerve loops under the aortic arch. The external superior laryngeal branch descends to cricothyroid; it is distinct from the internal sensory branch.'),
 v('posterior-muscles','Laryngeal muscles · posterior',p('extra-assets/Gray958.png',{'posterior-cricoarytenoid':(.424,.629)},crop=(.04,.01,.75,.95)))],
'clinical-spinal-orientation':[
 v('planes','Body reference planes · anterior oblique',p('body-assets/human-planes-source.svg',{'coronal-plane':(.79,.22),'sagittal-plane':(.385,.095),'transverse-plane':(.79,.393)},extract=True,ocr=False),note='Planes are geometric references through the body. They are illustrated in three dimensions; this is not a patient scan.'),
 v('meninges','Cord & meninges · transverse section',p('neuro-assets/Gray770.png',{'subarachnoid-space':(.501,.156)},crop=(.01,.02,.99,.99))),
 v('cauda','Vertebral canal · sagittal section',p('neuro-assets/Gray661.png',{'cauda-equina':(.438,.57)},crop=(.05,.01,.94,.99))),
 v('ligaments','Lumbar vertebral canal · sagittal',p('extra-assets/Gray301.png',{'ligamentum-flavum':(.57,.45)},crop=(.01,.01,.99,.99))),
 v('axis','Axis (C2) · superior view',p('extra-assets/Gray87.png',{'dens':(.348,.164)},crop=(.03,.01,.94,.99))),
 v('foramen','Thoracic vertebrae · lateral',p('extra-assets/Gray91.png',{'intervertebral-foramen':(.363,.587)},crop=(.09,.31,.75,.99)))],
}
specs['upper-respiratory']=[
 v('sagittal','Upper airway · midsagittal section',p('respiratory-assets/upper-airway-openstax.jpg',{
 'nostril':(.711,.319),'nasal-vestibule':(.697,.286),'sphenoidal-sinus':(.431,.151),'nasopharynx':(.36,.326),'oropharynx':(.369,.505),'laryngopharynx':(.342,.612),'soft-palate':(.432,.368),'hard-palate':(.544,.333),'uvula':(.38,.409),'palatine-tonsil':(.379,.449),'pharyngeal-tonsil':(.36,.241),'lingual-tonsil':(.411,.494),'auditory-opening':(.366,.265),'olfactory-epithelium':(.516,.143)},crop=(.215,.035,.74,.67))),
 v('lateral-nose','Nasal cavity · lateral wall',p('respiratory-assets/Gray855.png',{'superior-concha':(.537,.445),'middle-concha':(.497,.548),'inferior-concha':(.518,.64),'superior-meatus':(.577,.481),'middle-meatus':(.535,.587),'inferior-meatus':(.559,.697),'sphenoethmoidal-recess':(.593,.322),'choana':(.677,.626)},crop=(.02,.015,.98,.98))),
 v('septum','Nasal septum · medial wall',p('respiratory-assets/Gray854.png',{'nasal-septum':(.525,.53)},crop=(.015,.01,.99,.99))),
 v('sinuses','Paranasal sinuses · anterior projection',p('respiratory-assets/sinuses.svg',{'frontal-sinus':(.182,.387),'ethmoidal-cells':(.204,.462),'maxillary-sinus':(.161,.609)},crop=(.004,.005,.442,.985),ocr=False),note='Anterior projection showing frontal, ethmoidal and maxillary air spaces. The sphenoidal sinus is identified in the sagittal view, behind the nasal cavity.')]
specs['lower-respiratory']=[
 v('framework','Laryngeal framework · posterior',p('extra-assets/Gray952.png',{'epiglottis':(.303,.215),'thyroid-cartilage':(.438,.363),'cricoid-cartilage':(.30,.682),'arytenoid-cartilage':(.395,.493),'corniculate-cartilage':(.342,.421)},crop=(.015,.005,.63,.99))),
 v('inlet','Laryngeal inlet · superior view',p('pelvic-larynx-assets/Gray956.png',{'cuneiform-cartilage':(.465,.696),'aryepiglottic-fold':(.520,.593),'vocal-fold':(.387,.493),'rima-glottidis':(.33,.582)},crop=(.015,.185,.672,.89)),note='Superior view of the larynx. Cartilage pins on this mucosal view mark their overlying tubercles; the rima glottidis is the opening between the true vocal folds.'),
 v('cavities','Larynx · coronal section',p('pelvic-larynx-assets/Gray954.png',{'vestibular-fold':(.49,.449),'laryngeal-ventricle':(.51,.483),'laryngeal-vestibule':(.598,.326),'infraglottic-cavity':(.588,.629)},crop=(.31,.01,.80,.99))),
 v('bronchial-tree','Trachea & lobar bronchi · anterior',p('extra-assets/Gray961.png',{'trachea':(.454,.418),'tracheal-cartilage':(.477,.487),'carina':(.438,.663),'right-main-bronchus':(.355,.672),'left-main-bronchus':(.56,.682),'right-superior-lobar-bronchus':(.218,.65),'right-middle-lobar-bronchus':(.255,.754),'right-inferior-lobar-bronchus':(.296,.839),'left-superior-lobar-bronchus':(.727,.723),'left-inferior-lobar-bronchus':(.694,.846)},crop=(.01,.015,.99,.99)),note='Anterior view: the patient’s right is image left. Pins identify proximal lobar branches; more distal segmental bronchi and anatomical variations are outside this set.'),
 v('lung-lobes','Lung lobes & fissures · anterior dissection',p('extra-assets/Gray962.png',{'right-superior-lobe':(.319,.137),'right-middle-lobe':(.175,.475),'right-inferior-lobe':(.267,.806),'left-superior-lobe':(.693,.158),'left-inferior-lobe':(.79,.785),'right-horizontal-fissure':(.23,.343),'right-oblique-fissure':(.28,.599),'left-oblique-fissure':(.773,.628)},crop=(.02,.005,.98,.95),mask=((.13,.424,.235,.493),(.126,.648,.235,.70),(.727,.68,.839,.72),(.65,.04,.78,.13),(.75,.105,.84,.213)))),
 v('respiratory-unit','Respiratory unit · enlarged terminal airways',p('respiratory-assets/respiratory-zone-openstax.jpg',{'terminal-bronchiole':(.117,.069),'respiratory-bronchiole':(.116,.174),'alveolar-duct':(.112,.227),'alveolar-sac':(.072,.302),'alveolus':(.09,.332)},crop=(.022,.02,.234,.451)),note='The last airway without alveoli leads to an alveolated respiratory bronchiole, alveolar ducts and sacs. This enlarged anatomical view is not a scale-matched section of the whole lung.'),
 v('alveolar-wall','Alveolar wall · enlarged anatomical inset',p('respiratory-assets/respiratory-zone-openstax.jpg',{'type-one-cell':(.206,.718),'type-two-cell':(.123,.84),'alveolar-macrophage':(.08,.673),'pulmonary-capillary':(.181,.629),'respiratory-membrane':(.205,.668),'alveolar-pore':(.151,.628)},crop=(.005,.515,.216,.87),mask=((.077,.733,.147,.775),)),note='An anatomical cutaway of the air–blood interface. Pins identify cells and wall structures in the illustration; a separate histology subject has not been added.'),
 v('pleura','Pleural reflections · anterior cutaway',p('respiratory-assets/pleura-source.jpg',{'diaphragm':(.37,.708),'costodiaphragmatic-recess':(.548,.633)},crop=(.028,.014,.596,.851))),
 v('pleural-layers','Pleural layers · enlarged chest wall',p('respiratory-assets/pleura-source.jpg',{'parietal-pleura':(.904,.312),'visceral-pleura':(.904,.467),'pleural-cavity':(.924,.510)},crop=(.747,.186,.991,.519)),note='The pleural space is a potential space exaggerated for visibility. Visceral pleura follows lung; parietal pleura lines the chest wall.')]
