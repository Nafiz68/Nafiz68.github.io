/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-secondary-container": "#636262",
        "primary": "#3953bd",
        "on-background": "#191c1e",
        "on-primary-fixed-variant": "#1f3ba6",
        "error-container": "#ffdad6",
        "electric-teal": "#4FD1C5",
        "inverse-primary": "#b9c3ff",
        "background": "#f7f9fb",
        "surface-container": "#eceef0",
        "on-tertiary-container": "#fdfcff",
        "tertiary-fixed-dim": "#b8c8de",
        "inverse-surface": "#2d3133",
        "secondary": "#5f5e5e",
        "slate-deep": "#2D3748",
        "tertiary": "#4e5d70",
        "error-coral": "#FF6B6B",
        "surface-container-highest": "#e0e3e5",
        "on-tertiary-fixed": "#0c1d2d",
        "surface-container-lowest": "#ffffff",
        "on-primary": "#ffffff",
        "secondary-fixed": "#e5e2e1",
        "primary-fixed-dim": "#b9c3ff",
        "outline": "#757684",
        "tertiary-container": "#66768a",
        "surface-container-high": "#e6e8ea",
        "surface-bright": "#f7f9fb",
        "surface-tint": "#3c55bf",
        "surface": "#f7f9fb",
        "on-secondary-fixed-variant": "#474746",
        "surface-container-low": "#f2f4f6",
        "surface-variant": "#e0e3e5",
        "warning-amber": "#FECA57",
        "outline-variant": "#c5c5d5",
        "surface-dim": "#d8dadc",
        "on-secondary": "#ffffff",
        "on-primary-fixed": "#001356",
        "on-secondary-fixed": "#1c1b1b",
        "secondary-fixed-dim": "#c8c6c5",
        "on-tertiary-fixed-variant": "#39485a",
        "on-surface": "#191c1e",
        "primary-container": "#546cd7",
        "primary-fixed": "#dde1ff",
        "on-surface-variant": "#444653",
        "error": "#ba1a1a",
        "secondary-container": "#e2dfde",
        "on-error": "#ffffff",
        "tertiary-fixed": "#d4e4fb",
        "inverse-on-surface": "#eff1f3",
        "on-primary-container": "#fffbff",
        "on-error-container": "#93000a",
        "on-tertiary": "#ffffff"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "margin-desktop": "64px",
        "margin-mobile": "24px",
        "unit": "8px",
        "container-max": "1280px",
        "gutter": "32px",
        "section-gap": "120px"
      },
      fontFamily: {
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "display-lg-mobile": ["Inter", "sans-serif"],
        "display-lg": ["Inter", "sans-serif"],
        "label-sm": ["JetBrains Mono", "monospace"],
        "headline-md": ["Inter", "sans-serif"],
        "label-md": ["JetBrains Mono", "monospace"],
        "headline-lg": ["Inter", "sans-serif"]
      },
      fontSize: {
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "display-lg-mobile": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-lg": ["64px", { lineHeight: "72px", letterSpacing: "-0.02em", fontWeight: "800" }],
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "500" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.05em", fontWeight: "500" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" }]
      }
    }
  },
  plugins: []
}
