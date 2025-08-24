import { useQuery } from "@tanstack/react-query";
import { tasksGetRequest } from "@/services/tasks/tasksRequest";

export const useUserTasksQuery = () => {
    const { fetchTasks } = tasksGetRequest();
    return useQuery({
        queryKey: ["userTasks"],
        queryFn: async () => await fetchTasks(),
        refetchOnWindowFocus: true,
    });
};
