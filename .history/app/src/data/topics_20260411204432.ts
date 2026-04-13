export interface TopicTableRow {
  label: { de: string; en: string };
  value: { de: string; en: string };
  image?: string;
}

export interface TopicKeyFact {
  fact: { de: string; en: string };
}

export interface TopicDetails {
  intro?: { de: string; en: string };
  image?: {
    src: string;
    alt: { de: string; en: string };
    caption?: { de: string; en: string };
  };
  table?: {
    title: { de: string; en: string };
    rows: TopicTableRow[];
  };
  keyFacts?: {
    title: { de: string; en: string };
    items: TopicKeyFact[];
  };
}

export interface Topic {
  id: string;
  category: string;
  title: { de: string; en: string };
  description: { de: string; en: string };
  illustration: string;
  relatedQuestionNumbers: number[];
  details?: TopicDetails;
}

export interface TopicCategory {
  id: string;
  title: { de: string; en: string };
  icon: string;
}

export const topicCategories: TopicCategory[] = [
  {
    id: "grundlagen",
    title: { de: "Grundlagen", en: "Basics" },
    icon: "🏛️",
  },
  {
    id: "staatsstruktur",
    title: { de: "Staatsstruktur", en: "State Structure" },
    icon: "⚖️",
  },
  {
    id: "rechte",
    title: { de: "Rechte & Freiheiten", en: "Rights & Freedoms" },
    icon: "🗽",
  },
  {
    id: "politik",
    title: { de: "Politik", en: "Politics" },
    icon: "🗳️",
  },
  {
    id: "gesellschaft",
    title: { de: "Gesellschaft", en: "Society" },
    icon: "🤝",
  },
  {
    id: "geschichte",
    title: { de: "Geschichte", en: "History" },
    icon: "📜",
  },
];

export const topics: Topic[] = [
  // === Grundlagen ===
  {
    id: "abgeordnete",
    category: "grundlagen",
    title: { de: "Abgeordnete", en: "Representatives" },
    description: {
      de: "In Deutschland nennt man die gewählten Mitglieder des Parlaments (z.\u00A0B. des Bundestages) Abgeordnete. Sie vertreten die Interessen der Bürgerinnen und Bürger im Parlament.",
      en: "In Germany, elected members of parliament (e.g., the Bundestag) are called representatives. They represent the interests of the citizens in parliament.",
    },
    illustration: "🧑‍⚖️",
    relatedQuestionNumbers: [12, 13, 28, 44, 57, 85, 89, 98, 128, 232],
    details: {
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Abgeordnete werden vom Volk gewählt", en: "Representatives are elected by the people" } },
          { fact: { de: "Sie vertreten die Interessen der Bürger im Parlament", en: "They represent citizens' interests in parliament" } },
          { fact: { de: "Sie sind an Aufträge und Weisungen nicht gebunden (freies Mandat)", en: "They are not bound by instructions (free mandate)" } },
          { fact: { de: "Abgeordnete genießen Immunität", en: "Representatives enjoy immunity" } },
        ],
      },
    },
  },
  {
    id: "bundestag",
    category: "grundlagen",
    title: { de: "Bundestag", en: "Bundestag" },
    description: {
      de: "Der Deutsche Bundestag ist das Parlament der Bundesrepublik Deutschland. Er wird von den Bürgerinnen und Bürgern gewählt und ist für die Gesetzgebung sowie die Kontrolle der Regierung zuständig.",
      en: "The German Bundestag is the parliament of the Federal Republic of Germany. It is elected by the citizens and is responsible for legislation and oversight of the government.",
    },
    illustration: "🏛️",
    relatedQuestionNumbers: [
      12, 28, 44, 52, 55, 57, 58, 60, 62, 65, 71, 73, 74, 81, 82, 83, 85,
      87, 88, 90, 91, 93, 94, 98, 103, 107, 108, 109, 110, 116, 117, 121,
      123, 124, 129, 130, 133, 216,
    ],
    details: {
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Sitz: Reichstagsgebäude in Berlin", en: "Seat: Reichstag building in Berlin" } },
          { fact: { de: "Mindestens 598 Abgeordnete (+ Überhangmandate)", en: "At least 598 members (+ overhang seats)" } },
          { fact: { de: "Wahl alle 4 Jahre", en: "Election every 4 years" } },
          { fact: { de: "Beschließt Gesetze und wählt den Bundeskanzler", en: "Passes laws and elects the Federal Chancellor" } },
          { fact: { de: "Kontrolliert die Bundesregierung", en: "Controls the federal government" } },
        ],
      },
    },
  },
  {
    id: "bundestagswahl",
    category: "grundlagen",
    title: { de: "Bundestagswahl", en: "Federal Election" },
    description: {
      de: "Bei der Bundestagswahl hat jeder Wähler zwei Stimmen: Erststimme (Mehrheitswahl) – Man wählt einen Kandidaten. Zweitstimme (Verhältniswahl) – Man wählt eine Partei.",
      en: "In federal elections, each voter has two votes: First vote (first-past-the-post) – You choose a candidate. Second vote (proportional representation) – You choose a party.",
    },
    illustration: "🗳️",
    relatedQuestionNumbers: [5, 15, 28, 62, 93, 94, 105, 108, 109, 112, 113, 114, 115, 116, 119, 120, 122, 124, 125, 126, 127, 130, 133],
    details: {
      intro: {
        de: "Bei der Bundestagswahl hat jeder Wähler zwei Stimmen. Mit der Erststimme (links auf dem Stimmzettel) wählt man einen Kandidaten direkt. Mit der Zweitstimme (rechts) wählt man eine Partei.",
        en: "In a federal election, each voter has two votes. With the first vote (left side of the ballot) you directly choose a candidate. With the second vote (right side) you choose a party.",
      },
      image: {
        src: "/images/topics/stimmzettel.svg",
        alt: {
          de: "Stimmzettel einer Bundestagswahl mit Erststimme und Zweitstimme",
          en: "Ballot paper for a federal election with first and second vote",
        },
        caption: {
          de: "Stimmzettel einer Bundestagswahl: Links Erststimme, rechts Zweitstimme",
          en: "Ballot paper for a federal election: First vote on left, second vote on right",
        },
      },
      table: {
        title: { de: "Die zwei Stimmen", en: "The Two Votes" },
        rows: [
          { label: { de: "Erststimme", en: "First vote" }, value: { de: "Mehrheitswahl \u2013 Man wählt einen Kandidaten (Direktmandat)", en: "First-past-the-post \u2013 You choose a candidate (direct mandate)" } },
          { label: { de: "Zweitstimme", en: "Second vote" }, value: { de: "Verhältniswahl \u2013 Man wählt eine Partei", en: "Proportional representation \u2013 You choose a party" } },
        ],
      },
      keyFacts: {
        title: { de: "Wahlgrundsätze & Wahlrechtsreform 2023", en: "Electoral Principles & Electoral Reform 2023" },
        items: [
          { fact: { de: "Allgemein: Alle Staatsbürger dürfen wählen", en: "Universal: All citizens may vote" } },
          { fact: { de: "Unmittelbar: Direkte Wahl ohne Zwischeninstanz", en: "Direct: Direct election without intermediaries" } },
          { fact: { de: "Frei: Keine Beeinflussung oder Zwang", en: "Free: No coercion or pressure" } },
          { fact: { de: "Gleich: Jede Stimme zählt gleich", en: "Equal: Every vote counts equally" } },
          { fact: { de: "Geheim: Niemand sieht, was man wählt", en: "Secret: No one can see your vote" } },
          { fact: { de: "Seit 2023 ist der Bundestag auf maximal 630 Sitze begrenzt", en: "Since 2023, the Bundestag has been limited to a maximum of 630 seats" } },
          { fact: { de: "Ein Kandidat gewinnt nur, wenn seine Partei genug Zweitstimmen hat", en: "A candidate only wins if their party has enough second votes" } },
        ],
      },
    },
  },
  {
    id: "bundeskanzler",
    category: "grundlagen",
    title: { de: "Bundeskanzler/in", en: "Federal Chancellor" },
    description: {
      de: "Der Bundeskanzler oder die Bundeskanzlerin ist der Regierungschef der Bundesrepublik Deutschland. Er/Sie wird vom Bundestag gewählt und bestimmt die Richtlinien der Politik.",
      en: "The Federal Chancellor is the head of government of the Federal Republic of Germany. They are elected by the Bundestag and determine the guidelines of policy.",
    },
    illustration: "👔",
    relatedQuestionNumbers: [55, 57, 65, 70, 71, 72, 81, 82, 83, 87, 124, 129, 153, 165, 180, 235],
    details: {
      intro: {
        de: "Der erste Bundeskanzler der Bundesrepublik Deutschland war Konrad Adenauer.",
        en: "The first Chancellor of the Federal Republic of Germany was Konrad Adenauer.",
      },
      table: {
        title: { de: "Übersicht", en: "Overview" },
        rows: [
          { label: { de: "1949–1963", en: "1949–1963" }, value: { de: "Konrad Adenauer", en: "Konrad Adenauer" }, image: "/images/chancellors/adenauer.jpg" },
          { label: { de: "1963–1966", en: "1963–1966" }, value: { de: "Ludwig Erhard", en: "Ludwig Erhard" }, image: "/images/chancellors/erhard.jpg" },
          { label: { de: "1966–1969", en: "1966–1969" }, value: { de: "Georg Kiesinger", en: "Georg Kiesinger" }, image: "/images/chancellors/kiesinger.jpg" },
          { label: { de: "1969–1974", en: "1969–1974" }, value: { de: "Willy Brandt", en: "Willy Brandt" }, image: "/images/chancellors/brandt.jpg" },
          { label: { de: "1974–1982", en: "1974–1982" }, value: { de: "Helmut Schmidt", en: "Helmut Schmidt" }, image: "/images/chancellors/schmidt.jpg" },
          { label: { de: "1982–1998", en: "1982–1998" }, value: { de: "Helmut Kohl", en: "Helmut Kohl" }, image: "/images/chancellors/kohl.jpg" },
          { label: { de: "1998–2005", en: "1998–2005" }, value: { de: "Gerhard Schröder", en: "Gerhard Schröder" }, image: "/images/chancellors/schroeder.jpg" },
          { label: { de: "2005–2021", en: "2005–2021" }, value: { de: "Angela Merkel", en: "Angela Merkel" }, image: "/images/chancellors/merkel.jpg" },
          { label: { de: "2021–2025", en: "2021–2025" }, value: { de: "Olaf Scholz", en: "Olaf Scholz" }, image: "/images/chancellors/scholz.jpg" },
          { label: { de: "Seit 2025", en: "Since 2025" }, value: { de: "Friedrich Merz", en: "Friedrich Merz" }, image: "/images/chancellors/merz.jpg" },
        ],
      },
    },
  },
  {
    id: "bundespraesident",
    category: "grundlagen",
    title: { de: "Bundespräsident/in", en: "Federal President" },
    description: {
      de: "Der Bundespräsident oder die Bundespräsidentin ist das Staatsoberhaupt der Bundesrepublik Deutschland. Er/Sie repräsentiert den Staat nach innen und außen.",
      en: "The Federal President is the head of state of the Federal Republic of Germany. They represent the state domestically and internationally.",
    },
    illustration: "🎖️",
    relatedQuestionNumbers: [44, 48, 58, 70, 71, 82, 84, 86, 87, 98, 124, 126, 129],
    details: {
      intro: {
        de: "Der Bundespräsident wird von der Bundesversammlung für 5 Jahre gewählt. Höchstens zwei Amtszeiten sind möglich.",
        en: "The Federal President is elected by the Federal Assembly for 5 years. A maximum of two terms is possible.",
      },
      table: {
        title: { de: "Übersicht", en: "Overview" },
        rows: [
          { label: { de: "1949–1959", en: "1949–1959" }, value: { de: "Theodor Heuss", en: "Theodor Heuss" }, image: "/images/presidents/heuss.jpg" },
          { label: { de: "1959–1969", en: "1959–1969" }, value: { de: "Heinrich Lübke", en: "Heinrich Lübke" }, image: "/images/presidents/luebke.jpg" },
          { label: { de: "1969–1974", en: "1969–1974" }, value: { de: "Gustav Heinemann", en: "Gustav Heinemann" }, image: "/images/presidents/heinemann.jpg" },
          { label: { de: "1974–1979", en: "1974–1979" }, value: { de: "Walter Scheel", en: "Walter Scheel" }, image: "/images/presidents/scheel.jpg" },
          { label: { de: "1979–1984", en: "1979–1984" }, value: { de: "Karl Carstens", en: "Karl Carstens" }, image: "/images/presidents/carstens.jpg" },
          { label: { de: "1984–1994", en: "1984–1994" }, value: { de: "Richard von Weizsäcker", en: "Richard von Weizsäcker" }, image: "/images/presidents/weizsaecker.jpg" },
          { label: { de: "1994–1999", en: "1994–1999" }, value: { de: "Roman Herzog", en: "Roman Herzog" }, image: "/images/presidents/herzog.jpg" },
          { label: { de: "1999–2004", en: "1999–2004" }, value: { de: "Johannes Rau", en: "Johannes Rau" }, image: "/images/presidents/rau.jpg" },
          { label: { de: "2004–2010", en: "2004–2010" }, value: { de: "Horst Köhler", en: "Horst Köhler" }, image: "/images/presidents/koehler.jpg" },
          { label: { de: "2010–2012", en: "2010–2012" }, value: { de: "Christian Wulff", en: "Christian Wulff" }, image: "/images/presidents/wulff.jpg" },
          { label: { de: "2012–2017", en: "2012–2017" }, value: { de: "Joachim Gauck", en: "Joachim Gauck" }, image: "/images/presidents/gauck.jpg" },
          { label: { de: "Seit 2017", en: "Since 2017" }, value: { de: "Frank-Walter Steinmeier", en: "Frank-Walter Steinmeier" }, image: "/images/presidents/steinmeier.jpg" },
        ],
      },
    },
  },
  {
    id: "bundesrat",
    category: "grundlagen",
    title: { de: "Bundesrat", en: "Federal Council" },
    description: {
      de: "Der Bundesrat vertritt die Interessen der 16 Bundesländer auf Bundesebene. Über den Bundesrat wirken die Länder bei der Gesetzgebung des Bundes mit.",
      en: "The Federal Council represents the interests of the 16 federal states at the national level. Through the Federal Council, the states participate in federal legislation.",
    },
    illustration: "🏢",
    relatedQuestionNumbers: [12, 48, 55, 58, 60, 81, 82, 85, 86, 87, 88, 90, 91, 123],
    details: {
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Vertretung der 16 Bundesländer auf Bundesebene", en: "Representation of the 16 federal states at the national level" } },
          { fact: { de: "Mitglieder sind Vertreter der Landesregierungen", en: "Members are representatives of state governments" } },
          { fact: { de: "Wirkt bei der Gesetzgebung des Bundes mit", en: "Participates in federal legislation" } },
          { fact: { de: "Sitz: Berlin", en: "Seat: Berlin" } },
          { fact: { de: "Vorsitz wechselt jährlich zwischen den Bundesländern", en: "Presidency rotates annually among the federal states" } },
        ],
      },
    },
  },

  // === Staatsstruktur ===
  {
    id: "grundgesetz",
    category: "staatsstruktur",
    title: { de: "Grundgesetz", en: "Basic Law (Constitution)" },
    description: {
      de: "Das Grundgesetz ist die Verfassung der Bundesrepublik Deutschland. Es wurde 1949 verabschiedet und enthält die Grundrechte sowie die Grundordnung des Staates.",
      en: "The Basic Law is the constitution of the Federal Republic of Germany. It was adopted in 1949 and contains fundamental rights as well as the basic structure of the state.",
    },
    illustration: "📜",
    relatedQuestionNumbers: [6, 7, 8, 10, 11, 15, 18, 68, 80, 220, 288],
    details: {
      intro: {
        de: "Das Grundgesetz wurde am 23. Mai 1949 verkündet. Es ist die Verfassung der Bundesrepublik Deutschland.",
        en: "The Basic Law was promulgated on May 23, 1949. It is the constitution of the Federal Republic of Germany.",
      },
      keyFacts: {
        title: { de: "Wichtige Artikel", en: "Key Articles" },
        items: [
          { fact: { de: "Art. 1: Die Würde des Menschen ist unantastbar", en: "Art. 1: Human dignity shall be inviolable" } },
          { fact: { de: "Art. 2: Freie Entfaltung der Persönlichkeit", en: "Art. 2: Free development of personality" } },
          { fact: { de: "Art. 3: Gleichheit vor dem Gesetz", en: "Art. 3: Equality before the law" } },
          { fact: { de: "Art. 4: Glaubens- und Gewissensfreiheit", en: "Art. 4: Freedom of faith and conscience" } },
          { fact: { de: "Art. 5: Meinungs- und Pressefreiheit", en: "Art. 5: Freedom of expression and the press" } },
          { fact: { de: "Art. 8: Versammlungsfreiheit", en: "Art. 8: Freedom of assembly" } },
          { fact: { de: "Art. 20: Demokratie, Sozialstaat, Föderalismus", en: "Art. 20: Democracy, social state, federalism" } },
        ],
      },
    },
  },
  {
    id: "grundrechte",
    category: "staatsstruktur",
    title: { de: "Grundrechte", en: "Fundamental Rights" },
    description: {
      de: "Die Grundrechte stehen im Grundgesetz (Artikel 1–19). Sie schützen die Freiheit und Würde jedes Menschen und sind für den Staat bindend.",
      en: "Fundamental rights are enshrined in the Basic Law (Articles 1–19). They protect the freedom and dignity of every person and are binding on the state.",
    },
    illustration: "🛡️",
    relatedQuestionNumbers: [4, 7, 8, 9, 12, 14, 16, 17, 18],
    details: {
      keyFacts: {
        title: { de: "Die wichtigsten Grundrechte", en: "The Most Important Fundamental Rights" },
        items: [
          { fact: { de: "Menschenwürde (Art. 1)", en: "Human dignity (Art. 1)" } },
          { fact: { de: "Persönliche Freiheit (Art. 2)", en: "Personal freedom (Art. 2)" } },
          { fact: { de: "Gleichheit vor dem Gesetz (Art. 3)", en: "Equality before the law (Art. 3)" } },
          { fact: { de: "Religionsfreiheit (Art. 4)", en: "Freedom of religion (Art. 4)" } },
          { fact: { de: "Meinungsfreiheit (Art. 5)", en: "Freedom of expression (Art. 5)" } },
          { fact: { de: "Versammlungsfreiheit (Art. 8)", en: "Freedom of assembly (Art. 8)" } },
          { fact: { de: "Vereinigungsfreiheit (Art. 9)", en: "Freedom of association (Art. 9)" } },
          { fact: { de: "Brief- und Postgeheimnis (Art. 10)", en: "Privacy of correspondence (Art. 10)" } },
        ],
      },
    },
  },
  {
    id: "demokratie",
    category: "staatsstruktur",
    title: { de: "Demokratie", en: "Democracy" },
    description: {
      de: "Deutschland ist eine parlamentarische Demokratie. Das bedeutet: Alle Staatsgewalt geht vom Volke aus. Die Bürger wählen ihre Vertreter in freien Wahlen.",
      en: "Germany is a parliamentary democracy. This means: All state authority emanates from the people. Citizens elect their representatives in free elections.",
    },
    illustration: "🏛️",
    relatedQuestionNumbers: [30, 34, 41, 52, 61, 125, 158, 161, 196],    details: {
      keyFacts: {
        title: { de: "Merkmale der Demokratie", en: "Features of Democracy" },
        items: [
          { fact: { de: "Alle Staatsgewalt geht vom Volke aus (Art. 20 GG)", en: "All state authority emanates from the people (Art. 20 GG)" } },
          { fact: { de: "Freie, gleiche und geheime Wahlen", en: "Free, equal, and secret elections" } },
          { fact: { de: "Mehrparteiensystem", en: "Multi-party system" } },
          { fact: { de: "Meinungs-, Presse- und Versammlungsfreiheit", en: "Freedom of opinion, press, and assembly" } },
          { fact: { de: "Unabhängige Gerichte", en: "Independent courts" } },
        ],
      },
    },  },
  {
    id: "rechtsstaat",
    category: "staatsstruktur",
    title: { de: "Rechtsstaat", en: "Rule of Law" },
    description: {
      de: "Deutschland ist ein Rechtsstaat. Das bedeutet, dass alle Einwohner und der Staat sich an die Gesetze halten müssen. Die Gerichte sind unabhängig.",
      en: "Germany is a state governed by the rule of law. This means that all residents and the state must abide by the law. The courts are independent.",
    },
    illustration: "⚖️",
    relatedQuestionNumbers: [3, 20, 34, 51, 53],
    details: {
      keyFacts: {
        title: { de: "Merkmale des Rechtsstaats", en: "Features of the Rule of Law" },
        items: [
          { fact: { de: "Alle müssen sich an die Gesetze halten – auch der Staat", en: "Everyone must follow the law – including the state" } },
          { fact: { de: "Unabhängige Gerichte", en: "Independent courts" } },
          { fact: { de: "Schutz der Grundrechte", en: "Protection of fundamental rights" } },
          { fact: { de: "Gewaltenteilung", en: "Separation of powers" } },
        ],
      },
    },
  },
  {
    id: "gewaltenteilung",
    category: "staatsstruktur",
    title: { de: "Gewaltenteilung", en: "Separation of Powers" },
    description: {
      de: "Die Staatsgewalt in Deutschland ist in drei Bereiche aufgeteilt: Legislative (gesetzgebende Gewalt), Exekutive (ausführende Gewalt) und Judikative (rechtsprechende Gewalt).",
      en: "State power in Germany is divided into three branches: Legislative (lawmaking), Executive (enforcement), and Judiciary (administration of justice).",
    },
    illustration: "🔱",
    relatedQuestionNumbers: [54, 60, 63, 143, 145],
    details: {
      table: {
        title: { de: "Die drei Gewalten", en: "The Three Branches" },
        rows: [
          { label: { de: "Legislative", en: "Legislative" }, value: { de: "Gesetzgebung (Bundestag, Bundesrat)", en: "Lawmaking (Bundestag, Federal Council)" } },
          { label: { de: "Exekutive", en: "Executive" }, value: { de: "Ausführung (Bundesregierung, Verwaltung)", en: "Enforcement (Federal Government, Administration)" } },
          { label: { de: "Judikative", en: "Judiciary" }, value: { de: "Rechtsprechung (Gerichte)", en: "Administration of justice (Courts)" } },
        ],
      },
    },
  },
  {
    id: "foederalismus",
    category: "staatsstruktur",
    title: { de: "Föderalismus", en: "Federalism" },
    description: {
      de: "Deutschland ist ein Bundesstaat, bestehend aus 16 Bundesländern. Bund und Länder teilen sich die staatlichen Aufgaben. Jedes Land hat eine eigene Verfassung und einen Landtag.",
      en: "Germany is a federal state consisting of 16 federal states. The federation and the states share governmental responsibilities. Each state has its own constitution and parliament.",
    },
    illustration: "🗺️",
    relatedQuestionNumbers: [23, 25, 26, 27, 38, 39, 57, 62, 91, 129, 192, 195, 197, 198, 200, 212],
    details: {
      table: {
        title: { de: "Die 16 Bundesländer", en: "The 16 Federal States" },
        rows: [
          { label: { de: "BW", en: "BW" }, value: { de: "Baden-Württemberg (Stuttgart)", en: "Baden-Württemberg (Stuttgart)" } },
          { label: { de: "BY", en: "BY" }, value: { de: "Bayern (München)", en: "Bavaria (Munich)" } },
          { label: { de: "BE", en: "BE" }, value: { de: "Berlin", en: "Berlin" } },
          { label: { de: "BB", en: "BB" }, value: { de: "Brandenburg (Potsdam)", en: "Brandenburg (Potsdam)" } },
          { label: { de: "HB", en: "HB" }, value: { de: "Bremen", en: "Bremen" } },
          { label: { de: "HH", en: "HH" }, value: { de: "Hamburg", en: "Hamburg" } },
          { label: { de: "HE", en: "HE" }, value: { de: "Hessen (Wiesbaden)", en: "Hesse (Wiesbaden)" } },
          { label: { de: "MV", en: "MV" }, value: { de: "Mecklenburg-Vorpommern (Schwerin)", en: "Mecklenburg-Western Pomerania (Schwerin)" } },
          { label: { de: "NI", en: "NI" }, value: { de: "Niedersachsen (Hannover)", en: "Lower Saxony (Hanover)" } },
          { label: { de: "NW", en: "NW" }, value: { de: "Nordrhein-Westfalen (Düsseldorf)", en: "North Rhine-Westphalia (Düsseldorf)" } },
          { label: { de: "RP", en: "RP" }, value: { de: "Rheinland-Pfalz (Mainz)", en: "Rhineland-Palatinate (Mainz)" } },
          { label: { de: "SL", en: "SL" }, value: { de: "Saarland (Saarbrücken)", en: "Saarland (Saarbrücken)" } },
          { label: { de: "SN", en: "SN" }, value: { de: "Sachsen (Dresden)", en: "Saxony (Dresden)" } },
          { label: { de: "ST", en: "ST" }, value: { de: "Sachsen-Anhalt (Magdeburg)", en: "Saxony-Anhalt (Magdeburg)" } },
          { label: { de: "SH", en: "SH" }, value: { de: "Schleswig-Holstein (Kiel)", en: "Schleswig-Holstein (Kiel)" } },
          { label: { de: "TH", en: "TH" }, value: { de: "Thüringen (Erfurt)", en: "Thuringia (Erfurt)" } },
        ],
      },
    },
  },

  // === Rechte & Freiheiten ===
  {
    id: "meinungsfreiheit",
    category: "rechte",
    title: { de: "Meinungsfreiheit", en: "Freedom of Speech" },
    description: {
      de: "Jeder Mensch in Deutschland hat das Recht, seine Meinung frei zu äußern – in Wort, Schrift und Bild. Dieses Grundrecht ist in Artikel 5 des Grundgesetzes verankert.",
      en: "Everyone in Germany has the right to freely express their opinion – in speech, writing, and images. This fundamental right is enshrined in Article 5 of the Basic Law.",
    },
    illustration: "💬",
    relatedQuestionNumbers: [1, 4, 9, 14, 16, 17, 18, 30, 161, 274, 281],
  },
  {
    id: "religionsfreiheit",
    category: "rechte",
    title: { de: "Religionsfreiheit", en: "Freedom of Religion" },
    description: {
      de: "In Deutschland gilt Religionsfreiheit. Jeder darf seine Religion frei wählen und ausüben – oder auch keiner Religion angehören.",
      en: "Freedom of religion applies in Germany. Everyone may freely choose and practice their religion – or belong to no religion at all.",
    },
    illustration: "🕊️",
    relatedQuestionNumbers: [1, 18, 161],
  },
  {
    id: "pressefreiheit",
    category: "rechte",
    title: { de: "Pressefreiheit", en: "Freedom of the Press" },
    description: {
      de: "Die Pressefreiheit garantiert, dass Zeitungen, Rundfunk und andere Medien frei berichten können, ohne staatliche Zensur. Sie ist eine Säule der Demokratie.",
      en: "Freedom of the press guarantees that newspapers, broadcasting, and other media can report freely without state censorship. It is a pillar of democracy.",
    },
    illustration: "📰",
    relatedQuestionNumbers: [12, 30, 32, 46, 105, 145, 159, 170],
  },
  {
    id: "versammlungsfreiheit",
    category: "rechte",
    title: { de: "Versammlungsfreiheit", en: "Freedom of Assembly" },
    description: {
      de: "In Deutschland dürfen sich Menschen friedlich und ohne Waffen versammeln. Für Versammlungen unter freiem Himmel kann eine Anmeldepflicht bestehen.",
      en: "In Germany, people have the right to assemble peacefully and without weapons. Outdoor assemblies may require prior notification.",
    },
    illustration: "✊",
    relatedQuestionNumbers: [17, 41, 166, 243, 281],
  },
  {
    id: "gleichberechtigung",
    category: "rechte",
    title: { de: "Gleichberechtigung", en: "Equal Rights" },
    description: {
      de: "Männer und Frauen sind in Deutschland gleichberechtigt. Niemand darf wegen seines Geschlechts, seiner Herkunft, Sprache, Religion oder Behinderung benachteiligt werden.",
      en: "Men and women have equal rights in Germany. No one may be disadvantaged because of their gender, origin, language, religion, or disability.",
    },
    illustration: "⚖️",
    relatedQuestionNumbers: [277, 278, 289],
  },
  {
    id: "menschenwuerde",
    category: "rechte",
    title: { de: "Menschenwürde", en: "Human Dignity" },
    description: {
      de: '\u201EDie W\u00FCrde des Menschen ist unantastbar.\u201C So beginnt Artikel 1 des Grundgesetzes. Der Schutz der Menschenw\u00FCrde ist das oberste Grundrecht.',
      en: "\u201CHuman dignity shall be inviolable.\u201D This is how Article 1 of the Basic Law begins. The protection of human dignity is the supreme fundamental right.",
    },
    illustration: "🌟",
    relatedQuestionNumbers: [8, 9, 18, 170],
  },

  // === Politik ===
  {
    id: "wahlen",
    category: "politik",
    title: { de: "Wahlen", en: "Elections" },
    description: {
      de: "Wahlen in Deutschland sind allgemein, unmittelbar, frei, gleich und geheim. Wählen dürfen alle deutschen Staatsbürger ab 18 Jahren.",
      en: "Elections in Germany are universal, direct, free, equal, and secret. All German citizens aged 18 and over are eligible to vote.",
    },
    illustration: "🗳️",
    relatedQuestionNumbers: [1, 5, 13, 15, 28, 30, 43, 62, 70, 93, 94, 95, 105, 106, 108, 109, 112, 113, 114, 115, 116, 119, 120, 122, 124, 125, 126, 127, 130, 133, 153, 159, 164, 232, 260, 268, 282],
    details: {
      keyFacts: {
        title: { de: "Wer darf wählen?", en: "Who May Vote?" },
        items: [
          { fact: { de: "Deutsche Staatsbürger ab 18 Jahren", en: "German citizens aged 18 and over" } },
          { fact: { de: "Bundestagswahl: alle 4 Jahre", en: "Federal elections: every 4 years" } },
          { fact: { de: "Landtagswahl: alle 4–5 Jahre (je nach Bundesland)", en: "State elections: every 4–5 years (depending on the state)" } },
          { fact: { de: "Kommunalwahl: auch EU-Bürger dürfen wählen", en: "Local elections: EU citizens may also vote" } },
          { fact: { de: "Europawahl: alle 5 Jahre", en: "European elections: every 5 years" } },
        ],
      },
    },
  },
  {
    id: "parteien",
    category: "politik",
    title: { de: "Parteien", en: "Political Parties" },
    description: {
      de: "Parteien sind Organisationen, in denen sich Menschen mit ähnlichen politischen Zielen zusammenschließen. In Deutschland gibt es ein Mehrparteiensystem.",
      en: "Parties are organizations in which people with similar political goals come together. Germany has a multi-party system.",
    },
    illustration: "🏳️",
    relatedQuestionNumbers: [12, 13, 20, 30, 31, 41, 43, 53, 70, 78, 79, 85, 89, 91, 93, 113, 117, 121, 123, 127, 131, 164, 170, 199, 210, 250, 256],
    details: {
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Parteien sind durch Art. 21 GG geschützt", en: "Parties are protected by Art. 21 of the Basic Law" } },
          { fact: { de: "Jeder darf eine Partei gründen", en: "Anyone may found a party" } },
          { fact: { de: "Parteien müssen demokratisch organisiert sein", en: "Parties must be democratically organized" } },
          { fact: { de: "Verfassungswidrige Parteien können verboten werden", en: "Unconstitutional parties can be banned" } },
          { fact: { de: "5%-Hürde: Parteien brauchen mindestens 5% der Stimmen für den Bundestag", en: "5% threshold: Parties need at least 5% of votes for the Bundestag" } },
        ],
      },
    },
  },
  {
    id: "koalition-opposition",
    category: "politik",
    title: { de: "Koalition & Opposition", en: "Coalition & Opposition" },
    description: {
      de: "Wenn keine Partei die Mehrheit im Bundestag hat, bilden mehrere Parteien eine Koalition. Die Parteien, die nicht zur Regierung gehören, bilden die Opposition.",
      en: "When no party has a majority in the Bundestag, several parties form a coalition. The parties not in government form the opposition.",
    },
    illustration: "🤝",
    relatedQuestionNumbers: [13, 31, 88, 89, 93, 103],
    details: {
      table: {
        title: { de: "Vergleich", en: "Comparison" },
        rows: [
          { label: { de: "Koalition", en: "Coalition" }, value: { de: "Mehrere Parteien bilden zusammen die Regierung", en: "Multiple parties form the government together" } },
          { label: { de: "Opposition", en: "Opposition" }, value: { de: "Parteien, die nicht zur Regierung gehören; kontrolliert die Regierung", en: "Parties not in government; they hold the government accountable" } },
        ],
      },
    },
  },
  {
    id: "verfassungsgericht",
    category: "politik",
    title: {
      de: "Bundesverfassungsgericht",
      en: "Federal Constitutional Court",
    },
    description: {
      de: "Das Bundesverfassungsgericht in Karlsruhe wacht über die Einhaltung des Grundgesetzes. Es prüft, ob Gesetze und staatliches Handeln verfassungsgemäß sind.",
      en: "The Federal Constitutional Court in Karlsruhe guards compliance with the Basic Law. It reviews whether laws and state actions are constitutional.",
    },
    illustration: "🏛️",
    relatedQuestionNumbers: [42, 52, 55, 58, 61, 63, 74, 80, 86, 136, 137, 139, 141, 142, 146, 150],    details: {
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Sitz: Karlsruhe", en: "Seat: Karlsruhe" } },
          { fact: { de: "Hütet das Grundgesetz", en: "Guards the Basic Law" } },
          { fact: { de: "Prüft Gesetze auf Verfassungsmäßigkeit", en: "Reviews laws for constitutionality" } },
          { fact: { de: "Jeder Bürger kann Verfassungsbeschwerde einreichen", en: "Every citizen can file a constitutional complaint" } },
          { fact: { de: "12 Richterinnen und Richter in zwei Senaten", en: "12 judges in two senates" } },
        ],
      },
    },  },

  // === Gesellschaft ===
  {
    id: "sozialversicherung",
    category: "gesellschaft",
    title: { de: "Sozialversicherung", en: "Social Insurance" },
    description: {
      de: "Das deutsche Sozialversicherungssystem umfasst fünf Säulen: Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung. Es schützt Bürger vor Lebensrisiken.",
      en: "The German social insurance system has five pillars: health, long-term care, pension, unemployment, and accident insurance. It protects citizens from life risks.",
    },
    illustration: "🏥",
    relatedQuestionNumbers: [34, 35, 36, 45, 97, 99, 100, 259, 285],
    details: {
      table: {
        title: { de: "Die fünf Säulen", en: "The Five Pillars" },
        rows: [
          { label: { de: "1", en: "1" }, value: { de: "Krankenversicherung", en: "Health insurance" } },
          { label: { de: "2", en: "2" }, value: { de: "Pflegeversicherung", en: "Long-term care insurance" } },
          { label: { de: "3", en: "3" }, value: { de: "Rentenversicherung", en: "Pension insurance" } },
          { label: { de: "4", en: "4" }, value: { de: "Arbeitslosenversicherung", en: "Unemployment insurance" } },
          { label: { de: "5", en: "5" }, value: { de: "Unfallversicherung", en: "Accident insurance" } },
        ],
      },
    },
  },
  {
    id: "ehrenamt",
    category: "gesellschaft",
    title: { de: "Ehrenamt", en: "Volunteer Work" },
    description: {
      de: "Ehrenamtliches Engagement ist ein wichtiger Bestandteil der Gesellschaft in Deutschland. Menschen arbeiten freiwillig und unbezahlt für das Gemeinwohl.",
      en: "Voluntary engagement is an important part of society in Germany. People work voluntarily and unpaid for the common good.",
    },
    illustration: "🤲",
    relatedQuestionNumbers: [23, 106, 132, 150, 282],
    details: {
      keyFacts: {
        title: { de: "Beispiele für Ehrenamt", en: "Examples of Volunteer Work" },
        items: [
          { fact: { de: "Freiwillige Feuerwehr", en: "Voluntary fire department" } },
          { fact: { de: "Sportvereine", en: "Sports clubs" } },
          { fact: { de: "Rettungsdienste (z.B. DRK, THW)", en: "Rescue services (e.g., Red Cross, THW)" } },
          { fact: { de: "Kirchliche und soziale Organisationen", en: "Church and social organizations" } },
          { fact: { de: "Elternbeirat in Schulen", en: "Parent council in schools" } },
        ],
      },
    },
  },
  {
    id: "erziehung",
    category: "gesellschaft",
    title: { de: "Erziehung & Familie", en: "Education & Family" },
    description: {
      de: "Eltern haben in Deutschland das Recht und die Pflicht, ihre Kinder zu erziehen. Es gilt die allgemeine Schulpflicht. Gewalt in der Erziehung ist verboten.",
      en: "Parents in Germany have the right and duty to raise their children. Compulsory schooling applies. Violence in upbringing is prohibited.",
    },
    illustration: "👨‍👩‍👧‍👦",
    relatedQuestionNumbers: [2, 47, 95, 97, 106, 242, 248, 249, 254, 255, 258, 269, 272, 273, 275, 284],
    details: {
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Schulpflicht: mindestens 9 Jahre", en: "Compulsory education: at least 9 years" } },
          { fact: { de: "Eltern haben das Recht und die Pflicht zur Erziehung (Art. 6 GG)", en: "Parents have the right and duty to raise their children (Art. 6 GG)" } },
          { fact: { de: "Gewalt in der Erziehung ist verboten", en: "Violence in child-rearing is prohibited" } },
          { fact: { de: "Kinder haben ein Recht auf gewaltfreie Erziehung", en: "Children have a right to non-violent upbringing" } },
          { fact: { de: "Gleichberechtigung von Mann und Frau in der Ehe", en: "Equal rights of men and women in marriage" } },
        ],
      },
    },
  },

  // === Geschichte ===
  {
    id: "nationalsozialismus",
    category: "geschichte",
    title: { de: "Nationalsozialismus", en: "National Socialism" },
    description: {
      de: "Die Zeit des Nationalsozialismus (1933–1945) unter Adolf Hitler war geprägt von Diktatur, Krieg und dem Holocaust. Diese Geschichte mahnt zur Wachsamkeit für die Demokratie.",
      en: "The era of National Socialism (1933–1945) under Adolf Hitler was marked by dictatorship, war, and the Holocaust. This history serves as a warning to protect democracy.",
    },
    illustration: "⚠️",
    relatedQuestionNumbers: [96, 149, 159, 162, 164, 170, 206, 220],
    details: {
      table: {
        title: { de: "Zeitleiste", en: "Timeline" },
        rows: [
          { label: { de: "1933", en: "1933" }, value: { de: "Hitler wird Reichskanzler; Ermächtigungsgesetz", en: "Hitler becomes Reich Chancellor; Enabling Act" } },
          { label: { de: "1935", en: "1935" }, value: { de: "Nürnberger Gesetze (Rassengesetze)", en: "Nuremberg Laws (racial laws)" } },
          { label: { de: "1938", en: "1938" }, value: { de: "Novemberpogrome (Reichspogromnacht)", en: "November pogroms (Kristallnacht)" } },
          { label: { de: "1939", en: "1939" }, value: { de: "Beginn des Zweiten Weltkriegs", en: "Start of World War II" } },
          { label: { de: "1941–1945", en: "1941–1945" }, value: { de: "Holocaust – Völkermord an den Juden Europas", en: "Holocaust – Genocide of European Jews" } },
          { label: { de: "8. Mai 1945", en: "May 8, 1945" }, value: { de: "Bedingungslose Kapitulation; Ende des Krieges", en: "Unconditional surrender; End of the war" } },
        ],
      },
    },
  },
  {
    id: "ddr",
    category: "geschichte",
    title: {
      de: "DDR (Deutsche Demokratische Republik)",
      en: "GDR (German Democratic Republic)",
    },
    description: {
      de: "Die DDR existierte von 1949 bis 1990 als sozialistischer Staat im Osten Deutschlands. Die Bevölkerung hatte eingeschränkte Freiheitsrechte und wurde überwacht.",
      en: "The GDR existed from 1949 to 1990 as a socialist state in eastern Germany. The population had limited civil liberties and was under surveillance.",
    },
    illustration: "🧱",
    relatedQuestionNumbers: [151, 166, 172, 174, 186, 187, 189, 190, 192, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 207, 208, 210, 217, 228, 298],
    details: {
      intro: {
        de: "Die Abkürzung DDR steht für Deutsche Demokratische Republik. Die DDR entstand im Jahr 1949 aus dem sowjetischen Besatzungssektor und existierte bis 1990. Zur DDR gehörten die heutigen 5 Bundesländer Brandenburg, Mecklenburg-Vorpommern, Sachsen, Sachsen-Anhalt und Thüringen. Auch Ost-Berlin war Teil der DDR.",
        en: "The abbreviation DDR stands for \"Deutsche Demokratische Republik\". The DDR (GDR, German Democratic Republic) emerged from the Soviet occupation sector in 1949 and existed until 1990. The DDR included today's 5 federal states of Brandenburg, Mecklenburg-Western Pomerania, Saxony, Saxony-Anhalt, and Thuringia. East Berlin was also part of the DDR.",
      },
      image: {
        src: "/images/topics/ddr-map.svg",
        alt: {
          de: "Karte von Deutschland mit den DDR-Bundesländern",
          en: "Map of Germany showing the GDR states",
        },
        caption: {
          de: "Die 5 DDR-Bundesländer sind dunkel markiert",
          en: "The 5 GDR states are shown in dark",
        },
      },
      table: {
        title: { de: "Zeitleiste", en: "Timeline" },
        rows: [
          { label: { de: "1949", en: "1949" }, value: { de: "Gründung der DDR (7. Oktober)", en: "Founding of the GDR (October 7)" } },
          { label: { de: "1953", en: "1953" }, value: { de: "Volksaufstand am 17. Juni", en: "People's uprising on June 17" } },
          { label: { de: "1961", en: "1961" }, value: { de: "Bau der Berliner Mauer (13. August)", en: "Construction of the Berlin Wall (August 13)" } },
          { label: { de: "1989", en: "1989" }, value: { de: "Fall der Berliner Mauer (9. November)", en: "Fall of the Berlin Wall (November 9)" } },
          { label: { de: "1990", en: "1990" }, value: { de: "Wiedervereinigung (3. Oktober)", en: "Reunification (October 3)" } },
        ],
      },
      keyFacts: {
        title: { de: "Merkmale der DDR", en: "Characteristics of the GDR" },
        items: [
          { fact: { de: "Sozialistische Einheitspartei Deutschlands (SED) als Staatspartei", en: "Socialist Unity Party of Germany (SED) as the ruling party" } },
          { fact: { de: "Keine freien Wahlen", en: "No free elections" } },
          { fact: { de: "Überwachung durch die Stasi (Ministerium für Staatssicherheit)", en: "Surveillance by the Stasi (Ministry of State Security)" } },
          { fact: { de: "Keine Reisefreiheit", en: "No freedom of travel" } },
        ],
      },
    },
  },
  {
    id: "berliner-mauer",
    category: "geschichte",
    title: { de: "Berliner Mauer", en: "Berlin Wall" },
    description: {
      de: "Die Berliner Mauer teilte von 1961 bis 1989 West- und Ost-Berlin. Ihr Fall am 9. November 1989 war ein Symbol für das Ende des Kalten Krieges und führte zur Wiedervereinigung.",
      en: "The Berlin Wall divided West and East Berlin from 1961 to 1989. Its fall on November 9, 1989 was a symbol of the end of the Cold War and led to reunification.",
    },
    illustration: "🧱",
    relatedQuestionNumbers: [151, 152, 153, 166, 188, 189, 191, 193],
    details: {
      table: {
        title: { de: "Zeitleiste", en: "Timeline" },
        rows: [
          { label: { de: "13. Aug. 1961", en: "Aug. 13, 1961" }, value: { de: "Bau der Berliner Mauer beginnt", en: "Construction of the Berlin Wall begins" } },
          { label: { de: "1961–1989", en: "1961–1989" }, value: { de: "Mauer teilt Berlin in Ost und West", en: "Wall divides Berlin into East and West" } },
          { label: { de: "9. Nov. 1989", en: "Nov. 9, 1989" }, value: { de: "Fall der Berliner Mauer", en: "Fall of the Berlin Wall" } },
        ],
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Mindestens 140 Menschen starben bei Fluchtversuchen an der Mauer", en: "At least 140 people died attempting to cross the Wall" } },
          { fact: { de: "Die Mauer war 155 km lang", en: "The Wall was 155 km long" } },
          { fact: { de: "Der 9. November ist ein Gedenktag", en: "November 9 is a day of remembrance" } },
        ],
      },
    },
  },
  {
    id: "wiedervereinigung",
    category: "geschichte",
    title: { de: "Wiedervereinigung", en: "German Reunification" },
    description: {
      de: "Am 3. Oktober 1990 wurde Deutschland wiedervereinigt. Die DDR trat der Bundesrepublik bei. Der 3. Oktober ist seitdem der Tag der Deutschen Einheit.",
      en: "On October 3, 1990, Germany was reunified. The GDR joined the Federal Republic. October 3 has since been the Day of German Unity.",
    },
    illustration: "🇩🇪",
    relatedQuestionNumbers: [189, 217, 218, 219, 220, 228],
    details: {
      table: {
        title: { de: "Zeitleiste", en: "Timeline" },
        rows: [
          { label: { de: "9. Nov. 1989", en: "Nov. 9, 1989" }, value: { de: "Fall der Berliner Mauer", en: "Fall of the Berlin Wall" } },
          { label: { de: "18. März 1990", en: "Mar. 18, 1990" }, value: { de: "Erste freie Volkskammerwahl in der DDR", en: "First free election in the GDR" } },
          { label: { de: "1. Juli 1990", en: "Jul. 1, 1990" }, value: { de: "Währungsunion (D-Mark in der DDR)", en: "Monetary union (D-Mark in the GDR)" } },
          { label: { de: "3. Okt. 1990", en: "Oct. 3, 1990" }, value: { de: "Tag der Deutschen Einheit – Wiedervereinigung", en: "Day of German Unity – Reunification" } },
        ],
      },
    },
  },
];
