<template>
    <v-btn v-bind="attrs" @click="visitLink">
        <template v-for="(_, slot) of slots" #[slot]="scope: unknown">
            <slot :name="slot" v-bind="scope || {}" />
        </template>
    </v-btn>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Method } from "@inertiajs/core";
import { router } from "@inertiajs/vue3";
import { VBtn } from "vuetify/components";

const props = defineProps<{ method?: Method }>();
const slots = defineSlots<VBtn["$slots"]>();
defineOptions({ inheritAttrs: false });

const attrs = computed(() => {
    const attrs = { ...useAttrs() };

    if (attrs.to && props.method && props.method !== "get") {
        attrs.tohref = attrs.to;
        delete attrs.to;
    }

    return attrs;
});

function visitLink() {
    attrs.value.tohref && router.visit(attrs.value.tohref as string, { method: props.method });
}
</script>
