import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { Heart, Check } from "lucide-react";

export function Muballiga() {
  const { t } = useLang();
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-emerald" />
      <div className="absolute inset-0 pattern-overlay" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto glass-dark rounded-3xl p-8 md:p-14">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 border border-gold/30 px-4 py-1.5 mb-5">
              <Heart className="h-4 w-4 text-gold" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-gold">{t.muballiga.kicker}</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-background mb-8">
              <span className="text-gradient-gold">{t.muballiga.title}</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
            {t.muballiga.points.map((p) => (
              <div key={p} className="flex items-start gap-3 glass-dark rounded-xl p-4">
                <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-gold grid place-items-center mt-0.5">
                  <Check className="h-3.5 w-3.5 text-gold-foreground" />
                </div>
                <span className="text-sm text-background/95">{p}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-8 py-4 font-bold text-gold-foreground shadow-gold animate-pulse-glow hover:scale-105 transition-transform"
            >
              {t.muballiga.cta} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
