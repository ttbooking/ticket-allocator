<template>
    <TransitionGroup name="ticket-pool">
        <TicketComponent v-for="ticket in sortedTickets" :key="ticket.uuid" :ticket="ticket" :mode="sortBy" class="mr-1 mb-1" />
    </TransitionGroup>
</template>

<script setup lang="ts">
import { default as TicketComponent } from '@/Components/Ticket.vue'
import _ from 'lodash'
import { computed } from 'vue'
import { Ticket, TicketSortBy, SortDirection } from '@/types'

const props = defineProps<{
    tickets: Ticket[]
    sortBy: TicketSortBy
    sortDirection?: SortDirection
}>()

const sortedTickets = computed<Ticket[]>(() => _.orderBy(props.tickets, props.sortBy ?? 'weight', props.sortDirection ?? 'desc'))
</script>

<style scoped>
.ticket-pool-move {
    transition: all 0.5s ease;
}
</style>
