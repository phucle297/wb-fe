import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";
export type Color =
  | "zinc"
  | "slate"
  | "stone"
  | "gray"
  | "neutral"
  | "red"
  | "rose"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "violet";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageThemeKey?: string;
  defaultColor?: Color;
  storageColorKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  color: Color;
  setTheme: (theme: Theme) => void;
  setColor: (color: Color) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  color: "yellow",
  setColor: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultColor = "yellow",
  storageThemeKey = "theme",
  storageColorKey = "color",
  ...props
}: Readonly<ThemeProviderProps>) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageThemeKey) as Theme) || defaultTheme);
  const [color, setColor] = useState<Color>(() => (localStorage.getItem(storageColorKey) as Color) || defaultColor);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(
      "light",
      "dark",
      "zinc",
      "slate",
      "stone",
      "gray",
      "neutral",
      "red",
      "rose",
      "orange",
      "green",
      "blue",
      "yellow",
      "violet"
    );

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

      root.classList.add(systemTheme);
      root.classList.add(color);
      return;
    }

    root.classList.add(theme);
    root.classList.add(color);
  }, [theme, color]);

  const value = {
    theme,
    color,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageThemeKey, theme);
      setTheme(theme);
    },
    setColor: (color: Color) => {
      localStorage.setItem(storageColorKey, color);
      setColor(color);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
