import { useState, useEffect, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Layers } from 'lucide-react';
import { WHATSAPP_LINK } from '@/data/site';
import { Section, Reveal, Icon, Eyebrow } from '@/components/ui';
import { SafeCanvas } from '@/components/three/Scene';
import { useLang } from '@/context/LanguageContext';

const MapGlobe = lazy(() => import('@/components/three/MapGlobe'));

export function HotelCategories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % t.hotelCategories.length);
    }, 3500);
    return () => window.clearInterval(interval);
  }, [t.hotelCategories.length, paused]);

  const activeHotel = t.hotelCategories[activeIndex];

  return (
    <Section id="hotels" eyebrow={t.sections.hotels.eyebrow} title={t.sections.hotels.title} subtitle={t.sections.hotels.subtitle}>
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-premium dark:border-white/10 dark:bg-slate-900/60">
          <div
            className="relative overflow-hidden rounded-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeHotel.name}
                src={activeHotel.img}
                alt={activeHotel.name}
                loading="lazy"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="feat-img-tall w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white">
              <span className="rounded-full bg-gold-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white">
                {t.sections.hotels.autoSlider}
              </span>
              <h3 className="mt-3 text-3xl font-semibold">{activeHotel.name}</h3>
              <p className="mt-2 max-w-xl text-sm text-gray-200">{activeHotel.desc}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-200">
                <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">{activeHotel.price}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{activeHotel.location}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-gray-100 bg-white p-4 dark:border-white/10 dark:bg-slate-900/60 sm:grid-cols-3 lg:grid-cols-5">
            {t.hotelCategories.map((hotel, index) => (
              <button
                key={hotel.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-3xl border px-3 py-2 text-sm text-left transition ${
                  index === activeIndex
                    ? 'border-ocean-600 bg-gradient-to-br from-ocean-50 to-sky-50 text-ocean-700 shadow-sm dark:border-ocean-500 dark:from-ocean-900/40 dark:to-sky-900/20 dark:text-ocean-200'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 dark:border-white/10 dark:bg-slate-900/70 dark:text-gray-300'
                }`}
              >
                {hotel.name}
              </button>
            ))}
          </div>
        </div>

        <div className="card-3d p-6 shadow-premium">
          <h3 className="font-heading text-3xl font-semibold text-ink dark:text-white">{t.sections.hotels.overviewTitle}</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {t.sections.hotels.overviewDesc}
          </p>

          <div className="mt-8 space-y-4 text-sm text-gray-600 dark:text-gray-300">
            {t.hotelCategories.map((hotel) => (
              <div key={hotel.name} className="rounded-3xl border border-gray-100 bg-gray-50 p-4 transition-colors hover:border-ocean-200 dark:border-white/10 dark:bg-slate-950/40">
                <h4 className="font-semibold text-ink dark:text-white">{hotel.name}</h4>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hotel.desc}</p>
              </div>
            ))}
          </div>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="btn-shine mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ocean-600 to-sky-2 px-5 py-3 text-sm font-semibold text-white shadow-glow-ocean transition-transform hover:scale-[1.02]"
          >
            {t.sections.hotels.button}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </Section>
  );
}

export function FoodGuide() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % t.foodGuide.length);
    }, 3500);
    return () => window.clearInterval(interval);
  }, [t.foodGuide.length, paused]);

  const activeFood = t.foodGuide[activeIndex];

  return (
    <Section id="food" eyebrow={t.sections.food.eyebrow} title={t.sections.food.title} subtitle={t.sections.food.subtitle}>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <div className="card-3d p-6 shadow-premium">
            <Eyebrow>{t.sections.food.introTag}</Eyebrow>
            <h3 className="mt-3 font-heading text-3xl font-semibold text-ink dark:text-white">{t.sections.food.introTitle}</h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {t.sections.food.introDesc}
            </p>
          </div>

          <div className="space-y-3 rounded-3xl border border-gray-100 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
            {t.foodGuide.map((food, i) => (
              <Reveal key={food.name} delay={i * 0.04}>
                <div className="group flex items-center gap-3 rounded-3xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700 transition-all hover:border-ocean-200 hover:shadow-soft dark:border-white/10 dark:bg-slate-950/40 dark:text-gray-200">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ocean-50 text-ocean-600 transition-colors group-hover:bg-ocean-600 group-hover:text-white dark:bg-ocean-900/40 dark:text-ocean-300">
                    <Icon name={food.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-heading text-base font-semibold text-ink dark:text-white">{food.name}</h4>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{food.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-premium dark:border-white/10 dark:bg-slate-900/60">
          <div
            className="relative overflow-hidden rounded-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeFood.name}
                src={activeFood.img}
                alt={activeFood.name}
                loading="lazy"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="feat-img-med w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-5 text-white">
              <span className="rounded-full bg-gold-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white">
                {t.sections.food.featuredLabel}
              </span>
              <h3 className="mt-2 text-2xl font-semibold">{activeFood.name}</h3>
              <p className="mt-1 text-sm text-gray-200">{activeFood.desc}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-gray-100 bg-white p-4 dark:border-white/10 dark:bg-slate-900/60 sm:grid-cols-4">
            {t.foodGuide.map((food, index) => (
              <button
                key={food.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-3xl border px-3 py-2 text-left text-sm transition ${
                  index === activeIndex
                    ? 'border-ocean-600 bg-gradient-to-br from-ocean-50 to-sky-50 text-ocean-700 shadow-sm dark:border-ocean-500 dark:from-ocean-900/40 dark:to-sky-900/20 dark:text-ocean-200'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 dark:border-white/10 dark:bg-slate-900/70 dark:text-gray-300'
                }`}
              >
                {food.name}
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-4 rounded-b-3xl border-t border-gray-100 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950/40">
            <a
              href={`https://wa.me/919043435765?text=${encodeURIComponent(t.sections.food.whatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ocean-600 to-sky-2 px-5 py-3 text-sm font-semibold text-white shadow-glow-ocean transition-transform hover:scale-[1.02]"
            >
              {t.sections.food.button}
              <ArrowRight className="h-4 w-4" />
            </a>
            <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              <p className="font-semibold text-ink dark:text-white">{t.sections.food.finalTitle}</p>
              <p className="mt-1">{t.sections.food.finalDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function InteractiveMap() {
  const { t } = useLang();
  const [view, setView] = useState<'globe' | 'map'>('map');

  return (
    <Section id="map" eyebrow={t.sections.map.eyebrow} title={t.sections.map.title} subtitle={t.sections.map.subtitle}>
      <Reveal>
        <div className="card-3d overflow-hidden shadow-premium">
          <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 bg-white p-4 dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex rounded-full bg-gray-100 p-1 dark:bg-slate-800">
              <button
                onClick={() => setView('globe')}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  view === 'globe' ? 'bg-ocean-600 text-white shadow-soft' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                <Layers className="h-3.5 w-3.5" /> 3D Globe
              </button>
              <button
                onClick={() => setView('map')}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  view === 'map' ? 'bg-ocean-600 text-white shadow-soft' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                <MapPin className="h-3.5 w-3.5" /> Live Map
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {t.mapPins.map((p) => (
                <span key={p.label} className="flex items-center gap-1.5 rounded-full bg-ocean-50 px-3 py-1.5 text-xs font-medium text-ocean-700 dark:bg-ocean-900/40 dark:text-ocean-200">
                  <Icon name={p.icon} className="h-3.5 w-3.5" />
                  {p.label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
            {view === 'globe' ? (
              <div className="bg-gradient-to-br from-ocean-950 to-slate-900">
                <SafeCanvas camera={{ position: [0, 0, 3.2], fov: 45 }} className="!absolute !inset-0 h-full w-full">
                  <MapGlobe markers={t.mapPins.length} />
                </SafeCanvas>
                <div className="pointer-events-none absolute inset-x-0 top-4 z-10 flex justify-center">
                  <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
                    Drag · Explore · {t.sections.map.title}
                  </span>
                </div>
              </div>
            ) : (
              <iframe
                title="Kanyakumari map"
                src="https://www.google.com/maps?q=Kanyakumari&output=embed"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
