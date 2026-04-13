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
    47: {
        "de": "In Deutschland besteht Schulpflicht. Eltern müssen ihre Kinder zur Schule schicken – Schulbildung zu Hause (Homeschooling) ist in der Regel nicht erlaubt.",
        "en": "In Germany, school attendance is mandatory. Parents must send their children to school – home schooling is generally not permitted."
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
