import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'

export const useOperatorsStore = defineStore('operators', () => {
    const all = ref([])

    const sorted = computed(() => (order = 'asc') => _.orderBy(all.value, 'free_slots', order))

    function enroll(operator) {
        this.all.push(operator)
    }

    return { all, sorted, enroll }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useOperatorsStore, import.meta.hot))
}
