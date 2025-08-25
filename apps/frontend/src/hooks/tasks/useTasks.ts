import { useUserTasksQuery } from '@/hooks/query/tasks/useUserTasksQuery';
import type { Task } from '@/types/task/task';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTasksDeleteMutation } from '@/hooks/mutation/tasks/useTasksDeleteMutation';
import type { TaskUpdate } from "@/types/task/task";
import { useTasksPatchMutation } from '@/hooks/mutation/tasks/useTasksPatchMutation';
import xss from 'xss';
import { normalizeDate } from '@/utilities/date/formatter-date';
import type { TaskTitle } from '@/types/task/task';

export const useTasks = () => {
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

    const todayTasks = useMemo(() => {
        const today = normalizeDate(new Date()).toDateString();
        return tasks.filter(
            (task) => normalizeDate(new Date(task.schedule)).toDateString() === today && task.reminder === false
        );
    }, [tasks]);

    const upcomingTasks = useMemo(() => {
        const upcomingTasks = tasks.filter((task) => {
            const today = normalizeDate(new Date()).toDateString();
            const schedule = normalizeDate(new Date(task.schedule)).toDateString();
            
            const tasks = schedule > today;
            return tasks;
        }).sort((a, b) => {
            const dateA = new Date(a.schedule);
            const dateB = new Date(b.schedule);
            return dateA.getTime() - dateB.getTime();
        });
        return upcomingTasks;
    }, [tasks]);

    const currentlyTaks = useMemo(() => {
        return upcomingTasks.filter((task) => task.status !== "deactivated");
    }, [upcomingTasks]);

    const filteredTasks = useMemo(() => {
        if (selected === "default") return currentlyTaks;
        return currentlyTaks.filter((task) => task.priority === selected && task.status !== "deactivated");
    }, [currentlyTaks, selected]);

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

    return { tasks, isLoading, handleDelete, deleteId, isLoadingDelete, editToggle, handleEditToggle, editId, onSubmit, isLoadingUpdate, errorSanitize, todayTasks, upcomingTasks, filteredTasks, selected, setSelected, taskTitle, setTaskTitle, currentlyTaks };
}