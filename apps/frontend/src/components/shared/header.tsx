import Navbar from '@/components/common/navbar/navbar';
import { motion } from 'motion/react';
export default function Header() {
	return (
		<motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="sticky top-0 z-50">
			<Navbar />
		</motion.header>
	);
}
