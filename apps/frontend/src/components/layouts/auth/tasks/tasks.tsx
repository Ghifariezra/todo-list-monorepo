import Section from '@/components/shared/section';
import { Dashboard } from '@/components/common/grid/dashboard';
import { Heading } from '@/components/common/text/text';
import { motion } from 'motion/react';
import { Progress } from '@/components/common/cards/progress';
import { Add } from '@/components/common/add/add';
import { useTasks } from '@/hooks/tasks/useTasks';

export default function TasksLayout() {
	const { data, isLoading } = useTasks();
	console.log(data);

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
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
					<Progress
						name="Holla Como estas?"
						description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore at explicabo ex harum dolorem vero doloremque debitis, placeat, dolorum repellendus accusamus architecto totam cumque quasi fugiat officiis? Enim inventore reiciendis autem praesentium, in voluptas eius modi nostrum asperiores distinctio sed facilis debitis quidem quibusdam sit adipisci placeat totam id! Ullam itaque nam praesentium unde similique. Ad, illum consequatur sint corporis mollitia voluptas aperiam necessitatibus quidem suscipit impedit! Architecto quidem itaque illum? Non hic, quaerat beatae, accusamus porro vero placeat officiis ullam nulla similique ipsam delectus blanditiis facilis dignissimos aperiam! Repudiandae quo odio nostrum illum quaerat in a odit ex dolor."
						date="2023-01-01"
						priority="🌱 Optional"/>
					<Progress name="Holla Como estas?" date="2023-01-01" priority="🌱 Optional"/>
				</div>
			</Dashboard>
			<Add />
		</Section>
	);
}
