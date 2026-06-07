import type { OrderSummary } from "../types";
import { formatCurrency } from "./formatCurrency";
import { brand, emailConfig } from "../data/site";

const ORDERS_KEY = "lasagnalab-orders";

const paymentLabel = "Bank Transfer / QR Code";

export interface SavedOrder extends OrderSummary {
  placedAt: string;
}

export function buildFullReceiptText(order: OrderSummary): string {
  const itemLines = order.items
    .map(
      (item) =>
        `  • ${item.product.name} × ${item.quantity} — ${formatCurrency(item.product.price * item.quantity)}`
    )
    .join("\n");

  return [
    "════════════════════════════════",
    "       ORDER RECEIPT",
    `       ${brand.name}`,
    "════════════════════════════════",
    "",
    "✅ ALL ORDER RECEIVE",
    "",
    `Order ID:    ${order.orderId}`,
    `Date:        ${new Date().toLocaleString("en-MY")}`,
    `Customer:    ${order.shortName}`,
    `Phone:       ${order.phone}`,
    "",
    "────────────────────────────────",
    "YOUR ORDER",
    "────────────────────────────────",
    itemLines,
    "",
    `Subtotal:    ${formatCurrency(order.subtotal)}`,
    order.deliveryFee > 0 ? `Delivery:    ${formatCurrency(order.deliveryFee)}` : null,
    order.tax > 0 ? `Tax:         ${formatCurrency(order.tax)}` : null,
    `TOTAL:       ${formatCurrency(order.total)}`,
    "",
    `Payment:     ${paymentLabel}`,
    "",
    "────────────────────────────────",
    "DELIVERY",
    "────────────────────────────────",
    `${order.form.address}`,
    `${order.form.city} ${order.form.zipCode}`,
    order.form.notes ? `\nNotes: ${order.form.notes}` : null,
    "",
    "────────────────────────────────",
    "Keep this receipt for your records.",
    `Questions? Email ${emailConfig.companyEmail}`,
    "════════════════════════════════",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function saveOrderToHistory(order: OrderSummary): void {
  try {
    const saved: SavedOrder = { ...order, placedAt: new Date().toISOString() };
    const existing = loadOrderHistory();
    localStorage.setItem(ORDERS_KEY, JSON.stringify([saved, ...existing].slice(0, 20)));
  } catch {
    /* storage full or unavailable */
  }
}

export function loadOrderHistory(): SavedOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedOrder[];
  } catch {
    return [];
  }
}

export async function copyReceiptToClipboard(order: OrderSummary): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(buildFullReceiptText(order));
    return true;
  } catch {
    return false;
  }
}

export function downloadReceipt(order: OrderSummary): void {
  const text = buildFullReceiptText(order);
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${order.orderId}-receipt.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function buildEmailReceiptUrl(order: OrderSummary, email: string): string {
  const subject = encodeURIComponent(`Order Receipt — ${order.orderId} — ${brand.name}`);
  const body = encodeURIComponent(buildFullReceiptText(order));
  return `mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`;
}
