import { motion } from 'motion/react';
import Section from '@/components/shared/section';
import { Greeting } from '@/components/common/home/greeting';
import { Progress } from '@/components/common/home/progress';

export const Dashboard = ({ children }: { children: React.ReactNode }) => {
	return <motion.div className="grid grid-cols-4 gap-8 w-full px-6 py-4">{children}</motion.div>;
};

export default function DashboardLayout() {
	return (
		<Section id="dashboard" className="!justify-start !items-start">
			<Dashboard>
				<div className="col-span-3 flex flex-col justify-start gap-4">
					<Greeting />
					<h1>Statistik</h1>
				</div>
				<div className="col-span-1 flex flex-col gap-4">
					<Progress name="Tasks" image="https://cdn3.iconfinder.com/data/icons/3d-productivity/512/task_completion.png" />
					<Progress name="Projects" image="https://cdn1.iconfinder.com/data/icons/rocket-3d-rocket-business-illustration/256/Rocket_Illustration_11.png" />
				</div>
			</Dashboard>
		</Section>
	);
}
