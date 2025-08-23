import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarClock, ShieldAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import DatePickerFormField from "@/components/common/date-picker/data-picker";
import type { CardProps, TaskUpdate } from "@/types/task/task";
import { formatterDate } from "@/utilities/date/formatter-date";
import { useEffect, useRef } from "react";

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
	editToggle,
	handleEditToggle,
	editId,
	onSubmit,
	errorSanitize,
}: CardProps) {
	const isEdit = editToggle && editId === idCard;
	const errorRef = useRef<HTMLDivElement>(null);

	const form = useForm<TaskUpdate>({
		defaultValues: {
			id: idCard || "",
			title: nameTask || "",
			schedule: date || null,
			priority: (priority as TaskUpdate["priority"]) || "low",
			description: description || "",
		},
	});

	useEffect(() => {
		if (isEdit) {
			form.reset({
				id: idCard || "",
				title: nameTask || "",
				schedule: date || null,
				priority: (priority as TaskUpdate["priority"]) || "low",
				description: description || "",
			});
		}
	}, [isEdit, idCard, nameTask, date, priority, description, form]);

	useEffect(() => {
		if (errorSanitize) {
			errorRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [errorSanitize]);

	const handleSubmit = onSubmit
		? form.handleSubmit(onSubmit)
		: (e: React.FormEvent) => e.preventDefault();

	return (
		<Card className="w-full h-fit !flex flex-col px-6 pt-10 pb-14 gap-4 duration-500 ease-in">
			<CardHeader className={cn("w-full !flex !px-0")}>
				<motion.div className="flex items-center w-full gap-2">
					{/* Avatar image */}
					{image && (
						<motion.div
							key={image}
							initial={{ opacity: 0, y: -30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, ease: "easeInOut" }}
							className="aspect-square size-8">
							<div
								style={{ backgroundImage: `url(${image})` }}
								className="w-full h-full bg-contain bg-no-repeat bg-center"
							/>
						</motion.div>
					)}

					{/* Header Title & Edit/Delete */}
					<AnimatePresence mode="wait">
						<motion.div
							key={name}
							initial={{ opacity: 0, y: -30 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -30 }}
							transition={{ duration: 0.7, ease: "easeInOut" }}
							className={cn(
								"flex flex-col gap-8 w-full font-bold items-start",
								classNameDashboard
							)}>
							{nameTask ? (
								<div className="flex flex-col w-full items-center gap-6">
									<div
										className={`w-full flex justify-between`}>
										{!isEdit ? (
											<button
												disabled={isLoadingDelete}
												onClick={
													onDelete
														? () =>
																onDelete(
																	idCard || ""
																)
														: undefined
												}
												className="w-fit cursor-pointer hover:text-red-500">
												<X />
											</button>
										) : (
											<h1 className="text-2xl font-bold">
												Edit
											</h1>
										)}
										<button
											onClick={
												handleEditToggle
													? () =>
															handleEditToggle(
																idCard || ""
															)
													: undefined
											}
											className="cursor-pointer">
											<h1
												className={`hover:dark:text-yellow-400 hover:text-blue-600 italic underline underline-offset-4 font-light ${isEdit ? "hidden" : ""}`}>
												Edit
											</h1>
										</button>
									</div>

									{/* Title Field */}
									<div className="w-full min-w-0">
										{isEdit ? (
											<Form {...form}>
												<form
													onSubmit={handleSubmit}
													className="flex flex-col gap-6">
													{errorSanitize && (
														<p ref={errorRef} className="text-red-500">
															{errorSanitize}
														</p>
													)}
													<FormField
														control={form.control}
														name="title"
														render={({ field }) => (
															<FormItem>
																<FormLabel>
																	Judul
																</FormLabel>
																<FormControl>
																	<Input
																		placeholder="Judul"
																		{...field}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>

													{/* Date & Priority */}
													<div className="flex gap-4">
														<DatePickerFormField
															control={
																form.control
															}
															name="schedule"
															from={true}
														/>

														<FormField
															control={
																form.control
															}
															name="priority"
															render={({
																field,
															}) => (
																<FormItem className="w-full">
																	<FormLabel>
																		Prioritas
																	</FormLabel>
																	<Select
																		onValueChange={
																			field.onChange
																		}
																		value={
																			field.value
																		}>
																		<FormControl className="w-full cursor-pointer">
																			<SelectTrigger>
																				<SelectValue placeholder="Pilih Prioritas" />
																			</SelectTrigger>
																		</FormControl>
																		<SelectContent>
																			<SelectItem value="high">
																				High
																			</SelectItem>
																			<SelectItem value="medium">
																				Medium
																			</SelectItem>
																			<SelectItem value="low">
																				Low
																			</SelectItem>
																		</SelectContent>
																	</Select>
																	<FormMessage />
																</FormItem>
															)}
														/>
													</div>

													{/* Description */}
													<FormField
														control={form.control}
														name="description"
														render={({ field }) => (
															<FormItem>
																<FormLabel>
																	Catatan
																</FormLabel>
																<FormControl>
																	<Textarea
																		placeholder="Deskripsi"
																		{...field}
																		value={
																			field.value ||
																			""
																		}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<div className="flex gap-4 justify-end">
														<Button
															type="submit"
															className="font-bold cursor-pointer"
															disabled={
																!form.formState
																	.isDirty
															}>
															Simpan
														</Button>
														<Button
															type="button"
															variant="outline"
															className="font-bold cursor-pointer"
															onClick={
																handleEditToggle
																	? () =>
																			handleEditToggle(
																				""
																			)
																	: undefined
															}>
															Batal
														</Button>
													</div>
												</form>
											</Form>
										) : (
											<motion.div
												initial={{ opacity: 0, y: 30 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{
													duration: 0.5,
													ease: "easeInOut",
												}}
												exit={{ opacity: 0, y: 30 }}
												className="w-full">
												<CardTitle
													className={`!text-2xl ${classNameDashboard ? "text-left" : "text-center"} font-bold wrap-anywhere line-clamp-2`}>
													{nameTask}
												</CardTitle>
											</motion.div>
										)}
									</div>
								</div>
							) : (
								<CardTitle
									className={`!text-2xl ${classNameDashboard ? "text-left" : "text-center"} font-bold`}>
									{name}
								</CardTitle>
							)}

							{/* Jika tidak edit → tampilkan Date & Priority */}
							{!isEdit && date && (
								<motion.div
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 30 }}
									transition={{
										duration: 1,
										ease: "easeInOut",
									}}
									className="flex flex-col sm:flex-row justify-between items-center w-full text-sm font-normal gap-4">
									<div className="flex items-center gap-2 rounded text-base lg:text-lg">
										<CalendarClock className="size-4 shrink-0" />
										<span>{formatterDate(date)}</span>
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
											<span className="font-semibold text-base md:text-lg">
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

			{/* Notes view-only */}
			{!isEdit && nameTask && (
				<motion.div className="flex flex-col gap-2 border-t-1 rounded pt-4">
					<motion.h1
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-lg font-bold text-center">
						Notes
					</motion.h1>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-sm sm:text-base text-gray-500 line-clamp-6 text-justify">
						{description?.length
							? description
							: "Ups, notes kamu masih kosong nih ✨ Tulis sedikit notes biar makin seru!"}
					</motion.div>
				</motion.div>
			)}

			{children && (
				<CardContent className="flex flex-col gap-2 !px-0">
					{children}
				</CardContent>
			)}
		</Card>
	);
}
