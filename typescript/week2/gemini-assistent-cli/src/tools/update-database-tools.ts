export const createTaskTool = {
    type: "function",
    name: "create_task",
    description:
        `Create a new schedule in the database with user's id, task description, attendee ids, and a deadline.
        Use this when the user asks to create, schedule, add, or plan a new task.`,
    parameters: {
        type: "object",
        properties: {
            owner: {
                type: "integer",
                description: "ID of the user creating this schedule."
            },
            task: {
                type: "string",
                description: "Description of the task."
            },
            attendees: {
                type: "array",
                items: {
                    type: "integer"
                },
                description:
                    "ID of people attending or involved in the task. If no attendee mentioned provide empty array"
            },
            deadline: {
                type: "string",
                description: "Deadline in ISO 8601 format with timezone."
            }
        },
        required: ["owner", "task", "attendees", "deadline"]
    }
} as const;

export const deleteTaskTool = {
    type: "function",
    name: "delete_task",
    description: "Delete a task from the schedule by its ID.",
    parameters: {
        type: "object",
        properties: {
            owner: {
                type: "integer",
                description: "ID of the user deleting this schedule."
            },
            id: {
                type: "integer",
                description: "ID of the task to delete."
            }
        },
        required: ["owner", "id"]
    }
} as const;

export const changeTaskStatusTool = {
    type: "function",
    name: "change_task_status",
    description: "Change the status of a task by its ID.",
    parameters: {
        type: "object",
        properties: {
            owner: {
                type: "integer",
                description: "ID of the user changing this schedule's status."
            },
            id: {
                type: "integer",
                description: "ID of the task."
            },
            status: {
                type: "string",
                enum: ["in_progress", "completed"],
                description: "New task status."
            }
        },
        required: ["owner", "id", "status"]
    }
} as const;

export const finishTaskTool = {
    type: "function",
    name: "finish_task",
    description: "Mark a task as completed and record the current time as finishedAt.",
    parameters: {
        type: "object",
        properties: {
            owner: {
                type: "integer",
                description: "ID of the user finishing this schedule."
            },
            id: {
                type: "integer",
                description: "ID of the task to finish."
            }
        },
        required: ["owner", "id"]
    }
} as const;

export const updateAllTasksTool = {
    type: "function",
    name: "update_tasks",
    description: "Update delayed attribute of all tasks",
    parameters: {
        type: "object",
        properties: {},
    }
} as const;