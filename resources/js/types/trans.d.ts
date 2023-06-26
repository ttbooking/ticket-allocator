export interface Ticket {
    id: string;
    name: string;
}

export interface Operator {
    id: string;
    name: string;
    tickets: Ticket[];
}
