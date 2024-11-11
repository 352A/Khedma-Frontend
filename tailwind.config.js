/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGreen: "#81C784",
        complementary: "#388E3C",
        base: "#002b79",
        tertiary: "#e7d750",
        highlight: "#074ce7",
        accent: "#ff7b0f",
        blue: "#2196F3",
      },
      fontFamily: {
        cairo: ["cairo"],
        noto: ["noto"],
      },
      animation: {
        gradient: "gradient 15s ease infinite",
        float: "float 5s ease-in-out infinite",
        slideInRight: "slideInRight 0.2s ease-in-out forwards",
      },
      keyframes: {
        gradient: {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(10px, -20px)" },
          "50%": { transform: "translate(-15px, 25px)" },
          "75%": { transform: "translate(20px, -10px)" },
        },
        slideInRight: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      backgroundSize: {
        "400%": "400% 400%",
      },
      backgroundImage: {
        "gradient-animation": "linear-gradient(-45deg, #5A9BD5, #4CAF50)",
        "floating-circles":
          "radial-gradient(circle, rgba(255,255,255,0.2) 15%, transparent 70%)",
      },
      blur: {
        xl: "40px",
      },
      opacity: {
        15: "0.15",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#4CAF50",
              50: "#E8F5E9", // Lightest shade
              100: "#C8E6C9",
              200: "#A5D6A7",
              300: "#81C784",
              400: "#66BB6A",
              500: "#4CAF50", // Default shade
              600: "#43A047",
              700: "#4CAF50", // Darker shade
              800: "#2C6B2F",
              900: "#1B5E20", // Darkest shade
            },
            secondary: {
              DEFAULT: "#E9E9E9",
            },
            focus: "#388E3C",
          },
        },
        khedmablue: {
          colors: {
            primary: {
              DEFAULT: "#4cc",
              700: "#4cc",
            },
          },
        },
      },
    }),
  ],
};
