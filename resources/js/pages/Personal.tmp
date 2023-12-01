<template>
    <Head :title="$t('personal')" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ $t("personal") }}</h2>
        </template>

        <div>
            <v-container fluid>
                <v-row>
                    <v-col>
                        <v-btn-toggle v-model="options.all" variant="plain" multiple>
                            <v-btn
                                value="alt-info"
                                :icon="options.altInfo ? 'mdi-magnify-plus-outline' : 'mdi-magnify'"
                            />
                        </v-btn-toggle>
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
            <v-data-table density="compact" class="personal-monitor" :headers="headers" :items="sortedTickets">
                <TransitionGroup name="ticket-pool">
                    <PersonalTicket v-for="ticket in sortedTickets" :key="ticket.uuid" :ticket="ticket" />
                </TransitionGroup>
            </v-data-table>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue";
import PersonalTicket from "@/components/PersonalTicket.vue";
import { Head, router } from "@inertiajs/vue3";
import { computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { usePusherChannel } from "@/composables";
import type { Ticket, TicketCategory } from "@/types";
import { useSharedOptions, useSharedDisplayMode } from "@/shared";
import * as Events from "@/types/events";

import { useRepo } from "pinia-orm";
import TicketRepository from "@/repositories/TicketRepository";
import TicketCategoryRepository from "@/models/TicketCategory";

const props = defineProps<{
    tickets: Ticket[];
    ticketCategories: TicketCategory[];
}>();

const options = useSharedOptions();
const mode = useSharedDisplayMode();

const ticketRepo = computed(() => useRepo(TicketRepository));
const ticketCategoryRepo = computed(() => useRepo(TicketCategoryRepository));
const channel = usePusherChannel(Events.Channel);

const { t } = useI18n();

const headers = computed(() => [
    { title: t("active"), key: "active", sortable: false },
    { title: t("name"), key: "name" },
    { title: t("description"), key: "description" },
    { title: t("actions"), key: "actions", sortable: false },
]);

const sortedTickets = computed(() => ticketRepo.value.unbound().with("category").orderBy(mode.value, "desc").get());

onMounted(() => {
    channel
        .listen(Events.Common.PropsInvalidated, () => router.reload())
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
.ticket-pool-move {
    transition: all 0.5s ease;
}
</style>
