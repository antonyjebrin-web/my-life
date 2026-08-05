import { motion } from 'framer-motion';
import { Section, Reveal, Icon } from '@/components/ui';
import { useLang } from '@/context/LanguageContext';

export function QuickActions() {
  const { t } = useLang();

  return (
<section className="section-pad">
      <div className="mx-auto max-w-7xl responsive-pad">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {t.quickActions.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <a
                href={a.href}
                className={`group flex h-full flex-col items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-soft transition-all hover:-translate-y-1 hover:border-ocean-200 hover:shadow-card dark:border-white/10 dark:bg-slate-900/60 ${
                  a.title === t.quickActions[0].title || a.title === t.quickActions[1].title || a.title === t.quickActions[2].title || a.title === t.quickActions[3].title || a.title === t.quickActions[4].title || a.title === t.quickActions[5].title ? 'relative overflow-hidden' : ''
                }`}
              >
                {a.icon === 'Building' && (
                  <img
                    src="/hotelbk.png"
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 -z-0"
                    aria-hidden="true"
                  />
                )}
                {a.icon === 'Car' && (
                  <img
                    src="/cab.png"
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 -z-0"
                    aria-hidden="true"
                  />
                )}
                {a.icon === 'UtensilsCrossed' && (
                  <img
                    src="/findfood.png"
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 -z-0"
                    aria-hidden="true"
                  />
                )}
                {a.icon === 'Map' && (
                  <img
                    src="/createplaner.png"
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 -z-0"
                    aria-hidden="true"
                  />
                )}
                {a.icon === 'LifeBuoy' && (
                  <img
                    src="/emergency.png"
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 -z-0"
                    aria-hidden="true"
                  />
                )}
                {a.icon === 'Sailboat' && (
                  <img
                    src="/boat.png"
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 -z-0"
                    aria-hidden="true"
                  />
                )}
                <div className="relative z-10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ocean-50 text-ocean-600 transition-colors group-hover:bg-ocean-600 group-hover:text-white dark:bg-ocean-900/40 dark:text-ocean-300">
                    <Icon name={a.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-semibold text-ink dark:text-white">{a.title}</p>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{a.desc}</p>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  const { t } = useLang();

  return (
    <Section id="why" eyebrow={t.sections.whyUs.eyebrow} title={t.sections.whyUs.title} subtitle={t.sections.whyUs.subtitle}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.whyUs.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.06}>
            <div className="group h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-slate-900/60">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean-600 to-sky-2 text-white shadow-soft">
                <Icon name={w.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-ink dark:text-white">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{w.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

