<template>
    <div ref="ticketPool" @mouseup="unlock">
        <TransitionGroup name="ticket-pool" :css="animationEnabled">
            <TicketComponent
                v-for="ticket in tickets"
                :key="ticket.uuid"
                :data-uuid="ticket.uuid"
                :ticket="ticket"
                draggable="true"
                class="mr-1 mb-1"
                @mousedown.ctrl="lock"
            />
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useMouse, usePointerLock } from "@vueuse/core";
import { useDragAndDrop } from "@/composables";
import { default as TicketComponent } from "@/components/Ticket.vue";
import type { Collection } from "pinia-orm";
import Ticket from "@/models/Ticket";

import { useRepo } from "pinia-orm";
import TicketRepository from "@/repositories/TicketRepository";

defineProps<{
    tickets: Collection<Ticket>;
}>();

const ticketPool = ref<HTMLElement | null>(null);
useDragAndDrop(ticketPool, "uuid");

const { lock, unlock, element, triggerElement } = usePointerLock(ticketPool);
const { x } = useMouse({ type: "movement" });

const ticketRepo = computed(() => useRepo(TicketRepository));

watch([element, x], ([element, x]) => {
    if (!element || !triggerElement.value) return;

    const uuid = triggerElement.value.dataset.uuid as string;
    //multiplier.value = Math.round(Math.min(Math.max(multiplier.value - y / 10, 1), 100));
    //correction.value = Math.max(correction.value - x * multiplier.value, correction.value - props.ticket.weight);
    /*if (x < 0) {
        ticketRepo.value.incrementInitialWeight({ uuid, weightPoints: -x * 10 });
    } else if (x > 0) {
        ticketRepo.value.decrementInitialWeight({ uuid, weightPoints: x * 10 });
    }*/
});

const animationEnabled = ref(false);

onMounted(() => {
    setTimeout(() => (animationEnabled.value = true), 500);
});
</script>

<style scoped>
.ticket-pool-move,
.ticket-pool-enter-active {
    transition: all 0.5s ease;
}

.ticket-pool-enter-from {
    transform: translateX(300px);
}

.ticket-pool-leave-active {
    transition: opacity 0.5s;
}

.ticket-pool-leave-to {
    opacity: 0;
}
</style>
