import { useEffect, useState } from "react";
import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { X, MessageCircle, Sparkles } from "lucide-react";

export function AutoPopup() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("popupShown")) return;
    const id = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("popupShown", "1");
    }, 12000);
    return () => clearTimeout(id);
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Special Admission Offer"
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60 backdrop-blur-md animate-fade-up"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative max-w-md w-full rounded-3xl bg-gradient-gold p-1 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-[1.4rem] bg-white p-7 relative overflow-hidden text-center">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-emerald-soft grid place-items-center hover:bg-emerald-100 text-emerald-deep transition-colors focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="absolute inset-0 pattern-overlay opacity-20 pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-emerald-deep text-[11px] font-extrabold uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>Limited Admission Batch</span>
            </div>

            <h3 className="font-display text-2xl font-bold mb-2 text-emerald-deep">
              {t.popup.title}
            </h3>

            <p className="text-sm text-foreground/75 mb-6 font-medium leading-relaxed">
              {t.popup.body}
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-emerald text-white px-6 py-3.5 font-bold shadow-soft hover:scale-[1.02] transition mb-3 focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <MessageCircle className="h-4 w-4 text-gold" />
              <span>{t.popup.cta}</span>
            </a>

            <button
              onClick={() => setOpen(false)}
              className="text-xs text-muted-foreground hover:text-emerald-deep font-semibold"
            >
              {t.popup.later}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
