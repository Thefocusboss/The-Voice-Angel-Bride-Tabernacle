import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Car, Navigation } from "lucide-react";
import { useSiteData, ContactInfoCard, extractMapEmbedUrl } from "@/lib/siteData";
import { toast } from "sonner";

const iconMap = {
  location: MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
};

const Contact = () => {
  const { data } = useSiteData();
  const { contactUs } = data;

  if (!contactUs.visible) {
    return null;
  }

  const handleActionClick = (link?: string) => {
    const trimmed = link?.trim();
    if (!trimmed) return;
    if (trimmed.startsWith("#")) {
      const el = document.querySelector(trimmed);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (trimmed.startsWith("tel:") || trimmed.startsWith("mailto:")) {
      window.location.href = trimmed;
      return;
    }
    window.open(trimmed, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thank you for reaching out! We have received your message.");
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="py-14 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="section-title">{contactUs.sectionTitle}</h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            {contactUs.sectionSubtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">{contactUs.formTitle}</CardTitle>
                <p className="text-muted-foreground">
                  {contactUs.formSubtitle}
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
            {contactUs.cards.map((info: ContactInfoCard, index: number) => {
              const IconComponent = iconMap[info.iconType] || MapPin;
              return (
                <Card key={info.id || index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-muted-foreground text-sm mb-1 break-words">
                            {detail}
                          </p>
                        ))}
                        {info.actionLabel && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-3"
                            onClick={() => handleActionClick(info.actionLink)}
                          >
                            {info.actionLabel}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Map Section */}
        {contactUs.showMap && (
          <div className="mt-16">
            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{contactUs.mapTitle}</CardTitle>
                <p className="text-muted-foreground">
                  {contactUs.mapSubtitle}
                </p>
              </CardHeader>
              <CardContent className="p-0">
                {contactUs.mapEmbedUrl ? (
                  <div>
                    <div className="w-full h-72 sm:h-96 bg-muted">
                      <iframe
                        src={extractMapEmbedUrl(contactUs.mapEmbedUrl)}
                        title={contactUs.mapTitle || "Voice Angel Bride Tabernacle Church Location"}
                        className="w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <div className="p-4 sm:p-5 bg-card border-t border-border flex flex-col sm:flex-row gap-3 justify-center items-center">
                      <Button
                        className="btn-primary w-full sm:w-auto"
                        onClick={() => handleActionClick(contactUs.directionsUrl)}
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => handleActionClick("#welcome")}
                      >
                        <Car className="w-4 h-4 mr-2" />
                        Parking Info
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-72 sm:h-96 px-4 bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                      <p className="text-muted-foreground mb-4">
                        Click to view our location on Google Maps
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                          className="btn-primary"
                          onClick={() => handleActionClick(contactUs.directionsUrl)}
                        >
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
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Visit Information */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">{contactUs.firstVisitTitle}</h3>
              <div className="space-y-3 text-muted-foreground">
                {contactUs.firstVisitPoints.map((point, idx) => (
                  <p key={idx}>• {point}</p>
                ))}
              </div>
              <Button
                className="btn-secondary mt-4"
                onClick={() => handleActionClick("#welcome")}
              >
                New Visitor Information
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">{contactUs.needPrayerTitle}</h3>
              <p className="text-muted-foreground mb-4">
                {contactUs.needPrayerDescription}
              </p>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <p><strong>Prayer Line:</strong> {contactUs.prayerLine}</p>
                <p className="break-words"><strong>Email:</strong> {contactUs.prayerEmail}</p>
                <p><strong>In Person:</strong> {contactUs.prayerInPerson}</p>
              </div>
              <Button
                className="btn-primary"
                onClick={() => {
                  const el = document.getElementById("message");
                  if (el) el.focus();
                }}
              >
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
