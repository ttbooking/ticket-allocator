import { ref } from "vue";
import { until } from "@vueuse/shared";
import { useEventListener, useSupported, unrefElement } from "@vueuse/core";
import type { MaybeElementRef } from "@vueuse/core";
import type { ConfigurableDocument } from "@vueuse/core";
import { defaultDocument } from "@vueuse/core";

type MaybeHTMLElement = HTMLElement | undefined | null;

/**
 * Reactive pointer lock.
 */
export function usePointerLock(target?: MaybeElementRef<MaybeHTMLElement>, options: ConfigurableDocument = {}) {
    const { document = defaultDocument } = options;

    const isSupported = useSupported(() => document && "pointerLockElement" in document);

    const element = ref<MaybeHTMLElement>();

    const triggerElement = ref<MaybeHTMLElement>();

    let targetElement: MaybeHTMLElement;

    if (isSupported.value) {
        useEventListener(document, "pointerlockchange", () => {
            const currentElement = document!.pointerLockElement ?? element.value;
            if (targetElement && currentElement === targetElement) {
                element.value = document!.pointerLockElement as MaybeHTMLElement;
                if (!element.value) targetElement = triggerElement.value = null;
            }
        });

        useEventListener(document, "pointerlockerror", () => {
            const currentElement = document!.pointerLockElement ?? element.value;
            if (targetElement && currentElement === targetElement) {
                const action = document!.pointerLockElement ? "release" : "acquire";
                throw new Error(`Failed to ${action} pointer lock.`);
            }
        });
    }

    async function lock(e: MaybeElementRef<MaybeHTMLElement> | Event) {
        if (!isSupported.value) throw new Error("Pointer Lock API is not supported by your browser.");

        triggerElement.value = e instanceof Event ? <HTMLElement>e.currentTarget : null;
        targetElement = e instanceof Event ? unrefElement(target) ?? triggerElement.value : unrefElement(e);
        if (!targetElement) throw new Error("Target element undefined.");
        targetElement.requestPointerLock();

        return await until(element).toBe(targetElement);
    }

    async function unlock() {
        if (!element.value) return false;

        document!.exitPointerLock();

        await until(element).toBeNull();
        return true;
    }

    return {
        isSupported,
        element,
        triggerElement,
        lock,
        unlock,
    };
}

export type UsePointerLockReturn = ReturnType<typeof usePointerLock>;
