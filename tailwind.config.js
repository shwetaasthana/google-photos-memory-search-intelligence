/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        google: {
          blue: '#1a73e8',
          darkBlue: '#1557b0',
          green: '#137333',
          lightGreen: '#e6f4ea',
          yellow: '#f9ab00',
          lightYellow: '#fef7e0',
          red: '#d93025',
          lightRed: '#fce8e6',
          bg: '#f8f9fa',
          surface: '#ffffff',
          text: '#202124',
          muted: '#5f6368',
          border: '#dadce0'
        }
      }
    },
  },
  plugins: [],
}
