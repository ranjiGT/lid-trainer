export interface Question {
  id: string;
  number: number;
  category: string;
  question: string;
  options: string[];
  correct: number;
  image?: string;
  explanation?: { de: string; en: string };
}

export interface QuestionsData {
  metadata: {
    title: string;
    source: string;
    totalQuestions: number;
    generalQuestions: number;
    stateQuestions: number;
  };
  questions: Question[];
}

export type ExamMode = "practice" | "exam";
export type Language = "de" | "en";

export interface ExamState {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, number | null>;
  submitted: boolean;
  startTime: number;
  timeLimit: number; // in seconds, 0 = no limit
}

export const STATE_NAMES: Record<string, { de: string; en: string }> = {
  BW: { de: "Baden-Württemberg", en: "Baden-Württemberg" },
  BY: { de: "Bayern", en: "Bavaria" },
  BE: { de: "Berlin", en: "Berlin" },
  BB: { de: "Brandenburg", en: "Brandenburg" },
  HB: { de: "Bremen", en: "Bremen" },
  HH: { de: "Hamburg", en: "Hamburg" },
  HE: { de: "Hessen", en: "Hesse" },
  MV: { de: "Mecklenburg-Vorpommern", en: "Mecklenburg-Western Pomerania" },
  NI: { de: "Niedersachsen", en: "Lower Saxony" },
  NW: { de: "Nordrhein-Westfalen", en: "North Rhine-Westphalia" },
  RP: { de: "Rheinland-Pfalz", en: "Rhineland-Palatinate" },
  SL: { de: "Saarland", en: "Saarland" },
  SN: { de: "Sachsen", en: "Saxony" },
  ST: { de: "Sachsen-Anhalt", en: "Saxony-Anhalt" },
  SH: { de: "Schleswig-Holstein", en: "Schleswig-Holstein" },
  TH: { de: "Thüringen", en: "Thuringia" },
};
