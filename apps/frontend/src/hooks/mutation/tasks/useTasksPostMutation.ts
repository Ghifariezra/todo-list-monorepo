import { useUserCsrfQuery } from "@/hooks/query/token/useUserCsrfQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksPostRequest } from "@/services/tasks/tasksRequest";
import type { TaskAdd } from "@/types/task/task";

export const useTasksPostMutation = () => {
    const queryClient = useQueryClient();
    const { data: token, refetch: refetchCsrf } = useUserCsrfQuery();

    const mutation = useMutation({
        mutationFn: (payload: TaskAdd) => tasksPostRequest(payload, token, refetchCsrf),
        onSuccess: () => {
            // invalidate query 'userTasks' agar otomatis refetch
            queryClient.invalidateQueries({ queryKey: ["userTasks"] });
        },
    });

    return {
        createTask: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};