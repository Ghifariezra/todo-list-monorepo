import { CalendarPlus } from 'lucide-react';
import { motion } from 'motion/react';

export function Add() {
	return (
		<motion.div initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y:0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} whileHover={{ cursor: 'pointer' }} whileTap={{ scale: 0.95 }} className="fixed bottom-4 right-4 rounded-full bg-blue-500 dark:bg-yellow-500 hover:bg-blue-600 dark:hover:bg-yellow-600 w-12 h-12 duration-500 ease-in overflow-hidden z-50">
			<div className="relative inset-0 flex items-center justify-center h-full w-full text-white">
				<CalendarPlus className="size-6" />
			</div>
		</motion.div>
	);
}
