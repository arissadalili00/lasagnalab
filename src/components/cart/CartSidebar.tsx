import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../ui/Button";

export function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    subtotal,
    total,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-olive/30 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-[100dvh] w-full sm:max-w-md bg-surface border-l border-linen z-50 flex flex-col shadow-2xl safe-top"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-linen shrink-0">
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-olive flex items-center gap-2">
                <ShoppingBag size={22} className="text-tomato" />
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                className="touch-target rounded-full text-muted hover:text-olive hover:bg-cream-dark transition-colors"
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-3 sm:space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12 px-4">
                  <ShoppingBag size={48} className="text-linen mb-4" />
                  <p className="text-lg font-medium text-olive mb-2">Your cart is empty</p>
                  <p className="text-sm text-muted mb-6">
                    Add some creamy pasta to get started!
                  </p>
                  <Link to="/menu" onClick={closeCart} className="w-full max-w-xs">
                    <Button variant="outline" className="w-full min-h-[48px]">
                      Browse Menu
                    </Button>
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    className="flex gap-3 p-3 rounded-2xl bg-cream-dark/60 border border-linen/60"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm sm:text-base text-olive line-clamp-2 leading-snug">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-tomato font-semibold mt-0.5">
                        {formatCurrency(item.product.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => decreaseQuantity(item.product.id)}
                          className="touch-target rounded-full bg-surface border border-linen text-olive hover:border-tomato/30"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium text-olive">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.product.id)}
                          className="touch-target rounded-full bg-surface border border-linen text-olive hover:border-tomato/30"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="ml-auto touch-target rounded-full text-tomato hover:bg-tomato/10"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-linen space-y-3 safe-bottom shrink-0 bg-cream-dark/30">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal</span>
                    <span className="text-olive">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-linen text-olive">
                    <span>Total</span>
                    <span className="text-tomato">{formatCurrency(total)}</span>
                  </div>
                </div>
                <Link to="/checkout" onClick={closeCart} className="block">
                  <Button className="w-full min-h-[48px]" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
