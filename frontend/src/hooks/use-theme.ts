import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("app_theme") as Theme | null;
    return saved || "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const setAppTheme = (newTheme: Theme) => {
    localStorage.setItem("app_theme", newTheme);
    setTheme(newTheme);
  };

  return { theme, setTheme: setAppTheme };
}
