/** @type {import("snowpack").SnowpackUserConfig } */
export default {
    mount: {
        public: '/',
        src: '/dist'
    },
    plugins: [
        [
            '@snowpack/plugin-sass',
            { native: false },
        ],
        [
            '@snowpack/plugin-webpack',
            {
                htmlMinifierOptions: true,
            },
        ]
    ],
    routes: [
        /* Enable an SPA Fallback in development: */
        // {"match": "routes", "src": ".*", "dest": "/index.html"},
    ],
    optimize: {
        /* Example: Bundle your final build: */
        bundle: false,
        minify: true,
        target: 'es2020',
    },
    packageOptions: {
        /* ... */
    },
    devOptions: {
        /* ... */
    },
    buildOptions: {
        /* ... */
    },
};
