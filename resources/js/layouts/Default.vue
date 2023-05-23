<template>
    <v-app>
        <v-navigation-drawer expand-on-hover rail>
            <v-list density="compact" nav>
                <Link :href="route('ticket-allocator.index')">
                    <v-list-item prepend-icon="mdi-monitor-dashboard" :title="$t('dashboard')" value="dashboard" />
                </Link>
                <Link :href="route('ticket-allocator.operators.index')">
                    <v-list-item prepend-icon="mdi-account" :title="$t('operators')" value="operators" />
                </Link>
                <Link :href="route('ticket-allocator.teams.index')">
                    <v-list-item prepend-icon="mdi-account-group" :title="$t('teams')" value="teams" />
                </Link>
                <Link :href="route('ticket-allocator.ticket-categories.index')">
                    <v-list-item prepend-icon="mdi-ticket" :title="$t('ticket_categories')" value="ticket-categories" />
                </Link>
                <Link :href="route('ticket-allocator.factors.index')">
                    <v-list-item prepend-icon="mdi-tune" :title="$t('factors')" value="factors" />
                </Link>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div class="w-1/4">
                    <Link :href="route('ticket-allocator.index')" class="flex align-center">
                        <ApplicationLogo class="w-20 h-20 shrink-0" />
                        <span class="font-title text-4xl text-gray-600">{{ $t("title") }}</span>
                    </Link>
                </div>

                <div class="w-full mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <slot />
                </div>
            </div>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import ApplicationLogo from "@/components/ApplicationLogo.vue";
import { Link } from "@inertiajs/vue3";
import { getActiveLanguage } from "laravel-vue-i18n";
import { useLocale } from "vuetify";
import route from "ziggy-js";

useLocale().current.value = getActiveLanguage();
</script>
