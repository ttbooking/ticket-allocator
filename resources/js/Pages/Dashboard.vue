<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import TicketRow from '@/Components/TicketRow.vue'
import OperatorRow from '@/Components/OperatorRow.vue'
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
            <v-table class="ticket-monitor">
                <tbody class="align-text-top">
                    <TicketRow :tickets="tickets" :sort-by="mode"><template #name>Очередь заявок</template></TicketRow>
                    <OperatorRow v-for="operator in operators" :key="operator.uuid" :operator="operator" :sort-by="mode" />
                </tbody>
            </v-table>
        </div>
    </DefaultLayout>
</template>

<style scoped>
.ticket-monitor:deep(table) {
    table-layout: fixed;
}
</style>
