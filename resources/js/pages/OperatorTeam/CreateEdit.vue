<template>
    <Head :title="$t(team ? 'edit_team' : 'new_team')" />

    <DefaultLayout>
        <template #header>
            <h2 class="text-xl leading-tight font-semibold text-gray-800">
                {{ $t(team ? "edit_team" : "new_team") }}
            </h2>
        </template>

        <div>
            <v-form @submit.prevent="submit">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-checkbox v-model="form.active" :label="$t('active')" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="form.name"
                                required
                                maxlength="255"
                                :label="$t('name')"
                                :error-messages="errors.name"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model.number="form.weight"
                                type="number"
                                min="0"
                                max="1000"
                                :label="$t('weight')"
                                placeholder="100"
                                :error-messages="errors.weight"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-textarea
                                v-model="form.description"
                                :label="$t('description')"
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
                                :label="$t('operators')"
                                :items="operators"
                                item-title="name"
                                item-value="uuid"
                                :error-messages="errors.operators"
                            />
                        </v-col>
                    </v-row>
                    <v-row v-for="(items, matcher) in matchers" :key="matcher">
                        <v-col cols="12" md="12">
                            <v-autocomplete
                                multiple
                                clearable
                                chips
                                closable-chips
                                :label="$t(matcher)"
                                :items="itemify(items)"
                                :error-messages="errors[matcher]"
                                :model-value="form.matching[matcher]"
                                @update:model-value="form.matching[matcher] = $event.length ? $event : undefined"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-btn type="submit" color="primary" class="mr-3" :disabled="form.processing">
                                {{ $t("save") }}
                            </v-btn>
                            <v-btn :to="route('ticket-allocator.teams.index')" class="mr-3">{{ $t("cancel") }}</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue";
import { Head, useForm } from "@inertiajs/vue3";
import type { OperatorTeam, Operator } from "@/types";
import { route } from "ziggy-js";

const props = defineProps<{
    team?: OperatorTeam;
    operators: Operator[];
    matchers: Record<string, Record<string, string | number>>;
    errors: Record<string, string>;
}>();

const form = useForm({
    active: !props.team?.deleted_at,
    name: props.team?.name ?? "",
    description: props.team?.description ?? "",
    weight: props.team?.weight ?? 100,
    operators: props.team?.operators.map((operator) => operator.uuid) ?? [],
    matching: Array.isArray(props.team?.matching) ? {} : (props.team?.matching ?? {}),
});

const itemify = (items: object) => Object.entries(items).map(([title, value]) => ({ title, value }));

function submit() {
    props.team
        ? form.put(route("ticket-allocator.teams.update", props.team.uuid))
        : form.post(route("ticket-allocator.teams.store"));
}
</script>
