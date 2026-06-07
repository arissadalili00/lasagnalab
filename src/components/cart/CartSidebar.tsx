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
    tax,
    deliveryFee,
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
            className="fixed inset-0 bg-olive/50 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md glass dark:glass-dark z-50 flex flex-col shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between p-5 border-b border-olive/10 dark:border-cream/10">
              <h2 className="font-display text-2xl font-bold flex items-center gap-2">
                <ShoppingBag size={24} className="text-tomato" />
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-olive/5 dark:hover:bg-cream/10 transition-colors"
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingBag
                    size={48}
                    className="text-olive/20 dark:text-cream/20 mb-4"
                  />
                  <p className="text-lg font-medium mb-2">Your cart is empty</p>
                  <p className="text-sm text-olive/60 dark:text-cream/60 mb-6">
                    Add some delicious lasagna to get started!
                  </p>
                  <Link to="/menu" onClick={closeCart}>
                    <Button variant="outline" className="w-full">
                      Browse Menu
                    </Button>
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="flex gap-3 p-3 rounded-xl bg-white/50 dark:bg-olive/30"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{item.product.name}</h3>
                      <p className="text-sm text-tomato font-semibold">
                        {formatCurrency(item.product.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => decreaseQuantity(item.product.id)}
                          className="p-1 rounded-full bg-olive/10 dark:bg-cream/10 hover:bg-olive/20 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.product.id)}
                          className="p-1 rounded-full bg-olive/10 dark:bg-cream/10 hover:bg-olive/20 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="ml-auto p-1 rounded-full text-tomato hover:bg-tomato/10 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t border-olive/10 dark:border-cream/10 space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-olive/70 dark:text-cream/70">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-olive/70 dark:text-cream/70">Delivery</span>
                    <span>{formatCurrency(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-olive/70 dark:text-cream/70">Tax</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-olive/10 dark:border-cream/10">
                    <span>Total</span>
                    <span className="text-tomato">{formatCurrency(total)}</span>
                  </div>
                </div>
                <Link to="/checkout" onClick={closeCart} className="block">
                  <Button className="w-full" size="lg">
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
