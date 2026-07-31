import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Wallet, CalendarDays, Heart, Hotel, Car, Camera, Sailboat, UtensilsCrossed, Check, MessageCircle, Mail, Sparkles, RotateCcw } from 'lucide-react';
import { Section, Reveal } from '@/components/ui';
import { SITE } from '@/data/site';

type Form = {
  travelers: number;
  budget: string;
  days: number;
  groupType: string;
  hotel: boolean;
  cab: boolean;
  photography: boolean;
  boat: boolean;
  food: string;
};

const BUDGETS = ['Half-Day Planning ₹499', 'Full-Day Planning ₹999', 'Multi-Day Planning', 'Custom Quote'];
const GROUPS = ['Family', 'Couple', 'Solo', 'Friends'];
const FOODS = ['Any', 'Vegetarian', 'Seafood lover', 'Street food', 'Fine dining'];

export default function TripPlanner() {
  const [form, setForm] = useState<Form>({
    travelers: 2,
    budget: BUDGETS[1],
    days: 3,
    groupType: GROUPS[0],
    hotel: true,
    cab: true,
    photography: false,
    boat: true,
    food: FOODS[0],
  });
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const summary = [
    `${form.travelers} traveler${form.travelers > 1 ? 's' : ''}`,
    `${form.days} day${form.days > 1 ? 's' : ''}`,
    form.groupType,
    form.budget,
    form.hotel && 'Hotel',
    form.cab && 'Cab',
    form.boat && 'Local Sea Boat Ride and Vivekananda Ferry',
    form.photography && 'Photography',
    `Food: ${form.food}`,
  ].filter(Boolean) as string[];

  const buildWhatsAppMessage = () => {
    const details = [
      `Travelers: ${form.travelers}`,
      `Days: ${form.days}`,
      `Group: ${form.groupType}`,
      `Budget: ${form.budget}`,
      `Hotel: ${form.hotel ? 'Yes' : 'No'}`,
      `Cab: ${form.cab ? 'Yes' : 'No'}`,
      `Local Sea Boat Ride and Vivekananda Ferry: ${form.boat ? 'Yes' : 'No'}`,
      `Photography: ${form.photography ? 'Yes' : 'No'}`,
      `Food: ${form.food}`,
    ];

    return `Hi! I'd like a personalized Kanyakumari trip plan.\n\n${details.join('\n')}\n\nPlease help me plan.`;
  };

  const handleWhatsApp = () => {
    const waText = encodeURIComponent(buildWhatsAppMessage());
    const url = `https://wa.me/${SITE.whatsapp}?text=${waText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent('Trip planning request for Kanyakumari');
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
    <Section id="planner" eyebrow="Trip Planner" title="Plan your trip in 30 seconds" subtitle="Tell us a few details and we'll prepare a personalized plan — then send it straight to our team on WhatsApp.">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-card dark:border-white/10 dark:bg-slate-900/70 sm:p-8">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Travelers + Days */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Travelers" icon={<Users className="h-4 w-4" />}>
                      <Stepper value={form.travelers} min={1} max={20} onChange={(v) => set('travelers', v)} />
                    </Field>
                    <Field label="Days" icon={<CalendarDays className="h-4 w-4" />}>
                      <Stepper value={form.days} min={1} max={15} onChange={(v) => set('days', v)} />
                    </Field>
                  </div>

                  {/* Budget */}
                  <Field label="Budget" icon={<Wallet className="h-4 w-4" />}>
                    <div className="flex flex-wrap gap-2">
                      {BUDGETS.map((b) => (
                        <Chip key={b} active={form.budget === b} onClick={() => set('budget', b)}>{b}</Chip>
                      ))}
                    </div>
                  </Field>

                  {/* Group type */}
                  <Field label="Traveling as" icon={<Heart className="h-4 w-4" />}>
                    <div className="flex flex-wrap gap-2">
                      {GROUPS.map((g) => (
                        <Chip key={g} active={form.groupType === g} onClick={() => set('groupType', g)}>{g}</Chip>
                      ))}
                    </div>
                  </Field>

                  {/* Toggles */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <Toggle active={form.hotel} onClick={() => set('hotel', !form.hotel)} icon={<Hotel className="h-4 w-4" />} label="Hotel" />
                    <Toggle active={form.cab} onClick={() => set('cab', !form.cab)} icon={<Car className="h-4 w-4" />} label="Cab" />
                    <Toggle active={form.boat} onClick={() => set('boat', !form.boat)} icon={<Sailboat className="h-4 w-4" />} label="Local Sea Boat Ride and Vivekananda Ferry" />
                    <Toggle active={form.photography} onClick={() => set('photography', !form.photography)} icon={<Camera className="h-4 w-4" />} label="Photography" />
                  </div>

                  {/* Food */}
                  <Field label="Food preference" icon={<UtensilsCrossed className="h-4 w-4" />}>
                    <div className="flex flex-wrap gap-2">
                      {FOODS.map((f) => (
                        <Chip key={f} active={form.food === f} onClick={() => set('food', f)}>{f}</Chip>
                      ))}
                    </div>
                  </Field>

                  <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-gray-300">
                    <p className="font-semibold text-ink dark:text-white">Small note:</p>
                    <p className="mt-2 text-sm leading-relaxed">
                      <span className="font-semibold">Hotel, cab, ferry tickets, and activity charges are billed separately.</span> We help you choose the best options based on your budget ..WE WITH U  
                    </p>
                  </div>

                  <button
                    onClick={() => setSubmitted(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-500 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02]"
                  >
                    <Sparkles className="h-4 w-4 text-gold-400" />
                    Create my trip plan
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
                  <h3 className="mt-5 font-heading text-2xl font-bold text-ink dark:text-white">Your trip plan is ready.</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Based on your preferences, we've drafted a personalized plan. Send it to our team and we'll fine-tune the details with you.
                  </p>

                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {summary.map((s) => (
                      <span key={s} className="rounded-full bg-ocean-50 px-3 py-1.5 text-xs font-medium text-ocean-700 dark:bg-ocean-900/40 dark:text-ocean-200">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02] sm:w-auto"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Send on WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={handleEmail}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-ocean-600 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02] sm:w-auto"
                    >
                      <Mail className="h-4 w-4" />
                      Send by Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 px-6 py-3.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5 sm:w-auto"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Edit details
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
    <div className="flex items-center gap-3">
      <button onClick={() => onChange(Math.max(min, value - 1))} className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-lg font-semibold text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5" aria-label="Decrease">−</button>
      <span className="w-8 text-center font-heading text-lg font-semibold text-ink dark:text-white">{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-lg font-semibold text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5" aria-label="Increase">+</button>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
        active
          ? 'bg-gold-500 text-white shadow-soft'
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
      className={`flex items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-sm font-medium transition-all ${
        active
          ? 'border-gold-500 bg-gold-100 text-gold-700 dark:border-gold-500 dark:bg-gold-600/15 dark:text-gold-400'
          : 'border-gray-200 text-gray-500 hover:border-gray-300 dark:border-white/10 dark:text-gray-400'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
