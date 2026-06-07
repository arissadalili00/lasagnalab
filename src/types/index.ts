export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: ProductCategory;
  tags: string[];
  size: string;
  serves: string;
  dimensions: string;
  protein: string;
}

export type ProductCategory = "lasagna" | "macaroni";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  review: string;
  location: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  icon: "leaf" | "truck" | "award" | "chef";
}

export interface CheckoutFormData {
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: "bank" | "ewallet" | "cod";
  notes: string;
}

export interface NavLink {
  label: string;
  href: string;
}
