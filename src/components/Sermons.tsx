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
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop&crop=center",
      videoUrl: "#"
    },
    {
      id: 2,
      title: "The Voice of the Seventh Angel",
      date: "December 8, 2024", 
      duration: "52 min",
      description: "Exploring Revelation 10:7 and the ministry of God's end-time messenger William Marion Branham.",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop&crop=center",
      videoUrl: "#"
    },
    {
      id: 3,
      title: "Turning Hearts to the Fathers",
      date: "December 1, 2024",
      duration: "38 min", 
      description: "The Malachi 4 promise and restoring the apostolic faith of the fathers to this generation.",
      thumbnail: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=400&h=225&fit=crop&crop=center",
      videoUrl: "#"
    }
  ];

  const podcasts = [
    {
      title: "Daily Devotions with Pastor Michael",
      description: "Start your day with inspiring words from God's messenger",
      episodes: 127
    },
    {
      title: "End Time Revelations",
      description: "Deep dive into prophetic teachings and Bible mysteries",
      episodes: 89
    },
    {
      title: "Apostolic Faith Series",
      description: "Foundational teachings on original apostolic beliefs",
      episodes: 156
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

        {/* Podcast Section */}
        <div className="bg-muted rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Podcast Series</h3>
            <p className="text-muted-foreground">Listen anytime, anywhere to life-transforming teachings</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {podcasts.map((podcast, index) => (
              <Card key={index} className="card-hover bg-card">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{podcast.title}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{podcast.description}</p>
                  <div className="text-primary font-semibold mb-4">{podcast.episodes} Episodes</div>
                  <Button className="btn-secondary w-full">
                    Listen Now
                  </Button>
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