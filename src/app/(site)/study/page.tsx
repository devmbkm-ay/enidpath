import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Award, Clock, Globe, CheckCircle, ArrowRight, TrendingUp } from "lucide-react";

const programmes = [
  {
    level: "BA Pathway",
    title: "Business Management Pathway",
    description: "Build a strong foundation in business principles and management practices with this comprehensive undergraduate pathway programme.",
    features: [
      "Foundation to degree-level progression",
      "Business fundamentals and strategy",
      "Leadership and management skills",
      "Flexible online learning",
    ],
  },
  {
    level: "MBA Pathway",
    title: "Master of Business Administration Pathway",
    description: "Advance your career with a prestigious MBA pathway programme designed for working professionals seeking leadership roles.",
    features: [
      "Advanced business strategy",
      "Global leadership skills",
      "Strategic management focus",
      "Industry-relevant curriculum",
    ],
  },
];

const benefits = [
  {
    icon: Award,
    title: "UK Accredited",
    description: "Programmes regulated under OFQUAL and the Qualifications and Credit Framework (QCF).",
  },
  {
    icon: Globe,
    title: "Study Anywhere",
    description: "100% online delivery allows you to study from anywhere in the world.",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Balance your studies with work and personal commitments.",
  },
  {
    icon: TrendingUp,
    title: "Career Progression",
    description: "Gain qualifications that open doors to career advancement.",
  },
];

export default function Study() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-2 mb-6">
              <GraduationCap className="h-4 w-4 text-accent" />
              <span className="text-sm text-primary-foreground">Delivered by Online Business School (UK)</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Study with Online Business School
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Access accredited UK BA and MBA pathway programmes through our partnership with Online Business School. Quality education made affordable and accessible.
            </p>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="bg-accent/10 border-y border-accent/20 py-6">
        <div className="container">
          <div className="flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground font-medium">
                All programmes are delivered and accredited by Online Business School (UK).
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                EnidPath International provides recruitment, guidance, and student support services. We do not deliver or accredit programmes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About OBS */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">
              About Online Business School (UK)
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Online Business School (UK) is a leading provider of online higher education programmes, offering flexible pathways to undergraduate and postgraduate qualifications. Their programmes are designed for ambitious individuals seeking quality UK education without the traditional constraints of location and schedule.
              </p>
              <p>
                Programmes offered by OBS are regulated under the Office of Qualifications and Examinations Regulation (OFQUAL) and follow the Qualifications and Credit Framework (QCF), ensuring recognition and quality assurance that meets UK standards.
              </p>
              <p>
                Through our partnership with OBS, EnidPath International helps international students access these programmes with comprehensive support throughout their educational journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Available Programmes
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose from BA and MBA pathway programmes designed to advance your career.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {programmes.map((programme) => (
              <div 
                key={programme.title}
                className="bg-card p-8 rounded-lg card-shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary rounded-full px-4 py-1 text-sm font-medium mb-4">
                  <BookOpen className="h-4 w-4" />
                  {programme.level}
                </div>
                <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                  {programme.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {programme.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {programme.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="accent" asChild className="w-full">
                  <Link href="/contact">
                    Enquire Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Why Choose OBS Programmes?
            </h2>
            <p className="text-muted-foreground text-lg">
              Quality, flexibility, and recognition combined in one educational pathway.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affordability */}
      <section className="py-20 bg-primary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Affordable UK Education
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Complete your BA or MBA pathway programme for less than £6,000. Quality UK education that fits your budget.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link href="/contact">
                  Get Pricing Details
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link href="/services">View Our Support Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
