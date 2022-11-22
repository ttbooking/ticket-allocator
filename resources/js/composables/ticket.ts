import { computed, ref } from "vue";
import { useTimestamp } from "@vueuse/core";

export function useTicket() {
    const uuid = ref<string>();

    const categoryUuid = ref<string>();

    const handlerUuid = ref<string | null>(null);

    const initialWeight = ref(0);

    const weightIncrement = ref(0);

    const complexity = ref(0);

    const delay = ref(0);

    const createdAt = ref<Date>(new Date());

    const duration = computed(() => {
        return Math.round((useTimestamp({ interval: 1000 }).value - createdAt.value.getTime()) / 1000);
    });

    const weight = computed(() => {
        return initialWeight.value + weightIncrement.value * duration.value;
    });

    return {
        uuid,
        categoryUuid,
        handlerUuid,
        initialWeight,
        weightIncrement,
        complexity,
        delay,
        createdAt,
        duration,
        weight,
    };
}
