type TaskPriority = 'low' | 'normal' | 'high';
type TaskStatus = 'active' | 'deactivated';

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