import { motion } from 'motion/react';

export default function Section({ children, id, className }: { children: React.ReactNode, id?: string, className?: string }) {
	return (
		<motion.section id={id} className={`min-h-screen flex justify-center items-center ${className}`}>
            {children}
		</motion.section>
	);
}