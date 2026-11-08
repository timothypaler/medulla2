# Clinical visual asset review

Asset: clinical-visuals.ts. Original vector geometry, 450 × 540 view boxes. Ten plates add 43 canonical case targets. The existing atlas supplies the other 21 targets; combining the asset with the current atlas yields one canonical-name match for each of all 64 applied cases, without duplicates. `clinicalCaseTargetKeys` gives an explicit mapping for the 43 additions.

Each target reuses canonical name, aliases, hints, explanation and source URL from applied-cases.json. No copyrighted diagrams were traced or copied. The geometry depicts teaching relationships and connectivity, not clinically validated image segmentation or a 3-D reconstruction.

## Checks

- Ten regions, 43 parts and 43 explicit case mappings.
- All part IDs are unique inside their plate; all combined keys are unique.
- Every target has shapes, three hints, a valid source URL and a finite anchor inside 450 × 540.
- No undefined/NaN coordinates in SVG paths.
- Contact sheet rendered from the SVG paths and visually inspected. Inkscape accepted every SVG.
- TypeScript strict checking against the current Region/Part/Shape definitions passed.
- Existing 21 + added 43 map to 64/64 case canonical names, with no canonical-name ambiguity. Do not restore alias-based diagram matching: 'frontal' can mean either a plane or a skull bone.

## View-specific limits to preserve in the UI

- Upper-limb and lower-limb vascular paths combine separate anterior, posterior or medial panels. They must not be interpreted as all structures lying in one section. The great saphenous panel is a medial view with anterior to the left.
- The superior pericardial strip is an anterior/posterior relationship map, not a CT slice. The highlighted transverse interval is behind the two arterial outflow structures and in front of the superior vena cava. The pericardial ring represents the fibrous sac; the recess wedges represent potential pleural space.
- The posterior thoracic plate has independently oriented anterior and posterior heart panels. The two coronary targets lie on different heart surfaces. Thoracic routes are projections, not exact vertebral-level measurements.
- The abdominal plate separates portal/biliary connectivity from a lower renal venous projection. The left renal vein crosses anterior to the aorta; the aortic-line gap marks the overlying vein. The upper projected ducts/vessels do not assert fixed lateral spacing within the portal triad.
- The inguinal view is an isolated internal wall, explicitly medial at left and lateral at right. Its highlighted triangle is bounded by the rectus edge, inferior epigastric course and inguinal ligament. The deep ring is lateral to the inferior epigastric vessels.
- The pelvic plate includes four independent schematics. The autonomic panel is connectivity only. The sling is a lateral projected relationship, the pudendal canal a cross-section against the medial obturator fascia, and the erectile-body panel a transverse penile section with dorsal at top.
- The visual/brainstem plate deliberately presents connections. It does NOT show a footprint of the medial lemniscus in a real medullary section, exact brainstem nerve root-exit points or the detailed pretectal/ciliary pathway. The pyramidal crossing is placed in the caudal-medullary level before continuation into cord. Retain the 'connections, not spatial root-exit positions' guide.
- The laryngeal plate combines an anterior left-neck nerve-route projection with a separate posterior laryngeal muscle inset. These must not be labeled as one view. The recurrent branch loops below the aortic arch; the external superior-laryngeal branch reaches cricothyroid.
- The three body-plane targets use abstract body-axis volumes so their geometry is explicit, not a guessed slice through an organ. Lower spinal insets are separate lateral relationship and bony projections, not one midsagittal view. The highlighted intervertebral foramen lies between adjacent pedicles and the dens rises from the axis into the atlas relation.

All plates remain source-based draft teaching schematics requiring anatomy-educator review before being called medically reviewed or comprehensive. The higher-risk items for such review are the condensed multipanel perineal view, the neural connection map, the pericardial inset and the crowded spinal/plane plate. No target has been silently substituted with a nearby structure, but the visual abstraction must remain disclosed.
