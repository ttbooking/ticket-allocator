import { defineConfig } from "vite";
import i18n from "laravel-vue-i18n/dist/vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import path from "path";

export default defineConfig({
    build: {
        sourcemap: true,
    },
    plugins: [
        i18n(),
        laravel({
            input: "resources/js/app.ts",
            refresh: true,
        }),
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
    ],
    resolve: {
        alias: {
            "@": "/resources/js",
            "ziggy-js": path.resolve("vendor/tightenco/ziggy/dist/index.m"),
        },
    },
});
