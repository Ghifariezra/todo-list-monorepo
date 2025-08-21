import axios from 'axios';
import type { TaskResponse } from '@/types/task/task';

export const tasksRequest = () => {
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
