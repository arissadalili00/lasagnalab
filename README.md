# LasagnaLab

A modern, production-quality food ordering landing page and frontend web application for **LasagnaLab** — a premium handcrafted lasagna brand.

![LasagnaLab](https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=1200&h=400&fit=crop)

## Tech Stack

- **React 19** + **Vite**
- **TypeScript**
- **Tailwind CSS v4**
- **React Router**
- **Framer Motion** — animations & scroll reveals
- **Lucide React** — icons

## Features

- Premium SaaS-style landing page with luxury Italian aesthetic
- Sticky responsive navbar with mobile hamburger menu
- Hero section with floating rating & delivery badges
- Featured menu with 6 signature lasagnas
- Full menu page with **search** and **category filtering**
- Shopping cart with add/remove/quantity controls
- **LocalStorage** cart persistence
- Slide-out **cart sidebar**
- Frontend-only **checkout** flow
- Dark mode toggle
- Scroll reveal animations
- Loading skeletons on menu page
- Glassmorphism UI with custom color palette

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
cd lasagnalab
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
lasagnalab/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── cart/          # Cart sidebar
│   │   ├── home/          # Landing page sections
│   │   ├── layout/        # Navbar, Footer, Layout
│   │   ├── products/      # Product cards
│   │   └── ui/            # Reusable UI components
│   ├── context/           # Cart & Theme providers
│   ├── data/              # Products, testimonials, site config
│   ├── pages/             # Route pages
│   ├── types/             # TypeScript interfaces
│   └── utils/             # Helpers (currency, totals)
├── index.html
├── vite.config.ts
└── package.json
```

## Color Palette

| Color       | Hex       | Usage                    |
|-------------|-----------|--------------------------|
| Cream       | `#FFF8F0` | Background               |
| Tomato Red  | `#D94F30` | Primary accent, CTAs     |
| Dark Olive  | `#2D2D2D` | Text, dark mode bg       |
| Soft Green  | `#6D8B74` | Secondary accent         |

## Routes

| Path         | Page                              |
|--------------|-----------------------------------|
| `/`          | Landing page (Home)               |
| `/menu`      | Full menu with search & filters   |
| `/checkout`  | Checkout form & order summary     |

## License

MIT
