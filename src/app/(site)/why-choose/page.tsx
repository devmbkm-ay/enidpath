import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Award, Users, Globe, Clock, CreditCard, HeadphonesIcon, CheckCircle, ArrowRight, Star } from "lucide-react";
import { getPayload } from "@/lib/payload";

const defaultContent = {
  heroTitle: "Why Choose EnidPath International?",
  heroSubtitle: "Discover why students trust us as their recruitment and support partner for accessing UK-accredited programmes delivered by Online Business School.",
};

const reasons = [
  {
    icon: Shield,
    title: "Authorised Partner",
    description: "We are an officially authorised recruitment and student support partner of Online Business School (UK), ensuring you receive legitimate guidance and support.",
  },
  {
    icon: Award,
    title: "UK Accredited Programmes",
    description: "Access programmes delivered by Online Business School (UK), regulated under OFQUAL and the QCF framework.",
  },
  {
    icon: CreditCard,
    title: "Affordable Education",
    description: "Complete your BA or MBA pathway for less than £6,000—quality UK education at a fraction of traditional costs.",
  },
  {
    icon: Globe,
    title: "Local Presence, Global Access",
    description: "Based in Uganda, we understand local needs while connecting you to world-class UK education opportunities.",
  },
  {
    icon: HeadphonesIcon,
    title: "End-to-End Support",
    description: "From initial enquiry to graduation, our team provides comprehensive guidance and assistance throughout your journey.",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Study at your own pace, on your own schedule, without disrupting your career or personal life.",
  },
];

const testimonialPoints = [
  "Personalised guidance tailored to your goals",
  "Clear and transparent communication",
  "Responsive support when you need it",
  "Genuine care for your success",
  "Professional and ethical service",
  "Long-term relationship focus",
];

export default async function WhyChoose() {
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: 'Pages',
    where: {
      slug: {
        equals: 'why-choose',
      },
    },
  });

  const pageData = docs[0] || defaultContent;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              {pageData.heroTitle || defaultContent.heroTitle}
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              {pageData.heroSubtitle || defaultContent.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Reasons Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason) => (
              <div 
                key={reason.title}
                className="bg-card p-8 rounded-lg card-shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                  <reason.icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Students Experience */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                What You Can Expect
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                When you partner with EnidPath International, you're choosing a team dedicated to your educational success. Here's what our students experience:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {testimonialPoints.map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card p-8 rounded-lg card-shadow">
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-6 w-6 text-accent fill-accent" />
                ))}
              </div>
              <blockquote className="text-lg text-foreground italic mb-6 leading-relaxed">
                "EnidPath International made my dream of studying for a UK qualification a reality. Their team guided me through every step, from choosing the right programme to completing my application. I couldn't have done it without their support."
              </blockquote>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">— EnidPath Student</p>
                <p className="text-sm text-muted-foreground">MBA Pathway Programme</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Users className="h-16 w-16 text-secondary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Our Commitment to You
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              As an authorised partner of Online Business School (UK), we are committed to maintaining the highest standards of integrity and service. We provide honest guidance, transparent information, and genuine support—never making promises we cannot keep.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Authorised Partner</span>
              </div>
              <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Ethical Service</span>
              </div>
              <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Student-Focused</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Start Your Journey Today
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Join the students who have trusted EnidPath International to guide them toward their educational goals.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link href="/contact">
                Contact Us Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
