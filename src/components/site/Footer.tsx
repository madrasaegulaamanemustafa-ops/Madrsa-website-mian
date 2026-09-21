import { Link } from "@tanstack/react-router";
import {
  useLang,
  WHATSAPP_URL,
  WHATSAPP_CHANNEL_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  YOUTUBE_URL,
} from "@/i18n/LangContext";
import {
  Instagram,
  Youtube,
  Facebook,
  MessageCircle,
  Radio,
  Phone,
  Sparkles,
  Trophy,
  Lock,
} from "lucide-react";

export function Footer() {
  const { t } = useLang();
  return (
    <footer
      id="contact"
      className="relative bg-[#FAF8F5] text-foreground pt-20 pb-12 overflow-hidden border-t border-emerald-deep/10"
    >
      <div className="absolute inset-0 pattern-overlay opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Top Call to Action */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-soft border border-emerald-deep/15 px-5 py-2 mb-6 shadow-subtle">
            <Sparkles
              className="h-4 w-4 text-amber-600 animate-spin"
              style={{ animationDuration: "6s" }}
            />
            <span className="text-xs font-extrabold tracking-[0.25em] uppercase text-emerald-deep">
              Admission Open 2026–27
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-emerald-deep mb-8 leading-tight tracking-tight">
            <span className="text-gradient-gold">{t.final.title}</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-light-sweep inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-emerald text-white px-9 py-4 font-extrabold shadow-luxe hover:scale-105 transition-all duration-300 w-full sm:w-auto text-base group focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <MessageCircle className="h-5 w-5 text-gold" />
              <span>{t.final.cta1}</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-9 py-4 font-extrabold text-emerald-deep border border-emerald-deep/15 shadow-soft hover:bg-emerald-soft/50 transition-all duration-300 w-full sm:w-auto text-base focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <Phone className="h-5 w-5 text-emerald-deep" />
              <span>{t.final.cta2}</span>
            </a>
          </div>
        </div>

        {/* 3-Column Footer Information */}
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto pb-12 border-b border-emerald-deep/10 items-start">
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start gap-4">
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-1.5 border border-gold/40 shadow-soft grid place-items-center">
                <img
                  src="/images/why-us/logo.png"
                  alt="Madrasa E Gulaaman E Mustafa ﷺ Official Seal"
                  className="w-full h-full object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-emerald-deep mb-2">
                {t.brand}
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed font-medium">
                {t.footer.tagline}
              </p>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-emerald-deep font-extrabold mb-4">
              Connect With Us
            </div>
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
                  className="h-11 w-11 rounded-2xl bg-white border border-emerald-deep/15 text-emerald-deep grid place-items-center hover:bg-emerald-deep hover:text-white transition-all duration-300 hover:scale-110 shadow-subtle focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-emerald-deep font-extrabold mb-4">
              WhatsApp Direct
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-extrabold text-emerald-deep hover:text-amber-700 transition-colors flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5 text-amber-600" />
              <span>+91 6393 741 504</span>
            </a>
            <p className="text-xs text-foreground/60 mt-2 font-medium">
              Available 24/7 for Admission Assistance & Queries
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Quick Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground/60 font-medium">
          <div>
            © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
          </div>

          <div className="flex items-center gap-5">
            <Link
              to="/results"
              className="hover:text-emerald-deep font-bold flex items-center gap-1.5 transition-colors"
            >
              <Trophy className="h-3.5 w-3.5 text-amber-600" />
              <span>Student Results</span>
            </Link>

            <Link
              to="/admin/results"
              className="hover:text-emerald-deep font-bold flex items-center gap-1.5 transition-colors"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
