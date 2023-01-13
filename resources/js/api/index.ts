import route from "ziggy-js";

export function useSupervisorApi() {
    async function ready(operatorUuid: string, ready: boolean) {
        return await window.axios.patch(route("ticket-allocator.api.ready", operatorUuid), ready);
    }

    async function weight(ticketUuid: string, weightPoints: number) {
        return await window.axios.patch(route("ticket-allocator.api.weight", ticketUuid), weightPoints);
    }

    async function handler(ticketUuid: string, operatorUuid?: string) {
        return await window.axios.patch(route("ticket-allocator.api.handler", ticketUuid), operatorUuid);
    }

    async function close(ticketUuid: string) {
        return await window.axios.delete(route("ticket-allocator.api.close", ticketUuid));
    }

    return { ready, weight, handler, close };
}
