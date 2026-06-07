import { MapPin, Clock, MessageCircle } from "lucide-react";
import { SocialIcon } from "../ui/SocialIcon";
import { contactInfo, brand } from "../../data/site";
import { SectionHeader, SectionWrapper } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { ScrollReveal } from "../ui/ScrollReveal";

const contactRows = [
  {
    icon: MapPin,
    label: "Location",
    value: contactInfo.location,
  },
  {
    icon: Clock,
    label: "Hours",
    value: contactInfo.hours,
  },
  {
    icon: "instagram" as const,
    label: "Instagram",
    value: contactInfo.instagramHandle,
    href: brand.instagram,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: contactInfo.whatsappEnquiryNote,
    href: contactInfo.whatsapp,
    linkLabel: contactInfo.whatsappLabel,
  },
];

export function Contact() {
  return (
    <SectionWrapper id="contact" className="section-alt">
      <SectionHeader
        eyebrow="Contact"
        title="Get in Touch"
        description={contactInfo.orderNote}
        accent="green"
      />

      <ScrollReveal className="max-w-xl mx-auto">
        <GlassCard className="premium-shadow-lg overflow-hidden">
          <ul className="divide-y divide-linen">
            {contactRows.map((row) => (
              <li key={row.label} className="flex items-start gap-4 px-5 sm:px-6 py-5">
                <div className="p-2.5 rounded-xl bg-tomato/10 text-tomato shrink-0">
                  {row.icon === "instagram" ? (
                    <SocialIcon platform="instagram" size={18} />
                  ) : (
                    <row.icon size={18} />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1">
                    {row.label}
                  </p>
                  {"href" in row && row.href ? (
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-bold text-ink hover:text-tomato transition-colors"
                    >
                      {"linkLabel" in row && row.linkLabel
                        ? row.linkLabel
                        : row.value}
                    </a>
                  ) : (
                    <p className="text-sm sm:text-base font-bold text-ink">{row.value}</p>
                  )}
                  {"linkLabel" in row && row.linkLabel && (
                    <p className="text-sm text-muted mt-1 leading-relaxed">{row.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </GlassCard>
      </ScrollReveal>
    </SectionWrapper>
  );
}
