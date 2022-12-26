import { ref } from "vue";
import { useEventListener } from "@vueuse/core";

/**
 * Reactive pointer lock.
 */
export function usePointerLock() {
    const element = ref<Element | null>();

    function lock(event: Event) {
        (event.target as Element).requestPointerLock();
    }

    function unlock() {
        element.value && document.exitPointerLock();
    }

    useEventListener(document, "pointerlockchange", () => {
        element.value = document.pointerLockElement;
    });

    return {
        lock,
        unlock,
        element,
    };
}

export type UsePointerLockReturn = ReturnType<typeof usePointerLock>;
