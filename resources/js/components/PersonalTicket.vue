<template>
    <tr class="ticket" :class="{ overflow }">
        <td v-for="[, key] in columns" :key="key">
            <v-icon v-if="key === 'meta.icon'" :icon="getObjectValueByPath(ticket, key, 'mdi-help')" color="white" />
            <span v-else class="text-white" v-html="md.renderInline(getObjectValueByPath(ticket, key, '-'))"></span>
        </td>
    </tr>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getObjectValueByPath } from "vuetify/lib/util/helpers";
import MarkdownIt from "markdown-it";
import MarkdownItAttrs from "markdown-it-attrs";
import { usePage } from "@inertiajs/vue3";
import Ticket from "@/models/Ticket";
import { useSharedDisplayMode } from "@/shared";
import type { DisplayOptions } from "@/types";

const props = defineProps<{
    ticket: Ticket;
    columns: [string, string][];
}>();

const md = new MarkdownIt({ linkify: true }).use(MarkdownItAttrs);

const mode = useSharedDisplayMode();

const config = computed(() => usePage().props.options as DisplayOptions);

const threshold = computed(() => config.value[`${mode.value}_threshold`]);

const position = computed(() => props.ticket[mode.value]);

const overflow = computed(() => position.value > threshold.value);

const animation = computed(() => ({
    delay: -position.value + "s",
    duration: threshold.value + "s",
}));
</script>

<style scoped>
.ticket:deep(a) {
    text-decoration: underline;
}

.ticket {
    animation-delay: v-bind("animation.delay");
    animation-duration: v-bind("animation.duration");
}
</style>
