import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { formatterDate, parseDateString } from '@/utilities/date/formatter-date';
import type { DatePickerFormProps } from '@/types/auth/auth';
import type { FieldValues} from 'react-hook-form';


export default function DatePickerFormField<T extends FieldValues>({ control, name, date_of_birth }: DatePickerFormProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
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
