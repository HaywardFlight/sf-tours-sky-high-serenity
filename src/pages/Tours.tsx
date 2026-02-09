import { Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import tourBayArea from "@/assets/tour-bay-area.jpg";
import tourElite from "@/assets/tour-elite.jpg";
import tourSunset from "@/assets/tour-sunset.jpg";
import tourNight from "@/assets/tour-night.jpg";
import tourNapa from "@/assets/tour-napa.jpg";
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

function TierBadge({ tier }: { tier: string }) {
  if (tier === "PEAK") return <Badge variant="default" className="ml-2 text-[10px] px-2 py-0.5">Premium Day</Badge>;
  if (tier === "OFFPEAK") return <Badge variant="secondary" className="ml-2 text-[10px] px-2 py-0.5">Special Rate</Badge>;
  return null;
}

const Tours = () => {
  const { tierMap } = useLivePricing();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-navy-medium">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-50" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
              Our Tours
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Flight Tour Information
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              You haven't discovered San Francisco until you've seen it from the air! Fly San Francisco Tours is proud to operate the safest and most exciting experiences available! Our commitment is to make your time with us fun and memorable. You will get to fly at different angles and altitudes for a fascinating, scenic trip in one of the most popular locations in the world!
            </p>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="section-spacing bg-background">
        <div className="container mx-auto px-4 lg:px-8">
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
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                    {tour.name}
                  </h2>
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
                              <TierBadge tier={pricing.tier} />
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

      {/* CTA Section */}
      <section className="section-spacing bg-navy-medium">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Take Flight?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Book your tour today and experience San Francisco like never before.
            </p>
            <p className="text-sm text-muted-foreground mb-10">
              Flight time will be confirmed after booking based on availability and weather.
            </p>
            <Button asChild variant="outline" size="lg">
              <a href="tel:5103726693">
                Questions? Call 510 372-6693
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tours;
