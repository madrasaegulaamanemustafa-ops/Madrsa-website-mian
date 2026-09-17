import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import heroImg from "@/assets/hero-mosque.jpg";
import { Check, MessageCircle, GraduationCap, Sparkles, BookOpen, Star, ShieldCheck } from "lucide-react";

export function Hero() {
  const { t } = useLang();
  
  return (
    <section id="top" className="relative min-h-[92vh] flex items-center pt-32 pb-20 overflow-hidden bg-background">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-0 w-[700px] h-[700px] bg-emerald-glow/15 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 -left-20 w-[550px] h-[550px] bg-gold/15 blur-[130px] rounded-full" />
        <div className="absolute inset-0 pattern-overlay opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-14">
        
        {/* Left Column: Content */}
        <div className="flex-1 text-center lg:text-left pt-6 lg:pt-0">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-soft border border-emerald-deep/15 px-5 py-2 mb-6 animate-fade-up shadow-subtle">
            <Sparkles className="h-4 w-4 text-emerald-deep animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-xs sm:text-sm font-extrabold tracking-widest text-emerald-deep uppercase">
              {t.hero.badge}
            </span>
          </div>

          {/* Salam Greeting */}
          <div className="mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="font-arabic text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold drop-shadow-sm tracking-wide" dir="rtl">
              اَلسَلامُ عَلَيْكُم وَرَحْمَةُ اَللهِ وَبَرَكاتُه
            </h2>
          </div>

          {/* Main Title */}
          <h1
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-emerald-deep leading-[1.12] mb-6 tracking-tight animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t.hero.title.split(" ").slice(0, -3).join(" ")}<br />
            <span className="text-gradient-gold">{t.hero.title.split(" ").slice(-3).join(" ")}</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg md:text-xl text-foreground/75 max-w-2xl mx-auto lg:mx-0 mb-8 animate-fade-up font-medium leading-relaxed"
            style={{ animationDelay: "0.3s" }}
          >
            {t.hero.subtitle}
          </p>

          {/* Trust Badges */}
          <div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mb-8 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            {t.hero.trust.map((tr) => (
              <div 
                key={tr} 
                className="flex items-center gap-2 text-xs sm:text-sm text-foreground/85 font-bold bg-white/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-emerald-deep/10 shadow-subtle hover:border-gold/40 hover:shadow-soft transition-all duration-300"
              >
                <div className="h-5 w-5 rounded-full bg-gradient-emerald grid place-items-center shrink-0 shadow-sm">
                  <Check className="h-3 w-3 text-gold" />
                </div>
                <span>{tr}</span>
              </div>
            ))}
          </div>

          {/* Teacher Separation & Safety Highlight */}
          {t.hero.safetyNote && (
            <div
              className="bg-white/90 backdrop-blur-xl border border-emerald-deep/15 rounded-2xl p-4 sm:p-5 mb-8 max-w-2xl mx-auto lg:mx-0 shadow-soft hover:shadow-luxe transition-all duration-300 text-left gold-border-glow"
              style={{ animationDelay: "0.45s" }}
            >
              <div className="flex items-center gap-2 font-bold text-emerald-deep text-xs sm:text-sm uppercase tracking-wider mb-2">
                <div className="h-6 w-6 rounded-lg bg-gold/20 grid place-items-center">
                  <ShieldCheck className="h-4 w-4 text-emerald-deep shrink-0" />
                </div>
                <span>{t.hero.safetyTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-medium">
                {t.hero.safetyNote}
              </p>
            </div>
          )}

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-emerald px-8 py-4 text-base font-bold text-white shadow-luxe hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <MessageCircle className="h-5 w-5 text-gold" />
              <span>{t.hero.cta1}</span>
            </a>
            
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-base font-bold text-emerald-deep border border-emerald-deep/15 shadow-soft hover:border-gold/50 hover:bg-emerald-soft/50 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <GraduationCap className="h-5 w-5 text-emerald-deep" />
              <span>{t.hero.cta2}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Visuals & Floating Cards */}
        <div className="flex-1 relative hidden lg:block w-full min-h-[560px] animate-fade-up" style={{ animationDelay: "0.6s" }}>
          
          {/* Main Visual Frame */}
          <div className="relative mx-auto max-w-[460px] rounded-[2.5rem] bg-gradient-emerald p-1.5 shadow-luxe transform rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
            <div className="relative rounded-[2.2rem] overflow-hidden bg-emerald-deep/90">
              <img 
                src={heroImg} 
                alt="Islamic Education" 
                className="w-full h-[500px] object-cover opacity-85 hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/90 via-emerald-deep/30 to-transparent" />
              
              <div className="absolute bottom-6 inset-x-6 text-white text-center">
                <div className="font-display text-2xl font-bold text-gold-light mb-1">
                  Madrasa E Gulaaman E Mustafa ﷺ
                </div>
                <div className="text-xs text-white/80 font-medium uppercase tracking-widest">
                  Live & Recorded Online Islamic Classes
                </div>
              </div>
            </div>
          </div>

          {/* Floating Card 1: Premium Aalimiyat */}
          <div className="absolute -left-4 top-1/4 bg-white/95 backdrop-blur-2xl border border-emerald-deep/10 p-4 sm:p-5 rounded-3xl shadow-soft animate-float flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-gold grid place-items-center text-white shrink-0 shadow-gold">
              <Star className="h-6 w-6 fill-white text-white" />
            </div>
            <div>
              <div className="text-[11px] font-extrabold text-emerald-deep/70 uppercase tracking-wider mb-0.5">Live Batch</div>
              <div className="font-display font-extrabold text-lg text-emerald-deep leading-none">Dars-e-Nizami</div>
            </div>
          </div>

          {/* Floating Card 2: 12+ Courses Flat Fee */}
          <div className="absolute -right-2 bottom-1/4 bg-white/95 backdrop-blur-2xl border border-emerald-deep/10 p-4 sm:p-5 rounded-3xl shadow-soft animate-float flex items-center gap-4" style={{ animationDelay: "2.5s" }}>
            <div className="h-12 w-12 rounded-2xl bg-gradient-emerald grid place-items-center text-gold shrink-0 shadow-sm">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[11px] font-extrabold text-emerald-deep/70 uppercase tracking-wider mb-0.5">Mega Offer</div>
              <div className="font-display font-extrabold text-lg text-emerald-deep leading-none">₹300 / Month</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
