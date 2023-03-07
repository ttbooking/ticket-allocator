<script setup lang="ts">
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import { Link } from "@inertiajs/vue3";
import { getActiveLanguage, trans } from "laravel-vue-i18n";
import { useLocale } from "vuetify";
import route from "ziggy-js";

useLocale().current.value = getActiveLanguage();
</script>

<template>
    <v-app>
        <v-navigation-drawer expand-on-hover rail>
            <v-list density="compact" nav>
                <Link :href="route('ticket-allocator.index')">
                    <v-list-item prepend-icon="mdi-monitor-dashboard" :title="trans('dashboard')" value="dashboard" />
                </Link>
                <Link :href="route('ticket-allocator.ticket-categories.index')">
                    <v-list-item
                        prepend-icon="mdi-ticket"
                        :title="trans('ticket_categories')"
                        value="ticket-categories"
                    />
                </Link>
                <Link :href="route('ticket-allocator.operators.index')">
                    <v-list-item prepend-icon="mdi-account" :title="trans('operators')" value="operators" />
                </Link>
                <Link :href="route('ticket-allocator.teams.index')">
                    <v-list-item prepend-icon="mdi-account-group" :title="trans('teams')" value="teams" />
                </Link>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div>
                    <Link href="/">
                        <ApplicationLogo class="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                </div>

                <div class="w-full mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <slot />
                </div>
            </div>
        </v-main>
    </v-app>
</template>
