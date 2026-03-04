/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                base: 'var(--bg)',
                surface: 'var(--surface)',
                text: 'var(--text)',
                muted: 'var(--muted)',
                border: 'var(--border)',
                accent: 'var(--accent)',
                accent2: 'var(--accent2)',
            },
            fontFamily: {
                serif: ['Cormorant Garamond', 'serif'],
                sans: ['Manrope', 'sans-serif'],
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(16px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.8s ease-out forwards',
                'fade-in-up': 'fade-in-up 0.4s ease-out forwards',
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.scrollbar-hide': {
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none',
                },
                '.scrollbar-hide::-webkit-scrollbar': {
                    display: 'none',
                },
            });
        },
    ],
};
