<template>
    <div class="d-inline-block">
        <v-btn size="small" class="ticket" :class="{ overflow }" flat width="100">
            <v-icon v-if="ticket.meta?.icon" :icon="ticket.meta?.icon" color="white" start />
            <span class="text-white">{{ title }}</span>
            <v-overlay
                open-on-click
                activator="parent"
                location-strategy="connected"
                location="bottom center"
                origin="auto"
            >
                <v-card width="400" :title="cardTitle" :subtitle="cardSubtitle">
                    <v-card-text class="prose">
                        <div v-if="typeof cardContent === 'string'" v-html="md.render(cardContent)"></div>
                        <table v-else>
                            <tbody>
                                <tr v-for="(value, key) in cardContent" :key="key">
                                    <th>{{ key }}</th>
                                    <td v-html="md.renderInline(value)"></td>
                                </tr>
                            </tbody>
                        </table>
                    </v-card-text>
                </v-card>
            </v-overlay>
        </v-btn>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import MarkdownIt from "markdown-it";
import { usePage } from "@inertiajs/vue3";
import Ticket from "@/models/Ticket";
import { DisplayOptions } from "@/types";
import { useSharedOptions, useSharedDisplayMode } from "@/shared";

const props = defineProps<{
    ticket: Ticket;
}>();

const md = new MarkdownIt({ linkify: true });

const options = useSharedOptions();
const mode = useSharedDisplayMode();

const config = computed(() => usePage().props.options as DisplayOptions);

const threshold = computed(() => config.value[`${mode.value}_threshold`]);

const position = computed(() => props.ticket[mode.value]);

const compactPosition = computed(() => (position.value < 100000 ? position.value : position.value.toExponential(1)));

const title = computed(() =>
    options.altInfo
        ? props.ticket.meta?.[config.value.alt_title] ?? props.ticket.category.short
        : props.ticket.category.short
);

const cardTitle = computed(() => props.ticket.meta?.[config.value.card_title] ?? "Title");

const cardSubtitle = computed(() => props.ticket.meta?.[config.value.card_subtitle] ?? props.ticket.category.name);

const cardContent = computed(() => props.ticket.meta?.[config.value.card_content] ?? []);

const overflow = computed(() => position.value > threshold.value);

const animation = computed(() => ({
    delay: -position.value + "s",
    duration: threshold.value + "s",
}));
</script>

<style scoped>
.ticket {
    animation-delay: v-bind("animation.delay");
    animation-duration: v-bind("animation.duration");
}
</style>
