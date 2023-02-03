<template>
    <Head title="Edit team" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Edit team</h2>
        </template>

        <div>
            <v-form @submit.prevent="submit">
                <v-checkbox v-model="form.active" label="Active" />
                <v-text-field v-model="form.name" label="Name" :error-messages="errors.name" class="mb-4" />
                <v-textarea
                    v-model="form.description"
                    label="Description"
                    :error-messages="errors.description"
                    class="mb-4"
                />
                <v-autocomplete
                    v-model="form.operators"
                    multiple
                    clearable
                    chips
                    closable-chips
                    label="Operators"
                    :items="operators"
                    item-title="name"
                    item-value="uuid"
                    :error-messages="errors.operators"
                    class="mb-4"
                />
                <v-autocomplete
                    v-model="form.ticket_categories"
                    multiple
                    clearable
                    chips
                    closable-chips
                    label="Ticket categories"
                    :items="ticketCategories"
                    item-title="name"
                    item-value="uuid"
                    :error-messages="errors.ticket_categories"
                    class="mb-4"
                />
                <v-btn type="submit" color="primary" class="mr-3" :disabled="form.processing">Save</v-btn>
                <Link :href="route('ticket-allocator.teams.index')" class="mr-3"><v-btn>Cancel</v-btn></Link>
            </v-form>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/Layouts/Default.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";
import type { OperatorTeam, Operator, TicketCategory } from "@/types";
import route from "ziggy-js";

const props = defineProps<{
    team: OperatorTeam;
    operators: Operator[];
    ticketCategories: TicketCategory[];
    errors: Record<string, string>;
}>();

const form = useForm({
    active: !props.team.deleted_at,
    name: props.team.name,
    description: props.team.description,
    operators: props.team.operators.map((operator) => operator.uuid),
    ticket_categories: props.team.ticket_categories.map((category) => category.uuid),
});

function submit() {
    form.put(route("ticket-allocator.teams.update", props.team.uuid));
}
</script>
