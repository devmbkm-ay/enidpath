import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, BookOpen, Award, GraduationCap, Globe, Shield, ArrowRight, Phone, Star } from "lucide-react";
import defaultHero from "@/assets/hero-2.webp";
import { getPayload } from "@/lib/payload";

const trustIndicators = [
  { icon: Award, text: "UK Accredited Programmes" },
  { icon: Shield, text: "OFQUAL Regulated" },
  { icon: Globe, text: "Study Online, Anywhere" },
  { icon: GraduationCap, text: "BA & MBA Pathways" },
];

export default async function Home() {
  const payload = await getPayload();
  
  const { docs: homeDocs } = await payload.find({
    collection: 'HomePages',
    limit: 1,
    depth: 1,
  });

  const data = homeDocs[0] || {
    heroTitle: "Your Gateway to UK Higher Education",
    heroSubtitle: "Access affordable, accredited BA and MBA pathway programmes from Online Business School (UK). Complete your qualification for less than £6,000 with full student support from EnidPath International.",
    heroImage: null,
    stats: [
      { value: "£6,000", label: "Full Programme Cost", sublabel: "Less than" },
      { value: "100%", label: "Online Learning" },
      { value: "UK", label: "Accredited by OBS" },
      { value: "24/7", label: "Student Support" },
    ],
    features: [
      {
        title: "UK Accredited Qualifications",
        description: "Access quality BA and MBA pathway programmes delivered by Online Business School (UK), regulated under the OFQUAL and QCF frameworks.",
      },
      {
        title: "Dedicated Student Support",
        description: "Receive personalised guidance from application through graduation. Our team is here to support your educational journey every step of the way.",
      },
      {
        title: "Study From Anywhere",
        description: "Flexible online learning that fits your schedule. Balance your studies with work and personal commitments without relocating.",
      },
    ]
  };

  // Gestion de l'image de fond dynamique
  const heroImageUrl = data.heroImage && typeof data.heroImage !== 'string' 
    ? (data.heroImage as any).url 
    : defaultHero.src;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImageUrl})` }}
        >
          <div className="absolute inset-0 gradient-overlay" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-2 mb-8">
              <Star className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-primary-foreground">Authorised Partner of Online Business School (UK)</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight">
              {data.heroTitle}
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl leading-relaxed">
              {data.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="hero" size="lg" asChild>
                <Link href="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link href="/study">Explore Programmes</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trustIndicators.map((item, index) => (
                <div
                  key={`${item.text}-${index}`}
                  className="flex items-center gap-3 text-primary-foreground/90 animate-fade-in"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <item.icon className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.stats.map((stat: any, index: number) => (
              <div
                key={stat.id ?? `${stat.label ?? 'stat'}-${index}`}
                className="text-center"
              >
                {stat.sublabel && (
                  <div className="text-sm text-primary-foreground/60">{stat.sublabel}</div>
                )}
                <div className="text-3xl md:text-4xl font-display font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Why Partner with EnidPath International?
            </h2>
            <p className="text-muted-foreground text-lg">
              We connect ambitious students with world-class UK education through our partnership with Online Business School.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.features.map((feature: any, index: number) => (
              <div
                key={feature.id ?? `${feature.title ?? 'feature'}-${index}`}
                className="bg-card p-8 rounded-lg card-shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                  {/* Utilisation d'icônes par défaut selon l'index pour simplifier */}
                  {index === 0 && <BookOpen className="h-7 w-7 text-secondary" />}
                  {index === 1 && <Users className="h-7 w-7 text-secondary" />}
                  {index >= 2 && <Globe className="h-7 w-7 text-secondary" />}
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Banner */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              In Partnership with Online Business School (UK)
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              EnidPath International is an authorised recruitment and student support partner. All BA and MBA pathway programmes are delivered and accredited by Online Business School, regulated under OFQUAL and the QCF framework.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">UK Regulated</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">OFQUAL Recognised</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">QCF Framework</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Ready to Start Your UK Education Journey?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Contact EnidPath International today for personalised guidance and support with your application to Online Business School programmes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us Now
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link href="/services">View Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
