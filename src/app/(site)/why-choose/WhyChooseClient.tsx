"use client";

import Link from "next/link";
import heroCampus from "@/assets/hero-campus.jpg";
import {
  ArrowRight,
  Award,
  CheckCircle,
  Clock,
  CreditCard,
  Globe,
  HeadphonesIcon,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { resolveSiteIcon } from "@/lib/site-icons";
import { useLivePreviewPageData } from "@/components/LivePreviewProvider";

export const defaultWhyChooseContent = {
  heroTitle: "Why Choose EnidPath International?",
  heroSubtitle:
    "Discover why students trust us as their recruitment and support partner for accessing UK-accredited programmes delivered by Online Business School.",
  reasonsSectionTitle: "Why Choose EnidPath International?",
  reasonsSectionSubtitle: "",
  expectationsTitle: "What You Can Expect",
  expectationsBody:
    "When you partner with EnidPath International, you're choosing a team dedicated to your educational success. Here's what our students experience:",
  testimonialQuote:
    "\"EnidPath International made my dream of studying for a UK qualification a reality. Their team guided me through every step, from choosing the right programme to completing my application. I couldn't have done it without their support.\"",
  testimonialAuthor: "EnidPath Student",
  testimonialRole: "MBA Pathway Programme",
  commitmentTitle: "Our Commitment to You",
  commitmentBody:
    "As an authorised partner of Online Business School (UK), we are committed to maintaining the highest standards of integrity and service. We provide honest guidance, transparent information, and genuine support, never making promises we cannot keep.",
  ctaTitle: "Start Your Journey Today",
  ctaBody:
    "Join the students who have trusted EnidPath International to guide them toward their educational goals.",
  ctaPrimaryLabel: "Contact Us Now",
  ctaPrimaryHref: "/contact",
};

const defaultReasons = [
  {
    iconName: "shield",
    icon: Shield,
    title: "Authorised Partner",
    description:
      "We are an officially authorised recruitment and student support partner of Online Business School (UK), ensuring you receive legitimate guidance and support.",
  },
  {
    iconName: "award",
    icon: Award,
    title: "UK Accredited Programmes",
    description:
      "Access programmes delivered by Online Business School (UK), regulated under OFQUAL and the QCF framework.",
  },
  {
    iconName: "credit-card",
    icon: CreditCard,
    title: "Affordable Education",
    description:
      "Complete your BA or MBA pathway for less than £6,000. Quality UK education at a fraction of traditional costs.",
  },
  {
    iconName: "globe",
    icon: Globe,
    title: "Local Presence, Global Access",
    description:
      "Based in Uganda, we understand local needs while connecting you to world-class UK education opportunities.",
  },
  {
    iconName: "headphones",
    icon: HeadphonesIcon,
    title: "End-to-End Support",
    description:
      "From initial enquiry to graduation, our team provides comprehensive guidance and assistance throughout your journey.",
  },
  {
    iconName: "clock",
    icon: Clock,
    title: "Flexible Learning",
    description:
      "Study at your own pace, on your own schedule, without disrupting your career or personal life.",
  },
];

const defaultExpectationPoints = [
  "Personalised guidance tailored to your goals",
  "Clear and transparent communication",
  "Responsive support when you need it",
  "Genuine care for your success",
  "Professional and ethical service",
  "Long-term relationship focus",
];

type TextItem = {
  id?: string;
  text?: string;
};

type HeroImage = {
  url?: string;
} | null | string;

type Reason = {
  description?: string;
  icon?: string;
  iconName?: string;
  id?: string;
  title?: string;
};

type WhyChoosePageData = typeof defaultWhyChooseContent & {
  commitmentBadges?: TextItem[];
  expectationPoints?: TextItem[];
  heroImage?: HeroImage;
  reasons?: Reason[];
};

export default function WhyChooseClient({
  pageData: initialPageData,
}: {
  pageData: WhyChoosePageData;
}) {
  const livePageData = useLivePreviewPageData("why-choose", initialPageData);
  const pageData = {
    ...defaultWhyChooseContent,
    ...livePageData,
    reasons: livePageData.reasons?.length ? livePageData.reasons : defaultReasons,
    expectationPoints:
      livePageData.expectationPoints?.length
        ? livePageData.expectationPoints
        : defaultExpectationPoints.map((text) => ({ text })),
    commitmentBadges:
      livePageData.commitmentBadges?.length
        ? livePageData.commitmentBadges
        : [{ text: "Authorised Partner" }, { text: "Ethical Service" }, { text: "Student-Focused" }],
  };
  const heroImage =
    typeof pageData.heroImage === "string"
      ? pageData.heroImage
      : pageData.heroImage?.url || heroCampus.src;

  return (
    <div>
      <section className="relative overflow-hidden py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.72)_0%,rgba(15,23,42,0.84)_100%)]" />
        <div className="container relative z-10">
          <Reveal className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              {pageData.heroTitle || defaultWhyChooseContent.heroTitle}
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              {pageData.heroSubtitle || defaultWhyChooseContent.heroSubtitle}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.reasons.map((reason, index) => {
              const fallbackIcon = defaultReasons[index]?.icon ?? Shield;
              const Icon = resolveSiteIcon(reason.icon ?? reason.iconName, fallbackIcon);

              return (
                <Reveal
                  key={reason.id ?? reason.title}
                  delay={index * 70}
                  className="motion-card bg-card p-8 rounded-lg card-shadow"
                >
                  <div className="w-14 h-14 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                    <Icon className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                {pageData.expectationsTitle}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {pageData.expectationsBody}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pageData.expectationPoints.map((point, index) => (
                  <div key={point.id ?? `${point.text}-${index}`} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-foreground">{point.text}</span>
                  </div>
                ))}
              </div>
              </div>
            </Reveal>
            <Reveal delay={110} className="motion-card bg-card p-8 rounded-lg card-shadow">
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-6 w-6 text-accent fill-accent" />
                ))}
              </div>
              <blockquote className="text-lg text-foreground italic mb-6 leading-relaxed">
                {pageData.testimonialQuote}
              </blockquote>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">— {pageData.testimonialAuthor}</p>
                <p className="text-sm text-muted-foreground">{pageData.testimonialRole}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Users className="h-16 w-16 text-secondary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              {pageData.commitmentTitle}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {pageData.commitmentBody}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {pageData.commitmentBadges.map((badge, index) => (
                <Reveal
                  key={badge.id ?? `${badge.text}-${index}`}
                  delay={index * 60}
                  className="motion-chip flex items-center gap-2 rounded-full bg-muted px-4 py-2"
                >
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">{badge.text}</span>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              {pageData.ctaTitle}
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">{pageData.ctaBody}</p>
            <Button variant="hero" size="lg" asChild>
              <Link href={pageData.ctaPrimaryHref || "/contact"}>
                {pageData.ctaPrimaryLabel || "Contact Us Now"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
