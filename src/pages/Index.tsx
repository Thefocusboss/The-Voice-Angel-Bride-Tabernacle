import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Sermons from "@/components/Sermons";
import Events from "@/components/Events";
import Ministries from "@/components/Ministries";
import Donate from "@/components/Donate";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Sermons />
      <Events />
      <Ministries />
      <Donate />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
