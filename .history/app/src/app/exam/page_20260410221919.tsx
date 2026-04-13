"use client";

import { useState, useCallback } from "react";
import { Question, STATE_NAMES } from "../../lib/types";
import { generateExamQuestions } from "../../lib/questions";
import { useLanguage } from "../../components/LanguageProvider";
import { t } from "../../lib/i18n";
import QuestionCard from "../../components/QuestionCard";
import Timer from "../../components/Timer";
import Results from "../../components/Results";
import LanguageToggle from "../../components/LanguageToggle";
import ThemeToggle from "../../components/ThemeToggle";
import Link from "next/link";

type ExamPhase = "setup" | "running" | "results";

export default function ExamPage() {
  const { lang } = useLanguage();
  const [phase, setPhase] = useState<ExamPhase>("setup");
  const [selectedState, setSelectedState] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const startExam = useCallback(() => {
    if (!selectedState) return;
    const examQuestions = generateExamQuestions(selectedState);
    setQuestions(examQuestions);
    setCurrentIndex(0);
    setAnswers({});
    setPhase("running");
    setIsTimerRunning(true);
  }, [selectedState]);

  const handleSelectAnswer = (index: number) => {
    const questionId = questions[currentIndex].id;
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
  };

  const handleSubmit = useCallback(() => {
    setIsTimerRunning(false);
    setPhase("results");
  }, []);

  const handleTimeUp = useCallback(() => {
    setIsTimerRunning(false);
    setPhase("results");
  }, []);

  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
  };

  if (phase === "setup") {
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
          <div className="text-6xl mb-6">📝</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t("examMode", lang)}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {t("examDescription", lang)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
            {t("realExamInfo", lang)}
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t("chooseState", lang)}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(STATE_NAMES).map(([code, names]) => (
                <button
                  key={code}
                  onClick={() => setSelectedState(code)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all ${
                    selectedState === code
                      ? "bg-blue-600 text-white ring-2 ring-blue-300"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {names[lang]}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startExam}
            disabled={!selectedState}
            className="px-10 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
          >
            {t("startExam", lang)} →
          </button>
        </main>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("examComplete", lang)}
            </span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <Results
            questions={questions}
            answers={answers}
            onRestart={() => {
              setPhase("setup");
              setSelectedState("");
            }}
            onHome={() => {
              window.location.href = "/";
            }}
            isExamMode={true}
          />
        </main>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header with timer */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("examMode", lang)}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {answeredCount}/33 {t("questionsCount", lang)}
              </span>
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
          <Timer
            timeLimit={3600}
            onTimeUp={handleTimeUp}
            isRunning={isTimerRunning}
          />
        </div>

        {/* Question navigator */}
        <div className="max-w-4xl mx-auto px-4 py-2 flex gap-1 overflow-x-auto">
          {questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => goToQuestion(idx)}
              className={`flex-shrink-0 w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                idx === currentIndex
                  ? "bg-blue-600 text-white"
                  : answers[q.id] !== undefined
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentQuestion && (
          <>
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={answers[currentQuestion.id] ?? null}
              onSelectAnswer={handleSelectAnswer}
              showResult={false}
              questionNumber={currentIndex + 1}
              totalQuestions={questions.length}
            />

            <div className="flex justify-between mt-6 max-w-3xl mx-auto">
              <button
                onClick={() =>
                  setCurrentIndex(Math.max(0, currentIndex - 1))
                }
                disabled={currentIndex === 0}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← {t("previous", lang)}
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  {t("next", lang)} →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
                >
                  {t("submit", lang)} ✓
                </button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
