import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { contactInfo } from "../../data/site";
import { ScrollReveal } from "../ui/ScrollReveal";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-gradient-to-b from-green/5 to-transparent dark:from-green/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <span className="text-green font-medium text-sm uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-4">
            Contact Us
          </h2>
          <p className="text-olive/70 dark:text-cream/70 max-w-2xl mx-auto">
            Have a question or special request? We&apos;d love to hear from you.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8">
          <ScrollReveal className="lg:col-span-3">
            <GlassCard>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-olive/10 dark:border-cream/10 bg-white/50 dark:bg-olive/30 focus:outline-none focus:ring-2 focus:ring-tomato transition-shadow"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-olive/10 dark:border-cream/10 bg-white/50 dark:bg-olive/30 focus:outline-none focus:ring-2 focus:ring-tomato transition-shadow"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-olive/10 dark:border-cream/10 bg-white/50 dark:bg-olive/30 focus:outline-none focus:ring-2 focus:ring-tomato transition-shadow resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  <Send size={18} />
                  Send Message
                </Button>

                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-green font-medium"
                    >
                      <CheckCircle size={18} />
                      Message sent! We&apos;ll get back to you soon.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="lg:col-span-2 space-y-4">
            {[
              { icon: Phone, label: "Phone", value: contactInfo.phone },
              { icon: Mail, label: "Email", value: contactInfo.email },
              { icon: MapPin, label: "Address", value: contactInfo.address },
            ].map((item) => (
              <GlassCard key={item.label} className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-tomato/10 text-tomato shrink-0">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-sm text-olive/60 dark:text-cream/60">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </GlassCard>
            ))}

            <GlassCard>
              <p className="text-sm text-olive/60 dark:text-cream/60 mb-3">
                Follow Us
              </p>
              <div className="flex flex-wrap gap-3">
                {contactInfo.social.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-tomato/10 text-tomato text-sm font-medium hover:bg-tomato hover:text-cream transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
