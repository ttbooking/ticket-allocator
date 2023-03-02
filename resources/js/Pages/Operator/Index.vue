<template>
    <Head title="Operators" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Operators</h2>
        </template>

        <div>
            <v-data-table :headers="headers" :items="operators">
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>Operators</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical />
                        <v-spacer />
                        <Link :href="route('ticket-allocator.operators.create')" class="mb-2">
                            <v-btn color="primary" dark>New Operator</v-btn>
                        </Link>
                    </v-toolbar>
                </template>
                <template #[`item.name`]="{ item }">{{ item.raw.name ?? item.raw.user.name ?? "" }}</template>
                <template #[`item.ticket_limit`]="{ item }">{{ item.raw.ticket_limit ?? "&infin;" }}</template>
                <template #[`item.complexity_limit`]="{ item }">{{ item.raw.complexity_limit ?? "&infin;" }}</template>
                <template #[`item.actions`]="{ item }">
                    <Link :href="route('ticket-allocator.operators.edit', item.raw.uuid)">
                        <v-btn icon="mdi-pencil" size="small" variant="plain" />
                    </Link>
                    <Link as="span" :href="route('ticket-allocator.operators.destroy', item.raw.uuid)" method="delete">
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
import type { Operator } from "@/types";
import route from "ziggy-js";

defineProps<{
    operators: Operator[];
}>();

const headers = [
    { title: "Name", key: "name" },
    { title: "Tickets", key: "ticket_limit" },
    { title: "Complexity", key: "complexity_limit" },
    { title: "Actions", key: "actions", sortable: false },
];
</script>
