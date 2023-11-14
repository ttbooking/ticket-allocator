import { createI18n } from "vue-i18n";
import en from "../../../lang/en.json";
import ru from "../../../lang/ru.json";

export default createI18n<[typeof en], "en" | "ru">({
    locale: navigator.language,
    fallbackLocale: "en",
    messages: { en, ru },
    legacy: false,
});
