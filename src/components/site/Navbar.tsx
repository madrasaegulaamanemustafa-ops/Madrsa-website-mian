import { useState, useEffect } from "react";
import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import type { Lang } from "@/i18n/translations";
import { Menu, X, Globe, MessageCircle, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
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
        "fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-out",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-700 relative z-50",
            "px-4 md:px-8 py-3",
            "rounded-full glass border border-white/40 shadow-soft",
            scrolled ? "bg-white/70 backdrop-blur-2xl" : "bg-white/40 backdrop-blur-md"
          )}
        >
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 rounded-full grid place-items-center shrink-0 border border-gold/30 shadow-sm overflow-hidden bg-white transition-all duration-500 group-hover:scale-105 group-hover:shadow-gold group-hover:border-gold">
              <img 
                src="/logo.png" 
                alt="Madarsa Logo" 
                className="w-full h-full object-cover scale-110" 
              />
            </div>
            <div className="hidden xs:block">
              <div className="font-display text-sm md:text-base font-extrabold leading-tight text-emerald-deep tracking-tight">
                {t.brand}
              </div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-emerald-deep/60 mt-0.5 font-bold">
                Online Islamic Institute
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-full bg-black/5">
            <a href="/" className="px-4 py-2 rounded-full text-sm font-semibold text-emerald-deep hover:bg-white hover:shadow-sm transition-all duration-300">{t.nav.home}</a>
            <Link 
              to="/why-us" 
              className="px-4 py-2 rounded-full text-sm font-bold bg-emerald-deep text-white shadow-md flex items-center gap-2 hover:bg-emerald-900 hover:scale-105 transition-all duration-300"
            >
              <Star className="h-3.5 w-3.5 fill-gold text-gold animate-pulse" />
              <span>{t.nav.about}</span>
            </Link>
            <a href="/#offer" className="px-4 py-2 rounded-full text-sm font-semibold text-emerald-deep hover:bg-white hover:shadow-sm transition-all duration-300">{t.nav.offer}</a>
            <a href="/#courses" className="px-4 py-2 rounded-full text-sm font-semibold text-emerald-deep hover:bg-white hover:shadow-sm transition-all duration-300">{t.nav.courses}</a>
            <a href="/#posters" className="px-4 py-2 rounded-full text-sm font-semibold text-emerald-deep hover:bg-white hover:shadow-sm transition-all duration-300">{t.nav.posters}</a>
            <a href="/#contact" className="px-4 py-2 rounded-full text-sm font-semibold text-emerald-deep hover:bg-white hover:shadow-sm transition-all duration-300">{t.nav.contact}</a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            {/* Language Selector Pill */}
            <div className="flex items-center gap-1 rounded-full bg-black/5 p-1">
              <Globe className="hidden sm:block h-4 w-4 ml-2 text-emerald-deep/70" />
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-300",
                    lang === l.code
                      ? "bg-white text-emerald-deep shadow-sm"
                      : "text-emerald-deep/60 hover:text-emerald-deep hover:bg-white/50"
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
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-emerald px-5 py-2.5 text-sm font-bold text-white shadow-luxe hover:scale-105 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <MessageCircle className="h-4 w-4 relative z-10" />
              <span className="relative z-10">{t.hero.cta1}</span>
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2.5 rounded-full bg-black/5 text-emerald-deep hover:bg-white hover:shadow-sm transition-all duration-300"
              aria-label="menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden absolute left-4 right-4 transition-all duration-500 ease-out overflow-hidden z-40 rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/50 shadow-2xl",
            open ? "top-[110%] opacity-100 p-5 mt-2" : "top-[80%] opacity-0 max-h-0 pointer-events-none"
          )}
        >
          <nav className="flex flex-col gap-2 text-base font-bold text-emerald-deep">
            <a onClick={() => setOpen(false)} href="/" className="py-3 px-4 rounded-xl hover:bg-emerald-deep/5 transition-colors">{t.nav.home}</a>
            <Link 
              onClick={() => setOpen(false)} 
              to="/why-us" 
              className="py-3 px-4 rounded-xl bg-gradient-emerald text-white flex items-center justify-between shadow-md transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-gold text-gold animate-pulse" />
                <span>{t.nav.about}</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full">New</span>
            </Link>
            <a onClick={() => setOpen(false)} href="/#offer" className="py-3 px-4 rounded-xl hover:bg-emerald-deep/5 transition-colors">{t.nav.offer}</a>
            <a onClick={() => setOpen(false)} href="/#courses" className="py-3 px-4 rounded-xl hover:bg-emerald-deep/5 transition-colors">{t.nav.courses}</a>
            <a onClick={() => setOpen(false)} href="/#posters" className="py-3 px-4 rounded-xl hover:bg-emerald-deep/5 transition-colors">{t.nav.posters}</a>
            <a onClick={() => setOpen(false)} href="/#contact" className="py-3 px-4 rounded-xl hover:bg-emerald-deep/5 transition-colors">{t.nav.contact}</a>
          </nav>
          
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-emerald px-4 py-4 text-sm font-bold text-white shadow-luxe"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{t.hero.cta1}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
