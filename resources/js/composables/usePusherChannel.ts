import { onBeforeMount, onBeforeUnmount } from "vue";
import { PusherChannel } from "laravel-echo/dist/channel";

export function usePusherChannel(channel: string) {
    const instance = <PusherChannel>window.Echo.channel(channel);

    onBeforeMount(() => {
        instance.listenToAll((event: string, data: unknown) => {
            console.log(event, data);
        });
    });

    onBeforeUnmount(() => {
        window.Echo.leaveChannel(channel);
    });

    return instance;
}
