import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Star } from 'lucide-react';
import { WHATSAPP_LINK } from '@/data/site';
import { Section, Reveal, Icon } from '@/components/ui';
import { useLang } from '@/context/LanguageContext';

export function HotelCategories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useLang();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % t.hotelCategories.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [t.hotelCategories.length]);

  const activeHotel = t.hotelCategories[activeIndex];

  return (
    <Section id="hotels" eyebrow={t.sections.hotels.eyebrow} title={t.sections.hotels.title} subtitle={t.sections.hotels.subtitle}>
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-3xl border border-gray-100 bg-white shadow-soft dark:border-white/10 dark:bg-slate-900/60">
          <div className="relative overflow-hidden rounded-3xl">
<img src={activeHotel.img} alt={activeHotel.name} className="feat-img-tall w-full object-cover transition-all duration-700" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
<span className="text-xs uppercase tracking-[0.3em] text-cyan-100">{t.sections.hotels.autoSlider}</span>
              <h3 className="mt-3 text-3xl font-semibold">{activeHotel.name}</h3>
              <p className="mt-2 max-w-xl text-sm text-gray-200">{activeHotel.desc}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-200">
                <span>{activeHotel.price}</span>
                <span>•</span>
                <span>{activeHotel.location}</span>
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
                    ? 'border-ocean-600 bg-ocean-50 text-ocean-700 dark:border-ocean-500 dark:bg-ocean-900/40 dark:text-ocean-200'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 dark:border-white/10 dark:bg-slate-900/70 dark:text-gray-300'
                }`}
              >
                {hotel.name}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
          <h3 className="font-heading text-3xl font-semibold text-ink dark:text-white">{t.sections.hotels.overviewTitle}</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {t.sections.hotels.overviewDesc}
          </p>

          <div className="mt-8 space-y-4 text-sm text-gray-600 dark:text-gray-300">
            {t.hotelCategories.map((hotel) => (
              <div key={hotel.name} className="rounded-3xl border border-gray-100 bg-gray-50 p-4 dark:border-white/10 dark:bg-slate-950/40">
                <h4 className="font-semibold text-ink dark:text-white">{hotel.name}</h4>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hotel.desc}</p>
              </div>
            ))}
          </div>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-ocean-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-ocean-700"
          >
            {t.sections.hotels.button}
          </a>
        </div>
      </div>
    </Section>
  );
}

export function FoodGuide() {
  const [activeIndex, setActiveIndex] = useState(0);

  const { t } = useLang();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % t.foodGuide.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [t.foodGuide.length]);

  const activeFood = t.foodGuide[activeIndex];

  return (
    <Section id="food" eyebrow={t.sections.food.eyebrow} title={t.sections.food.title} subtitle={t.sections.food.subtitle}>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
            <p className="text-sm uppercase tracking-[0.3em] text-ocean-700 dark:text-ocean-300">{t.sections.food.introTag}</p>
            <h3 className="mt-3 font-heading text-3xl font-semibold text-ink dark:text-white">{t.sections.food.introTitle}</h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {t.sections.food.introDesc}
            </p>
          </div>

          <div className="space-y-3 rounded-3xl border border-gray-100 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
            {t.foodGuide.map((food, i) => (
              <Reveal key={food.name} delay={i * 0.04}>
                <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5 text-sm text-gray-700 dark:border-white/10 dark:bg-slate-950/40 dark:text-gray-200">
                  <h4 className="font-heading text-base font-semibold text-ink dark:text-white">{food.name}</h4>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{food.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white shadow-soft dark:border-white/10 dark:bg-slate-900/60">
          <div className="relative overflow-hidden rounded-3xl">
<img src={activeFood.img} alt={activeFood.name} className="feat-img-med w-full object-cover transition-all duration-700" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-100">{t.sections.food.featuredLabel}</p>
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
                    ? 'border-ocean-600 bg-ocean-50 text-ocean-700 dark:border-ocean-500 dark:bg-ocean-900/40 dark:text-ocean-200'
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
              className="inline-flex w-full items-center justify-center rounded-full bg-ocean-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-ocean-700"
            >
              {t.sections.food.button}
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

  return (
    <Section id="map" eyebrow={t.sections.map.eyebrow} title={t.sections.map.title} subtitle={t.sections.map.subtitle}>
      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-card dark:border-white/10">
          <div className="flex flex-wrap gap-2 border-b border-gray-100 bg-white p-4 dark:border-white/10 dark:bg-slate-900/70">
            {t.mapPins.map((p) => (
              <span key={p.label} className="flex items-center gap-1.5 rounded-full bg-ocean-50 px-3 py-1.5 text-xs font-medium text-ocean-700 dark:bg-ocean-900/40 dark:text-ocean-200">
                <Icon name={p.icon} className="h-3.5 w-3.5" />
                {p.label}
              </span>
            ))}
          </div>
          <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
            <iframe
              title="Kanyakumari map"
              src="https://www.google.com/maps?q=Kanyakumari&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
