import { defineStore, acceptHMRUpdate } from "pinia";
import { reactive, computed } from "vue";
import { Ticket, TicketSortBy, SortDirection } from "@/types";
import _ from "lodash";
import * as Events from "@/events";

export const useTicketsStore = defineStore("tickets", () => {
    const all = reactive<Map<string, Ticket>>(new Map());

    const unbound = computed(() => {
        return Array.from(all.values()).filter((ticket) => ticket.handler_uuid === null);
    });

    const bound = computed(() => (handlerUuid: string) => {
        return Array.from(all.values()).filter((ticket) => ticket.handler_uuid === handlerUuid);
    });

    const sorted = computed(
        () =>
            (sortBy: TicketSortBy = "weight", sortDirection: SortDirection = "asc") =>
                _.orderBy(Array.from(all.values()), sortBy, sortDirection)
    );

    function ticket(uuid: string) {
        const ticket = all.get(uuid);
        if (!ticket) throw new Error(`Ticket with UUID {${uuid}} has not been found!`);
        return ticket;
    }

    function create({ uuid, categoryUuid }: Events.Ticket.CreatedPayload) {
        all.set(uuid, new Ticket(uuid, categoryUuid));
    }

    function close({ uuid }: Events.Ticket.ClosedPayload) {
        all.delete(uuid);
    }

    function bind({ uuid, operatorUuid }: Events.Ticket.BoundPayload) {
        ticket(uuid).handler_uuid = operatorUuid;
    }

    function unbind({ uuid }: Events.Ticket.UnboundPayload) {
        ticket(uuid).handler_uuid = null;
    }

    function changeCategory({ uuid, categoryUuid }: Events.Ticket.CategoryChangedPayload) {
        ticket(uuid).category_uuid = categoryUuid;
    }

    function incrementInitialWeight({ uuid, weightPoints }: Events.Ticket.InitialWeightIncrementedPayload) {
        ticket(uuid).initial_weight += weightPoints;
    }

    function decrementInitialWeight({ uuid, weightPoints }: Events.Ticket.InitialWeightDecrementedPayload) {
        ticket(uuid).initial_weight -= weightPoints;
    }

    function incrementWeightIncrement({ uuid, weightPoints }: Events.Ticket.WeightIncrementIncrementedPayload) {
        ticket(uuid).weight_increment += weightPoints;
    }

    function decrementWeightIncrement({ uuid, weightPoints }: Events.Ticket.WeightIncrementDecrementedPayload) {
        ticket(uuid).weight_increment -= weightPoints;
    }

    function incrementComplexity({ uuid, complexityPoints }: Events.Ticket.ComplexityIncrementedPayload) {
        ticket(uuid).complexity += complexityPoints;
    }

    function decrementComplexity({ uuid, complexityPoints }: Events.Ticket.ComplexityDecrementedPayload) {
        ticket(uuid).complexity -= complexityPoints;
    }

    function incrementDelay({ uuid, delaySeconds }: Events.Ticket.DelayIncrementedPayload) {
        ticket(uuid).delay += delaySeconds;
    }

    function decrementDelay({ uuid, delaySeconds }: Events.Ticket.DelayDecrementedPayload) {
        ticket(uuid).delay -= delaySeconds;
    }

    return {
        all,
        unbound,
        bound,
        sorted,
        create,
        close,
        bind,
        unbind,
        changeCategory,
        incrementInitialWeight,
        decrementInitialWeight,
        incrementWeightIncrement,
        decrementWeightIncrement,
        incrementComplexity,
        decrementComplexity,
        incrementDelay,
        decrementDelay,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTicketsStore, import.meta.hot));
}
