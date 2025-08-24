import Section from "@/components/shared/section";
import { Greeting } from "@/components/common/cards/greeting";
import { Progress } from "@/components/common/cards/progress";
import { Dashboard } from "@/components/common/grid/dashboard";
import { useTasks } from "@/hooks/tasks/useTasks";
import { DataTable } from "@/components/common/table/data-table";
import type { Task } from "@/types/task/task";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Task>();

// Definisikan kolom untuk tabel "Today's Task"
const todayTaskColumns = [
	columnHelper.accessor("title", {
		header: () => <p className="text-center">Judul</p>,
		cell: (info) => <p className="text-center">{info.getValue()}</p>,
	}),
	columnHelper.accessor("schedule", {
		header: () => <p className="text-center">Jadwal</p>,
		cell: (info) => <p className="text-center">{info.getValue()}</p>,
	}),
	columnHelper.accessor("priority", {
		header: () => <p className="text-center">Prioritas</p>,
		cell: (info) => <p className="text-center">{info.getValue()}</p>,
	}),
	columnHelper.accessor("status", {
		header: () => <p className="text-center">Status</p>,
		cell: (info) => <p className="text-center">{info.getValue()}</p>,
	}),
	columnHelper.accessor("reminder", {
		header: () => <p className="text-center">Reminder</p>,
		cell: (info) => {
			return info.getValue() ? (
				<div className="bg-green-500 text-white px-2 py-1 rounded">
					<p className="text-center">Ya</p>
				</div>
			) : (
				<div className="bg-red-500 text-white px-2 py-1 rounded">
					<p className="text-center">Tidak</p>
				</div>
			);
		},
	}),
];

export default function DashboardLayout() {
	const { todayTasks, upcomingTasks, isLoading } = useTasks();

	return (
		<Section id="dashboard" className="!justify-start !items-start">
			<Dashboard>
				<Greeting />
				<div className="flex sm:flex-row flex-col gap-4">
					<Progress
						name="Today's Task"
						classNameDashboard="items-start"
						image="https://cdn3.iconfinder.com/data/icons/3d-productivity/512/task_completion.png">
						{isLoading ? (
							<div className="animate-pulse w-full h-6 bg-gray-300 dark:bg-gray-700 rounded" />
						) : (
							<DataTable
								data={todayTasks}
								columns={todayTaskColumns}
							/>
						)}
					</Progress>
					<Progress
						name="Upcoming Tasks"
						classNameDashboard="items-start"
						image="https://cdn0.iconfinder.com/data/icons/data-information/512/Data-Informationv1_1.png">
						{isLoading ? (
							<div className="animate-pulse w-full h-6 bg-gray-300 dark:bg-gray-700 rounded" />
						) : (
							<DataTable
								data={upcomingTasks}
								columns={todayTaskColumns}
							/>
						)}
					</Progress>
				</div>
			</Dashboard>
		</Section>
	);
}
