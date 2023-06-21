<template>
    <Head title="Trans" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Trans</h2>
        </template>

        <div>
            <v-table density="compact">
                <tbody>
                    <TransitionGroup name="list">
                        <tr v-for="item in items" :key="item">
                            <td>
                                <v-btn size="small" width="100">{{ item }}</v-btn>
                            </td>
                        </tr>
                    </TransitionGroup>
                </tbody>
            </v-table>

            <v-btn color="primary" @click="doit">Shuffle</v-btn>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue";
import { Head } from "@inertiajs/vue3";
import { ref } from "vue";
import { shuffle } from "lodash";

const items = ref(["Lorem", "ipsum", "dolor", "sit", "amet", "bitch"]);

function doit() {
    items.value = shuffle(items.value);
}
</script>

<style scoped>
.list-move {
    transition: all 0.5s ease;
}
</style>
