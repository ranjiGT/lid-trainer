"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "de" ? "en" : "de")}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
    >
      <span className={lang === "de" ? "opacity-100" : "opacity-50"}>🇩🇪</span>
      <span className="text-gray-400">/</span>
      <span className={lang === "en" ? "opacity-100" : "opacity-50"}>🇬🇧</span>
    </button>
  );
}
