import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MapPin, Clock, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Flight Tour Information", path: "/tours" },
  { name: "Book Online", path: "/book" },
  { name: "Contact Us", path: "/contact" },
];

const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Plane className="h-8 w-8 text-primary" />
              <span className="font-serif text-lg lg:text-xl font-semibold text-foreground">
                Fly SF Tours
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:5103726693"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                510 372-6693
              </a>
              <Button asChild variant="gold">
                <Link to="/book">Book Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border animate-fade-in">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <a
                  href="tel:5103726693"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-primary"
                >
                  <Phone className="h-4 w-4" />
                  Call 510 372-6693
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-navy-medium border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Plane className="h-8 w-8 text-primary" />
                <span className="font-serif text-xl font-semibold text-foreground">
                  Fly SF Tours
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The finest selection of aerial tours in the San Francisco Bay Area.
              </p>
            </div>

            {/* Location */}
            <div>
              <h4 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Location
              </h4>
              <address className="not-italic text-muted-foreground text-sm leading-relaxed">
                20995 Skywest Dr<br />
                Hayward, Ca 94541
              </address>
            </div>

            {/* Directions */}
            <div>
              <h4 className="font-serif text-lg font-semibold text-foreground mb-4">
                Directions
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                From I-880 North: Take exit 29 and turn left onto West A St. Turn left onto Skywest Dr. Take the fourth right, then turn right into the parking lot. The Hayward flight building entrance is the door connected to the hangar. Check out our video for a street view of the office!
              </p>
            </div>

            {/* Hours & Contact */}
            <div>
              <h4 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Open 7 days a week
              </h4>
              <p className="text-muted-foreground text-sm mb-6">
                Monday–Sunday 10 am–5pm
              </p>
              <h4 className="font-serif text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Phone
              </h4>
              <a
                href="tel:5103726693"
                className="text-primary font-semibold text-lg hover:underline"
              >
                510 372-6693
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Fly San Francisco Tours. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden sticky-cta">
        <Button asChild variant="gold" className="w-full">
          <Link to="/book">Book Your Flight Now</Link>
        </Button>
      </div>
    </div>
  );
};

export default Layout;
