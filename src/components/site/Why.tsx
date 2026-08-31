import { useState } from "react";
import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { 
  Star, 
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
  Sparkle
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<number, any> = {
  1: Video,           // Live Classes
  2: History,         // Class Recordings
  3: FileText,        // Digital Notes
  4: ClipboardCheck,  // Weekly Tests
  5: GraduationCap,   // 15-Day Exams
  6: Bot,             // AI 24/7 Learning Teacher
  7: Sparkles,        // Zayrik Version Live Class
  8: BookOpen,        // AI Sunni Teacher
  9: Award,           // AI D.E.N Teacher
  10: Gamepad2,       // Game-Based Learning
  11: Swords,         // Monthly Fatah-E-Battle
  12: TrendingUp,     // Student Progress Tracking
  13: Award,          // Certificates & Recognition
  14: Headphones,     // 24/7 IT Support
  15: ShieldCheck     // Private Student Chat
};

type CategoryKey = "safety" | "tech" | "exams";

export function Why() {
  const { t, dir } = useLang();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("safety");

  // Cast why translations to any to avoid TypeScript type assertion issues
  const whyData = t.why as any;

  const categoriesList: { key: CategoryKey; icon: any }[] = [
    { key: "safety", icon: ShieldCheck },
    { key: "tech", icon: Sparkles },
    { key: "exams", icon: GraduationCap },
  ];

  const filteredItems = whyData.items.filter(
    (item: any) => item.category === activeCategory
  );

  return (
    <section id="why" className="py-24 bg-gradient-beige relative overflow-hidden" dir={dir}>
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d4af37_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

      {/* Decorative Glow Blobs to highlight the section */}
      <div className="absolute top-12 left-1/10 w-72 h-72 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-1/10 w-96 h-96 bg-emerald-deep/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-emerald-deep text-xs font-bold uppercase tracking-[0.25em] mb-4 bg-emerald-deep/5 px-4 py-2 rounded-full border border-emerald-deep/10 shadow-sm animate-pulse">
            <Star className="h-4 w-4 text-gold fill-gold" /> 
            <span>{whyData.kicker}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-foreground leading-[1.15] tracking-tight">
            {whyData.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6 rounded-full" />
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {whyData.subtitle}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2.5 md:gap-4 max-w-4xl mx-auto mb-12">
          {categoriesList.map((cat) => {
            const CatIcon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "flex items-center gap-2.5 px-6 py-4 rounded-2xl text-sm md:text-base font-bold transition-all duration-300 border shadow-md cursor-pointer hover:scale-105 active:scale-95",
                  isActive
                    ? "bg-gradient-emerald text-gold border-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                    : "bg-card text-foreground hover:bg-emerald-deep/5 border-border hover:border-emerald-deep/20"
                )}
              >
                <CatIcon className={cn("h-5 w-5", isActive ? "text-gold animate-bounce" : "text-emerald-deep")} />
                <span>{whyData.categories[cat.key]}</span>
              </button>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16 min-h-[350px]">
          {filteredItems.map((item: any) => {
            const ItemIcon = iconMap[item.id] || Sparkle;
            return (
              <div
                key={item.id}
                className="group relative rounded-3xl bg-card p-7 md:p-8 border border-border/80 hover:border-gold/40 hover:shadow-luxe transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Glowing subtle hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-gold grid place-items-center mb-6 shadow-gold group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <ItemIcon className="h-6.5 w-6.5 text-gold-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 text-foreground group-hover:text-emerald-deep transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                
                {/* Visual indicator card */}
                <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-emerald-deep/80 relative">
                  <span className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-gold fill-gold" />
                    <span>Madarsa Feature</span>
                  </span>
                  <span className="bg-emerald-deep/5 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-deep">#{item.id}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA Box */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-emerald-deep to-[#0d2d1f] text-white p-8 md:p-14 text-center shadow-luxe border border-gold/40 relative overflow-hidden">
          {/* Internal Glow Effect */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-light/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h3 className="font-display text-3xl md:text-4xl font-extrabold mb-5 text-gold leading-tight">
              {whyData.slogan}
            </h3>
            <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">
              Yeh sirf ek online madrasa nahi, yeh Deeni Taleem, Technology aur Modern Learning ka ek mukammal nizam hai.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3.5 rounded-full bg-gradient-gold px-10 py-4.5 text-base md:text-lg font-bold text-gold-foreground shadow-gold hover:scale-105 transition-transform cursor-pointer hover:shadow-soft"
            >
              <MessageCircle className="h-6 w-6" />
              <span>{whyData.cta}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
