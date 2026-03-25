import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { defaultSiteSettings } from "@/lib/site-settings";

type FooterProps = {
  siteSettings?: typeof defaultSiteSettings;
};

export function Footer({ siteSettings = defaultSiteSettings }: FooterProps) {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center border border-primary-foreground/20">
                <span className="text-primary-foreground font-display font-bold text-xl">EP</span>
              </div>
              <div>
                <div className="font-display font-bold text-xl">{siteSettings.siteShortName}</div>
                <div className="text-xs opacity-70">{siteSettings.siteSuffix}</div>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-6">
              {siteSettings.footerDescription}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="opacity-60">In partnership with</span>
              <span className="font-semibold">{siteSettings.footerPartnerLabel}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {siteSettings.footerQuickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              {siteSettings.footerResourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all"
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
                  className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all inline-flex items-center gap-1"
                >
                  {siteSettings.footerExternalLabel}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 opacity-60 mt-0.5 flex-shrink-0" />
                <span className="text-sm opacity-80">
                  {siteSettings.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 opacity-60 flex-shrink-0" />
                <a href={`tel:${siteSettings.contactPhone}`} className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all">
                  {siteSettings.contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 opacity-60 flex-shrink-0" />
                <a href={`mailto:${siteSettings.contactEmail}`} className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all">
                  {siteSettings.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-60">
            <p>© {new Date().getFullYear()} {siteSettings.siteTitle}. All rights reserved.</p>
            <p className="text-xs">
              {siteSettings.footerDisclaimer}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
