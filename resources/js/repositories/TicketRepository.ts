import { Repository } from "pinia-orm";
import Ticket from "@/models/Ticket";
import * as Events from "@/events";

export default class TicketRepository extends Repository<Ticket> {
    use = Ticket;

    create({ uuid, categoryUuid }: Events.Ticket.CreatedPayload) {
        this.save({ uuid, categoryUuid });
    }

    close({ uuid }: Events.Ticket.ClosedPayload) {
        this.destroy(uuid);
    }

    bind({ uuid, operatorUuid }: Events.Ticket.BoundPayload) {
        this.where("uuid", uuid).update({ handlerUuid: operatorUuid });
    }

    unbind({ uuid }: Events.Ticket.UnboundPayload) {
        this.where("uuid", uuid).update({ handlerUuid: null });
    }

    changeCategory({ uuid, categoryUuid }: Events.Ticket.CategoryChangedPayload) {
        this.where("uuid", uuid).update({ categoryUuid });
    }

    incrementInitialWeight({ uuid, weightPoints }: Events.Ticket.InitialWeightIncrementedPayload) {
        this.find(uuid)!.initialWeight += weightPoints;
    }

    decrementInitialWeight({ uuid, weightPoints }: Events.Ticket.InitialWeightDecrementedPayload) {
        this.find(uuid)!.initialWeight -= weightPoints;
    }

    incrementWeightIncrement({ uuid, weightPoints }: Events.Ticket.WeightIncrementIncrementedPayload) {
        this.find(uuid)!.weightIncrement += weightPoints;
    }

    decrementWeightIncrement({ uuid, weightPoints }: Events.Ticket.WeightIncrementDecrementedPayload) {
        this.find(uuid)!.weightIncrement -= weightPoints;
    }

    incrementComplexity({ uuid, complexityPoints }: Events.Ticket.ComplexityIncrementedPayload) {
        this.find(uuid)!.complexity += complexityPoints;
    }

    decrementComplexity({ uuid, complexityPoints }: Events.Ticket.ComplexityDecrementedPayload) {
        this.find(uuid)!.complexity -= complexityPoints;
    }

    incrementDelay({ uuid, delaySeconds }: Events.Ticket.DelayIncrementedPayload) {
        this.find(uuid)!.delay += delaySeconds;
    }

    decrementDelay({ uuid, delaySeconds }: Events.Ticket.DelayDecrementedPayload) {
        this.find(uuid)!.delay -= delaySeconds;
    }

    unbound() {
        return this.where("handlerUuid", null);
    }

    bound(handlerUuid: string) {
        return this.where("handlerUuid", handlerUuid);
    }
}
