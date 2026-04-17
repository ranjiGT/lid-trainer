"use client";

import { useState, useCallback } from "react";
import { Question } from "../../lib/types";
import {
  getGeneralQuestions,
  getStateQuestions,
  shuffleArray,
} from "../../lib/questions";
import { useLanguage } from "../../components/LanguageProvider";
import { t } from "../../lib/i18n";
import QuestionCard from "../../components/QuestionCard";
import LanguageToggle from "../../components/LanguageToggle";
import ThemeToggle from "../../components/ThemeToggle";
import Link from "next/link";
import { STATE_NAMES } from "../../lib/types";
import { basePath } from "../../lib/basePath";

export default function PracticePage() {
  const { lang } = useLanguage();
  const [category, setCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const startPractice = useCallback((cat: string) => {
    setCategory(cat);
    let qs: Question[];
    if (cat === "general") {
      qs = getGeneralQuestions();
    } else {
      qs = getStateQuestions(cat);
    }
    setQuestions(shuffleArray(qs));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setStats({ correct: 0, total: 0 });
  }, []);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

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

  if (!category) {
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

        <main className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("practiceMode", lang)}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t("practiceDescription", lang)}
          </p>

          <div className="space-y-6">
            {/* General Questions */}
            <button
              onClick={() => startPractice("general")}
              className="w-full text-left p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-600"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t("generalQuestions", lang)}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    300 {t("questionsCount", lang)}
                  </p>
                </div>
                <span className="text-3xl">📋</span>
              </div>
            </button>

            {/* State-specific */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {t("stateQuestions", lang)}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(STATE_NAMES).map(([code, names]) => (
                  <button
                    key={code}
                    onClick={() => startPractice(code)}
                    className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-600 text-sm font-medium text-gray-700 dark:text-gray-300 flex flex-col items-center"
                  >
                    <img
                      src={`${basePath}/images/coats-of-arms/${code}.png`}
                      alt={names[lang]}
                      width={48}
                      height={48}
                      className="object-contain mb-2"
                    />
                    {names[lang]}
                    <span className="block text-xs text-gray-400 mt-1">
                      10 {t("questionsCount", lang)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
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
            onClick={() => setCategory(null)}
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
            className="h-full bg-blue-500 transition-all duration-300"
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
              onSelectAnswer={handleAnswer}
              showResult={showResult}
              questionNumber={currentIndex + 1}
              totalQuestions={questions.length}
            />

            <div className="flex justify-center mt-6 gap-4">
              {!showResult ? (
                <button
                  onClick={checkAnswer}
                  disabled={selectedAnswer === null}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {t("showAnswer", lang)}
                </button>
              ) : currentIndex < questions.length - 1 ? (
                <button
                  onClick={nextQuestion}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  {t("nextQuestion", lang)} →
                </button>
              ) : (
                <button
                  onClick={() => setCategory(null)}
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
