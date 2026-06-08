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
  { key: 'B2', label: 'B2 — Upper intermediate' }
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

/* ===== Expansion from standard A1–B2 coursebooks (place, numbers, indirect object,
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
