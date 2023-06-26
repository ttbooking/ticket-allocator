<template>
    <tr :key="operator.id" class="operator relative">
        <th>{{ operator.name }}</th>
        <TransSub :tickets="operator.tickets" />
    </tr>
</template>

<script setup lang="ts">
import TransSub from "@/pages/TransSub.vue";
import type { Operator } from "@/types/trans";

defineProps<{ operator: Operator }>();
</script>

<style scoped>
.operator {
    z-index: v-bind("operator.priority");
}
</style>
