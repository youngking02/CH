// theme.js
import { extendTheme } from "@chakra-ui/react";

// Définir vos nouvelles couleurs
const customTheme = extendTheme({
  colors: {
    brand: {
      50: "#E0F7FA",
      100: "#B3E5FC",
      200: "#81D4FA",
      300: "#4FC3F7",
      400: "#29B6F6",
      500: "#03A9F4", // Blue
      600: "#039BE5",
      700: "#0288D1",
      800: "#0277BD",
      900: "#01579B",
    },
    secondary: {
      50: "#FFF3E0",
      100: "#FFE0B2",
      200: "#FFCC80",
      300: "#FFB74D",
      400: "#FFA726",
      500: "#FF9800", // Orange
      600: "#FB8C00",
      700: "#F57C00",
      800: "#EF6C00",
      900: "#E65100",
    },
  },
});

export default customTheme;
