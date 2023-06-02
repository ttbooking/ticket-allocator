<template>
    <Head :title="$t('operators')" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ $t("operators") }}</h2>
        </template>

        <div>
            <v-data-table :headers="headers" :items="operators">
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>{{ $t("operators") }}</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical />
                        <v-spacer />
                        <v-btn-ex :to="route('ticket-allocator.operators.discover')" method="put" color="primary" dark>
                            {{ $t("discover") }}
                        </v-btn-ex>
                        <v-btn :to="route('ticket-allocator.operators.create')" color="primary" dark>
                            {{ $t("new_operator") }}
                        </v-btn>
                    </v-toolbar>
                </template>
                <template #[`item.name`]="{ item }">{{ item.raw.name ?? item.raw.user.name ?? "" }}</template>
                <template #[`item.ticket_limit`]="{ item }">{{ item.raw.ticket_limit ?? "&infin;" }}</template>
                <template #[`item.complexity_limit`]="{ item }">{{ item.raw.complexity_limit ?? "&infin;" }}</template>
                <template #[`item.actions`]="{ item }">
                    <v-btn
                        :to="route('ticket-allocator.operators.edit', item.raw.uuid)"
                        icon="mdi-pencil"
                        :title="$t('edit')"
                        size="small"
                        variant="plain"
                    />
                    <v-btn-ex
                        :to="route('ticket-allocator.operators.destroy', item.raw.uuid)"
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
import type { Operator } from "@/types";
import { trans } from "laravel-vue-i18n";
import route from "ziggy-js";

defineProps<{
    operators: Operator[];
}>();

const headers = computed(() => [
    { title: trans("name"), key: "name" },
    { title: trans("tickets"), key: "ticket_limit" },
    { title: trans("complexity"), key: "complexity_limit" },
    { title: trans("actions"), key: "actions", sortable: false },
]);
</script>
