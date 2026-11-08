# Applied anatomy bank: source and review notes

Created 8 November 2026. Status: source-checked draft; no clinician or anatomy-faculty review has been completed. These are 64 original short-answer learning items, eight in each of eight regional groups. This is an initial applied bank, not complete Year 1–2 anatomy coverage and not a secure examination or patient-care tool.

## Included scope

- Upper limb: posterior-cord outputs, surgical-neck relationship, carpal tunnel, anterior interosseous branch, brachial and palmar arterial continuity.
- Lower limb: superior gluteal supply, saphenous territory, common fibular branching, first dorsal web-space territory, lateral-compartment innervation, arterial transitions and superficial venous return.
- Thorax: pericardial reflections, pleural recess, phrenic motor roots, greater thoracic splanchnic route, cardiac grooves and venous/lymphatic return.
- Abdomen: celiac and mesenteric branches, portal formation, biliary confluence, inguinal ring, epigastric landmarks and hernia boundaries.
- Pelvis/perineum: pudendal route, sacral parasympathetics, puborectalis, ureter/uterine-artery crossing, ovarian venous asymmetry, corpus spongiosum, pudendal canal and inferior rectal nerve.
- Head/neck: ocular and tongue motor innervation, left recurrent laryngeal loop, cricothyroid exception, vocal-fold abduction, cranial foramina and tracheoesophageal relationship.
- Neuroanatomy: visual crossing, medial lemniscus, spinothalamic pathway, pupillary afferent/efferent nerves, motor crossing and ACA/MCA motor territories.
- Back/surface/imaging orientation: coronal, sagittal and transverse planes; cauda equina, subarachnoid space, ligamentum flavum, intervertebral foramen and dens.

## Reference approach

Every item includes an exact source URL and title. Thirty university/textbook source pages were retrieved. Primary sources are UAMS Department of Neuroscience anatomy tables, Texas Tech University Health Sciences Center El Paso medical gross-anatomy tables/dissector notes, OpenStax Anatomy and Physiology 2e, University of Wisconsin neuroanatomy coursebook and Loyola LUMEN neurovascular teaching pages. The two cerebral arterial-territory items carry secondary references.

Prompts, hints and explanations were authored afresh from anatomical relationships. No quiz bank questions or diagrams were copied. Source-derived visible teaching text is kept below 200 words per referenced page across the bank; the largest primary-source allocation is 156 words before repeated reference titles. Do not substantially enlarge one source's paraphrase allocation without obtaining a broader licensed reference.

## Validation performed

The generation script checks 64 unique item IDs, eight items per regional group, three hints per item and nonempty canonical answers. The first hint never includes the full canonical answer. Final spelling hints can intentionally expose a prefix, initial or abbreviation. Canonical answers remain separate from prompt/title text.

## Integration notes

- The JSON file is a plain array. `acceptedAnswers` contains additional aliases, not the canonical answer; combine both when grading.
- Normalize spaces, punctuation, possessives and case deliberately. Do not accept merely approximate or different structures.
- Canonical names and aliases can have different lengths. A fixed canonical dash count must not silently truncate a valid longer alias. Prefer canonical-spelling typing with clearly documented alternatives, or normalize an explicitly submitted full alias before rendering the canonical answer.
- Map each question to a real matching highlighted structure only when that structure exists in its diagram. Otherwise label the display as regional context. Do not highlight a nearby bone or generic organ as though it were the nerve, arterial branch, plane or potential space being asked.
- A cerebral arterial plate should distinguish the anastomotic circle of Willis from adjacent outputs: the MCA is not itself a ring component.
- Do not infer 'module completed' from answering this small sample bank. Topic coverage and learner performance are different measures.

## Review gaps before claiming comprehensive curriculum coverage

An anatomy educator should review each stem, accepted synonym, diagram alignment and qualifier. Regional vascular and nerve variants need deliberate representation beyond the normal-pattern qualifiers present here. Dermatomes, myotomes, joint mechanics, detailed attachments, autonomic ganglia, venous collateral pathways, embryological anomalies, sections/real imaging and many detailed spaces/nuclei are not exhaustively assessed by these 64 items. Real imaging would need a separately licensed/consented image source and verified labels.

## Source caveats handled

OpenStax 13.4 contains a C4–T1 brachial-plexus description; this bank does not use that claim. The standard C5–T1 description is available from the UAMS upper-limb nerve table. OpenStax 15.3's broader account of the hypothalamus and pupillary-reflex integration is simplified; only the uncontroversial optic afferent and oculomotor efferent nerve relationships were used. Detailed pretectal/midbrain integration should use a specialist neuroanatomy reference. Older table terminology is not adopted where it can mislead (e.g. 'urogenital diaphragm' as a universal model or treating external anal sphincter as part of levator ani).
