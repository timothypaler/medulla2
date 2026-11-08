# Medulla anatomy scope research

Created 8 November 2026. This is an original product taxonomy: 60 modules and 243 objectives. It is a planning and auditing aid, not a declaration that the app has implemented or validated this content. No proprietary atlas images, plates, question sets, or passages were copied.

## Curriculum interpretation

The University of Cebu's MD curriculum places gross/developmental anatomy and neuroanatomy in Year 1, then adds clinical disciplines in Year 2. Use **foundation** and **applied** as stages; the suggested years are product guidance rather than a universal course sequence. A named medical school's syllabus is still needed for a claim of school-specific completeness.

The Anatomical Society provides a regional core anatomy syllabus, a separate embryology syllabus and a route to neuroanatomy syllabuses. These are graduate outcome references, not a fixed two-year teaching schedule. A module-count percentage is not the same as a percentage of all medical anatomy.

## Files

- `anatomy-scope.json`: source registry, 60 modules, prerequisites, suggested stages, assessment types, source links and atlas-reading tasks.
- `anatomy-objectives.csv`: 243 individually addressable objective rows for implementation/review tracking.
- `build_scope.py`: original data generation and structure checks.

## Primary source entry points

- Anatomical Society medical syllabus: https://www.anatsoc.org.uk/educational-resources/core-syllabi/medical-anatomy-syllabus/ (`turn6631512view0`). The cited paper search extract is https://pmc.ncbi.nlm.nih.gov/articles/PMC4694160/ (`turn3793464search0`); direct retrieval returned a crawler verification page, so do not claim the entire paper was inspected.
- Anatomical Society embryology syllabus: https://www.anatsoc.org.uk/educational-resources/core-syllabi/embryology-syllabus/ (`turn6631512view1`).
- University of Cebu MD curriculum: https://som.uc.edu.ph/curriculum/ (`turn6762278view1`).
- University of Michigan anatomy course entry point: https://sites.google.com/umich.edu/anatomy503 (`turn4193294view2`). Region-specific pages are in the JSON source registry; refs `turn4965684view0` through `turn4965684view10`.
- Texas Tech regional modules: https://anatomy.ttuhscep.edu/courseinfo/module_index.html (`turn4193294view1`). Neuro lab 1: https://anatomy.ttuhscep.edu/schemes/neuro1.html (`turn4193294view3`).
- IFAA core syllabuses: https://ifaa.net/committees/anatomical-education-fipae/fipae-core-syllabuses-project/ (`turn1323633search3`).
- UTHealth sensory pathways: https://nba.uth.tmc.edu/neuroanatomy/L2/Lab02p20_index.html (`turn1323633search0`). Descending pathways: https://nba.uth.tmc.edu/NEUROANATOMY/L6/Lab06p01_index.html (`turn1323633search1`). Autonomic anatomy: https://nba.uth.tmc.edu/neuroscience/m/s4/chapter03.html (`turn9943304search6`).
- Royal College of Radiologists undergraduate curriculum: https://www.rcr.ac.uk/media/utcam3d4/rcr-curriculum_undergraduate-radiology-curriculum_february-2022.pdf (`turn1323633search36`).
- UBC undergraduate imaging teaching: https://radiology.med.ubc.ca/education/undergraduate/ (`turn1323633search21`).
- UNSW embryology: https://embryology.med.unsw.edu.au/embryology/index.php/Main_Page (`turn4193294view4`). Placenta: https://embryology.med.unsw.edu.au/embryology/index.php?title=Placenta_Development (`turn9943304view0`).

## Atlas and atlas-app alignment

Each module includes an original regional search label and a task to compare views, layers and relationships in a legally accessed atlas. These are not Netter plate numbers, Complete Anatomy model identifiers, or proprietary chapter mappings. The main agent is separately verifying official atlas/app product references. Region search labels can guide users to their own book/app without suggesting the project has reproduced either source.

Use an atlas to check three distinct things: whether the depicted structure has the right shape/orientation, whether nearby relations are correct, and whether the tested target is unambiguous. Merely having a familiar name on a diagram does not establish anatomical accuracy.

## Implementation and medical review gates

All 60 modules start as `roadmap`, with `draft-needs-anatomist-review`. Existing Medulla questions and diagrams have not been audited against these objectives in this subtask. Do not mark the curriculum complete merely because a region already has an identification plate.

For every objective, track: concrete content item IDs; image/diagram IDs and view orientation; exact references; copyright/license; answer/alias checks; learner assessment; anatomy reviewer identity/date; and known exceptions or normal variants. An implementation percentage and a review percentage should be separate.

Foundation work should assess identification plus structural relationships. Applied work should require localization or explanation from bounded case information, not just harder spelling. Clinical teaching cases should test anatomy rather than recommend patient management. Imaging modules need actual permitted clinical images before being described as a radiology image bank; an X-ray-style vector is still a schematic.

A real completeness audit must also check item depth: muscle attachments/actions/innervation; vessel branching and supply; regional venous and lymphatic drainage; joint stabilizers; spaces and boundaries; autonomics; cranial pathways; developmental relationships; surface landmarks; and sectional recognition. An independent qualified anatomist should review each relevant domain before any 'fully reviewed' label.

## Rights and reuse

The current OpenStax A&P 2e preface reports CC BY-NC-SA 4.0 and describes restrictions for commercial reuse: https://openstax.org/books/anatomy-and-physiology-2e/pages/preface (`turn6762278view2`). Do not assume older CC BY terms apply to current assets. UNSW warns that its site contains material under different copyright restrictions. University-hosted educational images are not automatically licensed for redistribution. These sources may be linked; embedding any image needs its own verified license and attribution.

The JSON objectives are independently worded scope prompts and do not reproduce full learning-outcome lists from a source. Their organization is a Medulla design proposal requiring reviewer approval, not an officially endorsed syllabus.
