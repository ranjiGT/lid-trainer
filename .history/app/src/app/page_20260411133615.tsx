"use client";

import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";
import { t } from "../lib/i18n";
import LanguageToggle from "../components/LanguageToggle";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇩🇪</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {t("siteTitle", lang)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-4xl mx-auto px-4">
        <div className="text-center py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
            {t("siteTitle", lang)}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            {t("siteSubtitle", lang)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 max-w-lg mx-auto">
            {t("realExamInfo", lang)}
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid md:grid-cols-3 gap-6 pb-16">
          {/* Practice Mode */}
          <Link href="/practice" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border-2 border-transparent group-hover:border-blue-300 dark:group-hover:border-blue-600 h-full">
              <div className="text-5xl mb-6">📚</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {t("practiceMode", lang)}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t("practiceDescription", lang)}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                <span className="flex items-center gap-1">
                  📋 460 {t("questionsCount", lang)}
                </span>
                <span className="flex items-center gap-1">
                  ⏱️ {lang === "de" ? "Kein Zeitlimit" : "No time limit"}
                </span>
              </div>
              <div className="mt-6 text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                {t("startPractice", lang)} →
              </div>
            </div>
          </Link>

          {/* Image Questions */}
          <Link href="/images" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border-2 border-transparent group-hover:border-purple-300 dark:group-hover:border-purple-600 h-full">
              <div className="text-5xl mb-6">🖼️</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {t("imageQuestions", lang)}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t("imageQuestionsDescription", lang)}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                <span className="flex items-center gap-1">
                  🖼️ 40 {t("questionsCount", lang)}
                </span>
                <span className="flex items-center gap-1">
                  ⏱️ {lang === "de" ? "Kein Zeitlimit" : "No time limit"}
                </span>
              </div>
              <div className="mt-6 text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                {t("startImagePractice", lang)} →
              </div>
            </div>
          </Link>

          {/* Exam Mode */}
          <Link href="/exam" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border-2 border-transparent group-hover:border-green-300 dark:group-hover:border-green-600 h-full">
              <div className="text-5xl mb-6">📝</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {t("examMode", lang)}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t("examDescription", lang)}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                <span className="flex items-center gap-1">
                  📋 33 {t("questionsCount", lang)}
                </span>
                <span className="flex items-center gap-1">
                  ⏱️ 60 {t("minutes", lang)}
                </span>
              </div>
              <div className="mt-6 text-green-600 dark:text-green-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                {t("startExam", lang)} →
              </div>
            </div>
          </Link>
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 mb-16 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-4">
            {lang === "de" ? "ℹ️ Über die Prüfung" : "ℹ️ About the Exam"}
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-blue-800 dark:text-blue-300">
            <div>
              <p className="font-semibold mb-1">
                {lang === "de" ? "Gesamtfragenkatalog" : "Question Catalog"}
              </p>
              <p>
                {lang === "de"
                  ? "300 allgemeine + 10 landesspezifische Fragen pro Bundesland (460 gesamt)"
                  : "300 general + 10 state-specific questions per state (460 total)"}
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">
                {lang === "de" ? "Prüfungsformat" : "Exam Format"}
              </p>
              <p>
                {lang === "de"
                  ? "33 Fragen, 60 Minuten, mindestens 17 richtige Antworten zum Bestehen"
                  : "33 questions, 60 minutes, at least 17 correct answers to pass"}
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">
                {lang === "de" ? "Quelle" : "Source"}
              </p>
              <p>
                {lang === "de"
                  ? "BAMF Gesamtfragenkatalog, Stand 07.05.2025"
                  : "BAMF Complete Question Catalog, as of 07.05.2025"}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-500">
          {lang === "de"
            ? "Basierend auf dem offiziellen Gesamtfragenkatalog des BAMF. Keine Gewähr für Richtigkeit."
            : "Based on the official BAMF question catalog. No guarantee of correctness."}
        </div>
      </footer>
    </div>
  );
}
