import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useTicketsStore = defineStore("tickets", () => {
    const count = ref(0);

    return { count };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTicketsStore, import.meta.hot));
}
