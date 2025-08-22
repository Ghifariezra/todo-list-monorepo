import axios from 'axios';
import type { TaskResponse, TaskAdd, TaskResponsePOST } from '@/types/task/task';

export const tasksGetRequest = () => {
    const fetchTasks = async (): Promise<TaskResponse | null> => {
        try {
            const { data } = await axios.get<TaskResponse>('/api/auth/user/tasks', {
                withCredentials: true,
            });
            
            return data;
        } catch {
            return null;
        }
    };

    return { fetchTasks };
};

export const tasksPostRequest = async (payload: TaskAdd, token?: string, refetchCsrf?: () => Promise<{ data?: string }>): Promise<TaskResponsePOST | null> => {
    try {
        let csrfToken = token;

        if (!csrfToken && refetchCsrf) {
            const refetchResult = await refetchCsrf();
            csrfToken = refetchResult.data;
        }

        if (!csrfToken) throw new Error("CSRF token tidak tersedia");

        const { data } = await axios.post<TaskResponsePOST>('/api/auth/user/tasks/add', payload, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
        });
        
        return data;
    } catch {
        return null;
    }
};

export const tasksDeleteRequest = async (taskId: string, token?: string, refetchCsrf?: () => Promise<{ data?: string }>): Promise<TaskResponsePOST | null> => {
    try {
        let csrfToken = token;

        if (!csrfToken && refetchCsrf) {
            const refetchResult = await refetchCsrf();
            csrfToken = refetchResult.data;
        }

        if (!csrfToken) throw new Error("CSRF token tidak tersedia");

        const { data } = await axios.delete<TaskResponsePOST>(`/api/auth/user/tasks/${taskId}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
        });
        
        return data;
    } catch {
        return null;
    }
}