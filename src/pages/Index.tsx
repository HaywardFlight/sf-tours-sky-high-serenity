import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Phone, ArrowRight, Plane, Star, Shield, Camera, Clock, Users, AlertCircle, Send, CheckCircle, ExternalLink, Quote, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-golden-gate.jpg";
import tourBayArea from "@/assets/tour-bay-area.jpg";
import tourElite from "@/assets/tour-elite.jpg";
import tourSunset from "@/assets/tour-sunset.jpg";
import tourNight from "@/assets/tour-night.jpg";
import tourNapa from "@/assets/tour-napa.jpg";
import { toast } from "sonner";
import { useLivePricing } from "@/hooks/useLivePricing";
import { getSkuPricing, formatPrice } from "@/lib/getSkuPricing";
import type { Sku } from "@/data/pricingMap";

const tours = [
  {
    id: 1,
    name: "San Francisco Bay Area Flight Tour",
    image: tourBayArea,
    duration: "40 min",
    description: `Take a 40-minute flight over San Francisco for the best views of the city and the bay. You will fly directly out to the Pacific Coast and the Golden Gate Bridge. After flying over the bridge you will continue your flight over Downtown San Francisco, along the waterfront, Fisherman's Wharf, and Pier 39.

The flight continues to Alcatraz, around Angel Island, and then along the towns of Tiburon and Sausalito. Our experienced staff promise to help make your flight as enjoyable as possible.

During the approximate 40 minute tour, your skilled pilot will craft a unique and unforgettable experience as you buzz through the SF Bay Area airspace. Your flight takes place in a Cessna 172 Skyhawk with 4 seats (3 passengers and one pilot).

Your departure and arrival location will be at the Hayward Executive Airport (KHWD), near the San Mateo Bridge.`,
    skus: [
      { sku: "bay_40_2p" as Sku, passengers: 2 },
      { sku: "bay_40_3p" as Sku, passengers: 3 },
    ],
  },
  {
    id: 2,
    name: "Elite San Francisco Bay Area Tour",
    image: tourElite,
    duration: "1 hr",
    description: `If 40 minutes is not enough to satisfy your need to explore San Francisco from the air, then the Elite SF Bay Tour package is for you! Your journey begins at Hayward Executive Airport as you climb aboard a Cessna 172 Skyhawk, with seats for 3 passengers in addition to the pilot.

Fly directly out to the Pacific coast and soar over the Golden Gate Bridge. Continue your flight over Downtown San Francisco and along the waterfront. Look down at Fisherman's Wharf and Pier 39, then continue over Alcatraz. Fly around Angel Island, then along the coast, admiring the towns of Tiburon and Sausalito. When it is time to head back, see San Francisco International Airport (KSFO) from a totally unique angle.

Our experienced pilots will make the flight truly unforgettable, giving you plenty of opportunities to take stunning aerial pictures of the sights of the beautiful bay city as you fly over them.`,
    skus: [
      { sku: "elite_60_2p" as Sku, passengers: 2 },
      { sku: "elite_60_3p" as Sku, passengers: 3 },
    ],
  },
  {
    id: 3,
    name: "San Francisco Sunset Flight Tour",
    image: tourSunset,
    duration: "40 min",
    description: `The San Francisco Sunset Tour is one of the most unforgettable experiences that we offer. Perfect for couples, anniversaries, flying enthusiasts, or anyone who wants to experience the beauty of the San Francisco sunset from the air.

Admire as the brilliant red horizon clashes with the well-lit Downtown San Francisco. Our skilled pilots will expertly maneuver your airplane to allow you to enjoy and photograph the best views SF has to offer.`,
    skus: [
      { sku: "sunset_40_2p" as Sku, passengers: 2 },
      { sku: "sunset_40_3p" as Sku, passengers: 3 },
    ],
  },
  {
    id: 4,
    name: "San Francisco Night Flight Tour",
    image: tourNight,
    duration: "40 min",
    description: `Take a plane over the SF bay area at night to get the best views of the city lights and the bay bridge light show. Get a unique perspective on San Francisco as you take in the city from the air. Enjoy a private plane all to yourselves for a truly romantic experience as you admire the night sky.

Meet your pilot at the airport, strap in, and take to the skies. Fly directly out to the Pacific Coast, admiring the Bay Lights art installation on the San Francisco-Oakland Bay Bridge. Next, fly over the engineering wonder that is the Golden Gate Bridge, it up for the night.

Continue your flight over Downtown San Francisco, spotting the city's main attractions from the air. Then, follow the waterfront, admiring the city's lights as you fly. Take in the popular tourist attraction of Fisherman's Wharf and Pier 39 before landing back at the airport.`,
    skus: [
      { sku: "night_40_2p" as Sku, passengers: 2 },
      { sku: "night_40_3p" as Sku, passengers: 3 },
    ],
  },
  {
    id: 5,
    name: "Napa Valley Wine Country Flight Tour",
    image: tourNapa,
    duration: "1 hr 30 min",
    description: `Admire the endless vineyards of Napa Valley from a new perspective. Relax as our pilots fly you over Wine Country so you can enjoy the best views Napa has to offer. If you love greenery and experiencing the beauty of nature, this will be an unforgettable experience you won't regret!`,
    skus: [
      { sku: "napa_90_2p" as Sku, passengers: 2 },
    ],
  },
];

const services = [
  {
    name: "San Francisco Bay Area Flight Tour",
    duration: "40 min",
    skus: [
      { sku: "bay_40_2p" as Sku, passengers: 2 },
      { sku: "bay_40_3p" as Sku, passengers: 3 },
    ],
  },
  {
    name: "Elite San Francisco Bay Area Tour",
    duration: "1 hr",
    skus: [
      { sku: "elite_60_2p" as Sku, passengers: 2 },
      { sku: "elite_60_3p" as Sku, passengers: 3 },
    ],
  },
  {
    name: "San Francisco Sunset Flight Tour",
    duration: "40 min",
    skus: [
      { sku: "sunset_40_2p" as Sku, passengers: 2 },
      { sku: "sunset_40_3p" as Sku, passengers: 3 },
    ],
  },
  {
    name: "San Francisco Night Flight Tour",
    duration: "40 min",
    skus: [
      { sku: "night_40_2p" as Sku, passengers: 2 },
      { sku: "night_40_3p" as Sku, passengers: 3 },
    ],
  },
  {
    name: "Napa Valley Wine Country Flight Tour",
    duration: "1 hr 30 min",
    skus: [
      { sku: "napa_90_2p" as Sku, passengers: 2 },
    ],
  },
];


const Index = () => {
  const { tierMap } = useLivePricing();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message sent! We'll get back to you soon.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
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
              <Button variant="gold" size="xl" onClick={() => scrollToSection("#book")}>
                Book Online
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="goldOutline" size="xl" onClick={() => scrollToSection("#tours")}>
                More Information
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

      {/* Tours Section */}
      <section id="tours" className="section-spacing bg-navy-medium">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
              Our Tours
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Flight Tour Information
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              You haven't discovered San Francisco until you've seen it from the air! Fly San Francisco Tours is proud to operate the safest and most exciting experiences available!
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {tours.map((tour, index) => (
              <div
                key={tour.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/3] tour-card">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Up to 3</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                    {tour.name}
                  </h3>
                  <div className="prose prose-lg prose-invert text-muted-foreground mb-8 space-y-4">
                    {tour.description.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  {/* Booking Buttons */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-3">
                      {tour.skus.map(({ sku, passengers }) => {
                        const pricing = getSkuPricing(sku, tierMap);
                        return (
                          <Button
                            key={sku}
                            asChild
                            variant="gold"
                            size="lg"
                          >
                            <a
                              href={pricing.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Book Now – {passengers} Passengers ({formatPrice(pricing.price)})
                            </a>
                          </Button>
                        );
                      })}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Flight time will be confirmed after booking based on availability and weather.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Online Section */}
      <section id="book" className="section-spacing bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
              Reserve Your Flight
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Book Online
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              With our professional pilots at the helm, you'll enjoy the smoothest, most enjoyable flight possible!
            </p>
          </div>

          {/* Booking Policy Notice */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 text-center py-4 bg-primary/10 border border-primary/20 rounded-lg">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0" />
              <p className="text-sm md:text-base text-foreground">
                <strong>Booking Policy:</strong> Bookings close 2 days before the session starts. 
                <span className="text-muted-foreground ml-2">Timezone: Pacific Standard Time (PST)</span>
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="max-w-6xl mx-auto">
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Our Services
            </h3>
            <p className="text-muted-foreground text-center mb-12">
              Select your preferred tour package and book instantly
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
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
                  <h4 className="font-serif text-lg font-semibold text-foreground mb-6 leading-tight">
                    {service.name}
                  </h4>

                  {/* Booking Options */}
                  <div className="space-y-3">
                    {service.skus.map(({ sku, passengers }) => {
                      const pricing = getSkuPricing(sku, tierMap);
                      return (
                        <Button
                          key={sku}
                          asChild
                          variant="gold"
                          size="lg"
                          className="w-full"
                        >
                          <a
                            href={pricing.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Book Now – {passengers} Passengers ({formatPrice(pricing.price)})
                          </a>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ))}
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

      {/* Reviews Section */}
      <section id="reviews" className="section-spacing bg-navy-medium">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
              Testimonials
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Customer Reviews
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              What our customers say
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Review Request Card */}
            <div className="glass-card p-8 md:p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Quote className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Share Your Experience
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                If you flew with us, we'd really appreciate a Google review.
              </p>
              
              {/* Stars */}
              <div className="flex justify-center gap-2 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 text-primary fill-primary" />
                ))}
              </div>

              <Button
                asChild
                variant="gold"
                size="xl"
              >
                <a
                  href="https://g.page/r/CRux9QX07mwyEAE/review"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Write a Review
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">
                Your feedback helps us improve and helps other travelers discover the magic of seeing San Francisco from the sky.
              </p>
            </div>
          </div>

          {/* Why Review Section */}
          <div className="max-w-4xl mx-auto text-center mt-16">
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12">
              Why Your Review Matters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-6">
                <div className="text-4xl font-bold text-primary mb-2">01</div>
                <h4 className="font-serif text-lg font-semibold text-foreground mb-2">
                  Help Others Decide
                </h4>
                <p className="text-muted-foreground text-sm">
                  Your experience helps future travelers make informed decisions.
                </p>
              </div>
              <div className="glass-card p-6">
                <div className="text-4xl font-bold text-primary mb-2">02</div>
                <h4 className="font-serif text-lg font-semibold text-foreground mb-2">
                  Support Local Business
                </h4>
                <p className="text-muted-foreground text-sm">
                  Reviews help small businesses like ours grow and improve.
                </p>
              </div>
              <div className="glass-card p-6">
                <div className="text-4xl font-bold text-primary mb-2">03</div>
                <h4 className="font-serif text-lg font-semibold text-foreground mb-2">
                  Share the Adventure
                </h4>
                <p className="text-muted-foreground text-sm">
                  Let others know about the incredible views you experienced.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-spacing bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
              Get In Touch
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Contact Us
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-8">
                {/* Phone */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-foreground">
                        Call
                      </h4>
                    </div>
                  </div>
                  <a
                    href="tel:5103726693"
                    className="text-2xl font-bold text-primary hover:underline"
                  >
                    510 372-6693
                  </a>
                </div>

                {/* Hours */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-foreground">
                        Hours
                      </h4>
                    </div>
                  </div>
                  <p className="text-foreground font-medium">Mon–Sun</p>
                  <p className="text-muted-foreground">10am–5pm</p>
                </div>

                {/* Location */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-foreground">
                        Location
                      </h4>
                    </div>
                  </div>
                  <address className="not-italic text-muted-foreground leading-relaxed">
                    20995 Skywest Dr<br />
                    Hayward, Ca 94541
                  </address>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="glass-card p-8 md:p-10">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="h-10 w-10 text-primary" />
                      </div>
                      <h4 className="font-serif text-2xl font-semibold text-foreground mb-4">
                        Message Sent!
                      </h4>
                      <p className="text-muted-foreground mb-8">
                        Thank you for reaching out. We'll get back to you as soon as possible.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            firstName: "",
                            lastName: "",
                            email: "",
                            phone: "",
                            message: "",
                          });
                        }}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-foreground">
                            First Name <span className="text-primary">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="bg-muted border-border focus:border-primary"
                          />
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-foreground">
                            Last Name <span className="text-primary">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="bg-muted border-border focus:border-primary"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">
                          Email <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-muted border-border focus:border-primary"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-muted border-border focus:border-primary"
                        />
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-foreground">
                          Message <span className="text-primary">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          className="bg-muted border-border focus:border-primary resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        variant="gold"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full md:w-auto"
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Submit
                            <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
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
              Book your aerial tour today and see San Francisco like never before.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gold" size="xl" onClick={() => scrollToSection("#book")}>
                Book Now
                <ArrowRight className="ml-2 h-5 w-5" />
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
      </section>
    </Layout>
  );
};

export default Index;
