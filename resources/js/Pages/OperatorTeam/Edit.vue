<template>
    <Head title="Edit team" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Edit team</h2>
        </template>

        <div></div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/Layouts/Default.vue";
import { Head } from "@inertiajs/vue3";
import type { OperatorTeam } from "@/types";

const props = defineProps<{
    operatorTeam: OperatorTeam;
}>();
</script>
