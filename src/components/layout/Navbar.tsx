import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, MessageCircle, LogOut } from "lucide-react";
import { navLinks, brand } from "../../data/site";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { BrandLogo } from "../ui/BrandLogo";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isActive = (href: string) => {
    if (href.startsWith("/#") || href.startsWith("http")) return false;
    return location.pathname === href;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 safe-top px-3 sm:px-4 lg:px-6 pt-3 pointer-events-none">
        <nav
          className={`relative pointer-events-auto max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-5 h-[3.75rem] sm:h-16 rounded-2xl border transition-all duration-300 ${
            isScrolled
              ? "bg-surface/98 backdrop-blur-xl border-linen shadow-[0_8px_32px_rgba(28,20,18,0.12)]"
              : "bg-surface/95 backdrop-blur-lg border-linen/80 shadow-[0_4px_24px_rgba(28,20,18,0.08)]"
          }`}
          aria-label="Main navigation"
        >
          <BrandLogo size="sm" compact />

          <ul className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2 bg-cream-dark/80 rounded-xl p-1 border border-linen/60">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`block px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "bg-surface text-tomato shadow-sm"
                      : "text-ink/80 hover:text-ink hover:bg-surface/70"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={logout}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-bold text-ink hover:bg-cream-dark transition-colors min-h-[44px]"
              title={user?.email}
            >
              <LogOut size={16} />
              <span className="max-w-[100px] truncate">
                {user?.shortName}
              </span>
            </button>

            <a
              href={brand.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold bg-tomato text-white hover:bg-tomato-dark transition-colors min-h-[44px] shadow-[0_4px_14px_rgba(242,92,5,0.35)]"
            >
              <MessageCircle size={17} />
              Order Now
            </a>

            <button
              onClick={openCart}
              className="touch-target relative rounded-xl text-ink hover:bg-cream-dark transition-colors"
              aria-label={`Open cart, ${itemCount} items`}
            >
              <ShoppingCart size={21} />
              {itemCount > 0 && (
                <span className="absolute top-0.5 right-0.5 h-[18px] min-w-[18px] px-1 flex items-center justify-center rounded-full bg-tomato text-white text-[10px] font-bold">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden touch-target rounded-xl text-ink hover:bg-cream-dark transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-[60] lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed top-3 left-3 right-3 z-[70] lg:hidden safe-top"
            >
              <div className="bg-surface rounded-2xl border border-linen shadow-2xl overflow-hidden max-h-[calc(100dvh-1.5rem)] flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b border-linen shrink-0">
                  <BrandLogo size="sm" compact />
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="touch-target rounded-xl text-ink hover:bg-cream-dark"
                    aria-label="Close menu"
                  >
                    <X size={22} />
                  </button>
                </div>

                <ul className="overflow-y-auto overscroll-contain p-3 space-y-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className={`block px-4 py-3.5 rounded-xl font-bold text-base ${
                          isActive(link.href)
                            ? "bg-tomato/10 text-tomato"
                            : "text-ink hover:bg-cream-dark"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="p-3 border-t border-linen shrink-0 safe-bottom space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border-2 border-linen text-ink font-bold min-h-[48px] hover:bg-cream-dark"
                  >
                    <LogOut size={20} />
                    Logout ({user?.shortName})
                  </button>
                  <a
                    href={brand.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-tomato text-white font-bold min-h-[48px]"
                  >
                    <MessageCircle size={20} />
                    Order on WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      openCart();
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border-2 border-linen text-ink font-bold min-h-[48px] hover:bg-cream-dark"
                  >
                    <ShoppingCart size={20} />
                    View Cart {itemCount > 0 ? `(${itemCount})` : ""}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
