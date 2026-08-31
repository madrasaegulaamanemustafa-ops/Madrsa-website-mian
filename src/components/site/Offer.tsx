import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { Crown, Flame } from "lucide-react";

export function Offer() {
  const { t } = useLang();
  return (
    <section id="offer" className="relative py-24 bg-gradient-beige overflow-hidden">
      <div className="absolute inset-0 pattern-overlay" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-gold-foreground/70 text-xs uppercase tracking-[0.3em] mb-3">
            <Flame className="h-3.5 w-3.5 text-gold" /> {t.offer.kicker}
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient-gold">{t.offer.title.split("—")[0]}</span>
            {t.offer.title.includes("—") && <><br /><span className="text-emerald-deep">{t.offer.title.split("—")[1]}</span></>}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t.offer.desc}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-emerald p-1 shadow-luxe">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-gradient-gold text-gold-foreground px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-gold">
                <Crown className="h-3.5 w-3.5" /> Mega Offer
              </div>
            </div>
            <div className="rounded-3xl bg-card p-8 md:p-12">
              <div className="space-y-3">
                {t.offer.rows.map((r: any, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-5 rounded-2xl bg-gradient-beige gold-border hover:shadow-soft transition"
                  >
                    <div>
                      <span className="font-display text-xl md:text-2xl font-semibold block">{r.label}</span>
                      {r.desc && <span className="text-sm text-muted-foreground block mt-1">{r.desc}</span>}
                    </div>
                    <span className="font-display text-3xl md:text-4xl font-bold text-gradient-gold">
                      {r.price}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-sm font-semibold text-foreground/80 mb-3 flex justify-center items-center gap-2">
                  <Crown className="h-4 w-4 text-gold" /> {t.offer.coursesListTitle}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {t.offer.coursesList?.map((course: string, i: number) => (
                    <span 
                      key={i} 
                      className="text-xs md:text-sm font-medium bg-emerald-deep/10 text-emerald-deep px-3 py-1.5 rounded-full border border-emerald-deep/20"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm font-semibold text-destructive mb-4 animate-pulse">
                  ⚡ {t.offer.urgency}
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-emerald text-gold px-8 py-4 font-bold shadow-luxe hover:scale-105 transition-transform"
                >
                  {t.offer.cta} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
