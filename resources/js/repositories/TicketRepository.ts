import { Repository } from "pinia-orm";
import Ticket from "@/models/Ticket";
import * as Events from "@/events";

export default class TicketRepository extends Repository<Ticket> {
    use = Ticket;

    private ticket(uuid: string) {
        const ticket = this.find(uuid);
        if (!ticket) throw new Error(`Ticket with UUID {${uuid}} has not been found!`);
        return ticket;
    }

    create = ({ uuid, categoryUuid }: Events.Ticket.CreatedPayload) => {
        this.save({ uuid, category_uuid: categoryUuid });
    };

    close = ({ uuid }: Events.Ticket.ClosedPayload) => {
        this.destroy(uuid);
    };

    bind = ({ uuid, operatorUuid }: Events.Ticket.BoundPayload) => {
        this.where("uuid", uuid).update({ handler_uuid: operatorUuid });
    };

    unbind = ({ uuid }: Events.Ticket.UnboundPayload) => {
        this.where("uuid", uuid).update({ handler_uuid: null });
    };

    changeCategory = ({ uuid, categoryUuid }: Events.Ticket.CategoryChangedPayload) => {
        this.where("uuid", uuid).update({ category_uuid: categoryUuid });
    };

    incrementInitialWeight = ({ uuid, weightPoints }: Events.Ticket.InitialWeightIncrementedPayload) => {
        this.ticket(uuid).initial_weight += weightPoints;
    };

    decrementInitialWeight = ({ uuid, weightPoints }: Events.Ticket.InitialWeightDecrementedPayload) => {
        this.ticket(uuid).initial_weight -= weightPoints;
    };

    incrementWeightIncrement = ({ uuid, weightPoints }: Events.Ticket.WeightIncrementIncrementedPayload) => {
        this.ticket(uuid).weight_increment += weightPoints;
    };

    decrementWeightIncrement = ({ uuid, weightPoints }: Events.Ticket.WeightIncrementDecrementedPayload) => {
        this.ticket(uuid).weight_increment -= weightPoints;
    };

    incrementComplexity = ({ uuid, complexityPoints }: Events.Ticket.ComplexityIncrementedPayload) => {
        this.ticket(uuid).complexity += complexityPoints;
    };

    decrementComplexity = ({ uuid, complexityPoints }: Events.Ticket.ComplexityDecrementedPayload) => {
        this.ticket(uuid).complexity -= complexityPoints;
    };

    incrementDelay = ({ uuid, delaySeconds }: Events.Ticket.DelayIncrementedPayload) => {
        this.ticket(uuid).delay += delaySeconds;
    };

    decrementDelay = ({ uuid, delaySeconds }: Events.Ticket.DelayDecrementedPayload) => {
        this.ticket(uuid).delay -= delaySeconds;
    };

    unbound() {
        return this.where("handler_uuid", null);
    }

    bound(handlerUuid: string) {
        return this.where("handler_uuid", handlerUuid);
    }
}
