<template>
    <v-row>
        <v-col cols="12" md="12">
            <v-textarea v-model="config.variables" :label="$t('variables')" :error-messages="errors.variables" />
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="12">
            <v-text-field
                v-model="config.expressions.initial_weight"
                :label="$t('initial_weight_expression')"
                :error-messages="errors.initial_weight_expression"
            />
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="12">
            <v-text-field
                v-model="config.expressions.weight_increment"
                :label="$t('weight_increment_expression')"
                :error-messages="errors.weight_increment_expression"
            />
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="12">
            <v-text-field
                v-model="config.expressions.complexity"
                :label="$t('complexity_expression')"
                :error-messages="errors.complexity_expression"
            />
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="12">
            <v-text-field
                v-model="config.expressions.delay"
                :label="$t('delay_expression')"
                :error-messages="errors.delay_expression"
            />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ExpressiveFactorConfig } from "@/types";
import { computed } from "vue";

const props = defineProps<{
    modelValue: ExpressiveFactorConfig;
    errors: Record<string, string>;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: ExpressiveFactorConfig): void;
}>();

const config = computed<ExpressiveFactorConfig>({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
</script>
