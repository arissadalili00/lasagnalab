import { Link } from "react-router-dom";
import { ChefHat } from "lucide-react";
import { footerLinks, contactInfo } from "../../data/site";
import { SocialIcon } from "../ui/SocialIcon";

const socialLinks = [
  { platform: "instagram" as const, href: contactInfo.social[0].href, label: "Instagram" },
  { platform: "facebook" as const, href: contactInfo.social[1].href, label: "Facebook" },
  { platform: "twitter" as const, href: contactInfo.social[2].href, label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="bg-olive text-cream/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-tomato text-cream">
                <ChefHat size={20} />
              </div>
              <span className="font-display text-xl font-bold text-cream">
                Lasagna<span className="text-tomato">Lab</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-cream/60 mb-4">
              Premium handcrafted lasagna made with authentic Italian recipes
              and the finest ingredients, delivered fresh to your door.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ platform, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-cream/10 hover:bg-tomato transition-colors"
                  aria-label={label}
                >
                  <SocialIcon platform={platform} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-cream mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-tomato transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-cream mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-tomato transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-cream mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li>{contactInfo.phone}</li>
              <li>{contactInfo.email}</li>
              <li className="text-cream/60">{contactInfo.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 text-center text-sm text-cream/50">
          <p>&copy; {new Date().getFullYear()} LasagnaLab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
