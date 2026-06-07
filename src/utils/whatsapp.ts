import type { CartItem, CheckoutFormData } from "../types";
import { formatCurrency } from "./formatCurrency";
import { brand, payment } from "../data/site";

export interface OrderSummary {
  orderId: string;
  shortName: string;
  phone: string;
  items: CartItem[];
  form: CheckoutFormData;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
}

const paymentLabels: Record<CheckoutFormData["paymentMethod"], string> = {
  bank: "Bank Transfer",
  ewallet: "E-Wallet",
  cod: "Cash on Pickup",
};

export function buildOrderReceiptMessage(order: OrderSummary): string {
  const itemLines = order.items
    .map(
      (item) =>
        `• ${item.product.name} × ${item.quantity} — ${formatCurrency(item.product.price * item.quantity)}`
    )
    .join("\n");

  const lines = [
    "✅ *All order receive*",
    "",
    `*Order ID:* ${order.orderId}`,
    `*Name:* ${order.shortName}`,
    `*Phone:* ${order.phone}`,
    "",
    "*Your order:*",
    itemLines,
    "",
    `*Total: ${formatCurrency(order.total)}*`,
    `*Payment:* ${paymentLabels[order.form.paymentMethod]}`,
    "",
    "*Delivery Address:*",
    `${order.form.address}, ${order.form.city} ${order.form.zipCode}`,
    order.form.notes ? `\n*Notes:* ${order.form.notes}` : null,
    "",
    "Payment screenshot attached.",
    "",
    "Thank you! 🍝",
  ];

  return lines.filter((line) => line !== null).join("\n");
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleaned = phone.replace(/\D/g, "");
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppOrderUrl(message: string): string {
  return buildWhatsAppUrl(payment.whatsappPhone, message);
}

export function buildCustomerReceiptMessage(order: OrderSummary): string {
  const itemLines = order.items
    .map(
      (item) =>
        `• ${item.product.name} × ${item.quantity} — ${formatCurrency(item.product.price * item.quantity)}`
    )
    .join("\n");

  return [
    "✅ All order receive",
    "",
    `Hi ${order.shortName}! Your order has been placed successfully.`,
    "",
    `Order ID: ${order.orderId}`,
    "",
    "Your order:",
    itemLines,
    "",
    `Total: ${formatCurrency(order.total)}`,
    "",
    `— ${brand.name}`,
  ].join("\n");
}

export function buildCustomerReceiptWhatsAppUrl(order: OrderSummary): string {
  return buildWhatsAppUrl(order.phone, buildCustomerReceiptMessage(order));
}

/** Opens WhatsApp in a new tab/window (works best during a user click). */
export function openWhatsAppLink(url: string): void {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/** Opens shop WhatsApp with the order message. */
export function sendOrderToShop(order: OrderSummary): void {
  const url = buildWhatsAppOrderUrl(buildOrderReceiptMessage(order));
  openWhatsAppLink(url);
}
