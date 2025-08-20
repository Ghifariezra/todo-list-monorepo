import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert } from 'lucide-react';
import DatePickerFormField from '@/components/common/date-picker/data-picker';
import { useProfile } from '@/hooks/auth/useProfile';
import { Textarea } from '@/components/ui/textarea';

function ProfileForm() {
	const { form, onSubmit, errorSanitize, loading, isLoading, name, email, phone, country, date_of_birth, title, bio } = useProfile();

	if (isLoading) {
		return (
			<div className="flex items-center justify-center">
				<div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"></div>
			</div>
		);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full">
				{/* Name */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-bold">Nama</FormLabel>
							<FormControl className="w-full">
								<Input placeholder={name} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Email */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-bold">Email</FormLabel>
							<FormControl className="w-full">
								<Input placeholder={email} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex flex-col sm:flex-row gap-8 w-full">
					{/* Phone */}
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel className="font-bold">Nomor Telepon</FormLabel>
								<FormControl className="w-full">
									<Input placeholder={phone} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Date of Birth */}
					<DatePickerFormField control={form.control} date_of_birth={date_of_birth} />
				</div>
				{/* Country */}
				<FormField
					control={form.control}
					name="country"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-bold">Negara</FormLabel>
							<FormControl className="w-full">
								<Input placeholder={country} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Title */}
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="font-bold">Judul</FormLabel>
							<FormControl className="w-full">
								<Input placeholder={title} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Bio */}
				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="font-bold">Bio</FormLabel>
							<FormControl className="w-full">
								<Textarea placeholder={bio} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<AnimatePresence mode="wait" initial={false}>
					{errorSanitize?.length > 0 && (
						<motion.div
							key="error"
							initial={{ opacity: 0, y: -10 }} // Turun dari atas
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }} // Naik kembali saat hilang
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className="flex items-center gap-2 p-2 bg-red-100 rounded-md text-red-600 border border-red-300">
							<ShieldAlert />
							{/* Ikon */}
							<p className="font-extrabold text-sm">{errorSanitize}</p>
						</motion.div>
					)}
				</AnimatePresence>
				<Button disabled={errorSanitize?.length > 0 || loading || !form.formState.isValid} type="submit" className="w-full cursor-pointer font-bold">
					{loading ? 'Menyimpan...' : 'Simpan Perubahan'}
				</Button>
			</form>
		</Form>
	);
}

export { ProfileForm };
