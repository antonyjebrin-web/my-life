import { createContext, useContext, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'ta' | 'hi' | 'ml';

const dict = {
  en: {
    nav: { home: 'Home', explore: 'Explore', hotels: 'Hotels', experiences: 'Experiences', food: 'Food', planner: 'Trip Planner', blog: 'Blog', about: 'About', contact: 'Contact' },
    hero: { title: 'Explore Kanyakumari Like a Local', subtitle: 'Hotels • Cabs • Food • Sightseeing • Boat Rides • Hidden Places • Personalized Travel Assistance', plan: 'Plan My Trip', whatsapp: 'Chat on WhatsApp' },
  },
  ta: {
    nav: { home: 'முகப்பு', explore: 'ஆய்வு', hotels: 'ஹோட்டல்கள்', experiences: 'அனுபவங்கள்', food: 'உணவு', planner: 'பயண திட்டம்', blog: 'வலைப்பதிவு', about: 'எங்களைப் பற்றி', contact: 'தொடர்பு' },
    hero: { title: 'கன்னியாகுமரியை உள்ளூர் போல் அறியவும்', subtitle: 'ஹோட்டல்கள் • கேப்கள் • உணவு • பார்வை • படகு சவாரி • மறைந்த இடங்கள் • தனிப்பயன் பயண உதவி', plan: 'என் பயணத்தை திட்டமிடு', whatsapp: 'WhatsApp-ல் அரட்டையடிக்கவும்' },
  },
  hi: {
    nav: { home: 'होम', explore: 'एक्सप्लोर', hotels: 'होटल', experiences: 'अनुभव', food: 'खाना', planner: 'यात्रा योजना', blog: 'ब्लॉग', about: 'हमारे बारे में', contact: 'संपर्क' },
    hero: { title: 'कन्याकुमारी को एक स्थानीय की तरह एक्सप्लोर करें', subtitle: 'होटल • कैब • खाना • पर्यटन • बोट राइड • छिपी जगहें • व्यक्तिगत यात्रा सहायता', plan: 'मेरी यात्रा योजना बनाएं', whatsapp: 'WhatsApp पर चैट करें' },
  },
  ml: {
    nav: { home: 'ഹോം', explore: 'പര്യവേക്ഷണം', hotels: 'ഹോട്ടലുകൾ', experiences: 'അനുഭവങ്ങൾ', food: 'ഭക്ഷണം', planner: 'യാത്രാ പ്ലാൻ', blog: 'ബ്ലോഗ്', about: 'ഞങ്ങളെക്കുറിച്ച്', contact: 'ബന്ധപ്പെടുക' },
    hero: { title: 'കന്യാകുമാരി പ്രാദേശികനെപ്പോലെ പര്യവേക്ഷണം ചെയ്യൂ', subtitle: 'ഹോട്ടലുകൾ • കാബുകൾ • ഭക്ഷണം • സന്ദർശനം • ബോട്ട് റൈഡ് • മറഞ്ഞിരിക്കുന്ന സ്ഥലങ്ങൾ • വ്യക്തിഗത യാത്രാ സഹായം', plan: 'എൻ്റെ യാത്ര പ്ലാൻ ചെയ്യുക', whatsapp: 'WhatsApp-ൽ ചാറ്റ് ചെയ്യുക' },
  },
} as const;

type Dict = {
  nav: Record<string, string>;
  hero: { title: string; subtitle: string; plan: string; whatsapp: string };
};

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: dict.en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem('ek-lang') as Lang) || 'en';
  });

  const set = (l: Lang) => {
    setLang(l);
    localStorage.setItem('ek-lang', l);
  };

  return <Ctx.Provider value={{ lang, setLang: set, t: dict[lang] as unknown as Dict }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
