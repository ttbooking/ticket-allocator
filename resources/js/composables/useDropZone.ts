import { ref } from "vue";
import type { MaybeRefOrGetter } from "@vueuse/core";
import { isClient, useEventListener } from "@vueuse/core";

// export type DropHandler = <T extends DataTransfer | File[] = DataTransfer>(arg: T | null) => void
export type DropHandler = (arg: File[] | DataTransfer | null) => void;
export type FileDropHandler = (arg: File[] | null) => void;
export type DataDropHandler = (arg: DataTransfer | null) => void;

export function useDropZone(
    target: MaybeRefOrGetter<HTMLElement | null | undefined>,
    onDrop?: DataDropHandler,
    filesOnly = true,
) {
    const isOverDropZone = ref(false);
    let counter = 0;

    if (isClient) {
        useEventListener<DragEvent>(target, "dragenter", (event) => {
            event.preventDefault();
            counter++;
            isOverDropZone.value = true;
        });
        useEventListener<DragEvent>(target, "dragover", (event) => {
            event.preventDefault();
        });
        useEventListener<DragEvent>(target, "dragleave", (event) => {
            event.preventDefault();
            counter--;
            if (counter === 0) isOverDropZone.value = false;
        });
        useEventListener<DragEvent>(target, "drop", (event) => {
            event.preventDefault();
            counter = 0;
            isOverDropZone.value = false;
            if (onDrop) {
                if (filesOnly) {
                    const files = Array.from(event.dataTransfer?.files ?? []);
                    const onFileDrop = onDrop as FileDropHandler;
                    onFileDrop(files.length === 0 ? null : files);
                } else {
                    const onDataDrop = onDrop as DataDropHandler;
                    onDataDrop(event.dataTransfer);
                }
            }
        });
    }

    return {
        isOverDropZone,
    };
}

export type UseDropZoneReturn = ReturnType<typeof useDropZone>;
