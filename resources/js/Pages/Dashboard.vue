<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import TicketRow from '@/Components/TicketRow.vue'
import OperatorRow from '@/Components/OperatorRow.vue'
import { Head } from '@inertiajs/inertia-vue3'
import { computed, ref } from 'vue'

const props = defineProps(['tickets', 'operators'])

let opsort = ref('asc')
let mode = ref('weight')

const sortedOperators = computed(() => _.orderBy(props.operators, 'free_slots', opsort.value))
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
            <div class="d-flex">
                <v-switch v-model="opsort" false-value="asc" true-value="desc" prepend-icon="mdi-sort-ascending" append-icon="mdi-sort-descending" class="d-flex justify-end" />
                <v-switch v-model="mode" false-value="weight" true-value="duration" prepend-icon="mdi-weight" append-icon="mdi-clock" class="d-flex justify-end" />
            </div>
            <v-table class="ticket-monitor">
                <tbody class="align-text-top">
                    <TicketRow :tickets="tickets" :sort-by="mode"><template #name>Очередь заявок</template></TicketRow>
                    <TransitionGroup name="operator-pool">
                        <OperatorRow v-for="operator in sortedOperators" :key="operator.uuid" :operator="operator" :sort-by="mode" />
                    </TransitionGroup>
                </tbody>
            </v-table>
        </div>
    </DefaultLayout>
</template>

<style scoped>
.ticket-monitor:deep(table) {
    table-layout: fixed;
}
.operator-pool-move {
    transition: all 0.5s ease;
}
</style>
