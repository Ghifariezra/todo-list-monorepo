import { motion } from 'motion/react';

export default function Section({ children, id }: { children: React.ReactNode, id?: string }) {
	return (
		<motion.section id={id} className='min-h-screen flex justify-center items-center'>
            {children}
		</motion.section>
	);
}