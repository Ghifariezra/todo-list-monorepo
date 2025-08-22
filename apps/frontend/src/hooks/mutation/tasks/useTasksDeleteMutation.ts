import { useUserCsrfQuery } from "@/hooks/query/token/useUserCsrfQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksDeleteRequest } from "@/services/tasks/tasksRequest";

export const useTasksDeleteMutation = () => {
    const queryClient = useQueryClient();
    const { data: token, refetch: refetchCsrf } = useUserCsrfQuery();

    const mutation = useMutation({
        mutationFn: async (taskId: string) => tasksDeleteRequest(taskId, token, refetchCsrf),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userTasks"] });
        },
    });

    return {
        deleteTask: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};