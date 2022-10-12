<template>
    <TicketRow :tickets="operator.tickets" :sort-by="sortBy" class="operator" :class="status">
        <template #status><v-icon icon="mdi-account" /></template>
        <template #load-max>{{ operator.ticket_limit ?? '&infin;' }}</template>
        <template #complexity-max>{{ operator.complexity_limit ?? '&infin;' }}</template>
        <template #name>{{ operator.name }}</template>
    </TicketRow>
</template>

<script setup>
import TicketRow from '@/Components/TicketRow.vue'
import { computed } from 'vue'

const props = defineProps(['operator', 'sortBy', 'sortDirection'])

const status = computed(() => ({
    online: props.operator.online,
    ready: props.operator.ready,
    busy: !!props.operator.tickets.length,
    full: props.operator.tickets.length >= props.operator.ticket_limit,
}))
</script>

<style scoped>
.operator i { color: #999 }
.operator.online i { color: #f44 }
.operator.online.ready i { color: #4f4 }
.operator.online.ready.full i { color: #fe4 }
.operator:not(.online).busy { background-color: #f2dede }
</style>
