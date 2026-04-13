"use client";

import { Topic } from "../data/topics";
import { Language } from "../lib/types";

interface TopicDetailProps {
  topic: Topic;
  lang: Language;
  onBack: () => void;
  onPractice: (questionNumbers: number[]) => void;
}

export default function TopicDetail({
  topic,
  lang,
  onBack,
  onPractice,
}: TopicDetailProps) {
  const details = topic.details;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6 inline-flex items-center gap-1"
      >
        ← {lang === "de" ? "Zurück zu Themen" : "Back to Topics"}
      </button>

      {/* Header card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-6">
        <div className="flex items-start gap-5 mb-6">
          <span className="text-6xl flex-shrink-0">{topic.illustration}</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
              {topic.title[lang]}
            </h1>
            {lang === "en" && topic.title.de !== topic.title.en && (
              <p className="text-base text-gray-400 dark:text-gray-500 mt-1">
                {topic.title.de}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {topic.description[lang]}
          </p>
          {lang === "en" && (
            <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed italic">
              {topic.description.de}
            </p>
          )}
        </div>

        {/* Intro (if present) */}
        {details?.intro && (
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800 mb-6">
            <p className="text-amber-900 dark:text-amber-200 font-medium">
              {details.intro[lang]}
            </p>
            {lang === "en" && (
              <p className="text-sm text-amber-700 dark:text-amber-400 mt-1 italic">
                {details.intro.de}
              </p>
            )}
          </div>
        )}

        {/* Image (if present) */}
        {details?.image && (
          <div className="mb-6 flex flex-col items-center">
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
              <img
                src={details.image.src}
                alt={details.image.alt[lang]}
                className="max-w-full max-h-[400px] object-contain"
              />
            </div>
            {details.image.caption && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center italic">
                {details.image.caption[lang]}
              </p>
            )}
          </div>
        )}

        {/* Gallery (if present) */}
        {details?.gallery && details.gallery.length > 0 && (
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {details.gallery.map((img, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 w-full">
                  <img
                    src={img.src}
                    alt={img.alt[lang]}
                    className="w-full h-48 object-cover"
                  />
                </div>
                {img.caption && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center italic">
                    {img.caption[lang]}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Table (if present) */}
        {details?.table && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              {details.table.title[lang]}
            </h2>
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <tbody>
                  {details.table.rows.map((row, i) => (
                    <tr
                      key={i}
                      className={
                        i % 2 === 0
                          ? "bg-gray-50 dark:bg-gray-800/50"
                          : "bg-white dark:bg-gray-800"
                      }
                    >
                      <td className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap w-1/3 border-r border-gray-200 dark:border-gray-700">
                        {row.label[lang]}
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                        <div className="flex items-center gap-3">
                          {row.image && (
                            <img
                              src={row.image}
                              alt={row.value[lang]}
                              className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-gray-200 dark:border-gray-600"
                            />
                          )}
                          <span>{row.value[lang]}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Key Facts (if present) */}
        {details?.keyFacts && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              {details.keyFacts.title[lang]}
            </h2>
            <ul className="space-y-2">
              {details.keyFacts.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700"
                >
                  <span className="text-amber-500 mt-0.5 flex-shrink-0">
                    ●
                  </span>
                  <div>
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      {item.fact[lang]}
                    </span>
                    {lang === "en" && (
                      <span className="block text-xs text-gray-500 dark:text-gray-500 italic mt-0.5">
                        {item.fact.de}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Practice CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-500">
            {topic.relatedQuestionNumbers.length}{" "}
            {lang === "de" ? "verwandte Fragen" : "related questions"}
          </span>
          <button
            onClick={() => onPractice(topic.relatedQuestionNumbers)}
            className="px-6 py-2.5 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm"
          >
            {lang === "de" ? "Fragen üben" : "Practice Questions"} →
          </button>
        </div>
      </div>
    </div>
  );
}
