import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Quote } from "lucide-react";
import Layout from "@/components/Layout";

const Reviews = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-navy-medium">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-50" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
              Testimonials
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Customer Reviews
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              What our customers say
            </p>
          </div>
        </div>
      </section>

      {/* Review CTA Section */}
      <section className="section-spacing bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Review Request Card */}
            <div className="glass-card p-8 md:p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Quote className="h-10 w-10 text-primary" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Share Your Experience
              </h2>
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
        </div>
      </section>

      {/* Why Review Section */}
      <section className="section-spacing bg-navy-medium">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12">
              Why Your Review Matters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-6">
                <div className="text-4xl font-bold text-primary mb-2">01</div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  Help Others Decide
                </h3>
                <p className="text-muted-foreground text-sm">
                  Your experience helps future travelers make informed decisions.
                </p>
              </div>
              <div className="glass-card p-6">
                <div className="text-4xl font-bold text-primary mb-2">02</div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  Support Local Business
                </h3>
                <p className="text-muted-foreground text-sm">
                  Reviews help small businesses like ours grow and improve.
                </p>
              </div>
              <div className="glass-card p-6">
                <div className="text-4xl font-bold text-primary mb-2">03</div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  Share the Adventure
                </h3>
                <p className="text-muted-foreground text-sm">
                  Let others know about the incredible views you experienced.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Reviews;
