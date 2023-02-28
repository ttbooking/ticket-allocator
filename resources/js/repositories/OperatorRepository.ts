import { Repository } from "pinia-orm";
import Operator from "@/models/Operator";
import * as Events from "@/events";

export default class OperatorRepository extends Repository<Operator> {
    use = Operator;

    enroll = ({ uuid, userId }: Events.Operator.EnrolledPayload) => {
        this.save({ uuid, user_id: userId });
    };

    resign = ({ uuid }: Events.Operator.ResignedPayload) => {
        this.destroy(uuid);
    };

    changeName = ({ uuid, name }: Events.Operator.NameChangedPayload) => {
        this.where("uuid", uuid).update({ name });
    };

    setOnline = ({ uuid }: Events.Operator.OnlinePayload) => {
        this.where("uuid", uuid).update({ online: true });
    };

    setOffline = ({ uuid }: Events.Operator.OfflinePayload) => {
        this.where("uuid", uuid).update({ online: false });
    };

    setReady = ({ uuid }: Events.Operator.ReadyPayload) => {
        this.where("uuid", uuid).update({ ready: true });
    };

    setNotReady = ({ uuid }: Events.Operator.NotReadyPayload) => {
        this.where("uuid", uuid).update({ ready: false });
    };

    adjustTicketLimit = ({ uuid, ticketLimit }: Events.Operator.TicketLimitAdjustedPayload) => {
        this.where("uuid", uuid).update({ ticket_limit: ticketLimit });
    };

    adjustComplexityLimit = ({ uuid, complexityLimit }: Events.Operator.ComplexityLimitAdjustedPayload) => {
        this.where("uuid", uuid).update({ complexity_limit: complexityLimit });
    };
}
