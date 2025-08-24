import { useUserCsrfQuery } from "@/hooks/query/token/useUserCsrfQuery";
import { useMutation } from "@tanstack/react-query";
import { taskSchedulePostRequest } from "@/services/tasks/tasksRequest";
import type { EmailPayload } from "@/types/task/scheduler/schedule";

export const useTaskSchedulePostMutation = () => {
    const { data: token, refetch: refetchCsrf } = useUserCsrfQuery();

    const mutation = useMutation({
        mutationFn: async (payload: EmailPayload) => taskSchedulePostRequest(payload, token, refetchCsrf)
    });

    return {
        scheduleTask: mutation.mutateAsync,
    };
};