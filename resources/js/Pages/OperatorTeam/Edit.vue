<template>
    <Head title="Edit team" />

    <DefaultLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Edit team</h2>
        </template>

        <div>
            <v-form>
                <v-text-field label="Name" :model-value="team.name" />
                <v-textarea label="Description" :model-value="team.description" />
                <v-autocomplete
                    multiple
                    clearable
                    chips
                    closable-chips
                    label="Operators"
                    :items="['Fuck', 'off', 'bitch', '!!!']"
                />
                <v-autocomplete
                    multiple
                    clearable
                    chips
                    closable-chips
                    label="Ticket categories"
                    :items="categories"
                    item-title="name"
                    item-value="uuid"
                />
            </v-form>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/Layouts/Default.vue";
import { Head } from "@inertiajs/vue3";
import { useUserListApi } from "@/api";
import type { OperatorTeam, TicketCategory } from "@/types";

import { useRepo } from "pinia-orm";
import OperatorTeamModel from "@/models/OperatorTeam";
import TicketCategoryModel from "@/models/TicketCategory";
import { computed, onMounted } from "vue";

const props = defineProps<{
    team: OperatorTeam;
    categories: TicketCategory[];
}>();

const teamRepo = computed(() => useRepo(OperatorTeamModel));
const categoryRepo = computed(() => useRepo(TicketCategoryModel));

const team = computed(() => teamRepo.value.with("operators").with("categories").find(props.team.uuid));
const categories = computed(() => categoryRepo.value.all());

onMounted(() => {
    teamRepo.value.fresh(props.team);
    categoryRepo.value.fresh(props.categories);
});
</script>
