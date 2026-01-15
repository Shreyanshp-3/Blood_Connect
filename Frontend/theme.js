import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.800",
      },
    },
  },
  fonts: {
    heading: "Inter, system-ui, sans-serif",
    body: "Inter, system-ui, sans-serif",
  },
  colors: {
    brand: {
      500: "#E53E3E", // blood red
      600: "#C53030",
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "lg",
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: "lg",
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          borderRadius: "lg",
        },
      },
    },
  },
});

export default theme;
