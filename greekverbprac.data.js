/* Greek Verb Memoriser — data module.
 * Exposes: VERBS, CONJUGATIONS, EXAMPLES, FAMILIES, GRAMMAR_NOTES, STEM_MAPS.
 * Edit this file to add/remove/adjust verbs. The app (greekverbprac.app.js) uses these as globals.
 *
 * Verb schema:
 *   { set, english, present, past, future, pastCont, futureCont,
 *     class: 'A' | 'B1' | 'B2' | 'MP' | 'IRR',
 *     family: <key into FAMILIES>, defective?: <string>, classNote?: <string>,
 *     presentAlt?: [...] }
 *
 * CONJUGATIONS[english] = { present:[6], past:[6], future:[6], pastCont:[6], futureCont:[6] }
 *   — persons order: [1sg, 2sg, 3sg, 1pl, 2pl, 3pl]
 *   — verbs without an override fall back to the class-based conjugator in the app.
 *   — irregular verbs MUST have full overrides, or the drill will produce wrong forms.
 *
 * EXAMPLES[english][tense] = [greek_sentence, english_translation]  (in 1sg).
 */

window.GRAMMAR_NOTES = {
  present:   { short: '<strong>Present stem + present endings</strong>. Inside-the-action form.', title: 'Present = present stem + present endings' },
  past:      { short: '<strong>Past stem + present endings</strong> (+ <strong>ε-</strong> often). One-shot form.', title: 'Simple past = past stem + present endings' },
  future:    { short: '<strong>Θα + past stem + present endings</strong>. Whole action in the future.', title: 'Future simple = θα + past stem + present endings' },
  pastCont:  { short: '<strong>Present stem + past endings</strong> (+ <strong>ε-</strong> sometimes). Inside the action in the past.', title: 'Past continuous = present stem + past endings' },
  futureCont:{ short: '<strong>Θα + present tense</strong>. Inside the action in the future.', title: 'Future continuous = θα + present tense' }
};

window.STEM_MAPS = {
  'say / tell': { presentSide:'λεγ- / λε- side', pastSide:'ειπ- / π- side', note:'Real stem split: <strong>λέω / έλεγα / θα λέω</strong> vs <strong>είπα / θα πω</strong>.' },
  'see':        { presentSide:'βλεπ- side',     pastSide:'ειδ- / δ- side', note:'<strong>βλέπω / έβλεπα / θα βλέπω</strong> vs <strong>είδα / θα δω</strong>.' },
  'take':       { presentSide:'παιρν- side',    pastSide:'πηρ- / παρ- side', note:'<strong>παίρνω / έπαιρνα / θα παίρνω</strong> vs <strong>πήρα / θα πάρω</strong>.' },
  'give':       { presentSide:'διν- side',      pastSide:'δωσ- side', note:'<strong>δίνω / έδινα / θα δίνω</strong> vs <strong>έδωσα / θα δώσω</strong>.' },
  'find':       { presentSide:'βρισκ- side',    pastSide:'βρηκ- / βρ- side', note:'<strong>βρίσκω / έβρισκα / θα βρίσκω</strong> vs <strong>βρήκα / θα βρω</strong>.' },
  'put':        { presentSide:'βαζ- side',      pastSide:'βαλ- side', note:'<strong>βάζω / έβαζα / θα βάζω</strong> vs <strong>έβαλα / θα βάλω</strong>.' },
  'go':         { presentSide:'πα- / πηγαιν-',  pastSide:'πηγ- / πα- side', note:'<strong>πάω / πηγαίνω / πήγαινα / θα πηγαίνω</strong> vs <strong>πήγα / θα πάω</strong>.' },
  'come':       { presentSide:'ερχ- side',      pastSide:'ηρθ- / ερθ- side', note:'<strong>έρχομαι / ερχόμουν / θα έρχομαι</strong> vs <strong>ήρθα / θα έρθω</strong>.' },
  'eat':        { presentSide:'τρωγ- / τρω-',   pastSide:'φαγ- side', note:'<strong>τρώω / έτρωγα / θα τρώω</strong> vs <strong>έφαγα / θα φάω</strong>.' },
  'drink':      { presentSide:'πιν- side',      pastSide:'πι- side',  note:'<strong>πίνω / έπινα / θα πίνω</strong> vs <strong>ήπια / θα πιω</strong>.' },
  'enter':      { presentSide:'μπαιν- side',    pastSide:'μπ- side',  note:'<strong>μπαίνω / έμπαινα / θα μπαίνω</strong> vs <strong>μπήκα / θα μπω</strong>.' },
  'go out':     { presentSide:'βγαιν- side',    pastSide:'βγ- side',  note:'<strong>βγαίνω / έβγαινα / θα βγαίνω</strong> vs <strong>βγήκα / θα βγω</strong>.' },
  'stay / remain':{ presentSide:'μεν- side',    pastSide:'μειν- side', note:'<strong>μένω / έμενα / θα μένω</strong> vs <strong>έμεινα / θα μείνω</strong>.' },
  'leave / depart':{ presentSide:'φευγ- side',  pastSide:'φυγ- side',  note:'<strong>φεύγω / έφευγα / θα φεύγω</strong> vs <strong>έφυγα / θα φύγω</strong>.' },
  'bring':      { presentSide:'φερν- side',     pastSide:'φερ- side',  note:'<strong>φέρνω / έφερνα / θα φέρνω</strong> vs <strong>έφερα / θα φέρω</strong>.' },
  'know':       { presentSide:'ξερ- side',      pastSide:'ηξερ- side', note:'ξέρω is defective — it has no distinct aorist, so simple past and past continuous are both ήξερα, and both futures are θα ξέρω.' },
  'can':        { presentSide:'μπορ- side',     pastSide:'μπορεσ- side', note:'<strong>μπορώ / μπορούσα / θα μπορώ</strong> vs <strong>μπόρεσα / θα μπορέσω</strong>. In speech μπορούσα often covers simple-past meanings too.' },
  'remember':   { presentSide:'θυμ- side',      pastSide:'θυμηθ- / θυμησ-', note:'<strong>θυμάμαι / θυμόμουν / θα θυμάμαι</strong> vs <strong>θυμήθηκα / θα θυμηθώ</strong>.' },
  'become':     { presentSide:'γιν- side',      pastSide:'γεν- / γιν-', note:'<strong>γίνομαι / γινόμουν / θα γίνομαι</strong> vs <strong>έγινα / θα γίνω</strong>.' },
  'understand': { presentSide:'καταλαβαιν-',    pastSide:'καταλαβ-', note:'<strong>καταλαβαίνω / καταλάβαινα / θα καταλαβαίνω</strong> vs <strong>κατάλαβα / θα καταλάβω</strong>.' },
  'be':         { presentSide:'ειμ- / εισ- / ειν-', pastSide:'ημ- / ησ- / ητ-', note:'είμαι has no aorist: simple past and past continuous coincide in the imperfect ήμουν. Both futures coincide as θα είμαι.' },
  'have':       { presentSide:'εχ- side',       pastSide:'ειχ- side', note:'έχω has no aorist: simple past and past continuous are both είχα. Both futures are θα έχω.' },
  'want':       { presentSide:'θελ- side',      pastSide:'(θελησ- rare)', note:'θέλω is defective — simple past and past continuous both normally surface as ήθελα. Both futures are θα θέλω.' },
  'hear / listen':{ presentSide:'ακου- (→ ακουγ- in imperfect)', pastSide:'ακουσ- side', note:'Type A/B: present <strong>ακούω</strong>, imperfect adds -γ- → <strong>άκουγα</strong>, aorist <strong>άκουσα</strong> / future <strong>θα ακούσω</strong>.' },
  'burn':       { presentSide:'και- (→ καιγ- in imperfect)', pastSide:'καψ- side', note:'Type A/B: <strong>καίω / έκαιγα</strong> (with -γ-) vs <strong>έκαψα / θα κάψω</strong>.' },
  'cry':        { presentSide:'κλαι- (→ κλαιγ- in imperfect)', pastSide:'κλαψ- side', note:'Type A/B: <strong>κλαίω / έκλαιγα</strong> (with -γ-) vs <strong>έκλαψα / θα κλάψω</strong>.' },
  'be at fault':{ presentSide:'φται- (→ φταιγ- in imperfect)', pastSide:'φταιξ- side', note:'Type A/B: <strong>φταίω / έφταιγα</strong> (with -γ-) vs <strong>έφταιξα / θα φταίξω</strong>.' },
  'exist':      { presentSide:'υπαρχ- side', pastSide:'υπηρξ- side', note:'Irregular η- augment: <strong>υπάρχω / υπήρχα</strong> (imperfect) vs <strong>υπήρξα / θα υπάρξω</strong>.' }
};

window.FAMILIES = {
  '-αίνω / -ηκα (stem-jump)': {
    label: 'Verbs in -αίνω with aorist in -ηκα (stem jump)',
    note: 'These share the same pattern: present stem in -αίν-, aorist in -η-, future simple drops heavily.',
    members: ['enter', 'go out', 'arrive', 'learn', 'understand']
  },
  '-ώ / -ησα (B2 contract)': {
    label: 'Class B2 contract verbs (-ώ / -ησα)',
    note: 'Present in -ώ, -είς, -εί, -ούμε, -είτε, -ούν. Aorist typically in -ησα. Imperfect in -ούσα.',
    members: ['can', 'try', 'agree', 'disagree', 'worry', 'love', 'like (feel friendly)', 'hate']
  },
  '-άω / -ησα (B1 contract)': {
    label: 'Class B1 contract verbs (-άω/-ώ with aorist -ησα)',
    note: 'Present in -άω/-ώ, -άς, -ά(ει), -άμε, -άτε, -άνε. Aorist in -ησα. Imperfect in -ούσα.',
    members: ['speak', 'wear', 'ask', 'answer', 'hold / keep', 'stop']
  },
  '-ω / -σα (A regular)': {
    label: 'Class A regulars (-ω / -σα)',
    note: 'Present in -ω, -εις, -ει…; aorist typically a sibilant -σα/-ψα/-ξα.',
    members: ['read', 'write', 'work', 'cook', 'open', 'close', 'send', 'buy', 'show', 'run', 'choose', 'change', 'continue', 'travel', 'return', 'relax', 'hope', 'arrive', 'think / believe', 'feel']
  },
  '-ομαι / -θηκα (mediopassive)': {
    label: 'Mediopassive verbs (-ομαι with aorist in -θηκα or related)',
    note: 'Present in -ομαι / -εσαι / -εται…; aorist usually -θηκα / -τηκα; future simple in -ω.',
    members: ['come', 'think', 'remember', 'become', 'rest']
  },
  'stem-split common irregulars': {
    label: 'High-frequency stem-split irregulars',
    note: 'These are the top-10 irregulars you will use constantly — learn each as two families, not one conjugation.',
    members: ['take', 'give', 'say / tell', 'see', 'find', 'put', 'go', 'come', 'eat', 'drink', 'leave', 'leave / depart', 'bring']
  },
  'auxiliary / defective': {
    label: 'Auxiliaries and defective verbs',
    note: 'είμαι, έχω, θέλω, ξέρω — no real aorist; tense distinctions collapse.',
    members: ['be', 'have', 'want', 'know']
  },
  '-γ- vowel stems (Type A/B)': {
    label: 'Type A/B — vowel-stem verbs with -γ- in the imperfect',
    note: 'The textbook "Τύπος Α/Β". Present looks Class-A-ish but contracts (ακούω, ακούς, ακούει…). The giveaway is the παρατατικός: a -γ- slots in before the past endings — άκουγα, έκαιγα, έκλαιγα, έφταιγα. λέω→έλεγα and τρώω→έτρωγα share this imperfect even though their aorists are stem-split.',
    members: ['hear / listen', 'burn', 'cry', 'be at fault']
  }
};

window.VERBS = [
  // --- Set 1: essentials & big irregulars ---
  { set: 1, english: 'be',              present: 'είμαι',   past: 'ήμουν',     future: 'θα είμαι',    pastCont: 'ήμουν',     futureCont: 'θα είμαι',    class: 'IRR', family: 'auxiliary / defective', defective: 'no aorist; past simple and past continuous both use ήμουν; both futures are θα είμαι.' },
  { set: 1, english: 'have',            present: 'έχω',     past: 'είχα',      future: 'θα έχω',      pastCont: 'είχα',      futureCont: 'θα έχω',      class: 'IRR', family: 'auxiliary / defective', defective: 'no aorist; past simple and past continuous both use είχα; both futures are θα έχω.' },
  { set: 1, english: 'do / make',       present: 'κάνω',    past: 'έκανα',     future: 'θα κάνω',     pastCont: 'έκανα',     futureCont: 'θα κάνω',     class: 'A' },
  { set: 1, english: 'take',            present: 'παίρνω',  past: 'πήρα',      future: 'θα πάρω',     pastCont: 'έπαιρνα',   futureCont: 'θα παίρνω',   class: 'IRR', family: 'stem-split common irregulars' },
  { set: 1, english: 'give',            present: 'δίνω',    past: 'έδωσα',     future: 'θα δώσω',     pastCont: 'έδινα',     futureCont: 'θα δίνω',     class: 'IRR', family: 'stem-split common irregulars' },
  { set: 1, english: 'say / tell',      present: 'λέω',     past: 'είπα',      future: 'θα πω',       pastCont: 'έλεγα',     futureCont: 'θα λέω',      class: 'IRR', family: 'stem-split common irregulars', classNote: 'its imperfect follows the Type A/B -γ- pattern (έλεγα), even though the aorist είπα is stem-split.' },
  { set: 1, english: 'see',             present: 'βλέπω',   past: 'είδα',      future: 'θα δω',       pastCont: 'έβλεπα',    futureCont: 'θα βλέπω',    class: 'IRR', family: 'stem-split common irregulars' },
  { set: 1, english: 'find',            present: 'βρίσκω',  past: 'βρήκα',     future: 'θα βρω',      pastCont: 'έβρισκα',   futureCont: 'θα βρίσκω',   class: 'IRR', family: 'stem-split common irregulars' },
  { set: 1, english: 'put',             present: 'βάζω',    past: 'έβαλα',     future: 'θα βάλω',     pastCont: 'έβαζα',     futureCont: 'θα βάζω',     class: 'IRR', family: 'stem-split common irregulars' },
  { set: 1, english: 'leave',           present: 'αφήνω',   past: 'άφησα',     future: 'θα αφήσω',    pastCont: 'άφηνα',     futureCont: 'θα αφήνω',    class: 'A' },
  { set: 1, english: 'go',              present: 'πάω',     presentAlt: ['πηγαίνω'], past: 'πήγα', future: 'θα πάω', pastCont: 'πήγαινα', futureCont: 'θα πηγαίνω', class: 'IRR', family: 'stem-split common irregulars', classNote: 'two present stems: πάω is shorter/more colloquial, πηγαίνω is fuller' },
  { set: 1, english: 'come',            present: 'έρχομαι', past: 'ήρθα',      future: 'θα έρθω',     pastCont: 'ερχόμουν',  futureCont: 'θα έρχομαι',  class: 'MP', family: 'stem-split common irregulars' },
  { set: 1, english: 'eat',             present: 'τρώω',    past: 'έφαγα',     future: 'θα φάω',      pastCont: 'έτρωγα',    futureCont: 'θα τρώω',     class: 'IRR', family: 'stem-split common irregulars', classNote: 'its imperfect follows the Type A/B -γ- pattern (έτρωγα), even though the aorist έφαγα is stem-split.' },
  { set: 1, english: 'drink',           present: 'πίνω',    past: 'ήπια',      future: 'θα πιω',      pastCont: 'έπινα',     futureCont: 'θα πίνω',     class: 'IRR', family: 'stem-split common irregulars' },
  { set: 1, english: 'enter',           present: 'μπαίνω',  past: 'μπήκα',     future: 'θα μπω',      pastCont: 'έμπαινα',   futureCont: 'θα μπαίνω',   class: 'IRR', family: '-αίνω / -ηκα (stem-jump)' },
  { set: 1, english: 'go out',          present: 'βγαίνω',  past: 'βγήκα',     future: 'θα βγω',      pastCont: 'έβγαινα',   futureCont: 'θα βγαίνω',   class: 'IRR', family: '-αίνω / -ηκα (stem-jump)' },
  { set: 1, english: 'stay / remain',   present: 'μένω',    past: 'έμεινα',    future: 'θα μείνω',    pastCont: 'έμενα',     futureCont: 'θα μένω',     class: 'A',   family: 'stem-split common irregulars' },
  { set: 1, english: 'leave / depart',  present: 'φεύγω',   past: 'έφυγα',     future: 'θα φύγω',     pastCont: 'έφευγα',    futureCont: 'θα φεύγω',    class: 'A',   family: 'stem-split common irregulars' },
  { set: 1, english: 'bring',           present: 'φέρνω',   past: 'έφερα',     future: 'θα φέρω',     pastCont: 'έφερνα',    futureCont: 'θα φέρνω',    class: 'A',   family: 'stem-split common irregulars' },
  { set: 1, english: 'learn',           present: 'μαθαίνω', past: 'έμαθα',     future: 'θα μάθω',     pastCont: 'μάθαινα',   futureCont: 'θα μαθαίνω',  class: 'A',   family: '-αίνω / -ηκα (stem-jump)' },
  { set: 1, english: 'know',            present: 'ξέρω',    past: 'ήξερα',     future: 'θα ξέρω',     pastCont: 'ήξερα',     futureCont: 'θα ξέρω',     class: 'IRR', family: 'auxiliary / defective', defective: 'no distinct aorist — simple past and past continuous both use ήξερα; both futures are θα ξέρω.' },
  { set: 1, english: 'can',             present: 'μπορώ',   past: 'μπόρεσα',   future: 'θα μπορέσω',  pastCont: 'μπορούσα',  futureCont: 'θα μπορώ',    class: 'B2',  family: '-ώ / -ησα (B2 contract)' },

  // --- Set 2: common A/B regulars ---
  { set: 2, english: 'speak',           present: 'μιλάω',     past: 'μίλησα',       future: 'θα μιλήσω',       pastCont: 'μιλούσα',       futureCont: 'θα μιλάω',       class: 'B1', family: '-άω / -ησα (B1 contract)' },
  { set: 2, english: 'read',            present: 'διαβάζω',   past: 'διάβασα',      future: 'θα διαβάσω',      pastCont: 'διάβαζα',       futureCont: 'θα διαβάζω',     class: 'A',  family: '-ω / -σα (A regular)' },
  { set: 2, english: 'write',           present: 'γράφω',     past: 'έγραψα',       future: 'θα γράψω',        pastCont: 'έγραφα',        futureCont: 'θα γράφω',       class: 'A',  family: '-ω / -σα (A regular)' },
  { set: 2, english: 'work',            present: 'δουλεύω',   past: 'δούλεψα',      future: 'θα δουλέψω',      pastCont: 'δούλευα',       futureCont: 'θα δουλεύω',     class: 'A',  family: '-ω / -σα (A regular)' },
  { set: 2, english: 'cook',            present: 'μαγειρεύω', past: 'μαγείρεψα',    future: 'θα μαγειρέψω',    pastCont: 'μαγείρευα',     futureCont: 'θα μαγειρεύω',   class: 'A',  family: '-ω / -σα (A regular)' },
  { set: 2, english: 'open',            present: 'ανοίγω',    past: 'άνοιξα',       future: 'θα ανοίξω',       pastCont: 'άνοιγα',        futureCont: 'θα ανοίγω',      class: 'A',  family: '-ω / -σα (A regular)' },
  { set: 2, english: 'close',           present: 'κλείνω',    past: 'έκλεισα',      future: 'θα κλείσω',       pastCont: 'έκλεινα',       futureCont: 'θα κλείνω',      class: 'A',  family: '-ω / -σα (A regular)' },
  { set: 2, english: 'wait',            present: 'περιμένω',  past: 'περίμενα',     future: 'θα περιμένω',     pastCont: 'περίμενα',      futureCont: 'θα περιμένω',    class: 'A',  family: 'auxiliary / defective', defective: 'the aorist περίμενα coincides with the imperfect; both futures are identical.' },
  { set: 2, english: 'send',            present: 'στέλνω',    past: 'έστειλα',      future: 'θα στείλω',       pastCont: 'έστελνα',       futureCont: 'θα στέλνω',      class: 'A' },
  { set: 2, english: 'wear',            present: 'φοράω',     past: 'φόρεσα',       future: 'θα φορέσω',       pastCont: 'φορούσα',       futureCont: 'θα φοράω',       class: 'B1', family: '-άω / -ησα (B1 contract)' },
  { set: 2, english: 'buy',             present: 'αγοράζω',   past: 'αγόρασα',      future: 'θα αγοράσω',      pastCont: 'αγόραζα',       futureCont: 'θα αγοράζω',     class: 'A',  family: '-ω / -σα (A regular)' },
  { set: 2, english: 'ask',             present: 'ρωτάω',     past: 'ρώτησα',       future: 'θα ρωτήσω',       pastCont: 'ρωτούσα',       futureCont: 'θα ρωτάω',       class: 'B1', family: '-άω / -ησα (B1 contract)' },
  { set: 2, english: 'answer',          present: 'απαντάω',   past: 'απάντησα',     future: 'θα απαντήσω',     pastCont: 'απαντούσα',     futureCont: 'θα απαντάω',     class: 'B1', family: '-άω / -ησα (B1 contract)' },
  { set: 2, english: 'try',             present: 'προσπαθώ',  past: 'προσπάθησα',   future: 'θα προσπαθήσω',   pastCont: 'προσπαθούσα',   futureCont: 'θα προσπαθώ',    class: 'B2', family: '-ώ / -ησα (B2 contract)' },
  { set: 2, english: 'show',            present: 'δείχνω',    past: 'έδειξα',       future: 'θα δείξω',        pastCont: 'έδειχνα',       futureCont: 'θα δείχνω',      class: 'A',  family: '-ω / -σα (A regular)' },
  { set: 2, english: 'run',             present: 'τρέχω',     past: 'έτρεξα',       future: 'θα τρέξω',        pastCont: 'έτρεχα',        futureCont: 'θα τρέχω',       class: 'A',  family: '-ω / -σα (A regular)' },
  { set: 2, english: 'hold / keep',     present: 'κρατάω',    past: 'κράτησα',      future: 'θα κρατήσω',      pastCont: 'κρατούσα',      futureCont: 'θα κρατάω',      class: 'B1', family: '-άω / -ησα (B1 contract)' },
  { set: 2, english: 'choose',          present: 'επιλέγω',   past: 'επέλεξα',      future: 'θα επιλέξω',      pastCont: 'επέλεγα',       futureCont: 'θα επιλέγω',     class: 'A',  family: '-ω / -σα (A regular)' },
  { set: 2, english: 'remember',        present: 'θυμάμαι',   past: 'θυμήθηκα',     future: 'θα θυμηθώ',       pastCont: 'θυμόμουν',      futureCont: 'θα θυμάμαι',     class: 'MP', family: '-ομαι / -θηκα (mediopassive)' },
  { set: 2, english: 'become',          present: 'γίνομαι',   past: 'έγινα',        future: 'θα γίνω',         pastCont: 'γινόμουν',      futureCont: 'θα γίνομαι',     class: 'MP', family: '-ομαι / -θηκα (mediopassive)' },

  // --- Set 3: feelings, communication, motion ---
  { set: 3, english: 'want',            present: 'θέλω',        past: 'ήθελα',         future: 'θα θέλω',         pastCont: 'ήθελα',         futureCont: 'θα θέλω',        class: 'IRR', family: 'auxiliary / defective', defective: 'no standard aorist in modern use — ήθελα covers both past simple and past continuous; both futures are θα θέλω.' },
  { set: 3, english: 'understand',      present: 'καταλαβαίνω', past: 'κατάλαβα',      future: 'θα καταλάβω',     pastCont: 'καταλάβαινα',   futureCont: 'θα καταλαβαίνω', class: 'A',   family: '-αίνω / -ηκα (stem-jump)' },
  { set: 3, english: 'think / believe', present: 'νομίζω',      past: 'νόμισα',        future: 'θα νομίσω',       pastCont: 'νόμιζα',        futureCont: 'θα νομίζω',      class: 'A',   family: '-ω / -σα (A regular)' },
  { set: 3, english: 'think',           present: 'σκέφτομαι',   past: 'σκέφτηκα',      future: 'θα σκεφτώ',       pastCont: 'σκεφτόμουν',    futureCont: 'θα σκέφτομαι',   class: 'MP',  family: '-ομαι / -θηκα (mediopassive)' },
  { set: 3, english: 'feel',            present: 'νιώθω',       past: 'ένιωσα',        future: 'θα νιώσω',        pastCont: 'ένιωθα',        futureCont: 'θα νιώθω',       class: 'A',   family: '-ω / -σα (A regular)' },
  { set: 3, english: 'like (feel friendly)', present: 'συμπαθώ', past: 'συμπάθησα',    future: 'θα συμπαθήσω',    pastCont: 'συμπαθούσα',    futureCont: 'θα συμπαθώ',     class: 'B2',  family: '-ώ / -ησα (B2 contract)', classNote: 'everyday "I like X (a thing)" is usually <strong>μου αρέσει X</strong> — see the "like (be pleasing)" entry' },
  { set: 3, english: 'like (be pleasing)', present: 'αρέσει',   past: 'άρεσε',          future: 'θα αρέσει',       pastCont: 'άρεσε',         futureCont: 'θα αρέσει',      class: 'A',   family: 'auxiliary / defective', defective: 'normally impersonal: μου αρέσει / μου άρεσε / θα μου αρέσει. Listed here in 3sg for practice.' },
  { set: 3, english: 'love',            present: 'αγαπάω',      past: 'αγάπησα',       future: 'θα αγαπήσω',      pastCont: 'αγαπούσα',      futureCont: 'θα αγαπάω',      class: 'B1',  family: '-άω / -ησα (B1 contract)' },
  { set: 3, english: 'hate',            present: 'μισώ',        past: 'μίσησα',        future: 'θα μισήσω',       pastCont: 'μισούσα',       futureCont: 'θα μισώ',        class: 'B2',  family: '-ώ / -ησα (B2 contract)' },
  { set: 3, english: "can't stand",     present: 'αντέχω',      past: 'άντεξα',        future: 'θα αντέξω',       pastCont: 'άντεχα',        futureCont: 'θα αντέχω',      class: 'A',   family: '-ω / -σα (A regular)', classNote: 'most commonly used with δεν: δεν αντέχω = I can\'t stand it' },
  { set: 3, english: 'agree',           present: 'συμφωνώ',     past: 'συμφώνησα',     future: 'θα συμφωνήσω',    pastCont: 'συμφωνούσα',    futureCont: 'θα συμφωνώ',     class: 'B2',  family: '-ώ / -ησα (B2 contract)' },
  { set: 3, english: 'disagree',        present: 'διαφωνώ',     past: 'διαφώνησα',     future: 'θα διαφωνήσω',    pastCont: 'διαφωνούσα',    futureCont: 'θα διαφωνώ',     class: 'B2',  family: '-ώ / -ησα (B2 contract)' },
  { set: 3, english: 'hope',            present: 'ελπίζω',      past: 'ήλπισα',        future: 'θα ελπίσω',       pastCont: 'έλπιζα',        futureCont: 'θα ελπίζω',      class: 'A',   family: '-ω / -σα (A regular)' },
  { set: 3, english: 'worry',           present: 'ανησυχώ',     past: 'ανησύχησα',     future: 'θα ανησυχήσω',    pastCont: 'ανησυχούσα',    futureCont: 'θα ανησυχώ',     class: 'B2',  family: '-ώ / -ησα (B2 contract)' },
  { set: 3, english: 'relax',           present: 'χαλαρώνω',    past: 'χαλάρωσα',      future: 'θα χαλαρώσω',     pastCont: 'χαλάρωνα',      futureCont: 'θα χαλαρώνω',    class: 'A',   family: '-ω / -σα (A regular)' },
  { set: 3, english: 'rest',            present: 'ξεκουράζομαι', past: 'ξεκουράστηκα', future: 'θα ξεκουραστώ',   pastCont: 'ξεκουραζόμουν', futureCont: 'θα ξεκουράζομαι', class: 'MP', family: '-ομαι / -θηκα (mediopassive)' },
  { set: 3, english: 'travel',          present: 'ταξιδεύω',    past: 'ταξίδεψα',      future: 'θα ταξιδέψω',     pastCont: 'ταξίδευα',      futureCont: 'θα ταξιδεύω',    class: 'A',   family: '-ω / -σα (A regular)' },
  { set: 3, english: 'return',          present: 'επιστρέφω',   past: 'επέστρεψα',     future: 'θα επιστρέψω',    pastCont: 'επέστρεφα',     futureCont: 'θα επιστρέφω',   class: 'A',   family: '-ω / -σα (A regular)' },
  { set: 3, english: 'change',          present: 'αλλάζω',      past: 'άλλαξα',        future: 'θα αλλάξω',       pastCont: 'άλλαζα',        futureCont: 'θα αλλάζω',      class: 'A',   family: '-ω / -σα (A regular)' },
  { set: 3, english: 'continue',        present: 'συνεχίζω',    past: 'συνέχισα',      future: 'θα συνεχίσω',     pastCont: 'συνέχιζα',      futureCont: 'θα συνεχίζω',    class: 'A',   family: '-ω / -σα (A regular)' },
  { set: 3, english: 'stop',            present: 'σταματάω',    past: 'σταμάτησα',     future: 'θα σταματήσω',    pastCont: 'σταματούσα',    futureCont: 'θα σταματάω',    class: 'B1',  family: '-άω / -ησα (B1 contract)' },
  { set: 3, english: 'arrive',          present: 'φτάνω',       past: 'έφτασα',        future: 'θα φτάσω',        pastCont: 'έφτανα',        futureCont: 'θα φτάνω',       class: 'A',   family: '-ω / -σα (A regular)' },

  // --- Set 4: Type A/B — vowel-stem verbs with -γ- in the imperfect (textbook "Τύπος Α/Β") ---
  // Present looks Class-A-ish but contracts (ακούω, ακούς, ακούει…); the παρατατικός inserts -γ- (άκουγα).
  { set: 4, english: 'hear / listen',   present: 'ακούω',       past: 'άκουσα',        future: 'θα ακούσω',       pastCont: 'άκουγα',        futureCont: 'θα ακούω',       class: 'AB',  family: '-γ- vowel stems (Type A/B)' },
  { set: 4, english: 'burn',            present: 'καίω',        past: 'έκαψα',         future: 'θα κάψω',         pastCont: 'έκαιγα',        futureCont: 'θα καίω',        class: 'AB',  family: '-γ- vowel stems (Type A/B)' },
  { set: 4, english: 'cry',             present: 'κλαίω',       past: 'έκλαψα',        future: 'θα κλάψω',        pastCont: 'έκλαιγα',       futureCont: 'θα κλαίω',       class: 'AB',  family: '-γ- vowel stems (Type A/B)' },
  { set: 4, english: 'be at fault',     present: 'φταίω',       past: 'έφταιξα',       future: 'θα φταίξω',       pastCont: 'έφταιγα',       futureCont: 'θα φταίω',       class: 'AB',  family: '-γ- vowel stems (Type A/B)' },
  { set: 4, english: 'exist',           present: 'υπάρχω',      past: 'υπήρξα',        future: 'θα υπάρξω',       pastCont: 'υπήρχα',        futureCont: 'θα υπάρχω',      class: 'A',   classNote: 'irregular augment: the past forms take η- not ε- (imperfect υπήρχα, aorist υπήρξα). Listed in the textbook alongside the irregular imperfects θέλω→ήθελα and ξέρω→ήξερα.' }
];

// Conjugation overrides keyed by verb.english. Order: [1sg, 2sg, 3sg, 1pl, 2pl, 3pl].
// If an override is present, it wins over the computed class-based conjugation.
window.CONJUGATIONS = {
  // --- Type A/B vowel stems: -γ- in the imperfect ---
  'hear / listen': {
    present:   ['ακούω','ακούς','ακούει','ακούμε','ακούτε','ακούν'],
    past:      ['άκουσα','άκουσες','άκουσε','ακούσαμε','ακούσατε','άκουσαν'],
    pastCont:  ['άκουγα','άκουγες','άκουγε','ακούγαμε','ακούγατε','άκουγαν'],
    future:    ['θα ακούσω','θα ακούσεις','θα ακούσει','θα ακούσουμε','θα ακούσετε','θα ακούσουν'],
    futureCont:['θα ακούω','θα ακούς','θα ακούει','θα ακούμε','θα ακούτε','θα ακούν']
  },
  'burn': {
    present:   ['καίω','καις','καίει','καίμε','καίτε','καίνε'],
    past:      ['έκαψα','έκαψες','έκαψε','κάψαμε','κάψατε','έκαψαν'],
    pastCont:  ['έκαιγα','έκαιγες','έκαιγε','καίγαμε','καίγατε','έκαιγαν'],
    future:    ['θα κάψω','θα κάψεις','θα κάψει','θα κάψουμε','θα κάψετε','θα κάψουν'],
    futureCont:['θα καίω','θα καις','θα καίει','θα καίμε','θα καίτε','θα καίνε']
  },
  'cry': {
    present:   ['κλαίω','κλαις','κλαίει','κλαίμε','κλαίτε','κλαίνε'],
    past:      ['έκλαψα','έκλαψες','έκλαψε','κλάψαμε','κλάψατε','έκλαψαν'],
    pastCont:  ['έκλαιγα','έκλαιγες','έκλαιγε','κλαίγαμε','κλαίγατε','έκλαιγαν'],
    future:    ['θα κλάψω','θα κλάψεις','θα κλάψει','θα κλάψουμε','θα κλάψετε','θα κλάψουν'],
    futureCont:['θα κλαίω','θα κλαις','θα κλαίει','θα κλαίμε','θα κλαίτε','θα κλαίνε']
  },
  'be at fault': {
    present:   ['φταίω','φταις','φταίει','φταίμε','φταίτε','φταίνε'],
    past:      ['έφταιξα','έφταιξες','έφταιξε','φταίξαμε','φταίξατε','έφταιξαν'],
    pastCont:  ['έφταιγα','έφταιγες','έφταιγε','φταίγαμε','φταίγατε','έφταιγαν'],
    future:    ['θα φταίξω','θα φταίξεις','θα φταίξει','θα φταίξουμε','θα φταίξετε','θα φταίξουν'],
    futureCont:['θα φταίω','θα φταις','θα φταίει','θα φταίμε','θα φταίτε','θα φταίνε']
  },
  'exist': {
    present:   ['υπάρχω','υπάρχεις','υπάρχει','υπάρχουμε','υπάρχετε','υπάρχουν'],
    past:      ['υπήρξα','υπήρξες','υπήρξε','υπήρξαμε','υπήρξατε','υπήρξαν'],
    pastCont:  ['υπήρχα','υπήρχες','υπήρχε','υπήρχαμε','υπήρχατε','υπήρχαν'],
    future:    ['θα υπάρξω','θα υπάρξεις','θα υπάρξει','θα υπάρξουμε','θα υπάρξετε','θα υπάρξουν'],
    futureCont:['θα υπάρχω','θα υπάρχεις','θα υπάρχει','θα υπάρχουμε','θα υπάρχετε','θα υπάρχουν']
  },
  'be': {
    present:   ['είμαι','είσαι','είναι','είμαστε','είστε','είναι'],
    past:      ['ήμουν','ήσουν','ήταν','ήμασταν','ήσασταν','ήταν'],
    pastCont:  ['ήμουν','ήσουν','ήταν','ήμασταν','ήσασταν','ήταν'],
    future:    ['θα είμαι','θα είσαι','θα είναι','θα είμαστε','θα είστε','θα είναι'],
    futureCont:['θα είμαι','θα είσαι','θα είναι','θα είμαστε','θα είστε','θα είναι']
  },
  'have': {
    present:   ['έχω','έχεις','έχει','έχουμε','έχετε','έχουν'],
    past:      ['είχα','είχες','είχε','είχαμε','είχατε','είχαν'],
    pastCont:  ['είχα','είχες','είχε','είχαμε','είχατε','είχαν'],
    future:    ['θα έχω','θα έχεις','θα έχει','θα έχουμε','θα έχετε','θα έχουν'],
    futureCont:['θα έχω','θα έχεις','θα έχει','θα έχουμε','θα έχετε','θα έχουν']
  },
  'do / make': {
    present:   ['κάνω','κάνεις','κάνει','κάνουμε','κάνετε','κάνουν'],
    past:      ['έκανα','έκανες','έκανε','κάναμε','κάνατε','έκαναν'],
    pastCont:  ['έκανα','έκανες','έκανε','κάναμε','κάνατε','έκαναν'],
    future:    ['θα κάνω','θα κάνεις','θα κάνει','θα κάνουμε','θα κάνετε','θα κάνουν'],
    futureCont:['θα κάνω','θα κάνεις','θα κάνει','θα κάνουμε','θα κάνετε','θα κάνουν']
  },
  'take': {
    present:   ['παίρνω','παίρνεις','παίρνει','παίρνουμε','παίρνετε','παίρνουν'],
    past:      ['πήρα','πήρες','πήρε','πήραμε','πήρατε','πήραν'],
    pastCont:  ['έπαιρνα','έπαιρνες','έπαιρνε','παίρναμε','παίρνατε','έπαιρναν'],
    future:    ['θα πάρω','θα πάρεις','θα πάρει','θα πάρουμε','θα πάρετε','θα πάρουν'],
    futureCont:['θα παίρνω','θα παίρνεις','θα παίρνει','θα παίρνουμε','θα παίρνετε','θα παίρνουν']
  },
  'give': {
    present:   ['δίνω','δίνεις','δίνει','δίνουμε','δίνετε','δίνουν'],
    past:      ['έδωσα','έδωσες','έδωσε','δώσαμε','δώσατε','έδωσαν'],
    pastCont:  ['έδινα','έδινες','έδινε','δίναμε','δίνατε','έδιναν'],
    future:    ['θα δώσω','θα δώσεις','θα δώσει','θα δώσουμε','θα δώσετε','θα δώσουν'],
    futureCont:['θα δίνω','θα δίνεις','θα δίνει','θα δίνουμε','θα δίνετε','θα δίνουν']
  },
  'say / tell': {
    present:   ['λέω','λες','λέει','λέμε','λέτε','λένε'],
    past:      ['είπα','είπες','είπε','είπαμε','είπατε','είπαν'],
    pastCont:  ['έλεγα','έλεγες','έλεγε','λέγαμε','λέγατε','έλεγαν'],
    future:    ['θα πω','θα πεις','θα πει','θα πούμε','θα πείτε','θα πουν'],
    futureCont:['θα λέω','θα λες','θα λέει','θα λέμε','θα λέτε','θα λένε']
  },
  'see': {
    present:   ['βλέπω','βλέπεις','βλέπει','βλέπουμε','βλέπετε','βλέπουν'],
    past:      ['είδα','είδες','είδε','είδαμε','είδατε','είδαν'],
    pastCont:  ['έβλεπα','έβλεπες','έβλεπε','βλέπαμε','βλέπατε','έβλεπαν'],
    future:    ['θα δω','θα δεις','θα δει','θα δούμε','θα δείτε','θα δουν'],
    futureCont:['θα βλέπω','θα βλέπεις','θα βλέπει','θα βλέπουμε','θα βλέπετε','θα βλέπουν']
  },
  'find': {
    present:   ['βρίσκω','βρίσκεις','βρίσκει','βρίσκουμε','βρίσκετε','βρίσκουν'],
    past:      ['βρήκα','βρήκες','βρήκε','βρήκαμε','βρήκατε','βρήκαν'],
    pastCont:  ['έβρισκα','έβρισκες','έβρισκε','βρίσκαμε','βρίσκατε','έβρισκαν'],
    future:    ['θα βρω','θα βρεις','θα βρει','θα βρούμε','θα βρείτε','θα βρουν'],
    futureCont:['θα βρίσκω','θα βρίσκεις','θα βρίσκει','θα βρίσκουμε','θα βρίσκετε','θα βρίσκουν']
  },
  'put': {
    present:   ['βάζω','βάζεις','βάζει','βάζουμε','βάζετε','βάζουν'],
    past:      ['έβαλα','έβαλες','έβαλε','βάλαμε','βάλατε','έβαλαν'],
    pastCont:  ['έβαζα','έβαζες','έβαζε','βάζαμε','βάζατε','έβαζαν'],
    future:    ['θα βάλω','θα βάλεις','θα βάλει','θα βάλουμε','θα βάλετε','θα βάλουν'],
    futureCont:['θα βάζω','θα βάζεις','θα βάζει','θα βάζουμε','θα βάζετε','θα βάζουν']
  },
  'leave': {
    present:   ['αφήνω','αφήνεις','αφήνει','αφήνουμε','αφήνετε','αφήνουν'],
    past:      ['άφησα','άφησες','άφησε','αφήσαμε','αφήσατε','άφησαν'],
    pastCont:  ['άφηνα','άφηνες','άφηνε','αφήναμε','αφήνατε','άφηναν'],
    future:    ['θα αφήσω','θα αφήσεις','θα αφήσει','θα αφήσουμε','θα αφήσετε','θα αφήσουν'],
    futureCont:['θα αφήνω','θα αφήνεις','θα αφήνει','θα αφήνουμε','θα αφήνετε','θα αφήνουν']
  },
  'go': {
    present:   ['πάω','πας','πάει','πάμε','πάτε','πάνε'],
    past:      ['πήγα','πήγες','πήγε','πήγαμε','πήγατε','πήγαν'],
    pastCont:  ['πήγαινα','πήγαινες','πήγαινε','πηγαίναμε','πηγαίνατε','πήγαιναν'],
    future:    ['θα πάω','θα πας','θα πάει','θα πάμε','θα πάτε','θα πάνε'],
    futureCont:['θα πηγαίνω','θα πηγαίνεις','θα πηγαίνει','θα πηγαίνουμε','θα πηγαίνετε','θα πηγαίνουν']
  },
  'come': {
    present:   ['έρχομαι','έρχεσαι','έρχεται','ερχόμαστε','έρχεστε','έρχονται'],
    past:      ['ήρθα','ήρθες','ήρθε','ήρθαμε','ήρθατε','ήρθαν'],
    pastCont:  ['ερχόμουν','ερχόσουν','ερχόταν','ερχόμασταν','ερχόσασταν','έρχονταν'],
    future:    ['θα έρθω','θα έρθεις','θα έρθει','θα έρθουμε','θα έρθετε','θα έρθουν'],
    futureCont:['θα έρχομαι','θα έρχεσαι','θα έρχεται','θα ερχόμαστε','θα έρχεστε','θα έρχονται']
  },
  'eat': {
    present:   ['τρώω','τρως','τρώει','τρώμε','τρώτε','τρώνε'],
    past:      ['έφαγα','έφαγες','έφαγε','φάγαμε','φάγατε','έφαγαν'],
    pastCont:  ['έτρωγα','έτρωγες','έτρωγε','τρώγαμε','τρώγατε','έτρωγαν'],
    future:    ['θα φάω','θα φας','θα φάει','θα φάμε','θα φάτε','θα φάνε'],
    futureCont:['θα τρώω','θα τρως','θα τρώει','θα τρώμε','θα τρώτε','θα τρώνε']
  },
  'drink': {
    present:   ['πίνω','πίνεις','πίνει','πίνουμε','πίνετε','πίνουν'],
    past:      ['ήπια','ήπιες','ήπιε','ήπιαμε','ήπιατε','ήπιαν'],
    pastCont:  ['έπινα','έπινες','έπινε','πίναμε','πίνατε','έπιναν'],
    future:    ['θα πιω','θα πιεις','θα πιει','θα πιούμε','θα πιείτε','θα πιουν'],
    futureCont:['θα πίνω','θα πίνεις','θα πίνει','θα πίνουμε','θα πίνετε','θα πίνουν']
  },
  'enter': {
    present:   ['μπαίνω','μπαίνεις','μπαίνει','μπαίνουμε','μπαίνετε','μπαίνουν'],
    past:      ['μπήκα','μπήκες','μπήκε','μπήκαμε','μπήκατε','μπήκαν'],
    pastCont:  ['έμπαινα','έμπαινες','έμπαινε','μπαίναμε','μπαίνατε','έμπαιναν'],
    future:    ['θα μπω','θα μπεις','θα μπει','θα μπούμε','θα μπείτε','θα μπουν'],
    futureCont:['θα μπαίνω','θα μπαίνεις','θα μπαίνει','θα μπαίνουμε','θα μπαίνετε','θα μπαίνουν']
  },
  'go out': {
    present:   ['βγαίνω','βγαίνεις','βγαίνει','βγαίνουμε','βγαίνετε','βγαίνουν'],
    past:      ['βγήκα','βγήκες','βγήκε','βγήκαμε','βγήκατε','βγήκαν'],
    pastCont:  ['έβγαινα','έβγαινες','έβγαινε','βγαίναμε','βγαίνατε','έβγαιναν'],
    future:    ['θα βγω','θα βγεις','θα βγει','θα βγούμε','θα βγείτε','θα βγουν'],
    futureCont:['θα βγαίνω','θα βγαίνεις','θα βγαίνει','θα βγαίνουμε','θα βγαίνετε','θα βγαίνουν']
  },
  'stay / remain': {
    present:   ['μένω','μένεις','μένει','μένουμε','μένετε','μένουν'],
    past:      ['έμεινα','έμεινες','έμεινε','μείναμε','μείνατε','έμειναν'],
    pastCont:  ['έμενα','έμενες','έμενε','μέναμε','μένατε','έμεναν'],
    future:    ['θα μείνω','θα μείνεις','θα μείνει','θα μείνουμε','θα μείνετε','θα μείνουν'],
    futureCont:['θα μένω','θα μένεις','θα μένει','θα μένουμε','θα μένετε','θα μένουν']
  },
  'leave / depart': {
    present:   ['φεύγω','φεύγεις','φεύγει','φεύγουμε','φεύγετε','φεύγουν'],
    past:      ['έφυγα','έφυγες','έφυγε','φύγαμε','φύγατε','έφυγαν'],
    pastCont:  ['έφευγα','έφευγες','έφευγε','φεύγαμε','φεύγατε','έφευγαν'],
    future:    ['θα φύγω','θα φύγεις','θα φύγει','θα φύγουμε','θα φύγετε','θα φύγουν'],
    futureCont:['θα φεύγω','θα φεύγεις','θα φεύγει','θα φεύγουμε','θα φεύγετε','θα φεύγουν']
  },
  'bring': {
    present:   ['φέρνω','φέρνεις','φέρνει','φέρνουμε','φέρνετε','φέρνουν'],
    past:      ['έφερα','έφερες','έφερε','φέραμε','φέρατε','έφεραν'],
    pastCont:  ['έφερνα','έφερνες','έφερνε','φέρναμε','φέρνατε','έφερναν'],
    future:    ['θα φέρω','θα φέρεις','θα φέρει','θα φέρουμε','θα φέρετε','θα φέρουν'],
    futureCont:['θα φέρνω','θα φέρνεις','θα φέρνει','θα φέρνουμε','θα φέρνετε','θα φέρνουν']
  },
  'learn': {
    present:   ['μαθαίνω','μαθαίνεις','μαθαίνει','μαθαίνουμε','μαθαίνετε','μαθαίνουν'],
    past:      ['έμαθα','έμαθες','έμαθε','μάθαμε','μάθατε','έμαθαν'],
    pastCont:  ['μάθαινα','μάθαινες','μάθαινε','μαθαίναμε','μαθαίνατε','μάθαιναν'],
    future:    ['θα μάθω','θα μάθεις','θα μάθει','θα μάθουμε','θα μάθετε','θα μάθουν'],
    futureCont:['θα μαθαίνω','θα μαθαίνεις','θα μαθαίνει','θα μαθαίνουμε','θα μαθαίνετε','θα μαθαίνουν']
  },
  'know': {
    present:   ['ξέρω','ξέρεις','ξέρει','ξέρουμε','ξέρετε','ξέρουν'],
    past:      ['ήξερα','ήξερες','ήξερε','ξέραμε','ξέρατε','ήξεραν'],
    pastCont:  ['ήξερα','ήξερες','ήξερε','ξέραμε','ξέρατε','ήξεραν'],
    future:    ['θα ξέρω','θα ξέρεις','θα ξέρει','θα ξέρουμε','θα ξέρετε','θα ξέρουν'],
    futureCont:['θα ξέρω','θα ξέρεις','θα ξέρει','θα ξέρουμε','θα ξέρετε','θα ξέρουν']
  },
  'can': {
    present:   ['μπορώ','μπορείς','μπορεί','μπορούμε','μπορείτε','μπορούν'],
    past:      ['μπόρεσα','μπόρεσες','μπόρεσε','μπορέσαμε','μπορέσατε','μπόρεσαν'],
    pastCont:  ['μπορούσα','μπορούσες','μπορούσε','μπορούσαμε','μπορούσατε','μπορούσαν'],
    future:    ['θα μπορέσω','θα μπορέσεις','θα μπορέσει','θα μπορέσουμε','θα μπορέσετε','θα μπορέσουν'],
    futureCont:['θα μπορώ','θα μπορείς','θα μπορεί','θα μπορούμε','θα μπορείτε','θα μπορούν']
  },
  'want': {
    present:   ['θέλω','θέλεις','θέλει','θέλουμε','θέλετε','θέλουν'],
    past:      ['ήθελα','ήθελες','ήθελε','θέλαμε','θέλατε','ήθελαν'],
    pastCont:  ['ήθελα','ήθελες','ήθελε','θέλαμε','θέλατε','ήθελαν'],
    future:    ['θα θέλω','θα θέλεις','θα θέλει','θα θέλουμε','θα θέλετε','θα θέλουν'],
    futureCont:['θα θέλω','θα θέλεις','θα θέλει','θα θέλουμε','θα θέλετε','θα θέλουν']
  },
  'understand': {
    present:   ['καταλαβαίνω','καταλαβαίνεις','καταλαβαίνει','καταλαβαίνουμε','καταλαβαίνετε','καταλαβαίνουν'],
    past:      ['κατάλαβα','κατάλαβες','κατάλαβε','καταλάβαμε','καταλάβατε','κατάλαβαν'],
    pastCont:  ['καταλάβαινα','καταλάβαινες','καταλάβαινε','καταλαβαίναμε','καταλαβαίνατε','καταλάβαιναν'],
    future:    ['θα καταλάβω','θα καταλάβεις','θα καταλάβει','θα καταλάβουμε','θα καταλάβετε','θα καταλάβουν'],
    futureCont:['θα καταλαβαίνω','θα καταλαβαίνεις','θα καταλαβαίνει','θα καταλαβαίνουμε','θα καταλαβαίνετε','θα καταλαβαίνουν']
  },
  'remember': {
    present:   ['θυμάμαι','θυμάσαι','θυμάται','θυμόμαστε','θυμάστε','θυμούνται'],
    past:      ['θυμήθηκα','θυμήθηκες','θυμήθηκε','θυμηθήκαμε','θυμηθήκατε','θυμήθηκαν'],
    pastCont:  ['θυμόμουν','θυμόσουν','θυμόταν','θυμόμασταν','θυμόσασταν','θυμούνταν'],
    future:    ['θα θυμηθώ','θα θυμηθείς','θα θυμηθεί','θα θυμηθούμε','θα θυμηθείτε','θα θυμηθούν'],
    futureCont:['θα θυμάμαι','θα θυμάσαι','θα θυμάται','θα θυμόμαστε','θα θυμάστε','θα θυμούνται']
  },
  'become': {
    present:   ['γίνομαι','γίνεσαι','γίνεται','γινόμαστε','γίνεστε','γίνονται'],
    past:      ['έγινα','έγινες','έγινε','γίναμε','γίνατε','έγιναν'],
    pastCont:  ['γινόμουν','γινόσουν','γινόταν','γινόμασταν','γινόσασταν','γίνονταν'],
    future:    ['θα γίνω','θα γίνεις','θα γίνει','θα γίνουμε','θα γίνετε','θα γίνουν'],
    futureCont:['θα γίνομαι','θα γίνεσαι','θα γίνεται','θα γινόμαστε','θα γίνεστε','θα γίνονται']
  },
  'think': {
    present:   ['σκέφτομαι','σκέφτεσαι','σκέφτεται','σκεφτόμαστε','σκέφτεστε','σκέφτονται'],
    past:      ['σκέφτηκα','σκέφτηκες','σκέφτηκε','σκεφτήκαμε','σκεφτήκατε','σκέφτηκαν'],
    pastCont:  ['σκεφτόμουν','σκεφτόσουν','σκεφτόταν','σκεφτόμασταν','σκεφτόσασταν','σκέφτονταν'],
    future:    ['θα σκεφτώ','θα σκεφτείς','θα σκεφτεί','θα σκεφτούμε','θα σκεφτείτε','θα σκεφτούν'],
    futureCont:['θα σκέφτομαι','θα σκέφτεσαι','θα σκέφτεται','θα σκεφτόμαστε','θα σκέφτεστε','θα σκέφτονται']
  },
  'rest': {
    present:   ['ξεκουράζομαι','ξεκουράζεσαι','ξεκουράζεται','ξεκουραζόμαστε','ξεκουράζεστε','ξεκουράζονται'],
    past:      ['ξεκουράστηκα','ξεκουράστηκες','ξεκουράστηκε','ξεκουραστήκαμε','ξεκουραστήκατε','ξεκουράστηκαν'],
    pastCont:  ['ξεκουραζόμουν','ξεκουραζόσουν','ξεκουραζόταν','ξεκουραζόμασταν','ξεκουραζόσασταν','ξεκουράζονταν'],
    future:    ['θα ξεκουραστώ','θα ξεκουραστείς','θα ξεκουραστεί','θα ξεκουραστούμε','θα ξεκουραστείτε','θα ξεκουραστούν'],
    futureCont:['θα ξεκουράζομαι','θα ξεκουράζεσαι','θα ξεκουράζεται','θα ξεκουραζόμαστε','θα ξεκουράζεστε','θα ξεκουράζονται']
  },
  'wait': {
    present:   ['περιμένω','περιμένεις','περιμένει','περιμένουμε','περιμένετε','περιμένουν'],
    past:      ['περίμενα','περίμενες','περίμενε','περιμέναμε','περιμένατε','περίμεναν'],
    pastCont:  ['περίμενα','περίμενες','περίμενε','περιμέναμε','περιμένατε','περίμεναν'],
    future:    ['θα περιμένω','θα περιμένεις','θα περιμένει','θα περιμένουμε','θα περιμένετε','θα περιμένουν'],
    futureCont:['θα περιμένω','θα περιμένεις','θα περιμένει','θα περιμένουμε','θα περιμένετε','θα περιμένουν']
  },
  'like (be pleasing)': {
    present:   ['αρέσω','αρέσεις','αρέσει','αρέσουμε','αρέσετε','αρέσουν'],
    past:      ['άρεσα','άρεσες','άρεσε','αρέσαμε','αρέσατε','άρεσαν'],
    pastCont:  ['άρεσα','άρεσες','άρεσε','αρέσαμε','αρέσατε','άρεσαν'],
    future:    ['θα αρέσω','θα αρέσεις','θα αρέσει','θα αρέσουμε','θα αρέσετε','θα αρέσουν'],
    futureCont:['θα αρέσω','θα αρέσεις','θα αρέσει','θα αρέσουμε','θα αρέσετε','θα αρέσουν']
  }
};

// Example sentences, always in 1sg for each tense. Add more as you like.
window.EXAMPLES = {
  'hear / listen':   { present:['Ακούω μουσική κάθε βράδυ.','I listen to music every evening.'], past:['Άκουσα έναν θόρυβο.','I heard a noise.'], pastCont:['Άκουγα ραδιόφωνο όταν χτύπησε το τηλέφωνο.','I was listening to the radio when the phone rang.'], future:['Θα ακούσω το νέο τραγούδι.','I will listen to the new song.'], futureCont:['Θα ακούω podcast στο ταξίδι.','I will be listening to podcasts on the trip.'] },
  'burn':            { present:['Το τζάκι καίει όλη μέρα.','The fireplace burns all day.'], past:['Έκαψα το φαγητό.','I burned the food.'], pastCont:['Το κερί έκαιγε στο τραπέζι.','The candle was burning on the table.'], future:['Θα κάψω τα παλιά γράμματα.','I will burn the old letters.'], futureCont:['Θα καίω ξύλα όλον τον χειμώνα.','I will be burning wood all winter.'] },
  'cry':             { present:['Το μωρό κλαίει πάλι.','The baby is crying again.'], past:['Έκλαψα στην ταινία.','I cried during the film.'], pastCont:['Έκλαιγε όλο το βράδυ.','He was crying all night.'], future:['Θα κλάψω αν φύγεις.','I will cry if you leave.'], futureCont:['Μη μου πεις πως θα κλαις όλη μέρα.','Don\'t tell me you\'ll be crying all day.'] },
  'be at fault':     { present:['Εσύ φταις γι\' αυτό.','You are to blame for this.'], past:['Έφταιξα εγώ, το παραδέχομαι.','I was at fault, I admit it.'], pastCont:['Νόμιζε πως έφταιγε ο καιρός.','He thought the weather was to blame.'], future:['Αν χαλάσει, θα φταίξω εγώ.','If it breaks, I\'ll be the one at fault.'], futureCont:['Δεν θα φταίω εγώ για τα λάθη σου.','I won\'t be the one at fault for your mistakes.'] },
  'exist':           { present:['Υπάρχει ένα πρόβλημα.','There is a problem.'], past:['Υπήρξε μια παρεξήγηση.','There was a misunderstanding.'], pastCont:['Υπήρχε πάντα μια λύση.','There always was a solution.'], future:['Θα υπάρξει ευκαιρία αργότερα.','There will be an opportunity later.'], futureCont:['Θα υπάρχω για σένα πάντα.','I will always be there for you.'] },
  'be':              { present:['Είμαι κουρασμένος.','I am tired.'], past:['Ήμουν στο σπίτι.','I was at home.'], pastCont:['Ήμουν κουρασμένος όλη μέρα.','I was tired all day.'], future:['Θα είμαι εκεί στις οκτώ.','I will be there at eight.'], futureCont:['Θα είμαι στο γραφείο αύριο.','I will be at the office tomorrow.'] },
  'have':            { present:['Έχω ένα αυτοκίνητο.','I have a car.'], past:['Είχα πολλή δουλειά.','I had a lot of work.'], pastCont:['Είχα πονοκέφαλο όλη μέρα.','I had a headache all day.'], future:['Θα έχω χρόνο αύριο.','I will have time tomorrow.'], futureCont:['Θα έχω δουλειά όλη την εβδομάδα.','I will have work all week.'] },
  'do / make':       { present:['Κάνω γυμναστική κάθε πρωί.','I do exercise every morning.'], past:['Έκανα ένα λάθος.','I made a mistake.'], pastCont:['Έκανα δουλειές όλο το πρωί.','I was doing chores all morning.'], future:['Θα κάνω ένα διάλειμμα.','I will take a break.'], futureCont:['Θα κάνω μάθημα κάθε Τρίτη.','I will be having class every Tuesday.'] },
  'take':            { present:['Παίρνω το λεωφορείο κάθε πρωί.','I take the bus every morning.'], past:['Πήρα ένα καφέ.','I took (had) a coffee.'], pastCont:['Έπαιρνα το τρένο όταν ήμουν φοιτητής.','I used to take the train when I was a student.'], future:['Θα πάρω ταξί.','I will take a taxi.'], futureCont:['Θα παίρνω βιταμίνες κάθε μέρα.','I will be taking vitamins every day.'] },
  'give':            { present:['Δίνω ένα δώρο στον φίλο μου.','I give a gift to my friend.'], past:['Έδωσα την απάντηση.','I gave the answer.'], pastCont:['Έδινα μαθήματα πιάνου.','I used to give piano lessons.'], future:['Θα δώσω τα κλειδιά.','I will give the keys.'], futureCont:['Θα δίνω εξετάσεις όλη την εβδομάδα.','I will be taking exams all week.'] },
  'say / tell':      { present:['Λέω την αλήθεια.','I tell the truth.'], past:['Είπα ένα αστείο.','I told a joke.'], pastCont:['Έλεγα πάντα το ίδιο.','I always used to say the same thing.'], future:['Θα πω την αλήθεια.','I will tell the truth.'], futureCont:['Θα λέω ό,τι θέλω.','I will be saying whatever I want.'] },
  'see':             { present:['Βλέπω τηλεόραση.','I watch TV.'], past:['Είδα μια καλή ταινία.','I saw a good movie.'], pastCont:['Έβλεπα τα παιδιά να παίζουν.','I was watching the kids play.'], future:['Θα δω τους φίλους μου αύριο.','I will see my friends tomorrow.'], futureCont:['Θα βλέπω τον αγώνα στις εννιά.','I will be watching the game at nine.'] },
  'find':            { present:['Βρίσκω ενδιαφέρουσες ιδέες.','I find interesting ideas.'], past:['Βρήκα τα κλειδιά μου.','I found my keys.'], pastCont:['Έβρισκα πάντα δουλειά εύκολα.','I always used to find work easily.'], future:['Θα βρω μια λύση.','I will find a solution.'], futureCont:['Θα βρίσκω πάντα χρόνο για εσένα.','I will always make time for you.'] },
  'put':             { present:['Βάζω τα ρούχα στην ντουλάπα.','I put the clothes in the wardrobe.'], past:['Έβαλα αλάτι στο φαγητό.','I put salt in the food.'], pastCont:['Έβαζα πάντα μουσική το πρωί.','I used to put on music in the morning.'], future:['Θα βάλω ένα παλτό.','I will put on a coat.'], futureCont:['Θα βάζω χρήματα στην άκρη.','I will be putting money aside.'] },
  'leave':           { present:['Αφήνω τα παπούτσια στην πόρτα.','I leave the shoes at the door.'], past:['Άφησα το κινητό στο σπίτι.','I left my phone at home.'], pastCont:['Άφηνα πάντα ένα σημείωμα.','I always used to leave a note.'], future:['Θα αφήσω ένα μήνυμα.','I will leave a message.'], futureCont:['Θα αφήνω τα κλειδιά στον γείτονα.','I will be leaving the keys with the neighbour.'] },
  'go':              { present:['Πάω στη δουλειά.','I go to work.'], past:['Πήγα στο πάρτι.','I went to the party.'], pastCont:['Πήγαινα στο σχολείο με τα πόδια.','I used to walk to school.'], future:['Θα πάω διακοπές.','I will go on vacation.'], futureCont:['Θα πηγαίνω γυμναστήριο κάθε μέρα.','I will be going to the gym every day.'] },
  'come':            { present:['Έρχομαι στο πάρτι.','I am coming to the party.'], past:['Ήρθα νωρίς.','I came early.'], pastCont:['Ερχόμουν κάθε Κυριακή.','I used to come every Sunday.'], future:['Θα έρθω στις επτά.','I will come at seven.'], futureCont:['Θα έρχομαι κάθε Σάββατο.','I will be coming every Saturday.'] },
  'eat':             { present:['Τρώω πρωινό.','I eat breakfast.'], past:['Έφαγα μια σαλάτα.','I ate a salad.'], pastCont:['Έτρωγα συνέχεια γλυκά.','I used to eat sweets constantly.'], future:['Θα φάω σπίτι απόψε.','I will eat at home tonight.'], futureCont:['Θα τρώω πιο υγιεινά.','I will be eating more healthily.'] },
  'drink':           { present:['Πίνω καφέ κάθε πρωί.','I drink coffee every morning.'], past:['Ήπια ένα ποτήρι νερό.','I drank a glass of water.'], pastCont:['Έπινα πολύ καφέ στη δουλειά.','I used to drink a lot of coffee at work.'], future:['Θα πιω μια μπίρα.','I will have a beer.'], futureCont:['Θα πίνω λιγότερο αλκοόλ.','I will be drinking less alcohol.'] },
  'enter':           { present:['Μπαίνω στο σπίτι.','I enter the house.'], past:['Μπήκα στο γραφείο.','I entered the office.'], pastCont:['Έμπαινα κάθε μέρα από αυτή την πόρτα.','I used to come in through that door every day.'], future:['Θα μπω μέσα σε λίγο.','I will go in in a moment.'], futureCont:['Θα μπαίνω πιο συχνά.','I will be coming in more often.'] },
  'go out':          { present:['Βγαίνω με τους φίλους μου.','I go out with my friends.'], past:['Βγήκα χθες βράδυ.','I went out last night.'], pastCont:['Έβγαινα κάθε Παρασκευή.','I used to go out every Friday.'], future:['Θα βγω για φαγητό.','I will go out for food.'], futureCont:['Θα βγαίνω πιο συχνά.','I will be going out more often.'] },
  'stay / remain':   { present:['Μένω στο κέντρο.','I live in the city centre.'], past:['Έμεινα στο σπίτι όλη μέρα.','I stayed home all day.'], pastCont:['Έμενα στην Αθήνα τότε.','I was living in Athens then.'], future:['Θα μείνω μια ακόμα ώρα.','I will stay one more hour.'], futureCont:['Θα μένω εδώ για έναν χρόνο.','I will be staying here for a year.'] },
  'leave / depart':  { present:['Φεύγω σε μια ώρα.','I leave in an hour.'], past:['Έφυγα στις οκτώ.','I left at eight.'], pastCont:['Έφευγα πάντα νωρίς.','I always used to leave early.'], future:['Θα φύγω αύριο το πρωί.','I will leave tomorrow morning.'], futureCont:['Θα φεύγω κάθε Παρασκευή.','I will be leaving every Friday.'] },
  'bring':           { present:['Φέρνω φαγητό.','I bring food.'], past:['Έφερα κρασί.','I brought wine.'], pastCont:['Έφερνα πάντα δώρα.','I always used to bring gifts.'], future:['Θα φέρω το βιβλίο αύριο.','I will bring the book tomorrow.'], futureCont:['Θα φέρνω φαγητό κάθε Τρίτη.','I will be bringing food every Tuesday.'] },
  'learn':           { present:['Μαθαίνω ελληνικά.','I am learning Greek.'], past:['Έμαθα κάτι καινούργιο.','I learned something new.'], pastCont:['Μάθαινα πιάνο ως παιδί.','I was learning piano as a child.'], future:['Θα μάθω τη γραμματική.','I will learn the grammar.'], futureCont:['Θα μαθαίνω καινούργιες λέξεις κάθε μέρα.','I will be learning new words every day.'] },
  'know':            { present:['Ξέρω την απάντηση.','I know the answer.'], past:['Ήξερα ότι θα ερχόσουν.','I knew you would come.'], pastCont:['Ήξερα τον δρόμο καλά.','I knew the road well.'], future:['Θα ξέρω τα αποτελέσματα αύριο.','I will know the results tomorrow.'], futureCont:['Θα ξέρω τι να κάνω.','I will know what to do.'] },
  'can':             { present:['Μπορώ να σε βοηθήσω.','I can help you.'], past:['Μπόρεσα να τελειώσω εγκαίρως.','I managed to finish on time.'], pastCont:['Μπορούσα να κολυμπήσω χιλιόμετρα.','I used to be able to swim for miles.'], future:['Θα μπορέσω να έρθω αύριο.','I will be able to come tomorrow.'], futureCont:['Θα μπορώ να βοηθώ πιο συχνά.','I will be able to help more often.'] },
  'speak':           { present:['Μιλάω ελληνικά.','I speak Greek.'], past:['Μίλησα με τον γιατρό.','I spoke with the doctor.'], pastCont:['Μιλούσα στο τηλέφωνο μια ώρα.','I was on the phone for an hour.'], future:['Θα μιλήσω με τον διευθυντή.','I will speak with the manager.'], futureCont:['Θα μιλάω ελληνικά με φίλους.','I will be speaking Greek with friends.'] },
  'read':            { present:['Διαβάζω εφημερίδα.','I read the newspaper.'], past:['Διάβασα ένα καλό βιβλίο.','I read a good book.'], pastCont:['Διάβαζα πριν κοιμηθώ.','I used to read before bed.'], future:['Θα διαβάσω το άρθρο αύριο.','I will read the article tomorrow.'], futureCont:['Θα διαβάζω περισσότερο φέτος.','I will be reading more this year.'] },
  'write':           { present:['Γράφω ένα γράμμα.','I write a letter.'], past:['Έγραψα δύο σελίδες.','I wrote two pages.'], pastCont:['Έγραφα ημερολόγιο.','I used to write a diary.'], future:['Θα γράψω το email το πρωί.','I will write the email in the morning.'], futureCont:['Θα γράφω μία ιστορία τον μήνα.','I will be writing one story a month.'] },
  'work':            { present:['Δουλεύω από το σπίτι.','I work from home.'], past:['Δούλεψα δέκα ώρες χθες.','I worked ten hours yesterday.'], pastCont:['Δούλευα σε εστιατόριο.','I used to work in a restaurant.'], future:['Θα δουλέψω όλο το Σαββατοκύριακο.','I will work all weekend.'], futureCont:['Θα δουλεύω νυχτερινή βάρδια.','I will be working the night shift.'] },
  'cook':            { present:['Μαγειρεύω κάθε βράδυ.','I cook every evening.'], past:['Μαγείρεψα παστίτσιο.','I cooked pastitsio.'], pastCont:['Μαγείρευα μαζί με τη μαμά μου.','I used to cook with my mom.'], future:['Θα μαγειρέψω σουβλάκια.','I will cook souvlaki.'], futureCont:['Θα μαγειρεύω κάθε Κυριακή.','I will be cooking every Sunday.'] },
  'open':            { present:['Ανοίγω το παράθυρο.','I open the window.'], past:['Άνοιξα την πόρτα.','I opened the door.'], pastCont:['Άνοιγα το μαγαζί στις επτά.','I used to open the shop at seven.'], future:['Θα ανοίξω το κρασί.','I will open the wine.'], futureCont:['Θα ανοίγω νωρίτερα από αύριο.','I will be opening earlier starting tomorrow.'] },
  'close':           { present:['Κλείνω το φως.','I turn off the light.'], past:['Έκλεισα τα παράθυρα.','I closed the windows.'], pastCont:['Έκλεινα πάντα με κλειδί.','I always used to lock up.'], future:['Θα κλείσω ραντεβού.','I will book an appointment.'], futureCont:['Θα κλείνω το γραφείο στις έξι.','I will be closing the office at six.'] },
  'wait':            { present:['Περιμένω το τρένο.','I am waiting for the train.'], past:['Περίμενα μία ώρα.','I waited an hour.'], pastCont:['Περίμενα εδώ και ώρα.','I had been waiting for hours.'], future:['Θα περιμένω στην είσοδο.','I will wait at the entrance.'], futureCont:['Θα περιμένω όσο χρειαστεί.','I will wait as long as needed.'] },
  'send':            { present:['Στέλνω ένα email.','I send an email.'], past:['Έστειλα το πακέτο.','I sent the package.'], pastCont:['Έστελνα γράμματα κάθε εβδομάδα.','I used to send letters every week.'], future:['Θα στείλω τη διεύθυνση.','I will send the address.'], futureCont:['Θα στέλνω φωτογραφίες από το ταξίδι.','I will be sending photos from the trip.'] },
  'wear':            { present:['Φοράω τζιν.','I wear jeans.'], past:['Φόρεσα ένα μαύρο φόρεμα.','I wore a black dress.'], pastCont:['Φορούσα πάντα μπότες.','I used to always wear boots.'], future:['Θα φορέσω κοστούμι.','I will wear a suit.'], futureCont:['Θα φοράω γυαλιά από τώρα.','I will be wearing glasses from now on.'] },
  'buy':             { present:['Αγοράζω ψωμί.','I buy bread.'], past:['Αγόρασα ένα καινούργιο κινητό.','I bought a new phone.'], pastCont:['Αγόραζα ρούχα κάθε μήνα.','I used to buy clothes every month.'], future:['Θα αγοράσω εισιτήρια.','I will buy tickets.'], futureCont:['Θα αγοράζω λιγότερα πράγματα.','I will be buying fewer things.'] },
  'ask':             { present:['Ρωτάω τον δάσκαλο.','I ask the teacher.'], past:['Ρώτησα την ώρα.','I asked the time.'], pastCont:['Ρωτούσα συνέχεια ερωτήσεις.','I kept asking questions.'], future:['Θα ρωτήσω αύριο.','I will ask tomorrow.'], futureCont:['Θα ρωτάω μέχρι να καταλάβω.','I will keep asking until I understand.'] },
  'answer':          { present:['Απαντάω στο τηλέφωνο.','I answer the phone.'], past:['Απάντησα στο μήνυμα.','I answered the message.'], pastCont:['Απαντούσα σε όλα τα emails.','I used to answer all the emails.'], future:['Θα απαντήσω σύντομα.','I will answer soon.'], futureCont:['Θα απαντάω πιο γρήγορα από τώρα.','I will be answering faster from now on.'] },
  'try':             { present:['Προσπαθώ να μάθω.','I am trying to learn.'], past:['Προσπάθησα πολύ.','I tried hard.'], pastCont:['Προσπαθούσα για ώρες.','I was trying for hours.'], future:['Θα προσπαθήσω ξανά.','I will try again.'], futureCont:['Θα προσπαθώ κάθε μέρα.','I will be trying every day.'] },
  'show':            { present:['Δείχνω τις φωτογραφίες.','I show the photos.'], past:['Έδειξα τον δρόμο.','I showed the way.'], pastCont:['Έδειχνα κουρασμένος.','I looked tired.'], future:['Θα δείξω την παρουσίαση.','I will show the presentation.'], futureCont:['Θα δείχνω περισσότερο ενδιαφέρον.','I will be showing more interest.'] },
  'run':             { present:['Τρέχω κάθε πρωί.','I run every morning.'], past:['Έτρεξα πέντε χιλιόμετρα.','I ran five kilometres.'], pastCont:['Έτρεχα στο γυμναστήριο.','I used to run at the gym.'], future:['Θα τρέξω αύριο.','I will run tomorrow.'], futureCont:['Θα τρέχω τρεις φορές την εβδομάδα.','I will be running three times a week.'] },
  'hold / keep':     { present:['Κρατάω το παιδί στην αγκαλιά.','I hold the child in my arms.'], past:['Κράτησα το ρέστο.','I kept the change.'], pastCont:['Κρατούσα πάντα σημειώσεις.','I always used to take notes.'], future:['Θα κρατήσω θέση για σένα.','I will save a seat for you.'], futureCont:['Θα κρατάω ένα ημερολόγιο.','I will be keeping a journal.'] },
  'choose':          { present:['Επιλέγω αυτό το εστιατόριο.','I choose this restaurant.'], past:['Επέλεξα το κόκκινο.','I chose the red one.'], pastCont:['Επέλεγα πάντα υπεύθυνα.','I used to always choose responsibly.'], future:['Θα επιλέξω αργότερα.','I will choose later.'], futureCont:['Θα επιλέγω πιο προσεκτικά.','I will be choosing more carefully.'] },
  'remember':        { present:['Θυμάμαι το όνομά της.','I remember her name.'], past:['Θυμήθηκα τη διεύθυνση.','I remembered the address.'], pastCont:['Θυμόμουν πάντα τα γενέθλιά του.','I always used to remember his birthday.'], future:['Θα θυμηθώ να σε πάρω.','I will remember to call you.'], futureCont:['Θα θυμάμαι αυτή τη μέρα.','I will be remembering this day.'] },
  'become':          { present:['Γίνομαι καλύτερος.','I am getting better.'], past:['Έγινα γιατρός.','I became a doctor.'], pastCont:['Γινόμουν ανυπόμονος.','I was becoming impatient.'], future:['Θα γίνω πατέρας.','I will become a father.'], futureCont:['Θα γίνομαι όλο και πιο δυνατός.','I will be becoming stronger and stronger.'] },
  'want':            { present:['Θέλω νερό.','I want water.'], past:['Ήθελα να σου μιλήσω.','I wanted to talk to you.'], pastCont:['Ήθελα πάντα να ταξιδέψω.','I always wanted to travel.'], future:['Θα θέλω βοήθεια αύριο.','I will want help tomorrow.'], futureCont:['Θα θέλω να ξέρω τι γίνεται.','I will want to know what is going on.'] },
  'understand':      { present:['Καταλαβαίνω ελληνικά.','I understand Greek.'], past:['Κατάλαβα την ερώτηση.','I understood the question.'], pastCont:['Καταλάβαινα κάτι από Ισπανικά.','I used to understand some Spanish.'], future:['Θα καταλάβω με την εξάσκηση.','I will understand with practice.'], futureCont:['Θα καταλαβαίνω όλο και πιο καλά.','I will be understanding better and better.'] },
  'think / believe': { present:['Νομίζω ότι έχεις δίκιο.','I think you are right.'], past:['Νόμισα ότι ήταν ο Γιώργος.','I thought it was George.'], pastCont:['Νόμιζα ότι ήταν αργά.','I thought it was late.'], future:['Θα νομίσω ότι ξέχασες.','I will think you forgot.'], futureCont:['Θα νομίζω πάντα το καλύτερο για σένα.','I will always be thinking the best of you.'] },
  'think':           { present:['Σκέφτομαι το μέλλον.','I am thinking about the future.'], past:['Σκέφτηκα μια ιδέα.','I thought of an idea.'], pastCont:['Σκεφτόμουν εσένα.','I was thinking about you.'], future:['Θα σκεφτώ την προσφορά.','I will think about the offer.'], futureCont:['Θα σκέφτομαι τι να κάνω.','I will be thinking about what to do.'] },
  'feel':            { present:['Νιώθω καλά.','I feel good.'], past:['Ένιωσα μια χαρά.','I felt a joy.'], pastCont:['Ένιωθα κουρασμένος όλη μέρα.','I was feeling tired all day.'], future:['Θα νιώσω καλύτερα αύριο.','I will feel better tomorrow.'], futureCont:['Θα νιώθω πιο ήρεμος μετά τις διακοπές.','I will be feeling calmer after the holidays.'] },
  'like (feel friendly)': { present:['Συμπαθώ τον καινούργιο συνάδελφο.','I like (feel friendly toward) the new colleague.'], past:['Συμπάθησα αμέσως την οικογένειά της.','I immediately warmed to her family.'], pastCont:['Συμπαθούσα πολύ τον δάσκαλό μας.','I used to really like our teacher.'], future:['Θα συμπαθήσω κι εσένα.','I will come to like you too.'], futureCont:['Θα συμπαθώ πάντα αυτούς τους ανθρώπους.','I will always have affection for these people.'] },
  'like (be pleasing)': { present:['Μου αρέσει η μουσική.','I like music (music is pleasing to me).'], past:['Μου άρεσε η ταινία.','I liked the movie.'], pastCont:['Μου άρεσε να διαβάζω.','I used to like reading.'], future:['Θα μου αρέσει αυτό το μέρος.','I will like this place.'], futureCont:['Θα μου αρέσει η νέα δουλειά.','I will be liking the new job.'] },
  'love':            { present:['Αγαπάω την οικογένειά μου.','I love my family.'], past:['Αγάπησα πολύ αυτή την πόλη.','I came to love this city.'], pastCont:['Αγαπούσα τα ζώα από μικρός.','I used to love animals from a young age.'], future:['Θα αγαπήσω τον τόπο.','I will come to love the place.'], futureCont:['Θα αγαπάω πάντα τη θάλασσα.','I will always love the sea.'] },
  'hate':            { present:['Μισώ την κίνηση.','I hate traffic.'], past:['Μίσησα εκείνη τη μέρα.','I hated that day.'], pastCont:['Μισούσα το σχολείο.','I used to hate school.'], future:['Θα μισήσω αυτή τη δουλειά.','I will come to hate this job.'], futureCont:['Θα μισώ πάντα τα ψέματα.','I will always hate lies.'] },
  "can't stand":     { present:['Δεν αντέχω τη ζέστη.','I can\'t stand the heat.'], past:['Δεν άντεξα άλλο.','I couldn\'t stand it anymore.'], pastCont:['Δεν άντεχα να τον βλέπω έτσι.','I couldn\'t bear to see him like that.'], future:['Δεν θα αντέξω την πίεση.','I won\'t be able to stand the pressure.'], futureCont:['Δεν θα αντέχω να περιμένω.','I won\'t be able to stand waiting.'] },
  'agree':           { present:['Συμφωνώ μαζί σου.','I agree with you.'], past:['Συμφώνησα στην πρόταση.','I agreed to the proposal.'], pastCont:['Συμφωνούσα πάντα με τον πατέρα μου.','I always used to agree with my father.'], future:['Θα συμφωνήσω αν μου εξηγήσεις.','I will agree if you explain.'], futureCont:['Θα συμφωνώ σε όλα.','I will be agreeing on everything.'] },
  'disagree':        { present:['Διαφωνώ σε αυτό το σημείο.','I disagree on this point.'], past:['Διαφώνησα στη συνάντηση.','I disagreed in the meeting.'], pastCont:['Διαφωνούσα συχνά με την αδερφή μου.','I often used to disagree with my sister.'], future:['Θα διαφωνήσω αν χρειαστεί.','I will disagree if needed.'], futureCont:['Θα διαφωνώ όποτε νομίζω.','I will be disagreeing whenever I think so.'] },
  'hope':            { present:['Ελπίζω να τα πάμε καλά.','I hope we do well.'], past:['Ήλπισα για το καλύτερο.','I hoped for the best.'], pastCont:['Έλπιζα ότι θα ερχόσουν.','I was hoping you would come.'], future:['Θα ελπίσω μέχρι το τέλος.','I will hope until the end.'], futureCont:['Θα ελπίζω πάντα σε κάτι καλύτερο.','I will always be hoping for something better.'] },
  'worry':           { present:['Ανησυχώ για τα παιδιά.','I worry about the kids.'], past:['Ανησύχησα πολύ χθες.','I worried a lot yesterday.'], pastCont:['Ανησυχούσα όταν δεν απαντούσες.','I was worried when you didn\'t answer.'], future:['Θα ανησυχήσω αν δεν έρθεις.','I will worry if you don\'t come.'], futureCont:['Θα ανησυχώ μέχρι να μάθω νέα σου.','I will be worrying until I hear from you.'] },
  'relax':           { present:['Χαλαρώνω με μουσική.','I relax with music.'], past:['Χαλάρωσα στον καναπέ.','I relaxed on the couch.'], pastCont:['Χαλάρωνα πίνοντας τσάι.','I used to relax drinking tea.'], future:['Θα χαλαρώσω το Σαββατοκύριακο.','I will relax on the weekend.'], futureCont:['Θα χαλαρώνω κάθε βράδυ.','I will be relaxing every evening.'] },
  'rest':            { present:['Ξεκουράζομαι για λίγο.','I am resting for a bit.'], past:['Ξεκουράστηκα το απόγευμα.','I rested in the afternoon.'], pastCont:['Ξεκουραζόμουν όποτε μπορούσα.','I used to rest whenever I could.'], future:['Θα ξεκουραστώ αύριο.','I will rest tomorrow.'], futureCont:['Θα ξεκουράζομαι όλες τις διακοπές.','I will be resting all the holidays.'] },
  'travel':          { present:['Ταξιδεύω συχνά.','I travel often.'], past:['Ταξίδεψα στην Ιταλία.','I travelled to Italy.'], pastCont:['Ταξίδευα κάθε καλοκαίρι.','I used to travel every summer.'], future:['Θα ταξιδέψω το καλοκαίρι.','I will travel in the summer.'], futureCont:['Θα ταξιδεύω όλο τον χρόνο.','I will be travelling all year.'] },
  'return':          { present:['Επιστρέφω στη δουλειά.','I am returning to work.'], past:['Επέστρεψα στις επτά.','I returned at seven.'], pastCont:['Επέστρεφα πάντα αργά.','I always used to come back late.'], future:['Θα επιστρέψω σύντομα.','I will return soon.'], futureCont:['Θα επιστρέφω κάθε Κυριακή.','I will be returning every Sunday.'] },
  'change':          { present:['Αλλάζω γνώμη.','I change my mind.'], past:['Άλλαξα δουλειά.','I changed jobs.'], pastCont:['Άλλαζα πάντα τα σχέδιά μου.','I used to always change my plans.'], future:['Θα αλλάξω τα ρούχα μου.','I will change my clothes.'], futureCont:['Θα αλλάζω σπίτι κάθε δύο χρόνια.','I will be moving house every two years.'] },
  'continue':        { present:['Συνεχίζω να διαβάζω.','I continue to read.'], past:['Συνέχισα μέχρι το τέλος.','I continued until the end.'], pastCont:['Συνέχιζα παρά την κούραση.','I kept going despite the tiredness.'], future:['Θα συνεχίσω αύριο.','I will continue tomorrow.'], futureCont:['Θα συνεχίζω να προσπαθώ.','I will keep on trying.'] },
  'stop':            { present:['Σταματάω για καφέ.','I stop for coffee.'], past:['Σταμάτησα το κάπνισμα.','I stopped smoking.'], pastCont:['Σταματούσα σε κάθε φανάρι.','I kept stopping at every light.'], future:['Θα σταματήσω εδώ.','I will stop here.'], futureCont:['Θα σταματάω κάθε τόσο.','I will be stopping every so often.'] },
  'arrive':          { present:['Φτάνω στο σπίτι.','I arrive home.'], past:['Έφτασα στις δέκα.','I arrived at ten.'], pastCont:['Έφτανα πάντα νωρίς στη δουλειά.','I always used to arrive early at work.'], future:['Θα φτάσω σε μια ώρα.','I will arrive in an hour.'], futureCont:['Θα φτάνω νωρίτερα από τώρα.','I will be arriving earlier from now on.'] }
};
