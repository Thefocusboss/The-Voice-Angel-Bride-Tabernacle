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
import { shareWithThumbnail } from "@/lib/share";
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
    const hash = window.location.hash;
    const params = new URLSearchParams(window.location.search);
    const shareType = params.get("type");
    const isDirectSectionLink = Boolean(hash && hash !== "#home") || Boolean(shareType);

    if (specialAnnouncement.visible && !isDirectSectionLink) {
      setAnnouncementOpen(true);
    } else {
      setAnnouncementOpen(false);
    }
  }, [specialAnnouncement.visible]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shareType = params.get("type");
    let targetId = window.location.hash ? window.location.hash.slice(1) : "";

    if (!targetId && shareType) {
      const typeMap: Record<string, string> = {
        post: "daily-devotion-post",
        tonic: "play-from-telegram",
        sermon: "sermons",
        event: "events",
      };
      targetId = typeMap[shareType] || "";
    }

    if (!targetId) return;

    const scrollToTarget = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const t1 = window.setTimeout(scrollToTarget, 150);
    const t2 = window.setTimeout(scrollToTarget, 600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

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
          <DialogContent className="w-[92vw] max-w-lg max-h-[88dvh] flex flex-col gap-0 p-0 overflow-hidden border-primary/20 rounded-2xl [&>button]:bg-background/85 [&>button]:backdrop-blur-sm [&>button]:rounded-full [&>button]:p-1.5 [&>button]:text-foreground [&>button]:opacity-100 [&>button]:shadow-sm">
            {/* Scrollable Body (Thumbnail + Text) */}
            <div className="overflow-y-auto flex-1 overscroll-contain">
              {specialAnnouncement.thumbnail && (
                <div className="relative h-40 sm:h-52 w-full bg-muted flex-shrink-0">
                  <img
                    src={specialAnnouncement.thumbnail}
                    alt={specialAnnouncement.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />
                </div>
              )}
              <div className="p-4 sm:p-6">
                <DialogHeader className="text-left">
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Church Notice</span>
                  </div>
                  <DialogTitle className="text-xl sm:text-2xl font-bold font-serif leading-snug">
                    {specialAnnouncement.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm sm:text-base text-muted-foreground pt-2 leading-relaxed whitespace-pre-line break-words">
                    {specialAnnouncement.description}
                  </DialogDescription>
                </DialogHeader>

                {/* Additional Announcement Boxes inside the same popup */}
                {specialAnnouncement.extraAnnouncements &&
                  specialAnnouncement.extraAnnouncements.length > 0 && (
                    <div className="mt-5 space-y-4 pt-4 border-t border-border">
                      {specialAnnouncement.extraAnnouncements.map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className="rounded-xl border border-primary/20 bg-muted/50 overflow-hidden"
                        >
                          {item.thumbnail && (
                            <img
                              src={item.thumbnail}
                              alt={item.title || `Announcement ${idx + 2}`}
                              className="w-full h-36 object-cover"
                            />
                          )}
                          <div className="p-3.5 sm:p-4 text-left space-y-1.5">
                            {item.title && (
                              <h4 className="font-semibold text-base text-foreground font-serif">
                                {item.title}
                              </h4>
                            )}
                            {item.description && (
                              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line break-words">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>

            {/* Pinned Action Buttons Footer */}
            <div className="p-4 sm:px-6 sm:py-4 border-t border-border bg-background/95 flex flex-col sm:flex-row gap-2.5 sm:gap-3 flex-shrink-0">
              <Button
                className="btn-primary flex-1 py-2.5 text-sm sm:text-base"
                onClick={() => setAnnouncementOpen(false)}
              >
                {specialAnnouncement.primaryButtonText || "Add to Calendar"}
              </Button>
              <Button
                variant="outline"
                className="btn-secondary flex-1 py-2.5 text-sm sm:text-base"
                onClick={() => {
                  const extraText = (specialAnnouncement.extraAnnouncements || [])
                    .map((a) => (a.title ? `${a.title}: ${a.description}` : a.description))
                    .filter(Boolean)
                    .join("\n\n");
                  const combinedText = extraText
                    ? `${specialAnnouncement.title}: ${specialAnnouncement.description}\n\n${extraText}`
                    : `${specialAnnouncement.title}: ${specialAnnouncement.description}`;

                  const announcementThumbnail =
                    specialAnnouncement.thumbnail ||
                    (specialAnnouncement.extraAnnouncements || []).find((a) => a.thumbnail)
                      ?.thumbnail ||
                    "/Supernatural cloud.jpg";

                  return shareWithThumbnail({
                    title: specialAnnouncement.title || "Special Announcement",
                    text: combinedText,
                    shareType: "announcement",
                    itemId: "special",
                    fallbackPath: "/",
                    imageUrl: announcementThumbnail,
                    fileName: "vabt-announcement",
                    copySuccessMessage: "Announcement link copied to clipboard!",
                  });
                }}
              >
                {specialAnnouncement.secondaryButtonText || "Share Announcement"}
              </Button>
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