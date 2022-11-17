<script setup lang="ts">
import DefaultLayout from "@/Layouts/Default.vue";
import TicketRow from "@/Components/TicketRow.vue";
import OperatorRow from "@/Components/OperatorRow.vue";
import { Head } from "@inertiajs/inertia-vue3";
import { onMounted } from "vue";
import { IOperator, ITicket, TicketSortBy, SortDirection } from "@/types";
import { useOperatorsStore } from "@/stores/operators";
import { useTicketsStore } from "@/stores/tickets";
import { useLocalStorage } from "@vueuse/core";
import * as Events from "@/events.d";
import { PusherChannel } from "laravel-echo/dist/channel";
import { Ticket } from "@/base";

const props = defineProps<{
    operators: IOperator[];
    tickets: ITicket[];
}>();

const oprStore = useOperatorsStore();
const tckStore = useTicketsStore();

const oprSort = useLocalStorage<SortDirection>("ticket-allocator.opr-sort", "asc");
const mode = useLocalStorage<TicketSortBy>("ticket-allocator.mode", "weight");

onMounted(() => {
    for (const ticket of props.tickets) {
        tckStore.all.set(ticket.uuid, new Ticket(ticket));
    }

    for (const operator of props.operators) {
        oprStore.all.set(operator.uuid, operator);
    }

    window.ticketAllocatorChannel = <PusherChannel>window.Echo.channel(Events.Channel);

    window.ticketAllocatorChannel.listenToAll((event: string, data: any) => {
        console.log(event, data);
    });

    window.ticketAllocatorChannel
        .listen(Events.Operator.Enrolled, oprStore.enroll)
        .listen(Events.Operator.Resigned, oprStore.resign)
        .listen(Events.Operator.NameChanged, oprStore.changeName)
        .listen(Events.Operator.Online, oprStore.setOnline)
        .listen(Events.Operator.Offline, oprStore.setOffline)
        .listen(Events.Operator.Ready, oprStore.setReady)
        .listen(Events.Operator.NotReady, oprStore.setNotReady)
        .listen(Events.Operator.TicketLimitAdjusted, oprStore.adjustTicketLimit)
        .listen(Events.Operator.ComplexityLimitAdjusted, oprStore.adjustComplexityLimit)
        .listen(Events.Ticket.Created, tckStore.create)
        .listen(Events.Ticket.Closed, tckStore.close)
        .listen(Events.Ticket.Bound, tckStore.bind)
        .listen(Events.Ticket.Unbound, tckStore.unbind)
        .listen(Events.Ticket.CategoryChanged, tckStore.changeCategory)
        .listen(Events.Ticket.InitialWeightIncremented, tckStore.incrementInitialWeight)
        .listen(Events.Ticket.InitialWeightDecremented, tckStore.decrementInitialWeight)
        .listen(Events.Ticket.WeightIncrementIncremented, tckStore.incrementWeightIncrement)
        .listen(Events.Ticket.WeightIncrementDecremented, tckStore.decrementWeightIncrement)
        .listen(Events.Ticket.ComplexityIncremented, tckStore.incrementComplexity)
        .listen(Events.Ticket.ComplexityDecremented, tckStore.decrementComplexity)
        .listen(Events.Ticket.DelayIncremented, tckStore.incrementDelay)
        .listen(Events.Ticket.DelayDecremented, tckStore.decrementDelay);
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
                    <TicketRow :tickets="tckStore.unbound" :sort-by="mode">
                        <template #name>Очередь заявок</template>
                    </TicketRow>
                    <TransitionGroup name="operator-pool">
                        <OperatorRow
                            v-for="operator in oprStore.sorted(oprSort)"
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
