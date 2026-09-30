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

// Brand + broad "signage company" intent. The narrower searches each have
// their own page: "sign board manufacturer in Kolkata" → the Kolkata location
// page, "letter board" → /services/letter-board.
export const metadata = buildMetadata({
  title: `Signage Company in Kolkata | ${siteConfig.name}`,
  absoluteTitle: true,
  description:
    "AD Imperial is a Kolkata signage company designing, fabricating and installing sign boards, LED letters and ACP signage across West Bengal, Jharkhand and Bihar.",
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
