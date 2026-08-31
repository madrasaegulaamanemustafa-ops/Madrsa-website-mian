import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { MessageCircle, GraduationCap } from "lucide-react";

export function StickyCTA() {
  const { t } = useLang();
  return (
    <>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#25D366] grid place-items-center shadow-gold animate-pulse-glow hover:scale-110 transition-transform"
      >
        <MessageCircle className="h-7 w-7 text-white" fill="white" />
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-3 text-sm font-bold text-gold-foreground shadow-gold hover:scale-105 transition-transform"
      >
        <GraduationCap className="h-4 w-4" />
        {t.floating}
      </a>
    </>
  );
}
