"use client";

import { Question } from "../lib/types";
import { basePath } from "../lib/basePath";
import { useLanguage } from "./LanguageProvider";
import { useState } from "react";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  showResult: boolean;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuestionCard(props: QuestionCardProps) {
  const { question, selectedAnswer, onSelectAnswer, showResult, questionNumber, totalQuestions } = props;
  const { lang } = useLanguage();
  const [showReport, setShowReport] = useState(false);
  const [reportText, setReportText] = useState("");
  const [reportSent, setReportSent] = useState(false);

  // Helper to open mailto with prefilled subject/body
  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`LID: Fehler in Frage #${question.number}`);
    const body = encodeURIComponent(
      `Frage: ${question.question}\n\nBeschreibung des Problems:\n${reportText}\n\nFragen-ID: ${question.id}`
    );
    window.open(`mailto:ranjiraj4141@gmail.com?subject=${subject}&body=${body}`);
    setReportSent(true);
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {questionNumber} / {totalQuestions}
        </span>
        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          #{question.number}
        </span>
      </div>

      <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-6 leading-relaxed">
        {question.question}
      </h2>


      {question.image && (
        <>
          <div className="mb-2">
            <img
              src={`${basePath}${question.image}`}
              alt="Question image"
              className="rounded-xl border border-gray-200 dark:border-gray-600 max-w-full h-auto mx-auto"
            />
          </div>
          {/* Show Bild 1-4 labels below images if showImageLabels is true */}
          {question.image &&
            question.options.length === 4 &&
            question.showImageLabels && (
              <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto mb-6 mt-2">
                {[1, 2, 3, 4].map((n) => (
                  <span
                    key={n}
                    className="text-base md:text-lg font-bold text-gray-900 dark:text-white text-center w-full"
                  >
                    {`Bild ${n}`}
                  </span>
                ))}
              </div>
            )}
        </>
      )}

      <div className="space-y-3">
        {question.options.map((option, index) => {
          let classes =
            "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ";

          if (showResult) {
            if (index === question.correct) {
              classes +=
                "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200";
            } else if (
              index === selectedAnswer &&
              index !== question.correct
            ) {
              classes +=
                "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200";
            } else {
              classes +=
                "border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400";
            }
          } else if (index === selectedAnswer) {
            classes +=
              "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 ring-2 ring-blue-200 dark:ring-blue-800";
          } else {
            classes +=
              "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300";
          }

          return (
            <button
              key={index}
              onClick={() => !showResult && onSelectAnswer(index)}
              disabled={showResult}
              className={classes}
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 border-current">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-sm md:text-base leading-relaxed pt-1">
                  {option}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div
          className={`mt-6 p-4 rounded-xl ${
            selectedAnswer === question.correct
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          }`}
        >
          <p
            className={`font-semibold ${
              selectedAnswer === question.correct
                ? "text-green-700 dark:text-green-300"
                : "text-red-700 dark:text-red-300"
            }`}
          >
            {selectedAnswer === question.correct ? "✓ Richtig!" : "✗ Falsch!"}
          </p>
          {selectedAnswer !== question.correct && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Richtige Antwort: {question.options[question.correct]}
            </p>
          )}
        </div>
      )}

      {showResult && question.explanation && (
        <div className="mt-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">
            {lang === "de" ? "Erklärung" : "Explanation"}
          </p>
          <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
            {question.explanation[lang]}
          </p>
        </div>
      )}

      {/* Report incorrect info button */}
      <div className="mt-6 flex justify-end">
        <button
          className="text-xs text-red-600 dark:text-red-400 underline hover:text-red-800 dark:hover:text-red-300"
          onClick={() => setShowReport(true)}
        >
          {lang === "de" ? "Fehler melden" : "Report incorrect info"}
        </button>
      </div>

      {/* Modal for reporting */}
      {showReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => {
                setShowReport(false);
                setReportText("");
                setReportSent(false);
              }}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
              {lang === "de" ? "Fehler in dieser Frage melden" : "Report incorrect info"}
            </h3>
            {reportSent ? (
              <div className="text-green-600 dark:text-green-400 py-4 text-center">
                {lang === "de"
                  ? "Danke für Ihre Rückmeldung! Ihr E-Mail-Programm sollte sich geöffnet haben."
                  : "Thank you for your feedback! Your email client should have opened."}
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <textarea
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 min-h-[80px] bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder={
                    lang === "de"
                      ? "Beschreiben Sie das Problem (z.B. falsche Antwort, veraltete Information, etc.)"
                      : "Describe the issue (e.g. wrong answer, outdated info, etc.)"
                  }
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg w-full"
                >
                  {lang === "de" ? "E-Mail senden" : "Send Email"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
