import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Smartphone,
  Banknote,
  CheckCircle,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import type { CheckoutFormData } from "../types";
import { brand } from "../data/site";
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
  paymentMethod: "bank",
  notes: "",
};

const inputClass =
  "w-full px-4 py-3.5 rounded-xl border border-linen bg-surface text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-tomato/40 focus:border-tomato/30 input-mobile";

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
      <div className="pt-[5.5rem] sm:pt-32 pb-20 text-center">
        <div className="max-w-md mx-auto px-4">
          <h1 className="font-display text-3xl font-bold mb-4">
            Your cart is empty
          </h1>
          <p className="text-muted mb-8">
            Add items to your cart, then confirm via WhatsApp.
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
      <div className="pt-[5.5rem] sm:pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto px-4 text-center"
        >
          <div className="inline-flex p-4 rounded-full bg-green/10 text-green mb-6">
            <CheckCircle size={48} />
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">
            Pre-Order Received!
          </h1>
          <p className="text-muted mb-4">
            Thank you, {form.firstName}! We&apos;ll prepare your order fresh.
          </p>
          <p className="text-muted mb-8">
            Please confirm your order and payment via WhatsApp so we can schedule
            your pickup.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer">
              <Button size="lg">
                <MessageCircle size={20} />
                Confirm on WhatsApp
              </Button>
            </a>
            <Button onClick={() => navigate("/")} size="lg" variant="outline">
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-[5.5rem] sm:pt-32 pb-24 sm:pb-20 safe-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-6 sm:mb-8">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-muted hover:text-tomato transition-colors min-h-[44px]"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-2 sm:mt-4">Checkout</h1>
        </ScrollReveal>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
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
                        className={inputClass}
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
                        className={inputClass}
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
                        className={inputClass}
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
                        className={inputClass}
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
                        className={inputClass}
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
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium mb-1.5">
                          Postcode
                        </label>
                        <input
                          id="zipCode"
                          required
                          value={form.zipCode}
                          onChange={(e) => updateField("zipCode", e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium mb-1.5">
                        Order Notes (beef/chicken, pickup time)
                      </label>
                      <textarea
                        id="notes"
                        rows={2}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                        className={`${inputClass} resize-none`}
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
                      { value: "bank" as const, label: "Bank Transfer", icon: Building2 },
                      { value: "ewallet" as const, label: "E-Wallet", icon: Smartphone },
                      { value: "cod" as const, label: "Cash on Pickup", icon: Banknote },
                    ].map((method) => (
                      <button
                        key={method.value}
                        type="button"
                        onClick={() => updateField("paymentMethod", method.value)}
                        className={`flex flex-col items-center gap-2 p-4 min-h-[72px] rounded-xl border-2 transition-all active:scale-[0.98] ${
                          form.paymentMethod === method.value
                            ? "border-tomato bg-tomato/5"
                            : "border-linen hover:border-tomato/40 bg-surface"
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

            <ScrollReveal delay={0.15} className="order-1 lg:order-2">
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
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted">Delivery</span>
                      <span>{formatCurrency(deliveryFee)}</span>
                    </div>
                  )}
                  {tax > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted">Tax</span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-linen text-olive">
                    <span>Total</span>
                    <span className="text-tomato">{formatCurrency(total)}</span>
                  </div>
                </div>
                <p className="text-xs text-muted mt-4">
                  Final confirmation via WhatsApp. Open {brand.hours}.
                </p>
                <Button type="submit" size="lg" className="w-full mt-4 min-h-[48px]" isLoading={isSubmitting}>
                  Submit Pre-Order
                </Button>
              </GlassCard>
            </ScrollReveal>
          </div>
        </form>
      </div>
    </div>
  );
}
