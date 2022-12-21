import { createSharedComposable, useLocalStorage, useTimestamp } from "@vueuse/core";
import { SortDirection, TicketSortBy } from "./types";

export const useSharedDisplayMode = createSharedComposable(() =>
    useLocalStorage<TicketSortBy>("ticket-allocator.display-mode", "weight")
);

export const useSharedOperatorSorting = createSharedComposable(() =>
    useLocalStorage<SortDirection>("ticket-allocator.operator-sorting", "asc")
);

export const useSharedTimestamp = createSharedComposable(() => useTimestamp({ interval: 1000 }));
