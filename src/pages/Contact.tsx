import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Clock, MapPin, Send, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from "sonner";

const Contact = () => {
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
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message sent! We'll get back to you soon.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-navy-medium">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-50" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
              Get In Touch
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-spacing bg-background">
        <div className="container mx-auto px-4 lg:px-8">
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
                      <h3 className="font-serif text-lg font-semibold text-foreground">
                        Call
                      </h3>
                    </div>
                  </div>
                  <a
                    href="tel:5103726693"
                    className="text-2xl font-bold text-primary hover:underline"
                  >
                    510 372-6693
                  </a>
                </div>

                {/* Email */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Send className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground">
                        Email
                      </h3>
                    </div>
                  </div>
                  <a
                    href="mailto:flighthayward@gmail.com"
                    className="text-lg font-bold text-primary hover:underline break-all"
                  >
                    flighthayward@gmail.com
                  </a>
                </div>

                {/* Hours */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground">
                        Hours
                      </h3>
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
                      <h3 className="font-serif text-lg font-semibold text-foreground">
                        Location
                      </h3>
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
                      <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                        Message Sent!
                      </h3>
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
    </Layout>
  );
};

export default Contact;
