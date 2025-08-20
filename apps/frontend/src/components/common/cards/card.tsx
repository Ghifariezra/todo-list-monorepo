import { motion } from 'motion/react';
import type { Data } from '@/types/home/card';

function CardHome({ Categories, className }: { Categories: Data, className?: string }) {
	return (
		<motion.div className={`flex flex-col ${className} gap-4`}>
			{Categories.map((category, index) => (
				<motion.div
					drag
					dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
					initial={{ opacity: 0, scale: 0.5, y: 50 }}
					whileInView={{ opacity: 1, scale: 1, y: 0 }}
					transition={{ duration: 1.5, delay: index * 0.1 }}
					key={index}
					className="flex flex-col sm:flex-row items-center bg-white/30 dark:bg-slate-800/30 backdrop-blur-md border border-white/20 dark:border-slate-700/30 rounded-md p-4 gap-4 shadow-sm cursor-pointer">
					<motion.img whileHover={{ scale: 1.1, rotate: 10 }} transition={{ duration: 0.3, ease: 'easeInOut' }} src={category.image} alt="benefit" className="w-16 h-16" />
					<motion.p className="text-sm sm:text-base">
						<motion.strong className="font-bold">{category.description.split(':')[0]}</motion.strong>
						{': '}
						{category.description.split(':').slice(1).join(':').trim()}
					</motion.p>
				</motion.div>
			))}
		</motion.div>
	);
}

export default CardHome;