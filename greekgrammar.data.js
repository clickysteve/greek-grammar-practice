/* Greek Grammar — SRS curriculum data.
 * Exposes: GRAMMAR_LEVELS, GRAMMAR (array of grammar points).
 *
 * Grammar point schema:
 *   { id, level, title, short, explanation (HTML), examples:[{gr,en}], items:[...] }
 * Item schema (a cloze sentence; {b} marks the blank):
 *   { text, answer, accept?:[...], choices:[...], en, hint }
 *     - answer  : the correct fill
 *     - accept  : extra correct typed answers (accent-folded match); answer is always accepted
 *     - choices : options for multiple-choice mode (exactly one is the answer)
 *     - en      : English translation of the full sentence
 *     - hint    : shown under the blank (meaning / person cue)
 */

window.GRAMMAR_LEVELS = [
  { key: 'A1', label: 'A1 — Beginner' },
  { key: 'A2', label: 'A2 — Elementary' },
  { key: 'B1', label: 'B1 — Intermediate' },
  { key: 'B2', label: 'B2 — Upper intermediate' },
  { key: 'C1', label: 'C1 — Advanced' }
];

window.GRAMMAR = [
  /* ===================== A1 ===================== */
  {
    id: 'a1-pronouns-subject',
    more: '<p>Because the verb ending already shows the person, adding a pronoun feels emphatic — use it on purpose, not by default.</p><ul class="g-tips"><li>Use it for <strong>contrast</strong>: <em>Εγώ δουλεύω, εσύ κοιμάσαι.</em> (I work, you sleep.)</li><li>Use it for <strong>clarity</strong> in the 3rd person, where <em>αυτός / αυτή / αυτό</em> all take the same ending -ει.</li><li><strong>Common mistake:</strong> scattering εγώ/εσύ everywhere — it sounds unnatural. Greek normally drops them.</li><li>αυτός/αυτή/αυτό also mean “this one”; the gender must match the noun.</li></ul>',
    level: 'A1',
    title: 'Subject pronouns',
    short: 'εγώ, εσύ, αυτός… — usually dropped, used for emphasis.',
    explanation:
      '<p>The subject pronouns are:</p>' +
      '<div class="g-grid">' +
      '<div class="g-k">I</div><div class="g-v">εγώ</div>' +
      '<div class="g-k">you (sing.)</div><div class="g-v">εσύ</div>' +
      '<div class="g-k">he / she / it</div><div class="g-v">αυτός / αυτή / αυτό</div>' +
      '<div class="g-k">we</div><div class="g-v">εμείς</div>' +
      '<div class="g-k">you (pl.)</div><div class="g-v">εσείς</div>' +
      '<div class="g-k">they (m / f / n)</div><div class="g-v">αυτοί / αυτές / αυτά</div>' +
      '</div>' +
      '<p>Greek normally <strong>drops</strong> the subject pronoun, because the verb ending already shows the person (<em>μιλάω</em> already means “I speak”). You add the pronoun mainly for <strong>emphasis or contrast</strong>: <em>Εγώ μιλάω, εσύ ακούς.</em></p>',
    examples: [
      { gr: 'Εγώ είμαι από την Αγγλία.', en: 'I am from England.' },
      { gr: 'Εσύ τι κάνεις;', en: 'And you, how are you?' },
      { gr: 'Αυτοί μένουν στην Αθήνα.', en: 'They live in Athens.' }
    ],
    items: [
      { text: '{b} είμαι Άγγλος.', answer: 'Εγώ', choices: ['Εγώ', 'Εσύ', 'Αυτός', 'Εμείς'], en: 'I am English.', hint: 'I' },
      { text: '{b} είσαι από την Ελλάδα;', answer: 'Εσύ', choices: ['Εγώ', 'Εσύ', 'Αυτή', 'Εσείς'], en: 'Are you from Greece?', hint: 'you (singular)' },
      { text: '{b} είναι φίλοι μου.', answer: 'Αυτοί', choices: ['Αυτός', 'Αυτή', 'Αυτοί', 'Εμείς'], en: 'They are my friends.', hint: 'they (masculine)' },
      { text: '{b} μένουμε στη Θεσσαλονίκη.', answer: 'Εμείς', choices: ['Εγώ', 'Εμείς', 'Εσείς', 'Αυτοί'], en: 'We live in Thessaloniki.', hint: 'we' },
      { text: '{b} είναι η Μαρία.', answer: 'Αυτή', choices: ['Αυτός', 'Αυτή', 'Αυτό', 'Εσύ'], en: 'She is Maria.', hint: 'she' }
    ]
  },
  {
    id: 'a1-present-a',
    more: '<p>One present tense covers both “I write” and “I am writing” — there is no separate continuous form.</p><ul class="g-tips"><li>The stem stays; only the ending changes. Watch the spelling: 1pl is <strong>-ουμε</strong> (γράφουμε), not “-ομε”.</li><li><strong>Easy mix-up:</strong> εμείς <strong>-ουμε</strong> vs αυτοί <strong>-ουν</strong> — different person, similar look.</li><li>The stress normally stays on the same syllable as the 1st person throughout.</li></ul>',
    level: 'A1',
    title: 'Present tense — Group A (-ω)',
    short: 'The default pattern: -ω, -εις, -ει, -ουμε, -ετε, -ουν.',
    explanation:
      '<p>Most verbs are Group A. Take the stem and add the present endings:</p>' +
      '<div class="g-grid">' +
      '<div class="g-k">εγώ</div><div class="g-v">γράφ<strong>ω</strong></div>' +
      '<div class="g-k">εσύ</div><div class="g-v">γράφ<strong>εις</strong></div>' +
      '<div class="g-k">αυτός/ή/ό</div><div class="g-v">γράφ<strong>ει</strong></div>' +
      '<div class="g-k">εμείς</div><div class="g-v">γράφ<strong>ουμε</strong></div>' +
      '<div class="g-k">εσείς</div><div class="g-v">γράφ<strong>ετε</strong></div>' +
      '<div class="g-k">αυτοί/ές/ά</div><div class="g-v">γράφ<strong>ουν</strong></div>' +
      '</div>' +
      '<p>Same endings for κάνω, μένω, δουλεύω, διαβάζω, παίζω…</p>',
    examples: [
      { gr: 'Διαβάζω ένα βιβλίο.', en: 'I am reading a book.' },
      { gr: 'Δουλεύεις πολύ.', en: 'You work a lot.' },
      { gr: 'Παίζουν στο πάρκο.', en: 'They are playing in the park.' }
    ],
    items: [
      { text: 'Εγώ {b} ελληνικά. (μαθαίνω)', answer: 'μαθαίνω', choices: ['μαθαίνω', 'μαθαίνεις', 'μαθαίνουμε', 'μαθαίνουν'], en: 'I am learning Greek.', hint: 'learn · εγώ' },
      { text: 'Εσύ {b} ένα γράμμα. (γράφω)', answer: 'γράφεις', choices: ['γράφω', 'γράφεις', 'γράφει', 'γράφετε'], en: 'You are writing a letter.', hint: 'write · εσύ' },
      { text: 'Η Μαρία {b} στην Αθήνα. (μένω)', answer: 'μένει', choices: ['μένω', 'μένεις', 'μένει', 'μένουν'], en: 'Maria lives in Athens.', hint: 'live · she' },
      { text: 'Εμείς {b} κάθε μέρα. (δουλεύω)', answer: 'δουλεύουμε', choices: ['δουλεύω', 'δουλεύεις', 'δουλεύουμε', 'δουλεύετε'], en: 'We work every day.', hint: 'work · εμείς' },
      { text: 'Τα παιδιά {b} ποδόσφαιρο. (παίζω)', answer: 'παίζουν', choices: ['παίζει', 'παίζουμε', 'παίζετε', 'παίζουν'], en: 'The children play football.', hint: 'play · they' }
    ]
  },
  {
    id: 'a1-present-b1',
    more: '<p>The 1st person has two spellings: <em>αγαπάω</em> (everyday) and <em>αγαπώ</em> (more formal) — same meaning.</p><ul class="g-tips"><li>The stress is always on the ending.</li><li><strong>Tell B1 from B2 by the 2nd person:</strong> B1 is <strong>-άς</strong> (αγαπάς), B2 is -είς (μπορείς).</li><li>Common B1 verbs: μιλάω, ρωτάω, απαντάω, αγαπάω, ζητάω, περπατάω, σταματάω.</li></ul>',
    level: 'A1',
    title: 'Present tense — Group B1 (-άω / -ώ)',
    short: 'Stressed-α contract verbs: -άω, -άς, -άει, -άμε, -άτε, -άνε.',
    explanation:
      '<p>These verbs stress the ending. The 1st person can be written -άω or -ώ.</p>' +
      '<div class="g-grid">' +
      '<div class="g-k">εγώ</div><div class="g-v">αγαπ<strong>άω</strong> / αγαπ<strong>ώ</strong></div>' +
      '<div class="g-k">εσύ</div><div class="g-v">αγαπ<strong>άς</strong></div>' +
      '<div class="g-k">αυτός/ή/ό</div><div class="g-v">αγαπ<strong>άει</strong> / αγαπ<strong>ά</strong></div>' +
      '<div class="g-k">εμείς</div><div class="g-v">αγαπ<strong>άμε</strong></div>' +
      '<div class="g-k">εσείς</div><div class="g-v">αγαπ<strong>άτε</strong></div>' +
      '<div class="g-k">αυτοί/ές/ά</div><div class="g-v">αγαπ<strong>άνε</strong> / αγαπ<strong>ούν</strong></div>' +
      '</div>' +
      '<p>Like this: μιλάω, ρωτάω, απαντάω, ζητάω, περπατάω.</p>',
    examples: [
      { gr: 'Μιλάω λίγο ελληνικά.', en: 'I speak a little Greek.' },
      { gr: 'Τι ρωτάς;', en: 'What are you asking?' },
      { gr: 'Αγαπάμε την Ελλάδα.', en: 'We love Greece.' }
    ],
    items: [
      { text: 'Εγώ {b} ελληνικά. (μιλάω)', answer: 'μιλάω', accept: ['μιλώ'], choices: ['μιλάω', 'μιλάς', 'μιλάμε', 'μιλάνε'], en: 'I speak Greek.', hint: 'speak · εγώ' },
      { text: 'Εσύ {b} πολλές ερωτήσεις. (ρωτάω)', answer: 'ρωτάς', choices: ['ρωτάω', 'ρωτάς', 'ρωτάει', 'ρωτάτε'], en: 'You ask a lot of questions.', hint: 'ask · εσύ' },
      { text: 'Ο Νίκος {b} στον δάσκαλο. (απαντάω)', answer: 'απαντάει', accept: ['απαντά'], choices: ['απαντάω', 'απαντάς', 'απαντάει', 'απαντάνε'], en: 'Nikos answers the teacher.', hint: 'answer · he' },
      { text: 'Εμείς {b} τους φίλους μας. (αγαπάω)', answer: 'αγαπάμε', choices: ['αγαπάω', 'αγαπάς', 'αγαπάμε', 'αγαπάτε'], en: 'We love our friends.', hint: 'love · εμείς' },
      { text: 'Αυτοί {b} στην παραλία. (περπατάω)', answer: 'περπατάνε', accept: ['περπατούν', 'περπατάν'], choices: ['περπατάει', 'περπατάμε', 'περπατάτε', 'περπατάνε'], en: 'They walk on the beach.', hint: 'walk · they' }
    ]
  },
  {
    id: 'a1-present-b2',
    more: '<p>Also stressed on the ending, but with ει/ου instead of α.</p><ul class="g-tips"><li><strong>The giveaway is the 2nd person:</strong> -είς (B2) vs -άς (B1).</li><li>Common B2 verbs: μπορώ, οδηγώ, θεωρώ, τηλεφωνώ, ζητώ, ζω.</li><li>ζω is slightly irregular: ζω, ζεις, ζει, ζούμε, ζείτε, ζουν.</li></ul>',
    level: 'A1',
    title: 'Present tense — Group B2 (-ώ)',
    short: 'Stressed-ε contract verbs: -ώ, -είς, -εί, -ούμε, -είτε, -ούν.',
    explanation:
      '<p>Also stressed on the ending, but with ει / ου. You can tell B2 from B1 by the 2nd person: B2 is <strong>-είς</strong>, B1 is -άς.</p>' +
      '<div class="g-grid">' +
      '<div class="g-k">εγώ</div><div class="g-v">μπορ<strong>ώ</strong></div>' +
      '<div class="g-k">εσύ</div><div class="g-v">μπορ<strong>είς</strong></div>' +
      '<div class="g-k">αυτός/ή/ό</div><div class="g-v">μπορ<strong>εί</strong></div>' +
      '<div class="g-k">εμείς</div><div class="g-v">μπορ<strong>ούμε</strong></div>' +
      '<div class="g-k">εσείς</div><div class="g-v">μπορ<strong>είτε</strong></div>' +
      '<div class="g-k">αυτοί/ές/ά</div><div class="g-v">μπορ<strong>ούν</strong></div>' +
      '</div>' +
      '<p>Like this: μπορώ, οδηγώ, θεωρώ, τηλεφωνώ, ζω.</p>',
    examples: [
      { gr: 'Μπορώ να έρθω;', en: 'Can I come?' },
      { gr: 'Οδηγείς πολύ γρήγορα.', en: 'You drive very fast.' },
      { gr: 'Ζούμε στην Κρήτη.', en: 'We live in Crete.' }
    ],
    items: [
      { text: 'Εγώ {b} να σε βοηθήσω. (μπορώ)', answer: 'μπορώ', choices: ['μπορώ', 'μπορείς', 'μπορεί', 'μπορούμε'], en: 'I can help you.', hint: 'can · εγώ' },
      { text: 'Εσύ {b} πολύ καλά. (οδηγώ)', answer: 'οδηγείς', choices: ['οδηγώ', 'οδηγείς', 'οδηγεί', 'οδηγείτε'], en: 'You drive very well.', hint: 'drive · εσύ' },
      { text: 'Η Άννα {b} στη μητέρα της. (τηλεφωνώ)', answer: 'τηλεφωνεί', choices: ['τηλεφωνώ', 'τηλεφωνείς', 'τηλεφωνεί', 'τηλεφωνούν'], en: 'Anna phones her mother.', hint: 'phone · she' },
      { text: 'Εμείς {b} στην Αθήνα. (ζω)', answer: 'ζούμε', choices: ['ζω', 'ζεις', 'ζούμε', 'ζείτε'], en: 'We live in Athens.', hint: 'live · εμείς' },
      { text: 'Αυτοί {b} ότι έχουν δίκιο. (θεωρώ)', answer: 'θεωρούν', choices: ['θεωρεί', 'θεωρούμε', 'θεωρείτε', 'θεωρούν'], en: 'They consider that they are right.', hint: 'consider · they' }
    ]
  },
  {
    id: 'a1-articles-gender',
    more: '<p>The endings are only a rough guide — gender is a property of the word, so always learn the article with the noun.</p><ul class="g-tips"><li>Frequent exceptions: <em>ο χάρτης</em> (masc. in -ης), <em>η πόλη</em> (fem. in -η), <em>το κρέας</em> (neut. in -ας).</li><li>The indefinite article matches gender too: <strong>ένας</strong> άντρας, <strong>μία</strong> γυναίκα, <strong>ένα</strong> παιδί.</li><li>The article also changes by <em>case</em> (you’ll meet τον/του next), not only gender.</li></ul>',
    level: 'A1',
    title: 'The definite article & gender',
    short: 'ο (m), η (f), το (n); plural οι / οι / τα.',
    explanation:
      '<p>Every Greek noun has a gender, shown by its article. In the nominative (subject):</p>' +
      '<div class="g-grid">' +
      '<div class="g-k">masculine</div><div class="g-v"><strong>ο</strong> άντρας → <strong>οι</strong> άντρες</div>' +
      '<div class="g-k">feminine</div><div class="g-v"><strong>η</strong> γυναίκα → <strong>οι</strong> γυναίκες</div>' +
      '<div class="g-k">neuter</div><div class="g-v"><strong>το</strong> παιδί → <strong>τα</strong> παιδιά</div>' +
      '</div>' +
      '<p>Rough rule of thumb: -ος is usually masculine, -α / -η usually feminine, -ο / -ι usually neuter — but always learn the article with the noun.</p>',
    examples: [
      { gr: 'Ο φίλος μου είναι εδώ.', en: 'My friend (m) is here.' },
      { gr: 'Η θάλασσα είναι κρύα.', en: 'The sea is cold.' },
      { gr: 'Τα παιδιά παίζουν.', en: 'The children are playing.' }
    ],
    items: [
      { text: '{b} άντρας', answer: 'ο', choices: ['ο', 'η', 'το', 'οι'], en: 'the man', hint: 'masculine singular' },
      { text: '{b} γυναίκα', answer: 'η', choices: ['ο', 'η', 'το', 'τα'], en: 'the woman', hint: 'feminine singular' },
      { text: '{b} παιδί', answer: 'το', choices: ['ο', 'η', 'το', 'οι'], en: 'the child', hint: 'neuter singular' },
      { text: '{b} φίλοι', answer: 'οι', choices: ['ο', 'οι', 'τα', 'η'], en: 'the friends (m)', hint: 'masculine plural' },
      { text: '{b} βιβλία', answer: 'τα', choices: ['το', 'οι', 'τα', 'η'], en: 'the books', hint: 'neuter plural' },
      { text: '{b} θάλασσα', answer: 'η', choices: ['ο', 'η', 'το', 'οι'], en: 'the sea', hint: 'feminine singular' }
    ]
  },
  {
    id: 'a1-weak-object',
    more: '<p>These short pronouns normally sit <strong>before</strong> the verb, but jump <strong>after</strong> a positive command.</p><ul class="g-tips"><li>Before a normal verb: <em>Σε βλέπω.</em> After a command: <em>Δώσε <strong>μου</strong> το!</em></li><li><strong>Common mistake:</strong> saying “βλέπω σε”. Weak pronouns can’t stand after a plain verb.</li><li>For emphasis use the <em>strong</em> form: <em>Εσένα</em> αγαπώ (it’s <em>you</em> I love).</li></ul>',
    level: 'A1',
    title: 'Weak object pronouns (με, σε, τον…)',
    short: 'me/you/him… — they go BEFORE the verb: σε βλέπω.',
    explanation:
      '<p>For “me, you, him, her, it, us, them” as the object, Greek uses short pronouns that sit <strong>before the verb</strong>:</p>' +
      '<div class="g-grid">' +
      '<div class="g-k">me</div><div class="g-v">με</div>' +
      '<div class="g-k">you</div><div class="g-v">σε</div>' +
      '<div class="g-k">him / her / it</div><div class="g-v">τον / την / το</div>' +
      '<div class="g-k">us</div><div class="g-v">μας</div>' +
      '<div class="g-k">you (pl.)</div><div class="g-v">σας</div>' +
      '<div class="g-k">them</div><div class="g-v">τους / τις / τα</div>' +
      '</div>' +
      '<p>So “I see you” is <em>Σε βλέπω</em> (literally “you I-see”), not “βλέπω σε”.</p>',
    examples: [
      { gr: 'Σε αγαπώ.', en: 'I love you.' },
      { gr: 'Τον ξέρω καλά.', en: 'I know him well.' },
      { gr: 'Μας περιμένουν.', en: 'They are waiting for us.' }
    ],
    items: [
      { text: '{b} αγαπώ. (you)', answer: 'Σε', choices: ['Με', 'Σε', 'Τον', 'Μας'], en: 'I love you.', hint: 'object: you' },
      { text: '{b} ξέρω καλά. (him)', answer: 'Τον', choices: ['Την', 'Τον', 'Το', 'Τους'], en: 'I know him well.', hint: 'object: him' },
      { text: '{b} βλέπεις; (me)', answer: 'Με', choices: ['Με', 'Σε', 'Μας', 'Σας'], en: 'Do you see me?', hint: 'object: me' },
      { text: '{b} περιμένουν στο σπίτι. (us)', answer: 'Μας', choices: ['Με', 'Σε', 'Μας', 'Τους'], en: 'They are waiting for us at home.', hint: 'object: us' },
      { text: '{b} καλώ για φαγητό. (them, m)', answer: 'Τους', choices: ['Τον', 'Τις', 'Τα', 'Τους'], en: 'I invite them for a meal.', hint: 'object: them (masculine)' }
    ]
  },
  {
    id: 'a1-possessive',
    more: '<p>Keep the article: it’s <em>το σπίτι μου</em>, never just “σπίτι μου”.</p><ul class="g-tips"><li>The forms are identical to the object pronouns (μου, σου, του…) — only the <strong>position</strong> (after the noun) tells them apart.</li><li>Proparoxytone nouns gain a second accent: <em>το όνομα</em> → <em>το όνομά μου</em>.</li><li>For emphasis (“my own”) use <em>δικός/δική/δικό μου</em>.</li></ul>',
    level: 'A1',
    title: 'Possessive pronouns (μου, σου, του…)',
    short: 'my/your/his… — they go AFTER the noun: το σπίτι μου.',
    explanation:
      '<p>To say “my, your, his…”, Greek puts a short pronoun <strong>after the noun</strong>:</p>' +
      '<div class="g-grid">' +
      '<div class="g-k">my</div><div class="g-v">μου</div>' +
      '<div class="g-k">your</div><div class="g-v">σου</div>' +
      '<div class="g-k">his / her / its</div><div class="g-v">του / της / του</div>' +
      '<div class="g-k">our</div><div class="g-v">μας</div>' +
      '<div class="g-k">your (pl.)</div><div class="g-v">σας</div>' +
      '<div class="g-k">their</div><div class="g-v">τους</div>' +
      '</div>' +
      '<p>So “my house” is <em>το σπίτι μου</em> — keep the article: <em>το</em> σπίτι μου, not just “σπίτι μου”.</p>',
    examples: [
      { gr: 'το σπίτι μου', en: 'my house' },
      { gr: 'η φίλη σου', en: 'your friend (f)' },
      { gr: 'το όνομά της', en: 'her name' }
    ],
    items: [
      { text: 'το σπίτι {b} (my)', answer: 'μου', choices: ['μου', 'σου', 'του', 'μας'], en: 'my house', hint: 'possessive: my' },
      { text: 'η φίλη {b} (your)', answer: 'σου', choices: ['μου', 'σου', 'της', 'σας'], en: 'your friend (f)', hint: 'possessive: your' },
      { text: 'το αυτοκίνητο {b} (his)', answer: 'του', choices: ['μου', 'του', 'της', 'τους'], en: 'his car', hint: 'possessive: his' },
      { text: 'οι γονείς {b} (our)', answer: 'μας', choices: ['μου', 'μας', 'σας', 'τους'], en: 'our parents', hint: 'possessive: our' },
      { text: 'το όνομα {b} (her)', answer: 'της', choices: ['του', 'της', 'τους', 'σου'], en: 'her name', hint: 'possessive: her' }
    ]
  },
  {
    id: 'a1-oti-pos-pou',
    more: '<p>All three mean “that”, but they’re not freely swappable.</p><ul class="g-tips"><li><strong>Common mistake:</strong> using ότι after an emotion verb. It must be <em>που</em>: <em>Χαίρομαι <strong>που</strong> ήρθες</em>, not “ότι”.</li><li>Mind the accents: <em>πού;</em> = where? and <em>πώς;</em> = how? only in questions; plain που/πως are unstressed.</li><li><em>ό,τι</em> (with a comma) = “whatever”: <em>Πάρε ό,τι θέλεις.</em></li></ul>',
    level: 'A1',
    title: 'ότι / πως / που (“that”)',
    short: 'ότι/πως after think/say/know; που after emotions and as “which/who”.',
    explanation:
      '<p>Three little words all translate as “that”:</p>' +
      '<p><strong>ότι / πως</strong> (interchangeable) come after verbs of thinking/saying: νομίζω, λέω, ξέρω, πιστεύω.<br>' +
      '<em>Νομίζω ότι θα βρέξει.</em> = I think that it will rain.</p>' +
      '<p><strong>που</strong> comes after verbs/adverbs of <strong>emotion</strong> (= “that / because”):<br>' +
      '<em>Χαίρομαι που ήρθες.</em> = I’m glad (that) you came.</p>' +
      '<p><strong>που</strong> also means “which / who” after a noun:<br>' +
      '<em>Ο άντρας που έφυγε…</em> = The man who left…</p>' +
      '<p>(Note the accent: <strong>πού;</strong> = where? and <strong>πώς;</strong> = how? only in questions.)</p>',
    examples: [
      { gr: 'Λέει ότι είναι κουρασμένος.', en: 'He says that he is tired.' },
      { gr: 'Λυπάμαι που έφυγες.', en: 'I’m sorry that you left.' },
      { gr: 'Το βιβλίο που διαβάζω είναι καλό.', en: 'The book that I’m reading is good.' }
    ],
    items: [
      { text: 'Νομίζω {b} θα βρέξει αύριο.', answer: 'ότι', accept: ['πως'], choices: ['ότι', 'που', 'πού', 'γιατί'], en: 'I think that it will rain tomorrow.', hint: 'after “I think” — reported' },
      { text: 'Χαίρομαι {b} σε βλέπω.', answer: 'που', choices: ['ότι', 'που', 'πως', 'γιατί'], en: 'I’m glad (that) I see you.', hint: 'after an emotion verb' },
      { text: 'Ο άντρας {b} έφυγε είναι ο Γιώργος.', answer: 'που', choices: ['ότι', 'που', 'πως', 'ποιος'], en: 'The man who left is George.', hint: 'after a noun = who/which' },
      { text: 'Ξέρω {b} έχεις δίκιο.', answer: 'ότι', accept: ['πως'], choices: ['ότι', 'που', 'πού', 'αν'], en: 'I know that you are right.', hint: 'after “I know” — reported' },
      { text: 'Λυπάμαι {b} δεν ήρθες.', answer: 'που', choices: ['ότι', 'που', 'πως', 'γιατί'], en: 'I’m sorry that you didn’t come.', hint: 'after an emotion verb' }
    ]
  },

  /* ===================== A2 ===================== */
  {
    id: 'a2-accusative',
    more: '<p>The accusative is also the case every preposition takes — so you’ll use it constantly.</p><ul class="g-tips"><li>After σε, με, για, από, χωρίς: <em>για <strong>την</strong> Άννα</em>, <em>με <strong>τον</strong> φίλο μου</em>.</li><li><strong>σε + article fuses:</strong> σε+τον = <em>στον</em>, σε+την = <em>στην</em>, σε+το = <em>στο</em>.</li><li>Only the <strong>masculine singular</strong> drops its -ς (τον φίλο); the plural keeps it (τους φίλους).</li></ul>',
    level: 'A2',
    title: 'The accusative (object)',
    short: 'The object: τον / την / το, τους / τις / τα — masculine drops its -ς.',
    explanation:
      '<p>The <strong>object</strong> of a sentence (the “side character”, the one acted upon) goes in the accusative. The articles change:</p>' +
      '<div class="g-grid">' +
      '<div class="g-k">masculine</div><div class="g-v"><strong>τον</strong> άντρα → <strong>τους</strong> άντρες</div>' +
      '<div class="g-k">feminine</div><div class="g-v"><strong>την</strong> γυναίκα → <strong>τις</strong> γυναίκες</div>' +
      '<div class="g-k">neuter</div><div class="g-v"><strong>το</strong> παιδί → <strong>τα</strong> παιδιά</div>' +
      '</div>' +
      '<p>Feminine and neuter endings stay the same as the nominative. <strong>Masculine</strong> nouns drop their final <strong>-ς</strong> in the singular: ο φίλο<u>ς</u> → τον φίλο.</p>' +
      '<p><em>Ο Νίκος αγαπάει την Μαρία.</em> = Nick loves Maria.</p>',
    examples: [
      { gr: 'Βλέπω τον φίλο μου.', en: 'I see my friend (m).' },
      { gr: 'Ξέρω την αλήθεια.', en: 'I know the truth.' },
      { gr: 'Αγαπάμε τα παιδιά.', en: 'We love the children.' }
    ],
    items: [
      { text: 'Βλέπω {b} άντρα.', answer: 'τον', choices: ['ο', 'τον', 'του', 'την'], en: 'I see the man.', hint: 'object · masculine' },
      { text: 'Ο Νίκος αγαπάει {b} Μαρία.', answer: 'την', choices: ['η', 'την', 'της', 'τον'], en: 'Nick loves Maria.', hint: 'object · feminine' },
      { text: 'Διαβάζω {b} βιβλίο.', answer: 'το', choices: ['το', 'τον', 'του', 'τα'], en: 'I am reading the book.', hint: 'object · neuter' },
      { text: 'Καλώ {b} φίλους μου.', answer: 'τους', choices: ['οι', 'τους', 'των', 'τις'], en: 'I am inviting my friends.', hint: 'object · masculine plural' },
      { text: 'Ο φίλος → Βλέπω {b}.', answer: 'τον φίλο', accept: ['το φιλο', 'τον φιλο'], choices: ['τον φίλο', 'ο φίλος', 'του φίλου', 'τον φίλος'], en: 'the friend → I see the friend.', hint: 'make it accusative (drop the -ς)' },
      { text: 'Αγαπάμε {b} γυναίκες.', answer: 'τις', choices: ['οι', 'τις', 'των', 'τους'], en: 'We love the women.', hint: 'object · feminine plural' }
    ]
  },
  {
    id: 'a2-genitive',
    more: '<p>Genitive endings vary more than the others — learn them per noun pattern.</p><ul class="g-tips"><li>The plural article is always <strong>των</strong>, with the noun ending in -ων: <em>των παιδιών, των γυναικών</em>.</li><li>Used for possession, for time expressions, and after some prepositions in set phrases.</li><li><strong>Word order:</strong> possession first, owner second — <em>το κλειδί <strong>του σπιτιού</strong></em>.</li></ul>',
    level: 'A2',
    title: 'The genitive (possession)',
    short: 'Who owns it: του / της / του, των. Possession first, owner second.',
    explanation:
      '<p>The <strong>genitive</strong> marks the owner — English “Maria’s…” or “…of Maria”. The article and the noun ending both change:</p>' +
      '<div class="g-grid">' +
      '<div class="g-k">masculine</div><div class="g-v"><strong>του</strong> άντρα → <strong>των</strong> ανδρών</div>' +
      '<div class="g-k">feminine</div><div class="g-v"><strong>της</strong> γυναίκας → <strong>των</strong> γυναικών</div>' +
      '<div class="g-k">neuter</div><div class="g-v"><strong>του</strong> παιδιού → <strong>των</strong> παιδιών</div>' +
      '</div>' +
      '<p>Word order: <strong>possession first, owner second</strong>: <em>η τσάντα της Μαρίας</em> = Maria’s bag (lit. “the bag of-Maria”). Proper names also change: ο Νίκος → του Νίκου, η Μαρία → της Μαρίας.</p>',
    examples: [
      { gr: 'το κινητό του Νίκου', en: 'Nick’s phone' },
      { gr: 'η τσάντα της Μαρίας', en: 'Maria’s bag' },
      { gr: 'το κλειδί της πόρτας', en: 'the door’s key' }
    ],
    items: [
      { text: 'το αυτοκίνητο {b} άντρα', answer: 'του', choices: ['ο', 'τον', 'του', 'των'], en: 'the man’s car', hint: 'owner · masculine' },
      { text: 'η τσάντα {b} Μαρίας', answer: 'της', choices: ['η', 'την', 'της', 'των'], en: 'Maria’s bag', hint: 'owner · feminine' },
      { text: 'το κλειδί {b} σπιτιού', answer: 'του', choices: ['το', 'του', 'των', 'της'], en: 'the house’s key', hint: 'owner · neuter' },
      { text: 'τα προβλήματα {b} ανθρώπων', answer: 'των', choices: ['οι', 'τους', 'των', 'τις'], en: 'people’s problems', hint: 'owner · plural' },
      { text: 'το κινητό {b} (ο Νίκος)', answer: 'του Νίκου', accept: ['του νικου'], choices: ['του Νίκου', 'ο Νίκος', 'τον Νίκο', 'των Νίκων'], en: 'Nick’s phone', hint: 'make “ο Νίκος” genitive' }
    ]
  },
  {
    id: 'a2-aorist',
    more: '<p>The endings are universal; it’s the <em>stem</em> that’s the work.</p><ul class="g-tips"><li>The augment <strong>έ-</strong> appears only to carry the stress (third syllable from the end). It drops in 1pl/2pl: <em>έγραψα</em> but <em>γράψαμε</em>.</li><li>Many high-frequency verbs are <strong>irregular</strong> and must be memorised: πάω→<em>πήγα</em>, λέω→<em>είπα</em>, βλέπω→<em>είδα</em>, τρώω→<em>έφαγα</em>, πίνω→<em>ήπια</em>.</li><li>This is the “one-off / completed” past — for repeated or ongoing past use the παρατατικός.</li></ul>',
    level: 'A2',
    title: 'Simple past (αόριστος)',
    short: 'One set of endings for all verbs: -α, -ες, -ε, -αμε, -ατε, -αν.',
    explanation:
      '<p>The simple past (αόριστος) describes a finished, one-off action. The good news: <strong>one set of endings for every verb</strong>:</p>' +
      '<div class="g-grid">' +
      '<div class="g-k">εγώ</div><div class="g-v">έγραψ<strong>α</strong></div>' +
      '<div class="g-k">εσύ</div><div class="g-v">έγραψ<strong>ες</strong></div>' +
      '<div class="g-k">αυτός/ή/ό</div><div class="g-v">έγραψ<strong>ε</strong></div>' +
      '<div class="g-k">εμείς</div><div class="g-v">γράψ<strong>αμε</strong></div>' +
      '<div class="g-k">εσείς</div><div class="g-v">γράψ<strong>ατε</strong></div>' +
      '<div class="g-k">αυτοί/ές/ά</div><div class="g-v">έγραψ<strong>αν</strong></div>' +
      '</div>' +
      '<p>Forming the past stem from the present: the final consonant shifts —<br>' +
      'β / φ / π / εύ → <strong>ψ</strong> (γράφω → έγραψα), κ / γ / χ / χν → <strong>ξ</strong> (τρέχω → έτρεξα), τ / δ / θ / ζ / σ → <strong>σ</strong> (διαβάζω → διάβασα).</p>' +
      '<p>Add an augment <strong>έ-</strong> at the front when the word would be too short, so the stress can sit three syllables from the end: <em>έγραψα</em>, but <em>γράψαμε</em> (no augment, the ending already adds a syllable).</p>',
    examples: [
      { gr: 'Χθες έγραψα ένα γράμμα.', en: 'Yesterday I wrote a letter.' },
      { gr: 'Διάβασες το βιβλίο;', en: 'Did you read the book?' },
      { gr: 'Έτρεξαν στο σχολείο.', en: 'They ran to school.' }
    ],
    items: [
      { text: 'Χθες εγώ {b} ένα γράμμα. (γράφω)', answer: 'έγραψα', choices: ['έγραψα', 'έγραψες', 'γράψαμε', 'έγραφα'], en: 'Yesterday I wrote a letter.', hint: 'write · past · εγώ' },
      { text: 'Εσύ {b} το βιβλίο; (διαβάζω)', answer: 'διάβασες', choices: ['διάβασα', 'διάβασες', 'διαβάσαμε', 'διάβαζες'], en: 'Did you read the book?', hint: 'read · past · εσύ' },
      { text: 'Η Άννα {b} ένα μήλο. (τρώω → έφαγα)', answer: 'έφαγε', choices: ['έφαγα', 'έφαγες', 'έφαγε', 'έφαγαν'], en: 'Anna ate an apple.', hint: 'eat · past · she' },
      { text: 'Εμείς {b} στο σχολείο. (τρέχω)', answer: 'τρέξαμε', choices: ['έτρεξα', 'έτρεξες', 'τρέξαμε', 'έτρεξαν'], en: 'We ran to school.', hint: 'run · past · εμείς' },
      { text: 'Τα παιδιά {b} όλη μέρα. (παίζω)', answer: 'έπαιξαν', choices: ['έπαιξα', 'παίξαμε', 'έπαιξαν', 'έπαιζαν'], en: 'The children played all day.', hint: 'play · past · they' }
    ]
  },
  {
    id: 'a2-future-simple',
    more: '<p>θα carries the future; the stem decides one-off vs ongoing.</p><ul class="g-tips"><li><em>θα γράψω</em> (once) vs <em>θα γράφω</em> (will be writing / repeatedly).</li><li>Negative: <strong>δεν θα</strong> + verb: <em>Δεν θα έρθω.</em></li><li>θα also expresses likelihood: <em>Θα είναι σπίτι τώρα.</em> = He’s probably home now.</li></ul>',
    level: 'A2',
    title: 'Simple future (θα + past stem)',
    short: 'θα + the past stem + present endings: θα γράψω.',
    explanation:
      '<p>For a one-off future action, take <strong>θα</strong> + the <strong>past (aorist) stem</strong> + the <strong>present endings</strong>:</p>' +
      '<div class="g-grid">' +
      '<div class="g-k">εγώ</div><div class="g-v">θα γράψ<strong>ω</strong></div>' +
      '<div class="g-k">εσύ</div><div class="g-v">θα γράψ<strong>εις</strong></div>' +
      '<div class="g-k">αυτός/ή/ό</div><div class="g-v">θα γράψ<strong>ει</strong></div>' +
      '<div class="g-k">εμείς</div><div class="g-v">θα γράψ<strong>ουμε</strong></div>' +
      '<div class="g-k">εσείς</div><div class="g-v">θα γράψ<strong>ετε</strong></div>' +
      '<div class="g-k">αυτοί/ές/ά</div><div class="g-v">θα γράψ<strong>ουν</strong></div>' +
      '</div>' +
      '<p>So it’s the aorist stem (γραψ-, διαβασ-, τρεξ-) but with present endings, all after θα. Contrast: <em>θα γράφω</em> (continuous, “I’ll be writing”) vs <em>θα γράψω</em> (one-off, “I’ll write”).</p>',
    examples: [
      { gr: 'Αύριο θα γράψω ένα email.', en: 'Tomorrow I’ll write an email.' },
      { gr: 'Θα διαβάσεις το βιβλίο;', en: 'Will you read the book?' },
      { gr: 'Θα φάμε στις οκτώ.', en: 'We’ll eat at eight.' }
    ],
    items: [
      { text: 'Αύριο {b} ένα γράμμα. (γράφω)', answer: 'θα γράψω', accept: ['θα γραψω'], choices: ['θα γράψω', 'θα γράφω', 'έγραψα', 'θα γράψεις'], en: 'Tomorrow I’ll write a letter.', hint: 'future simple · εγώ' },
      { text: 'Εσύ {b} το βιβλίο; (διαβάζω)', answer: 'θα διαβάσεις', accept: ['θα διαβασεις'], choices: ['θα διαβάσεις', 'θα διαβάζεις', 'διάβασες', 'θα διαβάσω'], en: 'Will you read the book?', hint: 'future simple · εσύ' },
      { text: 'Ο Γιώργος {b} αργότερα. (τηλεφωνώ → τηλεφώνησα)', answer: 'θα τηλεφωνήσει', accept: ['θα τηλεφωνησει'], choices: ['θα τηλεφωνήσει', 'θα τηλεφωνεί', 'τηλεφώνησε', 'θα τηλεφωνήσω'], en: 'George will phone later.', hint: 'future simple · he' },
      { text: 'Εμείς {b} στις οκτώ. (τρώω → έφαγα)', answer: 'θα φάμε', accept: ['θα φαμε'], choices: ['θα φάμε', 'θα τρώμε', 'φάγαμε', 'θα φάει'], en: 'We’ll eat at eight.', hint: 'future simple · εμείς' }
    ]
  },
  {
    id: 'a2-negation',
    more: '<p>Two negators, used in different places.</p><ul class="g-tips"><li><strong>δεν</strong> negates ordinary (indicative) verbs; <strong>μην</strong> goes with commands, after να, and after πριν / χωρίς να.</li><li>Greek uses <strong>double negatives</strong>: <em>Δεν ξέρω <strong>τίποτα</strong></em>, <em>Δεν ήρθε <strong>κανείς</strong></em>.</li><li><em>όχι</em> means “no” on its own — don’t use it to negate a verb.</li></ul>',
    level: 'A2',
    title: 'Negation: δεν and μην',
    short: 'δεν before normal verbs; μην in commands and after να.',
    explanation:
      '<p>To make a verb negative, put <strong>δεν</strong> right before it: <em>Δεν ξέρω.</em> = I don’t know.</p>' +
      '<p>Use <strong>μην</strong> instead for negative commands and after <strong>να</strong>: <em>Μην το κάνεις!</em> = Don’t do it! · <em>Θέλω να μην αργήσεις.</em> = I want you not to be late.</p>' +
      '<p>Greek happily uses double negatives: <em>Δεν ξέρω τίποτα.</em> = I don’t know anything (lit. “nothing”).</p>',
    examples: [
      { gr: 'Δεν μιλάω ιταλικά.', en: 'I don’t speak Italian.' },
      { gr: 'Μην ανησυχείς.', en: 'Don’t worry.' },
      { gr: 'Δεν ήρθε κανείς.', en: 'Nobody came.' }
    ],
    items: [
      { text: '{b} ξέρω την απάντηση.', answer: 'Δεν', choices: ['Δεν', 'Μην', 'Όχι', 'Ούτε'], en: 'I don’t know the answer.', hint: 'negate a normal verb' },
      { text: '{b} ανησυχείς! (command)', answer: 'Μην', choices: ['Δεν', 'Μην', 'Όχι', 'Να'], en: 'Don’t worry!', hint: 'negative command' },
      { text: 'Θέλω να {b} αργήσεις.', answer: 'μην', choices: ['δεν', 'μην', 'όχι', 'να'], en: 'I want you not to be late.', hint: 'negative after να' },
      { text: '{b} πειράζει.', answer: 'Δεν', choices: ['Δεν', 'Μην', 'Όχι', 'Ούτε'], en: 'It doesn’t matter.', hint: 'negate a normal verb' }
    ]
  },

  /* ===================== B1 ===================== */
  {
    id: 'b1-subjunctive',
    more: '<p>να is how Greek joins two verbs where English would use “to …”.</p><ul class="g-tips"><li>The verb after να takes the same one-off/ongoing choice as the future: <em>να φύγω</em> (leave, once) vs <em>να φεύγω</em> (be leaving).</li><li>The negative is <strong>μην</strong>: <em>Σου λέω να <strong>μην</strong> αργήσεις.</em></li><li>Common triggers: θέλω, μπορώ, πρέπει, ξέρω, ας, για να.</li><li>The two verbs can have <strong>different subjects</strong>: <em>Θέλω να φας</em> = I want <em>you</em> to eat.</li></ul>',
    level: 'B1',
    title: 'The subjunctive with να',
    short: 'να links two verbs: θέλω να φύγω (I want to leave).',
    explanation:
      '<p>Greek has no infinitive (“to leave”). Instead it uses <strong>να + a conjugated verb</strong>, matching the subject. The verb after να takes the same simple/continuous distinction as the future:</p>' +
      '<p><em>Θέλω <strong>να φύγω</strong>.</em> = I want to leave. · <em>Μπορείς <strong>να με βοηθήσεις</strong>;</em> = Can you help me?</p>' +
      '<p>Both verbs agree with their own subject: <em>Θέλω να <strong>φας</strong>.</em> = I want <strong>you</strong> to eat (θέλω = I, φας = you).</p>' +
      '<p>να also expresses “let’s / should”: <em>Να πάμε;</em> = Shall we go?</p>',
    examples: [
      { gr: 'Θέλω να μάθω ελληνικά.', en: 'I want to learn Greek.' },
      { gr: 'Πρέπει να φύγω τώρα.', en: 'I have to leave now.' },
      { gr: 'Μπορείς να με βοηθήσεις;', en: 'Can you help me?' }
    ],
    items: [
      { text: 'Θέλω να {b} ελληνικά. (μαθαίνω → έμαθα)', answer: 'μάθω', choices: ['μάθω', 'μαθαίνω', 'έμαθα', 'μάθεις'], en: 'I want to learn Greek.', hint: 'after να · εγώ · one-off' },
      { text: 'Πρέπει να {b} τώρα. (φεύγω → έφυγα)', answer: 'φύγω', choices: ['φύγω', 'φεύγω', 'έφυγα', 'φύγεις'], en: 'I have to leave now.', hint: 'after να · εγώ' },
      { text: 'Μπορείς να με {b}; (βοηθάω → βοήθησα)', answer: 'βοηθήσεις', choices: ['βοηθήσεις', 'βοηθάς', 'βοήθησες', 'βοηθήσω'], en: 'Can you help me?', hint: 'after να · εσύ' },
      { text: 'Θέλω να {b} κι εσύ. (τρώω → έφαγα)', answer: 'φας', choices: ['φας', 'φάω', 'τρως', 'έφαγες'], en: 'I want you to eat too.', hint: 'after να · subject is εσύ' }
    ]
  },
  {
    id: 'b1-imperative',
    more: '<p>Positive commands come from the aorist stem; negatives don’t use this form at all.</p><ul class="g-tips"><li><strong>Negative command = μη(ν) + present/subjunctive</strong>, never the imperative: <em>Μην τρέχεις!</em></li><li>Pronouns attach <strong>after</strong>: <em>Πες <strong>μου</strong>! · Δώσ’ <strong>το</strong> μου!</em></li><li>Learn the common irregulars: έλα, πες, φάε, πιες, δες, μπες, ανέβα, κάτσε.</li></ul>',
    level: 'B1',
    title: 'The imperative (commands)',
    short: 'From the past stem: γράψε! (sing.), γράψτε! (pl.).',
    explanation:
      '<p>To give a command, build from the <strong>past (aorist) stem</strong> and add:</p>' +
      '<div class="g-grid">' +
      '<div class="g-k">singular</div><div class="g-v">γράψ<strong>ε</strong>! · διάβασ<strong>ε</strong>!</div>' +
      '<div class="g-k">plural / polite</div><div class="g-v">γράψ<strong>τε</strong>! · διαβάσ<strong>τε</strong>!</div>' +
      '</div>' +
      '<p>For a negative command, use <strong>μην + the present or subjunctive</strong>, not the imperative form: <em>Μην τρέχεις!</em> = Don’t run!</p>' +
      '<p>Common irregulars: έλα! (come!), πες! (say!), φάε! (eat!), πιες! (drink!).</p>',
    examples: [
      { gr: 'Γράψε το όνομά σου.', en: 'Write your name.' },
      { gr: 'Διαβάστε την πρόταση.', en: 'Read the sentence. (pl.)' },
      { gr: 'Μην το ξεχάσεις!', en: 'Don’t forget it!' }
    ],
    items: [
      { text: '{b} το όνομά σου! (γράφω → έγραψα, singular)', answer: 'Γράψε', choices: ['Γράψε', 'Γράψτε', 'Γράφε', 'Γράψεις'], en: 'Write your name!', hint: 'command · singular' },
      { text: '{b} την πρόταση! (διαβάζω, plural)', answer: 'Διαβάστε', choices: ['Διάβασε', 'Διαβάστε', 'Διαβάζετε', 'Διαβάσετε'], en: 'Read the sentence! (pl.)', hint: 'command · plural' },
      { text: '{b} εδώ! (come, singular)', answer: 'Έλα', choices: ['Έλα', 'Ελάτε', 'Έρχεσαι', 'Ήρθες'], en: 'Come here!', hint: 'irregular command · singular' },
      { text: '{b} τρέχεις στον δρόμο! (negative)', answer: 'Μην', choices: ['Μην', 'Δεν', 'Όχι', 'Να'], en: 'Don’t run in the street!', hint: 'negative command' }
    ]
  },
  {
    id: 'b1-past-continuous',
    more: '<p>This is the “setting the scene” past — duration, habit, or background.</p><ul class="g-tips"><li><strong>Aorist vs παρατατικός:</strong> <em>έγραψα</em> = I wrote (and finished) · <em>έγραφα</em> = I was writing / used to write.</li><li>Often the background to an aorist event: <em>Διάβαζα όταν <strong>χτύπησε</strong> το τηλέφωνο.</em></li><li>B-group verbs take <strong>-ούσα</strong>: αγαπάω → αγαπούσα, μπορώ → μπορούσα.</li><li>Time cues: κάθε μέρα, συνέχεια, πάντα, όταν ήμουν παιδί.</li></ul>',
    level: 'B1',
    title: 'Past continuous (παρατατικός)',
    short: 'Repeated/ongoing past: present stem + past endings — έγραφα.',
    explanation:
      '<p>The παρατατικός is the “used-to / was-doing” past — repeated or ongoing actions. Take the <strong>present stem</strong> and add the <strong>past endings</strong> (+ augment when needed):</p>' +
      '<div class="g-grid">' +
      '<div class="g-k">Group A</div><div class="g-v">γράφω → <strong>έγραφα</strong> (I was writing)</div>' +
      '<div class="g-k">Group B (-άω/-ώ)</div><div class="g-v">αγαπάω → <strong>αγαπούσα</strong></div>' +
      '</div>' +
      '<p>Key contrast with the simple past: <em>έγραψα</em> = I wrote (once), <em>έγραφα</em> = I was writing / used to write. Time cues for παρατατικός: κάθε μέρα, συνέχεια, όταν ήμουν παιδί, πάντα.</p>',
    examples: [
      { gr: 'Όταν ήμουν παιδί, έπαιζα κάθε μέρα.', en: 'When I was a child, I played every day.' },
      { gr: 'Διάβαζε όταν χτύπησε το τηλέφωνο.', en: 'He was reading when the phone rang.' },
      { gr: 'Κάθε καλοκαίρι πηγαίναμε στο χωριό.', en: 'Every summer we used to go to the village.' }
    ],
    items: [
      { text: 'Όταν ήμουν παιδί, {b} κάθε μέρα. (παίζω)', answer: 'έπαιζα', choices: ['έπαιζα', 'έπαιξα', 'παίζω', 'έπαιζες'], en: 'When I was a child, I played every day.', hint: 'past continuous · εγώ' },
      { text: 'Ο Νίκος {b} όταν χτύπησε το τηλέφωνο. (διαβάζω)', answer: 'διάβαζε', choices: ['διάβαζε', 'διάβασε', 'διαβάζει', 'διάβαζα'], en: 'Nick was reading when the phone rang.', hint: 'past continuous · he' },
      { text: 'Κάθε καλοκαίρι {b} στο χωριό. (πηγαίνω → πήγαινα)', answer: 'πηγαίναμε', choices: ['πηγαίναμε', 'πήγαμε', 'πηγαίνουμε', 'πήγαιναν'], en: 'Every summer we used to go to the village.', hint: 'past continuous · εμείς' },
      { text: 'Παλιά εγώ {b} πολύ. (αγαπάω → αγαπούσα)', answer: 'αγαπούσα', choices: ['αγαπούσα', 'αγάπησα', 'αγαπάω', 'αγαπούσες'], en: 'In the past I used to love a lot.', hint: 'past continuous · εγώ · B group' }
    ]
  },
  {
    id: 'b1-comparatives',
    more: '<p>πιο works for everything; the -τερος forms are common but optional.</p><ul class="g-tips"><li>“than” is <strong>από</strong> (+ accusative): <em>πιο ψηλός <strong>από</strong> τον Νίκο</em>.</li><li>Learn the irregulars: καλός→<strong>καλύτερος</strong>, κακός→<strong>χειρότερος</strong>, μεγάλος→μεγαλύτερος, μικρός→μικρότερος, πολύς→περισσότερος.</li><li>“as … as” = <em>τόσο … όσο</em>: <em>τόσο ψηλός όσο εσύ</em>.</li></ul>',
    level: 'B1',
    title: 'Comparatives & superlatives',
    short: 'πιο + adjective + από; ο πιο… for the superlative.',
    explanation:
      '<p>The easy way to compare is <strong>πιο</strong> (“more”) + adjective, with <strong>από</strong> for “than”:</p>' +
      '<p><em>Η Άννα είναι <strong>πιο ψηλή από</strong> τον Νίκο.</em> = Anna is taller than Nick.</p>' +
      '<p>For the superlative, add the article: <strong>ο/η/το πιο</strong> + adjective: <em>ο πιο ψηλός</em> = the tallest. There’s also a one-word form in <strong>-τερος</strong> (μεγάλος → μεγαλύτερος = bigger), but πιο works everywhere.</p>' +
      '<p>Irregular but very common: καλός → <strong>καλύτερος</strong> (better), κακός → <strong>χειρότερος</strong> (worse).</p>',
    examples: [
      { gr: 'Αυτό είναι πιο ακριβό από εκείνο.', en: 'This is more expensive than that.' },
      { gr: 'Είναι ο πιο καλός μου φίλος.', en: 'He is my best friend.' },
      { gr: 'Σήμερα κάνει χειρότερο καιρό.', en: 'Today the weather is worse.' }
    ],
    items: [
      { text: 'Η Άννα είναι {b} ψηλή από τον Νίκο.', answer: 'πιο', choices: ['πιο', 'πολύ', 'από', 'το'], en: 'Anna is taller than Nick.', hint: '“more” for comparison' },
      { text: 'Αυτό είναι πιο ακριβό {b} εκείνο.', answer: 'από', choices: ['από', 'που', 'σαν', 'και'], en: 'This is more expensive than that.', hint: '“than”' },
      { text: 'Είναι ο πιο {b} μου φίλος.', answer: 'καλός', choices: ['καλός', 'καλά', 'καλύτερα', 'πολύ'], en: 'He is my best friend.', hint: 'adjective after “ο πιο”' },
      { text: 'Το ελληνικό φαγητό είναι {b} από το αγγλικό. (better)', answer: 'καλύτερο', choices: ['καλύτερο', 'πιο καλό', 'καλό', 'χειρότερο'], en: 'Greek food is better than English.', hint: 'irregular: better (neuter)' }
    ]
  },
  {
    id: 'b1-conjunctions',
    more: '<p>Most linkers take a normal (indicative) verb — but purpose and result take the subjunctive.</p><ul class="g-tips"><li>όταν, αν, γιατί, ενώ, που → indicative. <strong>για να / ώστε να → subjunctive.</strong></li><li><em>γιατί</em> does double duty: “why?” and “because”. <em>επειδή</em> only means “because” (safe at the start of a sentence).</li><li>μόλις = “as soon as”; όταν = “when” (more general).</li></ul>',
    level: 'B1',
    title: 'Linking words (όταν, αν, γιατί, ενώ)',
    short: 'when / if / because / while — joining clauses.',
    explanation:
      '<p>Common conjunctions for joining ideas:</p>' +
      '<div class="g-grid">' +
      '<div class="g-k">όταν</div><div class="g-v">when</div>' +
      '<div class="g-k">αν</div><div class="g-v">if</div>' +
      '<div class="g-k">γιατί / επειδή</div><div class="g-v">because</div>' +
      '<div class="g-k">ενώ</div><div class="g-v">while / whereas</div>' +
      '<div class="g-k">αλλά / όμως</div><div class="g-v">but</div>' +
      '<div class="g-k">ώστε / για να</div><div class="g-v">so that / in order to</div>' +
      '</div>' +
      '<p>Note: <strong>γιατί</strong> both asks “why?” and answers “because”. <strong>επειδή</strong> only means “because” and is safer at the start of a sentence.</p>',
    examples: [
      { gr: 'Θα έρθω αν έχω χρόνο.', en: 'I’ll come if I have time.' },
      { gr: 'Έμεινα σπίτι γιατί έβρεχε.', en: 'I stayed home because it was raining.' },
      { gr: 'Όταν ήρθες, κοιμόμουν.', en: 'When you came, I was sleeping.' }
    ],
    items: [
      { text: 'Θα έρθω {b} έχω χρόνο.', answer: 'αν', choices: ['αν', 'όταν', 'γιατί', 'ενώ'], en: 'I’ll come if I have time.', hint: 'condition: if' },
      { text: 'Έμεινα σπίτι {b} έβρεχε.', answer: 'γιατί', accept: ['επειδή'], choices: ['γιατί', 'αν', 'όταν', 'αλλά'], en: 'I stayed home because it was raining.', hint: 'reason: because' },
      { text: '{b} ήρθες, κοιμόμουν.', answer: 'Όταν', choices: ['Όταν', 'Αν', 'Γιατί', 'Ενώ'], en: 'When you came, I was sleeping.', hint: 'time: when' },
      { text: 'Θέλω να έρθω, {b} δεν μπορώ.', answer: 'αλλά', accept: ['όμως'], choices: ['αλλά', 'και', 'γιατί', 'όταν'], en: 'I want to come, but I can’t.', hint: 'contrast: but' }
    ]
  },

  /* ===================== B2 ===================== */
  {
    id: 'b2-mediopassive',
    more: '<p>These verbs only exist in the middle voice — there’s no active “*έρχω”.</p><ul class="g-tips"><li>Their aorist usually ends <strong>-θηκα</strong>: ντύνομαι → <em>ντύθηκα</em>, σκέφτομαι → <em>σκέφτηκα</em>.</li><li>A few have active meaning despite the form: έρχομαι (come), κάθομαι (sit), γίνομαι (become).</li><li>Don’t confuse a deponent (κοιμάμαι) with the passive of an active verb — the endings look similar but the meaning differs.</li></ul>',
    level: 'B2',
    title: 'Mediopassive verbs (-ομαι / -άμαι)',
    short: 'Middle-voice present: -ομαι, -εσαι, -εται, -όμαστε, -εστε, -ονται.',
    explanation:
      '<p>Many everyday verbs only exist in the middle voice, ending in <strong>-ομαι</strong> (or -άμαι). Their present endings are their own:</p>' +
      '<div class="g-grid">' +
      '<div class="g-k">εγώ</div><div class="g-v">έρχ<strong>ομαι</strong> · κοιμ<strong>άμαι</strong></div>' +
      '<div class="g-k">εσύ</div><div class="g-v">έρχ<strong>εσαι</strong> · κοιμ<strong>άσαι</strong></div>' +
      '<div class="g-k">αυτός/ή/ό</div><div class="g-v">έρχ<strong>εται</strong> · κοιμ<strong>άται</strong></div>' +
      '<div class="g-k">εμείς</div><div class="g-v">ερχ<strong>όμαστε</strong> · κοιμ<strong>όμαστε</strong></div>' +
      '<div class="g-k">εσείς</div><div class="g-v">έρχ<strong>εστε</strong> · κοιμ<strong>άστε</strong></div>' +
      '<div class="g-k">αυτοί/ές/ά</div><div class="g-v">έρχ<strong>ονται</strong> · κοιμ<strong>ούνται</strong></div>' +
      '</div>' +
      '<p>Like this: έρχομαι, σκέφτομαι, αισθάνομαι, θυμάμαι, φοβάμαι, γίνομαι.</p>',
    examples: [
      { gr: 'Έρχομαι αμέσως.', en: 'I’m coming right away.' },
      { gr: 'Τι σκέφτεσαι;', en: 'What are you thinking?' },
      { gr: 'Φοβάται το σκοτάδι.', en: 'He’s afraid of the dark.' }
    ],
    items: [
      { text: 'Εγώ {b} αμέσως. (έρχομαι)', answer: 'έρχομαι', choices: ['έρχομαι', 'έρχεσαι', 'ερχόμαστε', 'έρχονται'], en: 'I’m coming right away.', hint: 'come · εγώ' },
      { text: 'Εσύ τι {b}; (σκέφτομαι)', answer: 'σκέφτεσαι', choices: ['σκέφτομαι', 'σκέφτεσαι', 'σκέφτεται', 'σκεφτόμαστε'], en: 'What are you thinking?', hint: 'think · εσύ' },
      { text: 'Ο Νίκος {b} νωρίς. (κοιμάμαι)', answer: 'κοιμάται', choices: ['κοιμάμαι', 'κοιμάσαι', 'κοιμάται', 'κοιμούνται'], en: 'Nick sleeps early.', hint: 'sleep · he' },
      { text: 'Εμείς {b} καλά εδώ. (αισθάνομαι)', answer: 'αισθανόμαστε', choices: ['αισθάνομαι', 'αισθάνεσαι', 'αισθανόμαστε', 'αισθάνονται'], en: 'We feel good here.', hint: 'feel · εμείς' },
      { text: 'Τα παιδιά {b} το σκοτάδι. (φοβάμαι)', answer: 'φοβούνται', choices: ['φοβάμαι', 'φοβάται', 'φοβόμαστε', 'φοβούνται'], en: 'The children are afraid of the dark.', hint: 'fear · they' }
    ]
  },
  {
    id: 'b2-conditional',
    more: '<p>Match the tenses to how real the condition is.</p><ul class="g-tips"><li><strong>Real / likely:</strong> αν + present, θα + future — <em>Αν έχω χρόνο, θα έρθω.</em></li><li><strong>Unreal (now):</strong> αν + παρατατικός, θα + παρατατικός — <em>Αν είχα χρόνο, θα ερχόμουν.</em></li><li><strong>Unreal (past):</strong> αν + υπερσυντέλικος, θα + παρατατικός — <em>Αν είχα φύγει νωρίτερα…</em></li><li>The if-clause never takes θα.</li></ul>',
    level: 'B2',
    title: 'Conditional (αν + θα + παρατατικός)',
    short: 'Unreal “if”: Αν είχα λεφτά, θα ταξίδευα.',
    explanation:
      '<p>For an unreal or hypothetical situation (“if I were… I would…”), use <strong>αν + past continuous</strong> in the if-clause and <strong>θα + past continuous</strong> in the result:</p>' +
      '<p><em>Αν <strong>είχα</strong> λεφτά, <strong>θα ταξίδευα</strong>.</em> = If I had money, I would travel.</p>' +
      '<p><em>Αν <strong>ήμουν</strong> εσύ, <strong>θα έφευγα</strong>.</em> = If I were you, I would leave.</p>' +
      '<p>Compare with a real/open condition, which uses the present/future: <em>Αν έχω χρόνο, θα έρθω.</em> = If I have time, I’ll come.</p>',
    examples: [
      { gr: 'Αν είχα χρόνο, θα διάβαζα.', en: 'If I had time, I would read.' },
      { gr: 'Αν ήμουν πλούσιος, θα ταξίδευα.', en: 'If I were rich, I would travel.' },
      { gr: 'Τι θα έκανες αν κέρδιζες;', en: 'What would you do if you won?' }
    ],
    items: [
      { text: 'Αν {b} λεφτά, θα ταξίδευα. (έχω, unreal)', answer: 'είχα', choices: ['είχα', 'έχω', 'θα έχω', 'είχες'], en: 'If I had money, I would travel.', hint: 'if-clause · past continuous · εγώ' },
      { text: 'Αν είχα χρόνο, {b} ένα βιβλίο. (διαβάζω)', answer: 'θα διάβαζα', accept: ['θα διαβαζα'], choices: ['θα διάβαζα', 'διαβάζω', 'θα διαβάσω', 'διάβασα'], en: 'If I had time, I would read a book.', hint: 'result · θα + past continuous' },
      { text: 'Αν {b} εσύ, θα έφευγα. (είμαι)', answer: 'ήμουν', choices: ['ήμουν', 'είμαι', 'θα είμαι', 'ήσουν'], en: 'If I were you, I would leave.', hint: 'if-clause · “were”' },
      { text: 'Τι {b} αν κέρδιζες το λαχείο; (κάνω)', answer: 'θα έκανες', accept: ['θα εκανες'], choices: ['θα έκανες', 'κάνεις', 'θα κάνεις', 'έκανες'], en: 'What would you do if you won the lottery?', hint: 'result · θα + past continuous · εσύ' }
    ]
  },
  {
    id: 'b2-gerund',
    more: '<p>One invariable form for “while / by doing”.</p><ul class="g-tips"><li>Only for the <strong>same subject</strong> and a <strong>simultaneous</strong> action: <em>Ήρθε <strong>τρέχοντας</strong>.</em></li><li>To negate it or change subject, rephrase with <em>χωρίς να</em> or <em>ενώ</em> instead.</li><li>Greek uses it less than English “-ing”; don’t overuse it.</li></ul>',
    level: 'B2',
    title: 'The gerund (-οντας)',
    short: 'While/by doing: τρέχοντας, μιλώντας.',
    explanation:
      '<p>The gerund (present participle) describes a simultaneous action — “while / by doing”. Form it from the <strong>present stem + -οντας</strong> (Group A) or <strong>-ώντας</strong> (Group B):</p>' +
      '<div class="g-grid">' +
      '<div class="g-k">τρέχω</div><div class="g-v">τρέχ<strong>οντας</strong> — running</div>' +
      '<div class="g-k">μιλάω</div><div class="g-v">μιλ<strong>ώντας</strong> — (by) speaking</div>' +
      '<div class="g-k">περπατάω</div><div class="g-v">περπατ<strong>ώντας</strong> — walking</div>' +
      '</div>' +
      '<p>It never changes form. <em>Έφυγε τρέχοντας.</em> = He left running. · <em>Μαθαίνεις μιλώντας.</em> = You learn by speaking.</p>',
    examples: [
      { gr: 'Έφυγε τρέχοντας.', en: 'He left running.' },
      { gr: 'Μαθαίνω ελληνικά μιλώντας.', en: 'I learn Greek by speaking.' },
      { gr: 'Ήρθε χαμογελώντας.', en: 'She came smiling.' }
    ],
    items: [
      { text: 'Έφυγε {b}. (τρέχω)', answer: 'τρέχοντας', choices: ['τρέχοντας', 'τρέχω', 'έτρεξε', 'τρέχωντας'], en: 'He left running.', hint: 'gerund · Group A → -οντας' },
      { text: 'Μαθαίνεις {b}. (μιλάω)', answer: 'μιλώντας', choices: ['μιλώντας', 'μιλάω', 'μιλώ', 'μιλόντας'], en: 'You learn by speaking.', hint: 'gerund · Group B → -ώντας' },
      { text: 'Ήρθε {b} στο πάρτι. (χαμογελάω)', answer: 'χαμογελώντας', choices: ['χαμογελώντας', 'χαμογελάει', 'χαμογέλασε', 'χαμογελόντας'], en: 'She came to the party smiling.', hint: 'gerund · -ώντας' },
      { text: 'Πέρασε την ώρα {b} μουσική. (ακούω)', answer: 'ακούγοντας', choices: ['ακούγοντας', 'ακούω', 'άκουσε', 'ακούοντας'], en: 'He passed the time listening to music.', hint: 'gerund of ακούω (γ inserted)' }
    ]
  },
  {
    id: 'b2-relative-oopoios',
    more: '<p>A precise, formal alternative to που.</p><ul class="g-tips"><li>It <strong>agrees</strong> in gender, number and case, so it can show the role: <em>ο άντρας <strong>του οποίου</strong> το αυτοκίνητο…</em> (whose car…).</li><li><em>που</em> is indeclinable and far more common in speech; <em>ο οποίος</em> is written/formal or used to avoid ambiguity.</li><li>In everyday Greek, prefer που unless clarity demands ο οποίος.</li></ul>',
    level: 'B2',
    title: 'Relative “ο οποίος” (formal which/who)',
    short: 'Formal alternative to που, agreeing in gender, number, case.',
    explanation:
      '<p>Beyond the all-purpose <strong>που</strong>, more formal Greek uses <strong>ο οποίος / η οποία / το οποίο</strong> (“who / which”). Unlike που, it <strong>agrees</strong> with the noun in gender, number and case:</p>' +
      '<div class="g-grid">' +
      '<div class="g-k">masculine</div><div class="g-v">ο άντρας <strong>ο οποίος</strong>…</div>' +
      '<div class="g-k">feminine</div><div class="g-v">η γυναίκα <strong>η οποία</strong>…</div>' +
      '<div class="g-k">neuter</div><div class="g-v">το παιδί <strong>το οποίο</strong>…</div>' +
      '</div>' +
      '<p>It’s interchangeable with που in most cases but sounds more formal/written: <em>Ο άντρας <strong>που / ο οποίος</strong> ήρθε…</em> = The man who came…</p>',
    examples: [
      { gr: 'Η γυναίκα η οποία μιλάει είναι η δασκάλα.', en: 'The woman who is speaking is the teacher.' },
      { gr: 'Το βιβλίο το οποίο διάβασα ήταν καλό.', en: 'The book which I read was good.' },
      { gr: 'Οι φίλοι οι οποίοι ήρθαν…', en: 'The friends who came…' }
    ],
    items: [
      { text: 'Ο άντρας {b} ήρθε είναι ο Γιώργος.', answer: 'ο οποίος', choices: ['ο οποίος', 'η οποία', 'το οποίο', 'οι οποίοι'], en: 'The man who came is George.', hint: 'masculine singular' },
      { text: 'Η γυναίκα {b} μιλάει είναι η δασκάλα.', answer: 'η οποία', choices: ['ο οποίος', 'η οποία', 'το οποίο', 'οι οποίες'], en: 'The woman who is speaking is the teacher.', hint: 'feminine singular' },
      { text: 'Το βιβλίο {b} διάβασα ήταν καλό.', answer: 'το οποίο', choices: ['ο οποίος', 'η οποία', 'το οποίο', 'τα οποία'], en: 'The book which I read was good.', hint: 'neuter singular' },
      { text: 'Οι φίλοι {b} ήρθαν έφυγαν νωρίς.', answer: 'οι οποίοι', choices: ['ο οποίος', 'οι οποίοι', 'οι οποίες', 'τα οποία'], en: 'The friends who came left early.', hint: 'masculine plural' }
    ]
  },
  {
    id: 'b2-purpose',
    more: '<p>Both take the subjunctive (να + verb) but answer different questions.</p><ul class="g-tips"><li><strong>για να</strong> = purpose (“in order to”) — answers <em>why?</em></li><li><strong>ώστε να / έτσι ώστε να</strong> = result (“so that”) — the consequence.</li><li>Don’t confuse <em>για</em> + noun (“for X”) with <em>για να</em> + verb (“in order to …”).</li></ul>',
    level: 'B2',
    title: 'Purpose & result (για να, ώστε να)',
    short: 'για να = in order to; ώστε να = so that (result).',
    explanation:
      '<p><strong>για να</strong> + subjunctive expresses purpose — “in order to / so as to”:</p>' +
      '<p><em>Διαβάζω <strong>για να</strong> μάθω.</em> = I study in order to learn.</p>' +
      '<p><strong>ώστε να</strong> expresses result/consequence — “so that / with the result that”:</p>' +
      '<p><em>Μίλησε δυνατά <strong>ώστε να</strong> τον ακούσουν όλοι.</em> = He spoke loudly so that everyone could hear him.</p>' +
      '<p>Both are followed by the subjunctive (να + conjugated verb). για να is by far the more common in speech.</p>',
    examples: [
      { gr: 'Πάω στο σχολείο για να μάθω.', en: 'I go to school (in order) to learn.' },
      { gr: 'Τρέχω για να προλάβω το λεωφορείο.', en: 'I’m running to catch the bus.' },
      { gr: 'Μίλα σιγά ώστε να μην ξυπνήσεις το μωρό.', en: 'Speak quietly so you don’t wake the baby.' }
    ],
    items: [
      { text: 'Διαβάζω {b} μάθω ελληνικά.', answer: 'για να', choices: ['για να', 'ώστε να', 'επειδή', 'αν'], en: 'I study in order to learn Greek.', hint: 'purpose: in order to' },
      { text: 'Τρέχω {b} προλάβω το λεωφορείο.', answer: 'για να', choices: ['για να', 'ώστε να', 'γιατί', 'όταν'], en: 'I’m running to catch the bus.', hint: 'purpose' },
      { text: 'Μίλησε δυνατά {b} τον ακούσουν όλοι.', answer: 'ώστε να', choices: ['ώστε να', 'για να', 'επειδή', 'αλλά'], en: 'He spoke loudly so that everyone heard him.', hint: 'result: so that' },
      { text: 'Πήγα νωρίς {b} βρω θέση.', answer: 'για να', choices: ['για να', 'ώστε να', 'αν', 'ενώ'], en: 'I went early in order to find a seat.', hint: 'purpose' }
    ]
  }
];

/* Extra, more varied sentences appended to each grammar point (keeps the basics, adds interest). */
(function () {
  var EXTRA = {
    'a1-pronouns-subject': [
      { text: 'Ποιος θέλει τον τελευταίο μπακλαβά; {b}!', answer: 'Εγώ', choices: ['Εγώ', 'Εσύ', 'Αυτός', 'Εμείς'], en: 'Who wants the last baklava? Me!', hint: 'I (emphatic)' },
      { text: '{b} προτιμάς θάλασσα ή βουνό για διακοπές;', answer: 'Εσύ', choices: ['Εγώ', 'Εσύ', 'Αυτή', 'Εσείς'], en: 'Do you prefer sea or mountains for holidays?', hint: 'you (emphatic)' },
      { text: 'Δεν ήρθαν οι άλλοι· στο τέλος μείναμε μόνο {b}.', answer: 'εμείς', choices: ['εγώ', 'εμείς', 'εσείς', 'αυτοί'], en: 'The others didn’t come; in the end only we stayed.', hint: 'we' },
      { text: '{b} δεν καταλαβαίνει γιατί όλοι γελάνε.', answer: 'Αυτός', choices: ['Αυτός', 'Εγώ', 'Εμείς', 'Εσύ'], en: 'He doesn’t understand why everyone is laughing.', hint: 'he' }
    ],
    'a1-present-a': [
      { text: 'Κάθε βράδυ {b} λίγο πριν κοιμηθώ. (διαβάζω)', answer: 'διαβάζω', choices: ['διαβάζω', 'διαβάζεις', 'διαβάζουμε', 'διάβασα'], en: 'Every night I read a little before I sleep.', hint: 'read · εγώ' },
      { text: 'Τα Σαββατοκύριακα εμείς {b} στο χωριό της γιαγιάς. (μένω)', answer: 'μένουμε', choices: ['μένω', 'μένεις', 'μένουμε', 'μένουν'], en: 'At weekends we stay in grandma’s village.', hint: 'stay · εμείς' },
      { text: 'Γιατί {b} τόσο γρήγορα; Έχουμε ώρα ακόμα! (τρέχω)', answer: 'τρέχεις', choices: ['τρέχω', 'τρέχεις', 'τρέχει', 'τρέχετε'], en: 'Why are you running so fast? We still have time!', hint: 'run · εσύ' },
      { text: 'Οι γείτονες {b} δυνατά μουσική κάθε νύχτα. (παίζω)', answer: 'παίζουν', choices: ['παίζει', 'παίζουμε', 'παίζετε', 'παίζουν'], en: 'The neighbours play loud music every night.', hint: 'play · they' }
    ],
    'a1-present-b1': [
      { text: 'Η γιαγιά μου {b} πέντε γλώσσες, το πιστεύεις; (μιλάω)', answer: 'μιλάει', accept: ['μιλά'], choices: ['μιλάω', 'μιλάς', 'μιλάει', 'μιλάμε'], en: 'My grandma speaks five languages, can you believe it?', hint: 'speak · she' },
      { text: 'Πάντα {b} αριστερά και δεξιά πριν περάσω τον δρόμο. (κοιτάω)', answer: 'κοιτάω', accept: ['κοιτώ'], choices: ['κοιτάω', 'κοιτάς', 'κοιτάμε', 'κοιτάνε'], en: 'I always look left and right before crossing.', hint: 'look · εγώ' },
      { text: 'Εσείς {b} πολύ καλά ελληνικά για ξένοι! (μιλάω)', answer: 'μιλάτε', choices: ['μιλάω', 'μιλάς', 'μιλάμε', 'μιλάτε'], en: 'You speak Greek very well for foreigners!', hint: 'speak · εσείς' },
      { text: 'Τα παιδιά {b} συνέχεια πότε θα φτάσουμε. (ρωτάω)', answer: 'ρωτάνε', accept: ['ρωτούν'], choices: ['ρωτάει', 'ρωτάμε', 'ρωτάτε', 'ρωτάνε'], en: 'The children keep asking when we’ll arrive.', hint: 'ask · they' }
    ],
    'a1-present-b2': [
      { text: 'Συγγνώμη, {b} να ανοίξω λίγο το παράθυρο; (μπορώ)', answer: 'μπορώ', choices: ['μπορώ', 'μπορείς', 'μπορεί', 'μπορούμε'], en: 'Excuse me, may I open the window a bit?', hint: 'can · εγώ' },
      { text: 'Ο πατέρας μου {b} φορτηγά εδώ και είκοσι χρόνια. (οδηγώ)', answer: 'οδηγεί', choices: ['οδηγώ', 'οδηγείς', 'οδηγεί', 'οδηγούν'], en: 'My father has driven trucks for twenty years.', hint: 'drive · he' },
      { text: 'Κάθε Κυριακή {b} στη μητέρα μου για μισή ώρα. (τηλεφωνώ)', answer: 'τηλεφωνώ', choices: ['τηλεφωνώ', 'τηλεφωνείς', 'τηλεφωνεί', 'τηλεφωνούν'], en: 'Every Sunday I phone my mother for half an hour.', hint: 'phone · εγώ' },
      { text: 'Εμείς {b} σε ένα μικρό διαμέρισμα στο κέντρο. (ζω)', answer: 'ζούμε', choices: ['ζω', 'ζεις', 'ζούμε', 'ζείτε'], en: 'We live in a small flat in the centre.', hint: 'live · εμείς' }
    ],
    'a1-articles-gender': [
      { text: '{b} καφές μου κρύωσε όσο μιλούσαμε.', answer: 'Ο', choices: ['Ο', 'Η', 'Το', 'Οι'], en: 'My coffee got cold while we were talking.', hint: 'masculine' },
      { text: 'Μου αρέσει πολύ {b} μουσική που ακούς.', answer: 'η', choices: ['ο', 'η', 'το', 'τα'], en: 'I really like the music you listen to.', hint: 'feminine' },
      { text: '{b} αυτοκίνητα στην πόλη είναι πάρα πολλά.', answer: 'Τα', choices: ['Ο', 'Οι', 'Τα', 'Η'], en: 'There are far too many cars in the city.', hint: 'neuter plural' },
      { text: 'Πού έβαλα {b} κλειδιά μου πάλι;', answer: 'τα', choices: ['το', 'τα', 'οι', 'η'], en: 'Where did I put my keys again?', hint: 'neuter plural' }
    ],
    'a1-weak-object': [
      { text: 'Αν δεις τη Μαρία, {b} χαιρετάς από μένα. (her)', answer: 'την', choices: ['με', 'σε', 'τον', 'την'], en: 'If you see Maria, say hi to her from me.', hint: 'object: her' },
      { text: 'Πού είναι τα γυαλιά μου; Δεν {b} βρίσκω πουθενά. (them, neuter)', answer: 'τα', choices: ['τον', 'τη', 'τους', 'τα'], en: 'Where are my glasses? I can’t find them anywhere.', hint: 'object: them (neuter)' },
      { text: 'Σ’ ευχαριστώ πολύ που {b} βοήθησες χθες. (me)', answer: 'με', choices: ['με', 'σε', 'μας', 'τον'], en: 'Thank you so much for helping me yesterday.', hint: 'object: me' },
      { text: 'Οι γονείς μου {b} καλούν για φαγητό κάθε Κυριακή. (us)', answer: 'μας', choices: ['με', 'σε', 'μας', 'τους'], en: 'My parents invite us for lunch every Sunday.', hint: 'object: us' }
    ],
    'a1-possessive': [
      { text: 'Έχασα το κινητό {b} στο τρένο σήμερα. (my)', answer: 'μου', choices: ['μου', 'σου', 'του', 'μας'], en: 'I lost my phone on the train today.', hint: 'my' },
      { text: 'Η αδερφή {b} σπουδάζει ιατρική στο Λονδίνο. (his)', answer: 'του', choices: ['μου', 'του', 'της', 'τους'], en: 'His sister studies medicine in London.', hint: 'his' },
      { text: 'Τα παιχνίδια {b} είναι σκορπισμένα σε όλο το σπίτι. (their)', answer: 'τους', choices: ['μου', 'μας', 'σας', 'τους'], en: 'Their toys are scattered all over the house.', hint: 'their' },
      { text: 'Ποια είναι η αγαπημένη {b} ταινία όλων των εποχών; (your)', answer: 'σου', choices: ['μου', 'σου', 'της', 'σας'], en: 'What’s your favourite film of all time?', hint: 'your' }
    ],
    'a1-oti-pos-pou': [
      { text: 'Είμαι σίγουρος {b} θα τα καταφέρεις στις εξετάσεις.', answer: 'ότι', accept: ['πως'], choices: ['ότι', 'που', 'πού', 'γιατί'], en: 'I’m sure (that) you’ll do well in the exams.', hint: 'reported · after “sure”' },
      { text: 'Η ταινία {b} είδαμε χθες ήταν βαρετή.', answer: 'που', choices: ['ότι', 'που', 'πως', 'ποια'], en: 'The film (that) we saw yesterday was boring.', hint: 'after a noun = which' },
      { text: 'Στενοχωριέμαι {b} φεύγεις τόσο νωρίς.', answer: 'που', choices: ['ότι', 'που', 'πως', 'γιατί'], en: 'I’m sad that you’re leaving so early.', hint: 'after an emotion verb' },
      { text: 'Όλοι πιστεύουν {b} αύριο θα κάνει καλό καιρό.', answer: 'ότι', accept: ['πως'], choices: ['ότι', 'που', 'πού', 'αν'], en: 'Everyone believes the weather will be good tomorrow.', hint: 'reported · after “believe”' }
    ],
    'a2-accusative': [
      { text: 'Συναντήσαμε {b} καθηγητή μας τυχαία στην αγορά. (the teacher, masc)', answer: 'τον', choices: ['ο', 'τον', 'του', 'την'], en: 'We ran into our teacher by chance at the market.', hint: 'object · masculine' },
      { text: 'Δώσε μου {b} αλάτι, σε παρακαλώ. (the salt, neuter)', answer: 'το', choices: ['το', 'τον', 'του', 'τα'], en: 'Pass me the salt, please.', hint: 'object · neuter' },
      { text: 'Περιμένω {b} φίλους μου εδώ και μισή ώρα. (my friends)', answer: 'τους', choices: ['οι', 'τους', 'των', 'τις'], en: 'I’ve been waiting for my friends for half an hour.', hint: 'object · masc plural' },
      { text: 'Αγόρασα ένα μικρό δώρο για {b} μητέρα μου. (my mother)', answer: 'τη', accept: ['την'], choices: ['τη', 'της', 'τον', 'το'], en: 'I bought a small gift for my mother.', hint: 'after για · feminine' }
    ],
    'a2-genitive': [
      { text: 'Το χρώμα {b} ουρανού το ηλιοβασίλεμα ήταν απίστευτο. (the sky)', answer: 'του', choices: ['ο', 'τον', 'του', 'των'], en: 'The colour of the sky at sunset was incredible.', hint: 'owner · masculine' },
      { text: 'Δεν θυμάμαι το όνομα {b} γυναίκας που γνωρίσαμε. (the woman)', answer: 'της', choices: ['η', 'την', 'της', 'των'], en: 'I don’t remember the name of the woman we met.', hint: 'owner · feminine' },
      { text: 'Τα προβλήματα {b} κόσμου δεν λύνονται εύκολα. (the world)', answer: 'του', choices: ['το', 'του', 'των', 'της'], en: 'The world’s problems aren’t solved easily.', hint: 'owner · neuter' },
      { text: 'Η τιμή {b} βιβλίων ανέβηκε φέτος. (the books)', answer: 'των', choices: ['οι', 'τους', 'των', 'τις'], en: 'The price of books went up this year.', hint: 'owner · plural' }
    ],
    'a2-aorist': [
      { text: 'Χθες {b} όλη μέρα και κουράστηκα πολύ. (δουλεύω)', answer: 'δούλεψα', choices: ['δούλεψα', 'δούλεψες', 'δουλέψαμε', 'δούλευα'], en: 'Yesterday I worked all day and got very tired.', hint: 'work · past · εγώ' },
      { text: 'Ο Γιώργος {b} καινούριο αυτοκίνητο τον περασμένο μήνα. (αγοράζω)', answer: 'αγόρασε', choices: ['αγόρασα', 'αγόρασες', 'αγόρασε', 'αγόρασαν'], en: 'George bought a new car last month.', hint: 'buy · past · he' },
      { text: 'Πότε {b} πρώτη φορά στην Ελλάδα; (έρχομαι → ήρθα)', answer: 'ήρθες', choices: ['ήρθα', 'ήρθες', 'ήρθαμε', 'ήρθαν'], en: 'When did you first come to Greece?', hint: 'come · past · εσύ' },
      { text: 'Τα παιδιά {b} τα δώρα τους με ενθουσιασμό. (ανοίγω)', answer: 'άνοιξαν', choices: ['άνοιξα', 'ανοίξαμε', 'άνοιξαν', 'άνοιγαν'], en: 'The children opened their presents excitedly.', hint: 'open · past · they' }
    ],
    'a2-future-simple': [
      { text: 'Το Σαββατοκύριακο {b} τους παλιούς μου φίλους. (βλέπω → είδα)', answer: 'θα δω', accept: ['θα δω'], choices: ['θα δω', 'θα βλέπω', 'είδα', 'θα δεις'], en: 'At the weekend I’ll see my old friends.', hint: 'future simple · εγώ' },
      { text: 'Αύριο {b} νωρίς γιατί έχω δουλειά. (ξυπνάω → ξύπνησα)', answer: 'θα ξυπνήσω', accept: ['θα ξυπνησω'], choices: ['θα ξυπνήσω', 'θα ξυπνάω', 'ξύπνησα', 'θα ξυπνήσεις'], en: 'Tomorrow I’ll wake up early because I have work.', hint: 'future simple · εγώ' },
      { text: 'Μην ανησυχείς, {b} μόλις φτάσω. (τηλεφωνώ)', answer: 'θα τηλεφωνήσω', accept: ['θα τηλεφωνησω'], choices: ['θα τηλεφωνήσω', 'θα τηλεφωνώ', 'τηλεφώνησα', 'θα τηλεφωνήσεις'], en: 'Don’t worry, I’ll call as soon as I arrive.', hint: 'future simple · εγώ' },
      { text: 'Τι {b} για τα γενέθλιά σου φέτος; (κάνω)', answer: 'θα κάνεις', accept: ['θα κανεις'], choices: ['θα κάνεις', 'θα κάνω', 'έκανες', 'θα κάνει'], en: 'What will you do for your birthday this year?', hint: 'future simple · εσύ' }
    ],
    'a2-negation': [
      { text: '{b} μου αρέσει καθόλου αυτή η ιδέα.', answer: 'Δεν', choices: ['Δεν', 'Μην', 'Όχι', 'Ούτε'], en: 'I don’t like this idea at all.', hint: 'negate a normal verb' },
      { text: 'Σε παρακαλώ, {b} το πεις σε κανέναν. (command)', answer: 'μην', choices: ['δεν', 'μην', 'όχι', 'να'], en: 'Please, don’t tell anyone.', hint: 'negative command' },
      { text: '{b} ήρθε κανείς στο πάρτι μέχρι τις δέκα.', answer: 'Δεν', choices: ['Δεν', 'Μην', 'Όχι', 'Ποτέ'], en: 'Nobody came to the party until ten.', hint: 'negate (double negative)' },
      { text: 'Προτιμώ να {b} οδηγώ τη νύχτα.', answer: 'μην', choices: ['δεν', 'μην', 'όχι', 'ούτε'], en: 'I prefer not to drive at night.', hint: 'negative after να' }
    ],
    'b1-subjunctive': [
      { text: 'Πρέπει να {b} περισσότερο νερό μέσα στη μέρα. (πίνω)', answer: 'πίνω', choices: ['πίνω', 'πιω', 'ήπια', 'πίνεις'], en: 'I should drink more water during the day.', hint: 'after να · ongoing · εγώ' },
      { text: 'Θα ήθελα να {b} ένα τραπέζι για δύο, παρακαλώ. (κλείνω → έκλεισα)', answer: 'κλείσω', choices: ['κλείσω', 'κλείνω', 'έκλεισα', 'κλείσεις'], en: 'I’d like to book a table for two, please.', hint: 'after να · one-off · εγώ' },
      { text: 'Μπορείς να {b} πιο σιγά; Δεν προλαβαίνω. (μιλάω)', answer: 'μιλάς', choices: ['μιλάς', 'μιλάω', 'μίλησα', 'μιλήσεις'], en: 'Can you speak more slowly? I can’t keep up.', hint: 'after να · ongoing · εσύ' },
      { text: 'Ας {b} έξω για φαγητό απόψε, βαρέθηκα το σπίτι! (πηγαίνω → πάω)', answer: 'πάμε', choices: ['πάμε', 'πάω', 'πήγα', 'πας'], en: 'Let’s go out for dinner tonight, I’m bored of home!', hint: 'ας + εμείς' }
    ],
    'b1-imperative': [
      { text: '{b} μου ένα ποτήρι νερό, σε παρακαλώ. (φέρνω → έφερα, singular)', answer: 'Φέρε', choices: ['Φέρε', 'Φέρτε', 'Φέρνε', 'Φέρεις'], en: 'Bring me a glass of water, please.', hint: 'command · singular' },
      { text: '{b} με προσεκτικά, είναι σημαντικό. (ακούω, singular)', answer: 'Άκουσε', choices: ['Άκουσε', 'Ακούστε', 'Άκουγε', 'Άκουσες'], en: 'Listen to me carefully, it’s important.', hint: 'command · singular' },
      { text: '{b} γρήγορα, θα χάσουμε το τρένο! (τρέχω, plural)', answer: 'Τρέξτε', choices: ['Τρέξε', 'Τρέξτε', 'Τρέχετε', 'Τρέξετε'], en: 'Run, we’ll miss the train!', hint: 'command · plural' },
      { text: '{b} ένα μπισκότο, μόλις τα έφτιαξα! (παίρνω → πήρα, singular)', answer: 'Πάρε', choices: ['Πάρε', 'Πάρτε', 'Παίρνε', 'Πάρεις'], en: 'Have a biscuit, I just made them!', hint: 'command · singular' }
    ],
    'b1-past-continuous': [
      { text: 'Όταν ήμασταν μικροί, {b} στον δρόμο μέχρι να σκοτεινιάσει. (παίζω)', answer: 'παίζαμε', choices: ['παίζαμε', 'παίξαμε', 'παίζουμε', 'έπαιξαν'], en: 'When we were little, we played in the street until dark.', hint: 'past continuous · εμείς' },
      { text: 'Η γιαγιά μου {b} υπέροχες ιστορίες κάθε βράδυ. (λέω → έλεγα)', answer: 'έλεγε', choices: ['έλεγε', 'είπε', 'λέει', 'έλεγα'], en: 'My grandma used to tell wonderful stories every night.', hint: 'past continuous · she' },
      { text: 'Ενώ {b}, άκουσα ξαφνικά έναν περίεργο θόρυβο. (διαβάζω)', answer: 'διάβαζα', choices: ['διάβαζα', 'διάβασα', 'διαβάζω', 'διάβαζες'], en: 'While I was reading, I suddenly heard a strange noise.', hint: 'past continuous · εγώ' },
      { text: 'Παλιά {b} σε ένα μικρό χωριό στα βουνά. (ζω → ζούσα)', answer: 'ζούσαμε', choices: ['ζούσαμε', 'ζήσαμε', 'ζούμε', 'ζούσαν'], en: 'We used to live in a small mountain village.', hint: 'past continuous · εμείς' }
    ],
    'b1-comparatives': [
      { text: 'Το καλοκαίρι στην Ελλάδα είναι {b} ζεστό απ’ ό,τι στην Αγγλία.', answer: 'πιο', choices: ['πιο', 'πολύ', 'από', 'τόσο'], en: 'Summer in Greece is hotter than in England.', hint: '“more”' },
      { text: 'Αυτό το εστιατόριο είναι {b} από εκείνο στη γωνία. (better)', answer: 'καλύτερο', choices: ['καλύτερο', 'πιο καλό', 'καλό', 'χειρότερο'], en: 'This restaurant is better than the one on the corner.', hint: 'irregular: better (neuter)' },
      { text: 'Ο μικρός μου αδερφός έγινε πιο ψηλός {b} εμένα.', answer: 'από', choices: ['από', 'που', 'σαν', 'και'], en: 'My little brother became taller than me.', hint: '“than”' },
      { text: 'Σήμερα ένιωσα {b} απ’ ό,τι χθες, δυστυχώς. (worse)', answer: 'χειρότερα', choices: ['χειρότερα', 'καλύτερα', 'πιο κακά', 'πολύ'], en: 'Today I felt worse than yesterday, unfortunately.', hint: 'irregular: worse (adverb)' }
    ],
    'b1-conjunctions': [
      { text: '{b} τελειώσω τη δουλειά, θα σε πάρω τηλέφωνο. (as soon as)', answer: 'Μόλις', choices: ['Μόλις', 'Αν', 'Γιατί', 'Ενώ'], en: 'As soon as I finish work, I’ll call you.', hint: 'as soon as' },
      { text: 'Δεν βγήκαμε έξω {b} έβρεχε όλη μέρα.', answer: 'γιατί', accept: ['επειδή'], choices: ['γιατί', 'αν', 'όταν', 'αλλά'], en: 'We didn’t go out because it rained all day.', hint: 'because' },
      { text: 'Θα έρθω στο πάρτι, {b} δεν θα μείνω πολύ.', answer: 'αλλά', accept: ['όμως'], choices: ['αλλά', 'και', 'γιατί', 'όταν'], en: 'I’ll come to the party, but I won’t stay long.', hint: 'but' },
      { text: '{b} εκείνη μαγείρευε, αυτός έστρωνε το τραπέζι.', answer: 'Ενώ', choices: ['Ενώ', 'Αν', 'Γιατί', 'Μόλις'], en: 'While she was cooking, he was setting the table.', hint: 'while' }
    ],
    'b2-mediopassive': [
      { text: 'Συνήθως {b} γύρω στις έντεκα το βράδυ. (κοιμάμαι)', answer: 'κοιμάμαι', choices: ['κοιμάμαι', 'κοιμάσαι', 'κοιμάται', 'κοιμούνται'], en: 'I usually go to sleep around eleven at night.', hint: 'sleep · εγώ' },
      { text: 'Πώς {b} σήμερα; Καλύτερα από χθες; (αισθάνομαι)', answer: 'αισθάνεσαι', choices: ['αισθάνομαι', 'αισθάνεσαι', 'αισθάνεται', 'αισθανόμαστε'], en: 'How do you feel today? Better than yesterday?', hint: 'feel · εσύ' },
      { text: 'Τα παιδιά {b} όταν μένουν μόνα στο σκοτάδι. (φοβάμαι)', answer: 'φοβούνται', choices: ['φοβάμαι', 'φοβάται', 'φοβόμαστε', 'φοβούνται'], en: 'The children get scared when they’re left alone in the dark.', hint: 'fear · they' },
      { text: 'Δεν {b} σχεδόν τίποτα από εκείνη τη νύχτα. (θυμάμαι)', answer: 'θυμάμαι', choices: ['θυμάμαι', 'θυμάσαι', 'θυμάται', 'θυμούνται'], en: 'I remember almost nothing from that night.', hint: 'remember · εγώ' }
    ],
    'b2-conditional': [
      { text: 'Αν {b} περισσότερο χρόνο, θα μάθαινα πιάνο. (έχω, unreal)', answer: 'είχα', choices: ['είχα', 'έχω', 'θα έχω', 'είχες'], en: 'If I had more time, I would learn the piano.', hint: 'if-clause · past continuous' },
      { text: 'Αν ήξερα ότι θα ερχόσουν, {b} κάτι ωραίο. (μαγειρεύω)', answer: 'θα μαγείρευα', accept: ['θα μαγειρευα'], choices: ['θα μαγείρευα', 'μαγειρεύω', 'θα μαγειρέψω', 'μαγείρεψα'], en: 'If I’d known you were coming, I would have cooked something nice.', hint: 'result · θα + past continuous' },
      { text: 'Τι {b} αν μπορούσες να ζήσεις οπουδήποτε στον κόσμο; (κάνω)', answer: 'θα έκανες', accept: ['θα εκανες'], choices: ['θα έκανες', 'κάνεις', 'θα κάνεις', 'έκανες'], en: 'What would you do if you could live anywhere in the world?', hint: 'result · εσύ' },
      { text: 'Αν {b} εσύ στη θέση μου, τι θα έλεγες; (είμαι)', answer: 'ήσουν', choices: ['ήσουν', 'είσαι', 'θα είσαι', 'ήμουν'], en: 'If you were in my place, what would you say?', hint: 'if-clause · “were” · εσύ' }
    ],
    'b2-gerund': [
      { text: 'Πέρασε όλο το απόγευμα {b} τηλεόραση στον καναπέ. (βλέπω)', answer: 'βλέποντας', choices: ['βλέποντας', 'βλέπω', 'είδε', 'βλέπωντας'], en: 'He spent the whole afternoon watching TV on the sofa.', hint: 'gerund · -οντας' },
      { text: 'Μπήκε στο δωμάτιο {b} δυνατά με τα νέα. (γελάω)', answer: 'γελώντας', choices: ['γελώντας', 'γελάει', 'γέλασε', 'γελόντας'], en: 'She came into the room laughing loudly with the news.', hint: 'gerund · -ώντας' },
      { text: 'Μαθαίνεις πιο γρήγορα {b} με ντόπιους κάθε μέρα. (μιλάω)', answer: 'μιλώντας', choices: ['μιλώντας', 'μιλάω', 'μίλησα', 'μιλόντας'], en: 'You learn faster by speaking with locals every day.', hint: 'gerund · -ώντας' },
      { text: '{b} προσεκτικά τους άλλους, καταλαβαίνεις πολλά. (ακούω)', answer: 'Ακούγοντας', choices: ['Ακούγοντας', 'Ακούω', 'Άκουσα', 'Ακούοντας'], en: 'By listening to others carefully, you understand a lot.', hint: 'gerund of ακούω' }
    ],
    'b2-relative-oopoios': [
      { text: 'Ο καθηγητής {b} μας δίδαξε ιστορία ήταν εξαιρετικός.', answer: 'ο οποίος', choices: ['ο οποίος', 'η οποία', 'το οποίο', 'οι οποίοι'], en: 'The professor who taught us history was excellent.', hint: 'masculine singular' },
      { text: 'Η ταινία {b} κέρδισε το βραβείο ήταν ελληνική.', answer: 'η οποία', choices: ['ο οποίος', 'η οποία', 'το οποίο', 'οι οποίες'], en: 'The film which won the award was Greek.', hint: 'feminine singular' },
      { text: 'Τα θέματα {b} συζητήσαμε στη συνάντηση ήταν δύσκολα.', answer: 'τα οποία', choices: ['ο οποίος', 'η οποία', 'το οποίο', 'τα οποία'], en: 'The topics which we discussed at the meeting were difficult.', hint: 'neuter plural' },
      { text: 'Ο φίλος {b} το σπίτι επισκεφτήκαμε μένει στην Κρήτη.', answer: 'του οποίου', choices: ['του οποίου', 'ο οποίος', 'που', 'των οποίων'], en: 'The friend whose house we visited lives in Crete.', hint: 'genitive: whose' }
    ],
    'b2-purpose': [
      { text: 'Σηκώθηκα νωρίς {b} προλάβω το πρώτο τρένο.', answer: 'για να', choices: ['για να', 'ώστε να', 'επειδή', 'αν'], en: 'I got up early in order to catch the first train.', hint: 'purpose: in order to' },
      { text: 'Μιλάει αργά και καθαρά {b} τον καταλαβαίνουν όλοι.', answer: 'ώστε να', choices: ['ώστε να', 'για να', 'επειδή', 'αλλά'], en: 'He speaks slowly and clearly so that everyone understands him.', hint: 'result: so that' },
      { text: 'Πήγα στην τράπεζα {b} βγάλω λίγα χρήματα.', answer: 'για να', choices: ['για να', 'ώστε να', 'αν', 'ενώ'], en: 'I went to the bank to take out some money.', hint: 'purpose' },
      { text: 'Έκλεισε σιγά την πόρτα {b} μην ξυπνήσει το μωρό.', answer: 'για να', accept: ['ώστε να'], choices: ['για να', 'επειδή', 'γιατί', 'όταν'], en: 'He closed the door quietly so as not to wake the baby.', hint: 'purpose / so that' }
    ]
  };
  (window.GRAMMAR || []).forEach(function (p) {
    if (EXTRA[p.id]) p.items = p.items.concat(EXTRA[p.id]);
  });
})();

/* ===== Expansion: more granular grammar points across every level ===== */
window.GRAMMAR.push(
  {
    id: 'a1-be', level: 'A1', title: 'The verb “to be” (είμαι)',
    short: 'Irregular and everywhere: είμαι, είσαι, είναι…',
    explanation: '<p>είμαι is the most common verb and it’s irregular — learn it as a set:</p>' +
      '<div class="g-grid"><div class="g-k">εγώ</div><div class="g-v">είμαι</div><div class="g-k">εσύ</div><div class="g-v">είσαι</div><div class="g-k">αυτός/ή/ό</div><div class="g-v">είναι</div><div class="g-k">εμείς</div><div class="g-v">είμαστε</div><div class="g-k">εσείς</div><div class="g-v">είστε</div><div class="g-k">αυτοί/ές/ά</div><div class="g-v">είναι</div></div>' +
      '<p>Used for identity, origin, location and states: <em>Είμαι από την Αγγλία. · Πού είναι η τράπεζα;</em></p>',
    examples: [ { gr: 'Είμαι κουρασμένος.', en: 'I am tired.' }, { gr: 'Πού είσαι τώρα;', en: 'Where are you now?' }, { gr: 'Είναι καλοί φίλοι.', en: 'They are good friends.' } ],
    more: '<p>No indefinite article with jobs/nationalities: <em>Είμαι δάσκαλος</em> (“I’m a teacher”). The past is <strong>ήμουν, ήσουν, ήταν, ήμασταν, ήσασταν, ήταν</strong>.</p>',
    items: [
      { text: 'Εγώ {b} δάσκαλος. (είμαι)', answer: 'είμαι', choices: ['είμαι', 'είσαι', 'είναι', 'είμαστε'], en: 'I am a teacher.', hint: 'be · εγώ' },
      { text: 'Εσύ {b} έτοιμος; (είμαι)', answer: 'είσαι', choices: ['είμαι', 'είσαι', 'είναι', 'είστε'], en: 'Are you ready?', hint: 'be · εσύ' },
      { text: 'Η Μαρία και ο Νίκος {b} φίλοι. (είμαι)', answer: 'είναι', choices: ['είμαι', 'είσαι', 'είναι', 'είμαστε'], en: 'Maria and Nikos are friends.', hint: 'be · they' },
      { text: 'Εμείς {b} από την Ελλάδα. (είμαι)', answer: 'είμαστε', choices: ['είμαι', 'είμαστε', 'είστε', 'είναι'], en: 'We are from Greece.', hint: 'be · εμείς' },
      { text: 'Πού {b} το ξενοδοχείο; (είμαι)', answer: 'είναι', choices: ['είμαι', 'είσαι', 'είναι', 'είστε'], en: 'Where is the hotel?', hint: 'be · it' }
    ]
  },
  {
    id: 'a1-have', level: 'A1', title: 'The verb “to have” (έχω)',
    short: 'Regular Group A: έχω, έχεις, έχει…',
    explanation: '<p>έχω takes the normal Group A endings:</p>' +
      '<div class="g-grid"><div class="g-k">εγώ</div><div class="g-v">έχω</div><div class="g-k">εσύ</div><div class="g-v">έχεις</div><div class="g-k">αυτός/ή/ό</div><div class="g-v">έχει</div><div class="g-k">εμείς</div><div class="g-v">έχουμε</div><div class="g-k">εσείς</div><div class="g-v">έχετε</div><div class="g-k">αυτοί/ές/ά</div><div class="g-v">έχουν</div></div>' +
      '<p>For possession and many set phrases: <em>Έχω δίκιο</em> (I’m right), <em>Έχεις όρεξη;</em> (Do you feel like it?).</p>',
    examples: [ { gr: 'Έχω δύο αδέρφια.', en: 'I have two siblings.' }, { gr: 'Έχεις ώρα;', en: 'Do you have time?' }, { gr: 'Έχει πολλή δουλειά.', en: 'He has a lot of work.' } ],
    more: '<p>Colloquial <strong>έχει</strong> = “there is / there are”: <em>Έχει κόσμο σήμερα</em> (it’s busy today). The past is <strong>είχα</strong>.</p>',
    items: [
      { text: 'Εγώ {b} δύο αδέρφια. (έχω)', answer: 'έχω', choices: ['έχω', 'έχεις', 'έχει', 'έχουν'], en: 'I have two siblings.', hint: 'have · εγώ' },
      { text: 'Εσύ {b} λίγο χρόνο τώρα; (έχω)', answer: 'έχεις', choices: ['έχω', 'έχεις', 'έχει', 'έχετε'], en: 'Do you have a little time now?', hint: 'have · εσύ' },
      { text: 'Το σπίτι {b} μεγάλο κήπο. (έχω)', answer: 'έχει', choices: ['έχω', 'έχεις', 'έχει', 'έχουμε'], en: 'The house has a big garden.', hint: 'have · it' },
      { text: 'Εμείς {b} πολλή δουλειά σήμερα. (έχω)', answer: 'έχουμε', choices: ['έχω', 'έχεις', 'έχουμε', 'έχουν'], en: 'We have a lot of work today.', hint: 'have · εμείς' },
      { text: 'Οι γονείς μου {b} ένα μικρό μαγαζί. (έχω)', answer: 'έχουν', choices: ['έχει', 'έχουμε', 'έχετε', 'έχουν'], en: 'My parents have a small shop.', hint: 'have · they' }
    ]
  },
  {
    id: 'a1-adjective-agreement', level: 'A1', title: 'Adjective agreement',
    short: 'Adjectives match their noun: καλός / καλή / καλό.',
    explanation: '<p>An adjective agrees with its noun in gender, number and case, and usually goes <strong>before</strong> it:</p>' +
      '<div class="g-grid"><div class="g-k">masculine</div><div class="g-v">ο καλ<strong>ός</strong> άντρας</div><div class="g-k">feminine</div><div class="g-v">η καλ<strong>ή</strong> ιδέα</div><div class="g-k">neuter</div><div class="g-v">το καλ<strong>ό</strong> παιδί</div><div class="g-k">plural</div><div class="g-v">καλ<strong>οί</strong> / καλ<strong>ές</strong> / καλ<strong>ά</strong></div></div>' +
      '<p>It agrees even after “to be”: <em>Η σούπα είναι ζεστ<strong>ή</strong>.</em></p>',
    examples: [ { gr: 'Ένα μεγάλο σπίτι.', en: 'A big house.' }, { gr: 'Μια ωραία μέρα.', en: 'A nice day.' }, { gr: 'Οι δρόμοι είναι στενοί.', en: 'The streets are narrow.' } ],
    more: '<p>Most adjectives follow <strong>-ος / -η (or -α) / -ο</strong>. A few go -ης/-α/-ικο (ζηλιάρης) or -ύς/-ιά/-ύ (βαρύς). The feminine is -α after a vowel stem (ωραίος → ωραία), -η otherwise (καλός → καλή).</p>',
    items: [
      { text: 'Ένας {b} άντρας. (καλός)', answer: 'καλός', choices: ['καλός', 'καλή', 'καλό', 'καλοί'], en: 'A good man.', hint: 'masculine' },
      { text: 'Μια {b} ιδέα! (καλός)', answer: 'καλή', choices: ['καλός', 'καλή', 'καλό', 'καλές'], en: 'A good idea!', hint: 'feminine' },
      { text: 'Ένα {b} παιδί. (καλός)', answer: 'καλό', choices: ['καλός', 'καλή', 'καλό', 'καλά'], en: 'A good child.', hint: 'neuter' },
      { text: 'Δύο {b} φίλοι. (καλός)', answer: 'καλοί', choices: ['καλός', 'καλή', 'καλοί', 'καλές'], en: 'Two good friends.', hint: 'masculine plural' },
      { text: 'Η σούπα είναι πολύ {b}. (ζεστός)', answer: 'ζεστή', choices: ['ζεστός', 'ζεστή', 'ζεστό', 'ζεστά'], en: 'The soup is very hot.', hint: 'agrees with η σούπα (fem)' }
    ]
  },
  {
    id: 'a1-demonstratives', level: 'A1', title: 'This & that (αυτός / εκείνος)',
    short: 'αυτός = this, εκείνος = that — and keep the article.',
    explanation: '<p><strong>αυτός/αυτή/αυτό</strong> = this, <strong>εκείνος/εκείνη/εκείνο</strong> = that. They agree with the noun and you <strong>keep the article</strong>:</p>' +
      '<p><em>αυτός <strong>ο</strong> άντρας</em> = this man · <em>εκείνη <strong>η</strong> γυναίκα</em> = that woman.</p>' +
      '<p>Plurals: αυτοί/αυτές/αυτά, εκείνοι/εκείνες/εκείνα.</p>',
    examples: [ { gr: 'Αυτό το βιβλίο είναι δικό μου.', en: 'This book is mine.' }, { gr: 'Ποιος είναι εκείνος ο κύριος;', en: 'Who is that gentleman?' }, { gr: 'Μου αρέσουν αυτά τα παπούτσια.', en: 'I like these shoes.' } ],
    more: '<p>Don’t drop the article: it’s <em>αυτός <strong>ο</strong> άντρας</em>, not “αυτός άντρας”. On their own (no noun) they mean “this/that one”: <em>Αυτό είναι ωραίο.</em></p>',
    items: [
      { text: '{b} ο άντρας είναι πολύ ψηλός. (this, masc)', answer: 'Αυτός', choices: ['Αυτός', 'Αυτή', 'Αυτό', 'Εκείνος'], en: 'This man is very tall.', hint: 'this · masculine' },
      { text: 'Θέλω {b} το βιβλίο, όχι το άλλο. (that, neuter)', answer: 'εκείνο', choices: ['αυτό', 'εκείνο', 'εκείνος', 'εκείνη'], en: 'I want that book, not the other one.', hint: 'that · neuter' },
      { text: '{b} η ταινία ήταν υπέροχη. (this, fem)', answer: 'Αυτή', choices: ['Αυτός', 'Αυτή', 'Αυτό', 'Εκείνη'], en: 'This film was wonderful.', hint: 'this · feminine' },
      { text: 'Ποιος είναι {b} ο κύριος εκεί πέρα; (that, masc)', answer: 'εκείνος', choices: ['αυτός', 'εκείνος', 'εκείνη', 'εκείνο'], en: 'Who is that gentleman over there?', hint: 'that · masculine' },
      { text: 'Μου αρέσουν {b} τα παπούτσια. (these, neut pl)', answer: 'αυτά', choices: ['αυτοί', 'αυτές', 'αυτά', 'εκείνοι'], en: 'I like these shoes.', hint: 'these · neuter plural' }
    ]
  },
  {
    id: 'a1-question-words', level: 'A1', title: 'Question words',
    short: 'τι, ποιος, πού, πότε, πώς, πόσο, γιατί.',
    explanation: '<p>The main question words:</p>' +
      '<div class="g-grid"><div class="g-k">what</div><div class="g-v">τι</div><div class="g-k">who / which</div><div class="g-v">ποιος / ποια / ποιο</div><div class="g-k">where</div><div class="g-v">πού</div><div class="g-k">when</div><div class="g-v">πότε</div><div class="g-k">how</div><div class="g-v">πώς</div><div class="g-k">how much/many</div><div class="g-v">πόσο / πόσος</div><div class="g-k">why</div><div class="g-v">γιατί</div></div>' +
      '<p><em>ποιος</em> agrees with its noun; <em>τι</em> never changes.</p>',
    examples: [ { gr: 'Τι ώρα είναι;', en: 'What time is it?' }, { gr: 'Πού πας;', en: 'Where are you going?' }, { gr: 'Πόσο κάνει;', en: 'How much is it?' } ],
    more: '<p>Note the accents: <strong>πού</strong> (where?) and <strong>πώς</strong> (how?) only get a stress as questions — plain που/πως mean “that”. <em>ποιος/ποια/ποιο</em> agrees in gender, e.g. <em>Ποια μέρα;</em></p>',
    items: [
      { text: '{b} σε λένε;', answer: 'Πώς', choices: ['Πώς', 'Πού', 'Τι', 'Ποιος'], en: 'What’s your name?', hint: 'how (lit. “how do they call you”)' },
      { text: '{b} μένεις;', answer: 'Πού', choices: ['Πού', 'Πότε', 'Πώς', 'Τι'], en: 'Where do you live?', hint: 'where' },
      { text: '{b} θέλεις να πιεις;', answer: 'Τι', choices: ['Τι', 'Ποιος', 'Πού', 'Πότε'], en: 'What do you want to drink?', hint: 'what' },
      { text: '{b} κοστίζει αυτό;', answer: 'Πόσο', choices: ['Πόσο', 'Πότε', 'Πώς', 'Ποιο'], en: 'How much does this cost?', hint: 'how much' },
      { text: '{b} δεν ήρθες χθες;', answer: 'Γιατί', choices: ['Γιατί', 'Πότε', 'Πώς', 'Πού'], en: 'Why didn’t you come yesterday?', hint: 'why' },
      { text: '{b} είναι ο καθηγητής σου; (who, masc)', answer: 'Ποιος', choices: ['Ποιος', 'Ποια', 'Ποιο', 'Τι'], en: 'Who is your teacher?', hint: 'who · masculine' }
    ]
  },
  {
    id: 'a2-indefinite-pronouns', level: 'A2', title: 'Indefinite pronouns (κάποιος, κάτι, κανένας…)',
    short: 'someone / something / no one / all / some.',
    explanation: '<p>The everyday “some / any / no” words:</p>' +
      '<div class="g-grid"><div class="g-k">someone / some</div><div class="g-v">κάποιος / κάποια / κάποιο</div><div class="g-k">no one / any</div><div class="g-v">κανένας / καμία / κανένα</div><div class="g-k">something</div><div class="g-v">κάτι</div><div class="g-k">nothing / anything</div><div class="g-v">τίποτα</div><div class="g-k">all</div><div class="g-v">όλος / όλη / όλο</div><div class="g-k">some (pl.)</div><div class="g-v">μερικοί / μερικές / μερικά</div></div>' +
      '<p><em>κάποιος</em> and <em>κανένας</em> agree in gender and number; <em>κάτι</em> and <em>τίποτα</em> never change.</p>',
    examples: [ { gr: 'Κάποιος σε ζητάει.', en: 'Someone is asking for you.' }, { gr: 'Δεν θέλω τίποτα.', en: 'I don’t want anything.' }, { gr: 'Όλοι ήρθαν στην ώρα τους.', en: 'Everyone came on time.' } ],
    more: '<p><strong>κανένας</strong> and <strong>τίποτα</strong> normally need <strong>δεν</strong> (the Greek double negative): <em>Δεν ήρθε κανένας.</em> In a question, κανένας/τίποτα mean “any/anything”: <em>Θέλεις τίποτα;</em> = Do you want anything? <em>ο καθένας</em> = each one.</p>',
    items: [
      { text: '{b} χτύπησε την πόρτα. (someone, masc)', answer: 'Κάποιος', choices: ['Κάποιος', 'Κάτι', 'Κανένας', 'Όλος'], en: 'Someone knocked on the door.', hint: 'someone · masculine' },
      { text: 'Δεν ήρθε {b} στο πάρτι. (no one, masc)', answer: 'κανένας', choices: ['κάποιος', 'κανένας', 'κάτι', 'όλος'], en: 'No one came to the party.', hint: 'with δεν = no one' },
      { text: 'Θέλω να σου πω {b}. (something)', answer: 'κάτι', choices: ['κάτι', 'τίποτα', 'κάποιος', 'όλα'], en: 'I want to tell you something.', hint: 'something' },
      { text: 'Δεν κατάλαβα {b} από το μάθημα. (anything)', answer: 'τίποτα', choices: ['κάτι', 'τίποτα', 'κάποιο', 'όλα'], en: 'I didn’t understand anything from the lesson.', hint: 'with δεν = anything' },
      { text: '{b} οι φίλοι μου ήρθαν. (all, masc pl)', answer: 'Όλοι', choices: ['Όλοι', 'Μερικοί', 'Κάποιοι', 'Κανείς'], en: 'All my friends came.', hint: 'all · masculine plural' },
      { text: 'Αγόρασα {b} βιβλία για το ταξίδι. (some, neut pl)', answer: 'μερικά', choices: ['μερικά', 'κάποια', 'κάτι', 'όλα'], en: 'I bought some books for the trip.', hint: 'some · neuter plural' }
    ]
  },
  {
    id: 'a2-strong-pronouns', level: 'A2', title: 'Strong pronouns & emphasis',
    short: 'εμένα, εσένα, αυτόν… — after prepositions and for emphasis.',
    explanation: '<p>Besides the weak object pronouns (με, σε…), Greek has <strong>strong</strong> forms used after prepositions and for emphasis:</p>' +
      '<div class="g-grid"><div class="g-k">me</div><div class="g-v">εμένα</div><div class="g-k">you</div><div class="g-v">εσένα</div><div class="g-k">him / her / it</div><div class="g-v">αυτόν / αυτήν / αυτό</div><div class="g-k">us</div><div class="g-v">εμάς</div><div class="g-k">you (pl.)</div><div class="g-v">εσάς</div><div class="g-k">them</div><div class="g-v">αυτούς / αυτές / αυτά</div></div>' +
      '<p>After a preposition: <em>για εσένα, με αυτόν, σ’ εμένα</em>. For emphasis they often double the weak one: <em><strong>Εμένα</strong> μου αρέσει.</em></p>',
    examples: [ { gr: 'Αυτό είναι για σένα.', en: 'This is for you.' }, { gr: 'Μίλησα με αυτόν χθες.', en: 'I spoke with him yesterday.' }, { gr: 'Εμένα δεν μου αρέσει.', en: 'I (for one) don’t like it.' } ],
    more: '<p>Use the strong form when the pronoun stands alone, follows a preposition, or carries stress/contrast. Otherwise the weak form (με, σε, του…) is the default.</p>',
    items: [
      { text: 'Αυτό το δώρο είναι για {b}. (you, strong)', answer: 'εσένα', choices: ['εσένα', 'εσύ', 'σε', 'σου'], en: 'This gift is for you.', hint: 'after για · you' },
      { text: '{b} μου αρέσει ο καφές, εσένα; (me, emphatic)', answer: 'Εμένα', choices: ['Εμένα', 'Εγώ', 'Με', 'Μου'], en: 'I like coffee, (how about) you?', hint: 'emphasis · me' },
      { text: 'Μίλησα με {b} χθες το βράδυ. (him, strong)', answer: 'αυτόν', choices: ['αυτόν', 'αυτός', 'τον', 'του'], en: 'I spoke with him last night.', hint: 'after με · him' },
      { text: 'Ήρθαν όλοι εκτός από {b}. (us, strong)', answer: 'εμάς', choices: ['εμάς', 'εμείς', 'μας', 'μου'], en: 'Everyone came except us.', hint: 'after εκτός από · us' },
      { text: 'Σ’ {b} μιλάω, άκουσέ με! (you, strong)', answer: 'εσένα', choices: ['εσένα', 'εσύ', 'σου', 'σε'], en: 'I’m talking to you, listen to me!', hint: 'emphasis · you' }
    ]
  },
  {
    id: 'a2-prepositions', level: 'A2', title: 'Prepositions & στον / στη / στο',
    short: 'σε, από, με, για… + accusative; σε fuses with the article.',
    explanation: '<p>Common prepositions all take the accusative: <strong>σε</strong> (to/at/in), <strong>από</strong> (from), <strong>με</strong> (with), <strong>για</strong> (for), <strong>χωρίς</strong> (without), <strong>μέχρι</strong> (until), <strong>προς</strong> (towards).</p>' +
      '<p><strong>σε merges with the article:</strong> σε + τον = <em>στον</em>, σε + την = <em>στη(ν)</em>, σε + το = <em>στο</em>, σε + τα = <em>στα</em>.</p>',
    examples: [ { gr: 'Πάω στη δουλειά.', en: 'I’m going to work.' }, { gr: 'Ήρθα από την Αθήνα.', en: 'I came from Athens.' }, { gr: 'Καφές με γάλα, παρακαλώ.', en: 'Coffee with milk, please.' } ],
    more: '<p>The σε-fusion is obligatory — you can’t say “σε το”. “From … to …” = <em>από … μέχρι/ως …</em>. <em>με</em> also means “by” (transport): <em>με το λεωφορείο</em>.</p>',
    items: [
      { text: 'Πάω {b} σχολείο με τα πόδια. (σε + το)', answer: 'στο', choices: ['στο', 'στον', 'στη', 'σε'], en: 'I walk to school.', hint: 'σε + το' },
      { text: 'Μένω {b} Αθήνα εδώ και χρόνια. (σε + την)', answer: 'στην', choices: ['στον', 'στην', 'στο', 'στη'], en: 'I’ve lived in Athens for years.', hint: 'σε + την' },
      { text: 'Αυτό το γράμμα είναι {b} εσένα. (for)', answer: 'για', choices: ['για', 'από', 'με', 'σε'], en: 'This letter is for you.', hint: 'for' },
      { text: 'Δούλεψα {b} το πρωί ως το βράδυ. (from)', answer: 'από', choices: ['από', 'με', 'για', 'προς'], en: 'I worked from morning till evening.', hint: 'from' },
      { text: 'Πήγαμε {b} γιατρό χθες. (σε + τον)', answer: 'στον', choices: ['στον', 'στην', 'στο', 'σε'], en: 'We went to the doctor yesterday.', hint: 'σε + τον' },
      { text: 'Έφυγε {b} να πει αντίο. (without)', answer: 'χωρίς', choices: ['χωρίς', 'με', 'από', 'για'], en: 'He left without saying goodbye.', hint: 'without' }
    ]
  },
  {
    id: 'a2-future-continuous', level: 'A2', title: 'Future continuous (θα + present)',
    short: 'Ongoing/repeated future: θα + present tense.',
    explanation: '<p>For an ongoing or repeated future action, use <strong>θα + the present tense</strong> (not the aorist stem):</p>' +
      '<p><em>θα γράφω</em> = I’ll be writing / will write (regularly) · contrast <em>θα γράψω</em> = I’ll write (once).</p>' +
      '<p>It’s the same one-off vs ongoing choice as everywhere else, just in the future.</p>',
    examples: [ { gr: 'Του χρόνου θα δουλεύω στο εξωτερικό.', en: 'Next year I’ll be working abroad.' }, { gr: 'Θα σε σκέφτομαι κάθε μέρα.', en: 'I’ll be thinking of you every day.' }, { gr: 'Θα περιμένω εδώ.', en: 'I’ll be waiting here.' } ],
    more: '<p><strong>θα + present</strong> = ongoing/habitual; <strong>θα + aorist stem</strong> = single completed act. Negative: <em>δεν θα</em>.</p>',
    items: [
      { text: 'Του χρόνου {b} ελληνικά κάθε μέρα. (μαθαίνω, ongoing)', answer: 'θα μαθαίνω', accept: ['θα μαθαινω'], choices: ['θα μαθαίνω', 'θα μάθω', 'μαθαίνω', 'έμαθα'], en: 'Next year I’ll be learning Greek every day.', hint: 'future continuous · εγώ' },
      { text: 'Κάθε Κυριακή {b} τους γονείς μου. (βλέπω, ongoing)', answer: 'θα βλέπω', accept: ['θα βλεπω'], choices: ['θα βλέπω', 'θα δω', 'βλέπω', 'είδα'], en: 'Every Sunday I’ll be seeing my parents.', hint: 'future continuous · εγώ' },
      { text: 'Από αύριο {b} πιο υγιεινά. (τρώω, ongoing)', answer: 'θα τρώω', accept: ['θα τρωω'], choices: ['θα τρώω', 'θα φάω', 'τρώω', 'έφαγα'], en: 'From tomorrow I’ll be eating more healthily.', hint: 'future continuous · εγώ' },
      { text: 'Όλο το καλοκαίρι τα παιδιά {b} έξω. (παίζω, ongoing)', answer: 'θα παίζουν', choices: ['θα παίζουν', 'θα παίξουν', 'παίζουν', 'έπαιζαν'], en: 'All summer the kids will be playing outside.', hint: 'future continuous · they' },
      { text: 'Μη μου τηλεφωνείς στις εννιά, {b}. (διαβάζω, ongoing)', answer: 'θα διαβάζω', accept: ['θα διαβαζω'], choices: ['θα διαβάζω', 'θα διαβάσω', 'διαβάζω', 'διάβαζα'], en: 'Don’t call me at nine, I’ll be studying.', hint: 'future continuous · εγώ' }
    ]
  },
  {
    id: 'a2-vocative', level: 'A2', title: 'The vocative (addressing someone)',
    short: 'Calling someone: Γιώργο! κύριε! Μαρία!',
    explanation: '<p>When you call or address someone, masculine nouns/names change:</p>' +
      '<div class="g-grid"><div class="g-k">-ος → -ε</div><div class="g-v">ο φίλος → <strong>φίλε!</strong> · κύριος → <strong>κύριε!</strong></div><div class="g-k">first names</div><div class="g-v">Γιώργος → <strong>Γιώργο!</strong> · Νίκος → <strong>Νίκο!</strong></div><div class="g-k">feminine / neuter</div><div class="g-v">unchanged: <strong>Μαρία! · παιδί!</strong></div></div>',
    examples: [ { gr: 'Γιώργο, έλα εδώ!', en: 'George, come here!' }, { gr: 'Καλημέρα, κύριε Παπαδόπουλε!', en: 'Good morning, Mr Papadopoulos!' }, { gr: 'Μαρία, πού είσαι;', en: 'Maria, where are you?' } ],
    more: '<p>Common everyday vocatives: <em>φίλε, ρε, κυρία, αγάπη μου, παιδιά</em>. Most first names just drop the final -ς (Γιώργο, Νίκο, Κώστα, Πέτρο).</p>',
    items: [
      { text: '{b}, έλα εδώ! (Γιώργος)', answer: 'Γιώργο', choices: ['Γιώργο', 'Γιώργος', 'Γιώργου', 'Γιώργε'], en: 'George, come here!', hint: 'vocative of Γιώργος' },
      { text: 'Καλημέρα, {b}! (κύριος)', answer: 'κύριε', choices: ['κύριε', 'κύριος', 'κύριο', 'κυρίου'], en: 'Good morning, sir!', hint: 'vocative of κύριος (-ος → -ε)' },
      { text: '{b}, πού πας τόσο γρήγορα; (Νίκος)', answer: 'Νίκο', choices: ['Νίκο', 'Νίκος', 'Νίκου', 'Νίκε'], en: 'Nikos, where are you going so fast?', hint: 'vocative of Νίκος' },
      { text: 'Σ’ αγαπώ, {b} μου! (αγάπη)', answer: 'αγάπη', choices: ['αγάπη', 'αγάπης', 'αγάπα', 'αγάπε'], en: 'I love you, my love!', hint: 'feminine — unchanged' },
      { text: '{b}, μπορείς να με βοηθήσεις; (φίλος)', answer: 'Φίλε', choices: ['Φίλε', 'Φίλος', 'Φίλο', 'Φίλου'], en: 'Friend, can you help me?', hint: 'vocative of φίλος (-ος → -ε)' }
    ]
  },
  {
    id: 'b1-present-perfect', level: 'B1', title: 'Present perfect (παρακείμενος)',
    short: 'έχω + perfect form: έχω γράψει.',
    explanation: '<p>“I have done”: <strong>έχω</strong> + an invariable perfect form made from the <strong>aorist stem + -ει</strong>:</p>' +
      '<p>γράφω → έγραψα → <strong>έχω γράψει</strong> · διαβάζω → διάβασα → <strong>έχω διαβάσει</strong>.</p>' +
      '<p>Used for completed actions with present relevance and for experience (“ever / never / already / yet”). The second word never changes for person.</p>',
    examples: [ { gr: 'Έχω ζήσει στην Ελλάδα.', en: 'I have lived in Greece.' }, { gr: 'Έχεις δει αυτή την ταινία;', en: 'Have you seen this film?' }, { gr: 'Δεν έχουμε τελειώσει ακόμα.', en: 'We haven’t finished yet.' } ],
    more: '<p>Form: <strong>έχω/έχεις/έχει… + (aorist stem + -ει)</strong>. Only έχω conjugates; the second part is fixed. Great with <em>ποτέ, κιόλας, ήδη, ακόμα</em>.</p>',
    items: [
      { text: 'Δεν {b} ποτέ στην Ελλάδα. (πηγαίνω → έχω πάει)', answer: 'έχω πάει', accept: ['εχω παει'], choices: ['έχω πάει', 'πήγα', 'πηγαίνω', 'θα πάω'], en: 'I have never been to Greece.', hint: 'present perfect · εγώ' },
      { text: '{b} κιόλας το βιβλίο; (διαβάζω → έχεις διαβάσει)', answer: 'Έχεις διαβάσει', accept: ['εχεις διαβασει'], choices: ['Έχεις διαβάσει', 'Διάβασες', 'Διαβάζεις', 'Θα διαβάσεις'], en: 'Have you already read the book?', hint: 'present perfect · εσύ' },
      { text: 'Η ταινία μόλις {b}. (αρχίζω → έχει αρχίσει)', answer: 'έχει αρχίσει', choices: ['έχει αρχίσει', 'άρχισε', 'αρχίζει', 'θα αρχίσει'], en: 'The film has just started.', hint: 'present perfect · it' },
      { text: '{b} ποτέ σου σαλιγκάρια; (τρώω → έχεις φάει)', answer: 'Έχεις φάει', choices: ['Έχεις φάει', 'Έφαγες', 'Τρως', 'Θα φας'], en: 'Have you ever eaten snails?', hint: 'present perfect · εσύ' },
      { text: 'Δεν {b} ακόμα τη δουλειά μου. (τελειώνω → έχω τελειώσει)', answer: 'έχω τελειώσει', choices: ['έχω τελειώσει', 'τελείωσα', 'τελειώνω', 'θα τελειώσω'], en: 'I haven’t finished my work yet.', hint: 'present perfect · εγώ' }
    ]
  },
  {
    id: 'b1-past-perfect', level: 'B1', title: 'Past perfect (υπερσυντέλικος)',
    short: 'είχα + perfect form: είχα γράψει.',
    explanation: '<p>“I had done” — an action completed <strong>before</strong> another point in the past. Form: <strong>είχα</strong> + the same invariable perfect form:</p>' +
      '<p><em>Όταν έφτασα, το τρένο <strong>είχε φύγει</strong>.</em> = When I arrived, the train had left.</p>',
    examples: [ { gr: 'Είχα φάει πριν έρθω.', en: 'I had eaten before I came.' }, { gr: 'Δεν τον είχα ξαναδεί.', en: 'I hadn’t seen him before.' }, { gr: 'Είχαν ήδη φύγει.', en: 'They had already left.' } ],
    more: '<p>Same perfect form as the present perfect, just with <strong>είχα/είχες/είχε…</strong> instead of έχω. It’s the “past before the past”.</p>',
    items: [
      { text: 'Όταν έφτασα, το τρένο {b} ήδη. (φεύγω → είχε φύγει)', answer: 'είχε φύγει', choices: ['είχε φύγει', 'έφυγε', 'φεύγει', 'θα φύγει'], en: 'When I arrived, the train had already left.', hint: 'past perfect · it' },
      { text: 'Δεν πεινούσα γιατί {b} νωρίτερα. (τρώω → είχα φάει)', answer: 'είχα φάει', choices: ['είχα φάει', 'έφαγα', 'τρώω', 'θα φάω'], en: 'I wasn’t hungry because I had eaten earlier.', hint: 'past perfect · εγώ' },
      { text: 'Μέχρι τα δέκα {b} κιόλας πιάνο. (μαθαίνω → είχα μάθει)', answer: 'είχα μάθει', choices: ['είχα μάθει', 'έμαθα', 'μαθαίνω', 'θα μάθω'], en: 'By the age of ten I had already learned piano.', hint: 'past perfect · εγώ' },
      { text: 'Όταν μπήκα, αυτοί {b} τη συζήτηση. (τελειώνω → είχαν τελειώσει)', answer: 'είχαν τελειώσει', choices: ['είχαν τελειώσει', 'τελείωσαν', 'τελειώνουν', 'θα τελειώσουν'], en: 'When I came in, they had finished the conversation.', hint: 'past perfect · they' },
      { text: 'Δεν τον αναγνώρισα· {b} πάρα πολύ. (αλλάζω → είχε αλλάξει)', answer: 'είχε αλλάξει', choices: ['είχε αλλάξει', 'άλλαξε', 'αλλάζει', 'θα αλλάξει'], en: 'I didn’t recognise him; he had changed so much.', hint: 'past perfect · he' }
    ]
  },
  {
    id: 'b1-passive', level: 'B1', title: 'The passive voice',
    short: 'Active → -ομαι: πλένω → πλένομαι; aorist -θηκα.',
    explanation: '<p>Active verbs form a passive in <strong>-ομαι</strong>: πλένω (I wash) → <strong>πλένομαι</strong> (I wash myself / am washed). The present takes the mediopassive endings (-ομαι, -εσαι, -εται…).</p>' +
      '<p>The passive aorist usually ends <strong>-θηκα</strong>: <em>χτίστηκε</em> (was built), <em>πλύθηκα</em> (I was washed).</p>' +
      '<p>The doer (“by …”) is introduced with <strong>από</strong>.</p>',
    examples: [ { gr: 'Το φαγητό μαγειρεύεται τώρα.', en: 'The food is being cooked now.' }, { gr: 'Η εκκλησία χτίστηκε τον 12ο αιώνα.', en: 'The church was built in the 12th century.' }, { gr: 'Τα παιδιά ντύνονται μόνα τους.', en: 'The children dress themselves.' } ],
    more: '<p>Present passive = -ομαι endings; aorist passive = -θηκα/-τηκα. Agent with <strong>από</strong>: <em>χτίστηκε <strong>από</strong> τους Βυζαντινούς</em>.</p>',
    items: [
      { text: 'Το φαγητό {b} σιγά σιγά. (μαγειρεύω → μαγειρεύεται)', answer: 'μαγειρεύεται', choices: ['μαγειρεύεται', 'μαγειρεύει', 'μαγείρεψε', 'μαγειρεύω'], en: 'The food is being cooked slowly.', hint: 'passive · it' },
      { text: 'Κάθε πρωί {b} με κρύο νερό. (πλένομαι)', answer: 'πλένομαι', choices: ['πλένομαι', 'πλένω', 'πλύθηκα', 'πλένεσαι'], en: 'Every morning I wash with cold water.', hint: 'mediopassive · εγώ' },
      { text: 'Αυτά τα προϊόντα {b} σε όλο τον κόσμο. (πουλάω → πουλιούνται)', answer: 'πουλιούνται', choices: ['πουλιούνται', 'πουλάνε', 'πούλησαν', 'πουλάω'], en: 'These products are sold all over the world.', hint: 'passive · they' },
      { text: 'Η εκκλησία {b} τον 12ο αιώνα. (χτίζω → χτίστηκε)', answer: 'χτίστηκε', choices: ['χτίστηκε', 'έχτισε', 'χτίζεται', 'χτίζει'], en: 'The church was built in the 12th century.', hint: 'passive aorist · it' },
      { text: 'Τα παιδιά {b} μόνα τους πια. (ντύνομαι)', answer: 'ντύνονται', choices: ['ντύνονται', 'ντύνουν', 'ντύθηκαν', 'ντύνεσαι'], en: 'The children dress themselves now.', hint: 'mediopassive · they' }
    ]
  },
  {
    id: 'b1-time-clauses', level: 'B1', title: 'Time clauses (πριν, αφού, μόλις, μέχρι)',
    short: 'before / after / as soon as / until.',
    explanation: '<p>Linking events in time:</p>' +
      '<div class="g-grid"><div class="g-k">πριν (να)</div><div class="g-v">before</div><div class="g-k">αφού</div><div class="g-v">after / since</div><div class="g-k">μόλις</div><div class="g-v">as soon as / once</div><div class="g-k">μέχρι / ώσπου να</div><div class="g-v">until</div></div>' +
      '<p><em>μέχρι να</em> and <em>πριν να</em> take the subjunctive; <em>αφού</em> and <em>μόλις</em> take a normal tense.</p>',
    examples: [ { gr: 'Πριν φύγεις, κλείσε το φως.', en: 'Before you leave, turn off the light.' }, { gr: 'Μόλις τελειώσω, θα σε πάρω.', en: 'As soon as I finish, I’ll call you.' }, { gr: 'Περίμενε μέχρι να γυρίσω.', en: 'Wait until I come back.' } ],
    more: '<p><em>πριν</em> = before, <em>αφού</em> = after (also “since/because”), <em>μόλις</em> = the moment that, <em>μέχρι/ώσπου να</em> = until. Don’t confuse <em>πριν</em> (before) with <em>μπροστά</em> (in front of).</p>',
    items: [
      { text: '{b} φύγεις, κλείσε το παράθυρο. (before)', answer: 'Πριν', choices: ['Πριν', 'Αφού', 'Μόλις', 'Ενώ'], en: 'Before you leave, close the window.', hint: 'before' },
      { text: '{b} έφαγα, ένιωσα πολύ καλύτερα. (after)', answer: 'Αφού', choices: ['Αφού', 'Πριν', 'Μέχρι', 'Αν'], en: 'After I ate, I felt much better.', hint: 'after' },
      { text: '{b} δω τα νέα, θα σου πω. (as soon as)', answer: 'Μόλις', choices: ['Μόλις', 'Πριν', 'Αφού', 'Ενώ'], en: 'As soon as I see the news, I’ll tell you.', hint: 'as soon as' },
      { text: 'Περίμενε εδώ {b} να γυρίσω. (until)', answer: 'μέχρι', choices: ['μέχρι', 'πριν', 'μόλις', 'αφού'], en: 'Wait here until I get back.', hint: 'until' },
      { text: '{b} τελειώσεις, μπορούμε να βγούμε. (once / as soon as)', answer: 'Μόλις', choices: ['Μόλις', 'Ενώ', 'Πριν', 'Αν'], en: 'Once you finish, we can go out.', hint: 'as soon as / once' }
    ]
  },
  {
    id: 'b2-passive-participle', level: 'B2', title: 'Passive participle (γραμμένος)',
    short: 'Result/state adjective in -μένος: κουρασμένος, γραμμένο.',
    explanation: '<p>The perfect passive participle ends in <strong>-μένος / -μένη / -μένο</strong> and behaves like an adjective (agreeing in gender, number, case). It describes a resulting state:</p>' +
      '<p>γράφω → <strong>γραμμένος</strong> (written) · κουράζομαι → <strong>κουρασμένος</strong> (tired) · κλείνω → <strong>κλεισμένος</strong>.</p>',
    examples: [ { gr: 'Είμαι πολύ κουρασμένος.', en: 'I’m very tired.' }, { gr: 'Η πόρτα είναι κλειδωμένη.', en: 'The door is locked.' }, { gr: 'Τα τραπέζια είναι στρωμένα.', en: 'The tables are laid.' } ],
    more: '<p>Stress on the penult: <strong>γραμμένος</strong>. It agrees like any adjective and often follows “είμαι” to describe a state (the result of the action).</p>',
    items: [
      { text: 'Είμαι πολύ {b} σήμερα. (κουράζομαι → κουρασμένος)', answer: 'κουρασμένος', choices: ['κουρασμένος', 'κουράζομαι', 'κούρασα', 'κουρασμένη'], en: 'I’m very tired today.', hint: 'participle · masculine' },
      { text: 'Το γράμμα ήταν {b} στα ελληνικά. (γράφω → γραμμένο)', answer: 'γραμμένο', choices: ['γραμμένο', 'γράφει', 'έγραψε', 'γραμμένη'], en: 'The letter was written in Greek.', hint: 'participle · neuter' },
      { text: 'Τα παιδιά είναι {b} για το σχολείο. (ετοιμάζομαι → ετοιμασμένα)', answer: 'ετοιμασμένα', choices: ['ετοιμασμένα', 'ετοιμάζουν', 'ετοίμασαν', 'ετοιμασμένος'], en: 'The children are ready for school.', hint: 'participle · neuter plural' },
      { text: 'Βρήκα το κλειδί {b} κάτω από το χαλί. (κρύβω → κρυμμένο)', answer: 'κρυμμένο', choices: ['κρυμμένο', 'κρύβει', 'έκρυψε', 'κρυμμένη'], en: 'I found the key hidden under the rug.', hint: 'participle · neuter' },
      { text: 'Η σαλάτα είναι ήδη {b}. (φτιάχνω → φτιαγμένη)', answer: 'φτιαγμένη', choices: ['φτιαγμένη', 'φτιάχνει', 'έφτιαξε', 'φτιαγμένο'], en: 'The salad is already made.', hint: 'participle · feminine' }
    ]
  },
  {
    id: 'b2-concessive', level: 'B2', title: 'Although & despite (αν και, παρόλο που)',
    short: 'concession: αν και / παρόλο που / παρά / παρόλα αυτά.',
    explanation: '<p>To say “although / even though”, use <strong>αν και</strong> or <strong>παρόλο που</strong> (+ a normal verb); <strong>μολονότι</strong> is formal.</p>' +
      '<p><strong>παρά</strong> + noun = “despite”. <strong>παρόλα αυτά / ωστόσο</strong> = “nevertheless”.</p>',
    examples: [ { gr: 'Αν και ήταν αργά, βγήκαμε.', en: 'Although it was late, we went out.' }, { gr: 'Παρόλο που έβρεχε, περπατήσαμε.', en: 'Even though it was raining, we walked.' }, { gr: 'Ήταν δύσκολο· ωστόσο, τα κατάφερε.', en: 'It was hard; nevertheless, he managed.' } ],
    more: '<p><em>αν και / παρόλο που</em> introduce a clause (with a verb); <em>παρά</em> takes a noun (“despite the rain” = παρά τη βροχή). Don’t confuse with <em>παρά</em> meaning “than/to” in other contexts.</p>',
    items: [
      { text: '{b} ήταν κουρασμένος, συνέχισε να δουλεύει. (although)', answer: 'Αν και', choices: ['Αν και', 'Επειδή', 'Μόλις', 'Όταν'], en: 'Although he was tired, he kept working.', hint: 'although' },
      { text: '{b} έβρεχε, πήγαμε βόλτα στην παραλία. (even though)', answer: 'Παρόλο που', choices: ['Παρόλο που', 'Γιατί', 'Αφού', 'Αν'], en: 'Even though it was raining, we walked on the beach.', hint: 'even though' },
      { text: 'Δεν τα κατάφερε, {b} προσπάθησε πολύ. (although)', answer: 'αν και', choices: ['αν και', 'γιατί', 'όταν', 'μόλις'], en: 'He didn’t make it, although he tried hard.', hint: 'although' },
      { text: 'Ήταν ακριβό· {b}, το αγόρασα. (nevertheless)', answer: 'παρόλα αυτά', choices: ['παρόλα αυτά', 'επειδή', 'γιατί', 'ώστε'], en: 'It was expensive; nevertheless, I bought it.', hint: 'nevertheless' },
      { text: '{b} τις δυσκολίες, δεν τα παράτησε. (despite + noun)', answer: 'Παρά', choices: ['Παρά', 'Αν και', 'Επειδή', 'Μόλις'], en: 'Despite the difficulties, he didn’t give up.', hint: 'despite + noun' }
    ]
  },
  {
    id: 'b2-conditional-perfect', level: 'B2', title: 'Unreal past (θα είχα κάνει)',
    short: 'If I had…, I would have…',
    explanation: '<p>For something that didn’t happen in the past: <strong>αν + υπερσυντέλικος</strong> in the if-clause, and <strong>θα + παρατατικός</strong> (or θα + υπερσυντέλικος) in the result:</p>' +
      '<p><em>Αν <strong>είχα</strong> φύγει νωρίτερα, <strong>θα πρόλαβα</strong> / <strong>θα είχα προλάβει</strong> το τρένο.</em></p>' +
      '<p>The if-clause never takes θα.</p>',
    examples: [ { gr: 'Αν το ήξερα, θα σου το έλεγα.', en: 'If I had known, I would have told you.' }, { gr: 'Αν δεν έβρεχε, θα είχαμε πάει στην παραλία.', en: 'If it hadn’t rained, we would have gone to the beach.' }, { gr: 'Τι θα έκανες αν είχες κερδίσει;', en: 'What would you have done if you had won?' } ],
    more: '<p>If-clause = <strong>αν + υπερσυντέλικος</strong> (είχα κάνει); result = <strong>θα + παρατατικός</strong> or <strong>θα είχα + perfect</strong>. Contrast present-unreal (αν είχα…, θα έκανα).</p>',
    items: [
      { text: 'Αν {b} νωρίτερα, θα προλάβαινες το τρένο. (φεύγω → είχες φύγει)', answer: 'είχες φύγει', choices: ['είχες φύγει', 'έφυγες', 'φεύγεις', 'θα φύγεις'], en: 'If you had left earlier, you would have caught the train.', hint: 'if-clause · past perfect' },
      { text: 'Αν δεν έβρεχε, {b} στην παραλία. (πηγαίνω → θα είχαμε πάει)', answer: 'θα είχαμε πάει', choices: ['θα είχαμε πάει', 'πήγαμε', 'θα πάμε', 'πηγαίναμε'], en: 'If it hadn’t rained, we would have gone to the beach.', hint: 'result · θα + past perfect' },
      { text: 'Θα σε βοηθούσα αν {b}. (ζητάω → είχες ζητήσει)', answer: 'είχες ζητήσει', choices: ['είχες ζητήσει', 'ζήτησες', 'ζητάς', 'θα ζητήσεις'], en: 'I would have helped you if you had asked.', hint: 'if-clause · past perfect' },
      { text: 'Αν {b} πιο προσεκτικός, δεν θα έσπαγες το ποτήρι. (είμαι → ήσουν)', answer: 'ήσουν', choices: ['ήσουν', 'είσαι', 'θα είσαι', 'ήμουν'], en: 'If you had been more careful, you wouldn’t have broken the glass.', hint: 'if-clause' },
      { text: 'Τι {b} αν είχες κερδίσει το λαχείο; (κάνω → θα έκανες)', answer: 'θα έκανες', choices: ['θα έκανες', 'έκανες', 'κάνεις', 'θα κάνεις'], en: 'What would you have done if you had won the lottery?', hint: 'result · εσύ' }
    ]
  },
  {
    id: 'b2-dipote', level: 'B2', title: '“-ever” words (οποιοσδήποτε, οτιδήποτε)',
    short: 'Add -δήποτε: whoever / whatever / wherever.',
    explanation: '<p>Add <strong>-δήποτε</strong> to a question word for “-ever / any”:</p>' +
      '<div class="g-grid"><div class="g-k">whoever / anyone</div><div class="g-v">οποιοσδήποτε</div><div class="g-k">whatever / anything</div><div class="g-v">οτιδήποτε</div><div class="g-k">wherever</div><div class="g-v">οπουδήποτε</div><div class="g-k">whenever</div><div class="g-v">οποτεδήποτε</div><div class="g-k">(by all means)</div><div class="g-v">οπωσδήποτε</div></div>' +
      '<p><em>οποιοσδήποτε</em> agrees in gender (οποιαδήποτε, οποιοδήποτε).</p>',
    examples: [ { gr: 'Πάρε οτιδήποτε θέλεις.', en: 'Take whatever you want.' }, { gr: 'Έλα οποτεδήποτε.', en: 'Come whenever you like.' }, { gr: 'Πρέπει οπωσδήποτε να πάω.', en: 'I absolutely have to go.' } ],
    more: '<p><strong>οπωσδήποτε</strong> is the odd one out — it means “definitely / by all means”, not “however”. The others mean “any-/-ever”.</p>',
    items: [
      { text: 'Πάρε {b} θέλεις από το ψυγείο. (whatever)', answer: 'οτιδήποτε', choices: ['οτιδήποτε', 'οποιοσδήποτε', 'οπουδήποτε', 'κάτι'], en: 'Take whatever you want from the fridge.', hint: 'whatever' },
      { text: '{b} μπορεί να κάνει αυτή τη δουλειά. (anyone, masc)', answer: 'Οποιοσδήποτε', choices: ['Οποιοσδήποτε', 'Οτιδήποτε', 'Οπουδήποτε', 'Κανένας'], en: 'Anyone can do this job.', hint: 'anyone · masculine' },
      { text: 'Θα σε ακολουθήσω {b} κι αν πας. (wherever)', answer: 'οπουδήποτε', choices: ['οπουδήποτε', 'οτιδήποτε', 'οποτεδήποτε', 'κάπου'], en: 'I’ll follow you wherever you go.', hint: 'wherever' },
      { text: 'Έλα να με δεις {b} θέλεις. (whenever)', answer: 'οποτεδήποτε', choices: ['οποτεδήποτε', 'οπουδήποτε', 'οτιδήποτε', 'πότε'], en: 'Come and see me whenever you like.', hint: 'whenever' },
      { text: 'Πρέπει {b} να τελειώσουμε σήμερα. (definitely)', answer: 'οπωσδήποτε', choices: ['οπωσδήποτε', 'οτιδήποτε', 'οπουδήποτε', 'ίσως'], en: 'We must definitely finish today.', hint: 'definitely / by all means' }
    ]
  }
);

/* ===== Further grammar: adverbs, relatives, reported speech ===== */
window.GRAMMAR.push(
  {
    id: 'a2-adverbs', level: 'A2', title: 'Adverbs & comparison',
    short: 'From adjectives: καλός → καλά; πιο γρήγορα.',
    explanation: '<p>Most adverbs are the <strong>neuter-plural form of the adjective</strong> (-α):</p>' +
      '<div class="g-grid"><div class="g-k">καλός</div><div class="g-v">καλ<strong>ά</strong> (well)</div><div class="g-k">γρήγορος</div><div class="g-v">γρήγορ<strong>α</strong> (quickly)</div><div class="g-k">ωραίος</div><div class="g-v">ωραί<strong>α</strong> (nicely)</div></div>' +
      '<p>Compare with <strong>πιο</strong> (+ adverb): <em>πιο γρήγορα</em>. Irregulars: καλά → <strong>καλύτερα</strong>, πολύ → <strong>περισσότερο</strong>, λίγο → <strong>λιγότερο</strong>.</p>',
    examples: [ { gr: 'Μιλάει πολύ γρήγορα.', en: 'He speaks very fast.' }, { gr: 'Όλα πήγαν καλά.', en: 'Everything went well.' }, { gr: 'Τρέξε πιο γρήγορα!', en: 'Run faster!' } ],
    more: '<p>Adverb = adjective’s neuter plural (-α). A few are lexical (πολύ, λίγο, πάντα, μαζί). Comparatives use πιο, except καλά→καλύτερα, πολύ→περισσότερο.</p>',
    items: [
      { text: 'Μιλάει πολύ {b}. (γρήγορος → γρήγορα)', answer: 'γρήγορα', choices: ['γρήγορα', 'γρήγορος', 'γρήγορο', 'γρήγορη'], en: 'He speaks very fast.', hint: 'adverb from γρήγορος' },
      { text: 'Όλα πήγαν {b}. (καλός → καλά)', answer: 'καλά', choices: ['καλά', 'καλός', 'καλό', 'καλή'], en: 'Everything went well.', hint: 'adverb from καλός' },
      { text: 'Τραγουδάει πολύ {b}. (ωραίος → ωραία)', answer: 'ωραία', choices: ['ωραία', 'ωραίος', 'ωραίο', 'ωραίες'], en: 'She sings very beautifully.', hint: 'adverb' },
      { text: 'Τρέξε πιο {b}! (γρήγορα)', answer: 'γρήγορα', choices: ['γρήγορα', 'γρήγορος', 'καλά', 'πολύ'], en: 'Run faster!', hint: 'πιο + adverb' },
      { text: 'Σήμερα νιώθω {b} από χθες. (better → καλύτερα)', answer: 'καλύτερα', choices: ['καλύτερα', 'καλά', 'καλύτερος', 'πιο καλός'], en: 'Today I feel better than yesterday.', hint: 'irregular adverb: better' }
    ]
  },
  {
    id: 'b1-relatives-oti', level: 'B1', title: 'ό,τι / όποιος / όπου / όσος',
    short: 'whatever / whoever / wherever / as much as.',
    explanation: '<p>The “free relative” words:</p>' +
      '<div class="g-grid"><div class="g-k">ό,τι</div><div class="g-v">whatever (note the comma)</div><div class="g-k">όποιος</div><div class="g-v">whoever / whichever (agrees)</div><div class="g-k">όπου</div><div class="g-v">wherever</div><div class="g-k">όσος</div><div class="g-v">as much / many as (agrees)</div><div class="g-k">όποτε</div><div class="g-v">whenever</div></div>' +
      '<p>Mind <strong>ό,τι</strong> (with a comma = whatever) vs <strong>ότι</strong> (no comma = that).</p>',
    examples: [ { gr: 'Κάνε ό,τι θέλεις.', en: 'Do whatever you want.' }, { gr: 'Όποιος έρθει πρώτος, κερδίζει.', en: 'Whoever comes first wins.' }, { gr: 'Κάθισε όπου θέλεις.', en: 'Sit wherever you like.' } ],
    more: '<p>όποιος and όσος agree in gender/number. ό,τι and όπου don’t change. You can add -δήποτε for extra force (οτιδήποτε, οπουδήποτε).</p>',
    items: [
      { text: 'Κάνε {b} νομίζεις σωστό. (whatever)', answer: 'ό,τι', choices: ['ό,τι', 'όποιος', 'όπου', 'ότι'], en: 'Do whatever you think is right.', hint: 'whatever (with comma)' },
      { text: '{b} έρθει πρώτος, κερδίζει. (whoever, masc)', answer: 'Όποιος', choices: ['Όποιος', 'Ό,τι', 'Όπου', 'Όσος'], en: 'Whoever comes first wins.', hint: 'whoever · masculine' },
      { text: 'Κάθισε {b} θέλεις. (wherever)', answer: 'όπου', choices: ['όπου', 'ό,τι', 'όποιος', 'όποτε'], en: 'Sit wherever you like.', hint: 'wherever' },
      { text: 'Πάρε {b} βιβλία θέλεις. (as many as → όσα)', answer: 'όσα', choices: ['όσα', 'ό,τι', 'όπου', 'όποια'], en: 'Take as many books as you want.', hint: 'as many as · neuter plural' },
      { text: 'Έλα {b} σε βολεύει. (whenever)', answer: 'όποτε', choices: ['όποτε', 'όπου', 'ό,τι', 'όποιος'], en: 'Come whenever suits you.', hint: 'whenever' }
    ]
  },
  {
    id: 'b2-reported-speech', level: 'B2', title: 'Reported speech',
    short: 'ότι (statements), να (requests), αν (yes/no questions).',
    explanation: '<p>To report what someone said, choose the link word by the type of original:</p>' +
      '<div class="g-grid"><div class="g-k">statement</div><div class="g-v">… <strong>ότι / πως</strong> …</div><div class="g-k">request / command</div><div class="g-v">… <strong>να</strong> …</div><div class="g-k">yes/no question</div><div class="g-v">… <strong>αν</strong> …</div><div class="g-k">wh-question</div><div class="g-v">keeps the question word (πού, τι…)</div></div>' +
      '<p>Tenses and pronouns shift as in English: <em>«Θα έρθω» → Είπε ότι θα ερχόταν.</em></p>',
    examples: [ { gr: 'Μου είπε ότι θα αργήσει.', en: 'He told me he’d be late.' }, { gr: 'Μου ζήτησε να τον βοηθήσω.', en: 'He asked me to help him.' }, { gr: 'Με ρώτησε αν θέλω καφέ.', en: 'She asked me if I wanted coffee.' } ],
    more: '<p>statements → ότι/πως; requests/commands → να; yes-no questions → αν; wh-questions keep their word (<em>με ρώτησε πού μένω</em>). Shift tense and pronouns to the speaker’s viewpoint.</p>',
    items: [
      { text: 'Μου είπε {b} θα αργήσει. (statement)', answer: 'ότι', accept: ['πως'], choices: ['ότι', 'να', 'αν', 'που'], en: 'He told me (that) he’ll be late.', hint: 'reported statement' },
      { text: 'Μου ζήτησε {b} τον βοηθήσω. (request)', answer: 'να', choices: ['να', 'ότι', 'αν', 'που'], en: 'He asked me to help him.', hint: 'reported request' },
      { text: 'Με ρώτησε {b} θέλω καφέ. (yes/no question)', answer: 'αν', choices: ['αν', 'ότι', 'να', 'πως'], en: 'She asked me if I wanted coffee.', hint: 'reported yes/no question' },
      { text: 'Είπαν {b} δεν θα έρθουν. (statement)', answer: 'ότι', accept: ['πως'], choices: ['ότι', 'να', 'αν', 'που'], en: 'They said (that) they won’t come.', hint: 'reported statement' },
      { text: 'Μας είπε {b} περιμένουμε εδώ. (command)', answer: 'να', choices: ['να', 'ότι', 'αν', 'που'], en: 'He told us to wait here.', hint: 'reported command' }
    ]
  }
);

/* ===== Expansion from standard A1–C1 coursebooks (place, numbers, indirect object,
   plurals, there is/are, double clitics, cause/result, impersonals, wishes) ===== */
window.GRAMMAR.push(
  {
    id: 'a1-place-prepositions', level: 'A1', title: 'Prepositions of place',
    short: 'πάνω σε, κάτω από, δίπλα σε, μπροστά από…',
    explanation: '<p>Location is shown by two-word prepositions, all taking the accusative (σε fuses with the article):</p>' +
      '<div class="g-grid"><div class="g-k">on</div><div class="g-v">πάνω σε</div><div class="g-k">under</div><div class="g-v">κάτω από</div><div class="g-k">in / inside</div><div class="g-v">μέσα σε</div><div class="g-k">next to</div><div class="g-v">δίπλα σε</div><div class="g-k">in front of / behind</div><div class="g-v">μπροστά από / πίσω από</div><div class="g-k">opposite / near</div><div class="g-v">απέναντι από / κοντά σε</div></div>',
    examples: [ { gr: 'Το βιβλίο είναι πάνω στο τραπέζι.', en: 'The book is on the table.' }, { gr: 'Η στάση είναι απέναντι από την τράπεζα.', en: 'The stop is opposite the bank.' }, { gr: 'Κάθισε δίπλα μου.', en: 'Sit next to me.' } ],
    more: '<p>Most are <em>place-word + σε/από</em>. With σε the article merges: <em>πάνω στο, μέσα στην</em>. δίπλα/κοντά/απέναντι take σε; κάτω/πίσω/μπροστά/μακριά take από.</p>',
    items: [
      { text: 'Το βιβλίο είναι {b} στο τραπέζι. (on)', answer: 'πάνω', choices: ['πάνω', 'κάτω', 'δίπλα', 'μέσα'], en: 'The book is on the table.', hint: 'on (πάνω σε)' },
      { text: 'Η γάτα κρύβεται {b} από τον καναπέ. (under)', answer: 'κάτω', choices: ['κάτω', 'πάνω', 'δίπλα', 'πίσω'], en: 'The cat is hiding under the sofa.', hint: 'under' },
      { text: 'Το φαρμακείο είναι {b} από την τράπεζα. (opposite)', answer: 'απέναντι', choices: ['απέναντι', 'μέσα', 'πάνω', 'κοντά'], en: 'The pharmacy is opposite the bank.', hint: 'opposite' },
      { text: 'Υπάρχει ένα πάρκο {b} από το σπίτι μας. (behind)', answer: 'πίσω', choices: ['πίσω', 'μπροστά', 'πάνω', 'μέσα'], en: 'There is a park behind our house.', hint: 'behind' },
      { text: 'Τα κλειδιά είναι {b} στην τσάντα. (inside)', answer: 'μέσα', choices: ['μέσα', 'πάνω', 'κάτω', 'δίπλα'], en: 'The keys are inside the bag.', hint: 'inside (μέσα σε)' }
    ]
  },
  {
    id: 'a1-numbers-agreement', level: 'A1', title: 'Numbers that agree (1, 3, 4)',
    short: 'ένας/μία/ένα, τρεις/τρία, τέσσερις/τέσσερα.',
    explanation: '<p>Only <strong>1, 3, 4</strong> (and numbers ending in them) change for gender; 2 and 5+ never change:</p>' +
      '<div class="g-grid"><div class="g-k">1</div><div class="g-v">ένας / μία / ένα</div><div class="g-k">3</div><div class="g-v">τρεις (m/f) / τρία (n)</div><div class="g-k">4</div><div class="g-v">τέσσερις (m/f) / τέσσερα (n)</div><div class="g-k">2, 5, 6…</div><div class="g-v">δύο, πέντε, έξι… (invariable)</div></div>',
    examples: [ { gr: 'Έχω τρεις αδερφές.', en: 'I have three sisters.' }, { gr: 'Αγόρασα τέσσερα μήλα.', en: 'I bought four apples.' }, { gr: 'Μένω εδώ πέντε χρόνια.', en: 'I’ve lived here five years.' } ],
    more: '<p>Numbers ending in 1/3/4 also agree (είκοσι μία, τριάντα τρεις). Hundreds agree too: διακόσιοι / διακόσιες / διακόσια.</p>',
    items: [
      { text: 'Θέλω {b} καφέ, παρακαλώ. (one · masc)', answer: 'έναν', choices: ['έναν', 'μία', 'ένα', 'ένας'], en: 'I want one coffee, please.', hint: 'one · masculine accusative' },
      { text: 'Έχω {b} αδερφές. (three · fem)', answer: 'τρεις', choices: ['τρεις', 'τρία', 'τριών', 'τρες'], en: 'I have three sisters.', hint: 'three · feminine' },
      { text: 'Αγόρασα {b} μήλα. (four · neuter)', answer: 'τέσσερα', choices: ['τέσσερα', 'τέσσερις', 'τεσσάρων', 'τέσσερο'], en: 'I bought four apples.', hint: 'four · neuter' },
      { text: 'Έχω {b} παιδιά. (two · invariable)', answer: 'δύο', accept: ['δυο'], choices: ['δύο', 'δύα', 'δυών', 'δύους'], en: 'I have two children.', hint: 'two (no change)' },
      { text: 'Ήρθαν {b} φίλοι. (three · masc)', answer: 'τρεις', choices: ['τρεις', 'τρία', 'τριών', 'τρες'], en: 'Three friends came.', hint: 'three · masculine' }
    ]
  },
  {
    id: 'a2-indirect-object', level: 'A2', title: 'Indirect object & μου αρέσει',
    short: 'μου, σου, του… before the verb: μου δίνει, μου αρέσει.',
    explanation: '<p>The weak <strong>genitive</strong> pronouns mark “to me / to you…”. They sit before the verb:</p>' +
      '<div class="g-grid"><div class="g-k">to me / you</div><div class="g-v">μου / σου</div><div class="g-k">to him / her / it</div><div class="g-v">του / της / του</div><div class="g-k">to us / you / them</div><div class="g-v">μας / σας / τους</div></div>' +
      '<p>The hugely common <strong>μου αρέσει</strong> (“it pleases me” = I like) works this way. It agrees with the thing liked: <em>μου αρέσει</em> (one) / <em>μου αρέσουν</em> (many).</p>',
    examples: [ { gr: 'Μου αρέσει η ελληνική μουσική.', en: 'I like Greek music.' }, { gr: 'Της έδωσα ένα δώρο.', en: 'I gave her a present.' }, { gr: 'Τι σου αρέσει να κάνεις;', en: 'What do you like to do?' } ],
    more: '<p>These are the same forms as the possessives, but they go <strong>before</strong> the verb (possessives go after a noun). <em>αρέσει/αρέσουν</em> agree with what is liked, not the person. Emphatic: <em>Εμένα μου αρέσει.</em></p>',
    items: [
      { text: '{b} αρέσει η ελληνική μουσική. (I like → to me)', answer: 'Μου', choices: ['Μου', 'Με', 'Εγώ', 'Εμένα'], en: 'I like Greek music.', hint: 'to me (μου αρέσει)' },
      { text: 'Μου {b} τα γλυκά. (subject is plural)', answer: 'αρέσουν', choices: ['αρέσουν', 'αρέσει', 'αρέσω', 'άρεσε'], en: 'I like sweets.', hint: 'τα γλυκά (plural) → αρέσουν' },
      { text: '{b} έδωσε ένα δώρο. (to him)', answer: 'Του', choices: ['Του', 'Τον', 'Αυτός', 'Τους'], en: 'She gave him a present.', hint: 'indirect object: to him' },
      { text: 'Τι {b} αρέσει να κάνεις; (to you)', answer: 'σου', choices: ['σου', 'σε', 'εσύ', 'σας'], en: 'What do you like to do?', hint: 'to you' },
      { text: '{b} τηλεφώνησε η μητέρα μου. (to me)', answer: 'Μου', choices: ['Μου', 'Με', 'Εγώ', 'Εμένα'], en: 'My mother phoned me.', hint: 'τηλεφωνώ takes an indirect object' }
    ]
  },
  {
    id: 'a2-direct-vs-indirect', level: 'A2', title: 'Direct or indirect? (τον βλέπω vs του μιλάω)',
    short: 'Direct object → με, σε, τον… Indirect (to/for) → μου, σου, του…',
    explanation: '<p>Greek has TWO sets of weak object pronouns, and the verb decides which one you need:</p>' +
      '<div class="g-grid"><div class="g-k">DIRECT (accusative)</div><div class="g-v">με, σε, τον / την / το, μας, σας, τους / τις / τα</div>' +
      '<div class="g-k">INDIRECT (genitive)</div><div class="g-v">μου, σου, του / της / του, μας, σας, τους</div></div>' +
      '<p><strong>Direct</strong> = the thing/person the action lands on: <em>Τον βλέπω.</em> (I see him.) <em>Την ξέρω.</em> (I know her.)</p>' +
      '<p><strong>Indirect</strong> = the receiver (“to / for” someone): <em>Του μιλάω.</em> (I talk to him.) <em>Της έδωσα το βιβλίο.</em> (I gave her the book.)</p>' +
      '<p>The test: with a full noun the indirect object takes <strong>σε + accusative</strong> — <em>Μιλάω <strong>στον</strong> Γιώργο</em>. Swap the noun for a pronoun and σε+noun becomes the genitive clitic: <em><strong>Του</strong> μιλάω</em>.</p>',
    examples: [ { gr: 'Τον βλέπω κάθε μέρα.', en: 'I see him every day. (direct)' }, { gr: 'Του μιλάω κάθε μέρα.', en: 'I talk to him every day. (indirect)' }, { gr: 'Της έστειλα ένα μήνυμα.', en: 'I sent her a message.' }, { gr: 'Σε βοηθάω. — όχι «σου βοηθάω»!', en: 'I am helping you. (βοηθάω takes a direct object)' } ],
    more: '<p>Trap verbs — Greek picks the opposite case from English:</p><ul class="g-tips">' +
      '<li><strong>Direct in Greek</strong> (even though English says “to/for”): βοηθάω (<em>σε βοηθάω</em>), ευχαριστώ (<em>σε ευχαριστώ</em>), ρωτάω (<em>τον ρώτησα</em>), περιμένω (<em>σε περιμένω</em>), ακούω, χρειάζομαι.</li>' +
      '<li><strong>Indirect in Greek</strong> (genitive): τηλεφωνώ (<em>της τηλεφώνησα</em>), μιλάω, μοιάζω (<em>της μοιάζεις</em>), αρέσω, χρωστάω, and the give/say/send family: δίνω, λέω, στέλνω, δείχνω, φέρνω, γράφω, εξηγώ, αγοράζω (for someone).</li>' +
      '<li>Weak pronouns replace <strong>definite</strong> things only: <em>Θέλεις τον καφέ σου; — Ναι, τον θέλω.</em> But <em>Θέλεις καφέ; — Ναι, θέλω</em> (no pronoun).</li></ul>',
    items: [
      { text: '{b} βλέπω κάθε μέρα στο λεωφορείο. (him)', answer: 'Τον', choices: ['Τον', 'Του', 'Της', 'Σε'], en: 'I see him on the bus every day.', hint: 'see = direct object' },
      { text: '{b} μιλάω σχεδόν κάθε μέρα. (to him)', answer: 'Του', choices: ['Του', 'Τον', 'Το', 'Σε'], en: 'I talk to him almost every day.', hint: 'talk TO → indirect (genitive)' },
      { text: '{b} έστειλα ένα μήνυμα το πρωί. (to her)', answer: 'Της', choices: ['Της', 'Την', 'Τη', 'Του'], en: 'I sent her a message this morning.', hint: 'send TO → genitive' },
      { text: '{b} ξέρεις καλά; (her)', answer: 'Την', choices: ['Την', 'Της', 'Σου', 'Τη'], en: 'Do you know her well?', hint: 'know = direct' },
      { text: '{b} βοήθησε πολύ με τη μετακόμιση. (me)', answer: 'Με', choices: ['Με', 'Μου', 'Μας', 'Σε'], en: 'He helped me a lot with the move.', hint: 'βοηθάω takes a DIRECT object in Greek' },
      { text: '{b} τηλεφώνησα χθες, αλλά δεν απάντησε. (to her)', answer: 'Της', choices: ['Της', 'Την', 'Το', 'Με'], en: 'I phoned her yesterday, but she didn’t answer.', hint: 'τηλεφωνώ + genitive' },
      { text: '{b} ευχαριστώ πολύ για τη βοήθεια. (you, sing.)', answer: 'Σε', choices: ['Σε', 'Σου', 'Σας', 'Μου'], en: 'Thank you very much for the help.', hint: 'ευχαριστώ = direct' },
      { text: '{b} ρώτησα τι ώρα είναι. (him)', answer: 'Τον', choices: ['Τον', 'Του', 'Το', 'Την'], en: 'I asked him what time it is.', hint: 'ρωτάω = direct' },
      { text: '{b} έδωσες τα λεφτά; (to them)', answer: 'Τους', choices: ['Τους', 'Τις', 'Τα', 'Του'], en: 'Did you give them the money?', hint: 'give TO → genitive plural' },
      { text: '{b} περιμένουμε από τις οχτώ! (you, pl.)', answer: 'Σας', choices: ['Σας', 'Σου', 'Σε', 'Τους'], en: 'We have been waiting for you since eight!', hint: 'περιμένω = direct' },
      { text: '{b} μοιάζεις πολύ — ίδια μάτια, ίδιο χαμόγελο. (her)', answer: 'Της', choices: ['Της', 'Την', 'Τη', 'Σου'], en: 'You look a lot like her — same eyes, same smile.', hint: 'μοιάζω + genitive' },
      { text: 'Ο Γιάννης; {b} άκουσα να φωνάζει από κάτω. (him)', answer: 'Τον', choices: ['Τον', 'Του', 'Το', 'Με'], en: 'Giannis? I heard him shouting from downstairs.', hint: 'ακούω = direct' },
      { text: '{b} έδειξα τις φωτογραφίες των διακοπών. (to them)', answer: 'Τους', choices: ['Τους', 'Τις', 'Τα', 'Της'], en: 'I showed them the holiday photos.', hint: 'show TO → genitive' },
      { text: 'Οι φίλες μου; {b} είδα στην αγορά το πρωί. (them, fem.)', answer: 'Τις', choices: ['Τις', 'Τους', 'Τα', 'Της'], en: 'My friends? I saw them at the market this morning.', hint: 'feminine plural direct = τις' }
    ]
  },
  {
    id: 'a2-noun-plurals', level: 'A2', title: 'Noun plurals',
    short: '-ος→-οι, -α/-η→-ες, -ο→-α, -ι→-ια, -μα→-ματα.',
    explanation: '<p>The main plural patterns:</p>' +
      '<div class="g-grid"><div class="g-k">ο -ος</div><div class="g-v">→ οι -οι (φίλος → φίλοι)</div><div class="g-k">ο -ης / -ας</div><div class="g-v">→ -ες (μαθητής → μαθητές)</div><div class="g-k">η -α / -η</div><div class="g-v">→ -ες (γυναίκα → γυναίκες)</div><div class="g-k">το -ο</div><div class="g-v">→ -α (βιβλίο → βιβλία)</div><div class="g-k">το -ι</div><div class="g-v">→ -ια (παιδί → παιδιά)</div><div class="g-k">το -μα</div><div class="g-v">→ -ματα (πρόβλημα → προβλήματα)</div></div>',
    examples: [ { gr: 'οι φίλοι, οι δρόμοι', en: 'the friends, the streets' }, { gr: 'τα παιδιά, τα κλειδιά', en: 'the children, the keys' }, { gr: 'οι πόλεις, οι λέξεις', en: 'the cities, the words' } ],
    more: '<p>A useful sub-pattern: feminine nouns in <strong>-ση/-ξη/-ψη</strong> make <strong>-εις</strong> (η πόλη → οι πόλεις, η λέξη → οι λέξεις). The stress can shift in the plural.</p>',
    items: [
      { text: 'ο φίλος → οι {b}', answer: 'φίλοι', choices: ['φίλοι', 'φίλες', 'φίλους', 'φιλιά'], en: 'the friends', hint: '-ος → -οι' },
      { text: 'το βιβλίο → τα {b}', answer: 'βιβλία', choices: ['βιβλία', 'βιβλίοι', 'βιβλίες', 'βιβλιά'], en: 'the books', hint: '-ο → -α' },
      { text: 'η γυναίκα → οι {b}', answer: 'γυναίκες', choices: ['γυναίκες', 'γυναίκα', 'γυναίκοι', 'γυναικιά'], en: 'the women', hint: '-α → -ες' },
      { text: 'το παιδί → τα {b}', answer: 'παιδιά', choices: ['παιδιά', 'παιδία', 'παιδές', 'παιδιού'], en: 'the children', hint: '-ί → -ιά' },
      { text: 'το πρόβλημα → τα {b}', answer: 'προβλήματα', choices: ['προβλήματα', 'προβλήμα', 'προβλήμες', 'προβληματιά'], en: 'the problems', hint: '-μα → -ματα' },
      { text: 'ο μαθητής → οι {b}', answer: 'μαθητές', choices: ['μαθητές', 'μαθητοί', 'μαθητάδες', 'μαθητία'], en: 'the students', hint: '-ής → -ές' }
    ]
  },
  {
    id: 'a2-there-is', level: 'A2', title: 'There is / there are (υπάρχει)',
    short: 'υπάρχει / υπάρχουν; colloquial έχει.',
    explanation: '<p>“There is / there are” = <strong>υπάρχει</strong> (singular) / <strong>υπάρχουν</strong> (plural), agreeing with the noun.</p>' +
      '<p>Very common in speech is the invariable <strong>έχει</strong>: <em>Έχει κόσμο</em> (it’s crowded), <em>Έχει φαγητό;</em> (is there food?).</p>',
    examples: [ { gr: 'Υπάρχει ένα πρόβλημα.', en: 'There is a problem.' }, { gr: 'Υπάρχουν πολλά εστιατόρια εδώ.', en: 'There are many restaurants here.' }, { gr: 'Έχει κόσμο σήμερα.', en: 'It’s crowded today.' } ],
    more: '<p>υπάρχει/υπάρχουν agree with the noun; <strong>έχει</strong> never changes. Negative: <em>δεν υπάρχει / δεν έχει</em>.</p>',
    items: [
      { text: '{b} ένα πρόβλημα. (there is)', answer: 'Υπάρχει', choices: ['Υπάρχει', 'Υπάρχουν', 'Είναι', 'Έχω'], en: 'There is a problem.', hint: 'there is · singular' },
      { text: '{b} πολλά εστιατόρια εδώ. (there are)', answer: 'Υπάρχουν', choices: ['Υπάρχει', 'Υπάρχουν', 'Είναι', 'Έχει'], en: 'There are many restaurants here.', hint: 'there are · plural' },
      { text: 'Δεν {b} κανείς στο σπίτι. (there isn’t)', answer: 'υπάρχει', choices: ['υπάρχει', 'υπάρχουν', 'είναι', 'έχουν'], en: 'There’s no one at home.', hint: 'there isn’t' },
      { text: '{b} κόσμο σήμερα στην πλατεία. (colloquial: there’s)', answer: 'Έχει', choices: ['Έχει', 'Έχουν', 'Υπάρχουν', 'Είναι'], en: 'It’s crowded in the square today.', hint: 'colloquial “there is” (invariable)' }
    ]
  },
  {
    id: 'b1-double-clitics', level: 'B1', title: 'Double object pronouns',
    short: 'Indirect before direct: μου το έδωσε.',
    explanation: '<p>When both objects are pronouns, the <strong>indirect (genitive) comes first</strong>, then the direct (accusative), then the verb:</p>' +
      '<p><em><strong>Μου το</strong> έδωσε.</em> = He gave it to me. · <em><strong>Σου τα</strong> στέλνω.</em> = I’m sending them to you.</p>' +
      '<p>Order: <strong>[μου/σου/του…] [το/τη/τον/τα…] + verb</strong>.</p>',
    examples: [ { gr: 'Σου το έδωσα χθες.', en: 'I gave it to you yesterday.' }, { gr: 'Της τα έστειλα.', en: 'I sent them to her.' }, { gr: 'Δώσ’ μου το!', en: 'Give it to me!' } ],
    more: '<p>After a <strong>positive command</strong> they jump after the verb: <em>Δώσ’ μου το!</em> The order stays indirect-then-direct.</p>',
    items: [
      { text: 'Το βιβλίο; {b} έδωσα χθες. (to you + it)', answer: 'Σου το', choices: ['Σου το', 'Το σου', 'Σε το', 'Σου τον'], en: 'The book? I gave it to you yesterday.', hint: 'to you + it' },
      { text: 'Πού είναι τα κλειδιά; {b} έδωσα. (to him + them)', answer: 'Του τα', choices: ['Του τα', 'Τα του', 'Του το', 'Τους τα'], en: 'Where are the keys? I gave them to him.', hint: 'to him + them (neuter pl)' },
      { text: 'Αν θες το στιλό, {b} δίνω. (to you + it)', answer: 'σου το', choices: ['σου το', 'το σου', 'σε το', 'σου τον'], en: 'If you want the pen, I’ll give it to you.', hint: 'to you + it (neuter)' },
      { text: 'Μην {b} πεις, θέλω έκπληξη! (to me + it)', answer: 'μου το', choices: ['μου το', 'το μου', 'με το', 'μου τον'], en: 'Don’t tell it to me, I want a surprise!', hint: 'to me + it' },
      { text: 'Της αρέσει το τραγούδι· {b} τραγουδάω συχνά. (to her + it)', answer: 'της το', choices: ['της το', 'το της', 'τη το', 'της τον'], en: 'She likes the song; I sing it to her often.', hint: 'to her + it' }
    ]
  },
  {
    id: 'b1-clitic-placement', level: 'B1', title: 'Pronoun placement (πες μου, μη μου το πεις)',
    short: 'Before the verb — but AFTER a positive command: Πες μου!',
    explanation: '<p>Where does the weak pronoun go? Three rules cover almost everything:</p>' +
      '<div class="g-grid"><div class="g-k">1. Normal verb</div><div class="g-v">BEFORE it: <em>Σε βλέπω.</em></div>' +
      '<div class="g-k">— with δεν / θα / να</div><div class="g-v">still right before the verb: <em>Δεν σε βλέπω. Θα σου πω. Θέλω να του μιλήσω.</em></div>' +
      '<div class="g-k">2. Positive command</div><div class="g-v">AFTER it: <em>Πες μου! Δώσε της το βιβλίο!</em></div>' +
      '<div class="g-k">3. Negative command</div><div class="g-v">μη(ν) + verb is not an imperative, so back in front: <em>Μη με περιμένεις!</em></div></div>' +
      '<p>The gerund behaves like a positive command — the pronoun follows: <em>βλέποντάς τον</em>, <em>ακούγοντάς την</em>.</p>',
    examples: [ { gr: 'Θα σου πω αύριο.', en: 'I’ll tell you tomorrow.' }, { gr: 'Πες μου την αλήθεια!', en: 'Tell me the truth!' }, { gr: 'Μη με περιμένεις.', en: 'Don’t wait for me.' }, { gr: 'Βοήθησέ με, σε παρακαλώ!', en: 'Help me, please!' } ],
    more: '<p>When the pronoun follows the verb and the verb is stressed three syllables from the end, a <strong>second accent</strong> appears: <em>Βοήθησέ με! · Άκουσέ την! · διαβάζοντάς το</em>.</p>' +
      '<p>With two pronouns the order stays indirect-then-direct in front of the verb (<em>μου το έδωσε</em>) and after a command (<em>Δώσε μού το!</em>).</p>',
    items: [
      { text: '{b} την αλήθεια! (tell me)', answer: 'Πες μου', choices: ['Πες μου', 'Μου πες', 'Πες με', 'Με πες'], en: 'Tell me the truth!', hint: 'positive command → pronoun after' },
      { text: 'Μη {b} ξυπνήσεις — κοιμάται. (her)', answer: 'την', choices: ['την', 'της', 'το', 'με'], en: 'Don’t wake her — she’s sleeping.', hint: 'negative command → pronoun BEFORE the verb' },
      { text: 'Θα {b} πάρω τηλέφωνο αύριο. (you, sing.)', answer: 'σε', choices: ['σε', 'σου', 'εσένα', 'σας'], en: 'I’ll call you tomorrow.', hint: 'right before the verb, after θα · παίρνω τηλέφωνο = direct' },
      { text: 'Θέλω να {b} πω κάτι σημαντικό. (to you)', answer: 'σου', choices: ['σου', 'σε', 'σένα', 'σας'], en: 'I want to tell you something important.', hint: 'before the verb after να' },
      { text: '{b}, σε παρακαλώ! (help me!)', answer: 'Βοήθησέ με', choices: ['Βοήθησέ με', 'Με βοήθησε', 'Βοήθησέ μου', 'Μου βοήθησε'], en: 'Help me, please!', hint: 'command → after; βοηθάω = direct; note the second accent' },
      { text: 'Δώσε {b} λίγο νερό, σε παρακαλώ. (to me)', answer: 'μου', choices: ['μου', 'με', 'εμένα', 'σου'], en: 'Give me some water, please.', hint: 'positive command → after the verb' },
      { text: 'Ωραίο τραγούδι — βάλ’ {b} ξανά! (it)', answer: 'το', choices: ['το', 'του', 'τον', 'μου'], en: 'Nice song — put it on again!' },
      { text: 'Μην {b} περιμένετε — θα αργήσω πολύ. (me)', answer: 'με', choices: ['με', 'μου', 'εμένα', 'μας'], en: 'Don’t wait for me — I’ll be very late.', hint: 'μη(ν) → pronoun in front again' },
      { text: 'Δεν {b} είδα πουθενά σήμερα. (them, neuter)', answer: 'τα', choices: ['τα', 'τους', 'τις', 'της'], en: 'I didn’t see them anywhere today.', hint: 'δεν + pronoun + verb' },
      { text: 'Πάρε {b} όταν φτάσεις. (me)', answer: 'με', choices: ['με', 'μου', 'εμένα', 'μας'], en: 'Call me when you arrive.', hint: 'command → after' },
      { text: 'Ακούγοντάς {b}, κατάλαβα ότι ήταν κουρασμένη. (her)', answer: 'την', choices: ['την', 'της', 'το', 'μου'], en: 'Hearing her, I realised she was tired.', hint: 'gerund → pronoun follows' },
      { text: 'Θα {b} στείλω τη διεύθυνση με μήνυμα. (to you)', answer: 'σου', choices: ['σου', 'σε', 'εσένα', 'μου'], en: 'I’ll text you the address.', hint: 'send TO → genitive, before the verb' }
    ]
  },
  {
    id: 'b1-cause-result', level: 'B1', title: 'Cause & result (γι’ αυτό, λόγω)',
    short: 'γι’ αυτό / έτσι / άρα; λόγω + genitive.',
    explanation: '<p>Linking a cause to its consequence:</p>' +
      '<div class="g-grid"><div class="g-k">so / that’s why</div><div class="g-v">γι’ αυτό</div><div class="g-k">so / thus</div><div class="g-v">έτσι</div><div class="g-k">therefore</div><div class="g-v">επομένως / άρα</div><div class="g-k">because of + noun</div><div class="g-v">λόγω / εξαιτίας (+ genitive)</div></div>' +
      '<p>Compare with cause clauses (γιατί, επειδή + a verb).</p>',
    examples: [ { gr: 'Ήταν άρρωστος, γι’ αυτό δεν ήρθε.', en: 'He was ill, so he didn’t come.' }, { gr: 'Ακυρώθηκε λόγω του καιρού.', en: 'It was cancelled because of the weather.' }, { gr: 'Σκέφτομαι, άρα υπάρχω.', en: 'I think, therefore I am.' } ],
    more: '<p><em>γι’ αυτό / έτσι / επομένως / άρα</em> introduce the result; <em>γιατί / επειδή</em> introduce a cause clause (+ verb); <em>λόγω / εξαιτίας</em> take a cause as a noun in the genitive.</p>',
    items: [
      { text: 'Ήταν άρρωστος, {b} δεν ήρθε. (so / that’s why)', answer: 'γι’ αυτό', choices: ['γι’ αυτό', 'γιατί', 'αν', 'όταν'], en: 'He was ill, so he didn’t come.', hint: 'so / that’s why' },
      { text: 'Δεν διάβασα, {b} απέτυχα. (so)', answer: 'γι’ αυτό', choices: ['γι’ αυτό', 'επειδή', 'ενώ', 'μόλις'], en: 'I didn’t study, so I failed.', hint: 'so' },
      { text: 'Ακυρώθηκε η πτήση {b} του καιρού. (because of + noun)', answer: 'λόγω', choices: ['λόγω', 'γιατί', 'επειδή', 'αφού'], en: 'The flight was cancelled because of the weather.', hint: 'because of + genitive' },
      { text: 'Σκέφτομαι, {b} υπάρχω. (therefore)', answer: 'άρα', choices: ['άρα', 'αν', 'όταν', 'γιατί'], en: 'I think, therefore I am.', hint: 'therefore' }
    ]
  },
  {
    id: 'b2-impersonal', level: 'B2', title: 'Impersonal verbs (πρέπει, χρειάζεται)',
    short: '3rd-person-only + να: πρέπει να, μπορεί να…',
    explanation: '<p>Some verbs are used only in the 3rd singular (“it”), usually with <strong>να</strong>:</p>' +
      '<div class="g-grid"><div class="g-k">πρέπει να</div><div class="g-v">must / have to</div><div class="g-k">μπορεί να</div><div class="g-v">may / might</div><div class="g-k">χρειάζεται να</div><div class="g-v">need to</div><div class="g-k">αξίζει να</div><div class="g-v">it’s worth</div><div class="g-k">φαίνεται ότι/να</div><div class="g-v">it seems</div></div>' +
      '<p>The person is shown by the verb after να: <em>πρέπει να φύγω</em> = I must leave.</p>',
    examples: [ { gr: 'Πρέπει να φύγουμε τώρα.', en: 'We must leave now.' }, { gr: 'Μπορεί να βρέξει.', en: 'It may rain.' }, { gr: 'Αξίζει να το δεις.', en: 'It’s worth seeing.' } ],
    more: '<p>These stay 3rd-singular no matter who the action is about — only the verb after να changes for person. <em>πρέπει</em> has no “I/you” forms.</p>',
    items: [
      { text: '{b} να φύγουμε τώρα. (must)', answer: 'Πρέπει', choices: ['Πρέπει', 'Μπορώ', 'Θέλω', 'Είναι'], en: 'We must leave now.', hint: 'must (impersonal)' },
      { text: '{b} να βρέξει αργότερα. (may / might)', answer: 'Μπορεί', choices: ['Μπορεί', 'Πρέπει', 'Θέλει', 'Είναι'], en: 'It may rain later.', hint: 'it may' },
      { text: 'Δεν {b} να ανησυχείς. (need)', answer: 'χρειάζεται', choices: ['χρειάζεται', 'πρέπεις', 'μπορείς', 'θέλεις'], en: 'You don’t need to worry.', hint: 'it’s necessary' },
      { text: '{b} να δεις αυτή την ταινία. (it’s worth)', answer: 'Αξίζει', choices: ['Αξίζει', 'Πρέπει', 'Μπορεί', 'Φαίνεται'], en: 'It’s worth seeing this film.', hint: 'it’s worth' },
      { text: '{b} ότι θα αργήσουν. (it seems)', answer: 'Φαίνεται', choices: ['Φαίνεται', 'Πρέπει', 'Αξίζει', 'Μπορεί'], en: 'It seems they’ll be late.', hint: 'it seems' }
    ]
  },
  {
    id: 'b2-wishes', level: 'B2', title: 'Wishes & μακάρι',
    short: 'μακάρι να… / να… for wishes.',
    explanation: '<p>Wishes use <strong>να</strong> or <strong>μακάρι να</strong> + verb:</p>' +
      '<p><em>Μακάρι να έρθεις!</em> = I hope you come! · <em>Μακάρι να ήμουν εκεί!</em> = If only I were there! (unreal, with the παρατατικός).</p>' +
      '<p>Fixed wish phrases start with να: <em>να περάσεις καλά</em> (have a good time), <em>να ’σαι καλά</em> (bless you).</p>',
    examples: [ { gr: 'Μακάρι να έρθεις στο πάρτι!', en: 'I hope you come to the party!' }, { gr: 'Να περάσεις καλά!', en: 'Have a good time!' }, { gr: 'Να ’σαι καλά!', en: 'Bless you! / Thanks!' } ],
    more: '<p><em>μακάρι να + present/aorist</em> = a hopeful wish; <em>μακάρι να + παρατατικός</em> = an unreal wish/regret. Lots of set blessings start with να (να ζήσεις, να χαίρεσαι…).</p>',
    items: [
      { text: '{b} να έρθεις στο πάρτι! (I hope / if only)', answer: 'Μακάρι', choices: ['Μακάρι', 'Πρέπει', 'Ίσως', 'Όταν'], en: 'I hope you come to the party!', hint: 'I hope / if only' },
      { text: 'Μακάρι να {b} πλούσιος! (were → unreal wish)', answer: 'ήμουν', choices: ['ήμουν', 'είμαι', 'θα είμαι', 'είσαι'], en: 'If only I were rich!', hint: 'unreal wish · παρατατικός' },
      { text: '{b} περάσεις καλά! (have a good time)', answer: 'Να', choices: ['Να', 'Θα', 'Αν', 'Μακάρι'], en: 'Have a good time!', hint: 'να + verb = a wish' },
      { text: 'Έφτιαξες φαγητό; {b} ’σαι καλά! (bless you)', answer: 'Να', choices: ['Να', 'Θα', 'Αν', 'Μακάρι'], en: 'You made food? Bless you!', hint: 'fixed wish: να ’σαι καλά' }
    ]
  }
);

/* ===== From the coursebooks’ syllabi: dates, ordinals, πολύς, conditionals,
   superlatives, equality, diminutives, future/perfect subjunctive, politeness ===== */
window.GRAMMAR.push(
  {
    id: 'a1-dates-days', level: 'A1', title: 'Days, months & dates',
    short: 'τη Δευτέρα, τον Μάιο, 25 Δεκεμβρίου.',
    explanation: '<p>For “when”, Greek often uses the bare <strong>accusative article</strong> with no preposition:</p>' +
      '<div class="g-grid"><div class="g-k">on Monday</div><div class="g-v">τη Δευτέρα</div><div class="g-k">in May</div><div class="g-v">τον Μάιο</div><div class="g-k">in summer</div><div class="g-v">το καλοκαίρι</div><div class="g-k">at the weekend</div><div class="g-v">το Σαββατοκύριακο</div></div>' +
      '<p>Dates use the <strong>genitive</strong> of the month: <em>5 Μαΐου, 25 Δεκεμβρίου</em>.</p>',
    examples: [ { gr: 'Έχω μάθημα τη Δευτέρα.', en: 'I have a lesson on Monday.' }, { gr: 'Γεννήθηκα τον Μάιο.', en: 'I was born in May.' }, { gr: 'Σήμερα είναι 25 Δεκεμβρίου.', en: 'Today is the 25th of December.' } ],
    more: '<p>“When” often takes just the accusative article (τη Δευτέρα, τον Μάιο) — no σε. Dates put the month in the genitive (Μαΐου, Δεκεμβρίου). For a clock time use σε: <em>στις πέντε</em>.</p>',
    items: [
      { text: 'Έχω μάθημα {b} Δευτέρα. (on Monday)', answer: 'τη', choices: ['τη', 'την', 'στη', 'ο'], en: 'I have a lesson on Monday.', hint: 'on + day = accusative article' },
      { text: 'Γεννήθηκα {b} Μάιο. (in May)', answer: 'τον', choices: ['τον', 'στον', 'το', 'τη'], en: 'I was born in May.', hint: 'in + month = τον' },
      { text: 'Η γιορτή είναι στις 25 {b}. (December — genitive)', answer: 'Δεκεμβρίου', choices: ['Δεκεμβρίου', 'Δεκέμβριος', 'Δεκέμβριο', 'Δεκεμβρίους'], en: 'The celebration is on the 25th of December.', hint: 'date: genitive of the month' },
      { text: 'Δουλεύω {b} Σαββατοκύριακο. (at the weekend)', answer: 'το', choices: ['το', 'τη', 'στο', 'τον'], en: 'I work at the weekend.', hint: 'time: το Σαββατοκύριακο' },
      { text: 'Πάμε διακοπές {b} καλοκαίρι. (in summer)', answer: 'το', choices: ['το', 'τον', 'στο', 'τη'], en: 'We go on holiday in summer.', hint: 'το καλοκαίρι' }
    ]
  },
  {
    id: 'a2-ordinals', level: 'A2', title: 'Ordinal numbers (πρώτος, δεύτερος…)',
    short: 'They agree like adjectives: ο πρώτος, η δεύτερη.',
    explanation: '<p>Ordinals are adjectives in -ος/-η/-ο and agree with their noun:</p>' +
      '<div class="g-grid"><div class="g-k">1st–3rd</div><div class="g-v">πρώτος, δεύτερος, τρίτος</div><div class="g-k">4th–6th</div><div class="g-v">τέταρτος, πέμπτος, έκτος</div><div class="g-k">7th–10th</div><div class="g-v">έβδομος, όγδοος, ένατος, δέκατος</div></div>',
    examples: [ { gr: 'Μένω στον πρώτο όροφο.', en: 'I live on the first floor.' }, { gr: 'Είναι η δεύτερη φορά.', en: 'It’s the second time.' }, { gr: 'Κάθισε στην τρίτη σειρά.', en: 'Sit in the third row.' } ],
    more: '<p>Ordinals decline like -ος/-η/-ο adjectives, so they change for gender and case (στον πρώτο, στην πρώτη, του πρώτου). Don’t confuse with the cardinal numbers (ένα, δύο, τρία).</p>',
    items: [
      { text: 'Μένω στον {b} όροφο. (first · masc)', answer: 'πρώτο', choices: ['πρώτο', 'πρώτος', 'πρώτη', 'ένα'], en: 'I live on the first floor.', hint: 'first · masc accusative' },
      { text: 'Είναι η {b} φορά που έρχομαι. (second · fem)', answer: 'δεύτερη', choices: ['δεύτερη', 'δεύτερος', 'δεύτερο', 'δύο'], en: 'It’s the second time I’ve come.', hint: 'second · feminine' },
      { text: 'Κάθισε στην {b} σειρά. (third · fem)', answer: 'τρίτη', choices: ['τρίτη', 'τρίτος', 'τρίτο', 'τρεις'], en: 'Sit in the third row.', hint: 'third · feminine' },
      { text: 'Αυτό είναι το {b} μου βιβλίο. (fifth · neut)', answer: 'πέμπτο', choices: ['πέμπτο', 'πέμπτος', 'πέμπτη', 'πέντε'], en: 'This is my fifth book.', hint: 'fifth · neuter' }
    ]
  },
  {
    id: 'a2-quantity-polys', level: 'A2', title: 'πολύς / πολλή / πολύ (much, many)',
    short: 'Irregular quantifier; “very” is the invariable πολύ.',
    explanation: '<p>πολύς is irregular:</p>' +
      '<div class="g-grid"><div class="g-k">singular</div><div class="g-v">πολύς / πολλή / πολύ</div><div class="g-k">plural</div><div class="g-v">πολλοί / πολλές / πολλά</div></div>' +
      '<p>But as the adverb “very / much” it never changes: <em>πολύ ωραίο, πολύ καλά</em>.</p>',
    examples: [ { gr: 'Έχω πολλή δουλειά.', en: 'I have a lot of work.' }, { gr: 'Ήρθαν πολλοί άνθρωποι.', en: 'Many people came.' }, { gr: 'Είναι πολύ ωραίο!', en: 'It’s very nice!' } ],
    more: '<p>As a quantifier πολύς agrees (πολλή δουλειά, πολλοί φίλοι). As “very” it’s the invariable adverb πολύ. Classic trap: <em>πολύ</em> (very) vs <em>πολλοί</em> (many). λίγος (little/few) declines normally.</p>',
    items: [
      { text: 'Έχω {b} δουλειά σήμερα. (much · fem)', answer: 'πολλή', choices: ['πολλή', 'πολύ', 'πολύς', 'πολλά'], en: 'I have a lot of work today.', hint: 'much · feminine (η δουλειά)' },
      { text: 'Ήρθαν {b} άνθρωποι. (many · masc)', answer: 'πολλοί', choices: ['πολλοί', 'πολλές', 'πολλά', 'πολύ'], en: 'Many people came.', hint: 'many · masculine plural' },
      { text: 'Είναι {b} ωραίο! (very — adverb)', answer: 'πολύ', choices: ['πολύ', 'πολλή', 'πολλά', 'πολλοί'], en: 'It’s very nice!', hint: 'very (adverb, invariable)' },
      { text: 'Έχω {b} φίλους εδώ. (many · masc acc)', answer: 'πολλούς', choices: ['πολλούς', 'πολλοί', 'πολλές', 'πολύ'], en: 'I have many friends here.', hint: 'many · masc accusative' },
      { text: 'Έφαγα {b} γλυκά. (many · neut)', answer: 'πολλά', choices: ['πολλά', 'πολλοί', 'πολλές', 'πολύ'], en: 'I ate a lot of sweets.', hint: 'many · neuter plural' }
    ]
  },
  {
    id: 'a2-real-conditional', level: 'A2', title: 'Real conditions (αν + present)',
    short: 'Likely “if”: Αν έχω χρόνο, θα έρθω.',
    explanation: '<p>For a real or likely condition: <strong>αν + present</strong> (or perfective) in the if-clause, and <strong>θα + future</strong> in the result:</p>' +
      '<p><em>Αν έχω χρόνο, θα έρθω.</em> = If I have time, I’ll come.</p>' +
      '<p>Contrast the unreal type (αν + παρατατικός, θα + παρατατικός).</p>',
    examples: [ { gr: 'Αν βρέξει, θα μείνουμε σπίτι.', en: 'If it rains, we’ll stay home.' }, { gr: 'Θα σου πω αν μάθω νέα.', en: 'I’ll tell you if I hear news.' }, { gr: 'Αν τελειώσω νωρίς, θα έρθω.', en: 'If I finish early, I’ll come.' } ],
    more: '<p>Real/open condition: <strong>αν + present</strong> (or perfective subjunctive without θα), result <strong>θα + future</strong>. The if-clause never takes θα. For something sure to happen, use <em>όταν</em>.</p>',
    items: [
      { text: 'Αν {b} καιρό, θα πάμε παραλία. (have → present)', answer: 'έχουμε', choices: ['έχουμε', 'είχαμε', 'θα έχουμε', 'έχαμε'], en: 'If we have time, we’ll go to the beach.', hint: 'real condition · present' },
      { text: 'Αν βρέξει, {b} σπίτι. (will stay)', answer: 'θα μείνουμε', accept: ['θα μεινουμε'], choices: ['θα μείνουμε', 'μείναμε', 'μένουμε', 'θα μέναμε'], en: 'If it rains, we’ll stay home.', hint: 'result · θα + future' },
      { text: 'Θα σου πω αν {b} νέα. (hear → perfective)', answer: 'μάθω', choices: ['μάθω', 'έμαθα', 'θα μάθω', 'μαθαίνω'], en: 'I’ll tell you if I hear news.', hint: 'after αν · perfective' },
      { text: '{b} τελειώσω νωρίς, θα έρθω. (if)', answer: 'Αν', choices: ['Αν', 'Ότι', 'Που', 'Ενώ'], en: 'If I finish early, I’ll come.', hint: 'if' }
    ]
  },
  {
    id: 'a2-politeness-conditional', level: 'A2', title: 'Politeness: θα ήθελα, θα μπορούσα',
    short: 'θα + παρατατικός softens requests.',
    explanation: '<p>To be polite, use <strong>θα + παρατατικός</strong> instead of the plain present:</p>' +
      '<div class="g-grid"><div class="g-k">I’d like</div><div class="g-v">θα ήθελα</div><div class="g-k">could you?</div><div class="g-v">θα μπορούσες;</div><div class="g-k">I’d prefer</div><div class="g-v">θα προτιμούσα</div></div>' +
      '<p>Softer and more courteous than θέλω / μπορείς.</p>',
    examples: [ { gr: 'Θα ήθελα έναν καφέ.', en: 'I’d like a coffee.' }, { gr: 'Θα μπορούσες να με βοηθήσεις;', en: 'Could you help me?' }, { gr: 'Θα προτιμούσα τσάι.', en: 'I’d prefer tea.' } ],
    more: '<p>This is the conditional/polite mood: θα + παρατατικός (θα ήθελα, θα μπορούσα, θα προτιμούσα). Use it for requests, offers and opinions to sound courteous.</p>',
    items: [
      { text: '{b} έναν καφέ, παρακαλώ. (I’d like)', answer: 'Θα ήθελα', choices: ['Θα ήθελα', 'Θέλω', 'Ήθελα', 'Θα θέλω'], en: 'I’d like a coffee, please.', hint: 'polite “I would like”' },
      { text: '{b} να με βοηθήσεις; (could you?)', answer: 'Θα μπορούσες', choices: ['Θα μπορούσες', 'Μπορείς', 'Μπόρεσες', 'Θα μπορείς'], en: 'Could you help me?', hint: 'polite “could you”' },
      { text: '{b} να καθίσω εδώ; (could I?)', answer: 'Θα μπορούσα', choices: ['Θα μπορούσα', 'Μπορώ', 'Μπόρεσα', 'Θα μπορώ'], en: 'Could I sit here?', hint: 'polite “could I”' },
      { text: '{b} λίγο νερό, αν δεν σας πειράζει. (I’d like)', answer: 'Θα ήθελα', choices: ['Θα ήθελα', 'Θέλω', 'Ήθελα', 'Θα θέλω'], en: 'I’d like some water, if you don’t mind.', hint: 'polite request' }
    ]
  },
  {
    id: 'b1-superlatives', level: 'B1', title: 'Superlatives (ο πιο…, -ότατος)',
    short: 'the most: ο πιο…/ο -ότερος; absolute -ότατος.',
    explanation: '<p><strong>Relative superlative</strong> (“the most”): the article + πιο + adjective, or the one-word -ότερος form:</p>' +
      '<p><em>ο πιο ψηλός / ο ψηλότερος</em> = the tallest. Irregulars: καλός → <strong>καλύτερος</strong>, μεγάλος → <strong>μεγαλύτερος</strong>.</p>' +
      '<p><strong>Absolute superlative</strong> (“extremely”): the ending <strong>-ότατος / -ότατη / -ότατο</strong>: <em>ωραιότατος</em> = absolutely lovely.</p>',
    examples: [ { gr: 'Είναι ο καλύτερος μαθητής.', en: 'He is the best student.' }, { gr: 'Η μεγαλύτερη πόλη της Ελλάδας.', en: 'The biggest city in Greece.' }, { gr: 'Η θέα ήταν ωραιότατη!', en: 'The view was absolutely wonderful!' } ],
    more: '<p>Relative superlative = article + πιο/-ότερος; absolute superlative -ότατος = “extremely”. Irregulars: καλός→άριστος, κακός→χείριστος, πολύς→πλείστος, λίγος→ελάχιστος.</p>',
    items: [
      { text: 'Είναι ο {b} μαθητής της τάξης. (best · masc)', answer: 'καλύτερος', choices: ['καλύτερος', 'πιο καλός', 'καλός', 'καλά'], en: 'He is the best student in the class.', hint: 'the best · masculine' },
      { text: 'Αυτό είναι το πιο {b} εστιατόριο. (expensive)', answer: 'ακριβό', choices: ['ακριβό', 'ακριβός', 'ακριβά', 'ακριβότατο'], en: 'This is the most expensive restaurant.', hint: 'adjective after “το πιο”' },
      { text: 'Η θέα ήταν {b}! (absolutely wonderful → -ότατη)', answer: 'ωραιότατη', choices: ['ωραιότατη', 'ωραία', 'πιο ωραία', 'ωραιότερη'], en: 'The view was absolutely wonderful!', hint: 'absolute superlative -ότατος' },
      { text: 'Είναι η {b} πόλη της Ελλάδας. (biggest)', answer: 'μεγαλύτερη', choices: ['μεγαλύτερη', 'πιο μεγάλη', 'μεγάλη', 'μεγαλύτερος'], en: 'It’s the biggest city in Greece.', hint: 'the biggest · feminine' }
    ]
  },
  {
    id: 'b1-equality', level: 'B1', title: 'As … as (τόσο … όσο, σαν)',
    short: 'τόσο … όσο = as … as; σαν / όπως = like.',
    explanation: '<p>Comparison of <strong>equality</strong>:</p>' +
      '<div class="g-grid"><div class="g-k">as … as</div><div class="g-v">τόσο + adj + όσο</div><div class="g-k">like / as</div><div class="g-v">σαν (+ accusative) / όπως</div><div class="g-k">the same (as)</div><div class="g-v">ο ίδιος (… με)</div></div>',
    examples: [ { gr: 'Είναι τόσο ψηλός όσο εσύ.', en: 'He is as tall as you.' }, { gr: 'Τρέχει σαν τον άνεμο.', en: 'He runs like the wind.' }, { gr: 'Φοράει τα ίδια ρούχα με μένα.', en: 'She wears the same clothes as me.' } ],
    more: '<p><em>τόσο … όσο</em> = as … as; <em>σαν / όπως</em> = like/as (σαν takes the accusative); <em>ο ίδιος … με</em> = the same … as.</p>',
    items: [
      { text: 'Είναι {b} ψηλός όσο εσύ. (as)', answer: 'τόσο', choices: ['τόσο', 'πιο', 'πολύ', 'όσο'], en: 'He is as tall as you.', hint: '“as …” (τόσο … όσο)' },
      { text: 'Τρέχει {b} τον άνεμο! (like)', answer: 'σαν', choices: ['σαν', 'τόσο', 'πιο', 'από'], en: 'He runs like the wind!', hint: 'like + accusative' },
      { text: 'Δεν είμαι {b} έξυπνος όσο νομίζεις. (as)', answer: 'τόσο', choices: ['τόσο', 'σαν', 'πιο', 'όσο'], en: 'I’m not as clever as you think.', hint: 'τόσο … όσο' },
      { text: 'Φοράει τα {b} ρούχα με μένα. (same)', answer: 'ίδια', choices: ['ίδια', 'σαν', 'τόσα', 'όμοια'], en: 'She’s wearing the same clothes as me.', hint: 'the same (τα ίδια … με)' }
    ]
  },
  {
    id: 'b1-diminutives', level: 'B1', title: 'Diminutives (-άκι, -ούλα)',
    short: 'Smallness & affection: σπιτάκι, καφεδάκι, Μαρούλα.',
    explanation: '<p>Greek loves diminutives — for small size, but very often just for warmth/affection:</p>' +
      '<div class="g-grid"><div class="g-k">neuter</div><div class="g-v">-άκι (σπίτι → σπιτάκι)</div><div class="g-k">feminine</div><div class="g-v">-ούλα / -ίτσα (Μαρία → Μαρούλα)</div><div class="g-k">masculine / names</div><div class="g-v">-άκης (Γιώργος → Γιωργάκης)</div></div>',
    examples: [ { gr: 'Πάμε για ένα καφεδάκι;', en: 'Shall we go for a coffee?' }, { gr: 'Τι ωραίο σπιτάκι!', en: 'What a lovely little house!' }, { gr: 'Έλα εδώ, αγοράκι μου.', en: 'Come here, my little boy.' } ],
    more: '<p>Diminutives soften the tone as much as they shrink the thing (καφεδάκι isn’t literally a tiny coffee). The opposite, the augmentative <strong>-άρα</strong>, means “huge”: σπιτάρα = a massive house.</p>',
    items: [
      { text: 'Πάμε για ένα {b}; (little coffee)', answer: 'καφεδάκι', choices: ['καφεδάκι', 'καφές', 'καφέ', 'καφέδες'], en: 'Shall we go for a (little) coffee?', hint: 'diminutive of καφές' },
      { text: 'Τι ωραίο {b}! (little house)', answer: 'σπιτάκι', choices: ['σπιτάκι', 'σπίτι', 'σπιτάρα', 'σπίτια'], en: 'What a lovely little house!', hint: 'diminutive of σπίτι' },
      { text: 'Έλα εδώ, {b} μου! (little child — affectionate)', answer: 'παιδάκι', choices: ['παιδάκι', 'παιδί', 'παιδιά', 'παιδάρα'], en: 'Come here, my little one!', hint: 'diminutive of παιδί' },
      { text: 'Θα πιω ένα {b} κρασί. (a little wine)', answer: 'κρασάκι', choices: ['κρασάκι', 'κρασί', 'κρασιά', 'κρασάρα'], en: 'I’ll have a little wine.', hint: 'diminutive of κρασί' }
    ]
  },
  {
    id: 'b2-future-perfect', level: 'B2', title: 'Future perfect (θα έχω κάνει)',
    short: '“Will have done”: θα έχω + perfect form.',
    explanation: '<p>For an action completed <strong>before</strong> a point in the future: <strong>θα έχω</strong> + the invariable perfect form:</p>' +
      '<p><em>Μέχρι αύριο θα έχω τελειώσει.</em> = By tomorrow I’ll have finished. Often with <em>μέχρι / ως τότε</em>.</p>',
    examples: [ { gr: 'Σε μια ώρα θα έχω φύγει.', en: 'In an hour I’ll have left.' }, { gr: 'Θα έχουν φάει πριν έρθουμε.', en: 'They’ll have eaten before we come.' }, { gr: 'Ως τότε θα έχει τελειώσει.', en: 'By then it will have finished.' } ],
    more: '<p>θα έχω + the same perfect form as the other perfect tenses. Completed by a future moment, usually marked with μέχρι/ως τότε.</p>',
    items: [
      { text: 'Μέχρι το βράδυ {b} τα πάντα. (finish → θα έχω τελειώσει)', answer: 'θα έχω τελειώσει', accept: ['θα εχω τελειωσει'], choices: ['θα έχω τελειώσει', 'τελείωσα', 'θα τελειώσω', 'έχω τελειώσει'], en: 'By tonight I’ll have finished everything.', hint: 'future perfect · εγώ' },
      { text: 'Σε δύο χρόνια {b} το πανεπιστήμιο. (finish → θα έχεις τελειώσει)', answer: 'θα έχεις τελειώσει', accept: ['θα εχεις τελειωσει'], choices: ['θα έχεις τελειώσει', 'τελείωσες', 'θα τελειώσεις', 'έχεις τελειώσει'], en: 'In two years you’ll have finished university.', hint: 'future perfect · εσύ' },
      { text: 'Όταν φτάσεις, {b} ήδη. (leave → θα έχουμε φύγει)', answer: 'θα έχουμε φύγει', choices: ['θα έχουμε φύγει', 'φύγαμε', 'θα φύγουμε', 'έχουμε φύγει'], en: 'By the time you arrive, we’ll have already left.', hint: 'future perfect · εμείς' },
      { text: 'Ως τότε {b} την απόφαση. (take → θα έχουν πάρει)', answer: 'θα έχουν πάρει', choices: ['θα έχουν πάρει', 'πήραν', 'θα πάρουν', 'έχουν πάρει'], en: 'By then they’ll have made the decision.', hint: 'future perfect · they' }
    ]
  },
  {
    id: 'b2-subjunctive-perfect', level: 'B2', title: 'Perfect subjunctive (να έχω κάνει)',
    short: '“To have done”: να έχω + perfect form.',
    explanation: '<p><strong>να έχω</strong> + the perfect form = a completed action after να (especially after <em>πριν</em> or verbs of hoping/fearing):</p>' +
      '<p><em>Πρέπει να έχω φύγει πριν τις πέντε.</em> = I must have left before five.</p>',
    examples: [ { gr: 'Ελπίζω να έχεις τελειώσει ως τότε.', en: 'I hope you’ll have finished by then.' }, { gr: 'Φοβάμαι μην έχουμε χάσει το τρένο.', en: 'I’m afraid we may have missed the train.' }, { gr: 'Πρέπει να έχω γυρίσει πριν νυχτώσει.', en: 'I must be back before nightfall.' } ],
    more: '<p>να έχω + perfect form marks completion by a point. Common after <em>πριν</em>, and after hoping/fearing (ελπίζω να έχω…, φοβάμαι μην έχω…).</p>',
    items: [
      { text: 'Πρέπει να {b} πριν έρθουν. (leave → έχω φύγει)', answer: 'έχω φύγει', choices: ['έχω φύγει', 'φύγω', 'έφυγα', 'φεύγω'], en: 'I must have left before they come.', hint: 'perfect subjunctive · εγώ' },
      { text: 'Ελπίζω να {b} ως τότε. (finish → έχεις τελειώσει)', answer: 'έχεις τελειώσει', choices: ['έχεις τελειώσει', 'τελειώσεις', 'τελείωσες', 'τελειώνεις'], en: 'I hope you’ll have finished by then.', hint: 'perfect subjunctive · εσύ' },
      { text: 'Φοβάμαι μην {b} ήδη το τρένο. (miss → έχουμε χάσει)', answer: 'έχουμε χάσει', choices: ['έχουμε χάσει', 'χάσουμε', 'χάσαμε', 'χάνουμε'], en: 'I’m afraid we may have already missed the train.', hint: 'perfect subjunctive · εμείς' },
      { text: 'Πρέπει να {b} τα μαθήματά τους πριν παίξουν. (do → έχουν κάνει)', answer: 'έχουν κάνει', choices: ['έχουν κάνει', 'κάνουν', 'έκαναν', 'κάνανε'], en: 'They must have done their homework before playing.', hint: 'perfect subjunctive · they' }
    ]
  }
);

/* ===== From conversation_connectors_greek.pdf: discourse connectors ===== */
window.GRAMMAR.push(
  {
    id: 'b1-discourse-connectors', level: 'B1', title: 'Discourse connectors',
    short: 'κατά τη γνώμη μου, από την άλλη, παρ’ όλα αυτά…',
    explanation: '<p>Phrases that organise a conversation and signal your stance:</p>' +
      '<div class="g-grid"><div class="g-k">in my opinion</div><div class="g-v">κατά τη γνώμη μου</div><div class="g-k">on the other hand</div><div class="g-v">από την άλλη (μεριά)</div><div class="g-k">to be honest</div><div class="g-v">για να είμαι ειλικρινής</div><div class="g-k">in short / to sum up</div><div class="g-v">με λίγα λόγια</div><div class="g-k">nevertheless / even so</div><div class="g-v">παρ’ όλα αυτά</div><div class="g-k">by the way</div><div class="g-v">με την ευκαιρία</div></div>',
    examples: [ { gr: 'Κατά τη γνώμη μου, έχεις δίκιο.', en: 'In my opinion, you’re right.' }, { gr: 'Είναι ακριβό· από την άλλη, αξίζει.', en: 'It’s expensive; on the other hand, it’s worth it.' }, { gr: 'Με λίγα λόγια, δεν πήγε.', en: 'In short, he didn’t go.' } ],
    more: '<p>These usually sit at the start of a sentence, set off by a comma. Useful pairs: <em>κατά πρώτον … κατά δεύτερον</em> (firstly … secondly), <em>αφενός … αφετέρου</em> (on the one hand … on the other), <em>επιπλέον / εξάλλου</em> (moreover / besides).</p>',
    items: [
      { text: 'Δεν συμφωνώ. {b}, κάνεις λάθος. (in my opinion)', answer: 'Κατά τη γνώμη μου', choices: ['Κατά τη γνώμη μου', 'Με λίγα λόγια', 'Παρ’ όλα αυτά', 'Με την ευκαιρία'], en: 'I disagree. In my opinion, you’re wrong.', hint: 'in my opinion' },
      { text: 'Είναι ακριβό. {b}, αξίζει τα λεφτά του. (on the other hand)', answer: 'Από την άλλη', choices: ['Από την άλλη', 'Κατά πρώτον', 'Δηλαδή', 'Επιπλέον'], en: 'It’s expensive. On the other hand, it’s worth the money.', hint: 'on the other hand' },
      { text: '{b}, δεν είχα χρόνο να το τελειώσω. (to be honest)', answer: 'Για να είμαι ειλικρινής', choices: ['Για να είμαι ειλικρινής', 'Από την άλλη', 'Με λίγα λόγια', 'Τέλος πάντων'], en: 'To be honest, I didn’t have time to finish it.', hint: 'to be honest' },
      { text: 'Ήταν κουρασμένος και αργοπορημένος. {b}, δεν πήγε καθόλου. (in short)', answer: 'Με λίγα λόγια', choices: ['Με λίγα λόγια', 'Επιπλέον', 'Δηλαδή', 'Με την ευκαιρία'], en: 'He was tired and late. In short, he didn’t go at all.', hint: 'in short / to sum up' },
      { text: 'Δεν μου αρέσει. {b}, θα το πάρω για το παιδί. (nevertheless)', answer: 'Παρ’ όλα αυτά', choices: ['Παρ’ όλα αυτά', 'Κατά τη γνώμη μου', 'Πρώτον', 'Δηλαδή'], en: 'I don’t like it. Nevertheless, I’ll get it for the child.', hint: 'nevertheless / even so' },
      { text: '{b}, ξέρεις τι έγινε με τη Μαρία; (by the way)', answer: 'Με την ευκαιρία', choices: ['Με την ευκαιρία', 'Με λίγα λόγια', 'Συνεπώς', 'Δηλαδή'], en: 'By the way, do you know what happened with Maria?', hint: 'by the way' }
    ]
  }
);

/* ===================== C1 — Advanced ===================== */
window.GRAMMAR.push(
  {
    id: 'c1-formal-connectors', level: 'C1', title: 'Formal connectors (ωστόσο, προκειμένου να)',
    short: 'Register markers for writing & formal speech.',
    explanation: '<p>Higher-register links used in writing and formal speech:</p>' +
      '<div class="g-grid"><div class="g-k">however</div><div class="g-v">ωστόσο / εντούτοις</div><div class="g-k">in order to</div><div class="g-v">προκειμένου να</div><div class="g-k">given that</div><div class="g-v">δεδομένου ότι</div><div class="g-k">provided / as long as</div><div class="g-v">εφόσον</div><div class="g-k">although</div><div class="g-v">παρότι / μολονότι</div></div>',
    examples: [ { gr: 'Προσπάθησε· ωστόσο, απέτυχε.', en: 'He tried; however, he failed.' }, { gr: 'Δούλεψε σκληρά προκειμένου να πετύχει.', en: 'He worked hard in order to succeed.' }, { gr: 'Δεδομένου ότι βρέχει, μείναμε σπίτι.', en: 'Given that it’s raining, we stayed home.' } ],
    more: '<p>These belong to the formal register (καθαρεύουσα-flavoured). Everyday equivalents: ωστόσο ≈ όμως, προκειμένου να ≈ για να, δεδομένου ότι ≈ επειδή, εφόσον ≈ αφού, παρότι ≈ αν και.</p>',
    items: [
      { text: 'Προσπάθησε πολύ· {b}, απέτυχε. (however — formal)', answer: 'ωστόσο', choices: ['ωστόσο', 'επειδή', 'προκειμένου', 'εφόσον'], en: 'He tried hard; however, he failed.', hint: 'however (formal)' },
      { text: 'Δούλεψε σκληρά {b} να πετύχει. (in order to)', answer: 'προκειμένου', choices: ['προκειμένου', 'δεδομένου', 'παρότι', 'καθώς'], en: 'He worked hard in order to succeed.', hint: 'in order to (+ να)' },
      { text: '{b} ότι δεν υπάρχουν στοιχεία, η υπόθεση έκλεισε. (given that)', answer: 'Δεδομένου', choices: ['Δεδομένου', 'Εφόσον', 'Ωστόσο', 'Παρότι'], en: 'Given that there’s no evidence, the case was closed.', hint: 'given that' },
      { text: 'Θα σε βοηθήσω, {b} μου το ζητήσεις. (provided that)', answer: 'εφόσον', choices: ['εφόσον', 'ωστόσο', 'προκειμένου', 'εντούτοις'], en: 'I’ll help you, provided you ask me.', hint: 'provided that / as long as' },
      { text: '{b} ήταν κουρασμένος, συνέχισε. (although — formal)', answer: 'Παρότι', choices: ['Παρότι', 'Εφόσον', 'Δεδομένου', 'Προκειμένου'], en: 'Although he was tired, he carried on.', hint: 'although (formal)' }
    ]
  },
  {
    id: 'c1-nominalization', level: 'C1', title: 'Nominalizing clauses (το να, το γεγονός ότι)',
    short: 'Turn a whole clause into a noun.',
    explanation: '<p>A clause can act as a noun:</p>' +
      '<p><strong>το να</strong> + verb = “the act of …ing”: <em>Το να διαβάζεις βοηθάει.</em> It declines like a neuter (<em>του να, στο να</em>).</p>' +
      '<p><strong>το (γεγονός) ότι</strong> = “the fact that”: <em>Με ενοχλεί το γεγονός ότι άργησες.</em></p>',
    examples: [ { gr: 'Το να ζεις στο εξωτερικό έχει δυσκολίες.', en: 'Living abroad has its difficulties.' }, { gr: 'Με στενοχωρεί το γεγονός ότι έφυγες.', en: 'The fact that you left saddens me.' }, { gr: 'Είμαι υπέρ του να αλλάξουμε σχέδιο.', en: 'I’m in favour of changing the plan.' } ],
    more: '<p>το να + verb names an action (“the …ing”) and takes case (του να, στο να, με το να). το (γεγονός) ότι names a fact. Both let an entire clause sit where a noun would.</p>',
    items: [
      { text: '{b} διαβάζεις κάθε μέρα βοηθάει πολύ. (the act of reading)', answer: 'Το να', choices: ['Το να', 'Που', 'Ότι', 'Να'], en: 'Reading every day helps a lot.', hint: 'το να + verb = the act of' },
      { text: 'Με ενοχλεί {b} ότι δεν με ειδοποίησες. (the fact that)', answer: 'το γεγονός', choices: ['το γεγονός', 'να', 'αν', 'όσο'], en: 'It bothers me that you didn’t let me know.', hint: 'the fact that (το γεγονός ότι)' },
      { text: '{b} να ζεις μόνος έχει και πλεονεκτήματα. (living alone)', answer: 'Το', choices: ['Το', 'Του', 'Τα', 'Ένα'], en: 'Living alone has its advantages too.', hint: 'nominalized clause' },
      { text: 'Είμαι υπέρ {b} να αλλάξουμε σχέδιο. (of …ing → genitive)', answer: 'του', choices: ['του', 'το', 'των', 'στο'], en: 'I’m in favour of changing the plan.', hint: 'genitive of the nominalized clause' }
    ]
  },
  {
    id: 'c1-cleft', level: 'C1', title: 'Emphasis with Αυτό που…',
    short: 'Cleft sentences move the focus: Αυτό που θέλω είναι…',
    explanation: '<p>To foreground an element, “cleft” the sentence with <strong>Αυτό που … είναι …</strong> or <strong>Εκείνος που …</strong>:</p>' +
      '<p><em>Αυτό που θέλω είναι ησυχία.</em> = What I want is quiet. <em>Εκείνος που έφταιγε ήταν αυτός.</em> = The one at fault was him.</p>',
    examples: [ { gr: 'Αυτό που με ενοχλεί είναι ο θόρυβος.', en: 'What bothers me is the noise.' }, { gr: 'Αυτό που χρειαζόμαστε είναι χρόνος.', en: 'What we need is time.' }, { gr: 'Εκείνο που μετράει είναι η πρόθεση.', en: 'What counts is the intention.' } ],
    more: '<p>Cleft structures (Αυτό που … είναι …, Εκείνος που …) put the emphasised part in focus, often for contrast. The verb after the cleft phrase is είναι/ήταν.</p>',
    items: [
      { text: '{b} με ενοχλεί είναι ο θόρυβος. (what)', answer: 'Αυτό που', choices: ['Αυτό που', 'Ότι', 'Αν', 'Όποιος'], en: 'What bothers me is the noise.', hint: 'what … (cleft)' },
      { text: '{b} χρειαζόμαστε είναι περισσότερος χρόνος. (what)', answer: 'Αυτό που', choices: ['Αυτό που', 'Που', 'Να', 'Όσο'], en: 'What we need is more time.', hint: 'what we need is…' },
      { text: '{b} έφταιγε ήταν ο ίδιος, όχι εσύ. (the one who)', answer: 'Εκείνος που', choices: ['Εκείνος που', 'Αυτό που', 'Ό,τι', 'Όποιος'], en: 'The one at fault was himself, not you.', hint: 'the one who (emphatic)' },
      { text: 'Δεν είναι τα λεφτά· {b} μετράει είναι η πρόθεση. (what)', answer: 'αυτό που', choices: ['αυτό που', 'ότι', 'να', 'όσο'], en: 'It’s not the money; what counts is the intention.', hint: 'what counts is…' }
    ]
  },
  {
    id: 'c1-concessive-advanced', level: 'C1', title: 'Whatever, however (ό,τι και να)',
    short: '“No matter …”: question word + και να + verb.',
    explanation: '<p>“No matter what/how/where” = <strong>question word + και να + verb</strong> (subjunctive):</p>' +
      '<div class="g-grid"><div class="g-k">whatever</div><div class="g-v">ό,τι και να</div><div class="g-k">however much</div><div class="g-v">όσο και να</div><div class="g-k">wherever</div><div class="g-v">όπου και να</div><div class="g-k">whoever</div><div class="g-v">όποιος και να</div></div>',
    examples: [ { gr: 'Ό,τι και να πεις, δεν αλλάζω γνώμη.', en: 'Whatever you say, I won’t change my mind.' }, { gr: 'Όσο και να προσπαθώ, δεν τα καταφέρνω.', en: 'However hard I try, I can’t manage.' }, { gr: 'Όπου και να πας, θα σε βρω.', en: 'Wherever you go, I’ll find you.' } ],
    more: '<p>Pattern: question word + και να + subjunctive. Note <strong>ό,τι</strong> (whatever — with the comma) versus <strong>ότι</strong> (that). The “και” is what gives the concessive “no matter” sense.</p>',
    items: [
      { text: '{b} και να πεις, δεν θα αλλάξω γνώμη. (whatever)', answer: 'Ό,τι', choices: ['Ό,τι', 'Όσο', 'Όπου', 'Όποιος'], en: 'Whatever you say, I won’t change my mind.', hint: 'whatever (+ και να)' },
      { text: '{b} και να προσπαθώ, δεν τα καταφέρνω. (however much)', answer: 'Όσο', choices: ['Όσο', 'Ό,τι', 'Όπου', 'Όποτε'], en: 'However hard I try, I can’t manage.', hint: 'however much' },
      { text: '{b} και να πας, θα σε βρω. (wherever)', answer: 'Όπου', choices: ['Όπου', 'Όσο', 'Ό,τι', 'Όποιος'], en: 'Wherever you go, I’ll find you.', hint: 'wherever' },
      { text: '{b} και να είναι, δεν τον φοβάμαι. (whoever)', answer: 'Όποιος', choices: ['Όποιος', 'Ό,τι', 'Όσο', 'Όπου'], en: 'Whoever he is, I’m not afraid of him.', hint: 'whoever' }
    ]
  },
  {
    id: 'c1-causative', level: 'C1', title: 'Causative (κάνω κάποιον να)',
    short: 'make / get / let someone do something.',
    explanation: '<p>“Make/have/get someone to do” = verb + object + <strong>να</strong> + verb:</p>' +
      '<div class="g-grid"><div class="g-k">make someone</div><div class="g-v">κάνω κάποιον να</div><div class="g-k">get / set someone</div><div class="g-v">βάζω κάποιον να</div><div class="g-k">let / allow someone</div><div class="g-v">αφήνω κάποιον να</div></div>' +
      '<p>The object is in the accusative: <em>Με έκανε να γελάσω.</em></p>',
    examples: [ { gr: 'Η ταινία με έκανε να κλάψω.', en: 'The film made me cry.' }, { gr: 'Τον έβαλα να πλύνει τα πιάτα.', en: 'I got him to wash the dishes.' }, { gr: 'Δεν την άφησαν να βγει.', en: 'They didn’t let her go out.' } ],
    more: '<p>All take object (accusative) + να + verb. κάνω = make, βάζω = get/set someone to, αφήνω = let/allow. The clitic comes before the main verb: <em>Με έκανε να…</em></p>',
    items: [
      { text: 'Η ταινία με {b} να κλάψω. (made)', answer: 'έκανε', choices: ['έκανε', 'άφησε', 'έβαλε', 'βοήθησε'], en: 'The film made me cry.', hint: 'make someone do (κάνω … να)' },
      { text: 'Τον {b} να πλύνει τα πιάτα. (got / set him to)', answer: 'έβαλα', choices: ['έβαλα', 'έκανα', 'άφησα', 'είδα'], en: 'I got him to wash the dishes.', hint: 'set someone to (βάζω … να)' },
      { text: 'Μη με {b} να περιμένω. (make)', answer: 'κάνεις', choices: ['κάνεις', 'αφήνεις', 'βάζεις', 'βλέπεις'], en: 'Don’t make me wait.', hint: 'make me (κάνω … να)' },
      { text: 'Οι γονείς της δεν την {b} να βγει. (let)', answer: 'άφησαν', choices: ['άφησαν', 'έκαναν', 'έβαλαν', 'είπαν'], en: 'Her parents didn’t let her go out.', hint: 'let someone (αφήνω … να)' }
    ]
  },
  {
    id: 'c1-passive-agent', level: 'C1', title: 'Agent & formal passives',
    short: 'από marks the agent; learned -είται/-ούται verbs.',
    explanation: '<p>The <strong>agent</strong> of a passive is marked with <strong>από</strong>: <em>Το βιβλίο γράφτηκε από τον συγγραφέα.</em></p>' +
      '<p>Formal/learned verbs keep a 3rd-person <strong>-είται/-ούται</strong> passive: αποτελείται από (consists of), θεωρείται (is considered), χρησιμοποιείται (is used), οφείλεται σε (is due to).</p>',
    examples: [ { gr: 'Το άγαλμα φτιάχτηκε από έναν γλύπτη.', en: 'The statue was made by a sculptor.' }, { gr: 'Η ομάδα αποτελείται από δέκα μέλη.', en: 'The team consists of ten members.' }, { gr: 'Θεωρείται ο καλύτερος.', en: 'He is considered the best.' } ],
    more: '<p>Agent = από + accusative. The learned passives (αποτελείται, θεωρείται, χρησιμοποιείται, οφείλεται, πρόκειται) are very common in formal/written Greek and mostly appear in the 3rd person.</p>',
    items: [
      { text: 'Το άγαλμα φτιάχτηκε {b} έναν διάσημο γλύπτη. (by — agent)', answer: 'από', choices: ['από', 'με', 'σε', 'για'], en: 'The statue was made by a famous sculptor.', hint: 'agent of a passive' },
      { text: 'Η ομάδα {b} από δέκα μέλη. (consists of)', answer: 'αποτελείται', choices: ['αποτελείται', 'αποτελεί', 'αποτέλεσε', 'αποτελούν'], en: 'The team consists of ten members.', hint: 'formal passive: consists of' },
      { text: 'Αυτή η λέξη {b} σπάνια. (is used)', answer: 'χρησιμοποιείται', choices: ['χρησιμοποιείται', 'χρησιμοποιεί', 'χρησιμοποίησε', 'χρησιμοποιούν'], en: 'This word is rarely used.', hint: 'formal passive: is used' },
      { text: 'Ο Σωκράτης {b} πατέρας της φιλοσοφίας. (is considered)', answer: 'θεωρείται', choices: ['θεωρείται', 'θεωρεί', 'θεώρησε', 'θεωρούν'], en: 'Socrates is considered the father of philosophy.', hint: 'formal passive: is considered' }
    ]
  },
  {
    id: 'c1-participles-formal', level: 'C1', title: 'Formal participles (-ων, -μένος)',
    short: 'Declinable participles used as adjectives/nouns.',
    explanation: '<p>Beyond the invariable -οντας, formal Greek uses <strong>declinable</strong> participles:</p>' +
      '<p>Perfect passive <strong>-μένος/-μένη/-μένο</strong> works as an adjective and agrees: <em>κουρασμένος</em> (tired), <em>γραμμένο</em> (written).</p>' +
      '<p>Learned active <strong>-ων/-ουσα/-ον</strong>: <em>ο διευθύνων σύμβουλος</em> (managing director), <em>οι ενδιαφερόμενοι</em> (the interested parties).</p>',
    examples: [ { gr: 'Ήταν πολύ κουρασμένος.', en: 'He was very tired.' }, { gr: 'Βρήκα ένα γράμμα γραμμένο στα ελληνικά.', en: 'I found a letter written in Greek.' }, { gr: 'Οι ενδιαφερόμενοι ας δηλώσουν.', en: 'Those interested should register.' } ],
    more: '<p>-μένος is the perfect passive participle as an adjective (agrees in gender/number/case). The active -ων/-ουσα/-ον is learned and survives mostly in fixed expressions (ο διευθύνων σύμβουλος, ο επικεφαλής, τα συμβαίνοντα).</p>',
    items: [
      { text: 'Ήταν πολύ {b} μετά τη δουλειά. (tired)', answer: 'κουρασμένος', choices: ['κουρασμένος', 'κουράζοντας', 'κουράζει', 'κούρασε'], en: 'He was very tired after work.', hint: 'passive participle -μένος as adjective' },
      { text: 'Βρήκα ένα γράμμα {b} στα ελληνικά. (written)', answer: 'γραμμένο', choices: ['γραμμένο', 'γράφοντας', 'έγραψε', 'γράφει'], en: 'I found a letter written in Greek.', hint: 'perfect passive participle -μένο' },
      { text: 'Η πόρτα ήταν {b} όλη μέρα. (closed)', answer: 'κλειστή', choices: ['κλειστή', 'κλείνοντας', 'κλείνει', 'έκλεισε'], en: 'The door was closed all day.', hint: 'participle/adjective, feminine' },
      { text: 'Οι {b} ας δηλώσουν συμμετοχή. (those interested)', answer: 'ενδιαφερόμενοι', choices: ['ενδιαφερόμενοι', 'ενδιαφέροντας', 'ενδιαφέρουν', 'ενδιαφερθεί'], en: 'Those interested should register.', hint: 'declinable active participle' }
    ]
  },
  {
    id: 'c1-stance-adverbs', level: 'C1', title: 'Hedging & stance adverbs',
    short: 'προφανώς, ενδεχομένως, μάλλον, οπωσδήποτε…',
    explanation: '<p>Epistemic adverbs signal how certain or probable a statement is:</p>' +
      '<div class="g-grid"><div class="g-k">probably / rather</div><div class="g-v">μάλλον</div><div class="g-k">possibly</div><div class="g-v">ενδεχομένως / πιθανώς</div><div class="g-k">obviously</div><div class="g-v">προφανώς</div><div class="g-k">definitely</div><div class="g-v">οπωσδήποτε</div><div class="g-k">un/fortunately</div><div class="g-v">δυστυχώς / ευτυχώς</div></div>',
    examples: [ { gr: 'Μάλλον θα αργήσει.', en: 'He’ll probably be late.' }, { gr: 'Προφανώς έχεις δίκιο.', en: 'You’re obviously right.' }, { gr: 'Δυστυχώς δεν πρόλαβα.', en: 'Unfortunately I didn’t make it.' } ],
    more: '<p>These adverbs hedge or strengthen a claim and usually sit at the start of the sentence or just before the verb: μάλλον/πιθανώς/ενδεχομένως (probably/possibly), προφανώς/οπωσδήποτε (obviously/definitely), δυστυχώς/ευτυχώς (un/fortunately).</p>',
    items: [
      { text: '{b} θα αργήσει, όπως πάντα. (probably)', answer: 'Μάλλον', choices: ['Μάλλον', 'Οπωσδήποτε', 'Καθόλου', 'Ποτέ'], en: 'He’ll probably be late, as always.', hint: 'probably / rather' },
      { text: '{b} έχεις δίκιο, δεν το είχα σκεφτεί. (obviously)', answer: 'Προφανώς', choices: ['Προφανώς', 'Ίσως', 'Δυστυχώς', 'Σπάνια'], en: 'You’re obviously right, I hadn’t thought of it.', hint: 'obviously' },
      { text: 'Θα έρθω {b}, μην ανησυχείς. (definitely)', answer: 'οπωσδήποτε', choices: ['οπωσδήποτε', 'ενδεχομένως', 'μάλλον', 'ίσως'], en: 'I’ll definitely come, don’t worry.', hint: 'definitely' },
      { text: '{b}, δεν πρόλαβα να σε ειδοποιήσω. (unfortunately)', answer: 'Δυστυχώς', choices: ['Δυστυχώς', 'Ευτυχώς', 'Προφανώς', 'Οπωσδήποτε'], en: 'Unfortunately, I didn’t manage to let you know.', hint: 'unfortunately' }
    ]
  }
);

/* More varied sentences for the thinner A1 points (bigger free-run pool, less repetition). */
(function () {
  var MORE = {
    'a1-be': [
      { text: 'Εμείς {b} από την Ελλάδα. (είμαι)', answer: 'είμαστε', choices: ['είμαι', 'είμαστε', 'είναι', 'είστε'], en: 'We are from Greece.', hint: 'be · εμείς' },
      { text: 'Εσείς {b} έτοιμοι; (είμαι)', answer: 'είστε', choices: ['είσαι', 'είστε', 'είναι', 'είμαστε'], en: 'Are you (pl) ready?', hint: 'be · εσείς' },
      { text: 'Σήμερα {b} Δευτέρα. (είμαι)', answer: 'είναι', choices: ['είναι', 'είμαι', 'είσαι', 'είμαστε'], en: 'Today is Monday.', hint: 'be · it' },
      { text: 'Δεν {b} κουρασμένος, είμαι χαρούμενος. (είμαι)', answer: 'είμαι', choices: ['είμαι', 'είσαι', 'είναι', 'είμαστε'], en: 'I’m not tired, I’m happy.', hint: 'be · εγώ' }
    ],
    'a1-have': [
      { text: 'Εμείς {b} ένα μικρό σκύλο. (έχω)', answer: 'έχουμε', choices: ['έχω', 'έχουμε', 'έχει', 'έχουν'], en: 'We have a small dog.', hint: 'have · εμείς' },
      { text: 'Εσείς {b} παιδιά; (έχω)', answer: 'έχετε', choices: ['έχεις', 'έχετε', 'έχουν', 'έχουμε'], en: 'Do you (pl) have children?', hint: 'have · εσείς' },
      { text: 'Οι γείτονες {b} ωραίο μπαλκόνι. (έχω)', answer: 'έχουν', choices: ['έχω', 'έχεις', 'έχει', 'έχουν'], en: 'The neighbours have a nice balcony.', hint: 'have · they' },
      { text: 'Δεν {b} χρόνο σήμερα. (έχω)', answer: 'έχω', choices: ['έχω', 'έχεις', 'έχει', 'έχουμε'], en: 'I don’t have time today.', hint: 'have · εγώ' }
    ],
    'a1-adjective-agreement': [
      { text: 'Μια {b} μέρα! (ωραίος)', answer: 'ωραία', choices: ['ωραίος', 'ωραία', 'ωραίο', 'ωραίες'], en: 'A nice day!', hint: 'feminine (η μέρα)' },
      { text: 'Ένας {b} καφές. (ζεστός)', answer: 'ζεστός', choices: ['ζεστός', 'ζεστή', 'ζεστό', 'ζεστοί'], en: 'A hot coffee.', hint: 'masculine (ο καφές)' },
      { text: 'Τα παιδιά είναι {b}. (μικρός)', answer: 'μικρά', choices: ['μικρά', 'μικροί', 'μικρές', 'μικρό'], en: 'The children are small.', hint: 'neuter plural' },
      { text: 'Οι δρόμοι είναι {b}. (μεγάλος)', answer: 'μεγάλοι', choices: ['μεγάλοι', 'μεγάλες', 'μεγάλα', 'μεγάλος'], en: 'The streets are big.', hint: 'masculine plural' }
    ],
    'a1-demonstratives': [
      { text: '{b} τα παπούτσια είναι ακριβά. (these, neuter pl)', answer: 'Αυτά', choices: ['Αυτά', 'Αυτές', 'Αυτοί', 'Εκείνα'], en: 'These shoes are expensive.', hint: 'these · neuter plural' },
      { text: 'Ποιος είναι {b} ο κύριος; (that, masc)', answer: 'εκείνος', choices: ['εκείνος', 'εκείνη', 'αυτό', 'εκείνο'], en: 'Who is that gentleman?', hint: 'that · masculine' },
      { text: 'Μου αρέσει {b} το φόρεμα. (this, neuter)', answer: 'αυτό', choices: ['αυτό', 'αυτή', 'εκείνος', 'αυτός'], en: 'I like this dress.', hint: 'this · neuter' },
      { text: '{b} οι μέρες ήταν δύσκολες. (those, fem pl)', answer: 'Εκείνες', choices: ['Εκείνες', 'Εκείνοι', 'Αυτές', 'Εκείνα'], en: 'Those days were hard.', hint: 'those · feminine plural' }
    ],
    'a1-question-words': [
      { text: '{b} κοστίζει αυτό;', answer: 'Πόσο', choices: ['Πόσο', 'Πότε', 'Πού', 'Ποιος'], en: 'How much does this cost?', hint: 'how much' },
      { text: '{b} φεύγει το τρένο;', answer: 'Πότε', choices: ['Πότε', 'Πού', 'Πώς', 'Τι'], en: 'When does the train leave?', hint: 'when' },
      { text: '{b} είναι η τσάντα σου;', answer: 'Ποια', choices: ['Ποια', 'Ποιος', 'Πού', 'Πώς'], en: 'Which one is your bag?', hint: 'which (feminine)' }
    ],
    'a1-place-prepositions': [
      { text: 'Η λάμπα κρέμεται {b} από το τραπέζι. (above)', answer: 'πάνω', choices: ['πάνω', 'κάτω', 'δίπλα', 'μέσα'], en: 'The lamp hangs above the table.', hint: 'above (πάνω από)' },
      { text: 'Στάθηκα {b} στον φίλο μου. (next to)', answer: 'δίπλα', choices: ['δίπλα', 'πίσω', 'κάτω', 'μακριά'], en: 'I stood next to my friend.', hint: 'next to' },
      { text: 'Το σκυλί είναι {b} στο σπίτι. (inside)', answer: 'μέσα', choices: ['μέσα', 'έξω', 'πάνω', 'κάτω'], en: 'The dog is inside the house.', hint: 'inside (μέσα σε)' },
      { text: 'Το αμάξι είναι σταθμευμένο {b} από το κτίριο. (in front of)', answer: 'μπροστά', choices: ['μπροστά', 'πίσω', 'πάνω', 'μέσα'], en: 'The car is parked in front of the building.', hint: 'in front of' }
    ],
    'a1-numbers-agreement': [
      { text: 'Έχω {b} γάτες. (four · fem)', answer: 'τέσσερις', choices: ['τέσσερις', 'τέσσερα', 'τεσσάρων', 'τέσσερος'], en: 'I have four cats.', hint: 'four · feminine' },
      { text: 'Ήρθαν {b} γυναίκες. (three · fem)', answer: 'τρεις', choices: ['τρεις', 'τρία', 'τριών', 'τρες'], en: 'Three women came.', hint: 'three · feminine' },
      { text: 'Θέλω {b} ποτήρι νερό. (one · neuter)', answer: 'ένα', choices: ['ένα', 'έναν', 'μία', 'ένας'], en: 'I want one glass of water.', hint: 'one · neuter' },
      { text: 'Αγόρασα {b} εφημερίδα. (one · fem)', answer: 'μία', choices: ['μία', 'ένα', 'έναν', 'ένας'], en: 'I bought one newspaper.', hint: 'one · feminine' }
    ],
    'a1-dates-days': [
      { text: 'Έχουμε ραντεβού {b} Τρίτη. (on Tuesday)', answer: 'την', choices: ['την', 'τη', 'στην', 'ο'], en: 'We have an appointment on Tuesday.', hint: 'on + day (accusative)' },
      { text: 'Οι διακοπές είναι {b} Αύγουστο. (in August)', answer: 'τον', choices: ['τον', 'στον', 'το', 'τη'], en: 'The holidays are in August.', hint: 'in + month' },
      { text: 'Γυρίζω σπίτι {b} βράδυ. (in the evening)', answer: 'το', choices: ['το', 'τη', 'στο', 'τον'], en: 'I come home in the evening.', hint: 'το βράδυ' },
      { text: 'Η γιορτή είναι στις 28 {b}. (October — genitive)', answer: 'Οκτωβρίου', choices: ['Οκτωβρίου', 'Οκτώβριος', 'Οκτώβριο', 'Οκτωβρίους'], en: 'The celebration is on the 28th of October.', hint: 'date: genitive of the month' }
    ]
  };
  (window.GRAMMAR || []).forEach(function (p) {
    if (MORE[p.id]) p.items = p.items.concat(MORE[p.id]);
  });
})();

/* Second enrichment pass: more varied sentences for thinner A2/B1/B2/C1 points. */
(function () {
  var MORE2 = {
    /* ---------- A2 ---------- */
    'a2-indefinite-pronouns': [
      { text: 'Θέλει {b} να σε βοηθήσει; (someone)', answer: 'κάποιος', choices: ['κάποιος', 'κάτι', 'κανένας', 'τίποτα'], en: 'Does someone want to help you?', hint: 'someone' },
      { text: 'Δεν είδα {b} στον δρόμο. (anyone)', answer: 'κανέναν', choices: ['κανέναν', 'κάποιον', 'κάτι', 'τίποτα'], en: 'I didn’t see anyone on the street.', hint: 'no one · masc accusative' },
      { text: 'Θέλεις να πιεις {b}; (something)', answer: 'κάτι', choices: ['κάτι', 'τίποτα', 'κάποιος', 'κανείς'], en: 'Do you want something to drink?', hint: 'something' },
      { text: 'Δεν έχω {b} να πω. (nothing)', answer: 'τίποτα', choices: ['τίποτα', 'κάτι', 'κανένας', 'κάποιο'], en: 'I have nothing to say.', hint: 'nothing' }
    ],
    'a2-strong-pronouns': [
      { text: 'Σ’ {b} μιλάω, όχι σ’ αυτόν! (you)', answer: 'εσένα', choices: ['εσένα', 'εμένα', 'αυτόν', 'εσύ'], en: 'I’m talking to you, not to him!', hint: 'to you (emphatic)' },
      { text: '{b} μου αρέσει ο καφές, εσένα; (me)', answer: 'Εμένα', choices: ['Εμένα', 'Εσένα', 'Εγώ', 'Αυτός'], en: 'As for me, I like coffee, and you?', hint: 'as for me' },
      { text: 'Αυτό το δώρο είναι για {b}. (you)', answer: 'εσένα', choices: ['εσένα', 'σε', 'εσύ', 'σου'], en: 'This gift is for you.', hint: 'after για → strong form' },
      { text: 'Δώσ’ το σ’ {b}, όχι σ’ εμένα. (him)', answer: 'αυτόν', choices: ['αυτόν', 'αυτός', 'τον', 'του'], en: 'Give it to him, not to me.', hint: 'to him (strong)' }
    ],
    'a2-prepositions': [
      { text: 'Πάω {b} δουλειά. (to · feminine)', answer: 'στη', choices: ['στη', 'στον', 'στο', 'στις'], en: 'I’m going to work.', hint: 'σε + τη → στη (η δουλειά)' },
      { text: 'Μένω {b} τρίτο όροφο. (on · masc)', answer: 'στον', choices: ['στον', 'στη', 'στο', 'στους'], en: 'I live on the third floor.', hint: 'σε + τον → στον' },
      { text: 'Το βιβλίο είναι {b} τραπέζι. (on · neuter)', answer: 'στο', choices: ['στο', 'στη', 'στον', 'στα'], en: 'The book is on the table.', hint: 'σε + το → στο' },
      { text: 'Ήρθα {b} τα πόδια. (on foot)', answer: 'με', choices: ['με', 'σε', 'από', 'για'], en: 'I came on foot.', hint: 'με τα πόδια' }
    ],
    'a2-future-continuous': [
      { text: 'Του χρόνου {b} ελληνικά κάθε μέρα. (will be studying)', answer: 'θα διαβάζω', accept: ['θα διαβαζω'], choices: ['θα διαβάζω', 'θα διαβάσω', 'διάβαζα', 'διαβάζω'], en: 'Next year I’ll be studying Greek every day.', hint: 'ongoing future · θα + present' },
      { text: 'Κάθε καλοκαίρι {b} στη θάλασσα. (will be going)', answer: 'θα πηγαίνουμε', choices: ['θα πηγαίνουμε', 'θα πάμε', 'πηγαίναμε', 'πάμε'], en: 'Every summer we’ll be going to the sea.', hint: 'repeated future' },
      { text: 'Όσο λείπεις, {b} τον σκύλο. (will be looking after)', answer: 'θα προσέχω', choices: ['θα προσέχω', 'θα προσέξω', 'πρόσεχα', 'προσέχω'], en: 'While you’re away, I’ll be looking after the dog.', hint: 'ongoing · θα + present' },
      { text: 'Μη μ’ ενοχλείς· {b} όλο το απόγευμα. (will be working)', answer: 'θα δουλεύω', choices: ['θα δουλεύω', 'θα δουλέψω', 'δούλευα', 'δουλεύω'], en: 'Don’t bother me; I’ll be working all afternoon.', hint: 'ongoing future' }
    ],
    'a2-vocative': [
      { text: 'Καλημέρα, {b}! (Γιώργος)', answer: 'Γιώργο', choices: ['Γιώργο', 'Γιώργος', 'Γιώργου', 'Γιώργους'], en: 'Good morning, George!', hint: 'vocative of Γιώργος' },
      { text: 'Τι κάνεις, {b}; (φίλος)', answer: 'φίλε', choices: ['φίλε', 'φίλος', 'φίλο', 'φίλου'], en: 'How are you, friend?', hint: 'vocative of φίλος' },
      { text: 'Ευχαριστώ, {b}! (κύριος)', answer: 'κύριε', choices: ['κύριε', 'κύριος', 'κύριο', 'κυρίου'], en: 'Thank you, sir!', hint: 'vocative of κύριος' },
      { text: 'Πού πας, {b}; (γιατρός)', answer: 'γιατρέ', choices: ['γιατρέ', 'γιατρός', 'γιατρό', 'γιατρού'], en: 'Where are you going, doctor?', hint: 'vocative of γιατρός' }
    ],
    'a2-adverbs': [
      { text: 'Τρέχει πολύ {b}. (fast)', answer: 'γρήγορα', choices: ['γρήγορα', 'γρήγορος', 'γρήγορη', 'γρήγορο'], en: 'He runs very fast.', hint: 'adverb (from γρήγορος)' },
      { text: 'Μίλα πιο {b}, σε παρακαλώ. (slowly)', answer: 'σιγά', choices: ['σιγά', 'σιγανός', 'αργός', 'σιγή'], en: 'Speak more slowly, please.', hint: 'adverb' },
      { text: 'Γράφει {b} από μένα. (better)', answer: 'καλύτερα', choices: ['καλύτερα', 'καλύτερος', 'καλά', 'πιο καλός'], en: 'He writes better than me.', hint: 'comparative adverb' },
      { text: 'Ήρθε {b} το πρωί. (early)', answer: 'νωρίς', choices: ['νωρίς', 'νωρίτερα', 'αργά', 'αργός'], en: 'He came early in the morning.', hint: 'adverb: early' }
    ],
    'a2-indirect-object': [
      { text: '{b} έδωσα το κλειδί. (to you)', answer: 'Σου', choices: ['Σου', 'Σε', 'Εσύ', 'Σας'], en: 'I gave you the key.', hint: 'to you (indirect)' },
      { text: '{b} αρέσουν τα ζώα. (they like → to them)', answer: 'Τους', choices: ['Τους', 'Τον', 'Αυτοί', 'Τα'], en: 'They like animals.', hint: 'to them · αρέσουν' },
      { text: '{b} φέρνω ένα δώρο. (to her)', answer: 'Της', choices: ['Της', 'Την', 'Αυτή', 'Τους'], en: 'I’m bringing her a present.', hint: 'to her' },
      { text: 'Δεν {b} αρέσει το κρύο. (I don’t like → to me)', answer: 'μου', choices: ['μου', 'με', 'εγώ', 'μας'], en: 'I don’t like the cold.', hint: 'to me · μου αρέσει' }
    ],
    'a2-noun-plurals': [
      { text: 'ο δρόμος → οι {b}', answer: 'δρόμοι', choices: ['δρόμοι', 'δρόμες', 'δρόμα', 'δρόμους'], en: 'the streets', hint: '-ος → -οι' },
      { text: 'η πόλη → οι {b}', answer: 'πόλεις', choices: ['πόλεις', 'πόλες', 'πόλοι', 'πόλια'], en: 'the cities', hint: '-η → -εις' },
      { text: 'το μάτι → τα {b}', answer: 'μάτια', choices: ['μάτια', 'μάτα', 'μάτες', 'μάτηδες'], en: 'the eyes', hint: '-ι → -ια' },
      { text: 'ο καφές → οι {b}', answer: 'καφέδες', choices: ['καφέδες', 'καφέ', 'καφέοι', 'καφέια'], en: 'the coffees', hint: '-ές → -έδες' }
    ],
    'a2-there-is': [
      { text: '{b} τουαλέτα εδώ κοντά; (is there)', answer: 'Υπάρχει', choices: ['Υπάρχει', 'Υπάρχουν', 'Είναι', 'Έχω'], en: 'Is there a toilet nearby?', hint: 'there is · singular' },
      { text: 'Στο ψυγείο {b} λίγο γάλα. (there is)', answer: 'υπάρχει', choices: ['υπάρχει', 'υπάρχουν', 'είναι', 'έχουν'], en: 'There’s a little milk in the fridge.', hint: 'there is' },
      { text: '{b} δωμάτια ελεύθερα; (are there)', answer: 'Υπάρχουν', choices: ['Υπάρχουν', 'Υπάρχει', 'Είναι', 'Έχει'], en: 'Are there any free rooms?', hint: 'there are · plural' },
      { text: 'Σήμερα {b} πολλή κίνηση. (colloquial: there’s)', answer: 'έχει', choices: ['έχει', 'έχουν', 'υπάρχουν', 'είναι'], en: 'There’s a lot of traffic today.', hint: 'colloquial έχει' }
    ],
    'a2-ordinals': [
      { text: 'Κατοικώ στον {b} όροφο. (second)', answer: 'δεύτερο', choices: ['δεύτερο', 'δεύτερος', 'δεύτερη', 'δύο'], en: 'I live on the second floor.', hint: 'second · masc accusative' },
      { text: 'Είναι η {b} μου μέρα εδώ. (first · fem)', answer: 'πρώτη', choices: ['πρώτη', 'πρώτος', 'πρώτο', 'μία'], en: 'It’s my first day here.', hint: 'first · feminine' },
      { text: 'Πήρε το {b} βραβείο. (third · neuter)', answer: 'τρίτο', choices: ['τρίτο', 'τρίτος', 'τρίτη', 'τρεις'], en: 'He won the third prize.', hint: 'third · neuter' },
      { text: 'Κάθομαι στην {b} σειρά. (fourth · fem)', answer: 'τέταρτη', choices: ['τέταρτη', 'τέταρτος', 'τέταρτο', 'τέσσερις'], en: 'I sit in the fourth row.', hint: 'fourth · feminine' }
    ],
    'a2-quantity-polys': [
      { text: 'Ήπια {b} νερό. (a lot of · neuter)', answer: 'πολύ', choices: ['πολύ', 'πολλή', 'πολλά', 'πολύς'], en: 'I drank a lot of water.', hint: 'much · neuter (το νερό)' },
      { text: 'Ξέρω {b} ανθρώπους εδώ. (many · masc acc)', answer: 'πολλούς', choices: ['πολλούς', 'πολλοί', 'πολλές', 'πολύ'], en: 'I know many people here.', hint: 'many · masc accusative' },
      { text: 'Δεν έχω {b} υπομονή. (much · fem)', answer: 'πολλή', choices: ['πολλή', 'πολύ', 'πολλά', 'πολύς'], en: 'I don’t have much patience.', hint: 'much · feminine (η υπομονή)' },
      { text: 'Είναι {b} ενδιαφέρον βιβλίο. (very — adverb)', answer: 'πολύ', choices: ['πολύ', 'πολλή', 'πολλά', 'πολύς'], en: 'It’s a very interesting book.', hint: 'very (invariable adverb)' }
    ],
    'a2-real-conditional': [
      { text: 'Αν {b} ώρα, πάρε με τηλέφωνο. (have → present)', answer: 'έχεις', choices: ['έχεις', 'είχες', 'θα έχεις', 'έχε'], en: 'If you have time, call me.', hint: 'real condition · present' },
      { text: 'Θα χαρώ αν {b}. (you come)', answer: 'έρθεις', choices: ['έρθεις', 'ήρθες', 'θα έρθεις', 'έρχεσαι'], en: 'I’ll be glad if you come.', hint: 'after αν · perfective' },
      { text: 'Αν {b} πεινασμένος, φάε κάτι. (are → present)', answer: 'είσαι', choices: ['είσαι', 'ήσουν', 'θα είσαι', 'είναι'], en: 'If you’re hungry, eat something.', hint: 'real condition · είμαι' },
      { text: '{b} κάνει ζέστη, θα κολυμπήσουμε. (if)', answer: 'Αν', choices: ['Αν', 'Όταν', 'Ότι', 'Ενώ'], en: 'If it’s hot, we’ll swim.', hint: 'if' }
    ],
    'a2-politeness-conditional': [
      { text: '{b} να δω το μενού; (could I)', answer: 'Θα μπορούσα', choices: ['Θα μπορούσα', 'Μπορώ', 'Μπόρεσα', 'Θα μπορώ'], en: 'Could I see the menu?', hint: 'polite request' },
      { text: '{b} λίγο ακόμα καφέ; (would you like)', answer: 'Θα ήθελες', choices: ['Θα ήθελες', 'Θέλεις', 'Ήθελες', 'Θα θέλεις'], en: 'Would you like a little more coffee?', hint: 'polite offer' },
      { text: '{b} να κλείσεις το παράθυρο; (could you)', answer: 'Θα μπορούσες', choices: ['Θα μπορούσες', 'Μπορείς', 'Μπόρεσες', 'Θα μπορείς'], en: 'Could you close the window?', hint: 'polite request' },
      { text: 'Εγώ {b} να μείνω σπίτι. (would prefer)', answer: 'θα προτιμούσα', choices: ['θα προτιμούσα', 'προτιμώ', 'προτίμησα', 'θα προτιμήσω'], en: 'I would prefer to stay home.', hint: 'polite preference' }
    ],
    /* ---------- B1 ---------- */
    'b1-present-perfect': [
      { text: 'Δεν {b} ποτέ στην Κρήτη. (have been)', answer: 'έχω πάει', choices: ['έχω πάει', 'πήγα', 'θα πάω', 'πηγαίνω'], en: 'I’ve never been to Crete.', hint: 'present perfect · εγώ' },
      { text: '{b} το φαγητό σου; (have finished)', answer: 'Έχεις τελειώσει', accept: ['εχεις τελειωσει'], choices: ['Έχεις τελειώσει', 'Τελείωσες', 'Θα τελειώσεις', 'Τελειώνεις'], en: 'Have you finished your food?', hint: 'present perfect · εσύ' },
      { text: 'Ο Νίκος {b} ήδη. (has left)', answer: 'έχει φύγει', choices: ['έχει φύγει', 'έφυγε', 'θα φύγει', 'φεύγει'], en: 'Nikos has already left.', hint: 'present perfect · he' }
    ],
    'b1-past-perfect': [
      { text: 'Όταν έφτασα, το τρένο {b}. (had left)', answer: 'είχε φύγει', choices: ['είχε φύγει', 'έφυγε', 'έχει φύγει', 'θα φύγει'], en: 'When I arrived, the train had left.', hint: 'past perfect' },
      { text: 'Δεν πείνασα γιατί {b} νωρίτερα. (had eaten)', answer: 'είχα φάει', choices: ['είχα φάει', 'έφαγα', 'έχω φάει', 'τρώω'], en: 'I wasn’t hungry because I had eaten earlier.', hint: 'past perfect · εγώ' },
      { text: 'Μέχρι το 2010 {b} το σπίτι. (had built)', answer: 'είχαν χτίσει', choices: ['είχαν χτίσει', 'έχτισαν', 'έχουν χτίσει', 'χτίζουν'], en: 'By 2010 they had built the house.', hint: 'past perfect · they' }
    ],
    'b1-passive': [
      { text: 'Το γράμμα {b} χθες. (was written)', answer: 'γράφτηκε', choices: ['γράφτηκε', 'έγραψε', 'γράφει', 'θα γράψει'], en: 'The letter was written yesterday.', hint: 'passive aorist' },
      { text: 'Το σπίτι {b} το 1990. (was built)', answer: 'χτίστηκε', choices: ['χτίστηκε', 'έχτισε', 'χτίζει', 'θα χτίσει'], en: 'The house was built in 1990.', hint: 'passive aorist' },
      { text: 'Τα προϊόντα {b} στην Ελλάδα. (are made)', answer: 'φτιάχνονται', choices: ['φτιάχνονται', 'φτιάχνουν', 'έφτιαξαν', 'φτιάχνει'], en: 'The products are made in Greece.', hint: 'passive present' }
    ],
    'b1-time-clauses': [
      { text: '{b} φύγεις, κλείσε τα φώτα. (before)', answer: 'Πριν', choices: ['Πριν', 'Αφού', 'Μόλις', 'Μέχρι'], en: 'Before you leave, turn off the lights.', hint: 'before' },
      { text: '{b} έφαγε, έπλυνε τα πιάτα. (after)', answer: 'Αφού', choices: ['Αφού', 'Πριν', 'Ενώ', 'Μέχρι'], en: 'After he ate, he washed the dishes.', hint: 'after' },
      { text: '{b} σε δω, θα σου πω. (as soon as)', answer: 'Μόλις', choices: ['Μόλις', 'Πριν', 'Αφού', 'Ώσπου'], en: 'As soon as I see you, I’ll tell you.', hint: 'as soon as' }
    ],
    'b1-relatives-oti': [
      { text: 'Κάνε {b} νομίζεις σωστό. (whatever)', answer: 'ό,τι', choices: ['ό,τι', 'ότι', 'όποιος', 'όσο'], en: 'Do whatever you think is right.', hint: 'whatever' },
      { text: 'Πήγαινε {b} θέλεις. (wherever)', answer: 'όπου', choices: ['όπου', 'ό,τι', 'όποτε', 'όσο'], en: 'Go wherever you want.', hint: 'wherever' },
      { text: 'Πάρε {b} θέλεις από αυτά. (as many as)', answer: 'όσα', choices: ['όσα', 'ό,τι', 'όποια', 'όπου'], en: 'Take as many of these as you want.', hint: 'as many as (neuter pl)' }
    ],
    'b1-double-clitics': [
      { text: 'Το γράμμα; {b} έστειλα ήδη. (to her + it)', answer: 'Της το', choices: ['Της το', 'Το της', 'Τη το', 'Της τον'], en: 'The letter? I already sent it to her.', hint: 'to her + it' },
      { text: 'Αν θες τα κλειδιά, {b} φέρνω. (to you + them)', answer: 'σου τα', choices: ['σου τα', 'τα σου', 'σε τα', 'σου το'], en: 'If you want the keys, I’ll bring them to you.', hint: 'to you + them' },
      { text: 'Την αλήθεια {b} είπε επιτέλους. (to us + it)', answer: 'μας την', choices: ['μας την', 'την μας', 'μας τη', 'μα την'], en: 'He finally told it to us.', hint: 'to us + it (fem)' }
    ],
    'b1-cause-result': [
      { text: 'Χάλασε το αμάξι, {b} πήγα με τα πόδια. (so)', answer: 'γι’ αυτό', choices: ['γι’ αυτό', 'γιατί', 'αν', 'ώστε'], en: 'The car broke down, so I walked.', hint: 'so / that’s why' },
      { text: 'Έκλεισε ο δρόμος {b} ατυχήματος. (because of)', answer: 'λόγω', choices: ['λόγω', 'γιατί', 'επειδή', 'αφού'], en: 'The road closed because of an accident.', hint: 'because of + genitive' },
      { text: 'Βρέχει, {b} πάρε ομπρέλα. (therefore)', answer: 'επομένως', choices: ['επομένως', 'επειδή', 'ενώ', 'μόλις'], en: 'It’s raining, therefore take an umbrella.', hint: 'therefore' }
    ],
    'b1-superlatives': [
      { text: 'Είναι το {b} βιβλίο που έχω διαβάσει. (best)', answer: 'καλύτερο', choices: ['καλύτερο', 'πιο καλό', 'καλό', 'καλύτερα'], en: 'It’s the best book I’ve read.', hint: 'the best · neuter' },
      { text: 'Ήταν μια {b} στιγμή. (most beautiful → absolute)', answer: 'ωραιότατη', choices: ['ωραιότατη', 'ωραία', 'πιο ωραία', 'ωραιότερη'], en: 'It was a most beautiful moment.', hint: 'absolute superlative' },
      { text: 'Αυτός είναι ο {b} δρόμος. (shortest)', answer: 'συντομότερος', choices: ['συντομότερος', 'πιο σύντομα', 'σύντομος', 'συντομότατα'], en: 'This is the shortest way.', hint: 'the shortest · masc' }
    ],
    'b1-equality': [
      { text: 'Είναι {b} έξυπνη όσο η αδερφή της. (as)', answer: 'τόσο', choices: ['τόσο', 'πιο', 'σαν', 'όσο'], en: 'She’s as clever as her sister.', hint: 'τόσο … όσο' },
      { text: 'Κοιμάται {b} μωρό. (like a)', answer: 'σαν', choices: ['σαν', 'τόσο', 'πιο', 'από'], en: 'He sleeps like a baby.', hint: 'like + accusative' },
      { text: 'Έχω το {b} πρόβλημα με σένα. (same)', answer: 'ίδιο', choices: ['ίδιο', 'σαν', 'τόσο', 'όμοιο'], en: 'I have the same problem as you.', hint: 'the same' }
    ],
    'b1-diminutives': [
      { text: 'Πάρε ένα {b} ακόμα. (little piece)', answer: 'κομματάκι', choices: ['κομματάκι', 'κομμάτι', 'κομματάρα', 'κομμάτια'], en: 'Have another little piece.', hint: 'diminutive of κομμάτι' },
      { text: 'Τι γλυκό {b}! (little dog)', answer: 'σκυλάκι', choices: ['σκυλάκι', 'σκυλί', 'σκύλος', 'σκυλιά'], en: 'What a sweet little dog!', hint: 'diminutive of σκυλί' },
      { text: 'Θα πάρω έναν {b}. (little nap)', answer: 'υπνάκο', choices: ['υπνάκο', 'ύπνο', 'υπναρά', 'ύπνος'], en: 'I’ll take a little nap.', hint: 'diminutive of ύπνος' }
    ],
    'b1-discourse-connectors': [
      { text: 'Ήταν αργά. {b}, αποφασίσαμε να μείνουμε. (therefore)', answer: 'Επομένως', choices: ['Επομένως', 'Δηλαδή', 'Ωστόσο', 'Επίσης'], en: 'It was late. Therefore, we decided to stay.', hint: 'therefore' },
      { text: 'Δεν πεινάω. {b}, θα φάω κάτι μικρό. (nevertheless)', answer: 'Παρ’ όλα αυτά', choices: ['Παρ’ όλα αυτά', 'Δηλαδή', 'Πρώτον', 'Επίσης'], en: 'I’m not hungry. Still, I’ll have something small.', hint: 'nevertheless' },
      { text: 'Δουλεύει πολύ. {b}, σπουδάζει κιόλας. (moreover)', answer: 'Επιπλέον', choices: ['Επιπλέον', 'Ωστόσο', 'Δηλαδή', 'Αντίθετα'], en: 'He works a lot. Moreover, he also studies.', hint: 'moreover' }
    ],
    /* ---------- B2 ---------- */
    'b2-passive-participle': [
      { text: 'Η πόρτα ήταν {b}. (locked)', answer: 'κλειδωμένη', choices: ['κλειδωμένη', 'κλειδώνοντας', 'κλείδωσε', 'κλειδώνει'], en: 'The door was locked.', hint: 'passive participle · fem' },
      { text: 'Βρήκα το τραπέζι {b}. (set)', answer: 'στρωμένο', choices: ['στρωμένο', 'στρώνοντας', 'έστρωσε', 'στρώνει'], en: 'I found the table set.', hint: 'passive participle · neuter' },
      { text: 'Είμαι πολύ {b} μαζί σου. (disappointed)', answer: 'απογοητευμένος', choices: ['απογοητευμένος', 'απογοητεύοντας', 'απογοήτευσε', 'απογοητεύει'], en: 'I’m very disappointed with you.', hint: 'passive participle · masc' }
    ],
    'b2-concessive': [
      { text: '{b} ήταν άρρωστος, ήρθε στη δουλειά. (although)', answer: 'Αν και', choices: ['Αν και', 'Επειδή', 'Μόλις', 'Ώστε'], en: 'Although he was ill, he came to work.', hint: 'although' },
      { text: '{b} τη βροχή, βγήκαμε βόλτα. (despite + noun)', answer: 'Παρά', choices: ['Παρά', 'Παρόλο που', 'Επειδή', 'Αφού'], en: 'Despite the rain, we went out.', hint: 'despite + accusative' },
      { text: '{b} που κουράστηκε, χαμογελούσε. (even though)', answer: 'Παρόλο', choices: ['Παρόλο', 'Επειδή', 'Μόλις', 'Ώστε'], en: 'Even though she was tired, she was smiling.', hint: 'even though (παρόλο που)' }
    ],
    'b2-conditional-perfect': [
      { text: 'Αν το ήξερα, {b} διαφορετικά. (would have acted)', answer: 'θα είχα φερθεί', choices: ['θα είχα φερθεί', 'φέρθηκα', 'θα φερθώ', 'έχω φερθεί'], en: 'If I’d known, I would have acted differently.', hint: 'unreal past · εγώ' },
      { text: 'Αν είχες φύγει νωρίτερα, {b} το τρένο. (would have caught)', answer: 'θα είχες προλάβει', choices: ['θα είχες προλάβει', 'πρόλαβες', 'θα προλάβεις', 'έχεις προλάβει'], en: 'If you’d left earlier, you would have caught the train.', hint: 'unreal past · εσύ' },
      { text: 'Χωρίς τη βοήθειά σου, {b}. (would have failed)', answer: 'θα είχα αποτύχει', choices: ['θα είχα αποτύχει', 'απέτυχα', 'θα αποτύχω', 'έχω αποτύχει'], en: 'Without your help, I would have failed.', hint: 'unreal past · εγώ' }
    ],
    'b2-dipote': [
      { text: 'Πάρε {b} θέλεις. (anything at all)', answer: 'οτιδήποτε', choices: ['οτιδήποτε', 'οποιοσδήποτε', 'οπουδήποτε', 'οποτεδήποτε'], en: 'Take anything you want.', hint: 'anything (whatsoever)' },
      { text: 'Έλα {b}, θα είμαι εδώ. (any time)', answer: 'οποτεδήποτε', choices: ['οποτεδήποτε', 'οπουδήποτε', 'οτιδήποτε', 'οποιοσδήποτε'], en: 'Come any time, I’ll be here.', hint: 'whenever (at all)' },
      { text: '{b} μπορεί να το κάνει αυτό. (anyone)', answer: 'Οποιοσδήποτε', choices: ['Οποιοσδήποτε', 'Οτιδήποτε', 'Οπουδήποτε', 'Οποτεδήποτε'], en: 'Anyone can do this.', hint: 'anyone (at all)' }
    ],
    'b2-reported-speech': [
      { text: 'Μου είπε {b} θα αργήσει. (that)', answer: 'ότι', choices: ['ότι', 'να', 'αν', 'που'], en: 'He told me that he’d be late.', hint: 'reported: that' },
      { text: 'Με ρώτησε {b} θέλω καφέ. (whether)', answer: 'αν', choices: ['αν', 'ότι', 'να', 'που'], en: 'She asked me if I wanted coffee.', hint: 'reported question: if' },
      { text: 'Είπε πως {b} κουρασμένος. (he was)', answer: 'ήταν', choices: ['ήταν', 'είναι', 'είσαι', 'θα είναι'], en: 'He said he was tired.', hint: 'backshift: is → was' }
    ],
    'b2-impersonal': [
      { text: '{b} να προσέχεις στον δρόμο. (you must)', answer: 'Πρέπει', choices: ['Πρέπει', 'Μπορώ', 'Θέλω', 'Είμαι'], en: 'You must be careful on the road.', hint: 'must (impersonal)' },
      { text: '{b} να πάρεις εισιτήριο από πριν. (you need)', answer: 'Χρειάζεται', choices: ['Χρειάζεται', 'Πρέπεις', 'Μπορείς', 'Θέλεις'], en: 'You need to get a ticket in advance.', hint: 'it’s necessary' },
      { text: 'Δεν {b} για χρήματα, αλλά για αρχές. (it’s about)', answer: 'πρόκειται', choices: ['πρόκειται', 'φαίνεται', 'αξίζει', 'μπορεί'], en: 'It’s not about money, but principles.', hint: 'it’s about (πρόκειται για)' }
    ],
    'b2-wishes': [
      { text: '{b} να τελείωναν τα προβλήματα! (if only)', answer: 'Μακάρι', choices: ['Μακάρι', 'Πρέπει', 'Ίσως', 'Όταν'], en: 'If only the problems would end!', hint: 'I wish / if only' },
      { text: 'Μακάρι να {b} εδώ τώρα. (were here → unreal)', answer: 'ήσουν', choices: ['ήσουν', 'είσαι', 'θα είσαι', 'είμαι'], en: 'I wish you were here now.', hint: 'unreal wish · παρατατικός' },
      { text: 'Πέρασες τις εξετάσεις; {b} να χαίρεσαι! (good for you)', answer: 'Να', choices: ['Να', 'Θα', 'Αν', 'Μακάρι'], en: 'You passed the exams? Good for you!', hint: 'να + verb = a wish' }
    ],
    'b2-future-perfect': [
      { text: 'Μέχρι τον Ιούνιο {b} το πτυχίο μου. (will have got)', answer: 'θα έχω πάρει', choices: ['θα έχω πάρει', 'πήρα', 'θα πάρω', 'έχω πάρει'], en: 'By June I’ll have got my degree.', hint: 'future perfect · εγώ' },
      { text: 'Σε μία ώρα {b} το φαγητό. (will have cooked)', answer: 'θα έχω μαγειρέψει', choices: ['θα έχω μαγειρέψει', 'μαγείρεψα', 'θα μαγειρέψω', 'έχω μαγειρέψει'], en: 'In an hour I’ll have cooked the food.', hint: 'future perfect · εγώ' },
      { text: 'Ως το βράδυ {b} σπίτι. (will have returned)', answer: 'θα έχουν γυρίσει', choices: ['θα έχουν γυρίσει', 'γύρισαν', 'θα γυρίσουν', 'έχουν γυρίσει'], en: 'By the evening they’ll have returned home.', hint: 'future perfect · they' }
    ],
    'b2-subjunctive-perfect': [
      { text: 'Ελπίζω να {b} πριν τις εξετάσεις. (have learned)', answer: 'έχω μάθει', choices: ['έχω μάθει', 'μάθω', 'έμαθα', 'μαθαίνω'], en: 'I hope to have learned it before the exams.', hint: 'perfect subjunctive · εγώ' },
      { text: 'Πρέπει να {b} πριν σκοτεινιάσει. (have arrived)', answer: 'έχουμε φτάσει', choices: ['έχουμε φτάσει', 'φτάσουμε', 'φτάσαμε', 'φτάνουμε'], en: 'We must have arrived before dark.', hint: 'perfect subjunctive · εμείς' },
      { text: 'Φοβάμαι μην {b} το λεωφορείο. (have missed)', answer: 'έχεις χάσει', choices: ['έχεις χάσει', 'χάσεις', 'έχασες', 'χάνεις'], en: 'I’m afraid you may have missed the bus.', hint: 'perfect subjunctive · εσύ' }
    ],
    /* ---------- C1 ---------- */
    'c1-formal-connectors': [
      { text: 'Δεν ήρθε· {b}, ειδοποίησε εγκαίρως. (however)', answer: 'εντούτοις', choices: ['εντούτοις', 'επειδή', 'προκειμένου', 'εφόσον'], en: 'He didn’t come; however, he informed us in time.', hint: 'however (formal)' },
      { text: '{b} να αποφευχθούν λάθη, ελέγξτε ξανά. (in order to)', answer: 'Προκειμένου', choices: ['Προκειμένου', 'Δεδομένου', 'Παρότι', 'Καθώς'], en: 'In order to avoid mistakes, check again.', hint: 'in order to (+ να)' },
      { text: '{b} καθυστέρησε το τρένο, χάσαμε τη σύνδεση. (as / since)', answer: 'Καθώς', choices: ['Καθώς', 'Ωστόσο', 'Προκειμένου', 'Εντούτοις'], en: 'As the train was delayed, we missed the connection.', hint: 'as / since' }
    ],
    'c1-nominalization': [
      { text: '{b} καπνίζεις βλάπτει την υγεία. (smoking)', answer: 'Το να', choices: ['Το να', 'Που', 'Ότι', 'Να'], en: 'Smoking harms your health.', hint: 'το να + verb' },
      { text: 'Κουράστηκα {b} περιμένω. (from …ing)', answer: 'από το να', choices: ['από το να', 'το να', 'που', 'ότι'], en: 'I got tired from waiting.', hint: 'από + nominalized clause' },
      { text: 'Με χαροποιεί {b} ότι πέτυχες. (the fact that)', answer: 'το γεγονός', choices: ['το γεγονός', 'να', 'αν', 'όσο'], en: 'The fact that you succeeded makes me happy.', hint: 'the fact that' }
    ],
    'c1-cleft': [
      { text: '{b} χρειάζεσαι είναι ξεκούραση. (what)', answer: 'Αυτό που', choices: ['Αυτό που', 'Ότι', 'Αν', 'Όποιος'], en: 'What you need is rest.', hint: 'what … (cleft)' },
      { text: '{b} με στεναχώρησε ήταν τα λόγια του. (what)', answer: 'Αυτό που', choices: ['Αυτό που', 'Που', 'Να', 'Όσο'], en: 'What upset me was his words.', hint: 'cleft for emphasis' },
      { text: '{b} πρότεινε τη λύση ήταν η νεαρή. (the one who)', answer: 'Εκείνη που', choices: ['Εκείνη που', 'Αυτό που', 'Ό,τι', 'Όποια'], en: 'The one who proposed the solution was the young woman.', hint: 'the one who (fem)' }
    ],
    'c1-concessive-advanced': [
      { text: '{b} και να κοστίσει, θα το αγοράσω. (however much)', answer: 'Όσο', choices: ['Όσο', 'Ό,τι', 'Όπου', 'Όποιος'], en: 'However much it costs, I’ll buy it.', hint: 'however much' },
      { text: '{b} και να ρωτήσεις, θα σου πω το ίδιο. (whatever)', answer: 'Ό,τι', choices: ['Ό,τι', 'Όσο', 'Όπου', 'Όποτε'], en: 'Whatever you ask, I’ll tell you the same.', hint: 'whatever' },
      { text: '{b} και να πάμε, θα έχει κόσμο. (wherever)', answer: 'Όπου', choices: ['Όπου', 'Όσο', 'Ό,τι', 'Όποιος'], en: 'Wherever we go, it’ll be crowded.', hint: 'wherever' }
    ],
    'c1-causative': [
      { text: 'Ο θόρυβος με {b} να ξυπνήσω. (made)', answer: 'έκανε', choices: ['έκανε', 'άφησε', 'έβαλε', 'βοήθησε'], en: 'The noise made me wake up.', hint: 'make someone (κάνω … να)' },
      { text: 'Τους {b} να καθαρίσουν το δωμάτιο. (got them to)', answer: 'έβαλα', choices: ['έβαλα', 'έκανα', 'άφησα', 'είδα'], en: 'I got them to clean the room.', hint: 'βάζω … να' },
      { text: 'Δεν με {b} να τελειώσω τη φράση μου. (let)', answer: 'άφησε', choices: ['άφησε', 'έκανε', 'έβαλε', 'είπε'], en: 'He didn’t let me finish my sentence.', hint: 'αφήνω … να' }
    ],
    'c1-passive-agent': [
      { text: 'Το ποίημα γράφτηκε {b} τον Καβάφη. (by)', answer: 'από', choices: ['από', 'με', 'σε', 'για'], en: 'The poem was written by Cavafy.', hint: 'agent of a passive' },
      { text: 'Η επιτροπή {b} από πέντε μέλη. (consists of)', answer: 'αποτελείται', choices: ['αποτελείται', 'αποτελεί', 'αποτέλεσε', 'αποτελούν'], en: 'The committee consists of five members.', hint: 'formal passive: consists of' },
      { text: 'Η καθυστέρηση {b} στην κακοκαιρία. (is due to)', answer: 'οφείλεται', choices: ['οφείλεται', 'οφείλει', 'όφειλε', 'οφείλουν'], en: 'The delay is due to the bad weather.', hint: 'formal passive: is due to' }
    ],
    'c1-participles-formal': [
      { text: 'Ένα καλά {b} σχέδιο. (organised)', answer: 'οργανωμένο', choices: ['οργανωμένο', 'οργανώνοντας', 'οργάνωσε', 'οργανώνει'], en: 'A well-organised plan.', hint: 'passive participle · neuter' },
      { text: 'Ο {b} σύμβουλος υπέγραψε. (managing)', answer: 'διευθύνων', choices: ['διευθύνων', 'διευθύνοντας', 'διευθύνει', 'διεύθυνε'], en: 'The managing director signed.', hint: 'formal active participle' },
      { text: 'Τα {b} έγγραφα είναι στο συρτάρι. (signed)', answer: 'υπογεγραμμένα', choices: ['υπογεγραμμένα', 'υπογράφοντας', 'υπέγραψαν', 'υπογράφουν'], en: 'The signed documents are in the drawer.', hint: 'passive participle · neuter pl' }
    ],
    'c1-stance-adverbs': [
      { text: '{b}, η κατάσταση είναι σοβαρή. (evidently)', answer: 'Προφανώς', choices: ['Προφανώς', 'Ίσως', 'Δυστυχώς', 'Σπάνια'], en: 'Evidently, the situation is serious.', hint: 'evidently / obviously' },
      { text: '{b} θα υπάρξουν αλλαγές. (possibly)', answer: 'Ενδεχομένως', choices: ['Ενδεχομένως', 'Οπωσδήποτε', 'Καθόλου', 'Ποτέ'], en: 'Possibly there will be changes.', hint: 'possibly' },
      { text: '{b}, δεν συμφωνώ με αυτή την άποψη. (frankly)', answer: 'Ειλικρινά', choices: ['Ειλικρινά', 'Προφανώς', 'Ίσως', 'Δυστυχώς'], en: 'Frankly, I don’t agree with this view.', hint: 'frankly' }
    ]
  };
  (window.GRAMMAR || []).forEach(function (p) {
    if (MORE2[p.id]) p.items = p.items.concat(MORE2[p.id]);
  });
})();


/* Auto-generated conjugation-practice items from the Verb Memoriser tables (verified forms). */
(function(){
  var GEN={"a1-present-a":[{"text":"Εγώ {b} κάθε μέρα. (play)","answer":"παίζω","choices":["παίζω","παίζεις","παίζει","παίζουμε"],"en":"I play (present)","hint":"present · I"},{"text":"Εγώ {b} κάθε μέρα. (read)","answer":"διαβάζω","choices":["διαβάζω","διαβάζεις","διαβάζει","διαβάζουμε"],"en":"I read (present)","hint":"present · I"},{"text":"Εγώ {b} κάθε μέρα. (write)","answer":"γράφω","choices":["γράφω","γράφεις","γράφει","γράφουμε"],"en":"I write (present)","hint":"present · I"},{"text":"Εγώ {b} κάθε μέρα. (cry)","answer":"κλαίω","choices":["κλαίω","κλαις","κλαίει","κλαίμε"],"en":"I cry (present)","hint":"present · I"},{"text":"Εγώ {b} κάθε μέρα. (be at fault)","answer":"φταίω","choices":["φταίω","φταις","φταίει","φταίμε"],"en":"I am at fault (present)","hint":"present · I"},{"text":"Εγώ {b} κάθε μέρα. (work)","answer":"δουλεύω","choices":["δουλεύω","δουλεύεις","δουλεύει","δουλεύουμε"],"en":"I work (present)","hint":"present · I"},{"text":"Εγώ {b} κάθε μέρα. (cook)","answer":"μαγειρεύω","choices":["μαγειρεύω","μαγειρεύεις","μαγειρεύει","μαγειρεύουμε"],"en":"I cook (present)","hint":"present · I"},{"text":"Εγώ {b} κάθε μέρα. (run)","answer":"τρέχω","choices":["τρέχω","τρέχεις","τρέχει","τρέχουμε"],"en":"I run (present)","hint":"present · I"},{"text":"Εγώ {b} κάθε μέρα. (travel)","answer":"ταξιδεύω","choices":["ταξιδεύω","ταξιδεύεις","ταξιδεύει","ταξιδεύουμε"],"en":"I travel (present)","hint":"present · I"},{"text":"Εγώ {b} κάθε μέρα. (leave)","answer":"φεύγω","choices":["φεύγω","φεύγεις","φεύγει","φεύγουμε"],"en":"I leave (present)","hint":"present · I"},{"text":"Εγώ {b} κάθε μέρα. (learn)","answer":"μαθαίνω","choices":["μαθαίνω","μαθαίνεις","μαθαίνει","μαθαίνουμε"],"en":"I learn (present)","hint":"present · I"},{"text":"Εγώ {b} κάθε μέρα. (wait)","answer":"περιμένω","choices":["περιμένω","περιμένεις","περιμένει","περιμένουμε"],"en":"I wait (present)","hint":"present · I"},{"text":"Εσύ {b} κάθε μέρα. (play)","answer":"παίζεις","choices":["παίζεις","παίζει","παίζουμε","παίζετε"],"en":"you play (present)","hint":"present · you"},{"text":"Εσύ {b} κάθε μέρα. (read)","answer":"διαβάζεις","choices":["διαβάζεις","διαβάζει","διαβάζουμε","διαβάζετε"],"en":"you read (present)","hint":"present · you"},{"text":"Εσύ {b} κάθε μέρα. (write)","answer":"γράφεις","choices":["γράφεις","γράφει","γράφουμε","γράφετε"],"en":"you write (present)","hint":"present · you"},{"text":"Εσύ {b} κάθε μέρα. (cry)","answer":"κλαις","choices":["κλαις","κλαίει","κλαίμε","κλαίτε"],"en":"you cry (present)","hint":"present · you"},{"text":"Εσύ {b} κάθε μέρα. (be at fault)","answer":"φταις","choices":["φταις","φταίει","φταίμε","φταίτε"],"en":"you are at fault (present)","hint":"present · you"},{"text":"Εσύ {b} κάθε μέρα. (work)","answer":"δουλεύεις","choices":["δουλεύεις","δουλεύει","δουλεύουμε","δουλεύετε"],"en":"you work (present)","hint":"present · you"},{"text":"Εσύ {b} κάθε μέρα. (cook)","answer":"μαγειρεύεις","choices":["μαγειρεύεις","μαγειρεύει","μαγειρεύουμε","μαγειρεύετε"],"en":"you cook (present)","hint":"present · you"},{"text":"Εσύ {b} κάθε μέρα. (run)","answer":"τρέχεις","choices":["τρέχεις","τρέχει","τρέχουμε","τρέχετε"],"en":"you run (present)","hint":"present · you"},{"text":"Εσύ {b} κάθε μέρα. (travel)","answer":"ταξιδεύεις","choices":["ταξιδεύεις","ταξιδεύει","ταξιδεύουμε","ταξιδεύετε"],"en":"you travel (present)","hint":"present · you"},{"text":"Εσύ {b} κάθε μέρα. (leave)","answer":"φεύγεις","choices":["φεύγεις","φεύγει","φεύγουμε","φεύγετε"],"en":"you leave (present)","hint":"present · you"},{"text":"Εσύ {b} κάθε μέρα. (learn)","answer":"μαθαίνεις","choices":["μαθαίνεις","μαθαίνει","μαθαίνουμε","μαθαίνετε"],"en":"you learn (present)","hint":"present · you"},{"text":"Εσύ {b} κάθε μέρα. (wait)","answer":"περιμένεις","choices":["περιμένεις","περιμένει","περιμένουμε","περιμένετε"],"en":"you wait (present)","hint":"present · you"},{"text":"Αυτός {b} κάθε μέρα. (play)","answer":"παίζει","choices":["παίζει","παίζουμε","παίζετε","παίζουν"],"en":"he plays (present)","hint":"present · he"},{"text":"Αυτός {b} κάθε μέρα. (read)","answer":"διαβάζει","choices":["διαβάζει","διαβάζουμε","διαβάζετε","διαβάζουν"],"en":"he reads (present)","hint":"present · he"},{"text":"Αυτός {b} κάθε μέρα. (write)","answer":"γράφει","choices":["γράφει","γράφουμε","γράφετε","γράφουν"],"en":"he writes (present)","hint":"present · he"},{"text":"Αυτός {b} κάθε μέρα. (cry)","answer":"κλαίει","choices":["κλαίει","κλαίμε","κλαίτε","κλαίνε"],"en":"he cries (present)","hint":"present · he"},{"text":"Αυτός {b} κάθε μέρα. (be at fault)","answer":"φταίει","choices":["φταίει","φταίμε","φταίτε","φταίνε"],"en":"he is at fault (present)","hint":"present · he"},{"text":"Αυτός {b} κάθε μέρα. (work)","answer":"δουλεύει","choices":["δουλεύει","δουλεύουμε","δουλεύετε","δουλεύουν"],"en":"he works (present)","hint":"present · he"},{"text":"Αυτός {b} κάθε μέρα. (cook)","answer":"μαγειρεύει","choices":["μαγειρεύει","μαγειρεύουμε","μαγειρεύετε","μαγειρεύουν"],"en":"he cooks (present)","hint":"present · he"},{"text":"Αυτός {b} κάθε μέρα. (run)","answer":"τρέχει","choices":["τρέχει","τρέχουμε","τρέχετε","τρέχουν"],"en":"he runs (present)","hint":"present · he"},{"text":"Αυτός {b} κάθε μέρα. (travel)","answer":"ταξιδεύει","choices":["ταξιδεύει","ταξιδεύουμε","ταξιδεύετε","ταξιδεύουν"],"en":"he travels (present)","hint":"present · he"},{"text":"Αυτός {b} κάθε μέρα. (leave)","answer":"φεύγει","choices":["φεύγει","φεύγουμε","φεύγετε","φεύγουν"],"en":"he leaves (present)","hint":"present · he"},{"text":"Αυτός {b} κάθε μέρα. (learn)","answer":"μαθαίνει","choices":["μαθαίνει","μαθαίνουμε","μαθαίνετε","μαθαίνουν"],"en":"he learns (present)","hint":"present · he"}],"a2-aorist":[{"text":"Εγώ {b} χθες. (play)","answer":"έπαιξα","choices":["έπαιξα","έπαιξες","έπαιξε","παίξαμε"],"en":"I play (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (drive)","answer":"οδήγησα","choices":["οδήγησα","οδήγησες","οδήγησε","οδηγήσαμε"],"en":"I drive (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (phone)","answer":"τηλεφώνησα","choices":["τηλεφώνησα","τηλεφώνησες","τηλεφώνησε","τηλεφωνήσαμε"],"en":"I phone (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (work)","answer":"δούλεψα","choices":["δούλεψα","δούλεψες","δούλεψε","δουλέψαμε"],"en":"I work (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (travel)","answer":"ταξίδεψα","choices":["ταξίδεψα","ταξίδεψες","ταξίδεψε","ταξιδέψαμε"],"en":"I travel (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (help)","answer":"βοήθησα","choices":["βοήθησα","βοήθησες","βοήθησε","βοηθήσαμε"],"en":"I help (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (walk)","answer":"περπάτησα","choices":["περπάτησα","περπάτησες","περπάτησε","περπατήσαμε"],"en":"I walk (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (smile)","answer":"χαμογέλασα","choices":["χαμογέλασα","χαμογέλασες","χαμογέλασε","χαμογελάσαμε"],"en":"I smile (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (sleep)","answer":"κοιμήθηκα","choices":["κοιμήθηκα","κοιμήθηκες","κοιμήθηκε","κοιμηθήκαμε"],"en":"I sleep (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (be afraid)","answer":"φοβήθηκα","choices":["φοβήθηκα","φοβήθηκες","φοβήθηκε","φοβηθήκαμε"],"en":"I was afraid (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (relax)","answer":"χαλάρωσα","choices":["χαλάρωσα","χαλάρωσες","χαλάρωσε","χαλαρώσαμε"],"en":"I relax (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (read)","answer":"διάβασα","choices":["διάβασα","διάβασες","διάβασε","διαβάσαμε"],"en":"I read (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (run)","answer":"έτρεξα","choices":["έτρεξα","έτρεξες","έτρεξε","τρέξαμε"],"en":"I run (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (cry)","answer":"έκλαψα","choices":["έκλαψα","έκλαψες","έκλαψε","κλάψαμε"],"en":"I cry (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (be at fault)","answer":"έφταιξα","choices":["έφταιξα","έφταιξες","έφταιξε","φταίξαμε"],"en":"I was at fault (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (return)","answer":"επέστρεψα","choices":["επέστρεψα","επέστρεψες","επέστρεψε","επιστρέψαμε"],"en":"I return (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (arrive)","answer":"έφτασα","choices":["έφτασα","έφτασες","έφτασε","φτάσαμε"],"en":"I arrive (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (stop)","answer":"σταμάτησα","choices":["σταμάτησα","σταμάτησες","σταμάτησε","σταματήσαμε"],"en":"I stop (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (go)","answer":"πήγα","choices":["πήγα","πήγες","πήγε","πήγαμε"],"en":"I go (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (come)","answer":"ήρθα","choices":["ήρθα","ήρθες","ήρθε","ήρθαμε"],"en":"I come (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (eat)","answer":"έφαγα","choices":["έφαγα","έφαγες","έφαγε","φάγαμε"],"en":"I eat (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (drink)","answer":"ήπια","choices":["ήπια","ήπιες","ήπιε","ήπιαμε"],"en":"I drink (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (go out)","answer":"βγήκα","choices":["βγήκα","βγήκες","βγήκε","βγήκαμε"],"en":"I go out (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (leave)","answer":"έφυγα","choices":["έφυγα","έφυγες","έφυγε","φύγαμε"],"en":"I leave (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (can)","answer":"μπόρεσα","choices":["μπόρεσα","μπόρεσες","μπόρεσε","μπορέσαμε"],"en":"I can (past)","hint":"simple past · I"},{"text":"Εγώ {b} χθες. (rest)","answer":"ξεκουράστηκα","choices":["ξεκουράστηκα","ξεκουράστηκες","ξεκουράστηκε","ξεκουραστήκαμε"],"en":"I rest (past)","hint":"simple past · I"},{"text":"Εσύ {b} χθες. (play)","answer":"έπαιξες","choices":["έπαιξες","έπαιξε","παίξαμε","παίξατε"],"en":"you play (past)","hint":"simple past · you"},{"text":"Εσύ {b} χθες. (drive)","answer":"οδήγησες","choices":["οδήγησες","οδήγησε","οδηγήσαμε","οδηγήσατε"],"en":"you drive (past)","hint":"simple past · you"},{"text":"Εσύ {b} χθες. (phone)","answer":"τηλεφώνησες","choices":["τηλεφώνησες","τηλεφώνησε","τηλεφωνήσαμε","τηλεφωνήσατε"],"en":"you phone (past)","hint":"simple past · you"},{"text":"Εσύ {b} χθες. (work)","answer":"δούλεψες","choices":["δούλεψες","δούλεψε","δουλέψαμε","δουλέψατε"],"en":"you work (past)","hint":"simple past · you"},{"text":"Εσύ {b} χθες. (travel)","answer":"ταξίδεψες","choices":["ταξίδεψες","ταξίδεψε","ταξιδέψαμε","ταξιδέψατε"],"en":"you travel (past)","hint":"simple past · you"},{"text":"Εσύ {b} χθες. (help)","answer":"βοήθησες","choices":["βοήθησες","βοήθησε","βοηθήσαμε","βοηθήσατε"],"en":"you help (past)","hint":"simple past · you"},{"text":"Εσύ {b} χθες. (walk)","answer":"περπάτησες","choices":["περπάτησες","περπάτησε","περπατήσαμε","περπατήσατε"],"en":"you walk (past)","hint":"simple past · you"},{"text":"Εσύ {b} χθες. (smile)","answer":"χαμογέλασες","choices":["χαμογέλασες","χαμογέλασε","χαμογελάσαμε","χαμογελάσατε"],"en":"you smile (past)","hint":"simple past · you"},{"text":"Εσύ {b} χθες. (sleep)","answer":"κοιμήθηκες","choices":["κοιμήθηκες","κοιμήθηκε","κοιμηθήκαμε","κοιμηθήκατε"],"en":"you sleep (past)","hint":"simple past · you"}],"a2-future-simple":[{"text":"Εγώ {b} αύριο. (play)","answer":"θα παίξω","choices":["θα παίξω","θα παίξεις","θα παίξει","θα παίξουμε"],"en":"I play (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (drive)","answer":"θα οδηγήσω","choices":["θα οδηγήσω","θα οδηγήσεις","θα οδηγήσει","θα οδηγήσουμε"],"en":"I drive (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (phone)","answer":"θα τηλεφωνήσω","choices":["θα τηλεφωνήσω","θα τηλεφωνήσεις","θα τηλεφωνήσει","θα τηλεφωνήσουμε"],"en":"I phone (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (work)","answer":"θα δουλέψω","choices":["θα δουλέψω","θα δουλέψεις","θα δουλέψει","θα δουλέψουμε"],"en":"I work (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (travel)","answer":"θα ταξιδέψω","choices":["θα ταξιδέψω","θα ταξιδέψεις","θα ταξιδέψει","θα ταξιδέψουμε"],"en":"I travel (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (help)","answer":"θα βοηθήσω","choices":["θα βοηθήσω","θα βοηθήσεις","θα βοηθήσει","θα βοηθήσουμε"],"en":"I help (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (walk)","answer":"θα περπατήσω","choices":["θα περπατήσω","θα περπατήσεις","θα περπατήσει","θα περπατήσουμε"],"en":"I walk (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (smile)","answer":"θα χαμογελάσω","choices":["θα χαμογελάσω","θα χαμογελάσεις","θα χαμογελάσει","θα χαμογελάσουμε"],"en":"I smile (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (sleep)","answer":"θα κοιμηθώ","choices":["θα κοιμηθώ","θα κοιμηθείς","θα κοιμηθεί","θα κοιμηθούμε"],"en":"I sleep (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (relax)","answer":"θα χαλαρώσω","choices":["θα χαλαρώσω","θα χαλαρώσεις","θα χαλαρώσει","θα χαλαρώσουμε"],"en":"I relax (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (read)","answer":"θα διαβάσω","choices":["θα διαβάσω","θα διαβάσεις","θα διαβάσει","θα διαβάσουμε"],"en":"I read (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (run)","answer":"θα τρέξω","choices":["θα τρέξω","θα τρέξεις","θα τρέξει","θα τρέξουμε"],"en":"I run (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (cry)","answer":"θα κλάψω","choices":["θα κλάψω","θα κλάψεις","θα κλάψει","θα κλάψουμε"],"en":"I cry (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (return)","answer":"θα επιστρέψω","choices":["θα επιστρέψω","θα επιστρέψεις","θα επιστρέψει","θα επιστρέψουμε"],"en":"I return (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (arrive)","answer":"θα φτάσω","choices":["θα φτάσω","θα φτάσεις","θα φτάσει","θα φτάσουμε"],"en":"I arrive (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (stop)","answer":"θα σταματήσω","choices":["θα σταματήσω","θα σταματήσεις","θα σταματήσει","θα σταματήσουμε"],"en":"I stop (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (cook)","answer":"θα μαγειρέψω","choices":["θα μαγειρέψω","θα μαγειρέψεις","θα μαγειρέψει","θα μαγειρέψουμε"],"en":"I cook (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (try)","answer":"θα προσπαθήσω","choices":["θα προσπαθήσω","θα προσπαθήσεις","θα προσπαθήσει","θα προσπαθήσουμε"],"en":"I try (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (answer)","answer":"θα απαντήσω","choices":["θα απαντήσω","θα απαντήσεις","θα απαντήσει","θα απαντήσουμε"],"en":"I answer (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (speak)","answer":"θα μιλήσω","choices":["θα μιλήσω","θα μιλήσεις","θα μιλήσει","θα μιλήσουμε"],"en":"I speak (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (see)","answer":"θα δω","choices":["θα δω","θα δεις","θα δει","θα δούμε"],"en":"I see (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (ask)","answer":"θα ρωτήσω","choices":["θα ρωτήσω","θα ρωτήσεις","θα ρωτήσει","θα ρωτήσουμε"],"en":"I ask (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (continue)","answer":"θα συνεχίσω","choices":["θα συνεχίσω","θα συνεχίσεις","θα συνεχίσει","θα συνεχίσουμε"],"en":"I continue (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (go)","answer":"θα πάω","choices":["θα πάω","θα πας","θα πάει","θα πάμε"],"en":"I go (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (come)","answer":"θα έρθω","choices":["θα έρθω","θα έρθεις","θα έρθει","θα έρθουμε"],"en":"I come (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (eat)","answer":"θα φάω","choices":["θα φάω","θα φας","θα φάει","θα φάμε"],"en":"I eat (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (drink)","answer":"θα πιω","choices":["θα πιω","θα πιεις","θα πιει","θα πιούμε"],"en":"I drink (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (go out)","answer":"θα βγω","choices":["θα βγω","θα βγεις","θα βγει","θα βγούμε"],"en":"I go out (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (stay)","answer":"θα μείνω","choices":["θα μείνω","θα μείνεις","θα μείνει","θα μείνουμε"],"en":"I stay (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (leave)","answer":"θα φύγω","choices":["θα φύγω","θα φύγεις","θα φύγει","θα φύγουμε"],"en":"I leave (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (learn)","answer":"θα μάθω","choices":["θα μάθω","θα μάθεις","θα μάθει","θα μάθουμε"],"en":"I learn (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (know)","answer":"θα ξέρω","choices":["θα ξέρω","θα ξέρεις","θα ξέρει","θα ξέρουμε"],"en":"I know (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (can)","answer":"θα μπορέσω","choices":["θα μπορέσω","θα μπορέσεις","θα μπορέσει","θα μπορέσουμε"],"en":"I can (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (understand)","answer":"θα καταλάβω","choices":["θα καταλάβω","θα καταλάβεις","θα καταλάβει","θα καταλάβουμε"],"en":"I understand (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (remember)","answer":"θα θυμηθώ","choices":["θα θυμηθώ","θα θυμηθείς","θα θυμηθεί","θα θυμηθούμε"],"en":"I remember (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (think)","answer":"θα σκεφτώ","choices":["θα σκεφτώ","θα σκεφτείς","θα σκεφτεί","θα σκεφτούμε"],"en":"I think (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (rest)","answer":"θα ξεκουραστώ","choices":["θα ξεκουραστώ","θα ξεκουραστείς","θα ξεκουραστεί","θα ξεκουραστούμε"],"en":"I rest (future)","hint":"simple future · I"},{"text":"Εγώ {b} αύριο. (wait)","answer":"θα περιμένω","choices":["θα περιμένω","θα περιμένεις","θα περιμένει","θα περιμένουμε"],"en":"I wait (future)","hint":"simple future · I"},{"text":"Εσύ {b} αύριο. (play)","answer":"θα παίξεις","choices":["θα παίξεις","θα παίξει","θα παίξουμε","θα παίξετε"],"en":"you play (future)","hint":"simple future · you"},{"text":"Εσύ {b} αύριο. (drive)","answer":"θα οδηγήσεις","choices":["θα οδηγήσεις","θα οδηγήσει","θα οδηγήσουμε","θα οδηγήσετε"],"en":"you drive (future)","hint":"simple future · you"}],"a2-future-continuous":[{"text":"Εγώ {b} συνεχώς. (play)","answer":"θα παίζω","choices":["θα παίζω","θα παίζεις","θα παίζει","θα παίζουμε"],"en":"I play (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (drive)","answer":"θα οδηγώ","choices":["θα οδηγώ","θα οδηγείς","θα οδηγεί","θα οδηγούμε"],"en":"I drive (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (phone)","answer":"θα τηλεφωνώ","choices":["θα τηλεφωνώ","θα τηλεφωνείς","θα τηλεφωνεί","θα τηλεφωνούμε"],"en":"I phone (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (work)","answer":"θα δουλεύω","choices":["θα δουλεύω","θα δουλεύεις","θα δουλεύει","θα δουλεύουμε"],"en":"I work (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (travel)","answer":"θα ταξιδεύω","choices":["θα ταξιδεύω","θα ταξιδεύεις","θα ταξιδεύει","θα ταξιδεύουμε"],"en":"I travel (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (help)","answer":"θα βοηθάω","choices":["θα βοηθάω","θα βοηθάς","θα βοηθάει","θα βοηθάμε"],"en":"I help (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (walk)","answer":"θα περπατάω","choices":["θα περπατάω","θα περπατάς","θα περπατάει","θα περπατάμε"],"en":"I walk (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (smile)","answer":"θα χαμογελάω","choices":["θα χαμογελάω","θα χαμογελάς","θα χαμογελάει","θα χαμογελάμε"],"en":"I smile (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (sleep)","answer":"θα κοιμάμαι","choices":["θα κοιμάμαι","θα κοιμάσαι","θα κοιμάται","θα κοιμόμαστε"],"en":"I sleep (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (be afraid)","answer":"θα φοβάμαι","choices":["θα φοβάμαι","θα φοβάσαι","θα φοβάται","θα φοβόμαστε"],"en":"I will be afraid (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (relax)","answer":"θα χαλαρώνω","choices":["θα χαλαρώνω","θα χαλαρώνεις","θα χαλαρώνει","θα χαλαρώνουμε"],"en":"I relax (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (read)","answer":"θα διαβάζω","choices":["θα διαβάζω","θα διαβάζεις","θα διαβάζει","θα διαβάζουμε"],"en":"I read (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (run)","answer":"θα τρέχω","choices":["θα τρέχω","θα τρέχεις","θα τρέχει","θα τρέχουμε"],"en":"I run (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (cry)","answer":"θα κλαίω","choices":["θα κλαίω","θα κλαις","θα κλαίει","θα κλαίμε"],"en":"I cry (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (be at fault)","answer":"θα φταίω","choices":["θα φταίω","θα φταις","θα φταίει","θα φταίμε"],"en":"I will be at fault (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (try)","answer":"θα προσπαθώ","choices":["θα προσπαθώ","θα προσπαθείς","θα προσπαθεί","θα προσπαθούμε"],"en":"I try (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (ask)","answer":"θα ρωτάω","choices":["θα ρωτάω","θα ρωτάς","θα ρωτάει","θα ρωτάμε"],"en":"I ask (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (answer)","answer":"θα απαντάω","choices":["θα απαντάω","θα απαντάς","θα απαντάει","θα απαντάμε"],"en":"I answer (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (speak)","answer":"θα μιλάω","choices":["θα μιλάω","θα μιλάς","θα μιλάει","θα μιλάμε"],"en":"I speak (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (worry)","answer":"θα ανησυχώ","choices":["θα ανησυχώ","θα ανησυχείς","θα ανησυχεί","θα ανησυχούμε"],"en":"I worry (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (come)","answer":"θα έρχομαι","choices":["θα έρχομαι","θα έρχεσαι","θα έρχεται","θα ερχόμαστε"],"en":"I come (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (eat)","answer":"θα τρώω","choices":["θα τρώω","θα τρως","θα τρώει","θα τρώμε"],"en":"I eat (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (drink)","answer":"θα πίνω","choices":["θα πίνω","θα πίνεις","θα πίνει","θα πίνουμε"],"en":"I drink (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (go out)","answer":"θα βγαίνω","choices":["θα βγαίνω","θα βγαίνεις","θα βγαίνει","θα βγαίνουμε"],"en":"I go out (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (leave)","answer":"θα φεύγω","choices":["θα φεύγω","θα φεύγεις","θα φεύγει","θα φεύγουμε"],"en":"I leave (fut. cont.)","hint":"future continuous · I"},{"text":"Εγώ {b} συνεχώς. (learn)","answer":"θα μαθαίνω","choices":["θα μαθαίνω","θα μαθαίνεις","θα μαθαίνει","θα μαθαίνουμε"],"en":"I learn (fut. cont.)","hint":"future continuous · I"}],"b1-past-continuous":[{"text":"Εγώ {b} παλιά. (play)","answer":"έπαιζα","choices":["έπαιζα","έπαιζες","έπαιζε","παίζαμε"],"en":"I play (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (drive)","answer":"οδηγούσα","choices":["οδηγούσα","οδηγούσες","οδηγούσε","οδηγούσαμε"],"en":"I drive (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (phone)","answer":"τηλεφωνούσα","choices":["τηλεφωνούσα","τηλεφωνούσες","τηλεφωνούσε","τηλεφωνούσαμε"],"en":"I phone (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (travel)","answer":"ταξίδευα","choices":["ταξίδευα","ταξίδευες","ταξίδευε","ταξιδεύαμε"],"en":"I travel (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (work)","answer":"δούλευα","choices":["δούλευα","δούλευες","δούλευε","δουλεύαμε"],"en":"I work (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (help)","answer":"βοηθούσα","choices":["βοηθούσα","βοηθούσες","βοηθούσε","βοηθούσαμε"],"en":"I help (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (walk)","answer":"περπατούσα","choices":["περπατούσα","περπατούσες","περπατούσε","περπατούσαμε"],"en":"I walk (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (smile)","answer":"χαμογελούσα","choices":["χαμογελούσα","χαμογελούσες","χαμογελούσε","χαμογελούσαμε"],"en":"I smile (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (worry)","answer":"ανησυχούσα","choices":["ανησυχούσα","ανησυχούσες","ανησυχούσε","ανησυχούσαμε"],"en":"I worry (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (be afraid)","answer":"φοβόμουν","choices":["φοβόμουν","φοβόσουν","φοβόταν","φοβόμασταν"],"en":"I was afraid (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (read)","answer":"διάβαζα","choices":["διάβαζα","διάβαζες","διάβαζε","διαβάζαμε"],"en":"I read (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (run)","answer":"έτρεχα","choices":["έτρεχα","έτρεχες","έτρεχε","τρέχαμε"],"en":"I run (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (cry)","answer":"έκλαιγα","choices":["έκλαιγα","έκλαιγες","έκλαιγε","κλαίγαμε"],"en":"I cry (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (be at fault)","answer":"έφταιγα","choices":["έφταιγα","έφταιγες","έφταιγε","φταίγαμε"],"en":"I was at fault (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (cook)","answer":"μαγείρευα","choices":["μαγείρευα","μαγείρευες","μαγείρευε","μαγειρεύαμε"],"en":"I cook (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (go)","answer":"πήγαινα","choices":["πήγαινα","πήγαινες","πήγαινε","πηγαίναμε"],"en":"I go (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (come)","answer":"ερχόμουν","choices":["ερχόμουν","ερχόσουν","ερχόταν","ερχόμασταν"],"en":"I come (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (eat)","answer":"έτρωγα","choices":["έτρωγα","έτρωγες","έτρωγε","τρώγαμε"],"en":"I eat (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (drink)","answer":"έπινα","choices":["έπινα","έπινες","έπινε","πίναμε"],"en":"I drink (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (go out)","answer":"έβγαινα","choices":["έβγαινα","έβγαινες","έβγαινε","βγαίναμε"],"en":"I go out (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (leave)","answer":"έφευγα","choices":["έφευγα","έφευγες","έφευγε","φεύγαμε"],"en":"I leave (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (learn)","answer":"μάθαινα","choices":["μάθαινα","μάθαινες","μάθαινε","μαθαίναμε"],"en":"I learn (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (know)","answer":"ήξερα","choices":["ήξερα","ήξερες","ήξερε","ξέραμε"],"en":"I know (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (can)","answer":"μπορούσα","choices":["μπορούσα","μπορούσες","μπορούσε","μπορούσαμε"],"en":"I can (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (want)","answer":"ήθελα","choices":["ήθελα","ήθελες","ήθελε","θέλαμε"],"en":"I want (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (remember)","answer":"θυμόμουν","choices":["θυμόμουν","θυμόσουν","θυμόταν","θυμόμασταν"],"en":"I remember (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (think)","answer":"σκεφτόμουν","choices":["σκεφτόμουν","σκεφτόσουν","σκεφτόταν","σκεφτόμασταν"],"en":"I think (past cont.)","hint":"past continuous · I"},{"text":"Εγώ {b} παλιά. (rest)","answer":"ξεκουραζόμουν","choices":["ξεκουραζόμουν","ξεκουραζόσουν","ξεκουραζόταν","ξεκουραζόμασταν"],"en":"I rest (past cont.)","hint":"past continuous · I"},{"text":"Εσύ {b} παλιά. (play)","answer":"έπαιζες","choices":["έπαιζες","έπαιζε","παίζαμε","παίζατε"],"en":"you play (past cont.)","hint":"past continuous · you"},{"text":"Εσύ {b} παλιά. (drive)","answer":"οδηγούσες","choices":["οδηγούσες","οδηγούσε","οδηγούσαμε","οδηγούσατε"],"en":"you drive (past cont.)","hint":"past continuous · you"}],"b1-subjunctive":[{"text":"Εγώ πρέπει να {b} τώρα. (play)","answer":"παίξω","choices":["παίξω","παίξεις","παίξει","παίξουμε"],"en":"I play (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (drive)","answer":"οδηγήσω","choices":["οδηγήσω","οδηγήσεις","οδηγήσει","οδηγήσουμε"],"en":"I drive (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (phone)","answer":"τηλεφωνήσω","choices":["τηλεφωνήσω","τηλεφωνήσεις","τηλεφωνήσει","τηλεφωνήσουμε"],"en":"I phone (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (work)","answer":"δουλέψω","choices":["δουλέψω","δουλέψεις","δουλέψει","δουλέψουμε"],"en":"I work (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (speak)","answer":"μιλήσω","choices":["μιλήσω","μιλήσεις","μιλήσει","μιλήσουμε"],"en":"I speak (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (help)","answer":"βοηθήσω","choices":["βοηθήσω","βοηθήσεις","βοηθήσει","βοηθήσουμε"],"en":"I help (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (walk)","answer":"περπατήσω","choices":["περπατήσω","περπατήσεις","περπατήσει","περπατήσουμε"],"en":"I walk (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (smile)","answer":"χαμογελάσω","choices":["χαμογελάσω","χαμογελάσεις","χαμογελάσει","χαμογελάσουμε"],"en":"I smile (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (sleep)","answer":"κοιμηθώ","choices":["κοιμηθώ","κοιμηθείς","κοιμηθεί","κοιμηθούμε"],"en":"I sleep (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (relax)","answer":"χαλαρώσω","choices":["χαλαρώσω","χαλαρώσεις","χαλαρώσει","χαλαρώσουμε"],"en":"I relax (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (read)","answer":"διαβάσω","choices":["διαβάσω","διαβάσεις","διαβάσει","διαβάσουμε"],"en":"I read (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (run)","answer":"τρέξω","choices":["τρέξω","τρέξεις","τρέξει","τρέξουμε"],"en":"I run (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (return)","answer":"επιστρέψω","choices":["επιστρέψω","επιστρέψεις","επιστρέψει","επιστρέψουμε"],"en":"I return (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (stop)","answer":"σταματήσω","choices":["σταματήσω","σταματήσεις","σταματήσει","σταματήσουμε"],"en":"I stop (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (cook)","answer":"μαγειρέψω","choices":["μαγειρέψω","μαγειρέψεις","μαγειρέψει","μαγειρέψουμε"],"en":"I cook (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (ask)","answer":"ρωτήσω","choices":["ρωτήσω","ρωτήσεις","ρωτήσει","ρωτήσουμε"],"en":"I ask (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (answer)","answer":"απαντήσω","choices":["απαντήσω","απαντήσεις","απαντήσει","απαντήσουμε"],"en":"I answer (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (try)","answer":"προσπαθήσω","choices":["προσπαθήσω","προσπαθήσεις","προσπαθήσει","προσπαθήσουμε"],"en":"I try (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (continue)","answer":"συνεχίσω","choices":["συνεχίσω","συνεχίσεις","συνεχίσει","συνεχίσουμε"],"en":"I continue (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (go)","answer":"πάω","choices":["πάω","πας","πάει","πάμε"],"en":"I go (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (come)","answer":"έρθω","choices":["έρθω","έρθεις","έρθει","έρθουμε"],"en":"I come (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (eat)","answer":"φάω","choices":["φάω","φας","φάει","φάμε"],"en":"I eat (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (drink)","answer":"πιω","choices":["πιω","πιεις","πιει","πιούμε"],"en":"I drink (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (enter)","answer":"μπω","choices":["μπω","μπεις","μπει","μπούμε"],"en":"I enter (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (go out)","answer":"βγω","choices":["βγω","βγεις","βγει","βγούμε"],"en":"I go out (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (stay)","answer":"μείνω","choices":["μείνω","μείνεις","μείνει","μείνουμε"],"en":"I stay (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (leave)","answer":"φύγω","choices":["φύγω","φύγεις","φύγει","φύγουμε"],"en":"I leave (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (learn)","answer":"μάθω","choices":["μάθω","μάθεις","μάθει","μάθουμε"],"en":"I learn (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (know)","answer":"ξέρω","choices":["ξέρω","ξέρεις","ξέρει","ξέρουμε"],"en":"I know (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (understand)","answer":"καταλάβω","choices":["καταλάβω","καταλάβεις","καταλάβει","καταλάβουμε"],"en":"I understand (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (remember)","answer":"θυμηθώ","choices":["θυμηθώ","θυμηθείς","θυμηθεί","θυμηθούμε"],"en":"I remember (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (think)","answer":"σκεφτώ","choices":["σκεφτώ","σκεφτείς","σκεφτεί","σκεφτούμε"],"en":"I think (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (rest)","answer":"ξεκουραστώ","choices":["ξεκουραστώ","ξεκουραστείς","ξεκουραστεί","ξεκουραστούμε"],"en":"I rest (subj.)","hint":"subjunctive · I"},{"text":"Εγώ πρέπει να {b} τώρα. (wait)","answer":"περιμένω","choices":["περιμένω","περιμένεις","περιμένει","περιμένουμε"],"en":"I wait (subj.)","hint":"subjunctive · I"},{"text":"Εσύ πρέπει να {b} τώρα. (play)","answer":"παίξεις","choices":["παίξεις","παίξει","παίξουμε","παίξετε"],"en":"you play (subj.)","hint":"subjunctive · you"},{"text":"Εσύ πρέπει να {b} τώρα. (drive)","answer":"οδηγήσεις","choices":["οδηγήσεις","οδηγήσει","οδηγήσουμε","οδηγήσετε"],"en":"you drive (subj.)","hint":"subjunctive · you"}],"a1-present-b2":[{"text":"Εγώ {b} κάθε μέρα. (drive)","answer":"οδηγώ","choices":["οδηγώ","οδηγείς","οδηγεί","οδηγούμε"],"en":"I drive (present)","hint":"present · I"},{"text":"Εγώ {b} κάθε μέρα. (phone)","answer":"τηλεφωνώ","choices":["τηλεφωνώ","τηλεφωνείς","τηλεφωνεί","τηλεφωνούμε"],"en":"I phone (present)","hint":"present · I"},{"text":"Εγώ {b} κάθε μέρα. (try)","answer":"προσπαθώ","choices":["προσπαθώ","προσπαθείς","προσπαθεί","προσπαθούμε"],"en":"I try (present)","hint":"present · I"},{"text":"Εγώ {b} κάθε μέρα. (worry)","answer":"ανησυχώ","choices":["ανησυχώ","ανησυχείς","ανησυχεί","ανησυχούμε"],"en":"I worry (present)","hint":"present · I"},{"text":"Εσύ {b} κάθε μέρα. (drive)","answer":"οδηγείς","choices":["οδηγείς","οδηγεί","οδηγούμε","οδηγείτε"],"en":"you drive (present)","hint":"present · you"},{"text":"Εσύ {b} κάθε μέρα. (phone)","answer":"τηλεφωνείς","choices":["τηλεφωνείς","τηλεφωνεί","τηλεφωνούμε","τηλεφωνείτε"],"en":"you phone (present)","hint":"present · you"},{"text":"Εσύ {b} κάθε μέρα. (try)","answer":"προσπαθείς","choices":["προσπαθείς","προσπαθεί","προσπαθούμε","προσπαθείτε"],"en":"you try (present)","hint":"present · you"},{"text":"Εσύ {b} κάθε μέρα. (worry)","answer":"ανησυχείς","choices":["ανησυχείς","ανησυχεί","ανησυχούμε","ανησυχείτε"],"en":"you worry (present)","hint":"present · you"},{"text":"Αυτός {b} κάθε μέρα. (drive)","answer":"οδηγεί","choices":["οδηγεί","οδηγούμε","οδηγείτε","οδηγούν"],"en":"he drives (present)","hint":"present · he"},{"text":"Αυτός {b} κάθε μέρα. (phone)","answer":"τηλεφωνεί","choices":["τηλεφωνεί","τηλεφωνούμε","τηλεφωνείτε","τηλεφωνούν"],"en":"he phones (present)","hint":"present · he"},{"text":"Αυτός {b} κάθε μέρα. (try)","answer":"προσπαθεί","choices":["προσπαθεί","προσπαθούμε","προσπαθείτε","προσπαθούν"],"en":"he tries (present)","hint":"present · he"},{"text":"Αυτός {b} κάθε μέρα. (worry)","answer":"ανησυχεί","choices":["ανησυχεί","ανησυχούμε","ανησυχείτε","ανησυχούν"],"en":"he worries (present)","hint":"present · he"},{"text":"Εμείς {b} κάθε μέρα. (drive)","answer":"οδηγούμε","choices":["οδηγούμε","οδηγείτε","οδηγούν","οδηγώ"],"en":"we drive (present)","hint":"present · we"},{"text":"Εμείς {b} κάθε μέρα. (phone)","answer":"τηλεφωνούμε","choices":["τηλεφωνούμε","τηλεφωνείτε","τηλεφωνούν","τηλεφωνώ"],"en":"we phone (present)","hint":"present · we"},{"text":"Εμείς {b} κάθε μέρα. (try)","answer":"προσπαθούμε","choices":["προσπαθούμε","προσπαθείτε","προσπαθούν","προσπαθώ"],"en":"we try (present)","hint":"present · we"},{"text":"Εμείς {b} κάθε μέρα. (worry)","answer":"ανησυχούμε","choices":["ανησυχούμε","ανησυχείτε","ανησυχούν","ανησυχώ"],"en":"we worry (present)","hint":"present · we"},{"text":"Εσείς {b} κάθε μέρα. (drive)","answer":"οδηγείτε","choices":["οδηγείτε","οδηγούν","οδηγώ","οδηγείς"],"en":"you (pl) drive (present)","hint":"present · you (pl)"},{"text":"Εσείς {b} κάθε μέρα. (phone)","answer":"τηλεφωνείτε","choices":["τηλεφωνείτε","τηλεφωνούν","τηλεφωνώ","τηλεφωνείς"],"en":"you (pl) phone (present)","hint":"present · you (pl)"},{"text":"Εσείς {b} κάθε μέρα. (try)","answer":"προσπαθείτε","choices":["προσπαθείτε","προσπαθούν","προσπαθώ","προσπαθείς"],"en":"you (pl) try (present)","hint":"present · you (pl)"},{"text":"Εσείς {b} κάθε μέρα. (worry)","answer":"ανησυχείτε","choices":["ανησυχείτε","ανησυχούν","ανησυχώ","ανησυχείς"],"en":"you (pl) worry (present)","hint":"present · you (pl)"},{"text":"Αυτοί {b} κάθε μέρα. (drive)","answer":"οδηγούν","choices":["οδηγούν","οδηγώ","οδηγείς","οδηγεί"],"en":"they drive (present)","hint":"present · they"},{"text":"Αυτοί {b} κάθε μέρα. (phone)","answer":"τηλεφωνούν","choices":["τηλεφωνούν","τηλεφωνώ","τηλεφωνείς","τηλεφωνεί"],"en":"they phone (present)","hint":"present · they"},{"text":"Αυτοί {b} κάθε μέρα. (try)","answer":"προσπαθούν","choices":["προσπαθούν","προσπαθώ","προσπαθείς","προσπαθεί"],"en":"they try (present)","hint":"present · they"},{"text":"Αυτοί {b} κάθε μέρα. (worry)","answer":"ανησυχούν","choices":["ανησυχούν","ανησυχώ","ανησυχείς","ανησυχεί"],"en":"they worry (present)","hint":"present · they"}],"a1-present-b1":[{"text":"Εγώ {b} κάθε μέρα. (help)","answer":"βοηθάω","choices":["βοηθάω","βοηθάς","βοηθάει","βοηθάμε"],"en":"I help (present)","hint":"present · I"},{"text":"Εγώ {b} κάθε μέρα. (walk)","answer":"περπατάω","choices":["περπατάω","περπατάς","περπατάει","περπατάμε"],"en":"I walk (present)","hint":"present · I"},{"text":"Εγώ {b} κάθε μέρα. (smile)","answer":"χαμογελάω","choices":["χαμογελάω","χαμογελάς","χαμογελάει","χαμογελάμε"],"en":"I smile (present)","hint":"present · I"},{"text":"Εσύ {b} κάθε μέρα. (help)","answer":"βοηθάς","choices":["βοηθάς","βοηθάει","βοηθάμε","βοηθάτε"],"en":"you help (present)","hint":"present · you"},{"text":"Εσύ {b} κάθε μέρα. (walk)","answer":"περπατάς","choices":["περπατάς","περπατάει","περπατάμε","περπατάτε"],"en":"you walk (present)","hint":"present · you"},{"text":"Εσύ {b} κάθε μέρα. (smile)","answer":"χαμογελάς","choices":["χαμογελάς","χαμογελάει","χαμογελάμε","χαμογελάτε"],"en":"you smile (present)","hint":"present · you"},{"text":"Αυτός {b} κάθε μέρα. (help)","answer":"βοηθάει","choices":["βοηθάει","βοηθάμε","βοηθάτε","βοηθάνε"],"en":"he helps (present)","hint":"present · he"},{"text":"Αυτός {b} κάθε μέρα. (walk)","answer":"περπατάει","choices":["περπατάει","περπατάμε","περπατάτε","περπατάνε"],"en":"he walks (present)","hint":"present · he"},{"text":"Αυτός {b} κάθε μέρα. (smile)","answer":"χαμογελάει","choices":["χαμογελάει","χαμογελάμε","χαμογελάτε","χαμογελάνε"],"en":"he smiles (present)","hint":"present · he"},{"text":"Εμείς {b} κάθε μέρα. (help)","answer":"βοηθάμε","choices":["βοηθάμε","βοηθάτε","βοηθάνε","βοηθάω"],"en":"we help (present)","hint":"present · we"},{"text":"Εμείς {b} κάθε μέρα. (walk)","answer":"περπατάμε","choices":["περπατάμε","περπατάτε","περπατάνε","περπατάω"],"en":"we walk (present)","hint":"present · we"},{"text":"Εμείς {b} κάθε μέρα. (smile)","answer":"χαμογελάμε","choices":["χαμογελάμε","χαμογελάτε","χαμογελάνε","χαμογελάω"],"en":"we smile (present)","hint":"present · we"},{"text":"Εσείς {b} κάθε μέρα. (help)","answer":"βοηθάτε","choices":["βοηθάτε","βοηθάνε","βοηθάω","βοηθάς"],"en":"you (pl) help (present)","hint":"present · you (pl)"},{"text":"Εσείς {b} κάθε μέρα. (walk)","answer":"περπατάτε","choices":["περπατάτε","περπατάνε","περπατάω","περπατάς"],"en":"you (pl) walk (present)","hint":"present · you (pl)"},{"text":"Εσείς {b} κάθε μέρα. (smile)","answer":"χαμογελάτε","choices":["χαμογελάτε","χαμογελάνε","χαμογελάω","χαμογελάς"],"en":"you (pl) smile (present)","hint":"present · you (pl)"},{"text":"Αυτοί {b} κάθε μέρα. (help)","answer":"βοηθάνε","choices":["βοηθάνε","βοηθάω","βοηθάς","βοηθάει"],"en":"they help (present)","hint":"present · they"},{"text":"Αυτοί {b} κάθε μέρα. (walk)","answer":"περπατάνε","choices":["περπατάνε","περπατάω","περπατάς","περπατάει"],"en":"they walk (present)","hint":"present · they"},{"text":"Αυτοί {b} κάθε μέρα. (smile)","answer":"χαμογελάνε","choices":["χαμογελάνε","χαμογελάω","χαμογελάς","χαμογελάει"],"en":"they smile (present)","hint":"present · they"}],"b2-mediopassive":[{"text":"Εγώ {b} κάθε μέρα. (sleep)","answer":"κοιμάμαι","choices":["κοιμάμαι","κοιμάσαι","κοιμάται","κοιμόμαστε"],"en":"I sleep (present)","hint":"present (mediopassive) · I"},{"text":"Εγώ {b} κάθε μέρα. (be afraid)","answer":"φοβάμαι","choices":["φοβάμαι","φοβάσαι","φοβάται","φοβόμαστε"],"en":"I am afraid (present)","hint":"present (mediopassive) · I"},{"text":"Εγώ {b} κάθε μέρα. (come)","answer":"έρχομαι","choices":["έρχομαι","έρχεσαι","έρχεται","ερχόμαστε"],"en":"I come (present)","hint":"present (mediopassive) · I"},{"text":"Εγώ {b} κάθε μέρα. (think)","answer":"σκέφτομαι","choices":["σκέφτομαι","σκέφτεσαι","σκέφτεται","σκεφτόμαστε"],"en":"I think (present)","hint":"present (mediopassive) · I"},{"text":"Εγώ {b} κάθε μέρα. (rest)","answer":"ξεκουράζομαι","choices":["ξεκουράζομαι","ξεκουράζεσαι","ξεκουράζεται","ξεκουραζόμαστε"],"en":"I rest (present)","hint":"present (mediopassive) · I"},{"text":"Εσύ {b} κάθε μέρα. (sleep)","answer":"κοιμάσαι","choices":["κοιμάσαι","κοιμάται","κοιμόμαστε","κοιμάστε"],"en":"you sleep (present)","hint":"present (mediopassive) · you"},{"text":"Εσύ {b} κάθε μέρα. (be afraid)","answer":"φοβάσαι","choices":["φοβάσαι","φοβάται","φοβόμαστε","φοβάστε"],"en":"you are afraid (present)","hint":"present (mediopassive) · you"},{"text":"Εσύ {b} κάθε μέρα. (come)","answer":"έρχεσαι","choices":["έρχεσαι","έρχεται","ερχόμαστε","έρχεστε"],"en":"you come (present)","hint":"present (mediopassive) · you"},{"text":"Εσύ {b} κάθε μέρα. (think)","answer":"σκέφτεσαι","choices":["σκέφτεσαι","σκέφτεται","σκεφτόμαστε","σκέφτεστε"],"en":"you think (present)","hint":"present (mediopassive) · you"},{"text":"Εσύ {b} κάθε μέρα. (rest)","answer":"ξεκουράζεσαι","choices":["ξεκουράζεσαι","ξεκουράζεται","ξεκουραζόμαστε","ξεκουράζεστε"],"en":"you rest (present)","hint":"present (mediopassive) · you"},{"text":"Αυτός {b} κάθε μέρα. (sleep)","answer":"κοιμάται","choices":["κοιμάται","κοιμόμαστε","κοιμάστε","κοιμούνται"],"en":"he sleeps (present)","hint":"present (mediopassive) · he"},{"text":"Αυτός {b} κάθε μέρα. (be afraid)","answer":"φοβάται","choices":["φοβάται","φοβόμαστε","φοβάστε","φοβούνται"],"en":"he is afraid (present)","hint":"present (mediopassive) · he"},{"text":"Αυτός {b} κάθε μέρα. (come)","answer":"έρχεται","choices":["έρχεται","ερχόμαστε","έρχεστε","έρχονται"],"en":"he comes (present)","hint":"present (mediopassive) · he"},{"text":"Αυτός {b} κάθε μέρα. (think)","answer":"σκέφτεται","choices":["σκέφτεται","σκεφτόμαστε","σκέφτεστε","σκέφτονται"],"en":"he thinks (present)","hint":"present (mediopassive) · he"},{"text":"Αυτός {b} κάθε μέρα. (rest)","answer":"ξεκουράζεται","choices":["ξεκουράζεται","ξεκουραζόμαστε","ξεκουράζεστε","ξεκουράζονται"],"en":"he rests (present)","hint":"present (mediopassive) · he"},{"text":"Εμείς {b} κάθε μέρα. (sleep)","answer":"κοιμόμαστε","choices":["κοιμόμαστε","κοιμάστε","κοιμούνται","κοιμάμαι"],"en":"we sleep (present)","hint":"present (mediopassive) · we"},{"text":"Εμείς {b} κάθε μέρα. (be afraid)","answer":"φοβόμαστε","choices":["φοβόμαστε","φοβάστε","φοβούνται","φοβάμαι"],"en":"we are afraid (present)","hint":"present (mediopassive) · we"},{"text":"Εμείς {b} κάθε μέρα. (come)","answer":"ερχόμαστε","choices":["ερχόμαστε","έρχεστε","έρχονται","έρχομαι"],"en":"we come (present)","hint":"present (mediopassive) · we"},{"text":"Εμείς {b} κάθε μέρα. (think)","answer":"σκεφτόμαστε","choices":["σκεφτόμαστε","σκέφτεστε","σκέφτονται","σκέφτομαι"],"en":"we think (present)","hint":"present (mediopassive) · we"},{"text":"Εμείς {b} κάθε μέρα. (rest)","answer":"ξεκουραζόμαστε","choices":["ξεκουραζόμαστε","ξεκουράζεστε","ξεκουράζονται","ξεκουράζομαι"],"en":"we rest (present)","hint":"present (mediopassive) · we"},{"text":"Εσείς {b} κάθε μέρα. (sleep)","answer":"κοιμάστε","choices":["κοιμάστε","κοιμούνται","κοιμάμαι","κοιμάσαι"],"en":"you (pl) sleep (present)","hint":"present (mediopassive) · you (pl)"},{"text":"Εσείς {b} κάθε μέρα. (be afraid)","answer":"φοβάστε","choices":["φοβάστε","φοβούνται","φοβάμαι","φοβάσαι"],"en":"you (pl) are afraid (present)","hint":"present (mediopassive) · you (pl)"},{"text":"Εσείς {b} κάθε μέρα. (come)","answer":"έρχεστε","choices":["έρχεστε","έρχονται","έρχομαι","έρχεσαι"],"en":"you (pl) come (present)","hint":"present (mediopassive) · you (pl)"},{"text":"Εσείς {b} κάθε μέρα. (think)","answer":"σκέφτεστε","choices":["σκέφτεστε","σκέφτονται","σκέφτομαι","σκέφτεσαι"],"en":"you (pl) think (present)","hint":"present (mediopassive) · you (pl)"},{"text":"Εσείς {b} κάθε μέρα. (rest)","answer":"ξεκουράζεστε","choices":["ξεκουράζεστε","ξεκουράζονται","ξεκουράζομαι","ξεκουράζεσαι"],"en":"you (pl) rest (present)","hint":"present (mediopassive) · you (pl)"},{"text":"Αυτοί {b} κάθε μέρα. (sleep)","answer":"κοιμούνται","choices":["κοιμούνται","κοιμάμαι","κοιμάσαι","κοιμάται"],"en":"they sleep (present)","hint":"present (mediopassive) · they"},{"text":"Αυτοί {b} κάθε μέρα. (be afraid)","answer":"φοβούνται","choices":["φοβούνται","φοβάμαι","φοβάσαι","φοβάται"],"en":"they are afraid (present)","hint":"present (mediopassive) · they"},{"text":"Αυτοί {b} κάθε μέρα. (come)","answer":"έρχονται","choices":["έρχονται","έρχομαι","έρχεσαι","έρχεται"],"en":"they come (present)","hint":"present (mediopassive) · they"},{"text":"Αυτοί {b} κάθε μέρα. (think)","answer":"σκέφτονται","choices":["σκέφτονται","σκέφτομαι","σκέφτεσαι","σκέφτεται"],"en":"they think (present)","hint":"present (mediopassive) · they"},{"text":"Αυτοί {b} κάθε μέρα. (rest)","answer":"ξεκουράζονται","choices":["ξεκουράζονται","ξεκουράζομαι","ξεκουράζεσαι","ξεκουράζεται"],"en":"they rest (present)","hint":"present (mediopassive) · they"}]};
  (window.GRAMMAR||[]).forEach(function(p){ if(GEN[p.id]) p.items=p.items.concat(GEN[p.id]); });
})();


/* Extra practice items for the object-pronoun cluster (direct, indirect, double). */
(function () {
  var MORE_PRONOUNS = {
    'a1-weak-object': [
      { text: 'Η Ελένη και η Άννα; Δεν {b} ξέρω. (them, fem.)', answer: 'τις', choices: ['τις', 'τους', 'τα', 'της'], en: 'Eleni and Anna? I don’t know them.', hint: 'feminine plural = τις' },
      { text: 'Αγόρασα καινούρια μπλούζα, αλλά δεν {b} έχω φορέσει ακόμα. (it, fem.)', answer: 'την', choices: ['την', 'τη', 'το', 'της'], en: 'I bought a new top, but I haven’t worn it yet.', hint: 'την keeps its ν before a vowel (έχω)' },
      { text: 'Ο σκύλος κλαίει όταν {b} αφήνουμε μόνο του στο σπίτι. (him)', answer: 'τον', choices: ['τον', 'του', 'το', 'μας'], en: 'The dog cries when we leave him home alone.' }
    ],
    'a2-indirect-object': [
      { text: '{b} αγόρασα λουλούδια για τη γιορτή της. (for her)', answer: 'Της', choices: ['Της', 'Την', 'Τη', 'Του'], en: 'I bought her flowers for her name day.', hint: 'buy FOR someone → genitive' },
      { text: 'Ο καθηγητής {b} εξήγησε τον κανόνα ξανά. (to us)', answer: 'μας', choices: ['μας', 'σας', 'τους', 'εμάς'], en: 'The teacher explained the rule to us again.' },
      { text: '{b} χρωστάω είκοσι ευρώ. (to you)', answer: 'Σου', choices: ['Σου', 'Σε', 'Σας', 'Μου'], en: 'I owe you twenty euros.', hint: 'χρωστάω + genitive' }
    ],
    'b1-double-clitics': [
      { text: 'Θα {b} στείλω μόλις το βρω. (to you + it)', answer: 'σου το', choices: ['σου το', 'το σου', 'σε το', 'σου τα'], en: 'I’ll send it to you as soon as I find it.' },
      { text: 'Η φωτογραφία; {b} έδειξα ήδη. (to them + it)', answer: 'Τους την', choices: ['Τους την', 'Την τους', 'Τους τη', 'Της την'], en: 'The photo? I already showed it to them.' },
      { text: 'Αυτό το τραγούδι — {b} βάζεις ξανά; (for me + it)', answer: 'μου το', choices: ['μου το', 'το μου', 'με το', 'μου τη'], en: 'That song — will you put it on again for me?' }
    ]
  };
  (window.GRAMMAR || []).forEach(function (p) {
    if (MORE_PRONOUNS[p.id]) p.items = p.items.concat(MORE_PRONOUNS[p.id]);
  });
})();
