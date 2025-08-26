import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users } from "lucide-react";
import heroImage from "@/assets/hero-congregation.jpg";

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-secondary-deep/50 to-primary/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Main Heading */}
          <h1 className="hero-title text-white mb-6 leading-tight">
            Welcome Home to 
            <span className="block mt-2">Voice Angel Bride Tabernacle</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience God's love, grow in faith, and join our spiritual family. 
            We proclaim the original Apostolic faith and the end-time message of hope.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={() => scrollToSection("#contact")}
              className="btn-primary text-lg px-8 py-4 group"
            >
              Join Us This Sunday
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollToSection("#about")}
              variant="outline"
              className="text-white border-white/30 hover:bg-white hover:text-primary text-lg px-8 py-4 bg-white/10 backdrop-blur-sm"
            >
              Learn About Us
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <Heart className="w-8 h-8 text-white mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold text-lg mb-2">Welcoming Community</h3>
              <p className="text-white/80 text-sm">Experience genuine fellowship and spiritual growth in our loving church family.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <Users className="w-8 h-8 text-white mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold text-lg mb-2">Life-Changing Ministry</h3>
              <p className="text-white/80 text-sm">Discover the power of God's word through anointed teaching and ministry.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="w-8 h-8 bg-white rounded-full mb-4 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-primary font-bold text-sm">✝</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Apostolic Faith</h3>
              <p className="text-white/80 text-sm">Rooted in the original apostolic teachings and end-time revelations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce text-white/70">
          <div className="w-1 h-8 bg-white/30 rounded-full mx-auto mb-2"></div>
          <span className="text-sm">Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;