import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import type { OrderSummary } from "../types";
import { buildFullReceiptText } from "./receipt";
import { brand, emailConfig } from "../data/site";

export type EmailReceiptStatus = "sent" | "failed" | "not_configured";

export interface EmailSendResult {
  status: EmailReceiptStatus;
  errorMessage?: string;
}

interface EmailJsRuntimeConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  privateKey: string;
}

declare const __EMAILJS_CONFIG__: EmailJsRuntimeConfig;

function readEnv(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key];
  return typeof value === "string" ? value.trim() : "";
}

function getEmailJsConfig(): EmailJsRuntimeConfig {
  const fromDefine =
    typeof __EMAILJS_CONFIG__ !== "undefined" ? __EMAILJS_CONFIG__ : null;

  return {
    serviceId:
      fromDefine?.serviceId || readEnv("VITE_EMAILJS_SERVICE_ID"),
    templateId:
      fromDefine?.templateId || readEnv("VITE_EMAILJS_TEMPLATE_ID"),
    publicKey:
      fromDefine?.publicKey || readEnv("VITE_EMAILJS_PUBLIC_KEY"),
    privateKey:
      fromDefine?.privateKey || readEnv("VITE_EMAILJS_PRIVATE_KEY") || "",
  };
}

export function isEmailConfigured(): boolean {
  const { serviceId, templateId, publicKey } = getEmailJsConfig();
  return Boolean(serviceId && templateId && publicKey);
}

function getEmailJsOptions() {
  const { publicKey, privateKey } = getEmailJsConfig();

  return {
    publicKey,
    ...(privateKey ? { privateKey } : {}),
  };
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function parseEmailJsError(error: unknown): string {
  if (error instanceof EmailJSResponseStatus) {
    return error.text || `Error ${error.status}`;
  }
  if (error && typeof error === "object" && "text" in error) {
    return String((error as { text: string }).text);
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Unknown email error";
}

export async function sendOrderReceiptEmail(
  order: OrderSummary,
  customerEmail: string
): Promise<void> {
  const { serviceId, templateId } = getEmailJsConfig();

  if (!isEmailConfigured()) {
    throw new Error("EMAIL_NOT_CONFIGURED");
  }

  const recipient = normalizeEmail(customerEmail);

  await emailjs.send(
    serviceId,
    templateId,
    {
      to_email: recipient,
      customer_email: recipient,
      email: recipient,
      to_name: order.shortName,
      customer_name: order.shortName,
      customer_phone: order.phone,
      order_id: order.orderId,
      order_total: order.total.toFixed(2),
      receipt: buildFullReceiptText(order),
      company_name: brand.name,
      company_email: emailConfig.companyEmail,
      from_name: brand.name,
      reply_to: emailConfig.companyEmail,
    },
    getEmailJsOptions()
  );
}

export async function sendOrderReceiptEmailSafe(
  order: OrderSummary,
  customerEmail: string
): Promise<EmailSendResult> {
  if (!isEmailConfigured()) {
    return { status: "not_configured" };
  }

  try {
    await sendOrderReceiptEmail(order, customerEmail);
    return { status: "sent" };
  } catch (error) {
    const errorMessage = parseEmailJsError(error);
    console.error("EmailJS receipt failed:", errorMessage, error);
    return { status: "failed", errorMessage };
  }
}

export function initEmailJs(): void {
  if (!isEmailConfigured()) return;
  emailjs.init(getEmailJsOptions());
}
