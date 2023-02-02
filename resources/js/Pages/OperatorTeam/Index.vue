<template>
    <Head title="Operator teams" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Operator teams</h2>
        </template>

        <div>
            <v-data-table :headers="headers" :items="teams">
                <template #[`item.actions`]="{ item }">
                    <Link :href="route('ticket-allocator.teams.edit', item.raw.uuid)">
                        <v-btn icon="mdi-pencil" size="small" variant="plain" />
                    </Link>
                    <v-btn icon="mdi-delete" size="small" variant="plain" @click="deleteTeam(item.raw)" />
                </template>
            </v-data-table>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/Layouts/Default.vue";
import { Head, Link, router } from "@inertiajs/vue3";
import { computed, onMounted } from "vue";
import type { OperatorTeam } from "@/types";
import route from "ziggy-js";

import { useRepo } from "pinia-orm";
import OperatorTeamModel from "@/models/OperatorTeam";

const props = defineProps<{
    teams: OperatorTeam[];
}>();

const teamRepo = computed(() => useRepo(OperatorTeamModel));

const teams = computed(() => teamRepo.value.all());

const headers = [
    { title: "Name", key: "name" },
    { title: "Description", key: "description" },
    { title: "Actions", key: "actions", sortable: false },
];

function deleteTeam(team: OperatorTeam) {
    router.delete(route("ticket-allocator.teams.destroy", team.uuid));
    teamRepo.value.destroy(team.uuid);
}

onMounted(() => {
    teamRepo.value.fresh(props.teams);
});
</script>
