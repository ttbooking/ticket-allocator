import { ref } from "vue";
import { unrefElement, useEventListener } from "@vueuse/core";
import type { MaybeElementRef } from "@vueuse/core";

/**
 * Reactive pointer lock.
 */
export function usePointerLock(target?: MaybeElementRef<HTMLElement>) {
    const element = ref<Element | null>();

    function lock(e: MaybeElementRef<HTMLElement> | Event) {
        const target = e instanceof Event ? <Element>e.target : unrefElement(e);
        target && target.requestPointerLock();

        const cleanupChange = useEventListener(document, "pointerlockchange", () => {
            (element.value = document.pointerLockElement) || cleanupChange();
        });

        const cleanupError = useEventListener(document, "pointerlockerror", () => {
            cleanupChange();
            cleanupError();
        });
    }

    function unlock() {
        element.value && document.exitPointerLock();
    }

    target && lock(target);

    return {
        lock,
        unlock,
        element,
    };
}

export type UsePointerLockReturn = ReturnType<typeof usePointerLock>;
