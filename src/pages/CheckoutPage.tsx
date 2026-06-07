import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  Smartphone,
  Banknote,
  ArrowLeft,
  QrCode,
  Copy,
  Check,
  Upload,
  ImageIcon,
  X,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../utils/formatCurrency";
import { generateOrderId } from "../utils/order";
import { saveOrderToHistory } from "../utils/receipt";
import {
  sendOrderReceiptEmailSafe,
  type EmailReceiptStatus,
} from "../utils/email";
import type { OrderSummary } from "../types";
import type { CheckoutFormData } from "../types";
import { brand, payment, emailConfig } from "../data/site";
import { Button } from "../components/ui/Button";
import { GlassCard } from "../components/ui/GlassCard";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { OrderConfirmation } from "../components/order/OrderConfirmation";

type CheckoutStep = "form" | "payment" | "success";

const initialForm: CheckoutFormData = {
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
  const { user } = useAuth();
  const { items, subtotal, tax, deliveryFee, total, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutFormData>(initialForm);
  const [step, setStep] = useState<CheckoutStep>("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [emailReceiptStatus, setEmailReceiptStatus] =
    useState<EmailReceiptStatus | null>(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
    null
  );
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(
    null
  );

  const updateField = <K extends keyof CheckoutFormData>(
    key: K,
    value: CheckoutFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleScreenshotChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (screenshotPreview) URL.revokeObjectURL(screenshotPreview);

    setPaymentScreenshot(file);
    setScreenshotPreview(URL.createObjectURL(file));
  };

  const removeScreenshot = () => {
    if (screenshotPreview) URL.revokeObjectURL(screenshotPreview);
    setPaymentScreenshot(null);
    setScreenshotPreview(null);
  };

  const finalizeOrder = async (orderSummary: OrderSummary) => {
    if (!user?.email) return;

    setIsSubmitting(true);

    const result = await sendOrderReceiptEmailSafe(orderSummary, user.email);
    setEmailReceiptStatus(result.status);
    setEmailErrorMessage(result.errorMessage ?? null);

    saveOrderToHistory(orderSummary);
    setOrder(orderSummary);
    setStep("success");
    clearCart();
    setIsSubmitting(false);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (form.paymentMethod === "cod") {
      await finalizeOrder({
        orderId: generateOrderId(),
        shortName: user.shortName,
        phone: form.phone,
        items: [...items],
        form,
        subtotal,
        tax,
        deliveryFee,
        total,
      });
    } else {
      setStep("payment");
    }
  };

  const handlePaymentConfirm = async () => {
    if (!user || !paymentScreenshot) return;

    await finalizeOrder({
      orderId: generateOrderId(),
      shortName: user.shortName,
      phone: form.phone,
      items: [...items],
      form,
      subtotal,
      tax,
      deliveryFee,
      total,
    });
  };

  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(payment.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  if (items.length === 0 && step !== "success") {
    return (
      <div className="pt-[5.5rem] sm:pt-32 pb-20 text-center">
        <div className="max-w-md mx-auto px-4">
          <h1 className="font-display text-3xl font-bold mb-4">
            Your cart is empty
          </h1>
          <p className="text-muted mb-8">
            Add items to your cart, then proceed to checkout.
          </p>
          <Link to="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (step === "success" && order) {
    return (
      <OrderConfirmation
        order={order}
        customerEmail={user?.email}
        emailReceiptStatus={emailReceiptStatus}
        emailErrorMessage={emailErrorMessage}
        screenshotPreview={screenshotPreview}
        onGoHome={() => navigate("/")}
      />
    );
  }

  if (step === "payment") {
    return (
      <div className="pt-[5.5rem] sm:pt-32 pb-24 sm:pb-20 safe-bottom">
        <div className="max-w-lg mx-auto px-4">
          <ScrollReveal className="mb-6">
            <button
              type="button"
              onClick={() => setStep("form")}
              className="inline-flex items-center gap-2 text-muted hover:text-tomato transition-colors min-h-[44px]"
            >
              <ArrowLeft size={18} />
              Back to checkout
            </button>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mt-2">
              Pay Now
            </h1>
            <p className="text-muted mt-2">
              Scan the QR, pay{" "}
              <span className="font-bold text-tomato">{formatCurrency(total)}</span>
              , then upload your payment screenshot.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <GlassCard className="text-center">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-muted mb-4">
                  <QrCode size={18} className="text-tomato" />
                  Scan to pay via DuitNow / E-Wallet
                </div>
                <div className="mx-auto w-fit p-4 rounded-2xl border-2 border-linen bg-white shadow-sm">
                  <img
                    src={payment.qrImage}
                    alt="Payment QR code"
                    className="w-56 h-56 object-contain"
                  />
                </div>
              </div>

              <div className="text-left space-y-3 mb-6 p-4 rounded-xl bg-cream-dark/50 border border-linen">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Bank</span>
                  <span className="font-medium">{payment.bankName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Account Name</span>
                  <span className="font-medium">{payment.accountName}</span>
                </div>
                <div className="flex justify-between items-center text-sm gap-2">
                  <span className="text-muted">Account No.</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium">
                      {payment.accountNumber}
                    </span>
                    <button
                      type="button"
                      onClick={copyAccountNumber}
                      className="p-1.5 rounded-lg hover:bg-surface text-muted hover:text-tomato transition-colors"
                      aria-label="Copy account number"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-linen">
                  <span className="text-muted">Amount</span>
                  <span className="font-bold text-tomato text-lg">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <div className="text-left mb-6">
                <label className="block text-sm font-medium mb-2">
                  Upload Payment Screenshot *
                </label>

                {!screenshotPreview ? (
                  <label className="flex flex-col items-center justify-center gap-2 p-8 rounded-xl border-2 border-dashed border-linen hover:border-tomato/40 cursor-pointer transition-colors bg-cream-dark/30">
                    <Upload size={28} className="text-tomato" />
                    <span className="text-sm font-medium text-ink">
                      Tap to upload screenshot
                    </span>
                    <span className="text-xs text-muted">
                      PNG, JPG — max 5MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleScreenshotChange}
                      className="sr-only"
                    />
                  </label>
                ) : (
                  <div className="relative rounded-xl border border-linen overflow-hidden">
                    <img
                      src={screenshotPreview}
                      alt="Payment screenshot preview"
                      className="w-full max-h-56 object-contain bg-cream-dark/30"
                    />
                    <button
                      type="button"
                      onClick={removeScreenshot}
                      className="absolute top-2 right-2 p-2 rounded-full bg-ink/70 text-white hover:bg-ink transition-colors"
                      aria-label="Remove screenshot"
                    >
                      <X size={16} />
                    </button>
                    <div className="flex items-center gap-2 p-3 bg-green/10 text-green text-sm font-medium">
                      <ImageIcon size={16} />
                      Screenshot attached
                    </div>
                  </div>
                )}
              </div>

              <p className="text-sm text-muted mb-6">
                After uploading, we&apos;ll email your receipt to{" "}
                <span className="font-medium text-ink">{user?.email}</span> from{" "}
                {emailConfig.companyEmail}, then show your confirmation.
              </p>

              <Button
                size="lg"
                className="w-full min-h-[48px]"
                isLoading={isSubmitting}
                disabled={!paymentScreenshot}
                onClick={handlePaymentConfirm}
              >
                Place Order &amp; Email Receipt
              </Button>
            </GlassCard>
          </ScrollReveal>
        </div>
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
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-2 sm:mt-4">
            Checkout
          </h1>
          {user && (
            <p className="text-sm text-muted mt-2">
              Ordering as{" "}
              <span className="font-medium text-ink">{user.shortName}</span> ·{" "}
              {user.email}
            </p>
          )}
        </ScrollReveal>

        <form onSubmit={handleFormSubmit}>
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
              <ScrollReveal delay={0.1}>
                <GlassCard>
                  <h2 className="font-display text-xl font-semibold mb-5">
                    Delivery Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-1.5"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="e.g. 0193178099"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium mb-1.5"
                      >
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
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium mb-1.5"
                        >
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
                        <label
                          htmlFor="zipCode"
                          className="block text-sm font-medium mb-1.5"
                        >
                          Postcode
                        </label>
                        <input
                          id="zipCode"
                          required
                          value={form.zipCode}
                          onChange={(e) =>
                            updateField("zipCode", e.target.value)
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="notes"
                        className="block text-sm font-medium mb-1.5"
                      >
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
                      {
                        value: "bank" as const,
                        label: "Bank Transfer",
                        icon: Building2,
                      },
                      {
                        value: "ewallet" as const,
                        label: "E-Wallet",
                        icon: Smartphone,
                      },
                      {
                        value: "cod" as const,
                        label: "Cash on Pickup",
                        icon: Banknote,
                      },
                    ].map((method) => (
                      <button
                        key={method.value}
                        type="button"
                        onClick={() =>
                          updateField("paymentMethod", method.value)
                        }
                        className={`flex flex-col items-center gap-2 p-4 min-h-[72px] rounded-xl border-2 transition-all active:scale-[0.98] ${
                          form.paymentMethod === method.value
                            ? "border-tomato bg-tomato/5"
                            : "border-linen hover:border-tomato/40 bg-surface"
                        }`}
                      >
                        <method.icon size={24} className="text-tomato" />
                        <span className="text-sm font-medium">
                          {method.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  {(form.paymentMethod === "bank" ||
                    form.paymentMethod === "ewallet") && (
                    <p className="text-xs text-muted mt-4">
                      Next step: scan our QR code and upload your payment
                      screenshot.
                    </p>
                  )}
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
                  {form.paymentMethod === "cod"
                    ? "Cash on pickup — receipt emailed to you."
                    : "Pay via QR + screenshot, then receipt emailed to you."}{" "}
                  Open {brand.hours}.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-4 min-h-[48px]"
                  isLoading={isSubmitting}
                >
                  {form.paymentMethod === "cod"
                    ? "Place Order"
                    : "Proceed to Payment"}
                </Button>
              </GlassCard>
            </ScrollReveal>
          </div>
        </form>
      </div>
    </div>
  );
}
