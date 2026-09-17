import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { Baby, Star, MessageCircle, Sparkles } from "lucide-react";
import kidsPoster from "@/assets/poster-kids-special.jpg";

export function KidsCourse() {
  const { t } = useLang();
  return (
    <section id="kids" className="py-28 relative overflow-hidden bg-background">
      <div className="absolute inset-0 pattern-overlay opacity-25" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-soft border border-emerald-deep/15 px-4 py-1.5 mb-5 shadow-subtle">
              <Baby className="h-4 w-4 text-emerald-deep" />
              <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-emerald-deep">
                {t.kids.badge}
              </span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold mb-5 text-emerald-deep leading-tight">
              {t.kids.title1} <span className="text-gradient-gold">{t.kids.title2}</span> {t.kids.title3}
            </h2>
            
            <p className="text-base sm:text-lg text-foreground/75 mb-8 font-medium leading-relaxed">
              {t.kids.desc}
            </p>

            <div className="grid sm:grid-cols-2 gap-3.5 mb-10">
              {t.kids.points.map((point: string, i: number) => (
                <div key={i} className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-emerald-deep/10 shadow-subtle hover:border-gold/40 transition-all">
                  <div className="h-5 w-5 shrink-0 rounded-full bg-gradient-gold grid place-items-center mt-0.5 shadow-sm">
                    <Star className="h-3 w-3 text-gold-foreground fill-gold-foreground" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-emerald-deep/90">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-emerald px-8 py-4 font-extrabold text-white shadow-luxe hover:scale-105 transition-all duration-300 group text-sm sm:text-base"
              >
                <MessageCircle className="h-5 w-5 text-gold" />
                <span>{t.kids.cta}</span>
              </a>
              <div className="text-xs sm:text-sm font-bold text-emerald-deep px-5 py-3 bg-emerald-soft rounded-2xl border border-emerald-deep/15 flex items-center gap-2 shadow-subtle">
                <Sparkles className="h-4 w-4 text-gold" />
                <span>{t.kids.duration}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-emerald p-1.5 shadow-luxe gold-border-glow group">
              <img 
                src={kidsPoster} 
                alt="Kids Special Course" 
                loading="lazy" 
                className="w-full h-auto object-cover rounded-[2.2rem] group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
