import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { footerLinks, contactInfo, brand } from "../../data/site";
import { BrandLogo } from "../ui/BrandLogo";

export function Footer() {
  return (
    <footer className="bg-ink text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 safe-bottom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandLogo size="sm" light />
            <p className="text-sm leading-relaxed text-white/55 mt-5 mb-4 max-w-xs font-medium">
              {brand.tagline}. Homemade lasagna & baked macaroni from Puncak Alam.
            </p>
            <a
              href={brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/50 hover:text-tomato transition-colors font-semibold"
            >
              {contactInfo.instagramHandle}
            </a>
          </div>

          {[
            { title: "Links", links: footerLinks.company },
            { title: "Info", links: footerLinks.support },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="font-display font-bold text-base text-white mb-4 uppercase tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-sm text-white/55 hover:text-tomato transition-colors font-medium"
                      >
                        {link.label}
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="group inline-flex items-center gap-1 text-sm text-white/55 hover:text-tomato transition-colors font-medium"
                      >
                        {link.label}
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-display font-bold text-base text-white mb-4 uppercase tracking-wide">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-white/55 font-medium">
              <li>{contactInfo.location}</li>
              <li>{contactInfo.hours}</li>
              <li>
                <a href={contactInfo.whatsapp} className="hover:text-tomato transition-colors">
                  WhatsApp to order
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-white/35 font-medium">
          <p>&copy; {new Date().getFullYear()} The Creamy Pasta Co. {brand.byline}</p>
        </div>
      </div>
    </footer>
  );
}
