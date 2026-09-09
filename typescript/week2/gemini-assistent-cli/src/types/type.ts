import type z from "zod";
import type { scheduleSchema, taskFilterSchema } from "./type-schema.js";

export enum TaskStatus {
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed"
}

export enum ToolType {
    CREATE_TASK = "create_task",
    DELETE_TASK = "delete_task",
    CHANGE_TASK_DELAYED = "change_task_delayed",
    FINISHED_TASK = "finish_task",
    FILTER_TASKS = "filter_tasks",
    QUERY_DATABASE = "query_database"
}

export type Schedule = z.infer<typeof scheduleSchema>;

export type TaskFilter = z.infer<typeof taskFilterSchema>;