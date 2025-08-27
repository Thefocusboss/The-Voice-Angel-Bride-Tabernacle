import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Clock, Download } from "lucide-react";

const Sermons = () => {
  const sermons = [
    {
      id: 1,
      title: "The Mystery of the Seven Thunders",
      date: "December 15, 2024",
      duration: "45 min",
      description: "Understanding the divine revelations contained in the seven seals and their significance for the bride church.",
      thumbnail: "/Huffman christ.jpg", // updated per request
      videoUrl: "#"
    },
    {
      id: 2,
      title: "The Voice of the Seventh Angel",
      date: "December 8, 2024", 
      duration: "52 min",
      description: "Exploring Revelation 10:7 and the ministry of God's end-time messenger William Marion Branham.",
      thumbnail: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=225&fit=crop&crop=center",
      videoUrl: "#"
    },
    {
      id: 3,
      title: "Turning Hearts to the Fathers",
      date: "December 1, 2024",
      duration: "38 min", 
      description: "The Malachi 4 promise and restoring the apostolic faith of the fathers to this generation.",
      thumbnail: "https://images.unsplash.com/photo-1501696461415-6bd6660c6742?w=400&h=225&fit=crop&crop=center",
      videoUrl: "#"
    }
  ];

  return (
    <section id="sermons" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Sermons & Teachings</h2>
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
                <div className="relative">
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
                    <Button className="btn-secondary flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      Watch
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="w-4 h-4" />
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