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
import { VDataTable } from "vuetify/labs/VDataTable";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    //ssr: true,
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
    locale: {
        messages: { en, ru },
    },
    components: {
        VDataTable,
    },
});
