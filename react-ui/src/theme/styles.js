import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
  colors: {
    brand: {
      100: "#E3F2FD", // bleu clair
      200: "#BBDEFB", // bleu clair
      300: "#64B5F6", // bleu
      400: "#42A5F5", // bleu
      500: "#2196F3", // bleu
      600: "#1E88E5", // bleu foncé
      700: "#1976D2", // bleu foncé
      800: "#1565C0", // bleu foncé
      900: "#0D47A1", // bleu très foncé
    },
  
    brandScheme: {
      100: "#FFF3E0", // orange clair
      200: "#FFE0B2", // orange clair
      300: "#FFB74D", // orange
      400: "#FFA726", // orange
      500: "#FF9800", // orange
      600: "#FB8C00", // orange foncé
      700: "#F57C00", // orange foncé
      800: "#EF6C00", // orange foncé
      900: "#E65100", // orange très foncé
    },
    brandTabs: {
      100: "#E9E3FF",
      200: "#422AFB",
      300: "#422AFB",
      400: "#422AFB",
      500: "#422AFB",
      600: "#3311DB",
      700: "#02044A",
      800: "#190793",
      900: "#02044A",
    },
    secondaryGray: {
      100: "#E0E5F2",
      200: "#E1E9F8",
      300: "#F4F7FE",
      400: "#E9EDF7",
      500: "#8F9BBA",
      600: "#A3AED0",
      700: "#707EAE",
      800: "#707EAE",
      900: "#1B2559",
    },
    red: {
      100: "#FEEFEE",
      500: "#EE5D50",
      600: "#E31A1A",
    },
    blue: {
      50: "#EFF4FB",
      500: "#3965FF",
    },
    orange: {
      100: "#FFF6DA",
      500: "#FFB547",
    },
    green: {
      100: "#E6FAF5",
      500: "#01B574",
    },
    navy: {
      50: "#d0dcfb",
      100: "#aac0fe",
      200: "#a3b9f8",
      300: "#728fea",
      400: "#3652ba",
      500: "#1b3bbb",
      600: "#24388a",
      700: "#1B254B",
      800: "#111c44",
      900: "#0b1437",
    },
    gray: {
      100: "#FAFCFE",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("white.700", "white.900")(props), // Fond bleu
        fontFamily: "DM Sans",
        letterSpacing: "-0.5px",
      },
      input: {
        color: "brand.700",
      },
      html: {
        fontFamily: "DM Sans",
      },
    }),
  },
};
