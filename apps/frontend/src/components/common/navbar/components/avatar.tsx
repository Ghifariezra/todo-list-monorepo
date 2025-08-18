import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useProfile } from '@/hooks/navbar/useProfile';
import { AnimatePresence, motion } from 'motion/react';
import type { AuthContextType } from '@/types/auth/auth';

export function AvatarComponent({ user, logout }: { user: AuthContextType['user']; logout?: AuthContextType['logout'] }) {
	const { openProfile, toggleProfile, profileRef } = useProfile();

	if (!user) {
		return null;
	}

	return (
		<div ref={profileRef}>
			<motion.div className="flex items-center gap-2 cursor-pointer" onClick={toggleProfile}>
				<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center">
					<Avatar>
						<AvatarImage alt="Profile" />
						<AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
					</Avatar>
				</motion.div>
			</motion.div>

			<AnimatePresence initial={false} mode="wait">
				{openProfile && (
					<motion.div
						key="profile-menu"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="absolute top-17 right-6 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
						<ul className="py-2">
							<li className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Profile</li>
							<li className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={logout}>
								Logout
							</li>
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
