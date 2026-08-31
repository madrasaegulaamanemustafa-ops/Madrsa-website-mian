import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { ImageIcon, MessageCircle } from "lucide-react";
import offer from "@/assets/poster-offer.png";
import muballiga from "@/assets/poster-muballiga.png";
import kids from "@/assets/poster-kids.png";
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
          {posters.map((p) => (
            <a
              key={p.label}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-3xl overflow-hidden bg-card gold-border shadow-soft hover:shadow-luxe transition-all duration-500 hover:-translate-y-1"
            >
              <div className="aspect-[3/4] overflow-hidden bg-emerald-deep/5">
                <img
                  src={p.src}
                  alt={p.label}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-emerald-deep via-emerald-deep/80 to-transparent">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-gold leading-tight">{p.label}</span>
                  <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-gradient-gold px-3 py-1.5 text-[11px] font-bold text-gold-foreground shadow-gold">
                    <MessageCircle className="h-3 w-3" />
                    Join
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
