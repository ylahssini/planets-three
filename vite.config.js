/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

export default defineConfig({
    plugins: [reactRefresh()],
    build: {
        outDir: 'build',
    },
    resolve: {
        alias: [
            { find: '@src', replacement: path.resolve(__dirname, 'src') },
        ],
    },
});
