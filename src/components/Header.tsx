"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { defaultSiteSettings } from "@/lib/site-settings";
import { cn } from "@/lib/utils";

type HeaderProps = {
  siteSettings?: typeof defaultSiteSettings;
};

export function Header({ siteSettings = defaultSiteSettings }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card shadow-soft">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${siteSettings.contactPhone}`}
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{siteSettings.contactPhone}</span>
            </a>
            <a
              href={`mailto:${siteSettings.contactEmail}`}
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">{siteSettings.contactEmail}</span>
            </a>
          </div>
          <div className="text-xs sm:text-sm">
            <span className="opacity-90">Authorised Partner of</span>
            <span className="font-semibold ml-1">{siteSettings.headerPartnerLabel}</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-xl">EP</span>
            </div>
            <div>
              <div className="font-display font-bold text-xl text-primary">
                {siteSettings.siteShortName}
              </div>
              <div className="text-xs text-muted-foreground">{siteSettings.siteSuffix}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {siteSettings.headerNavigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors rounded-md",
                  pathname === item.href
                    ? "text-secondary bg-secondary/10"
                    : "text-foreground hover:text-secondary hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="accent" asChild>
              <Link href="/contact">{siteSettings.headerCtaLabel}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {siteSettings.headerNavigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium transition-colors rounded-md",
                    pathname === item.href
                      ? "text-secondary bg-secondary/10"
                      : "text-foreground hover:text-secondary hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 px-4">
                <Button variant="accent" className="w-full" asChild>
                  <Link href="/contact">{siteSettings.headerCtaLabel}</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
