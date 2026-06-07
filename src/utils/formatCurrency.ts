export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export const DELIVERY_FEE = 4.99;
export const TAX_RATE = 0.08;

export function calculateSubtotal(items: { product: { price: number }; quantity: number }[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function calculateTax(subtotal: number): number {
  return subtotal * TAX_RATE;
}

export function calculateTotal(subtotal: number): number {
  return subtotal + DELIVERY_FEE + calculateTax(subtotal);
}
