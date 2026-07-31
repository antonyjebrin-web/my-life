import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Quote } from 'lucide-react';
import { GALLERY, REVIEWS, FAQS } from '@/data/site';
import { Section, Reveal, Stars, Icon } from '@/components/ui';

export function Gallery() {
  return (
    <Section id="gallery" eyebrow="Gallery" title="Moments from Kanyakumari" subtitle="A glimpse of the light, the sea and the life that waits for you here.">
      <div className="masonry">
        {GALLERY.map((src, i) => (
          <Reveal key={i} delay={(i % 3) * 0.05}>
            <div className="group overflow-hidden rounded-2xl shadow-soft">
              <div className="relative overflow-hidden h-72 sm:h-80">
                {src.endsWith('.mp4') ? (
                  <video
                    src={src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <img
                    src={src}
                    alt={`Kanyakumari moment ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Reviews() {
  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);
  return (
    <Section id="reviews" eyebrow="Traveler reviews" title="What travelers say" subtitle="Real reviews from real travelers. No paid placements, no edits.">
      <Reveal>
        <div className="mx-auto mb-10 flex max-w-md flex-col items-center gap-2 rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-soft dark:border-white/10 dark:bg-slate-900/60">
          <p className="font-heading text-5xl font-bold text-ink dark:text-white">{avg}</p>
          <Stars rating={Math.round(Number(avg))} />
          <p className="text-sm text-gray-500 dark:text-gray-400">Based on {REVIEWS.length}+ verified reviews</p>
        </div>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.05}>
            <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-slate-900/60">
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
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" eyebrow="FAQ" title="Questions, answered" subtitle="Everything you might want to know before you travel. Still unsure? Message us on WhatsApp.">
      <div className="mx-auto max-w-3xl space-y-3">
        {FAQS.map((f, i) => (
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
