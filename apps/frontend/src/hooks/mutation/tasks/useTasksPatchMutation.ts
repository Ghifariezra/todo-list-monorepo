import { useUserCsrfQuery } from "@/hooks/query/token/useUserCsrfQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksPatchRequest } from "@/services/tasks/tasksRequest";
import type { TaskUpdate } from "@/types/task/task";

export const useTasksPatchMutation = () => {
    const queryClient = useQueryClient();
    const { data: token, refetch: refetchCsrf } = useUserCsrfQuery();

    const mutation = useMutation({
        mutationFn: async (payload: TaskUpdate) => tasksPatchRequest(payload, token, refetchCsrf),
        onSuccess: () => {
            // invalidate query 'userTasks' agar otomatis refetch
            queryClient.invalidateQueries({ queryKey: ["userTasks"] });
        },
    });

    return {
        updateTask: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};