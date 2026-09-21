import { useState, useEffect, useCallback, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LangProvider } from "@/i18n/LangContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useLang } from "@/i18n/LangContext";
import { Video, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { StickyCTA } from "@/components/site/StickyCTA";
import { DuroodPlayer } from "@/components/site/DuroodPlayer";

export const Route = createFileRoute("/why-us")({
  head: () => ({
    meta: [{ title: "Why Us? — Madrasa E Gulaaman E Mustafa ﷺ" }],
  }),
  component: WhyUs,
});

function WhyUs() {
  return (
    <LangProvider>
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen bg-[#FAF8F5]">
        <WhyUsContent />
      </main>
      <Footer />
      <StickyCTA />
      <DuroodPlayer />
    </LangProvider>
  );
}

// Custom media mapping for all 15 features
const featureMediaMap: Record<number, { type: "image" | "video"; src: string }> = {
  1: { type: "video", src: "/images/why-us/live_class.mp4" },
  2: { type: "video", src: "/images/why-us/class_recording.mp4" },
  3: { type: "image", src: "/images/why-us/notes.jpg" },
  4: { type: "image", src: "/images/why-us/weekly-tests.jpg" },
  5: { type: "image", src: "/images/why-us/15-day-exams.jpg" },
  6: { type: "video", src: "/images/why-us/ai_teacher.mp4" },
  7: { type: "image", src: "/images/why-us/zayrik_live_class.jpeg" },
  8: { type: "video", src: "/images/why-us/ai_sunni_teacher.mp4" },
  9: { type: "image", src: "/images/why-us/Ai_den_teacher.jpeg" },
  10: { type: "image", src: "/images/why-us/Game_based_learning.jpeg" },
  11: { type: "image", src: "/images/why-us/Monthly_Fatah-E-Battle.PNG" },
  12: { type: "image", src: "/images/why-us/Student_Progress_Tracking.jpeg" },
  13: { type: "image", src: "/images/why-us/certificate.jpeg" },
  14: { type: "image", src: "/images/why-us/it_support.jpeg" },
  15: { type: "image", src: "/images/why-us/chat.png" },
};

function WhyUsContent() {
  const { t, dir } = useLang();
  const isRtl = dir === "rtl";
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const whyData = t.why;
  const items = whyData.items;

  const handleOpenModal = (index: number) => {
    setActiveModalIndex(index);
  };

  const handleCloseModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setActiveModalIndex(null);
  };

  const handlePrev = useCallback(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setActiveModalIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : items.length - 1));
  }, [items.length]);

  const handleNext = useCallback(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setActiveModalIndex((prev) => (prev !== null && prev < items.length - 1 ? prev + 1 : 0));
  }, [items.length]);

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

  const currentItem = activeModalIndex !== null ? items[activeModalIndex] : null;
  const currentMedia = currentItem ? featureMediaMap[currentItem.id] : null;

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      {/* Hero for Why Us */}
      <div className="text-center mb-16 animate-fade-up">
        <div className="inline-block px-5 py-2 rounded-full bg-emerald-soft text-emerald-deep border border-emerald-deep/15 font-bold mb-4 tracking-widest uppercase text-xs shadow-subtle">
          {whyData.kicker}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display text-emerald-deep mb-6 leading-tight">
          {whyData.title}
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed font-medium">
          {whyData.subtitle}
        </p>
        <div className="h-1 w-24 bg-gradient-gold mx-auto rounded-full mt-6" />
      </div>

      <div className="space-y-16 md:space-y-24 mb-24">
        {items.map(
          (item: { id: number; title: string; desc: string; category: string }, index: number) => {
            const media = featureMediaMap[item.id];

            return (
              <FeatureSection
                key={item.id}
                point={item}
                media={media}
                imageAlt={item.title}
                isReversed={index % 2 !== 0}
                onMediaClick={() => handleOpenModal(index)}
              />
            );
          },
        )}
      </div>

      {/* Slogan */}
      <div className="text-center mb-12 animate-fade-up">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-emerald-deep">
          {whyData.slogan}
        </h2>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeModalIndex !== null && currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Feature: ${currentItem.title}`}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-6 animate-fade-in"
        >
          {/* Backdrop Layer */}
          <div
            className="absolute inset-0 bg-black/92 backdrop-blur-xl cursor-pointer"
            onClick={handleCloseModal}
          />

          {/* Top Bar */}
          <div className="relative w-full max-w-6xl flex items-center justify-between z-10 text-white pb-2">
            <div className="flex items-center gap-3">
              <span className="bg-gold/20 text-gold-light text-xs sm:text-sm font-bold px-3 py-1 rounded-full border border-gold/40">
                #{currentItem.id}
              </span>
              <h3 className="font-display font-bold text-lg sm:text-2xl text-white drop-shadow-md line-clamp-1">
                {currentItem.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm text-white/60 font-semibold">
                {activeModalIndex + 1} / {items.length}
              </span>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer hover:scale-110 shadow-md focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Main Media Center View */}
          <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-2 z-10">
            {/* Left Nav Button */}
            <button
              onClick={handlePrev}
              className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer hover:scale-110 shadow-2xl backdrop-blur-md focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="Previous feature"
            >
              <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>

            {/* Center Media */}
            <div className="max-h-[72vh] sm:max-h-[76vh] w-full flex items-center justify-center relative">
              {currentMedia?.type === "image" ? (
                <img
                  src={currentMedia.src}
                  alt={currentItem.title}
                  className="max-h-[72vh] sm:max-h-[76vh] max-w-full object-contain rounded-2xl shadow-2xl border border-gold/30 ring-1 ring-white/10"
                />
              ) : currentMedia?.type === "video" ? (
                <div className="relative max-h-[72vh] sm:max-h-[76vh] w-full max-w-4xl flex items-center justify-center">
                  <video
                    ref={modalVideoRef}
                    key={currentMedia.src}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    className="max-h-[72vh] sm:max-h-[76vh] w-full rounded-2xl shadow-2xl border border-gold/30 bg-black"
                  >
                    <source src={currentMedia.src} type="video/mp4" />
                    Your browser does not support HTML5 video playback.
                  </video>
                </div>
              ) : null}
            </div>

            {/* Right Nav Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer hover:scale-110 shadow-2xl backdrop-blur-md focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="Next feature"
            >
              <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>
          </div>

          {/* Bottom Bar / Description */}
          <div className="relative w-full max-w-3xl text-center bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-white/90 z-10 shadow-xl">
            <p className="text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mx-auto text-white/80">
              {currentItem.desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function FeatureSection({
  point,
  media,
  imageAlt,
  isReversed,
  onMediaClick,
}: {
  point: { id: number; title: string; desc: string; category: string };
  media?: { type: "image" | "video"; src: string };
  imageAlt?: string;
  isReversed: boolean;
  onMediaClick: () => void;
}) {
  const { t } = useLang();

  const getCategory = (cat: string) => {
    if (cat === "safety") return t.why.categories.safety;
    if (cat === "tech") return t.why.categories.tech;
    return t.why.categories.exams;
  };

  return (
    <div
      className={`flex flex-col lg:flex-row gap-10 lg:gap-16 items-center animate-fade-up ${isReversed ? "lg:flex-row-reverse" : ""}`}
    >
      <div className="flex-1 w-full">
        <div
          onClick={onMediaClick}
          className="rounded-3xl p-2.5 shadow-soft relative group overflow-hidden border border-emerald-deep/10 bg-white cursor-pointer hover:border-gold/60 transition-all duration-300 hover:shadow-luxe"
          title="Click to view full size"
        >
          <div className="rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-video relative bg-emerald-deep/5 flex items-center justify-center">
            {media?.type === "image" ? (
              <img
                src={media.src}
                alt={imageAlt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : media?.type === "video" ? (
              <div className="w-full h-full relative">
                <video
                  src={media.src}
                  playsInline
                  preload="none"
                  muted
                  className="w-full h-full object-cover rounded-2xl"
                />
                {/* Play Button Indicator Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-gold grid place-items-center shadow-gold group-hover:scale-110 transition-transform">
                    <Video className="h-8 w-8 sm:h-10 sm:w-10 text-gold-foreground ml-0.5" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-emerald-deep/30 relative z-10">
                <Video className="w-16 h-16 sm:w-24 sm:h-24 mb-2 opacity-50" />
                <span className="font-bold text-lg sm:text-xl tracking-widest uppercase opacity-80">
                  Media Coming Soon
                </span>
              </div>
            )}

            {/* Click to expand overlay button badge */}
            <div className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 text-white backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-white/20 shadow-lg opacity-80 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="h-3.5 w-3.5 text-gold" />
              <span className="hidden sm:inline">
                {media?.type === "video" ? "Watch Video" : "Click to Full View"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 lg:px-6">
        <div className="inline-flex px-4 py-1.5 rounded-full bg-emerald-soft text-emerald-deep font-extrabold text-xs uppercase tracking-wider border border-emerald-deep/10 shadow-subtle">
          {getCategory(point.category)}
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-emerald-deep leading-tight">
          {point.title}
        </h2>
        <div className="w-16 h-1 bg-gradient-gold rounded-full"></div>
        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-medium">
          {point.desc}
        </p>
      </div>
    </div>
  );
}
