import { useLang } from "@/i18n/LangContext";
import { PlayCircle, Video } from "lucide-react";

export function Proof() {
  const { t } = useLang();
  return (
    <section className="py-28 bg-gradient-beige relative overflow-hidden">
      <div className="absolute inset-0 pattern-overlay opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-emerald-deep bg-emerald-soft px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4 border border-emerald-deep/15 shadow-subtle">
            <Video className="h-4 w-4 text-emerald-deep" />
            <span>{t.proof.kicker}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-deep mb-3 tracking-tight">
            {t.proof.title}
          </h2>
          <div className="h-1 w-16 bg-gradient-gold mx-auto rounded-full mt-3" />
        </div>

        {/* Video Player Card */}
        <div className="max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden shadow-luxe gold-border-glow bg-white p-2 sm:p-3">
          <div className="aspect-video rounded-[2rem] overflow-hidden bg-black/90 shadow-inner">
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
