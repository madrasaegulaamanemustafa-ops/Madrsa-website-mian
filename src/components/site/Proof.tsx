import { useLang } from "@/i18n/LangContext";
import { PlayCircle } from "lucide-react";

export function Proof() {
  const { t } = useLang();
  return (
    <section className="py-24 bg-gradient-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-emerald-deep text-xs uppercase tracking-[0.3em] mb-3">
            <PlayCircle className="h-3.5 w-3.5 text-gold" /> {t.proof.kicker}
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold">{t.proof.title}</h2>
        </div>
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-luxe gold-border bg-card p-2">
          <div className="aspect-video rounded-2xl overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/AkWQDvhTKy4"
              title="Madrasa Student Results"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
