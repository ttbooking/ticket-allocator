<template>
    <Head :title="$t(factor ? 'edit_factor' : 'new_factor')" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ $t(factor ? "edit_factor" : "new_factor") }}
            </h2>
        </template>

        <div>
            <v-form @submit.prevent="submit">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-checkbox v-model="form.active" :label="$t('active')" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field
                                v-model="form.name"
                                required
                                maxlength="255"
                                :label="$t('name')"
                                :error-messages="errors.name"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-textarea
                                v-model="form.description"
                                :label="$t('description')"
                                :error-messages="errors.description"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-data-table :headers="headers" :items="form.config" density="compact">
                                <template #top>
                                    <v-toolbar flat>
                                        <v-toolbar-title>{{ $t("entries") }}</v-toolbar-title>
                                        <v-divider class="mx-4" inset vertical />
                                        <v-spacer />
                                        <v-btn
                                            color="primary"
                                            dark
                                            :disabled="getTicketCategories().length === 0"
                                            @click="addEntry"
                                        >
                                            {{ $t("new_entry") }}
                                        </v-btn>
                                    </v-toolbar>
                                </template>
                                <template #[`item.value`]="{ item }">
                                    <v-autocomplete
                                        v-model="item.raw.value"
                                        :items="getTicketCategories(item.raw.value)"
                                        item-title="name"
                                        item-value="uuid"
                                        variant="plain"
                                        density="compact"
                                        hide-details="auto"
                                    />
                                </template>
                                <template #[`item.initial_weight`]="{ item }">
                                    <v-text-field
                                        v-model.number="item.raw.initial_weight"
                                        type="number"
                                        min="0"
                                        max="9999999"
                                        placeholder="0"
                                        variant="plain"
                                        density="compact"
                                        hide-details="auto"
                                    />
                                </template>
                                <template #[`item.weight_increment`]="{ item }">
                                    <v-text-field
                                        v-model.number="item.raw.weight_increment"
                                        type="number"
                                        min="0"
                                        max="99999"
                                        placeholder="0"
                                        variant="plain"
                                        density="compact"
                                        hide-details="auto"
                                    />
                                </template>
                                <template #[`item.complexity`]="{ item }">
                                    <v-text-field
                                        v-model.number="item.raw.complexity"
                                        type="number"
                                        min="0"
                                        max="9999"
                                        placeholder="0"
                                        variant="plain"
                                        density="compact"
                                        hide-details="auto"
                                    />
                                </template>
                                <template #[`item.delay`]="{ item }">
                                    <v-text-field
                                        v-model.number="item.raw.delay"
                                        type="number"
                                        min="0"
                                        max="99999"
                                        placeholder="0"
                                        variant="plain"
                                        density="compact"
                                        hide-details="auto"
                                    />
                                </template>
                                <template #[`item.actions`]="{ item }">
                                    <v-btn
                                        icon="mdi-delete"
                                        :title="$t('remove')"
                                        size="small"
                                        variant="plain"
                                        @click="removeEntry(item.raw.value)"
                                    />
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-btn type="submit" color="primary" class="mr-3" :disabled="form.processing">
                                {{ $t("save") }}
                            </v-btn>
                            <Link :href="route('ticket-allocator.factors.index')" class="mr-3">
                                <v-btn>{{ $t("cancel") }}</v-btn>
                            </Link>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";
import type { Factor, TicketCategory } from "@/types";
import { wTrans } from "laravel-vue-i18n";
import route from "ziggy-js";

const props = defineProps<{
    factor?: Factor;
    ticketCategories: TicketCategory[];
    errors: Record<string, string>;
}>();

const headers = [
    { title: wTrans("value"), key: "value" },
    { title: wTrans("initial_weight"), key: "initial_weight" },
    { title: wTrans("weight_increment"), key: "weight_increment" },
    { title: wTrans("complexity"), key: "complexity" },
    { title: wTrans("delay"), key: "delay" },
    { title: wTrans("actions"), key: "actions", sortable: false },
];

const form = useForm({
    active: !props.factor?.deleted_at,
    name: props.factor?.name ?? "",
    description: props.factor?.description ?? "",
    config: props.factor?.config ?? [],
});

function getTicketCategories(uuid?: string) {
    return props.ticketCategories.filter(
        (ticketCategory) =>
            ticketCategory.uuid === uuid || !form.config.map((item) => item.value).includes(ticketCategory.uuid)
    );
}

function addEntry() {
    form.config.push({
        value: getTicketCategories()[0]?.uuid ?? "",
        initial_weight: null,
        weight_increment: null,
        complexity: null,
        delay: null,
    });
}

function removeEntry(id: number | string) {
    form.config = form.config.filter((entry) => entry.value !== id);
}

function submit() {
    props.factor
        ? form.put(route("ticket-allocator.factors.update", props.factor.uuid))
        : form.post(route("ticket-allocator.factors.store"));
}
</script>
