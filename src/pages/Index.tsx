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
import { ArrowUp, Megaphone } from "lucide-react";
import { useSiteData } from "@/lib/siteData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showTop, setShowTop] = useState(false);
  const { data } = useSiteData();
  const { specialAnnouncement } = data;
  const [announcementOpen, setAnnouncementOpen] = useState(false);

  useEffect(() => {
    if (specialAnnouncement.visible) {
      setAnnouncementOpen(true);
    } else {
      setAnnouncementOpen(false);
    }
  }, [specialAnnouncement.visible]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      <Hero />
      <Welcome />
      <Sermons />
      <About />
      <Events />
      <Ministries />
      <Donate />
      <Contact />
      <Footer />

      {/* Special Announcement Popup on Landing Page Load */}
      {specialAnnouncement.visible && (
        <Dialog open={announcementOpen} onOpenChange={setAnnouncementOpen}>
          <DialogContent className="w-[92vw] max-w-lg p-0 overflow-hidden border-primary/20 rounded-2xl">
            {specialAnnouncement.thumbnail && (
              <div className="relative h-44 sm:h-56 w-full bg-muted">
                <img
                  src={specialAnnouncement.thumbnail}
                  alt={specialAnnouncement.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            )}
            <div className="p-6">
              <DialogHeader className="mb-4">
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Megaphone className="w-5 h-5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Church Notice</span>
                </div>
                <DialogTitle className="text-2xl font-bold font-serif">
                  {specialAnnouncement.title}
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground pt-2 leading-relaxed">
                  {specialAnnouncement.description}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  className="btn-primary flex-1 py-2.5 text-base"
                  onClick={() => setAnnouncementOpen(false)}
                >
                  {specialAnnouncement.primaryButtonText || "Add to Calendar"}
                </Button>
                <Button
                  variant="outline"
                  className="btn-secondary flex-1 py-2.5 text-base"
                  onClick={() => setAnnouncementOpen(false)}
                >
                  {specialAnnouncement.secondaryButtonText || "Dismiss"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

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