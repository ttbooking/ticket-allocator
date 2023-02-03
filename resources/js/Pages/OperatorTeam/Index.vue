<template>
    <Head title="Operator teams" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Operator teams</h2>
        </template>

        <div>
            <v-data-table :headers="headers" :items="teams">
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>Operator teams</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical />
                        <v-spacer />
                        <Link :href="route('ticket-allocator.teams.create')" class="mb-2">
                            <v-btn color="primary" dark>New Item</v-btn>
                        </Link>
                    </v-toolbar>
                </template>
                <template #[`item.active`]="{ item }">
                    <v-checkbox-btn :model-value="!item.raw.deleted_at" disabled />
                </template>
                <template #[`item.actions`]="{ item }">
                    <Link :href="route('ticket-allocator.teams.edit', item.raw.uuid)">
                        <v-btn icon="mdi-pencil" size="small" variant="plain" />
                    </Link>
                    <Link
                        :href="route('ticket-allocator.teams.destroy', item.raw.uuid)"
                        :method="Method.DELETE"
                        as="span"
                    >
                        <v-btn icon="mdi-delete" size="small" variant="plain" />
                    </Link>
                </template>
            </v-data-table>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/Layouts/Default.vue";
import { Head, Link } from "@inertiajs/vue3";
import { Method } from "@inertiajs/core";
import type { OperatorTeam } from "@/types";
import route from "ziggy-js";

defineProps<{
    teams: OperatorTeam[];
}>();

const headers = [
    { title: "Active", key: "active", sortable: false },
    { title: "Name", key: "name" },
    { title: "Description", key: "description" },
    { title: "Actions", key: "actions", sortable: false },
];
</script>
