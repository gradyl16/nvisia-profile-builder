import { defineConfig, mergeConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default mergeConfig(
    defineConfig({
        plugins: [react()],

        envDir: './environments',

        server: {
            port: 4200,
        },

        resolve: {
            alias: {
                '@src': path.resolve(__dirname, './src'),

                '@assets': path.resolve(__dirname, './src/assets'),
                '@core': path.resolve(__dirname, './src/modules/core'),
                '@shared': path.resolve(__dirname, './src/shared'),

                '@modules/login': path.resolve(__dirname, './src/modules/login'),
            },
        },
    }),
    {
        test: {
            environment: 'jsdom',
            setupFiles: ['tests/setup.ts'],
            globals: true,
        },
    }
);
