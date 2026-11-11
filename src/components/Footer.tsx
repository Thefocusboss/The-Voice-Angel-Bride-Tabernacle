import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteData } from "@/lib/siteData";
import { toast } from "sonner";

const Footer = () => {
  const { data } = useSiteData();
  const { footer } = data;

  if (!footer.visible) {
    return null;
  }

  const quickLinks = [
    { label: "About Us", href: "#about" },
    { label: "Sermons", href: "#sermons" },
    { label: "Events", href: "#events" },
    { label: "Ministries", href: "#ministries" },
    { label: "Contact", href: "#contact" }
  ];

  const ministryLinks = [
    { label: "Youth Ministry", href: "#ministries" },
    { label: "Prayer Ministry", href: "#ministries" }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openSocial = (url?: string) => {
    const trimmed = url?.trim();
    if (!trimmed) return;
    window.open(trimmed, "_blank", "noopener,noreferrer");
  };

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thank you for subscribing to VABT updates!");
    e.currentTarget.reset();
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Information */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-white/95 p-1.5 rounded-lg flex-shrink-0">
                <img src="/Logo.png" alt="VABT Ministries logo" className="h-8 w-auto" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{footer.brandTitle}</h3>
                <p className="text-sm text-background/80">{footer.brandSubtitle}</p>
              </div>
            </div>
            <p className="text-background/80 mb-6 leading-relaxed">
              {footer.description}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {footer.address && (
                <div className="flex items-center space-x-3 text-background/80">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{footer.address}</span>
                </div>
              )}
              {footer.phone && (
                <div className="flex items-center space-x-3 text-background/80">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{footer.phone}</span>
                </div>
              )}
              {footer.email && (
                <div className="flex items-center space-x-3 text-background/80">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm break-all">{footer.email}</span>
                </div>
              )}
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
            <h4 className="font-semibold text-lg mb-6">{footer.newsletterTitle}</h4>
            <p className="text-background/80 text-sm mb-4">
              {footer.newsletterDescription}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                required
                placeholder="Enter your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary-glow text-primary-foreground">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="font-semibold mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Facebook"
                  onClick={() => openSocial(footer.facebookUrl)}
                  className="text-background/80 hover:text-background hover:bg-background/10"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Twitter"
                  onClick={() => openSocial(footer.twitterUrl)}
                  className="text-background/80 hover:text-background hover:bg-background/10"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="YouTube"
                  onClick={() => openSocial(footer.youtubeUrl)}
                  className="text-background/80 hover:text-background hover:bg-background/10"
                >
                  <Youtube className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Instagram"
                  onClick={() => openSocial(footer.instagramUrl)}
                  className="text-background/80 hover:text-background hover:bg-background/10"
                >
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
              <h4 className="font-semibold mb-2">{footer.worshipTitle}</h4>
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-6 gap-y-1 text-background/80 text-sm">
                {footer.serviceTimes.map((time, idx) => (
                  <span key={idx}>{time}</span>
                ))}
              </div>
            </div>
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-primary hover:bg-primary-glow text-primary-foreground"
            >
              {footer.visitButtonText || "Plan Your Visit"}
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-background/80 text-sm">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-center md:text-left">
              <Heart className="w-4 h-4 text-primary flex-shrink-0" />
              <span>
                © {Math.max(2026, new Date().getFullYear())} {footer.copyrightText}
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link to="/admin" className="hover:text-background transition-colors font-medium">Admin</Link>
              <button className="hover:text-background transition-colors">Privacy Policy</button>
              <button className="hover:text-background transition-colors">Terms of Service</button>
              <button className="hover:text-background transition-colors">Accessibility</button>
            </div>
          </div>
          
          {footer.scriptureQuote && (
            <div className="mt-4 text-center">
              <p className="text-background/60 text-xs italic">
                {footer.scriptureQuote}
              </p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
