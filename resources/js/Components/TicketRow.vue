<template>
    <tr class="ticket-row">

        <td class="status">
            <slot name="status" />
        </td>

        <td class="name font-weight-bold">
            <slot name="name" />
        </td>

        <td class="load text-center">
            <slot name="load">{{ tickets.length }}/&infin;</slot>
        </td>

        <td class="complexity text-center">
            <slot name="complexity">{{ tickets.reduce((n, {complexity}) => n + complexity, 0) }}/&infin;</slot>
        </td>

        <td class="tickets pt-1" :class="{ collapsed }">
            <TicketPool :tickets="tickets" :sort-by="sortBy" />
        </td>

        <td class="more text-center">
            <v-btn @click="collapsed = !collapsed" size="x-small" variant="tonal" :icon="moreIcon" />
        </td>

    </tr>
</template>

<script setup>
import TicketPool from '@/Components/TicketPool.vue'
import { computed, ref } from 'vue'

const props = defineProps(['tickets', 'sortBy', 'sortDirection'])

let collapsed = ref(false)

const moreIcon = computed(() => collapsed.value ? 'mdi-chevron-down' : 'mdi-chevron-up')
</script>

<style scoped>
.ticket-row .status { width: 2.2em }
.ticket-row .name { width: 14em }
.ticket-row .load { width: 3.9em }
.ticket-row .complexity { width: 5em }
.ticket-row .more { width: 4.8em }

.tickets {
    overflow: hidden;
    mask-image: linear-gradient(to right, black 85%, transparent);
}
.tickets.collapsed { white-space: nowrap }
</style>
