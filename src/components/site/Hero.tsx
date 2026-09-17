import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import heroImg from "@/assets/hero-mosque.jpg";
import { Check, MessageCircle, GraduationCap, Sparkles, BookOpen, Star, ShieldCheck } from "lucide-react";

export function Hero() {
  const { t } = useLang();
  
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-glow/20 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/15 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Left Column: Content */}
        <div className="flex-1 text-center lg:text-left pt-10 lg:pt-0">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-deep/5 border border-emerald-deep/10 px-5 py-2 mb-8 animate-fade-up shadow-sm">
            <Sparkles className="h-4 w-4 text-emerald-deep" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-emerald-deep uppercase">
              {t.hero.badge}
            </span>
          </div>

          <h2 className="font-arabic text-3xl md:text-5xl text-gold mb-6 animate-fade-up drop-shadow-sm" dir="rtl" style={{ animationDelay: "0.1s" }}>
            السلام عليكم ورحمة الله
          </h2>

          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-emerald-deep leading-[1.1] mb-6 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t.hero.title.split(" ").slice(0, -3).join(" ")}<br />
            <span className="text-gradient-gold">{t.hero.title.split(" ").slice(-3).join(" ")}</span>
          </h1>

          <p
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto lg:mx-0 mb-10 animate-fade-up font-medium"
            style={{ animationDelay: "0.3s" }}
          >
            {t.hero.subtitle}
          </p>

          <div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-4 mb-6 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            {t.hero.trust.map((tr) => (
              <div key={tr} className="flex items-center gap-2 text-sm text-foreground/80 font-semibold bg-white/50 backdrop-blur-md px-4 py-2 rounded-xl border border-black/5 shadow-sm">
                <div className="h-6 w-6 rounded-full bg-emerald-deep/10 grid place-items-center">
                  <Check className="h-3.5 w-3.5 text-emerald-deep" />
                </div>
                <span>{tr}</span>
              </div>
            ))}
          </div>

          {/* Teacher Separation & Safety Highlight */}
          {t.hero.safetyNote && (
            <div
              className="bg-white/70 backdrop-blur-md border border-emerald-deep/15 rounded-2xl p-4 sm:p-5 mb-10 max-w-2xl mx-auto lg:mx-0 shadow-sm animate-fade-up text-left"
              style={{ animationDelay: "0.45s" }}
            >
              <div className="flex items-center gap-2 font-bold text-emerald-deep text-xs sm:text-sm uppercase tracking-wider mb-1.5">
                <ShieldCheck className="h-4.5 w-4.5 text-gold shrink-0" />
                <span>{t.hero.safetyTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-medium">
                {t.hero.safetyNote}
              </p>
            </div>
          )}

          <div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-emerald px-8 py-4 text-base font-bold text-white shadow-luxe hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <MessageCircle className="h-5 w-5" />
              {t.hero.cta1}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-emerald-deep/20 ring-offset-2 scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
            </a>
            
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-base font-bold text-emerald-deep border border-emerald-deep/10 shadow-soft hover:bg-emerald-deep/5 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <GraduationCap className="h-5 w-5" />
              {t.hero.cta2}
            </a>
          </div>
        </div>

        {/* Right Column: Visuals & Floating Cards */}
        <div className="flex-1 relative hidden lg:block w-full min-h-[600px] animate-fade-up" style={{ animationDelay: "0.6s" }}>
          
          {/* Main Visual Frame */}
          <div className="absolute inset-4 rounded-[2.5rem] bg-gradient-emerald p-1 overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700 ease-out">
            <div className="absolute inset-0 bg-[url('/src/assets/pattern.jpg')] bg-cover opacity-20 mix-blend-overlay"></div>
            <img src={heroImg} alt="Islamic Education" className="w-full h-full object-cover rounded-[2.2rem] opacity-90 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-deep/80 to-transparent"></div>
          </div>

          {/* Floating Card 1 */}
          <div className="absolute -left-8 top-1/4 bg-white/90 backdrop-blur-xl border border-white p-5 rounded-3xl shadow-xl animate-float flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-gold grid place-items-center text-white shrink-0 shadow-inner">
              <Star className="h-6 w-6 fill-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-deep/70 uppercase tracking-wider mb-1">Premium</div>
              <div className="font-display font-bold text-lg text-emerald-deep leading-none">Aalimiyat</div>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute -right-4 bottom-1/3 bg-white/90 backdrop-blur-xl border border-white p-5 rounded-3xl shadow-xl animate-float flex items-center gap-4" style={{ animationDelay: "2s" }}>
            <div className="h-12 w-12 rounded-2xl bg-gradient-emerald grid place-items-center text-white shrink-0 shadow-inner">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-deep/70 uppercase tracking-wider mb-1">12+ Courses</div>
              <div className="font-display font-bold text-lg text-emerald-deep leading-none">For ₹300/mo</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
