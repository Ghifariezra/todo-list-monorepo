import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProfile } from '@/hooks/auth/useProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'motion/react';
import { memo } from 'react';

function GreetingComponent() {
	const { name, profile_picture_url, title, bio, loading } = useProfile();

	if (loading) {
		return <div className="animate-pulse w-full h-6 bg-gray-300 dark:bg-gray-700 rounded" />;
	}

	return (
		<motion.div className="order-2 xl:order-1 xl:col-span-3 flex flex-col justify-start gap-4">
			<Card className="w-full duration-500 ease-in">
				<motion.div className="flex items-center gap-2 w-full px-4">
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="flex items-center w-full gap-4">
						<Avatar className="!size-20 font-bold">
							<AvatarImage alt="Profile" />
							<AvatarFallback>{name?.charAt(0)}</AvatarFallback>
							<AvatarImage src={profile_picture_url} />
						</Avatar>
						<CardHeader className="w-full">
							<CardTitle>Hi, I'm {name}</CardTitle>
							{title ? (
								<CardDescription className="text-sm text-gray-500 dark:text-gray-400">{title}</CardDescription>
							) : (
								<CardDescription className="text-sm text-gray-500 dark:text-gray-400">Welcome to your dashboard!</CardDescription>
							)}
							{bio ? (
								<CardDescription className="text-sm text-gray-500 dark:text-gray-400">{bio}</CardDescription>
							) : (
								<CardDescription className="text-sm text-gray-500 dark:text-gray-400">Ups, bio kamu masih kosong nih ✨ Tulis sedikit tentang dirimu biar makin seru!</CardDescription>
							)}
						</CardHeader>
					</motion.div>
					<motion.div className="aspect-square size-30">
						<motion.div className='bg-[url("https://cdn1.iconfinder.com/data/icons/back-to-school-vol-2-1/512/23-02-2566_10_copy.png")] w-full h-full bg-contain bg-no-repeat bg-center' />
					</motion.div>
				</motion.div>
			</Card>
		</motion.div>
	);
}

export const Greeting = memo(GreetingComponent);
