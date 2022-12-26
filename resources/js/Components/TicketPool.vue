<template>
    <TransitionGroup name="ticket-pool" :css="animationEnabled">
        <TicketComponent v-for="(ticket, index) in myTickets" :key="ticket.uuid" v-model="myTickets[index]" class="mr-1 mb-1" />
    </TransitionGroup>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { default as TicketComponent } from "@/Components/Ticket.vue";
import Ticket from "@/models/Ticket";

const props = defineProps<{
    tickets: Ticket[];
}>();

const myTickets = computed(() => props.tickets);

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
