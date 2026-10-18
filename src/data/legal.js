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
    intro: 'Esta política explica cómo se tratan los datos personales que se facilitan a través de este sitio web, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).',
    sections: [
      { title: '1. Responsable del tratamiento', body: [`${name}, con sede profesional en ${city}. Contacto: ${email}.`] },
      { title: '2. Datos que se recogen y finalidad', body: [
        'Solo se tratan los datos que envías voluntariamente mediante el formulario de contacto o por correo electrónico: nombre, dirección de correo, asunto (opcional) y mensaje.',
        'Se utilizan exclusivamente para atender tu consulta o propuesta profesional y mantener la comunicación posterior. Se conservan mientras dure esa comunicación y, después, durante los plazos exigidos por la ley.',
      ] },
      { title: '3. Base jurídica', body: ['Tu consentimiento, que otorgas al enviar el formulario o escribir un correo (art. 6.1.a RGPD). Puedes retirarlo en cualquier momento.'] },
      { title: '4. Destinatarios y proveedores', body: [
        'Tus datos no se ceden a terceros salvo obligación legal. Para prestar el servicio intervienen proveedores técnicos que actúan como encargados del tratamiento:',
        { list: [
          'Web3Forms: recibe los mensajes del formulario y los reenvía a mi correo.',
          'Proveedores de correo electrónico y reenvío (Gmail, ImprovMX): entrega y almacenamiento de los mensajes.',
          'Vercel Inc.: alojamiento del sitio y estadísticas de visitas agregadas (Vercel Web Analytics y Speed Insights), sin cookies ni identificación personal del visitante.',
        ] },
        'Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo, siempre con las garantías previstas en el RGPD (decisiones de adecuación o cláusulas contractuales tipo).',
      ] },
      { title: '5. Cookies y almacenamiento local', body: [
        'Este sitio no utiliza cookies de seguimiento ni publicitarias. Guarda en tu navegador, de forma técnica y sin enviarlo a ningún servidor, tu preferencia de idioma y de tema claro/oscuro, y la vista elegida en el portfolio durante la sesión.',
        'Los vídeos incrustados (YouTube, Vimeo) y las tipografías cargadas desde Google Fonts se sirven desde esos terceros, que pueden recibir tu dirección IP y, en el caso de los reproductores, instalar sus propias cookies al reproducir. Se rigen por sus propias políticas de privacidad.',
      ] },
      { title: '6. Tus derechos', body: [
        `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a ${email} e indicando el derecho que ejerces. Para verificar tu identidad podré pedirte una copia de un documento identificativo.`,
        'Si consideras que el tratamiento no es conforme a la normativa, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).',
      ] },
    ],
  },
  en: {
    title: 'Privacy policy',
    intro: 'This policy explains how personal data provided through this website is processed, in accordance with Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018.',
    sections: [
      { title: '1. Data controller', body: [`${name}, professionally based in ${city}, Spain. Contact: ${email}.`] },
      { title: '2. Data collected and purpose', body: [
        'Only the data you voluntarily send through the contact form or by email is processed: name, email address, subject (optional) and message.',
        'It is used solely to handle your enquiry or professional proposal and to keep the conversation going. It is kept for as long as that communication lasts and afterwards for the periods required by law.',
      ] },
      { title: '3. Legal basis', body: ['Your consent, given when you submit the form or write an email (Art. 6.1.a GDPR). You can withdraw it at any time.'] },
      { title: '4. Recipients and providers', body: [
        'Your data is not shared with third parties except where legally required. Technical providers acting as data processors are involved in delivering the service:',
        { list: [
          'Web3Forms: receives the form messages and forwards them to my email.',
          'Email and forwarding providers (Gmail, ImprovMX): delivery and storage of messages.',
          'Vercel Inc.: site hosting and aggregated visit statistics (Vercel Web Analytics and Speed Insights), with no cookies and no personal identification of the visitor.',
        ] },
        'Some of these providers may process data outside the European Economic Area, always with the safeguards provided by the GDPR (adequacy decisions or standard contractual clauses).',
      ] },
      { title: '5. Cookies and local storage', body: [
        'This site does not use tracking or advertising cookies. It stores in your browser, for technical purposes and without sending it to any server, your language and light/dark theme preference, and the portfolio view chosen during the session.',
        'Embedded videos (YouTube, Vimeo) and fonts loaded from Google Fonts are served by those third parties, which may receive your IP address and, in the case of the players, set their own cookies when playing. They are governed by their own privacy policies.',
      ] },
      { title: '6. Your rights', body: [
        `You can exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to ${email} stating the right you wish to exercise. To verify your identity I may ask for a copy of an identity document.`,
        'If you believe the processing does not comply with the regulations, you can lodge a complaint with the Spanish Data Protection Agency (www.aepd.es).',
      ] },
    ],
  },
  ca: {
    title: 'Política de privadesa',
    intro: 'Aquesta política explica com es tracten les dades personals facilitades a través d\'aquest lloc web, d\'acord amb el Reglament (UE) 2016/679 (RGPD) i la Llei Orgànica 3/2018 (LOPDGDD).',
    sections: [
      { title: '1. Responsable del tractament', body: [`${name}, amb seu professional a ${city}. Contacte: ${email}.`] },
      { title: '2. Dades que es recullen i finalitat', body: [
        'Només es tracten les dades que envies voluntàriament mitjançant el formulari de contacte o per correu electrònic: nom, adreça de correu, assumpte (opcional) i missatge.',
        'S\'utilitzen exclusivament per atendre la teva consulta o proposta professional i mantenir la comunicació posterior. Es conserven mentre duri aquesta comunicació i, després, durant els terminis exigits per la llei.',
      ] },
      { title: '3. Base jurídica', body: ['El teu consentiment, que atorgues en enviar el formulari o escriure un correu (art. 6.1.a RGPD). Pots retirar-lo en qualsevol moment.'] },
      { title: '4. Destinataris i proveïdors', body: [
        'Les teves dades no es cedeixen a tercers tret d\'obligació legal. Per prestar el servei intervenen proveïdors tècnics que actuen com a encarregats del tractament:',
        { list: [
          'Web3Forms: rep els missatges del formulari i els reenvia al meu correu.',
          'Proveïdors de correu electrònic i reenviament (Gmail, ImprovMX): lliurament i emmagatzematge dels missatges.',
          'Vercel Inc.: allotjament del lloc i estadístiques de visites agregades (Vercel Web Analytics i Speed Insights), sense galetes ni identificació personal del visitant.',
        ] },
        'Alguns d\'aquests proveïdors poden tractar dades fora de l\'Espai Econòmic Europeu, sempre amb les garanties previstes en el RGPD (decisions d\'adequació o clàusules contractuals tipus).',
      ] },
      { title: '5. Galetes i emmagatzematge local', body: [
        'Aquest lloc no utilitza galetes de seguiment ni publicitàries. Desa al teu navegador, de forma tècnica i sense enviar-ho a cap servidor, la teva preferència d\'idioma i de tema clar/fosc, i la vista triada al portfolio durant la sessió.',
        'Els vídeos incrustats (YouTube, Vimeo) i les tipografies carregades des de Google Fonts es serveixen des d\'aquests tercers, que poden rebre la teva adreça IP i, en el cas dels reproductors, instal·lar les seves pròpies galetes en reproduir. Es regeixen per les seves pròpies polítiques de privadesa.',
      ] },
      { title: '6. Els teus drets', body: [
        `Pots exercir els teus drets d'accés, rectificació, supressió, oposició, limitació del tractament i portabilitat escrivint a ${email} i indicant el dret que exerceixes. Per verificar la teva identitat podré demanar-te una còpia d'un document identificatiu.`,
        'Si consideres que el tractament no s\'ajusta a la normativa, pots presentar una reclamació davant l\'Agència Espanyola de Protecció de Dades (www.aepd.es).',
      ] },
    ],
  },
  gl: {
    title: 'Política de privacidade',
    intro: 'Esta política explica como se tratan os datos persoais facilitados a través deste sitio web, conforme ao Regulamento (UE) 2016/679 (RXPD) e á Lei Orgánica 3/2018 (LOPDGDD).',
    sections: [
      { title: '1. Responsable do tratamento', body: [`${name}, con sede profesional en ${city}. Contacto: ${email}.`] },
      { title: '2. Datos que se recollen e finalidade', body: [
        'Só se tratan os datos que envías voluntariamente mediante o formulario de contacto ou por correo electrónico: nome, enderezo de correo, asunto (opcional) e mensaxe.',
        'Utilízanse exclusivamente para atender a túa consulta ou proposta profesional e manter a comunicación posterior. Consérvanse mentres dure esa comunicación e, despois, durante os prazos esixidos pola lei.',
      ] },
      { title: '3. Base xurídica', body: ['O teu consentimento, que outorgas ao enviar o formulario ou escribir un correo (art. 6.1.a RXPD). Podes retiralo en calquera momento.'] },
      { title: '4. Destinatarios e provedores', body: [
        'Os teus datos non se ceden a terceiros salvo obrigación legal. Para prestar o servizo interveñen provedores técnicos que actúan como encargados do tratamento:',
        { list: [
          'Web3Forms: recibe as mensaxes do formulario e reenvíaas ao meu correo.',
          'Provedores de correo electrónico e reenvío (Gmail, ImprovMX): entrega e almacenamento das mensaxes.',
          'Vercel Inc.: aloxamento do sitio e estatísticas de visitas agregadas (Vercel Web Analytics e Speed Insights), sen cookies nin identificación persoal do visitante.',
        ] },
        'Algúns destes provedores poden tratar datos fóra do Espazo Económico Europeo, sempre coas garantías previstas no RXPD (decisións de adecuación ou cláusulas contractuais tipo).',
      ] },
      { title: '5. Cookies e almacenamento local', body: [
        'Este sitio non utiliza cookies de seguimento nin publicitarias. Garda no teu navegador, de forma técnica e sen envialo a ningún servidor, a túa preferencia de idioma e de tema claro/escuro, e a vista escollida no portfolio durante a sesión.',
        'Os vídeos incrustados (YouTube, Vimeo) e as tipografías cargadas desde Google Fonts sírvense desde eses terceiros, que poden recibir o teu enderezo IP e, no caso dos reprodutores, instalar as súas propias cookies ao reproducir. Réxense polas súas propias políticas de privacidade.',
      ] },
      { title: '6. Os teus dereitos', body: [
        `Podes exercer os teus dereitos de acceso, rectificación, supresión, oposición, limitación do tratamento e portabilidade escribindo a ${email} e indicando o dereito que exerces. Para verificar a túa identidade poderei pedirche unha copia dun documento identificativo.`,
        'Se consideras que o tratamento non se axusta á normativa, podes presentar unha reclamación ante a Axencia Española de Protección de Datos (www.aepd.es).',
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
