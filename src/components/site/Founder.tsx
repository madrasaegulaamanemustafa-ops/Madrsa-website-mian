import { useLang } from "@/i18n/LangContext";
import { Star } from "lucide-react";

export function Founder() {
  const { t } = useLang();
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 text-emerald-deep text-xs uppercase tracking-[0.3em] mb-3">
            <Star className="h-3.5 w-3.5 text-gold" /> {t.founder.kicker}
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">{t.founder.name}</h2>
          <div className="h-1 w-20 bg-gradient-gold rounded-full mb-5 mx-auto" />
          <p className="text-lg text-muted-foreground leading-relaxed">{t.founder.desc}</p>
        </div>
      </div>
    </section>
  );
}
