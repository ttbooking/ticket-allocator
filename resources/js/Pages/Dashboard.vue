<script setup lang="ts">
import DefaultLayout from "@/Layouts/Default.vue";
import TicketRow from "@/Components/TicketRow.vue";
import OperatorRow from "@/Components/OperatorRow.vue";
import { Head } from "@inertiajs/vue3";
import { computed, ref, onMounted } from "vue";
import { trans } from "laravel-vue-i18n";
import { refThrottled } from "@vueuse/core";
import { useSupervisorApi } from "@/api";
import { useDropZone } from "@/composables";
import type { Operator, Ticket, TicketCategory } from "@/types";
import { useSharedOptions, useSharedDisplayMode, useSharedOperatorSorting } from "@/shared";
import * as Events from "@/events.d";
import { PusherChannel } from "laravel-echo/dist/channel";

import { useRepo } from "pinia-orm";
import { useCollect } from "pinia-orm/dist/helpers";
import OperatorRepository from "@/repositories/OperatorRepository";
import TicketRepository from "@/repositories/TicketRepository";
import TicketCategoryRepository from "@/models/TicketCategory";

const props = defineProps<{
    operators: Operator[];
    tickets: Ticket[];
    ticketCategories: TicketCategory[];
}>();

const options = useSharedOptions();
const mode = useSharedDisplayMode();
const oprSort = useSharedOperatorSorting();

const operatorRepo = computed(() => useRepo(OperatorRepository));
const ticketRepo = computed(() => useRepo(TicketRepository));
const ticketCategoryRepo = computed(() => useRepo(TicketCategoryRepository));

const sortedOperators = refThrottled(
    computed(() =>
        useCollect(
            operatorRepo.value
                .with("tickets", (query) => {
                    query.with("category").orderBy(mode.value, "desc");
                })
                .get()
        ).sortBy([
            ["online", "desc"],
            ["ready", "desc"],
            ["free_slots", "desc"],
            ["ticket_count", "asc"],
            ["name", "asc"],
        ])
    ),
    750
);

const sortedTickets = refThrottled(
    computed(() => ticketRepo.value.unbound().with("category").orderBy(mode.value, "desc").get()),
    750
);

const api = useSupervisorApi();

const closeTicket = ref<HTMLElement | null>(null);
const { isOverDropZone } = useDropZone(
    closeTicket,
    async (dataTransfer) => {
        const uuid = dataTransfer?.getData("text/plain");
        if (!uuid) throw new Error("Ticket UUID undefined.");
        return await api.close(uuid);
    },
    false
);

onMounted(() => {
    operatorRepo.value.fresh(props.operators);
    ticketRepo.value.fresh(props.tickets);
    ticketCategoryRepo.value.fresh(props.ticketCategories);

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
        .listen(Events.Ticket.MetaValueSet, ticketRepo.value.setMetaValue)
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
    <Head :title="trans('dashboard')" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ trans("dashboard") }}</h2>
        </template>

        <div>
            <v-container fluid>
                <v-row>
                    <v-col>
                        <v-btn-toggle v-model="options.all" variant="plain" multiple>
                            <v-btn
                                value="hide-empty"
                                :icon="options.hideEmpty ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                            />
                            <v-btn
                                value="alt-info"
                                :icon="options.altInfo ? 'mdi-magnify-plus-outline' : 'mdi-magnify'"
                            />
                            <v-btn
                                value="unlocked"
                                :icon="options.unlocked ? 'mdi-lock-open-variant' : 'mdi-lock'"
                                color="red"
                                :variant="options.unlocked ? 'text' : 'plain'"
                            />
                        </v-btn-toggle>
                        <v-btn-group v-if="options.unlocked" variant="plain">
                            <v-btn ref="closeTicket" :icon="isOverDropZone ? 'mdi-delete-empty' : 'mdi-delete'" />
                            <v-btn icon="mdi-refresh" />
                        </v-btn-group>
                    </v-col>
                    <v-col cols="2">
                        <v-switch
                            v-model="oprSort"
                            false-value="asc"
                            true-value="desc"
                            prepend-icon="mdi-sort-ascending"
                            append-icon="mdi-sort-descending"
                            class="d-flex justify-end"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-switch
                            v-model="mode"
                            false-value="weight"
                            true-value="duration"
                            prepend-icon="mdi-weight"
                            append-icon="mdi-clock"
                            class="d-flex justify-end"
                        />
                    </v-col>
                </v-row>
            </v-container>
            <v-table density="compact" class="ticket-monitor">
                <tbody class="align-text-top">
                    <TicketRow :tickets="sortedTickets">
                        <template #name>{{ trans("ticket_pool") }}</template>
                    </TicketRow>
                    <TransitionGroup name="operator-pool">
                        <OperatorRow v-for="operator in sortedOperators" :key="operator.uuid" :operator="operator" />
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
