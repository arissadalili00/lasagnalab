import { brand } from "../data/site";

/** WhatsApp link for customer enquiries only — not for placing orders. */
export function getWhatsAppEnquiryUrl(): string {
  return brand.whatsapp;
}
