import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  const emailJsConfig = {
    serviceId: env.VITE_EMAILJS_SERVICE_ID?.trim() ?? "",
    templateId: env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? "",
    publicKey: env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? "",
    privateKey: env.VITE_EMAILJS_PRIVATE_KEY?.trim() ?? "",
  };

  return {
    plugins: [react(), tailwindcss()],
    envPrefix: "VITE_",
    define: {
      __EMAILJS_CONFIG__: JSON.stringify(emailJsConfig),
    },
  };
});
