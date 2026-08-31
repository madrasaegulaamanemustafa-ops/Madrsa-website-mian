import { useLang } from "@/i18n/LangContext";
import { Award, Crown } from "lucide-react";

export function Certification() {
  const { t } = useLang();
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-emerald p-1 shadow-luxe">
          <div className="rounded-3xl bg-card p-8 md:p-14 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gradient-gold opacity-20 blur-3xl" />
            <div className="grid md:grid-cols-2 gap-8 items-center relative">
              <div>
                <div className="inline-flex items-center gap-2 text-gold-foreground/70 text-xs uppercase tracking-[0.3em] mb-3">
                  <Award className="h-3.5 w-3.5 text-gold" /> Certification
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{t.cert.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{t.cert.desc}</p>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-emerald grid place-items-center relative overflow-hidden">
                  <div className="absolute inset-0 pattern-overlay" />
                  <div className="relative text-center text-gold p-8">
                    <Crown className="h-12 w-12 mx-auto mb-4" />
                    <div className="font-display text-xl font-bold">Certificate of Excellence</div>
                    <div className="text-xs uppercase tracking-[0.3em] mt-2 opacity-80">Madrasa E Gulaaman E Mustafa ﷺ</div>
                    <div className="mt-6 inline-block border border-gold/50 rounded-full px-4 py-1 text-xs">Awarded with Dastar</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
