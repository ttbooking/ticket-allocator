import "../css/app.css";

import pinia from "./plugins/pinia";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { i18nVue } from "laravel-vue-i18n";
import Colada from "colada-plugin";
//import { ZiggyVue } from "ziggy-js";

loadFonts();

const name = window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${name}`,
    resolve: (name) => resolvePageComponent<any>(`./Pages/${name}.vue`, import.meta.glob("./Pages/**/*.vue")),
    setup: ({ el, App, props, plugin }): any =>
        createApp({ name, render: () => h(App, props) })
            .use(plugin)
            .use(pinia)
            .use(Colada)
            .use(vuetify)
            //.use(ZiggyVue, window.Ziggy ?? {})
            .use(i18nVue, {
                resolve: (lang: string) => import(`../../lang/${lang}.json`),
            })
            .mount(el),
    progress: { color: "#4b5563" },
});
