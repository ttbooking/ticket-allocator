<template>
    <v-row>
        <v-col cols="12" md="12">
            <v-data-table :headers="headers" :items="config" density="compact">
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>{{ $t("entries") }}</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical />
                        <v-spacer />
                        <v-btn color="primary" dark :disabled="getEntries().length === 0" @click="addEntry">
                            {{ $t("new_entry") }}
                        </v-btn>
                    </v-toolbar>
                </template>
                <template #[`item.value`]="{ item }">
                    <v-autocomplete
                        v-model="item.raw.value"
                        :items="getEntries(item.raw.value)"
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
                <template #[`item.reservation`]="{ item }">
                    <v-text-field
                        v-model.number="item.raw.reservation"
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
</template>

<script setup lang="ts">
import type { AssociativeFactorConfig, Entry } from "@/types";
import { trans } from "laravel-vue-i18n";
import { computed } from "vue";

const props = defineProps<{
    entries: Entry[];
    modelValue: AssociativeFactorConfig;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: AssociativeFactorConfig): void;
}>();

const config = computed<AssociativeFactorConfig>({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

const headers = computed(() => [
    { title: trans("value"), key: "value" },
    { title: trans("initial_weight"), key: "initial_weight" },
    { title: trans("weight_increment"), key: "weight_increment" },
    { title: trans("complexity"), key: "complexity" },
    { title: trans("delay_sec"), key: "delay" },
    { title: trans("reservation_sec"), key: "reservation" },
    { title: trans("actions"), key: "actions", sortable: false },
]);

function getEntries(uuid?: string) {
    return props.entries.filter(
        (entry) => entry.uuid === uuid || !config.value.map((item) => item.value).includes(entry.uuid)
    );
}

function addEntry() {
    config.value.push({
        value: getEntries()[0]?.uuid ?? "",
        initial_weight: null,
        weight_increment: null,
        complexity: null,
        delay: null,
        reservation: null,
    });
}

function removeEntry(id: number | string) {
    config.value = config.value.filter((entry) => entry.value !== id);
}
</script>
