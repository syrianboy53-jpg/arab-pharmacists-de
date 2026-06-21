export interface ConjugationTense {
  ich: string;
  du: string;
  'er/sie/es': string;
  wir: string;
  ihr: string;
  sie: string;
}

export interface VerbData {
  id: string;
  infinitive: string;
  meaningAr: string;
  type: 'hilfsverb' | 'modalverb' | 'regelmäßig' | 'unregelmäßig' | 'trennbar';
  perfektHilfsverb: 'haben' | 'sein';
  partizip2: string;
  praesens: ConjugationTense;
  praeteritum: ConjugationTense;
  example: string;
}

export const verbsData: VerbData[] = [
  // Hilfsverben
  {
    id: 'sein',
    infinitive: 'sein',
    meaningAr: 'يكون',
    type: 'hilfsverb',
    perfektHilfsverb: 'sein',
    partizip2: 'gewesen',
    praesens: { ich: 'bin', du: 'bist', 'er/sie/es': 'ist', wir: 'sind', ihr: 'seid', sie: 'sind' },
    praeteritum: { ich: 'war', du: 'warst', 'er/sie/es': 'war', wir: 'waren', ihr: 'wart', sie: 'waren' },
    example: 'Ich bin gestern zu Hause gewesen.'
  },
  {
    id: 'haben',
    infinitive: 'haben',
    meaningAr: 'يملك',
    type: 'hilfsverb',
    perfektHilfsverb: 'haben',
    partizip2: 'gehabt',
    praesens: { ich: 'habe', du: 'hast', 'er/sie/es': 'hat', wir: 'haben', ihr: 'habt', sie: 'haben' },
    praeteritum: { ich: 'hatte', du: 'hattest', 'er/sie/es': 'hatte', wir: 'hatten', ihr: 'hattet', sie: 'hatten' },
    example: 'Wir haben ein neues Auto gekauft.'
  },
  {
    id: 'werden',
    infinitive: 'werden',
    meaningAr: 'يصبح / سوف',
    type: 'hilfsverb',
    perfektHilfsverb: 'sein',
    partizip2: 'geworden',
    praesens: { ich: 'werde', du: 'wirst', 'er/sie/es': 'wird', wir: 'werden', ihr: 'werdet', sie: 'werden' },
    praeteritum: { ich: 'wurde', du: 'wurdest', 'er/sie/es': 'wurde', wir: 'wurden', ihr: 'wurdet', sie: 'wurden' },
    example: 'Es wird bald dunkel.'
  },
  // Modalverben
  {
    id: 'können',
    infinitive: 'können',
    meaningAr: 'يستطيع',
    type: 'modalverb',
    perfektHilfsverb: 'haben',
    partizip2: 'gekonnt',
    praesens: { ich: 'kann', du: 'kannst', 'er/sie/es': 'kann', wir: 'können', ihr: 'könnt', sie: 'können' },
    praeteritum: { ich: 'konnte', du: 'konntest', 'er/sie/es': 'konnte', wir: 'konnten', ihr: 'konntet', sie: 'konnten' },
    example: 'Ich kann sehr gut schwimmen.'
  },
  {
    id: 'müssen',
    infinitive: 'müssen',
    meaningAr: 'يجب',
    type: 'modalverb',
    perfektHilfsverb: 'haben',
    partizip2: 'gemusst',
    praesens: { ich: 'muss', du: 'musst', 'er/sie/es': 'muss', wir: 'müssen', ihr: 'müsst', sie: 'müssen' },
    praeteritum: { ich: 'musste', du: 'musstest', 'er/sie/es': 'musste', wir: 'mussten', ihr: 'musstet', sie: 'mussten' },
    example: 'Wir müssen heute viel lernen.'
  },
  {
    id: 'wollen',
    infinitive: 'wollen',
    meaningAr: 'يريد',
    type: 'modalverb',
    perfektHilfsverb: 'haben',
    partizip2: 'gewollt',
    praesens: { ich: 'will', du: 'willst', 'er/sie/es': 'will', wir: 'wollen', ihr: 'wollt', sie: 'wollen' },
    praeteritum: { ich: 'wollte', du: 'wolltest', 'er/sie/es': 'wollte', wir: 'wollten', ihr: 'wolltet', sie: 'wollten' },
    example: 'Er will am Wochenende nach Berlin fahren.'
  },
  {
    id: 'dürfen',
    infinitive: 'dürfen',
    meaningAr: 'يُسمح له',
    type: 'modalverb',
    perfektHilfsverb: 'haben',
    partizip2: 'gedurft',
    praesens: { ich: 'darf', du: 'darfst', 'er/sie/es': 'darf', wir: 'dürfen', ihr: 'dürft', sie: 'dürfen' },
    praeteritum: { ich: 'durfte', du: 'durftest', 'er/sie/es': 'durfte', wir: 'durften', ihr: 'durftet', sie: 'durften' },
    example: 'Hier darf man nicht rauchen.'
  },
  // Unregelmäßige Verben
  {
    id: 'gehen',
    infinitive: 'gehen',
    meaningAr: 'يذهب',
    type: 'unregelmäßig',
    perfektHilfsverb: 'sein',
    partizip2: 'gegangen',
    praesens: { ich: 'gehe', du: 'gehst', 'er/sie/es': 'geht', wir: 'gehen', ihr: 'geht', sie: 'gehen' },
    praeteritum: { ich: 'ging', du: 'gingst', 'er/sie/es': 'ging', wir: 'gingen', ihr: 'gingt', sie: 'gingen' },
    example: 'Sie ist gestern in die Stadt gegangen.'
  },
  {
    id: 'sprechen',
    infinitive: 'sprechen',
    meaningAr: 'يتحدث',
    type: 'unregelmäßig',
    perfektHilfsverb: 'haben',
    partizip2: 'gesprochen',
    praesens: { ich: 'spreche', du: 'sprichst', 'er/sie/es': 'spricht', wir: 'sprechen', ihr: 'sprecht', sie: 'sprechen' },
    praeteritum: { ich: 'sprach', du: 'sprachst', 'er/sie/es': 'sprach', wir: 'sprachen', ihr: 'spracht', sie: 'sprachen' },
    example: 'Er spricht drei Sprachen.'
  },
  {
    id: 'lesen',
    infinitive: 'lesen',
    meaningAr: 'يقرأ',
    type: 'unregelmäßig',
    perfektHilfsverb: 'haben',
    partizip2: 'gelesen',
    praesens: { ich: 'lese', du: 'liest', 'er/sie/es': 'liest', wir: 'lesen', ihr: 'lest', sie: 'lesen' },
    praeteritum: { ich: 'las', du: 'lasest', 'er/sie/es': 'las', wir: 'lasen', ihr: 'last', sie: 'lasen' },
    example: 'Ich habe das Buch schon gelesen.'
  },
  {
    id: 'sehen',
    infinitive: 'sehen',
    meaningAr: 'يرى',
    type: 'unregelmäßig',
    perfektHilfsverb: 'haben',
    partizip2: 'gesehen',
    praesens: { ich: 'sehe', du: 'siehst', 'er/sie/es': 'sieht', wir: 'sehen', ihr: 'seht', sie: 'sehen' },
    praeteritum: { ich: 'sah', du: 'sahst', 'er/sie/es': 'sah', wir: 'sahen', ihr: 'saht', sie: 'sahen' },
    example: 'Hast du den neuen Film gesehen?'
  },
  {
    id: 'essen',
    infinitive: 'essen',
    meaningAr: 'يأكل',
    type: 'unregelmäßig',
    perfektHilfsverb: 'haben',
    partizip2: 'gegessen',
    praesens: { ich: 'esse', du: 'isst', 'er/sie/es': 'isst', wir: 'essen', ihr: 'esst', sie: 'essen' },
    praeteritum: { ich: 'aß', du: 'aßest', 'er/sie/es': 'aß', wir: 'aßen', ihr: 'aßt', sie: 'aßen' },
    example: 'Wir haben Pizza gegessen.'
  },
  {
    id: 'fahren',
    infinitive: 'fahren',
    meaningAr: 'يسافر / يقود',
    type: 'unregelmäßig',
    perfektHilfsverb: 'sein',
    partizip2: 'gefahren',
    praesens: { ich: 'fahre', du: 'fährst', 'er/sie/es': 'fährt', wir: 'fahren', ihr: 'fahrt', sie: 'fahren' },
    praeteritum: { ich: 'fuhr', du: 'fuhrst', 'er/sie/es': 'fuhr', wir: 'fuhren', ihr: 'fuhrt', sie: 'fuhren' },
    example: 'Ich bin mit dem Zug nach München gefahren.'
  },
  // Regelmäßige Verben
  {
    id: 'machen',
    infinitive: 'machen',
    meaningAr: 'يفعل / يصنع',
    type: 'regelmäßig',
    perfektHilfsverb: 'haben',
    partizip2: 'gemacht',
    praesens: { ich: 'mache', du: 'machst', 'er/sie/es': 'macht', wir: 'machen', ihr: 'macht', sie: 'machen' },
    praeteritum: { ich: 'machte', du: 'machtest', 'er/sie/es': 'machte', wir: 'machten', ihr: 'machtet', sie: 'machten' },
    example: 'Was hast du am Wochenende gemacht?'
  },
  {
    id: 'lernen',
    infinitive: 'lernen',
    meaningAr: 'يتعلم',
    type: 'regelmäßig',
    perfektHilfsverb: 'haben',
    partizip2: 'gelernt',
    praesens: { ich: 'lerne', du: 'lernst', 'er/sie/es': 'lernt', wir: 'lernen', ihr: 'lernt', sie: 'lernen' },
    praeteritum: { ich: 'lernte', du: 'lerntest', 'er/sie/es': 'lernte', wir: 'lernten', ihr: 'lerntet', sie: 'lernten' },
    example: 'Sie lernt seit zwei Jahren Deutsch.'
  },
  {
    id: 'arbeiten',
    infinitive: 'arbeiten',
    meaningAr: 'يعمل',
    type: 'regelmäßig',
    perfektHilfsverb: 'haben',
    partizip2: 'gearbeitet',
    praesens: { ich: 'arbeite', du: 'arbeitest', 'er/sie/es': 'arbeitet', wir: 'arbeiten', ihr: 'arbeitet', sie: 'arbeiten' },
    praeteritum: { ich: 'arbeitete', du: 'arbeitetest', 'er/sie/es': 'arbeitete', wir: 'arbeiteten', ihr: 'arbeitetet', sie: 'arbeiteten' },
    example: 'Er hat gestern lange gearbeitet.'
  },
  {
    id: 'kaufen',
    infinitive: 'kaufen',
    meaningAr: 'يشتري',
    type: 'regelmäßig',
    perfektHilfsverb: 'haben',
    partizip2: 'gekauft',
    praesens: { ich: 'kaufe', du: 'kaufst', 'er/sie/es': 'kauft', wir: 'kaufen', ihr: 'kauft', sie: 'kaufen' },
    praeteritum: { ich: 'kaufte', du: 'kauftest', 'er/sie/es': 'kaufte', wir: 'kauften', ihr: 'kauftet', sie: 'kauften' },
    example: 'Ich habe mir ein neues Hemd gekauft.'
  },
  {
    id: 'fragen',
    infinitive: 'fragen',
    meaningAr: 'يسأل',
    type: 'regelmäßig',
    perfektHilfsverb: 'haben',
    partizip2: 'gefragt',
    praesens: { ich: 'frage', du: 'fragst', 'er/sie/es': 'fragt', wir: 'fragen', ihr: 'fragt', sie: 'fragen' },
    praeteritum: { ich: 'fragte', du: 'fragtest', 'er/sie/es': 'fragte', wir: 'fragten', ihr: 'fragtet', sie: 'fragten' },
    example: 'Darf ich Sie etwas fragen?'
  },
  // Trennbare Verben
  {
    id: 'aufstehen',
    infinitive: 'aufstehen',
    meaningAr: 'يستيقظ',
    type: 'trennbar',
    perfektHilfsverb: 'sein',
    partizip2: 'aufgestanden',
    praesens: { ich: 'stehe auf', du: 'stehst auf', 'er/sie/es': 'steht auf', wir: 'stehen auf', ihr: 'steht auf', sie: 'stehen auf' },
    praeteritum: { ich: 'stand auf', du: 'standst auf', 'er/sie/es': 'stand auf', wir: 'standen auf', ihr: 'standet auf', sie: 'standen auf' },
    example: 'Ich stehe jeden Tag um 7 Uhr auf.'
  },
  {
    id: 'fernsehen',
    infinitive: 'fernsehen',
    meaningAr: 'يشاهد التلفاز',
    type: 'trennbar',
    perfektHilfsverb: 'haben',
    partizip2: 'ferngesehen',
    praesens: { ich: 'sehe fern', du: 'siehst fern', 'er/sie/es': 'sieht fern', wir: 'sehen fern', ihr: 'seht fern', sie: 'sehen fern' },
    praeteritum: { ich: 'sah fern', du: 'sahst fern', 'er/sie/es': 'sah fern', wir: 'sahen fern', ihr: 'saht fern', sie: 'sahen fern' },
    example: 'Abends sehe ich oft fern.'
  },
  {
    id: 'anrufen',
    infinitive: 'anrufen',
    meaningAr: 'يتصل بـ',
    type: 'trennbar',
    perfektHilfsverb: 'haben',
    partizip2: 'angerufen',
    praesens: { ich: 'rufe an', du: 'rufst an', 'er/sie/es': 'ruft an', wir: 'rufen an', ihr: 'ruft an', sie: 'rufen an' },
    praeteritum: { ich: 'rief an', du: 'riefst an', 'er/sie/es': 'rief an', wir: 'riefen an', ihr: 'rieft an', sie: 'riefen an' },
    example: 'Ich rufe dich morgen an.'
  },
  {
    id: 'mitbringen',
    infinitive: 'mitbringen',
    meaningAr: 'يحضر معه',
    type: 'trennbar',
    perfektHilfsverb: 'haben',
    partizip2: 'mitgebracht',
    praesens: { ich: 'bringe mit', du: 'bringst mit', 'er/sie/es': 'bringt mit', wir: 'bringen mit', ihr: 'bringt mit', sie: 'bringen mit' },
    praeteritum: { ich: 'brachte mit', du: 'brachtest mit', 'er/sie/es': 'brachte mit', wir: 'brachten mit', ihr: 'brachtet mit', sie: 'brachten mit' },
    example: 'Soll ich etwas zur Party mitbringen?'
  },
  {
    id: 'einkaufen',
    infinitive: 'einkaufen',
    meaningAr: 'يتسوق',
    type: 'trennbar',
    perfektHilfsverb: 'haben',
    partizip2: 'eingekauft',
    praesens: { ich: 'kaufe ein', du: 'kaufst ein', 'er/sie/es': 'kauft ein', wir: 'kaufen ein', ihr: 'kauft ein', sie: 'kaufen ein' },
    praeteritum: { ich: 'kaufte ein', du: 'kauftest ein', 'er/sie/es': 'kaufte ein', wir: 'kauften ein', ihr: 'kauftet ein', sie: 'kauften ein' },
    example: 'Wir haben gestern im Supermarkt eingekauft.'
  }
];
