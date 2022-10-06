<template>
    <v-btn size="small" class="ticket mr-1 mb-1" flat="flat" width="100">
        <v-icon color="white" icon="mdi-airplane" start></v-icon>
        <span class="text-white">{{ ticket.weight }}</span>
        <v-overlay open-on-click activator="parent" location-strategy="connected" location="bottom center" origin="auto">
            <v-card
                width="400"
                title="aaa"
                subtitle="bbb"
                text="zzz"
            >
            </v-card>
        </v-overlay>
    </v-btn>
</template>

<script setup>
import { computed } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'

const props = defineProps(['ticket'])

const animation = computed(() => ({
    delay: -Math.round(props.ticket.weight / 1000) + 's',
    duration: usePage().props.value.weightThreshold + 's',
}))
</script>

<style scoped>
.ticket {
    animation-delay: v-bind('animation.delay');
    animation-duration: v-bind('animation.duration');
}
</style>
