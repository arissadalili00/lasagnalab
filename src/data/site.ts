import type { Stat, WhyChooseItem } from "../types";

export const stats: Stat[] = [
  { id: "orders", value: "10,000+", label: "Orders Delivered" },
  { id: "rating", value: "4.9", label: "Average Rating" },
  { id: "customers", value: "5,000+", label: "Happy Customers" },
  { id: "branches", value: "15", label: "Branches" },
];

export const whyChooseUs: WhyChooseItem[] = [
  {
    id: "fresh",
    title: "Fresh Ingredients",
    description:
      "We source locally-grown produce and import authentic Italian cheeses and pasta daily.",
    icon: "leaf",
  },
  {
    id: "delivery",
    title: "Fast Delivery",
    description:
      "Hot lasagna at your door in 30 minutes or less. Insulated packaging keeps every layer perfect.",
    icon: "truck",
  },
  {
    id: "quality",
    title: "Premium Quality",
    description:
      "Every dish is crafted by award-winning chefs using time-honored Italian techniques.",
    icon: "award",
  },
  {
    id: "chef",
    title: "Chef Recommended",
    description:
      "Our recipes are developed and approved by Michelin-trained chefs for an unforgettable taste.",
    icon: "chef",
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/#about" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

export const footerLinks = {
  company: [
    { label: "About Us", href: "/#about" },
    { label: "Our Menu", href: "/menu" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Contact", href: "/#contact" },
  ],
  support: [
    { label: "FAQ", href: "/#contact" },
    { label: "Delivery Info", href: "/#contact" },
    { label: "Privacy Policy", href: "/#contact" },
    { label: "Terms of Service", href: "/#contact" },
  ],
};

export const contactInfo = {
  phone: "+1 (555) 123-4567",
  email: "hello@lasagnalab.com",
  address: "123 Via Roma Street, Little Italy, New York, NY 10013",
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Twitter", href: "https://twitter.com" },
  ],
};
