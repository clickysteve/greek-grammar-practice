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
  { key: 'B1', label: 'B1 — Intermediate' }
];

window.GRAMMAR = [
  /* ===================== A1 ===================== */
  {
    id: 'a1-pronouns-subject',
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
  }
];
