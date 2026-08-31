import { useState, useEffect } from "react";
import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import type { Lang } from "@/i18n/translations";
import { Menu, X, Globe, MessageCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const langs: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ur", label: "اردو" },
  { code: "hi", label: "हिं" },
];

export function Navbar() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container mx-auto px-2 sm:px-4">
        <div
          className="flex items-center justify-between rounded-2xl px-2 sm:px-4 md:px-6 py-2 sm:py-3 transition-all glass shadow-soft"
        >
          <a href="#top" className="flex items-center gap-1.5 sm:gap-2.5 md:gap-4 group">
            <div className="relative h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-xl sm:rounded-2xl grid place-items-center shrink-0 border border-gold/30 shadow-gold overflow-hidden bg-[#2a2a2a] transition-transform group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="Madarsa Logo" 
                className="w-[120%] h-[120%] max-w-none object-cover" 
              />
            </div>
            <div>
              <div className="font-display text-[11px] xs:text-[13px] sm:text-base md:text-lg font-bold leading-[1.1] text-foreground max-w-[100px] xs:max-w-[130px] sm:max-w-none">
                {t.brand}
              </div>
              <div className="text-[7px] xs:text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-gold-foreground/70 mt-0.5">
                Online Islamic Institute
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <a href="#top" className="hover:text-gold transition-colors">{t.nav.home}</a>
            <a 
              href="#why" 
              className="bg-emerald-deep text-gold hover:text-gold/90 font-bold hover:bg-[#12422c] border border-gold/30 px-3.5 py-1.5 rounded-full transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center gap-1.5 hover:scale-105 cursor-pointer shrink-0"
            >
              <Star className="h-3.5 w-3.5 text-gold fill-gold animate-pulse" />
              <span>{t.nav.about}</span>
            </a>
            <a href="#offer" className="hover:text-gold transition-colors">{t.nav.offer}</a>
            <a href="#courses" className="hover:text-gold transition-colors">{t.nav.courses}</a>
            <a href="#posters" className="hover:text-gold transition-colors">{t.nav.posters}</a>
            <a href="#contact" className="hover:text-gold transition-colors">{t.nav.contact}</a>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 shrink-0">
            {/* Always visible Language Selector, made compact for mobile */}
            <div className="flex items-center gap-0.5 sm:gap-1 rounded-full glass px-0.5 sm:px-1 py-0.5 sm:py-1">
              <Globe className="hidden sm:block h-3.5 w-3.5 ml-2 text-emerald-deep" />
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={cn(
                    "px-1.5 sm:px-2.5 py-1 text-[10px] sm:text-xs font-semibold rounded-full transition-all",
                    lang === l.code
                      ? "bg-gradient-emerald text-gold shadow-soft"
                      : "text-foreground/70 hover:text-emerald-deep"
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-2 text-sm font-bold text-gold-foreground shadow-gold hover:scale-105 transition-transform"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{t.hero.cta1}</span>
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-emerald-deep/5 border border-emerald-deep/10 text-emerald-deep hover:bg-emerald-deep/10 transition-colors"
              aria-label="menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-2 glass-dark rounded-2xl p-4 animate-fade-up border border-gold/20 shadow-xl">
            <nav className="flex flex-col gap-3 text-base font-medium text-white/90">
              <a onClick={() => setOpen(false)} href="#top" className="py-2 hover:text-gold transition-colors">{t.nav.home}</a>
              <a 
                onClick={() => setOpen(false)} 
                href="#why" 
                className="py-3 px-4 my-1.5 rounded-xl bg-gradient-gold text-gold-foreground font-bold border border-gold/20 flex items-center justify-between shadow-gold transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-gold-foreground text-gold-foreground animate-pulse" />
                  <span>{t.nav.about}</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider bg-gold-foreground/10 px-2.5 py-0.5 rounded-full">New</span>
              </a>
              <a onClick={() => setOpen(false)} href="#offer" className="py-2 hover:text-gold transition-colors">{t.nav.offer}</a>
              <a onClick={() => setOpen(false)} href="#courses" className="py-2 hover:text-gold transition-colors">{t.nav.courses}</a>
              <a onClick={() => setOpen(false)} href="#posters" className="py-2 hover:text-gold transition-colors">{t.nav.posters}</a>
              <a onClick={() => setOpen(false)} href="#contact" className="py-2 hover:text-gold transition-colors">{t.nav.contact}</a>
            </nav>
            
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-gold px-4 py-3 text-sm font-bold text-gold-foreground shadow-gold"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{t.hero.cta1}</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
