import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import * as locales from "@mui/material/locale";

type SupportedLocales = keyof typeof locales;
const locale: SupportedLocales = "ptBR";

// color design tokens export
export const tokens = (mode: any) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#d6d6d6",
          200: "#b8b8b8",
          300: "#9b9b9b",
          400: "#7d7d7d",
          500: "#606060",
          600: "#4a4a4a",
          700: "#343434",
          800: "#1f1f1f",
          900: "#121212", // Mais escuro para fundo
        },
        primary: {
          100: "#cdd2d8",
          200: "#9aa5b2",
          300: "#67788c",
          400: "#344b66",
          500: "#1e324c", // Ajustado para um tom mais profundo
          600: "#19283d",
          700: "#141e2f",
          800: "#0f1420",
          900: "#0a0a11",
        },
        greenAccent: {
          100: "#d2f2e6",
          200: "#a6e5cd",
          300: "#79d8b3",
          400: "#4dca9a",
          500: "#2ebf82", // Mais equilibrado para o dark mode
          600: "#24976a",
          700: "#1b7052",
          800: "#12483a",
          900: "#092020",
        },
        redAccent: {
          100: "#f4cccc",
          200: "#e89999",
          300: "#dc6666",
          400: "#d03333",
          500: "#c40000", // Um vermelho mais vibrante no dark mode
          600: "#9d0000",
          700: "#760000",
          800: "#500000",
          900: "#2a0000",
        },
        blueAccent: {
          100: "#cfdffe",
          200: "#9fbefe",
          300: "#6f9dfe",
          400: "#3f7cfe",
          500: "#1f5bf8", // Azul mais vibrante e contrastante
          600: "#1849c6",
          700: "#123794",
          800: "#0c2562",
          900: "#061330",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0",
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode: any) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // Paleta para Dark Mode
            primary: {
              main: colors.primary[400], // Ajustado para melhor legibilidade
            },
            label: {
              main: colors.primary[200], // Melhor visibilidade de textos e ícones
            },
            secondary: {
              main: colors.greenAccent[400], // Um verde menos saturado para equilíbrio
            },
            neutral: {
              dark: colors.grey[800], // Mais contraste para elementos em destaque
              main: colors.grey[500],
              light: colors.grey[300],
            },
            background: {
              default: "#121212", // Fundo mais confortável para o modo escuro
              paper: "#1E1E1E", // Melhorando o contraste de cartões/dialogs
            },
          }
        : {
            // Paleta para Light Mode
            primary: {
              main: colors.primary[500],
            },
            label: {
              main: colors.primary[700],
            },
            secondary: {
              main: colors.greenAccent[600],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
              paper: "#ffffff",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: 700, // Melhora a legibilidade no dark mode
        color: mode === "dark" ? colors.grey[100] : colors.grey[900],
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: 600,
        color: mode === "dark" ? colors.grey[200] : colors.grey[800],
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
        fontWeight: 500,
        color: mode === "dark" ? colors.grey[300] : colors.grey[700],
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 500,
        color: mode === "dark" ? colors.grey[400] : colors.grey[600],
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 400,
        color: mode === "dark" ? colors.grey[500] : colors.grey[500],
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 400,
        color: mode === "dark" ? colors.grey[600] : colors.grey[400],
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme: any = useMemo(
    () => createTheme(themeSettings(mode), locales[locale]),
    [mode]
  );
  return [theme, colorMode];
};
