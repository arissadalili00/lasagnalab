import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { User, Mail, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { brand } from "../data/site";
import { Button } from "../components/ui/Button";
import { BrandLogo } from "../components/ui/BrandLogo";

const inputClass =
  "w-full py-3.5 pl-11 pr-4 rounded-xl bg-cream border border-linen text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-tomato/40 focus:border-tomato/60 transition-all";

export function LoginPage() {
  const { login } = useAuth();
  const [shortName, setShortName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!shortName.trim() || !email.trim()) return;
    login(shortName, email);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-cream-dark">
      {/* Left: hero image */}
      <div className="lg:flex-[1.15] relative flex flex-col justify-end p-8 sm:p-10 lg:p-14 overflow-hidden min-h-[42vh] lg:min-h-screen">
        <div
          className="absolute inset-0 z-0 scale-105"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=1200&q=80")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-burgundy-dark via-burgundy/75 to-burgundy/35" />

        <div className="relative z-10 max-w-lg">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-tomato-light text-sm font-bold uppercase tracking-[0.18em] mb-3"
          >
            Fresh from jijah&apos;s kitchen
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-extrabold text-white leading-[1.15] mb-4 drop-shadow-sm"
          >
            {brand.tagline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/85 text-base sm:text-lg leading-relaxed max-w-md"
          >
            Small-batch lasagna and baked macaroni — made fresh to order, layer
            by layer.
          </motion.p>
        </div>
      </div>

      {/* Right: form */}
      <div className="lg:flex-[0.85] flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-cream-dark border-t lg:border-t-0 lg:border-l border-linen/80">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full max-w-[420px]"
        >
          <BrandLogo size="md" asLink={false} className="mb-8" />

          <div className="mb-8">
            <h2 className="text-3xl sm:text-[2rem] font-display font-bold text-ink mb-2">
              Welcome
            </h2>
            <p className="text-ink/70 text-sm sm:text-[15px] leading-relaxed">
              Enter your name and email to start ordering. Your receipt will be
              emailed automatically after checkout.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-linen bg-cream p-6 sm:p-7 shadow-[0_8px_30px_rgba(28,20,18,0.06)]">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="shortName"
                  className="block text-sm font-semibold text-ink mb-2"
                >
                  Short Name
                </label>
                <div className="relative">
                  <User
                    size={18}
                    strokeWidth={2}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/45 pointer-events-none"
                  />
                  <input
                    id="shortName"
                    type="text"
                    required
                    placeholder="e.g. Ali, Sarah"
                    value={shortName}
                    onChange={(e) => setShortName(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-semibold text-ink mb-2"
                >
                  Email{" "}
                  <span className="font-normal text-ink/55">
                    (for order receipt)
                  </span>
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    strokeWidth={2}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/45 pointer-events-none"
                  />
                  <input
                    id="login-email"
                    type="email"
                    required
                    placeholder="e.g. you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full min-h-[52px] mt-2 rounded-xl premium-shadow"
              >
                Enter Store
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Button>
            </form>
          </div>

          <div className="mt-6 flex items-center gap-2.5 px-1">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green" />
            </span>
            <p className="text-xs sm:text-[13px] text-ink/65 font-medium">
              {brand.orderNote}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
