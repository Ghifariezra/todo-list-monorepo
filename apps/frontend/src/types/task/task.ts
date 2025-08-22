export type TaskPriority = 'low' | 'normal' | 'high';
type TaskStatus = 'active' | 'deactivated';

export interface TaskAdd {
    title: string;
    schedule: string;
    priority: TaskPriority;
    description?: string | null;
}

export interface Task {
    id: string;
    user_id: number;
    schedule: string;
    priority: TaskPriority;
    notes: string;
    status: TaskStatus;
    created_at: string;
    title: string;
}
export interface TaskResponse {
    status: string;
    message: string;
    tasks: Task[];
}
export interface TaskResponsePOST {
    status: string;
    message: string;
}