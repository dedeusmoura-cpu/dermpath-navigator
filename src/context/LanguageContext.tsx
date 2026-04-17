import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { Language, languageStorageKey, t, translateList, translateText } from "../i18n/translations";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: Parameters<typeof t>[1]) => string;
  tx: (text: string | undefined) => string;
  txList: (items: string[] | undefined) => string[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = window.localStorage.getItem(languageStorageKey);
    return stored === "en" ? "en" : "pt";
  });

  useEffect(() => {
    window.localStorage.setItem(languageStorageKey, language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key) => t(language, key),
      tx: (text) => translateText(text, language),
      txList: (items) => translateList(items, language),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
