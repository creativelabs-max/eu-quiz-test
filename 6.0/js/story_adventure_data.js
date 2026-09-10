/**
 * Expedition Europa — Data-Driven Story & Adventure Registry (Version 6.0)
 * Integrated Landmark Cutscenes, Adaptive Dialogue Feedback & Strict Mastery Progression
 */

const StoryCharacters = {
  klaus: {
    id: "klaus",
    name: "Bot Klaus",
    role: "Expeditions-Co-Pilot",
    avatar: "assets/story/pilot_klaus.jpg",
    color: "#06b6d4"
  },
  marta: {
    id: "marta",
    name: "Márta",
    role: "Archivarin an der Donau",
    avatar: "assets/avatars/diplomat_female.jpg",
    color: "#f59e0b"
  },
  elena: {
    id: "elena",
    name: "Diplomatin Elena",
    role: "EU-Beauftragte",
    avatar: "assets/avatars/diplomat_female.jpg",
    color: "#3b82f6"
  },
  sophia: {
    id: "sophia",
    name: "Sophia",
    role: "Historikerin & Kulturforscherin",
    avatar: "assets/avatars/scholar.jpg",
    color: "#10b981"
  },
  alexander: {
    id: "alexander",
    name: "Alexander",
    role: "Bibliothekar der Akademie",
    avatar: "assets/avatars/scholar.jpg",
    color: "#8b5cf6"
  },
  jean: {
    id: "jean",
    name: "Jean Monnet",
    role: "Architekt der europäischen Einheit",
    avatar: "assets/avatars/scholar.jpg",
    color: "#f59e0b"
  },
  konrad: {
    id: "konrad",
    name: "Kanzlerberater Weber",
    role: "Archiv für deutsche Einheit",
    avatar: "assets/avatars/scholar.jpg",
    color: "#3b82f6"
  },
  pierre: {
    id: "pierre",
    name: "Kurator Pierre",
    role: "Louvre & Quai d’Orsay",
    avatar: "assets/avatars/scholar.jpg",
    color: "#8b5cf6"
  },
  giovanni: {
    id: "giovanni",
    name: "Dottore Giovanni",
    role: "Kapitol-Archiv Rom",
    avatar: "assets/avatars/scholar.jpg",
    color: "#ef4444"
  }
};

const StoryAdventureData = {
  // =========================================================================
  // KAPITEL 1 — BELGIEN: Das Geheimnis des Atomium-Kristalls
  // =========================================================================
  "Belgien": {
    country: "Belgien",
    flag: "🇧🇪",
    chapter: 1,
    title: "Das Geheimnis des Atomium-Kristalls",
    relicId: "Atomium-Kristall",
    startScene: "belgium_arrival",
    scenes: {
      "belgium_arrival": {
        id: "belgium_arrival",
        title: "Station Brüssel: Das futuristische Heysel-Plateau",
        landmarkImage: "assets/landmarks/belgium.jpg",
        landmarkTitle: "Das Atomium & Europaviertel • Brüssel",
        music: "ambient",
        dialogue: [
          { speaker: "klaus", text: "Brüssel! Das 102 Meter hohe Atomium stellt eine 165-milliardenfach vergrößerte Eisen-Kristallzelle dar!" },
          { speaker: "jean", text: "Willkommen in der Hauptstadt Europas! Als Gründervater der Union bewache ich den ersten Schlüssel." },
          { speaker: "jean", text: "Der Atomium-Kristall birgt die Ur-Energie unseres Bündnisses. Beweise, dass du die Vielfalt und Institutionen Europas verstehst!" }
        ],
        choices: [
          { text: "„Herr Monnet, wir nehmen die Herausforderung an!“", choiceId: "belgium_direct", nextScene: "belgium_stage_1" },
          { text: "„Welche drei Amtssprachen werden in Belgien eigentlich offiziell gesprochen?“", choiceId: "belgium_explore", nextScene: "belgium_archive_explore" }
        ]
      },
      "belgium_archive_explore": {
        id: "belgium_archive_explore",
        title: "Sprachenvielfalt in Brüssel",
        dialogue: [
          { speaker: "jean", text: "Belgien ist ein faszinierendes Miniatur-Europa: Im Norden wird Niederländisch (Flämisch) gesprochen, im Süden Französisch (Wallonisch) und im Osten Deutsch!" },
          { speaker: "klaus", text: "Drei Sprachgemeinschaften in einem Staat – genau diese Brückenbauer-Rolle macht Brüssel zum perfekten Sitz der EU-Institutionen!" }
        ],
        choices: [
          { text: "„Verstanden! Jetzt zur 1. Prüfung ➔“", nextScene: "belgium_stage_1" }
        ]
      },
      "belgium_stage_1": {
        id: "belgium_stage_1",
        title: "Etappe 1: Das Benelux-Fundament",
        mission: {
          id: "m_belgium_1",
          missionType: "quiz",
          title: "Die Pionier-Zollunion",
          desc: "Welcher historische Dreierbund legte bereits vor der EU den Grundstein für offene Grenzen?",
          rewardXP: 100,
          rewardItem: { id: "benelux_vertrag", name: "📜 Benelux-Urkunde", icon: "📜", desc: "Historischer Gründungsvertrag der Benelux-Wirtschaftsunion." },
          clue: "Hinweis: Belgien, die Niederlande und Luxemburg schlossen sich als Erste zusammen.",
          question: {
            q: "Aus welchen drei Ländern besteht der 'Benelux'-Bund, der als Testlabor und Keimzelle für das spätere vereinte Europa diente?",
            options: [
              "Belgien, Niederlande & Luxemburg",
              "Belgien, Norwegen & Litauen",
              "Bulgarien, Estland & Luxemburg",
              "Bayern, Niedersachsen & Leipzig"
            ],
            correctIndex: 0,
            lore: "Die Benelux-Staaten schafften als Allererste die Zölle untereinander ab und zeigten der Welt, wie europäische Integration funktioniert."
          },
          onSuccessScene: "belgium_q1_success",
          onFailScene: "belgium_q1_fail"
        }
      },
      "belgium_q1_success": {
        id: "belgium_q1_success",
        title: "Erstes Siegel geöffnet!",
        dialogue: [
          { speaker: "jean", text: "Exzellent! Die Praline ist korrekt! Das erste Sicherheitsschloss springt auf!" },
          { speaker: "klaus", text: "Der Fahrstuhl bringt uns hinauf in die mittlere Sphäre des Atomiums. Jetzt folgt der Schätz-Sensor!" }
        ],
        choices: [
          { text: "„Weiter zu Etappe 2: Der Schätz-Sensor der Weltausstellung ➔“", nextScene: "belgium_stage_2" }
        ]
      },
      "belgium_q1_fail": {
        id: "belgium_q1_fail",
        title: "Klaus kalibriert nach",
        dialogue: [
          { speaker: "klaus", text: "Kopf hoch, Pilot! Es war natürlich die Praline! Wir lassen uns nicht aufhalten, auf zur nächsten Sphäre!" }
        ],
        choices: [
          { text: "„Weiter zu Etappe 2!“", nextScene: "belgium_stage_2" }
        ]
      },
      "belgium_stage_2": {
        id: "belgium_stage_2",
        title: "Etappe 2: Der Weltausstellungs-Sensor",
        dialogue: [
          { speaker: "jean", text: "Das Atomium wurde als Symbol für wissenschaftlichen Fortschritt zur Weltausstellung errichtet. Schätze das exakte Eröffnungsjahr auf dem Regler!" }
        ],
        mission: {
          id: "m_belgium_2",
          missionType: "slider_estimate",
          targetValue: 1958,
          unit: "Jahr",
          tolerance: 3,
          minVal: 1945,
          maxVal: 1975,
          title: "Expo-Zeitschätz-Sensor",
          desc: "Stelle das Jahr der historischen Brüsseler Weltausstellung ein.",
          rewardXP: 120,
          question: {
            q: "In welchem Jahr fand die legendäre Weltausstellung Expo in Brüssel statt, für die das Atomium erbaut wurde?",
            options: ["1958"],
            correctIndex: 0,
            lore: "Die Expo 58 in Brüssel war die erste große Weltausstellung nach dem Zweiten Weltkrieg."
          },
          onSuccessScene: "belgium_q2_success",
          onFailScene: "belgium_q2_fail"
        }
      },
      "belgium_q2_success": {
        id: "belgium_q2_success",
        title: "Zweites Siegel geöffnet!",
        dialogue: [
          { speaker: "jean", text: "Präzision auf den Punkt! 1958 erstrahlte Brüssel im Glanz der friedlichen Zukunft!" },
          { speaker: "klaus", text: "Wir stehen direkt vor dem Tresor der obersten Kugel. Nur noch der Wahr/Falsch Schnellscan!" }
        ],
        choices: [
          { text: "„Zum Finale: Relikt-Bergung ➔“", nextScene: "belgium_stage_3" }
        ]
      },
      "belgium_q2_fail": {
        id: "belgium_q2_fail",
        title: "Fokus auf die Spitze!",
        dialogue: [
          { speaker: "klaus", text: "Es war 1958! Jetzt volle Konzentration auf die Finalprüfung in der Panoramakugel!" }
        ],
        choices: [
          { text: "„Zur Finalen Bergung!“", nextScene: "belgium_stage_3" }
        ]
      },
      "belgium_stage_3": {
        id: "belgium_stage_3",
        title: "Etappe 3: Die Bergung des Atomium-Kristalls",
        dialogue: [
          { speaker: "jean", text: "Blitzentscheidung für das finale Siegel: Beantworte diese Frage zur europäischen Hauptstadt Brüssel!" }
        ],
        mission: {
          id: "m_belgium_3",
          missionType: "true_false",
          isTrue: true,
          title: "Das Herz der EU-Institutionen",
          desc: "Urteile über den Status von Brüssel in der EU:",
          rewardXP: 150,
          rewardItem: { id: "relic_Belgien", name: "⚛️ Atomium-Kristall", icon: "⚛️", desc: "Symbol für wissenschaftlichen Fortschritt und europäische Forschung." },
          clue: "Hinweis: Brüssel beherbergt die Hauptsitze der EU-Kommission und des Ministerrates.",
          question: {
            q: "Stimmt es, dass sowohl die Europäische Kommission als auch der Rat der Europäischen Union ihren Hauptsitz in Brüssel haben?",
            options: ["Wahr", "Falsch"],
            correctIndex: 0,
            lore: "Brüssel ist das exekutive Zentrum Europas mit dem Berlaymont-Gebäude und dem Ratsgebäude Europa."
          },
          onSuccessScene: "belgium_conclusion",
          onFailScene: "belgium_conclusion"
        }
      },
      "belgium_conclusion": {
        id: "belgium_conclusion",
        title: "Triumph in Brüssel!",
        dialogue: [
          { speaker: "jean", text: "Bravo, Piloten! Das Relikt 'Atomium-Kristall' gehört euch! Ihr habt das Fundament der europäischen Idee mit Bravour gemeistert." },
          { speaker: "klaus", text: "Unser Schengen-Visum für Belgien ist gestempelt! Nächster Halt: Deutschland und das Tor der Freiheit!" }
        ],
        choices: [
          { text: "„Visum stempeln & Kurs auf Berlin setzen ➔“", action: "completeCountryAdventure" }
        ]
      }
    }
  },

  // =========================================================================
  // KAPITEL 1 — DEUTSCHLAND: Der Mauerstein der Freiheit
  // =========================================================================
  "Deutschland": {
    country: "Deutschland",
    flag: "🇩🇪",
    chapter: 1,
    title: "Der Mauerstein der Freiheit",
    relicId: "Berliner Mauerstein",
    startScene: "germany_arrival",
    scenes: {
      "germany_arrival": {
        id: "germany_arrival",
        title: "Station Berlin: Am Brandenburger Tor",
        landmarkImage: "assets/landmarks/germany.jpg",
        landmarkTitle: "Brandenburger Tor & Reichstag • Berlin",
        dialogue: [
          { speaker: "klaus", text: "Gänsehaut, Pilot! Wir stehen direkt vor dem Brandenburger Tor – wo einst Stacheldraht Europa trennte!" },
          { speaker: "konrad", text: "Guten Tag! Ich bin Archivar Weber. Hier in Berlin spürt man die europäische Einigung an jeder Ecke." },
          { speaker: "konrad", text: "Um das legendäre Relikt 'Berliner Mauerstein' für euer Europa-Museum zu bergen, müsst ihr 3 Prüfungen zur Überwindung von Grenzen bestehen!" }
        ],
        choices: [
          { text: "„Wir sind bereit, die Geschichte der Einheit zu erforschen!“", choiceId: "de_ready", nextScene: "germany_stage_1" },
          { text: "„Wie hat der Mauerfall 1989 ganz Europa verändert?“", choiceId: "de_dialogue", nextScene: "germany_dialogue_lore" }
        ]
      },
      "germany_dialogue_lore": {
        id: "germany_dialogue_lore",
        title: "Gespräch über den Mauerfall",
        dialogue: [
          { speaker: "konrad", text: "Am 9. November 1989 fiel nicht nur eine Mauer in Berlin – es war der Startschuss für die Wiedervereinigung des gesamten europäischen Kontinents!" },
          { speaker: "klaus", text: "Wahre Worte! Packen wir die erste Aufgabe an!" }
        ],
        choices: [
          { text: "„Zur 1. Etappe: Das Brandenburger Tor ➔“", nextScene: "germany_stage_1" }
        ]
      },
      "germany_stage_1": {
        id: "germany_stage_1",
        title: "Etappe 1: Das Symbol der Freiheit",
        mission: {
          id: "m_germany_1",
          missionType: "quiz",
          title: "Das Freiheitstor von Berlin",
          desc: "Identifiziere das weltbekannte Monument der deutschen und europäischen Einheit.",
          rewardXP: 100,
          rewardItem: { id: "tor_kupferstich", name: "🏛️ Tor-Kupferstich", icon: "🏛️", desc: "Historische Zeichnung des Brandenburger Tors von 1791." },
          clue: "Hinweis: Das Brandenburger Tor stand jahrzehntelang im Todesstreifen und ist heute das Symbol der Freiheit.",
          question: {
            q: "Welches weltberühmte Bauwerk in Berlin stand jahrzehntelang an der Grenze und wurde 1989 zum Symbol der europäischen Einheit?",
            options: ["Das Brandenburger Tor", "Der Kölner Dom", "Schloss Neuschwanstein", "Die Frankfurter Paulskirche"],
            correctIndex: 0,
            lore: "Am Brandenburger Tor feierten am 9. November 1989 zehntausende Menschen das Ende der Teilung."
          },
          onSuccessScene: "germany_q1_success",
          onFailScene: "germany_q1_fail"
        }
      },
      "germany_q1_success": {
        id: "germany_q1_success",
        title: "Erste Hürde gemeistert!",
        dialogue: [
          { speaker: "konrad", text: "Hervorragend! Das Brandenburger Tor ist das unverkennbare Wahrzeichen!" },
          { speaker: "klaus", text: "Jetzt folgt der Schätz-Sensor: Stelle das exakte Jahr des historischen Mauerfalls ein!" }
        ],
        choices: [
          { text: "„Weiter zu Etappe 2: Der Mauerfall-Zeitsensor ➔“", nextScene: "germany_stage_2" }
        ]
      },
      "germany_q1_fail": {
        id: "germany_q1_fail",
        title: "Konrad hilft weiter",
        dialogue: [
          { speaker: "konrad", text: "Es war das Brandenburger Tor! Bleib konzentriert für den Zeitschieberegler!" }
        ],
        choices: [
          { text: "„Weiter zur 2. Challenge ➔“", nextScene: "germany_stage_2" }
        ]
      },
      "germany_stage_2": {
        id: "germany_stage_2",
        title: "Etappe 2: Der Mauerfall-Zeitsensor",
        mission: {
          id: "m_germany_2",
          missionType: "slider_estimate",
          targetValue: 1989,
          unit: "Jahr",
          tolerance: 2,
          minVal: 1970,
          maxVal: 2005,
          title: "Das Jahr des Mauerfalls",
          desc: "Schiebe den Sensor auf das historische Wendejahr der Friedlichen Revolution.",
          rewardXP: 120,
          question: {
            q: "In welchem Jahr öffnete sich in der Nacht des 9. November die Berliner Mauer?",
            options: ["1989"],
            correctIndex: 0,
            lore: "1989 veränderten die Bürger mit Friedlichen Demonstrationen den Lauf der Weltgeschichte."
          },
          onSuccessScene: "germany_q2_success",
          onFailScene: "germany_q2_fail"
        }
      },
      "germany_q2_success": {
        id: "germany_q2_success",
        title: "Zeitsensor präzise eingerastet!",
        dialogue: [
          { speaker: "konrad", text: "Auf den Punkt: 1989! Ein Meilenstein für Freiheit, Demokratie und Bürgerrechte!" },
          { speaker: "klaus", text: "Der Tresorraum der Einheit öffnet sich. Letzter Schnellscan vor der Relikt-Übergabe!" }
        ],
        choices: [
          { text: "„Zum Relikt-Finale: Erasmus+ Schnellscan ➔“", nextScene: "germany_stage_3" }
        ]
      },
      "germany_q2_fail": {
        id: "germany_q2_fail",
        title: "Blick nach vorn!",
        dialogue: [
          { speaker: "klaus", text: "1989 war das goldene Jahr der Einheit. Jetzt holen wir uns im Finale das Relikt!" }
        ],
        choices: [
          { text: "„Zum Relikt-Finale!“", nextScene: "germany_stage_3" }
        ]
      },
      "germany_stage_3": {
        id: "germany_stage_3",
        title: "Etappe 3: Bergung des Berliner Mauersteins",
        mission: {
          id: "m_germany_3",
          missionType: "true_false",
          isTrue: true,
          title: "Lernen & Reisen ohne Grenzen",
          desc: "Urteile über das europäische Bildungsprogramm Erasmus+:",
          rewardXP: 150,
          rewardItem: { id: "relic_Deutschland", name: "🧱 Berliner Mauerstein", icon: "🧱", desc: "Ein historisches Fragment der Überwindung von Grenzen und Teilung." },
          clue: "Hinweis: Über 14 Millionen Europäer haben bereits mit Erasmus+ im Ausland studiert oder Praktika gemacht.",
          question: {
            q: "Stimmt es, dass das EU-Programm Erasmus+ es Schülern, Studenten und Auszubildenden ermöglicht, gefördert im europäischen Ausland zu lernen?",
            options: ["Wahr", "Falsch"],
            correctIndex: 0,
            lore: "Erasmus+ ist eines der erfolgreichsten EU-Programme und verbindet seit 1987 junge Menschen in ganz Europa."
          },
          onSuccessScene: "germany_conclusion",
          onFailScene: "germany_conclusion"
        }
      },
      "germany_conclusion": {
        id: "germany_conclusion",
        title: "Triumph in Berlin!",
        dialogue: [
          { speaker: "konrad", text: "Glückwunsch, Piloten! Der originale 'Berliner Mauerstein' gehört jetzt zu eurer Sammlung!" },
          { speaker: "klaus", text: "Ein mächtiges Relikt der Freiheit! Unser Visum für Deutschland ist gestempelt – nächster Halt: Paris!" }
        ],
        choices: [
          { text: "„Visum stempeln & Aufbruch nach Paris ➔“", action: "completeCountryAdventure" }
        ]
      }
    }
  },

  // =========================================================================
  // KAPITEL 1 — FRANKREICH: Die Schuman-Erklärung
  // =========================================================================
  "Frankreich": {
    country: "Frankreich",
    flag: "🇫🇷",
    chapter: 1,
    title: "Die Schuman-Erklärung & das Erbe von Paris",
    relicId: "Schuman-Erklärung",
    startScene: "france_arrival",
    scenes: {
      "france_arrival": {
        id: "france_arrival",
        title: "Station Paris: An den Ufern der Seine",
        landmarkImage: "assets/landmarks/france.jpg",
        landmarkTitle: "Eiffelturm & Quai d'Orsay • Paris",
        dialogue: [
          { speaker: "klaus", text: "Bonjour Paris! Vor uns leuchtet der Eiffelturm in voller Pracht über der Seine!" },
          { speaker: "pierre", text: "Bienvenue! Ich bin Kurator Pierre vom Quai d'Orsay. Hier wurde am 9. Mai 1950 die Vision eines friedlichen Europas geboren." },
          { speaker: "pierre", text: "Das Relikt 'Schuman-Erklärung' liegt im Tresor des Uhrensaals. Löse unsere Kultur- und Geschichtsrätsel, um es zu sichern!" }
        ],
        choices: [
          { text: "„Wir ehren das französische Friedenserbe und starten die Prüfung!“", choiceId: "fr_start", nextScene: "france_stage_1" },
          { text: "„Warum feiern wir eigentlich am 9. Mai den Europatag?“", choiceId: "fr_europe_day", nextScene: "france_lore_europeday" }
        ]
      },
      "france_lore_europeday": {
        id: "france_lore_europeday",
        title: "Der 9. Mai: Europas Geburtstag",
        dialogue: [
          { speaker: "pierre", text: "Am 9. Mai 1950 schlug Außenminister Robert Schuman vor, die Kohle- und Stahlproduktion von Frankreich und Deutschland zusammenzulegen – damit Krieg unmöglich wird!" },
          { speaker: "klaus", text: "Eine geniale Idee für ewigen Frieden! Starten wir nun die Herausforderung!" }
        ],
        choices: [
          { text: "„Zur 1. Etappe: Kunst, Kultur & Wahrzeichen ➔“", nextScene: "france_stage_1" }
        ]
      },
      "france_stage_1": {
        id: "france_stage_1",
        title: "Etappe 1: Das Louvre-Rätsel & Meisterwerke",
        mission: {
          id: "m_france_1",
          missionType: "quiz",
          title: "Das Louvre-Meisterwerk",
          desc: "Welches epochale Kunstwerk im Pariser Louvre symbolisiert den französischen Kampf für Freiheit & Republik?",
          rewardXP: 100,
          rewardItem: { id: "louvre_skizze", name: "🎨 Meisterwerk-Skizze", icon: "🎨", desc: "Historische Skizze aus dem Pariser Louvre." },
          clue: "Hinweis: Eugène Delacroix schuf das weltberühmte Werk 'Die Freiheit führt das Volk'.",
          question: {
            q: "Welches berühmte Monumental-Gemälde im Louvre zeigt die Nationalfigur 'Marianne' mit der Trikolore an der Spitze der Revolution?",
            options: [
              "„Die Freiheit führt das Volk“ (Eugène Delacroix)",
              "„Das Floß der Medusa“ (Théodore Géricault)",
              "„Die Krönung Napoleons“ (Jacques-Louis David)",
              "„Die Beständigkeit der Erinnerung“ (Salvador Dalí)"
            ],
            correctIndex: 0,
            lore: "Marianne personifiziert seit der Französischen Revolution die Werte der Republik: Freiheit, Gleichheit, Brüderlichkeit."
          },
          onSuccessScene: "france_q1_success",
          onFailScene: "france_q1_fail"
        }
      },
      "france_q1_success": {
        id: "france_q1_success",
        title: "Kultur-Archiv entsiegelt!",
        dialogue: [
          { speaker: "pierre", text: "Brillant! 'Die Freiheit führt das Volk' – ein Meilenstein der europäischen Kunstgeschichte!" },
          { speaker: "klaus", text: "Nun zur zweiten Prüfung: Das geopolitische Geheimnis Frankreichs in Europa und Übersee!" }
        ],
        choices: [
          { text: "„Weiter zu Etappe 2: Europas Grenzen ➔“", nextScene: "france_stage_2" }
        ]
      },
      "france_q1_fail": {
        id: "france_q1_fail",
        title: "Pierre hilft weiter",
        dialogue: [
          { speaker: "pierre", text: "Es war Delacroix' berühmte Freiheitsikone! Volle Konzentration auf die zweite Station!" }
        ],
        choices: [
          { text: "„Weiter zur 2. Challenge!“", nextScene: "france_stage_2" }
        ]
      },
      "france_stage_2": {
        id: "france_stage_2",
        title: "Etappe 2: Das Übersee-Territorien-Geheimnis",
        mission: {
          id: "m_france_2",
          missionType: "quiz",
          title: "Europas längste Landesgrenze",
          desc: "Entschlüssele Frankreichs Geografie jenseits des europäischen Festlands:",
          rewardXP: 120,
          question: {
            q: "Mit welchem Land teilt Frankreich durch sein Übersee-Département Französisch-Guayana seine längste gemeinsame Landesgrenze?",
            options: [
              "Brasilien (Südamerika)",
              "Spanien (Pyrenäen)",
              "Deutschland (Rhein)",
              "Belgien (Ardennen)"
            ],
            correctIndex: 0,
            lore: "Frankreichs längste Landgrenze liegt mit rund 730 Kilometern im Regenwald Südamerikas zu Brasilien!"
          },
          onSuccessScene: "france_q2_success",
          onFailScene: "france_q2_fail"
        }
      },
      "france_q2_success": {
        id: "france_q2_success",
        title: "Geografie-Genie bestätigt!",
        dialogue: [
          { speaker: "pierre", text: "Exzellent! Französisch-Guayana in Südamerika ist vollwertiges EU-Gebiet und sogar der Weltraumbahnhof der ESA!" },
          { speaker: "klaus", text: "Unglaubliches Wissen! Jetzt zur finalen Bergung der Schuman-Erklärung im Uhrensaal!" }
        ],
        choices: [
          { text: "„Zur Bergung der Schuman-Erklärung ➔“", nextScene: "france_stage_3" }
        ]
      },
      "france_q2_fail": {
        id: "france_q2_fail",
        title: "Auf zum Finale!",
        dialogue: [
          { speaker: "klaus", text: "Unglaublich, aber wahr: Brasilien grenzt an Frankreichs EU-Überseegebiet! Jetzt das Finale im Uhrensaal!" }
        ],
        choices: [
          { text: "„Zum Finale!“", nextScene: "france_stage_3" }
        ]
      },
      "france_stage_3": {
        id: "france_stage_3",
        title: "Etappe 3: Bergung der Schuman-Erklärung",
        mission: {
          id: "m_france_3",
          missionType: "quiz",
          title: "Der Schuman-Plan & Die Montanunion",
          desc: "Entschlüssele den genialen Friedensplan von 1950:",
          rewardXP: 150,
          rewardItem: { id: "relic_Frankreich", name: "📜 Schuman-Erklärung", icon: "📜", desc: "Das historische Gründungsdokument des friedlichen Europas." },
          clue: "Hinweis: Kohle und Stahl waren damals die Schlüsselrohstoffe für Waffen und Kriegsindustrie.",
          question: {
            q: "Warum schlugen Robert Schuman und Jean Monnet 1950 vor, ausgerechnet Kohle und Stahl gemeinsam zu verwalten?",
            options: [
              "Um eine heimliche Aufrüstung und Kriege zwischen Mitgliedern materiell unmöglich zu machen",
              "Weil Frankreich und Deutschland keine eigenen Währungen mehr hatten",
              "Um den Bau des Eiffelturms und der Pariser Metro zu finanzieren",
              "Weil Großbritannien ein Monopol auf alle Eisenbahnstrecken forderte"
            ],
            correctIndex: 0,
            lore: "Wer Kohle und Stahl teilt, kann keine geheimen Panzer oder Waffen für Angriffskriege mehr bauen."
          },
          onSuccessScene: "france_conclusion",
          onFailScene: "france_conclusion"
        }
      },
      "france_conclusion": {
        id: "france_conclusion",
        title: "Triumph in Paris!",
        dialogue: [
          { speaker: "pierre", text: "Félicitations! Die originale 'Schuman-Erklärung' von 1950 ist geborgen! Möge sie euer Museum für immer erleuchten!" },
          { speaker: "klaus", text: "Ein unbeschreiblicher Moment! Visum gestempelt – und weiter geht die Reise durch die Gründerstaaten!" }
        ],
        choices: [
          { text: "„Visum stempeln & Kurs fortsetzen ➔“", action: "completeCountryAdventure" }
        ]
      }
    }
  },
  "Ungarn": {
    country: "Ungarn",
    flag: "🇭🇺",
    chapter: 3,
    title: "Das Rätsel der Donau-Archive",
    relicId: "Zauberwürfel-Prototyp",
    startScene: "hungary_arrival",

    scenes: {
      // 1. Szene: Ankunft an der Donau mit Landmark-Cinematic
      "hungary_arrival": {
        id: "hungary_arrival",
        title: "Station Budapest: Ufer der Donau",
        landmarkImage: "assets/landmarks/hungary.jpg",
        landmarkTitle: "Ungarisches Parlamentsgebäude • Budapest",
        music: "ambient",
        dialogue: [
          {
            speaker: "klaus",
            emotion: "happy",
            text: "Willkommen in Budapest! Schau dir dieses atemberaubende Parlamentsgebäude an der Donau an!"
          },
          {
            speaker: "klaus",
            emotion: "serious",
            text: "Ein Alarmsignal aus dem historischen Nationalarchiv bittet dringend um unsere Unterstützung."
          },
          {
            speaker: "marta",
            emotion: "surprised",
            text: "Seid ihr die europäischen Entdecker, von denen man mir berichtet hat? Gott sei Dank seid ihr rechtzeitig hier!"
          }
        ],
        choices: [
          {
            text: "„Ja, wir sind bereit zu helfen! Was ist passiert?“",
            choiceId: "helpedMartaImmediately",
            nextScene: "marta_explains"
          },
          {
            text: "„Wer bist du und warum ist das Archiv in Aufruhr?“",
            choiceId: "askedIdentity",
            nextScene: "marta_identity"
          },
          {
            text: "„Wir suchen das historische Relikt für das Europa-Museum.“",
            choiceId: "focusedOnRelic",
            nextScene: "marta_relic_link"
          }
        ]
      },

      // 1b. Szene: Identität & Hintergrund
      "marta_identity": {
        id: "marta_identity",
        title: "Gespräch mit Márta",
        dialogue: [
          {
            speaker: "marta",
            emotion: "neutral",
            text: "Ich bin Márta, Chef-Archivarin an der Ungarischen Akademie der Wissenschaften."
          },
          {
            speaker: "marta",
            emotion: "serious",
            text: "In den historischen Gewölben haben wir eine versiegelte Archiv-Kassette entdeckt. Ihr Schloss öffnet sich nur bei historisch exaktem Wissen!"
          }
        ],
        choices: [
          {
            text: "„Lass uns die Kassette gemeinsam untersuchen!“",
            nextScene: "marta_explains"
          }
        ]
      },

      // 1c. Szene: Relikt-Bezug
      "marta_relic_link": {
        id: "marta_relic_link",
        title: "Die Spur des Relikts",
        dialogue: [
          {
            speaker: "marta",
            emotion: "happy",
            text: "Ein Relikt? Dann sucht ihr zweifellos den legendären Zauberwürfel-Prototyp von Ernő Rubik aus dem Jahr 1974!"
          },
          {
            speaker: "marta",
            emotion: "serious",
            text: "Er befindet sich genau in dieser gesperrten Archiv-Kassette. Doch zuvor müssen wir 3 historische Sicherheits-Prüfungen bestehen!"
          }
        ],
        choices: [
          {
            text: "„Ich nehme die Herausforderung an!“",
            nextScene: "marta_explains"
          }
        ]
      },

      // 2. Szene: Missions-Briefing
      "marta_explains": {
        id: "marta_explains",
        title: "Mission: Das Archiv der Akademie",
        dialogue: [
          {
            speaker: "marta",
            emotion: "neutral",
            text: "Das erste Schloss der Kassette erfordert das Wissen über die Gründung und Vereinigung der ungarischen Hauptstadt."
          },
          {
            speaker: "klaus",
            emotion: "happy",
            text: "Das ist unser Fachgebiet! Pilot, analysiere die Dokumente und beantworte Mártas Frage!"
          }
        ],
        mission: {
          id: "mission_budapest_origin",
          title: "Das Siegel von Buda & Pest",
          desc: "Entschlüssele die Gründungsgeschichte der ungarischen Metropole.",
          rewardXP: 100,
          rewardItem: {
            id: "donau_karte",
            name: "📜 Historischer Donau-Plan",
            icon: "📜",
            desc: "Ein handgezeichneter Plan von Budapest aus dem 19. Jahrhundert."
          },
          clue: "Hinweis #15: Die Vereinigung von Buda, Pest und Óbuda 1873 schuf das Herz Ungarns an der Donau.",
          question: {
            q: "Aus welchen historischen Städten entstand 1873 die heutige ungarische Hauptstadt Budapest?",
            options: [
              "Buda, Pest und Óbuda",
              "Preßburg, Sopron und Debrecen",
              "Szeged, Miskolc und Pécs",
              "Esztergom, Győr und Visegrád"
            ],
            correctIndex: 0,
            lore: "1873 wurden die rechts der Donau gelegenen Städte Buda und Óbuda mit dem linksseitigen Pest zur Metropole Budapest vereint."
          },
          onSuccessScene: "scene_q1_success",
          onFailScene: "scene_q1_fail"
        }
      },

      // 3. Reaktion Q1 Erfolg
      "scene_q1_success": {
        id: "scene_q1_success",
        title: "Erstes Schloss geöffnet!",
        dialogue: [
          {
            speaker: "marta",
            emotion: "happy",
            text: "Hervorragend! Das Schloss klickt auf! Buda, Pest und Óbuda – exakt die richtige Antwort!"
          },
          {
            speaker: "klaus",
            emotion: "happy",
            text: "Großartige Leistung! Ich sehe bereits das zweite Siegel aufleuchten. Es befasst sich mit einem Wendepunkt der europäischen Geschichte."
          }
        ],
        choices: [
          {
            text: "„Zum zweiten Siegel: Das Paneuropäische Picknick 1989“",
            nextScene: "scene_stage_2"
          }
        ]
      },

      // 3b. Reaktion Q1 Fehler (Motivierender Spruch, kein Lob!)
      "scene_q1_fail": {
        id: "scene_q1_fail",
        title: "Kopf hoch, Pilot!",
        dialogue: [
          {
            speaker: "klaus",
            emotion: "neutral",
            text: "Kopf hoch, Pilot! Es waren Buda, Pest und Óbuda. Lass dich nicht entmutigen, wir knacken dieses Archiv trotzdem!"
          },
          {
            speaker: "marta",
            emotion: "neutral",
            text: "Genau, bleib konzentriert! Das nächste Siegel erfordert euer Wissen über das Friedensjahr 1989."
          }
        ],
        choices: [
          {
            text: "„Weiter zum zweiten Siegel!“",
            nextScene: "scene_stage_2"
          }
        ]
      },

      // 4. Szene: Zweite Prüfung (Paneuropa-Picknick 1989)
      "scene_stage_2": {
        id: "scene_stage_2",
        title: "Mission: Der Eiserne Vorhang fällt",
        dialogue: [
          {
            speaker: "marta",
            emotion: "serious",
            text: "Ungarn spielte 1989 eine Schlüsselrolle beim Fall des Eisernen Vorhangs in Europa. Welches Friedensereignis an der Grenze zu Österreich öffnete damals das Tor zur Freiheit?"
          }
        ],
        mission: {
          id: "mission_sopron_picnic",
          title: "Das Grenztor von Sopron",
          desc: "Beweise dein historisches Wissen über die Öffnung des Eisernen Vorhangs.",
          rewardXP: 120,
          rewardItem: {
            id: "sopron_border_token",
            name: "🗝️ Zaun-Fragment von 1989",
            icon: "🗝️",
            desc: "Ein Stück Stacheldraht des abgebauten Eisernen Vorhangs als Friedenssymbol."
          },
          clue: "Hinweis #16: Das Paneuropäische Picknick bei Sopron am 19. August 1989 leitete das Ende der europäischen Teilung ein.",
          question: {
            q: "Welches historische Ereignis am 19. August 1989 nahe der ungarischen Stadt Sopron ermöglichte hunderten DDR-Bürgern die Flucht in den Westen?",
            options: [
              "Das Paneuropäische Picknick",
              "Der Budapester Friedensgipfel",
              "Die Balaton-Freiheitskonferenz",
              "Das Donau-Grenzabkommen"
            ],
            correctIndex: 0,
            lore: "Das Paneuropäische Picknick bei Sopron gilt als Meilenstein, der den Fall der Berliner Mauer vorbereitete."
          },
          onSuccessScene: "scene_q2_success",
          onFailScene: "scene_q2_fail"
        }
      },

      // 5. Reaktion Q2 Erfolg
      "scene_q2_success": {
        id: "scene_q2_success",
        title: "Zweites Schloss geöffnet!",
        dialogue: [
          {
            speaker: "marta",
            emotion: "happy",
            text: "Wunderbar! Das Paneuropäische Picknick! Ein unvergesslicher Moment des Mutes und der Freiheit!"
          },
          {
            speaker: "klaus",
            emotion: "happy",
            text: "Nur noch ein letzter Mechanismus trennt uns vom Relikt: Die Erfindung des Zauberwürfels selbst!"
          }
        ],
        choices: [
          {
            text: "„Finale Prüfung: Die Bergung des Zauberwürfels!“",
            nextScene: "scene_stage_3"
          }
        ]
      },

      // 5b. Reaktion Q2 Fehler (Motivierender Spruch)
      "scene_q2_fail": {
        id: "scene_q2_fail",
        title: "Gemeinsam weiter!",
        dialogue: [
          {
            speaker: "klaus",
            emotion: "neutral",
            text: "Kein Problem, Fehler gehören zu jeder großen Expedition! Es war das Paneuropäische Picknick bei Sopron. Jetzt volle Konzentration auf die Finalprüfung!"
          }
        ],
        choices: [
          {
            text: "„Zur Finalen Prüfung!“",
            nextScene: "scene_stage_3"
          }
        ]
      },

      // 6. Szene: Finale Prüfung (Ernö Rubik)
      "scene_stage_3": {
        id: "scene_stage_3",
        title: "Finales Siegel: Das Rubik-Rätsel",
        dialogue: [
          {
            speaker: "marta",
            emotion: "happy",
            text: "Hier ist der Kern der Kassette! Um das Relikt endgültig freizuschalten, nenne den Fachbereich, in dem Professor Ernő Rubik in Budapest lehrte!"
          }
        ],
        mission: {
          id: "mission_rubik_cube",
          title: "Das Vermächtnis von Ernő Rubik",
          desc: "Schließe die 3. Etappe ab und birg das offizielle Relikt.",
          rewardXP: 150,
          rewardItem: {
            id: "rubik_cube_relic",
            name: "🎲 Zauberwürfel-Prototyp",
            icon: "🎲",
            desc: "Originaler Holz-Prototyp von 1974, der die Welt und Raumgeometrie revolutionierte."
          },
          clue: "Hinweis #17: Ernő Rubik erfand den 3D-Drehwürfel als Architektur-Lehrmittel für räumliches Denken.",
          question: {
            q: "Welchen Beruf übte Ernő Rubik aus, als er 1974 an der Budapester Hochschule für Angewandte Kunst den Zauberwürfel als Lehrmodell erfand?",
            options: [
              "Architekturprofessor und Bildhauer",
              "Astronaut und Raketeningenieur",
              "Opernsänger und Dirigent",
              "Diplomat und Außenminister"
            ],
            correctIndex: 0,
            lore: "Ernő Rubik war Dozent für Architektur und Design und erfand den Zauberwürfel, um seinen Studenten dreidimensionale Bewegungen zu veranschaulichen."
          },
          onSuccessScene: "scene_adventure_conclusion",
          onFailScene: "scene_adventure_conclusion"
        }
      },

      // 7. Szene: Epischer Abschluss
      "scene_adventure_conclusion": {
        id: "scene_adventure_conclusion",
        title: "Triumph in Budapest",
        dialogue: [
          {
            speaker: "marta",
            emotion: "happy",
            text: "Das Relikt ist befreit! Hiermit überreiche ich euch feierlich den originalen Zauberwürfel-Prototyp für euer Europa-Museum!"
          },
          {
            speaker: "klaus",
            emotion: "happy",
            text: "Ein historischer Moment! Unser Schengen-Visum für Ungarn wird gestempelt und wir erhalten wertvolle Erfahrungspunkte!"
          },
          {
            speaker: "marta",
            emotion: "neutral",
            text: "Gute Weiterreise! Die Spuren der nächsten Station in Mitteleuropa warten bereits auf euch!"
          }
        ],
        choices: [
          {
            text: "„Visum stempeln & Relikt im Museum platzieren ➔“",
            action: "completeCountryAdventure"
          }
        ]
      }
    }
  }
};
