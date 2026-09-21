import { useLang } from "@/i18n/LangContext";
import { Baby, Star, MessageCircle, Sparkles, Trophy, Palette, CheckCircle } from "lucide-react";
import kidsPoster from "@/assets/poster-kids-special.jpg";

export function KidsCourse() {
  const { t } = useLang();

  const kidsWhatsAppUrl = `https://wa.me/6393741504?text=${encodeURIComponent(
    "Assalamu Alaikum! I want to enroll my child (age 5-13) in the Online Kids Special Course at Madrasa E Gulaaman E Mustafa ﷺ.",
  )}`;

  return (
    <section id="kids" className="py-28 relative overflow-hidden bg-background">
      <div className="absolute inset-0 pattern-overlay opacity-25" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-soft border border-emerald-deep/15 px-4 py-1.5 mb-5 shadow-subtle">
              <Baby className="h-4 w-4 text-emerald-deep" />
              <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-emerald-deep">
                {t.kids.badge}
              </span>
            </div>

            {/* Section Title */}
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold mb-5 text-emerald-deep leading-tight">
              {t.kids.title1} <span className="text-gradient-gold">{t.kids.title2}</span>{" "}
              {t.kids.title3}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-foreground/75 mb-6 font-medium leading-relaxed">
              {t.kids.desc}
            </p>

            {/* Quick Tarbiyat & Gamification Highlights */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold">
                <Trophy className="h-3.5 w-3.5 text-amber-600" />
                <span>Weekly Quiz Prizes</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold">
                <Palette className="h-3.5 w-3.5 text-emerald-700" />
                <span>Drawing & Manners</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-900 border border-blue-200 px-3 py-1.5 rounded-xl text-xs font-bold">
                <CheckCircle className="h-3.5 w-3.5 text-blue-600" />
                <span>Basic Urdu & Arabic</span>
              </div>
            </div>

            {/* 10-Point Curriculum Grid */}
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {t.kids.points.map((point: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-emerald-deep/10 shadow-subtle hover:border-gold/40 transition-all"
                >
                  <div className="h-5 w-5 shrink-0 rounded-full bg-gradient-gold grid place-items-center mt-0.5 shadow-sm">
                    <Star className="h-3 w-3 text-gold-foreground fill-gold-foreground" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-emerald-deep/90">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <a
                href={kidsWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-light-sweep w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-emerald px-8 py-4 font-extrabold text-white shadow-luxe hover:scale-105 transition-all duration-300 group text-sm sm:text-base"
              >
                <MessageCircle className="h-5 w-5 text-gold" />
                <span>{t.kids.cta}</span>
              </a>
              <div className="text-xs sm:text-sm font-bold text-emerald-deep px-5 py-3 bg-emerald-soft rounded-2xl border border-emerald-deep/15 flex items-center gap-2 shadow-subtle">
                <Sparkles className="h-4 w-4 text-gold" />
                <span>{t.kids.duration}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Poster Card */}
          <div>
            <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-gold p-1.5 shadow-luxe gold-border-glow group">
              <img
                src={kidsPoster}
                alt="Online Kids Special Course - Ages 5 to 13"
                loading="lazy"
                className="w-full h-auto object-cover rounded-[2.2rem] group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
