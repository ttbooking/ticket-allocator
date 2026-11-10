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
            <div
                class="tw:flex tw:min-h-screen tw:flex-col tw:items-center tw:bg-gray-100 tw:pt-6 tw:sm:justify-center tw:sm:pt-0"
            >
                <div class="tw:w-1/4">
                    <Link :href="route('ticket-allocator.index')" class="tw:align-center tw:flex">
                        <ApplicationLogo class="tw:h-20 tw:w-20 tw:shrink-0" />
                        <span class="tw:font-title tw:text-4xl tw:text-gray-600">{{ $t("title") }}</span>
                    </Link>
                </div>

                <div
                    class="tw:mt-6 tw:w-full tw:overflow-hidden tw:bg-white tw:px-6 tw:py-4 tw:shadow-md tw:sm:rounded-lg"
                >
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
import { route } from "ziggy-js";

const { locale } = useI18n();

useLocale().current.value = locale.value;
</script>
