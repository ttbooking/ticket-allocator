<template>
    <v-btn v-bind="attrs" @click="visitLink">
        <template v-for="(_, slot) of $slots" #[slot]="scope">
            <slot :name="slot" v-bind="scope || {}" />
        </template>
    </v-btn>
</template>

<script setup>
import { computed, useAttrs } from "vue";
import { router } from "@inertiajs/vue3";

const props = defineProps({ method: String });
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
    attrs.value.tohref && router.visit(attrs.value.tohref, { method: props.method });
}
</script>
