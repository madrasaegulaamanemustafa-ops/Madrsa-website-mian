import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import madinahBg from "@/assets/madinah-hero-bg.jpg";
import heroImg from "@/assets/hero-mosque.jpg";
import {
  Check,
  MessageCircle,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Users,
  Award,
  Star,
} from "lucide-react";

export function Hero() {
  const { t, dir } = useLang();
  const isRtl = dir === "rtl";

  return (
    <section
      id="top"
      className="relative min-h-[94vh] flex items-center pt-28 pb-14 sm:pt-32 sm:pb-20 overflow-hidden bg-[#041d15]"
    >
      {/* Background Video Layer (Madinah Munawwarah - Silent Pure Video) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={madinahBg}
          className="w-full h-full object-cover object-[center_35%] opacity-85"
        >
          <source src="/images/why-us/home.mp4" type="video/mp4" />
        </video>
        {/* Soft Contrast Gradient Mask for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        {/* Left Column: Content */}
        <div className="flex-1 text-center lg:text-start pt-2 lg:pt-0">
          {/* Top Badge with Shimmer */}
          <div className="inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/80 px-4 sm:px-5 py-1.5 sm:py-2 mb-4 sm:mb-6 animate-fade-up shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            <Sparkles
              className="h-4 w-4 text-amber-300 animate-spin"
              style={{ animationDuration: "8s" }}
            />
            <span className="text-[11px] sm:text-xs font-black tracking-widest text-amber-300 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {t.hero.badge}
            </span>
          </div>

          {/* Sacred Salam Greeting */}
          <div className="mb-4 sm:mb-5 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <h2
              lang="ar"
              dir="rtl"
              className="font-arabic text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-amber-400 drop-shadow-[0_2px_12px_rgba(212,175,55,0.5)] tracking-wide leading-relaxed sm:leading-loose py-1"
            >
              اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
            </h2>
          </div>

          {/* Main Title */}
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.12] mb-4 sm:mb-6 tracking-tight animate-fade-up drop-shadow-sm"
            style={{ animationDelay: "0.2s" }}
          >
            {t.hero.title.split(" ").slice(0, -3).join(" ")}{" "}
            <span className="text-gradient-gold-bright block sm:inline">
              {t.hero.title.split(" ").slice(-3).join(" ")}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 animate-fade-up font-medium leading-relaxed drop-shadow"
            style={{ animationDelay: "0.3s" }}
          >
            {t.hero.subtitle}
          </p>

          {/* Trust Badges */}
          <div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-6 sm:mb-8 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            {t.hero.trust.map((tr) => (
              <div
                key={tr}
                className="flex items-center gap-2 text-xs sm:text-sm text-white font-bold bg-black/40 backdrop-blur-xl px-3.5 py-1.5 sm:py-2 rounded-xl border border-white/20 shadow-sm hover:border-gold/50 hover:bg-black/60 transition-all duration-300"
              >
                <div className="h-5 w-5 rounded-full bg-gradient-gold grid place-items-center shrink-0 shadow-sm">
                  <Check className="h-3 w-3 text-gold-foreground stroke-[3]" />
                </div>
                <span>{tr}</span>
              </div>
            ))}
          </div>

          {/* Teacher Separation & Privacy Highlight */}
          {t.hero.safetyNote && (
            <div
              className="bg-black/55 backdrop-blur-xl border border-amber-400/40 rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 shadow-luxe text-start gold-border-glow"
              style={{ animationDelay: "0.45s" }}
            >
              <div className="flex items-center gap-2 font-bold text-amber-300 text-xs sm:text-sm uppercase tracking-wider mb-2">
                <div className="h-6 w-6 rounded-lg bg-amber-400/20 grid place-items-center">
                  <ShieldCheck className="h-4 w-4 text-amber-300 shrink-0" />
                </div>
                <span>{t.hero.safetyTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                {t.hero.safetyNote}
              </p>
            </div>
          )}

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-light-sweep group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-gold px-8 py-3.5 sm:py-4 text-sm sm:text-base font-black text-gold-foreground shadow-gold hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            >
              <MessageCircle className="h-5 w-5 fill-gold-foreground" />
              <span>{t.hero.cta1}</span>
            </a>

            <a
              href="#courses"
              className="inline-flex items-center gap-3 rounded-2xl bg-white/15 backdrop-blur-xl px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white border border-white/30 shadow-soft hover:border-amber-400/70 hover:bg-white/25 transition-all duration-300 w-full sm:w-auto justify-center focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            >
              <BookOpen className="h-5 w-5 text-amber-300" />
              <span>{t.hero.cta2}</span>
            </a>
          </div>
        </div>

        {/* Right Column: 3D Islamic Arch Visual Frame & Floating Badges */}
        <div
          className="flex-1 relative hidden lg:block w-full min-h-[560px] animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          {/* Main Visual Frame with Islamic Arch Top */}
          <div className="relative mx-auto max-w-[460px] rounded-3xl bg-gradient-gold p-1.5 shadow-luxe transform rotate-1 hover:rotate-0 transition-transform duration-700 ease-out">
            <div className="relative rounded-[1.4rem] overflow-hidden bg-black/40">
              <img
                src={heroImg}
                alt="Madrasa E Gulaaman E Mustafa Live Online Education"
                className="w-full h-[500px] object-cover opacity-95 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute bottom-6 inset-x-6 text-white text-center">
                <div className="font-display text-2xl font-bold text-gold-light mb-1">
                  Madrasa E Gulaaman E Mustafa ﷺ
                </div>
                <div className="text-xs text-white/90 font-semibold uppercase tracking-widest flex items-center justify-center gap-2">
                  <Award className="h-3.5 w-3.5 text-gold" />
                  <span>ISO & Offline Certified Institute</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Card 1: Live Batch */}
          <div
            className={`absolute ${isRtl ? "-right-6" : "-left-6"} top-1/5 bg-white/95 backdrop-blur-2xl border border-emerald-deep/10 p-4 sm:p-5 rounded-2xl shadow-soft animate-float-slow flex items-center gap-4`}
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-gold grid place-items-center text-white shrink-0 shadow-gold">
              <Star className="h-6 w-6 fill-white text-white" />
            </div>
            <div>
              <div className="text-[11px] font-extrabold text-emerald-deep/70 uppercase tracking-wider mb-0.5">
                Live Online Batch
              </div>
              <div className="font-display font-extrabold text-lg text-emerald-deep leading-none">
                Dars-e-Nizami
              </div>
            </div>
          </div>

          {/* Floating Card 2: 9 Courses Flat Fee */}
          <div
            className={`absolute ${isRtl ? "-left-4" : "-right-4"} bottom-1/4 bg-white/95 backdrop-blur-2xl border border-emerald-deep/10 p-4 sm:p-5 rounded-2xl shadow-soft animate-float-slow flex items-center gap-4`}
            style={{ animationDelay: "3s" }}
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-emerald grid place-items-center text-gold shrink-0 shadow-sm">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[11px] font-extrabold text-emerald-deep/70 uppercase tracking-wider mb-0.5">
                Mega Offer
              </div>
              <div className="font-display font-extrabold text-lg text-emerald-deep leading-none">
                ₹300 / Month
              </div>
            </div>
          </div>

          {/* Floating Card 3: 5000+ Students Worldwide */}
          <div className="absolute left-1/4 -bottom-4 bg-black/80 backdrop-blur-2xl border border-gold/40 px-5 py-3 rounded-2xl shadow-gold flex items-center gap-3">
            <Users className="h-5 w-5 text-gold-light" />
            <div className="text-xs font-bold text-white">
              <span className="text-gold-light font-extrabold">5,000+</span> Students Enrolled
              Worldwide
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
