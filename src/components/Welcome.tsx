import { Button } from "@/components/ui/button";
import { useSiteData, getYouTubeEmbedUrl } from "@/lib/siteData";

const Welcome = () => {
  const { data } = useSiteData();
  const { welcome } = data;

  if (!welcome.visible) {
    return null;
  }

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="welcome" className="py-14 sm:py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Video Card (above Welcome Message) */}
        {welcome.showFeaturedVideo && welcome.featuredVideoUrl && (
          <div className="mb-8 sm:mb-10 rounded-2xl overflow-hidden shadow-lg bg-card border">
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={getYouTubeEmbedUrl(welcome.featuredVideoUrl)}
                title="Featured Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Pastor Section */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-5 sm:p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">{welcome.heading}</h3>
              {welcome.paragraph1 && (
                <p className="text-base sm:text-lg text-muted-foreground mb-5 sm:mb-6 leading-relaxed whitespace-pre-line">
                  {welcome.paragraph1}
                </p>
              )}
              {welcome.paragraph2 && (
                <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed whitespace-pre-line">
                  {welcome.paragraph2}
                </p>
              )}
              <div className="border-l-4 border-primary pl-4 mb-6 text-left">
                <p className="font-semibold text-primary text-base sm:text-lg">
                  {welcome.pastorName}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {welcome.pastorRole}
                </p>
              </div>
              <Button
                onClick={scrollToContact}
                className="btn-primary w-full sm:w-auto text-base sm:text-lg"
              >
                {welcome.buttonText || "Contact Pastor Michael"}
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={welcome.pastorImage || "/Pastor.jpg"}
                    alt={welcome.pastorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center shadow-lg animate-glow">
                  <span className="text-primary-foreground font-bold text-sm">✝</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
