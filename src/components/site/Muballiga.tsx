import { useLang } from "@/i18n/LangContext";
import { Heart, Check, MessageCircle, ShieldCheck, Lock, Sparkles, UserCheck } from "lucide-react";

export function Muballiga() {
  const { t } = useLang();

  const sisterWhatsAppUrl = `https://wa.me/6393741504?text=${encodeURIComponent(
    "Assalamu Alaikum! I am a sister inquiring about the Muballiga / Aalima Course for females at Madrasa E Gulaaman E Mustafa ﷺ.",
  )}`;

  return (
    <section className="py-28 relative overflow-hidden bg-[#FAF8F5]">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute inset-0 bg-gradient-beige" />
      <div className="absolute inset-0 pattern-overlay opacity-25" />
      <div className="absolute -top-40 right-10 w-[500px] h-[500px] bg-gold/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 left-10 w-[500px] h-[500px] bg-emerald-glow/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-[2.8rem] p-8 sm:p-12 md:p-16 gold-border-glow shadow-luxe border border-emerald-deep/10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-soft border border-emerald-deep/15 px-5 py-2 mb-5 shadow-subtle">
              <Heart className="h-4 w-4 text-emerald-deep fill-emerald-deep/20" />
              <span className="text-xs font-extrabold tracking-[0.25em] uppercase text-emerald-deep">
                {t.muballiga.kicker}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-deep mb-4 tracking-tight leading-tight">
              <span className="text-gradient-gold">{t.muballiga.title}</span>
            </h2>

            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-emerald-deep font-bold bg-emerald-soft px-5 py-2 rounded-full border border-emerald-deep/15 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-deep shrink-0" />
              <span>100% Shariah & Female Aalima / Muftiya Staff Guaranteed</span>
            </div>
          </div>

          {/* Privacy & Safety Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-center">
            <div className="bg-emerald-soft/70 p-5 rounded-2xl border border-emerald-deep/10 shadow-subtle">
              <UserCheck className="h-6 w-6 text-emerald-deep mx-auto mb-2" />
              <div className="text-xs font-extrabold text-emerald-deep uppercase tracking-wider mb-1">
                Female Teachers Only
              </div>
              <div className="text-[11px] text-foreground/75 font-medium">
                Taught strictly by qualified Aalimas, Muftiyas & Qariyas.
              </div>
            </div>
            <div className="bg-emerald-soft/70 p-5 rounded-2xl border border-emerald-deep/10 shadow-subtle">
              <Lock className="h-6 w-6 text-emerald-deep mx-auto mb-2" />
              <div className="text-xs font-extrabold text-emerald-deep uppercase tracking-wider mb-1">
                Strict Purdah & Privacy
              </div>
              <div className="text-[11px] text-foreground/75 font-medium">
                Audio and screen-only mode supported with complete privacy.
              </div>
            </div>
            <div className="bg-emerald-soft/70 p-5 rounded-2xl border border-emerald-deep/10 shadow-subtle">
              <Sparkles className="h-6 w-6 text-emerald-deep mx-auto mb-2" />
              <div className="text-xs font-extrabold text-emerald-deep uppercase tracking-wider mb-1">
                Flexible Timings
              </div>
              <div className="text-[11px] text-foreground/75 font-medium">
                1 hour daily batch with live class recordings available 24/7.
              </div>
            </div>
          </div>

          {/* Points Grid */}
          <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-4xl mx-auto mb-12">
            {t.muballiga.points.map((p: string, i: number) => (
              <div
                key={i}
                className="flex items-start gap-3.5 bg-white rounded-2xl p-4 sm:p-5 border border-emerald-deep/10 hover:border-gold/50 hover:shadow-subtle transition-all duration-300 shadow-sm"
              >
                <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-emerald grid place-items-center mt-0.5 shadow-sm">
                  <Check className="h-3.5 w-3.5 text-gold stroke-[3]" />
                </div>
                <span className="text-sm text-foreground/85 font-semibold leading-relaxed">
                  {p}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Action */}
          <div className="text-center">
            <a
              href={sisterWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-light-sweep inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-emerald px-12 py-5 font-black text-white shadow-luxe hover:scale-105 transition-all duration-300 text-base group"
            >
              <MessageCircle className="h-5 w-5 text-gold" />
              <span>{t.muballiga.cta}</span>
            </a>
            <div className="mt-3 text-xs text-muted-foreground font-medium">
              Direct connection with our female admission coordinator desk.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
