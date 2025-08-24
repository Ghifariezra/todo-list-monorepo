export type TaskPriority = 'low' | 'normal' | 'high';
export type TaskStatus = 'active' | 'deactivated';

export interface TaskTitle {
    taskId: string[];
    title: string[];
    date: Date;
    reminder: boolean;
}

export interface TaskAdd {
    title: string;
    schedule: Date | null;
    priority: TaskPriority;
    description?: string | null;
    reminder?: boolean;
}

export interface TaskUpdate extends TaskAdd {
    id: string;
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
    reminder: boolean;
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

export type CardProps = {
    children?: React.ReactNode;
    nameTask?: string;
    idCard?: string;
    name?: string;
    image?: string;
    description?: string;
    classNameDashboard?: string;
    date?: Date | null;
    priority?: string;
    onDelete?: (id: string) => void;
    isLoadingDelete?: boolean;
    editToggle?: boolean;
    handleEditToggle?: (id: string) => void;
    editId?: string | null;
    onSubmit?: (data: TaskUpdate) => void;
    errorSanitize?: string;
    reminder?: boolean;
};