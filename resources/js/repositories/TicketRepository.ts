import { Repository } from "pinia-orm";
import Ticket from "@/models/Ticket";

export default class TicketRepository extends Repository {
    use = Ticket;
}
