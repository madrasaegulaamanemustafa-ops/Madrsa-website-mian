import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { Baby, Star } from "lucide-react";
import kidsPoster from "@/assets/poster-kids-special.jpg";

export function KidsCourse() {
  const { t } = useLang();
  return (
    <section id="kids" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 pattern-overlay opacity-30" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-deep/10 border border-emerald-deep/20 px-4 py-1.5 mb-5">
              <Baby className="h-4 w-4 text-emerald-deep" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-deep">{t.kids.badge}</span>
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {t.kids.title1} <span className="text-gradient-gold">{t.kids.title2}</span> {t.kids.title3}
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              {t.kids.desc}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {t.kids.points.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-5 w-5 shrink-0 rounded-full bg-gradient-gold grid place-items-center mt-0.5 shadow-gold">
                    <Star className="h-3 w-3 text-gold-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground/90">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-emerald px-8 py-4 font-bold text-gold shadow-luxe hover:scale-105 transition-transform"
              >
                {t.kids.cta}
              </a>
              <div className="text-sm font-semibold text-emerald-deep px-4 py-2 bg-emerald-deep/10 rounded-full border border-emerald-deep/20">
                {t.kids.duration}
              </div>
            </div>
          </div>

          <div>
            <div className="relative rounded-3xl overflow-hidden gold-border shadow-luxe group">
              <img 
                src={kidsPoster} 
                alt="Kids Special Course" 
                loading="lazy" 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
