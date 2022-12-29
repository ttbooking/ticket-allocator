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

    let pendingElement: HTMLElement;

    if (isSupported.value) {
        useEventListener(document, "pointerlockchange", () => {
            const currentElement = document!.pointerLockElement ?? element.value;
            if (pendingElement && currentElement === pendingElement) {
                console.log(document!.pointerLockElement ? "locked" : "unlocked");
                element.value = document!.pointerLockElement as MaybeHTMLElement;
            }
        });

        useEventListener(document, "pointerlockerror", () => {
            console.log("error");
            const action = document!.pointerLockElement ? "release" : "acquire";
            throw new Error(`Failed to ${action} pointer lock.`);
        });
    }

    async function lock(e: MaybeElementRef<MaybeHTMLElement> | Event) {
        if (!isSupported.value) throw new Error("Pointer Lock API is not supported by your browser.");

        const targetElement = e instanceof Event ? unrefElement(target) ?? <HTMLElement>e.target : unrefElement(e);
        if (!targetElement) throw new Error("Target element undefined.");
        targetElement.requestPointerLock();
        pendingElement = targetElement;

        return await until(element).toBe(targetElement);
    }

    async function unlock() {
        if (element.value) {
            document!.exitPointerLock();
            pendingElement = element.value;
        }

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
