import { defineConfig } from "vite";
import i18n from "@intlify/unplugin-vue-i18n/vite";
import inertia from "@inertiajs/vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import fonts from "unplugin-fonts/vite";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import path from "path";

export default defineConfig({
    build: {
        chunkSizeWarningLimit: 600,
        sourcemap: true,
    },
    plugins: [
        i18n({
            include: [path.resolve(__dirname, "./lang/**")],
        }),
        inertia(),
        laravel({
            input: "resources/js/app.ts",
            refresh: true,
            //assets: "resources/images/**",
        }),
        tailwindcss(),
        vue({
            template: { transformAssetUrls },
        }),
        // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
        vuetify({
            autoImport: true,
            styles: {
                configFile: "resources/css/settings.scss",
            },
        }),
        fonts({
            fontsource: {
                families: [
                    {
                        name: "Roboto Mono",
                        weights: [400, 700],
                    },
                    {
                        name: "Roboto",
                        weights: [100, 300, 400, 500, 700, 900],
                        styles: ["normal", "italic"],
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
});
