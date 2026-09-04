import { createFileRoute } from "@tanstack/react-router";
import { LangProvider } from "@/i18n/LangContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useLang } from "@/i18n/LangContext";
import { CheckCircle2, Video } from "lucide-react";
import { StickyCTA } from "@/components/site/StickyCTA";

export const Route = createFileRoute("/why-us")({
  head: () => ({
    meta: [
      { title: "Why Us? — Madrasa E Gulaaman E Mustafa ﷺ" }
    ]
  }),
  component: WhyUs,
});

function WhyUs() {
  return (
    <LangProvider>
      <Navbar />
      <main className="pt-32 pb-16 min-h-screen bg-background">
        <WhyUsContent />
      </main>
      <Footer />
      <StickyCTA />
    </LangProvider>
  );
}

function WhyUsContent() {
  const { t, isRtl } = useLang();
  
  // Use translations
  const whyData = t.why;
  
  const displayedFeatureIds = [1, 3, 4, 5, 7];
  
  return (
    <div className="container mx-auto px-4 max-w-6xl">
       {/* Hero for Why Us */}
       <div className="text-center mb-16 animate-fade-up">
          <div className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-emerald-deep border border-gold/30 font-bold mb-4 tracking-widest uppercase text-sm shadow-soft">
            {whyData.kicker}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-emerald-deep mb-6 leading-tight">
            {whyData.title}
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            {whyData.subtitle}
          </p>
       </div>
       
       <div className="space-y-24 mb-24">
         {/* Point 1: Live Classes with Video Placeholder */}
         <FeatureSection 
           point={whyData.items[0]} // Live Classes
           videoPlaceholder
           isReversed={false}
         />

         {/* Point 3: Digital Notes with Image */}
         <FeatureSection 
           point={whyData.items[2]} // Digital Notes
           image="/images/why-us/notes.jpg"
           imageAlt="Digital Notes"
           isReversed={true}
         />
         
         {/* Point 4: Weekly Tests with Image */}
         <FeatureSection 
           point={whyData.items[3]} // Weekly tests
           image="/images/why-us/weekly-tests.jpg"
           imageAlt="Weekly Tests"
           isReversed={false}
         />
         
         {/* Point 5: 15-Day Exams with Image */}
         <FeatureSection 
           point={whyData.items[4]} // 15 Day Exams
           image="/images/why-us/15-day-exams.jpg"
           imageAlt="15-Day Exams"
           isReversed={true}
         />
         
         {/* Point 7: Zayrik Live Classroom with Video Placeholder */}
         <FeatureSection 
           point={whyData.items[6]} // Zayrik Live Classroom
           videoPlaceholder
           isReversed={false}
         />
       </div>

       {/* Grid for the rest of the points */}
       <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-emerald-deep">{whyData.slogan}</h2>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {whyData.items.map((item) => {
             if (displayedFeatureIds.includes(item.id)) return null; 
             return (
               <div key={item.id} className="glass p-6 md:p-8 rounded-3xl border border-emerald-deep/10 shadow-soft hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
                 <div className="h-12 w-12 rounded-2xl bg-emerald-deep/5 flex items-center justify-center text-emerald-deep mb-5 group-hover:bg-emerald-deep group-hover:text-gold transition-colors">
                   <CheckCircle2 className="w-6 h-6" />
                 </div>
                 <h3 className="text-xl font-bold text-emerald-deep mb-3 group-hover:text-emerald-800 transition-colors">{item.title}</h3>
                 <p className="text-foreground/75 leading-relaxed">{item.desc}</p>
               </div>
             );
          })}
       </div>
    </div>
  );
}

function FeatureSection({ point, image, imageAlt, videoPlaceholder, isReversed }: { point: any, image?: string, imageAlt?: string, videoPlaceholder?: boolean, isReversed: boolean }) {
  const { isRtl, t } = useLang();
  
  // Convert generic category to localized category from translation
  const getCategory = (cat: string) => {
    if (cat === "safety") return t.why.categories.safety;
    if (cat === "tech") return t.why.categories.tech;
    return t.why.categories.exams;
  };

  return (
    <div className={`flex flex-col lg:flex-row gap-10 lg:gap-16 items-center animate-fade-up ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
       <div className="flex-1 w-full">
         <div className="glass-dark rounded-[2.5rem] p-3 shadow-2xl relative group overflow-hidden border border-gold/20">
           <div className="rounded-[2rem] overflow-hidden aspect-[4/3] sm:aspect-video relative bg-emerald-deep/5">
             {image ? (
               <img src={image} alt={imageAlt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             ) : videoPlaceholder ? (
               <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-emerald-deep/30 relative z-10">
                 <Video className="w-16 h-16 sm:w-24 sm:h-24 mb-2 opacity-50" />
                 <span className="font-bold text-lg sm:text-xl tracking-widest uppercase opacity-80">Video Coming Soon</span>
               </div>
             ) : null}
             
             {/* Actual video element placeholder (muted by default) */}
             {videoPlaceholder && (
               <video 
                 className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                 muted 
                 loop 
                 playsInline 
                 autoPlay
               >
                 {/* <source src="/actual-video.mp4" type="video/mp4" /> */}
               </video>
             )}
             
             {/* Gradient overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
           </div>
         </div>
       </div>
       <div className="flex-1 space-y-5 lg:px-6">
         <div className="inline-flex px-4 py-1.5 rounded-full bg-gold/15 text-emerald-deep font-bold text-sm border border-gold/30 shadow-soft">
           {getCategory(point.category)}
         </div>
         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-emerald-deep leading-tight">
           {point.title}
         </h2>
         <div className="w-16 h-1.5 bg-gradient-gold rounded-full"></div>
         <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed font-medium">
           {point.desc}
         </p>
       </div>
    </div>
  );
}
