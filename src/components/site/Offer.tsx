import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { Crown, Flame, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";

export function Offer() {
  const { t } = useLang();
  return (
    <section id="offer" className="relative py-28 bg-gradient-beige overflow-hidden">
      <div className="absolute inset-0 pattern-overlay opacity-40" />
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-emerald-deep bg-emerald-soft px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4 border border-emerald-deep/15 shadow-subtle">
            <Flame className="h-4 w-4 text-gold fill-gold" />
            <span>{t.offer.kicker}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-emerald-deep mb-4 leading-tight">
            <span className="text-gradient-gold">{t.offer.title.split("—")[0]}</span>
            {t.offer.title.includes("—") && (
              <>
                <span className="block text-2xl sm:text-3xl md:text-4xl text-emerald-deep mt-1 font-bold">
                  — {t.offer.title.split("—")[1]}
                </span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg font-medium leading-relaxed">
            {t.offer.desc}
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-[2.5rem] bg-gradient-emerald p-1.5 sm:p-2 shadow-luxe gold-border-glow">
            
            {/* Top Ribbon Badge */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
              <div className="bg-gradient-gold text-gold-foreground px-6 py-2 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-widest flex items-center gap-2 shadow-gold animate-bounce" style={{ animationDuration: '3s' }}>
                <Crown className="h-4 w-4 fill-gold-foreground" />
                <span>Mega Special Offer</span>
              </div>
            </div>

            <div className="rounded-[2.2rem] bg-white p-6 sm:p-10 md:p-12">
              <div className="space-y-4">
                {t.offer.rows.map((r: any, i: number) => {
                  const isFeatured = i === 2; // "All 9 Courses"
                  return (
                    <div
                      key={i}
                      className={`relative flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 rounded-2xl transition-all duration-300 ${
                        isFeatured
                          ? "bg-emerald-soft/80 border-2 border-gold shadow-soft hover:shadow-gold"
                          : "bg-white border border-emerald-deep/10 hover:border-gold/40 hover:shadow-subtle"
                      }`}
                    >
                      {isFeatured && (
                        <div className="absolute -top-3 right-4 bg-gradient-gold text-gold-foreground text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                          <Sparkles className="h-3 w-3" /> Best Value
                        </div>
                      )}
                      
                      <div className="mb-2 sm:mb-0">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className={`h-5 w-5 ${isFeatured ? "text-emerald-deep fill-gold/30" : "text-emerald-deep/60"}`} />
                          <span className="font-display text-xl sm:text-2xl font-bold text-emerald-deep">
                            {r.label}
                          </span>
                        </div>
                        {r.desc && (
                          <span className="text-xs sm:text-sm text-muted-foreground block mt-1 ml-7">
                            {r.desc}
                          </span>
                        )}
                      </div>

                      <div className="text-left sm:text-right ml-7 sm:ml-0">
                        <span className="font-display text-3xl sm:text-4xl font-extrabold text-gradient-gold block">
                          {r.price}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          No Hidden Fees
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* 9 Courses Pill List */}
              <div className="mt-8 pt-8 border-t border-emerald-deep/10">
                <p className="text-sm font-bold text-emerald-deep mb-4 flex justify-center items-center gap-2 uppercase tracking-wider">
                  <Crown className="h-4 w-4 text-gold fill-gold" />
                  <span>{t.offer.coursesListTitle}</span>
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
                  {t.offer.coursesList?.map((course: string, i: number) => (
                    <span 
                      key={i} 
                      className="text-xs sm:text-sm font-semibold bg-emerald-soft text-emerald-deep px-3.5 py-1.5 rounded-xl border border-emerald-deep/15 hover:border-gold/50 hover:bg-white transition-all shadow-subtle"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Callout */}
              <div className="mt-10 text-center">
                <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-6 border border-destructive/20">
                  <span className="inline-block h-2 w-2 rounded-full bg-destructive animate-ping" />
                  <span>{t.offer.urgency}</span>
                </div>
                
                <div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-emerald text-white px-9 py-4 font-extrabold shadow-luxe hover:scale-105 transition-all duration-300 w-full sm:w-auto text-base group"
                  >
                    <MessageCircle className="h-5 w-5 text-gold" />
                    <span>{t.offer.cta}</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
