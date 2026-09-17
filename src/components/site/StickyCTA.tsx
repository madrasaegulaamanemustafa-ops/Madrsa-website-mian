import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { MessageCircle, GraduationCap, Sparkles } from "lucide-react";

export function StickyCTA() {
  const { t } = useLang();
  return (
    <>
      {/* Floating WhatsApp Action Button with Pulsing Ring */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Admission Chat"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#25D366] grid place-items-center shadow-gold animate-pulse-glow hover:scale-110 transition-all duration-300 group"
      >
        <div className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
        <MessageCircle className="h-7 w-7 text-white relative z-10" fill="white" />
      </a>

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
