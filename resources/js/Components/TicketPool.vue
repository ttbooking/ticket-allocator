<template>
    <TransitionGroup name="ticket-pool">
        <Ticket v-for="ticket in sortedTickets" :key="ticket.uuid" :ticket="ticket" :mode="sortBy" class="mr-1 mb-1" />
    </TransitionGroup>
</template>

<script setup>
import Ticket from '@/Components/Ticket.vue'
import { computed } from 'vue'

const props = defineProps(['tickets', 'sortBy', 'sortDirection'])

const sortedTickets = computed(() => _.orderBy(props.tickets, props.sortBy ?? 'weight', props.sortDirection ?? 'desc'))
</script>

<style scoped>
.ticket-pool-move {
    transition: all 0.5s ease;
}
</style>
