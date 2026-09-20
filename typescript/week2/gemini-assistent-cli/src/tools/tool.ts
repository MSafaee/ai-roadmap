import { filterTasksTool } from "./query-database-tools.js";
import { createTaskTool, deleteTaskTool, finishTaskTool, updateAllTasksTool } from "./update-database-tools.js";

export const tools = [
    createTaskTool,
    deleteTaskTool,
    finishTaskTool,
    updateAllTasksTool,
    filterTasksTool
];