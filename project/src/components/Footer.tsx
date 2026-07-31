import { motion } from 'framer-motion';
import { Phone, ShieldCheck, Heart, Quote } from 'lucide-react';
import { EMERGENCY, SITE, WHATSAPP_LINK } from '@/data/site';
import { Section, Reveal, Icon } from '@/components/ui';

const TRUST = [
  { label: 'Verified Partner', icon: 'BadgeCheck' },
  { label: '100% Transparent Recommendations', icon: 'Eye' },
  { label: 'No Hidden Charges', icon: 'Receipt' },
  { label: 'Fast Response', icon: 'Zap' },
  { label: 'Local Expert Assistance', icon: 'Users' },
  { label: 'Safe for Families', icon: 'HeartHandshake' },
];

export function Emergency() {
  return (
    <Section id="emergency" eyebrow="Emergency" title="Help when you need it" subtitle="Important numbers and contacts, always within reach. Save this page or message us anytime — we're here 24/7.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EMERGENCY.map((e, i) => (
          <Reveal key={e.label} delay={i * 0.05}>
            <a
              href={`tel:${e.number.replace(/\s/g, '')}`}
              className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-red-200 hover:shadow-card dark:border-white/10 dark:bg-slate-900/60"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-900/30">
                <Icon name={e.icon} className="h-6 w-6" />
              </span>
              <div>
                <p className="font-heading text-sm font-semibold text-ink dark:text-white">{e.label}</p>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">{e.number}</p>
              </div>
              <Phone className="ml-auto h-4 w-4 text-gray-300 transition-colors group-hover:text-red-500" />
            </a>
          </Reveal>
        ))}
      </div>

      {/* Trust strip */}
      <Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 rounded-3xl border border-gray-100 bg-gradient-to-br from-ocean-50 to-white p-5 dark:border-white/10 dark:from-ocean-900/30 dark:to-transparent sm:grid-cols-3 lg:grid-cols-6">
          {TRUST.map((t) => (
            <div key={t.label} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-ocean-600 shadow-soft dark:bg-slate-800 dark:text-ocean-300">
                <Icon name={t.icon} className="h-5 w-5" />
              </span>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{t.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Meet your local travel assistant" subtitle="A note from the founder.">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="grid gap-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-card dark:border-white/10 dark:bg-slate-900/60 sm:p-10 md:grid-cols-[auto_1fr] md:items-center">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-ocean-600 to-sky-2 text-white shadow-soft">
                <span className="font-heading text-3xl font-bold">B</span>
              </div>
              <p className="mt-3 font-heading text-base font-semibold text-ink dark:text-white">ANTONY JERIN </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Founder & Local Guide</p>
              <div className="mt-2 flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                <ShieldCheck className="h-3 w-3" /> Verified Local
              </div>
            </div>
            <div className="space-y-4">
              <Quote className="h-7 w-7 text-ocean-200 dark:text-ocean-700" />
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                I grew up watching the sunrise over three seas from this very tip of India. For years I watched travelers miss the real Kanyakumari — the quiet beaches, the family-run kitchens, the stories only locals know.
              </p>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                So I started Explore Kanyakumari to be the friend you wish you had in every town. No commissions, no fixed packages — just honest recommendations and a genuine wish that you fall in love with my home the way I have. Message me anytime.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-105">
                  Say hello on WhatsApp
                </a>
                <a href="#contact" className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5">
                  More about us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Contact() {
  const items = [
    { label: 'Phone', value: SITE.phone, href: `tel:${SITE.phoneRaw}`, icon: 'Phone' },
    { label: 'WhatsApp', value: SITE.phone, href: WHATSAPP_LINK, icon: 'MessageCircle' },
    { label: 'Instagram', value: 'ajexplorer.in', href: SITE.instagram, icon: 'Instagram' },
    { label: 'Facebook', value: 'Explore Kanyakumari', href: SITE.facebook, icon: 'Facebook' },
    { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, icon: 'Mail' },
    { label: 'Google Maps', value: 'Kanyakumari, Tamil Nadu', href: SITE.maps, icon: 'MapPin' },
  ];
  return (
    <Section id="contact" eyebrow="Contact" title="Let's plan your trip" subtitle="Reach out any way you like. We usually reply within minutes.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.05}>
            <a href={c.href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-ocean-200 hover:shadow-card dark:border-white/10 dark:bg-slate-900/60">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean-50 text-ocean-600 transition-colors group-hover:bg-ocean-600 group-hover:text-white dark:bg-ocean-900/40 dark:text-ocean-300">
                <Icon name={c.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{c.label}</p>
                <p className="font-heading text-sm font-semibold text-ink dark:text-white">{c.value}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Footer() {
  const quick = [
    { label: 'Home', href: '#home' },
    { label: 'Explore', href: '#explore' },
    { label: 'Hotels', href: '#hotels' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Food', href: '#food' },
    { label: 'Trip Planner', href: '#planner' },
    { label: 'Blog', href: '#blog' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];
  return (
    <footer className="border-t border-gray-100 bg-white dark:border-white/10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <img src="/finel icon.png" alt="Icon" className="h-8 w-8" />
              </span>
              <span className="font-heading text-base font-semibold text-ink dark:text-white">Explore Kanyakumari</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-gray-500 dark:text-gray-400">
              Your trusted local travel assistant. Honest recommendations, verified partners and personalized plans — so you can simply enjoy the trip.
            </p>
            <div className="mt-4 flex gap-2">
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-ocean-600 hover:text-white dark:bg-white/5 dark:text-gray-300"><Icon name="MessageCircle" className="h-4 w-4" /></a>
              <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-ocean-600 hover:text-white dark:bg-white/5 dark:text-gray-300"><Icon name="Instagram" className="h-4 w-4" /></a>
              <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-ocean-600 hover:text-white dark:bg-white/5 dark:text-gray-300"><Icon name="Facebook" className="h-4 w-4" /></a>
              <a href={`mailto:${SITE.email}`} aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-ocean-600 hover:text-white dark:bg-white/5 dark:text-gray-300"><Icon name="Mail" className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-ink dark:text-white">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              {quick.map((q) => (
                <li key={q.label}><a href={q.href} className="text-sm text-gray-500 transition-colors hover:text-ocean-600 dark:text-gray-400 dark:hover:text-ocean-300">{q.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-ink dark:text-white">Legal</h4>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="text-sm text-gray-500 transition-colors hover:text-ocean-600 dark:text-gray-400 dark:hover:text-ocean-300">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-500 transition-colors hover:text-ocean-600 dark:text-gray-400 dark:hover:text-ocean-300">Terms of Service</a></li>
              <li><a href="#emergency" className="text-sm text-gray-500 transition-colors hover:text-ocean-600 dark:text-gray-400 dark:hover:text-ocean-300">Emergency Contacts</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-ink dark:text-white">Emergency</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-red-500" /> Police: 100</li>
              <li className="flex items-center gap-2"><Heart className="h-3.5 w-3.5 text-red-500" /> Ambulance: 108</li>
              <li className="flex items-center gap-2"><Icon name="Stethoscope" className="h-3.5 w-3.5 text-red-500" /> Hospital: 04652-246100</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-6 text-xs text-gray-400 dark:border-white/10 sm:flex-row">
          <p>© {new Date().getFullYear()} Explore Kanyakumari. Made with care by locals.</p>
          <p>For travelers, by locals. Always honest.</p>
        </div>
      </div>
    </footer>
  );
}
