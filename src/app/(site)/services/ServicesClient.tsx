"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  FileText,
  GraduationCap,
  HeadphonesIcon,
  MessageCircle,
  UserCheck,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { resolveSiteIcon } from "@/lib/site-icons";
import { useLivePreviewPageData } from "@/components/LivePreviewProvider";

export const defaultServicesContent = {
  heroTitle: "Our Services",
  heroSubtitle:
    "Comprehensive student support services designed to guide you from initial enquiry through graduation and beyond.",
  serviceNoteText:
    "provides recruitment and student support services in partnership with Online Business School (UK). All academic programmes are delivered by OBS.",
  servicesSectionTitle: "How We Support You",
  servicesSectionSubtitle:
    "From your first enquiry to graduation, we are here to help every step of the way.",
  processSectionTitle: "Your Journey With Us",
  processSectionSubtitle: "A simple, supported path from enquiry to enrolment.",
  ctaTitle: "Ready to Get Started?",
  ctaBody:
    "Contact us today to learn more about our services and how we can support your educational journey.",
  ctaPrimaryLabel: "Contact Us Today",
  ctaPrimaryHref: "/contact",
};

const defaultServiceCards = [
  {
    iconName: "message-circle",
    icon: MessageCircle,
    title: "Enquiry Support",
    description:
      "Have questions about studying with Online Business School? We provide comprehensive answers about programmes, requirements, costs, and more.",
    features: [
      { text: "Programme information and guidance" },
      { text: "Eligibility assessment" },
      { text: "Timeline and process overview" },
      { text: "Responsive communication channels" },
    ],
  },
  {
    iconName: "graduation-cap",
    icon: GraduationCap,
    title: "Course & Career Counselling",
    description:
      "Receive personalised advice to help you choose the right programme based on your career goals, background, and aspirations.",
    features: [
      { text: "Career pathway analysis" },
      { text: "Programme recommendations" },
      { text: "Skills assessment" },
      { text: "Goal-oriented guidance" },
    ],
  },
  {
    iconName: "credit-card",
    icon: CreditCard,
    title: "Financial Guidance",
    description:
      "We help you understand costs, payment options, and financial planning for your education journey.",
    features: [
      { text: "Fee structure explanation" },
      { text: "Payment plan options" },
      { text: "Budget planning support" },
      { text: "Financial advice" },
    ],
  },
  {
    iconName: "file-text",
    icon: FileText,
    title: "Application & Document Support",
    description:
      "Get assistance with your application to ensure everything is complete, accurate, and submitted correctly.",
    features: [
      { text: "Application form assistance" },
      { text: "Document checklist guidance" },
      { text: "Submission support" },
      { text: "Follow-up coordination" },
    ],
  },
  {
    iconName: "user-check",
    icon: UserCheck,
    title: "Admission Support",
    description:
      "We guide you through the admission process and help address any requirements or queries that arise.",
    features: [
      { text: "Admission process guidance" },
      { text: "Requirements clarification" },
      { text: "Communication liaison" },
      { text: "Status tracking" },
    ],
  },
  {
    iconName: "headphones",
    icon: HeadphonesIcon,
    title: "Post-Admission Support",
    description:
      "Our support continues after admission. We help you navigate your studies and address any challenges you may face.",
    features: [
      { text: "Onboarding assistance" },
      { text: "Ongoing student support" },
      { text: "Issue resolution" },
      { text: "Progress guidance" },
    ],
  },
];

const defaultProcessSteps = [
  { step: "01", title: "Enquire", description: "Reach out to us with your questions and interests." },
  { step: "02", title: "Consult", description: "Receive personalised guidance on the right programme." },
  { step: "03", title: "Apply", description: "Get support with your application to OBS." },
  { step: "04", title: "Succeed", description: "Begin your studies with ongoing support." },
];

type TextItem = {
  id?: string;
  text?: string;
};

type ServiceCard = {
  description?: string;
  features?: TextItem[];
  icon?: string;
  iconName?: string;
  id?: string;
  title?: string;
};

type ProcessStep = {
  description?: string;
  step?: string;
  title?: string;
};

type ServicesPageData = typeof defaultServicesContent & {
  processSteps?: ProcessStep[];
  serviceCards?: ServiceCard[];
};

export default function ServicesClient({
  pageData: initialPageData,
}: {
  pageData: ServicesPageData;
}) {
  const livePageData = useLivePreviewPageData("services", initialPageData);
  const pageData = {
    ...defaultServicesContent,
    ...livePageData,
    serviceCards: livePageData.serviceCards?.length ? livePageData.serviceCards : defaultServiceCards,
    processSteps: livePageData.processSteps?.length ? livePageData.processSteps : defaultProcessSteps,
  };

  return (
    <div>
      <section className="bg-primary py-20">
        <div className="container">
          <Reveal className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              {pageData.heroTitle || defaultServicesContent.heroTitle}
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              {pageData.heroSubtitle || defaultServicesContent.heroSubtitle}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted border-b border-border py-6">
        <div className="container">
          <div className="flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
            <p className="text-foreground">
              <span className="font-medium">EnidPath International</span> {pageData.serviceNoteText}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <Reveal className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              {pageData.servicesSectionTitle}
            </h2>
            <p className="text-muted-foreground text-lg">{pageData.servicesSectionSubtitle}</p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.serviceCards.map((service, index) => {
              const fallbackIcon = defaultServiceCards[index]?.icon ?? MessageCircle;
              const Icon = resolveSiteIcon(service.icon ?? service.iconName, fallbackIcon);

              return (
                <Reveal
                  key={service.id ?? service.title}
                  delay={index * 70}
                  className="motion-card bg-card p-8 rounded-lg card-shadow"
                >
                  <div className="w-14 h-14 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                    <Icon className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features?.map((feature, featureIndex) => (
                      <li
                        key={feature.id ?? `${feature.text}-${featureIndex}`}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-foreground">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container">
          <Reveal className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              {pageData.processSectionTitle}
            </h2>
            <p className="text-muted-foreground text-lg">{pageData.processSectionSubtitle}</p>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-8">
            {pageData.processSteps.map((item, index) => (
              <Reveal key={item.step} delay={index * 80} className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center mx-auto mb-6 font-display font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                )}
              </Reveal>
            ))}
          </div>
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
                {pageData.ctaPrimaryLabel || "Contact Us Today"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
