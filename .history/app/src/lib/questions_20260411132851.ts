import { Question } from "./types";
import questionsData from "../data/questions.json";

export function getAllQuestions(): Question[] {
  return questionsData.questions;
}

export function getGeneralQuestions(): Question[] {
  return questionsData.questions.filter((q) => q.category === "general");
}

export function getStateQuestions(stateCode: string): Question[] {
  return questionsData.questions.filter((q) => q.category === stateCode);
}

export function getImageQuestions(): Question[] {
  return questionsData.questions.filter((q) => q.image);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateExamQuestions(stateCode: string): Question[] {
  const general = getGeneralQuestions();
  const state = getStateQuestions(stateCode);

  // Real exam: 30 random general + 3 random state-specific = 33 questions
  const selectedGeneral = shuffleArray(general).slice(0, 30);
  const selectedState = shuffleArray(state).slice(0, 3);

  return shuffleArray([...selectedGeneral, ...selectedState]);
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

export function calculateScore(
  questions: Question[],
  answers: Record<string, number | null>
): {
  correct: number;
  incorrect: number;
  unanswered: number;
  total: number;
  passed: boolean;
} {
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  for (const q of questions) {
    const answer = answers[q.id];
    if (answer === null || answer === undefined) {
      unanswered++;
    } else if (answer === q.correct) {
      correct++;
    } else {
      incorrect++;
    }
  }

  return {
    correct,
    incorrect,
    unanswered,
    total: questions.length,
    passed: correct >= 17,
  };
}
