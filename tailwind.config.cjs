/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-radial-bl': 'radial-gradient(circle at bottom left, var(--tw-gradient-stops))',
        'gradient-radial-br': 'radial-gradient(circle at bottom right, var(--tw-gradient-stops))',
        'gradient-radial-tl': 'radial-gradient(circle at top left, var(--tw-gradient-stops))',
        'gradient-radial-tr': 'radial-gradient(circle at top right, var(--tw-gradient-stops))',
        'gradient-radial-t': 'radial-gradient(circle at top, var(--tw-gradient-stops))',
        'gradient-radial-b': 'radial-gradient(circle at bottom, var(--tw-gradient-stops))',
        'gradient-radial-l': 'radial-gradient(circle at left, var(--tw-gradient-stops))',
        'gradient-radial-r': 'radial-gradient(circle at right, var(--tw-gradient-stops))',
      }
    },

  },
  plugins: [],
};
