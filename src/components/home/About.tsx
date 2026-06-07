import { Target, Eye, Heart } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";
import { GlassCard } from "../ui/GlassCard";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="right">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=700&h=500&fit=crop"
                alt="Chef preparing lasagna in kitchen"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-olive/40 to-transparent" />
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <span className="text-tomato font-medium text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-6">
                About LasagnaLab
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-olive/80 dark:text-cream/80 leading-relaxed mb-6">
                Born from a passion for authentic Italian cuisine, LasagnaLab
                started in a small kitchen in Little Italy, New York. Our founder,
                Chef Marco Bellini, spent years perfecting family recipes passed
                down through generations before sharing them with the world.
              </p>
              <p className="text-olive/80 dark:text-cream/80 leading-relaxed mb-8">
                Today, we operate 15 branches across the country, each committed
                to the same standards: premium ingredients, handcrafted layers,
                and the warmth of a home-cooked Italian meal.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: Heart,
                  title: "Mission",
                  text: "Bring authentic Italian lasagna to every home with uncompromising quality.",
                },
                {
                  icon: Target,
                  title: "Vision",
                  text: "Become the world's most trusted premium lasagna brand by 2030.",
                },
                {
                  icon: Eye,
                  title: "Values",
                  text: "Freshness, authenticity, and joy in every single bite we serve.",
                },
              ].map((item, index) => (
                <ScrollReveal key={item.title} delay={0.2 + index * 0.1}>
                  <GlassCard className="text-center h-full">
                    <item.icon size={24} className="text-tomato mx-auto mb-2" />
                    <h3 className="font-display font-semibold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-olive/70 dark:text-cream/70">
                      {item.text}
                    </p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
