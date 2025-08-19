import { motion } from 'motion/react';
import Section from '@/components/shared/section';
import { Greeting } from '@/components/common/home/greeting';
import { Progress } from '@/components/common/home/progress';
import { memo } from 'react';
import DashedLineChart from '@/components/common/chart/chart';

export const Dashboard = ({ children }: { children: React.ReactNode }) => {
	return <motion.div className="grid xl:grid-cols-4 gap-8 w-full px-6 py-4">{children}</motion.div>;
};

const CardHero = memo(() => {
	return (
		<div className="order-2 xl:order-1 xl:col-span-3 flex flex-col justify-start gap-4">
			<Greeting />
			<DashedLineChart />
		</div>
	);
});

const CardProgress = memo(() => {
	return (
		<div className="order-1 xl:order-2 xl:col-span-1 flex xl:flex-col gap-4">
			<Progress name="Tasks" image="https://cdn3.iconfinder.com/data/icons/3d-productivity/512/task_completion.png" />
			<Progress name="Projects" image="https://cdn1.iconfinder.com/data/icons/rocket-3d-rocket-business-illustration/256/Rocket_Illustration_11.png" />
		</div>
	);
});

export default function DashboardLayout() {
	return (
		<Section id="dashboard" className="!justify-start !items-start">
			<Dashboard>
				<CardHero />
				<CardProgress />
			</Dashboard>
		</Section>
	);
}
