<template>
    <Head :title="$t('factors')" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ $t("factors") }}</h2>
        </template>

        <div>
            <v-data-table :headers="headers" :items="factors">
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>{{ $t("factors") }}</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical />
                        <v-spacer />
                        <Link :href="route('ticket-allocator.factors.create')">
                            <v-btn color="primary" dark>{{ $t("new_factor") }}</v-btn>
                        </Link>
                    </v-toolbar>
                </template>
                <template #[`item.active`]="{ item }">
                    <Link
                        as="span"
                        :href="route('ticket-allocator.factors.update', item.raw.uuid)"
                        method="patch"
                        :data="{ active: !!item.raw.deleted_at }"
                    >
                        <v-checkbox-btn :model-value="!item.raw.deleted_at" />
                    </Link>
                </template>
                <template #[`item.actions`]="{ item }">
                    <Link :href="route('ticket-allocator.factors.edit', item.raw.uuid)">
                        <v-btn icon="mdi-pencil" :title="$t('edit')" size="small" variant="plain" />
                    </Link>
                    <Link
                        as="span"
                        :href="route('ticket-allocator.factors.raise-priority', item.raw.uuid)"
                        method="put"
                    >
                        <v-btn icon="mdi-arrow-up-thick" :title="$t('raise_priority')" size="small" variant="plain" />
                    </Link>
                    <Link
                        as="span"
                        :href="route('ticket-allocator.factors.lower-priority', item.raw.uuid)"
                        method="put"
                    >
                        <v-btn icon="mdi-arrow-down-thick" :title="$t('lower_priority')" size="small" variant="plain" />
                    </Link>
                    <Link as="span" :href="route('ticket-allocator.factors.destroy', item.raw.uuid)" method="delete">
                        <v-btn icon="mdi-delete" :title="$t('remove')" size="small" variant="plain" />
                    </Link>
                </template>
            </v-data-table>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue";
import { Head, Link } from "@inertiajs/vue3";
import type { Factor } from "@/types";
import { wTrans } from "laravel-vue-i18n";
import route from "ziggy-js";

defineProps<{
    factors: Factor[];
}>();

const headers = [
    { title: wTrans("active"), key: "active", sortable: false },
    { title: wTrans("name"), key: "name", sortable: false },
    { title: wTrans("description"), key: "description", sortable: false },
    { title: wTrans("actions"), key: "actions", sortable: false },
];
</script>
