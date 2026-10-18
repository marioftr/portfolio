// Datos del titular del sitio. Si NIF queda vacío, la línea no se muestra.
export const OWNER = {
  name: 'Mario Villanueva Torres',
  email: 'contacto@mvillanuevatorres.com',
  city: 'Madrid',
  web: 'mvillanuevatorres.com',
  nif: '',
};

export const LEGAL_SLUGS = { privacy: 'privacidad', legal: 'aviso-legal' };

export const LEGAL_LABELS = {
  privacy: { es: 'Política de privacidad', en: 'Privacy policy', ca: 'Política de privadesa', gl: 'Política de privacidade' },
  legal: { es: 'Aviso legal', en: 'Legal notice', ca: 'Avís legal', gl: 'Aviso legal' },
};

const UPDATED = { es: 'Última actualización: octubre de 2026', en: 'Last updated: October 2026', ca: 'Darrera actualització: octubre de 2026', gl: 'Última actualización: outubro de 2026' };

const { name, email, city, web } = OWNER;

// Cada sección: { title, body: [ 'párrafo' | { list: [...] } ] }
const privacy = {
  es: {
    title: 'Política de privacidad',
    intro: 'La presente política describe el tratamiento de los datos personales facilitados a través de este sitio web, de conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).',
    sections: [
      { title: '1. Responsable del tratamiento', body: [`El responsable del tratamiento es ${name}, con sede profesional en ${city}. Correo electrónico de contacto: ${email}.`] },
      { title: '2. Datos tratados y finalidad', body: [
        'Únicamente son objeto de tratamiento los datos remitidos de forma voluntaria a través del formulario de contacto o por correo electrónico: nombre, dirección de correo electrónico, asunto (opcional) y mensaje.',
        'Dichos datos se emplean con la exclusiva finalidad de atender la consulta o propuesta profesional recibida y de mantener la comunicación derivada de la misma. Serán conservados mientras dure dicha comunicación y, con posterioridad, durante los plazos legalmente exigibles.',
      ] },
      { title: '3. Base jurídica', body: ['El tratamiento se fundamenta en el consentimiento del interesado, otorgado al enviar el formulario o remitir un correo electrónico (art. 6.1.a RGPD). Dicho consentimiento podrá ser retirado en cualquier momento.'] },
      { title: '4. Destinatarios y proveedores', body: [
        'Los datos no serán cedidos a terceros, salvo obligación legal. La prestación del servicio requiere la intervención de proveedores tecnológicos que actúan como encargados del tratamiento:',
        { list: [
          'Web3Forms: recepción de los mensajes del formulario y reenvío al correo electrónico del titular.',
          'Gmail e ImprovMX: servicios de correo electrónico y reenvío, para la entrega y el almacenamiento de los mensajes.',
          'Vercel Inc.: alojamiento del sitio web y estadísticas agregadas de visitas (Vercel Web Analytics y Speed Insights), sin utilización de cookies ni identificación personal del visitante.',
        ] },
        'Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo, siempre con las garantías previstas en el RGPD (decisiones de adecuación o cláusulas contractuales tipo).',
      ] },
      { title: '5. Cookies y almacenamiento local', body: [
        'Este sitio web no utiliza cookies de seguimiento ni publicitarias. En el navegador se almacenan, con carácter estrictamente técnico y sin transmisión a ningún servidor, la preferencia de idioma, el tema claro u oscuro y la vista seleccionada en el portfolio durante la sesión.',
        'Los vídeos incrustados (YouTube, Vimeo) y las tipografías de Google Fonts son servidos por dichos terceros, que pueden recibir la dirección IP del usuario y, en el caso de los reproductores, instalar cookies propias durante la reproducción. Su tratamiento se rige por las políticas de privacidad de cada proveedor.',
      ] },
      { title: '6. Derechos de los interesados', body: [
        `El interesado puede ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad mediante comunicación escrita a ${email}, indicando el derecho ejercitado. Con el fin de verificar su identidad, podrá solicitarse copia de un documento identificativo.`,
        'Si se considera que el tratamiento no se ajusta a la normativa, podrá presentarse una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).',
      ] },
    ],
  },
  en: {
    title: 'Privacy policy',
    intro: 'This policy describes the processing of personal data provided through this website, in accordance with Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 on Personal Data Protection and the guarantee of digital rights (LOPDGDD).',
    sections: [
      { title: '1. Data controller', body: [`The data controller is ${name}, professionally based in ${city}, Spain. Contact email: ${email}.`] },
      { title: '2. Data processed and purpose', body: [
        'Only the data voluntarily submitted through the contact form or by email is processed: name, email address, subject (optional) and message.',
        'Such data is used solely to handle the enquiry or professional proposal received and to maintain the resulting communication. It is retained for as long as that communication lasts and, thereafter, for the periods required by law.',
      ] },
      { title: '3. Legal basis', body: ['Processing is based on the consent of the data subject, given by submitting the form or sending an email (Art. 6.1.a GDPR). Such consent may be withdrawn at any time.'] },
      { title: '4. Recipients and providers', body: [
        'Data is not disclosed to third parties, except where legally required. Delivering the service involves technology providers acting as data processors:',
        { list: [
          'Web3Forms: receipt of form messages and forwarding to the owner\'s email address.',
          'Gmail and ImprovMX: email and forwarding services, for the delivery and storage of messages.',
          'Vercel Inc.: website hosting and aggregated visit statistics (Vercel Web Analytics and Speed Insights), without the use of cookies or personal identification of the visitor.',
        ] },
        'Some of these providers may process data outside the European Economic Area, always with the safeguards provided by the GDPR (adequacy decisions or standard contractual clauses).',
      ] },
      { title: '5. Cookies and local storage', body: [
        'This website does not use tracking or advertising cookies. The language preference, the light or dark theme and the portfolio view selected during the session are stored in the browser for strictly technical purposes, without transmission to any server.',
        'Embedded videos (YouTube, Vimeo) and Google Fonts typefaces are served by those third parties, which may receive the user\'s IP address and, in the case of the players, set their own cookies during playback. Their processing is governed by each provider\'s privacy policy.',
      ] },
      { title: '6. Rights of data subjects', body: [
        `Data subjects may exercise their rights of access, rectification, erasure, objection, restriction of processing and portability by written notice to ${email}, stating the right exercised. To verify identity, a copy of an identity document may be requested.`,
        'Where the processing is considered not to comply with the regulations, a complaint may be lodged with the Spanish Data Protection Agency (www.aepd.es).',
      ] },
    ],
  },
  ca: {
    title: 'Política de privadesa',
    intro: 'La present política descriu el tractament de les dades personals facilitades a través d\'aquest lloc web, de conformitat amb el Reglament (UE) 2016/679 (RGPD) i la Llei Orgànica 3/2018, de Protecció de Dades Personals i garantia dels drets digitals (LOPDGDD).',
    sections: [
      { title: '1. Responsable del tractament', body: [`El responsable del tractament és ${name}, amb seu professional a ${city}. Correu electrònic de contacte: ${email}.`] },
      { title: '2. Dades tractades i finalitat', body: [
        'Només són objecte de tractament les dades remeses de manera voluntària a través del formulari de contacte o per correu electrònic: nom, adreça de correu electrònic, assumpte (opcional) i missatge.',
        'Aquestes dades s\'empren amb l\'exclusiva finalitat d\'atendre la consulta o proposta professional rebuda i de mantenir la comunicació derivada. Seran conservades mentre duri aquesta comunicació i, amb posterioritat, durant els terminis legalment exigibles.',
      ] },
      { title: '3. Base jurídica', body: ['El tractament es fonamenta en el consentiment de l\'interessat, atorgat en enviar el formulari o remetre un correu electrònic (art. 6.1.a RGPD). Aquest consentiment podrà ser retirat en qualsevol moment.'] },
      { title: '4. Destinataris i proveïdors', body: [
        'Les dades no seran cedides a tercers, tret d\'obligació legal. La prestació del servei requereix la intervenció de proveïdors tecnològics que actuen com a encarregats del tractament:',
        { list: [
          'Web3Forms: recepció dels missatges del formulari i reenviament al correu electrònic del titular.',
          'Gmail i ImprovMX: serveis de correu electrònic i reenviament, per al lliurament i l\'emmagatzematge dels missatges.',
          'Vercel Inc.: allotjament del lloc web i estadístiques agregades de visites (Vercel Web Analytics i Speed Insights), sense utilització de galetes ni identificació personal del visitant.',
        ] },
        'Alguns d\'aquests proveïdors poden tractar dades fora de l\'Espai Econòmic Europeu, sempre amb les garanties previstes en el RGPD (decisions d\'adequació o clàusules contractuals tipus).',
      ] },
      { title: '5. Galetes i emmagatzematge local', body: [
        'Aquest lloc web no utilitza galetes de seguiment ni publicitàries. Al navegador s\'emmagatzemen, amb caràcter estrictament tècnic i sense transmissió a cap servidor, la preferència d\'idioma, el tema clar o fosc i la vista seleccionada al portfolio durant la sessió.',
        'Els vídeos incrustats (YouTube, Vimeo) i les tipografies de Google Fonts són servits per aquests tercers, que poden rebre l\'adreça IP de l\'usuari i, en el cas dels reproductors, instal·lar galetes pròpies durant la reproducció. El seu tractament es regeix per les polítiques de privadesa de cada proveïdor.',
      ] },
      { title: '6. Drets dels interessats', body: [
        `L'interessat pot exercir els drets d'accés, rectificació, supressió, oposició, limitació del tractament i portabilitat mitjançant comunicació escrita a ${email}, indicant el dret exercit. Per tal de verificar-ne la identitat, es podrà sol·licitar còpia d'un document identificatiu.`,
        'Si es considera que el tractament no s\'ajusta a la normativa, es podrà presentar una reclamació davant l\'Agència Espanyola de Protecció de Dades (www.aepd.es).',
      ] },
    ],
  },
  gl: {
    title: 'Política de privacidade',
    intro: 'A presente política describe o tratamento dos datos persoais facilitados a través deste sitio web, de conformidade co Regulamento (UE) 2016/679 (RXPD) e a Lei Orgánica 3/2018, de Protección de Datos Persoais e garantía dos dereitos dixitais (LOPDGDD).',
    sections: [
      { title: '1. Responsable do tratamento', body: [`O responsable do tratamento é ${name}, con sede profesional en ${city}. Correo electrónico de contacto: ${email}.`] },
      { title: '2. Datos tratados e finalidade', body: [
        'Unicamente son obxecto de tratamento os datos remitidos de forma voluntaria a través do formulario de contacto ou por correo electrónico: nome, enderezo de correo electrónico, asunto (opcional) e mensaxe.',
        'Os devanditos datos empréganse coa exclusiva finalidade de atender a consulta ou proposta profesional recibida e de manter a comunicación derivada da mesma. Serán conservados mentres dure esa comunicación e, con posterioridade, durante os prazos legalmente esixibles.',
      ] },
      { title: '3. Base xurídica', body: ['O tratamento fundaméntase no consentimento do interesado, outorgado ao enviar o formulario ou remitir un correo electrónico (art. 6.1.a RXPD). O devandito consentimento poderá ser retirado en calquera momento.'] },
      { title: '4. Destinatarios e provedores', body: [
        'Os datos non serán cedidos a terceiros, salvo obrigación legal. A prestación do servizo require a intervención de provedores tecnolóxicos que actúan como encargados do tratamento:',
        { list: [
          'Web3Forms: recepción das mensaxes do formulario e reenvío ao correo electrónico do titular.',
          'Gmail e ImprovMX: servizos de correo electrónico e reenvío, para a entrega e o almacenamento das mensaxes.',
          'Vercel Inc.: aloxamento do sitio web e estatísticas agregadas de visitas (Vercel Web Analytics e Speed Insights), sen utilización de cookies nin identificación persoal do visitante.',
        ] },
        'Algúns destes provedores poden tratar datos fóra do Espazo Económico Europeo, sempre coas garantías previstas no RXPD (decisións de adecuación ou cláusulas contractuais tipo).',
      ] },
      { title: '5. Cookies e almacenamento local', body: [
        'Este sitio web non utiliza cookies de seguimento nin publicitarias. No navegador almacénanse, con carácter estritamente técnico e sen transmisión a ningún servidor, a preferencia de idioma, o tema claro ou escuro e a vista seleccionada no portfolio durante a sesión.',
        'Os vídeos incrustados (YouTube, Vimeo) e as tipografías de Google Fonts son servidos por eses terceiros, que poden recibir o enderezo IP do usuario e, no caso dos reprodutores, instalar cookies propias durante a reprodución. O seu tratamento réxese polas políticas de privacidade de cada provedor.',
      ] },
      { title: '6. Dereitos dos interesados', body: [
        `O interesado pode exercer os dereitos de acceso, rectificación, supresión, oposición, limitación do tratamento e portabilidade mediante comunicación escrita a ${email}, indicando o dereito exercitado. Co fin de verificar a súa identidade, poderase solicitar copia dun documento identificativo.`,
        'Se se considera que o tratamento non se axusta á normativa, poderase presentar unha reclamación ante a Axencia Española de Protección de Datos (www.aepd.es).',
      ] },
    ],
  },
};

const legal = {
  es: {
    title: 'Aviso legal',
    intro: 'En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan los datos identificativos del titular de este sitio web.',
    sections: [
      { title: '1. Datos identificativos', body: [{ list: [`Titular: ${name}`, '{NIF}', `Ubicación profesional: ${city}, España`, `Correo electrónico: ${email}`, `Sitio web: ${web}`] }] },
      { title: '2. Propiedad intelectual', body: [
        'Los contenidos de este sitio (textos, imágenes, modelos 3D, vídeos, diseño y código) están protegidos por la normativa española e internacional sobre propiedad intelectual e industrial.',
        'Las obras propias mostradas en el portfolio pertenecen a su autor. Su reproducción, distribución o transformación requiere autorización previa y por escrito.',
        'Algunos proyectos se realizaron en equipo, en contextos académicos o para terceros. El material, marcas o personajes ajenos que aparecen pertenecen a sus respectivos titulares y se muestran con fines de portfolio y atribución de autoría.',
      ] },
      { title: '3. Condiciones de uso', body: [
        'El acceso al sitio es libre y gratuito. El usuario se compromete a hacer un uso lícito del mismo y de sus contenidos, sin dañar el sitio ni perjudicar a terceros.',
        'Queda prohibida la extracción masiva de contenidos y su uso para entrenar sistemas de inteligencia artificial sin autorización expresa.',
      ] },
      { title: '4. Exclusión de responsabilidad', body: [
        'Se procura que la información sea exacta y esté actualizada, pero no se garantiza la ausencia de errores ni la disponibilidad ininterrumpida del sitio.',
        'No se responde de los contenidos de sitios de terceros enlazados o incrustados (YouTube, Vimeo, ArtStation, GitHub u otros), que se rigen por sus propias condiciones.',
      ] },
      { title: '5. Legislación aplicable', body: ['Este aviso se rige por la legislación española. Para cualquier controversia serán competentes los juzgados y tribunales que correspondan conforme a la normativa vigente.'] },
    ],
  },
  en: {
    title: 'Legal notice',
    intro: 'In compliance with Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), the identification details of this website\'s owner are provided below.',
    sections: [
      { title: '1. Identification details', body: [{ list: [`Owner: ${name}`, '{NIF}', `Professional location: ${city}, Spain`, `Email: ${email}`, `Website: ${web}`] }] },
      { title: '2. Intellectual property', body: [
        'The contents of this site (texts, images, 3D models, videos, design and code) are protected by Spanish and international intellectual and industrial property law.',
        'The original works shown in the portfolio belong to their author. Reproducing, distributing or transforming them requires prior written permission.',
        'Some projects were made as part of a team, in academic settings or for third parties. Third-party material, brands or characters shown belong to their respective owners and appear for portfolio and authorship-credit purposes.',
      ] },
      { title: '3. Terms of use', body: [
        'Access to the site is free. Users agree to use the site and its contents lawfully, without harming the site or third parties.',
        'Bulk extraction of content and its use to train artificial intelligence systems without express permission is prohibited.',
      ] },
      { title: '4. Limitation of liability', body: [
        'Every effort is made to keep the information accurate and up to date, but the absence of errors and uninterrupted availability of the site are not guaranteed.',
        'No responsibility is accepted for the content of linked or embedded third-party sites (YouTube, Vimeo, ArtStation, GitHub or others), which are governed by their own terms.',
      ] },
      { title: '5. Governing law', body: ['This notice is governed by Spanish law. Any dispute shall be heard by the courts and tribunals that are competent under the applicable regulations.'] },
    ],
  },
  ca: {
    title: 'Avís legal',
    intro: 'En compliment de la Llei 34/2002 de Serveis de la Societat de la Informació i de Comerç Electrònic (LSSI-CE), es faciliten les dades identificatives del titular d\'aquest lloc web.',
    sections: [
      { title: '1. Dades identificatives', body: [{ list: [`Titular: ${name}`, '{NIF}', `Ubicació professional: ${city}, Espanya`, `Correu electrònic: ${email}`, `Lloc web: ${web}`] }] },
      { title: '2. Propietat intel·lectual', body: [
        'Els continguts d\'aquest lloc (textos, imatges, models 3D, vídeos, disseny i codi) estan protegits per la normativa espanyola i internacional sobre propietat intel·lectual i industrial.',
        'Les obres pròpies mostrades al portfolio pertanyen al seu autor. La seva reproducció, distribució o transformació requereix autorització prèvia i per escrit.',
        'Alguns projectes es van realitzar en equip, en contextos acadèmics o per a tercers. El material, marques o personatges aliens que apareixen pertanyen als seus respectius titulars i es mostren amb finalitats de portfolio i atribució d\'autoria.',
      ] },
      { title: '3. Condicions d\'ús', body: [
        'L\'accés al lloc és lliure i gratuït. L\'usuari es compromet a fer-ne un ús lícit i dels seus continguts, sense danyar el lloc ni perjudicar tercers.',
        'Queda prohibida l\'extracció massiva de continguts i el seu ús per entrenar sistemes d\'intel·ligència artificial sense autorització expressa.',
      ] },
      { title: '4. Exclusió de responsabilitat', body: [
        'Es procura que la informació sigui exacta i estigui actualitzada, però no es garanteix l\'absència d\'errors ni la disponibilitat ininterrompuda del lloc.',
        'No es respon dels continguts de llocs de tercers enllaçats o incrustats (YouTube, Vimeo, ArtStation, GitHub o altres), que es regeixen per les seves pròpies condicions.',
      ] },
      { title: '5. Legislació aplicable', body: ['Aquest avís es regeix per la legislació espanyola. Per a qualsevol controvèrsia seran competents els jutjats i tribunals que corresponguin d\'acord amb la normativa vigent.'] },
    ],
  },
  gl: {
    title: 'Aviso legal',
    intro: 'En cumprimento da Lei 34/2002 de Servizos da Sociedade da Información e de Comercio Electrónico (LSSI-CE), facilítanse os datos identificativos do titular deste sitio web.',
    sections: [
      { title: '1. Datos identificativos', body: [{ list: [`Titular: ${name}`, '{NIF}', `Ubicación profesional: ${city}, España`, `Correo electrónico: ${email}`, `Sitio web: ${web}`] }] },
      { title: '2. Propiedade intelectual', body: [
        'Os contidos deste sitio (textos, imaxes, modelos 3D, vídeos, deseño e código) están protexidos pola normativa española e internacional sobre propiedade intelectual e industrial.',
        'As obras propias mostradas no portfolio pertencen ao seu autor. A súa reprodución, distribución ou transformación require autorización previa e por escrito.',
        'Algúns proxectos realizáronse en equipo, en contextos académicos ou para terceiros. O material, marcas ou personaxes alleos que aparecen pertencen aos seus respectivos titulares e amósanse con fins de portfolio e atribución de autoría.',
      ] },
      { title: '3. Condicións de uso', body: [
        'O acceso ao sitio é libre e gratuíto. O usuario comprométese a facer un uso lícito del e dos seus contidos, sen danar o sitio nin prexudicar a terceiros.',
        'Queda prohibida a extracción masiva de contidos e o seu uso para adestrar sistemas de intelixencia artificial sen autorización expresa.',
      ] },
      { title: '4. Exclusión de responsabilidade', body: [
        'Procúrase que a información sexa exacta e estea actualizada, pero non se garante a ausencia de erros nin a dispoñibilidade ininterrompida do sitio.',
        'Non se responde dos contidos de sitios de terceiros ligados ou incrustados (YouTube, Vimeo, ArtStation, GitHub ou outros), que se rexen polas súas propias condicións.',
      ] },
      { title: '5. Lexislación aplicable', body: ['Este aviso réxese pola lexislación española. Para calquera controversia serán competentes os xulgados e tribunais que correspondan conforme á normativa vixente.'] },
    ],
  },
};

const NIF_LABEL = { es: 'NIF', en: 'Tax ID (NIF)', ca: 'NIF', gl: 'NIF' };

export function getLegalDoc(kind, language) {
  const source = kind === 'privacy' ? privacy : legal;
  const doc = source[language] || source.es;
  const nifLine = OWNER.nif ? `${NIF_LABEL[language] || NIF_LABEL.es}: ${OWNER.nif}` : null;
  const sections = doc.sections.map((section) => ({
    ...section,
    body: section.body.map((block) => (
      block.list ? { list: block.list.map((line) => (line === '{NIF}' ? nifLine : line)).filter(Boolean) } : block
    )),
  }));
  return { ...doc, sections, updated: UPDATED[language] || UPDATED.es };
}
