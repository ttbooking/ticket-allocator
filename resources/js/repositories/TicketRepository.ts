import { Repository } from ".";
import Ticket from "@/models/Ticket";
import * as Events from "@/events";

export default class TicketRepository extends Repository<Ticket> {
    use = Ticket;

    create = ({ uuid, categoryUuid }: Events.Ticket.CreatedPayload) => {
        this.save({ uuid, category_uuid: categoryUuid, created_at: new Date().toISOString() });
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
        this.query().where("uuid", uuid).increment({ initial_weight: weightPoints });
    };

    decrementInitialWeight = ({ uuid, weightPoints }: Events.Ticket.InitialWeightDecrementedPayload) => {
        this.query().where("uuid", uuid).decrement({ initial_weight: weightPoints });
    };

    incrementWeightIncrement = ({ uuid, weightPoints }: Events.Ticket.WeightIncrementIncrementedPayload) => {
        this.query().where("uuid", uuid).increment({ weight_increment: weightPoints });
    };

    decrementWeightIncrement = ({ uuid, weightPoints }: Events.Ticket.WeightIncrementDecrementedPayload) => {
        this.query().where("uuid", uuid).decrement({ weight_increment: weightPoints });
    };

    incrementComplexity = ({ uuid, complexityPoints }: Events.Ticket.ComplexityIncrementedPayload) => {
        this.query().where("uuid", uuid).increment({ complexity: complexityPoints });
    };

    decrementComplexity = ({ uuid, complexityPoints }: Events.Ticket.ComplexityDecrementedPayload) => {
        this.query().where("uuid", uuid).decrement({ complexity: complexityPoints });
    };

    incrementDelay = ({ uuid, delaySeconds }: Events.Ticket.DelayIncrementedPayload) => {
        this.query().where("uuid", uuid).increment({ delay: delaySeconds });
    };

    decrementDelay = ({ uuid, delaySeconds }: Events.Ticket.DelayDecrementedPayload) => {
        this.query().where("uuid", uuid).decrement({ delay: delaySeconds });
    };

    unbound() {
        return this.where("handler_uuid", null);
    }

    bound(handlerUuid: string) {
        return this.where("handler_uuid", handlerUuid);
    }
}
