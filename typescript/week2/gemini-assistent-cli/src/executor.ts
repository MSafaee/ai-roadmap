import { executeReadOnlyQuery } from "./db/database-readonly.js";
import { deleteSchedule, finishTask, getTasks, insertSchedule, updateAllTasks } from "./db/database.js";
import { createTaskSchema, deleteTaskSchema, finishTaskSchema, taskFilterSchema } from "./types/type-schema.js";
import { ToolType, type Schedule, type TaskFilter } from "./types/type.js";

export async function executeTool(name: string, args: unknown): Promise<any> {

    switch (name) {
        case ToolType.CREATE_TASK: {
            const parsed = createTaskSchema.parse(args);
            return insertSchedule(parsed.owner, parsed.task, parsed.attendees, new Date(parsed.deadline));
        }
        case ToolType.DELETE_TASK: {
            const parsed = deleteTaskSchema.parse(args);
            return deleteSchedule(parsed.owner, parsed.id);
        }
        case ToolType.CHANGE_TASK_DELAYED: {
            const result = await updateAllTasks();
            return `notice: ${result} missed deadlines`;
        }
        case ToolType.FINISHED_TASK: {
            const parsed = finishTaskSchema.parse(args);
            return finishTask(parsed.owner, parsed.id);
        }
        case ToolType.FILTER_TASKS: {
            const parsed = taskFilterSchema.parse(args);
            return filterTasks(parsed);
        }
        // case ToolType.QUERY_DATABASE: {
        //     const query = validateQuerySearch(args);
        //     return executeReadOnlyQuery(query);
        // }
        default: throw new Error(`Unknown tool: ${name}`);
    }
}

// async function createTask(args: unknown): Promise<Schedule> {
//     const parsed = createTaskSchema.parse(args);
//     const result = await insertSchedule(parsed.owner, parsed.task, parsed.attendees,
//         new Date(parsed.deadline));
//     return result;
// }

// async function deleteTask(args: unknown): Promise<boolean> {
//     const parsed = deleteTaskSchema.parse(args);
//     const result = await deleteSchedule(parsed.owner, parsed.id);
//     return result;
// }

// async function updateTaskDelays(): Promise<string> {
//     const result = await updateAllTasks();
//     return `notice: ${result} missed deadlines`;
// }

// async function finalizeTask(args: unknown): Promise<Schedule> {
//     const parsed = finishTaskSchema.parse(args);
//     const result = await finishTask(parsed.owner, parsed.id);
//     return result;
// }

// function validateQuerySearch(args: unknown): string {
//     const query = z.string().parse(args);
//     const statements = parse(query);
//     if (statements.length !== 1) throw new Error("Only one SQL statement is allowed.");

//     const statement = statements[0];
//     if (!statement) throw new Error("No valid query found");

//     return query;
// }

async function filterTasks(filter: TaskFilter): Promise<Schedule[]> {
    const conditions: string[] = [];
    const values: unknown[] = [];

    if (filter.id) {
        values.push(filter.id);
        conditions.push(`id = $${values.length}`);
    }
    if (filter.owner) {
        values.push(filter.owner);
        conditions.push(`owner = $${values.length}`);
    }
    if (filter.time) {
        values.push(filter.time.from);
        conditions.push(`${filter.time.type} >= $${values.length}`);
        
        values.push(filter.time.to);
        conditions.push(`${filter.time.type} <= $${values.length}`);
    }
    if (filter.status) {
        values.push(filter.status);
        conditions.push(`status = $${values.length}`);
    }
    if (filter.delayed !== undefined) {
        values.push(filter.delayed);
        conditions.push(`delayed = $${values.length}`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    return getTasks(where, values);
}

