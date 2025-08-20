import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'motion/react';
import { Heading } from '@/components/common/text/text';
import Section from '@/components/shared/section';
import { ProfileForm } from '@/components/common/form/profile';
import { useProfile } from '@/hooks/auth/useProfile';

export default function ProfileLayout() {
	const { profile_picture_url } = useProfile();
	
	return (
		<Section id="profile" className="!justify-start !items-start">
			<motion.div className="flex flex-col gap-8 w-full px-6 py-4 items-center">
				<Heading>Profile</Heading>
				<div className="flex flex-col gap-8 border p-8 rounded-2xl w-full bg-slate-50/30 dark:bg-slate-800/30 shadow-sm">
					<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center place-self-center">
						<Avatar className="font-bold size-40">
							<AvatarImage alt="Profile" />
							<AvatarFallback>A</AvatarFallback>
							<AvatarImage src={profile_picture_url} />
						</Avatar>
					</motion.div>
					{/* Name */}
					<div className="text-center">
						<ProfileForm />
					</div>
				</div>
			</motion.div>
		</Section>
	);
}
