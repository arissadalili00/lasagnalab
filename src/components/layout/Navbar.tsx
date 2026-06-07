import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Menu,
  X,
  Moon,
  Sun,
  ChefHat,
} from "lucide-react";
import { navLinks } from "../../data/site";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass dark:glass-dark shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="LasagnaLab home"
        >
          <div className="p-2 rounded-xl bg-tomato text-cream group-hover:bg-tomato-dark transition-colors">
            <ChefHat size={22} />
          </div>
          <span className="font-display text-2xl font-bold text-olive dark:text-cream">
            Lasagna<span className="text-tomato">Lab</span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.href.startsWith("/#") ? (
                <Link
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-olive/80 dark:text-cream/80 hover:text-tomato dark:hover:text-tomato transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  to={link.href}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? "text-tomato"
                      : "text-olive/80 dark:text-cream/80 hover:text-tomato"
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-olive/5 dark:hover:bg-cream/10 transition-colors"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={openCart}
            className="relative p-2.5 rounded-full hover:bg-olive/5 dark:hover:bg-cream/10 transition-colors"
            aria-label={`Open cart, ${itemCount} items`}
          >
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-tomato text-cream text-xs font-bold"
              >
                {itemCount > 9 ? "9+" : itemCount}
              </motion.span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-full hover:bg-olive/5 dark:hover:bg-cream/10 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass dark:glass-dark border-t border-white/20 mt-3 overflow-hidden"
          >
            <ul className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="block px-4 py-3 rounded-xl text-olive dark:text-cream hover:bg-olive/5 dark:hover:bg-cream/10 transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
