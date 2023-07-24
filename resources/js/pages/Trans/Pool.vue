<template>
    <TransGroup tag="td" name="tickets" class="@container pt-1">
        <TransTicket v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" class="mr-1 mb-1" />
    </TransGroup>
</template>

<script setup lang="ts">
import { TransitionGroup as TransGroup } from "@/components/TransitionGroup";
import TransTicket from "./Ticket.vue";
import type { Ticket } from "@/types/trans";

defineProps<{ tickets: Ticket[] }>();
</script>

<style scoped>
.tickets-move {
    transition: transform 2s ease-in-out;
}

.tickets-enter-active {
    transition: transform 3s ease-out;
}

.tickets-enter-from {
    transform: translateX(100cqw);
}

.tickets-leave-active {
    transition: opacity 2s;
    position: absolute;
}

.tickets-leave-to {
    opacity: 0;
}
</style>
