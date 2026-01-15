import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    brown: {
                        dark: '#4A3728',
                        DEFAULT: '#6B5344',
                        light: '#8B7355',
                    },
                    teal: {
                        dark: '#238177',
                        DEFAULT: '#2A9D8F',
                        light: '#3DB8A9',
                    },
                    cream: '#F5E6D3',
                },
            },
            fontFamily: {
                serif: ['Playfair Display', 'Georgia', 'serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'slide-up': 'slideUp 0.6s ease-out forwards',
                'slide-left': 'slideInLeft 0.6s ease-out forwards',
                'slide-right': 'slideInRight 0.6s ease-out forwards',
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            boxShadow: {
                'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
                'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.1)',
                'teal': '0 4px 15px rgba(42, 157, 143, 0.3)',
                'teal-lg': '0 6px 25px rgba(42, 157, 143, 0.4)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-teal': 'linear-gradient(135deg, #2A9D8F 0%, #238177 100%)',
                'gradient-brown': 'linear-gradient(135deg, #4A3728 0%, #6B5344 100%)',
                'gradient-cream': 'linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 100%)',
            },
        },
    },
    plugins: [],
};

export default config;
