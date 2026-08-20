import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe, Phone } from 'lucide-react';
import { NAV, SITE, WHATSAPP_LINK } from '@/data/site';
import { useTheme } from '@/context/ThemeContext';
import { useLang, type Lang } from '@/context/LanguageContext';

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'ta', label: 'தமிழ்', flag: 'TA' },
  { code: 'hi', label: 'हिन्दी', flag: 'HI' },
  { code: 'ml', label: 'മലയാളം', flag: 'ML' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section while scrolling
  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navItems = NAV.filter((n) => n.id !== 'experiences' && n.id !== 'blog').map((n) => ({
    ...n,
    label: (t.nav as Record<string, string>)[n.id] ?? n.label,
  }));

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black shadow-soft' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-2">
            <span className="relative">
              <img
                src="/finel icon.png"
                alt="AJ Explorer logo"
                className="h-8 w-8 rounded-2xl object-cover shadow-soft transition-transform group-hover:scale-110 sm:h-9 sm:w-9"
              />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-gold-500 ring-2 ring-white dark:ring-slate-900" />
            </span>
            <span className={`font-heading text-sm font-semibold tracking-tight sm:text-base ${scrolled ? 'text-white' : 'text-white drop-shadow'}`}>
              Explore <span className="text-gradient-ocean">Kanyakumari</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative rounded-full px-3 py-1.5 text-sm font-bold transition-colors ${
                  activeId === item.id
                    ? scrolled
                      ? 'text-ocean-700 dark:text-ocean-300'
                      : 'text-white'
                    : scrolled
                    ? 'text-gray-200 hover:bg-white/10 hover:text-white dark:text-gray-200 dark:hover:bg-white/10 dark:hover:text-white'
                    : 'text-white/90 hover:bg-white/15 hover:text-white'
                }`}
              >
                {activeId === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-transparent ring-1 ring-ocean-200 dark:ring-ocean-500/40"
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  />
                )}
                {item.label}
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1.5">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                aria-label="Select language"
                className={`flex h-9 items-center gap-1 rounded-full px-2.5 text-sm font-medium transition-colors ${
                  scrolled ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/15'
                }`}
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{LANGS.find((l) => l.code === lang)?.flag}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1 shadow-card dark:border-white/10 dark:bg-slate-900"
                    >
                      {LANGS.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => {
                            setLang(l.code);
                            setLangOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                            lang === l.code ? 'bg-ocean-50 text-ocean-700 dark:bg-ocean-900/40 dark:text-ocean-200' : 'hover:bg-gray-50 dark:hover:bg-white/5'
                          }`}
                        >
                          {l.label}
                          <span className="text-xs text-gray-400">{l.flag}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                scrolled ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/15'
              }`}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-2 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-105 sm:flex"
            >
              <Phone className="h-3.5 w-3.5" />
              {t.navbar.whatsapp}
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={`flex h-9 w-9 items-center justify-center rounded-full lg:hidden ${
                scrolled ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/15'
              }`}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-72 max-w-[80vw] flex-col bg-white p-5 shadow-2xl dark:bg-slate-900 lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-heading text-lg font-semibold text-ink dark:text-white">{t.navbar.menu}</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-white/10">
                  <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-3 py-2.5 text-base font-medium transition-colors ${
                      activeId === item.id
                        ? 'bg-ocean-50 text-ocean-700 dark:bg-ocean-900/40 dark:text-ocean-300'
                        : 'text-gray-700 hover:bg-ocean-50 hover:text-ocean-700 dark:text-gray-200 dark:hover:bg-white/5'
                    }`}
                  >
                {activeId === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-transparent ring-1 ring-ocean-200 dark:ring-ocean-500/40"
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  />
                )}
                {item.label}
                  </a>
                ))}
              </nav>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-auto flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white"
              >
                {t.navbar.chatWhatsApp}
              </a>
              <a href={`tel:${SITE.phoneRaw}`} className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-ocean-600 px-4 py-3 text-sm font-semibold text-white">
                {t.navbar.call} {SITE.phone}
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

