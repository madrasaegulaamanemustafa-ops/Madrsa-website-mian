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
        scrolled ? "py-3" : "py-6",
      )}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-700 relative z-50",
            "px-3.5 sm:px-6 md:px-8 py-2.5 sm:py-3",
            "rounded-full glass border border-white/50 shadow-soft",
            scrolled ? "bg-white/80 backdrop-blur-2xl" : "bg-white/50 backdrop-blur-md",
          )}
        >
          <a href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full grid place-items-center shrink-0 border border-gold/40 shadow-sm overflow-hidden bg-white transition-all duration-500 group-hover:scale-105 group-hover:shadow-gold group-hover:border-gold">
              <img
                src="/logo.png"
                alt="Madarsa Logo"
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <div className="flex flex-col justify-center max-w-[125px] min-[380px]:max-w-[165px] sm:max-w-none">
              <div className="font-display text-xs sm:text-sm md:text-base font-extrabold leading-tight text-emerald-deep tracking-tight group-hover:text-emerald-800 transition-colors line-clamp-1 sm:line-clamp-none">
                {t.brand}
              </div>
              <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-emerald-deep/60 mt-0.5 font-bold truncate">
                Online Islamic Institute
              </div>
            </div>
          </a>

          {/* Central Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full bg-emerald-deep/[0.04] border border-emerald-deep/[0.06]">
            <a
              href="/"
              className="px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-emerald-950/80 hover:text-emerald-deep hover:bg-white hover:shadow-xs transition-all duration-200"
            >
              {t.nav.home}
            </a>
            <Link
              to="/why-us"
              className="px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-emerald-950/80 hover:text-emerald-deep hover:bg-white hover:shadow-xs transition-all duration-200 flex items-center gap-1.5"
            >
              <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              <span>{t.nav.about}</span>
            </Link>
            <Link
              to="/results"
              className="px-3.5 py-1.5 rounded-full text-[13px] font-bold text-amber-900 bg-amber-400/15 hover:bg-amber-400/30 hover:text-amber-950 border border-amber-400/30 shadow-xs transition-all duration-200 flex items-center gap-1.5"
            >
              <span>🏆</span>
              <span>{t.nav.results}</span>
            </Link>
            <a
              href="/#offer"
              className="px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-emerald-950/80 hover:text-emerald-deep hover:bg-white hover:shadow-xs transition-all duration-200"
            >
              {t.nav.offer}
            </a>
            <a
              href="/#courses"
              className="px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-emerald-950/80 hover:text-emerald-deep hover:bg-white hover:shadow-xs transition-all duration-200"
            >
              {t.nav.courses}
            </a>
            <a
              href="/#posters"
              className="px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-emerald-950/80 hover:text-emerald-deep hover:bg-white hover:shadow-xs transition-all duration-200"
            >
              {t.nav.posters}
            </a>
            <a
              href="/#contact"
              className="px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-emerald-950/80 hover:text-emerald-deep hover:bg-white hover:shadow-xs transition-all duration-200"
            >
              {t.nav.contact}
            </a>
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Language Selector Pill */}
            <div className="flex items-center rounded-full bg-emerald-deep/[0.05] border border-emerald-deep/[0.08] p-1">
              <Globe className="hidden sm:block h-3.5 w-3.5 mx-1.5 text-emerald-deep/60" />
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={cn(
                    "px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer",
                    lang === l.code
                      ? "bg-white text-emerald-deep shadow-xs border border-emerald-deep/10 font-black"
                      : "text-emerald-deep/60 hover:text-emerald-deep hover:bg-white/60",
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-emerald px-4 py-2.5 text-xs md:text-sm font-bold text-white shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all duration-300 relative group overflow-hidden border border-emerald-400/20"
            >
              <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <MessageCircle className="h-4 w-4 relative z-10 text-gold" />
              <span className="relative z-10 font-bold tracking-tight">{t.hero.cta1}</span>
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2.5 rounded-full bg-emerald-deep/5 text-emerald-deep hover:bg-white hover:shadow-xs transition-all duration-300 cursor-pointer"
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
            open
              ? "top-[110%] opacity-100 p-5 mt-2"
              : "top-[80%] opacity-0 max-h-0 pointer-events-none",
          )}
        >
          <nav className="flex flex-col gap-2 text-base font-bold text-emerald-deep">
            <a
              onClick={() => setOpen(false)}
              href="/"
              className="py-3 px-4 rounded-xl hover:bg-emerald-deep/5 transition-colors"
            >
              {t.nav.home}
            </a>
            <Link
              onClick={() => setOpen(false)}
              to="/why-us"
              className="py-3 px-4 rounded-xl bg-gradient-emerald text-white flex items-center justify-between shadow-md transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-gold text-gold animate-pulse" />
                <span>{t.nav.about}</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full">
                New
              </span>
            </Link>
            <Link
              onClick={() => setOpen(false)}
              to="/results"
              className="py-3 px-4 rounded-xl bg-amber-400/20 text-amber-900 border border-amber-400/40 flex items-center justify-between shadow-sm transition-all duration-300"
            >
              <span>🏆 {t.nav.results}</span>
              <span className="text-[10px] uppercase font-black bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full">
                Top 5
              </span>
            </Link>
            <a
              onClick={() => setOpen(false)}
              href="/#offer"
              className="py-3 px-4 rounded-xl hover:bg-emerald-deep/5 transition-colors"
            >
              {t.nav.offer}
            </a>
            <a
              onClick={() => setOpen(false)}
              href="/#courses"
              className="py-3 px-4 rounded-xl hover:bg-emerald-deep/5 transition-colors"
            >
              {t.nav.courses}
            </a>
            <a
              onClick={() => setOpen(false)}
              href="/#posters"
              className="py-3 px-4 rounded-xl hover:bg-emerald-deep/5 transition-colors"
            >
              {t.nav.posters}
            </a>
            <a
              onClick={() => setOpen(false)}
              href="/#contact"
              className="py-3 px-4 rounded-xl hover:bg-emerald-deep/5 transition-colors"
            >
              {t.nav.contact}
            </a>
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
