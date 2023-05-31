<template>
    <Head :title="$t('operator_teams')" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ $t("operator_teams") }}</h2>
        </template>

        <div>
            <v-data-table :headers="headers" :items="teams">
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>{{ $t("operator_teams") }}</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical />
                        <v-spacer />
                        <v-btn :to="route('ticket-allocator.teams.create')" color="primary" dark>
                            {{ $t("new_team") }}
                        </v-btn>
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
                    <v-btn
                        :to="route('ticket-allocator.teams.edit', item.raw.uuid)"
                        icon="mdi-pencil"
                        :title="$t('edit')"
                        size="small"
                        variant="plain"
                    />
                    <v-btn
                        :to="route('ticket-allocator.teams.destroy', item.raw.uuid)"
                        method="delete"
                        icon="mdi-delete"
                        :title="$t('remove')"
                        size="small"
                        variant="plain"
                    />
                </template>
            </v-data-table>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue";
import { computed } from "vue";
import { Head, Link } from "@inertiajs/vue3";
import type { OperatorTeam } from "@/types";
import { trans } from "laravel-vue-i18n";
import route from "ziggy-js";

defineProps<{
    teams: OperatorTeam[];
}>();

const headers = computed(() => [
    { title: trans("active"), key: "active", sortable: false },
    { title: trans("name"), key: "name" },
    { title: trans("description"), key: "description" },
    { title: trans("actions"), key: "actions", sortable: false },
]);
</script>
