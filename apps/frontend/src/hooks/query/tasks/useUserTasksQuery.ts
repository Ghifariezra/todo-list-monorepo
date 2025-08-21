import { useQuery } from "@tanstack/react-query";
import { tasksRequest } from "@/services/tasks/tasksRequest";

export const useUserTasksQuery = () => {
    const { fetchTasks } = tasksRequest();
    return useQuery({
        queryKey: ["userTasks"],
        queryFn: async () => await fetchTasks(),
        refetchOnWindowFocus: false,
    });
};
