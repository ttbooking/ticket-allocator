<template>
    <v-row>
        <v-col cols="2">
            <v-text-field
                v-model.number="config.initial_weight"
                type="number"
                min="0"
                max="9999999"
                :label="$t('initial_weight')"
            />
        </v-col>
        <v-col cols="2">
            <v-text-field
                v-model.number="config.weight_increment"
                type="number"
                min="0"
                max="99999"
                :label="$t('weight_increment')"
            />
        </v-col>
        <v-col cols="2">
            <v-text-field
                v-model.number="config.complexity"
                type="number"
                min="0"
                max="9999"
                :label="$t('complexity')"
            />
        </v-col>
        <v-col cols="2">
            <v-text-field v-model.number="config.delay" type="number" min="0" max="99999" :label="$t('delay_sec')" />
        </v-col>
        <v-col cols="2">
            <v-text-field
                v-model.number="config.reservation"
                type="number"
                min="0"
                max="99999"
                :label="$t('reservation_sec')"
            />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { FixedFactorConfig } from "@/types";
import { computed } from "vue";

const props = defineProps<{
    modelValue: FixedFactorConfig;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: FixedFactorConfig): void;
}>();

const config = computed<FixedFactorConfig>({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
</script>
