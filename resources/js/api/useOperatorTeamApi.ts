import route from "ziggy-js";
import { StoreOperatorTeamRequest, UpdateOperatorTeamRequest } from "@/requests";

export function useOperatorTeamApi() {
    async function store(data: StoreOperatorTeamRequest) {
        return await window.axios.post(route("ticket-allocator.teams.store"), data);
    }

    async function update(teamUuid: string, data: UpdateOperatorTeamRequest) {
        return await window.axios.put(route("ticket-allocator.teams.update", teamUuid), data);
    }

    async function destroy(teamUuid: string) {
        return await window.axios.delete(route("ticket-allocator.teams.destroy", teamUuid));
    }

    return { store, update, destroy };
}
