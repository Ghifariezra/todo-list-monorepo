import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/auth/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'motion/react';
import { memo } from 'react';

function GreetingComponent() {
	const { user, loading } = useAuth();

	if (loading) {
		return <div className="animate-pulse w-full h-6 bg-gray-300 dark:bg-gray-700 rounded" />;
	}

	console.log('Greeting component rendered with user:', user);

	return (
		<Card className="w-full duration-500 ease-in">
			<motion.div className="flex items-center gap-2 w-full px-4">
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="flex items-center w-full gap-4">
					<Avatar className="!size-20 font-bold">
						<AvatarImage alt="Profile" />
						<AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
						<AvatarImage src={user?.profile_picture_url} />
					</Avatar>
					<CardHeader className="w-full">
						<CardTitle>Hi, I'm {user?.name}</CardTitle>
						{user?.title ? (
							<CardDescription className="text-sm text-gray-500 dark:text-gray-400">{user.title}</CardDescription>
						) : (
							<CardDescription className="text-sm text-gray-500 dark:text-gray-400">Welcome to your dashboard!</CardDescription>
						)}
						{user?.bio ? (
							<CardDescription className="text-sm text-gray-500 dark:text-gray-400">{user.bio}</CardDescription>
						) : (
							<CardDescription className="text-sm text-gray-500 dark:text-gray-400">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto illo vel ipsam nam repellendus nesciunt incidunt eos pariatur cum deserunt molestias, temporibus iste labore, suscipit nostrum voluptas
								excepturi eum voluptatum. Iusto consequatur dolor minus quasi assumenda itaque eius ratione, aliquam ducimus molestias ipsum quaerat quia unde dolorem, fugit nostrum voluptatum.
							</CardDescription>
						)}
					</CardHeader>
				</motion.div>
				<motion.div className="aspect-square size-30">
					<motion.div className='bg-[url("https://cdn1.iconfinder.com/data/icons/back-to-school-vol-2-1/512/23-02-2566_10_copy.png")] w-full h-full bg-contain bg-no-repeat bg-center' />
				</motion.div>
			</motion.div>
		</Card>
	);
}

export const Greeting = memo(GreetingComponent);
