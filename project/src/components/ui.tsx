import { type ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';

// Section wrapper with consistent spacing and an animated heading
export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
<section id={id} className={`section-pad ${className}`}>
      <div className="mx-auto max-w-7xl responsive-pad">
        {(eyebrow || title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            {eyebrow && (
              <span className="mb-3 inline-block rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ocean-700 dark:bg-ocean-900/40 dark:text-ocean-200">
                {eyebrow}
              </span>
            )}
            {title && (
<h2 className="section-heading font-heading font-bold tracking-tight text-ink dark:text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

// Fade-up wrapper for any block
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Render a lucide icon by name
export function Icon({
  name,
  className = '',
  strokeWidth = 1.8,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const C = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>)[name];
  if (!C) return null;
  return <C className={className} strokeWidth={strokeWidth} />;
}

// Star rating row
export function Stars({ rating, className = '' }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icons.Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-gold-500 text-gold-500' : 'fill-gray-200 text-gray-300 dark:fill-gray-700 dark:text-gray-600'}`}
        />
      ))}
    </div>
  );
}

// Pill button
export function Pill({
  children,
  active = false,
  onClick,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
        active
          ? 'bg-ocean-600 text-white shadow-soft'
          : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-ocean-300 dark:bg-white/5 dark:text-gray-300 dark:ring-white/10'
      }`}
    >
      {children}
    </button>
  );
}

// ---- Premium design-system primitives ----

// Gradient eyebrow chip
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ocean-600 to-sky-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-glow-ocean ${className}`}
    >
      {children}
    </span>
  );
}

// Elevated card with optional 3D lift
export function Card({
  children,
  className = '',
  lift = true,
}: {
  children: ReactNode;
  className?: string;
  lift?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border border-gray-100 bg-white shadow-soft dark:border-white/10 dark:bg-slate-900/60 ${
        lift ? 'lift-3d' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Animated number counter
export function StatCounter({
  value,
  suffix = '',
  duration = 1.2,
  className = '',
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

// Gradient-highlight word inside a heading
export function GradientText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`text-gradient-ocean ${className}`}>{children}</span>;
}
