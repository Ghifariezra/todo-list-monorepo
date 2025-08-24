import { useUserTasksQuery } from '@/hooks/query/tasks/useUserTasksQuery';
import type { Task } from '@/types/task/task';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTasksDeleteMutation } from '@/hooks/mutation/tasks/useTasksDeleteMutation';
import type { TaskUpdate } from "@/types/task/task";
import { useTasksPatchMutation } from '@/hooks/mutation/tasks/useTasksPatchMutation';
import xss from 'xss';
import { normalizeDate } from '@/utilities/date/formatter-date';
import type { TaskTitle } from '@/types/task/task';
import { useAuth } from "@/hooks/auth/useAuth";
import Email from "@/components/common/email/email";
import { render } from "@react-email/render";
import { useTaskSchedulePostMutation } from '@/hooks/mutation/tasks/useTaskSchedulePostMutation';
import type { EmailPayload } from '@/types/task/scheduler/schedule';

export const useTasks = () => {
    const { user } = useAuth();
    const { scheduleTask } = useTaskSchedulePostMutation();
    const [tasks, setTasks] = useState<Task[]>([]);
    const { data, isLoading } = useUserTasksQuery();
    const { deleteTask, isLoading: isLoadingDelete } = useTasksDeleteMutation();
    const [taskTitle, setTaskTitle] = useState<TaskTitle>({
        taskId: [],
        title: [],
        date: new Date(),
        reminder: false
    });
    const [selected, setSelected] = useState("default");
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editId, setEditId] = useState<string | null>(null);
    const [editToggle, setEditToggle] = useState(false);
    const { updateTask, isLoading: isLoadingUpdate } = useTasksPatchMutation();
    const [errorSanitize, setErrorSanitize] = useState("");

    const todayTasks = useMemo(
        () =>
            tasks.filter((task) => {
                const tasks = task.schedule === normalizeDate(new Date()).toDateString();
                return tasks;
            }),
        [tasks]
    );

    const upcomingTasks = useMemo(() => {
        const upcomingTasks = tasks.filter((task) => {
            const tasks = task.schedule !== normalizeDate(new Date()).toDateString();
            return tasks;
        }).sort((a, b) => {
            const dateA = new Date(a.schedule);
            const dateB = new Date(b.schedule);
            return dateA.getTime() - dateB.getTime();
        });
        return upcomingTasks;
    }, [tasks]);

    const filteredTasks = useMemo(() => {
        if (selected === "" || selected === "default") return tasks;
        return tasks.filter((task) => task.priority === selected);
    }, [tasks, selected]);

    const handleEditToggle = useCallback((id: string) => {
        setEditToggle((prev) => !prev);
        setEditId(id);
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        setDeleteId(id);
        await deleteTask(id);
    }, [deleteTask]);

    useEffect(() => {
        if (data) setTasks(data.tasks as Task[]);
    }, [data]);

    useEffect(() => {
        if (upcomingTasks.length > 0) {
            const taskReminder = upcomingTasks.filter((t) => t.reminder);
            setTaskTitle({
                taskId: taskReminder.map((t) => t.id),
                title: taskReminder.map((t) => t.title),
                date: normalizeDate(new Date(taskReminder[0].schedule)),
                reminder: taskReminder[0].reminder
            });
        }
    }, [upcomingTasks]);

    useEffect(() => {
        const sendEmail = async () => {
            if (taskTitle.title.length > 0 && user?.name) {
                const html = await render(
                    Email({ name: user.name, taskTitle })
                );

                const emailPayload: EmailPayload = { 
                    taskId: taskTitle.taskId, 
                    content: html,
                    reminder: taskTitle.reminder 
                };

                await scheduleTask(emailPayload);
            }
        };
        sendEmail();
    }, [taskTitle, user, scheduleTask]);

    const onSubmit = useCallback(async (data: TaskUpdate) => {
        const sanitize = {
            id: data.id,
            title: xss(data.title.trim()),
            schedule: data.schedule ? normalizeDate(new Date(data.schedule)) : null,
            priority: data.priority as TaskUpdate['priority'],
            description: data.description ? xss(data.description.trim()) : null,
            reminder: data.reminder as TaskUpdate['reminder']
        };

        if (
            data.title !== xss(data.title.trim()) ||
            data.priority !== sanitize.priority ||
            (data.description && data.description !== sanitize.description)
        ) {
            setErrorSanitize('Cek kembali input anda.');
            return;
        }

        try {
            await updateTask(sanitize);
            setEditToggle(false);
            setEditId(null);
        } catch (error) {
            setErrorSanitize('Gagal memperbarui tugas.');
            console.error(error);
        }

    }, [updateTask, setEditToggle, setEditId]);

    useEffect(() => {
        if (errorSanitize) setTimeout(() => setErrorSanitize(""), 3000);
    }, [errorSanitize]);

    return { tasks, isLoading, handleDelete, deleteId, isLoadingDelete, editToggle, handleEditToggle, editId, onSubmit, isLoadingUpdate, errorSanitize, todayTasks, upcomingTasks, filteredTasks, selected, setSelected, taskTitle, setTaskTitle };
}