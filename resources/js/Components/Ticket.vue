<template>
    <div class="d-inline-block">
        <v-btn size="small" class="ticket" :class="{ overflow }" flat width="100">
            <v-icon color="white" icon="mdi-airplane" start />
            <span class="text-white">{{ compactPosition }}</span>
            <v-overlay
                open-on-click
                activator="parent"
                location-strategy="connected"
                location="bottom center"
                origin="auto"
            >
                <v-card width="400" title="aaa" subtitle="bbb" text="zzz" />
            </v-overlay>
        </v-btn>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { usePage } from "@inertiajs/inertia-vue3";
import Ticket from "@/models/Ticket";
import { TicketSortBy } from "@/types";

const props = defineProps<{
    ticket: Ticket;
}>();

const mode = useLocalStorage<TicketSortBy>("ticket-allocator.mode", "weight");

const threshold = computed(() => {
    return usePage<{
        durationThreshold: number;
        weightThreshold: number;
    }>().props.value[`${mode.value}Threshold`];
});

const position = computed(() => props.ticket[mode.value]);

const compactPosition = computed(() => (position.value < 100000 ? position.value : position.value.toExponential(1)));

const overflow = computed(() => position.value > threshold.value);

const animation = computed(() => ({
    delay: -position.value + "s",
    duration: threshold.value + "s",
}));
</script>

<style scoped>
.ticket {
    animation-delay: v-bind("animation.delay");
    animation-duration: v-bind("animation.duration");
}
</style>
