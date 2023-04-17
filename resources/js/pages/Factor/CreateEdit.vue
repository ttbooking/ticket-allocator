<template>
    <Head :title="trans(factor ? 'edit_factor' : 'new_factor')" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ trans(factor ? "edit_factor" : "new_factor") }}
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
                                required
                                maxlength="255"
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
                            <v-btn type="submit" color="primary" class="mr-3" :disabled="form.processing">
                                {{ trans("save") }}
                            </v-btn>
                            <Link :href="route('ticket-allocator.factors.index')" class="mr-3">
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
import DefaultLayout from "@/layouts/Default.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";
import type { Factor } from "@/types";
import { trans } from "laravel-vue-i18n";
import route from "ziggy-js";

const props = defineProps<{
    factor?: Factor;
    errors: Record<string, string>;
}>();

const form = useForm({
    active: !props.factor?.deleted_at,
    name: props.factor?.name ?? "",
    description: props.factor?.description ?? "",
});

function submit() {
    props.factor
        ? form.put(route("ticket-allocator.factors.update", props.factor.uuid))
        : form.post(route("ticket-allocator.factors.store"));
}
</script>
