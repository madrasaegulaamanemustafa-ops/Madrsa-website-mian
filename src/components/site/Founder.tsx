import { useLang } from "@/i18n/LangContext";
import { Star, Award } from "lucide-react";

export function Founder() {
  const { t } = useLang();
  return (
    <section className="py-24 bg-gradient-beige relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center bg-white p-8 sm:p-12 rounded-[2.5rem] border border-emerald-deep/10 shadow-subtle hover:shadow-soft transition-all">
          <div className="inline-flex items-center justify-center gap-2 text-emerald-deep bg-emerald-soft px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4 border border-emerald-deep/15 shadow-subtle">
            <Award className="h-4 w-4 text-gold fill-gold" />
            <span>{t.founder.kicker}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-deep mb-3">
            {t.founder.name}
          </h2>
          <div className="h-1 w-20 bg-gradient-gold rounded-full mb-6 mx-auto" />
          <p className="text-base sm:text-lg text-foreground/75 leading-relaxed font-medium">
            {t.founder.desc}
          </p>
        </div>
      </div>
    </section>
  );
}
