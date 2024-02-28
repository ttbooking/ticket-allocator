/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import { en, ru } from "vuetify/locale";
//import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
//import { useI18n } from "vue-i18n";
//import i18n from "./i18n";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    theme: {
        themes: {
            light: {
                colors: {
                    primary: "#1867C0",
                    secondary: "#5CBBF6",
                },
            },
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
