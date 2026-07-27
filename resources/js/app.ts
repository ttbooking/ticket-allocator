import "../css/app.css";

import dayjs from "./plugins/dayjs";
import i18n from "./plugins/i18n";
import link from "./plugins/link";
import pinia from "./plugins/pinia";
import vuetify from "./plugins/vuetify";

import { createApp, h, DefineComponent } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
//import { ZiggyVue } from "ziggy-js";
import DefaultLayout from "@/layouts/Default.vue";
import EmptyLayout from "@/layouts/Empty.vue";
import VBtnEx from "@/components/VBtnEx.vue";

import.meta.glob("../images/**");

const name = window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${name}`,
    resolve: (name) =>
        resolvePageComponent(`./pages/${name}.vue`, import.meta.glob<DefineComponent>("./pages/**/*.vue")),
    setup({ el, App, props, plugin }) {
        createApp({ name, render: () => h(App, props) })
            .use(plugin)
            .use(dayjs)
            .use(i18n)
            .use(link)
            .use(pinia)
            .use(vuetify)
            //.use(ZiggyVue, window.Ziggy ?? {})
            .component("DefaultLayout", DefaultLayout)
            .component("EmptyLayout", EmptyLayout)
            .component("v-btn-ex", VBtnEx)
            .provide("resolveComponent", props.resolveComponent)
            .mount(el);
    },
    progress: { color: "#4B5563" },
});
