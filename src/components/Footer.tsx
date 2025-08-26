import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram, ArrowRight } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "About Us", href: "#about" },
    { label: "Sermons", href: "#sermons" },
    { label: "Events", href: "#events" },
    { label: "Ministries", href: "#ministries" },
    { label: "Contact", href: "#contact" }
  ];

  const ministryLinks = [
    { label: "Youth Ministry", href: "#ministries" },
    { label: "Women's Ministry", href: "#ministries" },
    { label: "Men's Ministry", href: "#ministries" },
    { label: "Children's Ministry", href: "#ministries" },
    { label: "Prayer Ministry", href: "#ministries" }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Information */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">VABT</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Voice Angel Bride</h3>
                <p className="text-sm text-background/80">Tabernacle Ministries</p>
              </div>
            </div>
            <p className="text-background/80 mb-6 leading-relaxed">
              Proclaiming the original Apostolic faith and the end-time message to prepare the bride church 
              for the coming of our Lord Jesus Christ.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-background/80">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">123 Faith Avenue, Gospel City, GC 12345</span>
              </div>
              <div className="flex items-center space-x-3 text-background/80">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-background/80">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">info@vabtministries.org</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-background/80 hover:text-background transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Ministries</h4>
            <ul className="space-y-3">
              {ministryLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-background/80 hover:text-background transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Stay Connected</h4>
            <p className="text-background/80 text-sm mb-4">
              Subscribe to receive updates about upcoming events, new sermons, and prayer requests.
            </p>
            <form className="space-y-3">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
              />
              <Button className="w-full bg-primary hover:bg-primary-glow text-primary-foreground">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="font-semibold mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                <Button size="icon" variant="ghost" className="text-background/80 hover:text-background hover:bg-background/10">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-background/80 hover:text-background hover:bg-background/10">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-background/80 hover:text-background hover:bg-background/10">
                  <Youtube className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-background/80 hover:text-background hover:bg-background/10">
                  <Instagram className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Service Times Bar */}
        <div className="border-t border-background/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-2">Join Us for Worship</h4>
              <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-1 sm:space-y-0 text-background/80 text-sm">
                <span>Sunday Service: 10:00 AM</span>
                <span>Wednesday Prayer: 6:00 PM</span>
                <span>Friday Youth: 7:00 PM</span>
              </div>
            </div>
            <Button 
              onClick={() => scrollToSection('#contact')}
              className="bg-primary hover:bg-primary-glow text-primary-foreground"
            >
              Plan Your Visit
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-background/80 text-sm">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-primary" />
              <span>© 2024 Voice Angel Bride Tabernacle Ministries. All rights reserved.</span>
            </div>
            
            <div className="flex space-x-6">
              <button className="hover:text-background transition-colors">Privacy Policy</button>
              <button className="hover:text-background transition-colors">Terms of Service</button>
              <button className="hover:text-background transition-colors">Accessibility</button>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-background/60 text-xs italic">
              "Behold, I come quickly. Blessed is he that keepeth the sayings of the prophecy of this book." - Revelation 22:7
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;