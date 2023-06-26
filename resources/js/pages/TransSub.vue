<template>
    <TransitionGroup tag="td" name="tickets">
        <TransTicket v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
    </TransitionGroup>
</template>

<script setup lang="ts">
import TransTicket from "@/pages/TransTicket.vue";
import type { Ticket } from "@/types/trans.d";

defineProps<{ tickets: Ticket[] }>();
</script>

<style scoped>
.tickets-move,
.tickets-enter-active {
    transition: transform 2s linear;
}

.tickets-enter-from {
    transform: translateX(300px);
}

.tickets-leave-active {
    transition: opacity 2s;
    position: absolute;
}

.tickets-leave-to {
    opacity: 0;
}
</style>
