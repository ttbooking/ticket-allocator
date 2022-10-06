<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import TicketRow from '@/Components/TicketRow.vue'
import { Head } from '@inertiajs/inertia-vue3'

defineProps(['tickets', 'operators'])
</script>

<template>
    <Head title="Dashboard" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <v-table>
                            <tbody class="align-text-top">
                                <tr>
                                    <td></td>
                                    <td class="font-weight-bold">Очередь заявок</td>
                                    <td class="text-center">{{ tickets.length }}/&infin;</td>
                                    <td class="text-center">{{ tickets.reduce((n, {complexity}) => n + complexity, 0) }}/&infin;</td>
                                    <td class="pt-1">
                                        <ticket-row :tickets="tickets" sort-by="weight"></ticket-row>
                                    </td>
                                </tr>
                                <tr v-for="operator in operators" :key="operator.uuid">
                                    <td><v-icon color="#4f4" icon="mdi-account"></v-icon></td>
                                    <td>{{ operator.name }}</td>
                                    <td class="text-center">{{ operator.tickets.length }}/{{ operator.ticket_limit ?? '&infin;' }}</td>
                                    <td class="text-center">{{ operator.tickets.reduce((n, {complexity}) => n + complexity, 0) }}/{{ operator.complexity_limit ?? '&infin;' }}</td>
                                    <td class="pt-1">
                                        <ticket-row :tickets="operator.tickets" sort-by="weight"></ticket-row>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>
