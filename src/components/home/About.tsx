import { MapPin, Clock, MessageCircle } from "lucide-react";
import { SocialIcon } from "../ui/SocialIcon";
import { ScrollReveal } from "../ui/ScrollReveal";
import { SectionHeader, SectionWrapper } from "../ui/SectionHeader";
import { brand, contactInfo } from "../../data/site";

export function About() {
  return (
    <SectionWrapper id="about" className="bg-cream">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <ScrollReveal direction="right">
          <div className="relative rounded-[2rem] overflow-hidden premium-shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=800&h=600&q=80"
              alt="Fresh baked pasta trays"
              className="w-full h-[320px] sm:h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy/60 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 surface-card px-5 py-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-tomato">Our Kitchen</p>
              <p className="font-display font-bold text-ink">Puncak Alam, Selangor</p>
            </div>
          </div>
        </ScrollReveal>

        <div>
          <SectionHeader
            eyebrow="Our Story"
            title="The Creamy Pasta Co."
            align="left"
          />
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-tomato leading-relaxed mb-4 font-bold">{brand.byline}</p>
            <p className="text-ink/75 leading-relaxed mb-4 font-semibold">
              Born from a love of creamy, comforting pasta, The Creamy Pasta Co.
              serves homemade beef and chicken lasagna and baked macaroni from
              our kitchen in Puncak Alam.
            </p>
            <p className="text-ink/75 leading-relaxed mb-8 font-semibold">
              Every tray is baked fresh to order — never mass-produced. That&apos;s
              the creamy difference our customers keep coming back for.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: MapPin, label: "Location", value: brand.location },
              { icon: Clock, label: "Hours", value: brand.hours },
              { icon: MessageCircle, label: "Orders", value: "WhatsApp only" },
            ].map((item) => (
              <ScrollReveal key={item.label}>
                <div className="surface-card p-4 text-center hover:-translate-y-0.5 transition-transform">
                  <item.icon size={20} className="text-tomato mx-auto mb-2" />
                  <p className="text-[10px] text-muted uppercase tracking-wider mb-1 font-bold">
                    {item.label}
                  </p>
                  <p className="text-sm font-bold text-ink">{item.value}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3} className="mt-6">
            <a
              href={contactInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-tomato hover:text-tomato-dark transition-colors"
            >
              <SocialIcon platform="instagram" size={16} />
              Follow {contactInfo.instagramHandle}
            </a>
          </ScrollReveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
