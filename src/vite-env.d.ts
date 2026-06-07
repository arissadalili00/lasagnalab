/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  readonly VITE_EMAILJS_PRIVATE_KEY?: string;
}

interface EmailJsRuntimeConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  privateKey: string;
}

declare const __EMAILJS_CONFIG__: EmailJsRuntimeConfig;

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
