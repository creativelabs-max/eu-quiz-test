/**
 * Expedition Europa — AAA Fullscreen Adventure & Cinematic Engine (Version 6.0)
 * Top-Down 2D Orthographic Map, Cinematic Tactical Flight HUD & Persistent Top-Bar
 */const StoryMode = {
  // Chronologische 27-Staaten-Reiseroute im freien Weltall (Organische kosmische Verteilung)
  expeditionRoute: [
    // Kapitel 1: 1950–1957 „Aus Feinden werden Partner“ (Die 6 Gründerstaaten)
    { name: "Frankreich", chapter: 1, x: 110, y: 490, flag: "🇫🇷", labelPos: "right", year: "1950", milestone: "Der Schuman-Plan", sub: "Die Geburtsstunde der europäischen Idee" },
    { name: "Deutschland", chapter: 1, x: 230, y: 390, flag: "🇩🇪", labelPos: "right", year: "1951", milestone: "Vom Kriegsgegner zum Partner", sub: "Versöhnung & Neubeginn im Herzen Europas" },
    { name: "Italien", chapter: 1, x: 590, y: 870, flag: "🇮🇹", labelPos: "top", year: "1957", milestone: "Europa bekommt ein Fundament", sub: "Die Römischen Verträge auf dem Kapitolshügel" },
    { name: "Belgien", chapter: 1, x: 220, y: 280, flag: "🇧🇪", labelPos: "right", year: "1951", milestone: "Ein kleines Land mit großer Idee", sub: "Brüssel wird zum Zentrum europäischer Politik" },
    { name: "Luxemburg", chapter: 1, x: 120, y: 390, flag: "🇱🇺", labelPos: "right", year: "1952", milestone: "Klein, aber mittendrin", sub: "Ein kleiner Staat als zentraler Baustein Europas" },
    { name: "Niederlande", chapter: 1, x: 100, y: 290, flag: "🇳🇱", labelPos: "right", year: "1957", milestone: "Handel statt Grenzen", sub: "Das große Finale der sechs Gründer" },

    // Kapitel 2: 1973–1986 „Die Tür steht offen“ (Erweiterungen Nord & Süd)
    { name: "Dänemark", chapter: 2, x: 240, y: 170, flag: "🇩🇰", labelPos: "right", year: "1973", milestone: "Erste Norderweiterung", sub: "Pionier für Bürgerbeteiligung und Wohlstand" },
    { name: "Irland", chapter: 2, x: 120, y: 190, flag: "🇮🇪", labelPos: "right", year: "1973", milestone: "Die Grüne Insel in der EG", sub: "Vom Agrarland zum modernen europäischen Technologiezentrum" },
    { name: "Griechenland", chapter: 2, x: 750, y: 790, flag: "🇬🇷", labelPos: "left", year: "1981", milestone: "Die Wiege der Demokratie", sub: "Rückkehr zu den antiken philosophischen Wurzeln Europas" },
    { name: "Portugal", chapter: 2, x: 120, y: 580, flag: "🇵🇹", labelPos: "right", year: "1986", milestone: "Die Nelkenrevolution & EU-Beitritt", sub: "Erblühen von Freiheit, Demokratie und Weltoffenheit" },
    { name: "Spanien", chapter: 2, x: 230, y: 490, flag: "🇪🇸", labelPos: "right", year: "1986", milestone: "Rückkehr zur Demokratie", sub: "Vollendung des friedlichen Übergangs nach der Diktatur" },

    // Kapitel 3: 1989–1995 „Die Grenze“ (Mauerfall & Mitteleuropa)
    { name: "Österreich", chapter: 3, x: 880, y: 660, flag: "🇦🇹", labelPos: "left", year: "1995", milestone: "Paneuropäischer Brückenbauer", sub: "Vom Eisernen Vorhang zum aktiven EU-Mitglied im Herzen Europas" },
    { name: "Ungarn", chapter: 3, x: 780, y: 420, flag: "🇭🇺", labelPos: "left", year: "1989", milestone: "Öffnung des Eisernen Vorhangs", sub: "Der historische Grenzdurchbruch beim Paneuropäischen Picknick 1989" },
    { name: "Tschechien", chapter: 3, x: 770, y: 280, flag: "🇨🇿", labelPos: "left", year: "1989", milestone: "Die Samtene Revolution", sub: "Václav Havels Triumph der Freiheit und Menschenrechte" },
    { name: "Finnland", chapter: 3, x: 500, y: 150, flag: "🇫🇮", labelPos: "bottom", year: "1995", milestone: "Polarlichter & Spitzenbildung", sub: "Weltweit führendes Bildungssystem und High-Tech-Standort" },
    { name: "Schweden", chapter: 3, x: 370, y: 160, flag: "🇸🇪", labelPos: "bottom", year: "1995", milestone: "Heimat des Nobelpreises", sub: "Vorreiter für Gleichberechtigung, Bildung und Innovation" },

    // Kapitel 4: 2004 „10 neue Sterne“ (Die große Osterweiterung)
    { name: "Polen", chapter: 4, x: 880, y: 300, flag: "🇵🇱", labelPos: "left", year: "2004", milestone: "Die Solidarność-Bewegung", sub: "Der gewaltlose Kampf für Freiheit, der ganz Europa veränderte" },
    { name: "Slowakei", chapter: 4, x: 890, y: 410, flag: "🇸🇰", labelPos: "left", year: "2004", milestone: "Das Herz der Karpaten", sub: "Dynamischer Aufstieg und Einführung des Euro" },
    { name: "Slowenien", chapter: 4, x: 760, y: 670, flag: "🇸🇮", labelPos: "left", year: "2004", milestone: "Das grüne Juwel der Alpen", sub: "Erster Staat des ehemaligen Jugoslawiens in der EU" },
    { name: "Estland", chapter: 4, x: 630, y: 160, flag: "🇪🇪", labelPos: "bottom", year: "2004", milestone: "Die Singende Revolution & e-Estonia", sub: "Digitaler Vorreiter und Vorbild für E-Governance" },
    { name: "Lettland", chapter: 4, x: 760, y: 170, flag: "🇱🇻", labelPos: "left", year: "2004", milestone: "Der Baltische Weg der Freiheit", sub: "Zwei Millionen Menschen Hand in Hand für die Unabhängigkeit" },
    { name: "Litauen", chapter: 4, x: 880, y: 190, flag: "🇱🇹", labelPos: "left", year: "2004", milestone: "Der erste freie Schritt", sub: "Mutige Wiederherstellung der staatlichen Unabhängigkeit 1990" },
    { name: "Malta", chapter: 4, x: 730, y: 890, flag: "🇲🇹", labelPos: "left", year: "2004", milestone: "Der Inselfels im Mittelmeer", sub: "Kultureller Schmelztiegel und historisches Seefahrer-Zentrum" },
    { name: "Zypern", chapter: 4, x: 860, y: 880, flag: "🇨🇾", labelPos: "left", year: "2004", milestone: "Mediterrane Brücke der Kulturen", sub: "Schnittstelle zwischen Europa, Asien und dem Nahen Osten" },

    // Kapitel 5: 2007–2013 „Europa wird größer & Das Finale“ (Schwarzmeer & Adria)
    { name: "Bulgarien", chapter: 5, x: 780, y: 540, flag: "🇧🇬", labelPos: "left", year: "2007", milestone: "Die Wiege der kyrillischen Schrift", sub: "Einbringung eines dritten offiziellen Alphabets in die EU" },
    { name: "Rumänien", chapter: 5, x: 890, y: 530, flag: "🇷🇴", labelPos: "left", year: "2007", milestone: "Kultureller Reichtum der Karpaten", sub: "Großer Schritt für Stabilität und Zusammenhalt im Südosten" },
    { name: "Kroatien", chapter: 5, x: 880, y: 780, flag: "🇭🇷", labelPos: "left", year: "2013", milestone: "Der 28. Stern & Schengen", sub: "Aufnahme in die Union, Einführung des Euro und Werte-Finale" }
  ],

  // 5-Akt-Storybogen mit echter Zeitreise-Dramaturgie
  chapters: [
    { 
      id: 1, 
      name: "1950–1957: Die Gründer", 
      subtitle: "Aus Feinden werden Partner", 
      icon: "🏛️", 
      climaxReward: "Der sechste Gründerstern", 
      climaxLore: "1957: Sechs Sterne leuchten über dem zerstörten Europa – die ersten 6 Staaten bilden das gemeinsame Fundament." 
    },
    { 
      id: 2, 
      name: "1973–1986: Die Tür steht offen", 
      subtitle: "Erste Norderweiterung & Demokratisierung im Süden", 
      icon: "☀️", 
      climaxReward: "Mediterraner Sonnen-Kompass", 
      climaxLore: "Klaus: „Die Freiheit breitet sich aus: Dänemark, Irland und nach dem Ende der Diktaturen Griechenland, Portugal und Spanien!“" 
    },
    { 
      id: 3, 
      name: "1989–1995: Die Grenze", 
      subtitle: "Fall der Berliner Mauer & Mitteleuropa", 
      icon: "🧱", 
      climaxReward: "Mauerstein der Freiheit", 
      climaxLore: "Klaus: „1989 fielen die Mauern! Österreich, Schweden und Finnland treten bei, und Mitteleuropa schlägt wieder im Takt der Freiheit!“" 
    },
    { 
      id: 4, 
      name: "2004: 10 neue Sterne", 
      subtitle: "Die historische Osterweiterung", 
      icon: "⭐", 
      climaxReward: "Großer Sternenbund von 2004", 
      climaxLore: "Klaus: „10 Staaten an einem einzigen Tag! Die künstliche Spaltung unseres Kontinents ist für immer Geschichte!“" 
    },
    { 
      id: 5, 
      name: "2007–2013: Europa wird größer & Das Finale", 
      subtitle: "Vollendung der 27 Sterne & Unsere gemeinsamen Werte", 
      icon: "👑", 
      climaxReward: "Die Große Sternenkrone der 27", 
      climaxLore: "HISTORISCHER TRIUMPH: Alle 27 Sterne leuchten am europäischen Firmament. In Vielfalt geeint für Frieden, Freiheit und Demokratie!" 
    }
  ],

  // Werte- & Reflexionsseiten für den Schulunterricht (Pädagogischer Standard der PH Steiermark: „Europa im Klassenzimmer“)
  reflectionsDatabase: {
    1: {
      title: "Kapitel 1: Frieden & Integration als Fundament",
      impulse: "„Aus Feinden wurden Partner: Europabildung und politische Integration sind der wichtigste Baustein für ein friedliches Europa. Konflikte werden im vereinten Europa nie wieder mit Waffen, sondern am Verhandlungstisch der Demokratien gelöst.“",
      question: "Was bedeutet Frieden und gegenseitiger Respekt für unseren eigenen Alltag in der Schule, in der Familie und im Umgang mit verschiedenen Meinungen?"
    },
    2: {
      title: "Kapitel 2: Demokratie, Freiheit & Bürgerrechte schützen",
      impulse: "„Demokratie, Rechtsstaatlichkeit und Menschenrechte sind keine Selbstverständlichkeit. Nach den Diktaturen im Süden erblühten Freiheit und Bürgerrechte – zentrale Werte, die jede Generation aktiv schützen und leben muss.“",
      question: "Wie können junge Menschen heute ihre eigene Stimme und ihr Engagement nutzen (z. B. Schülervertretung, Wahlen ab 16, Initiativen), um Freiheit und Gerechtigkeit zu stärken?"
    },
    3: {
      title: "Kapitel 3: Solidarität, Grenzen überwinden & Migration",
      impulse: "„1989 fielen die Mauern durch den mutigen Zusammenhalt der Bürgerinnen und Bürger. Angesichts heutiger Herausforderungen wie Flucht, Migration und weltweiter Krisen braucht Europa Mitgefühl, Menschlichkeit und echte Solidarität statt neuer Zäune.“",
      question: "Wo begegnen uns im Alltag noch Vorurteile oder unsichtbare Grenzen – und wie können wir als offene Gesellschaft Brücken zueinander bauen?"
    },
    4: {
      title: "Kapitel 4: Klimawandel, Nachhaltigkeit & Digitale Zukunft",
      impulse: "„Klimawandel und digitale Transformation machen an keiner Landesgrenze halt. Ein forschungsstarkes, innovatives Europa schützt unsere Umwelt und nutzt moderne Technologien für das Wohl und die Bildung aller Menschen.“",
      question: "Welche gemeinsamen europäischen Ideen und Erfindungen brauchen wir dringend, um unsere Natur zu schützen und die digitale Welt fair und nachhaltig zu gestalten?"
    },
    5: {
      title: "Kapitel 5: In Vielfalt geeint – Unsere gemeinsame europäische Zukunft",
      impulse: "„In einer unruhigen Welt mit neuen geopolitischen Spannungen gibt uns die europäische Union Halt, Sicherheit und eine starke gemeinsame Stimme. Unsere Vielfalt an Sprachen und Traditionen ist unser größter Reichtum.“",
      question: "Was bedeutet eine gemeinsame europäische Identität für dich persönlich – und wie wollen wir als informierte und engagierte junge Generation das Europa von morgen gestalten?"
    }
  },

  // Offizielle Verteilung der 27 EU-Mitgliedsstaaten auf die 12 Sterne der EU-Flagge
  euFlagStarsDefinition: [
    { id: 1, name: "Die Benelux-Pioniere", subtitle: "Zollunion & offene Grenzen", countries: ["Belgien", "Niederlande", "Luxemburg"], icon: "🇧🇪" },
    { id: 2, name: "Das Fundament des Friedens", subtitle: "Montanunion & Schuman-Plan", countries: ["Deutschland", "Frankreich"], icon: "🇩🇪" },
    { id: 3, name: "Mediterranes Zentrum", subtitle: "Römische Verträge & Inselkultur", countries: ["Italien", "Malta"], icon: "🇮🇹" },
    { id: 4, name: "Iberische Halbinsel", subtitle: "Rückkehr zur Demokratie 1986", countries: ["Spanien", "Portugal"], icon: "🇪🇸" },
    { id: 5, name: "Antike Wurzeln & Inselbrücke", subtitle: "Wiege der Demokratie", countries: ["Griechenland", "Zypern"], icon: "🇬🇷" },
    { id: 6, name: "Alpen-Adria Brückenbauer", subtitle: "Mitteleuropäischer Dialog", countries: ["Österreich", "Slowenien"], icon: "🇦🇹" },
    { id: 7, name: "Samtene Freiheit", subtitle: "Triumph der Menschenrechte", countries: ["Tschechien", "Slowakei"], icon: "🇨🇿" },
    { id: 8, name: "Donau & Adria-Küste", subtitle: "Überwindung historischer Grenzen", countries: ["Ungarn", "Kroatien"], icon: "🇭🇺" },
    { id: 9, name: "Solidarność & Freiheit", subtitle: "Gewaltloser Mut zur Wende", countries: ["Polen"], icon: "🇵🇱" },
    { id: 10, name: "Norderweiterung 1973", subtitle: "Bürgerbeteiligung & Innovation", countries: ["Irland", "Dänemark"], icon: "🇮🇪" },
    { id: 11, name: "Skandinavien & Bildung", subtitle: "Vorreiter für Nachhaltigkeit", countries: ["Schweden", "Finnland"], icon: "🇸🇪" },
    { id: 12, name: "Baltikum & Südost-Allianz", subtitle: "Singende Revolution, Vielfalt & Zukunft", countries: ["Estland", "Lettland", "Litauen", "Rumänien", "Bulgarien"], icon: "🇪🇪" }
  ],

  // Relic Database
  relicsDatabase: {
    "Frankreich": { name: "Der deutsch-französische Handschlag", icon: "🤝", desc: "Steht für die vielleicht wichtigste politische Versöhnung Europas." },
    "Deutschland": { name: "Der erste Europa-Baustein", icon: "🧱", desc: "Steht für einen Kontinent, der nicht auf einmal, sondern Stück für Stück neu aufgebaut wurde." },
    "Italien": { name: "Der Stein von Rom", icon: "🏛️", desc: "Symbol für das Fundament, auf dem spätere europäische Projekte aufgebaut wurden." },
    "Belgien": { name: "Die noch leere Geldbörse", icon: "💶", desc: "Erinnert daran, dass Europa lange vor dem Euro begonnen hat." },
    "Luxemburg": { name: "Das erste Europa-Puzzleteil", icon: "🧩", desc: "Symbolisiert, dass jedes Ereignis ein Teil der größeren europäischen Geschichte ist." },
    "Niederlande": { name: "Der sechste Gründerstern", icon: "⭐", desc: "Wenn er entzündet wird, verbinden sich die sechs Sterne zum ersten Mal zu einem gemeinsamen Symbol." },
    "Spanien": { name: "Don Quijote Manuskript", icon: "📖", desc: "Kulturelles Erbe der Weltliteratur und spanischen Lebensfreude." },
    "Portugal": { name: "Seefahrer-Astrolabium", icon: "🧭", desc: "Zeugnis der großen europäischen Entdeckungsreisen." },
    "Griechenland": { name: "Demokratie-Tafel", icon: "🏛️", desc: "Aus den Tiefen der antiken Agora in Athen." },
    "Zypern": { name: "Aphrodite-Mosaik", icon: "🎨", desc: "Antike mediterrane Mosaikkunst an der Schnittstelle der Kulturen." },
    "Malta": { name: "Ritter-Kreuz von Malta", icon: "🛡️", desc: "Historisches Schutzsymbol des Inselstaates im Mittelmeer." },
    "Österreich": { name: "Wiener Walzer-Noten", icon: "🎵", desc: "Musikalisches Meisterwerk des europäischen Kulturraums." },
    "Tschechien": { name: "Karlsbrücken-Skulptur", icon: "🌉", desc: "Verbindet West- und Osteuropa seit Jahrhunderten." },
    "Slowakei": { name: "Hohe-Tatra-Kristall", icon: "🏔️", desc: "Symbol für unberührte Natur und Nationalparks in den Karpaten." },
    "Slowenien": { name: "Ljubljana-Drachenorden", icon: "🐉", desc: "Beschützer der grünen Hauptstadt Europas." },
    "Kroatien": { name: "Adriatischer Bernsteinkompass", icon: "⛵", desc: "Wegweiser entlang der tausend Inseln der Adria." },
    "Ungarn": { name: "Zauberwürfel-Prototyp", icon: "🎲", desc: "Erfindung von Ernő Rubik aus Budapest." },
    "Dänemark": { name: "Hygge-Laterne", icon: "🏮", desc: "Nordische Lebensart und skandinavische Wohlfühlkultur." },
    "Schweden": { name: "Nobelpreis-Medaille", icon: "🎖️", desc: "Höchste Auszeichnung für Frieden, Wissenschaft und Literatur." },
    "Finnland": { name: "Polarlichter-Prisma", icon: "🌌", desc: "Fängt das magische Leuchten des finnischen Nordens ein." },
    "Estland": { name: "E-Residency SmartCard", icon: "💳", desc: "Pionierleistung der digitalen Demokratie." },
    "Lettland": { name: "Dainas-Liederrolle", icon: "🎼", desc: "Traditionelles lettisches Volkslied-Kulturgut." },
    "Litauen": { name: "Gediminas-Ritterhelm", icon: "🪖", desc: "Erbe der Großfürsten von Vilnius." },
    "Irland": { name: "Keltische Harfe", icon: "🪕", desc: "Nationales Symbol der Musik und irischen Geschichte." },
    "Polen": { name: "Kopernikus-Astrolabium", icon: "🪐", desc: "Das heliozentrische Weltbild aus Toruń." },
    "Rumänien": { name: "Karpaten-Saphir", icon: "💎", desc: "Schatz aus den historischen Schlössern Siebenbürgens." },
    "Bulgarien": { name: "Kyrillische Ur-Schriftrolle", icon: "📜", desc: "Die Wiege der kyrillischen Schrift in Europa." },
    "Europaparlament": { name: "Große Sternenkrone", icon: "👑", desc: "Vollendung aller 27 Fragmente: Einheit in Vielfalt!" }
  },

  state: {
    routeIndex: 0,
    currentChapter: 1,
    currentPlanePos: { x: 340, y: 560 },
    countries: {},
    clearedChapters: [],
    totalStars: 0,
    relics: [],
    introSeen: false,
    wallBroken: false,
    tenStarsMinigameDone: false,
    valuesFinaleDone: false,
    activeCountry: null,
    activeStageIndex: 0,
    stageScore: 0,
    stageErrors: 0
  },

  isFlying: false,
  currentCutsceneQueue: [],
  cutsceneCallback: null,
  isTyping: false,
  typingInterval: null,

  init: function() {
    this.loadState();
  },

  loadState: function() {
    let saved = null;
    if (typeof UserProfile !== 'undefined' && UserProfile.data && UserProfile.data.storyMode) {
      saved = UserProfile.data.storyMode;
    } else {
      try {
        const raw = safeLocalStorage.getItem('eu_story_mode_v7');
        if (raw) saved = JSON.parse(raw);
      } catch (e) {}
    }

    if (saved) {
      this.state.countries = saved.countries || {};
      this.state.clearedChapters = saved.clearedChapters || [];
      this.state.relics = saved.relics || [];
      this.state.introSeen = !!saved.introSeen;
      this.state.wallBroken = !!saved.wallBroken;
      this.state.tenStarsMinigameDone = !!saved.tenStarsMinigameDone;
      this.state.valuesFinaleDone = !!saved.valuesFinaleDone;
      this.calculateStars();
    }

    this.updateCurrentTargetStation();
  },

  updateCurrentTargetStation: function() {
    const nextIdx = this.expeditionRoute.findIndex(st => !this.state.countries[st.name]?.completed);
    if (nextIdx !== -1) {
      this.state.routeIndex = nextIdx;
      this.state.currentChapter = this.expeditionRoute[nextIdx].chapter;
    } else {
      this.state.routeIndex = this.expeditionRoute.length - 1;
      this.state.currentChapter = 5;
    }
  },

  // --- Organische Control-Center Modal Animation mit Ursprungsposition ---
  openModalWithOrigin: function(modalId, panelSelector, triggerEl) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    const panel = modal.querySelector(panelSelector);
    if (triggerEl && panel) {
      const btnRect = (typeof triggerEl.getBoundingClientRect === 'function') 
        ? triggerEl.getBoundingClientRect() 
        : { left: triggerEl.clientX || window.innerWidth / 2, top: triggerEl.clientY || window.innerHeight / 2, width: 0, height: 0 };
      
      modal.style.display = 'flex';
      const panelRect = panel.getBoundingClientRect();
      const clickX = btnRect.left + (btnRect.width / 2);
      const clickY = btnRect.top + (btnRect.height / 2);
      const relX = clickX - panelRect.left;
      const relY = clickY - panelRect.top;
      panel.style.transformOrigin = `${relX}px ${relY}px`;
    } else if (panel) {
      panel.style.transformOrigin = 'center center';
    }
    modal.classList.remove('cc-overlay-animate-out');
    modal.classList.add('cc-overlay-animate-in');
    modal.style.display = 'flex';
    if (panel) {
      panel.classList.remove('cc-panel-zoom-out');
      panel.classList.add('cc-panel-zoom-in');
    }
  },

  closeModalWithAnimation: function(modalId, panelSelector, onDone) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    const panel = modal.querySelector(panelSelector);
    if (panel) {
      panel.classList.remove('cc-panel-zoom-in');
      panel.classList.add('cc-panel-zoom-out');
    }
    modal.classList.remove('cc-overlay-animate-in');
    modal.classList.add('cc-overlay-animate-out');
    setTimeout(() => {
      modal.style.display = 'none';
      if (typeof onDone === 'function') onDone();
    }, 280);
  },

  // --- Audio-Status Synchronisation (Rotfärbung bei Stumm) ---
  syncAudioButtonState: function() {
    const btn = document.getElementById('dock-audio-btn');
    const icon = document.getElementById('dock-audio-icon');
    const text = document.getElementById('dock-audio-text');
    const isMuted = (typeof sounds !== 'undefined' && sounds.musicMuted);

    if (btn) {
      if (isMuted) {
        btn.classList.add('dock-audio-muted');
        if (icon) icon.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`;
        if (text) text.innerText = "Stumm";
      } else {
        btn.classList.remove('dock-audio-muted');
        if (icon) icon.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
        if (text) text.innerText = "Audio";
      }
    }
  },

  // --- Hochwertige Vektor-Icons für Relikte & Artefakte ---
  getRelicSVG: function(name) {
    const map = {
      "Atomium-Kristall": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8"><circle cx="12" cy="12" r="2.5" fill="#38bdf8" fill-opacity="0.3"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(150 12 12)"/></svg>`,
      "Berliner Mauerstein": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2" fill="#fbbf24" fill-opacity="0.15"/><path d="M3 10h18M3 16h18M8 4v6M16 4v6M12 10v6M7 16v4M17 16v4"/></svg>`,
      "Schuman-Erklärung": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" fill="#38bdf8" fill-opacity="0.15"/><path d="M6 6h10M6 10h10M6 14h6"/></svg>`,
      "Römische Lorbeerkrone": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="1.8"><path d="M12 2a10 10 0 0 0-7 17l1.5-1.5M12 2a10 10 0 0 1 7 17l-1.5-1.5"/><circle cx="12" cy="12" r="3" fill="#10b981" fill-opacity="0.2"/></svg>`,
      "Schengen-Siegel": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8"><circle cx="12" cy="12" r="9" fill="#06b6d4" fill-opacity="0.15"/><circle cx="12" cy="12" r="5" stroke-dasharray="2 2"/><path d="M12 8v4l2.5 2.5"/></svg>`,
      "Maastricht-Vertrag": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" fill="#fbbf24" fill-opacity="0.2"/></svg>`,
      "Der deutsch-französische Handschlag": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8l-2.6 2.6" fill="rgba(251,191,36,0.15)"/><path d="m2 13 6 6"/></svg>`,
      "Der erste Europa-Baustein": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2" fill="rgba(251,191,36,0.15)"/><path d="M3 10h18M3 16h18M8 4v6M16 4v6M12 10v6M7 16v4M17 16v4"/></svg>`,
      "Der Stein von Rom": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.8"><path d="M3 21h18M4 18h16M5 10v8M9 10v8M15 10v8M19 10v8M12 3 3 8h18l-9-5z" fill="rgba(245,158,11,0.15)"/></svg>`,
      "Die noch leere Geldbörse": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8"><path d="M21 7H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" fill="rgba(56,189,248,0.15)"/><path d="M16 14h.01M1 11h22M6 3h12a2 2 0 0 1 2 2v2H4V5a2 2 0 0 1 2-2z"/></svg>`,
      "Das erste Europa-Puzzleteil": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8"><path d="M19.439 7.85c0-1.571-.944-2.85-2.109-2.85s-2.11 1.279-2.11 2.85H11.5a1.5 1.5 0 0 0-1.5 1.5v3.72a2.85 2.85 0 0 1-2.85 2.11c-1.571 0-2.85-.944-2.85-2.11V9.5A1.5 1.5 0 0 0 2.8 8H2.5A1.5 1.5 0 0 0 1 9.5v8A1.5 1.5 0 0 0 2.5 19h8a1.5 1.5 0 0 0 1.5-1.5v-3.72a2.85 2.85 0 0 1 2.85-2.11c1.571 0 2.85.944 2.85 2.11V17.5a1.5 1.5 0 0 0 1.5 1.5h1.239a1.5 1.5 0 0 0 1.5-1.5v-8a1.5 1.5 0 0 0-1.5-1.5h-.989z" fill="rgba(251,191,36,0.15)"/></svg>`,
      "Der sechste Gründerstern": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="rgba(245,158,11,0.25)"/></svg>`,
      "Der Kohle-und-Stahl-Schlüssel": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8"><circle cx="7.5" cy="15.5" r="5.5" fill="rgba(56,189,248,0.15)"/><path d="m11.5 11.5 7-7"/><path d="m15 4 2 2"/><path d="m18 7 2 2"/><path d="m6 14 3 3"/></svg>`,
      "Der Schlüssel der gemeinsamen Kontrolle": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8"><circle cx="7.5" cy="15.5" r="5.5" fill="rgba(251,191,36,0.15)"/><path d="m11.5 11.5 7-7"/><path d="m15 4 2 2"/><path d="m18 7 2 2"/></svg>`,
      "Die Karte der Sechs": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="1.8"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" fill="rgba(6,182,212,0.15)"/><path d="M9 3v15M15 6v15"/></svg>`,
      "Der römische Vertragssiegelring": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.8"><circle cx="12" cy="12" r="8" fill="rgba(245,158,11,0.15)"/><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>`,
      "Die erste Markt-Münze": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8"><circle cx="12" cy="12" r="9" fill="rgba(251,191,36,0.15)"/><circle cx="12" cy="12" r="6" stroke-dasharray="2 2"/><text x="12" y="16" text-anchor="middle" font-size="11" font-weight="bold" fill="#fbbf24">€</text></svg>`,
      "Der europäische Stadtschlüssel": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8"><rect x="4" y="2" width="16" height="20" rx="2" fill="rgba(56,189,248,0.12)"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01"/></svg>`,
      "Die Waage der Sechs": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8"><path d="m12 3-8 5 8-5 8 5-8-5"/><path d="M12 3v18"/><path d="M4 8v2a4 4 0 0 0 8 0V8"/><path d="M12 8v2a4 4 0 0 0 8 0V8"/><path d="M8 21h8"/></svg>`,
      "Der kleine große Stern": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="rgba(56,189,248,0.2)"/></svg>`,
      "Die Festung Europas": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8"><path d="M4 21V9l4-4 4 4 4-4 4 4v12z" fill="rgba(251,191,36,0.15)"/><path d="M9 21v-5a3 3 0 0 1 6 0v5"/></svg>`,
      "Das Handelsschiff ohne Grenze": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="1.8"><path d="M2 20a4 4 0 0 0 8 0 4 4 0 0 0 8 0 4 4 0 0 0 4 0"/><path d="M4 17l2-7h12l2 7z" fill="rgba(6,182,212,0.15)"/><path d="M12 4v6M12 4l5 3h-5"/></svg>`,
      "Die Benelux-Kette": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="1.8"><path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8"/></svg>`,
      "Die Stimme des kleinen Landes": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8"><circle cx="7.5" cy="15.5" r="5.5" fill="rgba(56,189,248,0.15)"/><path d="m11.5 11.5 7-7"/><path d="m15 4 2 2"/><path d="m18 7 2 2"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>`,
      "Der Kompromiss-Stempel": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8l-2.6 2.6" fill="rgba(251,191,36,0.15)"/><path d="m2 13 6 6"/></svg>`,
      "Die Abstimmungskarte von 1951": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" fill="rgba(56,189,248,0.15)"/><path d="m9 11 2 2 4-4"/><path d="M6 18h8"/></svg>`,
      "Der Neuanfangs-Pass": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="3" fill="rgba(16,185,129,0.15)"/><circle cx="12" cy="10" r="3"/><path d="M7 17a5 5 0 0 1 10 0"/></svg>`,
      "Das Gleichgewicht des Kleinen": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8"><path d="m12 3-8 5 8-5 8 5-8-5"/><path d="M12 3v18"/><path d="M4 8v2a4 4 0 0 0 8 0V8"/><path d="M12 8v2a4 4 0 0 0 8 0V8"/><path d="M8 21h8"/></svg>`,
      "Die Handelsroute der Zukunft": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="1.8"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" fill="rgba(6,182,212,0.15)"/><path d="M9 3v15M15 6v15"/></svg>`,
      "Der Schuman-Kompass": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8"><circle cx="12" cy="12" r="10" stroke="#38bdf8" fill="rgba(56,189,248,0.15)"/><polygon points="12 4 15 12 12 20 9 12" fill="#38bdf8"/></svg>`,
      "Der Handschlag von 1951": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8l-2.6 2.6" fill="rgba(251,191,36,0.15)"/><path d="m2 13 6 6"/></svg>`,
      "Die Feder von Rom": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" fill="rgba(245,158,11,0.2)"/></svg>`,
      "Der Brüsseler Schlüsselbund": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8"><circle cx="7.5" cy="15.5" r="5.5" fill="rgba(56,189,248,0.15)"/><path d="m11.5 11.5 7-7"/><path d="m15 4 2 2"/><path d="m18 7 2 2"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>`,
      "Die Waage von Luxemburg": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8"><path d="m12 3-8 5 8-5 8 5-8-5"/><path d="M12 3v18"/><path d="M4 8v2a4 4 0 0 0 8 0V8"/><path d="M12 8v2a4 4 0 0 0 8 0V8"/><path d="M8 21h8"/></svg>`,
      "Der Hafenkran von Rotterdam": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="1.8"><path d="M4 22h16"/><path d="M6 22V6l8-4h6v4l-8 4"/><path d="M14 6v8"/><path d="M11 14h6v8h-6z" fill="rgba(6,182,212,0.2)"/></svg>`,
      "Große Sternenkrone": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.8"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" fill="#f59e0b" fill-opacity="0.2"/></svg>`
    };
    if (name && map[name]) return map[name];
    return `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#fbbf24" fill-opacity="0.2"/></svg>`;
  },

  getRelicSmallSVG: function(name) {
    const sMap = {
      "Der deutsch-französische Handschlag": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8l-2.6 2.6"/><path d="m2 13 6 6"/></svg>`,
      "Der erste Europa-Baustein": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 12h18M12 4v8M8 12v8M16 12v8"/></svg>`,
      "Der Stein von Rom": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M3 21h18M5 11v7M9 11v7M15 11v7M19 11v7M12 4 3 8h18l-9-4z"/></svg>`,
      "Die noch leere Geldbörse": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 14h.01M2 11h20"/></svg>`,
      "Das erste Europa-Puzzleteil": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><path d="M19 8h-3a2 2 0 0 1-2-2 2 2 0 0 0-4 0 2 2 0 0 1-2 2H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2 2 2 0 0 1 0 4 2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2 2 2 0 0 1 4 0 2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 1 2-2 2 2 0 0 0 0-4 2 2 0 0 1-2-2v-3a2 2 0 0 0-2-2z"/></svg>`,
      "Der sechste Gründerstern": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
      "Der Kohle-und-Stahl-Schlüssel": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><circle cx="7.5" cy="15.5" r="4.5"/><path d="m11 11 6-6M14 4l2 2M16 6l2 2"/></svg>`,
      "Der Schlüssel der gemeinsamen Kontrolle": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><circle cx="7.5" cy="15.5" r="4.5"/><path d="m11 11 6-6M14 4l2 2M16 6l2 2"/></svg>`,
      "Die Karte der Sechs": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><path d="M9 3v15M15 6v15"/></svg>`,
      "Der römische Vertragssiegelring": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3.5"/></svg>`,
      "Die erste Markt-Münze": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><circle cx="12" cy="12" r="8"/><path d="M10 12h4M12 9v6"/></svg>`,
      "Der europäische Stadtschlüssel": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M11 21v-4h2v4"/></svg>`,
      "Die Waage der Sechs": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><path d="m12 3-8 5 8-5 8 5-8-5M12 3v18M4 8v2a4 4 0 0 0 8 0V8M12 8v2a4 4 0 0 0 8 0V8M8 21h8"/></svg>`,
      "Der kleine große Stern": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
      "Die Festung Europas": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><path d="M4 21V9l4-4 4 4 4-4 4 4v12z"/></svg>`,
      "Das Handelsschiff ohne Grenze": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2"><path d="M2 19a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M4 16l2-6h12l2 6z"/></svg>`,
      "Die Benelux-Kette": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8"/></svg>`,
      "Die Stimme des kleinen Landes": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><circle cx="7.5" cy="15.5" r="4.5"/><path d="m11 11 6-6M14 4l2 2M16 6l2 2"/></svg>`,
      "Der Kompromiss-Stempel": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8l-2.6 2.6"/><path d="m2 13 6 6"/></svg>`,
      "Die Abstimmungskarte von 1951": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="m9 11 2 2 4-4"/></svg>`,
      "Der Neuanfangs-Pass": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="12" cy="10" r="2.5"/><path d="M8 16a4 4 0 0 1 8 0"/></svg>`,
      "Das Gleichgewicht des Kleinen": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><path d="m12 3-8 5 8-5 8 5-8-5M12 3v18M4 8v2a4 4 0 0 0 8 0V8M12 8v2a4 4 0 0 0 8 0V8M8 21h8"/></svg>`,
      "Die Handelsroute der Zukunft": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><path d="M9 3v15M15 6v15"/></svg>`,
      "Der Schuman-Kompass": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8"><circle cx="12" cy="12" r="10" stroke="#38bdf8" fill="rgba(56,189,248,0.15)"/><polygon points="12 4 15 12 12 20 9 12" fill="#38bdf8"/></svg>`,
      "Der Handschlag von 1951": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8l-2.6 2.6" fill="rgba(251,191,36,0.15)"/><path d="m2 13 6 6"/></svg>`,
      "Die Feder von Rom": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" fill="rgba(245,158,11,0.2)"/></svg>`,
      "Der Brüsseler Schlüsselbund": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8"><circle cx="7.5" cy="15.5" r="5.5" fill="rgba(56,189,248,0.15)"/><path d="m11.5 11.5 7-7"/><path d="m15 4 2 2"/><path d="m18 7 2 2"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>`,
      "Die Waage von Luxemburg": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8"><path d="m12 3-8 5 8-5 8 5-8-5"/><path d="M12 3v18"/><path d="M4 8v2a4 4 0 0 0 8 0V8"/><path d="M12 8v2a4 4 0 0 0 8 0V8"/><path d="M8 21h8"/></svg>`,
      "Der Hafenkran von Rotterdam": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="1.8"><path d="M4 22h16"/><path d="M6 22V6l8-4h6v4l-8 4"/><path d="M14 6v8"/><path d="M11 14h6v8h-6z" fill="rgba(6,182,212,0.2)"/></svg>`,
      "Große Sternenkrone": `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.8"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" fill="#f59e0b" fill-opacity="0.2"/></svg>`
    };
    if (name && map[name]) return map[name];
    return `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#fbbf24" fill-opacity="0.2"/></svg>`;
  },

  getRelicSmallSVG: function(name) {
    const sMap = {
      "Die Stimme des kleinen Landes": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><circle cx="7.5" cy="15.5" r="4.5"/><path d="m11 11 6-6M14 4l2 2M16 6l2 2"/></svg>`,
      "Der Kompromiss-Stempel": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8l-2.6 2.6"/><path d="m2 13 6 6"/></svg>`,
      "Die Abstimmungskarte von 1951": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="m9 11 2 2 4-4"/></svg>`,
      "Der Neuanfangs-Pass": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="12" cy="10" r="2.5"/><path d="M8 16a4 4 0 0 1 8 0"/></svg>`,
      "Das Gleichgewicht des Kleinen": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><path d="m12 3-8 5 8-5 8 5-8-5M12 3v18M4 8v2a4 4 0 0 0 8 0V8M12 8v2a4 4 0 0 0 8 0V8M8 21h8"/></svg>`,
      "Die Handelsroute der Zukunft": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><path d="M9 3v15M15 6v15"/></svg>`,
      "Atomium-Kristall": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(45 12 12)"/><ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(135 12 12)"/></svg>`,
      "Berliner Mauerstein": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 12h18M12 4v8M8 12v8M16 12v8"/></svg>`,
      "Schuman-Erklärung": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 7h10M6 11h7"/></svg>`,
      "Römische Lorbeerkrone": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><circle cx="12" cy="12" r="8"/><path d="M8 12h8"/></svg>`,
      "Schengen-Siegel": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>`,
      "Maastricht-Vertrag": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
      "Der Schuman-Kompass": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><circle cx="12" cy="12" r="9"/><polygon points="12 5 14.5 12 12 19 9.5 12" fill="#38bdf8"/></svg>`,
      "Der Handschlag von 1951": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8l-2.6 2.6"/><path d="m2 13 6 6"/></svg>`,
      "Die Feder von Rom": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
      "Der Brüsseler Schlüsselbund": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><circle cx="7.5" cy="15.5" r="4.5"/><path d="m11 11 6-6M14 4l2 2M16 6l2 2"/></svg>`,
      "Die Waage von Luxemburg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><path d="m12 3-8 5 8-5 8 5-8-5M12 3v18M4 8v2a4 4 0 0 0 8 0V8M12 8v2a4 4 0 0 0 8 0V8M8 21h8"/></svg>`,
      "Der Hafenkran von Rotterdam": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2"><path d="M4 22h16M6 22V6l8-4h6v4l-8 4M14 6v8M11 14h6v8h-6z"/></svg>`,
      "Große Sternenkrone": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z"/></svg>`
    };
    if (name && sMap[name]) return sMap[name];
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  },

  saveState: function() {
    this.calculateStars();
    const payload = {
      countries: this.state.countries,
      clearedChapters: this.state.clearedChapters,
      relics: this.state.relics,
      introSeen: this.state.introSeen,
      wallBroken: this.state.wallBroken,
      tenStarsMinigameDone: this.state.tenStarsMinigameDone,
      valuesFinaleDone: this.state.valuesFinaleDone,
      totalStars: this.state.totalStars
    };

    try {
      safeLocalStorage.setItem('eu_story_mode_v7', JSON.stringify(payload));
    } catch (e) {}

    if (typeof UserProfile !== 'undefined') {
      if (!UserProfile.data.storyMode) UserProfile.data.storyMode = {};
      Object.assign(UserProfile.data.storyMode, payload);
      UserProfile.saveToLocal();
      if (UserProfile.uid) {
        UserProfile.saveToFirestore();
      }
    }
  },

  calculateStars: function() {
    let stars = 0;
    for (let c in this.state.countries) {
      stars += (this.state.countries[c].stars || 0);
    }
    this.state.totalStars = stars;
  },

  playWinSound: function() {
    try {
      if (typeof sounds !== 'undefined') {
        if (typeof sounds.playWin === 'function') sounds.playWin();
        else if (typeof sounds.playSuccess === 'function') sounds.playSuccess();
      }
    } catch (e) {}
  },

  playClickSound: function() {
    try {
      if (typeof sounds !== 'undefined' && typeof sounds.playClick === 'function') {
        sounds.playClick();
      }
    } catch (e) {}
  },

  playErrorSound: function() {
    try {
      if (typeof sounds !== 'undefined' && typeof sounds.playError === 'function') {
        sounds.playError();
      }
    } catch (e) {}
  },

  // --- Launch Story Mode (Leaves Top-Bar with Fullscreen active) ---
  launchStoryMode: function() {
    this.playClickSound();
    this.isFlying = false;
    document.body.classList.add('story-active');

    // Automatically enter fullscreen on user click if supported
    try {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen().catch(() => {});
        }
      }
    } catch(e) {}

    const isGuest = !(typeof UserProfile !== 'undefined' && UserProfile.uid);
    const guestWarned = safeLocalStorage.getItem('eu_story_guest_warned');

    if (isGuest && !guestWarned) {
      this.showGuestWarningModal();
    } else {
      this.startPreloader();
    }
  },

  showGuestWarningModal: function() {
    const modal = document.getElementById('story-guest-modal');
    if (modal) modal.style.display = 'flex';
  },

  closeGuestWarning: function(dontShowAgain = false) {
    this.playClickSound();
    if (dontShowAgain) {
      safeLocalStorage.setItem('eu_story_guest_warned', 'true');
    }
    const modal = document.getElementById('story-guest-modal');
    if (modal) modal.style.display = 'none';
    this.startPreloader();
  },

  openAuthFromStory: function() {
    this.playClickSound();
    const modal = document.getElementById('story-guest-modal');
    if (modal) modal.style.display = 'none';
    if (typeof UserProfile !== 'undefined' && typeof UserProfile.openAuthDialog === 'function') {
      UserProfile.openAuthDialog();
    }
  },

  startPreloader: function() {
    document.body.classList.add('story-active');
    const spMenu = document.getElementById('singleplayer-menu-screen');
    if (spMenu) spMenu.style.display = 'none';
    const startScreen = document.getElementById('start-screen');
    if (startScreen) startScreen.style.display = 'none';

    const preloader = document.getElementById('story-preloader-screen');
    const bar = document.getElementById('story-preloader-fill');
    const statusText = document.getElementById('story-preloader-status');
    if (preloader) preloader.style.display = 'flex';

    const steps = [
      { p: 35, msg: "Öffne das europäische Chrono-Observatorium..." },
      { p: 70, msg: "Synchronisiere historische Zeitepochen (1945 bis heute)..." },
      { p: 90, msg: "Sternen-Navigator Klaus zündet den Zeitsprung-Kern..." },
      { p: 100, msg: "Bereit für die Konstellation Europas! ✨" }
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        if (bar) bar.style.width = steps[stepIdx].p + "%";
        if (statusText) statusText.innerText = steps[stepIdx].msg;
        stepIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (preloader) preloader.style.display = 'none';
          if (!this.state.introSeen) {
            this.playCinematicIntro(() => {
              this.state.introSeen = true;
              this.saveState();
              this.showStoryHub();
            });
          } else {
            this.showStoryHub();
          }
        }, 200);
      }
    }, 140);
  },

  // --- Epic Historical Prologue & Zeitreise-Rahmenerzählung („Europa im Klassenzimmer“) ---
  playIntroCutscene: function() {
    const dialogue = [
      {
        speaker: "Geschichtschronik",
        artwork: "assets/prologue/act1_1945.jpg",
        title: "Akt I: 1945 – Das Fundament des Friedens",
        text: "Aus den Trümmern des Zweiten Weltkriegs erhob sich der Schwur der europäischen Völker: Nie wieder Hass, nie wieder Krieg zwischen Nachbarn! Europabildung und Integration wurden zum wichtigsten Baustein für dauerhaften Frieden und Menschenwürde."
      },
      {
        speaker: "Robert Schuman & Gründerväter",
        artwork: "assets/prologue/act2_founding.jpg",
        title: "Akt II: 1950 & 1957 – In Vielfalt geeint",
        text: "Mit dem Schuman-Plan und den Römischen Verträgen teilten die Demokratien Kohle & Stahl. Unterschiedliche Sprachen, Kulturen und Traditionen schufen ein gemeinsames Haus, in dem Vielfalt als Stärke gelebt wird."
      },
      {
        speaker: "Freiheitsbewegung & Süderweiterung",
        artwork: "assets/prologue/act3_1989.jpg",
        title: "Akt III: 1981–1989 – Die Kraft der Demokratie",
        text: "Im Süden überwanden Spanien, Portugal und Griechenland Diktaturen. 1989 fiel der Eiserne Vorhang durch den mutigen Ruf der Bürger nach Freiheit – die Teilung Europas wurde überwunden."
      },
      {
        speaker: "Bot Klaus",
        artwork: "assets/prologue/act4_today.jpg",
        title: "Akt IV: Heute – Große Herausforderungen & Unsere Verantwortung",
        text: "Klimawandel, Migration und geopolitische Spannungen fordern unseren Kontinent heraus. Umso wichtiger ist es, europäische Werte wie Solidarität, Rechtsstaatlichkeit und Zusammenhalt aktiv zu leben und weiterzugeben!"
      },
      {
        speaker: "Bot Klaus",
        avatar: "assets/story/pilot_klaus.jpg",
        title: "Akt V: Die Konstellation Europas – Deine Mission!",
        text: "Das Projekt 'Europa im Klassenzimmer' übergibt dir das Steuer: 27 Sterne warten am Nachthimmel darauf, durch Wissen und Werte entzündet zu werden. Unser erster Zeitsprung führt uns ins Jahr 1951 nach Belgien! Bereit?"
      }
    ];

    this.startCutscene(dialogue, () => {
      this.state.introSeen = true;
      this.saveState();
      this.showStoryHub();
    });
  },

  // =========================================================================
  // CINEMATIC STORY EXPERIENCES: INTRO & CHAPTER EVENTS
  // =========================================================================

  // --- A. Cinematic Intro: „Der Himmel über Europa“ ---
  cinematicIntroStep: 1,
  cinematicIntroCallback: null,

  playCinematicIntro: function(onComplete) {
    this.cinematicIntroCallback = onComplete;
    this.cinematicIntroStep = 1;

    const overlay = document.getElementById('story-cinematic-intro');
    if (!overlay) {
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    this.renderIntroStep(1);
    overlay.style.display = 'flex';
  },

  replayIntroFromHub: function() {
    this.playClickSound();
    this.playCinematicIntro(() => {
      this.showStoryHub();
    });
  },

  skipCinematicIntro: function() {
    this.playClickSound();
    this.finishCinematicIntro();
  },

  finishCinematicIntro: function() {
    const overlay = document.getElementById('story-cinematic-intro');
    if (overlay) overlay.style.display = 'none';
    this.state.introSeen = true;
    this.saveState();
    if (typeof this.cinematicIntroCallback === 'function') {
      const cb = this.cinematicIntroCallback;
      this.cinematicIntroCallback = null;
      cb();
    } else {
      this.showStoryHub();
    }
  },

  nextIntroStep: function() {
    this.playClickSound();
    if (this.cinematicIntroStep >= 4) {
      this.finishCinematicIntro();
    } else {
      this.cinematicIntroStep++;
      this.renderIntroStep(this.cinematicIntroStep);
    }
  },

  handleIntroStageClick: function(event) {
    if (event && event.target && event.target.closest('.cinematic-skip-btn')) return;
    this.nextIntroStep();
  },

  renderIntroStep: function(step) {
    const starsIsolated = document.getElementById('intro-isolated-stars');
    const shatteredMap = document.getElementById('intro-shattered-map');
    const founders = document.getElementById('intro-founders-constellation');
    const eraBadge = document.getElementById('intro-era-badge');
    const headline = document.getElementById('intro-headline');
    const narrativeText = document.getElementById('intro-narrative-text');
    const nextBtn = document.getElementById('intro-step-btn');
    const viewportBox = document.getElementById('cinematic-viewport-box');

    // Update Step Dots
    document.querySelectorAll('.intro-dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === (step - 1));
    });

    if (step === 1) {
      if (viewportBox) viewportBox.classList.remove('zoom-founders');
      if (starsIsolated) {
        starsIsolated.style.display = 'block';
        // Re-trigger staggered animations
        const s1 = document.getElementById('intro-star-1');
        const s2 = document.getElementById('intro-star-2');
        const s3 = document.getElementById('intro-star-3');
        [s1, s2, s3].forEach(s => {
          if (s) {
            s.style.animation = 'none';
            s.offsetHeight; /* trigger reflow */
            s.style.animation = '';
          }
        });
      }
      if (shatteredMap) shatteredMap.style.display = 'none';
      if (founders) founders.style.display = 'none';
      if (eraBadge) eraBadge.innerText = 'PROLOG • DER ANFANG';
      if (headline) headline.innerText = 'Der Himmel über Europa';
      if (narrativeText) narrativeText.innerHTML = 'Europa. Ein Kontinent mit vielen Ländern, vielen Sprachen und einer Geschichte, die nicht immer friedlich war.';
      if (nextBtn) nextBtn.innerHTML = 'Weiter ➔';
      try { if (typeof sounds !== 'undefined' && typeof sounds.playStarIgnite === 'function') sounds.playStarIgnite(); } catch(e) {}
    } else if (step === 2) {
      if (viewportBox) viewportBox.classList.remove('zoom-founders');
      if (starsIsolated) starsIsolated.style.display = 'none';
      if (shatteredMap) shatteredMap.style.display = 'block';
      if (founders) founders.style.display = 'none';
      if (eraBadge) eraBadge.innerText = '1945 • DIE TRÜMMER';
      if (headline) headline.innerText = 'Ein verwundeter Kontinent';
      if (narrativeText) narrativeText.innerHTML = '1945 lag Europa in Trümmern. Jahrhundertelang hatten Staaten gegeneinander gekämpft.<br>Doch einige Menschen hatten eine andere Idee: <i>Was wäre, wenn wir nicht gegeneinander arbeiten… sondern miteinander?</i>';
      if (nextBtn) nextBtn.innerHTML = 'Weiter ➔';
      try { if (typeof sounds !== 'undefined' && typeof sounds.playClick === 'function') sounds.playClick(); } catch(e) {}
    } else if (step === 3) {
      if (viewportBox) viewportBox.classList.remove('zoom-founders');
      if (starsIsolated) starsIsolated.style.display = 'none';
      if (shatteredMap) shatteredMap.style.display = 'none';
      if (founders) {
        founders.style.display = 'block';
        // Re-trigger line draw animation
        founders.querySelectorAll('.intro-golden-line').forEach(line => {
          line.style.animation = 'none';
          line.offsetHeight;
          line.style.animation = '';
        });
      }
      if (eraBadge) eraBadge.innerText = '1951 • DIE SECHS GRÜNDER';
      if (headline) headline.innerText = 'Der erste Funke';
      if (narrativeText) narrativeText.innerHTML = 'Hier begann es. 1951. Sechs Staaten wagten den ersten Schritt: Belgien, Deutschland, Frankreich, Italien, Luxemburg und die Niederlande teilten Kohle und Stahl, um Krieg unmöglich zu machen.';
      if (nextBtn) nextBtn.innerHTML = 'Weiter ➔';
      try { if (typeof sounds !== 'undefined' && typeof sounds.playWin === 'function') sounds.playWin(); } catch(e) {}
    } else if (step === 4) {
      if (viewportBox) viewportBox.classList.add('zoom-founders');
      if (starsIsolated) starsIsolated.style.display = 'none';
      if (shatteredMap) shatteredMap.style.display = 'none';
      if (founders) founders.style.display = 'block';
      if (eraBadge) eraBadge.innerText = 'DEINE MISSION';
      if (headline) headline.innerText = 'Setze Europa wieder zusammen';
      if (narrativeText) narrativeText.innerHTML = '<b>Du sammelst nicht einfach Sterne. Du setzt Europa wieder zusammen.</b><br><br>Hilf mit, die Sterne Europas Schritt für Schritt wieder zu entzünden!';
      if (nextBtn) nextBtn.innerHTML = '🚀 Kapitel 1 beginnen: Ein unmöglicher Plan (1945–1957) ➔';
      try { if (typeof sounds !== 'undefined' && typeof sounds.playSuccess === 'function') sounds.playSuccess(); } catch(e) {}
    }
  },

  // --- B. Chapter 3 Interactive Wall-Break Event: „Die Grenze“ (1989–1995) ---
  wallCrackCount: 0,
  wallBreakCallback: null,

  playWallBreakEvent: function(onComplete) {
    this.wallBreakCallback = onComplete;
    this.wallCrackCount = 0;

    const overlay = document.getElementById('story-wall-break-overlay');
    const stage = document.getElementById('wall-interactive-stage');
    const fill = document.getElementById('wall-crack-fill');
    const cue = document.getElementById('wall-tap-cue');
    const tapText = document.getElementById('wall-tap-text');
    const victoryBox = document.getElementById('wall-victory-box');

    if (!overlay) {
      this.finishWallBreak();
      return;
    }

    if (stage) {
      stage.classList.remove('crack-stage-1', 'crack-stage-2', 'crack-stage-3', 'shattered', 'shake');
    }
    if (fill) fill.style.width = '0%';
    if (cue) cue.style.display = 'flex';
    if (tapText) tapText.innerText = 'Tippe auf die Mauer, um die Grenze zu öffnen! (3 Schläge)';
    if (victoryBox) victoryBox.style.display = 'none';

    overlay.style.display = 'flex';
  },

  handleWallClick: function() {
    if (this.wallCrackCount >= 3) return;

    this.wallCrackCount++;
    const stage = document.getElementById('wall-interactive-stage');
    const fill = document.getElementById('wall-crack-fill');
    const cue = document.getElementById('wall-tap-cue');
    const tapText = document.getElementById('wall-tap-text');
    const victoryBox = document.getElementById('wall-victory-box');

    if (stage) {
      stage.classList.add('shake');
      setTimeout(() => stage.classList.remove('shake'), 350);
    }

    try {
      if (typeof sounds !== 'undefined' && typeof sounds.playClick === 'function') {
        sounds.playClick();
      }
    } catch(e) {}

    if (this.wallCrackCount === 1) {
      if (stage) stage.classList.add('crack-stage-1');
      if (fill) fill.style.width = '33%';
      if (tapText) tapText.innerText = 'Noch 2 Schläge! Risse breiten sich im Beton aus!';
    } else if (this.wallCrackCount === 2) {
      if (stage) stage.classList.add('crack-stage-2');
      if (fill) fill.style.width = '66%';
      if (tapText) tapText.innerText = 'Noch 1 Schlag! Das Licht der Freiheit bricht durch!';
    } else if (this.wallCrackCount === 3) {
      if (stage) {
        stage.classList.add('crack-stage-3', 'shattered');
      }
      if (fill) fill.style.width = '100%';
      if (cue) cue.style.display = 'none';

      try {
        if (typeof triggerConfetti === 'function') triggerConfetti();
        if (typeof sounds !== 'undefined' && typeof sounds.playWin === 'function') sounds.playWin();
      } catch(e) {}

      setTimeout(() => {
        if (victoryBox) victoryBox.style.display = 'block';
      }, 700);
    }
  },

  finishWallBreak: function() {
    this.playClickSound();
    const overlay = document.getElementById('story-wall-break-overlay');
    if (overlay) overlay.style.display = 'none';
    this.state.wallBroken = true;
    this.saveState();

    if (typeof this.wallBreakCallback === 'function') {
      const cb = this.wallBreakCallback;
      this.wallBreakCallback = null;
      cb();
    } else {
      this.showStoryHub();
    }
  },

  // --- C. Chapter 4 Minigame: „10 Sekunden – 10 Sterne“ (2004 Osterweiterung) ---
  tenStarsIgnited: null,
  tenStarsTimerInterval: null,
  tenStarsTimeLeft: 10.0,
  tenStarsCallback: null,

  playTenStarsMinigame: function(onComplete) {
    this.tenStarsCallback = onComplete;
    this.tenStarsIgnited = new Set();
    this.tenStarsTimeLeft = 10.0;

    const overlay = document.getElementById('story-ten-stars-overlay');
    const stage = document.getElementById('ten-stars-map-stage');
    const timerVal = document.getElementById('ten-stars-timer-val');
    const countVal = document.getElementById('ten-stars-count-val');
    const footer = document.getElementById('ten-stars-footer');

    if (!overlay || !stage) {
      this.finishTenStarsMinigame();
      return;
    }

    if (footer) footer.style.display = 'none';
    if (timerVal) timerVal.innerText = '10.0s';
    if (countVal) countVal.innerText = '0 / 10 entzündet';

    const nations = [
      { name: "Polen", flag: "🇵🇱", top: "36%", left: "52%" },
      { name: "Tschechien", flag: "🇨🇿", top: "48%", left: "44%" },
      { name: "Slowakei", flag: "🇸🇰", top: "52%", left: "53%" },
      { name: "Ungarn", flag: "🇭🇺", top: "60%", left: "55%" },
      { name: "Slowenien", flag: "🇸🇮", top: "66%", left: "45%" },
      { name: "Estland", flag: "🇪🇪", top: "18%", left: "59%" },
      { name: "Lettland", flag: "🇱🇻", top: "25%", left: "61%" },
      { name: "Litauen", flag: "🇱🇹", top: "32%", left: "61%" },
      { name: "Malta", flag: "🇲🇹", top: "89%", left: "47%" },
      { name: "Zypern", flag: "🇨🇾", top: "86%", left: "82%" }
    ];

    stage.innerHTML = nations.map((n, i) => `
      <div class="ten-star-item" id="ten-star-node-${i}" style="top:${n.top}; left:${n.left};" onclick="StoryMode.handleTenStarsTap('${n.name}', this)">
        <div class="ten-star-icon">✨</div>
        <div class="ten-star-label">${n.flag} ${n.name}</div>
      </div>
    `).join('');

    overlay.style.display = 'flex';

    if (this.tenStarsTimerInterval) clearInterval(this.tenStarsTimerInterval);
    const startTime = Date.now();
    this.tenStarsTimerInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      this.tenStarsTimeLeft = Math.max(0, 10.0 - elapsed);
      if (timerVal) timerVal.innerText = `${this.tenStarsTimeLeft.toFixed(1)}s`;

      if (this.tenStarsTimeLeft <= 0) {
        clearInterval(this.tenStarsTimerInterval);
        this.tenStarsTimerInterval = null;
        if (footer) footer.style.display = 'flex';
        // Auto-ignite remaining gently
        document.querySelectorAll('.ten-star-item:not(.ignited)').forEach(el => {
          el.classList.add('ignited');
          const icon = el.querySelector('.ten-star-icon');
          if (icon) icon.innerText = '⭐';
        });
        if (countVal) countVal.innerText = '10 / 10 entzündet';
      }
    }, 100);
  },

  handleTenStarsTap: function(nationName, el) {
    if (!this.tenStarsIgnited || this.tenStarsIgnited.has(nationName)) return;

    this.tenStarsIgnited.add(nationName);
    if (el) {
      el.classList.add('ignited');
      const icon = el.querySelector('.ten-star-icon');
      if (icon) icon.innerText = '⭐';
    }

    try {
      if (typeof sounds !== 'undefined' && typeof sounds.playCorrect === 'function') {
        sounds.playCorrect();
      }
    } catch(e) {}

    const countVal = document.getElementById('ten-stars-count-val');
    if (countVal) countVal.innerText = `${this.tenStarsIgnited.size} / 10 entzündet`;

    if (this.tenStarsIgnited.size === 10) {
      if (this.tenStarsTimerInterval) {
        clearInterval(this.tenStarsTimerInterval);
        this.tenStarsTimerInterval = null;
      }
      try {
        if (typeof triggerConfetti === 'function') triggerConfetti();
        if (typeof sounds !== 'undefined' && typeof sounds.playWin === 'function') sounds.playWin();
        if (typeof UserProfile !== 'undefined' && typeof UserProfile.addXP === 'function') {
          UserProfile.addXP(200, "10-Sterne Osterweiterung");
        }
      } catch(e) {}

      const footer = document.getElementById('ten-stars-footer');
      if (footer) footer.style.display = 'flex';
    }
  },

  finishTenStarsMinigame: function() {
    this.playClickSound();
    if (this.tenStarsTimerInterval) {
      clearInterval(this.tenStarsTimerInterval);
      this.tenStarsTimerInterval = null;
    }
    const overlay = document.getElementById('story-ten-stars-overlay');
    if (overlay) overlay.style.display = 'none';

    this.state.tenStarsMinigameDone = true;
    this.saveState();

    if (typeof this.tenStarsCallback === 'function') {
      const cb = this.tenStarsCallback;
      this.tenStarsCallback = null;
      cb();
    } else {
      this.showStoryHub();
    }
  },

  // --- D. Chapter 5 Finale: Das Werte-Finale & Der Sternenkreis der Flagge ---
  selectedValues: null,
  valuesFinaleCallback: null,
  circleTickerInterval: null,

  playValuesFinale: function(onComplete) {
    this.valuesFinaleCallback = onComplete;
    this.selectedValues = new Set();

    const overlay = document.getElementById('story-values-finale-overlay');
    const stage1 = document.getElementById('values-selection-stage');
    const stage2 = document.getElementById('values-circle-stage');
    const counterTag = document.getElementById('values-counter-tag');
    const confirmBtn = document.getElementById('values-confirm-btn');
    const quoteBanner = document.getElementById('final-quote-banner');

    if (!overlay) {
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    if (stage1) stage1.style.display = 'flex';
    if (stage2) stage2.style.display = 'none';
    if (quoteBanner) quoteBanner.style.display = 'none';
    if (counterTag) counterTag.innerText = '0 von 3 Werten gewählt';
    if (confirmBtn) confirmBtn.disabled = true;

    document.querySelectorAll('.value-choice-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.timeline-year-chip').forEach(c => c.classList.remove('lit'));

    overlay.style.display = 'flex';
  },

  toggleValueSelection: function(valKey) {
    if (!this.selectedValues) this.selectedValues = new Set();

    if (this.selectedValues.has(valKey)) {
      this.selectedValues.delete(valKey);
    } else {
      if (this.selectedValues.size >= 3) return;
      this.selectedValues.add(valKey);
    }

    try {
      if (typeof sounds !== 'undefined' && typeof sounds.playClick === 'function') {
        sounds.playClick();
      }
    } catch(e) {}

    document.querySelectorAll('.value-choice-card').forEach(card => {
      const k = card.getAttribute('data-val');
      if (this.selectedValues.has(k)) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });

    const count = this.selectedValues.size;
    const counterTag = document.getElementById('values-counter-tag');
    const confirmBtn = document.getElementById('values-confirm-btn');

    if (counterTag) counterTag.innerText = `${count} von 3 Werten gewählt`;
    if (confirmBtn) confirmBtn.disabled = (count !== 3);
  },

  confirmValuesSelection: function() {
    this.playClickSound();
    const stage1 = document.getElementById('values-selection-stage');
    const stage2 = document.getElementById('values-circle-stage');
    if (stage1) stage1.style.display = 'none';
    if (stage2) stage2.style.display = 'flex';

    // Render circular stars around the EU center
    const circleLayer = document.getElementById('circle-stars-layer');
    if (circleLayer) {
      circleLayer.innerHTML = "";
      const count = 12;
      const radius = 175;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
        const x = 220 + radius * Math.cos(angle);
        const y = 220 + radius * Math.sin(angle);
        const starEl = document.createElement('div');
        starEl.className = 'circle-orbit-star';
        starEl.id = `orbit-star-${i}`;
        starEl.style.left = `${x.toFixed(1)}px`;
        starEl.style.top = `${y.toFixed(1)}px`;
        starEl.innerText = '⭐';
        circleLayer.appendChild(starEl);
      }
    }

    // Chronological Ignition Sequence (1951 -> 2013)
    const chips = ['chip-1951', 'chip-1973', 'chip-1981', 'chip-1986', 'chip-1995', 'chip-2004', 'chip-2007', 'chip-2013'];
    let idx = 0;
    if (this.circleTickerInterval) clearInterval(this.circleTickerInterval);
    this.circleTickerInterval = setInterval(() => {
      if (idx < chips.length) {
        const chip = document.getElementById(chips[idx]);
        if (chip) chip.classList.add('lit');
        try {
          if (typeof sounds !== 'undefined' && typeof sounds.playCorrect === 'function') {
            sounds.playCorrect();
          }
        } catch(e) {}
        idx++;
      } else {
        clearInterval(this.circleTickerInterval);
        this.circleTickerInterval = null;
        const sub = document.getElementById('circle-stage-subtitle');
        if (sub) sub.innerHTML = '✨ <b>Alle 27 Demokratien leuchten im ewigen Bund.</b>';
      }
    }, 450);
  },

  handleFlagCenterDoubleTap: function() {
    try {
      if (typeof triggerConfetti === 'function') {
        triggerConfetti();
        setTimeout(triggerConfetti, 400);
      }
      if (typeof sounds !== 'undefined' && typeof sounds.playWin === 'function') {
        sounds.playWin();
      }
    } catch(e) {}

    const hint = document.getElementById('flag-center-hint');
    if (hint) hint.style.display = 'none';

    const quoteBanner = document.getElementById('final-quote-banner');
    if (quoteBanner) quoteBanner.style.display = 'block';

    this.state.valuesFinaleDone = true;
    this.saveState();
  },

  openGrandTriumphModal: function() {
    this.playClickSound();
    const valuesOverlay = document.getElementById('story-values-finale-overlay');
    if (valuesOverlay) valuesOverlay.style.display = 'none';

    const triumphModal = document.getElementById('story-grand-triumph-modal');
    const rankEl = document.getElementById('triumph-stat-rank');
    const starsEl = document.getElementById('triumph-stat-stars');
    const relicsEl = document.getElementById('triumph-stat-relics');

    const totalStars = this.state.totalStars || 81;
    const relicCount = (this.state.relics && this.state.relics.length) || 27;

    if (rankEl) rankEl.innerText = totalStars >= 70 ? "Großmeister von Europa 👑" : "Europa-Botschafter 🎖️";
    if (starsEl) starsEl.innerText = `${totalStars} / 81 Sterne`;
    if (relicsEl) relicsEl.innerText = `${relicCount} / 27 Geborgen`;

    if (triumphModal) triumphModal.style.display = 'flex';
  },

  closeGrandTriumphModal: function() {
    this.playClickSound();
    const triumphModal = document.getElementById('story-grand-triumph-modal');
    if (triumphModal) triumphModal.style.display = 'none';
    this.showStoryHub();
  },

  launchEndingCreditsFromTriumph: function() {
    this.playClickSound();
    const triumphModal = document.getElementById('story-grand-triumph-modal');
    if (triumphModal) triumphModal.style.display = 'none';
    this.showGrandEndingMovieCredits();
  },

  startInteractiveEUActivation: function() {
    this.state.introSeen = true;
    this.saveState();
    this.showStoryHub();
    this.isEUActivationActive = true;
    this.activatedEUMembers = new Set();

    const banner = document.getElementById('story-eu-activation-banner');
    const counter = document.getElementById('eu-activation-count');
    if (banner) banner.style.display = 'block';
    if (counter) counter.innerText = `0 / 27 aktiviert`;

    // Visual hint for user
    const dock = document.querySelector('.story-dynamic-edge-dock');
    if (dock) dock.style.opacity = '0.5';
  },

  handleEUActivationClick: function(countryName) {
    if (!this.isEUActivationActive) return false;
    
    // Europaparlament is the finale station, the 27 EU nations are members
    if (countryName === "Europaparlament") {
      this.showItemDetailModal("👑", "Europaparlament", "Finale Station", "Das Europaparlament ist das Herz der Demokratie – es wird freigeschaltet, sobald alle Mitgliedsstaaten erkundet sind!", "EU-Zentrum");
      return true;
    }

    if (!this.activatedEUMembers.has(countryName)) {
      this.activatedEUMembers.add(countryName);
      try { if (typeof sounds !== 'undefined') sounds.playCorrect(); } catch(e) {}
      
      const counter = document.getElementById('eu-activation-count');
      if (counter) counter.innerText = `${this.activatedEUMembers.size} / 27 aktiviert`;

      // Highlight clicked node
      const nodes = document.querySelectorAll('.country-map-node');
      nodes.forEach(n => {
        if (n.innerText.includes(countryName)) {
          n.classList.add('activated-radar-glow');
        }
      });

      if (this.activatedEUMembers.size >= 27) {
        this.finishActivationChallenge();
      }
    }
    return true;
  },

  finishActivationChallenge: function() {
    this.isEUActivationActive = false;
    const banner = document.getElementById('story-eu-activation-banner');
    if (banner) banner.style.display = 'none';

    const dock = document.querySelector('.story-dynamic-edge-dock');
    if (dock) dock.style.opacity = '1';

    try { if (typeof sounds !== 'undefined' && typeof sounds.playVictorySound === 'function') sounds.playVictorySound(); } catch(e) {}

    this.showItemDetailModal(
      "🇪🇺",
      "Schengen-Radar Kalibriert!",
      "Alle 27 EU-Mitgliedsstaaten erfasst",
      "Hervorragend, Pilot! Alle 27 EU-Mitglieder sind online und unser Euro-Jet ist startklar für die große Relikt-Expedition!",
      "Radar Online 🚀"
    );
    this.renderCurrentView();
  },

  skipActivationChallenge: function() {
    this.finishActivationChallenge();
  },

  startCutscene: function(dialogueList, onComplete) {
    this.currentCutsceneQueue = [...dialogueList];
    this.cutsceneCallback = onComplete;
    
    const overlay = document.getElementById('story-cutscene-overlay');
    if (overlay) overlay.style.display = 'flex';
    this.showNextDialogue();
  },

  showNextDialogue: function() {
    if (this.isTyping) {
      this.completeTypingInstantly();
      return;
    }

    if (this.currentCutsceneQueue.length === 0) {
      const overlay = document.getElementById('story-cutscene-overlay');
      if (overlay) overlay.style.display = 'none';
      if (typeof this.cutsceneCallback === 'function') {
        this.cutsceneCallback();
      }
      return;
    }

    this.playClickSound();
    const item = this.currentCutsceneQueue.shift();
    
    const speakerEl = document.getElementById('cutscene-speaker');
    const avatarWrap = document.getElementById('cutscene-avatar-wrap');
    const avatarEl = document.getElementById('cutscene-avatar-img');
    const artWrap = document.getElementById('cutscene-artwork-wrap');
    const artImg = document.getElementById('cutscene-artwork-img');
    const titleEl = document.getElementById('cutscene-title');
    const textEl = document.getElementById('cutscene-text');

    if (speakerEl) speakerEl.innerText = item.speaker;
    if (titleEl) titleEl.innerText = item.title || "Expedition Europa";

    if (item.artwork) {
      if (artWrap) artWrap.style.display = 'block';
      if (artImg) artImg.src = item.artwork;
      if (avatarWrap) avatarWrap.style.display = 'none';
    } else {
      if (artWrap) artWrap.style.display = 'none';
      if (avatarWrap) avatarWrap.style.display = 'flex';
      if (avatarEl) avatarEl.src = item.avatar || "assets/story/pilot_klaus.jpg";
    }

    this.typewriterEffect(textEl, item.text);
  },

  typewriterEffect: function(element, fullText) {
    if (!element) return;
    element.innerHTML = "";
    this.isTyping = true;
    this.currentFullText = fullText;
    this.typingTarget = element;

    let idx = 0;
    clearInterval(this.typingInterval);
    this.typingInterval = setInterval(() => {
      if (idx < fullText.length) {
        element.innerHTML += fullText.charAt(idx);
        idx++;
      } else {
        clearInterval(this.typingInterval);
        this.isTyping = false;
      }
    }, 18);
  },

  completeTypingInstantly: function() {
    clearInterval(this.typingInterval);
    if (this.typingTarget && this.currentFullText) {
      this.typingTarget.innerHTML = this.currentFullText;
    }
    this.isTyping = false;
  },

  skipCutscene: function() {
    this.playClickSound();
    clearInterval(this.typingInterval);
    this.isTyping = false;
    this.currentCutsceneQueue = [];
    const overlay = document.getElementById('story-cutscene-overlay');
    if (overlay) overlay.style.display = 'none';
    if (typeof this.cutsceneCallback === 'function') {
      this.cutsceneCallback();
    }
  },

  // --- Fullscreen Celestial Constellation Hub („Die Konstellation Europas“) ---
  showStoryHub: function() {
    this.hideAllStoryScreens();
    document.body.classList.add('story-active');
    this.updateCurrentTargetStation();

    const hub = document.getElementById('story-hub-screen');
    if (hub) hub.style.display = 'block';

    this.syncAudioButtonState();
    this.initCelestialStarfield();
    this.renderCurrentView();

    // Sobald wir zurück im Weltall sind: Wenn ein Land gerade abgeschlossen wurde, starte den Flug!
    if (this.pendingStarFlight) {
      const countryToFly = this.pendingStarFlight;
      this.pendingStarFlight = null;
      setTimeout(() => {
        this.animateStarGlideToCircle(countryToFly, () => {
          this.renderCurrentView();
          const totalCompleted = this.expeditionRoute.filter(st => this.state.countries[st.name]?.completed).length;
          if (totalCompleted === this.expeditionRoute.length) {
            this.triggerClimaxCircleFormation(() => {
              this.showGrandEndingMovieCredits();
            });
          }
        });
      }, 350);
    }
  },

  initCelestialStarfield: function() {
    const canvas = document.getElementById('celestial-stars-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const starCount = 140;
    const stars = [];
    const colors = ['#ffffff', '#38bdf8', '#fbbf24', '#818cf8', '#fed7aa'];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        delta: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    if (this.starfieldAnimId) cancelAnimationFrame(this.starfieldAnimId);

    const drawStarfield = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(s => {
        s.alpha += s.delta;
        if (s.alpha > 0.95 || s.alpha < 0.2) s.delta = -s.delta;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0.15, Math.min(1, s.alpha));
        ctx.shadowBlur = s.r > 1.4 ? 6 : 0;
        ctx.shadowColor = s.color;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      this.starfieldAnimId = requestAnimationFrame(drawStarfield);
    };

    drawStarfield();
  },

  renderCurrentView: function() {
    const currentTarget = this.expeditionRoute[this.state.routeIndex] || this.expeditionRoute[0];
    const currentCh = this.chapters.find(c => c.id === currentTarget.chapter) || this.chapters[0];
    const relic = this.relicsDatabase[currentTarget.name];

    const completedCount = this.expeditionRoute.filter(st => this.state.countries[st.name]?.completed).length;

    // 1. Top HUD
    const badgeEl = document.getElementById('hud-chapter-indicator');
    const titleEl = document.getElementById('hud-chapter-name');
    const starEl = document.getElementById('story-hub-stars');
    if (badgeEl) badgeEl.innerText = `Kapitel ${currentCh.id}/5`;
    if (titleEl) titleEl.innerText = `${currentCh.icon} ${currentCh.name}`;
    if (starEl) starEl.innerText = `✨ ${completedCount} / 27 Sterne entzündet`;

    // 2. Non-blocking Edge Dock (Unten-Links)
    const tagEl = document.getElementById('dock-station-tag');
    const nameEl = document.getElementById('dock-target-name');
    const relicEl = document.getElementById('dock-relic-badge');
    const btnEl = document.getElementById('btn-story-launch');

    if (tagEl) tagEl.innerText = `${currentTarget.year || '1951'} • Station ${this.state.routeIndex + 1}/27`;
    if (nameEl) nameEl.innerHTML = `${currentTarget.flag} <b>${currentTarget.name}</b>`;
    if (relicEl) relicEl.innerHTML = `🏆 ${relic?.name || 'Artefakt'}`;
    if (btnEl) {
      if (this.devTestModeActive) {
        btnEl.innerHTML = `<span>Stern von ${currentTarget.name} entzünden</span> <span style="font-size:1.2rem;">✨</span> 
          <span style="margin-left:8px; font-size:0.78rem; background:rgba(14,165,233,0.3); border:1px solid #38bdf8; padding:3px 8px; border-radius:8px;" onclick="event.stopPropagation(); StoryMode.testReflectionDirectly(1)">💭 Reflexion</span>
          <span style="margin-left:6px; font-size:0.78rem; background:rgba(245,158,11,0.3); border:1px solid #fbbf24; padding:3px 8px; border-radius:8px;" onclick="event.stopPropagation(); StoryMode.testEndingDirectly()">👑 Finale</span>
          <span style="margin-left:6px; font-size:0.78rem; background:rgba(239,68,68,0.3); border:1px solid #ef4444; padding:3px 8px; border-radius:8px;" onclick="event.stopPropagation(); StoryMode.resetStoryProgress()">🔄 Reset</span>`;
      } else {
        btnEl.innerHTML = `<span>Stern von ${currentTarget.name} entzünden</span> <span style="font-size:1.2rem;">✨</span>`;
      }
    }

    this.renderCelestialConstellationHub(currentCh.id, currentTarget);
    this.renderCentralEUCircle();
  },

  // --- Zentraler 12-Sterne-Kreis der EU-Flagge im Sternenhimmel (Initial unsichtbar) ---
  renderCentralEUCircle: function() {
    const orbitContainer = document.getElementById('central-eu-stars-orbit');
    if (!orbitContainer) return;

    orbitContainer.innerHTML = "";

    const starCount = 12;
    const radius = 165;
    const center = 220;

    this.euFlagStarsDefinition.forEach((starDef, i) => {
      const angle = (i / starCount) * 2 * Math.PI - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);

      const totalInStar = starDef.countries.length;
      const completedInStar = starDef.countries.filter(c => 
        this.state.countries[c]?.completed && c !== this.pendingStarFlight
      ).length;

      // Am Anfang ist der Kreis nicht erkennbar - Sterne erscheinen erst, wenn Länder angeflogen sind
      if (completedInStar === 0 && !this.devTestModeActive) {
        return;
      }

      let stateClass = completedInStar === totalInStar ? "star-completed" : "star-partial";
      if (completedInStar === 0) stateClass = "star-unlit";

      const node = document.createElement('div');
      node.className = `central-orbit-star-node ${stateClass}`;
      node.id = `central-star-slot-${i}`;
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      node.innerHTML = `
        <span>★</span>
        <div class="central-star-badge">${completedInStar}/${totalInStar}</div>
      `;
      node.title = `${starDef.name} (${completedInStar}/${totalInStar} Länder vereint) - Klicke für Details!`;

      node.onclick = (e) => {
        e.stopPropagation();
        this.openStarDropdown(i, e);
      };

      orbitContainer.appendChild(node);
    });
  },

  openStarDropdown: function(starIndex, event) {
    this.playClickSound();
    const popover = document.getElementById('star-dropdown-popover');
    const titleEl = document.getElementById('star-dropdown-title');
    const statusEl = document.getElementById('star-dropdown-status');
    const bodyEl = document.getElementById('star-dropdown-body');
    const iconEl = document.getElementById('star-dropdown-icon');

    const starDef = this.euFlagStarsDefinition[starIndex];
    if (!popover || !starDef) return;

    const totalInStar = starDef.countries.length;
    const completedInStar = starDef.countries.filter(c => this.state.countries[c]?.completed).length;

    if (titleEl) titleEl.innerText = `Stern ${starDef.id}: ${starDef.name}`;
    if (statusEl) statusEl.innerText = `${completedInStar} / ${totalInStar} Länder vereint • ${starDef.subtitle}`;
    if (iconEl) iconEl.innerText = starDef.icon || "⭐";

    let rowsHTML = "";
    starDef.countries.forEach(countryName => {
      const stData = this.expeditionRoute.find(r => r.name === countryName);
      const isDone = !!this.state.countries[countryName]?.completed;
      const starsEarned = this.state.countries[countryName]?.stars || 0;
      const relic = this.relicsDatabase[countryName];

      const currentTarget = this.expeditionRoute[this.state.routeIndex] || this.expeditionRoute[0];
      const isCurrentTarget = (currentTarget && currentTarget.name === countryName);

      let statusActionHTML = "";
      if (isDone) {
        statusActionHTML = `<span style="color:#fbbf24; font-weight:800; font-size:0.85rem;">★ ${starsEarned}</span>`;
      } else if (isCurrentTarget) {
        statusActionHTML = `<button class="btn-main" style="padding:4px 10px; font-size:0.75rem; background:linear-gradient(135deg,#06b6d4,#3b82f6); border:none; color:#fff; border-radius:8px; font-weight:800; cursor:pointer;" onclick="StoryMode.closeStarDropdown(); StoryMode.continueStoryJourney();">Stern entzünden ➔</button>`;
      } else if (this.devTestModeActive) {
        statusActionHTML = `<button class="btn-main" style="padding:4px 8px; font-size:0.72rem; background:linear-gradient(135deg,#10b981,#059669); border:none; color:#fff; border-radius:8px; cursor:pointer;" onclick="StoryMode.quickWarpToCountry('${countryName}')">Test ⚡</button>`;
      } else {
        statusActionHTML = `<span style="font-size:0.72rem; color:#94a3b8; font-weight:700; background:rgba(255,255,255,0.06); padding:3px 8px; border-radius:6px;">🔒 Gesperrt</span>`;
      }

      rowsHTML += `
        <div class="star-dropdown-country-row">
          <div class="star-dropdown-country-info">
            <span class="star-dropdown-country-flag">${stData?.flag || '🇪🇺'}</span>
            <div>
              <div class="star-dropdown-country-name">${countryName}</div>
              <div class="star-dropdown-country-year">${stData?.year || ''} • 🏆 ${relic?.name || 'Artefakt'}</div>
            </div>
          </div>
          <div class="star-dropdown-country-status ${isDone ? 'completed' : 'locked'}">
            ${statusActionHTML}
          </div>
        </div>
      `;
    });

    if (bodyEl) bodyEl.innerHTML = rowsHTML;

    // Position popover directly under clicked central star node
    const clickedNode = document.getElementById(`central-star-slot-${starIndex}`) || event?.currentTarget;
    if (clickedNode) {
      const rect = clickedNode.getBoundingClientRect();
      const popoverWidth = 310;
      let left = rect.left + rect.width / 2 - popoverWidth / 2;
      let top = rect.bottom + 10;
      
      if (left < 15) left = 15;
      if (left + popoverWidth > window.innerWidth - 15) left = window.innerWidth - popoverWidth - 15;
      if (top + 280 > window.innerHeight) top = Math.max(10, rect.top - 290);

      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;
      popover.style.right = `auto`;
    }

    popover.style.display = 'block';
  },

  closeStarDropdown: function() {
    this.playClickSound();
    const popover = document.getElementById('star-dropdown-popover');
    if (popover) popover.style.display = 'none';
  },

  // --- Neues Info-Popup beim Klick auf beliebige / gesperrte Länder im All ---
  openCountryInfoPopover: function(countryName, event) {
    this.playClickSound();
    this.closeStarDropdown();
    const popover = document.getElementById('country-info-popover');
    const flagEl = document.getElementById('country-popover-flag');
    const nameEl = document.getElementById('country-popover-name');
    const chapterEl = document.getElementById('country-popover-chapter');
    const milestoneEl = document.getElementById('country-popover-milestone');
    const relicNameEl = document.getElementById('country-popover-relic-name');
    const relicDescEl = document.getElementById('country-popover-relic-desc');
    const relicIconEl = document.getElementById('country-popover-relic-icon');
    const actionEl = document.getElementById('country-popover-action-wrap');

    const stData = this.expeditionRoute.find(r => r.name === countryName);
    const relic = this.relicsDatabase[countryName];
    if (!popover || !stData) return;

    const isCurrentTarget = this.expeditionRoute[this.state.routeIndex]?.name === countryName;
    const isCompleted = !!this.state.countries[countryName]?.completed;
    const chapterData = this.chapters.find(c => c.id === stData.chapter);

    if (flagEl) flagEl.innerText = stData.flag || "🇪🇺";
    if (nameEl) nameEl.innerText = stData.name;
    if (chapterEl) chapterEl.innerText = `Kapitel ${stData.chapter} (${stData.year}) • ${chapterData?.name || ''}`;
    if (milestoneEl) milestoneEl.innerText = `${stData.milestone}: ${stData.sub}`;
    if (relicNameEl) relicNameEl.innerText = relic?.name || "Kulturgut";
    if (relicDescEl) relicDescEl.innerText = relic?.desc || "Europäisches Vermächtnis";
    if (relicIconEl) relicIconEl.innerText = relic?.icon || "🏆";

    if (actionEl) {
      if (isCurrentTarget) {
        actionEl.innerHTML = `<button class="btn-main" style="width:100%; padding:10px; font-weight:800; font-size:0.88rem; background:linear-gradient(135deg,#06b6d4,#3b82f6); border:none; color:#fff; border-radius:12px; cursor:pointer;" onclick="StoryMode.closeCountryInfoPopover(); StoryMode.continueStoryJourney();">🚀 Stern jetzt entzünden</button>`;
      } else if (isCompleted) {
        actionEl.innerHTML = `<div style="text-align:center; font-size:0.84rem; font-weight:800; color:#fbbf24;">✨ Bereits in der Konstellation vereint</div>`;
      } else if (this.devTestModeActive) {
        actionEl.innerHTML = `<button class="btn-main" style="width:100%; padding:8px; font-weight:800; font-size:0.84rem; background:linear-gradient(135deg,#10b981,#059669); border:none; color:#fff; border-radius:12px; cursor:pointer;" onclick="StoryMode.quickWarpToCountry('${countryName}')">⚡ Direkt starten (Test)</button>`;
      } else {
        actionEl.innerHTML = `<div style="text-align:center; font-size:0.82rem; font-weight:700; color:#94a3b8; background:rgba(255,255,255,0.06); padding:8px 12px; border-radius:10px;">🔒 Gesperrt • Folge der Reiseroute bis Kapitel ${stData.chapter}</div>`;
      }
    }

    // Position popover near clicked node
    if (event) {
      let clientX = event.clientX || (event.touches && event.touches[0]?.clientX) || window.innerWidth / 2;
      let clientY = event.clientY || (event.touches && event.touches[0]?.clientY) || window.innerHeight / 2;
      const popoverWidth = 320;
      let left = clientX - popoverWidth / 2;
      let top = clientY + 15;

      if (left < 15) left = 15;
      if (left + popoverWidth > window.innerWidth - 15) left = window.innerWidth - popoverWidth - 15;
      if (top + 260 > window.innerHeight) top = Math.max(15, clientY - 260);

      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;
    }

    popover.style.display = 'block';
  },

  closeCountryInfoPopover: function() {
    this.playClickSound();
    const popover = document.getElementById('country-info-popover');
    if (popover) popover.style.display = 'none';
  },

  quickWarpToCountry: function(countryName) {
    if (!this.devTestModeActive) return;
    this.closeStarDropdown();
    this.closeCountryInfoPopover();
    const stIdx = this.expeditionRoute.findIndex(r => r.name === countryName);
    if (stIdx !== -1) {
      this.state.routeIndex = stIdx;
      this.saveState();
      this.renderCurrentView();
      this.continueStoryJourney();
    }
  },

  // --- Gleit-Animation eines Sterns bei Missionsabschluss in den zentralen EU-Kreis ---
  animateStarGlideToCircle: function(countryName, onDone) {
    const container = document.getElementById('story-star-glide-container');
    const stData = this.expeditionRoute.find(r => r.name === countryName);
    const starDefIndex = this.euFlagStarsDefinition.findIndex(def => def.countries.includes(countryName));

    if (!container || !stData) {
      if (typeof onDone === 'function') onDone();
      return;
    }

    const contW = container.clientWidth || window.innerWidth;
    const contH = container.clientHeight || window.innerHeight;

    // Exakte Startposition im lokalen Koordinatensystem des Containers
    const startX = (stData.x / 1000) * contW;
    const startY = (stData.y / 1000) * contH;

    // Exakte Zielposition im 12er-Kreis
    const starCount = 12;
    const radius = 165;
    const angle = (starDefIndex / starCount) * 2 * Math.PI - Math.PI / 2;
    const centerX = contW / 2;
    const centerY = contH / 2;
    const targetX = centerX + radius * Math.cos(angle);
    const targetY = centerY + radius * Math.sin(angle);

    const particle = document.createElement('div');
    particle.className = 'gliding-star-particle';
    particle.innerHTML = `<div class="star-stardust-glow"></div><span>★</span>`;
    particle.style.transform = `translate3d(${startX}px, ${startY}px, 0) scale(1)`;
    particle.style.opacity = '1';
    container.appendChild(particle);

    try {
      if (typeof sounds !== 'undefined' && typeof sounds.playSuccess === 'function') {
        sounds.playSuccess();
      }
    } catch(e) {}

    // Fließender, punktgenauer Flug ohne Versatz
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        particle.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(1.6)`;
      });
    });

    setTimeout(() => {
      particle.style.opacity = '0';
      
      // Slot aufleuchten lassen
      this.pendingStarFlight = null;
      this.renderCentralEUCircle();
      const targetSlot = document.getElementById(`central-star-slot-${starDefIndex}`);
      if (targetSlot) {
        targetSlot.classList.add('landing-flash');
        setTimeout(() => targetSlot.classList.remove('landing-flash'), 800);
      }

      try {
        if (typeof triggerConfetti === 'function') triggerConfetti();
        if (typeof sounds !== 'undefined' && typeof sounds.playWin === 'function') {
          sounds.playWin();
        }
      } catch(e) {}

      setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
        this.renderCelestialConstellationHub(this.state.currentChapter, this.expeditionRoute[this.state.routeIndex]);
        if (typeof onDone === 'function') onDone();
      }, 350);
    }, 1500);
  },

  renderCelestialConstellationHub: function(chapterId, currentTarget) {
    const nodesContainer = document.getElementById('story-map-nodes');
    const svgOverlay = document.getElementById('story-constellation-svg');
    if (!nodesContainer) return;

    nodesContainer.innerHTML = "";
    if (svgOverlay) svgOverlay.innerHTML = ""; // Keine störenden Verbindungslinien mehr

    // Render ungelöste Ländersterne im All (Vollendete Länder sind in die Mitte absorbiert)
    this.expeditionRoute.forEach((st) => {
      const isCompleted = !!this.state.countries[st.name]?.completed;

      // Wenn das Land abgeschlossen ist, ist sein Stern in den zentralen Kreis absorbiert
      // Ausnahme: Wenn dieser Stern gerade frisch im All abfliegen soll (pendingStarFlight)
      if (isCompleted && st.name !== this.pendingStarFlight) {
        return;
      }

      const xPct = (st.x / 1000) * 100;
      const yPct = (st.y / 1000) * 100;

      const isTarget = st.name === currentTarget.name;
      const isCurrentChapter = st.chapter === chapterId;
      const isLocked = !this.devTestModeActive && !isTarget;

      const nodeEl = document.createElement('div');
      
      let stateClass = isTarget ? "star-active-target" : (isCurrentChapter ? "star-chapter-active" : "star-unlit");

      nodeEl.className = `celestial-star-node ${stateClass} ${isCurrentChapter ? 'chapter-active-highlight' : 'other-chapter'}`;
      nodeEl.style.left = `${xPct}%`;
      nodeEl.style.top = `${yPct}%`;

      const labelPosClass = st.labelPos ? `label-pos-${st.labelPos}` : 'label-pos-right';

      nodeEl.innerHTML = `
        <div class="star-core-wrap">
          <div class="star-halo-glow"></div>
          <div class="star-disc">
            <span>${isTarget || isCurrentChapter || this.devTestModeActive ? st.flag : '✨'}</span>
            ${isLocked ? `<div class="star-lock-badge">🔒</div>` : ''}
          </div>
        </div>
      `;

      nodeEl.onclick = (e) => {
        e.stopPropagation();
        this.openCountryInfoPopover(st.name, e);
      };

      nodesContainer.appendChild(nodeEl);
    });
  },

  // --- Direkter, eleganter Sternen-Zoom ins Quiz (Keine störenden Zwischenfenster) ---
  continueStoryJourney: function() {
    this.playClickSound();

    const allCompleted = this.expeditionRoute.every(st => this.state.countries[st.name]?.completed);
    if (allCompleted) {
      this.playValuesFinale(() => {
        this.openGrandTriumphModal();
      });
      return;
    }

    const targetStation = this.expeditionRoute[this.state.routeIndex] || this.expeditionRoute[0];
    
    // Check chapter transitional events
    if (targetStation.chapter === 3 && !this.state.wallBroken) {
      this.playWallBreakEvent(() => {
        this.continueStoryJourney();
      });
      return;
    }

    if (targetStation.chapter === 4 && !this.state.tenStarsMinigameDone) {
      this.playTenStarsMinigame(() => {
        this.continueStoryJourney();
      });
      return;
    }

    // Finde den Zielstern auf dem Bildschirm und starte den Zoom
    const targetNode = document.querySelector('.celestial-star-node.star-active-target');
    if (targetNode) {
      targetNode.classList.add('star-zoom-launch');
    }

    try {
      if (typeof sounds !== 'undefined' && typeof sounds.playFlightTakeoffSound === 'function') {
        sounds.playFlightTakeoffSound();
      }
    } catch(e) {}

    setTimeout(() => {
      if (targetNode) targetNode.classList.remove('star-zoom-launch');
      this.startCountryMission(targetStation.name);
    }, 380);
  },

  openPassport: function(event) {
    this.playClickSound();
    const modal = document.getElementById('story-item-detail-modal');
    const body = document.getElementById('story-item-detail-body');
    if (!modal || !body) return;

    const totalStations = this.expeditionRoute.length;
    const completedCount = Object.keys(this.state.countries).filter(k => this.state.countries[k]?.completed).length;

    let stampsGridHTML = '<div class="passport-stamps-gallery">';
    this.expeditionRoute.forEach(st => {
      const isStamped = !!this.state.countries[st.name]?.completed;
      const stars = this.state.countries[st.name]?.stars || 0;
      stampsGridHTML += `
        <div class="passport-stamp-slot ${isStamped ? 'stamped' : 'unstamped'}">
          <div style="font-size:1.5rem;">${isStamped ? st.flag : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'}</div>
          <div style="font-size:0.75rem; font-weight:800; color:#fff; margin-top:2px;">${st.name}</div>
          <div style="font-size:0.65rem; color:#f59e0b;">${isStamped ? '★'.repeat(stars) : 'Noch unbeleuchtet'}</div>
        </div>
      `;
    });
    stampsGridHTML += '</div>';

    body.innerHTML = `
      <div style="display:inline-flex; align-items:center; justify-content:center; width:58px; height:58px; border-radius:18px; background:rgba(6,182,212,0.15); border:1.5px solid #06b6d4; margin:0 auto 10px; color:#38bdf8;">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg>
      </div>
      <div style="font-size: 0.78rem; text-transform: uppercase; color: #38bdf8; font-weight: 800; letter-spacing: 1px; margin-bottom: 4px;">Offizielles Reisedokument</div>
      <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.45rem; margin: 0 0 4px 0; color: #ffffff; font-weight: 800;">Europäischer Schengen-Reisepass</h3>
      <div style="font-size: 0.85rem; color: #94a3b8; font-weight: 600; margin-bottom: 14px;">Entzündete Sterne: ${completedCount} / ${totalStations} Stationen</div>
      
      <div style="max-height: 280px; overflow-y: auto; padding: 4px 6px; margin-bottom: 18px; border-radius: 16px; background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.1);">
        ${stampsGridHTML}
      </div>

      <button class="btn-main" style="background: linear-gradient(135deg, #06b6d4, #3b82f6); color:#fff; border:none; width:100%; padding:12px; font-weight:800; border-radius:14px; cursor:pointer;" onclick="StoryMode.closeItemDetailModal()">
        Reisepass Schließen ✕
      </button>
    `;
    this.openModalWithOrigin('story-item-detail-modal', '.control-center-panel', event?.currentTarget || document.getElementById('dock-passport-btn'));
  },

  // --- Start Adventure Mission (Bridged to StoryAdventureEngine) ---
  startCountryMission: function(countryName) {
    if (typeof StoryAdventureEngine !== 'undefined') {
      StoryAdventureEngine.startAdventure(countryName);
    } else {
      this.state.activeCountry = countryName;
      this.state.activeStageIndex = 0;
      this.state.stageScore = 0;
      this.state.stageErrors = 0;
      this.loadStageQuestion();
    }
  },

  loadStageQuestion: function() {
    this.hideAllStoryScreens();
    const stageScreen = document.getElementById('story-stage-screen');
    if (stageScreen) stageScreen.style.display = 'flex';

    const feedbackBanner = document.getElementById('story-feedback-banner');
    if (feedbackBanner) {
      feedbackBanner.className = '';
      feedbackBanner.style.display = 'none';
    }

    const pill1 = document.getElementById('story-stage-pill-1');
    const pill2 = document.getElementById('story-stage-pill-2');
    const pill3 = document.getElementById('story-stage-pill-3');
    [pill1, pill2, pill3].forEach((p, idx) => {
      if (p) {
        p.className = `stage-step-pill ${idx === this.state.activeStageIndex ? 'active' : (idx < this.state.activeStageIndex ? 'completed' : '')}`;
      }
    });

    const countryName = this.state.activeCountry;
    const station = this.expeditionRoute.find(st => st.name === countryName);
    const flag = station?.flag || "🇪🇺";

    const titleEl = document.getElementById('story-stage-header');
    if (titleEl) titleEl.innerHTML = `${flag} ${countryName} — Etappe ${this.state.activeStageIndex + 1}/3`;

    const qData = this.getCountryQuestion(countryName, this.state.activeStageIndex + 1);
    const qTextEl = document.getElementById('story-stage-question-text');
    const optContainer = document.getElementById('story-stage-options');

    if (qTextEl) qTextEl.innerText = qData.question;
    if (optContainer) {
      optContainer.innerHTML = "";
      qData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'story-answer-btn';
        btn.innerHTML = `<span style="opacity:0.75; font-weight:800; font-family:'Space Grotesk',sans-serif;">${String.fromCharCode(65 + idx)}.</span> <span>${opt}</span>`;
        btn.onclick = () => this.handleStageAnswer(idx === qData.correctIndex, btn, qData.correctIndex, optContainer, qData.lore);
        optContainer.appendChild(btn);
      });
    }
  },

  getCountryQuestion: function(countryName, stageNum) {
    const stageIdx = stageNum - 1;
    const poolObj = (typeof StoryQuestionsPool !== 'undefined' && StoryQuestionsPool) ? StoryQuestionsPool : (typeof window !== 'undefined' ? window.StoryQuestionsPool : null);

    if (poolObj && poolObj[countryName]) {
      const storyQ = poolObj[countryName][stageIdx] || poolObj[countryName][0];
      if (storyQ) {
        return {
          type: storyQ.type || "choice",
          title: storyQ.title || `Etappe ${stageNum}`,
          q: storyQ.q,
          question: storyQ.q,
          options: (storyQ.options && storyQ.options.length > 0) ? [...storyQ.options] : (storyQ.o ? [...storyQ.o] : []),
          o: (storyQ.options && storyQ.options.length > 0) ? [...storyQ.options] : (storyQ.o ? [...storyQ.o] : []),
          a: storyQ.a !== undefined ? storyQ.a : 0,
          correctIndex: storyQ.a !== undefined ? storyQ.a : 0,
          lore: storyQ.lore || storyQ.exp || "",
          items: storyQ.items ? JSON.parse(JSON.stringify(storyQ.items)) : [],
          requiredCount: storyQ.requiredCount || 6,
          images: storyQ.images ? JSON.parse(JSON.stringify(storyQ.images)) : [],
          doors: storyQ.doors ? JSON.parse(JSON.stringify(storyQ.doors)) : [],
          code: storyQ.code ? [...storyQ.code] : [],
          targetCountry: storyQ.targetCountry || ""
        };
      }
    }


    return {
      type: "choice",
      title: `Etappe ${stageNum}`,
      q: `Welche historische Weichenstellung prägte die Rolle von ${countryName} in Europa?`,
      question: `Welche historische Weichenstellung prägte die Rolle von ${countryName} in Europa?`,
      options: [
        `${countryName} trat für Frieden, Rechtsstaatlichkeit und den gemeinsamen Markt ein.`,
        `${countryName} lehnte jegliche völkerrechtliche Verträge im Nachkriegseuropa ab.`,
        `${countryName} zog sich vollständig aus den europäischen Handelsbündnissen zurück.`,
        `${countryName} verweigerte die diplomatische Zusammenarbeit mit den Nachbarstaaten.`
      ],
      o: [
        `${countryName} trat für Frieden, Rechtsstaatlichkeit und den gemeinsamen Markt ein.`,
        `${countryName} lehnte jegliche völkerrechtliche Verträge im Nachkriegseuropa ab.`,
        `${countryName} zog sich vollständig aus den europäischen Handelsbündnissen zurück.`,
        `${countryName} verweigerte die diplomatische Zusammenarbeit mit den Nachbarstaaten.`
      ],
      a: 0,
      correctIndex: 0,
      lore: "Europäische Einigung basiert auf Demokratie und gegenseitigem Respekt."
    };
  },

  formatQuestion: function(rawQ) {
    if (!rawQ || !rawQ.o) return rawQ;
    const originalOptions = [...rawQ.o];
    const correctText = originalOptions[rawQ.a !== undefined ? rawQ.a : 0];

    const shuffledOptions = [...originalOptions];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }
    const newCorrectIdx = shuffledOptions.indexOf(correctText);

    return {
      question: rawQ.q,
      options: shuffledOptions,
      correctIndex: newCorrectIdx,
      lore: rawQ.exp || rawQ.lore || ""
    };
  },

  handleStageAnswer: function(isCorrect, clickedBtn, correctIdx, container, loreText) {
    const allBtns = container.querySelectorAll('.story-answer-btn');
    allBtns.forEach(b => b.disabled = true);

    const feedbackBanner = document.getElementById('story-feedback-banner');

    if (isCorrect) {
      try {
        if (typeof sounds !== 'undefined' && typeof sounds.playSuccess === 'function') sounds.playSuccess();
      } catch(e) {}
      clickedBtn.classList.add('answer-correct');
      this.state.stageScore += 100;

      if (feedbackBanner) {
        feedbackBanner.className = 'correct';
        feedbackBanner.innerHTML = `✅ <b>Hervorragend! Richtig geantwortet!</b><br><span style="font-weight:400; font-size:0.88rem;">${loreText || ''}</span>`;
      }
    } else {
      this.playErrorSound();
      clickedBtn.classList.add('answer-wrong');
      this.state.stageErrors++;

      if (allBtns[correctIdx]) {
        allBtns[correctIdx].classList.add('answer-correct');
      }

      if (feedbackBanner) {
        feedbackBanner.className = 'wrong';
        feedbackBanner.innerHTML = `❌ <b>Leider nicht ganz richtig!</b><br><span style="font-weight:400; font-size:0.88rem;">${loreText || ''}</span>`;
      }
    }

    setTimeout(() => {
      if (this.state.activeStageIndex < 2) {
        this.state.activeStageIndex++;
        this.loadStageQuestion();
      } else {
        this.finishCountryMission();
      }
    }, 1800);
  },

  finishCountryMission: function() {
    try {
      const countryName = this.state.activeCountry;
      const relic = this.relicsDatabase[countryName];

      // Mastery Check: If player answered ALL 3 questions wrong, require retry!
      if (this.state.stageErrors >= 3) {
        this.playErrorSound();
        this.showItemDetailModal(
          "🔄",
          "Mission nicht bestanden",
          countryName,
          "Du hast leider keine der historischen Fragen richtig beantwortet. Um das Schengen-Visum und das Relikt zu erhalten, musst du mindestens 1 Frage meistern!\n\nLass uns die Station noch einmal gemeinsam versuchen!",
          "Wiederholung erforderlich"
        );
        this.startCountryMission(countryName);
        return;
      }

      let earnedStars = 3;
      if (this.state.stageErrors === 1) earnedStars = 2;
      else if (this.state.stageErrors === 2) earnedStars = 1;

      const prevData = this.state.countries[countryName] || { stars: 0 };
      this.state.countries[countryName] = {
        completed: true,
        stars: Math.max(prevData.stars, earnedStars),
        bestScore: Math.max(prevData.bestScore || 0, this.state.stageScore)
      };

      const isNewRelic = relic && !this.state.relics.includes(countryName);
      if (isNewRelic) {
        this.state.relics.push(countryName);
      }

      if (typeof UserProfile !== 'undefined' && typeof UserProfile.addXP === 'function') {
        UserProfile.addXP(earnedStars * 50, `Expedition: ${countryName}`);
      }

      this.saveState();
      this.updateCurrentTargetStation();

      // Merke das Land für den Flug im All nach Bestätigung aller Belohnungen
      this.pendingStarFlight = countryName;

      // 1. ZUERST: Map im Hintergrund sofort voll aktivieren & anzeigen!
      // Dadurch ist die Europakarte BEREITS VOLLSTÄNDIG SICHTBAR hinter dem Stempel-Modal
      // und es gibt beim Klick auf 'Weiter' keinen weißen Bildschirm!
      document.body.classList.add('story-active');
      const hub = document.getElementById('story-hub-screen');
      if (hub) hub.style.display = 'block';
      this.renderCurrentView();
      this.initCelestialStarfield();
      this.syncAudioButtonState();

      // 2. Jetzt die Schengen Passport Stamp Ceremony zentriert auf der Karte anzeigen:
      this.showPassportStampCeremony(countryName, earnedStars, () => {
        const currentStation = this.expeditionRoute.find(st => st.name === countryName);
        const chapterId = currentStation?.chapter || 1;
        const allInChapter = this.expeditionRoute.filter(st => st.chapter === chapterId);
        const chapterCleared = allInChapter.every(st => this.state.countries[st.name]?.completed);
        const isNewChapterClear = chapterCleared && !this.state.clearedChapters.includes(chapterId);

        if (isNewChapterClear) {
          this.state.clearedChapters.push(chapterId);
          this.saveState();
          const chData = this.chapters.find(c => c.id === chapterId);
          this.showChapterClimaxCeremony(chData, () => {
            // Zeige die Werte- & Reflexionsseite für den Schulunterricht
            this.showChapterReflection(chapterId, () => {
              if (chapterId === 2 && !this.state.wallBroken) {
                this.playWallBreakEvent(() => {
                  this.showStoryHub();
                });
              } else if (chapterId === 3 && !this.state.tenStarsMinigameDone) {
                this.playTenStarsMinigame(() => {
                  this.showStoryHub();
                });
              } else if (chapterId === 5 || this.expeditionRoute.every(st => this.state.countries[st.name]?.completed)) {
                this.playValuesFinale(() => {
                  this.openGrandTriumphModal();
                });
              } else {
                this.showStoryHub();
              }
            });
          });
        } else {
          const allCompleted = this.expeditionRoute.every(st => this.state.countries[st.name]?.completed);
          if (allCompleted && !this.state.valuesFinaleDone) {
            this.playValuesFinale(() => {
              this.openGrandTriumphModal();
            });
          } else {
            // Direkt die Sternen-Flug-Animation starten, da die Karte bereits da ist!
            if (this.pendingStarFlight) {
              const countryToFly = this.pendingStarFlight;
              this.pendingStarFlight = null;
              this.animateStarGlideToCircle(countryToFly, () => {
                this.renderCurrentView();
              });
            } else {
              this.renderCurrentView();
            }
          }
        }
      });
    } catch (err) {
      console.error("Fehler beim Beenden der Mission:", err);
      this.showStoryHub();
    }
  },

  showPassportStampCeremony: function(countryName, stars, onComplete) {
    this.playWinSound();
    const modal = document.getElementById('story-schengen-modal');
    const stampText = document.getElementById('schengen-stamp-text');
    const countryTitle = document.getElementById('schengen-country-title');

    const station = this.expeditionRoute.find(st => st.name === countryName);

    if (stampText) stampText.innerHTML = `${station?.flag || '🇪🇺'}<br>SCHENGEN<br><b>${countryName.toUpperCase()}</b>`;
    if (countryTitle) countryTitle.innerText = `Visum gestempelt: ${countryName}`;

    if (modal) {
      this.passportStampCallback = onComplete;
      // Stempel-Modal zentriert öffnen, OHNE Dock-Drawer-Zoom
      modal.classList.remove('cc-overlay-animate-in', 'cc-overlay-animate-out');
      const card = modal.querySelector('.passport-stamp-card');
      if (card) {
        card.classList.remove('cc-panel-zoom-in', 'cc-panel-zoom-out');
        card.style.transformOrigin = 'center center';
      }
      modal.style.display = 'flex';
      modal.classList.add('modal-active');
    } else {
      onComplete();
    }
  },

  closePassportStamp: function() {
    this.playClickSound();
    const modal = document.getElementById('story-schengen-modal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('modal-active');
    }
    if (typeof this.passportStampCallback === 'function') {
      const cb = this.passportStampCallback;
      this.passportStampCallback = null;
      cb();
    }
  },

  showRelicCelebration: function(countryName, relic, stars, onDone) {
    this.playWinSound();
    const modal = document.getElementById('story-celebration-modal');
    const iconEl = document.getElementById('celebration-icon');
    const titleEl = document.getElementById('celebration-title');
    const descEl = document.getElementById('celebration-desc');
    const starsEl = document.getElementById('celebration-stars');

    if (iconEl) iconEl.innerHTML = this.getRelicSmallSVG(relic?.name);
    if (titleEl) titleEl.innerText = `${countryName} Abgeschlossen!`;
    if (descEl) descEl.innerHTML = `Du hast das Relikt <b>${relic?.name || 'Artefakt'}</b> geborgen!<br><span style="font-size:0.85rem; opacity:0.85; display:block; margin-top:6px;">${relic?.desc || ''}</span>`;
    if (starsEl) starsEl.innerText = '★'.repeat(stars) + '☆'.repeat(3 - stars);

    if (modal) {
      this.celebrationCallback = onDone;
      modal.classList.remove('cc-overlay-animate-in', 'cc-overlay-animate-out');
      const card = modal.querySelector('.celebration-card');
      if (card) {
        card.classList.remove('cc-panel-zoom-in', 'cc-panel-zoom-out');
        card.style.transformOrigin = 'center center';
      }
      modal.style.display = 'flex';
    } else {
      onDone();
    }
  },

  closeCelebrationModal: function() {
    this.playClickSound();
    const modal = document.getElementById('story-celebration-modal');
    if (modal) modal.style.display = 'none';
    if (typeof this.celebrationCallback === 'function') {
      const cb = this.celebrationCallback;
      this.celebrationCallback = null;
      cb();
    }
  },

  showChapterClimaxCeremony: function(chapter, onComplete) {
    this.playWinSound();
    
    if (typeof triggerConfetti === 'function') {
      try { triggerConfetti(); } catch (e) {}
    }

    let dialogue;
    if (chapter.id === 1) {
      dialogue = [
        {
          speaker: "Expedition Europa • 1957",
          avatar: "assets/story/pilot_klaus.jpg",
          title: "⭐ 1957 – Das Licht über Europa",
          text: "1957.\nSechs Sterne leuchten über dem zerstörten Europa."
        },
        {
          speaker: "Die sechs Gründer",
          avatar: "assets/story/pilot_klaus.jpg",
          title: "Aus Feinden werden Partner",
          text: "Frankreich hat eine Idee gewagt.\nDeutschland hat sich auf Zusammenarbeit eingelassen.\nItalien hat Europa ein neues Fundament gegeben.\nBelgien, Luxemburg und die Niederlande haben gezeigt, dass auch kleine Länder Großes bewegen können."
        },
        {
          speaker: "Der Blick in die Zukunft",
          avatar: "assets/story/pilot_klaus.jpg",
          title: "Der Weg geht weiter",
          text: "Doch Europa ist noch lange nicht vereint.\n\nSechs Länder sind erst der Anfang.\n\nAm Horizont warten bereits die nächsten Sterne …"
        }
      ];
    } else {
      dialogue = [
        {
          speaker: "Bot Klaus",
          avatar: "assets/story/pilot_klaus.jpg",
          title: `🏆 KAPITEL ${chapter.id} VOLLENDET!`,
          text: `SPEKTAKULÄR! Du hast alle Sterne von '${chapter.name}' am Himmel entzündet!`
        },
        {
          speaker: "Bot Klaus",
          avatar: "assets/story/pilot_klaus.jpg",
          title: `Belohnung: ${chapter.climaxReward}`,
          text: `${chapter.climaxLore} Dein Europapass wurde mit +250 Bonus-XP veredelt!`
        }
      ];
    }

    if (typeof UserProfile !== 'undefined' && typeof UserProfile.addXP === 'function') {
      UserProfile.addXP(250, `Kapitel ${chapter.id} Meister`);
    }

    this.startCutscene(dialogue, onComplete);
  },

  // --- NEU: Werte- & Reflexionsseiten (PH Steiermark Bildungsstandard) ---
  showChapterReflection: function(chapterId, onDone) {
    const modal = document.getElementById('story-reflection-modal');
    const titleEl = document.getElementById('reflection-chapter-title');
    const impulseEl = document.getElementById('reflection-impulse-text');
    const questionEl = document.getElementById('reflection-discussion-text');

    const data = this.reflectionsDatabase[chapterId] || this.reflectionsDatabase[1];

    if (titleEl) titleEl.innerText = data.title;
    if (impulseEl) impulseEl.innerText = data.impulse;
    if (questionEl) questionEl.innerText = data.question;

    this.reflectionCallback = onDone;

    try {
      if (typeof sounds !== 'undefined' && typeof sounds.playSuccess === 'function') {
        sounds.playSuccess();
      }
    } catch(e) {}

    if (modal) modal.style.display = 'flex';
    else if (typeof onDone === 'function') onDone();
  },

  proceedAfterReflection: function() {
    this.playClickSound();
    const modal = document.getElementById('story-reflection-modal');
    if (modal) modal.style.display = 'none';
    if (typeof this.reflectionCallback === 'function') {
      this.reflectionCallback();
    }
  },

  // --- Climax Minigame: 2 Sternen-Wellen & Schnell Tippen ---
  triggerClimaxCircleFormation: function(onComplete) {
    this.showStoryHub();
    this.renderCurrentView();
    
    // 1. Zuerst 2 Wellen um die 12 Sterne des Kreises
    this.runCircleWavePulses(() => {
      // 2. Danach das interaktive Schnell-Tippen im Zentrum des Kreises
      this.startRapidTapMinigame(() => {
        // 3. Danach Übergang in den 3D-Flip-Up Abspann
        this.playGrandConstellationFinale(onComplete);
      });
    });
  },

  runCircleWavePulses: function(onDone) {
    const starNodes = document.querySelectorAll('.central-orbit-star-node');
    if (!starNodes || starNodes.length === 0) {
      if (typeof onDone === 'function') onDone();
      return;
    }

    try {
      if (typeof sounds !== 'undefined' && typeof sounds.playSuccess === 'function') {
        sounds.playSuccess();
      }
    } catch(e) {}

    // 2 volle Wellen-Runden um die 12 Sterne
    const starCount = starNodes.length;
    const waveDelayPerStar = 110; // ms
    const totalWaveDuration = (starCount * waveDelayPerStar * 2) + 600;

    for (let wave = 0; wave < 2; wave++) {
      starNodes.forEach((node, idx) => {
        const delay = wave * (starCount * waveDelayPerStar) + (idx * waveDelayPerStar);
        setTimeout(() => {
          node.classList.add('wave-pulsing');
          setTimeout(() => {
            node.classList.remove('wave-pulsing');
          }, 450);
        }, delay);
      });
    }

    setTimeout(() => {
      if (typeof onDone === 'function') onDone();
    }, totalWaveDuration);
  },

  startRapidTapMinigame: function(onDone) {
    this.rapidTapCallback = onDone;
    this.rapidTapProgress = 0;
    
    const minigameEl = document.getElementById('story-rapid-tap-minigame');
    const fillEl = document.getElementById('rapid-tap-fill');
    const counterEl = document.getElementById('rapid-tap-counter');
    
    if (fillEl) fillEl.style.width = '0%';
    if (counterEl) counterEl.innerText = '0%';
    if (minigameEl) {
      minigameEl.style.display = 'flex';
      minigameEl.classList.remove('rapid-tap-completed');
    }

    try {
      if (typeof sounds !== 'undefined' && typeof sounds.playClick === 'function') {
        sounds.playClick();
      }
    } catch(e) {}
  },

  handleRapidTap: function(event) {
    if (event) event.stopPropagation();
    if (this.rapidTapProgress >= 100) return;

    this.rapidTapProgress = Math.min(100, this.rapidTapProgress + 18);
    
    const fillEl = document.getElementById('rapid-tap-fill');
    const counterEl = document.getElementById('rapid-tap-counter');
    const minigameEl = document.getElementById('story-rapid-tap-minigame');

    if (fillEl) fillEl.style.width = `${this.rapidTapProgress}%`;
    if (counterEl) counterEl.innerText = `${Math.round(this.rapidTapProgress)}%`;

    if (minigameEl) {
      minigameEl.classList.add('tap-hit');
      setTimeout(() => minigameEl.classList.remove('tap-hit'), 150);
    }

    try {
      if (typeof sounds !== 'undefined' && typeof sounds.playClick === 'function') {
        sounds.playClick();
      }
    } catch(e) {}

    if (this.rapidTapProgress >= 100) {
      if (minigameEl) {
        minigameEl.classList.add('rapid-tap-completed');
      }

      setTimeout(() => {
        if (minigameEl) minigameEl.style.display = 'none';
        this.triggerSupernovaFlash(() => {
          this.showGrandEndingMovieCredits();
        });
      }, 500);
    }
  },

  triggerSupernovaFlash: function(onDone) {
    const flashEl = document.getElementById('story-supernova-flash');
    try {
      if (typeof triggerConfetti === 'function') {
        triggerConfetti();
        setTimeout(triggerConfetti, 500);
      }
      if (typeof sounds !== 'undefined' && typeof sounds.playWin === 'function') {
        sounds.playWin();
      }
    } catch(e) {}

    if (flashEl) {
      flashEl.style.display = 'block';
      setTimeout(() => {
        flashEl.style.display = 'none';
        if (typeof onDone === 'function') onDone();
      }, 1400);
    } else {
      if (typeof onDone === 'function') onDone();
    }
  },

  // --- Grand Finale: 3D PowerPoint-Morph Flip-Up Karussell („In Vielfalt geeint“) ---
  playGrandConstellationFinale: function(onComplete) {
    const overlay = document.getElementById('story-constellation-ring-overlay');
    const turntable = document.getElementById('morph-carousel-turntable');
    const titleEl = document.getElementById('constellation-ring-title');
    const subEl = document.getElementById('constellation-ring-subtitle');

    if (!overlay || !turntable) {
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    this.finaleCallback = onComplete;
    turntable.innerHTML = "";
    if (titleEl) titleEl.innerText = "In Vielfalt geeint";
    if (subEl) subEl.innerText = "27 Demokratien • Ein vereinter Kontinent • Das historische Vermächtnis";

    // 12 Cards data distributed across the 12 Morphed Stars (Prominente Danksagung, Team & Auszeichnungen)
    this.morphCreditsData = [
      { badge: "❤️ HERZLICHEN DANK", role: "Für deinen Einsatz für Europa", name: "Danke fürs Mitspielen!" },
      { badge: "💻 LEAD ARCHITECTURE", role: "Lead Development & Code", name: "Thiemo Greger" },
      { badge: "📜 CONTENT & STRATEGIE", role: "Content & Strategy", name: "David Schwarz" },
      { badge: "🎮 GAME DESIGN", role: "Game Design & Questions", name: "Matthias Hackl" },
      { badge: "🚀 CONTENT & STRATEGIE", role: "Content & Strategy", name: "Noah Leitz" },
      { badge: "🎓 PÄDAGOGIK", role: "Pädagogische Konzeption", name: "PH Steiermark" },
      { badge: "🏫 INITIATIVE", role: "Europabildung im Unterricht", name: "Europa im Klassenzimmer" },
      { badge: "🏆 WETTBEWERB", role: "Auszeichnung 2026", name: "Steirischer Europapreis" },
      { badge: "👑 DEIN HISTORISCHER RANG", role: "Auszeichnung", name: this.state.totalStars >= 70 ? "Großmeister von Europa" : "Europa-Botschafter" },
      { badge: "⭐ 27 STAATEN VEREINT", role: "Europäische Union", name: "Die Konstellation ist vollendet" },
      { badge: "🕊️ LEITGEDANKE", role: "Motto der EU", name: "In Vielfalt geeint" },
      { badge: "📜 OFFIZIELLE URKUNDE", role: "Dein Abschluss-Zertifikat", name: "Europa-Diplom ➔" }
    ];

    const starCount = 12;
    const radius = 220; // 3D Turntable radius

    this.morphCreditsData.forEach((item, i) => {
      const angle = (i / starCount) * 2 * Math.PI - Math.PI / 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const deg = (i / starCount) * 360;

      const card = document.createElement('div');
      card.className = "morph-flip-card is-flat";
      card.id = `morph-flip-card-${i}`;
      card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) rotateZ(${deg}deg)`;
      card.innerHTML = `
        <div class="morph-card-badge">${item.badge}</div>
        <div class="morph-card-role">${item.role}</div>
        <div class="morph-card-name">${item.name}</div>
      `;

      card.onclick = () => {
        this.setMorphCarouselIndex(i);
      };

      turntable.appendChild(card);
    });

    try {
      if (typeof triggerConfetti === 'function') triggerConfetti();
      if (typeof sounds !== 'undefined' && typeof sounds.playEndingCreditsMusic === 'function') {
        sounds.playEndingCreditsMusic();
      }
    } catch(e) {}

    overlay.style.display = 'flex';

    this.morphCarouselIndex = 0;
    this.morphCarouselAutoRunning = true;
    this.updateMorphCarouselView();

    // Start auto advance loop every 2.8s
    if (this.morphCarouselTimer) clearInterval(this.morphCarouselTimer);
    this.morphCarouselTimer = setInterval(() => {
      if (this.morphCarouselAutoRunning) {
        this.stepMorphCarousel(1);
      }
    }, 2800);
  },

  updateMorphCarouselView: function() {
    const turntable = document.getElementById('morph-carousel-turntable');
    if (!turntable || !this.morphCreditsData) return;

    const starCount = this.morphCreditsData.length;
    const currentIdx = ((this.morphCarouselIndex % starCount) + starCount) % starCount;
    
    // Rotate turntable so active card aligns to the front (bottom 6 o'clock facing user)
    // Star 0 was at angle -90deg (top). To bring star i to bottom (angle +90deg), offset is:
    const stepDeg = 360 / starCount; // 30deg
    const targetTurntableDeg = - (currentIdx * stepDeg) - 90;
    turntable.style.transform = `rotateX(60deg) rotateZ(${targetTurntableDeg}deg)`;

    const radius = 210;
    this.morphCreditsData.forEach((item, i) => {
      const card = document.getElementById(`morph-flip-card-${i}`);
      if (!card) return;

      const angle = (i / starCount) * 2 * Math.PI - Math.PI / 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      if (i === currentIdx) {
        card.classList.remove('is-flat');
        card.classList.add('is-flipped-up');
        // Cancels turntable Z rotation and X tilt so text is 100% horizontal & facing screen directly
        card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 80px) rotateZ(${-targetTurntableDeg}deg) rotateX(-60deg) scale(1.35)`;
      } else {
        card.classList.remove('is-flipped-up');
        card.classList.add('is-flat');
        // Lies flat on the turntable
        card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) rotateZ(0deg) rotateX(0deg) scale(0.88)`;
      }
    });
  },

  stepMorphCarousel: function(direction) {
    this.playClickSound();
    if (!this.morphCreditsData) return;
    this.morphCarouselIndex = (this.morphCarouselIndex + direction + this.morphCreditsData.length) % this.morphCreditsData.length;
    this.updateMorphCarouselView();
  },

  setMorphCarouselIndex: function(idx) {
    this.playClickSound();
    this.morphCarouselIndex = idx;
    this.updateMorphCarouselView();
  },

  toggleMorphCarouselAuto: function() {
    this.playClickSound();
    this.morphCarouselAutoRunning = !this.morphCarouselAutoRunning;
    const btn = document.getElementById('btn-morph-playpause');
    if (btn) {
      btn.innerText = this.morphCarouselAutoRunning ? "⏸️ Pause" : "▶️ Weiter";
    }
  },

  exitFinaleToMap: function() {
    this.playClickSound();
    if (this.morphCarouselTimer) clearInterval(this.morphCarouselTimer);
    const overlay = document.getElementById('story-constellation-ring-overlay');
    if (overlay) overlay.style.display = 'none';
    this.showStoryHub();
  },

  openMuseum: function(event) {
    this.playClickSound();
    const modal = document.getElementById('story-museum-modal');
    const grid = document.getElementById('story-museum-grid');
    if (!modal || !grid) return;

    grid.innerHTML = "";

    // 1. Relikte mit sauberen SVG-Badges statt Emojis
    for (let cName in this.relicsDatabase) {
      const relic = this.relicsDatabase[cName];
      const isUnlocked = this.state.relics.includes(cName);

      const slot = document.createElement('div');
      slot.className = `relic-slot ${isUnlocked ? 'unlocked' : 'locked'}`;
      slot.innerHTML = `
        <div class="relic-icon" style="display:flex; align-items:center; justify-content:center; width:46px; height:46px; border-radius:14px; background:rgba(255,255,255,0.06); margin:0 auto 8px;">
          ${isUnlocked ? this.getRelicSmallSVG(relic.name) : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'}
        </div>
        <div class="relic-name">${isUnlocked ? relic.name : 'Unbekanntes Relikt'}</div>
        <div style="font-size:0.68rem; color:#94a3b8; font-weight:700; margin-top:4px;">${cName}</div>
      `;
      if (isUnlocked) {
        slot.title = relic.desc;
        slot.onclick = (e) => {
          this.playClickSound();
          this.showItemDetailModal(this.getRelicSVG(relic.name), relic.name, cName, relic.desc, "Museums-Relikt", e?.currentTarget);
        };
      }
      grid.appendChild(slot);
    }

    // 2. Gesammelte Story-Inventar-Gegenstände
    if (typeof StoryAdventureEngine !== 'undefined' && StoryAdventureEngine.state.inventory.length > 0) {
      StoryAdventureEngine.state.inventory.forEach(item => {
        const slot = document.createElement('div');
        slot.className = 'relic-slot unlocked';
        slot.style.borderColor = '#06b6d4';
        slot.innerHTML = `
          <div class="relic-icon" style="display:flex; align-items:center; justify-content:center; width:46px; height:46px; border-radius:14px; background:rgba(6,182,212,0.15); margin:0 auto 8px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
          </div>
          <div class="relic-name">${item.name}</div>
          <div style="font-size:0.68rem; color:#06b6d4; font-weight:700; margin-top:4px;">Adventure-Item</div>
        `;
        slot.onclick = (e) => {
          this.playClickSound();
          this.showItemDetailModal(
            `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
            item.name,
            "Inventar-Gegenstand",
            item.desc || 'Gefunden während deiner Europa-Reise.',
            "Expeditionsobjekt",
            e?.currentTarget
          );
        };
        grid.appendChild(slot);
      });
    }

    this.openModalWithOrigin('story-museum-modal', '.museum-modal-card', event?.currentTarget || document.getElementById('dock-inventory-btn'));
  },

  closeMuseum: function() {
    this.playClickSound();
    this.closeModalWithAnimation('story-museum-modal', '.museum-modal-card');
  },

  showItemDetailModal: function(iconHTML, title, subtitle, desc, tag = "Information", triggerEl = null) {
    const modal = document.getElementById('story-item-detail-modal');
    const body = document.getElementById('story-item-detail-body');
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="display:inline-flex; align-items:center; justify-content:center; width:68px; height:68px; border-radius:22px; background:rgba(6,182,212,0.12); border:1.5px solid rgba(6,182,212,0.4); margin:0 auto 12px; filter:drop-shadow(0 0 20px rgba(6,182,212,0.5));">
        ${iconHTML}
      </div>
      <div style="font-size: 0.78rem; text-transform: uppercase; color: #06b6d4; font-weight: 800; letter-spacing: 1px; margin-bottom: 4px;">${tag}</div>
      <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.45rem; margin: 0 0 4px 0; color: #ffffff; font-weight: 800;">${title}</h3>
      <div style="font-size: 0.85rem; color: #94a3b8; font-weight: 600; margin-bottom: 16px;">${subtitle}</div>
      <p style="font-size: 0.96rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 22px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 16px;">
        ${desc}
      </p>
      <button class="btn-main" style="background: linear-gradient(135deg, #06b6d4, #3b82f6); color:#fff; border:none; width:100%; padding:12px; font-weight:800; border-radius:14px; cursor:pointer;" onclick="StoryMode.closeItemDetailModal()">
        Verstanden ➔
      </button>
    `;
    this.openModalWithOrigin('story-item-detail-modal', '.control-center-panel', triggerEl);
  },

  closeItemDetailModal: function() {
    this.playClickSound();
    this.closeModalWithAnimation('story-item-detail-modal', '.control-center-panel');
  },

  openQuestLog: function(event) {
    this.playClickSound();
    const totalRelics = Object.keys(this.relicsDatabase).length;
    const collectedCount = this.state.relics.length;
    
    let cluesHTML = "";
    if (typeof StoryAdventureEngine !== 'undefined' && StoryAdventureEngine.state.clues.length > 0) {
      cluesHTML = `
        <div style="margin-top: 14px; text-align: left;">
          <div style="font-size:0.8rem; font-weight:800; color:#38bdf8; text-transform:uppercase; margin-bottom:6px;">🔍 Gefundene Hinweise & Spuren:</div>
          <div style="display:flex; flex-direction:column; gap:6px; max-height:140px; overflow-y:auto;">
            ${StoryAdventureEngine.state.clues.map(c => `<div style="font-size:0.85rem; background:rgba(255,255,255,0.06); padding:8px 12px; border-radius:10px; border-left:3px solid #06b6d4;">${c}</div>`).join('')}
          </div>
        </div>
      `;
    }

    const desc = `
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:12px; text-align:center;">
        <div style="background:rgba(255,255,255,0.06); padding:10px; border-radius:12px;">
          <div style="font-size:1.4rem; color:#f59e0b; font-weight:800;">★ ${this.state.totalStars}</div>
          <div style="font-size:0.75rem; color:#94a3b8;">Sterne gesammelt</div>
        </div>
        <div style="background:rgba(255,255,255,0.06); padding:10px; border-radius:12px;">
          <div style="font-size:1.4rem; color:#38bdf8; font-weight:800;">🏆 ${collectedCount}/${totalRelics}</div>
          <div style="font-size:0.75rem; color:#94a3b8;">Relikte geborgen</div>
        </div>
      </div>
      <div style="font-size:0.9rem; color:#cbd5e1;">📍 Aktuelle Station: <b>${this.state.routeIndex + 1}/28</b></div>
      ${cluesHTML}
    `;

    const iconSVG = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>`;
    this.showItemDetailModal(iconSVG, "Expeditions-Logbuch", "Dein bisheriger Fortschritt in Europa", desc, "Logbuch", event?.currentTarget || document.getElementById('dock-questlog-btn'));
  },

  toggleCockpitAudio: function() {
    this.playClickSound();
    if (typeof toggleMusic === 'function') {
      toggleMusic();
    }
    this.syncAudioButtonState();
  },

  // --- Grand Cinematic Ending Movie Credits ---
  showGrandEndingMovieCredits: function() {
    this.hideAllStoryScreens();
    document.body.classList.add('story-active');

    const endingScreen = document.getElementById('story-ending-screen');
    const stage1 = document.getElementById('ending-credits-stage-1');
    const stage2 = document.getElementById('ending-credits-stage-2');

    if (!endingScreen) return;

    // Play Ode to Joy & Epic Cinematic Ending Anthem
    try {
      if (typeof sounds !== 'undefined' && typeof sounds.playEndingCreditsMusic === 'function') {
        sounds.playEndingCreditsMusic();
      }
    } catch(e) {}

    const skipBtn = document.getElementById('ending-skip-btn');
    if (skipBtn) skipBtn.style.display = 'block';

    if (stage1) stage1.style.display = 'block';
    if (stage2) stage2.style.display = 'none';
    endingScreen.style.display = 'flex';

    // Transition to Stage 2 (Feedback & Replay) after rolling credits (28s for cinematic movie feel)
    if (this.endingTimer) clearTimeout(this.endingTimer);
    this.endingTimer = setTimeout(() => {
      const btn = document.getElementById('ending-skip-btn');
      if (btn) btn.style.display = 'none';
      if (stage1) stage1.style.display = 'none';
      if (stage2) {
        stage2.style.display = 'flex';
        if (typeof triggerConfetti === 'function') {
          try { triggerConfetti(); } catch(e) {}
        }
      }
    }, 28000);
  },

  skipEndingCredits: function() {
    this.playClickSound();
    if (this.endingTimer) clearTimeout(this.endingTimer);
    const stage1 = document.getElementById('ending-credits-stage-1');
    const stage2 = document.getElementById('ending-credits-stage-2');
    const skipBtn = document.getElementById('ending-skip-btn');
    if (skipBtn) skipBtn.style.display = 'none';
    if (stage1) stage1.style.display = 'none';
    if (stage2) {
      stage2.style.display = 'flex';
      if (typeof triggerConfetti === 'function') {
        try { triggerConfetti(); } catch(e) {}
      }
    }
  },

  exitEndingToMap: function() {
    this.playClickSound();
    try {
      if (typeof sounds !== 'undefined' && typeof sounds.stopEndingCreditsMusic === 'function') {
        sounds.stopEndingCreditsMusic();
      }
    } catch(e) {}
    const endingScreen = document.getElementById('story-ending-screen');
    if (endingScreen) endingScreen.style.display = 'none';
    this.showStoryHub();
  },

  restartEntireStoryMode: function() {
    this.playClickSound();
    try {
      if (typeof sounds !== 'undefined' && typeof sounds.stopEndingCreditsMusic === 'function') {
        sounds.stopEndingCreditsMusic();
      }
    } catch(e) {}

    // Reset progress in memory & storage
    this.state.countries = {};
    this.state.clearedChapters = [];
    this.state.relics = [];
    this.state.totalStars = 0;
    this.state.routeIndex = 0;
    this.state.currentChapter = 1;
    this.saveState();

    const endingScreen = document.getElementById('story-ending-screen');
    if (endingScreen) endingScreen.style.display = 'none';

    this.showStoryHub();
  },

  openCertificateModal: function() {
    this.playClickSound();
    const modal = document.getElementById('story-diploma-modal');
    const starsEl = document.getElementById('diploma-stars');
    const relicEl = document.getElementById('diploma-relics');
    const rankEl = document.getElementById('diploma-rank');
    const dateEl = document.getElementById('diploma-date');

    const totalStars = this.state.totalStars || 0;
    const relicCount = (this.state.relics && this.state.relics.length) || 28;

    if (starsEl) starsEl.innerText = `⭐ ${totalStars} / 84`;
    if (relicEl) relicEl.innerText = `🏆 ${relicCount} / 28`;
    if (rankEl) {
      rankEl.innerText = totalStars >= 70 ? "Exzellenz-Rang 👑" : "Botschafter-Rang 🎖️";
    }
    if (dateEl) {
      const now = new Date();
      dateEl.innerText = now.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    if (modal) modal.style.display = 'flex';
  },

  closeCertificateModal: function() {
    this.playClickSound();
    const modal = document.getElementById('story-diploma-modal');
    if (modal) modal.style.display = 'none';
  },

  exitEndingToMap: function() {
    this.playClickSound();
    try {
      if (typeof sounds !== 'undefined' && typeof sounds.stopEndingCreditsMusic === 'function') {
        sounds.stopEndingCreditsMusic();
      }
    } catch(e) {}

    const endingScreen = document.getElementById('story-ending-screen');
    if (endingScreen) endingScreen.style.display = 'none';

    this.showStoryHub();
  },

  hideAllStoryScreens: function() {
    document.body.classList.remove('story-active');
    const screens = [
      'story-preloader-screen',
      'story-hub-screen',
      'story-stage-screen',
      'story-guest-modal',
      'story-museum-modal',
      'story-celebration-modal',
      'story-arrival-modal',
      'story-schengen-modal',
      'story-flight-hud-overlay',
      'story-adventure-screen',
      'story-ending-screen',
      'story-cinematic-intro',
      'story-wall-break-overlay',
      'story-ten-stars-overlay',
      'story-values-finale-overlay',
      'story-grand-triumph-modal',
      'story-constellation-ring-overlay'
    ];
    screens.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  },

  // =========================================================================
  // ENTWICKLER-TESTMODUS (Passwort: 123)
  // =========================================================================
  devTestModeActive: false,

  promptDevTestMode: function() {
    this.playClickSound();
    const pw = prompt("🔒 Entwickler-Passwort eingeben für den Testmodus:");
    if (pw === "123") {
      this.devTestModeActive = true;
      const creditsBtn = document.getElementById('dock-credits-test-btn');
      if (creditsBtn) creditsBtn.style.display = 'inline-flex';

      const choice = prompt(
        "✅ TESTMODUS AKTIVIERT!\n\n" +
        "Wähle eine Szene zum direkten Testen:\n" +
        "1 - Alle 27 Länder auf der Karte freischalten (Interaktiv)\n" +
        "2 - 🎬 Cinematic Intro („Der Himmel über Europa“)\n" +
        "3 - 🧱 Kapitel 3 Mauerfall-Event („Die Grenze“)\n" +
        "4 - ⏱️ Kapitel 4 Minispiel („10 Sekunden – 10 Sterne“)\n" +
        "5 - 👑 Kapitel 5 Finale (Werte-Wahl, Sternenkreis & Flagge)\n" +
        "6 - 🏆 Alle 27 Länder sofort als gemeistert markieren\n" +
        "7 - 🔄 Fortschritt komplett zurücksetzen\n\n" +
        "Gib eine Zahl von 1 bis 7 ein:",
        "1"
      );

      if (choice === "2") {
        this.playCinematicIntro(() => this.showStoryHub());
      } else if (choice === "3") {
        this.playWallBreakEvent(() => this.showStoryHub());
      } else if (choice === "4") {
        this.playTenStarsMinigame(() => this.showStoryHub());
      } else if (choice === "5") {
        this.playValuesFinale(() => this.openGrandTriumphModal());
      } else if (choice === "6") {
        this.expeditionRoute.forEach(st => {
          this.state.countries[st.name] = { completed: true, stars: 3, bestScore: 300 };
        });
        this.state.clearedChapters = [1, 2, 3, 4, 5];
        this.saveState();
        alert("✅ Alle 27 Länder als gemeistert markiert!");
        this.renderCurrentView();
      } else if (choice === "7") {
        this.resetStoryProgress();
        alert("✅ Fortschritt zurückgesetzt!");
      } else {
        alert("✅ Alle Länder auf der Karte sind nun direkt anklickbar!");
        this.renderCurrentView();
      }
    } else if (pw !== null) {
      alert("❌ Falsches Passwort!");
    }
  },

  testEndingDirectly: function() {
    this.playClickSound();
    this.expeditionRoute.forEach(st => {
      this.state.countries[st.name] = { completed: true, stars: 3, bestScore: 300 };
    });
    this.saveState();
    this.triggerClimaxCircleFormation(() => {
      this.showGrandEndingMovieCredits();
    });
  },

  resetStoryProgress: function() {
    this.playClickSound();
    this.state.countries = {};
    this.state.clearedChapters = [];
    this.state.relics = [];
    this.state.routeIndex = 0;
    this.state.currentChapter = 1;
    this.state.totalStars = 0;
    this.saveState();
    this.renderCurrentView();
  },

  testReflectionDirectly: function(chapterId = 1) {
    this.playClickSound();
    this.showChapterReflection(chapterId, () => {
      this.showStoryHub();
    });
  },

  exitStoryMode: function() {
    this.playClickSound();
    try {
      if (typeof sounds !== 'undefined' && typeof sounds.stopEndingCreditsMusic === 'function') {
        sounds.stopEndingCreditsMusic();
      }
    } catch(e) {}
    this.hideAllStoryScreens();
    document.body.classList.remove('story-active');
    const spMenu = document.getElementById('singleplayer-menu-screen');
    if (spMenu) spMenu.style.display = 'flex';
  }
};

if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('DOMContentLoaded', () => {
    StoryMode.init();
  });
}
