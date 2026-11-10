import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useSiteData } from "@/lib/siteData";

const Events = () => {
  const { data } = useSiteData();
  const { upcomingEvents } = data;

  const getCategoryColor = (category: string) => {
    const colors = {
      Worship: "bg-primary/10 text-primary border-primary/20",
      Prayer: "bg-secondary-deep/10 text-secondary-deep border-secondary-deep/20", 
      Conference: "bg-accent/10 text-accent-foreground border-accent/20",
      Convention: "bg-accent/10 text-accent-foreground border-accent/20",
      Youth: "bg-green-100 text-green-800 border-green-200",
      Ministry: "bg-purple-100 text-purple-800 border-purple-200",
      Outreach: "bg-orange-100 text-orange-800 border-orange-200"
    };
    return colors[category as keyof typeof colors] || "bg-muted";
  };

  return (
    <section id="events" className="py-14 sm:py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {upcomingEvents.visible && (
          <>
            {/* Section Header */}
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="section-title">{upcomingEvents.sectionTitle}</h2>
              <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                {upcomingEvents.sectionSubtitle}
              </p>
            </div>

            {/* Events Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {upcomingEvents.items.map((event) => (
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
          </>
        )}

        {/* Weekly Prayer Schedule */}
        <div className="mt-12 sm:mt-16">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Weekly prayer Schedule</h3>
          <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { day: "Monday", events: ["Morning: 5:30 AM - 6:30 AM", "Evening: 6:00 PM - 7:00 PM"] },
                { day: "Tuesday", events: ["Morning: 5:30 AM - 6:30 AM", "Evening: 6:00 PM - 7:00 PM"] },
                { day: "Thursday", events: ["Morning: 5:30 AM - 6:30 AM", "Evening: 6:00 PM - 7:00 PM"] },
                { day: "Saturday", events: ["Morning: 5:30 AM - 6:30 AM", "Evening: 6:00 PM - 7:00 PM"] }
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