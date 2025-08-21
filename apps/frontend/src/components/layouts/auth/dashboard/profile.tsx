import { motion } from 'motion/react';
import { Heading } from '@/components/common/text/text';
import Section from '@/components/shared/section';
import { ProfileForm } from '@/components/common/form/profile';

export default function ProfileLayout() {
	return (
		<Section id="profile" className="!justify-start !items-start">
			<motion.div className="flex flex-col gap-8 w-full p-6 items-center">
				<Heading>Profile</Heading>
				<div className="block gap-8 border p-8 rounded-2xl w-full bg-slate-50/30 dark:bg-slate-800/30 shadow-sm">
					<ProfileForm />
				</div>
			</motion.div>
		</Section>
	);
}
