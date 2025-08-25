import Section from "@/components/shared/section";
import { Greeting } from "@/components/common/cards/greeting";
import { Progress } from "@/components/common/cards/progress";
import { Dashboard } from "@/components/common/grid/dashboard";
import { useTasks } from "@/hooks/tasks/useTasks";
import { DataTable } from "@/components/common/table/data-table";
import { todayTaskColumns, upcomingTaskColumns } from "@/components/common/table/columns";

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
								columns={upcomingTaskColumns}
							/>
						)}
					</Progress>
				</div>
			</Dashboard>
		</Section>
	);
}
