import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Lang, Dict } from '@/i18n/types';
import en from '@/i18n/en';
import hi from '@/i18n/hi';
import ta from '@/i18n/ta';
import ml from '@/i18n/ml';

const dict: Record<Lang, Dict> = { en, hi, ta, ml };

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: dict.en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  return (
    <Ctx.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);
export type { Lang };
