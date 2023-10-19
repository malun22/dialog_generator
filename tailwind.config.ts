import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        navbar: "#55a0b9",
        "navbar-hover": "#daecf0",
        "navbar-unactive": "#cdd9e1",
        dark: "#454647",
      },
    },
  },
  plugins: [],
} satisfies Config;
