import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Sunday Worship Service",
      date: "Every Sunday",
      time: "10:00 AM - 12:00 PM",
      location: "Main Sanctuary",
      description: "Join us for powerful worship, anointed preaching, and fellowship in the presence of the Almighty.",
      category: "Worship",
      recurring: true,
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=200&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Mid-Week Prayer Meeting",
      date: "Every Wednesday", 
      time: "6:00 PM - 8:00 PM",
      location: "Prayer Hall",
      description: "Come together for powerful intercession and seeking God's face for revival and breakthrough.",
      category: "Prayer",
      recurring: true,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "End Time Prophetic Conference",
      date: "January 15-17, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Conference Center",
      description: "Three days of intensive teaching on end-time revelations and the mysteries of the seven seals.",
      category: "Conference",
      recurring: false,
      image: "https://images.unsplash.com/photo-1515169067868-5387ec336d88?w=400&h=200&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Youth Fellowship & Bible Study",
      date: "Every Friday",
      time: "7:00 PM - 9:00 PM", 
      location: "Youth Center",
      description: "Dynamic youth gatherings with worship, Bible study, and fellowship for ages 13-30.",
      category: "Youth",
      recurring: true,
      image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&h=200&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "Women's Ministry Retreat",
      date: "February 8-9, 2025",
      time: "All Day Event",
      location: "Retreat Center",
      description: "A weekend of spiritual renewal, teaching, and fellowship for all women in the church.",
      category: "Ministry",
      recurring: false,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=200&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "Community Outreach Program",
      date: "January 25, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Community Center",
      description: "Reaching out to our community with love, food distribution, and prayer ministry.",
      category: "Outreach",
      recurring: false,
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=200&fit=crop&crop=center"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Worship: "bg-primary/10 text-primary border-primary/20",
      Prayer: "bg-secondary-deep/10 text-secondary-deep border-secondary-deep/20", 
      Conference: "bg-accent/10 text-accent-foreground border-accent/20",
      Youth: "bg-green-100 text-green-800 border-green-200",
      Ministry: "bg-purple-100 text-purple-800 border-purple-200",
      Outreach: "bg-orange-100 text-orange-800 border-orange-200"
    };
    return colors[category as keyof typeof colors] || "bg-muted";
  };

  return (
    <section id="events" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Upcoming Events</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join us for life-changing gatherings, powerful worship, and fellowship opportunities that strengthen your faith.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="card-hover overflow-hidden group">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={getCategoryColor(event.category)}>
                    {event.category}
                  </Badge>
                </div>
                {event.recurring && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-foreground">
                      Recurring
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {event.description}
                </p>
                <div className="flex gap-2">
                  <Button className="btn-secondary flex-1">
                    Learn More
                  </Button>
                  <Button variant="outline" size="icon">
                    <Users className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Special Announcement Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Special Announcement</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
              We're excited to announce our upcoming <strong>End Time Prophetic Conference</strong> 
              featuring special guest ministers who will bring fresh revelations from God's word. 
              This promises to be a life-changing gathering you don't want to miss!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary">
                Register for Conference
              </Button>
              <Button variant="outline" className="btn-secondary">
                View Full Calendar
              </Button>
            </div>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Weekly Schedule</h3>
          <div className="bg-card rounded-2xl p-6 shadow-lg max-w-4xl mx-auto">
            <div className="grid md:grid-cols-7 gap-4">
              {[
                { day: "Sunday", events: ["Worship Service 10:00 AM"] },
                { day: "Monday", events: ["Church Office Hours"] },
                { day: "Tuesday", events: ["Elder's Meeting 7:00 PM"] },
                { day: "Wednesday", events: ["Prayer Meeting 6:00 PM"] },
                { day: "Thursday", events: ["Bible Study 7:00 PM"] },
                { day: "Friday", events: ["Youth Fellowship 7:00 PM"] },
                { day: "Saturday", events: ["Community Outreach"] }
              ].map((schedule, index) => (
                <div key={index} className="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold text-primary mb-2">{schedule.day}</h4>
                  <div className="space-y-1">
                    {schedule.events.map((event, eventIndex) => (
                      <p key={eventIndex} className="text-sm text-muted-foreground">
                        {event}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;