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
                        v-model="item.value"
                        :items="getEntries(item.value)"
                        item-title="name"
                        item-value="uuid"
                        variant="plain"
                        density="compact"
                        hide-details="auto"
                    />
                </template>
                <template #[`item.initial_weight`]="{ item }">
                    <v-text-field
                        v-model.number="item.initial_weight"
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
                        v-model.number="item.weight_increment"
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
                        v-model.number="item.complexity"
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
                        v-model.number="item.delay"
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
                        v-model.number="item.reservation"
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
                        @click="removeEntry(item.value)"
                    />
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import type { AssociativeFactorConfig, Entry } from "@/types";
import { useI18n } from "vue-i18n";
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

const { t } = useI18n();

const headers = computed(() => [
    { title: t("value"), key: "value" },
    { title: t("initial_weight"), key: "initial_weight" },
    { title: t("weight_increment"), key: "weight_increment" },
    { title: t("complexity"), key: "complexity" },
    { title: t("delay_sec"), key: "delay" },
    { title: t("reservation_sec"), key: "reservation" },
    { title: t("actions"), key: "actions", sortable: false },
]);

function getEntries(uuid?: string) {
    return props.entries.filter(
        (entry) => entry.uuid === uuid || !config.value.map((item) => item.value).includes(entry.uuid),
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
