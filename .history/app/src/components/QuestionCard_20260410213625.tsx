"use client";

import { Question } from "../lib/types";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  showResult: boolean;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  showResult,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
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
    </div>
  );
}
