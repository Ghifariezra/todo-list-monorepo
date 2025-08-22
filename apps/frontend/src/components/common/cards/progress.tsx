import { motion, AnimatePresence } from "motion/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarClock, ShieldAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

type CardProps = {
	children?: React.ReactNode;
	nameTask?: string;
	idCard?: string;
	name?: string;
	image?: string;
	description?: string;
	classNameDashboard?: string;
	date?: string;
	priority?: string;
	onDelete?: (id: string) => void;
	isLoadingDelete?: boolean;
	editToggle?: boolean;
	handleEditToggle?: () => void;
};

export function Progress({
	children,
	nameTask,
	idCard,
	name,
	image,
	description,
	classNameDashboard,
	date,
	priority,
	onDelete,
	isLoadingDelete,
	// editToggle,
	handleEditToggle,
}: CardProps) {
	return (
		<Card className="w-full h-fit !flex flex-col px-6 pt-10 pb-14 gap-4 duration-500 ease-in">
			<CardHeader className={cn("w-full !flex !px-0")}>
				<motion.div className="flex items-center w-full gap-2">
					{image ? (
						<motion.div
							key={image}
							initial={{ opacity: 0, y: -30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, ease: "easeInOut" }}
							className="aspect-square size-8">
							<motion.div
								key={image}
								initial={{ opacity: 0, y: -30 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -30 }}
								transition={{
									duration: 0.7,
									ease: "easeInOut",
								}}
								style={{ backgroundImage: `url(${image})` }}
								className="w-full h-full bg-contain bg-no-repeat bg-center"
							/>
						</motion.div>
					) : null}
					<AnimatePresence mode="wait">
						<motion.div
							key={name} // animasi kalau nama berubah
							initial={{ opacity: 0, y: -30 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -30 }}
							transition={{ duration: 0.7, ease: "easeInOut" }}
							className={cn(
								"flex flex-col gap-8 w-full font-bold items-start",
								classNameDashboard
							)}>
							{/* Title */}
							{nameTask ? (
								<div className="flex flex-col w-full items-center gap-6">
									<div className="w-full flex justify-between">
										<button
											disabled={isLoadingDelete}
											onClick={
												onDelete
													? () => onDelete(idCard || "")
													: undefined
											}
											className="w-fit cursor-pointer hover:text-red-500">
											<X />
										</button>
										<button 
										onClick={handleEditToggle}
										className="cursor-pointer">
											<h1 className="hover:dark:text-yellow-400 hover:text-blue-600 italic underline underline-offset-4 font-light">
												edit
											</h1>
										</button>
									</div>
									<div className="w-full min-w-0">
										<CardTitle
											className={`!text-2xl ${classNameDashboard ? "text-left" : "text-center"} font-bold wrap-anywhere line-clamp-2`}>
											{nameTask}
										</CardTitle>
									</div>
								</div>
							) : (
								<div className="w-full min-w-0">
									<CardTitle
										className={`!text-2xl ${classNameDashboard ? "text-left" : "text-center"} font-bold wrap-anywhere line-clamp-2`}>
										{name}
									</CardTitle>
								</div>
							)}
							{/* Date */}
							{date && (
								<motion.div
									key={date}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 30 }}
									transition={{
										duration: 1,
										ease: "easeInOut",
									}}
									className="flex flex-col sm:flex-row justify-between items-center w-full text-sm font-normal gap-4">
									<div className="flex gap-2 w-full justify-center sm:justify-start font-semibold">
										<div className="flex items-center gap-2 rounded text-base lg:text-lg">
											<CalendarClock className="size-4 shrink-0" />
											<motion.span>{date}</motion.span>
										</div>
									</div>
									<div
										className={`flex justify-center items-center ${
											priority === "low"
												? "bg-green-500"
												: priority === "medium"
													? "bg-yellow-500"
													: "bg-red-500"
										} text-white rounded p-1`}>
										<ShieldAlert className="size-4" />
										<div className="h-6 flex items-center p-2">
											<span className=" font-semibold text-base md:text-lg">
												{priority &&
													priority
														.charAt(0)
														.toUpperCase() +
														priority.slice(1)}
											</span>
										</div>
									</div>
								</motion.div>
							)}
						</motion.div>
					</AnimatePresence>
				</motion.div>
			</CardHeader>
			{description ? (
				<motion.div className="flex flex-col gap-2 border-t-1 rounded pt-4">
					<motion.h1
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, ease: "easeInOut" }}
						className="text-lg font-bold text-center">
						Notes
					</motion.h1>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: "easeInOut" }}
						className="text-sm sm:text-base text-gray-500 line-clamp-6 text-justify">
						{description}
					</motion.div>
				</motion.div>
			) : (
				<motion.div className="flex flex-col gap-2 border-t-1 rounded pt-4">
					<motion.h1
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, ease: "easeInOut" }}
						className="text-lg font-bold text-center">
						Notes
					</motion.h1>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: "easeInOut" }}
						className="text-sm sm:text-base text-gray-500 line-clamp-6 text-justify">
						Ups, notes kamu masih kosong nih ✨ Tulis sedikit notes
						biar makin seru!
					</motion.div>
				</motion.div>
			)}
			{children && (
				<CardContent className="flex flex-col gap-2">
					{children}
				</CardContent>
			)}
		</Card>
	);
}
