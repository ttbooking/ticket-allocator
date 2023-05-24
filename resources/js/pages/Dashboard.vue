<template>
    <Head :title="$t('dashboard')" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ $t("dashboard") }}</h2>
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
                        <template #name>{{ $t("ticket_pool") }}</template>
                    </TicketRow>
                    <TransitionGroup name="operator-pool">
                        <OperatorRow v-for="operator in sortedOperators" :key="operator.uuid" :operator="operator" />
                    </TransitionGroup>
                </tbody>
            </v-table>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue";
import TicketRow from "@/components/TicketRow.vue";
import OperatorRow from "@/components/OperatorRow.vue";
import { Head, router } from "@inertiajs/vue3";
import { computed, ref, onMounted, onUnmounted } from "vue";
import { refThrottled } from "@vueuse/core";
import { useSupervisorApi } from "@/api";
import { useDropZone, usePusherChannel } from "@/composables";
import type { Operator, Ticket, TicketCategory, Factor } from "@/types";
import { useSharedOptions, useSharedDisplayMode, useSharedOperatorSorting } from "@/shared";
import * as Events from "@/types/events.d";

import { useRepo } from "pinia-orm";
import { useCollect } from "pinia-orm/dist/helpers.js";
import OperatorRepository from "@/repositories/OperatorRepository";
import TicketRepository from "@/repositories/TicketRepository";
import TicketCategoryRepository from "@/models/TicketCategory";

const props = defineProps<{
    operators: Operator[];
    tickets: Ticket[];
    ticketCategories: TicketCategory[];
    factors: Record<string, Factor>;
}>();

const options = useSharedOptions();
const mode = useSharedDisplayMode();
const oprSort = useSharedOperatorSorting();

const operatorRepo = computed(() => useRepo(OperatorRepository));
const ticketRepo = computed(() => useRepo(TicketRepository));
const ticketCategoryRepo = computed(() => useRepo(TicketCategoryRepository));
const channel = usePusherChannel(Events.Channel);

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
    channel
        .listen(Events.Common.PropsInvalidated, () => router.reload())
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
        .listen(Events.Ticket.MetaValuesMerged, ticketRepo.value.mergeMetaValues)
        .listen(Events.Ticket.MetricsAdjusted, ticketRepo.value.adjustMetrics);
});

function refreshRepositories() {
    operatorRepo.value.fresh(props.operators);
    ticketRepo.value.fresh(props.tickets);
    ticketCategoryRepo.value.fresh(props.ticketCategories);
}

const removeNavigateEventListener = router.on("navigate", refreshRepositories);
const removeSuccessEventListener = router.on("success", refreshRepositories);

onUnmounted(() => {
    removeNavigateEventListener();
    removeSuccessEventListener();
});
</script>

<style scoped>
.ticket-monitor:deep(table) {
    table-layout: fixed;
}
.operator-pool-move {
    transition: all 0.5s ease;
}
</style>
