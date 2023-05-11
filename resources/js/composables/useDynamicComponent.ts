import { ref, inject, onBeforeMount, DefineComponent } from "vue";
import type { InertiaAppProps } from "@inertiajs/vue3/types/app";

export function useDynamicComponent(name: string | null) {
    const component = ref<DefineComponent | null>(null);
    const props = inject<InertiaAppProps>("appProps");

    onBeforeMount(async () => {
        if (name && props?.resolveComponent) {
            component.value = await props.resolveComponent(name);
        }
    });

    return component;
}
