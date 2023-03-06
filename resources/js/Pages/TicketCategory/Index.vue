<template>
    <Head :title="trans('ticket_categories')" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ trans("ticket_categories") }}</h2>
        </template>

        <div>
            <v-data-table :headers="headers" :items="ticketCategories">
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>{{ trans("ticket_categories") }}</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical />
                        <v-spacer />
                        <Link :href="route('ticket-allocator.ticket-categories.create')">
                            <v-btn color="primary" dark>{{ trans("new_category") }}</v-btn>
                        </Link>
                    </v-toolbar>
                </template>
                <template #[`item.actions`]="{ item }">
                    <Link :href="route('ticket-allocator.ticket-categories.edit', item.raw.uuid)">
                        <v-btn icon="mdi-pencil" :title="trans('edit')" size="small" variant="plain" />
                    </Link>
                    <Link
                        as="span"
                        :href="route('ticket-allocator.ticket-categories.destroy', item.raw.uuid)"
                        method="delete"
                    >
                        <v-btn icon="mdi-delete" :title="trans('remove')" size="small" variant="plain" />
                    </Link>
                </template>
            </v-data-table>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/Layouts/Default.vue";
import { Head, Link } from "@inertiajs/vue3";
import type { TicketCategory } from "@/types";
import { trans, wTrans } from "laravel-vue-i18n";
import route from "ziggy-js";

defineProps<{
    ticketCategories: TicketCategory[];
}>();

const headers = [
    { title: wTrans("name"), key: "name" },
    { title: wTrans("initial_weight"), key: "initial_weight" },
    { title: wTrans("weight_increment"), key: "weight_increment" },
    { title: wTrans("complexity"), key: "complexity" },
    { title: wTrans("delay"), key: "delay" },
    { title: wTrans("actions"), key: "actions", sortable: false },
];
</script>
