import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Clock, Download } from "lucide-react";

const Sermons = () => {
  const sermons = [
    {
      id: 1,
      title: "The 3rd Pull: A Mountain in the Top of Mountains, A Tent Within a Tent",
      date: "Voice Angel Bride Tabernacle",
      duration: "Full Message",
      description: "Understanding the divine revelation of the Third Pull and its significance for the bride church today.",
      thumbnail: "https://i.ytimg.com/vi/6q3FA5c5k8U/hqdefault.jpg",
      videoUrl: "https://youtu.be/6q3FA5c5k8U?si=gyAxSfsZ94JHi7yL"
    },
    {
      id: 2,
      title: "Recognizing His Voice in the Midst of Voices",
      date: "October 18, 2026", 
      duration: "Sunday Service",
      description: "Hearing and discerning the true Voice of God amidst the many voices in this end-time age.",
      thumbnail: "https://i.ytimg.com/vi/whZcLU9QSFg/hqdefault.jpg",
      videoUrl: "https://youtu.be/whZcLU9QSFg?si=QcgDEGVsYiH2g04O"
    },
    {
      id: 3,
      title: "Unto Thee Shall It Come, Even the First Dominion",
      date: "Voice Angel Bride Tabernacle",
      duration: "Live Service", 
      description: "The restoration of the original apostolic dominion and promise to the end-time bride of Christ.",
      thumbnail: "https://i.ytimg.com/vi/_7d8PzZRxxY/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/live/_7d8PzZRxxY?si=CEUnMrTs5m1w8Wqk"
    }
  ];

  return (
    <section id="sermons" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Live Services on YouTube</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience life-changing messages that reveal the mysteries of God and prepare the bride for the rapture.
          </p>
        </div>

        {/* Recent Sermons */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Recent Messages</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sermons.map((sermon) => (
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
          <Button className="btn-primary">
            Subscribe to Updates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Sermons;