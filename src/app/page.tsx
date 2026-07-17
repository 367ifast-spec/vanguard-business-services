import WhatsAppButton from "../../components/WhatsAppButton";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Trusted from "../../components/Trusted";
import About from "../../components/About";
import Services from "../../components/Services";
import WhyChooseUs from "../../components/WhyChooseUs";
import Stats from "../../components/Stats";
import Testimonials from "../../components/Testimonials";
import FAQ from "../../components/FAQ";
import CTA from "../../components/CTA";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import BackToTop from "../../components/BackToTop";
import LatestArticles from "@/components/LatestArticles";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Trusted />
      <About />
      <Stats />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />

      <LatestArticles />

      <CTA />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}