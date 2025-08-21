import Section from '@/components/shared/section';
import { Dashboard } from '@/components/common/grid/dashboard';
import { Heading } from '@/components/common/text/text';
import { motion } from 'motion/react';

export default function TasksLayout() {
	return (
		<Section id="dashboard" className="!justify-start !items-start">
			<Dashboard>
				<motion.div className="flex items-center gap-2">
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="aspect-square size-8">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 1, ease: 'easeInOut' }}
							style={{ backgroundImage: `url(https://cdn3.iconfinder.com/data/icons/3d-productivity/512/task_completion.png)` }}
							className="w-full h-full bg-contain bg-no-repeat bg-center"
						/>
					</motion.div>
					<Heading>Tasks</Heading>
				</motion.div>
			</Dashboard>
		</Section>
	);
}
