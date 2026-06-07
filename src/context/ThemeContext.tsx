import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");
    try {
      localStorage.setItem("lasagnalab-theme", "light");
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    /* Light-only theme for consistent food-brand contrast */
  }, []);

  const value = useMemo(
    () => ({
      theme: "light" as Theme,
      isDark: false,
      toggleTheme,
    }),
    [toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
