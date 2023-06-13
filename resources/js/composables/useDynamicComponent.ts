import { shallowRef, inject, onBeforeMount, DefineComponent } from "vue";

type PageResolver = (name: string) => DefineComponent | Promise<DefineComponent>;

export function useDynamicComponent(name: string | null) {
    const component = shallowRef<DefineComponent | null>(null);
    const resolveComponent = inject<PageResolver>("resolveComponent");

    onBeforeMount(async () => {
        if (name && resolveComponent) {
            component.value = await resolveComponent(name);
        }
    });

    return component;
}
