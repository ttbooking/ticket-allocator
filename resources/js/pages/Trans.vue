<template>
    <Head title="Trans" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Trans</h2>
        </template>

        <div>
            <TransitionGroup name="list" tag="ul">
                <li v-for="item in items" :key="item">{{ item }}</li>
            </TransitionGroup>
            <button @click="doit">Shuffle</button>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue";
import { Head } from "@inertiajs/vue3";
import { ref } from "vue";
import { shuffle } from "lodash";

const items = ref(["a", "b", "c", "d", "e", "f"]);

function doit() {
    items.value = shuffle(items.value);
}
</script>

<style scoped>
.list-move {
    transition: all 0.5s ease;
}
</style>
