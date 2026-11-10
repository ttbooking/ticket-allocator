/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

import { createVuetify } from "vuetify";
import { en, ru } from "vuetify/locale";
//import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
//import { useI18n } from "vue-i18n";
//import i18n from "./i18n";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

export default createVuetify({
    theme: {
        defaultTheme: "system",
        utilities: true,
        themes: {
            system: {
                colors: {
                    primary: "#1867C0",
                    secondary: "#5CBBF6",
                },
            },
        },
    },
    display: {
        mobileBreakpoint: "md",
        thresholds: {
            xs: 0,
            sm: 600,
            md: 840,
            lg: 1145,
            xl: 1545,
            xxl: 2138,
        },
    },
    defaults: {
        global: {
            transition: "scale-transition",
        },
    },
    locale: {
        //adapter: createVueI18nAdapter({ i18n, useI18n }),
        messages: { en, ru },
    },
});
