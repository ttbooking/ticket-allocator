<template>
    <tr class="personal-ticket" :class="{ overflow }">
        <td v-for="[, key] in columns" :key="key">
            <v-icon v-if="key === 'meta.icon'" :icon="retrieve(ticket, key, 'mdi-help')" color="white" />
            <span v-else v-html="md.renderInline(retrieve(ticket, key, '-'))"></span>
        </td>
    </tr>
</template>

<script setup lang="ts">
import { computed } from "vue";
// @ts-expect-error Helper function not exported
import { getObjectValueByPath } from "vuetify/lib/util/helpers";
import MarkdownIt from "markdown-it";
import MarkdownItAttrs from "markdown-it-attrs";
import { usePage } from "@inertiajs/vue3";
import Ticket from "@/models/Ticket";
import { useSharedDisplayMode } from "@/shared";
import { filters } from "@/utils";
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

function retrieve(obj: object, key: string, fallback: string = ""): string {
    const [path, ...sequence] = key.split("|");
    const value = getObjectValueByPath(obj, path, fallback);

    return value === fallback
        ? value
        : sequence.reduce((accum, filter) => filters[filter as keyof typeof filters](accum), value);
}
</script>

<style scoped>
.personal-ticket:deep(a:hover) {
    text-decoration: underline;
}

.personal-ticket td:nth-child(-n + 2):deep(a) {
    color: white;
}

.personal-ticket td:nth-child(-n + 2) {
    animation-delay: v-bind("animation.delay");
    animation-duration: v-bind("animation.duration");
}
</style>
