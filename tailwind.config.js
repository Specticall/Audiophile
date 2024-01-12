/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      contrast: {
        light: "1.1",
      },
      screens: {
        "x-sm": "500px",
        "x-lg": "990px",
      },
      lineHeight: {
        body: "1.5626rem",
        title: "3.625rem",
        subtitle: "2.75rem",
      },
      colors: {
        "accent-dark": "#D87D4A",
        "accent-light": "#fbaf85",
        dark: "#101010",
        gray: "#F1F1F1",
        "gray-light": "#FAFAFA",
      },
    },
    letterSpacing: {
      subtitle: "0.125rem",
      button: "0.0625rem",
      large: "0.625rem",
    },
    fontSize: {
      h1: "3.5rem",
      h2: "2.5rem",
      h3: "2rem",
      h4: "1.75rem",
      h5: "1.5rem",
      h6: "1.125rem",
      body: "0.9375rem",
      overline: "0.875rem",
      subtitle: "0.8125rem",
    },
  },
  plugins: [],
};
