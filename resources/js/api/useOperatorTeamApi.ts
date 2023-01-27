import route from "ziggy-js";

export function useOperatorTeamApi() {
    async function destroy(teamUuid: string) {
        return await window.axios.delete(route("ticket-allocator.teams.destroy", teamUuid));
    }

    return { destroy };
}
