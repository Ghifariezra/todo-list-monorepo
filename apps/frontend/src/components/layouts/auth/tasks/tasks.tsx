import Section from "@/components/shared/section";
import { Dashboard } from "@/components/common/grid/dashboard";
import { Heading } from "@/components/common/text/text";
import { motion, AnimatePresence } from "motion/react";
import { Progress } from "@/components/common/cards/progress";
import { Add } from "@/components/common/add/add";
import { useTasks } from "@/hooks/tasks/useTasks";
import { normalizeDate } from "@/utilities/date/formatter-date";
import { SelectPriority } from "@/components/common/selected/priority";

export default function TasksLayout() {
	const {
		tasks,
		isLoading,
		handleDelete,
		isLoadingDelete,
		editToggle,
		handleEditToggle,
		editId,
		onSubmit,
		errorSanitize,
		filteredTasks,
		selected,
		setSelected,
	} = useTasks();

	return (
		<Section id="dashboard" className="!justify-start !items-start">
			<Dashboard>
				<div className="flex flex-col sm:flex-row sm:justify-between gap-4">
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
					<div className="flex items-center gap-2">
						<h1 className="text-sm sm:text-lg font-bold">Priority:</h1>
						<SelectPriority
							selected={selected}
							onChange={setSelected}
						/>
					</div>
				</div>
				<motion.div
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
					className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 h-fit">
					{isLoading && (
						<Progress name="Loading..." priority="🌱 Optional" />
					)}
					{!isLoading && (
						<AnimatePresence mode="popLayout">
							{(selected ? filteredTasks : tasks).length > 0 ? (
								(selected ? filteredTasks : tasks).map((task) => (
									<motion.div
										key={task.id}
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, scaleY: 0, y: -30 }}
										transition={{
											duration: 0.7,
											ease: "easeInOut",
										}}>
										<Progress
											nameTask={task.title}
											idCard={task.id}
											onDelete={handleDelete}
											isLoadingDelete={isLoadingDelete}
											editToggle={editToggle}
											editId={editId}
											handleEditToggle={handleEditToggle}
											description={task.notes}
											date={normalizeDate(
												new Date(task.schedule)
											)}
											priority={task.priority}
											onSubmit={onSubmit}
											errorSanitize={errorSanitize}
											reminder={task.reminder}
										/>
									</motion.div>
								))
							) : (
								<Progress name="No tasks" />
							)}
						</AnimatePresence>
					)}
				</motion.div>
			</Dashboard>
			<Add />
		</Section>
	);
}
