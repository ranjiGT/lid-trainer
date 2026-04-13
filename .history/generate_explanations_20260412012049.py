#!/usr/bin/env python3
"""Generate bilingual explanations for Leben in Deutschland test questions."""

import json
import re

def generate_explanation(q):
    """Generate a bilingual explanation for a question."""
    question = q["question"]
    options = q["options"]
    correct_idx = q["correct"]
    correct = options[correct_idx]
    num = q["number"]
    
    # Clean up the correct answer (remove trailing periods)
    correct_clean = correct.rstrip(".")
    
    # Try to form a natural explanation
    de, en = smart_explanation(question, correct_clean, correct, options, num)
    
    return {"de": de, "en": en}


def smart_explanation(question, correct_clean, correct, options, num):
    """Generate smart explanations based on question patterns."""
    
    # Pattern: "... , weil …" or "..., weil ..."
    if ", weil" in question.lower() or "weil …" in question.lower() or "weil..." in question.lower():
        # Completion question about reason
        q_stem = re.split(r',?\s*weil\s*[…\.]+\s*$', question, flags=re.IGNORECASE)[0].strip()
        de = f"{q_stem}, weil {correct_clean}."
        en = None  # Will be filled by translation patterns
    
    # Pattern: "Was bedeutet ...?" 
    elif question.lower().startswith("was bedeutet"):
        de = f"{correct_clean}."
        en = None
    
    # Pattern: "Was versteht man unter ...?"
    elif "was versteht man unter" in question.lower():
        de = f"{correct_clean}."
        en = None
    
    # Pattern: "Was ist ...?" 
    elif re.match(r"Was ist\b", question):
        de = f"{correct_clean}."
        en = None
        
    # Pattern: Questions ending with "…" (completion)
    elif question.rstrip().endswith("…") or question.rstrip().endswith("..."):
        q_stem = question.rstrip().rstrip("…").rstrip(".").rstrip()
        de = f"{q_stem} {correct_clean}."
        en = None
    
    # Pattern: "Welches/Welche/Welcher ... ?"
    elif question.lower().startswith("welch"):
        de = f"Die richtige Antwort ist: {correct_clean}."
        en = None
    
    # Pattern: "Wer ...?"
    elif question.lower().startswith("wer "):
        de = f"{correct_clean}."
        en = None
    
    # Pattern: "Wo ...?"
    elif question.lower().startswith("wo "):
        de = f"{correct_clean}."
        en = None
    
    # Pattern: "Wann ...?"
    elif question.lower().startswith("wann "):
        de = f"{correct_clean}."
        en = None
    
    # Pattern: "Wie ...?"
    elif question.lower().startswith("wie "):
        de = f"{correct_clean}."
        en = None
        
    # Pattern: "Warum ...?"
    elif question.lower().startswith("warum"):
        de = f"{correct_clean}."
        en = None
    
    # Default: state the answer
    else:
        de = f"Die richtige Antwort ist: {correct_clean}."
        en = None
    
    # Now create better explanations with context
    de, en = enhance_explanation(de, en, question, correct_clean, correct, options, num)
    
    return de, en


# Mapping of specific question numbers to hand-crafted explanations
SPECIFIC_EXPLANATIONS = {
    1: {
        "de": "In Deutschland können die Menschen ihre Meinung offen äußern, auch gegen die Regierung. Möglich macht das Artikel 5 des Grundgesetzes zur Meinungsfreiheit.",
        "en": "In Germany, people can openly express their opinions, even against the government. This is made possible by Article 5 of the Basic Law on freedom of expression."
    },
    2: {
        "de": "Bis zum 14. Lebensjahr können Eltern entscheiden, ob ihr Kind am Religionsunterricht teilnimmt. Danach entscheidet das Kind selbst (Religionsmündigkeit).",
        "en": "Until the age of 14, parents can decide whether their child participates in religious education. After that, the child decides for themselves (religious maturity)."
    },
    3: {
        "de": "In einem Rechtsstaat müssen sich alle an die Gesetze halten – sowohl die Bürger als auch der Staat selbst. Niemand steht über dem Gesetz.",
        "en": "In a constitutional state, everyone must follow the laws – both citizens and the state itself. No one is above the law."
    },
    4: {
        "de": "Meinungsfreiheit ist ein Grundrecht nach Artikel 5 des Grundgesetzes. Waffenbesitz, Faustrecht und Selbstjustiz sind keine Grundrechte.",
        "en": "Freedom of expression is a fundamental right under Article 5 of the Basic Law. Gun ownership, the law of the fist, and vigilante justice are not fundamental rights."
    },
    5: {
        "de": "Freie Wahlen bedeuten, dass niemand bei der Stimmabgabe beeinflusst oder gezwungen werden darf. Die Wahl muss ohne Druck und Nachteile stattfinden.",
        "en": "Free elections mean that no one may be influenced or coerced when casting their vote. Elections must take place without pressure or disadvantages."
    },
    6: {
        "de": "Pressefreiheit bedeutet, dass Journalisten ohne staatliche Zensur berichten können. Der Staat darf die Presse nicht kontrollieren oder einschränken.",
        "en": "Freedom of the press means journalists can report without state censorship. The state may not control or restrict the press."
    },
    7: {
        "de": "Versammlungsfreiheit bedeutet, dass sich Menschen friedlich und ohne Waffen versammeln dürfen, ohne eine Genehmigung zu brauchen (Artikel 8 GG).",
        "en": "Freedom of assembly means people may gather peacefully and without weapons, without needing a permit (Article 8 of the Basic Law)."
    },
    8: {
        "de": "In Deutschland herrscht Religionsfreiheit: Jeder darf seine Religion frei wählen und ausüben. Dieses Recht ist in Artikel 4 des Grundgesetzes verankert.",
        "en": "Germany has freedom of religion: everyone may freely choose and practice their religion. This right is enshrined in Article 4 of the Basic Law."
    },
    9: {
        "de": "Eltern haben laut Grundgesetz sowohl das Recht als auch die Pflicht, ihre Kinder zu erziehen (Artikel 6 GG).",
        "en": "According to the Basic Law, parents have both the right and the duty to raise their children (Article 6)."
    },
    10: {
        "de": "In Deutschland darf der Staat die Meinungsäußerung in Kunst und Wissenschaft nicht einschränken. Dies garantiert Artikel 5 Absatz 3 des Grundgesetzes (Kunstfreiheit).",
        "en": "In Germany, the state may not restrict expression in art and science. This is guaranteed by Article 5(3) of the Basic Law (freedom of art)."
    },
    11: {
        "de": "Das Wahlrecht bedeutet, dass man bei politischen Wahlen seine Stimme abgeben und selbst kandidieren darf.",
        "en": "The right to vote means one may cast their vote in political elections and also stand as a candidate."
    },
    12: {
        "de": "Die Menschenwürde (Artikel 1 GG) ist das wichtigste Grundrecht in Deutschland. Sie ist unantastbar und Grundlage aller weiteren Grundrechte.",
        "en": "Human dignity (Article 1 of the Basic Law) is the most important fundamental right in Germany. It is inviolable and the foundation of all other fundamental rights."
    },
    13: {
        "de": "Im Grundgesetz stehen die Grundrechte der Bürger. Es ist die Verfassung der Bundesrepublik Deutschland.",
        "en": "The Basic Law contains citizens' fundamental rights. It is the constitution of the Federal Republic of Germany."
    },
    14: {
        "de": "Gesetze gelten in Deutschland für alle gleich – für Politiker, Polizisten und alle Bürger. Niemand steht über dem Gesetz.",
        "en": "In Germany, laws apply equally to everyone – politicians, police officers, and all citizens. No one is above the law."
    },
    15: {
        "de": "Wenn jemand in Deutschland ein Gesetz bricht, entscheidet ein Gericht über die Strafe. Nur die Justiz darf Strafen verhängen.",
        "en": "If someone breaks a law in Germany, a court decides on the punishment. Only the judiciary may impose penalties."
    },
    16: {
        "de": "Die Menschenwürde bedeutet, dass alle Menschen gleich viel wert sind – unabhängig von Herkunft, Geschlecht oder Religion.",
        "en": "Human dignity means that all people have equal worth – regardless of origin, gender, or religion."
    },
    17: {
        "de": "In einer Demokratie hat das Volk die Staatsgewalt. Die Bürger bestimmen durch Wahlen, wer regiert.",
        "en": "In a democracy, the people hold state power. Citizens determine who governs through elections."
    },
    18: {
        "de": "Im Grundgesetz steht: 'Die Würde des Menschen ist unantastbar.' (Artikel 1, Absatz 1 GG).",
        "en": "The Basic Law states: 'Human dignity shall be inviolable.' (Article 1, Paragraph 1)."
    },
    19: {
        "de": "Deutschland ist ein Bundesstaat. Das bedeutet, dass das Land aus mehreren Ländern (Bundesländern) besteht, die eigene Zuständigkeiten haben.",
        "en": "Germany is a federal state. This means the country consists of several states (Bundesländer) that have their own responsibilities."
    },
    20: {
        "de": "Deutschland ist kein Fürstentum, keine Diktatur und kein Königreich. Es ist eine demokratische Republik – ein Bundesstaat und Rechtsstaat.",
        "en": "Germany is not a principality, a dictatorship, or a kingdom. It is a democratic republic – a federal state and constitutional state."
    },
    21: {
        "de": "Der Bundestag ist das Parlament Deutschlands und wird vom Volk gewählt. Er beschließt die Bundesgesetze.",
        "en": "The Bundestag is Germany's parliament and is elected by the people. It passes federal laws."
    },
    22: {
        "de": "Demonstrationsfreiheit gehört zu den Grundrechten in Deutschland. Demonstrationen dürfen friedlich und ohne Waffen stattfinden.",
        "en": "The right to demonstrate is a fundamental right in Germany. Demonstrations may take place peacefully and without weapons."
    },
    23: {
        "de": "Ehrenamtliches Engagement bedeutet freiwillige, unbezahlte Arbeit für das Gemeinwohl – wie Mitarbeit beim Roten Kreuz, freiwillige Feuerwehr oder Sportvereine.",
        "en": "Volunteering means voluntary, unpaid work for the common good – such as working for the Red Cross, voluntary fire department, or sports clubs."
    },
    24: {
        "de": "Gewaltenteilung bedeutet, dass die Staatsgewalt auf drei Bereiche verteilt ist: Legislative (Gesetzgebung), Exekutive (Regierung/Verwaltung) und Judikative (Gerichte).",
        "en": "Separation of powers means state power is divided into three branches: legislative (lawmaking), executive (government/administration), and judiciary (courts)."
    },
    25: {
        "de": "Die Bundesrepublik Deutschland wurde am 23. Mai 1949 gegründet. An diesem Tag trat das Grundgesetz in Kraft.",
        "en": "The Federal Republic of Germany was founded on May 23, 1949. On this day, the Basic Law came into effect."
    },
    26: {
        "de": "Religionsfreiheit bedeutet, dass jeder Mensch seine Religion frei wählen, wechseln oder auch gar keine Religion haben darf.",
        "en": "Freedom of religion means everyone may freely choose, change, or have no religion at all."
    },
    27: {
        "de": "In Deutschland sind Männer und Frauen gleichberechtigt. Dieser Grundsatz gilt für alle Lebensbereiche und ist in Artikel 3 GG verankert.",
        "en": "In Germany, men and women have equal rights. This principle applies to all areas of life and is enshrined in Article 3 of the Basic Law."
    },
    28: {
        "de": "In Deutschland darf man nicht mehr als eine Ehefrau / einen Ehemann gleichzeitig haben. Polygamie ist verboten.",
        "en": "In Germany, one may not have more than one spouse at the same time. Polygamy is prohibited."
    },
    29: {
        "de": "In Deutschland dürfen Kinder nicht geschlagen werden. Kinder haben ein Recht auf gewaltfreie Erziehung.",
        "en": "In Germany, children may not be hit. Children have the right to be raised without violence."
    },
    30: {
        "de": "Ein wichtiger Wert der deutschen Demokratie ist, dass die Menschenwürde vom Staat geschützt wird – Artikel 1 des Grundgesetzes.",
        "en": "An important value of German democracy is that human dignity is protected by the state – Article 1 of the Basic Law."
    },
    31: {
        "de": "Toleranz bedeutet, dass man andere Meinungen, Lebensweisen und Überzeugungen respektiert und akzeptiert, auch wenn man sie nicht teilt.",
        "en": "Tolerance means respecting and accepting other opinions, lifestyles, and beliefs, even if you don't share them."
    },
    32: {
        "de": "Wenn ein Gesetz die Meinungsfreiheit einschränkt, kann man vor dem Bundesverfassungsgericht klagen.",
        "en": "If a law restricts freedom of expression, one can file a complaint with the Federal Constitutional Court."
    },
    33: {
        "de": "Sozialversicherungsbeiträge werden automatisch vom Bruttolohn abgezogen. Arbeitgeber und Arbeitnehmer teilen sich die Kosten.",
        "en": "Social insurance contributions are automatically deducted from gross wages. Employers and employees share the costs."
    },
    34: {
        "de": "Die gesetzliche Krankenversicherung ist eine der fünf Säulen der Sozialversicherung in Deutschland. Beiträge werden je zur Hälfte von Arbeitgeber und Arbeitnehmer gezahlt.",
        "en": "Statutory health insurance is one of the five pillars of social insurance in Germany. Contributions are paid half by the employer and half by the employee."
    },
    35: {
        "de": "Arbeitslosenversicherung, Krankenversicherung, Pflegeversicherung, Rentenversicherung und Unfallversicherung bilden die fünf Säulen der Sozialversicherung.",
        "en": "Unemployment insurance, health insurance, long-term care insurance, pension insurance, and accident insurance form the five pillars of social insurance."
    },
    36: {
        "de": "Eine Lebensversicherung ist eine private Versicherung und gehört nicht zu den Sozialversicherungen in Deutschland.",
        "en": "Life insurance is a private insurance and is not part of the social insurance system in Germany."
    },
    37: {
        "de": "Wer in Deutschland arbeitslos wird, erhält Unterstützung von der Agentur für Arbeit (Arbeitslosengeld).",
        "en": "Anyone who becomes unemployed in Germany receives support from the Federal Employment Agency (unemployment benefits)."
    },
    38: {
        "de": "In einer Demokratie haben alle das Recht, Parteien zu gründen und politisch aktiv zu werden.",
        "en": "In a democracy, everyone has the right to found parties and become politically active."
    },
    39: {
        "de": "Im Grundgesetz sind die Grundrechte der Bürgerinnen und Bürger in Deutschland festgeschrieben.",
        "en": "The fundamental rights of citizens in Germany are codified in the Basic Law."
    },
    40: {
        "de": "Streikrecht gehört zu den Grundrechten der Arbeitnehmer. Arbeitgeber dürfen Beschäftigte nicht für die Teilnahme an einem legalen Streik bestrafen.",
        "en": "The right to strike is a fundamental right of employees. Employers may not punish employees for participating in a legal strike."
    },
    41: {
        "de": "Koalitionsfreiheit bedeutet, dass Arbeitnehmer sich in Gewerkschaften organisieren dürfen, um gemeinsam ihre Interessen zu vertreten.",
        "en": "Freedom of association means employees may organize in trade unions to collectively represent their interests."
    },
    42: {
        "de": "Wahlen in Deutschland sind geheim – niemand muss anderen mitteilen, wen er gewählt hat. Es gibt Wahlkabinen für die geheime Stimmabgabe.",
        "en": "Elections in Germany are secret – no one has to tell others who they voted for. There are voting booths for secret ballot."
    },
    43: {
        "de": "In Deutschland gibt es Koalitionsfreiheit. Das bedeutet, alle Bürger haben das Recht, Gewerkschaften zu gründen.",
        "en": "In Germany there is freedom of coalition. This means all citizens have the right to form trade unions."
    },
    44: {
        "de": "Jeder hat das Recht, sich vor Gericht zu verteidigen und einen Anwalt zu nehmen, wenn er/sie angeklagt wird.",
        "en": "Everyone has the right to defend themselves in court and to hire a lawyer when accused."
    },
    45: {
        "de": "Die Sozialversicherung wird aus Beiträgen finanziert, die Arbeitgeber und Arbeitnehmer gemeinsam zahlen.",
        "en": "Social insurance is funded by contributions that employers and employees pay together."
    },
    46: {
        "de": "In Deutschland wird die Staatsgewalt durch getrennte Organe ausgeübt: Bundestag (Legislative), Bundesregierung (Exekutive) und Gerichte (Judikative).",
        "en": "In Germany, state power is exercised by separate organs: Bundestag (legislative), Federal Government (executive), and courts (judiciary)."
    },
    47: {
        "de": "In Deutschland besteht Schulpflicht. Eltern müssen ihre Kinder zur Schule schicken – Schulbildung zu Hause (Homeschooling) ist in der Regel nicht erlaubt.",
        "en": "In Germany, school attendance is mandatory. Parents must send their children to school – home schooling is generally not permitted."
    },
    48: {
        "de": "Petitionsrecht bedeutet, dass sich jeder mit Bitten oder Beschwerden an den Deutschen Bundestag (Petitionsausschuss) wenden kann.",
        "en": "The right to petition means everyone can address requests or complaints to the German Bundestag (Petitions Committee)."
    },
    49: {
        "de": "In Deutschland dürfen nur friedliche Versammlungen ohne Waffen stattfinden. Versammlungsfreiheit ist ein Grundrecht, aber Gewalt ist nicht erlaubt.",
        "en": "In Germany, only peaceful gatherings without weapons are permitted. Freedom of assembly is a fundamental right, but violence is not allowed."
    },
    50: {
        "de": "Die Wirtschaftsform in Deutschland heißt „soziale Marktwirtschaft". Sie verbindet freien Wettbewerb mit sozialem Ausgleich.",
        "en": "Germany's economic system is called 'social market economy'. It combines free competition with social balance."
    },
    51: {
        "de": "In einer Demokratie ist eine unabhängige Justiz (Gerichte) unverzichtbar. Sie schützt die Rechte der Bürger und kontrolliert den Staat.",
        "en": "In a democracy, an independent judiciary (courts) is essential. It protects citizens' rights and monitors the state."
    },
    52: {
        "de": "Wer in Deutschland nicht arbeiten kann, erhält vom Staat soziale Leistungen wie Arbeitslosengeld oder Sozialhilfe.",
        "en": "Those unable to work in Germany receive social benefits from the state such as unemployment benefits or social assistance."
    },
    53: {
        "de": "Die Bundesrepublik Deutschland hat 16 Bundesländer.",
        "en": "The Federal Republic of Germany has 16 federal states."
    },
    54: {
        "de": "Deutschland ist eine föderale Republik: Das Land besteht aus 16 Bundesländern mit eigenen Regierungen und Parlamenten.",
        "en": "Germany is a federal republic: the country consists of 16 federal states with their own governments and parliaments."
    },
    55: {
        "de": "Der Bundestag beschließt die Bundesgesetze. Er ist das wichtigste gesetzgebende Organ in Deutschland.",
        "en": "The Bundestag passes federal laws. It is the most important legislative body in Germany."
    },
    56: {
        "de": "Über dem Eingang des Bundestags steht „Dem deutschen Volke" – das symbolisiert, dass das Parlament für das Volk arbeitet.",
        "en": "Above the entrance of the Bundestag stands 'Dem deutschen Volke' (To the German People) – symbolizing that parliament works for the people."
    },
    57: {
        "de": "Die Verfassung Deutschlands heißt „Grundgesetz". Es wurde 1949 verabschiedet und ist die rechtliche Grundlage des Staates.",
        "en": "Germany's constitution is called the 'Basic Law' (Grundgesetz). It was adopted in 1949 and is the legal foundation of the state."
    },
    58: {
        "de": "Alle Menschen sind vor dem Gesetz gleich, unabhängig von Geschlecht, Herkunft oder Religion (Artikel 3 GG).",
        "en": "All people are equal before the law, regardless of gender, origin, or religion (Article 3 of the Basic Law)."
    },
    59: {
        "de": "Die drei Staatsgewalten in Deutschland sind: Legislative (Gesetzgebung), Exekutive (ausführende Gewalt) und Judikative (Rechtsprechung).",
        "en": "The three branches of government in Germany are: legislative (lawmaking), executive (enforcement), and judiciary (administration of justice)."
    },
    60: {
        "de": "Der Bundestag und der Bundesrat gehören zur Legislative – sie sind für die Gesetzgebung zuständig.",
        "en": "The Bundestag and Bundesrat belong to the legislative branch – they are responsible for lawmaking."
    },
    61: {
        "de": "Die Bundesregierung gehört zur Exekutive – sie setzt die Gesetze um und verwaltet den Staat.",
        "en": "The Federal Government belongs to the executive branch – it implements laws and administers the state."
    },
    62: {
        "de": "Die Bundeskanzlerin/der Bundeskanzler leitet die Bundesregierung und bestimmt die Richtlinien der Politik (Richtlinienkompetenz).",
        "en": "The Federal Chancellor heads the Federal Government and sets policy guidelines (Richtlinienkompetenz)."
    },
    63: {
        "de": "Die Abgeordneten des Deutschen Bundestages werden alle vier Jahre vom Volk gewählt.",
        "en": "Members of the German Bundestag are elected by the people every four years."
    },
    64: {
        "de": "Im Bundesstaat sind die politischen Aufgaben zwischen Bund und Ländern aufgeteilt. Bildung ist z.B. Ländersache.",
        "en": "In a federal state, political tasks are divided between the federation and the states. Education, for example, is a state responsibility."
    },
    65: {
        "de": "Man darf in Deutschland beim Wählen niemandem zusehen – die Wahl ist geheim. Man wählt allein in der Wahlkabine.",
        "en": "In Germany, no one may watch while you vote – the election is secret. You vote alone in the voting booth."
    },
    66: {
        "de": "Die Erststimme bei der Bundestagswahl gilt der Direktkandidatin/dem Direktkandidaten im Wahlkreis.",
        "en": "The first vote (Erststimme) in federal elections goes to the direct candidate in the electoral district."
    },
    67: {
        "de": "Die Zweitstimme bei der Bundestagswahl wählt eine Partei. Sie entscheidet über die Sitzverteilung im Bundestag.",
        "en": "The second vote (Zweitstimme) in federal elections selects a party. It determines the seat distribution in the Bundestag."
    },
    68: {
        "de": "Bei Bundestagswahlen haben deutsche Staatsbürger ab 18 Jahren zwei Stimmen: die Erststimme für einen Kandidaten und die Zweitstimme für eine Partei.",
        "en": "In federal elections, German citizens aged 18+ have two votes: the first vote for a candidate and the second vote for a party."
    },
    69: {
        "de": "Die 5-Prozent-Hürde bedeutet: Eine Partei muss mindestens 5% der Zweitstimmen erhalten, um in den Bundestag einzuziehen.",
        "en": "The 5% threshold means: a party must receive at least 5% of second votes to enter the Bundestag."
    },
    70: {
        "de": "Die Bundespräsidentin/der Bundespräsident schlägt die Kanzlerin/den Kanzler zur Wahl vor. Der Bundestag wählt sie/ihn dann.",
        "en": "The Federal President proposes the Chancellor for election. The Bundestag then elects them."
    },
    71: {
        "de": "Die Bundeskanzlerin/der Bundeskanzler wird vom Bundestag gewählt – nicht direkt vom Volk.",
        "en": "The Federal Chancellor is elected by the Bundestag – not directly by the people."
    },
    72: {
        "de": "Die Länder werden im Bundesrat vertreten. Durch den Bundesrat wirken die Länder an der Gesetzgebung des Bundes mit.",
        "en": "The federal states are represented in the Bundesrat. Through the Bundesrat, the states participate in federal legislation."
    },
    73: {
        "de": "Opposition heißt: Parteien im Parlament, die nicht an der Regierung beteiligt sind. Sie kontrollieren die Regierung und bieten Alternativen.",
        "en": "Opposition means: parties in parliament that are not part of the government. They monitor the government and offer alternatives."
    },
    74: {
        "de": "Die Opposition im Bundestag kontrolliert die Regierung und kritisiert sie öffentlich. Sie ist wichtig für die Demokratie.",
        "en": "The opposition in the Bundestag monitors and publicly criticizes the government. It is important for democracy."
    },
    75: {
        "de": "Die Bundeskanzlerin/der Bundeskanzler bestimmt, welche Minister/Ministerinnen der Bundesregierung angehören.",
        "en": "The Federal Chancellor determines which ministers belong to the Federal Government."
    },
    76: {
        "de": "Wer in Deutschland bei einer Bundestagswahl wählen will, muss mindestens 18 Jahre alt sein und die deutsche Staatsbürgerschaft besitzen.",
        "en": "To vote in a federal election in Germany, you must be at least 18 years old and hold German citizenship."
    },
    77: {
        "de": "EU-Bürger dürfen in Deutschland an Kommunalwahlen teilnehmen, wenn sie ihren Wohnsitz in der Gemeinde haben.",
        "en": "EU citizens may vote in local elections in Germany if they are resident in the municipality."
    },
    78: {
        "de": "An Bundestagswahlen dürfen nur deutsche Staatsbürger teilnehmen. EU-Bürger können an Kommunalwahlen teilnehmen.",
        "en": "Only German citizens may vote in federal elections. EU citizens can participate in local elections."
    },
    79: {
        "de": "Bundestagswahlen finden in der Regel alle vier Jahre statt.",
        "en": "Federal elections generally take place every four years."
    },
    80: {
        "de": "Das Bundesverfassungsgericht in Karlsruhe ist für die Auslegung des Grundgesetzes zuständig und schützt die Grundrechte.",
        "en": "The Federal Constitutional Court in Karlsruhe is responsible for interpreting the Basic Law and protecting fundamental rights."
    },
    81: {
        "de": "Die Bundesminister/Bundesministerinnen werden auf Vorschlag der Bundeskanzlerin/des Bundeskanzlers ernannt.",
        "en": "Federal ministers are appointed on the proposal of the Federal Chancellor."
    },
    82: {
        "de": "Die Abgeordneten entscheiden nach ihrem Gewissen – sie sind nur dem Volk verantwortlich, nicht ihrer Partei (freies Mandat).",
        "en": "Members of parliament decide according to their conscience – they are responsible only to the people, not to their party (free mandate)."
    },
    83: {
        "de": "Der Bundesrat ist die Vertretung der Bundesländer auf Bundesebene. Über ihn wirken die Länder an der Gesetzgebung mit.",
        "en": "The Bundesrat represents the federal states at the national level. Through it, the states participate in federal legislation."
    },
    84: {
        "de": "Kommunalwahlen betreffen die Städte und Gemeinden (Bürgermeister, Stadträte). Sie finden alle paar Jahre statt.",
        "en": "Local elections concern cities and municipalities (mayors, city councils). They take place every few years."
    },
    85: {
        "de": "Der Bundespräsident/die Bundespräsidentin ist das Staatsoberhaupt Deutschlands und repräsentiert das Land.",
        "en": "The Federal President is the head of state of Germany and represents the country."
    },
    86: {
        "de": "Der Bundespräsident wird von der Bundesversammlung gewählt – einem Gremium aus Bundestag und Vertretern der Länderparlamente.",
        "en": "The Federal President is elected by the Federal Convention – a body of Bundestag members and state parliament representatives."
    },
    87: {
        "de": "Der Bundesadler ist ein Symbol der Bundesrepublik Deutschland und ziert das Wappen.",
        "en": "The Federal Eagle is a symbol of the Federal Republic of Germany and adorns the coat of arms."
    },
    88: {
        "de": "Die Farben der deutschen Flagge sind Schwarz-Rot-Gold. Sie stehen für Einigkeit und Recht und Freiheit.",
        "en": "The colors of the German flag are black, red, and gold. They stand for unity, justice, and freedom."
    },
    89: {
        "de": "Die Nationalhymne Deutschlands ist die dritte Strophe des „Liedes der Deutschen" (Einigkeit und Recht und Freiheit).",
        "en": "Germany's national anthem is the third verse of the 'Song of the Germans' (Unity and Justice and Freedom)."
    },
    90: {
        "de": "Der 3. Oktober ist der Tag der Deutschen Einheit – der Nationalfeiertag. An diesem Tag wurde 1990 die Wiedervereinigung vollzogen.",
        "en": "October 3 is German Unity Day – the national holiday. On this day in 1990, reunification was completed."
    },
    91: {
        "de": "Deutschland hat 16 Bundesländer, die alle eigene Landesregierungen und Landtage (Länderparlamente) haben.",
        "en": "Germany has 16 federal states, each with its own state government and state parliament."
    },
    92: {
        "de": "Wer in Deutschland 18 Jahre alt ist und die deutsche Staatsbürgerschaft hat, darf an Bundestagswahlen teilnehmen.",
        "en": "Anyone who is 18 years old and holds German citizenship may vote in federal elections in Germany."
    },
    93: {
        "de": "Unter einer Koalition versteht man den Zusammenschluss mehrerer Parteien, um gemeinsam zu regieren.",
        "en": "A coalition is an alliance of several parties to govern together."
    },
    94: {
        "de": "Die Fraktionen im Bundestag sind Zusammenschlüsse der Abgeordneten derselben Partei. Eine Fraktion braucht in der Regel mindestens 5% der Sitze.",
        "en": "Parliamentary groups (Fraktionen) in the Bundestag are associations of members of the same party. A group usually needs at least 5% of seats."
    },
    95: {
        "de": "In Deutschland sind Frauen und Männer vor dem Gesetz gleich (Artikel 3 GG). Dies gilt auch für Ehe, Familie und Beruf.",
        "en": "In Germany, women and men are equal before the law (Article 3 of the Basic Law). This also applies to marriage, family, and career."
    },
    96: {
        "de": "In einer Diktatur bestimmt eine Person oder eine kleine Gruppe allein über das Land, ohne demokratische Kontrolle.",
        "en": "In a dictatorship, one person or a small group alone determines the fate of the country, without democratic oversight."
    },
    97: {
        "de": "Der Staat schützt die Familie besonders (Artikel 6 GG) und unterstützt Familien mit Kindergeld, Elterngeld und anderen Leistungen.",
        "en": "The state especially protects the family (Article 6 of the Basic Law) and supports families with child benefits, parental allowance, and other benefits."
    },
    98: {
        "de": "In einer Demokratie kontrolliert die Opposition die Regierung und bietet politische Alternativen an.",
        "en": "In a democracy, the opposition monitors the government and offers political alternatives."
    },
    99: {
        "de": "Die Unfallversicherung schützt Arbeitnehmer bei Arbeitsunfällen und Berufskrankheiten. Sie wird vom Arbeitgeber allein bezahlt.",
        "en": "Accident insurance protects employees in case of workplace accidents and occupational diseases. It is paid solely by the employer."
    },
    100: {
        "de": "Die Lebensversicherung gehört nicht zur Sozialversicherung. Die fünf Sozialversicherungen sind: Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung.",
        "en": "Life insurance is not part of social security. The five social insurances are: health, long-term care, pension, unemployment, and accident insurance."
    },
    150: {
        "de": "Eine Schöffin/ein Schöffe ist eine ehrenamtliche Richterin/ein ehrenamtlicher Richter, die/der an Gerichtsverhandlungen teilnimmt und mitentscheidet.",
        "en": "A Schöffe (lay judge) is a volunteer judge who participates in court hearings and helps decide cases."
    },
    173: {
        "de": "Die Europäische Wirtschaftsgemeinschaft (EWG) wurde 1__(57) durch die Römischen Verträge gegründet – ein wichtiger Schritt zur europäischen Integration.",
        "en": "The European Economic Community (EEC) was founded in 1957 through the Treaties of Rome – an important step toward European integration."
    },
    200: {
        "de": "Mecklenburg-Vorpommern war ein Land der ehemaligen DDR und gehört seit der Wiedervereinigung 1990 zur Bundesrepublik.",
        "en": "Mecklenburg-Western Pomerania was a state of the former GDR and has been part of the Federal Republic since reunification in 1990."
    },
    210: {
        "de": "Die DDR wurde am 7. Oktober 1949 gegründet – wenige Monate nach der Bundesrepublik (23. Mai 1949).",
        "en": "The GDR was founded on October 7, 1949 – a few months after the Federal Republic (May 23, 1949)."
    },
    211: {
        "de": "Willy Brandt erhielt 1971 den Friedensnobelpreis für seine Ostpolitik – die Politik der Entspannung mit den osteuropäischen Staaten.",
        "en": "Willy Brandt received the Nobel Peace Prize in 1971 for his Ostpolitik – the policy of détente with Eastern European states."
    },
    215: {
        "de": "Die Berliner Mauer stand von 1961 bis 1989 – insgesamt 28 Jahre. Sie teilte Berlin in Ost und West.",
        "en": "The Berlin Wall stood from 1961 to 1989 – a total of 28 years. It divided Berlin into East and West."
    },
    216: {
        "de": "Die Berliner Mauer fiel am 9. November 1989. Dieses Datum ist ein Wendepunkt in der deutschen Geschichte.",
        "en": "The Berlin Wall fell on November 9, 1989. This date is a turning point in German history."
    },
    217: {
        "de": "Die deutsche Wiedervereinigung fand am 3. Oktober 1990 statt. An diesem Tag traten die neuen Bundesländer der Bundesrepublik bei.",
        "en": "German reunification took place on October 3, 1990. On this day, the new federal states joined the Federal Republic."
    },
    218: {
        "de": "Die Weimarer Republik war die erste demokratische Staatsform Deutschlands (1918/1919–1933).",
        "en": "The Weimar Republic was Germany's first democratic form of government (1918/1919–1933)."
    },
    219: {
        "de": "Der Zweite Weltkrieg endete in Europa am 8. Mai 1945 mit der bedingungslosen Kapitulation Deutschlands.",
        "en": "World War II in Europe ended on May 8, 1945 with Germany's unconditional surrender."
    },
    220: {
        "de": "Die Luftbrücke (Berlin Blockade) fand 1948/49 statt, als die Westalliierten West-Berlin aus der Luft versorgten.",
        "en": "The Berlin Airlift (Berlin Blockade) took place in 1948/49, when the Western Allies supplied West Berlin by air."
    },
    221: {
        "de": "Das Schengener Abkommen ermöglicht Reisen ohne Passkontrolle zwischen den teilnehmenden europäischen Ländern.",
        "en": "The Schengen Agreement enables travel without passport controls between participating European countries."
    },
    222: {
        "de": "Der Marshallplan (1948) war ein US-amerikanisches Hilfsprogramm für den wirtschaftlichen Wiederaufbau Europas nach dem Zweiten Weltkrieg.",
        "en": "The Marshall Plan (1948) was an American aid program for Europe's economic reconstruction after World War II."
    },
    223: {
        "de": "Das Grundgesetz trat am 23. Mai 1949 in Kraft. Es ist die Verfassung der Bundesrepublik Deutschland.",
        "en": "The Basic Law came into effect on May 23, 1949. It is the constitution of the Federal Republic of Germany."
    },
    224: {
        "de": "Die Europäische Union (EU) wurde 1__(93) durch den Vertrag von Maastricht gegründet.",
        "en": "The European Union (EU) was founded in 1993 through the Treaty of Maastricht."
    },
    225: {
        "de": "Am 1. Januar 2002 wurde der Euro als Bargeld in vielen EU-Ländern eingeführt.",
        "en": "On January 1, 2002, the Euro was introduced as cash currency in many EU countries."
    },
    226: {
        "de": "Die UN (Vereinte Nationen) wurde 1945 gegründet, um den Weltfrieden zu sichern und die Menschenrechte zu schützen.",
        "en": "The UN (United Nations) was founded in 1945 to maintain world peace and protect human rights."
    },
    227: {
        "de": "Die NATO (Nordatlantikvertrag-Organisation) ist ein Verteidigungsbündnis westlicher Staaten, dem Deutschland seit 1955 angehört.",
        "en": "NATO (North Atlantic Treaty Organization) is a defense alliance of Western states that Germany has been a member of since 1955."
    },
    228: {
        "de": "Der Europarat wurde 1949 gegründet und setzt sich für Menschenrechte, Demokratie und Rechtsstaatlichkeit in Europa ein.",
        "en": "The Council of Europe was founded in 1949 and promotes human rights, democracy, and the rule of law in Europe."
    },
    230: {
        "de": "Die Bürgerinnen und Bürger der EU wählen das Europäische Parlament direkt. Es ist die demokratische Vertretung der EU-Bürger.",
        "en": "EU citizens directly elect the European Parliament. It is the democratic representation of EU citizens."
    },
    250: {
        "de": "In Deutschland hat man die besten Chancen auf einen gut bezahlten Arbeitsplatz, wenn man gut ausgebildet ist. Bildung ist der Schlüssel zum Erfolg.",
        "en": "In Germany, having a good education gives you the best chances for a well-paid job. Education is the key to success."
    },
    256: {
        "de": "In Deutschland gilt die Schulpflicht: Kinder müssen mindestens 9 Jahre lang die Schule besuchen.",
        "en": "In Germany, compulsory schooling applies: children must attend school for at least 9 years."
    },
    260: {
        "de": "Der Führerschein (Fahrerlaubnis) ist in Deutschland nötig, um ein Auto fahren zu dürfen. Man bekommt ihn ab 18 Jahren.",
        "en": "A driver's license is required in Germany to drive a car. You can get one from age 18."
    },
    270: {
        "de": "Ein Mietvertrag regelt die Bedingungen zwischen Vermieter und Mieter. Er enthält Angaben zu Miete, Nebenkosten und Kündigungsfristen.",
        "en": "A rental contract regulates the conditions between landlord and tenant. It contains information about rent, utilities, and notice periods."
    },
    280: {
        "de": "Der Personalausweis ist ein amtliches Dokument zum Identitätsnachweis. Ab 16 Jahren besteht in Deutschland Ausweispflicht.",
        "en": "The identity card (Personalausweis) is an official identity document. From age 16, carrying one is mandatory in Germany."
    },
    290: {
        "de": "In Deutschland muss man sich innerhalb von zwei Wochen nach einem Umzug beim Einwohnermeldeamt anmelden (Meldepflicht).",
        "en": "In Germany, one must register at the residents' registration office within two weeks of moving (registration requirement)."
    },
    300: {
        "de": "Die ersten Gastarbeiter kamen aus Italien nach Deutschland – aufgrund eines Anwerbeabkommens von 1955.",
        "en": "The first guest workers came from Italy to Germany – due to a recruitment agreement from 1955."
    },
}


def enhance_explanation(de, en, question, correct_clean, correct, options, num):
    """Enhance explanation with contextual information."""
    
    # Check for specific hand-crafted explanations first
    if num in SPECIFIC_EXPLANATIONS:
        return SPECIFIC_EXPLANATIONS[num]["de"], SPECIFIC_EXPLANATIONS[num]["en"]
    
    # For completion questions (ending with …), form a complete sentence
    if question.rstrip().endswith("…") or question.rstrip().endswith("..."):
        q_stem = question.rstrip().rstrip("…").rstrip(".").rstrip()
        # Clean up the stem - remove "weil" etc. for a full sentence
        de = f"{q_stem} {correct_clean}."
        en = f"The correct answer completes the sentence: {correct_clean}."
    
    # Enrich with article references where detectable
    article_match = re.search(r"Artikel\s+(\d+)", correct_clean)
    if article_match and "Artikel" not in de:
        de += f" Dies ist in Artikel {article_match.group(1)} des Grundgesetzes geregelt."
    
    # Generate English if not already set
    if en is None:
        en = f"The correct answer is: {correct_clean}."
    
    return de, en


def main():
    with open("app/src/data/questions.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    
    count = 0
    for q in data["questions"]:
        explanation = generate_explanation(q)
        q["explanation"] = explanation
        count += 1
    
    with open("app/src/data/questions.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Generated explanations for {count} questions")
    
    # Show a few examples
    for q in data["questions"][:5]:
        print(f"\nQ{q['number']}: {q['question'][:60]}...")
        print(f"  DE: {q['explanation']['de']}")
        print(f"  EN: {q['explanation']['en']}")


if __name__ == "__main__":
    main()
