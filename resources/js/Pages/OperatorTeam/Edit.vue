<template>
    <Head title="Edit team" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Edit team</h2>
        </template>

        <div>
            <v-form @submit.prevent="submit">
                <v-text-field v-model="request.name" label="Name" />
                <v-textarea v-model="request.description" label="Description" />
                <v-autocomplete
                    v-model="request.operators"
                    multiple
                    clearable
                    chips
                    closable-chips
                    label="Operators"
                    :items="operators"
                    item-title="name"
                    item-value="uuid"
                />
                <v-autocomplete
                    v-model="request.ticket_categories"
                    multiple
                    clearable
                    chips
                    closable-chips
                    label="Ticket categories"
                    :items="ticketCategories"
                    item-title="name"
                    item-value="uuid"
                />
                <v-btn type="submit">Save</v-btn>
            </v-form>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/Layouts/Default.vue";
import { Head } from "@inertiajs/vue3";
import { reactive } from "vue";
import { useOperatorTeamApi, useUserListApi } from "@/api";
import type { OperatorTeam, Operator, TicketCategory } from "@/types";

const props = defineProps<{
    team: OperatorTeam;
    operators: Operator[];
    ticketCategories: TicketCategory[];
}>();

const request = reactive({
    name: props.team.name,
    description: props.team.description,
    operators: props.team.operators.map((operator) => operator.uuid),
    ticket_categories: props.team.ticket_categories.map((category) => category.uuid),
});

const api = useOperatorTeamApi();

async function submit() {
    const result = await api.update(props.team.uuid, request);
    console.log(result);
}
</script>
