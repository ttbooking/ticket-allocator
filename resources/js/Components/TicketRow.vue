<template>
    <ticket v-for="ticket in sortedTickets" :key="ticket.uuid" :ticket="ticket"></ticket>
</template>

<script setup>
import Ticket from '@/Components/Ticket.vue'
import { computed } from 'vue'

const props = defineProps(['tickets', 'sortBy', 'sortDirection'])

const sortedTickets = computed(() => _.orderBy(props.tickets, props.sortBy ?? 'weight', props.sortDirection ?? 'desc'))
</script>
