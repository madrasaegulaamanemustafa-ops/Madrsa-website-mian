import { useState, useEffect, useCallback } from "react";
import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { ImageIcon, MessageCircle, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import offer from "@/assets/poster-offer.png";
import muballiga from "@/assets/poster-muballiga.png";
import kids from "@/assets/poster-kids.png";
import kidsSpecial from "@/assets/poster-kids-special.jpg";
import hajj from "@/assets/poster-hajj.png";
import dars from "@/assets/poster-darsenizami.png";
import muftiya from "@/assets/poster-muftiya.png";
import urdu from "@/assets/poster-urdu.png";

import darsEnglish from "@/assets/poster-dars-english.jpg";
import allCourses from "@/assets/poster-all-courses.jpg";
import dars300 from "@/assets/poster-dars-300.jpg";
import nazra from "@/assets/poster-nazra.jpg";

const posters = [
  { src: offer, label: "₹300 Big Offer — All 9 Courses" },
  { src: kids, label: "Online Kids Special Course" },
  { src: kidsSpecial, label: "Kids Special Course Flyer" },
  { src: dars300, label: "Dars-e-Nizami (₹300/mo)" },
  { src: darsEnglish, label: "Aalima Course (English)" },
  { src: allCourses, label: "All 22 Courses List" },
  { src: nazra, label: "Nazra Qur'an & Hifz" },
  { src: dars, label: "Dars-e-Nizami • Full Aalimiyat" },
  { src: muftiya, label: "Muftiya & Mufti Course" },
  { src: muballiga, label: "Muballiga Course (Females)" },
  { src: hajj, label: "Safar-e-Hajj & Umrah" },
  { src: urdu, label: "Urdu Reading & Writing" },
];

export function Posters() {
  const { t, dir } = useLang();
  const isRtl = dir === "rtl";
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const handleOpenModal = (index: number) => {
    setActiveModalIndex(index);
  };

  const handleCloseModal = () => {
    setActiveModalIndex(null);
  };

  const handlePrev = useCallback(() => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : posters.length - 1));
  }, [activeModalIndex]);

  const handleNext = useCallback(() => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) => (prev !== null && prev < posters.length - 1 ? prev + 1 : 0));
  }, [activeModalIndex]);

  // Keyboard navigation for modal
  useEffect(() => {
    if (activeModalIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseModal();
      if (e.key === "ArrowLeft") {
        if (isRtl) handleNext();
        else handlePrev();
      }
      if (e.key === "ArrowRight") {
        if (isRtl) handlePrev();
        else handleNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeModalIndex, handlePrev, handleNext, isRtl]);

  const currentPoster = activeModalIndex !== null ? posters[activeModalIndex] : null;

  return (
    <section id="posters" className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden">
      <div className="absolute inset-0 pattern-overlay opacity-20 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-emerald-deep bg-emerald-soft px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4 border border-emerald-deep/15 shadow-subtle">
            <ImageIcon className="h-3.5 w-3.5 text-amber-600" />
            <span>{t.posters.kicker}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-emerald-deep mb-3 tracking-tight">
            {t.posters.title}
          </h2>
          <p className="text-foreground/75 max-w-xl mx-auto text-sm sm:text-base font-medium leading-relaxed">
            {t.posters.desc}
          </p>
          <div className="h-1 w-20 bg-gradient-gold mx-auto rounded-full mt-4" />
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posters.map((p, index) => (
            <div
              key={p.label}
              className="group relative block rounded-3xl overflow-hidden bg-white border border-emerald-deep/10 shadow-soft hover:shadow-luxe transition-all duration-500 hover:-translate-y-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500"
              onClick={() => handleOpenModal(index)}
              tabIndex={0}
              role="button"
              aria-label={`View flyer for ${p.label}`}
              onKeyDown={(e) => e.key === "Enter" && handleOpenModal(index)}
            >
              <div className="aspect-[3/4] overflow-hidden bg-emerald-deep/5 relative">
                <img
                  src={p.src}
                  alt={p.label}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Hover Overlay with Zoom Icon */}
                <div className="absolute inset-0 bg-emerald-deep/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white">
                  <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md grid place-items-center border border-white/40 shadow-soft">
                    <Maximize2 className="h-5 w-5 text-white" />
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                  <div className="font-bold text-sm leading-tight drop-shadow-sm line-clamp-1">
                    {p.label}
                  </div>
                  <div className="text-[11px] text-gold-light mt-0.5 font-semibold">
                    Click to preview flyer
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeModalIndex !== null && currentPoster && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Flyer preview"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
              onClick={handleCloseModal}
            />

            {/* Modal Container */}
            <div className="relative z-10 max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-gold/30">
              {/* Top Bar */}
              <div className="flex items-center justify-between p-4 border-b border-emerald-deep/10 bg-[#FAF8F5]">
                <div className="font-display font-bold text-base sm:text-lg text-emerald-deep line-clamp-1">
                  {currentPoster.label}
                </div>
                <button
                  onClick={handleCloseModal}
                  aria-label="Close preview"
                  className="h-10 w-10 rounded-full bg-black/5 hover:bg-black/10 grid place-items-center text-emerald-deep transition-colors focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Image Display */}
              <div className="relative max-h-[70vh] overflow-auto p-2 bg-black/5 flex items-center justify-center">
                <img
                  src={currentPoster.src}
                  alt={currentPoster.label}
                  className="max-h-[65vh] w-auto object-contain rounded-2xl"
                />

                {/* Left/Right Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label="Previous flyer"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 shadow-luxe hover:bg-white text-emerald-deep grid place-items-center transition-all focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Next flyer"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 shadow-luxe hover:bg-white text-emerald-deep grid place-items-center transition-all focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Bottom WhatsApp CTA */}
              <div className="p-4 bg-[#FAF8F5] border-t border-emerald-deep/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground font-semibold">
                  Flyer {activeModalIndex + 1} of {posters.length}
                </span>
                <a
                  href={`https://wa.me/6393741504?text=${encodeURIComponent(
                    `Assalamu Alaikum! I am inquiring about the "${currentPoster.label}" flyer details.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-emerald text-white px-5 py-2.5 text-xs font-bold shadow-soft hover:scale-105 transition-all w-full sm:w-auto justify-center"
                >
                  <MessageCircle className="h-4 w-4 text-gold" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
