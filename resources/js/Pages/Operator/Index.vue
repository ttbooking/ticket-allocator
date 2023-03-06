<template>
    <Head :title="trans('operators')" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ trans("operators") }}</h2>
        </template>

        <div>
            <v-data-table :headers="headers" :items="operators">
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>{{ trans("operators") }}</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical />
                        <v-spacer />
                        <Link :href="route('ticket-allocator.operators.discover')" method="put">
                            <v-btn color="primary" dark>{{ trans("discover") }}</v-btn>
                        </Link>
                        <Link :href="route('ticket-allocator.operators.create')">
                            <v-btn color="primary" dark>{{ trans("new_operator") }}</v-btn>
                        </Link>
                    </v-toolbar>
                </template>
                <template #[`item.name`]="{ item }">{{ item.raw.name ?? item.raw.user.name ?? "" }}</template>
                <template #[`item.ticket_limit`]="{ item }">{{ item.raw.ticket_limit ?? "&infin;" }}</template>
                <template #[`item.complexity_limit`]="{ item }">{{ item.raw.complexity_limit ?? "&infin;" }}</template>
                <template #[`item.actions`]="{ item }">
                    <Link :href="route('ticket-allocator.operators.edit', item.raw.uuid)">
                        <v-btn icon="mdi-pencil" :title="trans('edit')" size="small" variant="plain" />
                    </Link>
                    <Link as="span" :href="route('ticket-allocator.operators.destroy', item.raw.uuid)" method="delete">
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
import type { Operator } from "@/types";
import { trans, wTrans } from "laravel-vue-i18n";
import route from "ziggy-js";

defineProps<{
    operators: Operator[];
}>();

const headers = [
    { title: wTrans("name"), key: "name" },
    { title: wTrans("tickets"), key: "ticket_limit" },
    { title: wTrans("complexity"), key: "complexity_limit" },
    { title: wTrans("actions"), key: "actions", sortable: false },
];
</script>
