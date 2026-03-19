import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const footerLinks = {
  quickLinks: [
    { name: "Home", href: "/" },
    { name: "About EnidPath", href: "/about" },
    { name: "Study with OBS", href: "/study" },
    { name: "Our Services", href: "/services" },
  ],
  resources: [
    { name: "Why Choose Us", href: "/why-choose" },
    { name: "Contact Us", href: "/contact" },
  ],
};

export function Footer() {
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
                <div className="font-display font-bold text-xl">EnidPath</div>
                <div className="text-xs opacity-70">International</div>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-6">
              Your trusted partner for accessing quality UK higher education. Authorised recruitment partner of Online Business School (UK).
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="opacity-60">In partnership with</span>
              <span className="font-semibold">Online Business School (UK)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.onlinebusinessschool.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all inline-flex items-center gap-1"
                >
                  Online Business School
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
                  Kampala, Uganda
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 opacity-60 flex-shrink-0" />
                <a href="tel:+256700000000" className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all">
                  +256 700 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 opacity-60 flex-shrink-0" />
                <a href="mailto:info@enidpath.com" className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all">
                  info@enidpath.com
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
            <p>© {new Date().getFullYear()} EnidPath International. All rights reserved.</p>
            <p className="text-xs">
              EnidPath International is an authorised recruitment partner and does not award degrees. All programmes are delivered by Online Business School (UK).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
