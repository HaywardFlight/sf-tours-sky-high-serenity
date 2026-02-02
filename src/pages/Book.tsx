import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Users, AlertCircle, Check, Calendar, User, CreditCard } from "lucide-react";
import Layout from "@/components/Layout";

const services = [
  { name: "Fly San Francisco Bay Tour For 2", duration: "40 min", price: 578 },
  { name: "Fly San Francisco Bay Tour For 3", duration: "40 min", price: 867 },
  { name: "Elite San Francisco Flight Tour For 2", duration: "1 hr", price: 618 },
  { name: "Elite San Francisco Flight Tour For 3", duration: "1 hr", price: 927 },
  { name: "San Francisco Sunset Flight Tour for 2", duration: "40 min", price: 598 },
  { name: "San Francisco Sunset Flight Tour for 3", duration: "40 min", price: 897 },
  { name: "San Francisco Night Flight Tour for 2", duration: "40 min", price: 598 },
  { name: "San Francisco Night Flight Tour for 3", duration: "40 min", price: 897 },
  { name: "Napa Valley Flight Tour for 2", duration: "1 hr 30 min", price: 638 },
];

const bookingSteps = [
  { id: 1, name: "Select Tour", icon: Calendar },
  { id: 2, name: "Choose Date", icon: Calendar },
  { id: 3, name: "Your Details", icon: User },
  { id: 4, name: "Payment", icon: CreditCard },
];

const Book = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

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
              With our professional pilots at the helm, you'll enjoy the smoothest, most enjoyable flight possible!!!
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
              Select your preferred tour package
            </p>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`glass-card p-6 cursor-pointer transition-all duration-300 tour-card ${
                    selectedService === index
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedService(index)}
                >
                  {/* Selection Indicator */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedService === index
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    }`}>
                      {selectedService === index && (
                        <Check className="h-4 w-4 text-primary-foreground" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                  </div>

                  {/* Service Name */}
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-4 leading-tight">
                    {service.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-primary">${service.price}</span>
                    <span className="text-muted-foreground text-sm">/ flight</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Book Now CTA */}
            <div className="mt-12 text-center">
              <Button
                variant="gold"
                size="xl"
                disabled={selectedService === null}
                onClick={() => selectedService !== null && setCurrentStep(2)}
                className="min-w-[200px]"
              >
                {selectedService !== null
                  ? `Book Now — $${services[selectedService].price}`
                  : "Select a Tour"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Flow Section */}
      <section className="section-spacing bg-navy-medium">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Booking Process
            </h2>

            {/* Steps Indicator */}
            <div className="flex items-center justify-center mb-16">
              {bookingSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex flex-col items-center ${
                    currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                  }`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      currentStep >= step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs mt-2 hidden sm:block">{step.name}</span>
                  </div>
                  {index < bookingSteps.length - 1 && (
                    <div className={`w-12 sm:w-20 h-0.5 mx-2 transition-all ${
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Booking Form Placeholder */}
            <div className="glass-card p-8 md:p-12">
              <div className="text-center">
                <Calendar className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  Select Your Preferred Date
                </h3>
                <p className="text-muted-foreground mb-8">
                  Choose a date and time that works best for you. Our team will confirm availability within 24 hours.
                </p>
                
                {/* Calendar Placeholder */}
                <div className="bg-muted/50 rounded-2xl p-8 mb-8">
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-xs text-muted-foreground font-medium py-2">
                        {day}
                      </div>
                    ))}
                    {[...Array(35)].map((_, i) => {
                      const day = i - 2;
                      const isValid = day > 0 && day <= 31;
                      const isToday = day === 15;
                      return (
                        <div
                          key={i}
                          className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-all ${
                            !isValid
                              ? "text-muted-foreground/30"
                              : isToday
                              ? "bg-primary text-primary-foreground font-semibold"
                              : "hover:bg-muted text-foreground cursor-pointer"
                          }`}
                        >
                          {isValid ? day : ""}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  For immediate assistance, call us at{" "}
                  <a href="tel:5103726693" className="text-primary font-semibold hover:underline">
                    510 372-6693
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Book;
