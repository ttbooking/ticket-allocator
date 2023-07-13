<template>
    <div class="ticket-wrapper relative d-inline-block">
        <v-btn size="small" width="100" class="ticket text-white">{{ ticket.name }}</v-btn>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePage } from "@inertiajs/vue3";
import type { DisplayOptions } from "@/types";
import type { Ticket } from "@/types/trans";

const props = defineProps<{ ticket: Ticket }>();

const config = computed(() => usePage().props.options as DisplayOptions);

const animation = computed(() => ({
    delay: -props.ticket.weight + "s",
    duration: config.value.weight_threshold + "s",
}));
</script>

<style scoped>
.ticket-wrapper {
    z-index: v-bind("ticket.weight");
}

.ticket {
    animation-delay: v-bind("animation.delay");
    animation-duration: v-bind("animation.duration");
}
</style>
