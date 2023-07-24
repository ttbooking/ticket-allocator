<template>
    <tr :key="operator.id" class="operator relative">
        <th>{{ operator.name }}</th>
        <TransPool :tickets="operator.tickets" />
    </tr>
</template>

<script setup lang="ts">
import TransPool from "./Pool.vue";
import type { Operator } from "@/types/trans";

defineProps<{ operator: Operator }>();
</script>

<style scoped>
.operator {
    z-index: v-bind("operator.priority");
}
</style>
