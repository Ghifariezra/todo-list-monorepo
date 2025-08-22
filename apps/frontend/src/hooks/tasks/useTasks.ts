import { useUserTasksQuery } from '@/hooks/query/tasks/useUserTasksQuery';
import type { Task } from '@/types/task/task';
import { useState, useEffect } from 'react';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { data, isLoading } = useUserTasksQuery();

    useEffect(() => {
        if (data) setTasks(data.tasks as Task[]);
    }, [data]);

    return { tasks, isLoading };
}