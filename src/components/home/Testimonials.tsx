import { Quote } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import { ScrollReveal } from "../ui/ScrollReveal";
import { GlassCard } from "../ui/GlassCard";
import { RatingStars } from "../ui/RatingStars";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <span className="text-tomato font-medium text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-olive/70 dark:text-cream/70 max-w-2xl mx-auto">
            Join thousands of happy customers who trust LasagnaLab for their
            premium Italian dining experience.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 0.1}>
              <GlassCard hover className="h-full relative">
                <Quote
                  size={32}
                  className="text-tomato/20 absolute top-4 right-4"
                />
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-tomato/20"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-olive/60 dark:text-cream/60">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="mb-3">
                  <RatingStars rating={testimonial.rating} />
                </div>
                <p className="text-olive/80 dark:text-cream/80 leading-relaxed italic">
                  &ldquo;{testimonial.review}&rdquo;
                </p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
