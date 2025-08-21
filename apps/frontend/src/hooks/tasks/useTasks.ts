import { useUserTasksQuery } from '@/hooks/query/tasks/useUserTasks';

export const useTasks = () => {
    const { data, isLoading } = useUserTasksQuery();

    return { data, isLoading };
}