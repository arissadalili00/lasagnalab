import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartSidebar } from "../cart/CartSidebar";
import { PageTransition } from "../ui/PageTransition";
import { WhatsAppButton } from "../ui/WhatsAppButton";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pb-20 sm:pb-0">
        <PageTransition />
      </main>
      <Footer />
      <CartSidebar />
      <WhatsAppButton />
    </div>
  );
}
