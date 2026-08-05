import { useEffect, useState, useCallback } from 'react';
import { Sun, Sunrise, Sunset, Waves, Cloud, Wind, Droplets } from 'lucide-react';
import { Reveal } from '@/components/ui';
import { useLang } from '@/context/LanguageContext';

type Weather = {
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  seaCondition: string;
  waveHeight: number;
};

// Static-ish local data (Kanyakumari coastal). We compute today's sunrise/sunset
// with a simple approximation so the UI feels live without an API key.
function approxSunTimes(date: Date) {
  // Kanyakumari ~8.08N, 77.54E. Approx sunrise ~6:10, sunset ~18:20 with seasonal drift.
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const drift = 18 * Math.sin(((dayOfYear - 80) / 365) * 2 * Math.PI); // minutes
  const sunriseMins = 6 * 60 + 10 + drift;
  const sunsetMins = 18 * 60 + 20 - drift;
  const fmt = (m: number) => {
    const h = Math.floor(m / 60);
    const mm = Math.round(m % 60);
    const ap = h >= 12 ? 'PM' : 'AM';
    const hh = h % 12 === 0 ? 12 : h % 12;
    return `${hh}:${mm.toString().padStart(2, '0')} ${ap}`;
  };
  return { sunrise: fmt(sunriseMins), sunset: fmt(sunsetMins) };
}

export default function PremiumWidgets() {
  const { t } = useLang();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [sun, setSun] = useState(approxSunTimes(new Date()));

  const fetchWeather = useCallback(() => {
    const lat = 8.08;
    const lon = 77.54;

    // Fetch weather data
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`)
      .then((r) => r.json())
      .then((d) => {
        const code = d?.current?.weather_code ?? 0;
        const cond = code === 0 ? 'Clear' : code <= 3 ? 'Partly Cloudy' : code <= 48 ? 'Foggy' : code <= 67 ? 'Rainy' : 'Cloudy';
        setWeather({
          temp: Math.round(d?.current?.temperature_2m ?? 29),
          condition: cond,
          humidity: d?.current?.relative_humidity_2m ?? 75,
          wind: Math.round(d?.current?.wind_speed_10m ?? 12),
          seaCondition: 'Calm',
          waveHeight: 0.5,
        });
      })
      .catch(() =>
        setWeather({ temp: 29, condition: 'Clear', humidity: 75, wind: 12, seaCondition: 'Calm', waveHeight: 0.5 })
      );

    // Fetch marine data for sea condition
    fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=wave_height`)
      .then((r) => r.json())
      .then((d) => {
        const waveHeight = d?.current?.wave_height ?? 0.5;
        let seaCond = 'Calm';
        if (waveHeight > 2.5) seaCond = 'Rough';
        else if (waveHeight > 1.5) seaCond = 'Moderate';
        else if (waveHeight > 0.5) seaCond = 'Light Waves';

        setWeather(prev => prev ? { ...prev, seaCondition: seaCond, waveHeight } : null);
      })
      .catch(() => {});

    setSun(approxSunTimes(new Date()));
  }, []);

  useEffect(() => {
    fetchWeather();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchWeather]);

  return (
<section id="explore" className="relative -mt-10 z-20 responsive-pad">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid gap-4 rounded-3xl border border-white/40 bg-white/80 p-4 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-ocean-50 to-white p-4 dark:from-ocean-900/30 dark:to-transparent">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ocean-600 text-white">
                <Cloud className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{t.premiumWidgets.liveWeather}</p>
                <p className="font-heading text-lg font-semibold text-ink dark:text-white">
                  {weather ? `${weather.temp}°C` : '—'}
                  <span className="ml-1 text-sm font-normal text-gray-500">{weather?.condition ? t.premiumWidgets.weather[weather.condition] ?? weather.condition : ''}</span>
                </p>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Droplets className="h-3 w-3" />{weather?.humidity}%</span>
                  <span className="flex items-center gap-1"><Wind className="h-3 w-3" />{weather?.wind}km/h</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-amber-50 to-white p-4 dark:from-amber-900/20 dark:to-transparent">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-white">
                <Sunrise className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{t.premiumWidgets.sunrise}</p>
                <p className="font-heading text-lg font-semibold text-ink dark:text-white">{sun.sunrise}</p>
                <p className="text-xs text-gray-500">{t.premiumWidgets.sunriseInfo}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-orange-50 to-white p-4 dark:from-orange-900/20 dark:to-transparent">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
                <Sunset className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{t.premiumWidgets.sunset}</p>
                <p className="font-heading text-lg font-semibold text-ink dark:text-white">{sun.sunset}</p>
                <p className="text-xs text-gray-500">{t.premiumWidgets.sunriseInfo}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-sky-50 to-white p-4 dark:from-sky-900/20 dark:to-transparent">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-400 text-white">
                <Waves className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{t.premiumWidgets.seaCondition}</p>
                <p className="font-heading text-lg font-semibold text-ink dark:text-white">{weather?.seaCondition ? t.premiumWidgets.sea[weather.seaCondition] ?? weather.seaCondition : t.premiumWidgets.loading}</p>
                <p className="text-xs text-gray-500">{weather?.waveHeight ? `${weather.waveHeight}m ${t.premiumWidgets.waves}` : t.premiumWidgets.loading}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-4 flex flex-col gap-3 rounded-3xl border border-white/40 bg-white/70 p-5 shadow-soft backdrop-blur-md dark:border-white/10 dark:bg-slate-900/50 sm:flex-row sm:items-center">
            <div className="flex shrink-0 items-center gap-2">
              <Sun className="h-4 w-4 text-gold-500" />
              <span className="font-heading text-sm font-semibold text-ink dark:text-white">{t.premiumWidgets.localEvents}</span>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              {t.localEvents.map((e) => (
                <div key={e.name} className="flex shrink-0 items-center gap-2 rounded-full bg-ocean-50 px-3 py-1.5 text-xs dark:bg-ocean-900/30">
                  <span className="font-semibold text-ocean-700 dark:text-ocean-300">{e.month}</span>
                  <span className="text-gray-600 dark:text-gray-300">{e.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
