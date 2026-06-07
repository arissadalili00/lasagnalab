import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { User, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { brand } from "../data/site";
import { Button } from "../components/ui/Button";
import { BrandLogo } from "../components/ui/BrandLogo";

const inputClass =
  "w-full px-4 py-3.5 rounded-xl border border-linen bg-surface text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-tomato/40 focus:border-tomato/30";

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
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <BrandLogo size="md" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Welcome</h1>
          <p className="text-muted text-sm">
            Enter your name and email to start ordering. Your receipt will be
            emailed automatically after checkout.
          </p>
        </div>

        <div className="bg-surface rounded-2xl border border-linen shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="shortName" className="block text-sm font-medium mb-1.5">
                Short Name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  id="shortName"
                  type="text"
                  required
                  placeholder="e.g. Ali, Sarah"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-email" className="block text-sm font-medium mb-1.5">
                Email <span className="text-muted font-normal">(for order receipt)</span>
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  id="login-email"
                  type="email"
                  required
                  placeholder="e.g. you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full min-h-[48px] mt-2">
              Enter Store
            </Button>
          </form>

          <p className="text-xs text-muted text-center mt-5">
            {brand.orderNote}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
