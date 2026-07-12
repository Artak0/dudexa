"use client";

import { useEffect, useState } from "react";
import type { Language } from "./content";

export function useSiteLanguage() {
  const [language, setLanguage] = useState<Language>("tr");
  useEffect(() => {
    const saved = window.localStorage.getItem("dudexa-language") as Language | null;
    const browser = navigator.language.toLowerCase();
    const detected: Language = browser.startsWith("zh") ? "zh" : browser.startsWith("en") ? "en" : "tr";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLanguage(saved && ["tr", "en", "zh"].includes(saved) ? saved : detected);
  }, []);
  function select(next: Language) {
    setLanguage(next);
    window.localStorage.setItem("dudexa-language", next);
    document.documentElement.lang = next === "zh" ? "zh-CN" : next;
  }
  return { language, select };
}
