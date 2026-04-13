"use client";

import { Question } from "../lib/types";
import { calculateScore } from "../lib/questions";
import { useLanguage } from "./LanguageProvider";
import { t } from "../lib/i18n";
import { basePath } from "../lib/basePath";

interface ResultsProps {
  questions: Question[];
  answers: Record<string, number | null>;
  onRestart: () => void;
  onHome: () => void;
  isExamMode: boolean;
}

export default function Results({
  questions,
  answers,
  onRestart,
  onHome,
  isExamMode,
}: ResultsProps) {
  const { lang } = useLanguage();
  const score = calculateScore(questions, answers);
  const percentage = Math.round((score.correct / score.total) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Score Card */}
      <div
        className={`rounded-2xl p-8 text-center ${
          score.passed
            ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-200 dark:border-green-800"
            : "bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 border-2 border-red-200 dark:border-red-800"
        }`}
      >
        <div className="text-6xl mb-4">
          {score.passed ? "🎉" : "📚"}
        </div>
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          {score.passed ? t("passed", lang) : t("failed", lang)}
        </h2>

        {/* Circular progress */}
        <div className="relative w-40 h-40 mx-auto my-6">
          <svg
            className="w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 2.64} ${264 - percentage * 2.64}`}
              className={
                score.passed ? "text-green-500" : "text-red-500"
              }
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {percentage}%
            </span>
            <span className="text-sm text-gray-500">
              {score.correct}/{score.total}
            </span>
          </div>
        </div>

        {isExamMode && (
          <p className="text-gray-600 dark:text-gray-400">
            {t("passingScore", lang)}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {score.correct}
          </p>
          <p className="text-sm text-green-700 dark:text-green-300">
            {t("correctAnswers", lang)}
          </p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {score.incorrect}
          </p>
          <p className="text-sm text-red-700 dark:text-red-300">
            {t("incorrectAnswers", lang)}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
            {score.unanswered}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {t("unanswered", lang)}
          </p>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          {t("reviewAnswers", lang)}
        </h3>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {questions.map((q, i) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correct;
            const wasAnswered = userAnswer !== null && userAnswer !== undefined;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border-2 ${
                  isCorrect
                    ? "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10"
                    : wasAnswered
                      ? "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10"
                      : "border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCorrect
                        ? "bg-green-500 text-white"
                        : wasAnswered
                          ? "bg-red-500 text-white"
                          : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {isCorrect ? "✓" : wasAnswered ? "✗" : "–"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {t("question", lang)} {i + 1}: {q.question}
                    </p>
                    {q.image && (
                      <img
                        src={`${basePath}${q.image}`}
                        alt="Question image"
                        className="rounded-lg border border-gray-200 dark:border-gray-600 max-w-xs h-auto my-2"
                      />
                    )}
                    {wasAnswered && !isCorrect && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {t("yourAnswer", lang)}:{" "}
                        {q.options[userAnswer!]}
                      </p>
                    )}
                    {!isCorrect && (
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {t("correctAnswer", lang)}:{" "}
                        {q.options[q.correct]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          {t("tryAgain", lang)}
        </button>
        <button
          onClick={onHome}
          className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {t("backToHome", lang)}
        </button>
      </div>
    </div>
  );
}
