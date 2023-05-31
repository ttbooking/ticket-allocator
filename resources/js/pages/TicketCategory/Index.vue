<template>
    <Head :title="$t('ticket_categories')" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ $t("ticket_categories") }}</h2>
        </template>

        <div>
            <v-data-table :headers="headers" :items="ticketCategories">
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>{{ $t("ticket_categories") }}</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical />
                        <v-spacer />
                        <v-btn :to="route('ticket-allocator.ticket-categories.create')" color="primary" dark>
                            {{ $t("new_category") }}
                        </v-btn>
                    </v-toolbar>
                </template>
                <template #[`item.actions`]="{ item }">
                    <v-btn
                        :to="route('ticket-allocator.ticket-categories.edit', item.raw.uuid)"
                        icon="mdi-pencil"
                        :title="$t('edit')"
                        size="small"
                        variant="plain"
                    />
                    <v-btn
                        :to="route('ticket-allocator.ticket-categories.destroy', item.raw.uuid)"
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
import { Head } from "@inertiajs/vue3";
import type { TicketCategory } from "@/types";
import { trans } from "laravel-vue-i18n";
import route from "ziggy-js";

defineProps<{
    ticketCategories: TicketCategory[];
}>();

const headers = computed(() => [
    { title: trans("name"), key: "name" },
    { title: trans("short_name"), key: "short" },
    { title: trans("actions"), key: "actions", sortable: false },
]);
</script>
