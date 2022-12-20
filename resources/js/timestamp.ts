import { createSharedComposable, useTimestamp } from "@vueuse/core";

export const useSharedTimestamp = createSharedComposable(() => useTimestamp({ immediate: false, interval: 1000 }));
