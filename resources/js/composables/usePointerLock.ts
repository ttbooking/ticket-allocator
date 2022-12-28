import { ref } from "vue";
import { createSharedComposable, until } from "@vueuse/shared";
import { useEventListener, useSupported, unrefElement } from "@vueuse/core";
import type { MaybeElement, MaybeElementRef } from "@vueuse/core";
import type { ConfigurableDocument } from "@vueuse/core";
import { defaultDocument } from "@vueuse/core";

const useSharedEventListener = createSharedComposable(useEventListener);

/**
 * Reactive pointer lock.
 */
export function usePointerLock(target?: MaybeElementRef, options: ConfigurableDocument = {}) {
    const { document = defaultDocument } = options;

    const isSupported = useSupported(() => document && "pointerLockElement" in document);

    const element = ref<MaybeElement>();

    if (isSupported.value) {
        useSharedEventListener(document, "pointerlockchange", () => {
            console.log(document!.pointerLockElement ? "locked" : "unlocked");
            element.value = document!.pointerLockElement as MaybeElement;
        });

        useSharedEventListener(document, "pointerlockerror", () => {
            console.log("error");
            const action = document!.pointerLockElement ? "release" : "acquire";
            throw new Error(`Failed to ${action} pointer lock.`);
        });
    }

    async function lock(e: MaybeElementRef | Event) {
        if (!isSupported.value) throw new Error("Pointer Lock API is not supported by your browser.");

        const targetElement = e instanceof Event ? unrefElement(target) ?? <Element>e.target : unrefElement(e);
        if (!targetElement) throw new Error("Target element undefined.");
        targetElement.requestPointerLock();

        return await until(element).toBe(targetElement);
    }

    async function unlock() {
        element.value && document!.exitPointerLock();

        return await until(element).toBe(null);
    }

    return {
        isSupported,
        element,
        lock,
        unlock,
    };
}

export type UsePointerLockReturn = ReturnType<typeof usePointerLock>;
