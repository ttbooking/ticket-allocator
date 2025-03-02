<template>
    <Head :title="$t('personal')" />

    <component :is="`${layout}-layout`">
        <template #header>
            <h2 class="text-xl leading-tight font-semibold text-gray-800">{{ $t("personal") }}</h2>
        </template>

        <div>
            <v-container fluid>
                <v-row>
                    <v-col offset="10" cols="2">
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
            <v-table v-if="computedOperator" fixed-header density="compact" class="personal-monitor">
                <thead>
                    <tr>
                        <th v-for="[title, key] in columns" :key="key">{{ title }}</th>
                    </tr>
                </thead>
                <TransGroup tag="tbody" name="ticket-pool">
                    <PersonalTicket
                        v-for="ticket in computedOperator.tickets"
                        :key="ticket.uuid"
                        :ticket="ticket"
                        :columns="columns"
                    />
                </TransGroup>
            </v-table>
        </div>
    </component>
</template>

<script setup lang="ts">
import PersonalTicket from "@/components/PersonalTicket.vue";
import { TransitionGroup as TransGroup } from "@/components/TransitionGroup";
import { Head, router } from "@inertiajs/vue3";
import { computed, onMounted, onUnmounted } from "vue";
import { usePusherChannel } from "@/composables";
import type { Operator, Ticket } from "@/types";
import { useSharedDisplayMode } from "@/shared";
import * as Events from "@/types/events.d";

import { useRepo } from "pinia-orm";
import OperatorRepository from "@/repositories/OperatorRepository";
import TicketRepository from "@/repositories/TicketRepository";

const props = withDefaults(
    defineProps<{
        layout: string;
        operator: Operator;
        tickets: Ticket[];
        columns: [string, string][];
    }>(),
    {
        layout: "default",
    },
);

const mode = useSharedDisplayMode();

const operatorRepo = computed(() => useRepo(OperatorRepository));
const ticketRepo = computed(() => useRepo(TicketRepository));
const channel = usePusherChannel(Events.Channel);

const computedOperator = computed(
    () => operatorRepo.value.with("tickets", (query) => query.with("category").orderBy(mode.value, "desc")).first()!,
);

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
    operatorRepo.value.fresh(props.operator);
    ticketRepo.value.fresh(props.tickets);
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
    transition: transform 0.5s ease-in-out;
}
</style>
