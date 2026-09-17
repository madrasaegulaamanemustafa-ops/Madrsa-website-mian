import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { BookOpen, Clock, ArrowUpRight, BookMarked, IndianRupee, Sparkles } from "lucide-react";

export function Courses() {
  const { t } = useLang();
  return (
    <section id="courses" className="py-28 bg-background relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-glow/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-emerald-deep bg-emerald-soft px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4 border border-emerald-deep/15 shadow-subtle">
            <BookMarked className="h-3.5 w-3.5 text-emerald-deep" />
            <span>{t.courses.kicker}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-emerald-deep mb-3 tracking-tight">
            {t.courses.title}
          </h2>
          <div className="h-1 w-20 bg-gradient-gold mx-auto rounded-full mt-3" />
        </div>

        {/* Course Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {t.courses.list.map((c, i) => (
            <div
              key={c.name}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-emerald-deep/10 p-6 sm:p-7 shadow-subtle hover:shadow-luxe hover:border-gold/50 transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Subtle top glow on hover */}
              <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-gold/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
              
              <div>
                {/* Card Top Row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-emerald grid place-items-center shadow-soft group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-5 w-5 text-gold" />
                  </div>
                  <span className="text-[11px] font-extrabold text-emerald-deep/60 bg-emerald-soft px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-deep/10">
                    Course {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Course Title & Description */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-emerald-deep mb-2.5 leading-snug group-hover:text-emerald-deep transition-colors">
                  {c.name}
                </h3>
                <p className="text-sm text-foreground/75 leading-relaxed mb-6 font-medium">
                  {c.desc}
                </p>
              </div>

              <div>
                {/* Meta Pills (Duration & Fee) */}
                <div className="flex items-center gap-2.5 text-xs mb-6 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-soft text-emerald-deep font-bold border border-emerald-deep/10">
                    <Clock className="h-3.5 w-3.5 text-emerald-deep" />
                    <span>{c.duration}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-gold text-gold-foreground font-extrabold shadow-sm">
                    <IndianRupee className="h-3.5 w-3.5 text-gold-foreground" />
                    <span>{c.fee.replace("₹", "")}</span>
                  </span>
                </div>

                {/* WhatsApp Enroll Action */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-emerald-deep/10 text-sm font-extrabold text-emerald-deep group-hover:text-amber-700 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-gold" />
                    {t.courses.cta}
                  </span>
                  <div className="h-7 w-7 rounded-full bg-emerald-soft group-hover:bg-amber-100 grid place-items-center transition-colors">
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
