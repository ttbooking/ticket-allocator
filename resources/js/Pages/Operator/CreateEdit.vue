<template>
    <Head :title="operator ? 'Edit operator' : 'New operator'" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ operator ? "Edit operator" : "New operator" }}
            </h2>
        </template>

        <div>
            <v-form @submit.prevent="submit">
                <v-text-field v-model="form.name" label="Name" :error-messages="errors.name" class="mb-4" />
                <v-autocomplete
                    v-model="form.teams"
                    multiple
                    clearable
                    chips
                    closable-chips
                    label="Teams"
                    :items="teams"
                    item-title="name"
                    item-value="uuid"
                    :error-messages="errors.teams"
                    class="mb-4"
                />
                <v-btn type="submit" color="primary" class="mr-3" :disabled="form.processing">Save</v-btn>
                <Link :href="route('ticket-allocator.operators.index')" class="mr-3"><v-btn>Cancel</v-btn></Link>
            </v-form>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/Layouts/Default.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";
import type { Operator, OperatorTeam } from "@/types";
import route from "ziggy-js";

const props = defineProps<{
    operator?: Operator;
    teams: OperatorTeam[];
    errors: Record<string, string>;
}>();

const form = useForm({
    name: props.operator?.name ?? "",
    ticket_limit: props.operator?.ticket_limit ?? null,
    complexity_limit: props.operator?.complexity_limit ?? null,
    teams: props.operator?.teams.map((team) => team.uuid) ?? [],
});

function submit() {
    props.operator
        ? form.put(route("ticket-allocator.operators.update", props.operator.uuid))
        : form.post(route("ticket-allocator.operators.store"));
}
</script>
