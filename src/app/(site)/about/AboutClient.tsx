"use client";

import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Globe,
  Heart,
  Lightbulb,
  Shield,
  Target,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { resolveSiteIcon } from "@/lib/site-icons";
import { useLivePreviewPageData } from "@/components/LivePreviewProvider";

export const defaultAboutContent: {
  heroSubtitle: string;
  heroTitle: string;
  missionBody: string;
  missionTitle: string;
  overviewParagraphs: TextItem[];
  overviewTitle: string;
  partnershipBody: string;
  partnershipButtonHref: string;
  partnershipButtonLabel: string;
  partnershipTitle: string;
  valuesSectionSubtitle: string;
  valuesSectionTitle: string;
  visionBody: string;
  visionTitle: string;
} = {
  heroTitle: "About EnidPath International",
  heroSubtitle:
    "Your trusted partner for accessing quality UK higher education. We guide and support international students on their journey to academic success.",
  overviewTitle: "Who We Are",
  overviewParagraphs: [
    {
      text: "EnidPath International is an authorised recruitment and student support partner of Online Business School (UK). We specialise in connecting ambitious international students with accredited UK higher education opportunities.",
    },
    {
      text: "Based in Uganda, we provide comprehensive guidance and support services to students seeking affordable, flexible, and quality education pathways. Our role is to simplify the journey from enquiry to graduation.",
    },
    {
      text: "We do not award degrees. All academic programmes are delivered and accredited by Online Business School (UK). Our expertise lies in student recruitment, application support, and ongoing assistance throughout your studies.",
    },
  ],
  missionTitle: "Our Mission",
  missionBody:
    "To empower international students by providing accessible pathways to quality UK higher education, offering comprehensive guidance and support at every stage of their educational journey.",
  visionTitle: "Our Vision",
  visionBody:
    "To become the leading student support partner in East Africa, known for transforming lives through quality education access and exceptional student services.",
  valuesSectionTitle: "Our Core Values",
  valuesSectionSubtitle: "These principles guide everything we do at EnidPath International.",
  partnershipTitle: "A Partnership Built on Trust",
  partnershipBody:
    "As an authorised partner of Online Business School (UK), we bridge the gap between aspiring students and quality UK education. Our partnership ensures that students receive proper guidance while accessing accredited programmes delivered by OBS.",
  partnershipButtonLabel: "Start Your Journey",
  partnershipButtonHref: "/contact",
};

const defaultCoreValues = [
  {
    iconName: "shield",
    icon: Shield,
    title: "Integrity",
    description:
      "We maintain the highest ethical standards in all our interactions with students, partners, and stakeholders.",
  },
  {
    iconName: "eye",
    icon: Eye,
    title: "Transparency",
    description:
      "We provide clear, honest information about programmes, costs, and the educational pathway to help students make informed decisions.",
  },
  {
    iconName: "users",
    icon: Users,
    title: "Student Focus",
    description:
      "Every decision we make is centred on student success and well-being, ensuring personalised support throughout your journey.",
  },
  {
    iconName: "target",
    icon: Target,
    title: "Professionalism",
    description:
      "We uphold professional standards in service delivery, maintaining quality and consistency in everything we do.",
  },
  {
    iconName: "lightbulb",
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We continuously improve our services and embrace new approaches to make quality education more accessible.",
  },
  {
    iconName: "globe",
    icon: Globe,
    title: "Social Responsibility",
    description:
      "We are committed to expanding access to quality education and contributing to community development.",
  },
];

type TextItem = {
  id?: string;
  text?: string;
};

type CoreValue = {
  description?: string;
  icon?: string;
  iconName?: string;
  id?: string;
  title?: string;
};

type AboutPageData = typeof defaultAboutContent & {
  coreValues?: CoreValue[];
  overviewParagraphs?: TextItem[];
};

export default function AboutClient({
  pageData: initialPageData,
}: {
  pageData: AboutPageData;
}) {
  const livePageData = useLivePreviewPageData("about", initialPageData);
  const pageData = {
    ...defaultAboutContent,
    ...livePageData,
    overviewParagraphs:
      livePageData.overviewParagraphs?.length
        ? livePageData.overviewParagraphs
        : defaultAboutContent.overviewParagraphs,
    coreValues: livePageData.coreValues?.length ? livePageData.coreValues : defaultCoreValues,
  };

  return (
    <div>
      <section className="bg-primary py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              {pageData.heroTitle || defaultAboutContent.heroTitle}
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              {pageData.heroSubtitle || defaultAboutContent.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                {pageData.overviewTitle}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {pageData.overviewParagraphs.map((paragraph, index) => (
                  <p key={paragraph.id ?? `overview-${index}`}>{paragraph.text}</p>
                ))}
              </div>
            </div>
            <div className="bg-muted rounded-lg p-8">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                      {pageData.missionTitle}
                    </h3>
                    <p className="text-muted-foreground">{pageData.missionBody}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Eye className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                      {pageData.visionTitle}
                    </h3>
                    <p className="text-muted-foreground">{pageData.visionBody}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              {pageData.valuesSectionTitle}
            </h2>
            <p className="text-muted-foreground text-lg">{pageData.valuesSectionSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.coreValues.map((value, index) => {
              const fallbackIcon = defaultCoreValues[index]?.icon ?? Shield;
              const Icon = resolveSiteIcon(value.icon ?? value.iconName, fallbackIcon);

              return (
                <div
                  key={value.id ?? value.title}
                  className="bg-card p-8 rounded-lg card-shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="h-12 w-12 text-secondary mx-auto mb-6" />
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              {pageData.partnershipTitle}
            </h2>
            <p className="text-muted-foreground mb-8">{pageData.partnershipBody}</p>
            <Button variant="accent" size="lg" asChild>
              <Link href={pageData.partnershipButtonHref || "/contact"}>
                {pageData.partnershipButtonLabel || "Start Your Journey"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
