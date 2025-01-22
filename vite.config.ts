import { defineConfig } from "vite";
import i18n from "@intlify/unplugin-vue-i18n/vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import path from "path";

export default defineConfig({
    build: {
        chunkSizeWarningLimit: 600,
        sourcemap: true,
    },
    css: {
        preprocessorOptions: {
            sass: {
                api: "modern",
            },
        },
    },
    plugins: [
        i18n({
            include: [path.resolve(__dirname, "./lang/**")],
        }),
        laravel({
            input: "resources/js/app.ts",
            refresh: true,
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
    ],
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
});
