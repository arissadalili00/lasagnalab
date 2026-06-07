import { Quote } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import { SectionHeader, SectionWrapper } from "../ui/SectionHeader";
import { RatingStars } from "../ui/RatingStars";
import { ScrollReveal } from "../ui/ScrollReveal";

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials" className="section-dark overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[60%] rounded-full bg-tomato/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[50%] rounded-full bg-burgundy-light/30 blur-[80px]" />
      </div>

      <SectionHeader
        eyebrow="Real Reviews"
        title="What Customers Say"
        description="Genuine messages from our pre-order customers — shared anonymously with love."
        light
        align="center"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {testimonials.map((testimonial, index) => (
          <ScrollReveal key={testimonial.id} delay={index * 0.05}>
            <article className="group h-full rounded-[1.25rem] border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 hover:bg-white/10 hover:border-tomato/30 transition-all duration-300">
              <div className="flex items-center justify-between gap-3 mb-4">
                <RatingStars rating={testimonial.rating} />
                <Quote
                  size={28}
                  className="text-white/15 group-hover:text-tomato/40 transition-colors shrink-0"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-white/90 text-sm sm:text-[15px] leading-relaxed font-medium">
                &ldquo;{testimonial.review}&rdquo;
              </p>
              <p className="mt-4 pt-4 border-t border-white/10 text-[11px] font-semibold uppercase tracking-wider text-white/45">
                Verified customer
              </p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
