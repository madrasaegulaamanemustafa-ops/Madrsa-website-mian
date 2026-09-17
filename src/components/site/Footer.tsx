import { useLang, WHATSAPP_URL, WHATSAPP_CHANNEL_URL, INSTAGRAM_URL, FACEBOOK_URL, YOUTUBE_URL } from "@/i18n/LangContext";
import { Instagram, Youtube, Facebook, MessageCircle, Radio, Phone, Sparkles } from "lucide-react";

export function Footer() {
  const { t } = useLang();
  return (
    <footer id="contact" className="relative bg-emerald-deep text-white pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 pattern-overlay opacity-30" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Top Call to Action */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 border border-gold/40 px-5 py-2 mb-6 shadow-sm">
            <Sparkles className="h-4 w-4 text-gold-light animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-xs font-extrabold tracking-[0.25em] uppercase text-gold-light">
              Admission Open 2026–27
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 leading-tight tracking-tight">
            <span className="text-gradient-gold-bright">{t.final.title}</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-gold text-gold-foreground px-9 py-4.5 font-extrabold shadow-gold animate-pulse-glow hover:scale-105 transition-all duration-300 w-full sm:w-auto text-base group"
            >
              <MessageCircle className="h-5 w-5 fill-gold-foreground" />
              <span>{t.final.cta1}</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-2xl glass-dark px-9 py-4.5 font-extrabold text-gold-light border border-gold/40 hover:bg-gold/15 transition-all duration-300 w-full sm:w-auto text-base"
            >
              <Phone className="h-5 w-5" />
              <span>{t.final.cta2}</span>
            </a>
          </div>
        </div>

        {/* 3-Column Footer Information */}
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto pb-12 border-b border-white/15">
          <div>
            <div className="font-display text-2xl font-bold text-gold-light mb-3">{t.brand}</div>
            <p className="text-sm text-white/75 leading-relaxed font-medium">{t.footer.tagline}</p>
          </div>
          
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-gold-light font-extrabold mb-4">Connect With Us</div>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: "Instagram", icon: Instagram, url: INSTAGRAM_URL },
                { name: "YouTube", icon: Youtube, url: YOUTUBE_URL },
                { name: "Facebook", icon: Facebook, url: FACEBOOK_URL },
                { name: "WhatsApp Channel", icon: Radio, url: WHATSAPP_CHANNEL_URL },
                { name: "WhatsApp Chat", icon: MessageCircle, url: WHATSAPP_URL },
              ].map(({ name, icon: Icon, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={name}
                  aria-label={name}
                  className="h-11 w-11 rounded-2xl glass-dark grid place-items-center hover:bg-gold hover:text-gold-foreground transition-all duration-300 hover:scale-110 shadow-sm border border-gold/25"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-gold-light font-extrabold mb-4">WhatsApp Direct</div>
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-base font-bold text-white hover:text-gold-light transition-colors flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4 text-gold-light" />
              <span>+91 6393 741 504</span>
            </a>
            <p className="text-xs text-white/60 mt-2">Available 24/7 for Admission Assistance & Queries</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-white/60 pt-8 font-medium">
          © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
