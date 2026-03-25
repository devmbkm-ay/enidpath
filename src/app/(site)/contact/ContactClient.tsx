"use client";

import { useState } from "react";
import {
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useLivePreviewGlobalData,
  useLivePreviewPageData,
} from "@/components/LivePreviewProvider";

export const defaultContactContent = {
  heroTitle: "Contact Us",
  heroSubtitle:
    "Ready to start your educational journey? Get in touch with our team for personalised guidance and support.",
  formTitle: "Send Us a Message",
  formSubtitle:
    "Fill out the form below and our team will get back to you within 24 hours.",
  contactInfoTitle: "Get in Touch",
  contactInfoSubtitle:
    "Reach out to us through any of the following channels. We're here to help!",
  whatsappTitle: "Quick Response via WhatsApp",
  whatsappBody:
    "For faster responses, reach out to us on WhatsApp. We typically respond within minutes during office hours.",
  trustBannerText:
    "is an authorised recruitment and student support partner of Online Business School (UK). We provide guidance and support services-all academic programmes are delivered by OBS.",
};

type SiteSettings = {
  address?: string;
  contactPhone?: string;
  contactEmail?: string;
  whatsappNumber?: string;
  officeHours?: { text?: string }[];
};

type ContactPageData = typeof defaultContactContent;

type ContactClientProps = {
  pageData: ContactPageData;
  siteSettings: SiteSettings;
};

export default function ContactClient({
  pageData,
  siteSettings,
}: ContactClientProps) {
  const livePageData = useLivePreviewPageData("contact", pageData);
  const liveSiteSettings = useLivePreviewGlobalData("SiteSettings", siteSettings);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Thank you for your enquiry! We will get back to you shortly.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Location",
      details: [liveSiteSettings.address || "Kampala, Uganda"],
      description: "Visit us for in-person consultations",
    },
    {
      icon: Phone,
      title: "Phone & WhatsApp",
      details: [liveSiteSettings.contactPhone || "+256 700 000 000"],
      description: "Call or WhatsApp for quick responses",
    },
    {
      icon: Mail,
      title: "Email",
      details: [liveSiteSettings.contactEmail || "info@enidpath.com"],
      description: "For detailed enquiries and documentation",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: (
        liveSiteSettings.officeHours || [
          { text: "Mon - Fri: 9:00 AM - 6:00 PM" },
          { text: "Sat: 9:00 AM - 1:00 PM" },
        ]
      ).map((item) => item.text || "").filter(Boolean),
      description: "We're here to help",
    },
  ];

  return (
    <div>
      <section className="bg-primary py-20">
        <div className="container">
          <Reveal className="max-w-3xl">
            <h1 className="mb-6 text-4xl font-display font-bold text-primary-foreground md:text-5xl">
              {livePageData.heroTitle || defaultContactContent.heroTitle}
            </h1>
            <p className="text-xl leading-relaxed text-primary-foreground/90">
              {livePageData.heroSubtitle || defaultContactContent.heroSubtitle}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-2">
            <Reveal className="motion-card rounded-2xl bg-card/60 p-8 shadow-sm">
              <div>
              <h2 className="mb-2 text-2xl font-display font-bold text-foreground">
                {livePageData.formTitle || defaultContactContent.formTitle}
              </h2>
              <p className="mb-8 text-muted-foreground">
                {livePageData.formSubtitle || defaultContactContent.formSubtitle}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone / WhatsApp</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+256 700 000 000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your educational goals and how we can assist you..."
                  />
                </div>

                <Button type="submit" variant="accent" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div>
              <h2 className="mb-2 text-2xl font-display font-bold text-foreground">
                {livePageData.contactInfoTitle || defaultContactContent.contactInfoTitle}
              </h2>
              <p className="mb-8 text-muted-foreground">
                {livePageData.contactInfoSubtitle ||
                  defaultContactContent.contactInfoSubtitle}
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Reveal
                    key={info.title}
                    delay={index * 70}
                    className="motion-card flex gap-4 rounded-lg bg-muted p-6"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                      <info.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">{info.title}</h3>
                      {info.details.map((detail) => (
                        <p key={detail} className="font-medium text-foreground">
                          {detail}
                        </p>
                      ))}
                      <p className="mt-1 text-sm text-muted-foreground">
                        {info.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="motion-card mt-8 rounded-lg border border-green-200 bg-green-50 p-6">
                <div className="flex items-start gap-4">
                  <MessageCircle className="h-8 w-8 flex-shrink-0 text-green-600" />
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">
                      {livePageData.whatsappTitle || defaultContactContent.whatsappTitle}
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {livePageData.whatsappBody || defaultContactContent.whatsappBody}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={`https://wa.me/${liveSiteSettings.whatsappNumber || "256700000000"}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Chat on WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-muted py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-6 text-center md:flex-row">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <p className="max-w-2xl text-muted-foreground">
              <span className="font-semibold text-foreground">
                EnidPath International
              </span>{" "}
              {livePageData.trustBannerText || defaultContactContent.trustBannerText}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
