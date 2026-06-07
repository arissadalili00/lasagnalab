import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Copy,
  Check,
  Download,
  Mail,
  Clock,
  Home,
  AlertCircle,
} from "lucide-react";
import type { OrderSummary } from "../../types";
import {
  buildFullReceiptText,
  copyReceiptToClipboard,
  downloadReceipt,
} from "../../utils/receipt";
import {
  sendOrderReceiptEmailSafe,
  type EmailReceiptStatus,
} from "../../utils/email";
import { emailConfig } from "../../data/site";
import { Button } from "../ui/Button";
import { GlassCard } from "../ui/GlassCard";

interface OrderConfirmationProps {
  order: OrderSummary;
  customerEmail?: string;
  emailReceiptStatus: EmailReceiptStatus | null;
  emailErrorMessage?: string | null;
  screenshotPreview?: string | null;
  onGoHome: () => void;
}

export function OrderConfirmation({
  order,
  customerEmail,
  emailReceiptStatus: initialEmailStatus,
  emailErrorMessage: initialErrorMessage,
  screenshotPreview,
  onGoHome,
}: OrderConfirmationProps) {
  const [copied, setCopied] = useState(false);
  const [emailReceiptStatus, setEmailReceiptStatus] = useState(initialEmailStatus);
  const [emailErrorMessage, setEmailErrorMessage] = useState(initialErrorMessage);
  const [resendingEmail, setResendingEmail] = useState(false);

  const receiptText = buildFullReceiptText(order);
  const needsPaymentProof = true;

  const handleCopy = async () => {
    const ok = await copyReceiptToClipboard(order);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleResendEmail = async () => {
    if (!customerEmail) return;
    setResendingEmail(true);
    const result = await sendOrderReceiptEmailSafe(order, customerEmail);
    setEmailReceiptStatus(result.status);
    setEmailErrorMessage(result.errorMessage ?? null);
    setResendingEmail(false);
  };

  const emailStepDetail =
    emailReceiptStatus === "sent"
      ? `From ${emailConfig.companyEmail} → ${customerEmail}`
      : emailReceiptStatus === "failed"
        ? `Could not send to ${customerEmail} — tap Resend below`
        : emailReceiptStatus === "not_configured"
          ? "EmailJS not set up yet — add keys in .env file"
          : "Sending receipt…";

  const steps = [
    {
      done: true,
      label: "Order received on website",
      detail: `Reference ${order.orderId}`,
    },
    {
      done: emailReceiptStatus === "sent",
      failed: emailReceiptStatus === "failed" || emailReceiptStatus === "not_configured",
      label: "Receipt emailed to you",
      detail: emailStepDetail,
    },
    {
      done: true,
      label: "Receipt saved on this device",
      detail: "Copy or download below",
    },
    {
      done: false,
      label: "Shop confirms your order",
      detail: `We will contact you at ${order.phone} or ${customerEmail}`,
    },
  ];

  return (
    <div className="pt-[5.5rem] sm:pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto px-4"
      >
        <div className="text-center mb-6">
          <div className="inline-flex p-4 rounded-full bg-green/10 text-green mb-4">
            <CheckCircle size={48} />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            All Order Receive!
          </h1>
          <p className="text-muted">
            Thank you, {order.shortName}! Your order is recorded.
          </p>
          <p className="text-sm font-mono text-tomato mt-2">{order.orderId}</p>

          {emailReceiptStatus === "sent" && customerEmail && (
            <p className="text-sm text-green font-medium mt-3 flex items-center justify-center gap-1.5 flex-wrap">
              <Mail size={16} />
              Receipt sent from {emailConfig.companyEmail} → {customerEmail}
            </p>
          )}
        </div>

        <GlassCard className="mb-5">
          <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock size={18} className="text-tomato" />
            What happens next
          </h2>
          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.done
                      ? "bg-green text-white"
                      : step.failed
                        ? "bg-tomato/15 text-tomato border border-tomato/30"
                        : "bg-cream-dark text-muted border border-linen"
                  }`}
                >
                  {step.done ? "✓" : step.failed ? "!" : i + 1}
                </span>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      step.done ? "text-ink" : step.failed ? "text-tomato" : "text-muted"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-muted mt-0.5">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </GlassCard>

        {(emailReceiptStatus === "failed" ||
          emailReceiptStatus === "not_configured") && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-tomato/5 border border-tomato/20 mb-4">
            <AlertCircle size={16} className="text-tomato shrink-0 mt-0.5" />
            <div className="text-xs text-muted text-left">
              {emailReceiptStatus === "not_configured" ? (
                <>
                  <strong className="text-ink">Email not configured.</strong> Add
                  your EmailJS keys in `.env` so receipts send from{" "}
                  {emailConfig.companyEmail}.
                </>
              ) : (
                <>
                  <strong className="text-ink">Email failed.</strong>{" "}
                  {emailErrorMessage && (
                    <span className="block mt-1 font-mono text-tomato break-all">
                      {emailErrorMessage}
                    </span>
                  )}
                  <span className="block mt-2">Tap Resend Email below to try again.</span>
                </>
              )}
            </div>
          </div>
        )}

        <GlassCard className="mb-5 text-left">
          <h2 className="font-display text-lg font-semibold mb-3">
            Your Receipt
          </h2>
          <pre className="text-xs sm:text-sm text-muted whitespace-pre-wrap font-mono leading-relaxed bg-cream-dark/40 rounded-xl p-4 border border-linen max-h-64 overflow-y-auto">
            {receiptText}
          </pre>

          {screenshotPreview && needsPaymentProof && (
            <div className="mt-4 pt-4 border-t border-linen">
              <p className="text-xs font-medium text-ink mb-2">
                Your payment screenshot:
              </p>
              <img
                src={screenshotPreview}
                alt="Payment screenshot"
                className="w-full max-h-40 object-contain rounded-xl border border-linen"
              />
            </div>
          )}
        </GlassCard>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleCopy}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copied!" : "Copy Receipt"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => downloadReceipt(order)}
          >
            <Download size={18} />
            Download
          </Button>
        </div>

        {customerEmail && emailReceiptStatus !== "sent" && (
          <Button
            type="button"
            variant="outline"
            className="w-full mb-4"
            isLoading={resendingEmail}
            onClick={handleResendEmail}
          >
            <Mail size={18} />
            Resend Email to {customerEmail}
          </Button>
        )}

        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={onGoHome}
        >
          <Home size={18} />
          Back to Home
        </Button>
      </motion.div>
    </div>
  );
}
