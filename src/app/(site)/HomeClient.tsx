"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  Globe,
  GraduationCap,
  Phone,
  Shield,
  Star,
  Users,
} from "lucide-react";
import defaultHero from "@/assets/hero-2.webp";
import { Button } from "@/components/ui/button";
import { resolveSiteIcon } from "@/lib/site-icons";
import { useLivePreviewGlobalData } from "@/components/LivePreviewProvider";

type HeroImage = {
  url?: string;
} | null | string;

type TextItem = {
  id?: string;
  label?: string;
  sublabel?: string;
  text?: string;
  value?: string;
};

type Feature = {
  description?: string;
  icon?: string;
  id?: string;
  title?: string;
};

type HomeData = {
  ctaBody?: string;
  ctaTitle?: string;
  ctaPrimaryHref?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryHref?: string;
  ctaSecondaryLabel?: string;
  features?: Feature[];
  featuresSectionSubtitle?: string;
  featuresSectionTitle?: string;
  heroImage?: HeroImage;
  heroSubtitle?: string;
  heroTitle?: string;
  partnershipBadges?: TextItem[];
  partnershipBody?: string;
  partnershipTitle?: string;
  stats?: TextItem[];
  trustIndicators?: Array<TextItem & { icon?: string }>;
};

const defaultTrustIndicators = [
  { icon: Award, text: "UK Accredited Programmes" },
  { icon: Shield, text: "OFQUAL Regulated" },
  { icon: Globe, text: "Study Online, Anywhere" },
  { icon: GraduationCap, text: "BA & MBA Pathways" },
];

export const defaultHomeContent: Required<Omit<HomeData, "heroImage">> & { heroImage: HeroImage } = {
  heroTitle: "Your Gateway to UK Higher Education",
  heroSubtitle:
    "Access affordable, accredited BA and MBA pathway programmes from Online Business School (UK). Complete your qualification for less than £6,000 with full student support from EnidPath International.",
  heroImage: null,
  stats: [
    { value: "£6,000", label: "Full Programme Cost", sublabel: "Less than" },
    { value: "100%", label: "Online Learning" },
    { value: "UK", label: "Accredited by OBS" },
    { value: "24/7", label: "Student Support" },
  ] satisfies TextItem[],
  trustIndicators: defaultTrustIndicators.map((item) => ({ text: item.text })),
  featuresSectionTitle: "Why Partner with EnidPath International?",
  featuresSectionSubtitle:
    "We connect ambitious students with world-class UK education through our partnership with Online Business School.",
  features: [
    {
      icon: "book-open",
      title: "UK Accredited Qualifications",
      description:
        "Access quality BA and MBA pathway programmes delivered by Online Business School (UK), regulated under the OFQUAL and QCF frameworks.",
    },
    {
      icon: "users",
      title: "Dedicated Student Support",
      description:
        "Receive personalised guidance from application through graduation. Our team is here to support your educational journey every step of the way.",
    },
    {
      icon: "globe",
      title: "Study From Anywhere",
      description:
        "Flexible online learning that fits your schedule. Balance your studies with work and personal commitments without relocating.",
    },
  ],
  partnershipTitle: "In Partnership with Online Business School (UK)",
  partnershipBody:
    "EnidPath International is an authorised recruitment and student support partner. All BA and MBA pathway programmes are delivered and accredited by Online Business School, regulated under OFQUAL and the QCF framework.",
  partnershipBadges: [
    { text: "UK Regulated" },
    { text: "OFQUAL Recognised" },
    { text: "QCF Framework" },
  ] satisfies TextItem[],
  ctaTitle: "Ready to Start Your UK Education Journey?",
  ctaBody:
    "Contact EnidPath International today for personalised guidance and support with your application to Online Business School programmes.",
  ctaPrimaryLabel: "Contact Us Now",
  ctaPrimaryHref: "/contact",
  ctaSecondaryLabel: "View Our Services",
  ctaSecondaryHref: "/services",
};

export default function HomeClient({
  homeData: initialHomeData,
}: {
  homeData: HomeData;
}) {
  const liveHomeData = useLivePreviewGlobalData("HomeSettings", initialHomeData);
  const data = {
    ...defaultHomeContent,
    ...liveHomeData,
    stats: liveHomeData.stats?.length ? liveHomeData.stats : defaultHomeContent.stats,
    trustIndicators:
      liveHomeData.trustIndicators?.length
        ? liveHomeData.trustIndicators
        : defaultHomeContent.trustIndicators,
    features: liveHomeData.features?.length ? liveHomeData.features : defaultHomeContent.features,
    partnershipBadges:
      liveHomeData.partnershipBadges?.length
        ? liveHomeData.partnershipBadges
        : defaultHomeContent.partnershipBadges,
  };

  const heroImage = data.heroImage;
  const heroImageUrl =
    typeof heroImage === "string"
      ? heroImage
      : heroImage?.url || defaultHero.src;

  return (
    <div>
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
              <span className="text-sm font-medium text-primary-foreground">
                Authorised Partner of Online Business School (UK)
              </span>
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
              {data.trustIndicators.map((item, index) => {
                const fallbackIcon = defaultTrustIndicators[index]?.icon ?? Award;
                const Icon = resolveSiteIcon((item as { icon?: string }).icon, fallbackIcon);

                return (
                  <div
                    key={item.id ?? `${item.text}-${index}`}
                    className="flex items-center gap-3 text-primary-foreground/90 animate-fade-in"
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <Icon className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.stats.map((stat, index) => (
              <div key={stat.id ?? `${stat.label ?? "stat"}-${index}`} className="text-center">
                {stat.sublabel && (
                  <div className="text-sm text-primary-foreground/60">{stat.sublabel}</div>
                )}
                <div className="text-3xl md:text-4xl font-display font-bold text-accent">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              {data.featuresSectionTitle}
            </h2>
            <p className="text-muted-foreground text-lg">{data.featuresSectionSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.features.map((feature, index) => (
              <div
                key={feature.id ?? `${feature.title ?? "feature"}-${index}`}
                className="bg-card p-8 rounded-lg card-shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                  {(() => {
                    const fallbackIcon = [BookOpen, Users, Globe][index] ?? BookOpen;
                    const Icon = resolveSiteIcon(feature.icon, fallbackIcon);

                    return <Icon className="h-7 w-7 text-secondary" />;
                  })()}
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              {data.partnershipTitle}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {data.partnershipBody}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {data.partnershipBadges.map((badge, index) => (
                <div
                  key={badge.id ?? `${badge.text}-${index}`}
                  className="flex items-center gap-2 bg-card px-4 py-2 rounded-full"
                >
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              {data.ctaTitle}
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">{data.ctaBody}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link href={data.ctaPrimaryHref || "/contact"}>
                  <Phone className="mr-2 h-5 w-5" />
                  {data.ctaPrimaryLabel}
                </Link>
              </Button>
              {data.ctaSecondaryLabel && data.ctaSecondaryHref && (
                <Button variant="hero-outline" size="lg" asChild>
                  <Link href={data.ctaSecondaryHref}>{data.ctaSecondaryLabel}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
