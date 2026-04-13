"use client";

import { useState, useCallback } from "react";
import { Question } from "../../lib/types";
import { getImageQuestions, shuffleArray } from "../../lib/questions";
import { useLanguage } from "../../components/LanguageProvider";
import { t } from "../../lib/i18n";
import QuestionCard from "../../components/QuestionCard";
import LanguageToggle from "../../components/LanguageToggle";
import ThemeToggle from "../../components/ThemeToggle";
import Link from "next/link";

export default function ImageQuestionsPage() {
  const { lang } = useLanguage();
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const startPractice = useCallback(() => {
    setQuestions(shuffleArray(getImageQuestions()));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setStats({ correct: 0, total: 0 });
    setStarted(true);
  }, []);

  const checkAnswer = () => {
    setShowResult(true);
    setStats((prev) => ({
      correct:
        prev.correct +
        (selectedAnswer === questions[currentIndex].correct ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ← {t("backToHome", lang)}
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="text-6xl mb-6">🖼️</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t("imageQuestions", lang)}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t("imageQuestionsDescription", lang)}
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
            <div className="grid grid-cols-2 gap-6 text-center mb-6">
              <div>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {getImageQuestions().length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("questionsCount", lang)}
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  🖼️
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {lang === "de"
                    ? "Wappen, Karten & mehr"
                    : "Coats of arms, maps & more"}
                </p>
              </div>
            </div>

            <button
              onClick={startPractice}
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
            >
              {t("startImagePractice", lang)}
            </button>
          </div>
        </main>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setStarted(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ← {t("backToHome", lang)}
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t("correct", lang)}: {stats.correct}/{stats.total}
            </span>
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-purple-500 transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentQuestion && (
          <>
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={(index) => setSelectedAnswer(index)}
              showResult={showResult}
              questionNumber={currentIndex + 1}
              totalQuestions={questions.length}
            />

            <div className="flex justify-center mt-6 gap-4">
              {!showResult ? (
                <button
                  onClick={checkAnswer}
                  disabled={selectedAnswer === null}
                  className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {t("showAnswer", lang)}
                </button>
              ) : currentIndex < questions.length - 1 ? (
                <button
                  onClick={nextQuestion}
                  className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
                >
                  {t("nextQuestion", lang)} →
                </button>
              ) : (
                <button
                  onClick={() => setStarted(false)}
                  className="px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
                >
                  {t("examComplete", lang)} - {stats.correct}/{stats.total} ✓
                </button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
