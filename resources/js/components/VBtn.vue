<template>
    <v-btn v-bind="$attrs" @click="visitLink">
        <slot></slot>
    </v-btn>
</template>

<script setup lang="ts">
import { useAttrs, onBeforeMount } from "vue";
import { Method } from "@inertiajs/core";
import { router } from "@inertiajs/vue3";
import { VBtn } from "vuetify/components";

const props = defineProps<{ method?: Method }>();
const attrs = useAttrs();
const href = attrs.to as string;

onBeforeMount(() => {
    if (href && props.method && props.method !== "get") {
        delete attrs.to;
    }
});

function visitLink() {
    if (href && props.method && props.method !== "get") {
        router.visit(href, { method: props.method });
    }
}
</script>
