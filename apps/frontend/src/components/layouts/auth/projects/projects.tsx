import Section from '@/components/shared/section';
import { Dashboard } from '@/components/common/grid/dashboard';
import { Heading } from '@/components/common/text/text';
import { motion } from 'motion/react';

export default function ProjectsLayout() {
	return (
		<Section id="dashboard" className="!justify-start !items-start">
			<Dashboard>
				<motion.div className="flex items-center gap-2">
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="aspect-square size-10">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 1, ease: 'easeInOut' }}
							style={{ backgroundImage: `url(https://cdn1.iconfinder.com/data/icons/rocket-3d-rocket-business-illustration/256/Rocket_Illustration_11.png)` }}
							className="w-full h-full bg-contain bg-no-repeat bg-center"
						/>
					</motion.div>
					<Heading>Projects</Heading>
				</motion.div>
			</Dashboard>
		</Section>
	);
}
