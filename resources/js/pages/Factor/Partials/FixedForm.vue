<template>
    <v-row>
        <v-col cols="2">
            <v-text-field v-model="config.initial_weight" :label="$t('initial_weight')" />
        </v-col>
        <v-col cols="2">
            <v-text-field v-model="config.weight_increment" :label="$t('weight_increment')" />
        </v-col>
        <v-col cols="2">
            <v-text-field v-model="config.complexity" :label="$t('complexity')" />
        </v-col>
        <v-col cols="2">
            <v-text-field v-model="config.delay" :label="$t('delay_sec')" />
        </v-col>
        <v-col cols="2">
            <v-text-field v-model="config.reservation" :label="$t('reservation_sec')" />
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
