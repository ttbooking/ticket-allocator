import "../css/app.css";

import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import Echo from "laravel-echo";
import { createApp, h } from "vue";
import { createPinia } from "pinia";
import { createInertiaApp } from "@inertiajs/inertia-vue3";
import { InertiaProgress } from "@inertiajs/progress";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "ziggy-js";
import { PusherChannel } from "laravel-echo/dist/channel";

declare global {
    interface Window {
        Echo: Echo;
        ticketAllocatorChannel: PusherChannel;
        Ziggy?: any;
    }
}

loadFonts();

const name: string = window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${name}`,
    resolve: (name) => resolvePageComponent<any>(`./Pages/${name}.vue`, import.meta.glob("./Pages/**/*.vue")),
    setup({ el, app, props, plugin }): any {
        return createApp({ name, render: () => h(app, props) })
            .use(plugin)
            .use(createPinia())
            .use(vuetify)
            .use(ZiggyVue, window.Ziggy ?? {})
            .mount(el);
    },
});

InertiaProgress.init({ color: "#4B5563" });
