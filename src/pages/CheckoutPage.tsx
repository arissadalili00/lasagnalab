import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CreditCard,
  Wallet,
  Banknote,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import type { CheckoutFormData } from "../types";
import { Button } from "../components/ui/Button";
import { GlassCard } from "../components/ui/GlassCard";
import { ScrollReveal } from "../components/ui/ScrollReveal";

const initialForm: CheckoutFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zipCode: "",
  paymentMethod: "card",
  notes: "",
};

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, tax, deliveryFee, total, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof CheckoutFormData>(
    key: K,
    value: CheckoutFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    clearCart();
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="pt-28 pb-20 text-center">
        <div className="max-w-md mx-auto px-4">
          <h1 className="font-display text-3xl font-bold mb-4">
            Your cart is empty
          </h1>
          <p className="text-olive/70 dark:text-cream/70 mb-8">
            Add some lasagnas before checking out.
          </p>
          <Link to="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto px-4 text-center"
        >
          <div className="inline-flex p-4 rounded-full bg-green/10 text-green mb-6">
            <CheckCircle size={48} />
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">
            Order Confirmed!
          </h1>
          <p className="text-olive/70 dark:text-cream/70 mb-8">
            Thank you, {form.firstName}! Your lasagna is being prepared and will
            arrive within 30-45 minutes.
          </p>
          <Button onClick={() => navigate("/")} size="lg">
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-8">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-olive/70 dark:text-cream/70 hover:text-tomato transition-colors"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
          <h1 className="font-display text-4xl font-bold mt-4">Checkout</h1>
        </ScrollReveal>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <ScrollReveal>
                <GlassCard>
                  <h2 className="font-display text-xl font-semibold mb-5">
                    Customer Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1.5">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        required
                        value={form.firstName}
                        onChange={(e) => updateField("firstName", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-olive/10 dark:border-cream/10 bg-white/50 dark:bg-olive/30 focus:outline-none focus:ring-2 focus:ring-tomato"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1.5">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        required
                        value={form.lastName}
                        onChange={(e) => updateField("lastName", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-olive/10 dark:border-cream/10 bg-white/50 dark:bg-olive/30 focus:outline-none focus:ring-2 focus:ring-tomato"
                      />
                    </div>
                    <div>
                      <label htmlFor="checkoutEmail" className="block text-sm font-medium mb-1.5">
                        Email
                      </label>
                      <input
                        id="checkoutEmail"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-olive/10 dark:border-cream/10 bg-white/50 dark:bg-olive/30 focus:outline-none focus:ring-2 focus:ring-tomato"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-olive/10 dark:border-cream/10 bg-white/50 dark:bg-olive/30 focus:outline-none focus:ring-2 focus:ring-tomato"
                      />
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <GlassCard>
                  <h2 className="font-display text-xl font-semibold mb-5">
                    Delivery Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-1.5">
                        Street Address
                      </label>
                      <input
                        id="address"
                        required
                        value={form.address}
                        onChange={(e) => updateField("address", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-olive/10 dark:border-cream/10 bg-white/50 dark:bg-olive/30 focus:outline-none focus:ring-2 focus:ring-tomato"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-1.5">
                          City
                        </label>
                        <input
                          id="city"
                          required
                          value={form.city}
                          onChange={(e) => updateField("city", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-olive/10 dark:border-cream/10 bg-white/50 dark:bg-olive/30 focus:outline-none focus:ring-2 focus:ring-tomato"
                        />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium mb-1.5">
                          ZIP Code
                        </label>
                        <input
                          id="zipCode"
                          required
                          value={form.zipCode}
                          onChange={(e) => updateField("zipCode", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-olive/10 dark:border-cream/10 bg-white/50 dark:bg-olive/30 focus:outline-none focus:ring-2 focus:ring-tomato"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium mb-1.5">
                        Delivery Notes (optional)
                      </label>
                      <textarea
                        id="notes"
                        rows={2}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-olive/10 dark:border-cream/10 bg-white/50 dark:bg-olive/30 focus:outline-none focus:ring-2 focus:ring-tomato resize-none"
                        placeholder="Gate code, apartment number, etc."
                      />
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <GlassCard>
                  <h2 className="font-display text-xl font-semibold mb-5">
                    Payment Method
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { value: "card" as const, label: "Credit Card", icon: CreditCard },
                      { value: "paypal" as const, label: "PayPal", icon: Wallet },
                      { value: "cash" as const, label: "Cash on Delivery", icon: Banknote },
                    ].map((method) => (
                      <button
                        key={method.value}
                        type="button"
                        onClick={() => updateField("paymentMethod", method.value)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          form.paymentMethod === method.value
                            ? "border-tomato bg-tomato/5"
                            : "border-olive/10 dark:border-cream/10 hover:border-tomato/50"
                        }`}
                      >
                        <method.icon size={24} className="text-tomato" />
                        <span className="text-sm font-medium">{method.label}</span>
                      </button>
                    ))}
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.15}>
              <GlassCard className="lg:sticky lg:top-28 h-fit">
                <h2 className="font-display text-xl font-semibold mb-5">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-sm border-t border-olive/10 dark:border-cream/10 pt-4">
                  <div className="flex justify-between">
                    <span className="text-olive/70 dark:text-cream/70">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-olive/70 dark:text-cream/70">Delivery</span>
                    <span>{formatCurrency(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-olive/70 dark:text-cream/70">Tax</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-olive/10 dark:border-cream/10">
                    <span>Total</span>
                    <span className="text-tomato">{formatCurrency(total)}</span>
                  </div>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-6"
                  isLoading={isSubmitting}
                >
                  Place Order
                </Button>
              </GlassCard>
            </ScrollReveal>
          </div>
        </form>
      </div>
    </div>
  );
}
