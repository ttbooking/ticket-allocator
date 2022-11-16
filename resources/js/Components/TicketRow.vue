<template>
    <tr class="ticket-row">
        <td class="status">
            <slot name="status" />
        </td>

        <td class="name font-weight-bold">
            <slot name="name" />
        </td>

        <td class="load text-center">
            <slot name="load">{{ tickets.length }}</slot
            >/<slot name="load-max">&infin;</slot>
        </td>

        <td class="complexity text-center">
            <slot name="complexity">{{ complexity }}</slot
            >/<slot name="complexity-max">&infin;</slot>
        </td>

        <td class="tickets pt-1" :class="{ collapsed }">
            <TicketPool :tickets="tickets" :sort-by="sortBy" />
        </td>

        <td class="more text-center">
            <v-btn size="x-small" variant="tonal" :icon="moreIcon" @click="collapsed = !collapsed" />
        </td>
    </tr>
</template>

<script setup lang="ts">
import TicketPool from "@/Components/TicketPool.vue";
import { computed, ref } from "vue";
import { ITicket, TicketSortBy, SortDirection } from "@/types";

const props = defineProps<{
    tickets: ITicket[];
    sortBy: TicketSortBy;
    sortDirection?: SortDirection;
}>();

let collapsed = ref<boolean>(false);

const complexity = computed<number>(() => props.tickets.reduce((n, { complexity }) => n + complexity, 0));

const moreIcon = computed<string>(() => (collapsed.value ? "mdi-chevron-down" : "mdi-chevron-up"));
</script>

<style scoped>
.ticket-row .status {
    width: 2.2em;
}
.ticket-row .name {
    width: 14em;
}
.ticket-row .load {
    width: 3.9em;
}
.ticket-row .complexity {
    width: 5em;
}
.ticket-row .more {
    width: 4.8em;
}

.tickets {
    overflow: hidden;
}
.tickets.collapsed {
    white-space: nowrap;
    mask-image: linear-gradient(to right, black 85%, transparent);
}
</style>
