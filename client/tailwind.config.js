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
        "primary": "#000000",
        "on-primary": "#ffffff",
        "primary-container": "#131b2e",
        "on-primary-container": "#7c839b",
        "primary-fixed": "#dae2fd",
        "primary-fixed-dim": "#bec6e0",
        "on-primary-fixed": "#131b2e",
        "on-primary-fixed-variant": "#3f465c",
        "inverse-primary": "#bec6e0",

        "secondary": "#545f73",
        "on-secondary": "#ffffff",
        "secondary-container": "#d5e0f8",
        "on-secondary-container": "#586377",
        "secondary-fixed": "#d8e3fb",
        "secondary-fixed-dim": "#bcc7de",
        "on-secondary-fixed": "#111c2d",
        "on-secondary-fixed-variant": "#3c475a",

        "tertiary": "#000000",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#00210a",
        "on-tertiary-container": "#339650",
        "tertiary-fixed": "#95f8a7",
        "tertiary-fixed-dim": "#79db8d",
        "on-tertiary-fixed": "#00210a",
        "on-tertiary-fixed-variant": "#005323",

        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",

        "background": "#fbf8ff",
        "on-background": "#1a1b22",

        "surface": "#fbf8ff",
        "on-surface": "#1a1b22",
        "surface-variant": "#e3e1ec",
        "on-surface-variant": "#45464d",
        "surface-dim": "#dad9e3",
        "surface-bright": "#fbf8ff",
        "surface-tint": "#565e74",

        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f4f2fd",
        "surface-container": "#eeedf7",
        "surface-container-high": "#e8e7f1",
        "surface-container-highest": "#e3e1ec",

        "inverse-surface": "#2f3038",
        "inverse-on-surface": "#f1effa",

        "outline": "#76777d",
        "outline-variant": "#c6c6cd"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "sm": "0.125rem",
        "md": "0.25rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
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
        "sans": ["Inter", "system-ui", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"],
        "headline-lg": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "headline-sm": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"],
        "label-numeric": ["JetBrains Mono", "monospace"],
        "label-code": ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "headline-lg": ["28px", { lineHeight: "36px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-md": ["20px", { lineHeight: "28px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "headline-sm": ["16px", { lineHeight: "24px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["14px", { lineHeight: "20px", letterSpacing: "-0.005em", fontWeight: "400" }],
        "body-md": ["13px", { lineHeight: "18px", letterSpacing: "0em", fontWeight: "400" }],
        "body-sm": ["12px", { lineHeight: "16px", letterSpacing: "0em", fontWeight: "400" }],
        "label-numeric": ["13px", { lineHeight: "16px", letterSpacing: "-0.01em", fontWeight: "500" }],
        "label-code": ["11px", { lineHeight: "14px", letterSpacing: "0em", fontWeight: "400" }],
        "label-caps": ["10px", { lineHeight: "12px", letterSpacing: "0.06em", fontWeight: "600" }]
      }
    },
  },
  plugins: [],
}
