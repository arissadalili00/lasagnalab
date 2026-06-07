import { Quote } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import { SectionHeader, SectionWrapper } from "../ui/SectionHeader";
import { RatingStars } from "../ui/RatingStars";
import { ScrollReveal } from "../ui/ScrollReveal";

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials" className="section-alt">
      <SectionHeader
        eyebrow="Reviews"
        title="What Our Customers Say"
        description="Real reviews from our WhatsApp and Instagram customers across Selangor."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {testimonials.map((testimonial, index) => (
          <ScrollReveal key={testimonial.id} delay={index * 0.08}>
            <div className="surface-card p-6 sm:p-7 h-full relative hover:-translate-y-1 hover:premium-shadow-lg transition-all duration-300">
              <Quote size={36} className="absolute top-5 right-5 text-linen" strokeWidth={1.5} />
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-linen"
                />
                <div>
                  <h3 className="font-bold text-ink text-sm">{testimonial.name}</h3>
                  <p className="text-xs text-muted font-medium">{testimonial.location}</p>
                </div>
              </div>
              <div className="mb-3">
                <RatingStars rating={testimonial.rating} />
              </div>
              <p className="text-ink/75 text-sm leading-relaxed font-semibold">
                &ldquo;{testimonial.review}&rdquo;
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
