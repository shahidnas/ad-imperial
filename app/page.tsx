import About from "@/src/components/About";
import Clients from "@/src/components/Clients";
import Contact from "@/src/components/Contact";
import FAQ from "@/src/components/FAQ";
import Hero from "@/src/components/Hero";
import OurWork from "@/src/components/OurWork";
import OurProcess from "@/src/components/Process";
import Services from "@/src/components/Services";
import StructuredData from "@/src/components/StructuredData";
import Testimonials from "@/src/components/Testimonials";
import WhyChooseUs from "@/src/components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <StructuredData />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <OurWork />
        <Clients />
        <WhyChooseUs />
        <OurProcess />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
    </>
  );
}
