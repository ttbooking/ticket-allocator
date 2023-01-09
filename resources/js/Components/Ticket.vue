<template>
    <div class="d-inline-block">
        <span>{{ element && "id" in element ? `z${element.id}z` : "bruh" }}</span>
        <v-btn
            :id="`ticket-${ticket.initial_weight}`"
            size="small"
            class="ticket"
            :class="{ overflow }"
            flat
            width="100"
            @mousedown.ctrl="lock"
            @mouseup="unlock"
        >
            <v-icon color="white" icon="mdi-airplane" start />
            <span class="text-white">{{ compactPosition }}</span>
            <!--<v-overlay
                open-on-click
                activator="parent"
                location-strategy="connected"
                location="bottom center"
                origin="auto"
            >
                <v-card width="400" title="aaa" subtitle="bbb" text="zzz" />
            </v-overlay>-->
        </v-btn>
    </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useMouse } from "@vueuse/core";
import { usePointerLock } from "@/composables";
import { usePage } from "@inertiajs/inertia-vue3";
import Ticket from "@/models/Ticket";
import { useSharedDisplayMode } from "@/shared";

import { useRepo } from "pinia-orm";
import TicketRepository from "@/repositories/TicketRepository";

const ticketRepo = computed(() => useRepo(TicketRepository));

const props = defineProps<{
    ticket: Ticket;
}>();

const { lock, unlock, element } = usePointerLock();
const { x } = useMouse({ type: "movement" });

//const multiplier = ref(1);
//const correction = ref(0);

/*watch(element, () => {
    multiplier.value = 1;
    correction.value = 0;
    console.log("x");
});*/

watch(x, (x) => {
    if (!element.value) return;
    //let z = element.value as HTMLElement;
    //z.innerText
    //multiplier.value = Math.round(Math.min(Math.max(multiplier.value - y / 10, 1), 100));
    //correction.value = Math.max(correction.value - x * multiplier.value, correction.value - props.ticket.weight);
    //console.log(correction.value);
    if (x < 0) {
        ticketRepo.value.incrementInitialWeight({ uuid: props.ticket.uuid, weightPoints: x * 10 });
    } else if (x > 0) {
        ticketRepo.value.decrementInitialWeight({ uuid: props.ticket.uuid, weightPoints: -x * 10 });
    }
});

const mode = useSharedDisplayMode();

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
