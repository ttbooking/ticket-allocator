<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import TicketPool from '@/Components/TicketPool.vue'
import { Head } from '@inertiajs/inertia-vue3'
import { ref } from 'vue'

defineProps(['tickets', 'operators'])

let mode = ref('weight')
</script>

<template>
    <Head title="Dashboard" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard
            </h2>
        </template>

        <div>
            <v-switch v-model="mode" false-value="weight" true-value="duration" prepend-icon="mdi-weight" append-icon="mdi-clock" class="d-flex justify-end"></v-switch>
            <v-table class="ta-mon">
                <tbody class="align-text-top">
                    <tr>
                        <td class="status"></td>
                        <td class="name font-weight-bold">Очередь заявок</td>
                        <td class="load text-center">{{ tickets.length }}/&infin;</td>
                        <td class="complexity text-center">{{ tickets.reduce((n, {complexity}) => n + complexity, 0) }}/&infin;</td>
                        <td class="tickets pt-1" style="overflow: hidden">
                            <ticket-pool :tickets="tickets" :sort-by="mode"></ticket-pool>
                        </td>
                        <td class="more">
                            <v-btn size="x-small" variant="tonal" icon="mdi-unfold-more-horizontal"></v-btn>
                        </td>
                    </tr>
                    <tr v-for="operator in operators" :key="operator.uuid">
                        <td class="status"><v-icon color="#4f4" icon="mdi-account"></v-icon></td>
                        <td class="name">{{ operator.name }}</td>
                        <td class="load text-center">{{ operator.tickets.length }}/{{ operator.ticket_limit ?? '&infin;' }}</td>
                        <td class="complexity text-center">{{ operator.tickets.reduce((n, {complexity}) => n + complexity, 0) }}/{{ operator.complexity_limit ?? '&infin;' }}</td>
                        <td class="tickets pt-1">
                            <ticket-pool :tickets="operator.tickets" :sort-by="mode"></ticket-pool>
                        </td>
                        <td class="more">
                            <v-btn size="x-small" variant="tonal" icon="mdi-unfold-more-horizontal"></v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </DefaultLayout>
</template>

<style scoped>
.ta-mon:deep(table) {
    table-layout: fixed;
}
.ta-mon .status { width: 2.2em }
.ta-mon .name { width: 14em }
.ta-mon .load { width: 3.9em }
.ta-mon .complexity { width: 5em }
.ta-mon .more { width: 4.8em }
</style>
