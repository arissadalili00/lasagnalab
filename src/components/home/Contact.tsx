import { MapPin, Clock, MessageCircle } from "lucide-react";
import { SocialIcon } from "../ui/SocialIcon";
import { motion } from "framer-motion";
import { contactInfo, brand } from "../../data/site";
import { SectionHeader, SectionWrapper } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { ScrollReveal } from "../ui/ScrollReveal";
import { Button } from "../ui/Button";

export function Contact() {
  return (
    <SectionWrapper id="contact" className="section-alt">
      <SectionHeader
        eyebrow="Order Now"
        title="Get In Touch"
        description="Pre-order via WhatsApp — no calls. We'll confirm your order and pickup time."
        accent="green"
      />

      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
        <ScrollReveal>
          <GlassCard className="premium-shadow-lg text-center py-10">
            <div className="inline-flex p-4 rounded-2xl bg-tomato/10 mb-6">
              <MessageCircle size={32} className="text-tomato" />
            </div>
            <h3 className="font-display font-bold text-2xl text-ink mb-2">
              WhatsApp to Order
            </h3>
            <p className="text-muted mb-6 max-w-sm mx-auto font-medium">
              {contactInfo.orderNote}. Tell us your choice of beef or chicken,
              size, and quantity.
            </p>
            <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="shadow-[0_8px_32px_rgba(242,92,5,0.35)]">
                <MessageCircle size={20} />
                {contactInfo.whatsappLabel}
              </Button>
            </a>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="space-y-4">
          {[
            { icon: MapPin, label: "Location", value: contactInfo.location },
            { icon: Clock, label: "Hours", value: contactInfo.hours },
            { label: "Instagram", value: contactInfo.instagramHandle, isInstagram: true },
          ].map((item) => (
            <motion.div key={item.label} whileHover={{ x: 4 }}>
              <GlassCard className="flex items-start gap-4 premium-shadow">
                <div className="p-3 rounded-xl bg-tomato/10 text-tomato shrink-0">
                  {"icon" in item && item.icon ? (
                    <item.icon size={20} />
                  ) : (
                    <SocialIcon platform="instagram" size={20} />
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted font-semibold">{item.label}</p>
                  {item.label === "Instagram" ? (
                    <a
                      href={brand.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-ink hover:text-tomato transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-bold text-ink">{item.value}</p>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
