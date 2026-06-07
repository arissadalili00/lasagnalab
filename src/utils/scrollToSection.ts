const HEADER_OFFSET = 88;

export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  window.history.replaceState(null, "", `#${id}`);
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.history.replaceState(null, "", "/");
}
