import { onBeforeMount, onBeforeUnmount } from "vue";

export function usePusherChannel(channel: string) {
    const instance = window.Echo.channel(channel);

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
