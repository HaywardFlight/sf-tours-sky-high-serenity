import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Plane, Star, Shield, Camera } from "lucide-react";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-golden-gate.jpg";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Aerial view of San Francisco Golden Gate Bridge at sunset"
            className="w-full h-full object-cover"
          />
          <div className="image-overlay" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <p className="text-primary font-medium text-sm lg:text-base tracking-widest uppercase mb-4">
              Premium Aerial Tours
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground hero-text-shadow mb-6 leading-tight">
              FLY SAN FRANCISCO TOURS
            </h1>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary mb-8">
              Enjoy SF From The Sky
            </p>
            <p className="text-lg md:text-xl text-cream-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover the San Francisco Bay Area from a different point of view!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="gold" size="xl">
                <Link to="/book">
                  Book Online
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="goldOutline" size="xl">
                <Link to="/tours">
                  More Information
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:5103726693">
                  <Phone className="mr-2 h-5 w-5" />
                  Call 510 372-6693
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-spacing bg-navy-medium">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
              Experience the Bay Area Like Never Before
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Fly San Francisco Tours is proud to offer the finest selection of aerial tours found in the Bay Area. Whether you are looking for a romantic sunset flight for couples, visiting the Bay Area for the first time, or even want to take a tour of wine country, we can serve your every need.
              </p>
              <p>
                Fly SF Tours operates a wide fleet of aircraft including both single and dual engine models.
              </p>
              <p>
                Give us a call or fill out the form below and we'll get back to you as soon as possible.
              </p>
              <p className="text-primary font-medium text-xl">
                Sit back, relax, take some pictures, and come fly with us at Fly San Francisco Tours!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="glass-card p-8 text-center tour-card">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                Safety First
              </h3>
              <p className="text-muted-foreground">
                Our commitment is to make your time with us fun and memorable while maintaining the highest safety standards.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-8 text-center tour-card">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Plane className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                Modern Fleet
              </h3>
              <p className="text-muted-foreground">
                Fly in our well-maintained Cessna 172 Skyhawks with seats for 3 passengers plus your experienced pilot.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-8 text-center tour-card">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                Stunning Views
              </h3>
              <p className="text-muted-foreground">
                Capture breathtaking aerial photographs of the Golden Gate Bridge, Alcatraz, and the SF skyline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-navy-medium relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-primary fill-primary" />
              ))}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready for an Unforgettable Experience?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Book your aerial adventure today and see San Francisco like never before.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="gold" size="xl">
                <Link to="/book">
                  Book Your Flight
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/tours">
                  View All Tours
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
