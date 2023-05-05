<template>
    <div class="d-inline-block">
        <v-btn size="small" class="ticket justify-start px-2" :class="{ overflow }" :ripple="false" flat width="100">
            <v-icon v-if="ticket.meta?.icon" :icon="ticket.meta?.icon" color="white" />
            <span class="text-white overflow-hidden">
                <span class="title inline-block relative">{{ title() }}</span>
            </span>
            <v-overlay
                open-on-click
                activator="parent"
                location-strategy="connected"
                location="bottom center"
                origin="auto"
            >
                <v-card width="400" :prepend-icon="ticket.meta?.icon" :title="cardTitle" :subtitle="cardSubtitle">
                    <v-tabs v-model="tab">
                        <v-tab value="properties">{{ $t("properties") }}</v-tab>
                        <v-tab value="metrics">{{ $t("metrics") }}</v-tab>
                    </v-tabs>
                    <v-card-text>
                        <v-window v-model="tab">
                            <v-window-item value="properties" class="prose">
                                <div v-if="typeof cardContent === 'string'" v-html="md.render(cardContent)"></div>
                                <table v-else>
                                    <tbody>
                                        <tr v-for="(value, key) in cardContent" :key="key">
                                            <th>{{ key }}</th>
                                            <td v-html="md.renderInline(value)"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </v-window-item>
                            <v-window-item value="metrics">
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>{{ $t("initial_weight") }}</th>
                                            <th>{{ $t("weight_increment") }}</th>
                                            <th>{{ $t("complexity") }}</th>
                                            <th>{{ $t("delay") }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(adjustments, factorUuid) in ticket.metrics ?? []" :key="factorUuid">
                                            <th>{{ factorUuid }}</th>
                                            <td v-for="(adjustment, metric) in adjustments" :key="metric">
                                                {{ adjustment }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </v-window-item>
                        </v-window>
                    </v-card-text>
                </v-card>
            </v-overlay>
        </v-btn>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import MarkdownIt from "markdown-it";
import { usePage } from "@inertiajs/vue3";
import Ticket from "@/models/Ticket";
import { DisplayOptions } from "@/types";
import { useSharedOptions, useSharedDisplayMode } from "@/shared";

const props = defineProps<{
    ticket: Ticket;
}>();

const tab = ref(null);

const md = new MarkdownIt({ linkify: true });

const options = useSharedOptions();
const mode = useSharedDisplayMode();

const config = computed(() => usePage().props.options as DisplayOptions);

const threshold = computed(() => config.value[`${mode.value}_threshold`]);

const position = computed(() => props.ticket[mode.value]);

const compactPosition = computed(() => (position.value < 100000 ? position.value : position.value.toExponential(1)));

const categoryName = () => props.ticket.meta?.category_name ?? props.ticket.category?.name ?? "";

const categoryShort = () => props.ticket.meta?.category_short ?? props.ticket.category?.short ?? "";

const title = () => (options.altInfo ? props.ticket.meta?.title ?? categoryShort() : categoryShort());

const cardTitle = computed(() => props.ticket.meta?.card_title ?? "Title");

const cardSubtitle = computed(() => props.ticket.meta?.card_subtitle ?? categoryName());

const cardContent = computed(() => props.ticket.meta?.card_content ?? []);

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

.ticket:deep(.v-btn__content) {
    overflow: hidden;
}

.ticket:hover .title {
    animation: 4s linear infinite alternate ticker;
}

@keyframes ticker {
    0%,
    25% {
        left: 0;
        transform: translateX(0%);
    }
    75%,
    100% {
        left: 100%;
        transform: translateX(-100%);
    }
}
</style>
