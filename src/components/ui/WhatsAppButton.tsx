import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { brand } from "../../data/site";

export function WhatsAppButton() {
  return (
    <motion.a
      href={brand.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring" }}
      whileTap={{ scale: 0.95 }}
      className="fixed fixed-safe-bottom fixed-safe-right z-40 flex items-center gap-2.5 px-4 sm:px-5 py-3.5 min-h-[52px] rounded-2xl border-2 border-white/20 bg-burgundy text-white text-sm font-bold shadow-[0_8px_32px_rgba(74,21,32,0.45)] hover:bg-burgundy/90 active:scale-95 transition-colors"
      aria-label={brand.whatsappCta}
      title={brand.whatsappEnquiryNote}
    >
      <MessageCircle size={22} className="shrink-0" />
      <span className="hidden sm:inline pr-0.5">{brand.whatsappCta}</span>
    </motion.a>
  );
}
