import type { Product } from "../types";

export const products: Product[] = [
  {
    id: "classic-beef",
    name: "Classic Beef Lasagna",
    description:
      "Layers of slow-braised beef ragù, fresh pasta sheets, and creamy béchamel baked to golden perfection.",
    price: 18.99,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&h=400&fit=crop",
    category: "classic",
    tags: ["beef", "classic", "bestseller"],
  },
  {
    id: "chicken-alfredo",
    name: "Chicken Alfredo Lasagna",
    description:
      "Tender grilled chicken with rich Alfredo sauce, spinach, and three-cheese blend in every layer.",
    price: 17.99,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop",
    category: "chicken",
    tags: ["chicken", "alfredo", "creamy"],
  },
  {
    id: "seafood",
    name: "Seafood Lasagna",
    description:
      "Fresh shrimp, scallops, and crab in a delicate white wine cream sauce with herb-infused pasta.",
    price: 24.99,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop",
    category: "seafood",
    tags: ["seafood", "premium"],
  },
  {
    id: "vegetarian",
    name: "Vegetarian Lasagna",
    description:
      "Roasted seasonal vegetables, ricotta, and marinara layered with fresh basil and mozzarella.",
    price: 16.99,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&h=400&fit=crop",
    category: "vegetarian",
    tags: ["vegetarian", "healthy"],
  },
  {
    id: "truffle-mushroom",
    name: "Truffle Mushroom Lasagna",
    description:
      "Wild mushrooms sautéed in truffle oil with porcini cream sauce and aged Parmigiano-Reggiano.",
    price: 22.99,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1604383536976-5e6452a093ca?w=600&h=400&fit=crop",
    category: "premium",
    tags: ["truffle", "mushroom", "premium"],
  },
  {
    id: "spicy-mexican",
    name: "Spicy Mexican Lasagna",
    description:
      "Bold chipotle beef, black beans, corn, and pepper jack cheese with a zesty salsa verde.",
    price: 19.99,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e5786?w=600&h=400&fit=crop",
    category: "spicy",
    tags: ["spicy", "mexican", "bold"],
  },
];

export const categoryLabels: Record<Product["category"], string> = {
  classic: "Classic",
  chicken: "Chicken",
  seafood: "Seafood",
  vegetarian: "Vegetarian",
  premium: "Premium",
  spicy: "Spicy",
};
