<template>
    <TransGroup
        ref="ticketPool"
        name="ticket-pool"
        class="@container tickets leading-8 !pt-[1px] !pb-[3px]"
        :css="animationEnabled"
        @mouseup="unlock"
    >
        <TicketComponent
            v-for="ticket in tickets"
            :key="ticket.uuid"
            :data-uuid="ticket.uuid"
            :ticket="ticket"
            draggable="true"
            class="mr-1"
            @mousedown.ctrl="lock"
        />
    </TransGroup>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useMouse, usePointerLock } from "@vueuse/core";
import { useDragAndDrop } from "@/composables";
import { TransitionGroup as TransGroup } from "@/components/TransitionGroup";
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
.ticket-pool-move {
    transition: transform 0.5s ease-in-out;
}

.ticket-pool-enter-active {
    transition: transform 1s ease-out;
}

.ticket-pool-enter-from {
    transform: translateX(100cqw);
}

.ticket-pool-leave-active {
    transition: opacity 0.5s;
    position: absolute;
}

.ticket-pool-leave-to {
    opacity: 0;
}

.tickets {
    overflow: hidden;
}
.tickets.collapsed {
    white-space: nowrap;
    mask-image: linear-gradient(to right, black 85%, transparent);
}
</style>
