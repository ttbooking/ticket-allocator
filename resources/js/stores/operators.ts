import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, computed, Ref, ComputedRef } from "vue";
import { Operator, SortDirection } from "@/types";
import _ from "lodash";

interface SS {
    all: Ref<Operator[]>;
    sorted: ComputedRef<(order?: SortDirection) => Operator[]>;
    enroll(operator: Operator): void;
}

export const useOperatorsStore = defineStore<"operators", SS>("operators", () => {
    const all = ref<Operator[]>([]);

    const sorted = computed(
        () =>
            (order: SortDirection = "asc"): Operator[] =>
                _.orderBy(all.value, "free_slots", order)
    );

    function enroll(operator: Operator): void {
        all.value.push(operator);
    }

    return { all, sorted, enroll };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useOperatorsStore, import.meta.hot));
}
