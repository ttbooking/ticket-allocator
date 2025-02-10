<template>
    <tr ref="ticketRow" class="ticket-row" :class="{ dragover: isOverDropZone }">
        <component :is="cell" class="status py-1">
            <slot name="status" />
        </component>

        <component :is="cell" class="name font-weight-bold !pt-[6px]">
            <slot name="name" />
        </component>

        <component :is="cell" class="load !pt-[6px] text-center">
            <slot name="load">{{ tickets.length }}</slot
            >/<slot name="load-max">&infin;</slot>
        </component>

        <component :is="cell" class="complexity !pt-[6px] text-center">
            <slot name="complexity">{{ complexity }}</slot
            >/<slot name="complexity-max">&infin;</slot>
        </component>

        <TicketPool :tag="cell" :tickets="tickets" :class="{ collapsed }" />

        <component :is="cell" class="more !pt-[2px] text-center">
            <v-btn size="x-small" variant="tonal" :icon="moreIcon" @click="collapsed = !collapsed" />
        </component>
    </tr>
</template>

<script setup lang="ts">
import TicketPool from "@/components/TicketPool.vue";
import { computed, ref } from "vue";
import { useSupervisorApi } from "@/api";
import { useDropZone } from "@/composables";
import type { Collection } from "pinia-orm";
import Ticket from "@/models/Ticket";

const props = defineProps<{
    tickets: Collection<Ticket>;
    pool?: boolean;
}>();

let collapsed = ref(false);

const cell = computed(() => (props.pool ? "th" : "td"));

const complexity = computed(() => props.tickets.reduce((n, { complexity }) => n + complexity, 0));

const moreIcon = computed(() => (collapsed.value ? "mdi-chevron-down" : "mdi-chevron-up"));

const api = useSupervisorApi();

const ticketRow = ref<HTMLElement | null>(null);
const { isOverDropZone } = useDropZone(
    ticketRow,
    async (dataTransfer) => {
        const uuid = dataTransfer?.getData("text/plain");
        if (!uuid) throw new Error("Ticket UUID undefined.");
        const operatorUuid = ticketRow.value?.dataset.uuid;
        return await api.handler(uuid, operatorUuid);
    },
    false,
);
</script>

<style scoped>
.ticket-row .status {
    width: 2.2em;
}
.ticket-row .name {
    width: 12em;
}
.ticket-row .load {
    width: 5em;
}
.ticket-row .complexity {
    width: 5em;
}
.ticket-row .more {
    width: 4.8em;
}
.ticket-row.dragover {
    background-color: #def2de !important;
}
</style>
