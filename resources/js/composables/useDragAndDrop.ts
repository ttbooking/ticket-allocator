import { ref } from "vue";
import type { MaybeComputedRef } from "@vueuse/core";
import { useEventListener } from "@vueuse/core";

export type DragStartHandler = (element: HTMLElement, dataTransfer: DataTransfer | null) => void;

export function useDragAndDrop(
    target: MaybeComputedRef<HTMLElement | null | undefined>,
    onDragStart?: DragStartHandler | string
) {
    const element = ref<HTMLElement | null | undefined>();

    useEventListener<DragEvent>(target, "dragstart", (event) => {
        element.value = event.target as HTMLElement;

        if (typeof onDragStart === "string") {
            const entry = onDragStart;
            onDragStart = (element, dataTransfer) => {
                dataTransfer?.setData("text/plain", element.dataset[entry] ?? "");
            };
        }

        onDragStart?.(element.value, event.dataTransfer);
    });

    useEventListener<DragEvent>(target, "dragend", () => {
        element.value = null;
    });

    return {
        element,
    };
}

export type UseDragAndDropReturn = ReturnType<typeof useDragAndDrop>;
