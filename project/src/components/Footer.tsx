import { lazy, useEffect, useRef } from 'react';
import { Phone, ShieldCheck, Quote } from 'lucide-react';
import { SITE, WHATSAPP_LINK } from '@/data/site';
import { Section, Reveal, Icon } from '@/components/ui';
import { SafeCanvas } from '@/components/three/Scene';
import { isLowPoweredDevice } from '@/lib/performance';
import { useLang } from '@/context/LanguageContext';

const Particles = lazy(() => import('@/components/three/Particles'));

export function Emergency() {
  const { t } = useLang();

  return (
    <Section id="emergency" eyebrow={t.sections.emergency.eyebrow} title={t.sections.emergency.title} subtitle={t.sections.emergency.subtitle}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.emergency.map((e, i) => (
          <Reveal key={e.label} delay={i * 0.05}>
            <a
              href={`tel:${e.number.replace(/\s/g, '')}`}
              className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-red-200 hover:shadow-premium dark:border-white/10 dark:bg-slate-900/60"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-red-100 text-red-600 dark:from-red-900/30 dark:to-red-900/10">
                <Icon name={e.icon} className="h-6 w-6" />
              </span>
              <div>
                <p className="font-heading text-sm font-semibold text-ink dark:text-white">{e.label}</p>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">{e.number}</p>
              </div>
              <span className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 transition-all group-hover:bg-red-500 group-hover:text-white dark:bg-red-900/30">
                <Phone className="h-4 w-4" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      {/* Trust strip */}
      <Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 rounded-3xl border border-gray-100 bg-gradient-to-br from-ocean-50 to-white p-5 shadow-soft dark:border-white/10 dark:from-ocean-900/30 dark:to-transparent sm:grid-cols-3 lg:grid-cols-6">
          {t.trustStrip.map((tBadge) => (
            <div key={tBadge.label} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-ocean-600 shadow-soft dark:bg-slate-800 dark:text-ocean-300">
                <Icon name={tBadge.icon} className="h-5 w-5" />
              </span>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{tBadge.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

export function About() {
  const { t } = useLang();
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;

    const prevent = (e: Event) => e.preventDefault();

    el.addEventListener('contextmenu', prevent);
    el.addEventListener('selectstart', prevent);
    el.addEventListener('dragstart', prevent);

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (
        (e.ctrlKey && ['s', 'p', 'u'].includes(key)) ||
        key === 'printscreen' ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(key))
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      el.removeEventListener('contextmenu', prevent);
      el.removeEventListener('selectstart', prevent);
      el.removeEventListener('dragstart', prevent);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return ( 
    <Section id="about" eyebrow={t.about.eyebrow} title={t.about.title} subtitle={t.about.subtitle}>
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="card-3d grid gap-8 p-6 shadow-premium sm:p-10 md:grid-cols-[auto_1fr] md:items-center">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-ocean-600 to-gold-500 opacity-60 blur-lg" />
                <div ref={imageRef} className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-gold-500/60 shadow-soft sm:h-32 sm:w-32 select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
                  <img src="/ajceo.png" alt="AJ CEO" className="h-24 w-16 rounded-full object-cover sm:h-28 sm:w-20 pointer-events-none" draggable={false} />
                </div>
                <span className="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white ring-2 ring-white dark:ring-slate-900">
                  <ShieldCheck className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 font-heading text-base font-semibold text-ink dark:text-white">{t.about.founderName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.about.founderRole}</p>
              <div className="mt-2 flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                <ShieldCheck className="h-3 w-3" /> {t.about.verifiedLocal}
              </div>
            </div>
            <div className="space-y-4">
              <Quote className="h-7 w-7 text-ocean-200 dark:text-ocean-700" />
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">{t.about.paragraph1}</p>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">{t.about.paragraph2}</p>
<div className="flex flex-wrap gap-3 pt-2">
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-105 hover:shadow-premium">
                  {t.about.whatsappCTA}
                </a>
                <a href="#contact" className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-ocean-50 hover:text-ocean-700 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5">
                  {t.about.moreAbout}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Contact() {
  const { t } = useLang();

  return (
    <Section id="contact" eyebrow={t.contact.eyebrow} title={t.contact.title} subtitle={t.contact.subtitle}>
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.contact.items.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.05}>
            <a href={c.href} target="_blank" rel="noreferrer" className="lift-3d group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean-600 to-sky-2 text-white transition-transform duration-300 group-hover:scale-110">
                <Icon name={c.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{c.label}</p>
                <p className="font-heading text-sm font-semibold text-ink dark:text-white">{c.value}</p>
              </div>
              <span className="ml-auto h-2 w-2 rounded-full bg-ocean-200 transition-colors group-hover:bg-ocean-600 dark:bg-ocean-800" />
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative overflow-hidden border-t border-gray-100 bg-gradient-to-b from-white to-ocean-50/40 dark:border-white/10 dark:from-slate-950 dark:to-slate-900">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <SafeCanvas camera={{ position: [0, 0, 6], fov: 50 }} className="!absolute !inset-0 h-full w-full">
          <Particles count={isLowPoweredDevice() ? 30 : 60} />
        </SafeCanvas>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black shadow-sm">
                <img src="/finel icon.png" alt="Icon" className="h-8 w-8" />
              </span>
              <span className="font-heading text-base font-semibold text-ink dark:text-white">{t.footer.logoText}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-gray-500 dark:text-gray-400">{t.footer.description}</p>
            <div className="mt-4 flex gap-2">
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-ocean-600 hover:text-white dark:bg-white/5 dark:text-gray-300"><Icon name="MessageCircle" className="h-4 w-4" /></a>
              <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-ocean-600 hover:text-white dark:bg-white/5 dark:text-gray-300"><Icon name="Instagram" className="h-4 w-4" /></a>
              <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-ocean-600 hover:text-white dark:bg-white/5 dark:text-gray-300"><Icon name="Facebook" className="h-4 w-4" /></a>
              <a href={`mailto:${SITE.email}`} aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-ocean-600 hover:text-white dark:bg-white/5 dark:text-gray-300"><Icon name="Mail" className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-ink dark:text-white">{t.footer.quickTitle}</h4>
            <ul className="mt-3 space-y-2">
              {t.footer.quickLinks.map((q) => (
                <li key={q.label}><a href={q.href} className="text-sm text-gray-500 transition-colors hover:text-ocean-600 dark:text-gray-400 dark:hover:text-ocean-300">{q.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-ink dark:text-white">{t.footer.legalTitle}</h4>
            <ul className="mt-3 space-y-2">
              {t.footer.legal.map((item) => (
                <li key={item.label}><a href={item.href} className="text-sm text-gray-500 transition-colors hover:text-ocean-600 dark:text-gray-400 dark:hover:text-ocean-300">{item.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-ink dark:text-white">{t.footer.emergencyTitle}</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500 dark:text-gray-400">
              {t.emergency.slice(0, 3).map((e) => (
                <li key={e.label} className="flex items-center gap-2">
                  <Icon name={e.icon} className="h-3.5 w-3.5 text-red-500" />
                  {e.label}: {e.number}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-6 text-xs text-gray-400 dark:border-white/10 sm:flex-row">
          <p>{t.footer.note.replace('{year}', String(new Date().getFullYear()))}</p>
          <p>{t.footer.subtext}</p>
        </div>
      </div>
    </footer>
  );
}
