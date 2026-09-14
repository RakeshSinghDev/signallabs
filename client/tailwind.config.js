/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Defined Design Token System
        "canvas": "#CBD6E6",          // Primary soft blue-gray / periwinkle background
        "surface": "#FFFFFF",         // Clean white cards & containers
        "text-main": "#111111",       // Near black headings & primary text
        "text-muted": "#667085",      // Slate gray secondary text
        "brand-green": "#08B878",     // Fresh bright green for success/positive
        "brand-blue": "#2879F2",      // Bright modern blue for active/info
        "brand-coral": "#FF4A2D",     // Bright coral/orange for caution/risk
        "brand-dark": "#111111",      // Near black for dark CTAs/accents
        "brand-border": "#E5EAF1",    // Very light blue-gray borders

        // Semantic bindings for existing classes
        "primary": "#111111",
        "on-primary": "#ffffff",
        "primary-container": "#2879F2",
        "on-primary-container": "#ffffff",
        "primary-fixed": "#e6efff",
        "primary-fixed-dim": "#c7dcfe",
        "on-primary-fixed": "#111111",

        "secondary": "#2879F2",
        "on-secondary": "#ffffff",
        "secondary-container": "#e8f1fd",
        "on-secondary-container": "#2879F2",

        "tertiary": "#08B878",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#e6f8f1",
        "on-tertiary-container": "#08B878",
        "tertiary-fixed": "#e6f8f1",
        "on-tertiary-fixed": "#08B878",

        "error": "#FF4A2D",
        "on-error": "#ffffff",
        "error-container": "#ffedea",
        "on-error-container": "#FF4A2D",

        "background": "#CBD6E6",
        "on-background": "#111111",

        "on-surface": "#111111",
        "on-surface-variant": "#667085",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f8fafc",
        "surface-container": "#f1f5f9",
        "surface-container-high": "#e2e8f0",
        "surface-container-highest": "#CBD6E6",

        "inverse-surface": "#111111",
        "inverse-on-surface": "#ffffff",

        "outline": "#667085",
        "outline-variant": "#E5EAF1"
      },
      borderRadius: {
        "DEFAULT": "0.75rem",
        "sm": "0.375rem",
        "md": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "full": "9999px"
      },
      boxShadow: {
        "xs": "0 1px 2px rgba(16, 24, 40, 0.04)",
        "card": "0 2px 12px rgba(16, 24, 40, 0.04)",
        "card-hover": "0 8px 24px rgba(16, 24, 40, 0.08)",
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.375rem",
        "space-md": "0.5rem",
        "space-lg": "0.75rem",
        "space-xl": "1rem",
        "gutter": "0.75rem",
        "margin": "1rem"
      },
      fontFamily: {
        "sans": ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"],
        "headline-lg": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "headline-sm": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"],
        "label-numeric": ["Inter", "sans-serif"],
        "label-code": ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "headline-sm": ["18px", { lineHeight: "26px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "24px", letterSpacing: "-0.005em", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "22px", letterSpacing: "0em", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "18px", letterSpacing: "0em", fontWeight: "400" }],
        "label-numeric": ["14px", { lineHeight: "20px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "label-code": ["12px", { lineHeight: "16px", letterSpacing: "0em", fontWeight: "400" }],
        "label-caps": ["11px", { lineHeight: "14px", letterSpacing: "0.04em", fontWeight: "600" }]
      }
    },
  },
  plugins: [],
}
