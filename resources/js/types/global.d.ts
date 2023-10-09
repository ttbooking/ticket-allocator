import { AxiosInstance } from "axios";
import Echo from "laravel-echo";
import dayjs from "dayjs";
import routeFn, { Config as ZiggyConfig } from "ziggy-js";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { PageProps as AppPageProps } from "./";

declare global {
    interface Window {
        axios: AxiosInstance;
        Echo: Echo;
    }

    const route: typeof routeFn;
    const Ziggy: ZiggyConfig;
}

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $dayjs: typeof dayjs;
        route: typeof routeFn;
    }
}

declare module "@inertiajs/core" {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}
