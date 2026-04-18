"use client";

import { useState, useMemo, useCallback, use } from "react";
import Link from "next/link";
import { topics } from "../../../data/topics";
import { Question } from "../../../lib/types";
import { getAllQuestions, shuffleArray } from "../../../lib/questions";
import { useLanguage } from "../../../components/LanguageProvider";
import { t } from "../../../lib/i18n";
import TopicDetail from "../../../components/TopicDetail";
import QuestionCard from "../../../components/QuestionCard";
import LanguageToggle from "../../../components/LanguageToggle";
import ThemeToggle from "../../../components/ThemeToggle";

export default function TopicSlugClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { lang } = useLanguage();

  const topic = useMemo(() => topics.find((t) => t.id === slug), [slug]);

  const allQuestions = useMemo(() => getAllQuestions(), []);
  const [activePractice, setActivePractice] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const startPractice = useCallback(
    (questionNumbers: number[]) => {
      const qs = allQuestions.filter((q) =>
        questionNumbers.includes(q.number)
      );
      setActivePractice(true);
      setQuestions(shuffleArray(qs));
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setStats({ correct: 0, total: 0 });
    },
    [allQuestions]
  );

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

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {lang === "de" ? "Thema nicht gefunden" : "Topic not found"}
          </h1>
          <Link
            href="/topics"
            className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 font-semibold"
          >
            ← {lang === "de" ? "Zurück zu Themen" : "Back to Topics"}
          </Link>
        </div>
      </div>
    );
  }

  // Practice mode
  if (activePractice && questions.length > 0) {
    const currentQuestion = questions[currentIndex];

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setActivePractice(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ← {lang === "de" ? "Zurück zum Thema" : "Back to Topic"}
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t("correct", lang)}: {stats.correct}/{stats.total}
              </span>
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>

          <div className="h-1 bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
            <span className="text-2xl">{topic.illustration}</span>
            <div>
              <h2 className="font-bold text-amber-900 dark:text-amber-200">
                {topic.title[lang]}
              </h2>
              <p className="text-xs text-amber-700 dark:text-amber-400">
                {questions.length}{" "}
                {lang === "de" ? "verwandte Fragen" : "related questions"}
              </p>
            </div>
          </div>

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
                    className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    {t("showAnswer", lang)}
                  </button>
                ) : currentIndex < questions.length - 1 ? (
                  <button
                    onClick={nextQuestion}
                    className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors"
                  >
                    {t("nextQuestion", lang)} →
                  </button>
                ) : (
                  <button
                    onClick={() => setActivePractice(false)}
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

  // Topic detail view
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/topics"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ← {lang === "de" ? "Zurück zu Themen" : "Back to Topics"}
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="px-4 py-8">
        <TopicDetail
          topic={topic}
          lang={lang}
          onBack={() => {}}
          onPractice={(nums) => startPractice(nums)}
        />
      </main>
    </div>
  );
}
