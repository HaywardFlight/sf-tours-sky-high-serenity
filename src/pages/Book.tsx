import { Button } from "@/components/ui/button";
import { Clock, AlertCircle, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import { getTourOptions, formatPrice, type TourKey } from "@/data/bookingLinks";

const serviceKeys: TourKey[] = ["bay", "elite", "sunset", "night", "napa"];

const Book = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-navy-medium">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-50" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
              Reserve Your Flight
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Book Online
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              With our professional pilots at the helm, you'll enjoy the smoothest, most enjoyable flight possible!
            </p>
          </div>
        </div>
      </section>

      {/* Booking Policy Notice */}
      <section className="py-6 bg-primary/10 border-y border-primary/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-center">
            <AlertCircle className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-sm md:text-base text-foreground">
              <strong>Booking Policy:</strong> Bookings close 2 days before the session starts. 
              <span className="text-muted-foreground ml-2">Timezone: Pacific Standard Time (PST)</span>
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-spacing bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground text-center mb-12">
              Select your preferred tour package and book instantly
            </p>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceKeys.map((key) => {
                const service = getTourOptions(key);
                return (
                  <div
                    key={key}
                    className="glass-card p-6 tour-card"
                  >
                    {/* Duration Badge */}
                    <div className="flex items-center justify-end mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{service.duration}</span>
                      </div>
                    </div>

                    {/* Service Name */}
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-6 leading-tight">
                      {service.name}
                    </h3>

                    {/* Booking Options */}
                    <div className="space-y-3">
                      {service.options.map(({ passengers, price, url }) => (
                        <Button
                          key={passengers}
                          asChild
                          variant="gold"
                          size="lg"
                          className="w-full"
                        >
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Book Now – {passengers} Passengers ({formatPrice(price)})
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Booking Note */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Flight time will be confirmed after booking based on availability and weather.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-spacing bg-navy-medium">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Questions? We're Here to Help
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              For immediate assistance or special requests, give us a call.
            </p>
            <Button asChild variant="gold" size="xl">
              <a href="tel:5103726693">
                <Phone className="mr-2 h-5 w-5" />
                Call 510 372-6693
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Book;
