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
  const { t } = useLang();
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
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeModalIndex, handlePrev, handleNext]);

  const currentPoster = activeModalIndex !== null ? posters[activeModalIndex] : null;

  return (
    <section id="posters" className="py-24 bg-gradient-beige relative overflow-hidden">
      <div className="absolute inset-0 pattern-overlay" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-emerald-deep text-xs uppercase tracking-[0.3em] mb-3">
            <ImageIcon className="h-3.5 w-3.5 text-gold" /> {t.posters.kicker}
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">{t.posters.title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t.posters.desc}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posters.map((p, index) => (
            <div
              key={p.label}
              className="group relative block rounded-3xl overflow-hidden bg-card gold-border shadow-soft hover:shadow-luxe transition-all duration-500 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleOpenModal(index)}
            >
              <div className="aspect-[3/4] overflow-hidden bg-emerald-deep/5 relative">
                <img
                  src={p.src}
                  alt={p.label}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Zoom overlay badge */}
                <div className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <Maximize2 className="h-4 w-4 text-gold" />
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-emerald-deep via-emerald-deep/85 to-transparent">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-gold leading-tight line-clamp-1">{p.label}</span>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-gradient-gold px-3.5 py-1.5 text-xs font-bold text-gold-foreground shadow-gold hover:scale-105 transition-transform"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Join
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Poster Lightbox Modal */}
      {activeModalIndex !== null && currentPoster && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-6 animate-fade-in">
          {/* Backdrop layer */}
          <div 
            className="absolute inset-0 bg-black/92 backdrop-blur-xl cursor-pointer"
            onClick={handleCloseModal}
          />

          {/* Top Bar */}
          <div className="relative w-full max-w-5xl flex items-center justify-between z-10 text-white pb-2">
            <div className="flex items-center gap-3">
              <span className="bg-gold/20 text-gold text-xs sm:text-sm font-bold px-3 py-1 rounded-full border border-gold/40">
                {activeModalIndex + 1} / {posters.length}
              </span>
              <h3 className="font-display font-bold text-lg sm:text-2xl text-white drop-shadow-md line-clamp-1">
                {currentPoster.label}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-gold text-gold-foreground px-4 py-1.5 text-xs sm:text-sm font-bold shadow-gold hover:scale-105 transition-transform"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Join Course</span>
              </a>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer hover:scale-110 shadow-md"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Center Image View */}
          <div className="relative w-full max-w-4xl flex-1 flex items-center justify-center my-2 z-10">
            {/* Left Nav Button */}
            <button
              onClick={handlePrev}
              className="absolute left-0 sm:-left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer hover:scale-110 shadow-2xl backdrop-blur-md"
              aria-label="Previous poster"
            >
              <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>

            {/* Poster Image */}
            <div className="max-h-[76vh] w-full flex items-center justify-center">
              <img
                src={currentPoster.src}
                alt={currentPoster.label}
                className="max-h-[76vh] max-w-full object-contain rounded-2xl shadow-2xl border border-gold/30 ring-1 ring-white/10"
              />
            </div>

            {/* Right Nav Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 sm:-right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer hover:scale-110 shadow-2xl backdrop-blur-md"
              aria-label="Next poster"
            >
              <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>
          </div>

          {/* Bottom Bar Caption */}
          <div className="relative w-full max-w-md text-center bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl py-2.5 px-4 text-white/90 z-10 shadow-xl">
            <span className="text-xs sm:text-sm font-semibold text-gold">
              {currentPoster.label}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
