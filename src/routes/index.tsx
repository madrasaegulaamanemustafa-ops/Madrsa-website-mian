import { createFileRoute } from "@tanstack/react-router";
import { LangProvider } from "@/i18n/LangContext";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Offer } from "@/components/site/Offer";
import { Courses } from "@/components/site/Courses";
import { Muballiga } from "@/components/site/Muballiga";
import { Why } from "@/components/site/Why";
import { Certification } from "@/components/site/Certification";
import { Proof } from "@/components/site/Proof";
import { Posters } from "@/components/site/Posters";
import { FreeCourse } from "@/components/site/FreeCourse";
import { Founder } from "@/components/site/Founder";
import { Footer } from "@/components/site/Footer";
import { StickyCTA } from "@/components/site/StickyCTA";
import { AutoPopup } from "@/components/site/AutoPopup";
import { KidsCourse } from "@/components/site/KidsCourse";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Madrasa E Gulaaman E Mustafa ﷺ — Online Islamic Institute | ₹300/month" },
      { name: "description", content: "Learn Deen online from anywhere. 9 Islamic & skill courses at just ₹300/month. Live + recorded classes, separate male/female sections, offline certificate." },
      { property: "og:title", content: "Madrasa E Gulaaman E Mustafa ﷺ — Learn Deen Online" },
      { property: "og:description", content: "9 Islamic courses for ₹300/month. Live + recorded classes. Worldwide access." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <Hero />
        <Offer />
        <Courses />
        <Why />
        <Muballiga />
        <KidsCourse />
        <Certification />
        <Proof />
        <Posters />
        <FreeCourse />
        <Founder />
      </main>
      <Footer />
      <StickyCTA />
      <AutoPopup />
    </LangProvider>
  );
}
