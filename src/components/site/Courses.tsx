import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { BookOpen, Clock, ArrowUpRight, BookMarked, IndianRupee } from "lucide-react";

export function Courses() {
  const { t } = useLang();
  return (
    <section id="courses" className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-emerald-deep text-xs uppercase tracking-[0.3em] mb-3">
            <BookMarked className="h-3.5 w-3.5" /> {t.courses.kicker}
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold">{t.courses.title}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {t.courses.list.map((c, i) => (
            <div
              key={c.name}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 hover:shadow-luxe transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-gold opacity-0 group-hover:opacity-20 blur-3xl transition" />
              <div className="flex items-start justify-between mb-5">
                <div className="h-12 w-12 rounded-xl bg-gradient-emerald grid place-items-center shadow-soft">
                  <BookOpen className="h-5 w-5 text-gold" />
                </div>
                <span className="text-[10px] font-bold text-gold-foreground/60 uppercase tracking-wider">
                  Course {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2 leading-tight">{c.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.desc}</p>
              <div className="flex items-center gap-3 text-xs mb-5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-deep/10 text-emerald-deep font-semibold">
                  <Clock className="h-3 w-3" />
                  {c.duration}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-gold text-gold-foreground font-bold">
                  <IndianRupee className="h-3 w-3" />
                  {c.fee.replace("₹", "")}
                </span>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-deep group-hover:text-gold transition-colors"
              >
                {t.courses.cta}
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
