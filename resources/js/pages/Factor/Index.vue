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
                        <v-dialog v-model="dialog" max-width="500px">
                            <template #activator="{ props }">
                                <v-btn color="primary" dark v-bind="props">{{ $t("new_factor") }}</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">{{ $t("choose_factor_type") }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <v-select
                                                    v-model="factorType"
                                                    :label="$t('factor_type')"
                                                    :items="factorDictionary"
                                                    item-title="name"
                                                    item-value="alias"
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn color="primary" dark @click="close">{{ $t("cancel") }}</v-btn>
                                    <v-btn
                                        :key="factorType"
                                        :to="route('ticket-allocator.factors.create', { type: factorType })"
                                        :disabled="!factorType"
                                        color="primary"
                                        dark
                                        @click="close"
                                    >
                                        {{ $t("create") }}
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template #[`item.active`]="{ item }">
                    <Link
                        as="span"
                        :href="route('ticket-allocator.factors.update', item.uuid)"
                        method="patch"
                        :data="{ active: !!item.deleted_at }"
                    >
                        <v-checkbox-btn :model-value="!item.deleted_at" />
                    </Link>
                </template>
                <template #[`item.type.name`]="{ item }">
                    <span :class="{ italic: item.type.excluded }">{{ item.type.name }}</span>
                </template>
                <template #[`item.name`]="{ item }">
                    <span :class="{ italic: item.type.excluded && !item.display_name }">
                        {{ item.name }}
                    </span>
                </template>
                <template #[`item.actions`]="{ item }">
                    <v-btn
                        :to="route('ticket-allocator.factors.edit', item.uuid)"
                        icon="mdi-pencil"
                        :title="$t('edit')"
                        size="small"
                        variant="plain"
                    />
                    <v-btn-ex
                        :to="route('ticket-allocator.factors.raise-priority', item.uuid)"
                        method="put"
                        icon="mdi-arrow-up-thick"
                        :title="$t('raise_priority')"
                        size="small"
                        variant="plain"
                    />
                    <v-btn-ex
                        :to="route('ticket-allocator.factors.lower-priority', item.uuid)"
                        method="put"
                        icon="mdi-arrow-down-thick"
                        :title="$t('lower_priority')"
                        size="small"
                        variant="plain"
                    />
                    <v-btn-ex
                        :to="route('ticket-allocator.factors.destroy', item.uuid)"
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
import { ref, computed } from "vue";
import { Head, Link } from "@inertiajs/vue3";
import type { Factor, FactorType } from "@/types";
import { trans } from "laravel-vue-i18n";

defineProps<{
    factors: Factor[];
    factorDictionary: FactorType[];
}>();

const headers = computed(() => [
    { title: trans("active"), key: "active", sortable: false },
    { title: trans("type"), key: "type.name", sortable: false },
    { title: trans("name"), key: "name", sortable: false },
    { title: trans("description"), key: "description", sortable: false },
    { title: trans("actions"), key: "actions", sortable: false },
]);

const dialog = ref();
const factorType = ref();

function close() {
    dialog.value = null;
}
</script>
