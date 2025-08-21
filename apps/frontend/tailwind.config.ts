import type { Config } from 'tailwindcss';
import tailwindLineClamp from '@tailwindcss/line-clamp';

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        tailwindLineClamp,
    ],
};

export default config;