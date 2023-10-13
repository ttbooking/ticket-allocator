<template>
    <Head :title="$t(ticketCategory ? 'edit_category' : 'new_category')" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ $t(ticketCategory ? "edit_category" : "new_category") }}
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
                                :label="$t('name')"
                                :error-messages="errors.name"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="form.short"
                                required
                                maxlength="32"
                                :label="$t('short_name')"
                                :error-messages="errors.short"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-btn type="submit" color="primary" class="mr-3" :disabled="form.processing">
                                {{ $t("save") }}
                            </v-btn>
                            <v-btn :to="route('ticket-allocator.ticket-categories.index')" class="mr-3">
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
import type { TicketCategory } from "@/types";
import route from "ziggy-js";

const props = defineProps<{
    ticketCategory?: TicketCategory;
    errors: Record<string, string>;
}>();

const form = useForm<{
    name: string;
    short: string;
}>({
    name: props.ticketCategory?.name ?? "",
    short: props.ticketCategory?.short ?? "",
});

function submit() {
    props.ticketCategory
        ? form.put(route("ticket-allocator.ticket-categories.update", props.ticketCategory.uuid))
        : form.post(route("ticket-allocator.ticket-categories.store"));
}
</script>
