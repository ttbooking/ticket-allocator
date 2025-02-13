import { AxiosInstance } from "axios";
import Echo from "laravel-echo";
import dayjs from "dayjs";
import { route as routeFn, Config as ZiggyConfig } from "ziggy-js";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { PageProps as AppPageProps } from "./";
import en from "../../../lang/en.json";

declare global {
    interface Window {
        axios: AxiosInstance;
        Echo: Echo<"pusher">;
    }

    const route: typeof routeFn;
    const Ziggy: ZiggyConfig;
}

declare module "vue" {
    interface ComponentCustomProperties {
        $dayjs: typeof dayjs;
        route: typeof routeFn;
    }
}

declare module "@inertiajs/core" {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}

declare module "vue-i18n" {
    type MessageSchema = typeof en;

    interface DefineLocaleMessage extends MessageSchema {}
}
