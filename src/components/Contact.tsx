import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Car, Navigation } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: ["Our Location", "Home school Avenue", "Red cross Kwamba", "Niger state"],
      action: "Get Directions"
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["Church Office: (555) 123-4567", "Pastor's Line: (555) 987-6543", "Prayer Line: (555) 456-7890"],
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: ["info@vabtministries.org", "pastor@vabtministries.org", "prayer@vabtministries.org"],
      action: "Send Email"
    },
    {
      icon: Clock,
      title: "Service Times",
      details: [
        "Sunday Worship: Doors open 8:00 AM, Sunday School, Service starts 9:00 AM",
        "Wednesday Service: Doors open 5:30 PM, Service starts 6:00 PM",
        "Friday Service: Doors open 5:30 PM, Service starts 6:00 PM"
      ],
      action: "View Schedule"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Contact Us</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We'd love to hear from you! Get in touch with us for prayer requests, questions, or to plan your visit.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" required placeholder="Your first name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" required placeholder="Your last name" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input type="email" id="email" required placeholder="your.email@example.com" />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input type="tel" id="phone" placeholder="(555) 123-4567" />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" required placeholder="What is this regarding?" />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      required
                      placeholder="Share your message, prayer request, or question with us..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <input type="checkbox" id="newsletter" className="mt-1" />
                    <Label htmlFor="newsletter" className="text-sm text-muted-foreground">
                      I would like to receive updates and newsletters from Voice Angel Bride Tabernacle
                    </Label>
                  </div>

                  <Button type="submit" className="btn-primary w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-muted-foreground text-sm mb-1">
                            {detail}
                          </p>
                        ))}
                        <Button variant="outline" size="sm" className="mt-3">
                          {info.action}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="overflow-hidden shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Find Us</CardTitle>
              <p className="text-muted-foreground">
                Located in the heart of Gospel City, we're easy to find and excited to welcome you.
              </p>
            </CardHeader>
            <CardContent className="p-0">
              {/* Placeholder for map - you would integrate with Google Maps or similar */}
              <div className="relative h-96 bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                  <p className="text-muted-foreground mb-4">
                    Click to view our location on Google Maps
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button className="btn-primary">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button variant="outline">
                      <Car className="w-4 h-4 mr-2" />
                      Parking Info
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visit Information */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Planning Your First Visit?</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>• Doors open 8:00 AM; Sunday School; Service starts 9:00 AM on Sundays</p>
                <p>• Casual or formal dress - come as you are!</p>
                <p>• Free parking available on-site and nearby streets</p>
                {/* Removed children ministry and fellowship notes as requested */}
              </div>
              <Button className="btn-secondary mt-4">
                New Visitor Information
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Need Prayer?</h3>
              <p className="text-muted-foreground mb-4">
                Our prayer team is available to pray with you and support you through any challenges you're facing. 
                Don't hesitate to reach out - we believe in the power of prayer and would be honored to stand with you.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <p><strong>Prayer Line:</strong> (555) 456-7890</p>
                <p><strong>Email:</strong> prayer@vabtministries.org</p>
                <p><strong>In Person:</strong> Before or after any service</p>
              </div>
              <Button className="btn-primary">
                Request Prayer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;