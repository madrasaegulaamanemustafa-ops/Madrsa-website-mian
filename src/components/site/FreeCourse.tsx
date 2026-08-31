import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { Gift } from "lucide-react";

export function FreeCourse() {
  const { t } = useLang();
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-gold p-1 shadow-gold">
          <div className="rounded-3xl bg-card p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 pattern-overlay" />
            <div className="relative">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-emerald grid place-items-center mb-5 shadow-luxe">
                <Gift className="h-7 w-7 text-gold" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
                <span className="text-gradient-gold">{t.free.title}</span>
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">{t.free.desc}</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-emerald text-gold px-7 py-3.5 font-bold shadow-luxe hover:scale-105 transition-transform"
              >
                {t.free.cta} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
