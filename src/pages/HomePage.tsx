import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/home/Hero";
import { TrustMarquee, PromoBanner } from "../components/home/TrustMarquee";
import { FeaturedMenu } from "../components/home/FeaturedMenu";
import { WhyChooseUs } from "../components/home/WhyChooseUs";
import { Statistics } from "../components/home/Statistics";
import { Testimonials } from "../components/home/Testimonials";
import { About } from "../components/home/About";
import { Contact } from "../components/home/Contact";

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const timer = window.setTimeout(() => {
      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
    return () => window.clearTimeout(timer);
  }, [location]);

  return (
    <>
      <Hero />
      <TrustMarquee />
      <FeaturedMenu />
      <WhyChooseUs />
      <Statistics />
      <Testimonials />
      <About />
      <PromoBanner />
      <Contact />
    </>
  );
}
