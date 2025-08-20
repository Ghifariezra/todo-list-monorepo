import { motion } from 'motion/react';

export const Dashboard = ({ children }: { children: React.ReactNode }) => {
	return <motion.div className="grid xl:grid-cols-4 gap-8 w-full px-6 py-4">{children}</motion.div>;
};
