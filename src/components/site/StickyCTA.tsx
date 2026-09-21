import { useState } from "react";
import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { MessageCircle, GraduationCap, Sparkles, X, Baby, Heart, BookOpen } from "lucide-react";

export function StickyCTA() {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const quickLinks = [
    {
      title: "Kids Special (5-13 Yrs)",
      icon: Baby,
      text: "Assalamu Alaikum! I want to enroll my child in the Online Kids Special Course.",
      badge: "Fast Reply",
    },
    {
      title: "Sisters Batch (Muballiga)",
      icon: Heart,
      text: "Assalamu Alaikum! I am inquiring about the female-only Muballiga / Aalima course.",
      badge: "Female Staff",
    },
    {
      title: "Dars-e-Nizami (Aalimiyat)",
      icon: BookOpen,
      text: "Assalamu Alaikum! I want to apply for the Dars-e-Nizami Aalimiyat Course.",
      badge: "₹300/mo",
    },
  ];

  return (
    <>
      {/* Floating Speed-Dial Menu */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {menuOpen && (
          <div className="mb-4 w-72 rounded-3xl bg-white/95 backdrop-blur-2xl border border-emerald-deep/15 p-4 shadow-2xl animate-fade-up">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-deep/10 mb-2">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#25D366] animate-ping" />
                <span className="text-xs font-bold text-emerald-deep">Online Admission Desk</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-emerald-deep/60 hover:text-emerald-deep p-1 rounded-full hover:bg-black/5"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              {quickLinks.map((item, idx) => {
                const Icon = item.icon;
                const linkUrl = `https://wa.me/6393741504?text=${encodeURIComponent(item.text)}`;
                return (
                  <a
                    key={idx}
                    href={linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-emerald-soft hover:bg-emerald-100/80 border border-emerald-deep/10 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-xl bg-gradient-emerald grid place-items-center text-gold shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-emerald-deep">{item.title}</span>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-deep/60 uppercase">
                      {item.badge}
                    </span>
                  </a>
                );
              })}
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block w-full text-center py-2.5 rounded-xl bg-gradient-gold text-gold-foreground text-xs font-extrabold shadow-sm hover:scale-[1.02] transition-transform"
            >
              General WhatsApp Inquiry →
            </a>
          </div>
        )}

        {/* Main Floating WhatsApp Bubble */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open WhatsApp Admission Options"
          className="h-14 w-14 rounded-full bg-[#25D366] grid place-items-center shadow-gold animate-pulse-glow hover:scale-110 transition-all duration-300 relative group cursor-pointer"
        >
          <div className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
          {menuOpen ? (
            <X className="h-6 w-6 text-white relative z-10" />
          ) : (
            <MessageCircle className="h-7 w-7 text-white relative z-10" fill="white" />
          )}
        </button>
      </div>

      {/* Floating Left Quick Apply Badge */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-3 text-xs sm:text-sm font-extrabold text-gold-foreground shadow-gold hover:scale-105 transition-all duration-300 border border-gold/40"
      >
        <GraduationCap className="h-4 w-4" />
        <span>{t.floating}</span>
        <Sparkles className="h-3.5 w-3.5" />
      </a>
    </>
  );
}
