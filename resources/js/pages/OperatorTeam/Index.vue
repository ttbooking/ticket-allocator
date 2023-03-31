<template>
    <Head :title="trans('operator_teams')" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ trans("operator_teams") }}</h2>
        </template>

        <div>
            <v-data-table :headers="headers" :items="teams">
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>{{ trans("operator_teams") }}</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical />
                        <v-spacer />
                        <Link :href="route('ticket-allocator.teams.create')">
                            <v-btn color="primary" dark>{{ trans("new_team") }}</v-btn>
                        </Link>
                    </v-toolbar>
                </template>
                <template #[`item.active`]="{ item }">
                    <Link
                        as="span"
                        :href="route('ticket-allocator.teams.update', item.raw.uuid)"
                        method="patch"
                        :data="{ active: !!item.raw.deleted_at }"
                    >
                        <v-checkbox-btn :model-value="!item.raw.deleted_at" />
                    </Link>
                </template>
                <template #[`item.actions`]="{ item }">
                    <Link :href="route('ticket-allocator.teams.edit', item.raw.uuid)">
                        <v-btn icon="mdi-pencil" :title="trans('edit')" size="small" variant="plain" />
                    </Link>
                    <Link as="span" :href="route('ticket-allocator.teams.destroy', item.raw.uuid)" method="delete">
                        <v-btn icon="mdi-delete" :title="trans('remove')" size="small" variant="plain" />
                    </Link>
                </template>
            </v-data-table>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue";
import { Head, Link } from "@inertiajs/vue3";
import type { OperatorTeam } from "@/types";
import { trans, wTrans } from "laravel-vue-i18n";
import route from "ziggy-js";

defineProps<{
    teams: OperatorTeam[];
}>();

const headers = [
    { title: wTrans("active"), key: "active", sortable: false },
    { title: wTrans("name"), key: "name" },
    { title: wTrans("description"), key: "description" },
    { title: wTrans("actions"), key: "actions", sortable: false },
];
</script>
