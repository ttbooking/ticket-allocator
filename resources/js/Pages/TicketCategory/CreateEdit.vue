<template>
    <Head :title="trans(ticketCategory ? 'edit_category' : 'new_category')" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ trans(ticketCategory ? "edit_category" : "new_category") }}
            </h2>
        </template>

        <div>
            <v-form @submit.prevent="submit">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="form.name"
                                required
                                maxlength="255"
                                :label="trans('name')"
                                :error-messages="errors.name"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="form.short"
                                required
                                maxlength="32"
                                :label="trans('short_name')"
                                :error-messages="errors.short"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="3">
                            <v-text-field
                                v-model.number="form.initial_weight"
                                type="number"
                                required
                                min="0"
                                max="9999999"
                                :label="trans('initial_weight')"
                                :error-messages="errors.initial_weight"
                            />
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field
                                v-model.number="form.weight_increment"
                                type="number"
                                required
                                min="0"
                                max="99999"
                                :label="trans('weight_increment')"
                                :error-messages="errors.weight_increment"
                            />
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field
                                v-model.number="form.complexity"
                                type="number"
                                required
                                min="0"
                                max="9999"
                                :label="trans('complexity')"
                                :error-messages="errors.complexity"
                            />
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field
                                v-model.number="form.delay"
                                type="number"
                                required
                                min="0"
                                max="99999"
                                :label="trans('delay')"
                                :error-messages="errors.delay"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-btn type="submit" color="primary" class="mr-3" :disabled="form.processing">
                                {{ trans("save") }}
                            </v-btn>
                            <Link :href="route('ticket-allocator.ticket-categories.index')" class="mr-3">
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
import type { TicketCategory } from "@/types";
import { trans } from "laravel-vue-i18n";
import route from "ziggy-js";

const props = defineProps<{
    ticketCategory?: TicketCategory;
    errors: Record<string, string>;
}>();

const form = useForm<{
    name: string;
    short: string;
    initial_weight: number;
    weight_increment: number;
    complexity: number;
    delay: number;
}>({
    name: props.ticketCategory?.name ?? "",
    short: props.ticketCategory?.short ?? "",
    initial_weight: props.ticketCategory?.initial_weight ?? 0,
    weight_increment: props.ticketCategory?.weight_increment ?? 0,
    complexity: props.ticketCategory?.complexity ?? 0,
    delay: props.ticketCategory?.delay ?? 0,
});

function submit() {
    props.ticketCategory
        ? form.put(route("ticket-allocator.ticket-categories.update", props.ticketCategory.uuid))
        : form.post(route("ticket-allocator.ticket-categories.store"));
}
</script>
