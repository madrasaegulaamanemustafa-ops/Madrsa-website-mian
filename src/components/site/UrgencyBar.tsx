import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LangContext";
import { Sparkles } from "lucide-react";

export function UrgencyBar() {
  const { t } = useLang();
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % t.urgency.length), 3000);
    return () => clearInterval(id);
  }, [t.urgency.length]);

  return (
    <div className="bg-gradient-emerald text-gold relative overflow-hidden">
      <div className="absolute inset-0 pattern-overlay" />
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-3 relative">
        <Sparkles className="h-4 w-4 animate-pulse" />
        <span className="text-xs sm:text-sm font-semibold tracking-wide animate-fade-up" key={i}>
          {t.urgency[i]}
        </span>
        <Sparkles className="h-4 w-4 animate-pulse" />
      </div>
    </div>
  );
}
