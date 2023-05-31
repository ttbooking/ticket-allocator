import dayjs from "./plugins/dayjs";
import link from "./plugins/link";
import pinia from "./plugins/pinia";
import vuetify from "./plugins/vuetify";

import { createSSRApp, h, DefineComponent } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { i18nVue } from "laravel-vue-i18n";
import { ZiggyVue } from "../../vendor/tightenco/ziggy/dist/vue.m";

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
                .use(link)
                .use(pinia)
                .use(vuetify)
                .use(i18nVue, {
                    resolve: (lang: string) => {
                        const languages = import.meta.glob("../../lang/*.json", { import: "default", eager: true });
                        return languages[`../../lang/${lang}.json`];
                    },
                })
                .use(ZiggyVue, {
                    // @ts-expect-error
                    ...page.props.ziggy,
                    // @ts-expect-error
                    location: new URL(page.props.ziggy.location),
                });
        },
    })
);
