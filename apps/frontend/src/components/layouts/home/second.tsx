import CardHome from '@/components/common/home/card';
import { memo } from 'react';
import { motion } from 'motion/react';
import { Benefits } from '@/utilities/home/benefits';

function Second() {
	return (
		<motion.div className="flex flex-col gap-4 bg-gray-50 dark:bg-slate-950 px-6 py-12">
			<motion.div className="flex flex-col items-center gap-6">
				<motion.h1 initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} className="text-2xl sm:text-3xl font-bold">
					Mengapa Achievly?
				</motion.h1>
				<motion.p initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: 'easeInOut' }} className="text-sm sm:text-base max-w-3xl text-center">
					Kami tahu bahwa manajemen tugas bisa membingungkan. Itulah mengapa Achievly hadir dengan fitur-fitur yang dibuat untuk membuat hidup Anda lebih teratur dan produktif.
				</motion.p>
				<CardHome Categories={Benefits} className="max-w-3xl" />
			</motion.div>
		</motion.div>
	);
}

export default memo(Second);
