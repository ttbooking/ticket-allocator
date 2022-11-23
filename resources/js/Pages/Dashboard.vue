<script setup lang="ts">
import DefaultLayout from "@/Layouts/Default.vue";
import TicketRow from "@/Components/TicketRow.vue";
import OperatorRow from "@/Components/OperatorRow.vue";
import { Head } from "@inertiajs/inertia-vue3";
import { computed, onMounted } from "vue";
import { IOperator, ITicket, TicketSortBy, SortDirection } from "@/types";
import { useLocalStorage } from "@vueuse/core";
import * as Events from "@/events.d";
import { PusherChannel } from "laravel-echo/dist/channel";

import { useRepo } from "pinia-orm";
import OperatorRepository from "@/repositories/OperatorRepository";
import TicketRepository from "@/repositories/TicketRepository";

const props = defineProps<{
    operators: IOperator[];
    tickets: ITicket[];
}>();

const oprSort = useLocalStorage<SortDirection>("ticket-allocator.opr-sort", "asc");
const mode = useLocalStorage<TicketSortBy>("ticket-allocator.mode", "weight");

const operatorRepo = computed(() => useRepo(OperatorRepository));
const ticketRepo = computed(() => useRepo(TicketRepository));

const sortedOperators = computed(() => operatorRepo.value.with("tickets").orderBy("free_slots", oprSort.value).get());
const sortedTickets = computed(() => ticketRepo.value.unbound().orderBy(mode.value, "desc").get());

onMounted(() => {
    operatorRepo.value.fresh(props.operators);
    ticketRepo.value.fresh(props.tickets);

    window.ticketAllocatorChannel = <PusherChannel>window.Echo.channel(Events.Channel);

    window.ticketAllocatorChannel.listenToAll((event: string, data: any) => {
        console.log(event, data);
    });

    window.ticketAllocatorChannel
        .listen(Events.Operator.Enrolled, operatorRepo.value.enroll)
        .listen(Events.Operator.Resigned, operatorRepo.value.resign)
        .listen(Events.Operator.NameChanged, operatorRepo.value.changeName)
        .listen(Events.Operator.Online, operatorRepo.value.setOnline)
        .listen(Events.Operator.Offline, operatorRepo.value.setOffline)
        .listen(Events.Operator.Ready, operatorRepo.value.setReady)
        .listen(Events.Operator.NotReady, operatorRepo.value.setNotReady)
        .listen(Events.Operator.TicketLimitAdjusted, operatorRepo.value.adjustTicketLimit)
        .listen(Events.Operator.ComplexityLimitAdjusted, operatorRepo.value.adjustComplexityLimit)
        .listen(Events.Ticket.Created, ticketRepo.value.create)
        .listen(Events.Ticket.Closed, ticketRepo.value.close)
        .listen(Events.Ticket.Bound, ticketRepo.value.bind)
        .listen(Events.Ticket.Unbound, ticketRepo.value.unbind)
        .listen(Events.Ticket.CategoryChanged, ticketRepo.value.changeCategory)
        .listen(Events.Ticket.InitialWeightIncremented, ticketRepo.value.incrementInitialWeight)
        .listen(Events.Ticket.InitialWeightDecremented, ticketRepo.value.decrementInitialWeight)
        .listen(Events.Ticket.WeightIncrementIncremented, ticketRepo.value.incrementWeightIncrement)
        .listen(Events.Ticket.WeightIncrementDecremented, ticketRepo.value.decrementWeightIncrement)
        .listen(Events.Ticket.ComplexityIncremented, ticketRepo.value.incrementComplexity)
        .listen(Events.Ticket.ComplexityDecremented, ticketRepo.value.decrementComplexity)
        .listen(Events.Ticket.DelayIncremented, ticketRepo.value.incrementDelay)
        .listen(Events.Ticket.DelayDecremented, ticketRepo.value.decrementDelay);
});
</script>

<template>
    <Head title="Dashboard" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
        </template>

        <div>
            <div class="d-flex">
                <v-switch
                    v-model="oprSort"
                    false-value="asc"
                    true-value="desc"
                    prepend-icon="mdi-sort-ascending"
                    append-icon="mdi-sort-descending"
                    class="d-flex justify-end"
                />
                <v-switch
                    v-model="mode"
                    false-value="weight"
                    true-value="duration"
                    prepend-icon="mdi-weight"
                    append-icon="mdi-clock"
                    class="d-flex justify-end"
                />
            </div>
            <v-table class="ticket-monitor">
                <tbody class="align-text-top">
                    <TicketRow :tickets="sortedTickets" :sort-by="mode">
                        <template #name>Очередь заявок</template>
                    </TicketRow>
                    <TransitionGroup name="operator-pool">
                        <OperatorRow
                            v-for="operator in sortedOperators"
                            :key="operator.uuid"
                            :operator="operator"
                            :sort-by="mode"
                        />
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
