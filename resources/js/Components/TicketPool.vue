<template>
    <TransitionGroup name="ticket-pool">
        <TicketComponent
            v-for="ticket in tickets"
            :key="ticket.uuid"
            :ticket="ticket"
            :mode="sortBy"
            class="mr-1 mb-1"
        />
    </TransitionGroup>
</template>

<script setup lang="ts">
import { default as TicketComponent } from "@/Components/Ticket.vue";
import _ from "lodash";
import { ref, onMounted, onUnmounted } from "vue";
import Ticket from "@/models/Ticket";
import { TicketSortBy, SortDirection } from "@/types";

const props = defineProps<{
    tickets: Ticket[];
    sortBy: TicketSortBy;
    sortDirection?: SortDirection;
}>();

const sortedTickets = ref<Ticket[]>([]);

const sortTickets = () =>
    (sortedTickets.value = _.orderBy(props.tickets, props.sortBy ?? "weight", props.sortDirection ?? "desc"));

let intervalId: number;

onMounted(() => {
    sortTickets();
    intervalId = window.setInterval(sortTickets, 1000);
});

onUnmounted(() => {
    window.clearInterval(intervalId);
});
</script>

<style scoped>
.ticket-pool-move,
.ticket-pool-enter-active {
    transition: all 0.5s ease;
}

.ticket-pool-enter-active {
    position: absolute;
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
