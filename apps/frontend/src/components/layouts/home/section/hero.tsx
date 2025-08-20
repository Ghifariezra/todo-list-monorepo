import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useDirect } from '@/hooks/direction/useDirect';
import { memo } from 'react';

function Hero() {
	const { login } = useDirect();

	return (
		<motion.div className="min-h-screen grid sm:grid-cols-2 items-center justify-center gap-8 sm:gap-4 px-6 py-4 duration-1000 ease-in">
			<motion.div className="flex flex-col gap-6 order-2 sm:order-1">
				<motion.div className="flex flex-col gap-2">
					<motion.h1 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="text-2xl sm:text-3xl font-bold">
						Ubah Rencana Menjadi Aksi. Wujudkan Pencapaian Anda.
					</motion.h1>
					<motion.p className="text-sm sm:text-base" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: 'easeInOut' }}>
						Achievly adalah aplikasi to-do list yang membantu Anda mengatur tugas, mengelola waktu, dan mencapai tujuan dengan mudah. Didesain untuk semua orang, dari pelajar hingga profesional, kami menyederhanakan manajemen
						tugas Anda agar fokus pada apa yang benar-benar penting.
					</motion.p>
				</motion.div>
				<motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: 'easeInOut' }} className="flex gap-4">
					<Button onClick={login} className="cursor-pointer text-base font-bold duration-500 ease-in">
						Mulai Sekarang, Gratis!
					</Button>
				</motion.div>
			</motion.div>
			<motion.div className="aspect-video overflow-hidden order-1 sm:order-2">
				<motion.div
					className='bg-[url("https://cdn4.iconfinder.com/data/icons/calendar-time-management-3d-illustrations/512/10.png")] w-full h-full bg-contain bg-no-repeat bg-center scale-125'
				/>
			</motion.div>
		</motion.div>
	);
}

export default memo(Hero);
