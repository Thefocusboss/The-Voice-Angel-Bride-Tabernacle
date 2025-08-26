import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; 
import { Users, Heart, BookOpen, Mic, Globe, Baby, UserCheck, Handshake } from "lucide-react";

const Ministries = () => {
  const ministries = [
    {
      id: 1,
      title: "Youth Ministry",
      description: "Empowering young people with the end-time message and preparing them for their divine calling in this generation.",
      icon: Users,
      ageGroup: "Ages 13-30",
      schedule: "Fridays 7:00 PM",
      leader: "Minister Sarah Johnson",
      activities: ["Bible Study", "Worship Nights", "Youth Conferences", "Community Service"],
      image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Women's Ministry", 
      description: "Supporting and nurturing women in their spiritual journey, building strong relationships and developing godly character.",
      icon: Heart,
      ageGroup: "All Women",
      schedule: "2nd Saturday Monthly",
      leader: "Sister Mary Williams",
      activities: ["Women's Retreats", "Prayer Circles", "Mentorship Programs", "Bible Studies"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Men's Ministry",
      description: "Equipping men to be spiritual leaders in their homes, church, and community through fellowship and biblical teaching.",
      icon: UserCheck,
      ageGroup: "All Men", 
      schedule: "1st Saturday Monthly",
      leader: "Elder Robert Davis",
      activities: ["Men's Breakfast", "Leadership Training", "Outreach Programs", "Brotherhood Fellowship"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Children's Ministry",
      description: "Teaching children the foundational truths of the gospel in age-appropriate ways through engaging activities and programs.",
      icon: Baby,
      ageGroup: "Ages 3-12",
      schedule: "Sundays 10:00 AM",
      leader: "Teacher Linda Thompson",
      activities: ["Sunday School", "Children's Church", "VBS Programs", "Kids Worship"],
      image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "Music & Worship Ministry",
      description: "Leading the congregation into God's presence through anointed worship, praise, and spiritual songs.",
      icon: Mic,
      ageGroup: "All Ages",
      schedule: "Rehearsals: Thursdays 7:00 PM",
      leader: "Worship Leader Michael Brown",
      activities: ["Choir Ministry", "Instrument Training", "Worship Workshops", "Special Presentations"],
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "Bible Study Ministry",
      description: "Deep study of God's word, focusing on end-time revelations and the mysteries revealed through God's prophet messenger.",
      icon: BookOpen,
      ageGroup: "All Ages",
      schedule: "Thursdays 7:00 PM",
      leader: "Teacher James Wilson",
      activities: ["Verse-by-Verse Studies", "Prophetic Teachings", "Message Studies", "Q&A Sessions"],
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 7,
      title: "Outreach Ministry",
      description: "Reaching the lost and hurting in our community with the love of Christ and the hope of the gospel message.",
      icon: Globe,
      ageGroup: "All Volunteers",
      schedule: "Monthly Community Events",
      leader: "Minister Grace Anderson",
      activities: ["Street Evangelism", "Food Distribution", "Hospital Visits", "Prison Ministry"],
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 8,
      title: "Prayer Ministry",
      description: "Dedicated to intercession, spiritual warfare, and seeking God's face for revival and breakthrough.",
      icon: Handshake,
      ageGroup: "All Prayer Warriors",
      schedule: "Daily 6:00 AM & Wednesdays 6:00 PM",
      leader: "Elder Patricia Moore",
      activities: ["Early Morning Prayer", "Corporate Intercession", "Prayer Chains", "Healing Prayer"],
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=300&fit=crop&crop=center"
    }
  ];

  return (
    <section id="ministries" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Our Ministries</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover opportunities to grow in faith, serve others, and be part of God's work in building His end-time bride church.
          </p>
        </div>

        {/* Ministries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {ministries.map((ministry) => {
            const IconComponent = ministry.icon;
            return (
              <Card key={ministry.id} className="card-hover overflow-hidden group h-full">
                <div className="relative">
                  <img
                    src={ministry.image}
                    alt={ministry.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{ministry.title}</CardTitle>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Age Group:</strong> {ministry.ageGroup}</p>
                    <p><strong>Schedule:</strong> {ministry.schedule}</p>
                    <p><strong>Leader:</strong> {ministry.leader}</p>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {ministry.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Activities:</h4>
                    <div className="flex flex-wrap gap-1">
                      {ministry.activities.map((activity, index) => (
                        <span
                          key={index}
                          className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="btn-secondary w-full text-sm">
                    Join Ministry
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Ministry Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Called to Serve?</h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              God has given each believer gifts and talents to serve His kingdom. Whether you're passionate about 
              worship, teaching, outreach, or supporting others, there's a place for you in our ministry family. 
              Join us in preparing the bride church for the coming of our Lord Jesus Christ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary">
                Discover Your Calling
              </Button>
              <Button variant="outline" className="btn-secondary">
                Volunteer Opportunities
              </Button>
            </div>
          </div>
        </div>

        {/* Ministry Leaders Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Ministry Leadership</h3>
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Our ministry leaders are called and anointed servants of God who have dedicated their lives to 
              building up the body of Christ. Each leader brings unique gifts and experience to guide and 
              nurture believers in their spiritual journey.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserCheck className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="font-semibold">Spiritual Leadership</h4>
                <p className="text-sm text-muted-foreground">Guided by the Holy Spirit</p>
              </div>
              
              <div className="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-deep to-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold">Pastoral Care</h4>
                <p className="text-sm text-muted-foreground">Shepherding with love</p>
              </div>
              
              <div className="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-8 h-8 text-accent-foreground" />
                </div>
                <h4 className="font-semibold">Biblical Teaching</h4>
                <p className="text-sm text-muted-foreground">Rightly dividing the word</p>
              </div>
              
              <div className="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold">Community Building</h4>
                <p className="text-sm text-muted-foreground">Building lasting relationships</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ministries;