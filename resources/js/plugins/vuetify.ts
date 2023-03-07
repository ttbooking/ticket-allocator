// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import { en, ru } from "vuetify/locale";
import { VDataTable } from "vuetify/labs/VDataTable";

export default createVuetify({
    locale: {
        messages: { en, ru },
    },
    components: {
        VDataTable,
    },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
