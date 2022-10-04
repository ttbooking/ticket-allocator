<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
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
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td class="font-weight-bold">Очередь заявок</td>
                                    <td class="text-center">{{ tickets.length }}/&infin;</td>
                                    <td class="text-center">{{ tickets.reduce((n, {complexity}) => n + complexity, 0) }}/&infin;</td>
                                    <td class="pt-1">
                                        <v-btn v-for="ticket in tickets" :key="ticket.uuid" size="small" color="blue" class="mr-1 mb-1" flat="flat" width="100">
                                            <v-icon color="white" icon="mdi-airplane" start></v-icon>
                                            <span class="text-white">{{ ticket.initial_weight }}</span>
                                            <v-overlay open-on-click activator="parent" location-strategy="connected" location="bottom center" origin="auto">
                                                <v-card
                                                    width="400"
                                                    title="aaa"
                                                    subtitle="bbb"
                                                    text="zzz"
                                                >
                                                </v-card>
                                            </v-overlay>
                                        </v-btn>
                                    </td>
                                </tr>
                                <tr v-for="operator in operators" :key="operator.uuid">
                                    <td><v-icon color="#4f4" icon="mdi-account"></v-icon></td>
                                    <td>{{ operator.name }}</td>
                                    <td class="text-center">{{ operator.tickets.length }}/{{ operator.ticket_limit ?? '&infin;' }}</td>
                                    <td class="text-center">{{ operator.tickets.reduce((n, {complexity}) => n + complexity, 0) }}/{{ operator.complexity_limit ?? '&infin;' }}</td>
                                    <td class="pt-1">
                                        <v-btn v-for="ticket in operator.tickets" :key="ticket.uuid" size="small" color="blue" class="mr-1 mb-1" flat="flat" width="100">
                                            <v-icon color="white" icon="mdi-airplane" start></v-icon>
                                            <span class="text-white">{{ ticket.initial_weight }}</span>
                                            <v-overlay open-on-click activator="parent" location-strategy="connected" location="bottom center" origin="auto">
                                                <v-card
                                                    width="400"
                                                    title="aaa"
                                                    subtitle="bbb"
                                                    text="zzz"
                                                >
                                                </v-card>
                                            </v-overlay>
                                        </v-btn>
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
