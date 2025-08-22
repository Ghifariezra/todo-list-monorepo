import Section from "@/components/shared/section";
import { Dashboard } from "@/components/common/grid/dashboard";
import { Heading } from "@/components/common/text/text";
import { motion } from "motion/react";
import { Progress } from "@/components/common/cards/progress";
import { Add } from "@/components/common/add/add";
import { useTasks } from "@/hooks/tasks/useTasks";
import { formatterDate } from "@/utilities/date/formatter-date";

export default function TasksLayout() {
	const { tasks, isLoading } = useTasks();

	return (
		<Section id="dashboard" className="!justify-start !items-start">
			<Dashboard>
				<motion.div className="flex items-center gap-2">
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="aspect-square size-8">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 1, ease: "easeInOut" }}
							style={{
								backgroundImage: `url(https://cdn3.iconfinder.com/data/icons/3d-productivity/512/task_completion.png)`,
							}}
							className="w-full h-full bg-contain bg-no-repeat bg-center"
						/>
					</motion.div>
					<Heading>Tasks</Heading>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
					{isLoading && (
						<Progress name="Loading..." priority="🌱 Optional" />
					)}
					{!isLoading && (
						<>
							{tasks?.map((task) => (
								<Progress
									key={task.id}
									nameTask={task.title}
									description={task.notes}
									date={formatterDate(
										new Date(task.schedule)
									)}
									priority={task.priority}
								/>
							))}
						</>
					)}
				</motion.div>
			</Dashboard>
			<Add />
		</Section>
	);
}
