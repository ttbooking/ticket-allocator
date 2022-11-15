import { defineStore, acceptHMRUpdate } from "pinia";
import { reactive, computed } from "vue";
import { Operator, SortDirection } from "@/types";
import _ from "lodash";
import * as Events from "@/events";

export const useOperatorsStore = defineStore("operators", () => {
    const all = reactive<Map<string, Operator>>(new Map());

    const sorted = computed(
        () =>
            (order: SortDirection = "asc") =>
                _.orderBy(Array.from(all.values()), "free_slots", order)
    );

    function operator(uuid: string) {
        const operator = all.get(uuid);
        if (!operator) throw new Error(`Operator with UUID {${uuid}} has not been found!`);
        return operator;
    }

    function enroll({ uuid }: Events.Operator.EnrolledPayload) {
        all.set(uuid, {
            uuid,
            name: "",
            online: false,
            ready: false,
            tickets: [],
            ticket_limit: null,
            complexity_limit: null,
            free_slots: null,
            free_complexity: null,
        });
    }

    function resign({ uuid }: Events.Operator.ResignedPayload) {
        all.delete(uuid);
    }

    function changeName({ uuid, name }: Events.Operator.NameChangedPayload) {
        operator(uuid).name = name;
    }

    function setOnline({ uuid }: Events.Operator.OnlinePayload) {
        operator(uuid).online = true;
    }

    function setOffline({ uuid }: Events.Operator.OfflinePayload) {
        operator(uuid).online = false;
    }

    function setReady({ uuid }: Events.Operator.ReadyPayload) {
        operator(uuid).ready = true;
    }

    function setNotReady({ uuid }: Events.Operator.NotReadyPayload) {
        operator(uuid).ready = false;
    }

    function adjustTicketLimit({ uuid, ticketLimit }: Events.Operator.TicketLimitAdjustedPayload) {
        operator(uuid).ticket_limit = ticketLimit;
    }

    function adjustComplexityLimit({ uuid, complexityLimit }: Events.Operator.ComplexityLimitAdjustedPayload) {
        operator(uuid).complexity_limit = complexityLimit;
    }

    return {
        all,
        sorted,
        enroll,
        resign,
        changeName,
        setOnline,
        setOffline,
        setReady,
        setNotReady,
        adjustTicketLimit,
        adjustComplexityLimit,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useOperatorsStore, import.meta.hot));
}
