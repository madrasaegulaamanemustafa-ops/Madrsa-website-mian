import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import heroImg from "@/assets/hero-mosque.jpg";
import { Check, MessageCircle, GraduationCap, Sparkles } from "lucide-react";

export function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Mosque" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/85 via-emerald-deep/75 to-emerald-deep/95" />
        <div className="absolute inset-0 pattern-overlay" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 animate-fade-up">
            <h2 className="font-arabic text-4xl md:text-5xl lg:text-6xl text-gold drop-shadow-md tracking-wide" dir="rtl">
              السلام عليكم ورحمة الله
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full glass-dark px-5 py-2 mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-gold uppercase">
              {t.hero.badge}
            </span>
          </div>

          <h1
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-background leading-[1.05] mb-6 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t.hero.title.split(" ").slice(0, -3).join(" ")}{" "}
            <span className="text-gradient-gold">{t.hero.title.split(" ").slice(-3).join(" ")}</span>
          </h1>

          <p
            className="text-lg md:text-xl text-background/85 max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            {t.hero.subtitle}
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            {t.hero.trust.map((tr) => (
              <div key={tr} className="flex items-center gap-2 text-sm text-background/90">
                <div className="h-5 w-5 rounded-full bg-gradient-gold grid place-items-center">
                  <Check className="h-3 w-3 text-gold-foreground" />
                </div>
                <span>{tr}</span>
              </div>
            ))}
          </div>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-4 text-sm font-bold text-gold-foreground shadow-gold animate-pulse-glow hover:scale-105 transition-transform"
            >
              <MessageCircle className="h-5 w-5" />
              {t.hero.cta1}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass-dark px-7 py-4 text-sm font-bold text-gold border border-gold/40 hover:bg-gold/10 transition"
            >
              <GraduationCap className="h-5 w-5" />
              {t.hero.cta2}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-background/90 hover:text-gold transition"
            >
              {t.hero.cta3} →
            </a>
          </div>


        </div>
      </div>
    </section>
  );
}
