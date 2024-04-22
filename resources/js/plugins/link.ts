import { App, computed, unref } from "vue";
import { UseLinkOptions } from "vue-router";
import { router, usePage } from "@inertiajs/vue3";
import type { Method } from "@inertiajs/core";

export default {
    install(app: App) {
        app.component("RouterLink", {
            useLink(props: UseLinkOptions) {
                const href = unref(props.to) as string;
                const currentUrl = computed(() => usePage().url);
                return {
                    route: computed(() => ({ href })),
                    isActive: computed(() => currentUrl.value.startsWith(href)),
                    isExactActive: computed(() => currentUrl.value === href),
                    navigate(e: MouseEvent) {
                        if (e.shiftKey || e.metaKey || e.ctrlKey) return;
                        e.preventDefault();
                        router.visit(href, {
                            method: ((<Element | null>e.currentTarget)?.getAttribute("method") ?? "get") as Method,
                        });
                    },
                };
            },
        });
    },
};
