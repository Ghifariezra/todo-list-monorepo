import { useUserTasksQuery } from '@/hooks/query/tasks/useUserTasksQuery';
import type { Task } from '@/types/task/task';
import { useState, useEffect, useCallback } from 'react';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { data, isLoading } = useUserTasksQuery();
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = useCallback((id: number) => {
        setDeleteId(id);
    }, []);

    useEffect(() => {
        if (data) setTasks(data.tasks as Task[]);
    }, [data]);

    return { tasks, isLoading, handleDelete, deleteId };
}