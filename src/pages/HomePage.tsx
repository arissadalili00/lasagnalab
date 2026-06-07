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
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
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
