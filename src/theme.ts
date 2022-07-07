import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  colorScheme: "dark",
  fontFamily: '"Oxygen", sans-serif',
  headings: {
    fontFamily: '"Albert Sans", sans-serif',
    sizes: {
      h1: { fontSize: 38 },
      h2: { fontSize: 26 },
      h3: { fontSize: 20 },
      h4: { fontSize: 18 },
      h5: { fontSize: 16 },
      h6: { fontSize: 14 },
    },
  },
  defaultRadius: "md",
};
