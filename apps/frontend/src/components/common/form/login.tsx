import { useLogin } from '@/hooks/auth/useLogin';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert } from 'lucide-react';

export default function LoginForm() {
	const { form, onSubmit, errorSanitize, isLoading } = useLogin();

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full">
					{/* Field Email */}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className='font-bold'>Email</FormLabel>
								<FormControl className='w-full'>
									<div className="w-full">
									<Input placeholder="you@example.com" {...field} />
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Field Password */}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className='font-bold'>Password</FormLabel>
								<FormControl className='w-full'>
									<div className="w-full">
									<Input type="password" placeholder="********" {...field} />
									</div>
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
				<Button disabled={errorSanitize?.length > 0 || isLoading} type="submit" className="w-full cursor-pointer duration-500 ease-in font-bold">
					{isLoading ? 'Sabarrr yaaa...' : 'Masuk'}
				</Button>
			</form>
		</Form>
	);
}

export { LoginForm };
