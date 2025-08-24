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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePost } from "@/hooks/post-tasks/usePost";
import { Textarea } from "@/components/ui/textarea";
import DatePickerFormField from "@/components/common/date-picker/data-picker";
import { Checkbox } from "@/components/ui/checkbox";

export default function PostForm() {
	const { form, onSubmit, errorSanitize, successMessage, isLoading } =
		usePost();

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-8">
				{/* Field Title */}
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-bold">Judul</FormLabel>
							<FormControl className="w-full">
								<div className="w-full">
									<Input placeholder="Judul" {...field} />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Schedule & Priority */}
				<div className="flex gap-4">
					<DatePickerFormField
						control={form.control}
						name="schedule"
						from={true}
					/>
					<FormField
						control={form.control}
						name="priority"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel className="font-bold">
									Priority
								</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}>
									<FormControl className="w-full cursor-pointer">
										<SelectTrigger>
											<SelectValue placeholder="Pilih Prioritas" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className="w-full">
										{["high", "medium", "low"].map(
											(priority) => (
												<SelectItem
													key={priority}
													value={priority}>
													{priority
														.charAt(0)
														.toUpperCase() +
														priority.slice(1)}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				{/* Field Description */}
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-bold">Catatan</FormLabel>
							<FormControl className="w-full">
								<div className="w-full">
									<Textarea
										placeholder="Description"
										{...field}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* ✅ Checkbox Reminder */}
				<FormField
					control={form.control}
					name="reminder"
					render={({ field }) => (
						<FormItem className="flex items-center space-x-2">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
									className="cursor-pointer"
								/>
							</FormControl>
							<FormLabel className="font-bold cursor-pointer">
								Reminder
							</FormLabel>
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className={`w-full cursor-pointer font-bold ${successMessage.length > 0 ? "bg-green-600 dark:bg-slate-600 text-white" : ""} ${errorSanitize?.length > 0 ? "bg-red-600 text-white" : ""}`}
					disabled={
						successMessage.length > 0 ||
						errorSanitize?.length > 0 ||
						isLoading ||
						!form.formState.isDirty
					}>
					{errorSanitize || successMessage || "Submit"}
				</Button>
			</form>
		</Form>
	);
}

export { PostForm };
