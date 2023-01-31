import route from "ziggy-js";

export function useUserListApi() {
    async function list() {
        return await window.axios.get(route("ticket-allocator.users"));
    }

    return { list };
}
