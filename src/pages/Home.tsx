import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Emergency from "../components/Emergency";
import Method from "../components/Method";
import Realisations from "../components/Realisations";
import CTA from "../components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Emergency />
      <Method />
      <Realisations />
      <CTA />
    </>
  );
}
