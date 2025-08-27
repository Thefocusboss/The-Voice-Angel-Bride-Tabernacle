import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Star, Globe, Clock, Play } from "lucide-react";

const About = () => {
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
    <section id="about" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">About Our Church</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about our history, mission, and the end-time message we proclaim to the world.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Church History */}
          <div className="space-y-6">
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Book className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-2xl font-bold">Our Foundation</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The Voice Angel Bride Tabernacle, formerly known as Omega Bride Fellowship church, 
                  is an End time message church. We proclaim the original Apostolic Faith and Belief 
                  of the Bible promise to send a Voice at the end of the Gentile dispensation.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We believe in calling the Bride out of the church denominations into the living 
                  reality of the living God, confirming the Bible Truth that Jesus Christ is the 
                  same yesterday, today, and forever.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Star className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-2xl font-bold">Seven Church Ages</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We believe the Gentiles were allotted seven church age dispensations before 
                  the Gospel returns back to the Jews as the original vine according to the 
                  mystery of God revealed by Apostle Paul in Romans chapter 11.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Mission Statement */}
          <div className="space-y-6">
            <Card className="card-hover bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Globe className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As a Church, we stand unwavering and committed to the teachings of God's 
                  prophet messenger William Marion Branham and the Apostolic Echo Voice 
                  messenger Joseph Coleman of New York City.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We believe that every true ministry of Ephesians 4:11-13 will stand 
                  identified with God's prophet to say just what those tapes say.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-2xl font-bold">End Time Revelation</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  At the close of the seven church ages, we see Jesus standing at the door 
                  outside the church knocking to enter. The son of man is revealed to this 
                  Age through a prophetic office of the seventh angel messenger.
                </p>
                <div className="mt-6">
                  <img
                    src="/william marrion branham.jpg"
                    alt="End Time Revelation illustration"
                    className="w-full rounded-xl shadow-md object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Morning Tonic Section - Moved from Sermons */}
        <div className="bg-card rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Morning Tonic</h3>
            <p className="text-muted-foreground">Listen anytime, anywhere to life-transforming teachings</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {podcasts.map((podcast, index) => (
              <Card key={index} className="card-hover bg-background">
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
      </div>
    </section>
  );
};

export default About;