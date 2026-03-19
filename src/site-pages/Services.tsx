import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle, GraduationCap, CreditCard, FileText, UserCheck, HeadphonesIcon, ArrowRight, CheckCircle } from "lucide-react";

const services = [
  {
    icon: MessageCircle,
    title: "Enquiry Support",
    description: "Have questions about studying with Online Business School? We provide comprehensive answers about programmes, requirements, costs, and more.",
    features: [
      "Programme information and guidance",
      "Eligibility assessment",
      "Timeline and process overview",
      "Responsive communication channels",
    ],
  },
  {
    icon: GraduationCap,
    title: "Course & Career Counselling",
    description: "Receive personalised advice to help you choose the right programme based on your career goals, background, and aspirations.",
    features: [
      "Career pathway analysis",
      "Programme recommendations",
      "Skills assessment",
      "Goal-oriented guidance",
    ],
  },
  {
    icon: CreditCard,
    title: "Financial Guidance",
    description: "We help you understand costs, payment options, and financial planning for your education journey.",
    features: [
      "Fee structure explanation",
      "Payment plan options",
      "Budget planning support",
      "Financial advice",
    ],
  },
  {
    icon: FileText,
    title: "Application & Document Support",
    description: "Get assistance with your application to ensure everything is complete, accurate, and submitted correctly.",
    features: [
      "Application form assistance",
      "Document checklist guidance",
      "Submission support",
      "Follow-up coordination",
    ],
  },
  {
    icon: UserCheck,
    title: "Admission Support",
    description: "We guide you through the admission process and help address any requirements or queries that arise.",
    features: [
      "Admission process guidance",
      "Requirements clarification",
      "Communication liaison",
      "Status tracking",
    ],
  },
  {
    icon: HeadphonesIcon,
    title: "Post-Admission Support",
    description: "Our support continues after admission. We help you navigate your studies and address any challenges you may face.",
    features: [
      "Onboarding assistance",
      "Ongoing student support",
      "Issue resolution",
      "Progress guidance",
    ],
  },
];

export default function Services() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Our Services
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Comprehensive student support services designed to guide you from initial enquiry through graduation and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Services Note */}
      <section className="bg-muted border-b border-border py-6">
        <div className="container">
          <div className="flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
            <p className="text-foreground">
              <span className="font-medium">EnidPath International</span> provides recruitment and student support services in partnership with Online Business School (UK). All academic programmes are delivered by OBS.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              How We Support You
            </h2>
            <p className="text-muted-foreground text-lg">
              From your first enquiry to graduation, we are here to help every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.title}
                className="bg-card p-8 rounded-lg card-shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                  <service.icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Your Journey With Us
            </h2>
            <p className="text-muted-foreground text-lg">
              A simple, supported path from enquiry to enrolment.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Enquire", description: "Reach out to us with your questions and interests." },
              { step: "02", title: "Consult", description: "Receive personalised guidance on the right programme." },
              { step: "03", title: "Apply", description: "Get support with your application to OBS." },
              { step: "04", title: "Succeed", description: "Begin your studies with ongoing support." },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center mx-auto mb-6 font-display font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Contact us today to learn more about our services and how we can support your educational journey.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link href="/contact">
                Contact Us Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
