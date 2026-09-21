import { useState } from "react";
import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import {
  Video,
  History,
  FileText,
  ClipboardCheck,
  GraduationCap,
  Bot,
  Sparkles,
  BookOpen,
  Award,
  Gamepad2,
  Swords,
  TrendingUp,
  ShieldCheck,
  Headphones,
  MessageCircle,
  Sparkle,
  Star,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<number, LucideIcon> = {
  1: Video, // Live Classes
  2: History, // Class Recordings
  3: FileText, // Digital Notes
  4: ClipboardCheck, // Weekly Tests
  5: GraduationCap, // 15-Day Exams
  6: Bot, // AI 24/7 Learning Teacher
  7: Sparkles, // Zayrik Version Live Class
  8: BookOpen, // AI Sunni Teacher
  9: Award, // AI D.E.N Teacher
  10: Gamepad2, // Game-Based Learning
  11: Swords, // Monthly Fatah-E-Battle
  12: TrendingUp, // Student Progress Tracking
  13: Award, // Certificates & Recognition
  14: Headphones, // 24/7 IT Support
  15: ShieldCheck, // Private Student Chat
};

type CategoryKey = "safety" | "tech" | "exams";

interface WhyItem {
  id: number;
  title: string;
  desc: string;
  category: CategoryKey;
}

export function Why() {
  const { t, dir } = useLang();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("safety");

  const whyData = t.why as unknown as {
    kicker: string;
    title: string;
    subtitle: string;
    categories: Record<CategoryKey, string>;
    items: WhyItem[];
    cta: string;
    slogan?: string;
    cta_sub?: string;
  };

  const categoriesList: { key: CategoryKey; icon: LucideIcon }[] = [
    { key: "safety", icon: ShieldCheck },
    { key: "tech", icon: Sparkles },
    { key: "exams", icon: GraduationCap },
  ];

  const filteredItems = whyData.items.filter((item: WhyItem) => item.category === activeCategory);

  return (
    <section id="why" className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden" dir={dir}>
      {/* Background Islamic Geometric Pattern */}
      <div className="absolute inset-0 pattern-overlay opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-soft border border-emerald-deep/15 px-5 py-2 mb-4 shadow-subtle">
            <Sparkles
              className="h-4 w-4 text-amber-600 animate-spin"
              style={{ animationDuration: "6s" }}
            />
            <span className="text-xs font-extrabold tracking-[0.25em] uppercase text-emerald-deep">
              {whyData.kicker}
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-emerald-deep mb-5 tracking-tight leading-tight">
            {whyData.title}
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-medium">
            {whyData.subtitle}
          </p>
          <div className="h-1 w-24 bg-gradient-gold mx-auto rounded-full mt-6" />
        </div>

        {/* Category Pills Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto mb-14">
          {categoriesList.map((cat) => {
            const isActive = activeCategory === cat.key;
            const CatIcon = cat.icon;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-extrabold transition-all duration-300 shadow-subtle cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500",
                  isActive
                    ? "bg-emerald-deep text-white shadow-soft scale-105 border border-amber-400/40"
                    : "bg-white text-emerald-deep/80 hover:text-emerald-deep hover:bg-emerald-50/50 border border-emerald-deep/10",
                )}
              >
                <CatIcon
                  className={cn(
                    "h-5 w-5",
                    isActive ? "text-gold animate-bounce" : "text-emerald-deep",
                  )}
                />
                <span>{whyData.categories[cat.key]}</span>
              </button>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16 min-h-[350px]">
          {filteredItems.map((item: WhyItem) => {
            const ItemIcon = iconMap[item.id] || Sparkle;
            return (
              <div
                key={item.id}
                className="group relative rounded-3xl bg-white p-7 md:p-8 border border-emerald-deep/10 hover:border-gold/40 hover:shadow-luxe transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Glowing subtle hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-emerald grid place-items-center mb-6 shadow-soft group-hover:scale-105 transition-all duration-300">
                    <ItemIcon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 text-emerald-deep group-hover:text-emerald-deep transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-foreground/75 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                {/* Visual indicator card */}
                <div className="mt-5 pt-4 border-t border-emerald-deep/10 flex items-center justify-between text-xs font-semibold text-emerald-deep/80 relative">
                  <span className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-gold fill-gold" />
                    <span>Madrasa Feature</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                    100% Online
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <div className="text-center bg-white border border-emerald-deep/10 rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto shadow-soft animate-fade-up">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-emerald-deep mb-3">
            {whyData.cta}
          </h3>
          <p className="text-sm text-foreground/75 mb-6 max-w-md mx-auto font-medium leading-relaxed">
            {whyData.cta_sub || whyData.slogan || ""}
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-light-sweep inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-emerald text-white px-8 py-4 font-extrabold shadow-luxe hover:scale-105 transition-all duration-300 text-base focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <MessageCircle className="h-5 w-5 text-gold" />
            <span>Join Now on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
