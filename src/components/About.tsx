import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Star, Globe, Clock } from "lucide-react";
import pastorImage from "@/assets/pastor-michael.jpg";

const About = () => {
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
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pastor Section */}
        <div className="bg-card rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold mb-4">Welcome Message</h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                "I want to specially welcome you to this Gospel centre. No doubt you didn't 
                stumble into this site by chance but by God's divine arrangement. Possibly 
                you have a need or a question that needs urgent attention."
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "The good news of the gospel of Jesus Christ is a heart warming news that 
                soothes even the most turbulent soul. You can confidently feel free to 
                share with us as we promise to be of help in whatever little way that we can."
              </p>
              <div className="border-l-4 border-primary pl-4 mb-6">
                <p className="font-semibold text-primary text-lg">Rev. Michael Chuzie Chukwuezi</p>
                <p className="text-muted-foreground">Pastor-in-charge</p>
              </div>
              <Button className="btn-primary">
                Contact Pastor Michael
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={pastorImage}
                    alt="Rev. Michael Chuzie Chukwuezi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center shadow-lg animate-glow">
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

export default About;