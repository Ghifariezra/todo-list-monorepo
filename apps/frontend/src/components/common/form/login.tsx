import { useLogin } from '@/hooks/auth/login';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
	const { form, onSubmit, errorSanitize } = useLogin();

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{/* Field Email */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="you@example.com" {...field} />
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
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="********" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{errorSanitize && <p className="text-xs font-bold text-red-500">{errorSanitize}</p>}
				<Button disabled={errorSanitize?.length > 0} type="submit" className="w-full cursor-pointer duration-500 ease-in font-bold">
					Login
				</Button>
			</form>
		</Form>
	);
}

export { LoginForm };
