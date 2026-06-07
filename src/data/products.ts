import type { Product } from "../types";

const img = (path: string) =>
  `https://images.unsplash.com/${path}?auto=format&fit=crop&w=700&h=500&q=80`;

const images = {
  lasagnaRegular: img("photo-1574894709920-11b28e7367e3"),
  lasagnaLarge: img("photo-1481391319762-47dff72954d9"),
  lasagnaPetite: img("photo-1476124369491-e7addf5db371"),
  macaroniRegular: img("photo-1621996346565-e3dbc646d9a9"),
  macaroniLarge: img("photo-1512058564366-18510be2db19"),
};

export const products: Product[] = [
  {
    id: "lasagna-regular",
    name: "Handsome Regular Lasagna",
    description:
      "Rich, creamy beef or chicken lasagna baked golden in our signature tray. Perfect for a satisfying solo meal.",
    price: 16,
    rating: 5,
    image: images.lasagnaRegular,
    category: "lasagna",
    tags: ["lasagna", "regular", "bestseller"],
    size: "Handsome Regular",
    serves: "1 pax",
    dimensions: "10.7 × 15.9 × 3.9 cm",
    protein: "Beef / Chicken",
  },
  {
    id: "lasagna-large",
    name: "Happy Large Lasagna",
    description:
      "Our family-size lasagna — layers of creamy pasta and hearty filling. Ideal for sharing at gatherings.",
    price: 57,
    rating: 5,
    image: images.lasagnaLarge,
    category: "lasagna",
    tags: ["lasagna", "large", "sharing"],
    size: "Happy Large",
    serves: "4 pax",
    dimensions: "20.7 × 20.7 × 4.5 cm",
    protein: "Beef / Chicken",
  },
  {
    id: "lasagna-petite",
    name: "Pretty Petite Lasagna",
    description:
      "A pack of 6 adorable mini lasagnas — great for parties, gifts, or trying both beef and chicken.",
    price: 35,
    rating: 5,
    image: images.lasagnaPetite,
    category: "lasagna",
    tags: ["lasagna", "petite", "party"],
    size: "Pretty Petite Pack of 6",
    serves: "6 pieces",
    dimensions: "7.5 × 10.5 × 3.5 cm each",
    protein: "Beef / Chicken",
  },
  {
    id: "macaroni-regular",
    name: "Handsome Regular Baked Macaroni",
    description:
      "Creamy baked macaroni with your choice of beef or chicken — comfort food at its finest, made fresh to order.",
    price: 15,
    rating: 5,
    image: images.macaroniRegular,
    category: "macaroni",
    tags: ["macaroni", "regular", "creamy"],
    size: "Handsome Regular",
    serves: "1 pax",
    dimensions: "10.7 × 15.9 × 3.9 cm",
    protein: "Beef / Chicken",
  },
  {
    id: "macaroni-large",
    name: "Happy Large Baked Macaroni",
    description:
      "Generous tray of luscious baked macaroni — cheesy, creamy, and baked until perfectly golden on top.",
    price: 55,
    rating: 5,
    image: images.macaroniLarge,
    category: "macaroni",
    tags: ["macaroni", "large", "sharing"],
    size: "Happy Large",
    serves: "4 pax",
    dimensions: "20.7 × 20.7 × 4.5 cm",
    protein: "Beef / Chicken",
  },
];

export const categoryLabels: Record<Product["category"], string> = {
  lasagna: "Lasagna",
  macaroni: "Baked Macaroni",
};
