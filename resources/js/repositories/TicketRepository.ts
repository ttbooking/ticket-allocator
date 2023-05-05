import { Repository } from ".";
import Ticket from "@/models/Ticket";
import * as Events from "@/types/events";

export default class TicketRepository extends Repository<Ticket> {
    use = Ticket;

    create = (payload: Events.Ticket.CreatedPayload) => {
        this.save({
            uuid: payload.uuid,
            category_uuid: payload.categoryUuid,
            handler_uuid: payload.operatorUuid,
            meta: payload.meta,
            created_at: new Date().toISOString(),
        });
    };

    close = ({ uuid }: Events.Ticket.ClosedPayload) => {
        this.destroy(uuid);
    };

    bind = ({ uuid, operatorUuid, meta }: Events.Ticket.BoundPayload) => {
        const ticketMeta = this.find(uuid)?.meta ?? {};
        meta = { ...ticketMeta, ...meta };
        this.where("uuid", uuid).update({ handler_uuid: operatorUuid, meta });
    };

    unbind = ({ uuid }: Events.Ticket.UnboundPayload) => {
        this.where("uuid", uuid).update({ handler_uuid: null });
    };

    changeCategory = ({ uuid, categoryUuid, meta }: Events.Ticket.CategoryChangedPayload) => {
        const ticketMeta = this.find(uuid)?.meta ?? {};
        meta = { ...ticketMeta, ...meta };
        this.where("uuid", uuid).update({ category_uuid: categoryUuid, meta });
    };

    setMetaValue = ({ uuid, key, value }: Events.Ticket.MetaValueSetPayload) => {
        const meta = this.find(uuid)?.meta ?? {};
        meta[key] = value;
        this.where("uuid", uuid).update({ meta });
    };

    mergeMetaValues = ({ uuid, meta }: Events.Ticket.MetaValuesMergedPayload) => {
        const ticketMeta = this.find(uuid)?.meta ?? {};
        meta = { ...ticketMeta, ...meta };
        this.where("uuid", uuid).update({ meta });
    };

    adjustMetrics = ({ uuid, factorUuid, adjustments }: Events.Ticket.MetricsAdjustedPayload) => {
        const metrics = this.find(uuid)?.metrics ?? {};
        metrics[factorUuid] = adjustments;
        this.where("uuid", uuid).update({
            metrics,
            initial_weight: Math.max(0, (this.find(uuid)?.initial_weight ?? 0) + adjustments.initial_weight),
            weight_increment: Math.max(0, (this.find(uuid)?.weight_increment ?? 0) + adjustments.weight_increment),
            complexity: Math.max(0, (this.find(uuid)?.complexity ?? 0) + adjustments.complexity),
            delay: Math.max(0, (this.find(uuid)?.delay ?? 0) + adjustments.delay),
        });
    };

    unbound() {
        return this.where("handler_uuid", null);
    }

    bound(handlerUuid: string) {
        return this.where("handler_uuid", handlerUuid);
    }
}
