import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechHighlights from "@/components/TechHighlights";
import Products from "@/components/Products";
import Scenarios from "@/components/Scenarios";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechHighlights />
        <Products />
        <Scenarios />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
