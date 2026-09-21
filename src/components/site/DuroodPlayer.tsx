import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

export function DuroodPlayer() {
  const { dir } = useLang();
  const isRtl = dir === "rtl";
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio instance
    const audio = new Audio("/DUROOD SHARIF.mp3");
    audio.loop = true;
    audio.volume = 0.35; // Gentle background volume
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // If user previously manually paused during this session, don't force auto-play
    const isManuallyPaused = sessionStorage.getItem("durood_user_paused") === "true";

    if (!isManuallyPaused) {
      // First interaction triggers audio playback seamlessly across modern browsers
      const startAudio = () => {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            removeInteractionListeners();
          })
          .catch(() => {
            // Browser still blocked, keep listeners active for next gesture
          });
      };

      const interactionEvents = ["click", "touchstart", "keydown", "scroll"];

      const removeInteractionListeners = () => {
        interactionEvents.forEach((event) => {
          window.removeEventListener(event, startAudio);
        });
      };

      interactionEvents.forEach((event) => {
        window.addEventListener(event, startAudio, { once: true, passive: true });
      });

      return () => {
        removeInteractionListeners();
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.pause();
      };
    }

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      sessionStorage.setItem("durood_user_paused", "true");
    } else {
      audioRef.current.play().then(() => {
        sessionStorage.removeItem("durood_user_paused");
      });
    }
  };

  return (
    <div
      className={`fixed bottom-5 ${
        isRtl ? "right-5" : "left-5"
      } z-40 flex items-center gap-2 animate-fade-up`}
    >
      <button
        onClick={togglePlayback}
        type="button"
        title={isPlaying ? "Pause Durood Sharif ﷺ" : "Play Durood Sharif ﷺ"}
        aria-label={isPlaying ? "Pause Durood Sharif ﷺ" : "Play Durood Sharif ﷺ"}
        className="group relative inline-flex items-center gap-2.5 rounded-full bg-black/85 backdrop-blur-xl border border-amber-400/60 px-4 py-2 text-xs font-black text-amber-300 shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:scale-105 hover:bg-black hover:border-amber-300 transition-all duration-300 cursor-pointer"
      >
        {/* Pulsing Green/Gold Ambient Glow */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-500/30 to-emerald-500/30 blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />

        <span className="relative flex items-center gap-2">
          {isPlaying ? (
            <>
              {/* Animated Equalizer Waves */}
              <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                <span className="w-1 bg-amber-300 rounded-full animate-pulse h-3" />
                <span
                  className="w-1 bg-amber-400 rounded-full animate-pulse h-2"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="w-1 bg-amber-300 rounded-full animate-pulse h-3.5"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
              <span className="font-arabic text-sm text-amber-200">صَلَّى اللّٰهُ عَلَيْكَ</span>
              <span className="text-[11px] font-bold text-amber-300/90 tracking-wider">
                Durood Sharif ﷺ
              </span>
            </>
          ) : (
            <>
              <VolumeX className="h-3.5 w-3.5 text-amber-400/80" />
              <span className="text-[11px] font-bold text-amber-300/80 tracking-wider">
                Play Durood ﷺ
              </span>
            </>
          )}
        </span>
      </button>
    </div>
  );
}
