import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { Instagram, Youtube, Facebook, MessageCircle } from "lucide-react";

export function Footer() {
  const { t } = useLang();
  return (
    <footer id="contact" className="relative bg-gradient-emerald text-background pt-20 pb-8 overflow-hidden">
      <div className="absolute inset-0 pattern-overlay" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">
            <span className="text-gradient-gold">{t.final.title}</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold text-gold-foreground px-8 py-4 font-bold shadow-gold animate-pulse-glow hover:scale-105 transition-transform"
            >
              <MessageCircle className="h-5 w-5" />
              {t.final.cta1}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass-dark px-8 py-4 font-bold text-gold border border-gold/40 hover:bg-gold/10 transition"
            >
              {t.final.cta2}
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto pb-10 border-b border-gold/20">
          <div>
            <div className="font-display text-xl font-bold text-gold mb-2">{t.brand}</div>
            <p className="text-sm text-background/70">{t.footer.tagline}</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Connect</div>
            <div className="flex gap-3">
              {[
                { i: Instagram, h: "https://instagram.com" },
                { i: Youtube, h: "https://youtu.be/AkWQDvhTKy4" },
                { i: Facebook, h: "https://facebook.com" },
                { i: MessageCircle, h: WHATSAPP_URL },
              ].map(({ i: Icon, h }, k) => (
                <a
                  key={k}
                  href={h}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full glass-dark grid place-items-center hover:bg-gold hover:text-gold-foreground transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">WhatsApp</div>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-background/85 hover:text-gold">
              +91 6393 741 504
            </a>
          </div>
        </div>

        <div className="text-center text-xs text-background/60 pt-8">
          © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
