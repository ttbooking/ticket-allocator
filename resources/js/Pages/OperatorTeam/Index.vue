<template>
    <Head title="Operator teams" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Operator teams</h2>
        </template>

        <div>
            <v-data-table :headers="headers" :items="operatorTeams">
                <template #item.actions="{ item }">
                    <v-icon size="small" @click="api.destroy(item.raw.uuid)">mdi-delete</v-icon>
                </template>
            </v-data-table>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/Layouts/Default.vue";
import { Head } from "@inertiajs/vue3";
import { computed, onMounted } from "vue";
import { useOperatorTeamApi } from "@/api";
import type { OperatorTeam } from "@/types";

import { useRepo } from "pinia-orm";
import OperatorTeamModel from "@/models/OperatorTeam";

const props = defineProps<{
    operatorTeams: OperatorTeam[];
}>();

const teamRepo = computed(() => useRepo(OperatorTeamModel));

const operatorTeams = computed(() => teamRepo.value.all());

const headers = [
    { title: "Name", key: "name" },
    { title: "Description", key: "description" },
    { title: "Actions", key: "actions", sortable: false },
];

const api = useOperatorTeamApi();

onMounted(() => {
    teamRepo.value.fresh(props.operatorTeams);
});
</script>
