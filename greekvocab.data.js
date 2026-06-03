/* Greek Vocabulary Writing Prompts — data module.
 * Exposes: VOCAB (word pool), SCENARIOS (prompt framings), THEMES (colour metadata).
 * The app (greekvocab.app.js) reads these as globals.
 *
 * Word schema:
 *   { gr, art, en, pos, theme, register, note? }
 *     gr       — the Greek word (with accents). Adjectives are given in the masculine.
 *     art      — definite article for nouns (ο/η/το), '' for non-nouns
 *     en       — English meaning / gloss
 *     pos      — 'noun' | 'adj' | 'adv' | 'verb'
 *     theme    — colour grouping (key of THEMES)
 *     register — 'everyday' (common, high-frequency) | 'expressive' (vivid/unusual)
 *     note     — optional context (shown on hover)
 *
 * The point of this section is a *blend*: everyday words that are hard to remember
 * sit next to expressive words that make writing feel alive. The mix slider in the UI
 * controls how many of each you get. Everyday words are deliberately common
 * (the kind you'd find on a frequency list); expressive words are chosen to be worth it.
 */

window.THEMES = {
  feeling:  { label: 'Feeling / mood',     color: '#ff9f43' },
  art:      { label: 'Art / aesthetic',    color: '#b78cff' },
  mind:     { label: 'Mind / concept',     color: '#7fdcff' },
  sense:    { label: 'Sense / sound',      color: '#8ee28e' },
  social:   { label: 'People / social',    color: '#ffd84d' },
  everyday: { label: 'Everyday',           color: '#9aa6b2' }
};

window.VOCAB = [
  /* =========================================================
   *  EVERYDAY — common, high-frequency words (the hard-to-stick ones)
   * ========================================================= */
  // Home & objects
  { gr: 'τραπέζι',     art: 'το', en: 'table',              pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'καρέκλα',     art: 'η',  en: 'chair',              pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'κρεβάτι',     art: 'το', en: 'bed',                pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'πόρτα',       art: 'η',  en: 'door',               pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'παράθυρο',    art: 'το', en: 'window',             pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'κουρτίνα',    art: 'η',  en: 'curtain',            pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'ντουλάπι',    art: 'το', en: 'cupboard, cabinet',  pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'ντουλάπα',    art: 'η',  en: 'wardrobe',           pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'ψυγείο',      art: 'το', en: 'fridge',             pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'κουζίνα',     art: 'η',  en: 'kitchen, cooker',    pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'καναπές',     art: 'ο',  en: 'sofa',               pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'χαλί',        art: 'το', en: 'rug, carpet',        pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'τοίχος',      art: 'ο',  en: 'wall',               pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'πάτωμα',      art: 'το', en: 'floor',              pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'σκάλα',       art: 'η',  en: 'stairs, ladder',     pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'κλειδί',      art: 'το', en: 'key',                pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'λάμπα',       art: 'η',  en: 'lamp',               pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'καθρέφτης',   art: 'ο',  en: 'mirror',             pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'πετσέτα',     art: 'η',  en: 'towel',              pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'σαπούνι',     art: 'το', en: 'soap',               pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'ρολόι',       art: 'το', en: 'clock, watch',       pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'πιάτο',       art: 'το', en: 'plate',              pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'ποτήρι',      art: 'το', en: 'glass',              pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'κουτάλι',     art: 'το', en: 'spoon',              pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'πιρούνι',     art: 'το', en: 'fork',               pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'μαχαίρι',     art: 'το', en: 'knife',              pos: 'noun', theme: 'everyday', register: 'everyday' },
  // Food & drink
  { gr: 'ψωμί',        art: 'το', en: 'bread',              pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'νερό',        art: 'το', en: 'water',              pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'γάλα',        art: 'το', en: 'milk',               pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'καφές',       art: 'ο',  en: 'coffee',             pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'τυρί',        art: 'το', en: 'cheese',             pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'αυγό',        art: 'το', en: 'egg',                pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'ζάχαρη',      art: 'η',  en: 'sugar',              pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'αλάτι',       art: 'το', en: 'salt',               pos: 'noun', theme: 'everyday', register: 'everyday' },
  // People, body, daily life
  { gr: 'χέρι',        art: 'το', en: 'hand, arm',          pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'πόδι',        art: 'το', en: 'leg, foot',          pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'κεφάλι',      art: 'το', en: 'head',               pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'μάτι',        art: 'το', en: 'eye',                pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'καρδιά',      art: 'η',  en: 'heart',              pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'φίλος',       art: 'ο',  en: 'friend',             pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'οικογένεια',  art: 'η',  en: 'family',             pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'παιδί',       art: 'το', en: 'child',              pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'δουλειά',     art: 'η',  en: 'work, job',          pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'σπίτι',       art: 'το', en: 'house, home',        pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'αυτοκίνητο',  art: 'το', en: 'car',                pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'δρόμος',      art: 'ο',  en: 'road, street',       pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'μαγαζί',      art: 'το', en: 'shop',               pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'λεφτά',       art: 'τα', en: 'money',              pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'καιρός',      art: 'ο',  en: 'weather, time',      pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'εβδομάδα',    art: 'η',  en: 'week',               pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'πρωί',        art: 'το', en: 'morning',            pos: 'noun', theme: 'everyday', register: 'everyday' },
  { gr: 'βράδυ',       art: 'το', en: 'evening',            pos: 'noun', theme: 'everyday', register: 'everyday' },
  // Common connectors / softeners (high-frequency, make speech natural)
  { gr: 'κάπως',       art: '',   en: 'kind of, somehow',   pos: 'adv',  theme: 'everyday', register: 'everyday', note: 'Tiny but very natural conversational softener.' },
  { gr: 'τελείως',     art: '',   en: 'completely, totally',pos: 'adv',  theme: 'everyday', register: 'everyday' },
  { gr: 'όντως',       art: '',   en: 'actually, genuinely',pos: 'adv',  theme: 'everyday', register: 'everyday', note: 'Makes speech feel natural very quickly.' },
  { gr: 'βασικά',      art: '',   en: 'basically',          pos: 'adv',  theme: 'everyday', register: 'everyday', note: 'Extremely common spoken connector.' },
  { gr: 'ακριβώς',     art: '',   en: 'exactly',            pos: 'adv',  theme: 'everyday', register: 'everyday' },
  { gr: 'ιδιαίτερα',   art: '',   en: 'particularly, especially', pos: 'adv', theme: 'everyday', register: 'everyday' },
  { gr: 'σχεδόν',      art: '',   en: 'almost',             pos: 'adv',  theme: 'everyday', register: 'everyday' },

  /* =========================================================
   *  EXPRESSIVE — vivid / unusual words worth the effort
   * ========================================================= */
  // --- Feeling / mood ---
  { gr: 'μελαγχολικός', art: '',  en: 'melancholic',        pos: 'adj',  theme: 'feeling', register: 'expressive', note: 'Soft, emotional, atmospheric. Useful for music, places, moods.' },
  { gr: 'νοσταλγικός',  art: '',  en: 'nostalgic',          pos: 'adj',  theme: 'feeling', register: 'expressive', note: 'Emotional memory: old gear, old places, old songs.' },
  { gr: 'εύθραυστος',   art: '',  en: 'fragile',            pos: 'adj',  theme: 'feeling', register: 'expressive', note: 'Emotional, aesthetic, delicate.' },
  { gr: 'παθιασμένος',  art: '',  en: 'passionate, obsessed',pos: 'adj', theme: 'feeling', register: 'expressive' },
  { gr: 'ανήσυχος',     art: '',  en: 'restless, uneasy',   pos: 'adj',  theme: 'feeling', register: 'expressive' },
  { gr: 'ήρεμος',       art: '',  en: 'calm, peaceful',     pos: 'adj',  theme: 'feeling', register: 'expressive' },
  { gr: 'μοναχικός',    art: '',  en: 'solitary, lonely',   pos: 'adj',  theme: 'feeling', register: 'expressive' },
  { gr: 'παρορμητικός', art: '',  en: 'impulsive',          pos: 'adj',  theme: 'feeling', register: 'expressive' },
  { gr: 'αμφίθυμος',    art: '',  en: 'ambivalent',         pos: 'adj',  theme: 'feeling', register: 'expressive' },
  { gr: 'αδιάφορος',    art: '',  en: 'indifferent',        pos: 'adj',  theme: 'feeling', register: 'expressive' },
  { gr: 'απαθής',       art: '',  en: 'apathetic',          pos: 'adj',  theme: 'feeling', register: 'expressive' },
  { gr: 'ψυχρός',       art: '',  en: 'cold (emotionally)', pos: 'adj',  theme: 'feeling', register: 'expressive' },
  { gr: 'νοσταλγία',    art: 'η', en: 'nostalgia',          pos: 'noun', theme: 'feeling', register: 'expressive' },
  { gr: 'λαχτάρα',      art: 'η', en: 'yearning, craving',  pos: 'noun', theme: 'feeling', register: 'expressive' },
  { gr: 'μελαγχολία',   art: 'η', en: 'melancholy',         pos: 'noun', theme: 'feeling', register: 'expressive' },
  { gr: 'γαλήνη',       art: 'η', en: 'serenity, calm',     pos: 'noun', theme: 'feeling', register: 'expressive' },
  { gr: 'δέος',         art: 'το',en: 'awe',                pos: 'noun', theme: 'feeling', register: 'expressive' },
  { gr: 'στοργή',       art: 'η', en: 'tender affection',   pos: 'noun', theme: 'feeling', register: 'expressive' },
  { gr: 'μεράκι',       art: 'το',en: 'doing something with soul/passion', pos: 'noun', theme: 'feeling', register: 'expressive' },
  { gr: 'καημός',       art: 'ο', en: 'heartache, deep longing', pos: 'noun', theme: 'feeling', register: 'expressive' },
  { gr: 'ευδαιμονία',   art: 'η', en: 'bliss, flourishing', pos: 'noun', theme: 'feeling', register: 'expressive' },
  { gr: 'αγωνία',       art: 'η', en: 'anguish, suspense',  pos: 'noun', theme: 'feeling', register: 'expressive' },
  { gr: 'θλίψη',        art: 'η', en: 'sorrow, grief',      pos: 'noun', theme: 'feeling', register: 'expressive' },
  { gr: 'έκσταση',      art: 'η', en: 'ecstasy, rapture',   pos: 'noun', theme: 'feeling', register: 'expressive' },
  { gr: 'διάθεση',      art: 'η', en: 'mood, disposition, vibe', pos: 'noun', theme: 'feeling', register: 'expressive' },
  { gr: 'συναίσθημα',   art: 'το',en: 'emotion, feeling',   pos: 'noun', theme: 'feeling', register: 'expressive' },
  { gr: 'ένταση',       art: 'η', en: 'intensity, tension', pos: 'noun', theme: 'feeling', register: 'expressive', note: 'Wonderful dual meaning.' },

  // --- Art / aesthetic ---
  { gr: 'ονειρικός',    art: '',  en: 'dreamlike, oneiric', pos: 'adj',  theme: 'art', register: 'expressive', note: 'Great for music, visuals, Athens at night.' },
  { gr: 'υπνωτικός',    art: '',  en: 'hypnotic',           pos: 'adj',  theme: 'art', register: 'expressive', note: 'Grooves, repetition, techno, granular stuff.' },
  { gr: 'ψυχεδελικός',  art: '',  en: 'psychedelic',        pos: 'adj',  theme: 'art', register: 'expressive', note: 'Expressive + genuinely useful.' },
  { gr: 'πειραματικός', art: '',  en: 'experimental',       pos: 'adj',  theme: 'art', register: 'expressive' },
  { gr: 'μινιμαλιστικός',art: '', en: 'minimalist',         pos: 'adj',  theme: 'art', register: 'expressive' },
  { gr: 'κινηματογραφικός',art:'',en: 'cinematic',          pos: 'adj',  theme: 'art', register: 'expressive' },
  { gr: 'οργανικός',    art: '',  en: 'organic',            pos: 'adj',  theme: 'art', register: 'expressive' },
  { gr: 'μηχανικός',    art: '',  en: 'mechanical',         pos: 'adj',  theme: 'art', register: 'expressive', note: 'Great contrast with οργανικός.' },
  { gr: 'αναλογικός',   art: '',  en: 'analog',             pos: 'adj',  theme: 'art', register: 'expressive', note: 'Synth-world essential.' },
  { gr: 'ποιητικός',    art: '',  en: 'poetic',             pos: 'adj',  theme: 'art', register: 'expressive' },
  { gr: 'εκφραστικός',  art: '',  en: 'expressive',         pos: 'adj',  theme: 'art', register: 'expressive' },
  { gr: 'ακατέργαστος', art: '',  en: 'raw, unrefined',     pos: 'adj',  theme: 'art', register: 'expressive' },
  { gr: 'τελετουργικός',art: '',  en: 'ritualistic',        pos: 'adj',  theme: 'art', register: 'expressive' },
  { gr: 'υπόγειος',     art: '',  en: 'underground, subterranean', pos: 'adj', theme: 'art', register: 'expressive', note: 'Music scenes, culture, atmosphere.' },
  { gr: 'πυκνός',       art: '',  en: 'dense',              pos: 'adj',  theme: 'art', register: 'expressive', note: 'Dense atmosphere, dense sound.' },
  { gr: 'ρυθμός',       art: 'ο', en: 'rhythm',             pos: 'noun', theme: 'art', register: 'expressive' },
  { gr: 'αρμονία',      art: 'η', en: 'harmony',            pos: 'noun', theme: 'art', register: 'expressive' },
  { gr: 'τόνος',        art: 'ο', en: 'tone, stress, emphasis', pos: 'noun', theme: 'art', register: 'expressive' },
  { gr: 'ροή',          art: 'η', en: 'flow',               pos: 'noun', theme: 'art', register: 'expressive' },
  { gr: 'ατμόσφαιρα',   art: 'η', en: 'atmosphere',         pos: 'noun', theme: 'art', register: 'expressive' },
  { gr: 'ξωτικό',       art: 'το',en: 'elf, sprite',        pos: 'noun', theme: 'art', register: 'expressive' },
  { gr: 'φάντασμα',     art: 'το',en: 'ghost',              pos: 'noun', theme: 'art', register: 'expressive' },
  { gr: 'καλειδοσκόπιο',art:'το', en: 'kaleidoscope',       pos: 'noun', theme: 'art', register: 'expressive' },

  // --- Mind / concept ---
  { gr: 'χαοτικός',     art: '',  en: 'chaotic',            pos: 'adj',  theme: 'mind', register: 'expressive' },
  { gr: 'αφηρημένος',   art: '',  en: 'abstract',           pos: 'adj',  theme: 'mind', register: 'expressive' },
  { gr: 'δυστοπικός',   art: '',  en: 'dystopian',          pos: 'adj',  theme: 'mind', register: 'expressive' },
  { gr: 'αυθεντικός',   art: '',  en: 'authentic',          pos: 'adj',  theme: 'mind', register: 'expressive' },
  { gr: 'επιφανειακός', art: '',  en: 'superficial',        pos: 'adj',  theme: 'mind', register: 'expressive' },
  { gr: 'βαθύς',        art: '',  en: 'deep',               pos: 'adj',  theme: 'mind', register: 'expressive' },
  { gr: 'υπαρξιακός',   art: '',  en: 'existential',        pos: 'adj',  theme: 'mind', register: 'expressive' },
  { gr: 'ρευστός',      art: '',  en: 'fluid',              pos: 'adj',  theme: 'mind', register: 'expressive' },
  { gr: 'μεταβατικός',  art: '',  en: 'transitional',       pos: 'adj',  theme: 'mind', register: 'expressive' },
  { gr: 'διαισθητικός', art: '',  en: 'intuitive',          pos: 'adj',  theme: 'mind', register: 'expressive' },
  { gr: 'ουδέτερος',    art: '',  en: 'neutral',            pos: 'adj',  theme: 'mind', register: 'expressive' },
  { gr: 'απόκοσμος',    art: '',  en: 'otherworldly, uncanny', pos: 'adj', theme: 'mind', register: 'expressive', note: 'Literally "from another world."' },
  { gr: 'αλλόκοτος',    art: '',  en: 'bizarre, uncanny',   pos: 'adj',  theme: 'mind', register: 'expressive', note: 'More textured than just "weird."' },
  { gr: 'νοοτροπία',    art: 'η', en: 'mindset, mentality', pos: 'noun', theme: 'mind', register: 'expressive' },
  { gr: 'συνείδηση',    art: 'η', en: 'consciousness',      pos: 'noun', theme: 'mind', register: 'expressive' },
  { gr: 'αντίληψη',     art: 'η', en: 'perception',         pos: 'noun', theme: 'mind', register: 'expressive' },
  { gr: 'πραγματικότητα',art:'η', en: 'reality',            pos: 'noun', theme: 'mind', register: 'expressive' },
  { gr: 'μεταμόρφωση',  art: 'η', en: 'transformation',     pos: 'noun', theme: 'mind', register: 'expressive' },
  { gr: 'προσωδία',     art: 'η', en: 'prosody',            pos: 'noun', theme: 'mind', register: 'expressive', note: 'Niche but philosophically perfect.' },
  { gr: 'γρίφος',       art: 'ο', en: 'riddle, enigma',     pos: 'noun', theme: 'mind', register: 'expressive' },
  { gr: 'παραίσθηση',   art: 'η', en: 'hallucination',      pos: 'noun', theme: 'mind', register: 'expressive' },

  // --- Sense / sound ---
  { gr: 'αιθέριος',     art: '',  en: 'ethereal',           pos: 'adj',  theme: 'sense', register: 'expressive', note: 'Perfect for ambient music, textures, pads.' },
  { gr: 'σκοτεινός',    art: '',  en: 'dark',               pos: 'adj',  theme: 'sense', register: 'expressive', note: 'Emotional/aesthetic darkness.' },
  { gr: 'θολός',        art: '',  en: 'blurry, hazy',       pos: 'adj',  theme: 'sense', register: 'expressive', note: 'Amazing metaphorical potential.' },
  { gr: 'ζωντανός',     art: '',  en: 'alive, vivid',       pos: 'adj',  theme: 'sense', register: 'expressive' },
  { gr: 'σιωπηλός',     art: '',  en: 'silent, quiet',      pos: 'adj',  theme: 'sense', register: 'expressive' },
  { gr: 'οξύς',         art: '',  en: 'sharp, acute',       pos: 'adj',  theme: 'sense', register: 'expressive', note: 'Sound, intellect, feeling, humour.' },
  { gr: 'αχνός',        art: '',  en: 'faint, hazy',        pos: 'adj',  theme: 'sense', register: 'expressive' },
  { gr: 'απέραντος',    art: '',  en: 'boundless, vast',    pos: 'adj',  theme: 'sense', register: 'expressive' },
  { gr: 'χροιά',        art: 'η', en: 'tone, timbre, colour of voice', pos: 'noun', theme: 'sense', register: 'expressive', note: 'Voice colour, sonic colour, emotional tone.' },
  { gr: 'ηχόχρωμα',     art: 'το',en: 'timbre (lit. "sound-colour")', pos: 'noun', theme: 'sense', register: 'expressive' },
  { gr: 'αίσθηση',      art: 'η', en: 'feeling, sensation, vibe', pos: 'noun', theme: 'sense', register: 'expressive', note: 'One of the richest, most flexible Greek words.' },
  { gr: 'φεγγάρι',      art: 'το',en: 'moon',               pos: 'noun', theme: 'sense', register: 'expressive' },
  { gr: 'αύρα',         art: 'η', en: 'breeze, aura',       pos: 'noun', theme: 'sense', register: 'expressive' },
  { gr: 'ομίχλη',       art: 'η', en: 'fog, mist',          pos: 'noun', theme: 'sense', register: 'expressive' },
  { gr: 'άρωμα',        art: 'το',en: 'fragrance, scent',   pos: 'noun', theme: 'sense', register: 'expressive' },
  { gr: 'ρίγος',        art: 'το',en: 'shiver, thrill',     pos: 'noun', theme: 'sense', register: 'expressive' },
  { gr: 'ανατριχίλα',   art: 'η', en: 'shudder, goosebumps',pos: 'noun', theme: 'sense', register: 'expressive' },
  { gr: 'σούρουπο',     art: 'το',en: 'dusk, nightfall',    pos: 'noun', theme: 'sense', register: 'expressive' },
  { gr: 'χάραμα',       art: 'το',en: 'daybreak, first light', pos: 'noun', theme: 'sense', register: 'expressive' },
  { gr: 'ψίθυρος',      art: 'ο', en: 'a whisper',          pos: 'noun', theme: 'sense', register: 'expressive' },
  { gr: 'σιωπή',        art: 'η', en: 'silence',            pos: 'noun', theme: 'sense', register: 'expressive' },
  { gr: 'ηχώ',          art: 'η', en: 'echo',               pos: 'noun', theme: 'sense', register: 'expressive' },
  { gr: 'σκιά',         art: 'η', en: 'shadow',             pos: 'noun', theme: 'sense', register: 'expressive' },
  { gr: 'λάμψη',        art: 'η', en: 'gleam, radiance',    pos: 'noun', theme: 'sense', register: 'expressive' },

  // --- People / social ---
  { gr: 'εσωστρεφής',   art: '',  en: 'introverted',        pos: 'adj',  theme: 'social', register: 'expressive' },
  { gr: 'εξωστρεφής',   art: '',  en: 'extroverted',        pos: 'adj',  theme: 'social', register: 'expressive' },
  { gr: 'περίεργος',    art: '',  en: 'curious / strange',  pos: 'adj',  theme: 'social', register: 'expressive', note: 'Means BOTH — very Greek-feeling concept.' },
  { gr: 'αυθόρμητος',   art: '',  en: 'spontaneous',        pos: 'adj',  theme: 'social', register: 'expressive' },
  { gr: 'ειλικρινής',   art: '',  en: 'sincere, honest',    pos: 'adj',  theme: 'social', register: 'expressive' },
  { gr: 'παράξενος',    art: '',  en: 'strange, odd',       pos: 'adj',  theme: 'social', register: 'expressive', note: 'A bit more everyday than αλλόκοτος.' },
  { gr: 'εκκεντρικός',  art: '',  en: 'eccentric',          pos: 'adj',  theme: 'social', register: 'expressive' },
  { gr: 'διακριτικός',  art: '',  en: 'subtle, discreet',   pos: 'adj',  theme: 'social', register: 'expressive' },
  { gr: 'αυστηρός',     art: '',  en: 'strict, severe',     pos: 'adj',  theme: 'social', register: 'expressive' },
  { gr: 'ανεπιτήδευτος',art: '',  en: 'unpretentious, unaffected', pos: 'adj', theme: 'social', register: 'expressive', note: 'Brilliant, nuanced Greek cultural word.' },
  { gr: 'αμέτοχος',     art: '',  en: 'uninvolved, detached',pos: 'adj', theme: 'social', register: 'expressive' },
  { gr: 'κυνικός',      art: '',  en: 'cynical',            pos: 'adj',  theme: 'social', register: 'expressive' },
  { gr: 'πονηρός',      art: '',  en: 'cunning, sly, mischievous', pos: 'adj', theme: 'social', register: 'expressive', note: 'Sly/crafty, but often playful — a knowing, mischievous streak.' },
  { gr: 'προφορά',      art: 'η', en: 'pronunciation, accent', pos: 'noun', theme: 'social', register: 'expressive' },
  { gr: 'παρουσία',     art: 'η', en: 'presence',           pos: 'noun', theme: 'social', register: 'expressive' },
  { gr: 'σύνδεση',      art: 'η', en: 'connection',         pos: 'noun', theme: 'social', register: 'expressive' },
  { gr: 'φασαρία',      art: 'η', en: 'commotion, fuss',    pos: 'noun', theme: 'social', register: 'expressive' },
  { gr: 'κουτσομπολιό', art: 'το',en: 'gossip',             pos: 'noun', theme: 'social', register: 'expressive' },
  { gr: 'φάρσα',        art: 'η', en: 'prank, farce',       pos: 'noun', theme: 'social', register: 'expressive' }
];

// Varied framings for the writing prompt. {n} is replaced with the word count.
window.SCENARIOS = [
  'Use all {n} words in a single, winding sentence.',
  'Write a short diary entry (3–4 sentences) about your day.',
  'Write the opening lines of a horror story.',
  'Describe a dream you had last night.',
  'Write a postcard to a friend from somewhere far away.',
  'Write a tiny love letter.',
  'Describe the scene outside your window right now.',
  'Write the opening of a fairy tale.',
  'Write a snippet of overheard dialogue between two strangers.',
  'Review an imaginary album using these words.',
  'Write a weather forecast for an imaginary place.',
  'Describe a memory from your childhood.',
  'Write a three-line poem.',
  'Write a confession.',
  'Write the back-cover blurb for a novel that does not exist.',
  'Describe a piece of music as if it were a place.',
  'Write a text message you would never actually send.',
  'Narrate one minute of an ordinary morning in slow motion.'
];
