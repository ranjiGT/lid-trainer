"use client";

import { useState, useCallback, useMemo } from "react";
import { Question } from "../../lib/types";
import { getAllQuestions, shuffleArray } from "../../lib/questions";
import { useLanguage } from "../../components/LanguageProvider";
import { t } from "../../lib/i18n";
import QuestionCard from "../../components/QuestionCard";
import TopicCard from "../../components/TopicCard";
import TopicDetail from "../../components/TopicDetail";
import LanguageToggle from "../../components/LanguageToggle";
import ThemeToggle from "../../components/ThemeToggle";
import Link from "next/link";
import { topics, topicCategories, Topic } from "../../data/topics";

export default function TopicsPage() {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const allQuestions = useMemo(() => getAllQuestions(), []);

  const filteredTopics = useMemo(() => {
    if (!selectedCategory) return topics;
    return topics.filter((topic) => topic.category === selectedCategory);
  }, [selectedCategory]);

  const startPractice = useCallback(
    (questionNumbers: number[], topic: Topic) => {
      const qs = allQuestions.filter((q) =>
        questionNumbers.includes(q.number)
      );
      setActiveTopic(topic);
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

  // Practice mode for a specific topic
  if (activeTopic && questions.length > 0) {
    const currentQuestion = questions[currentIndex];

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setActiveTopic(null)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ← {lang === "de" ? "Zurück zu Themen" : "Back to Topics"}
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
              className="h-full bg-amber-500 transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Topic context banner */}
          <div className="mb-6 flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
            <span className="text-2xl">{activeTopic.illustration}</span>
            <div>
              <h2 className="font-bold text-amber-900 dark:text-amber-200">
                {activeTopic.title[lang]}
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
                    onClick={() => setActiveTopic(null)}
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

  // Detail view for a specific topic
  if (selectedTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setSelectedTopic(null)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ← {lang === "de" ? "Zurück zu Themen" : "Back to Topics"}
            </button>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </header>

        <main className="px-4 py-8">
          <TopicDetail
            topic={selectedTopic}
            lang={lang}
            onBack={() => setSelectedTopic(null)}
            onPractice={(nums) => startPractice(nums, selectedTopic)}
          />
        </main>
      </div>
    );
  }

  // Topic browser
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

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {lang === "de" ? "Themen & Grundlagen" : "Topics & Basics"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {lang === "de"
              ? "Lernen Sie wichtige Begriffe und Konzepte kennen. Jedes Thema ist mit den zugehörigen Prüfungsfragen verknüpft."
              : "Learn important terms and concepts. Each topic is linked to related exam questions."}
          </p>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === null
                ? "bg-amber-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {lang === "de" ? "Alle" : "All"} ({topics.length})
          </button>
          {topicCategories.map((cat) => {
            const count = topics.filter((t) => t.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.id ? null : cat.id
                  )
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-amber-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {cat.icon} {cat.title[lang]} ({count})
              </button>
            );
          })}
        </div>

        {/* Topics grid by category */}
        {selectedCategory === null ? (
          // Show grouped by category
          <div className="space-y-10">
            {topicCategories.map((cat) => {
              const catTopics = topics.filter((t) => t.category === cat.id);
              if (catTopics.length === 0) return null;
              return (
                <section key={cat.id}>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <span>{cat.icon}</span>
                    {cat.title[lang]}
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catTopics.map((topic) => (
                      <TopicCard
                        key={topic.id}
                        topic={topic}
                        lang={lang}
                        onPractice={(nums) => startPractice(nums, topic)}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          // Show filtered flat grid
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                lang={lang}
                onPractice={(nums) => startPractice(nums, topic)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
