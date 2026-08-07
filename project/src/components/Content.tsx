import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Quote } from 'lucide-react';
import { GALLERY } from '@/data/site';
import { Section, Reveal, Stars } from '@/components/ui';
import { useLang } from '@/context/LanguageContext';

export function Gallery() {
  const { t } = useLang();

  return (   
    <Section id="gallery" eyebrow={t.gallerySection.eyebrow} title={t.gallerySection.title} subtitle={t.gallerySection.subtitle}>
      <div className="masonry">
        {GALLERY.map((src, i) => (
          <Reveal key={i} delay={(i % 3) * 0.05}>
            <div className="group overflow-hidden rounded-2xl shadow-premium ring-1 ring-gray-100 transition-shadow hover:shadow-card dark:ring-white/10">
              <div className="relative overflow-hidden gallery-img">
                {src.endsWith('.mp4') ? (
                  <div className="flex h-full w-full items-center justify-center overflow-hidden">
                    <video
                      src={src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="h-full w-full object-cover"
                      style={src === '/kanyakumari.mp4' ? { transform: 'rotate(90deg)', transformOrigin: 'center' } : undefined}
                    />
                  </div>
                ) : (
                  <img
                    src={src}
                    alt={`${t.gallerySection.title} ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
          </Reveal>
        ))}
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
