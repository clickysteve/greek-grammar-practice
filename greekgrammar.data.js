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
  },

  /* ===================== A2 ===================== */
  {
    id: 'a2-accusative',
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
