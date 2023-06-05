<template>
    <v-row>
        <v-col cols="3">
            <v-text-field
                v-model="config.initial_weight"
                :label="$t('initial_weight')"
                :error-messages="errors.initial_weight"
            />
        </v-col>
        <v-col cols="3">
            <v-text-field
                v-model="config.weight_increment"
                :label="$t('weight_increment')"
                :error-messages="errors.weight_increment"
            />
        </v-col>
        <v-col cols="3">
            <v-text-field v-model="config.complexity" :label="$t('complexity')" :error-messages="errors.complexity" />
        </v-col>
        <v-col cols="3">
            <v-text-field v-model="config.delay" :label="$t('delay')" :error-messages="errors.delay" />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { FixedFactorConfig } from "@/types";
import { computed } from "vue";

const props = defineProps<{
    modelValue: FixedFactorConfig;
    errors: Record<string, string>;
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
