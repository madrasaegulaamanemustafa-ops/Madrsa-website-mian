import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import makkahBg from "@/assets/makkah-holy-bg.webp";
import { Crown, Flame, CheckCircle2, MessageCircle, Sparkles, HeartHandshake } from "lucide-react";

export function Offer() {
  const { t } = useLang();
  return (
    <section id="offer" className="relative py-28 bg-[#FAF8F5] overflow-hidden">
      {/* Holy Sanctuary Background Layer with Soft Sunlight Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={makkahBg}
          alt="Masjid al-Haram Makkah Mukarramah"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-10 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5]/85 to-[#FAF8F5]" />
      </div>

      {/* Dynamic Ambient Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-gold/15 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-emerald-glow/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 pattern-overlay opacity-25" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-emerald-deep bg-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4 border border-gold/40 shadow-subtle">
            <Flame className="h-4 w-4 text-amber-600 fill-amber-600 animate-pulse" />
            <span>{t.offer.kicker}</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-emerald-deep mb-4 leading-tight">
            <span className="text-gradient-gold">{t.offer.title.split("—")[0]}</span>
            {t.offer.title.includes("—") && (
              <span className="block text-2xl sm:text-3xl md:text-4xl text-emerald-deep mt-1 font-bold">
                — {t.offer.title.split("—")[1]}
              </span>
            )}
          </h2>

          <p className="text-foreground/80 text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            {t.offer.desc}
          </p>
        </div>

        {/* Pricing Card Masterpiece */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-[2.8rem] bg-gradient-gold p-1.5 sm:p-2 shadow-luxe gold-border-glow">
            {/* Top Ribbon Badge */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
              <div
                className="bg-gradient-gold text-gold-foreground px-8 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest flex items-center gap-2 shadow-gold animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <Crown className="h-4 w-4 fill-gold-foreground" />
                <span>2026–27 Big Mega Offer</span>
              </div>
            </div>

            <div className="rounded-[2.4rem] bg-white p-6 sm:p-10 md:p-12">
              {/* Pricing Rows Comparison */}
              <div className="space-y-4">
                {t.offer.rows.map(
                  (r: { label: string; price: string; desc?: string }, i: number) => {
                    const isFeatured = i === 2; // "All 9 Courses"
                    return (
                      <div
                        key={i}
                        className={`relative flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 rounded-2xl transition-all duration-300 ${
                          isFeatured
                            ? "bg-emerald-soft/90 border-2 border-gold shadow-gold hover:scale-[1.01]"
                            : "bg-white border border-emerald-deep/10 hover:border-gold/40 hover:shadow-subtle"
                        }`}
                      >
                        {isFeatured && (
                          <div className="absolute -top-3.5 right-6 bg-gradient-gold text-gold-foreground text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                            <Sparkles className="h-3 w-3" /> Most Popular Choice
                          </div>
                        )}

                        <div className="mb-2 sm:mb-0">
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2
                              className={`h-5 w-5 ${isFeatured ? "text-emerald-deep fill-gold/40" : "text-emerald-deep/60"}`}
                            />
                            <span className="font-display text-xl sm:text-2xl font-bold text-emerald-deep">
                              {r.label}
                            </span>
                          </div>
                          {r.desc && (
                            <span className="text-xs sm:text-sm text-foreground/70 block mt-1 ml-7 font-medium">
                              {r.desc}
                            </span>
                          )}
                        </div>

                        <div className="text-left sm:text-right ml-7 sm:ml-0">
                          <span className="font-display text-3xl sm:text-4xl font-extrabold text-gradient-gold block">
                            {r.price}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            No Hidden Admission Fees
                          </span>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>

              {/* 9 Included Courses Pills */}
              <div className="mt-10 pt-8 border-t border-emerald-deep/10">
                <p className="text-sm font-bold text-emerald-deep mb-4 flex justify-center items-center gap-2 uppercase tracking-wider text-center">
                  <Crown className="h-4 w-4 text-gold fill-gold" />
                  <span>{t.offer.coursesListTitle}</span>
                </p>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
                  {t.offer.coursesList?.map((course: string, i: number) => (
                    <span
                      key={i}
                      className="text-xs sm:text-sm font-bold bg-emerald-soft text-emerald-deep px-4 py-2 rounded-xl border border-emerald-deep/15 hover:border-gold/50 hover:bg-white transition-all shadow-subtle flex items-center gap-2"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Khidmat-e-Deen Transparency Callout */}
              <div className="mt-8 bg-emerald-soft/60 p-4 rounded-2xl border border-emerald-deep/10 flex items-center gap-3">
                <HeartHandshake className="h-6 w-6 text-emerald-deep shrink-0" />
                <p className="text-xs text-emerald-deep/90 font-semibold leading-relaxed">
                  <strong>Khidmat-e-Deen Mission:</strong> Our goal is to make sacred Islamic
                  knowledge accessible to every single Muslim home worldwide without financial
                  burden.
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-8 text-center">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animate-light-sweep inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-emerald px-10 py-5 text-base font-extrabold text-white shadow-luxe hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5 text-gold" />
                  <span>{t.offer.cta}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
