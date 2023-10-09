declare module "ziggy-js" {
    interface RouteList {
        "ticket-allocator.index": [];
        "ticket-allocator.trans": [];
        "ticket-allocator.dashboard.supervisor": [];
        "ticket-allocator.operators.index": [];
        "ticket-allocator.operators.create": [];
        "ticket-allocator.operators.store": [];
        "ticket-allocator.operators.show": [
            {
                name: "operator";
                binding: "uuid";
            },
        ];
        "ticket-allocator.operators.edit": [
            {
                name: "operator";
                binding: "uuid";
            },
        ];
        "ticket-allocator.operators.update": [
            {
                name: "operator";
                binding: "uuid";
            },
        ];
        "ticket-allocator.operators.destroy": [
            {
                name: "operator";
                binding: "uuid";
            },
        ];
        "ticket-allocator.operators.discover": [];
        "ticket-allocator.operators.ready": [
            {
                name: "operator";
                binding: "uuid";
            },
        ];
        "ticket-allocator.teams.index": [];
        "ticket-allocator.teams.create": [];
        "ticket-allocator.teams.store": [];
        "ticket-allocator.teams.show": [
            {
                name: "team";
                binding: "uuid";
            },
        ];
        "ticket-allocator.teams.edit": [
            {
                name: "team";
                binding: "uuid";
            },
        ];
        "ticket-allocator.teams.update": [
            {
                name: "team";
                binding: "uuid";
            },
        ];
        "ticket-allocator.teams.destroy": [
            {
                name: "team";
                binding: "uuid";
            },
        ];
        "ticket-allocator.ticket-categories.index": [];
        "ticket-allocator.ticket-categories.create": [];
        "ticket-allocator.ticket-categories.store": [];
        "ticket-allocator.ticket-categories.show": [
            {
                name: "ticket_category";
            },
        ];
        "ticket-allocator.ticket-categories.edit": [
            {
                name: "ticket_category";
            },
        ];
        "ticket-allocator.ticket-categories.update": [
            {
                name: "ticket_category";
            },
        ];
        "ticket-allocator.ticket-categories.destroy": [
            {
                name: "ticket_category";
            },
        ];
        "ticket-allocator.factors.index": [];
        "ticket-allocator.factors.create": [];
        "ticket-allocator.factors.store": [];
        "ticket-allocator.factors.show": [
            {
                name: "factor";
                binding: "uuid";
            },
        ];
        "ticket-allocator.factors.edit": [
            {
                name: "factor";
                binding: "uuid";
            },
        ];
        "ticket-allocator.factors.update": [
            {
                name: "factor";
                binding: "uuid";
            },
        ];
        "ticket-allocator.factors.destroy": [
            {
                name: "factor";
                binding: "uuid";
            },
        ];
        "ticket-allocator.factors.raise-priority": [
            {
                name: "factor";
                binding: "uuid";
            },
        ];
        "ticket-allocator.factors.lower-priority": [
            {
                name: "factor";
                binding: "uuid";
            },
        ];
        "ticket-allocator.tickets.weight": [
            {
                name: "ticket";
                binding: "uuid";
            },
        ];
        "ticket-allocator.tickets.handler": [
            {
                name: "ticket";
                binding: "uuid";
            },
        ];
        "ticket-allocator.tickets.close": [
            {
                name: "ticket";
                binding: "uuid";
            },
        ];
    }
}

export {};
