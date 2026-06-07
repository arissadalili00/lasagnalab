export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: ProductCategory;
  tags: string[];
}

export type ProductCategory =
  | "classic"
  | "chicken"
  | "seafood"
  | "vegetarian"
  | "premium"
  | "spicy";

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
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: "card" | "paypal" | "cash";
  notes: string;
}

export interface NavLink {
  label: string;
  href: string;
}
