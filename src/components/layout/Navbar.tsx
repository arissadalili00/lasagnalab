import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { navLinks } from "../../data/site";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { BrandLogo } from "../ui/BrandLogo";
import { scrollToSection, scrollToTop } from "../../utils/scrollToSection";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { itemCount, openCart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const sectionIds = navLinks.map((link) => link.sectionId);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    setMobileOpen(false);
    setUserOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToSection = (sectionId: string) => {
    setMobileOpen(false);
    setUserOpen(false);

    if (sectionId === "home") {
      if (isHome) {
        scrollToTop();
      } else {
        navigate("/");
      }
      return;
    }

    if (isHome) {
      scrollToSection(sectionId);
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const userInitial = user?.shortName?.charAt(0).toUpperCase() ?? "?";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 safe-top px-3 sm:px-4 lg:px-6 pt-3 pointer-events-none">
        <nav
          className={`pointer-events-auto max-w-7xl mx-auto grid grid-cols-[1fr_auto] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-3 sm:px-4 lg:px-5 h-[3.75rem] sm:h-[4.25rem] rounded-2xl border transition-all duration-300 ${
            isScrolled
              ? "bg-surface/98 backdrop-blur-xl border-linen shadow-[0_10px_40px_rgba(28,20,18,0.14)]"
              : "bg-surface/92 backdrop-blur-lg border-white/60 shadow-[0_6px_28px_rgba(28,20,18,0.1)]"
          }`}
          aria-label="Main navigation"
        >
          <div className="flex items-center min-w-0">
            <BrandLogo size="sm" compact />
          </div>

          <ul className="hidden lg:flex items-center gap-1 bg-cream/90 rounded-2xl p-1.5 border border-linen/70 shadow-inner">
            {navLinks.map((link) => {
              const isActive = isHome && activeSection === link.sectionId;
              return (
                <li key={link.sectionId}>
                  <button
                    type="button"
                    onClick={() => goToSection(link.sectionId)}
                    className={`px-4 py-2 text-sm font-bold rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-tomato text-white shadow-[0_4px_14px_rgba(242,92,5,0.35)]"
                        : "text-ink/75 hover:text-ink hover:bg-surface/80"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0">
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

            <div className="relative hidden md:block" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserOpen((open) => !open)}
                className="flex items-center gap-2 pl-1.5 pr-2 py-1.5 rounded-full border border-linen/80 bg-cream-dark/60 hover:bg-cream-dark transition-colors min-h-[44px]"
                aria-expanded={userOpen}
                aria-haspopup="true"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-burgundy text-white text-sm font-bold">
                  {userInitial}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-muted transition-transform ${userOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {userOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-[calc(100%+0.5rem)] w-56 rounded-2xl border border-linen bg-surface shadow-[0_12px_40px_rgba(28,20,18,0.15)] overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-linen bg-cream/50">
                      <p className="text-sm font-bold text-ink truncate">
                        {user?.shortName}
                      </p>
                      <p className="text-xs text-muted truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUserOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-2 px-4 py-3 text-sm font-bold text-ink hover:bg-cream-dark transition-colors"
                    >
                      <LogOut size={16} className="text-tomato" />
                      Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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

                <div className="px-4 py-3 border-b border-linen bg-cream/40 shrink-0">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-burgundy text-white font-bold">
                      {userInitial}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-ink truncate">
                        Hi, {user?.shortName}
                      </p>
                      <p className="text-xs text-muted truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <ul className="overflow-y-auto overscroll-contain p-3 space-y-1">
                  {navLinks.map((link) => {
                    const isActive =
                      isHome && activeSection === link.sectionId;
                    return (
                      <li key={link.sectionId}>
                        <button
                          type="button"
                          onClick={() => goToSection(link.sectionId)}
                          className={`block w-full text-left px-4 py-3.5 rounded-xl font-bold text-base transition-colors ${
                            isActive
                              ? "bg-tomato text-white"
                              : "text-ink hover:bg-cream-dark"
                          }`}
                        >
                          {link.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="p-3 border-t border-linen shrink-0 safe-bottom space-y-2">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      openCart();
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-tomato text-white font-bold min-h-[48px]"
                  >
                    <ShoppingCart size={20} />
                    View Cart {itemCount > 0 ? `(${itemCount})` : ""}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border-2 border-linen text-ink font-bold min-h-[48px] hover:bg-cream-dark"
                  >
                    <LogOut size={20} />
                    Log out
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
