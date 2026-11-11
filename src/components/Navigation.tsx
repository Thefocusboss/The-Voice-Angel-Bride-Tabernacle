import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Blog", href: "/blog" }
  ];

  const isHomePage = location.pathname === "/" || location.pathname === "/share";
  const isBlogPage = location.pathname.startsWith("/blog");

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/")) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (isHomePage) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    navigate(`/${href}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center space-x-2 min-w-0 pr-2 text-left"
          >
            {/* Replaced text badge with image logo from public folder */}
            <img src="/Logo.png" alt="VABT Ministries logo" className="h-7 sm:h-8 w-auto flex-shrink-0" />
            <span className="text-base sm:text-xl font-bold text-foreground truncate">
              Voice Angel Bride Tabernacle
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => {
              const isActive = item.href === "/blog" && isBlogPage;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`transition-colors duration-300 font-medium whitespace-nowrap ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <Button 
              onClick={() => handleNavClick("#contact")}
              className="btn-primary"
            >
              Visit Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const isActive = item.href === "/blog" && isBlogPage;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors duration-300 ${
                    isActive
                      ? "text-primary font-semibold bg-primary/5"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="px-3 py-2">
              <Button 
                onClick={() => handleNavClick("#contact")}
                className="btn-primary w-full"
              >
                Visit Us
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
