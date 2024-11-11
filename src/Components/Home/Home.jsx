import { Helmet } from "react-helmet-async";
import HeroSection from "./HeroSection";
import ServicesCarousel from "./ServicesCarousel";
import FeatureSection from "./FeatureSection";
import Testimonial from "./Testimonial";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <Helmet>
        <title> خدمة | الرئيسية</title>
      </Helmet>
      <div className="sticky top-20">
        <HeroSection />
      </div>
      <div className="relative bg-white pb-4">
        <ServicesCarousel />
        <FeatureSection />
        <Testimonial />
      </div>
    </>
  );
}
