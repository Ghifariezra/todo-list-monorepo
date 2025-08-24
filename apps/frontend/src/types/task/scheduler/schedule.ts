import type { TaskTitle } from "@/types/task/task";

export interface ReminderEmailProps {
    name: string;
    taskTitle: TaskTitle;
}

export interface EmailPayload {
    taskId: Array<string>;
    content: string;
    reminder: boolean
}