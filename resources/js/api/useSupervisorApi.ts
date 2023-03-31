import route from "ziggy-js";

export function useSupervisorApi() {
    async function ready(operatorUuid: string, ready: boolean) {
        return await window.axios.patch(route("ticket-allocator.operators.ready", operatorUuid), { ready });
    }

    async function weight(ticketUuid: string, weightPoints: number) {
        return await window.axios.patch(route("ticket-allocator.tickets.weight", ticketUuid), {
            weight_points: weightPoints,
        });
    }

    async function handler(ticketUuid: string, operatorUuid?: string | null) {
        return await window.axios.patch(route("ticket-allocator.tickets.handler", ticketUuid), {
            operator_uuid: operatorUuid ?? null,
        });
    }

    async function close(ticketUuid: string) {
        return await window.axios.delete(route("ticket-allocator.tickets.close", ticketUuid));
    }

    return { ready, weight, handler, close };
}
