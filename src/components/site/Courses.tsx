import { useState } from "react";
import { useLang } from "@/i18n/LangContext";
import {
  BookOpen,
  Clock,
  ArrowUpRight,
  BookMarked,
  IndianRupee,
  Sparkles,
  Users,
  ShieldCheck,
  Award,
} from "lucide-react";

type CategoryKey = "all" | "scholar" | "sisters" | "kids" | "quran" | "skills";

export function Courses() {
  const { t, lang, dir } = useLang();
  const isRtl = dir === "rtl";
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");

  const categories: {
    key: CategoryKey;
    labelEn: string;
    labelUr: string;
    labelHi: string;
    count: number;
  }[] = [
    {
      key: "all",
      labelEn: "All Courses",
      labelUr: "تمام کورسز",
      labelHi: "सभी कोर्सेज",
      count: 13,
    },
    {
      key: "scholar",
      labelEn: "Aalimiyat & Mufti",
      labelUr: "عالمیت و مفتی",
      labelHi: "आलिमियत व मुफ्ती",
      count: 2,
    },
    {
      key: "sisters",
      labelEn: "Sisters Special",
      labelUr: "خواتین کورسز",
      labelHi: "महिलाएं स्पेशल",
      count: 2,
    },
    {
      key: "kids",
      labelEn: "Kids & Deeniyat",
      labelUr: "بچوں کے کورسز",
      labelHi: "बच्चों के कोर्सेज",
      count: 2,
    },
    {
      key: "quran",
      labelEn: "Quran & Tajweed",
      labelUr: "قرآن و تجوید",
      labelHi: "कुरआन व तजवीद",
      count: 2,
    },
    {
      key: "skills",
      labelEn: "Language & Skills",
      labelUr: "زبان و مہارت",
      labelHi: "भाषा व स्किल",
      count: 5,
    },
  ];

  // Helper mapping course indices to categories
  const getCourseCategory = (index: number): CategoryKey[] => {
    switch (index) {
      case 0:
        return ["scholar"]; // Dars-e-Nizami
      case 1:
        return ["scholar", "sisters"]; // Muftiya
      case 2:
        return ["sisters"]; // Muballiga
      case 3:
        return ["skills"]; // Safar-e-Hajj
      case 4:
        return ["kids"]; // Online Kids
      case 5:
        return ["quran"]; // Tajweed
      case 6:
        return ["skills"]; // Urdu
      case 7:
        return ["kids", "skills"]; // Deeniyat
      case 8:
        return ["quran"]; // Qirat
      case 9:
        return ["skills"]; // English
      case 10:
        return ["skills"]; // Naat
      case 11:
        return ["scholar", "skills"]; // Khatme Nubuwwat
      case 12:
        return ["skills"]; // Constitution
      default:
        return ["skills"];
    }
  };

  const getBatchTiming = (index: number): string => {
    if (index === 0) return "Morning / Afternoon / Evening";
    if (index === 2) return "Flexible Female Batches";
    if (index === 4) return "Evening Batch (5-7 PM)";
    return "Daily Live + Recorded";
  };

  const filteredCourses = t.courses.list
    .map((c, i) => ({ ...c, originalIndex: i }))
    .filter((c) => {
      if (selectedCategory === "all") return true;
      const cats = getCourseCategory(c.originalIndex);
      return cats.includes(selectedCategory);
    });

  const getCategoryLabel = (cat: (typeof categories)[0]) => {
    if (lang === "ur") return cat.labelUr;
    if (lang === "hi") return cat.labelHi;
    return cat.labelEn;
  };

  return (
    <section id="courses" className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden">
      {/* Background Subtle Accents */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-glow/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 pattern-overlay opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-emerald-deep bg-emerald-soft px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4 border border-emerald-deep/15 shadow-subtle">
            <BookMarked className="h-3.5 w-3.5 text-emerald-deep" />
            <span>{t.courses.kicker}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-emerald-deep mb-4 tracking-tight">
            {t.courses.title}
          </h2>
          <div className="h-1 w-24 bg-gradient-gold mx-auto rounded-full mt-4" />
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap max-w-4xl mx-auto mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-subtle focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isActive
                    ? "bg-emerald-deep text-white shadow-soft scale-105 border border-amber-400/40"
                    : "bg-white text-emerald-deep/80 hover:text-emerald-deep hover:bg-emerald-50/50 border border-emerald-deep/10 hover:border-gold/30"
                }`}
              >
                {isActive && (
                  <Sparkles
                    className="h-3.5 w-3.5 text-gold animate-spin"
                    style={{ animationDuration: "6s" }}
                  />
                )}
                <span>{getCategoryLabel(cat)}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? "bg-gold text-gold-foreground font-black" : "bg-emerald-soft text-emerald-deep"}`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Course Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredCourses.map((c) => {
            const timing = getBatchTiming(c.originalIndex);
            const courseWhatsAppUrl = `https://wa.me/6393741504?text=${encodeURIComponent(
              `Assalamu Alaikum! I want to enroll in the "${c.name}" course at Madrasa E Gulaaman E Mustafa ﷺ.`,
            )}`;

            return (
              <div
                key={c.name}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-emerald-deep/10 p-6 sm:p-7 shadow-soft hover:shadow-luxe hover:border-gold/50 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Subtle top gold glow on hover */}
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gold/15 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />

                <div>
                  {/* Card Top Row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-emerald grid place-items-center shadow-soft group-hover:scale-105 transition-transform duration-300">
                      <BookOpen className="h-5 w-5 text-gold" />
                    </div>
                    <span className="text-[11px] font-extrabold text-emerald-deep/70 bg-emerald-soft px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-deep/10 flex items-center gap-1.5">
                      <Award className="h-3 w-3 text-emerald-deep" />
                      Course {String(c.originalIndex + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Course Title & Description */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-emerald-deep mb-2.5 leading-snug">
                    {c.name}
                  </h3>
                  <p className="text-sm text-foreground/75 leading-relaxed mb-5 font-medium">
                    {c.desc}
                  </p>
                </div>

                <div>
                  {/* Batch Timing Pill */}
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-deep bg-emerald-soft/80 px-3 py-1 rounded-lg border border-emerald-deep/10">
                      <Users className="h-3 w-3 text-emerald-deep" />
                      <span>{timing}</span>
                    </span>
                  </div>

                  {/* Meta Pills (Duration & Fee) */}
                  <div className="flex items-center gap-2 text-xs mb-5 flex-wrap">
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
                    href={courseWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full pt-4 border-t border-emerald-deep/10 text-sm font-extrabold text-emerald-deep group-hover:text-amber-700 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 rounded-b-xl"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-gold" />
                      {t.courses.cta}
                    </span>
                    <div className="h-8 w-8 rounded-full bg-emerald-soft group-hover:bg-amber-100 grid place-items-center transition-colors">
                      <ArrowUpRight
                        className={`h-4 w-4 transition-transform group-hover:scale-110 ${isRtl ? "rotate-90" : ""}`}
                      />
                    </div>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-white p-5 sm:p-6 border border-emerald-deep/15 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-emerald grid place-items-center shrink-0 text-gold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-emerald-deep">
                Want to join multiple courses?
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                All 9 core courses are included in the single ₹300/month fee with no extra charges!
              </div>
            </div>
          </div>
          <a
            href="https://wa.me/6393741504?text=Assalamu%20Alaikum!%20I%20want%20to%20ask%20about%20joining%20multiple%20courses%20for%20Rs%20300."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-deep text-white text-xs font-bold hover:bg-emerald-900 transition-colors shrink-0 shadow-sm focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            Consult on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
