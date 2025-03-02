<template>
    <Head :title="$t(operator ? 'edit_operator' : 'new_operator')" />

    <DefaultLayout>
        <template #header>
            <h2 class="text-xl leading-tight font-semibold text-gray-800">
                {{ $t(operator ? "edit_operator" : "new_operator") }}
            </h2>
        </template>

        <div>
            <v-form @submit.prevent="submit">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field
                                v-if="operator"
                                :model-value="operator.user?.name"
                                :label="$t('user')"
                                readonly
                            />
                            <v-autocomplete
                                v-else
                                v-model="form.user"
                                :label="$t('user')"
                                :items="users"
                                item-title="name"
                                item-value="id"
                                :error-messages="errors.user"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field
                                v-model="form.name"
                                maxlength="255"
                                :label="$t('display_name')"
                                :placeholder="name"
                                :persistent-placeholder="!!name.length"
                                :error-messages="errors.name"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model.number="form.ticket_limit"
                                type="number"
                                min="1"
                                max="100"
                                :label="$t('ticket_limit')"
                                placeholder="&infin;"
                                persistent-placeholder
                                :error-messages="errors.ticket_limit"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model.number="form.complexity_limit"
                                type="number"
                                min="1"
                                max="1000"
                                :label="$t('complexity_limit')"
                                placeholder="&infin;"
                                persistent-placeholder
                                :error-messages="errors.complexity_limit"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-autocomplete
                                v-model="form.teams"
                                multiple
                                clearable
                                chips
                                closable-chips
                                :label="$t('teams')"
                                :items="teams"
                                item-title="name"
                                item-value="uuid"
                                :error-messages="errors.teams"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-btn type="submit" color="primary" class="mr-3" :disabled="form.processing">
                                {{ $t("save") }}
                            </v-btn>
                            <v-btn :to="route('ticket-allocator.operators.index')" class="mr-3">
                                {{ $t("cancel") }}
                            </v-btn>
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
import { computed } from "vue";
import type { User, Operator, OperatorTeam } from "@/types";
import { route } from "ziggy-js";

const props = defineProps<{
    users: User[];
    operator?: Operator;
    teams: OperatorTeam[];
    errors: Record<string, string>;
}>();

const form = useForm<{
    user: number | null;
    name: string | null;
    ticket_limit: number | null;
    complexity_limit: number | null;
    teams: string[];
}>({
    user: null,
    name: props.operator?.display_name ?? "",
    ticket_limit: props.operator?.ticket_limit ?? null,
    complexity_limit: props.operator?.complexity_limit ?? null,
    teams: props.operator?.teams.map((team) => team.uuid) ?? [],
});

const name = computed(() => {
    const name = props.operator?.user?.name;
    if (name) return name;

    const index = props.users.findIndex((user) => user.id === form.user);
    return index < 0 ? "" : props.users[index].name;
});

function submit() {
    props.operator
        ? form.put(route("ticket-allocator.operators.update", props.operator.uuid))
        : form.post(route("ticket-allocator.operators.store"));
}
</script>
