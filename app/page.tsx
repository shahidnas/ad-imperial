import About from "@/src/components/About";
import Clients from "@/src/components/Clients";
import Contact from "@/src/components/Contact";
import FAQ from "@/src/components/FAQ";
import Hero from "@/src/components/Hero";
import OurWork from "@/src/components/OurWork";
import OurProcess from "@/src/components/Process";
import Services from "@/src/components/Services";
import WhyChooseUs from "@/src/components/WhyChooseUs";
import { buildMetadata } from "@/src/lib/seo";
import { siteConfig } from "@/src/lib/site";

export const metadata = buildMetadata({
  title: `Letter Board & Sign Board Manufacturer in Kolkata | ${siteConfig.name}`,
  absoluteTitle: true,
  description:
    "Custom letter boards, sign boards, LED letters and ACP signage — designed, made and installed by AD Imperial in Kolkata for West Bengal, Jharkhand and Bihar.",
  path: "/",
});

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Services />
      <OurWork />
      <Clients />
      <WhyChooseUs />
      <OurProcess />
      <FAQ />
      <Contact />
    </main>
  );
}
