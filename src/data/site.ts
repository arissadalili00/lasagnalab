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
  orderNote: "Pre-order only · WhatsApp to order (no calls)",
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
    title: "Easy WhatsApp Ordering",
    description:
      "Order via WhatsApp — simple, fast, and personal. No calls, just message us.",
    icon: "truck",
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/#about" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Order", href: "/#contact" },
];

export const footerLinks = {
  company: [
    { label: "About Us", href: "/#about" },
    { label: "Our Menu", href: "/menu" },
    { label: "Reviews", href: "/#testimonials" },
    { label: "Order via WhatsApp", href: brand.whatsapp },
  ],
  support: [
    { label: "Pre-Order Info", href: "/#contact" },
    { label: "Operating Hours", href: "/#contact" },
    { label: "Instagram", href: brand.instagram },
    { label: "WhatsApp", href: brand.whatsapp },
  ],
};

export const contactInfo = {
  whatsapp: brand.whatsapp,
  whatsappLabel: "WhatsApp Only (No Calls)",
  instagram: brand.instagram,
  instagramHandle: "@thecreamypastaco",
  location: brand.location,
  hours: brand.hours,
  orderNote: brand.orderNote,
  social: [
    { label: "Instagram", href: brand.instagram },
    { label: "WhatsApp", href: brand.whatsapp },
  ],
};
