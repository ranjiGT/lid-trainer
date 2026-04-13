"use client";

import { Topic } from "../data/topics";
import { Language } from "../lib/types";

interface TopicCardProps {
  topic: Topic;
  lang: Language;
  onPractice: (questionNumbers: number[]) => void;
}

export default function TopicCard({ topic, lang, onPractice }: TopicCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 dark:border-gray-700 flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <span className="text-4xl flex-shrink-0">{topic.illustration}</span>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
            {topic.title[lang]}
          </h3>
          {lang === "en" && topic.title.de !== topic.title.en && (
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
              {topic.title.de}
            </p>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-grow">
        {topic.description[lang]}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
        <span className="text-xs text-gray-500 dark:text-gray-500">
          {topic.relatedQuestionNumbers.length}{" "}
          {lang === "de" ? "Fragen" : "questions"}
        </span>
        <button
          onClick={() => onPractice(topic.relatedQuestionNumbers)}
          className="text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors inline-flex items-center gap-1"
        >
          {lang === "de" ? "Üben" : "Practice"} →
        </button>
      </div>
    </div>
  );
}
