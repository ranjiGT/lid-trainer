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
  gallery?: {
    src: string;
    alt: { de: string; en: string };
    caption?: { de: string; en: string };
  }[];
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
      image: {
        src: "/images/topics/abgeordnete.svg",
        alt: {
          de: "Abgeordnete im Deutschen Bundestag \u2013 Wahl, Aufgaben und Rechte",
          en: "Representatives in the German Bundestag \u2013 Election, duties and rights",
        },
        caption: {
          de: "B\u00fcrger w\u00e4hlen Abgeordnete in den Bundestag. Diese genie\u00dfen ein freies Mandat und Immunit\u00e4t.",
          en: "Citizens elect representatives to the Bundestag. They enjoy a free mandate and immunity.",
        },
      },
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
      image: {
        src: "/images/topics/bundestag.svg",
        alt: {
          de: "Der Deutsche Bundestag \u2013 Aufbau, Zahlen und Aufgaben",
          en: "The German Bundestag \u2013 Structure, facts and functions",
        },
        caption: {
          de: "Der Bundestag ist das Parlament Deutschlands mit Sitz im Reichstagsgeb\u00e4ude in Berlin.",
          en: "The Bundestag is Germany\u2019s parliament, seated in the Reichstag building in Berlin.",
        },
      },
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
    id: "fuenf-prozent-huerde",
    category: "grundlagen",
    title: { de: "F\u00fcnf-Prozent-H\u00fcrde", en: "Five Percent Hurdle" },
    description: {
      de: "Eine Partei muss mindestens 5 % der Zweitstimmen erreichen, um in den Bundestag zu kommen. Diese H\u00fcrde soll stabile Mehrheiten und eine handlungsf\u00e4hige Regierung sichern.",
      en: "A party must achieve at least 5% of the second votes to enter the Bundestag. This hurdle is intended to ensure stable majorities and an effective government.",
    },
    illustration: "\ud83d\udecb\ufe0f",
    relatedQuestionNumbers: [13, 93, 117, 121, 123, 127],
    details: {
      intro: {
        de: "Eine Partei muss mindestens 5 % der Zweitstimmen erreichen, um in den Bundestag zu kommen. Diese 5 %-H\u00fcrde soll verhindern, dass zu viele kleine Parteien ins Parlament einziehen. Dies w\u00fcrde die Bildung stabiler Mehrheiten und damit eine handlungsf\u00e4hige Regierung erschweren.",
        en: "A party must achieve at least 5% of the second votes to enter the Bundestag. This 5% hurdle is intended to prevent too many small parties from entering parliament. This would make it difficult to form stable majorities and thus an effective government.",
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Mindestens 5 % der Zweitstimmen n\u00f6tig f\u00fcr den Einzug in den Bundestag", en: "At least 5% of second votes needed to enter the Bundestag" } },
          { fact: { de: "Verhindert Zersplitterung des Parlaments", en: "Prevents fragmentation of parliament" } },
          { fact: { de: "Sichert stabile Mehrheiten und handlungsf\u00e4hige Regierung", en: "Ensures stable majorities and effective government" } },
          { fact: { de: "Gilt nur f\u00fcr die Zweitstimme (Verh\u00e4ltniswahl)", en: "Applies only to the second vote (proportional representation)" } },
        ],
      },
    },
  },
  {
    id: "fraktion",
    category: "grundlagen",
    title: { de: "Fraktion", en: "Parliamentary Group" },
    description: {
      de: "Im Deutschen Bundestag schlie\u00dfen sich Abgeordnete mit \u00e4hnlichen politischen Zielen zu Fraktionen zusammen. Fraktionen spielen eine zentrale Rolle in der politischen Arbeit des Parlaments.",
      en: "In the German Bundestag, members of parliament with similar political goals join together to form parliamentary groups. They play a central role in the political work of parliament.",
    },
    illustration: "\ud83e\udd1d",
    relatedQuestionNumbers: [13, 31, 57, 73, 88, 89, 93, 98, 103],
    details: {
      intro: {
        de: "Im Deutschen Bundestag schlie\u00dfen sich Abgeordnete mit \u00e4hnlichen politischen Zielen zu Fraktionen zusammen. Sie geh\u00f6ren meist derselben Partei an oder sind politisch nahestehende Parteien wie CDU und CSU. Eine Fraktion muss mindestens 5 % der Bundestagsabgeordneten umfassen. Fraktionen haben mehr Rechte als einzelne Abgeordnete: Sie k\u00f6nnen Gesetzesentw\u00fcrfe einbringen, Antr\u00e4ge stellen und sich aktiver in Aussch\u00fcssen engagieren.",
        en: "In the German Bundestag, members of parliament with similar political goals join together to form parliamentary groups. They usually belong to the same party or to politically close parties, such as the CDU and CSU. A parliamentary group must comprise at least 5% of the Bundestag's members. Parliamentary groups have more rights than individual members: They can introduce bills, submit motions, and participate more actively in committees.",
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Mindestens 5 % der Bundestagsabgeordneten bilden eine Fraktion", en: "At least 5% of Bundestag members form a parliamentary group" } },
          { fact: { de: "Geh\u00f6ren meist derselben Partei an (z.\u00a0B. CDU/CSU)", en: "Usually belong to the same party (e.g. CDU/CSU)" } },
          { fact: { de: "K\u00f6nnen Gesetzesentw\u00fcrfe einbringen und Antr\u00e4ge stellen", en: "Can introduce bills and submit motions" } },
          { fact: { de: "Mehr Rechte als einzelne Abgeordnete", en: "More rights than individual members" } },
          { fact: { de: "Zentrale Rolle in der Parlamentsarbeit", en: "Central role in parliamentary work" } },
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
    id: "bundeskabinett",
    category: "grundlagen",
    title: { de: "Bundeskabinett", en: "Federal Cabinet" },
    description: {
      de: "Das Bundeskabinett besteht aus dem Bundeskanzler und den Bundesministern. Der Kanzler schl\u00e4gt die Minister vor, der Bundespr\u00e4sident ernennt sie.",
      en: "The Federal Cabinet consists of the Federal Chancellor and the Federal Ministers. The Chancellor proposes the ministers, and the Federal President appoints them.",
    },
    illustration: "\ud83d\udcbc",
    relatedQuestionNumbers: [55, 65, 70, 71, 72, 82, 87, 88],
    details: {
      intro: {
        de: "Das Bundeskabinett besteht aus dem Bundeskanzler und den Bundesministern. Nachdem der Bundeskanzler vom Bundestag gew\u00e4hlt wurde, schl\u00e4gt er die Minister vor, und der Bundespr\u00e4sident ernennt sie.",
        en: "The Federal Cabinet consists of the Federal Chancellor and the Federal Ministers. After the Federal Chancellor is elected by the Bundestag, he or she proposes the ministers, and the Federal President appoints them.",
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Besteht aus Bundeskanzler/in und Bundesministern", en: "Consists of the Federal Chancellor and Federal Ministers" } },
          { fact: { de: "Bundeskanzler/in wird vom Bundestag gew\u00e4hlt", en: "Federal Chancellor is elected by the Bundestag" } },
          { fact: { de: "Bundeskanzler/in schl\u00e4gt Minister vor", en: "Federal Chancellor proposes ministers" } },
          { fact: { de: "Bundespr\u00e4sident/in ernennt die Minister", en: "Federal President appoints the ministers" } },
          { fact: { de: "Bundeskanzler/in leitet das Bundeskabinett", en: "Federal Chancellor heads the Federal Cabinet" } },
        ],
      },
    },
  },
  {
    id: "bundesversammlung",
    category: "grundlagen",
    title: { de: "Bundesversammlung", en: "Federal Assembly" },
    description: {
      de: "Die Bundesversammlung besteht aus den Mitgliedern des Bundestages sowie einer gleichen Anzahl von Delegierten der Bundesl\u00e4nder. Sie tritt alle f\u00fcnf Jahre zusammen, um den Bundespr\u00e4sidenten zu w\u00e4hlen.",
      en: "The Federal Assembly consists of the members of the Bundestag and an equal number of delegates from the federal states. It meets every five years to elect the Federal President.",
    },
    illustration: "\ud83c\udfdb\ufe0f",
    relatedQuestionNumbers: [48, 58, 84, 86, 87, 90, 126],
    details: {
      intro: {
        de: "Die Bundesversammlung besteht aus den Mitgliedern des Bundestages sowie einer gleichen Anzahl von Delegierten der Bundesl\u00e4nder. Sie tritt alle f\u00fcnf Jahre zusammen, um den Bundespr\u00e4sidenten zu w\u00e4hlen.",
        en: "The Federal Assembly consists of the members of the Bundestag and an equal number of delegates from the federal states. It meets every five years to elect the Federal President.",
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Einzige Aufgabe: Wahl des Bundespr\u00e4sidenten", en: "Only task: Election of the Federal President" } },
          { fact: { de: "Mitglieder: Bundestagsabgeordnete + gleiche Anzahl Delegierte der L\u00e4nder", en: "Members: Bundestag members + equal number of state delegates" } },
          { fact: { de: "Tritt alle 5 Jahre zusammen", en: "Convenes every 5 years" } },
          { fact: { de: "Gr\u00f6\u00dftes parlamentarisches Gremium Deutschlands", en: "Largest parliamentary body in Germany" } },
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
  {
    id: "eu-mitgliedsstaaten",
    category: "grundlagen",
    title: { de: "EU-Mitgliedsstaaten", en: "EU Member States" },
    description: {
      de: "Die Europ\u00e4ische Union (EU) hat heute 27 Mitgliedstaaten. Wichtige Ziele der EU sind Frieden, Freiheit, Wohlstand und Zusammenarbeit in Europa.",
      en: "The European Union (EU) currently has 27 member states. The EU's key objectives are peace, freedom, prosperity, and cooperation in Europe.",
    },
    illustration: "\ud83c\uddea\ud83c\uddfa",
    relatedQuestionNumbers: [173, 205, 224, 226, 230, 231, 232, 234, 236, 237, 238, 239],
    details: {
      intro: {
        de: "Die EU hat heute 27 Mitgliedstaaten (nach dem Austritt Gro\u00dfbritanniens 2020). Wichtige Ziele der EU sind Frieden, Freiheit, Wohlstand und Zusammenarbeit in Europa.",
        en: "The EU currently has 27 member states (following the UK's exit in 2020). The EU's key objectives are peace, freedom, prosperity, and cooperation in Europe.",
      },
      image: {
        src: "/images/topics/eu-flag.jpg",
        alt: { de: "Flagge der Europ\u00e4ischen Union", en: "Flag of the European Union" },
        caption: { de: "Die Flagge der EU: 12 goldene Sterne auf blauem Grund", en: "The EU flag: 12 golden stars on a blue background" },
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "27 Mitgliedstaaten (seit Brexit 2020)", en: "27 member states (since Brexit 2020)" } },
          { fact: { de: "Ziele: Frieden, Freiheit, Wohlstand, Zusammenarbeit", en: "Goals: peace, freedom, prosperity, cooperation" } },
          { fact: { de: "Europ\u00e4isches Parlament wird alle 5 Jahre gew\u00e4hlt", en: "European Parliament is elected every 5 years" } },
          { fact: { de: "Sitze des EU-Parlaments: Stra\u00dfburg, Br\u00fcssel, Luxemburg", en: "Seats of the EU Parliament: Strasbourg, Brussels, Luxembourg" } },
          { fact: { de: "Bundesrepublik Deutschland ist Gr\u00fcndungsmitglied (R\u00f6mische Vertr\u00e4ge 1957)", en: "Federal Republic of Germany is a founding member (Treaty of Rome 1957)" } },
          { fact: { de: "EU-Abk\u00fcrzung steht f\u00fcr: Europ\u00e4ische Union", en: "EU stands for: European Union" } },
        ],
      },
    },
  },
  {
    id: "schengen",
    category: "grundlagen",
    title: { de: "Schengen (1985)", en: "Schengen (1985)" },
    description: {
      de: "In Schengen (Luxemburg) wurde 1985 ein Vertrag unterzeichnet, der Grenzkontrollen zwischen vielen europ\u00e4ischen Staaten abschaffte. Heute kann man in viele L\u00e4nder Europas ohne Passkontrolle reisen.",
      en: "A treaty was signed in Schengen (Luxembourg) in 1985 that abolished border controls between many European countries. Today you can travel to many European countries without passport control.",
    },
    illustration: "\ud83d\udec2",
    relatedQuestionNumbers: [221],
    details: {
      intro: {
        de: "In Schengen (Luxemburg) wurde 1985 ein Vertrag unterzeichnet, der Grenzkontrollen zwischen vielen europ\u00e4ischen Staaten abschaffte. Heute kann man in viele L\u00e4nder Europas ohne Passkontrolle reisen.",
        en: "A treaty was signed in Schengen (Luxembourg) in 1985 that abolished border controls between many European countries. Today you can travel to many European countries without passport control.",
      },
      image: {
        src: "/images/topics/schengen/schengen-sign.jpg",
        alt: { de: "Schengen an der Mosel, Luxemburg", en: "Schengen on the Moselle, Luxembourg" },
        caption: { de: "Schengen an der Mosel \u2013 hier wurde 1985 das Abkommen unterzeichnet", en: "Schengen on the Moselle \u2013 where the agreement was signed in 1985" },
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "1985: Unterzeichnung des Schengener Abkommens in Luxemburg", en: "1985: Signing of the Schengen Agreement in Luxembourg" } },
          { fact: { de: "Abschaffung der Grenzkontrollen zwischen Mitgliedstaaten", en: "Abolition of border controls between member states" } },
          { fact: { de: "Reisen ohne Passkontrolle in viele europ\u00e4ische L\u00e4nder", en: "Travel without passport control to many European countries" } },
          { fact: { de: "Deutschland ist Mitglied des Schengener Abkommens", en: "Germany is a member of the Schengen Agreement" } },
        ],
      },
    },
  },
  {
    id: "eu-1993",
    category: "grundlagen",
    title: { de: "EU (1993)", en: "EU (1993)" },
    description: {
      de: "Die Europ\u00e4ische Union (EU) entstand mit dem Vertrag von Maastricht. Sie erweiterte die wirtschaftliche Zusammenarbeit um politische Bereiche wie Au\u00dfenpolitik, Sicherheit, Justiz und Inneres.",
      en: "The European Union (EU) was created with the Maastricht Treaty. It expanded economic cooperation to include political areas such as foreign policy, security, justice, and home affairs.",
    },
    illustration: "\ud83c\uddea\ud83c\uddfa",
    relatedQuestionNumbers: [224, 235, 236],
    details: {
      intro: {
        de: "Die Europ\u00e4ische Union (EU) entstand mit dem Vertrag von Maastricht (1993). Sie erweiterte die wirtschaftliche Zusammenarbeit um politische Bereiche wie Au\u00dfenpolitik, Sicherheit, Justiz und Inneres.",
        en: "The European Union (EU) was created with the Maastricht Treaty (1993). It expanded economic cooperation to include political areas such as foreign policy, security, justice, and home affairs.",
      },
      image: {
        src: "/images/topics/eu-1993/maastricht-treaty.jpg",
        alt: { de: "Pressekonferenz zum Vertrag von Maastricht 1991", en: "Press conference for the Maastricht Treaty 1991" },
        caption: { de: "Pressekonferenz zum Vertrag von Maastricht (1991)", en: "Press conference for the Maastricht Treaty (1991)" },
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "1993: Gr\u00fcndung der EU durch den Vertrag von Maastricht", en: "1993: Founding of the EU through the Maastricht Treaty" } },
          { fact: { de: "Erweiterung von wirtschaftlicher zu politischer Zusammenarbeit", en: "Expansion from economic to political cooperation" } },
          { fact: { de: "Neue Bereiche: Au\u00dfenpolitik, Sicherheit, Justiz, Inneres", en: "New areas: foreign policy, security, justice, home affairs" } },
          { fact: { de: "EU = Europ\u00e4ische Union", en: "EU = European Union" } },
        ],
      },
    },
  },
  {
    id: "europaeisches-parlament",
    category: "grundlagen",
    title: { de: "Europ\u00e4isches Parlament", en: "European Parliament" },
    description: {
      de: "Das Europ\u00e4ische Parlament wird alle 5 Jahre gew\u00e4hlt. Es hat seinen offiziellen Sitz in Stra\u00dfburg und arbeitet auch in Br\u00fcssel und Luxemburg.",
      en: "The European Parliament is elected every five years. Its official seat is in Strasbourg and it also operates in Brussels and Luxembourg.",
    },
    illustration: "\ud83c\udfe9",
    relatedQuestionNumbers: [230, 232, 234, 238],
    details: {
      intro: {
        de: "Das Europ\u00e4ische Parlament wird alle 5 Jahre gew\u00e4hlt. Es werden die Abgeordneten des Europ\u00e4ischen Parlaments gew\u00e4hlt. Der Sitz des Europ\u00e4ischen Parlaments ist offiziell in Stra\u00dfburg. Das Parlament arbeitet auch in Br\u00fcssel und Luxemburg.",
        en: "The European Parliament is elected every five years. Members of the European Parliament are elected. The seat of the European Parliament is officially in Strasbourg. The Parliament also operates in Brussels and Luxembourg.",
      },
      image: {
        src: "/images/topics/europaeisches-parlament/eu-parliament.jpg",
        alt: { de: "Plenarsaal des Europ\u00e4ischen Parlaments in Stra\u00dfburg", en: "Hemicycle of the European Parliament in Strasbourg" },
        caption: { de: "Der Plenarsaal des EU-Parlaments im Louise-Weiss-Geb\u00e4ude, Stra\u00dfburg", en: "The hemicycle of the EU Parliament in the Louise Weiss building, Strasbourg" },
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Wahl alle 5 Jahre", en: "Election every 5 years" } },
          { fact: { de: "Es werden Abgeordnete gew\u00e4hlt", en: "Members (MEPs) are elected" } },
          { fact: { de: "Offizieller Sitz: Stra\u00dfburg", en: "Official seat: Strasbourg" } },
          { fact: { de: "Arbeitet auch in Br\u00fcssel und Luxemburg", en: "Also operates in Brussels and Luxembourg" } },
        ],
      },
    },
  },
  {
    id: "europaeische-integration",
    category: "grundlagen",
    title: { de: "Europ\u00e4ische Integration", en: "European Integration" },
    description: {
      de: "Mit dem Begriff Europ\u00e4ische Integration meint man den Prozess, bei dem sich europ\u00e4ische Staaten zusammenschlie\u00dfen.",
      en: "The term European integration refers to the process by which European states join together.",
    },
    illustration: "\ud83e\udd1d",
    relatedQuestionNumbers: [231],
    details: {
      intro: {
        de: "Mit dem Begriff Europ\u00e4ische Integration meint man den Prozess, bei dem sich europ\u00e4ische Staaten zusammenschlie\u00dfen.",
        en: "The term European integration refers to the process by which European states join together.",
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Prozess des Zusammenschlusses europ\u00e4ischer Staaten", en: "Process of European states joining together" } },
          { fact: { de: "Begann mit der EGKS (1951) und den R\u00f6mischen Vertr\u00e4gen (1957)", en: "Began with the ECSC (1951) and the Treaty of Rome (1957)" } },
          { fact: { de: "EWG (1957) \u2192 EG (1967) \u2192 EU (1993)", en: "EEC (1957) \u2192 EC (1967) \u2192 EU (1993)" } },
          { fact: { de: "Ziel: Frieden, Freiheit und Wohlstand in Europa", en: "Goal: peace, freedom and prosperity in Europe" } },
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
      de: "Es gibt 19 Grundrechte in Deutschland. Sie sind im Grundgesetz (Artikel 1 bis 19) verankert und sch\u00fctzen die Freiheit und W\u00fcrde aller Menschen.",
      en: "There are 19 fundamental rights in Germany. They are enshrined in the Basic Law (Articles 1 to 19) and protect the freedom and dignity of all people.",
    },
    illustration: "\ud83d\udee1\ufe0f",
    relatedQuestionNumbers: [1, 4, 7, 8, 9, 12, 14, 16, 17, 18, 19, 274, 281],
    details: {
      intro: {
        de: "Es gibt 19 Grundrechte in Deutschland. Sie sind im Grundgesetz (Artikel 1 bis 19) verankert und sch\u00fctzen die Freiheit und W\u00fcrde aller Menschen. Das Bundesverfassungsgericht in Karlsruhe wacht \u00fcber die Einhaltung der Grundrechte.",
        en: "There are 19 fundamental rights in Germany. They are enshrined in the Basic Law (Articles 1 to 19) and protect the freedom and dignity of all people. The Federal Constitutional Court in Karlsruhe safeguards these fundamental rights.",
      },
      image: {
        src: "/images/topics/grundrechte/bundesverfassungsgericht.jpg",
        alt: { de: "Bundesverfassungsgericht in Karlsruhe", en: "Federal Constitutional Court in Karlsruhe" },
        caption: { de: "Das Bundesverfassungsgericht in Karlsruhe \u2013 H\u00fcter der Grundrechte", en: "The Federal Constitutional Court in Karlsruhe \u2013 guardian of fundamental rights" },
      },
      gallery: [
        {
          src: "/images/topics/grundrechte/grundgesetz-art1.jpg",
          alt: { de: "#DeineW\u00fcrde \u2013 Initiative zum 70. Jubil\u00e4um des Grundgesetzes", en: "#YourDignity \u2013 initiative for 70th anniversary of the Basic Law" },
          caption: { de: "Artikel 1: Die W\u00fcrde des Menschen ist unantastbar", en: "Article 1: Human dignity shall be inviolable" },
        },
        {
          src: "/images/topics/grundrechte/menschenwuerde.jpg",
          alt: { de: "Gedenkst\u00e4tte f\u00fcr NS-Opfer", en: "Memorial for NS victims" },
          caption: { de: "Mahnmal \u2013 Niemals soll ein Mensch wegen seiner Zugeh\u00f6rigkeit verfolgt werden", en: "Memorial \u2013 No one shall be persecuted for their identity" },
        },
        {
          src: "/images/topics/grundrechte/versammlungsfreiheit.jpg",
          alt: { de: "Friedliche Demonstration", en: "Peaceful demonstration" },
          caption: { de: "Artikel 8: Versammlungsfreiheit \u2013 friedlich und ohne Waffen", en: "Article 8: Freedom of assembly \u2013 peacefully and without weapons" },
        },
        {
          src: "/images/topics/grundrechte/asylrecht.jpg",
          alt: { de: "Demonstration f\u00fcr Asylrecht in Berlin", en: "Demonstration for asylum rights in Berlin" },
          caption: { de: "Artikel 16a: Politisch Verfolgte haben Anspruch auf Asyl", en: "Article 16a: Politically persecuted persons have the right to asylum" },
        },
      ],
      table: {
        title: { de: "Alle 19 Grundrechte (Art. 1\u201319)", en: "All 19 Fundamental Rights (Art. 1\u201319)" },
        rows: [
        { label: { de: "Art. 1 \u2013 W\u00fcrde des Menschen", en: "Art. 1 \u2013 Human Dignity" }, value: { de: "Die W\u00fcrde jedes Menschen ist unantastbar. Sie muss vom Staat geachtet und gesch\u00fctzt werden.", en: "The dignity of every human being is inviolable. It must be respected and protected by the state." } },
        { label: { de: "Art. 2 \u2013 Pers\u00f6nliche Freiheitsrechte", en: "Art. 2 \u2013 Personal Freedom Rights" }, value: { de: "Jeder darf tun und lassen, was er m\u00f6chte, solange er die Rechte anderer respektiert. Jeder hat das Recht zu leben.", en: "Everyone can do whatever they want, as long as they respect the rights of others. Everyone has the right to life." } },
        { label: { de: "Art. 3 \u2013 Gleichheit vor dem Gesetz", en: "Art. 3 \u2013 Equality Before the Law" }, value: { de: "Alle Menschen sind gleich. Niemand darf wegen Herkunft, Religion, Geschlecht, Behinderung usw. benachteiligt werden.", en: "All people are equal. No one shall be discriminated against because of origin, religion, gender, disability, etc." } },
        { label: { de: "Art. 4 \u2013 Glaubens- und Gewissensfreiheit", en: "Art. 4 \u2013 Freedom of Belief and Conscience" }, value: { de: "Jeder darf glauben, was er m\u00f6chte, und seine Religion frei aus\u00fcben. Niemand darf gezwungen werden, gegen sein Gewissen zu handeln.", en: "Everyone is free to believe what they wish and to practice their religion freely. No one may be forced to act against their conscience." } },
        { label: { de: "Art. 5 \u2013 Meinungs-, Kunst- und Wissenschaftsfreiheit", en: "Art. 5 \u2013 Freedom of Opinion, Art and Science" }, value: { de: "Jeder darf seine Meinung frei \u00e4u\u00dfern. Die Presse darf frei berichten. Kunst und Wissenschaft sind frei. Aber die W\u00fcrde anderer darf nicht verletzt werden.", en: "Everyone is free to express their opinion. The press is free to report. Art and science are free. But the dignity of others must not be violated." } },
        { label: { de: "Art. 6 \u2013 Schutz von Ehe, Familie, Kinder", en: "Art. 6 \u2013 Protection of Marriage, Family, Children" }, value: { de: "Ehe und Familie stehen unter dem besonderen Schutz des Staates. Eltern haben das Recht und die Pflicht, ihre Kinder zu erziehen.", en: "Marriage and family are under the special protection of the state. Parents have the right and the duty to raise their children." } },
        { label: { de: "Art. 7 \u2013 Schulwesen", en: "Art. 7 \u2013 School System" }, value: { de: "Das Schulwesen steht unter staatlicher Aufsicht. Eltern haben ein Mitspracherecht. Religionsunterricht gibt es, aber niemand ist dazu verpflichtet.", en: "The school system is under state supervision. Parents have a say. Religious instruction is offered, but no one is obligated to attend." } },
        { label: { de: "Art. 8 \u2013 Versammlungsfreiheit", en: "Art. 8 \u2013 Freedom of Assembly" }, value: { de: "Alle Menschen d\u00fcrfen sich friedlich und ohne Waffen versammeln, z.B. bei Demonstrationen.", en: "All people are free to assemble peacefully and without weapons, e.g., at demonstrations." } },
        { label: { de: "Art. 9 \u2013 Vereinigungs- und Koalitionsfreiheit", en: "Art. 9 \u2013 Freedom of Association and Coalition" }, value: { de: "Jeder hat das Recht, Vereine oder Gruppen zu gr\u00fcnden (Sportvereine, Religionsgemeinschaften, Gewerkschaften). Nur Gruppen gegen Gesetze oder Demokratie sind verboten.", en: "Everyone is free to establish associations or groups (sports clubs, religious communities, trade unions). Only groups that work against laws or democracy are prohibited." } },
        { label: { de: "Art. 10 \u2013 Brief-, Post- und Fernmeldegeheimnis", en: "Art. 10 \u2013 Secrecy of Correspondence and Telecommunications" }, value: { de: "Briefe, E-Mails, Telefonate d\u00fcrfen nicht ohne besonderen Grund gelesen oder abgeh\u00f6rt werden. Nur mit richterlicher Genehmigung.", en: "Letters, emails, telephone calls may not be read or intercepted without specific reason. Only with judicial authorization." } },
        { label: { de: "Art. 11 \u2013 Freiz\u00fcgigkeit", en: "Art. 11 \u2013 Freedom of Movement" }, value: { de: "Alle Deutschen k\u00f6nnen ihren Wohn- und Aufenthaltsort in Deutschland frei w\u00e4hlen.", en: "All Germans are free to choose where they wish to live or stay in Germany." } },
        { label: { de: "Art. 12 \u2013 Berufsfreiheit", en: "Art. 12 \u2013 Freedom of Occupation" }, value: { de: "Jeder kann seinen Beruf frei w\u00e4hlen und eine Ausbildung absolvieren. Niemand darf zu einer bestimmten T\u00e4tigkeit gezwungen werden.", en: "Everyone is free to choose their profession and pursue training. No one may be forced into a particular activity." } },
        { label: { de: "Art. 12a \u2013 Milit\u00e4rische und zivile Dienstpflichten", en: "Art. 12a \u2013 Military and Civilian Service Obligations" }, value: { de: "M\u00e4nner k\u00f6nnen im Verteidigungsfall zum Wehr- oder Zivildienst verpflichtet werden. Dies gilt nur bei akuter Gefahr.", en: "Men may be required to perform military or civilian service in a state of defense. This only applies if Germany is in grave danger." } },
        { label: { de: "Art. 13 \u2013 Unverletzlichkeit der Wohnung", en: "Art. 13 \u2013 Inviolability of the Home" }, value: { de: "Die Wohnung ist gesch\u00fctzt. Niemand darf eine Wohnung ohne Erlaubnis oder richterlichen Beschluss betreten \u2013 au\u00dfer in Notf\u00e4llen.", en: "The home is protected. No one may enter a home without permission or a court order \u2013 except in emergencies." } },
        { label: { de: "Art. 14 \u2013 Eigentum, Erbrecht, Enteignung", en: "Art. 14 \u2013 Property, Inheritance, Expropriation" }, value: { de: "Jeder darf Eigentum haben. Der Staat darf Eigentum nur wegnehmen, wenn es f\u00fcr alle wichtig ist, und muss eine Entsch\u00e4digung zahlen.", en: "Everyone is entitled to own property. The state may only take property if it is important for everyone and must pay compensation." } },
        { label: { de: "Art. 15 \u2013 Vergesellschaftung", en: "Art. 15 \u2013 Socialization" }, value: { de: "Der Staat kann in besonderen F\u00e4llen Privateigentum in \u00f6ffentliches Eigentum umwandeln. Der Eigent\u00fcmer muss entsch\u00e4digt werden.", en: "The state may convert private property into public ownership in special cases. The owner must be compensated." } },
        { label: { de: "Art. 16 \u2013 Staatsangeh\u00f6rigkeit, Auslieferung", en: "Art. 16 \u2013 Nationality, Extradition" }, value: { de: "Niemand darf seine deutsche Staatsangeh\u00f6rigkeit verlieren, wenn er das nicht will. Auslieferung nur bei schweren Straftaten.", en: "No one may lose their German citizenship if they do not want to. Extradition only in cases of serious crimes." } },
        { label: { de: "Art. 16a \u2013 Asylrecht", en: "Art. 16a \u2013 Right of Asylum" }, value: { de: "Politisch Verfolgte haben in Deutschland Anspruch auf Asyl. Wer wegen Meinung, Religion oder Herkunft bedroht ist, kann Schutz beantragen.", en: "Politically persecuted persons have the right to asylum in Germany. Anyone threatened because of opinion, religion, or origin can apply for protection." } },
        { label: { de: "Art. 17 \u2013 Petitionsrecht", en: "Art. 17 \u2013 Right to Petition" }, value: { de: "Jeder darf sich mit Bitten oder Beschwerden an Beh\u00f6rden oder das Parlament wenden.", en: "Everyone may address requests or complaints to the authorities or Parliament." } },
        { label: { de: "Art. 17a \u2013 Einschr\u00e4nkung bei Wehrdienst", en: "Art. 17a \u2013 Restrictions During Military Service" }, value: { de: "Wer Wehrdienst oder Ersatzdienst leistet, kann einige Grundrechte wie Meinungsfreiheit und Streikrecht zeitweise nicht voll nutzen.", en: "Those serving in the military or performing alternative service cannot fully exercise certain fundamental rights such as freedom of expression and the right to strike." } },
        { label: { de: "Art. 18 \u2013 Grundrechtsverwirkung", en: "Art. 18 \u2013 Forfeiture of Fundamental Rights" }, value: { de: "Wer Grundrechte missbraucht, um die Demokratie zu bek\u00e4mpfen, kann diese Rechte verlieren. Ein Gericht entscheidet dar\u00fcber.", en: "Anyone who uses fundamental rights to combat democracy may lose these rights. A court will decide this." } },
        { label: { de: "Art. 19 \u2013 Einschr\u00e4nkung von Grundrechten, Rechtsweg", en: "Art. 19 \u2013 Restrictions on Fundamental Rights, Legal Recourse" }, value: { de: "Werden Grundrechte eingeschr\u00e4nkt, muss dies im Gesetz klar geregelt sein. Jeder hat das Recht, sich vor Gericht zu verteidigen.", en: "If fundamental rights are restricted, this must be clearly stated in the law. Everyone has the right to defend themselves in court." } },
        ],
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "19 Grundrechte in Artikel 1\u201319 des Grundgesetzes", en: "19 fundamental rights in Articles 1\u201319 of the Basic Law" } },
          { fact: { de: "Artikel 1 (Menschenw\u00fcrde) ist die wichtigste Grundlage aller Grundrechte", en: "Article 1 (Human dignity) is the most important foundation of all fundamental rights" } },
          { fact: { de: "Grundrechte gelten f\u00fcr alle Menschen in Deutschland", en: "Fundamental rights apply to all people in Germany" } },
          { fact: { de: "Nur Art. 9 (Asylrecht) gilt ausschlie\u00dflich f\u00fcr Ausl\u00e4nder", en: "Only Art. 16a (Right of asylum) applies exclusively to foreigners" } },
          { fact: { de: "Das Bundesverfassungsgericht in Karlsruhe sch\u00fctzt die Grundrechte", en: "The Federal Constitutional Court in Karlsruhe protects fundamental rights" } },
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
      de: "Die Staatsgewalt in Deutschland ist in drei Bereiche aufgeteilt: Legislative (gesetzgebende Gewalt), Exekutive (ausf\u00fchrende Gewalt) und Judikative (rechtsprechende Gewalt).",
      en: "State power in Germany is divided into three branches: Legislative (lawmaking), Executive (enforcement), and Judiciary (administration of justice).",
    },
    illustration: "\ud83d\udd31",
    relatedQuestionNumbers: [32, 42, 51, 54, 60, 63, 77, 136, 137, 143, 145, 148],
    details: {
      intro: {
        de: "In Deutschland sorgt die Gewaltenteilung daf\u00fcr, dass Macht getrennt ist. Es gibt drei Bereiche:",
        en: "In Germany, the separation of powers ensures that power is separated. There are three branches:",
      },
      gallery: [
        {
          src: "/images/topics/gewaltenteilung/bundestag.jpg",
          alt: { de: "Plenarsaal des Deutschen Bundestages", en: "Plenary hall of the German Bundestag" },
          caption: { de: "Legislative: Der Bundestag macht die Gesetze", en: "Legislative: The Bundestag makes the laws" },
        },
        {
          src: "/images/topics/gewaltenteilung/polizei.jpg",
          alt: { de: "Polizeifahrzeug in Deutschland", en: "Police vehicle in Germany" },
          caption: { de: "Exekutive: Die Polizei f\u00fchrt Gesetze aus", en: "Executive: The police enforce the laws" },
        },
        {
          src: "/images/topics/gewaltenteilung/justiz.jpg",
          alt: { de: "Richter am Bundesverfassungsgericht", en: "Judge at the Federal Constitutional Court" },
          caption: { de: "Judikative: Richter sprechen Recht", en: "Judiciary: Judges administer justice" },
        },
      ],
      table: {
        title: { de: "Die drei Gewalten", en: "The Three Branches" },
        rows: [
          { label: { de: "Legislative", en: "Legislative" }, value: { de: "Gesetzgebung (z.\u00a0B. Bundestag)", en: "Legislative power (e.g., the Bundestag)" }, image: "/images/topics/gewaltenteilung/bundestag.jpg" },
          { label: { de: "Exekutive", en: "Executive" }, value: { de: "Ausf\u00fchrende Gewalt (z.\u00a0B. Polizei)", en: "Executive power (e.g., the police)" }, image: "/images/topics/gewaltenteilung/polizei.jpg" },
          { label: { de: "Judikative", en: "Judiciary" }, value: { de: "Rechtsprechung (z.\u00a0B. Arbeitsgericht)", en: "Judicial power (e.g., labor courts)" }, image: "/images/topics/gewaltenteilung/justiz.jpg" },
        ],
      },
    },
  },
  {
    id: "schoffe",
    category: "staatsstruktur",
    title: { de: "Sch\u00f6ffe", en: "Lay Judge" },
    description: {
      de: "Ein Schöffe ist ein Laienrichter – kein Jurist, sondern ein einfacher Bürger. Schöffen arbeiten mit Berufsrichtern zusammen und entscheiden gemeinsam über Schuld und Strafe.",
      en: "A Schöffe is a lay judge – not a lawyer, but an ordinary citizen. Lay judges work alongside professional judges and decide jointly on guilt and punishment.",
    },
    illustration: "\u2696\ufe0f",
    relatedQuestionNumbers: [140, 141, 150],
    details: {
      intro: {
        de: "Ein „Schöffe“ ist ein Laienrichter. Er oder sie ist kein Jurist, sondern ein einfacher Bürger. Schöffen arbeiten mit Berufsrichtern zusammen und entscheiden gemeinsam über Schuld und Strafe.",
        en: "A “Schöffe” is a lay judge. He or she is not a lawyer, but an ordinary citizen. Lay judges work alongside professional judges and decide jointly on guilt and punishment.",
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Laienrichter \u2013 kein Jurist, sondern normaler B\u00fcrger", en: "Lay judge \u2013 not a lawyer, but an ordinary citizen" } },
          { fact: { de: "Arbeitet mit Berufsrichtern zusammen", en: "Works alongside professional judges" } },
          { fact: { de: "Entscheidet gemeinsam \u00fcber Schuld und Strafe", en: "Decides jointly on guilt and punishment" } },
          { fact: { de: "Ehrenamtliche T\u00e4tigkeit", en: "Voluntary (honorary) position" } },
        ],
      },
    },
  },
  {
    id: "wahlhelfer",
    category: "staatsstruktur",
    title: { de: "Wahlhelfer", en: "Election Workers" },
    description: {
      de: "Wahlhelfer unterst\u00fctzen die Durchf\u00fchrung einer Wahl am Wahltag. Es ist ein Ehrenamt \u2013 wer dazu aufgefordert wird, muss die Aufgabe annehmen!",
      en: "Election workers support the conduct of an election on election day. It is a voluntary position \u2013 anyone asked to do so must accept the task!",
    },
    illustration: "\ud83d\uddf3\ufe0f",
    relatedQuestionNumbers: [105, 106, 132, 133, 282],
    details: {
      intro: {
        de: "Wahlhelfer unterst\u00fctzen die Durchf\u00fchrung einer Wahl am Wahltag. Es ist ein Ehrenamt, f\u00fcr das man sich ernennen lassen kann. Wer dazu aufgefordert wird, muss die Aufgabe annehmen! Nur wer beispielsweise krank ist, darf die Aufgabe ablehnen.",
        en: "Election workers support the conduct of an election on election day. This is a voluntary position, for which one can be appointed. Anyone asked to do so must accept the task! Only those who are ill, for example, may refuse the task.",
      },
      image: {
        src: "/images/topics/wahlhelfer.svg",
        alt: {
          de: "Ablauf am Wahltag mit Wahlhelfern",
          en: "Election day process with election workers",
        },
        caption: {
          de: "Die Wahlhelfer pr\u00fcfen die Identit\u00e4t, geben Stimmzettel aus, beaufsichtigen die Wahlurne und z\u00e4hlen die Stimmen aus.",
          en: "Election workers verify identity, hand out ballots, supervise the ballot box and count the votes.",
        },
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Ehrenamtliche T\u00e4tigkeit am Wahltag", en: "Voluntary position on election day" } },
          { fact: { de: "Wer aufgefordert wird, muss die Aufgabe annehmen", en: "Anyone asked must accept the task" } },
          { fact: { de: "Nur bei Krankheit darf man ablehnen", en: "Only illness allows refusal" } },
          { fact: { de: "Man kann sich freiwillig ernennen lassen", en: "One can volunteer to be appointed" } },
          { fact: { de: "Unterst\u00fctzen die ordnungsgem\u00e4\u00dfe Durchf\u00fchrung der Wahl", en: "Support the proper conduct of the election" } },
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
  {
    id: "nachbarlaender",
    category: "staatsstruktur",
    title: { de: "Nachbarländer", en: "Neighboring Countries" },
    description: {
      de: "Deutschland hat neun Nachbarländer \u2013 so viele wie kein anderes europäisches Land. Im Uhrzeigersinn: Dänemark, Polen, Tschechien, Österreich, Schweiz, Frankreich, Luxemburg, Belgien und die Niederlande.",
      en: "Germany has nine neighboring countries \u2013 more than any other European country. Clockwise from the top: Denmark, Poland, the Czech Republic, Austria, Switzerland, France, Luxembourg, Belgium, and the Netherlands.",
    },
    illustration: "🌍",
    relatedQuestionNumbers: [167, 168, 176, 219, 222, 223, 225, 227, 229, 233, 237],
    details: {
      intro: {
        de: "Deutschland hat neun Nachbarländer. Im Uhrzeigersinn, von oben beginnend: Dänemark, Polen, Tschechien, Österreich, Schweiz, Frankreich, Luxemburg, Belgien und die Niederlande.",
        en: "Germany has nine neighboring countries. Clockwise, starting from the top: Denmark, Poland, the Czech Republic, Austria, Switzerland, France, Luxembourg, Belgium, and the Netherlands.",
      },
      image: {
        src: "/images/topics/nachbarlaender-map.svg",
        alt: {
          de: "Karte von Deutschland mit seinen neun Nachbarländern",
          en: "Map of Germany with its nine neighboring countries",
        },
        caption: {
          de: "Deutschland (gelb) und seine 9 Nachbarländer (grau)",
          en: "Germany (yellow) and its 9 neighboring countries (gray)",
        },
      },
      table: {
        title: { de: "Die 9 Nachbarländer", en: "The 9 Neighboring Countries" },
        rows: [
          { label: { de: "Norden", en: "North" }, value: { de: "Dänemark 🇩🇰", en: "Denmark 🇩🇰" } },
          { label: { de: "Nordosten", en: "Northeast" }, value: { de: "Polen 🇵🇱", en: "Poland 🇵🇱" } },
          { label: { de: "Osten", en: "East" }, value: { de: "Tschechien 🇨🇿", en: "Czech Republic 🇨🇿" } },
          { label: { de: "Südosten", en: "Southeast" }, value: { de: "Österreich 🇦🇹", en: "Austria 🇦🇹" } },
          { label: { de: "Süden", en: "South" }, value: { de: "Schweiz 🇨🇭", en: "Switzerland 🇨🇭" } },
          { label: { de: "Südwesten", en: "Southwest" }, value: { de: "Frankreich 🇫🇷", en: "France 🇫🇷" } },
          { label: { de: "Westen", en: "West" }, value: { de: "Luxemburg 🇱🇺", en: "Luxembourg 🇱🇺" } },
          { label: { de: "Westen", en: "West" }, value: { de: "Belgien 🇧🇪", en: "Belgium 🇧🇪" } },
          { label: { de: "Nordwesten", en: "Northwest" }, value: { de: "Niederlande 🇳🇱", en: "Netherlands 🇳🇱" } },
        ],
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Deutschland hat 9 Nachbarländer \u2013 die meisten in Europa", en: "Germany has 9 neighboring countries \u2013 the most in Europe" } },
          { fact: { de: "Deutschland ist Gründungsmitglied der EU", en: "Germany is a founding member of the EU" } },
          { fact: { de: "Große deutschsprachige Bevölkerungen gibt es auch in Österreich und der Schweiz", en: "Large German-speaking populations also exist in Austria and Switzerland" } },
          { fact: { de: "Die Grenzen von heute bestehen seit der Wiedervereinigung 1990", en: "Today's borders have existed since reunification in 1990" } },
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
      de: "Das deutsche Sozialversicherungssystem umfasst f\u00fcnf S\u00e4ulen: Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung. Es sch\u00fctzt B\u00fcrger vor Lebensrisiken.",
      en: "The German social insurance system has five pillars: health, long-term care, pension, unemployment, and accident insurance. It protects citizens from life risks.",
    },
    illustration: "\ud83c\udfe5",
    relatedQuestionNumbers: [34, 35, 36, 45, 97, 99, 100, 259, 285],
    details: {
      intro: {
        de: "In Deutschland gibt es f\u00fcnf Sozialversicherungssysteme. Diese Versicherungen sind Pflicht f\u00fcr alle Arbeitnehmer. Arbeitgeber \u00fcbernehmen etwa die H\u00e4lfte der Sozialabgaben, die andere H\u00e4lfte wird vom Gehalt der Arbeitnehmer abgezogen.",
        en: "There are five social insurance systems in Germany. These insurances are mandatory for all employees. Employers pay about half of the social security contributions, the other half is deducted from employees' salaries.",
      },
      image: {
        src: "/images/topics/sozialversicherung/krankenversicherung.jpg",
        alt: { de: "Charité Krankenhaus Berlin", en: "Charité Hospital Berlin" },
        caption: { de: "Die Charité in Berlin – eines der bekanntesten Krankenhäuser Deutschlands", en: "The Charité in Berlin – one of Germany's most famous hospitals" },
      },
      gallery: [
        { src: "/images/topics/sozialversicherung/krankenversicherung.jpg", alt: { de: "Charité Krankenhaus Berlin", en: "Charité Hospital Berlin" }, caption: { de: "Krankenversicherung – Gesundheitsschutz", en: "Health insurance – healthcare protection" } },
        { src: "/images/topics/sozialversicherung/pflegeversicherung.jpg", alt: { de: "Seniorenheim in Berlin", en: "Senior home in Berlin" }, caption: { de: "Pflegeversicherung – Schutz bei Pflegebedürftigkeit", en: "Long-term care insurance – protection when care is needed" } },
        { src: "/images/topics/sozialversicherung/rentenversicherung.jpg", alt: { de: "Deutsche Rentenversicherung Bayern Süd", en: "German Pension Insurance Bavaria South" }, caption: { de: "Rentenversicherung – Absicherung im Alter", en: "Pension insurance – security in old age" } },
        { src: "/images/topics/sozialversicherung/arbeitslosenversicherung.jpg", alt: { de: "Agentur für Arbeit", en: "Federal Employment Agency" }, caption: { de: "Arbeitslosenversicherung – Hilfe bei Jobverlust", en: "Unemployment insurance – help when losing a job" } },
        { src: "/images/topics/sozialversicherung/unfallversicherung.jpg", alt: { de: "Berufsgenossenschaft Berlin", en: "Professional Association Berlin" }, caption: { de: "Unfallversicherung – Schutz bei Arbeitsunfällen", en: "Accident insurance – protection from workplace accidents" } },
      ],
      table: {
        title: { de: "Die f\u00fcnf S\u00e4ulen", en: "The Five Pillars" },
        rows: [
          { label: { de: "1", en: "1" }, value: { de: "Krankenversicherung", en: "Health insurance" }, image: "/images/topics/sozialversicherung/krankenversicherung.jpg" },
          { label: { de: "2", en: "2" }, value: { de: "Pflegeversicherung", en: "Long-term care insurance" }, image: "/images/topics/sozialversicherung/pflegeversicherung.jpg" },
          { label: { de: "3", en: "3" }, value: { de: "Rentenversicherung", en: "Pension insurance" }, image: "/images/topics/sozialversicherung/rentenversicherung.jpg" },
          { label: { de: "4", en: "4" }, value: { de: "Arbeitslosenversicherung", en: "Unemployment insurance" }, image: "/images/topics/sozialversicherung/arbeitslosenversicherung.jpg" },
          { label: { de: "5", en: "5" }, value: { de: "Unfallversicherung", en: "Accident insurance" }, image: "/images/topics/sozialversicherung/unfallversicherung.jpg" },
        ],
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Pflicht f\u00fcr alle Arbeitnehmer", en: "Mandatory for all employees" } },
          { fact: { de: "Arbeitgeber und Arbeitnehmer teilen sich die Sozialabgaben (ca. 50/50)", en: "Employers and employees share social security contributions (approx. 50/50)" } },
          { fact: { de: "Eine Lebensversicherung geh\u00f6rt nicht zu den Sozialversicherungen \u2013 sie ist privat", en: "Life insurance is not part of social security \u2013 it is private" } },
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
  {
    id: "feiertage",
    category: "gesellschaft",
    title: { de: "Feiertage", en: "Holidays" },
    description: {
      de: "Deutschland hat viele traditionelle Feiertage, die zum Teil christlichen Ursprungs sind. Diese Br\u00e4uche sind wichtiger Teil der deutschen Kultur.",
      en: "Germany has many traditional holidays, some of Christian origin. These customs are an important part of German culture.",
    },
    illustration: "\ud83c\udf84",
    relatedQuestionNumbers: [264, 271, 293, 294, 296],
    details: {
      table: {
        title: { de: "Feiertage & Br\u00e4uche", en: "Holidays & Customs" },
        rows: [
          { label: { de: "Rosenmontag", en: "Rose Monday" }, value: { de: "Menschen tragen bunte Kost\u00fcme und Masken.", en: "People wear colorful costumes and masks." }, image: "/images/topics/feiertage/rosenmontag.jpg" },
          { label: { de: "Ostern", en: "Easter" }, value: { de: "Es ist ein Brauch, Eier zu bemalen.", en: "It is a custom to paint eggs." }, image: "/images/topics/feiertage/ostern.jpg" },
          { label: { de: "Pfingsten", en: "Pentecost" }, value: { de: "Christlicher Feiertag.", en: "A Christian holiday." }, image: "/images/topics/feiertage/pfingsten.jpg" },
          { label: { de: "Adventszeit", en: "Advent" }, value: { de: "Die letzten vier Wochen vor Weihnachten.", en: "The last four weeks before Christmas." }, image: "/images/topics/feiertage/adventszeit.jpg" },
          { label: { de: "Weihnachten", en: "Christmas" }, value: { de: "Tannenb\u00e4ume werden geschm\u00fcckt.", en: "Christmas trees are decorated." }, image: "/images/topics/feiertage/weihnachten.jpg" },
        ],
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Rosenmontag: H\u00f6hepunkt des Karnevals / Faschings", en: "Rose Monday: highlight of Carnival" } },
          { fact: { de: "Ostern: Auferstehung Jesu Christi \u2013 Eier bemalen ist Brauch", en: "Easter: Resurrection of Jesus Christ \u2013 painting eggs is a custom" } },
          { fact: { de: "Pfingsten: 50 Tage nach Ostern \u2013 christlicher Feiertag", en: "Pentecost: 50 days after Easter \u2013 Christian holiday" } },
          { fact: { de: "Adventszeit: 4 Wochen vor Weihnachten mit Adventskranz", en: "Advent: 4 weeks before Christmas with Advent wreath" } },
          { fact: { de: "Weihnachten: 25./26. Dezember \u2013 Tannenbaum und Geschenke", en: "Christmas: Dec 25/26 \u2013 Christmas tree and gifts" } },
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
      de: "Die Zeit des Nationalsozialismus (1933\u20131945) unter Adolf Hitler war gepr\u00e4gt von Diktatur, Krieg und dem Holocaust. Diese Geschichte mahnt zur Wachsamkeit f\u00fcr die Demokratie.",
      en: "The era of National Socialism (1933\u20131945) under Adolf Hitler was marked by dictatorship, war, and the Holocaust. This history serves as a warning to protect democracy.",
    },
    illustration: "\u26a0\ufe0f",
    relatedQuestionNumbers: [96, 149, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 170, 179, 206, 220, 288],
    details: {
      intro: {
        de: "Von 1933 bis 1945 regierten die Nationalsozialisten unter Adolf Hitler Deutschland. Sie errichteten eine Diktatur, den sogenannten \u201eNS-Staat\u201c beziehungsweise das \u201eDritte Reich\u201c. In dieser Zeit wurden Demokratie und Meinungsfreiheit abgeschafft. Es gab keine freien Wahlen, stattdessen Pressezensur und willk\u00fcrliche Verhaftungen. Der NS-Staat war durch staatlichen Rassismus gepr\u00e4gt: Juden und andere Minderheiten wurden systematisch verfolgt.",
        en: "From 1933 to 1945, the National Socialists under Adolf Hitler ruled Germany. They established a dictatorship, the so-called \u201cNazi State\u201d or \u201cThird Reich.\u201d In this period, democracy and freedom of expression were abolished. There were no free elections but press censorship and arbitrary arrests. The Nazi state was characterized by state racism: Jews and other minorities were systematically persecuted.",
      },
      table: {
        title: { de: "Zeitleiste", en: "Timeline" },
        rows: [
          { label: { de: "30. Jan. 1933", en: "Jan. 30, 1933" }, value: { de: "Adolf Hitler wird Reichskanzler", en: "Adolf Hitler becomes Chancellor" }, image: "/images/topics/nationalsozialismus/hitler-chancellor.jpg" },
          { label: { de: "9. Nov. 1938", en: "Nov. 9, 1938" }, value: { de: "\u201eReichspogromnacht\u201c: Zerst\u00f6rung von Synagogen und j\u00fcdischen Gesch\u00e4ften in ganz Deutschland", en: "\u201cReichskristallnacht\u201d: Destruction of synagogues and Jewish businesses throughout Germany" }, image: "/images/topics/nationalsozialismus/reichspogromnacht.jpg" },
          { label: { de: "1939\u20131945", en: "1939\u20131945" }, value: { de: "Der Zweite Weltkrieg", en: "World War II" }, image: "/images/topics/nationalsozialismus/wwii.jpg" },
          { label: { de: "20. Juli 1944", en: "July 20, 1944" }, value: { de: "Gescheitertes Attentat auf Hitler. Claus Schenk Graf von Stauffenberg war beteiligt.", en: "Failed assassination attempt on Hitler. Claus Schenk Graf von Stauffenberg was involved." }, image: "/images/topics/nationalsozialismus/stauffenberg.jpg" },
          { label: { de: "27. Jan. 1945", en: "Jan. 27, 1945" }, value: { de: "Befreiung des Konzentrationslagers Auschwitz. Heute ist dieser Tag offizieller Gedenktag.", en: "Liberation of the Auschwitz concentration camp. Today is an official day of remembrance." }, image: "/images/topics/nationalsozialismus/auschwitz.jpg" },
          { label: { de: "8. Mai 1945", en: "May 8, 1945" }, value: { de: "Ende des Zweiten Weltkriegs in Europa. Deutschland kapituliert bedingungslos.", en: "End of World War II in Europe. Germany surrenders unconditionally." }, image: "/images/topics/nationalsozialismus/kapitulation.jpg" },
        ],
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Staatsform: Diktatur (\u201eDrittes Reich\u201c / \u201eNS-Staat\u201c)", en: "Form of state: Dictatorship (\u201cThird Reich\u201d / \u201cNazi State\u201d)" } },
          { fact: { de: "Keine freien Wahlen, Pressezensur, willk\u00fcrliche Verhaftungen, keine Meinungsfreiheit", en: "No free elections, press censorship, arbitrary arrests, no freedom of expression" } },
          { fact: { de: "Holocaust: Systematische Verfolgung und Ermordung von 6 Millionen Juden und anderen Minderheiten", en: "Holocaust: Systematic persecution and murder of 6 million Jews and other minorities" } },
          { fact: { de: "27. Januar \u2013 Befreiung von Auschwitz (offizieller Gedenktag)", en: "January 27 \u2013 Liberation of Auschwitz (official day of remembrance)" } },
          { fact: { de: "Stolpersteine in Gehwegen erinnern an Opfer des Nationalsozialismus", en: "Stolpersteine (stumbling stones) in sidewalks commemorate victims of National Socialism" } },
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
        src: "/images/topics/ddr-map.jpeg",
        alt: {
          de: "Karte von Deutschland mit den DDR-Bundesländern",
          en: "Map of Germany showing the GDR states",
        },
        caption: {
          de: `Die 5 DDR-Bundesländer sind dunkel markiert.\nQuelle: Kartographie von IEG-MAPS, Institut für Europäische Geschichte, Mainz, A. Kunz, 2005. Überarbeitete Kartographie (WCAG-Konform) von Gabriel Moss, 2021. “Länder der DDR (1949),” German History in Documents and Images, https://germanhistorydocs.org/de/die-besatzungszeit-und-die-entstehung-zweier-staaten-1945-1961/laender-der-ddr-1949 [13.04.2026].`,
          en: `The 5 GDR states are shown in dark.\nSource: Cartography by IEG-MAPS, Institute for European History, Mainz, A. Kunz, 2005. Revised cartography (WCAG-compliant) by Gabriel Moss, 2021. “States of the GDR (1949),” German History in Documents and Images, https://germanhistorydocs.org/en/occupation-and-the-emergence-of-two-states-1945-1961/states-of-the-gdr-1949 [accessed April 13, 2026].`,
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
    id: "ewg-roemische-vertraege",
    category: "geschichte",
    title: { de: "EWG – Römische Verträge", en: "EEC – Treaty of Rome" },
    description: {
      de: "1957 unterzeichneten sechs Länder in Rom die Römischen Verträge und gründeten die Europäische Wirtschaftsgemeinschaft (EWG). Ziel war ein gemeinsamer Markt ohne Zölle.",
      en: "In 1957, six countries signed the Treaty of Rome and established the European Economic Community (EEC). The goal was a common market without tariffs.",
    },
    illustration: "\ud83c\uddea\ud83c\uddfa",
    relatedQuestionNumbers: [173, 237, 239],
    details: {
      intro: {
        de: "1957 unterzeichneten in Rom sechs Länder (Belgien, Deutschland, Frankreich, Italien, Luxemburg und die Niederlande) die Römischen Verträge. Damit gründeten sie die Europäische Wirtschaftsgemeinschaft (EWG) und die Europäische Atomgemeinschaft (Euratom). Ziel war ein gemeinsamer Markt ohne Zölle.",
        en: "In 1957, six countries (Belgium, Germany, France, Italy, Luxembourg, and the Netherlands) signed the Treaty of Rome in Rome. They thus established the European Economic Community (EEC) and the European Atomic Energy Community (Euratom). The goal was a common market without tariffs.",
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "1957: Unterzeichnung der Römischen Verträge", en: "1957: Signing of the Treaty of Rome" } },
          { fact: { de: "6 Gründungsmitglieder: Belgien, Deutschland, Frankreich, Italien, Luxemburg, Niederlande", en: "6 founding members: Belgium, Germany, France, Italy, Luxembourg, Netherlands" } },
          { fact: { de: "Gründung von EWG und Euratom", en: "Establishment of EEC and Euratom" } },
          { fact: { de: "Ziel: Gemeinsamer Markt ohne Zölle", en: "Goal: Common market without tariffs" } },
        ],
      },
    },
  },
  {
    id: "eg-1967",
    category: "geschichte",
    title: { de: "EG (1967)", en: "EC (1967)" },
    description: {
      de: "Die Europ\u00e4ische Gemeinschaft (EG) entstand 1967 durch die Zusammenlegung von EWG, Euratom und EGKS (Europ\u00e4ische Gemeinschaft f\u00fcr Kohle und Stahl).",
      en: "The European Community (EC) was created in 1967 through the merger of the EEC, Euratom, and ECSC (European Coal and Steel Community).",
    },
    illustration: "\ud83c\uddea\ud83c\uddfa",
    relatedQuestionNumbers: [173, 237, 239],
    details: {
      intro: {
        de: "Die Europ\u00e4ische Gemeinschaft (EG) entstand 1967 durch die Zusammenlegung der EWG, Euratom (Europ\u00e4ische Atomgemeinschaft) und EGKS (Europ\u00e4ische Gemeinschaft f\u00fcr Kohle und Stahl).",
        en: "The European Community (EC) was created in 1967 through the merger of the EEC, Euratom (European Atomic Energy Community), and ECSC (European Coal and Steel Community).",
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "1967: Zusammenlegung von EWG, Euratom und EGKS zur EG", en: "1967: Merger of EEC, Euratom and ECSC into EC" } },
          { fact: { de: "EGKS = Europ\u00e4ische Gemeinschaft f\u00fcr Kohle und Stahl", en: "ECSC = European Coal and Steel Community" } },
          { fact: { de: "Vorg\u00e4nger der heutigen Europ\u00e4ischen Union", en: "Predecessor of today's European Union" } },
        ],
      },
    },
  },
  {
    id: "ostvertr\u00e4ge",
    category: "geschichte",
    title: { de: "Ostvertr\u00e4ge (1972)", en: "Eastern Treaties (1972)" },
    description: {
      de: "Die Ostvertr\u00e4ge verbesserten das Verh\u00e4ltnis zwischen der Bundesrepublik Deutschland und den Staaten Osteuropas. Sie geh\u00f6rten zur Entspannungspolitik w\u00e4hrend des Kalten Krieges.",
      en: "The Eastern Treaties improved relations between the Federal Republic of Germany and the states of Eastern Europe. They were part of the policy of d\u00e9tente during the Cold War.",
    },
    illustration: "\ud83e\udd1d",
    relatedQuestionNumbers: [181, 185, 202, 207, 211],
    details: {
      intro: {
        de: "Die Ostvertr\u00e4ge verbesserten das Verh\u00e4ltnis zwischen der Bundesrepublik Deutschland und den Staaten Osteuropas (besonders Polen und die Sowjetunion). Sie geh\u00f6rten zur Entspannungspolitik w\u00e4hrend des Kalten Krieges.",
        en: "The Eastern Treaties improved relations between the Federal Republic of Germany and the states of Eastern Europe (especially Poland and the Soviet Union). They were part of the policy of d\u00e9tente during the Cold War.",
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Entspannungspolitik w\u00e4hrend des Kalten Krieges", en: "Policy of d\u00e9tente during the Cold War" } },
          { fact: { de: "Verbesserung der Beziehungen zu Polen und der Sowjetunion", en: "Improved relations with Poland and the Soviet Union" } },
          { fact: { de: "Bundeskanzler Willy Brandt war der Architekt der Ostpolitik", en: "Chancellor Willy Brandt was the architect of Ostpolitik" } },
          { fact: { de: "Willy Brandts Kniefall 1970 in Warschau \u2013 Symbol der Vers\u00f6hnung", en: "Willy Brandt\u2019s genuflection in Warsaw 1970 \u2013 symbol of reconciliation" } },
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
      intro: {
        de: "Westberlin lag wie eine Insel mitten in der DDR. Damit niemand in den Westen fliehen konnte, baute die DDR eine Mauer rund um Westberlin. Auch die Grenze zu Ostberlin wurde geschlossen. Die Mauer stand fast 30 Jahre. 1989 wurde sie geöffnet. Seitdem ist Berlin wieder eine Stadt.",
        en: "West Berlin lay like an island in the middle of the GDR. To prevent anyone from escaping to the West, the GDR built a wall around West Berlin. The border with East Berlin was also closed. The wall stood for almost 30 years. It was reopened in 1989. Since then, Berlin has been a city again.",
      },
      image: {
        src: "/images/topics/berlin-wall-map.svg",
        alt: {
          de: "Karte von Berlin mit der Berliner Mauer 1961",
          en: "Map of Berlin with the Berlin Wall 1961",
        },
        caption: {
          de: "Westberlin (hell) war von der Mauer (rot) umgeben, Ostberlin (dunkel) gehörte zur DDR",
          en: "West Berlin (light) was surrounded by the Wall (red), East Berlin (dark) belonged to the GDR",
        },
      },
      gallery: [
        {
          src: "/images/topics/berlin-wall/wall-1961.jpg",
          alt: { de: "Die Berliner Mauer 1961", en: "The Berlin Wall 1961" },
          caption: { de: "Bau der Berliner Mauer, 1961", en: "Construction of the Berlin Wall, 1961" },
        },
        {
          src: "/images/topics/berlin-wall/wall-fall-1989.jpg",
          alt: { de: "Fall der Berliner Mauer 1989", en: "Fall of the Berlin Wall 1989" },
          caption: { de: "Fall der Mauer, 9. November 1989", en: "Fall of the Wall, November 9, 1989" },
        },
        {
          src: "/images/topics/berlin-wall/east-side-gallery.jpg",
          alt: { de: "East Side Gallery heute", en: "East Side Gallery today" },
          caption: { de: "East Side Gallery \u2013 Mauerkunst als Denkmal heute", en: "East Side Gallery \u2013 Wall art as a memorial today" },
        },
      ],
      table: {
        title: { de: "Zeitleiste", en: "Timeline" },
        rows: [
          { label: { de: "13. Aug. 1961", en: "Aug. 13, 1961" }, value: { de: "Bau der Berliner Mauer beginnt", en: "Construction of the Berlin Wall begins" } },
          { label: { de: "1961\u20131989", en: "1961\u20131989" }, value: { de: "Mauer teilt Berlin in Ost und West", en: "Wall divides Berlin into East and West" } },
          { label: { de: "9. Nov. 1989", en: "Nov. 9, 1989" }, value: { de: "Fall der Berliner Mauer", en: "Fall of the Berlin Wall" } },
          { label: { de: "1990", en: "1990" }, value: { de: "Mauer wird fast vollständig abgerissen", en: "Wall is almost completely demolished" } },
        ],
      },
      keyFacts: {
        title: { de: "Wichtige Fakten", en: "Key Facts" },
        items: [
          { fact: { de: "Die Mauer war ca. 155 km lang (43 km durch die Stadt, 112 km um Westberlin)", en: "The Wall was approx. 155 km long (43 km through the city, 112 km around West Berlin)" } },
          { fact: { de: "Mindestens 140 Menschen starben bei Fluchtversuchen an der Mauer", en: "At least 140 people died attempting to cross the Wall" } },
          { fact: { de: "Die Mauer stand fast 30 Jahre (28 Jahre, 2 Monate, 27 Tage)", en: "The Wall stood for almost 30 years (28 years, 2 months, 27 days)" } },
          { fact: { de: "Der 9. November 1989 ist ein wichtiger Gedenktag in Deutschland", en: "November 9, 1989 is an important day of remembrance in Germany" } },
          { fact: { de: "Reste der Mauer stehen heute noch als Denkmal (East Side Gallery)", en: "Remnants of the Wall still stand today as a memorial (East Side Gallery)" } },
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
  {
    id: "wichtige-jahreszahlen",
    category: "geschichte",
    title: { de: "Wichtige Jahreszahlen", en: "Important Dates & Years" },
    description: {
      de: "Eine \u00dcbersicht aller wichtigen Jahreszahlen und Daten, die f\u00fcr den Einb\u00fcrgerungstest relevant sind \u2013 von 1933 bis 2002.",
      en: "An overview of all important dates and years relevant for the citizenship test \u2013 from 1933 to 2002.",
    },
    illustration: "\ud83d\udcc5",
    relatedQuestionNumbers: [70, 152, 153, 154, 155, 156, 157, 160, 162, 163, 164, 166, 169, 174, 176, 178, 181, 186, 188, 189, 191, 193, 196, 210, 217, 218, 219, 228, 237, 240],
    details: {
      intro: {
        de: "Viele Fragen im Einb\u00fcrgerungstest beziehen sich auf wichtige Jahreszahlen der deutschen Geschichte. Hier sind alle pr\u00fcfungsrelevanten Daten auf einen Blick.",
        en: "Many questions in the citizenship test refer to important dates in German history. Here are all exam-relevant dates at a glance.",
      },
      table: {
        title: { de: "Chronologische \u00dcbersicht", en: "Chronological Overview" },
        rows: [
          { label: { de: "30. Jan. 1933", en: "Jan. 30, 1933" }, value: { de: "Hitler wird Reichskanzler \u2013 Beginn der NS-Diktatur", en: "Hitler becomes Reich Chancellor \u2013 beginning of the Nazi dictatorship" } },
          { label: { de: "1933\u20131945", en: "1933\u20131945" }, value: { de: "Zeit des Nationalsozialismus in Deutschland", en: "Period of National Socialism in Germany" } },
          { label: { de: "9. Nov. 1938", en: "Nov. 9, 1938" }, value: { de: "Reichspogromnacht \u2013 Zerst\u00f6rung von Synagogen und j\u00fcdischen Gesch\u00e4ften", en: "Reichspogromnacht \u2013 destruction of synagogues and Jewish businesses" } },
          { label: { de: "1939\u20131945", en: "1939\u20131945" }, value: { de: "Zweiter Weltkrieg", en: "World War II" } },
          { label: { de: "20. Juli 1944", en: "Jul. 20, 1944" }, value: { de: "Attentat auf Hitler durch Claus Schenk Graf von Stauffenberg", en: "Assassination attempt on Hitler by Claus Schenk Graf von Stauffenberg" } },
          { label: { de: "8. Mai 1945", en: "May 8, 1945" }, value: { de: "Ende des Zweiten Weltkriegs in Europa (Kapitulation Deutschlands)", en: "End of World War II in Europe. Germany surrenders unconditionally." } },
          { label: { de: "1945", en: "1945" }, value: { de: "Deutschland wird in vier Besatzungszonen aufgeteilt (USA, GB, Frankreich, Sowjetunion)", en: "Germany is divided into four occupation zones (USA, UK, France, Soviet Union)" } },
          { label: { de: "Juni 1948 \u2013 Mai 1949", en: "Jun. 1948 \u2013 May 1949" }, value: { de: "Berliner Luftbr\u00fccke \u2013 Versorgung West-Berlins durch die Westalliierten", en: "Berlin Airlift \u2013 supply of West Berlin by Western Allies" } },
          { label: { de: "23. Mai 1949", en: "May 23, 1949" }, value: { de: "Gr\u00fcndung der Bundesrepublik Deutschland (Grundgesetz tritt in Kraft)", en: "Founding of the Federal Republic of Germany (Basic Law takes effect)" } },
          { label: { de: "7. Okt. 1949", en: "Oct. 7, 1949" }, value: { de: "Gr\u00fcndung der DDR (Deutsche Demokratische Republik)", en: "Founding of the GDR (German Democratic Republic)" } },
          { label: { de: "17. Juni 1953", en: "Jun. 17, 1953" }, value: { de: "Volksaufstand in der DDR \u2013 wurde fr\u00fcher als \u201eTag der deutschen Einheit\u201c gefeiert", en: "People\u2019s uprising in the GDR \u2013 formerly celebrated as \u2018Day of German Unity\u2019" } },
          { label: { de: "1957", en: "1957" }, value: { de: "Römische Verträge – Gründung der EWG (6 Länder)", en: "Treaty of Rome – founding of the EEC (6 countries)" } },
          { label: { de: "13. Aug. 1961", en: "Aug. 13, 1961" }, value: { de: "Bau der Berliner Mauer", en: "Construction of the Berlin Wall" } },
          { label: { de: "1961\u20131989", en: "1961\u20131989" }, value: { de: "Berlin war geteilt (Ost und West)", en: "Berlin was divided (East and West)" } },
          { label: { de: "1967", en: "1967" }, value: { de: "Zusammenlegung von EWG, Euratom und EGKS zur EG", en: "Merger of EEC, Euratom and ECSC into EC" } },
          { label: { de: "7. Dez. 1970", en: "Dec. 7, 1970" }, value: { de: "Willy Brandts Kniefall in Warschau \u2013 Symbol der Vers\u00f6hnung (Ostpolitik)", en: "Willy Brandt\u2019s genuflection in Warsaw 1970 \u2013 symbol of reconciliation (Ostpolitik)" } },
          { label: { de: "1974", en: "1974" }, value: { de: "Helmut Schmidt wird Bundeskanzler (Ernennungsurkunde von Pr\u00e4sident Heinemann)", en: "Helmut Schmidt becomes Chancellor (appointed by President Heinemann)" } },
          { label: { de: "1985", en: "1985" }, value: { de: "Schengener Abkommen \u2013 Reisen ohne Passkontrolle in Europa", en: "Schengen Agreement \u2013 travel without passport control in Europe" } },
          { label: { de: "Herbst 1989", en: "Autumn 1989" }, value: { de: "\u201eDie Wende\u201c \u2013 friedliche Revolution in der DDR (\u201eWir sind das Volk!\u201c)", en: "\u2018Die Wende\u2019 \u2013 peaceful revolution in the GDR (\u2018We are the people!\u2019)" } },
          { label: { de: "9. Nov. 1989", en: "Nov. 9, 1989" }, value: { de: "Fall der Berliner Mauer", en: "Fall of the Berlin Wall" } },
          { label: { de: "18. M\u00e4rz 1990", en: "Mar. 18, 1990" }, value: { de: "Erste freie Volkskammerwahl in der DDR", en: "First free election in the GDR" } },
          { label: { de: "3. Okt. 1990", en: "Oct. 3, 1990" }, value: { de: "Tag der Deutschen Einheit \u2013 Wiedervereinigung (5 neue Bundesl\u00e4nder)", en: "Day of German Unity \u2013 Reunification (5 new federal states)" } },
          { label: { de: "1993", en: "1993" }, value: { de: "Vertrag von Maastricht \u2013 Gr\u00fcndung der Europ\u00e4ischen Union (EU)", en: "Maastricht Treaty \u2013 founding of the European Union (EU)" } },
          { label: { de: "2002", en: "2002" }, value: { de: "Einf\u00fchrung des Euro als Bargeld in Deutschland", en: "Introduction of the Euro as cash currency in Germany" } },
          { label: { de: "2007", en: "2007" }, value: { de: "50-jähriges Jubiläum der Römischen Verträge", en: "50th anniversary of the Treaty of Rome" } },
        ],
      },
      keyFacts: {
        title: { de: "Ged\u00e4chtnishilfe", en: "Memory Aids" },
        items: [
          { fact: { de: "9. November: Dreifach wichtig \u2013 1918 (Ausrufung der Republik), 1938 (Reichspogromnacht), 1989 (Mauerfall)", en: "November 9: Triple significance \u2013 1918 (Republic proclaimed), 1938 (Reichspogromnacht), 1989 (Fall of the Wall)" } },
          { fact: { de: "1949: Doppelgr\u00fcndung \u2013 BRD (Mai) und DDR (Oktober)", en: "1949: Double founding \u2013 FRG (May) and GDR (October)" } },
          { fact: { de: "1961\u20131989: Dauer der Berliner Mauer (28 Jahre)", en: "1961\u20131989: Duration of the Berlin Wall (28 years)" } },
          { fact: { de: "EWG (1957) \u2192 EG (1967) \u2192 EU (1993): Europ\u00e4ische Integration", en: "EEC (1957) \u2192 EC (1967) \u2192 EU (1993): European integration" } },
          { fact: { de: "Drei wichtige 3. Oktober: 1990 = Wiedervereinigung = Nationalfeiertag", en: "Key October 3: 1990 = Reunification = National Holiday" } },
        ],
      },
    },
  },
];
