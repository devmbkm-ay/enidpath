"use client";

import Link from "next/link";
import heroCampus from "@/assets/hero-campus.jpg";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Globe,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { resolveSiteIcon } from "@/lib/site-icons";
import {
  useLivePreviewCollectionDocs,
  useLivePreviewPageData,
} from "@/components/LivePreviewProvider";

export const defaultStudyProgrammes = [
  {
    level: "BA Pathway",
    title: "Business Management Pathway",
    description:
      "Build a strong foundation in business principles and management practices with this comprehensive undergraduate pathway programme.",
    features: [
      { feature: "Foundation to degree-level progression" },
      { feature: "Business fundamentals and strategy" },
      { feature: "Leadership and management skills" },
      { feature: "Flexible online learning" },
    ],
  },
  {
    level: "MBA Pathway",
    title: "Master of Business Administration Pathway",
    description:
      "Advance your career with a prestigious MBA pathway programme designed for working professionals seeking leadership roles.",
    features: [
      { feature: "Advanced business strategy" },
      { feature: "Global leadership skills" },
      { feature: "Strategic management focus" },
      { feature: "Industry-relevant curriculum" },
    ],
  },
];

const defaultBenefits = [
  {
    iconName: "award",
    icon: Award,
    title: "UK Accredited",
    description:
      "Programmes regulated under OFQUAL and the Qualifications and Credit Framework (QCF).",
  },
  {
    iconName: "globe",
    icon: Globe,
    title: "Study Anywhere",
    description: "100% online delivery allows you to study from anywhere in the world.",
  },
  {
    iconName: "clock",
    icon: Clock,
    title: "Flexible Schedule",
    description: "Balance your studies with work and personal commitments.",
  },
  {
    iconName: "trending-up",
    icon: TrendingUp,
    title: "Career Progression",
    description: "Gain qualifications that open doors to career advancement.",
  },
];

export const defaultStudyContent: {
  aboutParagraphs: TextItem[];
  aboutTitle: string;
  affordabilityBody: string;
  affordabilityTitle: string;
  benefitsSectionSubtitle: string;
  benefitsSectionTitle: string;
  ctaPrimaryHref: string;
  ctaPrimaryLabel: string;
  ctaSecondaryHref: string;
  ctaSecondaryLabel: string;
  heroBadge: string;
  heroSubtitle: string;
  heroTitle: string;
  noticeBody: string;
  noticeTitle: string;
  programmesSectionSubtitle: string;
  programmesSectionTitle: string;
} = {
  heroBadge: "Delivered by Online Business School (UK)",
  heroTitle: "Study with Online Business School",
  heroSubtitle:
    "Access accredited UK BA and MBA pathway programmes through our partnership with Online Business School. Quality education made affordable and accessible.",
  noticeTitle: "All programmes are delivered and accredited by Online Business School (UK).",
  noticeBody:
    "EnidPath International provides recruitment, guidance, and student support services. We do not deliver or accredit programmes.",
  aboutTitle: "About Online Business School (UK)",
  aboutParagraphs: [
    {
      text: "Online Business School (UK) is a leading provider of online higher education programmes, offering flexible pathways to undergraduate and postgraduate qualifications. Their programmes are designed for ambitious individuals seeking quality UK education without the traditional constraints of location and schedule.",
    },
    {
      text: "Programmes offered by OBS are regulated under the Office of Qualifications and Examinations Regulation (OFQUAL) and follow the Qualifications and Credit Framework (QCF), ensuring recognition and quality assurance that meets UK standards.",
    },
    {
      text: "Through our partnership with OBS, EnidPath International helps international students access these programmes with comprehensive support throughout their educational journey.",
    },
  ],
  programmesSectionTitle: "Available Programmes",
  programmesSectionSubtitle:
    "Choose from BA and MBA pathway programmes designed to advance your career.",
  benefitsSectionTitle: "Why Choose OBS Programmes?",
  benefitsSectionSubtitle:
    "Quality, flexibility, and recognition combined in one educational pathway.",
  affordabilityTitle: "Affordable UK Education",
  affordabilityBody:
    "Complete your BA or MBA pathway programme for less than £6,000. Quality UK education that fits your budget.",
  ctaPrimaryLabel: "Get Pricing Details",
  ctaPrimaryHref: "/contact",
  ctaSecondaryLabel: "View Our Support Services",
  ctaSecondaryHref: "/services",
};

type TextItem = {
  feature?: string;
  id?: string;
  text?: string;
};

type HeroImage = {
  url?: string;
} | null | string;

type Programme = {
  description?: string;
  features?: TextItem[];
  id?: string | number;
  level?: string;
  title?: string;
};

type StudyBenefit = {
  description?: string;
  icon?: string;
  iconName?: string;
  id?: string;
  title?: string;
};

type StudyPageData = typeof defaultStudyContent & {
  aboutParagraphs?: TextItem[];
  heroImage?: HeroImage;
  studyBenefits?: StudyBenefit[];
};

export default function StudyClient({
  pageData: initialPageData,
  programmes,
}: {
  pageData: StudyPageData;
  programmes: Programme[];
}) {
  const livePageData = useLivePreviewPageData("study", initialPageData);
  const liveProgrammes = useLivePreviewCollectionDocs("Programmes", programmes);
  const displayProgrammes = liveProgrammes.length > 0 ? liveProgrammes : defaultStudyProgrammes;
  const pageData = {
    ...defaultStudyContent,
    ...livePageData,
    aboutParagraphs:
      livePageData.aboutParagraphs?.length
        ? livePageData.aboutParagraphs
        : defaultStudyContent.aboutParagraphs,
    studyBenefits:
      livePageData.studyBenefits?.length ? livePageData.studyBenefits : defaultBenefits,
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
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-2 mb-6">
              <GraduationCap className="h-4 w-4 text-accent" />
              <span className="text-sm text-primary-foreground">{pageData.heroBadge}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              {pageData.heroTitle}
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              {pageData.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-accent/10 border-y border-accent/20 py-6">
        <div className="container">
          <div className="flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground font-medium">{pageData.noticeTitle}</p>
              <p className="text-muted-foreground text-sm mt-1">{pageData.noticeBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">
              {pageData.aboutTitle}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {pageData.aboutParagraphs.map((paragraph, index) => (
                <p key={paragraph.id ?? `about-${index}`}>{paragraph.text}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              {pageData.programmesSectionTitle}
            </h2>
            <p className="text-muted-foreground text-lg">{pageData.programmesSectionSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {displayProgrammes.map((programme) => (
              <div
                key={programme.id ?? programme.title}
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
                  {programme.features?.map((featureObj) => (
                    <li key={featureObj.feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-foreground">{featureObj.feature}</span>
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

      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              {pageData.benefitsSectionTitle}
            </h2>
            <p className="text-muted-foreground text-lg">{pageData.benefitsSectionSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pageData.studyBenefits.map((benefit, index) => {
              const fallbackIcon = defaultBenefits[index]?.icon ?? Award;
              const Icon = resolveSiteIcon(benefit.icon ?? benefit.iconName, fallbackIcon);

              return (
                <div key={benefit.id ?? benefit.title} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              {pageData.affordabilityTitle}
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">{pageData.affordabilityBody}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link href={pageData.ctaPrimaryHref || "/contact"}>
                  {pageData.ctaPrimaryLabel || "Get Pricing Details"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {pageData.ctaSecondaryLabel && pageData.ctaSecondaryHref && (
                <Button variant="hero-outline" size="lg" asChild>
                  <Link href={pageData.ctaSecondaryHref}>{pageData.ctaSecondaryLabel}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
