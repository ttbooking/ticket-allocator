<template>
    <div class="d-inline-block">
        <v-btn size="small" class="ticket" :class="{ overflow }" flat width="100">
            <v-icon color="white" icon="mdi-airplane" start />
            <span class="text-white">{{ position }}</span>
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { usePage } from "@inertiajs/inertia-vue3";
import { ITicket, TicketSortBy } from "@/types";

const props = defineProps<{
    ticket: ITicket;
    mode: TicketSortBy;
}>();

const threshold = computed(() => {
    return usePage<{
        durationThreshold: number;
        weightThreshold: number;
    }>().props.value[`${props.mode}Threshold`];
});

/*const duration = computed(() =>
    Math.round((new Date().getTime() - new Date(props.ticket.created_at).getTime()) / 1000)
);*/

//const weight = computed(() => props.ticket.initial_weight + props.ticket.weight_increment * duration.value);

//const position = computed(() => props.ticket[props.mode]);
const position = ref(props.ticket[props.mode]);

const overflow = computed(() => position.value > threshold.value);

const animation = computed(() => ({
    delay: -position.value + "s",
    duration: threshold.value + "s",
}));

let intervalId: number;

onMounted(() => {
    intervalId = window.setInterval(() => {
        position.value = props.ticket[props.mode];
    });
});

onUnmounted(() => {
    window.clearInterval(intervalId);
});
</script>

<style scoped>
.ticket {
    animation-delay: v-bind("animation.delay");
    animation-duration: v-bind("animation.duration");
}
</style>
