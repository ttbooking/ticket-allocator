export interface Ticket {
    id: string;
    name: string;
    weight: number;
}

export interface Operator {
    id: string;
    name: string;
    tickets: Ticket[];
}
