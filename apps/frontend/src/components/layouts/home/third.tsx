import CardHome from '@/components/common/home/card';
import { memo } from 'react';
import { motion } from 'motion/react';
import { Categories } from '@/utilities/home/category';

function Third() {
	return (
		<motion.div className="grid sm:grid-cols-2 items-center justify-center gap-8 sm:gap-4">
			<motion.div className="flex flex-col gap-4 px-6 py-12 order-2 sm:order-1">
				<motion.div className="flex flex-col gap-4">
					<motion.h1 className="text-2xl sm:text-3xl font-bold">Siapa yang Cocok Menggunakan Achievly?</motion.h1>
					<motion.p>Apakah Anda sering lupa tugas atau kesulitan mengelola rencana? Achievly adalah solusi untuk Anda.</motion.p>
				</motion.div>
				<CardHome Categories={Categories} />
			</motion.div>
			<motion.div className="aspect-video overflow-hidden order-1 sm:order-2">
				<motion.div className='bg-[url("https://cdn2.iconfinder.com/data/icons/questions-1/512/Looking_For_Help_1_Front.png")] w-full h-full bg-contain bg-no-repeat bg-center scale-125' />
			</motion.div>
		</motion.div>
	);
}

export default memo(Third);
