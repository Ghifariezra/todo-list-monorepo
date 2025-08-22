import { useUserTasksQuery } from '@/hooks/query/tasks/useUserTasksQuery';
import type { Task } from '@/types/task/task';
import { useState, useEffect, useCallback } from 'react';
import { useTasksDeleteMutation } from '@/hooks/mutation/tasks/useTasksDeleteMutation';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { data, isLoading } = useUserTasksQuery();
    const { deleteTask, isLoading: isLoadingDelete } = useTasksDeleteMutation();
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleDelete = useCallback( async (id: string) => {
        setDeleteId(id);

        await deleteTask(id);
        
    }, [deleteTask]);

    useEffect(() => {
        if (data) setTasks(data.tasks as Task[]);
    }, [data]);

    return { tasks, isLoading, handleDelete, deleteId, isLoadingDelete };
}