import "../css/app.css";

import pinia from "./plugins/pinia";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import { createApp, h, DefineComponent } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { i18nVue } from "laravel-vue-i18n";
//import { ZiggyVue } from "ziggy-js";

import.meta.glob("../images/**");

loadFonts();

const name = window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${name}`,
    resolve: (name) =>
        resolvePageComponent(`./pages/${name}.vue`, import.meta.glob<DefineComponent>("./pages/**/*.vue")),
    setup({ el, App, props, plugin }) {
        createApp({ name, render: () => h(App, props) })
            .use(plugin)
            .use(pinia)
            .use(vuetify)
            //.use(ZiggyVue, window.Ziggy ?? {})
            .use(i18nVue, {
                resolve: (lang: string) => import(`../../lang/${lang}.json`),
            })
            .mount(el);
    },
    progress: { color: "#4b5563" },
});
