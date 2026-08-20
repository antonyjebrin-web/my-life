import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Quote } from 'lucide-react';
import { GALLERY } from '@/data/site';
import { Section, Reveal, Stars } from '@/components/ui';
import { useLang } from '@/context/LanguageContext';

export function Gallery() {
  const { t } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const total = GALLERY.length;

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, total]);

  const goTo = (index: number) => {
    setActiveIndex((index + total) % total);
  };

  const next = () => goTo(activeIndex + 1);
  const prev = () => goTo(activeIndex - 1);

  const getStackStyle = (offset: number) => {
    switch (offset) {
      case 0:
        return { scale: 1, x: 0, y: 0, opacity: 1, rotate: 0, zIndex: 40 };
      case 1:
        return { scale: 0.96, x: '1.5%', y: '1.5%', opacity: 0.9, rotate: 0.5, zIndex: 35 };
      case 2:
        return { scale: 0.92, x: '3%', y: '3%', opacity: 0.8, rotate: 1, zIndex: 30 };
      case 3:
        return { scale: 0.88, x: '4.5%', y: '4.5%', opacity: 0.7, rotate: 1.5, zIndex: 25 };
      case 4:
        return { scale: 0.84, x: '6%', y: '6%', opacity: 0.6, rotate: 2, zIndex: 20 };
      case 5:
        return { scale: 0.8, x: '7.5%', y: '7.5%', opacity: 0.5, rotate: 2.5, zIndex: 15 };
      case 6:
        return { scale: 0.76, x: '9%', y: '9%', opacity: 0.4, rotate: 3, zIndex: 10 };
      case 7:
        return { scale: 0.72, x: '10.5%', y: '10.5%', opacity: 0.3, rotate: 3.5, zIndex: 5 };
      default:
        return { scale: 0.68, x: '12%', y: '12%', opacity: 0, rotate: 4, zIndex: 0 };
    }
  };

  return (
    <Section id="gallery" eyebrow={t.gallerySection.eyebrow} title={t.gallerySection.title} subtitle={t.gallerySection.subtitle}>
      <div
        className="relative mx-auto w-full max-w-4xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[4/3] sm:aspect-[16/9]">
          {GALLERY.map((item, i) => {
            const offset = (i - activeIndex + total) % total;
            if (offset > 7) return null;
            const style = getStackStyle(offset);
            const isVideo = item.src.endsWith('.mp4');

            return (
              <motion.div
                key={item.src}
                className="absolute inset-0"
                style={{ transformOrigin: 'center center', zIndex: style.zIndex }}
                animate={{
                  scale: style.scale,
                  x: style.x,
                  y: style.y,
                  opacity: style.opacity,
                  rotate: style.rotate,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              >
                <div className="h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl border-[3px] sm:border-[4px] border-white shadow-2xl dark:border-slate-800">
                  {isVideo ? (
                    <video
                      src={item.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <p className="font-heading text-base font-medium text-gray-700 dark:text-gray-200 sm:text-lg">
            {GALLERY[activeIndex].caption}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/80 shadow-sm backdrop-blur transition hover:border-ocean-300 hover:text-ocean-700 dark:border-white/10 dark:bg-slate-800/80 dark:hover:border-ocean-500 dark:text-gray-200"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="flex gap-2">
            {GALLERY.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-6 bg-ocean-600' : 'w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/80 shadow-sm backdrop-blur transition hover:border-ocean-300 hover:text-ocean-700 dark:border-white/10 dark:bg-slate-800/80 dark:hover:border-ocean-500 dark:text-gray-200"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </Section>
  );
}

export function Reviews() {
  const { t } = useLang();
  const avg = (t.reviews.reduce((s, r) => s + r.rating, 0) / t.reviews.length).toFixed(1);

  return (
    <Section id="reviews" eyebrow={t.reviewsSection.eyebrow} title={t.reviewsSection.title} subtitle={t.reviewsSection.subtitle}>
      <Reveal>
        <div className="card-3d mx-auto mb-10 flex max-w-md flex-col items-center gap-2 p-6 text-center shadow-premium">
          <p className="font-heading text-5xl font-bold text-gradient-ocean">{avg}</p>
          <Stars rating={Math.round(Number(avg))} />
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.reviewsSection.basedOn.replace('{count}', t.reviews.length.toString())}</p>
        </div>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.reviews.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.05}>
            <div className="lift-3d flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
              <Quote className="h-7 w-7 text-ocean-200 dark:text-ocean-700" />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">"{r.text}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4 dark:border-white/10">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-ocean-600 to-sky-2 font-heading text-sm font-semibold text-white">
                  {r.name.charAt(0)}
                </span>
                <div>
                  <p className="font-heading text-sm font-semibold text-ink dark:text-white">{r.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{r.place}</p>
                </div>
                <div className="ml-auto"><Stars rating={r.rating} /></div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" eyebrow={t.faqSection.eyebrow} title={t.faqSection.title} subtitle={t.faqSection.subtitle}>
      <div className="mx-auto max-w-3xl space-y-3">
        {t.faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.04}>
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft dark:border-white/10 dark:bg-slate-900/60">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={open === i}
              >
                <span className="font-heading text-sm font-semibold text-ink dark:text-white sm:text-base">{f.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-ocean-600 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
