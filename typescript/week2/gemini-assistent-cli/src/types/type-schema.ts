import z from "zod";
import { TaskStatus } from "./type.js";

export const scheduleSchema = z.object({
    id: z.number(),
    owner: z.number(),
    task: z.string().min(1),
    attendees: z.array(z.number()),
    deadline: z.date(),
    created_at: z.date(),
    status: z.string(),
    finished_at: z.date().nullable,
    delayed: z.boolean()
});

export const arrayScheduleSchema = z.array(scheduleSchema);

export const createTaskSchema = z.object({
    owner: z.number().int().positive(),
    task: z.string().min(1),
    attendees: z.array(z.number().int().positive()),
    deadline: z.iso.datetime()
});

export const deleteTaskSchema = z.object({
    owner: z.number().int().positive(),
    id: z.number().int().positive()
});

export const changeTaskStatusSchema = z.object({
    owner: z.number().int().positive(),
    id: z.number().int().positive(),
    status: z.enum(TaskStatus)
});

export const finishTaskSchema = z.object({
    owner: z.number().int().positive(),
    id: z.number().int().positive()
});

export const showAllTasksSchema = z.object({
    owner: z.number().int().positive()
});

export const queryDatabaseSchema = z.string().nonempty().startsWith("SELECT");

const filterTimeShema = z.object({
    type: z.enum(["deadline","created_at","finished_at"]),
    from: z.iso.datetime().transform(value => new Date(value)),
    to: z.iso.datetime().transform(value => new Date(value))
});

export const taskFilterSchema = z.object({
    id: z.number().optional(),
    owner: z.number().optional(),
    attendees: z.array(z.number()).optional(),
    time: filterTimeShema.optional(),
    status: z.enum(TaskStatus).optional(),
    delayed: z.boolean().optional(),
});