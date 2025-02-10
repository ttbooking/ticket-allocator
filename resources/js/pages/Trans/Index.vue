<template>
    <Head title="Trans" />

    <DefaultLayout>
        <template #header>
            <h2 class="text-xl leading-tight font-semibold text-gray-800">Trans</h2>
        </template>

        <div>
            <v-table density="compact" class="monitor overflow-hidden bg-transparent">
                <TransGroup tag="tbody" name="operators">
                    <TransOperator v-for="operator in operators" :key="operator.id" :operator="operator" />
                </TransGroup>
            </v-table>
            <v-container>
                <v-row>
                    <v-col>
                        <v-btn color="primary" class="mr-3" @click="addOperator">Add operator</v-btn>
                        <v-btn color="primary" class="mr-3" @click="addTicket">Add ticket</v-btn>
                        <v-btn color="primary" class="mr-3" @click="removeTicket">Remove ticket</v-btn>
                        <v-btn color="primary" class="mr-3" @click="flipOperators">Flip operators</v-btn>
                        <v-btn color="primary" class="mr-3" @click="shuffleOperators">Shuffle operators</v-btn>
                        <v-btn color="primary" class="mr-3" @click="shuffleTickets">Shuffle tickets</v-btn>
                        <v-btn color="primary" class="mr-3" @click="shuffleBoth">Shuffle both</v-btn>
                        <v-btn color="primary" class="mr-3" @click="randomAction">Random action</v-btn>
                        <v-btn color="error" class="mr-3" @click="reset">Reset</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue";
import { Head, usePage } from "@inertiajs/vue3";
import { ref, computed, nextTick } from "vue";
import { random, remove, reverse, sample, shuffle, uniqueId } from "lodash";
import { TransitionGroup as TransGroup } from "@/components/TransitionGroup";
import TransOperator from "./Operator.vue";
import type { DisplayOptions } from "@/types";
import type { Operator } from "@/types/trans";

const operatorNames = ["Apollo", "Hermes", "Ares", "Zeus", "Poseidon", "Dionysus", "Aphrodite", "Hephaestus", "Athena"];
const ticketNames = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"];
const operators = ref<Operator[]>([]);
const config = computed(() => usePage().props.options as DisplayOptions);
let priority = 0;

async function addOperator() {
    await nextTick();
    operators.value.push({
        id: uniqueId(),
        name: sample(operatorNames) ?? "bitch",
        priority: priority++,
        tickets: [],
    });
}

async function addTicket() {
    await nextTick();
    const operator = <Operator | undefined>sample(operators.value);
    operator?.tickets.push({
        id: uniqueId(),
        name: sample(ticketNames) ?? "bitch",
        weight: random(0, config.value.weight_threshold),
    });
}

async function removeTicket() {
    let operator: Operator | undefined;
    let counter = 0;
    await nextTick();
    do {
        operator = <Operator | undefined>sample(operators.value);
        counter++;
    } while (operator && operator.tickets.length === 0 && counter < 10);
    operator && remove(operator.tickets, (ticket, index) => index === random(0, operator!.tickets.length - 1));
}

async function flipOperators() {
    await nextTick();
    operators.value = reverse(operators.value);
}

async function shuffleOperators() {
    await nextTick();
    operators.value = shuffle(operators.value);
}

async function shuffleTickets() {
    await nextTick();
    for (const operator of operators.value) {
        //await nextTick();
        operator.tickets = shuffle(operator.tickets);
    }
}

async function shuffleBoth() {
    await shuffleTickets();
    await shuffleOperators();
}

async function randomAction() {
    await sample([
        shuffleOperators,
        shuffleOperators,
        addTicket,
        addTicket,
        addTicket,
        removeTicket,
        shuffleTickets,
        shuffleBoth,
    ])?.();
}

async function reset() {
    await nextTick();
    operators.value = [];
}
</script>

<style scoped>
.monitor:deep(table) {
    table-layout: fixed;
    overflow: hidden;
}

.monitor:deep(table th) {
    width: 12em;
}

.operators-move {
    transition: transform 2s ease-in-out;
}
</style>
