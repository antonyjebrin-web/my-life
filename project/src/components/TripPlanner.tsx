import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Wallet, CalendarDays, Heart, Hotel, Car, Camera, Sailboat, UtensilsCrossed, Check, MessageCircle, Mail, Sparkles, RotateCcw } from 'lucide-react';
import { Section, Reveal } from '@/components/ui';
import { SITE } from '@/data/site';
import { useLang } from '@/context/LanguageContext';

type Form = {
  travelers: number;
  budgetIndex: number;
  days: number;
  groupIndex: number;
  hotel: boolean;
  cab: boolean;
  photography: boolean;
  boat: boolean;
  foodIndex: number;
};

export default function TripPlanner() {
  const { t } = useLang();
  const [form, setForm] = useState<Form>({
    travelers: 2,
    budgetIndex: 1,
    days: 3,
    groupIndex: 0,
    hotel: true,
    cab: true,
    photography: false,
    boat: true,
    foodIndex: 0,
  });
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const summary = [
    `${form.travelers} ${t.tripPlanner.summary.travelers}`,
    `${form.days} ${t.tripPlanner.summary.days}`,
    t.tripPlanner.groups[form.groupIndex],
    t.tripPlanner.budgets[form.budgetIndex],
    form.hotel ? t.tripPlanner.hotel : t.tripPlanner.summary.hotelNo,
    form.cab ? t.tripPlanner.cab : t.tripPlanner.summary.cabNo,
    form.boat ? t.tripPlanner.boat : t.tripPlanner.summary.boatNo,
    form.photography ? t.tripPlanner.photography : t.tripPlanner.summary.photographyNo,
    `${t.tripPlanner.summary.food}: ${t.tripPlanner.foods[form.foodIndex]}`,
  ].filter(Boolean) as string[];

  const buildWhatsAppMessage = () => {
    const details = [
      `${t.tripPlanner.message.travelers} ${form.travelers}`,
      `${t.tripPlanner.message.days} ${form.days}`,
      `${t.tripPlanner.message.group} ${t.tripPlanner.groups[form.groupIndex]}`,
      `${t.tripPlanner.message.budget} ${t.tripPlanner.budgets[form.budgetIndex]}`,
      `${t.tripPlanner.message.hotel} ${form.hotel ? t.tripPlanner.summary.hotelYes : t.tripPlanner.summary.hotelNo}`,
      `${t.tripPlanner.message.cab} ${form.cab ? t.tripPlanner.summary.cabYes : t.tripPlanner.summary.cabNo}`,
      `${t.tripPlanner.message.boat} ${form.boat ? t.tripPlanner.summary.boatYes : t.tripPlanner.summary.boatNo}`,
      `${t.tripPlanner.message.photography} ${form.photography ? t.tripPlanner.summary.photographyYes : t.tripPlanner.summary.photographyNo}`,
      `${t.tripPlanner.message.food} ${t.tripPlanner.foods[form.foodIndex]}`,
    ];

    return `${t.tripPlanner.message.intro}\n\n${details.join('\n')}\n\n${t.tripPlanner.message.closing}`;
  };

  const handleWhatsApp = () => {
    const waText = encodeURIComponent(buildWhatsAppMessage());
    const url = `https://wa.me/${SITE.whatsapp}?text=${waText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(t.tripPlanner.message.intro);
    const body = encodeURIComponent(buildWhatsAppMessage());
    const url = `mailto:${SITE.email}?subject=${subject}&body=${body}`;

    const link = document.createElement('a');
    link.href = url;
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Section id="planner" eyebrow={t.tripPlanner.eyebrow} title={t.tripPlanner.title} subtitle={t.tripPlanner.subtitle}>
      <div className="mx-auto max-w-3xl">
<Reveal>
          <div className="card-3d p-6 shadow-premium sm:p-8">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t.tripPlanner.travelers} icon={<Users className="h-4 w-4" />}>
                      <Stepper value={form.travelers} min={1} max={20} onChange={(v) => set('travelers', v)} />
                    </Field>
                    <Field label={t.tripPlanner.days} icon={<CalendarDays className="h-4 w-4" />}>
                      <Stepper value={form.days} min={1} max={15} onChange={(v) => set('days', v)} />
                    </Field>
                  </div>

                  <Field label={t.tripPlanner.budget} icon={<Wallet className="h-4 w-4" />}>
                    <div className="flex flex-wrap gap-2">
                      {t.tripPlanner.budgets.map((b, index) => (
                        <Chip key={b} active={form.budgetIndex === index} onClick={() => set('budgetIndex', index)}>{b}</Chip>
                      ))}
                    </div>
                  </Field>

                  <Field label={t.tripPlanner.travelingAs} icon={<Heart className="h-4 w-4" />}>
                    <div className="flex flex-wrap gap-2">
                      {t.tripPlanner.groups.map((g, index) => (
                        <Chip key={g} active={form.groupIndex === index} onClick={() => set('groupIndex', index)}>{g}</Chip>
                      ))}
                    </div>
                  </Field>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <Toggle active={form.hotel} onClick={() => set('hotel', !form.hotel)} icon={<Hotel className="h-4 w-4" />} label={t.tripPlanner.hotel} />
                    <Toggle active={form.cab} onClick={() => set('cab', !form.cab)} icon={<Car className="h-4 w-4" />} label={t.tripPlanner.cab} />
                    <Toggle active={form.boat} onClick={() => set('boat', !form.boat)} icon={<Sailboat className="h-4 w-4" />} label={t.tripPlanner.boat} />
                    <Toggle active={form.photography} onClick={() => set('photography', !form.photography)} icon={<Camera className="h-4 w-4" />} label={t.tripPlanner.photography} />
                  </div>

                  <Field label={t.tripPlanner.foodPreference} icon={<UtensilsCrossed className="h-4 w-4" />}>
                    <div className="flex flex-wrap gap-2">
                      {t.tripPlanner.foods.map((f, index) => (
                        <Chip key={f} active={form.foodIndex === index} onClick={() => set('foodIndex', index)}>{f}</Chip>
                      ))}
                    </div>
                  </Field>

                  <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-gray-300">
                    <p className="font-semibold text-ink dark:text-white">{t.tripPlanner.noteTitle}</p>
                    <p className="mt-2 text-sm leading-relaxed">{t.tripPlanner.noteText}</p>
                  </div>

<button
                    onClick={() => setSubmitted(true)}
                    className="btn-shine flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3.5 text-sm font-semibold text-white shadow-glow-ocean transition-transform hover:scale-[1.02]"
                  >
                    <Sparkles className="h-4 w-4 text-white" />
                    {t.tripPlanner.createPlan}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 font-heading text-2xl font-bold text-ink dark:text-white">{t.tripPlanner.readyTitle}</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t.tripPlanner.readyDesc}</p>

                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {summary.map((s) => (
                      <span key={s} className="rounded-full bg-ocean-50 px-3 py-1.5 text-xs font-medium text-ocean-700 dark:bg-ocean-900/40 dark:text-ocean-200">{s}</span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02] sm:w-auto"
                    >
                      <MessageCircle className="h-4 w-4" />
                      {t.tripPlanner.sendWhatsApp}
                    </button>
                    <button
                      type="button"
                      onClick={handleEmail}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-ocean-600 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02] sm:w-auto"
                    >
                      <Mail className="h-4 w-4" />
                      {t.tripPlanner.sendEmail}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 px-6 py-3.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5 sm:w-auto"
                    >
                      <RotateCcw className="h-4 w-4" />
                      {t.tripPlanner.editDetails}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">
        <span className="text-ocean-500">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}

function Stepper({ value, min, max, onChange }: { value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-1.5 dark:border-white/10 dark:bg-white/5 w-fit">
      <button onClick={() => onChange(Math.max(min, value - 1))} className="flex h-9 w-9 items-center justify-center rounded-xl bg-ocean-50 text-lg font-semibold text-ocean-700 transition-colors hover:bg-ocean-100 dark:bg-ocean-900/40 dark:text-ocean-300 dark:hover:bg-ocean-900/70" aria-label="Decrease">−</button>
      <span className="w-8 text-center font-heading text-lg font-semibold text-ink dark:text-white">{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} className="flex h-9 w-9 items-center justify-center rounded-xl bg-ocean-50 text-lg font-semibold text-ocean-700 transition-colors hover:bg-ocean-100 dark:bg-ocean-900/40 dark:text-ocean-300 dark:hover:bg-ocean-900/70" aria-label="Increase">+</button>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
        active
          ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-glow-ocean'
          : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-gold-500 dark:bg-white/5 dark:text-gray-300 dark:ring-white/10'
      }`}
    >
      {children}
    </button>
  );
}

function Toggle({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-sm font-medium transition-all ${
        active
          ? 'border-gold-500 bg-gold-100 text-gold-700 shadow-sm dark:border-gold-500 dark:bg-gold-600/15 dark:text-gold-400'
          : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-ink dark:border-white/10 dark:text-gray-400 dark:hover:text-white'
      }`}
    >
      <span className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${active ? 'bg-gold-500' : 'bg-gray-300 dark:bg-white/10'}`}>
        <span className={`h-4 w-4 transform rounded-full bg-white shadow transition-transform ${active ? 'translate-x-4' : ''}`} />
      </span>
      {icon}
      {label}
    </button>
  );
}
