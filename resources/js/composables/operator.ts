import { ref } from "vue";

export function useOperator() {
    const uuid = ref<string>();

    return { uuid };
}
