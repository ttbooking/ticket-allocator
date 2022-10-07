<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import TicketRow from '@/Components/TicketRow.vue'
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
            <v-table>
                <tbody class="align-text-top">
                    <tr>
                        <td></td>
                        <td class="font-weight-bold">Очередь заявок</td>
                        <td class="text-center">{{ tickets.length }}/&infin;</td>
                        <td class="text-center">{{ tickets.reduce((n, {complexity}) => n + complexity, 0) }}/&infin;</td>
                        <td class="pt-1">
                            <ticket-row :tickets="tickets" :sort-by="mode"></ticket-row>
                        </td>
                    </tr>
                    <tr v-for="operator in operators" :key="operator.uuid">
                        <td><v-icon color="#4f4" icon="mdi-account"></v-icon></td>
                        <td>{{ operator.name }}</td>
                        <td class="text-center">{{ operator.tickets.length }}/{{ operator.ticket_limit ?? '&infin;' }}</td>
                        <td class="text-center">{{ operator.tickets.reduce((n, {complexity}) => n + complexity, 0) }}/{{ operator.complexity_limit ?? '&infin;' }}</td>
                        <td class="pt-1">
                            <ticket-row :tickets="operator.tickets" :sort-by="mode"></ticket-row>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </DefaultLayout>
</template>
