/**
 * Expedition Europa — Vollständiger Pädagogischer Story-Fragenpool (Version 7.0)
 * Reales Geschichts-Erlebnis: Von 1945 über die Erweiterungen und den Mauerfall bis zum Werte-Finale.
 */

var StoryQuestionsPool = {
  // =========================================================================
  // KAPITEL 1: „AUS FEINDEN WERDEN PARTNER“ — DIE 6 GRÜNDERSTAATEN (1950–1957)
  // =========================================================================
  "Frankreich": [
    {
      stage: 1,
      type: "classic",
      title: "Der Schuman-Plan",
      storyContext: "Paris, 1950. Europa hat den Zweiten Weltkrieg gerade erst hinter sich – und trotzdem steht schon die nächste große Frage im Raum: Wie verhindert man, dass sich die Geschichte wiederholt?",
      q: "Was schlug der französische Außenminister Robert Schuman 1950 vor?",
      o: [
        "Frankreich und Deutschland sollten ihre Kohle- und Stahlproduktion gemeinsam kontrollieren.",
        "Alle europäischen Länder sollten sofort dieselbe Währung bekommen.",
        "Europa sollte eine gemeinsame Armee gründen.",
        "Alle Grenzen innerhalb Europas sollten abgeschafft werden."
      ],
      a: 0,
      lore: "Kohle und Stahl waren damals nicht einfach irgendwelche Rohstoffe – sie waren entscheidend für die Rüstungsindustrie. Die Idee war genial simpel: Wenn ehemalige Feinde ihre wichtigsten Kriegsmaterialien gemeinsam verwalten, wird ein neuer Krieg viel schwieriger.",
      relicReward: { name: "Der Kohle-und-Stahl-Schlüssel", icon: "🪨", desc: "Symbol für die Idee, aus einer möglichen Waffe ein Werkzeug der Zusammenarbeit zu machen." }
    },
    {
      stage: 2,
      type: "code_puzzle",
      title: "Der 9. Mai",
      storyContext: "Auf deinem Bildschirm erscheint ein Datum: 09 / 05 / 1950. Es ist kein Geburtstag und keine Schlacht. Aber dieses Datum wird später jedes Jahr in ganz Europa gefeiert.",
      q: "Welches Ereignis verbirgt sich hinter diesem Datum?",
      code: ["09", "05", "1950"],
      o: [
        "Unterzeichnung der Römischen Verträge",
        "Vorstellung des Schuman-Plans",
        "Gründung der Europäischen Union",
        "Einführung des Euro"
      ],
      a: 1,
      lore: "Am 9. Mai 1950 stellte Robert Schuman seinen Plan vor. Deshalb ist der 9. Mai heute der Europatag – ein ziemlich bemerkenswertes Beispiel dafür, wie aus einer politischen Rede ein Symbol für einen ganzen Kontinent wurde.",
      relicReward: { name: "Die Schuman-Erklärung", icon: "📜", desc: "Der symbolische Startschuss für das europäische Einigungsprojekt." }
    },
    {
      stage: 3,
      type: "two_truths_one_lie",
      title: "Die ungewöhnliche Freundschaft",
      storyContext: "Frankreich und Deutschland hatten sich über Jahrzehnte bekämpft. Jetzt sollen ausgerechnet diese beiden Länder gemeinsam Europas Zukunft aufbauen.",
      q: "Welche Aussage ist die Lüge?",
      items: [
        { text: "Frankreich und Deutschland wurden zentrale Partner beim europäischen Einigungsprozess.", isLie: false },
        { text: "Kohle und Stahl spielten eine wichtige Rolle bei diesem ersten gemeinsamen Projekt.", isLie: false },
        { text: "Frankreich wollte nach 1945 jede politische Zusammenarbeit mit Deutschland dauerhaft ausschließen.", isLie: true }
      ],
      lore: "Gerade die Zusammenarbeit zwischen Frankreich und Deutschland zeigt, wie radikal die neue Idee war. Ausgerechnet zwei ehemalige Hauptgegner wurden zu Motoren der europäischen Integration.",
      relicReward: { name: "Der deutsch-französische Handschlag", icon: "🤝", desc: "Steht für die vielleicht wichtigste politische Versöhnung Europas." }
    }
  ],

  "Deutschland": [
    {
      stage: 1,
      type: "decision_dilemma",
      title: "Die Entscheidung für Zusammenarbeit",
      storyContext: "Du bist 1950 europäischer Politiker. Deutschland und Frankreich misstrauen einander noch immer. Trotzdem liegt ein Vorschlag auf dem Tisch: Gemeinsame Kontrolle über Kohle und Stahl.",
      q: "Welche Entscheidung passt am besten zur Idee des Schuman-Plans?",
      o: [
        "Jede Seite kontrolliert ihre Industrie weiterhin allein.",
        "Frankreich übernimmt die deutsche Kohleindustrie.",
        "Beide Länder geben einen Teil der Kontrolle an eine gemeinsame europäische Institution ab.",
        "Deutschland und Frankreich stoppen ihre Stahlproduktion vollständig."
      ],
      a: 2,
      lore: "Das Entscheidende war nicht, dass ein Land über das andere herrscht. Beide sollten ein Stück nationale Kontrolle abgeben und dafür gemeinsame Kontrolle gewinnen. Genau dieses Prinzip wurde später zu einem Kern der europäischen Integration.",
      relicReward: { name: "Der Schlüssel der gemeinsamen Kontrolle", icon: "🔑", desc: "Symbolisiert: Vertrauen entsteht, wenn man Macht miteinander teilt." }
    },
    {
      stage: 2,
      type: "classic",
      title: "Die sechs Gründer",
      storyContext: "Du öffnest die erste Karte deiner Expedition. Darauf erscheinen sechs Länder – die ersten Staaten, die den europäischen Integrationsprozess gemeinsam vorantrieben.",
      q: "Welches Land gehörte nicht zu den sechs Gründungsstaaten der Europäischen Gemeinschaft für Kohle und Stahl?",
      o: [
        "Deutschland",
        "Frankreich",
        "Spanien",
        "Belgien"
      ],
      a: 2,
      lore: "Die sechs Gründungsstaaten waren Belgien, Deutschland, Frankreich, Italien, Luxemburg und die Niederlande. Spanien kam erst Jahrzehnte später dazu – Europa wurde also tatsächlich Schritt für Schritt größer.",
      relicReward: { name: "Die Karte der Sechs", icon: "🗺️", desc: "Zeigt den kleinen Anfang eines Projekts, das später 27 Staaten umfassen sollte." }
    },
    {
      stage: 3,
      type: "timeline",
      title: "Vom Feind zum Mitbegründer",
      storyContext: "Die europäische Einigung entstand nicht an einem einzigen Tag. Mehrere entscheidende Schritte führten vom Krieg zur Zusammenarbeit.",
      q: "Bringe die Ereignisse in die richtige Reihenfolge:",
      items: [
        "Ende des Zweiten Weltkriegs",
        "Schuman-Plan",
        "Gründung der Europäischen Gemeinschaft für Kohle und Stahl",
        "Römische Verträge"
      ],
      lore: "Die Reihenfolge erzählt eigentlich schon die ganze Geschichte: erst Frieden, dann Vertrauen, dann gemeinsame Institutionen – und schließlich eine immer engere Zusammenarbeit.",
      relicReward: { name: "Der erste Europa-Baustein", icon: "🧱", desc: "Steht für einen Kontinent, der nicht auf einmal, sondern Stück für Stück neu aufgebaut wurde." }
    }
  ],

  "Italien": [
    {
      stage: 1,
      type: "classic",
      title: "Rom 1957",
      storyContext: "Rom, 1957. Die sechs Gründer treffen sich erneut. Diesmal geht es um eine noch größere Vision: Nicht nur Kohle und Stahl sollen verbunden werden.",
      q: "Was wurde 1957 mit den Römischen Verträgen geschaffen?",
      o: [
        "Die Europäische Wirtschaftsgemeinschaft (EWG) und Euratom",
        "Die Europäische Zentralbank und der Euro",
        "Der Schengen-Raum",
        "Die Europäische Union"
      ],
      a: 0,
      lore: "Die Zusammenarbeit wurde damit massiv erweitert: Europa sollte nicht nur seine Kriegsindustrie miteinander verbinden, sondern auch wirtschaftlich enger zusammenarbeiten. Die heutige EU hat ihre Wurzeln genau in diesem Prozess.",
      relicReward: { name: "Der römische Vertragssiegelring", icon: "🏛️", desc: "Symbol dafür, dass aus einer Idee zunehmend echte europäische Institutionen wurden." }
    },
    {
      stage: 2,
      type: "odd_one_out",
      title: "Ein Markt ohne viele Hindernisse",
      storyContext: "Stell dir Europa als riesigen Marktplatz vor. Händler wollen Waren verkaufen, Unternehmen wollen expandieren – doch überall gibt es unterschiedliche Regeln und Hindernisse.",
      q: "Welche Idee passt nicht zur Entwicklung eines gemeinsamen europäischen Marktes?",
      subTitle: "Finde die Idee, die dem gemeinsamen Markt widerspricht:",
      items: [
        { text: "Handel zwischen den Mitgliedstaaten erleichtern", isOdd: false, icon: "🤝" },
        { text: "Wirtschaftliche Zusammenarbeit verstärken", isOdd: false, icon: "📈" },
        { text: "Gemeinsame wirtschaftliche Regeln entwickeln", isOdd: false, icon: "📜" },
        { text: "Den Handel zwischen den Mitgliedstaaten absichtlich erschweren", isOdd: true, icon: "🚧" }
      ],
      o: [
        "Handel zwischen den Mitgliedstaaten erleichtern",
        "Wirtschaftliche Zusammenarbeit verstärken",
        "Gemeinsame wirtschaftliche Regeln entwickeln",
        "Den Handel zwischen den Mitgliedstaaten absichtlich erschweren"
      ],
      a: 3,
      lore: "Die Gründer wollten genau das Gegenteil: wirtschaftliche Verbindungen sollten Länder stärker voneinander abhängig machen. Aus heutiger Sicht ist das besonders interessant, weil unser Alltag von diesem gemeinsamen Wirtschaftsraum geprägt ist.",
      relicReward: { name: "Die erste Markt-Münze", icon: "🪙", desc: "Steht für die Idee eines Europas, in dem Grenzen den Handel immer weniger ausbremsen." }
    },
    {
      stage: 3,
      type: "classic",
      title: "Warum eigentlich Rom?",
      storyContext: "Deine Expedition führt dich nach Rom. Hier wurden 1957 zwei Verträge unterzeichnet, die Europas Zusammenarbeit auf eine neue Ebene hoben.",
      q: "Warum war Rom als Ort für die Verträge besonders passend?",
      o: [
        "Rom war damals bereits Hauptstadt der Europäischen Union.",
        "Rom war eine der Hauptstädte der sechs Gründerstaaten und bot den historischen Rahmen für die Unterzeichnung.",
        "Rom war Sitz der Vereinten Nationen.",
        "Rom war damals die einzige Stadt Europas ohne Grenzen."
      ],
      a: 1,
      lore: "Rom war nicht die „Hauptstadt Europas“ – die EU hatte zu diesem Zeitpunkt überhaupt noch nicht ihre heutige Form. Der Ort wurde vielmehr zum Schauplatz eines historischen nächsten Schritts der sechs Gründerstaaten.",
      relicReward: { name: "Der Stein von Rom", icon: "🏛️", desc: "Symbol für das Fundament, auf dem spätere europäische Projekte aufgebaut wurden." }
    }
  ],

  "Belgien": [
    {
      stage: 1,
      type: "classic",
      title: "Brüssel wird wichtig",
      storyContext: "Belgien ist klein – doch seine Rolle im neuen Europa ist riesig. Eine Stadt entwickelt sich zu einem der wichtigsten politischen Zentren des Kontinents.",
      q: "Welche belgische Stadt wurde zu einem wichtigen Zentrum der europäischen Institutionen?",
      o: [
        "Antwerpen",
        "Brügge",
        "Brüssel",
        "Gent"
      ],
      a: 2,
      lore: "Brüssel entwickelte sich im Laufe der europäischen Integration zu einem zentralen Ort für die europäischen Institutionen. Heute begegnen sich dort Politiker und Vertreter aus den EU-Mitgliedstaaten.",
      relicReward: { name: "Der europäische Stadtschlüssel", icon: "🏢", desc: "Symbolisiert Brüssel als Treffpunkt der europäischen Politik." }
    },
    {
      stage: 2,
      type: "two_truths_one_lie",
      title: "Gemeinsam entscheiden",
      storyContext: "Die Gründer stehen vor einer völlig neuen Frage: Wie kann man Länder zusammenarbeiten lassen, ohne dass eines einfach das andere beherrscht?",
      q: "Welche Aussage ist die Lüge?",
      items: [
        { text: "Die europäische Integration setzte zunehmend auf gemeinsame Institutionen.", isLie: false },
        { text: "Die sechs Gründerstaaten wollten ihre Zusammenarbeit auf feste Regeln stützen.", isLie: false },
        { text: "Ein einziges Land erhielt automatisch die vollständige Kontrolle über alle anderen Gründerstaaten.", isLie: true }
      ],
      lore: "Die europäische Idee war gerade kein neues Großreich, sondern ein System gemeinsamer Regeln und Institutionen. Das ist ein wichtiger Unterschied – und erklärt, warum Zusammenarbeit und nationale Eigenständigkeit bis heute nebeneinander existieren.",
      relicReward: { name: "Die Waage der Sechs", icon: "⚖️", desc: "Steht für gemeinsames Entscheiden statt Herrschaft eines Einzelnen." }
    },
    {
      stage: 3,
      type: "odd_one_out",
      title: "Europas Institutionen",
      storyContext: "In deinem Museum liegen vier Begriffe. Drei gehören zur frühen europäischen Integration – einer stammt aus einer viel späteren Phase.",
      q: "Welcher Begriff ist der Schwindler?",
      subTitle: "Finde den Begriff aus einer viel späteren Phase:",
      items: [
        { text: "Europäische Gemeinschaft für Kohle und Stahl", isOdd: false, icon: "🏭" },
        { text: "Europäische Wirtschaftsgemeinschaft", isOdd: false, icon: "🚢" },
        { text: "Euratom", isOdd: false, icon: "⚛️" },
        { text: "Euro-Banknote", isOdd: true, icon: "💶" }
      ],
      o: [
        "Europäische Gemeinschaft für Kohle und Stahl",
        "Europäische Wirtschaftsgemeinschaft",
        "Euratom",
        "Euro-Banknote"
      ],
      a: 3,
      lore: "EGKS, EWG und Euratom stammen aus den frühen Jahrzehnten der europäischen Integration. Der Euro kam erst viel später – die gemeinsame Währung war also keineswegs der Ausgangspunkt des Projekts.",
      relicReward: { name: "Die noch leere Geldbörse", icon: "💶", desc: "Erinnert daran, dass Europa lange vor dem Euro begonnen hat." }
    }
  ],

  "Luxemburg": [
    {
      stage: 1,
      type: "classic",
      title: "Europas kleiner Gründer",
      storyContext: "Du zoomst auf die Europakarte. Zwischen großen Staaten entdeckst du ein winziges Land – und trotzdem war es von Anfang an dabei.",
      q: "Welche Rolle hatte Luxemburg bei der europäischen Integration?",
      o: [
        "Es gehörte zu den sechs Gründungsstaaten.",
        "Es trat erst 2004 bei.",
        "Es war ursprünglich ein Teil Frankreichs.",
        "Es wurde erst mit der Einführung des Euro Mitglied."
      ],
      a: 0,
      lore: "Luxemburg zeigt, dass politische Bedeutung nicht von der Größe eines Landes abhängt. Als eines der sechs Gründerländer war es von Beginn an Teil des europäischen Einigungsprojekts.",
      relicReward: { name: "Der kleine große Stern", icon: "🔹", desc: "Symbolisiert, dass auch kleine Staaten Europas Geschichte entscheidend mitprägen können." }
    },
    {
      stage: 2,
      type: "map_target",
      title: "Die Stadt der Institutionen",
      storyContext: "Dein Raumschiff zeigt Europa von oben. Zwei Städte leuchten auf: Brüssel und Luxemburg. Beide spielen bis heute eine wichtige Rolle in der EU.",
      q: "Welche Stadt liegt in dem kleinen Land Luxemburg?",
      o: [
        "Luxemburg-Stadt",
        "Straßburg",
        "Brüssel",
        "Amsterdam"
      ],
      a: 0,
      target: "Luxemburg-Stadt",
      lore: "Luxemburg-Stadt ist eine der europäischen Institutionenstädte. Zusammen mit Brüssel und Straßburg gehört sie zu den Orten, an denen wichtige EU-Arbeit stattfindet.",
      relicReward: { name: "Die Festung Europas", icon: "🏰", desc: "Symbolisiert Luxemburgs Rolle als kleiner, aber zentraler Baustein Europas." }
    },
    {
      stage: 3,
      type: "timeline",
      title: "Sechs Länder, eine Idee",
      storyContext: "Du hast sechs Relikte gesammelt. Jetzt musst du rekonstruieren, wie aus den ersten Gesprächen ein echtes gemeinsames Projekt wurde.",
      q: "Ordne die Stationen chronologisch:",
      items: [
        "Ende des Zweiten Weltkriegs",
        "Schuman-Plan",
        "Europäische Gemeinschaft für Kohle und Stahl",
        "Römische Verträge"
      ],
      lore: "Hier sieht man die Entwicklung besonders schön: 1945 beginnt die Suche nach Frieden, 1950 entsteht eine konkrete Idee und 1951/1952 wird daraus eine gemeinsame Institution. 1957 wird die Zusammenarbeit erneut erweitert.",
      relicReward: { name: "Das erste Europa-Puzzleteil", icon: "🧩", desc: "Symbolisiert, dass jedes Ereignis ein Teil der größeren europäischen Geschichte ist." }
    }
  ],

  "Niederlande": [
    {
      stage: 1,
      type: "classic",
      title: "Europa als Handelsraum",
      storyContext: "Die Niederlande leben seit Jahrhunderten stark vom Handel. Die neue europäische Zusammenarbeit eröffnet eine spannende Möglichkeit: Was wäre, wenn Handel zwischen europäischen Ländern einfacher wird?",
      q: "Welche Entwicklung passte besonders zur wirtschaftlichen Zusammenarbeit der Gründerstaaten?",
      o: [
        "Mehr Hindernisse für den Handel",
        "Engere wirtschaftliche Zusammenarbeit",
        "Abschottung der nationalen Märkte",
        "Verbot grenzüberschreitender Unternehmen"
      ],
      a: 1,
      lore: "Die Gründer wollten wirtschaftliche Verbindungen verstärken. Die Idee dahinter war nicht nur mehr Handel – wirtschaftliche Zusammenarbeit sollte auch politischen Frieden stabiler machen.",
      relicReward: { name: "Das Handelsschiff ohne Grenze", icon: "🚢", desc: "Steht für Waren, Menschen und Ideen, die sich immer leichter durch Europa bewegen können." }
    },
    {
      stage: 2,
      type: "classic",
      title: "Benelux",
      storyContext: "Noch bevor die sechs Gründerstaaten gemeinsam loslegten, hatten drei kleinere Nachbarländer bereits Erfahrung mit enger Zusammenarbeit.",
      q: "Welche drei Länder bilden den Benelux-Raum?",
      o: [
        "Belgien, Niederlande, Luxemburg",
        "Belgien, Frankreich, Luxemburg",
        "Niederlande, Deutschland, Dänemark",
        "Luxemburg, Frankreich, Niederlande"
      ],
      a: 0,
      lore: "Belgien, Niederlande und Luxemburg arbeiteten schon früh enger zusammen. Diese regionale Kooperation wurde zu einem wichtigen Beispiel dafür, dass Staaten freiwillig gemeinsame Lösungen entwickeln können.",
      relicReward: { name: "Die Benelux-Kette", icon: "🔗", desc: "Drei Länder, drei Glieder, ein gemeinsamer Weg." }
    },
    {
      stage: 3,
      type: "decision_dilemma",
      title: "Das große Finale von Kapitel 1",
      storyContext: "Du stehst 1957 vor sechs Türen. Hinter jeder steht eines der Gründerländer. Vor dir liegt eine Entscheidung: Soll Europa bei einzelnen Wirtschaftsprojekten bleiben – oder weiter zusammenwachsen?",
      q: "Welche Entscheidung entspricht am besten dem Weg, den die sechs Gründerstaaten tatsächlich einschlugen?",
      o: [
        "Die Zusammenarbeit nach dem Kohle-und-Stahl-Projekt beenden.",
        "Die wirtschaftliche Zusammenarbeit auf weitere Bereiche ausweiten.",
        "Eine gemeinsame europäische Regierung mit sofortiger vollständiger Macht schaffen.",
        "Die Zusammenarbeit ausschließlich auf militärische Fragen beschränken."
      ],
      a: 1,
      lore: "Die Gründer entschieden sich für mehr Zusammenarbeit, aber nicht für einen europäischen Superstaat über Nacht. Mit den Römischen Verträgen wurde der nächste große Schritt gemacht – und damit endet dein erstes Kapitel genau dort, wo Europas Geschichte richtig Fahrt aufnimmt.",
      relicReward: { name: "Der sechste Gründerstern", icon: "⭐", desc: "Wenn er entzündet wird, verbinden sich die sechs Sterne zum ersten Mal zu einem gemeinsamen Symbol." }
    }
  ],

  // =========================================================================
  // KAPITEL 2: „DIE TÜR STEHT OFFEN“ — DIE ERWEITERUNGEN (1973–1986)
  // =========================================================================
  "Dänemark": [
    {
      stage: 1,
      type: "multiselect",
      title: "Level 1: Wer kam 1973?",
      q: "Welche zwei Länder traten bei der ersten großen Erweiterung 1973 bei? Wähle genau 2 aus:",
      requiredCount: 2,
      items: [
        { name: "Dänemark", flag: "🇩🇰", correct: true },
        { name: "Irland", flag: "🇮🇪", correct: true },
        { name: "Spanien", flag: "🇪🇸", correct: false }
      ],
      lore: "Richtig! Am 1. Januar 1973 traten Dänemark, Irland und das Vereinigte Königreich der Gemeinschaft bei."
    },
    {
      stage: 2,
      type: "choice",
      title: "Level 2: Falsch abgebogen",
      q: "In welchem Jahr trat Dänemark der Europäischen Gemeinschaft bei?",
      o: [
        "1973",
        "1957",
        "1981",
        "1986"
      ],
      a: 0,
      lore: "1973 war die allererste Erweiterungsrunde – Europa wuchs von 6 auf 9 Mitglieder!"
    },
    {
      stage: 3,
      type: "boolean",
      title: "Level 3: Die Euro-Falle",
      q: "Dänemark ist stolzes EU-Mitglied, hat aber eine Ausnahmeregelung (Opt-out) und behielt seine eigene Dänische Krone statt des Euro.",
      o: [
        "✅ Richtig",
        "❌ Falsch"
      ],
      a: 0,
      lore: "Richtig! Dänemark stimmte gegen den Euro und bezahlt bis heute mit dänischen Kronen."
    }
  ],

  "Irland": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: Flaggen-Duell",
      q: "Welches dieser beiden Länder trat 1973 bei der ersten Norderweiterung bei?",
      o: [
        "🇮🇪 Irland",
        "🇮🇹 Italien"
      ],
      a: 0,
      lore: "Irland trat 1973 bei! Italien war hingegen schon seit 1951/57 als Gründungsstaat dabei."
    },
    {
      stage: 2,
      type: "choice",
      title: "Level 2: Paar finden",
      q: "Was verbindet Dänemark (🇩🇰), Irland (🇮🇪) und das Vereinigte Königreich (🇬🇧)?",
      o: [
        "Sie traten 1973 gemeinsam der Europäischen Gemeinschaft bei.",
        "Sie gründeten gemeinsam die Montanunion 1951.",
        "Sie führten alle gleichzeitig den Euro als Währung ein.",
        "Sie schafften als Erste alle Passkontrollen untereinander ab."
      ],
      a: 0,
      lore: "Sie bildeten das historische Trio der Norderweiterung von 1973!"
    },
    {
      stage: 3,
      type: "choice",
      title: "Level 3: Was fehlt?",
      q: "Welche drei Länder gehörten zur ersten Erweiterung 1973?",
      o: [
        "Dänemark, Irland & Vereinigtes Königreich",
        "Dänemark, Schweden & Norwegen",
        "Irland, Island & Schottland",
        "Spanien, Portugal & Griechenland"
      ],
      a: 0,
      lore: "Dänemark, Irland und das Vereinigte Königreich! Auch wenn Großbritannien 2020 die EU verließ (Brexit), ist dies ein wichtiger Teil der Geschichte."
    }
  ],

  "Griechenland": [
    {
      stage: 1,
      type: "slider_estimate",
      title: "Level 1: 1981!",
      q: "In welchem Jahr trat Griechenland als zehntes Mitglied der Europäischen Gemeinschaft bei?",
      targetValue: 1981,
      unit: "Jahr",
      tolerance: 0,
      minVal: 1970,
      maxVal: 1990,
      lore: "Exakt 1981! Griechenland trat am 1. Januar 1981 bei."
    },
    {
      stage: 2,
      type: "timeline_order",
      title: "Level 2: Was musste vorher passieren?",
      q: "Bringe Griechenlands Weg nach Europa in die richtige chronologische Reihenfolge:",
      items: [
        { text: "Ende der Militärdiktatur", order: 1 },
        { text: "Wiederherstellung der Demokratie", order: 2 },
        { text: "Beitritt zur Europäischen Gemeinschaft", order: 3 }
      ],
      lore: "Wichtiges historisches Wissen: Erst nachdem die Obristendiktatur 1974 fiel und Griechenland wieder eine freie Demokratie war, stand die Tür nach Europa offen!"
    },
    {
      stage: 3,
      type: "choice",
      title: "Level 3: Der Geschichtsdetektiv",
      q: "Warum passt Griechenlands Beitritt nicht einfach in die Geschichte „immer mehr Länder treten bei“?",
      o: [
        "Weil die demokratische Entwicklung eine zwingende Voraussetzung für den EU-Beitritt war.",
        "Weil Griechenland damals die größte Wirtschaftsmacht der Welt war.",
        "Weil Griechenland das einzige Land ohne Schifffahrt war.",
        "Weil kein anderes Land in Europa antike Tempel besaß."
      ],
      a: 0,
      lore: "Demokratie und Menschenrechte sind nicht verhandelbar: Nur freie Demokratien dürfen der Europäischen Union beitreten!"
    }
  ],

  "Portugal": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: Nelken- oder Rosenrevolution?",
      q: "Welche friedliche Revolution beendete 1974 die Diktatur in Portugal und ebnete den Weg nach Europa?",
      o: [
        "Die Nelkenrevolution (Revolução dos Cravos)",
        "Die Rosenrevolution",
        "Die Samtene Revolution",
        "Die Orangenrevolution"
      ],
      a: 0,
      lore: "Die Nelkenrevolution am 25. April 1974: Soldaten steckten rote Nelken in ihre Gewehrläufe – ein friedlicher Sieg für Freiheit und Demokratie!"
    },
    {
      stage: 2,
      type: "choice",
      title: "Level 2: Portugal + ?",
      q: "Portugal trat 1986 der EG bei. Welches Nachbarland auf der Iberischen Halbinsel trat am selben Tag bei?",
      o: [
        "Spanien (🇪🇸)",
        "Frankreich (🇫🇷)",
        "Italien (🇮🇹)",
        "Marokko (🇲🇦)"
      ],
      a: 0,
      lore: "Spanien und Portugal traten am 1. Januar 1986 gemeinsam der europäischen Familie bei!"
    },
    {
      stage: 3,
      type: "timeline_order",
      title: "Level 3: Was kam zuerst?",
      q: "Ordne Portugals Meilensteine chronologisch von FRÜH nach SPÄT:",
      items: [
        { text: "Nelkenrevolution", order: 1 },
        { text: "EU-Beitritt", order: 2 },
        { text: "Einführung des Euro", order: 3 }
      ],
      lore: "1974 (Nelkenrevolution) ➔ 1986 (EU-Beitritt) ➔ 1999/2002 (Einführung des Euro)."
    }
  ],

  "Spanien": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: 1986 oder 2004?",
      q: "In welchem Jahr trat Spanien der Europäischen Gemeinschaft bei?",
      o: [
        "1986",
        "2004",
        "1957",
        "1973"
      ],
      a: 0,
      lore: "1986! Nach dem Ende der Franco-Diktatur und der friedlichen Transición fand Spanien seinen festen Platz im demokratischen Europa."
    },
    {
      stage: 2,
      type: "choice",
      title: "Level 2: Finde den Partner",
      q: "Spanien schloss sich Europa 1986 in einer Doppel-Erweiterung an. Wer war der Partnerstaat?",
      o: [
        "Portugal",
        "Griechenland",
        "Irland",
        "Zypern"
      ],
      a: 0,
      lore: "Portugal! Gemeinsam vollendeten die beiden iberischen Staaten ihre Rückkehr zu Wohlstand und Demokratie."
    },
    {
      stage: 3,
      type: "timeline_order",
      title: "Level 3: Europa verändert sich",
      q: "Bringe Spaniens Entwicklung in die richtige chronologische Reihenfolge:",
      items: [
        { text: "Rückkehr zur parlamentarischen Demokratie", order: 1 },
        { text: "Beitritt zur Europäischen Gemeinschaft", order: 2 },
        { text: "Einführung des Euro", order: 3 }
      ],
      lore: "Perfekt! Demokratisierung (1975-1978) ➔ EG-Beitritt (1986) ➔ Euro-Einführung (1999/2002)."
    }
  ],

  // =========================================================================
  // KAPITEL 3: „DIE GRENZE“ — MAUERFALL & MITTELEUROPA (1989–1995)
  // =========================================================================
  "Österreich": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: 1995. Was passiert?",
      q: "Was geschah am 1. Januar 1995 mit Österreich?",
      o: [
        "Österreich trat der Europäischen Union bei.",
        "Österreich gründete die NATO.",
        "Österreich verließ das Schengener Abkommen.",
        "Österreich führte den Schilling als EU-Währung ein."
      ],
      a: 0,
      lore: "1995 traten Österreich, Finnland und Schweden gemeinsam der EU bei – die 'EFTA-Erweiterung'!"
    },
    {
      stage: 2,
      type: "choice",
      title: "Level 2: Wer kam mit Österreich?",
      q: "Welche beiden Länder traten 1995 gemeinsam mit Österreich der EU bei?",
      o: [
        "Finnland & Schweden",
        "Dänemark & Norwegen",
        "Polen & Ungarn",
        "Schweiz & Liechtenstein"
      ],
      a: 0,
      lore: "Finnland und Schweden! Norwegen stimmte in einer Volksabstimmung knapp gegen den Beitritt."
    },
    {
      stage: 3,
      type: "choice",
      title: "Level 3: EU ist nicht gleich Euro",
      q: "Österreich und Schweden traten beide 1995 bei. Welcher Unterschied gilt bei ihrer Währung?",
      o: [
        "Österreich hat den Euro, Schweden behielt die eigene Krone.",
        "Schweden hat den Euro, Österreich hat den Schilling behalten.",
        "Beide Länder nutzen bis heute keinen Euro.",
        "In beiden Ländern ist nur der US-Dollar gesetzliches Zahlungsmittel."
      ],
      a: 0,
      lore: "Ganz genau! Österreich gehört zur Eurozone, Schweden zahlt weiterhin mit schwedischen Kronen."
    }
  ],

  "Ungarn": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: Der erste Riss im Eisernen Vorhang",
      q: "Welches Land baute im Sommer 1989 seine Grenzanlagen zu Österreich ab und ermöglichte Tausenden DDR-Bürgern die Flucht in die Freiheit?",
      o: [
        "Ungarn",
        "Rumänien",
        "Bulgarien",
        "Jugoslawien"
      ],
      a: 0,
      lore: "Ungarn! Das Paneuropäische Picknick im August 1989 an der ungarisch-österreichischen Grenze brachte den Stein ins Rollen, der die Berliner Mauer zu Fall brachte!"
    },
    {
      stage: 2,
      type: "map_target",
      title: "Level 2: Ziehe die Grenze auf",
      q: "Tippe auf der Karte das Nachbarland von Österreich an, das 1989 die Grenze nach Westen öffnete:",
      targetCountry: "Ungarn",
      options: ["Österreich", "Ungarn", "Deutschland", "Frankreich", "Belgien"],
      o: ["Österreich", "Ungarn", "Deutschland", "Frankreich", "Belgien"],
      a: 1,
      lore: "Ausgezeichnet! An der Grenze zwischen Österreich und Ungarn begann der Fall des Eisernen Vorhangs."
    },
    {
      stage: 3,
      type: "timeline_order",
      title: "Level 3: Chronologie der Freiheit",
      q: "Bringe diese welterschütternden Ereignisse in die richtige Reihenfolge:",
      items: [
        { text: "Grenzöffnung Ungarn-Österreich", order: 1 },
        { text: "Fall der Berliner Mauer", order: 2 },
        { text: "Deutsche Wiedervereinigung", order: 3 },
        { text: "Große EU-Osterweiterung", order: 4 }
      ],
      lore: "Sommer 1989 (Ungarns Grenzöffnung) ➔ 9. Nov 1989 (Mauerfall) ➔ 3. Okt 1990 (Wiedervereinigung) ➔ 1. Mai 2004 (EU-Osterweiterung)."
    }
  ],

  "Tschechien": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: Wie hieß der gemeinsame Staat?",
      q: "In welchem gemeinsamen Staat lebten Tschechen und Slowaken bis zur friedlichen Trennung 1993?",
      o: [
        "Tschechoslowakei",
        "Jugoslawien",
        "Österreich-Ungarn",
        "Karpaten-Union"
      ],
      a: 0,
      lore: "Die Tschechoslowakei! 1989 beendete die Samtene Revolution unter Václav Havel friedlich das kommunistische Regime."
    },
    {
      stage: 2,
      type: "choice",
      title: "Level 2: Die friedliche Scheidung",
      q: "Am 1. Januar 1993 teilte sich die Tschechoslowakei ohne jeden Schuss in zwei unabhängige Staaten auf. Welche?",
      o: [
        "Tschechien und die Slowakei",
        "Tschechien und Slowenien",
        "Böhmen und Mähren",
        "Tschechien und Ungarn"
      ],
      a: 0,
      lore: "Tschechien und die Slowakei trennten sich in gegenseitigem Respekt ('Samtene Scheidung') und sind heute engste EU-Partner!"
    },
    {
      stage: 3,
      type: "timeline_order",
      title: "Level 3: Was kam zuerst?",
      q: "Bringe die tschechischen Meilensteine in die richtige Reihenfolge:",
      items: [
        { text: "Samtene Revolution", order: 1 },
        { text: "Friedliche Trennung Tschechien & Slowakei", order: 2 },
        { text: "Gemeinsamer EU-Beitritt", order: 3 }
      ],
      lore: "1989 (Samtene Revolution) ➔ 1993 (Auflösung der Tschechoslowakei) ➔ 2004 (EU-Beitritt beider Staaten)."
    }
  ],

  "Finnland": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: Nordische Erweiterung 1995",
      q: "Welches nordische Land trat 1995 gemeinsam mit Schweden und Österreich der Europäischen Union bei?",
      o: [
        "Finnland",
        "Norwegen",
        "Island",
        "Grönland"
      ],
      a: 0,
      lore: "Finnland trat 1995 der EU bei und brachte enorme Spitzenleistungen in Technologie und Bildung mit!"
    },
    {
      stage: 2,
      type: "boolean",
      title: "Level 2: Der Euro im Norden",
      q: "Finnland führte als einziges Land unter den nordischen Staaten (Dänemark, Schweden, Finnland) den Euro als offizielle Währung ein.",
      o: [
        "✅ Richtig",
        "❌ Falsch"
      ],
      a: 0,
      lore: "Absolut richtig! In Finnland bezahlt man mit dem Euro, während Schweden und Dänemark ihre Kronen behielten."
    },
    {
      stage: 3,
      type: "choice",
      title: "Level 3: Spitzenbildung in Europa",
      q: "Wofür ist Finnland in der Europäischen Union weltweit als Vorbild bekannt?",
      o: [
        "Für sein herausragendes Bildungssystem und Chancengleichheit",
        "Für den größten Olivenanbau Europas",
        "Für die größte Wüstenlandschaft des Kontinents",
        "Für die meisten tropischen Korallenriffe"
      ],
      a: 0,
      lore: "Finnlands Schulen schneiden bei PISA-Studien regelmäßig an der Weltspitze ab – ein Leuchtturm europäischer Bildung!"
    }
  ],

  "Schweden": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: Das Volk entscheidet 1994",
      q: "Wie entschieden die schwedischen Bürger im November 1994 über den Beitritt zur Europäischen Union?",
      o: [
        "Mit einer knappen Mehrheit in einer Volksabstimmung für den Beitritt",
        "Durch einen königlichen Erlass ohne die Bevölkerung zu fragen",
        "Durch einstimmigen Beschluss des Parlaments gegen die EU",
        "Durch ein Losverfahren unter allen Bürgern"
      ],
      a: 0,
      lore: "Mit 52,3 % stimmte die schwedische Bevölkerung für den EU-Beitritt, der am 1. Januar 1995 wirksam wurde."
    },
    {
      stage: 2,
      type: "choice",
      title: "Level 2: Welches Zahlungsmittel?",
      q: "Welche Währung nutzt Schweden bis heute für den täglichen Einkauf?",
      o: [
        "Schwedische Krone (SEK)",
        "Euro (EUR)",
        "Schwedischer Franken",
        "Schwedischer Taler"
      ],
      a: 0,
      lore: "In Schweden zahlt man mit schwedischen Kronen (fast ausschließlich digital per Karte oder Handy)!"
    },
    {
      stage: 3,
      type: "choice",
      title: "Level 3: Transparenz & Rechte",
      q: "Welches demokratische Prinzip brachte Schweden als Pionier in die europäische Verwaltung ein?",
      o: [
        "Das Öffentlichkeitsprinzip (Zugang aller Bürger zu offiziellen Akten)",
        "Die Abschaffung jeglicher Gerichte",
        "Das Verbot von Zeitungen und Medien",
        "Die Geheimhaltung aller Regierungssitzungen"
      ],
      a: 0,
      lore: "Schweden erfand das Öffentlichkeitsprinzip bereits 1766 – ein Meilenstein für Bürgerbeteiligung und Transparenz in der EU."
    }
  ],

  // =========================================================================
  // KAPITEL 4: „10 NEUE STERNE“ — DIE GROSSE OSTERWEITERUNG (2004)
  // =========================================================================
  "Polen": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: Die Solidarność-Bewegung",
      q: "Welche polnische Gewerkschaftsbewegung unter Lech Wałęsa leitete in den 1980er-Jahren den Zusammenbruch des Kommunismus ein?",
      o: [
        "Solidarność (Solidarität)",
        "Perestroika",
        "Charta 77",
        "Aufbruch 89"
      ],
      a: 0,
      lore: "Die Solidarność in den Danziger Werften zeigte der Welt, wie mutiger, gewaltloser Protest Diktaturen zu Fall bringen kann!"
    },
    {
      stage: 2,
      type: "slider_estimate",
      title: "Level 2: 10 Staaten gleichzeitig!",
      q: "Wie viele Länder traten am historischen 1. Mai 2004 bei der bisher größten EU-Erweiterung gleichzeitig bei?",
      targetValue: 10,
      unit: "Staaten",
      tolerance: 0,
      minVal: 5,
      maxVal: 15,
      lore: "Genau 10 Staaten! Polen, Tschechien, Ungarn, Slowakei, Slowenien, Estland, Lettland, Litauen, Malta und Zypern."
    },
    {
      stage: 3,
      type: "choice",
      title: "Level 3: Die Überwindung der Teilung",
      q: "Warum bezeichnet man die Osterweiterung von 2004 oft als historisches Wunder?",
      o: [
        "Weil sie die künstliche Teilung Europas durch den Kalten Krieg endgültig überwand.",
        "Weil alle 10 Länder über Nacht beschlossen, dieselbe Sprache zu sprechen.",
        "Weil es die einzige Erweiterung war, die auf einer einsamen Insel stattfand.",
        "Weil dabei alle bisherigen EU-Mitglieder die Union verließen."
      ],
      a: 0,
      lore: "Die Osterweiterung vereinte Ost und West – über 100 Millionen Menschen wurden Teil des gemeinsamen freien Europas!"
    }
  ],

  "Slowakei": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: Beitritt 2004",
      q: "Wann trat die Slowakei gemeinsam mit neun weiteren Partnern der Europäischen Union bei?",
      o: [
        "Am 1. Mai 2004",
        "Am 1. Januar 1995",
        "Am 3. Oktober 1990",
        "Am 1. Januar 2013"
      ],
      a: 0,
      lore: "Am 1. Mai 2004 trat die Slowakei der EU bei!"
    },
    {
      stage: 2,
      type: "choice",
      title: "Level 2: Schneller zum Euro",
      q: "Welche gemeinsame Währung führte die Slowakei bereits 2009 als einer der ersten Staaten aus der 2004er-Erweiterung ein?",
      o: [
        "Den Euro (€)",
        "Die Slowakische Krone",
        "Den US-Dollar",
        "Das Schweizer Pfund"
      ],
      a: 0,
      lore: "Bereits 2009 ersetzte die Slowakei die Krone durch den Euro – ein rascher wirtschaftlicher Aufstieg!"
    },
    {
      stage: 3,
      type: "choice",
      title: "Level 3: Visegrád-Kooperation",
      q: "Mit welchen drei Nachbarländern bildet die Slowakei die traditionsreiche Visegrád-Gruppe (V4)?",
      o: [
        "Polen, Tschechien und Ungarn",
        "Deutschland, Österreich und Schweiz",
        "Schweden, Norwegen und Dänemark",
        "Rumänien, Bulgarien und Griechenland"
      ],
      a: 0,
      lore: "Polen, Tschechien, Slowakei und Ungarn arbeiten seit 1991 in der Visegrád-Gruppe eng zusammen."
    }
  ],

  "Slowenien": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: Aus dem ehemaligen Jugoslawien",
      q: "Was machte Sloweniens Beitritt im Jahr 2004 historisch so einzigartig?",
      o: [
        "Es war der erste Staat aus dem ehemaligen Jugoslawien, der der EU beitrat.",
        "Es war der größte Staat nach Fläche in der gesamten Union.",
        "Es war das erste Land, das keinen einzigen Nachbarstaat besaß.",
        "Es hatte vorher noch nie eine eigene Flagge gehabt."
      ],
      a: 0,
      lore: "Slowenien war der Pionier aus dem westlichen Balkan und führte 2007 als Allererster der 2004er-Gruppe den Euro ein!"
    },
    {
      stage: 2,
      type: "boolean",
      title: "Level 2: Musterschüler bei Euro & Schengen",
      q: "Slowenien gehört heute sowohl zur Eurozone (Euro als Währung) als auch zum Schengen-Raum (keine Passkontrollen zu Nachbarn wie Österreich und Italien).",
      o: [
        "✅ Richtig",
        "❌ Falsch"
      ],
      a: 0,
      lore: "Vollkommen richtig! Slowenien ist vollständig in alle europäischen Kernbereiche integriert."
    },
    {
      stage: 3,
      type: "choice",
      title: "Level 3: Das grüne Juwel",
      q: "Welcher Naturreichtum zeichnet Slowenien in der Europäischen Union besonders aus?",
      o: [
        "Über 60 % des Landes sind von dichten, geschützten Wäldern bedeckt.",
        "Es besteht zu 90 % aus karger Wüste.",
        "Es hat keine Berge oder Flüsse.",
        "Es liegt am Südpol."
      ],
      a: 0,
      lore: "Slowenien gehört zu den waldreichsten und ökologisch intaktesten Ländern in ganz Europa!"
    }
  ],

  "Estland": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: Die Singende Revolution",
      q: "Wie erkämpften sich die Menschen in Estland, Lettland und Litauen um 1990 friedlich ihre Freiheit von der Sowjetunion?",
      o: [
        "Durch die Singende Revolution und eine 600 km lange Menschenkette",
        "Durch einen Angriff mit Panzern",
        "Durch den Kauf des Landes mit Gold",
        "Durch ein Geheimpapier im Ausland"
      ],
      a: 0,
      lore: "Hunderte Millionen Lieder und zwei Millionen Menschen Hand in Hand im 'Baltischen Weg' 1989 – eine der friedlichsten Freiheitsbewegungen der Menschheit!"
    },
    {
      stage: 2,
      type: "choice",
      title: "Level 2: e-Estonia – Der digitale Vorreiter",
      q: "Wofür gilt Estland heute in der EU und weltweit als absoluter Spitzenreiter?",
      o: [
        "Digitale Verwaltung: 99 % aller Behördengänge und Wahlen online",
        "Den Anbau von Ananas",
        "Die Erzeugung von Strom nur durch Dampfloks",
        "Die Abschaffung des Internets"
      ],
      a: 0,
      lore: "In Estland kann fast alles per Bürgerkarte online erledigt werden – von der Steuererklärung in 3 Minuten bis zur Online-Wahl!"
    },
    {
      stage: 3,
      type: "choice",
      title: "Level 3: Estland & der Euro",
      q: "Welche Währung löste in Estland 2011 die Estnische Krone ab?",
      o: [
        "Der Euro",
        "Der Rubel",
        "Das Britische Pfund",
        "Die Schwedische Krone"
      ],
      a: 0,
      lore: "2011 führte Estland den Euro ein und besiegelte seine feste Verankerung in der westlichen Wertegemeinschaft."
    }
  ],

  "Lettland": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: Der Baltische Weg 1989",
      q: "Wie lang war die Menschenkette des 'Baltischen Wegs', die am 23. August 1989 durch Tallinn, Riga und Vilnius führte?",
      o: [
        "Über 600 Kilometer",
        "Nur 5 Kilometer",
        "Exakt 50 Meter",
        "Über 10.000 Kilometer"
      ],
      a: 0,
      lore: "Über 600 km! Zwei Millionen Menschen forderten friedlich die Unabhängigkeit der drei baltischen Staaten."
    },
    {
      stage: 2,
      type: "choice",
      title: "Level 2: Beitritt 2004",
      q: "Wann trat Lettland gemeinsam mit Estland, Litauen und sieben weiteren Staaten der EU bei?",
      o: [
        "2004",
        "1990",
        "1981",
        "2013"
      ],
      a: 0,
      lore: "2004! Lettland kehrte nach Jahrzehnten sowjetischer Besatzung dorthin zurück, wo es hingehört: in die Mitte Europas."
    },
    {
      stage: 3,
      type: "choice",
      title: "Level 3: Hauptstadt an der Daugava",
      q: "Welche wunderschöne Jugendstil-Metropole ist die Hauptstadt Lettlands?",
      o: [
        "Riga",
        "Vilnius",
        "Tallinn",
        "Helsinki"
      ],
      a: 0,
      lore: "Riga! Bekannt für die größte Dichte an Jugendstil-Architektur weltweit und eine lebendige europäische Kulturszene."
    }
  ],

  "Litauen": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: Der erste freie Schritt",
      q: "Litauen war am 11. März 1990 der allererste Staat, der sich mutig für unabhängig von der Sowjetunion erklärte. Welcher baltische Staat war es?",
      o: [
        "Litauen",
        "Belarus",
        "Kasachstan",
        "Moldau"
      ],
      a: 0,
      lore: "Litauen zeigte enormen Mut und leitete den endgültigen Zerfall der sowjetischen Unterdrückung ein."
    },
    {
      stage: 2,
      type: "choice",
      title: "Level 2: Geografischer Mittelpunkt",
      q: "Welcher geografische Rekordpunkt wurde von französischen Wissenschaftlern nahe Vilnius in Litauen berechnet?",
      o: [
        "Der geografische Mittelpunkt Europas",
        "Der höchste Berg der EU",
        "Die längste Küste Europas",
        "Der tiefste Meeresgraben der Welt"
      ],
      a: 0,
      lore: "Das Geografische Institut von Paris berechnete 1989 den exakten geografischen Mittelpunkt Europas bei Girija nahe Vilnius!"
    },
    {
      stage: 3,
      type: "choice",
      title: "Level 3: Euro 2015",
      q: "Litauen trat 2015 als 19. Land welchem wichtigen gemeinsamen Währungsraum bei?",
      o: [
        "Der Eurozone",
        "Der Rubelzone",
        "Dem Dollarblock",
        "Der Kronengemeinschaft"
      ],
      a: 0,
      lore: "2015 vollendete Litauen die Euro-Einführung im gesamten Baltikum!"
    }
  ],

  "Malta": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: Der Inselstaat im Mittelmeer",
      q: "Welcher sonnige Inselstaat trat 2004 der EU bei und ist das flächenmäßig kleinste Mitglied der Union?",
      o: [
        "Malta",
        "Mallorca",
        "Kreta",
        "Sardinien"
      ],
      a: 0,
      lore: "Malta! Mit nur 316 Quadratkilometern Fläche hat Malta als eigenständiger Staat ein volles Stimmrecht im EU-Ministerrat."
    },
    {
      stage: 2,
      type: "choice",
      title: "Level 2: Zwei Amtssprachen",
      q: "Welche beiden offiziellen Amtssprachen hat die Republik Malta?",
      o: [
        "Maltesisch und Englisch",
        "Maltesisch und Italienisch",
        "Englisch und Französisch",
        "Arabisch und Griechisch"
      ],
      a: 0,
      lore: "Maltesisch (die einzige semitische Sprache mit lateinischer Schrift in der EU) und Englisch sind offizielle Amtssprachen."
    },
    {
      stage: 3,
      type: "choice",
      title: "Level 3: Beitritt zum Euro 2008",
      q: "Welche europäische Währung ersetzte 2008 die maltesische Lira?",
      o: [
        "Der Euro",
        "Das Pfund Sterling",
        "Die Peseta",
        "Der Dinar"
      ],
      a: 0,
      lore: "Seit 2008 zahlt man auf Malta mit dem Euro – verziert mit dem historischen Malteserkreuz auf den Münzen!"
    }
  ],

  "Zypern": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: Geteilte Insel im östlichen Mittelmeer",
      q: "Welcher Inselstaat trat am 1. Mai 2004 der Europäischen Union bei?",
      o: [
        "Zypern",
        "Rhodos",
        "Korfu",
        "Sizilien"
      ],
      a: 0,
      lore: "Zypern! Obwohl der Nordteil seit 1974 besetzt ist, ist die gesamte Republik Zypern völkerrechtlich EU-Gebiet."
    },
    {
      stage: 2,
      type: "choice",
      title: "Level 2: Brücke der Kulturen",
      q: "An welcher geopolitischen Schnittstelle liegt Zypern?",
      o: [
        "Zwischen Europa, Asien und dem Nahen Osten",
        "Zwischen Island und Grönland",
        "Zwischen Spanien und Portugal",
        "Mitten in der Nordsee"
      ],
      a: 0,
      lore: "Zypern bildet den südöstlichsten Außenposten der EU und ist eine historische Drehscheibe für Handel und Kultur."
    },
    {
      stage: 3,
      type: "choice",
      title: "Level 3: Euro 2008",
      q: "Gemeinsam mit welchem anderen Inselstaat führte Zypern am 1. Januar 2008 den Euro ein?",
      o: [
        "Malta",
        "Island",
        "Irland",
        "Großbritannien"
      ],
      a: 0,
      lore: "Gemeinsam mit Malta führte Zypern 2008 den Euro ein!"
    }
  ],

  // =========================================================================
  // KAPITEL 5: „EUROPA WIRD GRÖSSER & DAS FINALE“ (2007–2013)
  // =========================================================================
  "Bulgarien": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: 2007 oder 2004?",
      q: "In welchem Jahr traten Bulgarien und Rumänien gemeinsam der Europäischen Union bei?",
      o: [
        "2007",
        "2004",
        "1995",
        "2013"
      ],
      a: 0,
      lore: "Am 1. Januar 2007 traten Bulgarien und Rumänien bei!"
    },
    {
      stage: 2,
      type: "choice",
      title: "Level 2: Wer kam gleichzeitig?",
      q: "Welches Nachbarland an der Donau und am Schwarzen Meer trat am selben Tag wie Bulgarien bei?",
      o: [
        "Rumänien",
        "Serbien",
        "Türkei",
        "Nordmazedonien"
      ],
      a: 0,
      lore: "Rumänien und Bulgarien vollendeten gemeinsam die Schwarzmeer-Erweiterung."
    },
    {
      stage: 3,
      type: "choice",
      title: "Level 3: Das dritte Alphabet",
      q: "Welches dritte offizielle Alphabet brachte Bulgarien mit seinem EU-Beitritt in die Union ein?",
      o: [
        "Das kyrillische Alphabet (neben Lateinisch und Griechisch)",
        "Das arabische Alphabet",
        "Die altägyptischen Hieroglyphen",
        "Die Keilschrift"
      ],
      a: 0,
      lore: "Das kyrillische Alphabet! Deshalb steht auf allen Euro-Banknoten neben 'EURO' und 'ΕΥΡΩ' auch 'ЕВРО'!"
    }
  ],

  "Rumänien": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: Finde den Partner",
      q: "Welcher Staat trat 2007 gemeinsam mit Rumänien der EU bei?",
      o: [
        "Bulgarien",
        "Ungarn",
        "Ukraine",
        "Moldau"
      ],
      a: 0,
      lore: "Bulgarien! Mit den beiden Staaten wuchs die Union auf 27 Mitglieder an."
    },
    {
      stage: 2,
      type: "choice",
      title: "Level 2: 2004 vs. 2007",
      q: "Zu welcher Erweiterungsrunde gehört Rumänien?",
      o: [
        "Zur Südost-Erweiterung von 2007",
        "Zur großen Osterweiterung von 2004",
        "Zur Norderweiterung von 1973",
        "Zur Mittelmeer-Erweiterung von 1981"
      ],
      a: 0,
      lore: "Rumänien bereitete sich bis 2007 intensiv auf Justiz- und Wirtschaftsreformen vor und trat dann stolz bei."
    },
    {
      stage: 3,
      type: "choice",
      title: "Level 3: Fast am Ziel",
      q: "Nach Rumäniens und Bulgariens Beitritt 2007 fehlte nur noch ein einziges Land, das 2013 als 28. Mitglied hinzukam. Welches?",
      o: [
        "Kroatien",
        "Norwegen",
        "Albanien",
        "Montenegro"
      ],
      a: 0,
      lore: "Kroatien! Es war der bisher letzte Neuzugang der Europäischen Union."
    }
  ],

  "Kroatien": [
    {
      stage: 1,
      type: "choice",
      title: "Level 1: Der 28. Stern",
      q: "Welches Land wurde am 1. Juli 2013 das bisher jüngste Mitglied der Europäischen Union?",
      o: [
        "Kroatien",
        "Bosnien und Herzegowina",
        "Serbien",
        "Island"
      ],
      a: 0,
      lore: "Kroatien! Am 1. Juli 2013 feierten Hunderttausende auf den Straßen von Zagreb den historischen Beitritt zur EU."
    },
    {
      stage: 2,
      type: "timeline_order",
      title: "Level 2: Kroatiens europäischer Weg",
      q: "Ordne Kroatiens Meilensteine chronologisch von FRÜH nach SPÄT:",
      items: [
        { text: "Beitritt zur Europäischen Union", order: 1 },
        { text: "Einführung des Euro", order: 2 },
        { text: "Beitritt zum grenzkontrollfreien Schengen-Raum", order: 3 }
      ],
      lore: "2013 (EU-Beitritt) ➔ 1. Januar 2023 (gleichzeitige Einführung des Euro und Wegfall aller Passkontrollen im Schengen-Raum)!"
    },
    {
      stage: 3,
      type: "multiselect",
      title: "Level 3: Die letzte Entscheidung — Europas Werte",
      q: "Du hast Europa durch seine Geschichte begleitet. Aber was ist das wahre Fundament unseres vereinten Europas? Wähle die 3 passenden Grundwerte:",
      requiredCount: 3,
      items: [
        { name: "🕊️ Frieden & Demokratie", correct: true },
        { name: "🤝 Zusammenarbeit & Solidarität", correct: true },
        { name: "🌍 Gemeinsame Lösungen für globale Krisen", correct: true },
        { name: "❌ Alle Länder sollen gleichförmig und identisch werden", correct: false }
      ],
      lore: "Wunderschön gelöst! In Vielfalt geeint (In varietate concordia): Europa bewahrt die Einzigartigkeit jeder Kultur, während wir bei Freiheit, Menschenrechten und Frieden unerschütterlich zusammenstehen!"
    }
  ]
};

if (typeof window !== 'undefined') {
  window.StoryQuestionsPool = StoryQuestionsPool;
}
