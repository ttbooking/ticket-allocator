import { createSharedComposable, useLocalStorage, useTimestamp } from "@vueuse/core";
import type { TicketSortBy, ToggleOptions } from "./types";
import { computed, reactive } from "vue";

export const useSharedOptions = createSharedComposable(() => {
    const options = useLocalStorage<Array<ToggleOptions>>("ticket-allocator.options", []);

    const hideEmpty = computed(() => options.value.includes("hide-empty"));
    const altInfo = computed(() => options.value.includes("alt-info"));
    const unlocked = computed(() => options.value.includes("unlocked"));

    return reactive({
        all: options,
        hideEmpty,
        altInfo,
        unlocked,
    });
});

export const useSharedDisplayMode = createSharedComposable(() =>
    useLocalStorage<TicketSortBy>("ticket-allocator.display-mode", "weight")
);

export const useSharedTimestamp = createSharedComposable(() => useTimestamp({ interval: 1000 }));
