import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Clock, Share2 } from "lucide-react";
import { useSiteData } from "@/lib/siteData";
import { shareWithThumbnail } from "@/lib/share";

const Sermons = () => {
  const { data } = useSiteData();
  const { liveServices } = data;

  if (!liveServices.visible) {
    return null;
  }

  return (
    <section id="sermons" className="py-14 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="section-title">{liveServices.sectionTitle}</h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            {liveServices.sectionSubtitle}
          </p>
        </div>

        {/* Recent Sermons */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">{liveServices.recentHeading}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveServices.items.map((sermon) => (
              <Card key={sermon.id} className="card-hover group overflow-hidden">
                <div
                  className="relative cursor-pointer"
                  onClick={() => window.open(sermon.videoUrl, "_blank", "noopener,noreferrer")}
                >
                  <img
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Button 
                    size="icon"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary hover:bg-primary-glow"
                  >
                    <Play className="w-6 h-6" />
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg leading-tight">{sermon.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {sermon.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {sermon.duration}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{sermon.description}</p>
                  <div className="flex gap-2">
                    <Button
                      className="btn-secondary flex-1"
                      onClick={() => window.open(sermon.videoUrl, "_blank", "noopener,noreferrer")}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label={`Share ${sermon.title}`}
                      onClick={() =>
                        shareWithThumbnail({
                          title: sermon.title,
                          text: `Watch "${sermon.title}" - Voice Angel Bride Tabernacle`,
                          shareType: "sermon",
                          itemId: String(sermon.id),
                          fallbackPath: "/#sermons",
                          imageUrl: sermon.thumbnail,
                          fileName: `vabt-sermon-${sermon.id}`,
                          copySuccessMessage: "Sermon link copied to clipboard!",
                        })
                      }
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
          <p className="text-muted-foreground mb-6">
            Subscribe to receive notifications when new sermons and teachings are available.
          </p>
          <Button
            className="btn-primary"
            onClick={() =>
              window.open(
                "https://youtube.com/@voiceangelbridetabernacle?si=rZGARCtPOkrCV7zF",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Subscribe to Updates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Sermons;