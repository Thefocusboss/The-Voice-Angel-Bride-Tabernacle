import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import About from "@/components/About";
import Sermons from "@/components/Sermons";
import Events from "@/components/Events";
import Ministries from "@/components/Ministries";
import Donate from "@/components/Donate";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const Index = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Welcome />
      <About />
      <Sermons />
      <Events />
      <Ministries />
      <Donate />
      <Contact />
      <Footer />

      {showTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 rounded-full p-3 bg-primary text-primary-foreground shadow-lg hover:bg-primary-glow transition-colors"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Index;