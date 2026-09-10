const categoryNames = {
  "1": "Geschichte & Verträge",
  "2": "Geografie & Städte",
  "3": "Institutionen & Politik",
  "4": "Kultur & Symbole",
  "5": "Wirtschaft & Euro"
};

const countries = [
  {
    "n": "Belgien",
    "f": "🇧🇪",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Bulgarien",
    "f": "🇧🇬",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Dänemark",
    "f": "🇩🇰",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Deutschland",
    "f": "🇩🇪",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Estland",
    "f": "🇪🇪",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Finnland",
    "f": "🇫🇮",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Frankreich",
    "f": "🇫🇷",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Griechenland",
    "f": "🇬🇷",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Irland",
    "f": "🇮🇪",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Italien",
    "f": "🇮🇹",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Kroatien",
    "f": "🇭🇷",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Lettland",
    "f": "🇱🇻",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Litauen",
    "f": "🇱🇹",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Luxemburg",
    "f": "🇱🇺",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Malta",
    "f": "🇲🇹",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Niederlande",
    "f": "🇳🇱",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Österreich",
    "f": "🇦🇹",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Polen",
    "f": "🇵🇱",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Portugal",
    "f": "🇵🇹",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Rumänien",
    "f": "🇷🇴",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Schweden",
    "f": "🇸🇪",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Slowakei",
    "f": "🇸🇰",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Slowenien",
    "f": "🇸🇮",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Spanien",
    "f": "🇪🇸",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Tschechien",
    "f": "🇨🇿",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Ungarn",
    "f": "🇭🇺",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  },
  {
    "n": "Zypern",
    "f": "🇨🇾",
    "p": {
      "1": 0,
      "2": 0,
      "3": 0
    }
  }
];

const geoQuestions = {
  "Belgien": "In welchem Land befindet sich der Hauptsitz der Europäischen Kommission? 🇪🇺",
  "Bulgarien": "Welches Land liegt am Schwarzen Meer und hat Sofia als Hauptstadt? 🇧🇬",
  "Dänemark": "Welches nordische EU-Land grenzt direkt an Deutschland? 🇩🇰",
  "Deutschland": "In welchem Land liegt die Finanzmetropole Frankfurt am Main? 🇩🇪",
  "Estland": "Welches baltische Land liegt am finnischen Meerbusen und hat Tallinn als Hauptstadt? 🇪🇪",
  "Finnland": "Welches waldreiche EU-Land ist als das 'Land der tausend Seen' bekannt? 🇫🇮",
  "Frankreich": "In welchem Land befindet sich der Hauptsitz des Europäischen Parlaments in Straßburg? 🇫🇷",
  "Griechenland": "In welchem Land liegt die Halbinsel Peloponnes und die Akropolis? 🇬🇷",
  "Irland": "Welcher EU-Mitgliedstaat liegt auf einer Insel westlich von Großbritannien? 🇮🇪",
  "Italien": "Welcher EU-Staat hat die Form eines Stiefels und umschließt die Vatikanstadt? 🇮🇹",
  "Kroatien": "Welches Land an der Adria trat 2013 als bisher letztes Mitglied der EU bei? 🇭🇷",
  "Lettland": "Welches baltische Land liegt zwischen Estland und Litauen? 🇱🇻",
  "Litauen": "In welchem baltischen Land befindet sich das geografische Zentrum Europas? 🇱🇹",
  "Luxemburg": "In welchem Land befindet sich der Sitz des Europäischen Gerichtshofs? 🇱🇺",
  "Malta": "Welcher kleine Inselstaat im Mittelmeer liegt südlich von Sizilien? 🇲🇹",
  "Niederlande": "In welchem Land liegt der Regierungssitz Den Haag? 🇳🇱",
  "Österreich": "Welches Alpenland grenzt an Deutschland, Italien und die Schweiz? 🇦🇹",
  "Polen": "Welches große mitteleuropäische EU-Land liegt östlich der Oder-Neiße-Grenze? 🇵🇱",
  "Portugal": "Welches EU-Land liegt ganz im Westen der Iberischen Halbinsel am Atlantik? 🇵🇹",
  "Rumänien": "Durch welches osteuropäische Land fließt die Donau, bevor sie ins Schwarze Meer mündet? 🇷🇴",
  "Schweden": "Welches skandinavische Land ist flächenmäßig das größte in Nordeuropa? 🇸🇪",
  "Slowakei": "Welches Land hat Bratislava als Hauptstadt und grenzt im Westen an Österreich? 🇸🇰",
  "Slowenien": "In welchem Land liegen die Julischen Alpen und der malerische Bleder See? 🇸🇮",
  "Spanien": "Welches EU-Land nimmt den größten Teil der Iberischen Halbinsel ein? 🇪🇸",
  "Tschechien": "Welches Land ist für seine historische Region Böhmen bekannt? 🇨🇿",
  "Ungarn": "Durch welches EU-Mitgliedsland fließt die Donau direkt durch die Hauptstadt Budapest? 🇭🇺",
  "Zypern": "Welcher Inselstaat im östlichen Mittelmeer ist seit 2004 Mitglied der EU? 🇨🇾"
};

const pool = {};


/* js/questions_cat1.js */
pool[1] = {
  "Österreich": {
    "1": [
      {
        "q": "In welchem Jahr trat Österreich der Europäischen Union bei?",
        "o": [
          "1990",
          "2000",
          "1995",
          "2004"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Bei der Volksabstimmung 1994 vor dem EU-Beitritt stimmten die Österreicher mit welchem ungefähren Ergebnis dafür?",
        "o": [
          "Knapp über 50 %",
          "Sie lehnten mehrheitlich ab",
          "100 %",
          "Rund 66 %"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Österreich galt während des Kalten Krieges lange als \"unmöglicher\" EU-Kandidat. Was war der Hauptgrund dafür?",
        "o": [
          "Die im Staatsvertrag von 1955 festgelegte immerwährende Neutralität",
          "Fehlende gemeinsame Grenze zur EG",
          "Zu geringe Einwohnerzahl",
          "Fehlende Zustimmung des Parlaments"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Belgien": {
    "1": [
      {
        "q": "Belgien war 1957 Gründungsmitglied der EWG. Welche belgische Stadt gilt heute als Sitz der wichtigsten EU-Institutionen?",
        "o": [
          "Antwerpen",
          "Brüssel",
          "Gent",
          "Brügge"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Der \"Fusionsvertrag\", der 1965 die Verwaltungen von EWG, Montanunion und Euratom zusammenlegte, wurde in welcher Stadt unterschrieben?",
        "o": [
          "Paris",
          "Rom",
          "Brüssel",
          "Den Haag"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Die \"Laeken-Erklärung\" von 2001, benannt nach einem Brüsseler Stadtteil, stieß welchen wichtigen Prozess an?",
        "o": [
          "Die Einführung des Euro",
          "Die erste EU-Erweiterung",
          "Den Schengen-Beitritt",
          "Die Ausarbeitung einer EU-Verfassung"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Bulgarien": {
    "1": [
      {
        "q": "In welchem Jahr trat Bulgarien der Europäischen Union bei?",
        "o": [
          "2007",
          "2004",
          "2010",
          "2013"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Bulgarien trat gemeinsam mit welchem Nachbarland der EU bei?",
        "o": [
          "Griechenland",
          "Rumänien",
          "Serbien",
          "Nordmazedonien"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Bulgarien war bis 1991 Mitglied welches Militärbündnisses, wodurch ein früherer EU-Beitritt politisch unmöglich war?",
        "o": [
          "NATO",
          "Westeuropäische Union",
          "Warschauer Pakt",
          "Blockfreie Bewegung"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Kroatien": {
    "1": [
      {
        "q": "In welchem Jahr trat Kroatien der Europäischen Union bei – bis heute der jüngste Beitritt?",
        "o": [
          "2004",
          "2007",
          "2016",
          "2013"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welchem Jahr erklärte Kroatien seine Unabhängigkeit von Jugoslawien?",
        "o": [
          "1991",
          "1989",
          "1995",
          "1999"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Kroatien führte 2023 gleich zwei europäische Neuerungen gleichzeitig ein: den Euro und die Mitgliedschaft in welchem Grenz-Abkommen?",
        "o": [
          "Vertrag von Lissabon",
          "Schengen-Raum",
          "Europäischer Binnenmarkt",
          "Zollunion mit der Türkei"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Zypern": {
    "1": [
      {
        "q": "In welchem Jahr trat Zypern der Europäischen Union bei?",
        "o": [
          "1995",
          "2007",
          "2004",
          "2013"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Was gilt bis heute für den Norden der Insel Zypern in Bezug auf die EU?",
        "o": [
          "Er hat einen eigenen EU-Kommissar",
          "Er ist EU-Beitrittskandidat",
          "Er ist ein eigenständiges EU-Mitglied",
          "Dort wird das EU-Recht faktisch nicht angewendet, da dieser Teil nicht von der Republik Zypern kontrolliert wird"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "In welchem Jahr führte Zypern den Euro als Währung ein?",
        "o": [
          "2008",
          "2007",
          "2004",
          "2013"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Tschechien": {
    "1": [
      {
        "q": "In welchem Jahr trat Tschechien der Europäischen Union bei?",
        "o": [
          "1999",
          "2004",
          "2007",
          "2009"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Tschechien entstand 1993 durch die friedliche Teilung eines anderen Staates. Wie wird diese Teilung oft genannt?",
        "o": [
          "Prager Frühling",
          "Wiener Teilung",
          "Samtene Trennung",
          "Baltischer Bruch"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche Währung nutzt Tschechien bis heute, obwohl es seit 2004 EU-Mitglied ist?",
        "o": [
          "Euro",
          "Forint",
          "Tschechischer Gulden",
          "Tschechische Krone"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Dänemark": {
    "1": [
      {
        "q": "In welchem Jahr trat Dänemark der damaligen Europäischen Gemeinschaft bei?",
        "o": [
          "1973",
          "1957",
          "1986",
          "1995"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Dänemark trat gemeinsam mit welchen zwei Ländern der EG bei?",
        "o": [
          "Schweden und Finnland",
          "Vereinigtes Königreich und Irland",
          "Spanien und Portugal",
          "Österreich und Malta"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Nachdem Dänemark den Vertrag von Maastricht 1992 zunächst per Referendum ablehnte, wurde er 1993 in einer zweiten Abstimmung angenommen – allerdings nur mit welcher Zugabe?",
        "o": [
          "Einem höheren EU-Budget für Dänemark",
          "Einem dänischen EU-Kommissar auf Lebenszeit",
          "Speziellen dänischen Ausnahmeregelungen, u. a. beim Euro",
          "Der Streichung des Vertrags"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Estland": {
    "1": [
      {
        "q": "In welchem Jahr trat Estland der Europäischen Union bei?",
        "o": [
          "1995",
          "2013",
          "2007",
          "2004"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welchem Jahr erlangte Estland die Unabhängigkeit von der Sowjetunion?",
        "o": [
          "1991",
          "1989",
          "1993",
          "1999"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "In welchem Jahr führte Estland als erster der drei baltischen Staaten den Euro ein?",
        "o": [
          "2007",
          "2011",
          "2014",
          "2015"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Finnland": {
    "1": [
      {
        "q": "In welchem Jahr trat Finnland der Europäischen Union bei?",
        "o": [
          "1990",
          "2000",
          "1995",
          "2004"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Finnland trat der EU zusammen mit Österreich und welchem weiteren Land bei?",
        "o": [
          "Norwegen",
          "Dänemark",
          "Estland",
          "Schweden"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Warum war ein EU-Beitritt für Finnland vor 1991 politisch kaum denkbar?",
        "o": [
          "Die enge außenpolitische Bindung an die Sowjetunion während des Kalten Krieges",
          "Zu kleine Bevölkerung",
          "Fehlende gemeinsame Grenze zur EG",
          "Ablehnung durch das Parlament"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Frankreich": {
    "1": [
      {
        "q": "Nach welchem französischen Politiker ist der \"Schuman-Plan\" von 1950 benannt, der als Grundstein der EU gilt?",
        "o": [
          "Jean Monnet",
          "Robert Schuman",
          "Charles de Gaulle",
          "Georges Pompidou"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welche französische Stadt beherbergt einen der Sitze des Europäischen Parlaments?",
        "o": [
          "Lyon",
          "Marseille",
          "Straßburg",
          "Toulouse"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Der Vertrag von Maastricht wurde 1992 in mehreren Ländern per Volksabstimmung bestätigt. Wie fiel das Ergebnis in Frankreich aus?",
        "o": [
          "Deutliche Ablehnung",
          "Die Abstimmung wurde abgesagt",
          "Einstimmige Zustimmung",
          "Sehr knappe Zustimmung"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Deutschland": {
    "1": [
      {
        "q": "Deutschland war 1957 Gründungsmitglied eines Vorläufers der EU. Wie hieß dieser damals?",
        "o": [
          "Europäische Wirtschaftsgemeinschaft",
          "Europäische Union",
          "Vereinte Nationen",
          "Europarat"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Wie heißt der Vertrag, der 1990 die deutsche Wiedervereinigung regelte, wodurch Ostdeutschland automatisch Teil der EG wurde?",
        "o": [
          "Élysée-Vertrag",
          "Einigungsvertrag",
          "Vertrag von Rom",
          "Schengener Abkommen"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Deutschland hat die meisten Sitze im Europäischen Parlament aller Mitgliedstaaten. Wovon hängt die Anzahl der Sitze eines Landes hauptsächlich ab?",
        "o": [
          "Fläche des Landes",
          "Wirtschaftskraft",
          "Bevölkerungszahl",
          "Anzahl der Jahre in der EU"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Griechenland": {
    "1": [
      {
        "q": "In welchem Jahr trat Griechenland als erstes Land Südeuropas der EG bei?",
        "o": [
          "1995",
          "1973",
          "1986",
          "1981"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welchem Jahr führte Griechenland den Euro als Bargeld ein?",
        "o": [
          "2001",
          "1999",
          "2004",
          "2007"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Ab 2010 stand Griechenland im Zentrum einer schweren EU-weiten Krise rund um Staatsverschuldung. Wie wird diese Krise häufig genannt?",
        "o": [
          "Bankenkrise",
          "Eurokrise / Staatsschuldenkrise",
          "Handelskrise",
          "Energiekrise"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Ungarn": {
    "1": [
      {
        "q": "In welchem Jahr trat Ungarn der Europäischen Union bei?",
        "o": [
          "1999",
          "2007",
          "2004",
          "2013"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches Grenz-Ereignis von 1989 in Ungarn gilt als wichtiger Vorbote für den Fall des Eisernen Vorhangs?",
        "o": [
          "Der EU-Beitrittsantrag Ungarns",
          "Der NATO-Beitritt",
          "Die Euro-Einführung",
          "Die Öffnung der Grenze zu Österreich"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "In welcher Stadt wurde 2003 der Vertrag unterzeichnet, der den Beitritt Ungarns und neun weiterer Länder zur EU regelte?",
        "o": [
          "Athen",
          "Brüssel",
          "Rom",
          "Nizza"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Irland": {
    "1": [
      {
        "q": "In welchem Jahr trat Irland der damaligen Europäischen Gemeinschaft bei?",
        "o": [
          "1957",
          "1973",
          "1986",
          "1995"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Irland trat der EG gemeinsam mit Dänemark und welchem weiteren Land bei?",
        "o": [
          "Frankreich",
          "Spanien",
          "Vereinigtes Königreich",
          "Schweden"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Der Vertrag von Lissabon wurde in Irland zunächst per Referendum abgelehnt. Was geschah danach?",
        "o": [
          "Der Vertrag wurde ohne Irland beschlossen",
          "Der Vertrag wurde nie umgesetzt",
          "Irland trat aus der EU aus",
          "2009 nahm eine zweite Volksabstimmung den Vertrag an"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Italien": {
    "1": [
      {
        "q": "In welcher italienischen Stadt wurden 1957 die Gründungsverträge der EWG unterzeichnet?",
        "o": [
          "Rom",
          "Mailand",
          "Venedig",
          "Neapel"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welche Währung gab Italien 2002 zugunsten des Euro auf?",
        "o": [
          "Peseta",
          "Lira",
          "Franc",
          "Escudo"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Italien gehörte 1957 zu den Gründungsmitgliedern der EWG. Wie viele Staaten waren das insgesamt?",
        "o": [
          "4",
          "9",
          "6",
          "12"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Lettland": {
    "1": [
      {
        "q": "In welchem Jahr trat Lettland der Europäischen Union bei?",
        "o": [
          "1995",
          "2013",
          "2007",
          "2004"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welchem Jahr erlangte Lettland die Unabhängigkeit von der Sowjetunion?",
        "o": [
          "1991",
          "1989",
          "1993",
          "1999"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "In welchem Jahr führte Lettland als eines der letzten der drei baltischen Staaten den Euro ein?",
        "o": [
          "2009",
          "2014",
          "2011",
          "2018"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Litauen": {
    "1": [
      {
        "q": "In welchem Jahr trat Litauen der Europäischen Union bei?",
        "o": [
          "1995",
          "2007",
          "2004",
          "2013"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Litauen erklärte im März 1990 als erste Sowjetrepublik überhaupt seine Unabhängigkeit. Wovon löste es sich damit?",
        "o": [
          "Jugoslawien",
          "Deutsches Reich",
          "Warschauer Pakt allein",
          "Sowjetunion"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "In welchem Jahr führte Litauen als letzter der drei baltischen Staaten den Euro ein?",
        "o": [
          "2015",
          "2014",
          "2011",
          "2020"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Luxemburg": {
    "1": [
      {
        "q": "Luxemburg war 1957 Gründungsmitglied der EWG. Welche wichtige EU-Institution hat ihren Sitz in Luxemburg?",
        "o": [
          "Europäisches Parlament",
          "Europäischer Gerichtshof",
          "Europäische Kommission",
          "Europäischer Rat"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welchem luxemburgischen Grenzort wurde 1985 das Abkommen unterzeichnet, das Grenzkontrollen zwischen mehreren europäischen Staaten abschaffte?",
        "o": [
          "Luxemburg-Stadt",
          "Esch-sur-Alzette",
          "Schengen",
          "Diekirch"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Ein langjähriger luxemburgischer Ministerpräsident wurde später Präsident der Europäischen Kommission (2014–2019). Wie hieß er?",
        "o": [
          "Guy Verhofstadt",
          "Donald Tusk",
          "Xavier Bettel",
          "Jean-Claude Juncker"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Malta": {
    "1": [
      {
        "q": "In welchem Jahr trat Malta der Europäischen Union bei?",
        "o": [
          "2004",
          "1995",
          "2007",
          "2013"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Was ist eine Besonderheit Maltas unter den 27 EU-Mitgliedstaaten?",
        "o": [
          "Es ist die größte Insel der EU",
          "Es ist der bevölkerungsärmste EU-Mitgliedstaat",
          "Es hat die meisten EU-Kommissare",
          "Es ist flächenmäßig das zweitgrößte Land"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Malta war bis 1964 Kolonie welches Weltreichs, bevor es unabhängig wurde und Jahrzehnte später der EU beitrat?",
        "o": [
          "Osmanisches Reich",
          "Französisches Kolonialreich",
          "Britisches Weltreich",
          "Spanisches Königreich"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Niederlande": {
    "1": [
      {
        "q": "Die Niederlande waren 1957 Gründungsmitglied der EWG. In welcher niederländischen Stadt wurde 1992 der Vertrag unterzeichnet, der die Europäische Union offiziell gründete?",
        "o": [
          "Amsterdam",
          "Den Haag",
          "Rotterdam",
          "Maastricht"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welche wichtige Neuerung führte der 1992 in den Niederlanden unterzeichnete Vertrag ein?",
        "o": [
          "Die Unionsbürgerschaft und die Grundlage für den Euro",
          "Den EU-Binnenmarkt",
          "Die Zollunion",
          "Das Europäische Parlament"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Die Niederlande, Belgien und Luxemburg bilden seit den 1940er-Jahren eine Wirtschaftsunion, die schon vor der EWG bestand. Wie heißt sie?",
        "o": [
          "Nordunion",
          "Benelux",
          "Rheinbund",
          "Westeuropäische Union"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Polen": {
    "1": [
      {
        "q": "In welchem Jahr trat Polen der Europäischen Union bei?",
        "o": [
          "1995",
          "1999",
          "2004",
          "2007"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Die EU-Erweiterung von 2004, bei der Polen beitrat, wird häufig mit welchem Begriff bezeichnet?",
        "o": [
          "Süderweiterung",
          "Westerweiterung",
          "Norderweiterung",
          "Osterweiterung"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Wie viele Staaten traten insgesamt am 1. Mai 2004 gemeinsam der EU bei – die größte Erweiterung der EU-Geschichte, angeführt vom bevölkerungsreichsten neuen Mitglied Polen?",
        "o": [
          "10",
          "8",
          "6",
          "12"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Portugal": {
    "1": [
      {
        "q": "In welchem Jahr trat Portugal der damaligen Europäischen Gemeinschaft bei?",
        "o": [
          "1981",
          "1986",
          "1992",
          "1995"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Portugal trat der EG gemeinsam mit welchem Nachbarland bei?",
        "o": [
          "Frankreich",
          "Italien",
          "Spanien",
          "Marokko"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Wie heißt die friedliche Revolution von 1974, die Portugals Diktatur beendete und den Weg zur Demokratie und später zur EG ebnete?",
        "o": [
          "Rosenrevolution",
          "Jasminrevolution",
          "Samtene Revolution",
          "Nelkenrevolution"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Rumänien": {
    "1": [
      {
        "q": "In welchem Jahr trat Rumänien der Europäischen Union bei?",
        "o": [
          "2007",
          "2004",
          "2010",
          "2013"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Rumänien trat gemeinsam mit welchem Nachbarland der EU bei?",
        "o": [
          "Ungarn",
          "Bulgarien",
          "Serbien",
          "Ukraine"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Die rumänische Revolution von 1989, die den Weg für eine spätere EU-Annäherung öffnete, beendete die Herrschaft welches Diktators?",
        "o": [
          "Josip Broz Tito",
          "Todor Schiwkow",
          "Nicolae Ceaușescu",
          "Wojciech Jaruzelski"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Slowakei": {
    "1": [
      {
        "q": "In welchem Jahr trat die Slowakei der Europäischen Union bei?",
        "o": [
          "1999",
          "2009",
          "2007",
          "2004"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Die Slowakei entstand 1993 durch die friedliche Teilung eines anderen Staates. Wie hieß dieser Staat?",
        "o": [
          "Tschechoslowakei",
          "Österreich-Ungarn",
          "Jugoslawien",
          "Sowjetunion"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "In welchem Jahr führte die Slowakei als eines der 2004er-Beitrittsländer den Euro ein?",
        "o": [
          "2004",
          "2009",
          "2011",
          "2015"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Slowenien": {
    "1": [
      {
        "q": "In welchem Jahr trat Slowenien der Europäischen Union bei?",
        "o": [
          "1995",
          "2007",
          "2004",
          "2013"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Slowenien war das erste Land, das aus welchem ehemaligen Staat hervorging und der EU beitrat?",
        "o": [
          "Sowjetunion",
          "Tschechoslowakei",
          "Österreich-Ungarn",
          "Jugoslawien"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Slowenien führte 2007 als erstes der zehn 2004-Beitrittsländer welche Gemeinschaftswährung ein?",
        "o": [
          "Den Euro",
          "Erst deutlich später",
          "Bis heute den Tolar",
          "Eine eigene Parallelwährung"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Spanien": {
    "1": [
      {
        "q": "In welchem Jahr trat Spanien der damaligen Europäischen Gemeinschaft bei?",
        "o": [
          "1981",
          "1986",
          "1992",
          "1995"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Spanien trat der EG gemeinsam mit welchem Nachbarland bei?",
        "o": [
          "Frankreich",
          "Marokko",
          "Portugal",
          "Italien"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Wie wird der friedliche Übergang Spaniens von der Franco-Diktatur zur Demokratie in den 1970er-Jahren oft genannt?",
        "o": [
          "Die Reconquista",
          "Die Movida",
          "Die Fiesta",
          "Die Transición"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Schweden": {
    "1": [
      {
        "q": "In welchem Jahr trat Schweden der Europäischen Union bei?",
        "o": [
          "1995",
          "1990",
          "2000",
          "2004"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Schweden trat der EU zusammen mit Finnland und welchem weiteren Land bei?",
        "o": [
          "Norwegen",
          "Österreich",
          "Dänemark",
          "Estland"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Schweden ist EU-Mitglied, hat aber bis heute keinen Euro eingeführt. Was beschreibt diese Situation am treffendsten?",
        "o": [
          "Schweden hat einen offiziellen Vertrags-Opt-out wie Dänemark",
          "Schweden nutzt bereits den Euro",
          "Schweden hat rechtlich keinen Opt-out, führte den Euro nach einem ablehnenden Referendum 2003 aber bislang nicht ein",
          "Schweden trat der Eurozone 2004 automatisch bei"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  }
};


/* js/questions_cat2.js */
pool[2] = {
  "Österreich": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Österreichs?",
        "o": [
          "Salzburg",
          "Graz",
          "Innsbruck",
          "Wien"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher große Fluss fließt durch Wien?",
        "o": [
          "Donau",
          "Rhein",
          "Elbe",
          "Moldau"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "An wie viele Länder grenzt Österreich – ungewöhnlich viele für seine Größe?",
        "o": [
          "5",
          "8",
          "6",
          "10"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Belgien": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Belgiens?",
        "o": [
          "Antwerpen",
          "Gent",
          "Brüssel",
          "Brügge"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "An welches Meer grenzt Belgien im Nordwesten?",
        "o": [
          "Mittelmeer",
          "Ostsee",
          "Adria",
          "Nordsee"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches futuristische Wahrzeichen wurde 1958 für die Brüsseler Weltausstellung gebaut und stellt ein Eisenkristall-Molekül dar?",
        "o": [
          "Das Atomium",
          "Der Eiffelturm",
          "Der Manneken Pis",
          "Der Berlaymont-Turm"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Bulgarien": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Bulgariens?",
        "o": [
          "Plovdiv",
          "Sofia",
          "Varna",
          "Burgas"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "An welches Meer grenzt Bulgarien im Osten?",
        "o": [
          "Ägäis",
          "Adria",
          "Schwarzes Meer",
          "Ostsee"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Ein Gebirgszug in Bulgarien gab der ganzen Balkanhalbinsel ihren Namen. Wie heißt er?",
        "o": [
          "Rila-Gebirge",
          "Karpaten",
          "Pirin-Gebirge",
          "Balkangebirge"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Kroatien": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Kroatiens?",
        "o": [
          "Zagreb",
          "Split",
          "Dubrovnik",
          "Rijeka"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "An welches Meer grenzt Kroatien mit seiner langen, inselreichen Küste?",
        "o": [
          "Schwarzes Meer",
          "Adriatisches Meer",
          "Ägäis",
          "Ionisches Meer"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welcher kroatische Nationalpark mit türkisfarbenen Seen und Wasserfällen steht auf der UNESCO-Weltnaturerbe-Liste?",
        "o": [
          "Krka",
          "Risnjak",
          "Plitvicer Seen",
          "Paklenica"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Zypern": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Zyperns?",
        "o": [
          "Limassol",
          "Larnaka",
          "Paphos",
          "Nikosia"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Zypern ist nach Sizilien und Sardinien die drittgrößte Insel in welchem Meer?",
        "o": [
          "Mittelmeer",
          "Schwarzes Meer",
          "Ägäis",
          "Adria"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche Besonderheit macht Nikosia unter allen Hauptstädten Europas einzigartig?",
        "o": [
          "Sie liegt am höchsten Punkt Europas",
          "Sie ist die letzte noch geteilte Hauptstadt Europas",
          "Sie hat keine Einwohner",
          "Sie liegt auf zwei verschiedenen Kontinenten"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Tschechien": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Tschechiens?",
        "o": [
          "Brünn",
          "Pilsen",
          "Prag",
          "Ostrava"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Fluss fließt durch Prag?",
        "o": [
          "Elbe",
          "Donau",
          "Oder",
          "Moldau"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "An wie viele Länder grenzt das komplett landumschlossene Tschechien?",
        "o": [
          "4",
          "3",
          "6",
          "8"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Dänemark": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Dänemarks?",
        "o": [
          "Aarhus",
          "Kopenhagen",
          "Odense",
          "Aalborg"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welche berühmte Brücke verbindet Kopenhagen mit der schwedischen Stadt Malmö?",
        "o": [
          "Storebæltbrücke",
          "Golden Gate Bridge",
          "Öresundbrücke",
          "Vasco-da-Gama-Brücke"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches autonome Gebiet gehört zu Dänemark und ist die größte Insel der Welt?",
        "o": [
          "Färöer-Inseln",
          "Bornholm",
          "Seeland",
          "Grönland"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Estland": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Estlands?",
        "o": [
          "Tallinn",
          "Tartu",
          "Narva",
          "Pärnu"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "An welches Meer grenzt Estland?",
        "o": [
          "Nordsee",
          "Ostsee",
          "Schwarzes Meer",
          "Adria"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Estland besteht aus wie vielen Inseln – deutlich mehr als man vermuten würde?",
        "o": [
          "Etwa 50",
          "Etwa 300",
          "Über 2.000",
          "Über 10.000"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Finnland": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Finnlands?",
        "o": [
          "Tampere",
          "Turku",
          "Oulu",
          "Helsinki"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Finnland wird oft \"Land der tausend Seen\" genannt. Wie viele Seen hat es tatsächlich ungefähr?",
        "o": [
          "Fast 190.000",
          "Etwa 20.000",
          "Etwa 1.000",
          "Etwa 500.000"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Finnland teilt die längste EU-Außengrenze mit welchem Nicht-EU-Land?",
        "o": [
          "Norwegen",
          "Russland",
          "Belarus",
          "Estland"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Frankreich": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Frankreichs?",
        "o": [
          "Lyon",
          "Marseille",
          "Paris",
          "Toulouse"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Fluss fließt durch Paris?",
        "o": [
          "Rhône",
          "Loire",
          "Garonne",
          "Seine"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Wie heißt der mit 4.809 Metern höchste Berg Westeuropas, der in den französischen Alpen liegt?",
        "o": [
          "Mont Blanc",
          "Matterhorn",
          "Großglockner",
          "Piz Bernina"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Deutschland": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Deutschlands?",
        "o": [
          "München",
          "Berlin",
          "Hamburg",
          "Frankfurt"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Fluss fließt durch Köln?",
        "o": [
          "Elbe",
          "Donau",
          "Rhein",
          "Weser"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Deutschland grenzt an mehr Länder als jeder andere EU-Staat. An wie viele?",
        "o": [
          "6",
          "7",
          "8",
          "9"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Griechenland": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Griechenlands?",
        "o": [
          "Athen",
          "Patras",
          "Thessaloniki",
          "Heraklion"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welchem Meer liegen die meisten der zahlreichen griechischen Inseln?",
        "o": [
          "Schwarzes Meer",
          "Ägäis",
          "Adria",
          "Nordsee"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Griechenland hat eine der höchsten Inselzahlen weltweit. Wie viele Inseln werden ihm ungefähr zugeschrieben?",
        "o": [
          "Etwa 500",
          "Etwa 1.500",
          "Etwa 6.000",
          "Etwa 15.000"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Ungarn": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Ungarns?",
        "o": [
          "Debrecen",
          "Szeged",
          "Pécs",
          "Budapest"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Fluss teilt Budapest in die beiden historischen Stadtteile Buda und Pest?",
        "o": [
          "Donau",
          "Theiß",
          "Drau",
          "Save"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Budapest entstand 1873 durch den Zusammenschluss von Buda, Pest und einem dritten Stadtteil. Wie hieß dieser?",
        "o": [
          "Visegrád",
          "Óbuda",
          "Esztergom",
          "Szentendre"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Irland": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Irlands?",
        "o": [
          "Cork",
          "Galway",
          "Dublin",
          "Limerick"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Fluss fließt durch Dublin?",
        "o": [
          "Shannon",
          "Corrib",
          "Lee",
          "Liffey"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Wie heißen die berühmten, bis zu 214 Meter hohen Steilklippen an Irlands Westküste?",
        "o": [
          "Cliffs of Moher",
          "White Cliffs",
          "Giant's Causeway",
          "Ring of Kerry"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Italien": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Italiens?",
        "o": [
          "Mailand",
          "Rom",
          "Neapel",
          "Turin"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Fluss fließt durch Rom?",
        "o": [
          "Po",
          "Arno",
          "Tiber",
          "Adige"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche zwei unabhängigen Kleinstaaten liegen vollständig innerhalb des italienischen Staatsgebiets?",
        "o": [
          "Monaco und Liechtenstein",
          "Liechtenstein und Andorra",
          "Andorra und Monaco",
          "Vatikanstadt und San Marino"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Lettland": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Lettlands?",
        "o": [
          "Riga",
          "Daugavpils",
          "Liepāja",
          "Jelgava"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "An welches Meer grenzt Lettland?",
        "o": [
          "Nordsee",
          "Ostsee",
          "Schwarzes Meer",
          "Adria"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Die Altstadt von Riga ist UNESCO-Weltkulturerbe und berühmt für Gebäude in welchem Baustil?",
        "o": [
          "Barock",
          "Gotik",
          "Jugendstil",
          "Bauhaus"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Litauen": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Litauens?",
        "o": [
          "Kaunas",
          "Klaipėda",
          "Šiauliai",
          "Vilnius"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Fluss ist der längste Litauens und mündet ins Kurische Haff?",
        "o": [
          "Nemunas",
          "Daugava",
          "Neris",
          "Venta"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "In der Nähe von Vilnius wurde 1989 von einem französischen Institut ein besonderer geografischer Punkt Europas berechnet. Welcher?",
        "o": [
          "Der tiefste Punkt Europas",
          "Der geografische Mittelpunkt Europas",
          "Der nördlichste Punkt Europas",
          "Der Nullmeridian"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Luxemburg": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Luxemburgs?",
        "o": [
          "Esch-sur-Alzette",
          "Differdange",
          "Luxemburg",
          "Dudelange"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "An wie viele Länder grenzt Luxemburg?",
        "o": [
          "2",
          "5",
          "4",
          "3"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Luxemburg gehört neben Malta und Zypern zu den drei flächenmäßig kleinsten Staaten der EU. Welchen Rang nimmt es dabei ein?",
        "o": [
          "Drittkleinster",
          "Zweitkleinster",
          "Kleinster",
          "Es ist nicht unter den kleinsten drei"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Malta": {
    "1": [
      {
        "q": "In welchem Meer liegt Malta?",
        "o": [
          "Ägäis",
          "Mittelmeer",
          "Adria",
          "Schwarzes Meer"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Wie heißt die Hauptstadt Maltas – die oft fälschlich mit dem Landesnamen verwechselt wird?",
        "o": [
          "Mdina",
          "Sliema",
          "Valletta",
          "Birgu"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Aus wie vielen bewohnten Hauptinseln besteht Malta?",
        "o": [
          "Nur einer",
          "Sieben",
          "Fünf",
          "Drei"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Niederlande": {
    "1": [
      {
        "q": "Wie heißt die offizielle Hauptstadt der Niederlande?",
        "o": [
          "Amsterdam",
          "Utrecht",
          "Rotterdam",
          "Den Haag"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welcher Stadt befinden sich Regierung und Parlament der Niederlande, obwohl sie nicht die offizielle Hauptstadt ist?",
        "o": [
          "Rotterdam",
          "Den Haag",
          "Utrecht",
          "Eindhoven"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Ein bedeutender Teil der Niederlande liegt unterhalb des Meeresspiegels. Wie viel ungefähr?",
        "o": [
          "Nur ein kleiner Küstenstreifen",
          "Etwa die Hälfte",
          "Rund ein Viertel des Landes",
          "Fast das gesamte Land"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Polen": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Polens?",
        "o": [
          "Krakau",
          "Danzig",
          "Breslau",
          "Warschau"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Wie heißt der längste Fluss Polens, der durch Warschau und Krakau fließt?",
        "o": [
          "Weichsel",
          "Oder",
          "Bug",
          "Warthe"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "An wie viele Länder grenzt Polen – inklusive der russischen Exklave Kaliningrad?",
        "o": [
          "5",
          "7",
          "6",
          "9"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Portugal": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Portugals?",
        "o": [
          "Porto",
          "Coimbra",
          "Lissabon",
          "Faro"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Fluss, der längste der iberischen Halbinsel, mündet in Lissabon in den Atlantik?",
        "o": [
          "Douro",
          "Guadiana",
          "Ebro",
          "Tejo"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche zwei autonomen Inselgruppen im Atlantik gehören zu Portugal?",
        "o": [
          "Azoren und Madeira",
          "Kanaren und Balearen",
          "Kap Verde und Azoren",
          "Madeira und Kanaren"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Rumänien": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Rumäniens?",
        "o": [
          "Cluj-Napoca",
          "Bukarest",
          "Timișoara",
          "Iași"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches Gebirge durchzieht Rumänien und ist als Heimat der Sagengestalt Dracula bekannt?",
        "o": [
          "Balkangebirge",
          "Kaukasus",
          "Karpaten",
          "Dinariden"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Wo bildet die Donau eines der am besten erhaltenen Flussdeltas Europas, das UNESCO-Biosphärenreservat ist?",
        "o": [
          "An der Grenze zu Ungarn",
          "Im Landesinneren bei Bukarest",
          "An der Grenze zu Serbien",
          "Am Schwarzen Meer"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Slowakei": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt der Slowakei?",
        "o": [
          "Bratislava",
          "Žilina",
          "Košice",
          "Nitra"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Fluss fließt durch Bratislava?",
        "o": [
          "Moldau",
          "Donau",
          "Theiß",
          "Oder"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Was macht Bratislava unter allen Hauptstädten der Welt einzigartig?",
        "o": [
          "Sie liegt auf zwei Kontinenten",
          "Sie hat keinen Fluss",
          "Sie ist die einzige Hauptstadt, die direkt an zwei andere Länder grenzt",
          "Sie liegt unterhalb des Meeresspiegels"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Slowenien": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Sloweniens?",
        "o": [
          "Maribor",
          "Celje",
          "Kranj",
          "Ljubljana"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Slowenien hat sowohl Alpen als auch eine kurze Küste an welchem Meer?",
        "o": [
          "Adriatisches Meer",
          "Schwarzes Meer",
          "Ägäis",
          "Ostsee"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welcher slowenische See ist berühmt für sein Inselchen mit Kirche und eine Burg auf einer Klippe darüber?",
        "o": [
          "Wörthersee",
          "Bleder See",
          "Bohinjer See",
          "Gardasee"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Spanien": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Spaniens?",
        "o": [
          "Barcelona",
          "Valencia",
          "Madrid",
          "Sevilla"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welcher spanischen Stadt steht die berühmte, noch immer im Bau befindliche Kirche Sagrada Família?",
        "o": [
          "Madrid",
          "Sevilla",
          "Bilbao",
          "Barcelona"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Was ist eine geografische Besonderheit von Spaniens Hauptstadt Madrid?",
        "o": [
          "Sie ist die höchstgelegene Hauptstadt der EU",
          "Sie liegt unterhalb des Meeresspiegels",
          "Sie liegt am Meer",
          "Sie liegt auf einer Insel"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Schweden": {
    "1": [
      {
        "q": "Wie heißt die Hauptstadt Schwedens?",
        "o": [
          "Göteborg",
          "Stockholm",
          "Malmö",
          "Uppsala"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Worauf ist Stockholm gebaut, was ihr den Spitznamen \"Venedig des Nordens\" einbrachte?",
        "o": [
          "Auf Pfählen im Meer",
          "Auf einem einzigen großen Felsen",
          "Auf 14 Inseln",
          "Auf einer künstlichen Landzunge"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Schweden ist nach Frankreich und Spanien das drittgrößte Land der EU nach Fläche. In welchem Landesteil kann man im Sommer die Mitternachtssonne erleben?",
        "o": [
          "Im Süden bei Malmö",
          "Rund um Stockholm",
          "Auf der Insel Gotland",
          "In Lappland, nördlich des Polarkreises"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  }
};


/* js/questions_cat3.js */
pool[3] = {
  "Österreich": {
    "1": [
      {
        "q": "Wie viele Abgeordnete entsendet Österreich nach der Europawahl 2024 in das Europäische Parlament?",
        "o": [
          "18",
          "22",
          "20",
          "25"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Über welches verfassungsrechtliche Instrument verfügt das Parlament, um ein Mitglied der Bundesregierung aus dem Amt zu heben?",
        "o": [
          "Konstruktives Misstrauensvotum",
          "Rügeverfahren",
          "Impeachment-Verfahren",
          "Misstrauensvotum"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Ressort betreute der österreichische EU-Kommissar Johannes Hahn in seiner Amtszeit von 2019 bis 2024?",
        "o": [
          "Haushalt und Verwaltung",
          "Nachbarschaft und Erweiterung",
          "Regionalpolitik",
          "Handel"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Belgien": {
    "1": [
      {
        "q": "Wo befindet sich der Hauptsitz der Europäischen Kommission und des Europäischen Rates?",
        "o": [
          "Luxemburg",
          "Brüssel",
          "Straßburg",
          "Den Haag"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches politische System kennzeichnet die Aufgabenverteilung zwischen der zentralen Ebene und den Regionen bzw. Gemeinschaften des Landes?",
        "o": [
          "Staatenbund",
          "Unitarismus",
          "Föderalismus",
          "Konföderation"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche Besonderheit gilt bei Parlamentswahlen bezüglich der Stimmabgabe?",
        "o": [
          "Es gilt ein reines Mehrheitswahlrecht",
          "Mindestens die Hälfte der Abgeordneten wird gelost",
          "Wählen ist erst ab 25 Jahren erlaubt",
          "Es besteht eine gesetzliche Wahlpflicht"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Bulgarien": {
    "1": [
      {
        "q": "Wer übernimmt im politischen System die Rolle des Regierungschefs?",
        "o": [
          "Der Ministerpräsident",
          "Der Staatspräsident",
          "Der Parlamentspräsident",
          "Der Generalgouverneur"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Wann trat das Land gemeinsam mit Rumänien der Europäischen Union bei?",
        "o": [
          "2004",
          "2007",
          "2013",
          "2010"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Portefeuille leitete die bulgarische EU-Kommissarin Iliana Ivanova in der Kommission von Ursula von der Leyen ab 2023?",
        "o": [
          "Digitale Wirtschaft",
          "Transport",
          "Innovation, Forschung, Kultur, Jugend und Sport",
          "Umwelt und Ozeane"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Kroatien": {
    "1": [
      {
        "q": "Welches Land trat der Europäischen Union im Jahr 2013 als bislang letztes Mitglied bei?",
        "o": [
          "Slowenien",
          "Montenegro",
          "Serbien",
          "Kroatien"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Am 1. Januar 2023 vollzog das Land einen Doppelbeitritt zu welchen beiden europäischen Zonen?",
        "o": [
          "Eurozone und Schengen-Raum",
          "Eurozone und NATO",
          "Schengen-Raum und EWR",
          "Zolleinheit und OECD"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welchen Posten bekleidete Dubravka Šuica in der EU-Kommission ab 2019?",
        "o": [
          "Kommissarin für Binnenmarkt",
          "Vizepräsidentin für Demokratie und Demografie",
          "Kommissarin für Energie",
          "Vizepräsidentin für Werte und Transparenz"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Zypern": {
    "1": [
      {
        "q": "Wer führt in dieser Republik die Geschäfte der Exekutive als Regierungschef?",
        "o": [
          "Der Premierminister",
          "Der Kanzler",
          "Der Staatspräsident",
          "Der Sprecher des Hauses"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Wann trat die Inselrepublik der Europäischen Union bei?",
        "o": [
          "1995",
          "2013",
          "2007",
          "2004"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Was zeichnet das Regierungssystem im Vergleich zu den meisten anderen EU-Mitgliedstaaten aus?",
        "o": [
          "Es ist eine reine Präsidialrepublik",
          "Es besitzt gar kein Parlament",
          "Es ist eine konstitutionelle Monarchie",
          "Es hat ein dreikammeriges Parlament"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Tschechien": {
    "1": [
      {
        "q": "Durch welches Organ wird die Gesetzgebung auf nationaler Ebene beschlossen?",
        "o": [
          "Durch den Staatsrat",
          "Durch das Parlament",
          "Durch die Bundesversammlung",
          "Durch das Verfassungsgericht"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches Ereignis prägte die erste Führung des EU-Ratsvorsitzes durch das Land im Jahr 2009?",
        "o": [
          "Ein Beitritt zur Eurozone",
          "Der Austritt aus dem Schengen-Raum",
          "Ein Misstrauensvotum gegen die eigene Regierung",
          "Die Unterzeichnung des Vertrags von Maastricht"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche Funktion übte Věra Jourová ab 2019 in der Europäischen Kommission aus?",
        "o": [
          "Kommissarin für Landwirtschaft",
          "Hohe Vertreterin für Außenpolitik",
          "Kommissarin für Wettbewerb",
          "Vizepräsidentin für Werte und Transparenz"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Dänemark": {
    "1": [
      {
        "q": "Welche Staatsform liegt in diesem nordischen Mitgliedstaat vor?",
        "o": [
          "Konstitutionelle Monarchie",
          "Parlamentarische Republik",
          "Präsidialrepublik",
          "Sozialistische Republik"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welchen Sonderstatus vereinbarte das Land 1992 im Vertrag von Maastricht bezüglich der gemeinsamen Währung?",
        "o": [
          "Verpflichtung zum Euro-Beitritt bis 2000",
          "Eine formelle Befreiungsklausel vom Euro",
          "Nutzung des US-Dollars als Übergangswährung",
          "Verbot jeglichen Währungsumtausches"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche Beistandsklausel der EU stimmte die Bevölkerung im Juni 2022 per Volksentscheid zu beizutreten?",
        "o": [
          "Währungsunion",
          "Steuerharmonisierung",
          "Gemeinsame Sicherheits- und Verteidigungspolitik",
          "Gesundheitspolitische Koordinierung"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Estland": {
    "1": [
      {
        "q": "Welches Verfahren nutzt das Land seit Jahren flächendeckend bei nationalen Wahlen?",
        "o": [
          "Briefwahl als einziger Weg",
          "Reine Pflichtwahl im Wahllokal",
          "Stimmabgabe per SMS",
          "Elektronische Stimmabgabe über das Internet"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welchem Jahr wurde das Land Mitglied der Europäischen Union?",
        "o": [
          "2004",
          "1995",
          "2007",
          "2011"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Ressort leitete Kadri Simson in der EU-Kommission ab 2019?",
        "o": [
          "Transport",
          "Energie",
          "Umwelt",
          "Justiz"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Finnland": {
    "1": [
      {
        "q": "Wie wird das Staatsoberhaupt in diesem Land bestimmt?",
        "o": [
          "Ernennung durch die EU",
          "Erblicher Monarch",
          "Direktwahl durch das Volk",
          "Wahl durch den Senat"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches außen- und sicherheitspolitische Prinzip gab das Land 2023 mit dem Beitritt zur NATO auf?",
        "o": [
          "Den Isolationismus",
          "Die nukleare Teilhabe",
          "Den Pazifismus",
          "Die militärische Bündnisfreiheit"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Verfassungsorgan besitzt die primäre Verfassungskontrolle von Gesetzesentwürfen noch vor deren Verabschiedung?",
        "o": [
          "Ein Verfassungsausschuss im Parlament",
          "Ein eigenständiges Verfassungsgericht",
          "Der Oberste Gerichtshof allein",
          "Der Europäische Gerichtshof"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Frankreich": {
    "1": [
      {
        "q": "Wie heißt die Bauweise des Regierungssystems, in dem sich Präsident und Premierminister die Exekutivmacht teilen?",
        "o": [
          "Parlamentarische Monarchie",
          "Semipräsidielles System",
          "Direktordemokratie",
          "Ständestaat"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher EU-Vertrag wurde 1957 mit unterzeichnet und gilt als ein Grundstein der heutigen EU?",
        "o": [
          "Vertrag von Lissabon",
          "Vertrag von Nizza",
          "Römische Verträge",
          "Vertrag von Amsterdam"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Gremium bildet zusammen mit der Nationalversammlung das nationale Parlament?",
        "o": [
          "Das Bundesrat-Äquivalent",
          "Der Volksrat",
          "Die Abgeordnetenkammer",
          "Der Senat"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Deutschland": {
    "1": [
      {
        "q": "Welches Organ vertritt die 16 Bundesländer bei der Gesetzgebung des Bundes?",
        "o": [
          "Der Bundesrat",
          "Der Bundestag",
          "Die Bundesversammlung",
          "Das Kanzleramt"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Wie viele Abgeordnete stellt der Mitgliedstaat seit der Europawahl 2024 maximal im Europäischen Parlament?",
        "o": [
          "705",
          "96",
          "81",
          "120"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche Hürde muss eine Partei bei der Sperrklausel überwinden, um über Listenmandate in das nationale Parlament einzuziehen?",
        "o": [
          "3 Prozent",
          "10 Prozent",
          "5 Prozent",
          "2 Prozent"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Griechenland": {
    "1": [
      {
        "q": "Welche Staatsform hat das Land seit der Abschaffung der Monarchie per Volksentscheid im Jahr 1974?",
        "o": [
          "Präsidialrepublik",
          "Sozialistische Republik",
          "Konstitutionelle Monarchie",
          "Parlamentarische Republik"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Beitrittswelle ordnet man das Land historisch zu, als es 1981 der Europäischen Gemeinschaft beitrat?",
        "o": [
          "Die Norderweiterung bzw. Süderweiterung",
          "Die Gründerstaaten",
          "Die Osterweiterung",
          "Die EFTA-Erweiterung"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Ressort verantwortete Margaritis Schinas als Vizepräsident der EU-Kommission ab 2019?",
        "o": [
          "Handel",
          "Förderung unseres europäischen Lebensstils",
          "Binnenmarkt",
          "Landwirtschaft"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Ungarn": {
    "1": [
      {
        "q": "Welches Vertretungsorgan übt die legislative Gewalt auf nationaler Ebene aus?",
        "o": [
          "Ein Zweikammersystem",
          "Ein Föderalrat",
          "Ein Einkammerparlament",
          "Ein Staatsgerichtshof"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Vertrag regelte 2004 den EU-Beitritt des Landes?",
        "o": [
          "Der Vertrag von Maastricht",
          "Der Vertrag von Rom",
          "Die Akte von Helsinki",
          "Der Beitrittsvertrag 2003"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welchen Posten bekleidete Olivér Várhelyi in der Europarechtlichen Exekutive ab 2019?",
        "o": [
          "Kommissar für Nachbarschaft und Erweiterung",
          "Kommissar für Justiz",
          "Kommissar für Finanzen",
          "Kommissar für Verkehr"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Irland": {
    "1": [
      {
        "q": "Welches Wahlsystem wird bei der Bestimmung der Abgeordneten des nationalen Parlaments angewendet?",
        "o": [
          "Reines Mehrheitswahlrecht",
          "Übertragbare Einzelstimme",
          "Reine starre Parteiliste",
          "Mehrheitswahl mit Kooptation"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welchem Abkommen verdankt das Land seit 1998 den Frieden im Norden der Insel, was auch bei EU-Verhandlungen zentral war?",
        "o": [
          "Vertrag von Nizza",
          "Vertrag von Schengen",
          "Karfreitagsabkommen",
          "Abkommen von Schengen-Ost"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Verfahren erfordert die Verfassung zwingend bei Übertragungen von Hoheitsrechten an die EU?",
        "o": [
          "Eine einfache Parlamentsentscheidung",
          "Einen Erlass des Präsidenten",
          "Die Zustimmung aller Bezirke",
          "Ein verbindliches Referendum"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Italien": {
    "1": [
      {
        "q": "Aus wie vielen gleichberechtigten Kammern besteht das nationale Parlament bei der Gesetzgebung?",
        "o": [
          "Aus zwei Kammern",
          "Aus einer Kammer",
          "Aus drei Kammern",
          "Aus vier Kammern"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Politiker amtierte von 2019 bis 2024 als Präsident des Europäischen Parlaments?",
        "o": [
          "Antonio Tajani",
          "David Sassoli",
          "Mario Draghi",
          "Roberto Gualtieri"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches verfassungsrechtliche Mittel erlaubt es Bürgern, bestehende Gesetze per Abstimmung aufzuheben?",
        "o": [
          "Konstruktiver Einspruch",
          "Gesetzesinitiativrecht",
          "Abrogatives Referendum",
          "Verfassungsbeschwerde"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Lettland": {
    "1": [
      {
        "q": "Wer wählt das Staatsoberhaupt im nationalen System?",
        "o": [
          "Die Bevölkerung in Direktwahl",
          "Die Kommunalräte",
          "Der Richterrat",
          "Das Parlament"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welchem Jahr führte das Land den Euro als offizielle Währung ein?",
        "o": [
          "2014",
          "2004",
          "2007",
          "2020"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche Schlüsselrolle bekleidete Valdis Dombrovskis in der EU-Kommission ab 2019?",
        "o": [
          "Kommissar für Umwelt",
          "Exekutiv-Vizepräsident für eine Wirtschaft im Dienste der Menschen",
          "Kommissar für Energie",
          "Hoher Vertreter der Union"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Litauen": {
    "1": [
      {
        "q": "Welche Regierungsform charakterisiert die Gewaltenteilung zwischen Exekutive und Legislative?",
        "o": [
          "Reine Monarchie",
          "Absolute Kanzlerdemokratie",
          "Semipräsidielles System",
          "Parlamentslose Diktatur"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welchem Jahr trat das Land der Eurozone bei?",
        "o": [
          "2004",
          "2018",
          "2010",
          "2015"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Ressort verantwortete Virginijus Sinkevičius in der EU-Kommission ab 2019?",
        "o": [
          "Umwelt, Ozeane und Fischerei",
          "Landwirtschaft",
          "Binnenmarkt",
          "Forschung und Innovation"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Luxemburg": {
    "1": [
      {
        "q": "Welche weltweit einmalige Staatsform besitzt dieses Gründerland der EU?",
        "o": [
          "Herzogtum",
          "Großherzogtum",
          "Fürstentum",
          "Kaiserreich"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches europäische Abkommen zur Abschaffung von Grenzkontrollen wurde nach einem Ort in diesem Land benannt?",
        "o": [
          "Vertrag von Maastricht",
          "Lissabon-Strategie",
          "Schengener Abkommen",
          "Brüsseler Pakt"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches wichtige Organ der Europäischen Union hat seinen Hauptsitz in der Hauptstadt dieses Landes?",
        "o": [
          "Europäische Zentralbank",
          "Europäische Umweltagentur",
          "Europäisches Parlament",
          "Europäischer Gerichtshof"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Malta": {
    "1": [
      {
        "q": "Wie viele Abgeordnete entsendet der kleinststaatliche Mitgliedstaat gesetzlich garantiert mindestens ins Europäische Parlament?",
        "o": [
          "6",
          "3",
          "9",
          "12"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Staatengemeinschaft gehört das Land neben der EU aufgrund seiner historischen Entwicklung an?",
        "o": [
          "EFTA",
          "Commonwealth of Nations",
          "Benelux",
          "Nordischer Rat"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Mandat übernahm Helena Dalli in der Europäischen Kommission ab 2019?",
        "o": [
          "Verkehr",
          "Gesundheit",
          "Gleichheit",
          "Finanzen"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Niederlande": {
    "1": [
      {
        "q": "Welche Staatsform liegt im Mutterland dieses westeuropäischen Staates vor?",
        "o": [
          "Präsidialrepublik",
          "Bundesrepublik",
          "Räterepublik",
          "Konstitutionelle Monarchie"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welcher Stadt wurden 1992 die Verträge zur Gründung der Europäischen Union unterzeichnet?",
        "o": [
          "Maastricht",
          "Amsterdam",
          "Utrecht",
          "Rotterdam"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welchen Posten hatte Frans Timmermans bis 2023 in der Kommission von Ursula von der Leyen inne?",
        "o": [
          "Kommissar für Wettbewerb",
          "Exekutiv-Vizepräsident für den Europäischen Grünen Deal",
          "Kommissar für Haushalt",
          "Hoher Vertreter der Außenpolitik"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Polen": {
    "1": [
      {
        "q": "Aus wie vielen Abgeordneten setzt sich die erste Kammer des Parlaments (Sejm) zusammen?",
        "o": [
          "100",
          "705",
          "460",
          "200"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welchem Jahr wurde das Land Mitglied der Europäischen Union?",
        "o": [
          "1999",
          "2010",
          "2007",
          "2004"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Organ wacht über die Vereinbarkeit von nationalen Gesetzen mit der Verfassung?",
        "o": [
          "Das Verfassungsgericht",
          "Der Oberste Rechnungshof",
          "Der Staatsrat",
          "Der Staatsgerichtshof"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Portugal": {
    "1": [
      {
        "q": "Wie wird die Position des Staatsoberhaupts besetzt?",
        "o": [
          "Erbschaft",
          "Direktwahl durch das Volk",
          "Wahl durch die Kommunen",
          "Ernennung durch die EU"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Vertrag zur Verfassungsreform der EU wurde 2007 unter der Ratspräsidentschaft dieses Landes unterzeichnet?",
        "o": [
          "Vertrag von Nizza",
          "Vertrag von Amsterdam",
          "Vertrag von Lissabon",
          "Vertrag von Rom"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Ressort leitete Elisa Ferreira in der EU-Kommission ab 2019?",
        "o": [
          "Landwirtschaft",
          "Wettbewerb",
          "Innovation",
          "Kohäsion und Reformen"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Rumänien": {
    "1": [
      {
        "q": "Wer steht an der Spitze der Regierung Exekutive?",
        "o": [
          "Der Ministerpräsident",
          "Der Staatspräsident",
          "Der Parlamentssprecher",
          "Der Kanzler"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Beitrittszone trat das Land im März 2024 für den Luft- und Seeverkehr bei?",
        "o": [
          "Eurozone",
          "Schengen-Raum",
          "EWR",
          "OECD"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Amt bekleidete Adina Vălean in der Europäischen Kommission von 2019 bis 2024?",
        "o": [
          "Umwelt",
          "Bildung",
          "Verkehr",
          "Energie"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Slowakei": {
    "1": [
      {
        "q": "Welche Staatsform weist das Land seit der Unabhängigkeit 1993 auf?",
        "o": [
          "Monarchie",
          "Ständestaat",
          "Diktatur",
          "Parlamentarische Republik"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welchem Jahr führte das Land den Euro als Landeswährung ein?",
        "o": [
          "2009",
          "2004",
          "2015",
          "2021"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welchen Exekutivposten besetzte Maroš Šefčovič in der EU-Kommission ab 2019?",
        "o": [
          "Binnenmarkt",
          "Vizepräsident für interinstitutionelle Beziehungen und vorausschauende Strukturplanung",
          "Justiz",
          "Landwirtschaft"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Slowenien": {
    "1": [
      {
        "q": "Wann wurde das Land im Zuge der großen Erweiterung Teil der Europäischen Union?",
        "o": [
          "1995",
          "2007",
          "2004",
          "2013"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches Währungsgebiet löste den Tolar im Jahr 2007 als Zahlungsmittel ab?",
        "o": [
          "Schweizer Franken",
          "Britisches Pfund",
          "D-Mark",
          "Eurozone"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Ressort leitete Janez Lenarčič in der EU-Kommission ab 2019?",
        "o": [
          "Krisenmanagement",
          "Regionalpolitik",
          "Handel",
          "Steuern und Zollunion"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Spanien": {
    "1": [
      {
        "q": "Welche Regierungsform kennzeichnet die konstitutionelle Struktur des Landes?",
        "o": [
          "Präsidialrepublik",
          "Parlamentarische Monarchie",
          "Sozialistische Republik",
          "Fürstentum"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Beitrittswelle schloss sich das Land im Jahr 1986 gemeinsam mit Portugal an?",
        "o": [
          "Gründungsmitglieder",
          "Osterweiterung",
          "Süderweiterung",
          "Skandinavien-Erweiterung"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Wie bezeichnet man die administrative Gliederung der 17 Regionen mit eigener Gesetzgebungs- und Exekutivkompetenz?",
        "o": [
          "Kantone",
          "Departmente",
          "Bundesländer",
          "Autonome Gemeinschaften"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Schweden": {
    "1": [
      {
        "q": "Welches staatliche Oberhaupt hat formell repräsentative Aufgaben in dieser Nordischen Monarchie?",
        "o": [
          "Der König",
          "Der Bundespräsident",
          "Der Großherzog",
          "Der Staatsrat"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Warum gehört das Land nicht der Eurozone an, obwohl es EU-Mitglied ist?",
        "o": [
          "Es hat ein offizielles Opt-out wie Dänemark",
          "Ein Volksentscheid lehnte die Einführung 2003 ab",
          "Es erfüllt die Konvergenzkriterien nicht",
          "Die EU hat den Beitritt verweigert"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Ressort führte Ylva Johansson in der Europäischen Kommission ab 2019?",
        "o": [
          "Digitales",
          "Wettbewerb",
          "Inneres",
          "Fischerei"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  }
};


/* js/questions_cat4.js */
pool[4] = {
  "Österreich": {
    "1": [
      {
        "q": "Welche Sprache ist Amtssprache in Österreich?",
        "o": [
          "Schweizerdeutsch",
          "Deutsch",
          "Niederländisch",
          "Dänisch"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher weltberühmte Komponist wurde 1756 in Salzburg geboren?",
        "o": [
          "Ludwig van Beethoven",
          "Johann Sebastian Bach",
          "Wolfgang Amadeus Mozart",
          "Johannes Brahms"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Neujahrskonzert wird jedes Jahr aus Wien in über 90 Länder übertragen?",
        "o": [
          "Das Silvesterkonzert der Berliner Philharmoniker",
          "Das Mozart-Gala-Konzert",
          "Das Salzburger Festspielkonzert",
          "Das Neujahrskonzert der Wiener Philharmoniker"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Belgien": {
    "1": [
      {
        "q": "Wie viele Amtssprachen hat Belgien offiziell?",
        "o": [
          "Drei",
          "Zwei",
          "Eine",
          "Vier"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Wofür ist Belgien neben Waffeln und Bier international besonders berühmt?",
        "o": [
          "Käse",
          "Schokolade und Pralinen",
          "Marzipan",
          "Nougat"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welcher belgische Comic-Held, ein junger Reporter mit Hund Struppi, ist eines der bekanntesten Kulturexporte des Landes?",
        "o": [
          "Asterix",
          "Lucky Luke",
          "Tim",
          "Micky Maus"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Bulgarien": {
    "1": [
      {
        "q": "Welches Alphabet wird in Bulgarien verwendet?",
        "o": [
          "Lateinisches Alphabet",
          "Arabisches Alphabet",
          "Griechisches Alphabet",
          "Kyrillisches Alphabet"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In Bulgarien kann es leicht zu Missverständnissen kommen: Was bedeutet ein seitliches Kopfschütteln dort traditionell?",
        "o": [
          "Ja",
          "Nein",
          "Vielleicht",
          "Ich verstehe nicht"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches bulgarische Gebäck-/Brauchtumssymbol wird traditionell am 1. März als Glücksbringer getragen (rot-weiße Fäden)?",
        "o": [
          "Matroschka",
          "Martenitza",
          "Piñata",
          "Talisman"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Kroatien": {
    "1": [
      {
        "q": "Welche Sprache spricht man in Kroatien?",
        "o": [
          "Serbisch",
          "Slowenisch",
          "Kroatisch",
          "Bosnisch"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches Kleidungsstück, das heute weltweit getragen wird, geht auf kroatische Soldaten des 17. Jahrhunderts zurück?",
        "o": [
          "Der Anzug",
          "Der Trenchcoat",
          "Die Jeans",
          "Die Krawatte"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Über welche Sprache gelangte die kroatische Nackenbinde als \"Krawatte\" in den internationalen Wortschatz?",
        "o": [
          "Über das Französische",
          "Über das Deutsche",
          "Über das Lateinische",
          "Über das Italienische"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Zypern": {
    "1": [
      {
        "q": "Welche zwei Hauptsprachen werden in Zypern gesprochen?",
        "o": [
          "Italienisch und Französisch",
          "Griechisch und Türkisch",
          "Arabisch und Hebräisch",
          "Spanisch und Portugiesisch"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Nach welcher griechischen Göttin, die der Sage nach aus dem Meer bei Zypern geboren wurde, ist die Insel kulturell besonders bekannt?",
        "o": [
          "Athene",
          "Hera",
          "Aphrodite",
          "Artemis"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche jahrtausendealte Kupferverarbeitung gab der Insel Zypern vermutlich sogar ihren Namen (lateinisch \"cuprum\")?",
        "o": [
          "Gold",
          "Silber",
          "Eisen",
          "Kupfer"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Tschechien": {
    "1": [
      {
        "q": "Welche Sprache spricht man in Tschechien?",
        "o": [
          "Tschechisch",
          "Slowakisch",
          "Polnisch",
          "Ungarisch"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Tschechien hat weltweit den höchsten Pro-Kopf-Konsum welches Getränks?",
        "o": [
          "Slivovice",
          "Bier",
          "Kaffee",
          "Wein"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "In welcher tschechischen Stadt wurde 1842 das weltweit erste Pils gebraut, das heute unzähligen Biersorten ihren Namen gibt?",
        "o": [
          "Prag",
          "Brünn",
          "Pilsen",
          "Budweis"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Dänemark": {
    "1": [
      {
        "q": "Welche Sprache spricht man in Dänemark?",
        "o": [
          "Norwegisch",
          "Isländisch",
          "Schwedisch",
          "Dänisch"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher dänische Schriftsteller ist weltberühmt für Märchen wie \"Die kleine Meerjungfrau\" und \"Das hässliche Entlein\"?",
        "o": [
          "Hans Christian Andersen",
          "Henrik Ibsen",
          "Karen Blixen",
          "Astrid Lindgren"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches dänische Spielzeugunternehmen, benannt nach \"leg godt\" (\"gut spielen\"), gehört zu den bekanntesten Marken der Welt?",
        "o": [
          "Playmobil",
          "LEGO",
          "Hasbro",
          "Mattel"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Estland": {
    "1": [
      {
        "q": "Zu welcher Sprachfamilie gehört Estnisch – anders als die meisten anderen EU-Sprachen?",
        "o": [
          "Slawische Sprachen",
          "Romanische Sprachen",
          "Finno-ugrische Sprachen",
          "Germanische Sprachen"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches jährliche Massen-Gesangsfest, bei dem oft über 20.000 Menschen gemeinsam singen, gehört zum UNESCO-Kulturerbe Estlands?",
        "o": [
          "Der Eurovision Song Contest",
          "Der Baltische Chorwettbewerb",
          "Das Ostseefestival",
          "Das estnische Sängerfest"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche estnische Stadt gilt mit ihrer mittelalterlichen Altstadt als eine der am besten erhaltenen Nordeuropas und ist UNESCO-Welterbe?",
        "o": [
          "Tallinn",
          "Tartu",
          "Narva",
          "Pärnu"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Finnland": {
    "1": [
      {
        "q": "Welche zwei Amtssprachen hat Finnland?",
        "o": [
          "Finnisch und Norwegisch",
          "Finnisch und Schwedisch",
          "Finnisch und Estnisch",
          "Finnisch und Dänisch"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welche finnische Sauna-Tradition ist so bedeutend, dass es in Finnland schätzungsweise mehr Saunen als Autos gibt?",
        "o": [
          "Nur ein Mythos",
          "Saunen sind in Finnland verboten",
          "Es stimmt – Saunakultur gehört zum UNESCO-Kulturerbe Finnlands",
          "Saunen gibt es dort seltener als anderswo"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welcher finnische Handyhersteller war in den 1990er- und frühen 2000er-Jahren jahrelang Weltmarktführer?",
        "o": [
          "Ericsson",
          "Motorola",
          "Siemens",
          "Nokia"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Frankreich": {
    "1": [
      {
        "q": "Welche Sprache spricht man in Frankreich?",
        "o": [
          "Französisch",
          "Italienisch",
          "Spanisch",
          "Katalanisch"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Wie heißt das weltberühmte Filmfestival, das jährlich an der französischen Riviera stattfindet?",
        "o": [
          "Berlinale",
          "Filmfestival von Cannes",
          "Venedig Filmfestival",
          "Sundance"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Motto ziert seit der Französischen Revolution offiziell französische Gebäude und Münzen?",
        "o": [
          "\"Einigkeit und Recht und Freiheit\"",
          "\"In Vielfalt geeint\"",
          "\"Liberté, Égalité, Fraternité\"",
          "\"Gott zum Gruße\""
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Deutschland": {
    "1": [
      {
        "q": "Welche Sprache spricht man in Deutschland?",
        "o": [
          "Niederländisch",
          "Luxemburgisch",
          "Dänisch",
          "Deutsch"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches bayerische Volksfest gilt mit Millionen Besuchern jährlich als größtes Bierfest der Welt?",
        "o": [
          "Oktoberfest",
          "Karneval",
          "Christkindlmarkt",
          "Silvesterfeuerwerk"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches deutsche Brüderpaar aus Sprachwissenschaftlern sammelte im 19. Jahrhundert Volksmärchen wie \"Aschenputtel\" und \"Rotkäppchen\"?",
        "o": [
          "Die Gebrüder Humboldt",
          "Die Gebrüder Grimm",
          "Die Gebrüder Mann",
          "Die Gebrüder Schlegel"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Griechenland": {
    "1": [
      {
        "q": "Welches Alphabet wird in Griechenland verwendet und gab vielen wissenschaftlichen Symbolen ihren Namen?",
        "o": [
          "Kyrillisches Alphabet",
          "Lateinisches Alphabet",
          "Griechisches Alphabet",
          "Phönizisches Alphabet"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welcher griechischen Stadt fanden 776 v. Chr. die ersten Olympischen Spiele der Antike statt?",
        "o": [
          "Athen",
          "Sparta",
          "Delphi",
          "Olympia"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welcher griechische Tanz, ursprünglich für den Film \"Alexis Sorbas\" (1964) choreografiert, ist heute international der bekannteste griechische Tanz?",
        "o": [
          "Sirtaki",
          "Kalamatianos",
          "Zeibekiko",
          "Hasapiko"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Ungarn": {
    "1": [
      {
        "q": "Zu welcher Sprachfamilie gehört Ungarisch – untypisch für Mitteleuropa?",
        "o": [
          "Slawische Sprachen",
          "Finno-ugrische Sprachen",
          "Germanische Sprachen",
          "Romanische Sprachen"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches würzige, paprikahaltige Nationalgericht ist untrennbar mit Ungarn verbunden?",
        "o": [
          "Borschtsch",
          "Bigos",
          "Gulasch",
          "Ćevapčići"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Budapest gilt wegen seiner zahlreichen heißen Quellen als eine der weltweit bedeutendsten Städte für welche Wellness-Tradition?",
        "o": [
          "Saunakultur",
          "Schlammpackungen aus Vulkangestein",
          "Meersalz-Kuren",
          "Thermalbäder"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Irland": {
    "1": [
      {
        "q": "Welche zwei Amtssprachen hat Irland?",
        "o": [
          "Englisch und Irisch",
          "Englisch und Walisisch",
          "Englisch und Schottisch-Gälisch",
          "Englisch und Französisch"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches irische Fest am 17. März wird mittlerweile weltweit mit grüner Kleidung und Paraden gefeiert?",
        "o": [
          "Halloween",
          "St. Patrick's Day",
          "Samhain",
          "Beltane"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Wie heißt die traditionelle irische Musikform mit Fiddle, Tin Whistle und Bodhrán, die weltweit Folk-Musik beeinflusst hat?",
        "o": [
          "Klezmer",
          "Flamenco",
          "Irish Traditional Music",
          "Fado"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Italien": {
    "1": [
      {
        "q": "Welche Sprache spricht man in Italien?",
        "o": [
          "Spanisch",
          "Portugiesisch",
          "Rumänisch",
          "Italienisch"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welcher italienischen Stadt findet jährlich einer der berühmtesten Karnevalsumzüge der Welt mit venezianischen Masken statt?",
        "o": [
          "Venedig",
          "Rom",
          "Florenz",
          "Mailand"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Gemälde von Leonardo da Vinci, das im Louvre in Paris hängt, gilt als eines der berühmtesten Kunstwerke Italiens?",
        "o": [
          "Die Sixtinische Kapelle",
          "Die Mona Lisa",
          "Das letzte Abendmahl",
          "Der Vitruvianische Mensch"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Lettland": {
    "1": [
      {
        "q": "Welche Sprache spricht man in Lettland?",
        "o": [
          "Litauisch",
          "Estnisch",
          "Lettisch",
          "Russisch"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches jährliche Gesangs- und Tanzfest, bei dem tausende Menschen mitwirken, gehört wie in Estland zum UNESCO-Kulturerbe Lettlands?",
        "o": [
          "Der Baltische Chorwettbewerb",
          "Das Ostseefestival",
          "Der Rigaer Musiksommer",
          "Das lettische Gesangs- und Tanzfest"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Wofür ist die Altstadt von Riga architektonisch besonders bekannt und UNESCO-gelistet?",
        "o": [
          "Eine der weltweit größten Sammlungen an Jugendstil-Architektur",
          "Gotische Kathedralen ausschließlich",
          "Sowjetische Plattenbauten",
          "Barocke Schlösser"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Litauen": {
    "1": [
      {
        "q": "Welche Sprache spricht man in Litauen?",
        "o": [
          "Lettisch",
          "Litauisch",
          "Polnisch",
          "Belarussisch"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Litauisch gilt sprachwissenschaftlich als besonders altertümlich. Welcher antiken Sprache soll es unter allen lebenden Sprachen am nächsten stehen?",
        "o": [
          "Latein",
          "Griechisch",
          "Sanskrit",
          "Hebräisch"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches litauische Kreuz-Bergheiligtum bei Šiauliai mit zehntausenden aufgestellten Kreuzen ist ein bedeutendes religiöses und kulturelles Wahrzeichen?",
        "o": [
          "Berg Golgatha",
          "Klosterberg Aglona",
          "Kreuzritterburg",
          "Berg der Kreuze"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Luxemburg": {
    "1": [
      {
        "q": "Wie viele Amtssprachen hat Luxemburg offiziell?",
        "o": [
          "Drei",
          "Zwei",
          "Eine",
          "Vier"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Wie heißt die eigenständige Landessprache Luxemburgs, die neben Französisch und Deutsch Amtssprache ist?",
        "o": [
          "Wallonisch",
          "Luxemburgisch",
          "Elsässisch",
          "Flämisch"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Wofür ist Luxemburg neben seiner Sprachenvielfalt international besonders bekannt?",
        "o": [
          "Als Filmindustrie-Zentrum",
          "Als größter Weinexporteur Europas",
          "Als bedeutender internationaler Finanzplatz",
          "Als Zentrum der Textilindustrie"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Malta": {
    "1": [
      {
        "q": "Welche zwei Amtssprachen hat Malta?",
        "o": [
          "Italienisch und Englisch",
          "Maltesisch und Französisch",
          "Arabisch und Englisch",
          "Maltesisch und Englisch"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Maltesisch ist die einzige EU-Amtssprache mit Wurzeln in welcher Sprachfamilie?",
        "o": [
          "Semitische Sprachen",
          "Romanische Sprachen",
          "Slawische Sprachen",
          "Keltische Sprachen"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche jahrtausendealten Tempelanlagen auf Malta gehören zu den ältesten freistehenden Bauwerken der Menschheit und sind UNESCO-Welterbe?",
        "o": [
          "Stonehenge",
          "Die Megalithtempel von Malta",
          "Die Pyramiden von Gizeh",
          "Die Nuraghen Sardiniens"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Niederlande": {
    "1": [
      {
        "q": "Welche Sprache spricht man in den Niederlanden?",
        "o": [
          "Deutsch",
          "Flämisch",
          "Niederländisch",
          "Friesisch"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher niederländische Maler ist berühmt für Werke wie \"Die Sternennacht\" und \"Sonnenblumen\"?",
        "o": [
          "Rembrandt",
          "Piet Mondrian",
          "Johannes Vermeer",
          "Vincent van Gogh"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche traditionelle niederländische Blume, im 17. Jahrhundert Auslöser einer der ersten Spekulationsblasen der Geschichte, ist bis heute Exportschlager?",
        "o": [
          "Tulpe",
          "Rose",
          "Nelke",
          "Lilie"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Polen": {
    "1": [
      {
        "q": "Welche Sprache spricht man in Polen?",
        "o": [
          "Tschechisch",
          "Polnisch",
          "Slowakisch",
          "Ukrainisch"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher polnische Komponist des 19. Jahrhunderts, berühmt für seine Klavierwerke, gilt als einer der größten Musiker der Romantik?",
        "o": [
          "Antonín Dvořák",
          "Franz Liszt",
          "Frédéric Chopin",
          "Johannes Brahms"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche polnische Wissenschaftlerin gewann als erste Frau überhaupt einen Nobelpreis – und als einzige Person bisher in zwei verschiedenen Naturwissenschaften?",
        "o": [
          "Rosalind Franklin",
          "Ada Lovelace",
          "Lise Meitner",
          "Marie Curie"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Portugal": {
    "1": [
      {
        "q": "Welche Sprache spricht man in Portugal?",
        "o": [
          "Portugiesisch",
          "Spanisch",
          "Galicisch",
          "Katalanisch"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Wie heißt der melancholische, traditionelle portugiesische Musikstil, der oft von der Sehnsucht (\"Saudade\") handelt?",
        "o": [
          "Flamenco",
          "Fado",
          "Tango",
          "Rebetiko"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welcher portugiesische Seefahrer leitete die erste Weltumsegelungsexpedition, obwohl er selbst unterwegs starb?",
        "o": [
          "Vasco da Gama",
          "Christoph Kolumbus",
          "Ferdinand Magellan",
          "Heinrich der Seefahrer"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Rumänien": {
    "1": [
      {
        "q": "Welche Sprache spricht man in Rumänien – als einzige romanische Sprache Osteuropas?",
        "o": [
          "Slawisch",
          "Griechisch",
          "Ungarisch",
          "Rumänisch"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welche rumänische Region ist durch die Vampir-Legende um Graf Dracula weltberühmt geworden?",
        "o": [
          "Transsilvanien",
          "Moldau",
          "Walachei",
          "Dobrudscha"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Auf welcher realen historischen Figur, einem Fürsten des 15. Jahrhunderts, basiert die literarische Dracula-Figur teilweise?",
        "o": [
          "Iwan der Schreckliche",
          "Vlad III.",
          "Stephan der Große",
          "Matthias Corvinus"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Slowakei": {
    "1": [
      {
        "q": "Welche Sprache spricht man in der Slowakei?",
        "o": [
          "Tschechisch",
          "Ungarisch",
          "Slowakisch",
          "Polnisch"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Wofür ist die slowakische Landschaft rund um die Hohe Tatra besonders bekannt?",
        "o": [
          "Sanftes Hügelland ohne nennenswerte Berge",
          "Vulkanische Kraterseen",
          "Ausgedehnte Moorlandschaften",
          "Hochgebirge mit alpinem Charakter"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Wie viele mittelalterliche Burgen und Schlösser sollen sich schätzungsweise in der Slowakei befinden – eine der höchsten Burgendichten Europas?",
        "o": [
          "Über 400",
          "Etwa 100",
          "Etwa 30",
          "Über 2.000"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Slowenien": {
    "1": [
      {
        "q": "Welche Sprache spricht man in Slowenien?",
        "o": [
          "Kroatisch",
          "Slowenisch",
          "Serbisch",
          "Italienisch"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welche tropfsteinreiche Höhle Sloweniens gehört zu den meistbesuchten Schauhöhlen Europas?",
        "o": [
          "Höhle von Lascaux",
          "Blaue Grotte",
          "Postojna-Höhle",
          "Škocjan-Höhlen"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Slowenien bezeichnet sich selbst oft als \"grünes Herz Europas\" – wie viel Prozent der Landesfläche sind ungefähr bewaldet?",
        "o": [
          "Etwa 20 %",
          "Etwa 35 %",
          "Über 90 %",
          "Fast 60 %"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Spanien": {
    "1": [
      {
        "q": "Welche Sprache ist die am weitesten verbreitete Amtssprache Spaniens?",
        "o": [
          "Spanisch",
          "Katalanisch",
          "Baskisch",
          "Galicisch"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches jährliche spanische Fest in Pamplona ist berühmt (und umstritten) für das Rennen mit Stieren durch die Straßen?",
        "o": [
          "La Tomatina",
          "San Fermín",
          "Feria de Abril",
          "Semana Santa"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welcher spanische Architekt entwarf die noch immer im Bau befindliche Kirche Sagrada Família in Barcelona?",
        "o": [
          "Santiago Calatrava",
          "Rafael Moneo",
          "Antoni Gaudí",
          "Pablo Picasso"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Schweden": {
    "1": [
      {
        "q": "Welche Sprache spricht man in Schweden?",
        "o": [
          "Norwegisch",
          "Finnisch",
          "Dänisch",
          "Schwedisch"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welche schwedische Möbelhauskette mit blau-gelbem Logo ist zu einem der bekanntesten Exportgüter des Landes geworden?",
        "o": [
          "IKEA",
          "H&M",
          "Volvo",
          "Ericsson"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welcher renommierte, jährlich in Stockholm verliehene Preis geht auf das Testament eines schwedischen Erfinders zurück?",
        "o": [
          "Der Pulitzer-Preis",
          "Der Nobelpreis",
          "Der Turing Award",
          "Der Fields-Preis"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  }
};


/* js/questions_cat5.js */
pool[5] = {
  "Österreich": {
    "1": [
      {
        "q": "Wie viele Abgeordnete entsendet Österreich nach der Europawahl 2024 in das Europäische Parlament?",
        "o": [
          "18",
          "22",
          "20",
          "25"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Über welches verfassungsrechtliche Instrument verfügt das Parlament, um ein Mitglied der Bundesregierung aus dem Amt zu heben?",
        "o": [
          "Konstruktives Misstrauensvotum",
          "Rügeverfahren",
          "Impeachment-Verfahren",
          "Misstrauensvotum"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Ressort betreute der österreichische EU-Kommissar Johannes Hahn in seiner Amtszeit von 2019 bis 2024?",
        "o": [
          "Haushalt und Verwaltung",
          "Nachbarschaft und Erweiterung",
          "Regionalpolitik",
          "Handel"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Belgien": {
    "1": [
      {
        "q": "Wo befindet sich der Hauptsitz der Europäischen Kommission und des Europäischen Rates?",
        "o": [
          "Luxemburg",
          "Brüssel",
          "Straßburg",
          "Den Haag"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches politische System kennzeichnet die Aufgabenverteilung zwischen der zentralen Ebene und den Regionen bzw. Gemeinschaften des Landes?",
        "o": [
          "Staatenbund",
          "Unitarismus",
          "Föderalismus",
          "Konföderation"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche Besonderheit gilt bei Parlamentswahlen bezüglich der Stimmabgabe?",
        "o": [
          "Es gilt ein reines Mehrheitswahlrecht",
          "Mindestens die Hälfte der Abgeordneten wird gelost",
          "Wählen ist erst ab 25 Jahren erlaubt",
          "Es besteht eine gesetzliche Wahlpflicht"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Bulgarien": {
    "1": [
      {
        "q": "Wer übernimmt im politischen System die Rolle des Regierungschefs?",
        "o": [
          "Der Ministerpräsident",
          "Der Staatspräsident",
          "Der Parlamentspräsident",
          "Der Generalgouverneur"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Wann trat das Land gemeinsam mit Rumänien der Europäischen Union bei?",
        "o": [
          "2004",
          "2007",
          "2013",
          "2010"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Portefeuille leitete die bulgarische EU-Kommissarin Iliana Ivanova in der Kommission von Ursula von der Leyen ab 2023?",
        "o": [
          "Digitale Wirtschaft",
          "Transport",
          "Innovation, Forschung, Kultur, Jugend und Sport",
          "Umwelt und Ozeane"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Kroatien": {
    "1": [
      {
        "q": "Welches Land trat der Europäischen Union im Jahr 2013 als bislang letztes Mitglied bei?",
        "o": [
          "Slowenien",
          "Montenegro",
          "Serbien",
          "Kroatien"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Am 1. Januar 2023 vollzog das Land einen Doppelbeitritt zu welchen beiden europäischen Zonen?",
        "o": [
          "Eurozone und Schengen-Raum",
          "Eurozone und NATO",
          "Schengen-Raum und EWR",
          "Zolleinheit und OECD"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welchen Posten bekleidete Dubravka Šuica in der EU-Kommission ab 2019?",
        "o": [
          "Kommissarin für Binnenmarkt",
          "Vizepräsidentin für Demokratie und Demografie",
          "Kommissarin für Energie",
          "Vizepräsidentin für Werte und Transparenz"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Zypern": {
    "1": [
      {
        "q": "Wer führt in dieser Republik die Geschäfte der Exekutive als Regierungschef?",
        "o": [
          "Der Premierminister",
          "Der Kanzler",
          "Der Staatspräsident",
          "Der Sprecher des Hauses"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Wann trat die Inselrepublik der Europäischen Union bei?",
        "o": [
          "1995",
          "2013",
          "2007",
          "2004"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Was zeichnet das Regierungssystem im Vergleich zu den meisten anderen EU-Mitgliedstaaten aus?",
        "o": [
          "Es ist eine reine Präsidialrepublik",
          "Es besitzt gar kein Parlament",
          "Es ist eine konstitutionelle Monarchie",
          "Es hat ein dreikammeriges Parlament"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Tschechien": {
    "1": [
      {
        "q": "Durch welches Organ wird die Gesetzgebung auf nationaler Ebene beschlossen?",
        "o": [
          "Durch den Staatsrat",
          "Durch das Parlament",
          "Durch die Bundesversammlung",
          "Durch das Verfassungsgericht"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches Ereignis prägte die erste Führung des EU-Ratsvorsitzes durch das Land im Jahr 2009?",
        "o": [
          "Ein Beitritt zur Eurozone",
          "Der Austritt aus dem Schengen-Raum",
          "Ein Misstrauensvotum gegen die eigene Regierung",
          "Die Unterzeichnung des Vertrags von Maastricht"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche Funktion übte Věra Jourová ab 2019 in der Europäischen Kommission aus?",
        "o": [
          "Kommissarin für Landwirtschaft",
          "Hohe Vertreterin für Außenpolitik",
          "Kommissarin für Wettbewerb",
          "Vizepräsidentin für Werte und Transparenz"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Dänemark": {
    "1": [
      {
        "q": "Welche Staatsform liegt in diesem nordischen Mitgliedstaat vor?",
        "o": [
          "Konstitutionelle Monarchie",
          "Parlamentarische Republik",
          "Präsidialrepublik",
          "Sozialistische Republik"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welchen Sonderstatus vereinbarte das Land 1992 im Vertrag von Maastricht bezüglich der gemeinsamen Währung?",
        "o": [
          "Verpflichtung zum Euro-Beitritt bis 2000",
          "Eine formelle Befreiungsklausel vom Euro",
          "Nutzung des US-Dollars als Übergangswährung",
          "Verbot jeglichen Währungsumtausches"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche Beistandsklausel der EU stimmte die Bevölkerung im Juni 2022 per Volksentscheid zu beizutreten?",
        "o": [
          "Währungsunion",
          "Steuerharmonisierung",
          "Gemeinsame Sicherheits- und Verteidigungspolitik",
          "Gesundheitspolitische Koordinierung"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Estland": {
    "1": [
      {
        "q": "Welches Verfahren nutzt das Land seit Jahren flächendeckend bei nationalen Wahlen?",
        "o": [
          "Briefwahl als einziger Weg",
          "Reine Pflichtwahl im Wahllokal",
          "Stimmabgabe per SMS",
          "Elektronische Stimmabgabe über das Internet"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welchem Jahr wurde das Land Mitglied der Europäischen Union?",
        "o": [
          "2004",
          "1995",
          "2007",
          "2011"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Ressort leitete Kadri Simson in der EU-Kommission ab 2019?",
        "o": [
          "Transport",
          "Energie",
          "Umwelt",
          "Justiz"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Finnland": {
    "1": [
      {
        "q": "Wie wird das Staatsoberhaupt in diesem Land bestimmt?",
        "o": [
          "Ernennung durch die EU",
          "Erblicher Monarch",
          "Direktwahl durch das Volk",
          "Wahl durch den Senat"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches außen- und sicherheitspolitische Prinzip gab das Land 2023 mit dem Beitritt zur NATO auf?",
        "o": [
          "Den Isolationismus",
          "Die nukleare Teilhabe",
          "Den Pazifismus",
          "Die militärische Bündnisfreiheit"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Verfassungsorgan besitzt die primäre Verfassungskontrolle von Gesetzesentwürfen noch vor deren Verabschiedung?",
        "o": [
          "Ein Verfassungsausschuss im Parlament",
          "Ein eigenständiges Verfassungsgericht",
          "Der Oberste Gerichtshof allein",
          "Der Europäische Gerichtshof"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Frankreich": {
    "1": [
      {
        "q": "Wie heißt die Bauweise des Regierungssystems, in dem sich Präsident und Premierminister die Exekutivmacht teilen?",
        "o": [
          "Parlamentarische Monarchie",
          "Semipräsidielles System",
          "Direktordemokratie",
          "Ständestaat"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher EU-Vertrag wurde 1957 mit unterzeichnet und gilt als ein Grundstein der heutigen EU?",
        "o": [
          "Vertrag von Lissabon",
          "Vertrag von Nizza",
          "Römische Verträge",
          "Vertrag von Amsterdam"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Gremium bildet zusammen mit der Nationalversammlung das nationale Parlament?",
        "o": [
          "Das Bundesrat-Äquivalent",
          "Der Volksrat",
          "Die Abgeordnetenkammer",
          "Der Senat"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Deutschland": {
    "1": [
      {
        "q": "Welches Organ vertritt die 16 Bundesländer bei der Gesetzgebung des Bundes?",
        "o": [
          "Der Bundesrat",
          "Der Bundestag",
          "Die Bundesversammlung",
          "Das Kanzleramt"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Wie viele Abgeordnete stellt der Mitgliedstaat seit der Europawahl 2024 maximal im Europäischen Parlament?",
        "o": [
          "705",
          "96",
          "81",
          "120"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche Hürde muss eine Partei bei der Sperrklausel überwinden, um über Listenmandate in das nationale Parlament einzuziehen?",
        "o": [
          "3 Prozent",
          "10 Prozent",
          "5 Prozent",
          "2 Prozent"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Griechenland": {
    "1": [
      {
        "q": "Welche Staatsform hat das Land seit der Abschaffung der Monarchie per Volksentscheid im Jahr 1974?",
        "o": [
          "Präsidialrepublik",
          "Sozialistische Republik",
          "Konstitutionelle Monarchie",
          "Parlamentarische Republik"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Beitrittswelle ordnet man das Land historisch zu, als es 1981 der Europäischen Gemeinschaft beitrat?",
        "o": [
          "Die Norderweiterung bzw. Süderweiterung",
          "Die Gründerstaaten",
          "Die Osterweiterung",
          "Die EFTA-Erweiterung"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Ressort verantwortete Margaritis Schinas als Vizepräsident der EU-Kommission ab 2019?",
        "o": [
          "Handel",
          "Förderung unseres europäischen Lebensstils",
          "Binnenmarkt",
          "Landwirtschaft"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Ungarn": {
    "1": [
      {
        "q": "Welches Vertretungsorgan übt die legislative Gewalt auf nationaler Ebene aus?",
        "o": [
          "Ein Zweikammersystem",
          "Ein Föderalrat",
          "Ein Einkammerparlament",
          "Ein Staatsgerichtshof"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Vertrag regelte 2004 den EU-Beitritt des Landes?",
        "o": [
          "Der Vertrag von Maastricht",
          "Der Vertrag von Rom",
          "Die Akte von Helsinki",
          "Der Beitrittsvertrag 2003"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welchen Posten bekleidete Olivér Várhelyi in der Europarechtlichen Exekutive ab 2019?",
        "o": [
          "Kommissar für Nachbarschaft und Erweiterung",
          "Kommissar für Justiz",
          "Kommissar für Finanzen",
          "Kommissar für Verkehr"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Irland": {
    "1": [
      {
        "q": "Welches Wahlsystem wird bei der Bestimmung der Abgeordneten des nationalen Parlaments angewendet?",
        "o": [
          "Reines Mehrheitswahlrecht",
          "Übertragbare Einzelstimme",
          "Reine starre Parteiliste",
          "Mehrheitswahl mit Kooptation"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welchem Abkommen verdankt das Land seit 1998 den Frieden im Norden der Insel, was auch bei EU-Verhandlungen zentral war?",
        "o": [
          "Vertrag von Nizza",
          "Vertrag von Schengen",
          "Karfreitagsabkommen",
          "Abkommen von Schengen-Ost"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Verfahren erfordert die Verfassung zwingend bei Übertragungen von Hoheitsrechten an die EU?",
        "o": [
          "Eine einfache Parlamentsentscheidung",
          "Einen Erlass des Präsidenten",
          "Die Zustimmung aller Bezirke",
          "Ein verbindliches Referendum"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Italien": {
    "1": [
      {
        "q": "Aus wie vielen gleichberechtigten Kammern besteht das nationale Parlament bei der Gesetzgebung?",
        "o": [
          "Aus zwei Kammern",
          "Aus einer Kammer",
          "Aus drei Kammern",
          "Aus vier Kammern"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Politiker amtierte von 2019 bis 2024 als Präsident des Europäischen Parlaments?",
        "o": [
          "Antonio Tajani",
          "David Sassoli",
          "Mario Draghi",
          "Roberto Gualtieri"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches verfassungsrechtliche Mittel erlaubt es Bürgern, bestehende Gesetze per Abstimmung aufzuheben?",
        "o": [
          "Konstruktiver Einspruch",
          "Gesetzesinitiativrecht",
          "Abrogatives Referendum",
          "Verfassungsbeschwerde"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Lettland": {
    "1": [
      {
        "q": "Wer wählt das Staatsoberhaupt im nationalen System?",
        "o": [
          "Die Bevölkerung in Direktwahl",
          "Die Kommunalräte",
          "Der Richterrat",
          "Das Parlament"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welchem Jahr führte das Land den Euro als offizielle Währung ein?",
        "o": [
          "2014",
          "2004",
          "2007",
          "2020"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welche Schlüsselrolle bekleidete Valdis Dombrovskis in der EU-Kommission ab 2019?",
        "o": [
          "Kommissar für Umwelt",
          "Exekutiv-Vizepräsident für eine Wirtschaft im Dienste der Menschen",
          "Kommissar für Energie",
          "Hoher Vertreter der Union"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Litauen": {
    "1": [
      {
        "q": "Welche Regierungsform charakterisiert die Gewaltenteilung zwischen Exekutive und Legislative?",
        "o": [
          "Reine Monarchie",
          "Absolute Kanzlerdemokratie",
          "Semipräsidielles System",
          "Parlamentslose Diktatur"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welchem Jahr trat das Land der Eurozone bei?",
        "o": [
          "2004",
          "2018",
          "2010",
          "2015"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Ressort verantwortete Virginijus Sinkevičius in der EU-Kommission ab 2019?",
        "o": [
          "Umwelt, Ozeane und Fischerei",
          "Landwirtschaft",
          "Binnenmarkt",
          "Forschung und Innovation"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Luxemburg": {
    "1": [
      {
        "q": "Welche weltweit einmalige Staatsform besitzt dieses Gründerland der EU?",
        "o": [
          "Herzogtum",
          "Großherzogtum",
          "Fürstentum",
          "Kaiserreich"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches europäische Abkommen zur Abschaffung von Grenzkontrollen wurde nach einem Ort in diesem Land benannt?",
        "o": [
          "Vertrag von Maastricht",
          "Lissabon-Strategie",
          "Schengener Abkommen",
          "Brüsseler Pakt"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches wichtige Organ der Europäischen Union hat seinen Hauptsitz in der Hauptstadt dieses Landes?",
        "o": [
          "Europäische Zentralbank",
          "Europäische Umweltagentur",
          "Europäisches Parlament",
          "Europäischer Gerichtshof"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Malta": {
    "1": [
      {
        "q": "Wie viele Abgeordnete entsendet der kleinststaatliche Mitgliedstaat gesetzlich garantiert mindestens ins Europäische Parlament?",
        "o": [
          "6",
          "3",
          "9",
          "12"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Staatengemeinschaft gehört das Land neben der EU aufgrund seiner historischen Entwicklung an?",
        "o": [
          "EFTA",
          "Commonwealth of Nations",
          "Benelux",
          "Nordischer Rat"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Mandat übernahm Helena Dalli in der Europäischen Kommission ab 2019?",
        "o": [
          "Verkehr",
          "Gesundheit",
          "Gleichheit",
          "Finanzen"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Niederlande": {
    "1": [
      {
        "q": "Welche Staatsform liegt im Mutterland dieses westeuropäischen Staates vor?",
        "o": [
          "Präsidialrepublik",
          "Bundesrepublik",
          "Räterepublik",
          "Konstitutionelle Monarchie"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welcher Stadt wurden 1992 die Verträge zur Gründung der Europäischen Union unterzeichnet?",
        "o": [
          "Maastricht",
          "Amsterdam",
          "Utrecht",
          "Rotterdam"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welchen Posten hatte Frans Timmermans bis 2023 in der Kommission von Ursula von der Leyen inne?",
        "o": [
          "Kommissar für Wettbewerb",
          "Exekutiv-Vizepräsident für den Europäischen Grünen Deal",
          "Kommissar für Haushalt",
          "Hoher Vertreter der Außenpolitik"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Polen": {
    "1": [
      {
        "q": "Aus wie vielen Abgeordneten setzt sich die erste Kammer des Parlaments (Sejm) zusammen?",
        "o": [
          "100",
          "705",
          "460",
          "200"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welchem Jahr wurde das Land Mitglied der Europäischen Union?",
        "o": [
          "1999",
          "2010",
          "2007",
          "2004"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Organ wacht über die Vereinbarkeit von nationalen Gesetzen mit der Verfassung?",
        "o": [
          "Das Verfassungsgericht",
          "Der Oberste Rechnungshof",
          "Der Staatsrat",
          "Der Staatsgerichtshof"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Portugal": {
    "1": [
      {
        "q": "Wie wird die Position des Staatsoberhaupts besetzt?",
        "o": [
          "Erbschaft",
          "Direktwahl durch das Volk",
          "Wahl durch die Kommunen",
          "Ernennung durch die EU"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Vertrag zur Verfassungsreform der EU wurde 2007 unter der Ratspräsidentschaft dieses Landes unterzeichnet?",
        "o": [
          "Vertrag von Nizza",
          "Vertrag von Amsterdam",
          "Vertrag von Lissabon",
          "Vertrag von Rom"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Ressort leitete Elisa Ferreira in der EU-Kommission ab 2019?",
        "o": [
          "Landwirtschaft",
          "Wettbewerb",
          "Innovation",
          "Kohäsion und Reformen"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Rumänien": {
    "1": [
      {
        "q": "Wer steht an der Spitze der Regierung Exekutive?",
        "o": [
          "Der Ministerpräsident",
          "Der Staatspräsident",
          "Der Parlamentssprecher",
          "Der Kanzler"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Beitrittszone trat das Land im März 2024 für den Luft- und Seeverkehr bei?",
        "o": [
          "Eurozone",
          "Schengen-Raum",
          "EWR",
          "OECD"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Amt bekleidete Adina Vălean in der Europäischen Kommission von 2019 bis 2024?",
        "o": [
          "Umwelt",
          "Bildung",
          "Verkehr",
          "Energie"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  },
  "Slowakei": {
    "1": [
      {
        "q": "Welche Staatsform weist das Land seit der Unabhängigkeit 1993 auf?",
        "o": [
          "Monarchie",
          "Ständestaat",
          "Diktatur",
          "Parlamentarische Republik"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "In welchem Jahr führte das Land den Euro als Landeswährung ein?",
        "o": [
          "2009",
          "2004",
          "2015",
          "2021"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welchen Exekutivposten besetzte Maroš Šefčovič in der EU-Kommission ab 2019?",
        "o": [
          "Binnenmarkt",
          "Vizepräsident für interinstitutionelle Beziehungen und vorausschauende Strukturplanung",
          "Justiz",
          "Landwirtschaft"
        ],
        "a": 1,
        "exp": ""
      }
    ]
  },
  "Slowenien": {
    "1": [
      {
        "q": "Wann wurde das Land im Zuge der großen Erweiterung Teil der Europäischen Union?",
        "o": [
          "1995",
          "2007",
          "2004",
          "2013"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welches Währungsgebiet löste den Tolar im Jahr 2007 als Zahlungsmittel ab?",
        "o": [
          "Schweizer Franken",
          "Britisches Pfund",
          "D-Mark",
          "Eurozone"
        ],
        "a": 3,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Ressort leitete Janez Lenarčič in der EU-Kommission ab 2019?",
        "o": [
          "Krisenmanagement",
          "Regionalpolitik",
          "Handel",
          "Steuern und Zollunion"
        ],
        "a": 0,
        "exp": ""
      }
    ]
  },
  "Spanien": {
    "1": [
      {
        "q": "Welche Regierungsform kennzeichnet die konstitutionelle Struktur des Landes?",
        "o": [
          "Präsidialrepublik",
          "Parlamentarische Monarchie",
          "Sozialistische Republik",
          "Fürstentum"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Welcher Beitrittswelle schloss sich das Land im Jahr 1986 gemeinsam mit Portugal an?",
        "o": [
          "Gründungsmitglieder",
          "Osterweiterung",
          "Süderweiterung",
          "Skandinavien-Erweiterung"
        ],
        "a": 2,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Wie bezeichnet man die administrative Gliederung der 17 Regionen mit eigener Gesetzgebungs- und Exekutivkompetenz?",
        "o": [
          "Kantone",
          "Departmente",
          "Bundesländer",
          "Autonome Gemeinschaften"
        ],
        "a": 3,
        "exp": ""
      }
    ]
  },
  "Schweden": {
    "1": [
      {
        "q": "Welches staatliche Oberhaupt hat formell repräsentative Aufgaben in dieser Nordischen Monarchie?",
        "o": [
          "Der König",
          "Der Bundespräsident",
          "Der Großherzog",
          "Der Staatsrat"
        ],
        "a": 0,
        "exp": ""
      }
    ],
    "2": [
      {
        "q": "Warum gehört das Land nicht der Eurozone an, obwohl es EU-Mitglied ist?",
        "o": [
          "Es hat ein offizielles Opt-out wie Dänemark",
          "Ein Volksentscheid lehnte die Einführung 2003 ab",
          "Es erfüllt die Konvergenzkriterien nicht",
          "Die EU hat den Beitritt verweigert"
        ],
        "a": 1,
        "exp": ""
      }
    ],
    "3": [
      {
        "q": "Welches Ressort führte Ylva Johansson in der Europäischen Kommission ab 2019?",
        "o": [
          "Digitales",
          "Wettbewerb",
          "Inneres",
          "Fischerei"
        ],
        "a": 2,
        "exp": ""
      }
    ]
  }
};

