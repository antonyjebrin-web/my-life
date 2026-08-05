import { motion } from 'framer-motion';
import { Star, MapPin, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { WHATSAPP_LINK } from '@/data/site';
import { useLang } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLang();
  const hero = t.hero;

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/kanyakumari.jpg"
          alt="Sunrise over the ocean at Kanyakumari"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/40 via-ocean-900/30 to-ocean-900/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-24 pb-16 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md ring-1 ring-white/25"
        >
<MapPin className="h-3.5 w-3.5 text-sky-2" />
          {hero.locationBadge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
className="hero-title font-heading font-bold leading-[1.1] tracking-tight text-white drop-shadow-lg"
        >
          {hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
className="hero-subtitle mx-auto mt-6 max-w-2xl font-light leading-relaxed text-white/90"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#planner"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ocean-700 shadow-glow transition-transform hover:scale-[1.03] sm:w-auto"
          >
            <Sparkles className="h-4 w-4 text-gold-500" />
            {hero.plan}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03] sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" />
            {hero.whatsapp}
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {t.trustBadges.map((b) => (
            <div key={b} className="flex items-center gap-1.5 text-sm font-medium text-white/90">
              <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
              {b}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-white/50 p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="h-1.5 w-1 rounded-full bg-white/80"
          />
        </div>
      </motion.div>
    </section>
  );
}
