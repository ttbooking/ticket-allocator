import { AxiosInstance } from "axios";
import Echo from "laravel-echo";
import { PusherChannel } from "laravel-echo/dist/channel";
import ziggyRoute, { Config as ZiggyConfig } from "ziggy-js";
import { trans, transChoice } from "laravel-vue-i18n";
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
        $t: typeof trans;
        $tChoice: typeof transChoice;
    }
}

declare module "@inertiajs/core" {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}
