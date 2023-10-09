<template>
    <Head :title="$t(factor ? 'edit_factor' : 'new_factor')" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ $t(factor ? "edit_factor" : "new_factor") }}
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
                        <v-col cols="12" md="12">
                            <v-text-field
                                :model-value="factorTypeName"
                                :label="$t('factor_type')"
                                :error-messages="errors.type"
                                readonly
                            />
                            <input v-model="form.type" type="hidden" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field
                                v-model="form.name"
                                maxlength="255"
                                :label="$t('name')"
                                :placeholder="factorTypeName"
                                :persistent-placeholder="!!factorTypeName.length"
                                :error-messages="errors.name"
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
                    <component :is="formComponent" v-if="!!formComponent" v-model="form.config" :entries="entries" />
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-btn type="submit" color="primary" class="mr-3" :disabled="form.processing">
                                {{ $t("save") }}
                            </v-btn>
                            <v-btn :to="route('ticket-allocator.factors.index')" class="mr-3">{{ $t("cancel") }}</v-btn>
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
import type { Entry, Factor, FactorType } from "@/types";
import { computed } from "vue";
import { useDynamicComponent } from "@/composables";

const props = defineProps<{
    factor?: Factor;
    factorType?: FactorType;
    entries: Entry[];
    errors: Record<string, string>;
}>();

const form = useForm({
    active: !props.factor?.deleted_at,
    type: props.factor?.type.alias ?? props.factorType?.alias ?? "",
    name: props.factor?.display_name ?? "",
    description: props.factor?.description ?? "",
    config: props.factor?.config ?? [],
});

const factorTypeName = computed(() => props.factor?.type.name ?? props.factorType?.name ?? "");

const formComponent = useDynamicComponent(props.factor?.type.component ?? props.factorType?.component ?? null);

function submit() {
    props.factor
        ? form.put(route("ticket-allocator.factors.update", props.factor.uuid))
        : form.post(route("ticket-allocator.factors.store"));
}
</script>
