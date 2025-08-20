import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import type { signupSchema } from '@/lib/validations/signup';
import type { profileSchema } from '@/lib/validations/profile';
import { formatterDate, parseDateString } from '@/utilities/date/formatter-date';
import type { Control } from 'react-hook-form';
import type z from 'zod';

export default function DatePickerFormField({ control, date_of_birth }: { control: Control<z.infer<typeof signupSchema> | z.infer<typeof profileSchema>>; date_of_birth?: string | undefined }) {
	return (
		<FormField
			control={control}
			name="dateOfBirth"
			render={({ field }) => {
				const dateValue = parseDateString(field.value);

				return (
					<FormItem className="flex flex-col gap-3 w-full">
						<FormLabel className="font-bold">Tanggal Lahir</FormLabel>
						<Popover>
							<PopoverTrigger asChild>
								<FormControl className="w-full">
									<Button variant="outline" className="w-full justify-between text-left font-normal cursor-pointer">
										{dateValue ? formatterDate(dateValue) : <span className="text-muted-foreground">{date_of_birth ? formatterDate(new Date(date_of_birth)) : 'Pilih Tanggal Lahir'}</span>}
										<CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
									</Button>
								</FormControl>
							</PopoverTrigger>
							<PopoverContent align="start" className="p-0">
								<Calendar
									mode="single"
									selected={dateValue}
									onSelect={(date) => {
										field.onChange(date ?? undefined); // langsung simpan Date object
									}}
									initialFocus
									captionLayout="dropdown"
									fromYear={1950}
									toYear={new Date().getFullYear()}
								/>
							</PopoverContent>
						</Popover>
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
}
