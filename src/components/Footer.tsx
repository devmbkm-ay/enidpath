"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink, Clock } from "lucide-react";
import { defaultSiteSettings } from "@/lib/site-settings";

type FooterProps = {
  siteSettings?: typeof defaultSiteSettings;
};

export function Footer({ siteSettings = defaultSiteSettings }: FooterProps) {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-18 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:gap-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/logo_enidpath-tight.png"
                alt="EnidPath International"
                width={1039}
                height={337}
                sizes="180px"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="mb-6 max-w-sm text-sm leading-7 text-primary-foreground/78">
              {siteSettings.footerDescription}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/12 bg-primary-foreground/5 px-4 py-2 text-xs">
              <span className="text-primary-foreground/55">In partnership with</span>
              <span className="font-semibold text-primary-foreground">{siteSettings.footerPartnerLabel}</span>
            </div>
            <div className="mt-6 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary-foreground">
                <Clock className="h-4 w-4 text-accent" />
                Office Hours
              </div>
              <div className="space-y-2 text-sm text-primary-foreground/72">
                {siteSettings.officeHours.map((item) => (
                  <p key={item.text}>{item.text}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-display font-semibold text-primary-foreground">Quick Links</h3>
            <ul className="space-y-3.5">
              {siteSettings.footerQuickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="motion-link text-sm text-primary-foreground/74 transition-all hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-6 text-lg font-display font-semibold text-primary-foreground">Resources</h3>
            <ul className="space-y-3.5">
              {siteSettings.footerResourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="motion-link text-sm text-primary-foreground/74 transition-all hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={siteSettings.footerExternalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="motion-link inline-flex items-center gap-1 text-sm text-primary-foreground/74 transition-all hover:text-accent"
                >
                  {siteSettings.footerExternalLabel}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-display font-semibold text-primary-foreground">Contact Us</h3>
            <ul className="space-y-4.5">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent/90" />
                <span className="text-sm leading-7 text-primary-foreground/74">
                  {siteSettings.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-accent/90" />
                <a href={`tel:${siteSettings.contactPhone}`} className="motion-link text-sm text-primary-foreground/74 transition-all hover:text-accent">
                  {siteSettings.contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-accent/90" />
                <a href={`mailto:${siteSettings.contactEmail}`} className="motion-link text-sm text-primary-foreground/74 transition-all hover:text-accent">
                  {siteSettings.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10 bg-primary/70">
        <div className="container py-6">
          <div className="flex flex-col gap-3 text-center text-sm text-primary-foreground/58 md:flex-row md:items-center md:justify-between md:text-left">
            <p>© {new Date().getFullYear()} {siteSettings.siteTitle}. All rights reserved.</p>
            <p className="max-w-2xl text-xs leading-6 md:text-right">
              {siteSettings.footerDisclaimer}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
