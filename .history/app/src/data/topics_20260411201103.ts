export interface TopicTableRow {
  label: { de: string; en: string };
  value: { de: string; en: string };
}

export interface TopicKeyFact {
  fact: { de: string; en: string };
}

export interface TopicDetails {
  intro?: { de: string; en: string };
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
          { label: { de: "1949–1963", en: "1949–1963" }, value: { de: "Konrad Adenauer", en: "Konrad Adenauer" } },
          { label: { de: "1963–1966", en: "1963–1966" }, value: { de: "Ludwig Erhard", en: "Ludwig Erhard" } },
          { label: { de: "1966–1969", en: "1966–1969" }, value: { de: "Georg Kiesinger", en: "Georg Kiesinger" } },
          { label: { de: "1969–1974", en: "1969–1974" }, value: { de: "Willy Brandt", en: "Willy Brandt" } },
          { label: { de: "1974–1982", en: "1974–1982" }, value: { de: "Helmut Schmidt", en: "Helmut Schmidt" } },
          { label: { de: "1982–1998", en: "1982–1998" }, value: { de: "Helmut Kohl", en: "Helmut Kohl" } },
          { label: { de: "1998–2005", en: "1998–2005" }, value: { de: "Gerhard Schröder", en: "Gerhard Schröder" } },
          { label: { de: "2005–2021", en: "2005–2021" }, value: { de: "Angela Merkel", en: "Angela Merkel" } },
          { label: { de: "2021–2025", en: "2021–2025" }, value: { de: "Olaf Scholz", en: "Olaf Scholz" } },
          { label: { de: "Seit 2025", en: "Since 2025" }, value: { de: "Friedrich Merz", en: "Friedrich Merz" } },
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
    relatedQuestionNumbers: [30, 34, 41, 52, 61, 125, 158, 161, 196],
  },
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
    relatedQuestionNumbers: [42, 52, 55, 58, 61, 63, 74, 80, 86, 136, 137, 139, 141, 142, 146, 150],
  },

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
  },
];
