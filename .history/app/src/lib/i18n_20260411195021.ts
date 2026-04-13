import { Language } from "./types";

type TranslationKey =
  | "siteTitle"
  | "siteSubtitle"
  | "startExam"
  | "practiceMode"
  | "examMode"
  | "selectState"
  | "allQuestions"
  | "generalQuestions"
  | "stateQuestions"
  | "question"
  | "of"
  | "next"
  | "previous"
  | "submit"
  | "result"
  | "correct"
  | "incorrect"
  | "score"
  | "passed"
  | "failed"
  | "timeRemaining"
  | "timeUp"
  | "tryAgain"
  | "backToHome"
  | "examDescription"
  | "practiceDescription"
  | "questionsCount"
  | "minutes"
  | "showAnswer"
  | "nextQuestion"
  | "examComplete"
  | "yourScore"
  | "passingScore"
  | "correctAnswers"
  | "incorrectAnswers"
  | "unanswered"
  | "reviewAnswers"
  | "questionNumber"
  | "yourAnswer"
  | "correctAnswer"
  | "language"
  | "selectCategory"
  | "realExamInfo"
  | "startPractice"
  | "chooseState"
  | "imageQuestions"
  | "imageQuestionsDescription"
  | "startImagePractice"
  | "topicsMode"
  | "topicsDescription"
  | "startTopics";

const translations: Record<Language, Record<TranslationKey, string>> = {
  de: {
    siteTitle: "Einb\u00FCrgerungstest 'Leben in Deutschland'",
    siteSubtitle: "Testvorbereitung",
    startExam: "Prüfung starten",
    practiceMode: "Übungsmodus",
    examMode: "Prüfungsmodus",
    selectState: "Bundesland wählen",
    allQuestions: "Alle Fragen",
    generalQuestions: "Allgemeine Fragen",
    stateQuestions: "Landesspezifische Fragen",
    question: "Frage",
    of: "von",
    next: "Weiter",
    previous: "Zurück",
    submit: "Abgeben",
    result: "Ergebnis",
    correct: "Richtig",
    incorrect: "Falsch",
    score: "Punktzahl",
    passed: "Bestanden! 🎉",
    failed: "Leider nicht bestanden",
    timeRemaining: "Verbleibende Zeit",
    timeUp: "Zeit abgelaufen!",
    tryAgain: "Erneut versuchen",
    backToHome: "Zur Startseite",
    examDescription:
      "Simulieren Sie die echte Prüfung: 33 Fragen in 60 Minuten. Zum Bestehen müssen mindestens 17 Fragen richtig beantwortet werden.",
    practiceDescription:
      "Üben Sie in Ihrem eigenen Tempo. Sofortiges Feedback nach jeder Frage.",
    questionsCount: "Fragen",
    minutes: "Minuten",
    showAnswer: "Antwort anzeigen",
    nextQuestion: "Nächste Frage",
    examComplete: "Prüfung abgeschlossen",
    yourScore: "Ihre Punktzahl",
    passingScore: "Zum Bestehen benötigt: 17/33",
    correctAnswers: "Richtige Antworten",
    incorrectAnswers: "Falsche Antworten",
    unanswered: "Unbeantwortet",
    reviewAnswers: "Antworten überprüfen",
    questionNumber: "Frage Nr.",
    yourAnswer: "Ihre Antwort",
    correctAnswer: "Richtige Antwort",
    language: "Sprache",
    selectCategory: "Kategorie wählen",
    realExamInfo:
      "Die echte Prüfung besteht aus 33 Fragen (30 allgemeine + 3 landesspezifische), die in 60 Minuten beantwortet werden müssen.",
    startPractice: "Übung starten",
    chooseState: "Wählen Sie Ihr Bundesland",
    imageQuestions: "Bildfragen",
    imageQuestionsDescription:
      "Üben Sie alle Fragen mit Bildern – Wappen, Karten und mehr.",
    startImagePractice: "Bildfragen üben",
    topicsMode: "Themen & Grundlagen",
    topicsDescription:
      "Lernen Sie wichtige Begriffe und Konzepte kennen – mit Erklärungen und verknüpften Prüfungsfragen.",
    startTopics: "Themen erkunden",
  },
  en: {
    siteTitle: "Einb\u00FCrgerungstest 'Life in Germany'",
    siteSubtitle: "Test Preparation",
    startExam: "Start Exam",
    practiceMode: "Practice Mode",
    examMode: "Exam Mode",
    selectState: "Select State",
    allQuestions: "All Questions",
    generalQuestions: "General Questions",
    stateQuestions: "State-Specific Questions",
    question: "Question",
    of: "of",
    next: "Next",
    previous: "Previous",
    submit: "Submit",
    result: "Result",
    correct: "Correct",
    incorrect: "Incorrect",
    score: "Score",
    passed: "Passed! 🎉",
    failed: "Not passed",
    timeRemaining: "Time Remaining",
    timeUp: "Time's up!",
    tryAgain: "Try Again",
    backToHome: "Back to Home",
    examDescription:
      "Simulate the real exam: 33 questions in 60 minutes. You need at least 17 correct answers to pass.",
    practiceDescription:
      "Practice at your own pace. Get instant feedback after each question.",
    questionsCount: "questions",
    minutes: "minutes",
    showAnswer: "Show Answer",
    nextQuestion: "Next Question",
    examComplete: "Exam Complete",
    yourScore: "Your Score",
    passingScore: "Passing score: 17/33",
    correctAnswers: "Correct Answers",
    incorrectAnswers: "Incorrect Answers",
    unanswered: "Unanswered",
    reviewAnswers: "Review Answers",
    questionNumber: "Question No.",
    yourAnswer: "Your Answer",
    correctAnswer: "Correct Answer",
    language: "Language",
    selectCategory: "Select Category",
    realExamInfo:
      "The real exam consists of 33 questions (30 general + 3 state-specific) to be answered in 60 minutes.",
    startPractice: "Start Practice",
    chooseState: "Choose your state",
    imageQuestions: "Image Questions",
    imageQuestionsDescription:
      "Practice all questions with images – coats of arms, maps and more.",
    startImagePractice: "Practice Image Questions",
    topicsMode: "Topics & Basics",
    topicsDescription:
      "Learn important terms and concepts – with explanations and linked exam questions.",
    startTopics: "Explore Topics",
  },
};

export function t(key: TranslationKey, lang: Language): string {
  return translations[lang][key] || translations.de[key] || key;
}
