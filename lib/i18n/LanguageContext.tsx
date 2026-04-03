"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Lang, getTranslations, translations } from "./index";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: ReturnType<typeof getTranslations>;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "mita_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  // Read saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved && saved in translations) {
      setLangState(saved);
    }
  }, []);

  function setLang(newLang: Lang) {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: getTranslations(lang) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used inside LanguageProvider");
  return ctx;
}
