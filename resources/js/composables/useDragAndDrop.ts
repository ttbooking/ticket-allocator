import { ref } from "vue";
import type { MaybeComputedRef } from "@vueuse/core";
import { useEventListener } from "@vueuse/core";

export type DragStartHandler = (dataTransfer: DataTransfer | null) => void;

export function useDragAndDrop(
    target: MaybeComputedRef<HTMLElement | null | undefined>,
    onDragStart?: DragStartHandler
) {
    const element = ref<HTMLElement | null | undefined>();

    useEventListener<DragEvent>(target, "dragstart", (event) => {
        element.value = event.target as HTMLElement;
        onDragStart?.(event.dataTransfer);
    });

    useEventListener<DragEvent>(target, "dragend", () => {
        element.value = null;
    });

    return {
        element,
    };
}

export type UseDragAndDropReturn = ReturnType<typeof useDragAndDrop>;
