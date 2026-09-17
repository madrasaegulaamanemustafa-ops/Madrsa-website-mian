import { useLang, WHATSAPP_URL } from "@/i18n/LangContext";
import { Award, Crown, CheckCircle2, ShieldCheck, Sparkles, MessageCircle } from "lucide-react";

export function Certification() {
  const { t } = useLang();
  return (
    <section className="py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-gradient-emerald p-1.5 sm:p-2 shadow-luxe gold-border-glow">
          <div className="rounded-[2.2rem] bg-white p-8 sm:p-12 md:p-14 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
            
            <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center relative">
              
              {/* Left Column: Details */}
              <div>
                <div className="inline-flex items-center gap-2 text-emerald-deep bg-emerald-soft px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4 border border-emerald-deep/15 shadow-subtle">
                  <Award className="h-4 w-4 text-gold fill-gold" />
                  <span>Official Recognition</span>
                </div>
                
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-deep mb-5 tracking-tight leading-tight">
                  {t.cert.title}
                </h2>
                
                <p className="text-base sm:text-lg text-foreground/75 leading-relaxed font-medium mb-8">
                  {t.cert.desc}
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Verified Madrasa Offline Hardcopy Certificate",
                    "Sent directly by post/courier to your home",
                    "Official Sanad & Dastar-e-Fazilat upon completion",
                    "Valid for teaching & institution verification"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-emerald-soft grid place-items-center shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-emerald-deep" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-emerald-deep/90">{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-emerald px-7 py-3.5 font-bold text-white shadow-luxe hover:scale-105 transition-all duration-300 text-sm"
                >
                  <MessageCircle className="h-4 w-4 text-gold" />
                  <span>Inquire About Certification</span>
                </a>
              </div>

              {/* Right Column: Diploma Mockup */}
              <div className="relative">
                <div className="relative rounded-3xl bg-gradient-hero p-8 sm:p-10 text-center text-white border-2 border-amber-400/40 shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 pattern-overlay opacity-25" />
                  
                  {/* Outer Certificate Frame */}
                  <div className="relative z-10 border border-amber-300/30 rounded-2xl p-6 sm:p-8 bg-black/20 backdrop-blur-sm">
                    <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-gold grid place-items-center shadow-gold">
                      <Crown className="h-8 w-8 text-gold-foreground fill-gold-foreground" />
                    </div>
                    
                    <div className="font-display text-2xl sm:text-3xl font-bold text-gold-light mb-1">
                      Sanad-e-Fazilat
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.25em] text-amber-200/80 font-bold mb-4">
                      Certificate of Excellence
                    </div>
                    
                    <div className="h-0.5 w-24 bg-gradient-gold mx-auto mb-4" />
                    
                    <p className="text-xs text-white/80 font-medium leading-relaxed mb-6">
                      Madrasa E Gulaaman E Mustafa ﷺ confirms genuine completion of authentic Islamic curriculum under verified Sunni scholars.
                    </p>

                    <div className="inline-flex items-center gap-2 bg-gold/20 text-gold-light border border-gold/40 rounded-full px-4 py-1.5 text-xs font-bold">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Awarded with Official Dastar</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
