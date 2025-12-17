<template>
    <Head :title="$t('dashboard')" />

    <component :is="`${layout}-layout`">
        <template #header>
            <h2 class="text-xl leading-tight font-semibold text-gray-800">{{ $t("dashboard") }}</h2>
        </template>

        <div>
            <v-container fluid>
                <v-row>
                    <v-col>
                        <v-btn-toggle v-model="options.all" variant="plain" multiple>
                            <v-btn
                                value="show-filters"
                                :icon="options.showFilters ? 'mdi-filter-outline' : 'mdi-filter-off-outline'"
                            />
                            <v-btn
                                value="hide-empty"
                                :icon="options.hideEmpty ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                            />
                            <v-btn
                                value="alt-info"
                                :icon="options.altInfo ? 'mdi-magnify-plus-outline' : 'mdi-magnify'"
                            />
                            <v-btn
                                value="pin-header"
                                :icon="options.pinHeader ? 'mdi-pin-outline' : 'mdi-pin-off-outline'"
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
                            v-model="mode"
                            false-value="weight"
                            true-value="duration"
                            prepend-icon="mdi-weight"
                            append-icon="mdi-clock"
                            class="d-flex justify-end"
                        />
                    </v-col>
                </v-row>
                <v-row v-if="options.showFilters">
                    <v-col cols="2">
                        <v-autocomplete
                            v-model="teamFilter"
                            multiple
                            clearable
                            chips
                            closable-chips
                            :label="$t('teams')"
                            :items="operatorTeams"
                            item-title="name"
                            item-value="uuid"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field v-model="filters['title']" :label="$t('filter_title')" />
                    </v-col>
                    <v-col v-for="(items, matcher) in matchers" :key="matcher" cols="2">
                        <v-autocomplete
                            v-model="filters[matcher]"
                            multiple
                            clearable
                            chips
                            closable-chips
                            :label="$t(matcher)"
                            :items="itemify(items)"
                        />
                    </v-col>
                </v-row>
            </v-container>
            <v-table :fixed-header="options.pinHeader" height="600px" density="compact" class="ticket-monitor">
                <thead class="align-top">
                    <TicketRow pool :tickets="sortedTickets">
                        <template #name>{{ $t("ticket_pool") }}</template>
                    </TicketRow>
                </thead>
                <TransGroup tag="tbody" class="align-top" name="operator-pool">
                    <OperatorRow v-for="operator in sortedOperators" :key="operator.uuid" :operator="operator" />
                </TransGroup>
            </v-table>
        </div>
    </component>
</template>

<script setup lang="ts">
import { TransitionGroup as TransGroup } from "@/components/TransitionGroup";
import TicketRow from "@/components/TicketRow.vue";
import OperatorRow from "@/components/OperatorRow.vue";
import { Head, router } from "@inertiajs/vue3";
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useSupervisorApi } from "@/api";
import { useDropZone, usePusherChannel } from "@/composables";
import type { Operator, OperatorTeam, Ticket, TicketCategory, Factor } from "@/types";
import { useSharedOptions, useSharedDisplayMode, useSharedFilters, useSharedTeamFilter } from "@/shared";
import * as Events from "@/types/events.d";

import { useRepo } from "pinia-orm";
import { useCollect } from "pinia-orm/helpers";
import OperatorRepository from "@/repositories/OperatorRepository";
import OperatorTeamRepository from "@/models/OperatorTeam";
import TicketRepository from "@/repositories/TicketRepository";
import TicketCategoryRepository from "@/models/TicketCategory";

const props = withDefaults(
    defineProps<{
        layout?: string;
        operators: Operator[];
        operatorTeams: OperatorTeam[];
        tickets: Ticket[];
        ticketCategories: TicketCategory[];
        factors: Record<string, Factor>;
        matchers: Record<string, Record<string, string | number>>;
    }>(),
    {
        layout: "default",
    },
);

const options = useSharedOptions();
const mode = useSharedDisplayMode();
const filters = useSharedFilters();
const teamFilter = useSharedTeamFilter();

const operatorRepo = computed(() => useRepo(OperatorRepository));
const operatorTeamRepo = computed(() => useRepo(OperatorTeamRepository));
const ticketRepo = computed(() => useRepo(TicketRepository));
const ticketCategoryRepo = computed(() => useRepo(TicketCategoryRepository));
const channel = usePusherChannel(Events.Channel);

const categoryFilter = (category: string) => {
    if (!Array.isArray(filters.value.category) || !filters.value.category.length) return true;

    return filters.value.category.includes(category);
};

const metaFilter = (meta: Record<string, string> | null) => {
    return Object.entries(filters.value).reduce<boolean>((passes, [filter, entries]) => {
        //const [filter, entries] = x;
        const prop = meta?.[filter];
        //console.log(filters);
        const pass =
            prop === undefined ||
            !entries.length ||
            (typeof entries === "string" ? entries === prop.toString() : entries.map(String).includes(prop.toString()));
        //console.log(`${filter} ${pass ? "pass" : "nopass"} ${prop}`);
        return passes && pass;
    }, true);
};

const sortedOperators = computed(() =>
    useCollect(
        operatorRepo.value
            .with("teams")
            .with("tickets", (query) => {
                query.with("category").orderBy(mode.value, "desc");
            })
            .whereHas("tickets")
            .orWhere((operator) => !options.hideEmpty && operator.online)
            .get()
            .filter(
                (operator) =>
                    !teamFilter.value.length || operator.teams.some((team) => teamFilter.value.includes(team.uuid)),
            ),
    ).sortBy([
        ["online", "desc"],
        ["ready", "desc"],
        ["free_slots", "desc"],
        ["ticket_count", "asc"],
        ["name", "asc"],
    ]),
);

const sortedTickets = computed(() =>
    ticketRepo.value
        .unbound()
        .with("category")
        .where("category_uuid", categoryFilter)
        .where("meta", metaFilter)
        .orderBy(mode.value, "desc")
        .get(),
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
    false,
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
        .listen(Events.Ticket.Accepted, ticketRepo.value.accept)
        .listen(Events.Ticket.Unbound, ticketRepo.value.unbind)
        .listen(Events.Ticket.CategoryChanged, ticketRepo.value.changeCategory)
        .listen(Events.Ticket.MetaValueSet, ticketRepo.value.setMetaValue)
        .listen(Events.Ticket.MetaValuesMerged, ticketRepo.value.mergeMetaValues)
        .listen(Events.Ticket.MetricsAdjusted, ticketRepo.value.adjustMetrics);
});

function refreshRepositories() {
    operatorRepo.value.save(props.operators);
    operatorTeamRepo.value.fresh(props.operatorTeams);
    ticketRepo.value.fresh(props.tickets);
    ticketCategoryRepo.value.fresh(props.ticketCategories);
}

const removeNavigateEventListener = router.on("navigate", refreshRepositories);
const removeSuccessEventListener = router.on("success", refreshRepositories);

onUnmounted(() => {
    removeNavigateEventListener();
    removeSuccessEventListener();
});

const itemify = (items: object) => Object.entries(items).map(([title, value]) => ({ title, value }));
</script>

<style scoped>
.ticket-monitor:deep(table) {
    table-layout: fixed;
}
.operator-pool-move {
    transition: transform 0.5s ease-in-out;
}
</style>
