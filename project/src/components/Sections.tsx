import { lazy } from 'react';
import { Section, Reveal, Icon, Card, StatCounter } from '@/components/ui';
import { SafeCanvas } from '@/components/three/Scene';
import { useLang } from '@/context/LanguageContext';

const DataViz = lazy(() => import('@/components/three/DataViz'));

export function QuickActions() {
  const { t } = useLang();

  const imageMap: Record<string, string> = {
    Building: '/hotelbk.png',
    Car: '/cab.png',
    UtensilsCrossed: '/findfood.png',
    Map: '/createplaner.png',
    LifeBuoy: '/emergency.png',
    Sailboat: '/boat.png',
  };

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl responsive-pad">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {t.quickActions.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <a
                href={a.href}
                aria-label={a.title}
                className="group relative flex h-full flex-col items-start gap-3 overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-soft transition-all hover:-translate-y-1 hover:border-ocean-200 hover:shadow-premium dark:border-white/10 dark:bg-slate-900/60"
              >
                {imageMap[a.icon] && (
                  <img
                    src={imageMap[a.icon]}
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 transition-opacity duration-300 group-hover:opacity-30"
                    aria-hidden="true"
                  />
                )}
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-ocean-600 to-sky-2 text-white shadow-soft transition-transform group-hover:scale-110 dark:from-ocean-500 dark:to-sky-2">
                  <Icon name={a.icon} className="h-5 w-5" />
                </span>
                <div className="relative z-10">
                  <p className="font-heading text-sm font-semibold text-ink dark:text-white">{a.title}</p>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{a.desc}</p>
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

  // Data for the 3D bar chart visualization
  const chartData = [
    { label: 'Hotels', value: 5, color: '#22a7c9' },
    { label: 'Food', value: 5, color: '#ffd166' },
    { label: 'Reviews', value: 6, color: '#0f9d58' },
    { label: 'Trust', value: 4, color: '#7dd3fc' },
  ];

  return (
    <Section id="why" eyebrow={t.sections.whyUs.eyebrow} title={t.sections.whyUs.title} subtitle={t.sections.whyUs.subtitle}>
      {/* 3D data visualization banner */}
      <Reveal>
        <div className="relative mb-10 overflow-hidden rounded-3xl border border-ocean-100 bg-gradient-to-br from-ocean-50 via-white to-sky-50 p-6 shadow-soft dark:border-white/10 dark:from-slate-900/60 dark:to-slate-900/40 sm:p-8">
          <div className="absolute inset-0 opacity-40">
            <SafeCanvas
              camera={{ position: [0, 1.5, 6], fov: 45 }}
              className="!absolute !inset-0 h-full w-full"
              bordered
            >
              <DataViz data={chartData} />
            </SafeCanvas>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/70 via-transparent to-white/70 dark:from-slate-900/70 dark:to-slate-900/70" />

          <div className="relative z-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: 500, suffix: '+', label: 'Verified partners' },
              { value: 24, suffix: '/7', label: 'Support' },
              { value: 4, suffix: '+', label: 'Languages' },
              { value: 100, suffix: '%', label: 'Local & honest' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/70 p-4 text-center backdrop-blur-md dark:bg-slate-800/60">
                <p className="font-heading text-3xl font-bold text-ocean-700 dark:text-ocean-300">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.whyUs.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.06}>
            <Card className="h-full p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean-600 to-sky-2 text-white shadow-soft">
                <Icon name={w.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-ink dark:text-white">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{w.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
