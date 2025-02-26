import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        defaultBgColor: "hsl(96, 43%, 73%)",
        adminBgColor: "hsl(0, 0%, 100%)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
