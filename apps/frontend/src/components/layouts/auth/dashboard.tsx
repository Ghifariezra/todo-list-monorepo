import { motion } from 'motion/react';
import Section from '@/components/shared/section';

const Dashboard = ({ children }: { children: React.ReactNode }) => {
	return <motion.div className="flex flex-col gap-8">{children}</motion.div>;
};

export default function DashboardLayout() {
	return (
		<Section id="dashboard">
			<Dashboard>
				<h1>Dashboard</h1>
			</Dashboard>
		</Section>
	);
}
