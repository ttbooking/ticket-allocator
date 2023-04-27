import { AxiosInstance } from "axios";
import Echo from "laravel-echo";
import { PusherChannel } from "laravel-echo/dist/channel";
import ziggyRoute, { Config as ZiggyConfig } from "ziggy-js";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { PageProps as AppPageProps } from "./";

declare global {
    interface Window {
        axios: AxiosInstance;
        Echo: Echo;
        ticketAllocatorChannel: PusherChannel;
        Ziggy: ZiggyConfig;
    }
}

declare module "vue" {
    interface ComponentCustomProperties {
        route: typeof ziggyRoute;
    }
}

declare module "@inertiajs/core" {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}
