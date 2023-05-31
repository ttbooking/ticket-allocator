import dayjs from "dayjs";
import "dayjs/locale/ru";
import duration from "dayjs/plugin/duration";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import RelativeTime from "dayjs/plugin/relativeTime";
import { App } from "vue";

dayjs.locale("ru");
dayjs.extend(duration);
dayjs.extend(LocalizedFormat);
dayjs.extend(RelativeTime);

export default {
    install(app: App) {
        app.config.globalProperties.$dayjs = dayjs;
    },
};
