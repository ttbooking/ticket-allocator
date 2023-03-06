<template>
    <Head :title="trans(team ? 'edit_team' : 'new_team')" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ trans(team ? "edit_team" : "new_team") }}
            </h2>
        </template>

        <div>
            <v-form @submit.prevent="submit">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-checkbox v-model="form.active" :label="trans('active')" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field
                                v-model="form.name"
                                :label="trans('name')"
                                :error-messages="errors.name"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-textarea
                                v-model="form.description"
                                :label="trans('description')"
                                :error-messages="errors.description"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-autocomplete
                                v-model="form.operators"
                                multiple
                                clearable
                                chips
                                closable-chips
                                :label="trans('operators')"
                                :items="operators"
                                item-title="name"
                                item-value="uuid"
                                :error-messages="errors.operators"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-autocomplete
                                v-model="form.ticket_categories"
                                multiple
                                clearable
                                chips
                                closable-chips
                                :label="trans('ticket_categories')"
                                :items="ticketCategories"
                                item-title="name"
                                item-value="uuid"
                                :error-messages="errors.ticket_categories"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-btn type="submit" color="primary" class="mr-3" :disabled="form.processing">
                                {{ trans("save") }}
                            </v-btn>
                            <Link :href="route('ticket-allocator.teams.index')" class="mr-3">
                                <v-btn>{{ trans("cancel") }}</v-btn>
                            </Link>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/Layouts/Default.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";
import type { OperatorTeam, Operator, TicketCategory } from "@/types";
import { trans } from "laravel-vue-i18n";
import route from "ziggy-js";

const props = defineProps<{
    team?: OperatorTeam;
    operators: Operator[];
    ticketCategories: TicketCategory[];
    errors: Record<string, string>;
}>();

const form = useForm({
    active: !props.team?.deleted_at,
    name: props.team?.name ?? "",
    description: props.team?.description ?? "",
    operators: props.team?.operators.map((operator) => operator.uuid) ?? [],
    ticket_categories: props.team?.ticket_categories.map((category) => category.uuid) ?? [],
});

function submit() {
    props.team
        ? form.put(route("ticket-allocator.teams.update", props.team.uuid))
        : form.post(route("ticket-allocator.teams.store"));
}
</script>
