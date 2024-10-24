<template>
    <Head :title="$t('personal')" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ $t("personal") }}</h2>
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
            <v-table v-if="computedOperator" fixed-header density="comfortable" class="personal-monitor">
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
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue";
import PersonalTicket from "@/components/PersonalTicket.vue";
import { TransitionGroup as TransGroup } from "@/components/TransitionGroup";
import { Head, router } from "@inertiajs/vue3";
import { computed, onMounted, onUnmounted } from "vue";
import { usePusherChannel } from "@/composables";
import type { Operator, TicketCategory } from "@/types";
import { useSharedDisplayMode } from "@/shared";
import * as Events from "@/types/events.d";

import { useRepo } from "pinia-orm";
import OperatorRepository from "@/repositories/OperatorRepository";
import TicketRepository from "@/repositories/TicketRepository";
//import TicketCategoryRepository from "@/models/TicketCategory";

const props = defineProps<{
    operator: Operator;
    //ticketCategories: TicketCategory[];
    columns: [string, string][];
}>();

const mode = useSharedDisplayMode();

const operatorRepo = computed(() => useRepo(OperatorRepository));
const ticketRepo = computed(() => useRepo(TicketRepository));
//const ticketCategoryRepo = computed(() => useRepo(TicketCategoryRepository));
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
    operatorRepo.value.save(props.operator);
    //ticketCategoryRepo.value.fresh(props.ticketCategories);
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

.ticket-pool-enter-active {
    transition: opacity 0.5s;
    position: absolute;
}

.ticket-pool-enter-from {
    opacity: 0;
}

.ticket-pool-leave-active {
    transition: opacity 0.5s;
    position: absolute;
}

.ticket-pool-leave-to {
    opacity: 0;
}
</style>
