import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { Heart, Check, MessageCircle, ShieldCheck } from "lucide-react";

export function Muballiga() {
  const { t } = useLang();
  return (
    <section className="py-28 relative overflow-hidden bg-emerald-deep">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 pattern-overlay opacity-30" />
      <div className="absolute -top-40 right-10 w-96 h-96 bg-gold/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 left-10 w-96 h-96 bg-emerald-glow/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto glass-dark rounded-[2.5rem] p-8 sm:p-12 md:p-16 gold-border-glow shadow-luxe">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 border border-gold/40 px-5 py-2 mb-5 shadow-sm">
              <Heart className="h-4 w-4 text-gold-light fill-gold-light" />
              <span className="text-xs font-extrabold tracking-[0.25em] uppercase text-gold-light">
                {t.muballiga.kicker}
              </span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              <span className="text-gradient-gold-bright">{t.muballiga.title}</span>
            </h2>
            
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gold-light/90 bg-black/20 px-4 py-1.5 rounded-full border border-gold/20">
              <ShieldCheck className="h-4 w-4 text-gold-light shrink-0" />
              <span>100% Shariah & Female Teacher Guaranteed</span>
            </div>
          </div>

          {/* Points Grid */}
          <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-3xl mx-auto mb-10">
            {t.muballiga.points.map((p: string, i: number) => (
              <div 
                key={i} 
                className="flex items-start gap-3.5 bg-black/25 backdrop-blur-md rounded-2xl p-4 sm:p-4.5 border border-white/10 hover:border-gold/40 hover:bg-black/35 transition-all duration-300 shadow-sm"
              >
                <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-gold grid place-items-center mt-0.5 shadow-gold">
                  <Check className="h-3.5 w-3.5 text-gold-foreground stroke-[3]" />
                </div>
                <span className="text-sm text-white/90 font-medium leading-relaxed">{p}</span>
              </div>
            ))}
          </div>

          {/* CTA Action */}
          <div className="text-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-gold px-10 py-4.5 font-extrabold text-gold-foreground shadow-gold animate-pulse-glow hover:scale-105 transition-all duration-300 text-base group"
            >
              <MessageCircle className="h-5 w-5 fill-gold-foreground" />
              <span>{t.muballiga.cta}</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
