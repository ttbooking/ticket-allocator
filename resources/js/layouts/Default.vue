<template>
    <v-app>
        <v-navigation-drawer expand-on-hover rail>
            <v-list density="compact" nav>
                <v-list-item
                    :to="route('ticket-allocator.index')"
                    prepend-icon="mdi-monitor-dashboard"
                    :title="$t('dashboard')"
                    value="dashboard"
                />
                <v-list-item
                    :to="route('ticket-allocator.operators.index')"
                    prepend-icon="mdi-account"
                    :title="$t('operators')"
                    value="operators"
                />
                <v-list-item
                    :to="route('ticket-allocator.teams.index')"
                    prepend-icon="mdi-account-group"
                    :title="$t('teams')"
                    value="teams"
                />
                <v-list-item
                    :to="route('ticket-allocator.ticket-categories.index')"
                    prepend-icon="mdi-ticket"
                    :title="$t('ticket_categories')"
                    value="ticket-categories"
                />
                <v-list-item
                    :to="route('ticket-allocator.factors.index')"
                    prepend-icon="mdi-tune"
                    :title="$t('factors')"
                    value="factors"
                />
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
import { useI18n } from "vue-i18n";
import { useLocale } from "vuetify";
import route from "ziggy-js";

const { locale } = useI18n();

useLocale().current.value = locale.value;
</script>
