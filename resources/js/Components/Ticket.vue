<template>
    <div class="d-inline-block">
        <v-btn
            ref="ticketElement"
            size="small"
            class="ticket"
            :class="{ overflow }"
            flat
            width="100"
            @mousedown.ctrl="lock"
            @mouseup="unlock"
        >
            <!--<v-icon color="white" icon="mdi-airplane" start />-->
            <span class="text-white">🖱️{{ pressed ? "✔️" : "❌" }} — ⌨️{{ ctrlKeyState ? "✔️" : "❌" }}</span>
            <v-overlay
                open-on-click
                activator="parent"
                location-strategy="connected"
                location="bottom center"
                origin="auto"
            >
                <v-card width="400" title="aaa" subtitle="bbb" text="zzz" />
            </v-overlay>
        </v-btn>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useKeyModifier, useMousePressed } from "@vueuse/core";
import { usePointerLock, useMouseEx } from "@/composables";
import { usePage } from "@inertiajs/inertia-vue3";
import Ticket from "@/models/Ticket";
import { useSharedDisplayMode } from "@/shared";

const props = defineProps<{
    modelValue: Ticket;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", ticket: Ticket): void
}>();

const ticket = computed({
    get() {
        return props.modelValue;
    },
    set(ticket) {
        emit("update:modelValue", ticket)
    }
});

const ticketElement = ref();
const { pressed } = useMousePressed({ target: ticketElement });
const ctrlKeyState = useKeyModifier("Control", { initial: false });
const { lock, unlock, element } = usePointerLock();
const { x, y } = useMouseEx({ type: "movement" });

const multiplier = ref(1);
const correction = ref(0);

watch(element, () => {
    multiplier.value = 1;
    correction.value = 0;
});

watch([x, y], ([x, y]) => {
    multiplier.value = Math.round(Math.min(Math.max(multiplier.value - y / 10, 1), 100))
    correction.value = Math.max(correction.value - x * multiplier.value, correction.value - ticket.value.weight)
    ticket.value.initial_weight = 123;
});

const mode = useSharedDisplayMode();

const threshold = computed(() => {
    return usePage<{
        durationThreshold: number;
        weightThreshold: number;
    }>().props.value[`${mode.value}Threshold`];
});

const position = computed(() => ticket.value[mode.value]);

const compactPosition = computed(() => (position.value < 100000 ? position.value : position.value.toExponential(1)));

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
