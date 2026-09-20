export const filterTasksTool = {
    type: "function",
    name: "filter_tasks",
    description: `retrieve existing schedules from the database based on the user's query.
        Extract the proper filtering parameter from the user's query and answer the user.
        Only use this for giving informations the user is asking for, not for perfoming requests.`,
    parameters: {
        type: "object",
        properties: {
            id: {
                type: "integer",
                description: "Get task with this ID",
            },
            owner: {
                type: "integer",
                description: "Only get this owner's tasks",
            },
            time: {
                type: "object",
                description: "Filter tasks by time period",
                properties: {
                    type: {
                        type: "string",
                        enum: ["deadline", "created_at", "finished_at"],
                        description:
                            `search between the columns of table schedule in the database with a date type`  
                    },
                    from: {
                        type: "string",
                        description:
                            "Only include tasks with the type given, at or after this ISO 8601 datetime.",
                    },
                    to: {
                        type: "string",
                        description:
                            "Only include tasks with the type given, at or before this ISO 8601 datetime.",
                    },
                }
            },
            status: {
                type: "string",
                enum: ["in_progress","completed"],
                description: "Filter tasks by their status.",
            },
            delayed: {
                type: "boolean",
                description: "Filter tasks by whether they are delayed.",
            },
        },
        required: [],
    },
} as const;