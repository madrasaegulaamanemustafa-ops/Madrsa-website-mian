import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { Gift, MessageCircle, Sparkles } from "lucide-react";

export function FreeCourse() {
  const { t } = useLang();
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto rounded-[2.5rem] bg-gradient-gold p-1.5 shadow-gold gold-border-glow">
          <div className="rounded-[2.2rem] bg-white p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 pattern-overlay opacity-20" />
            <div className="relative z-10">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-emerald grid place-items-center mb-6 shadow-luxe">
                <Gift className="h-8 w-8 text-gold animate-bounce" style={{ animationDuration: '3s' }} />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-4 text-emerald-deep leading-tight">
                <span className="text-gradient-gold">{t.free.title}</span>
              </h2>
              <p className="text-base sm:text-lg text-foreground/75 max-w-lg mx-auto mb-8 font-medium leading-relaxed">
                {t.free.desc}
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-emerald text-white px-8 py-4 font-extrabold shadow-luxe hover:scale-105 transition-all duration-300 text-sm sm:text-base group"
              >
                <MessageCircle className="h-5 w-5 text-gold" />
                <span>{t.free.cta}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
