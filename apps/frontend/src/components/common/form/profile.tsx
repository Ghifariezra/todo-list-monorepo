import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert } from 'lucide-react';
import DatePickerFormField from '@/components/common/date-picker/data-picker';
import { useProfile } from '@/hooks/auth/useProfile';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { useRef, useState, useEffect } from 'react';

function ProfileForm() {
	const { form, onSubmit, errorSanitize, loading, isLoading, name, email, phone, country, date_of_birth, title, bio, profile_picture_url } = useProfile();

	const [preview, setPreview] = useState<string | null>(profile_picture_url || null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Add this useEffect hook
	useEffect(() => {
		setPreview(profile_picture_url || null);
	}, [profile_picture_url]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setPreview(url);

			// simpan File ke react-hook-form
			form.setValue('profile_picture_url', file, { shouldValidate: true });
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center">
				<div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin" />
			</div>
		);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-8 w-full">
				{/* Picture */}
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
					className="flex flex-col items-center gap-3 text-center duration-500 ease-in">
					{name && <h1 className="text-2xl font-bold">{name}</h1>}
					<Avatar className="size-40 shadow-md border">
						{(preview || profile_picture_url) && (
							<AvatarImage
								src={preview || profile_picture_url || ""}
								alt="Profile"
							/>
						)}
						<AvatarFallback className="font-bold text-2xl">
							{name?.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<motion.div>
						<Label
							htmlFor="picture"
							className="cursor-pointer px-4 py-2 rounded-xl transition border font-bold">
							Upload Picture
						</Label>
						<Input
							id="picture"
							name="profile_picture_url"
							type="file"
							accept="image/*"
							ref={fileInputRef}
							className="hidden"
							onChange={handleFileChange}
						/>
					</motion.div>
				</motion.div>

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
								<FormLabel className="font-bold">
									Nomor Telepon
								</FormLabel>
								<FormControl className="w-full">
									<Input placeholder={phone} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Date of Birth */}
					<DatePickerFormField
						control={form.control}
						name="date_of_birth"
						date_of_birth={date_of_birth as string}
					/>
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
								<Textarea
									className="h-32"
									placeholder={bio}
									{...field}
								/>
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
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="flex items-center gap-2 p-2 bg-red-100 rounded-md text-red-600 border border-red-300">
							<ShieldAlert />
							{/* Ikon */}
							<p className="font-extrabold text-sm">
								{errorSanitize}
							</p>
						</motion.div>
					)}
				</AnimatePresence>
				<Button
					disabled={
						errorSanitize?.length > 0 ||
						loading ||
						!form.formState.isDirty
					}
					type="submit"
					className="w-full cursor-pointer font-bold">
					{!form.formState.isDirty
						? "Tidak ada perubahan"
						: (loading && "Menyimpan...") || "Simpan"}
				</Button>
			</form>
		</Form>
	);
}

export { ProfileForm };
