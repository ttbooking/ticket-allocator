import dayjs from "./plugins/dayjs";
import i18n from "./plugins/i18n";
import link from "./plugins/link";
import pinia from "./plugins/pinia";
import vuetify from "./plugins/vuetify";

import { createSSRApp, h, DefineComponent } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy/dist/vue.m";
import VBtnEx from "@/components/VBtnEx.vue";

const name = "Laravel";

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${name}`,
        resolve: (name) =>
            resolvePageComponent(`./pages/${name}.vue`, import.meta.glob<DefineComponent>("./pages/**/*.vue")),
        setup({ App, props, plugin }) {
            return createSSRApp({ name, render: () => h(App, props) })
                .use(plugin)
                .use(dayjs)
                .use(i18n)
                .use(link)
                .use(pinia)
                .use(vuetify)
                .use(ZiggyVue, {
                    // @ts-expect-error
                    ...page.props.ziggy,
                    // @ts-expect-error
                    location: new URL(page.props.ziggy.location),
                })
                .component("v-btn-ex", VBtnEx)
                .provide("resolveComponent", props.resolveComponent);
        },
    }),
);
