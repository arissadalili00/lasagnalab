import type { Stat, WhyChooseItem } from "../types";

export const brand = {
  name: "The Creamy Pasta Co.",
  shortName: "Creamy Pasta",
  tagline: "Indulge in creamy pasta perfection",
  byline: "by jijah",
  instagram: "https://instagram.com/thecreamypastaco",
  whatsapp: "https://wa.link/xz1ljl",
  location: "Puncak Alam, Selangor",
  hours: "10:00 AM – 5:00 PM",
  orderNote: "Pre-order only · Order via the Menu",
  whatsappEnquiryNote: "Questions only — not for placing orders.",
  orderCta: "Order on Website",
  whatsappCta: "Ask a Question",
};

/** Real product & brand photos (stored in /public/images). */
export const brandImages = {
  aboutKitchen: "/images/about-kitchen-trays.png",
};

/** Company email — connect this Gmail in EmailJS (no password in code). */
export const emailConfig = {
  companyEmail: "thecreamypastaco@gmail.com",
};

/**
 * EmailJS client config (public keys — safe in frontend code).
 * Used on Netlify/live builds where local `.env` is not deployed.
 * Optional `.env` values override these for local development.
 */
export const emailJsConfig = {
  serviceId: "service_syb5foz",
  templateId: "template_i9qt1iw",
  publicKey: "AQgiUTXyWJBU-lbhu",
};

/** Update whatsappPhone with your business number (country code, no + or spaces). */
export const payment = {
  whatsappPhone: "60123456789",
  qrImage: "/payment-qr.svg",
  bankName: "Maybank",
  accountName: "The Creamy Pasta Co.",
  accountNumber: "1234567890",
  ewalletLabel: "Touch 'n Go / DuitNow",
};

export const stats: Stat[] = [
  { id: "orders", value: "500+", label: "Happy Pre-Orders" },
  { id: "rating", value: "5.0", label: "Customer Rating" },
  { id: "location", value: "Puncak Alam", label: "Based In" },
  { id: "hours", value: "10–5", label: "Daily Hours" },
];

export const whyChooseUs: WhyChooseItem[] = [
  {
    id: "creamy",
    title: "Creamy Perfection",
    description:
      "Every tray is baked with rich, luscious layers — the signature creaminess our customers love.",
    icon: "chef",
  },
  {
    id: "fresh",
    title: "Made Fresh to Order",
    description:
      "Pre-order only so every dish is prepared fresh, never sitting on a shelf.",
    icon: "leaf",
  },
  {
    id: "homemade",
    title: "Homemade with Love",
    description:
      "Small-batch, home-kitchen quality crafted by jijah with care in every layer.",
    icon: "award",
  },
  {
    id: "easy",
    title: "Easy Online Ordering",
    description:
      "Order on our website — pick your tray, checkout, pay online, and get your receipt by email.",
    icon: "truck",
  },
];

export const navLinks = [
  { label: "Home", href: "#home", sectionId: "home" },
  { label: "Menu", href: "#menu", sectionId: "menu" },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Reviews", href: "#testimonials", sectionId: "testimonials" },
  { label: "Order", href: "#contact", sectionId: "contact" },
];

export const footerLinks = {
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Menu", href: "#menu" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Place an Order", href: "#menu" },
  ],
  support: [
    { label: "How to Order", href: "#contact" },
    { label: "Operating Hours", href: "#contact" },
    { label: "Instagram", href: brand.instagram },
    { label: "WhatsApp Enquiries", href: brand.whatsapp },
  ],
};

export const contactInfo = {
  whatsapp: brand.whatsapp,
  whatsappLabel: brand.whatsappCta,
  instagram: brand.instagram,
  instagramHandle: "@thecreamypastaco",
  location: brand.location,
  hours: brand.hours,
  orderNote: brand.orderNote,
  whatsappEnquiryNote: brand.whatsappEnquiryNote,
  social: [
    { label: "Instagram", href: brand.instagram },
    { label: "WhatsApp Enquiries", href: brand.whatsapp },
  ],
};
