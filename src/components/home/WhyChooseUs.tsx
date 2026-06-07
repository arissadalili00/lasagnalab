import { Leaf, Truck, Award, ChefHat } from "lucide-react";
import { whyChooseUs } from "../../data/site";
import { SectionHeader, SectionWrapper } from "../ui/SectionHeader";
import { ScrollReveal } from "../ui/ScrollReveal";

const iconMap = { leaf: Leaf, truck: Truck, award: Award, chef: ChefHat };

export function WhyChooseUs() {
  return (
    <SectionWrapper className="bg-cream">
      <SectionHeader
        eyebrow="Why Choose Us"
        title="Made With Care, Every Tray"
        description="Small-batch homemade pasta baked fresh for every pre-order — the creamy difference you can taste."
        accent="green"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
        {whyChooseUs.map((item, index) => {
          const Icon = iconMap[item.icon];
          return (
            <ScrollReveal key={item.id} delay={index * 0.08}>
              <div className="surface-card p-6 h-full hover:-translate-y-1 hover:premium-shadow-lg transition-all duration-300 group">
                <div className="inline-flex p-3.5 rounded-2xl bg-tomato/10 text-tomato mb-5 group-hover:bg-tomato group-hover:text-white transition-colors">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h3 className="font-bold text-lg text-ink mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-ink/80 leading-relaxed font-semibold">{item.description}</p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
