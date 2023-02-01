export interface StoreOperatorTeamRequest {
    name: string;
    description: string;
    operators: string[];
    ticket_categories: string[];
}

export interface UpdateOperatorTeamRequest {
    name: string;
    description: string;
    operators: string[];
    ticket_categories: string[];
}
