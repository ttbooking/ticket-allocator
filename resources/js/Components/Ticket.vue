<template>
    <div class="d-inline-block">
        <v-btn size="small" class="ticket" :class="{ overflow }" flat="flat" width="100">
            <v-icon color="white" icon="mdi-airplane" start />
            <span class="text-white">{{ ticket.weight }}</span>
            <v-overlay open-on-click activator="parent" location-strategy="connected" location="bottom center" origin="auto">
                <v-card width="400" title="aaa" subtitle="bbb" text="zzz" />
            </v-overlay>
        </v-btn>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'

const props = defineProps(['ticket', 'mode'])

const position = computed(() => {
    return Math.round(props.ticket[props.mode] / 1000)
})

const threshold = computed(() => {
    return usePage().props.value[props.mode + 'Threshold']
})

const overflow = computed(() => position.value > threshold.value)

const animation = computed(() => ({
    delay: -position.value + 's',
    duration: threshold.value + 's',
}))
</script>

<style scoped>
.ticket {
    animation-delay: v-bind('animation.delay');
    animation-duration: v-bind('animation.duration');
}
</style>
