import { useEffect, useState } from "react";
import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { X, MessageCircle } from "lucide-react";

export function AutoPopup() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("popupShown")) return;
    const id = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("popupShown", "1");
    }, 10000);
    return () => clearTimeout(id);
  }, []);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-emerald-deep/60 backdrop-blur-sm animate-fade-up">
      <div className="relative max-w-md w-full rounded-3xl bg-gradient-gold p-1 shadow-luxe">
        <div className="rounded-3xl bg-card p-7 relative overflow-hidden">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-muted grid place-items-center hover:bg-border"
            aria-label="close"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute inset-0 pattern-overlay pointer-events-none" />
          <div className="relative text-center">
            <div className="font-display text-2xl font-bold mb-2 text-gradient-gold">{t.popup.title}</div>
            <p className="text-sm text-muted-foreground mb-5">{t.popup.body}</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-emerald text-gold px-6 py-3 font-bold shadow-luxe hover:scale-[1.02] transition mb-2"
            >
              <MessageCircle className="h-4 w-4" />
              {t.popup.cta}
            </a>
            <button
              onClick={() => setOpen(false)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {t.popup.later}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
