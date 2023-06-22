<template>
    <Head title="Trans" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Trans</h2>
        </template>

        <div>
            <v-table density="compact" class="monitor overflow-hidden">
                <tbody>
                    <TransitionGroup name="operators">
                        <tr v-for="operator in operators" :key="operator.id">
                            <th>{{ operator.name }}</th>
                            <td>
                                <TransitionGroup name="tickets">
                                    <v-btn
                                        v-for="ticket in operator.tickets"
                                        :key="ticket.id"
                                        size="small"
                                        width="100"
                                        class="mr-1 mb-1"
                                    >
                                        {{ ticket.name }}
                                    </v-btn>
                                </TransitionGroup>
                            </td>
                        </tr>
                    </TransitionGroup>
                </tbody>
            </v-table>
            <v-container>
                <v-row>
                    <v-col>
                        <v-btn color="primary" class="mr-3" @click="addOperator">Add operator</v-btn>
                        <v-btn color="primary" class="mr-3" @click="addTicket">Add ticket</v-btn>
                        <v-btn color="primary" class="mr-3" @click="removeTicket">Remove ticket</v-btn>
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
import { Head } from "@inertiajs/vue3";
import { ref } from "vue";
import { random, remove, sample, shuffle, uniqueId } from "lodash";

interface Ticket {
    id: string;
    name: string;
}

interface Operator {
    id: string;
    name: string;
    tickets: Ticket[];
}

const operatorNames = ["Apollo", "Hermes", "Ares", "Zeus", "Poseidon", "Dionysus", "Aphrodite", "Hephaestus", "Athena"];
const ticketNames = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"];
const operators = ref<Operator[]>([]);

function addOperator() {
    operators.value.push({
        id: uniqueId(),
        name: sample(operatorNames) ?? "bitch",
        tickets: [],
    });
}

function addTicket() {
    const operator = <Operator | undefined>sample(operators.value);
    operator?.tickets.push({ id: uniqueId(), name: sample(ticketNames) ?? "bitch" });
}

function removeTicket() {
    let operator: Operator | undefined;
    let counter = 0;
    do {
        operator = <Operator | undefined>sample(operators.value);
        counter++;
    } while (operator && operator.tickets.length === 0 && counter < 10);
    operator && remove(operator.tickets, (ticket, index) => index === random(0, operator!.tickets.length - 1));
}

function shuffleOperators() {
    operators.value = shuffle(operators.value);
}

function shuffleTickets() {
    for (const operator of operators.value) {
        operator.tickets = shuffle(operator.tickets);
    }
}

function shuffleBoth() {
    shuffleOperators();
    shuffleTickets();
}

function randomAction() {
    sample([
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

function reset() {
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
    transition: all 1s ease;
}

.tickets-move,
.tickets-enter-active {
    transition: all 1s ease;
}

.tickets-enter-from {
    transform: translateX(300px);
}

.tickets-leave-active {
    transition: opacity 1s;
}

.tickets-leave-to {
    opacity: 0;
}
</style>
