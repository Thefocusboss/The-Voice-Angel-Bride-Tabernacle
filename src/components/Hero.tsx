import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 sm:pt-24 md:pt-28">
      {/* Background Video & Overlay */}
      <div className="absolute inset-0 z-0">        
        <video
          className="w-full h-full object-cover"
          src="/Hero-flow.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <img
          src="/hero-overlay.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-45 pointer-events-none"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <div className="animate-fade-in">
          {/* Church Logo with Soft Glow */}
          <div className="relative inline-flex items-center justify-center mb-3 sm:mb-4">
            <div
              aria-hidden="true"
              className="absolute inset-0 -inset-x-6 -inset-y-3 rounded-full bg-gradient-to-r from-primary-glow/45 via-white/35 to-secondary/40 blur-2xl sm:blur-3xl pointer-events-none"
            />
            <img
              src="/Logo.png"
              alt="Voice Angel Bride Tabernacle Logo"
              className="relative z-10 h-28 sm:h-36 md:h-44 lg:h-52 max-w-[90vw] w-auto object-contain mx-auto drop-shadow-[0_0_24px_rgba(255,220,130,0.5)]"
            />
          </div>

          {/* Main Heading */}
          <h1 className="hero-title mb-4 sm:mb-6 leading-tight">
             Welcome Home to 
             <span className="block mt-2">Voice Angel Bride Tabernacle</span>
           </h1>
          
          {/* Subtitle */}
          <p className="text-base sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience God's love, grow in faith, and join our spiritual family. 
            We proclaim the original Apostolic faith and the end-time message of hope.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-10 sm:mb-12 max-w-md sm:max-w-none mx-auto">
            <Button
              onClick={() => { window.location.href = 'https://youtube.com/@voiceangelbridetabernacle?si=X-IuqzggU7nnvv2p'; }}
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto group"
            >
              Join Us This Sunday
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollToSection("#about")}
              variant="outline"
              className="text-white border-white/30 hover:bg-white hover:text-primary text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto bg-white/10 backdrop-blur-sm"
            >
              Learn About Us
            </Button>
          </div>

          {/* Feature Card - Welcome Committee Brief with video popup */}
          <div className="max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <Heart className="w-8 h-8 text-white mb-3 sm:mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold text-lg mb-2">Welcome Committee Brief</h3>
              <p className="text-white/80 text-sm">Watch a short welcome brief from our committee.</p>
              <div className="mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="btn-secondary">View</Button>
                  </DialogTrigger>
                  <DialogContent className="w-[94vw] max-w-3xl p-0 overflow-hidden rounded-xl">
                    <DialogHeader className="p-4 pb-2">
                      <DialogTitle>Welcome Committee Brief</DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video w-full">
                      <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/5CJS7QGtbok?autoplay=1&rel=0&modestbranding=1"
                        title="Welcome Committee Brief"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden sm:block absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce text-white/70">
          <div className="w-1 h-8 bg-white/30 rounded-full mx-auto mb-2"></div>
          <span className="text-sm">Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;