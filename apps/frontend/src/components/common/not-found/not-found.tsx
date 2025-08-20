import Section from '@/components/shared/section';
import { useAuth } from '@/hooks/auth/useAuth';
import { motion } from 'motion/react';
import Loader from '../loading/loading';
import { useDirect } from '@/hooks/direction/useDirect';

export default function NotFound() {
	const { user, loading } = useAuth();
	const { checkRoot, back } = useDirect();

	if (loading) return <Loader />;
	
	return (
		<Section id="not-found">
			<div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 duration-500 ease-in transition-all">
				{/* Main 404 Image */}
				<motion.div className="aspect-video w-full max-w-lg" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
					<motion.div
						className="bg-[url('https://cdn3.iconfinder.com/data/icons/game-81/512/404_Not_Found_Dinamic.png')] w-full h-full bg-contain bg-no-repeat bg-center"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, ease: 'easeOut' }}
						whileTap={{ scale: 0.95 }}
						whileHover={{ scale: 1.05 }}
					/>
				</motion.div>

				{/* Text Content */}
				<motion.div className="text-center space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
					<h1 className="font-bold text-3xl md:text-4xl">Waduh, Nyasar Nih! 😅</h1>
					<p className="max-w-md">Halaman yang kamu cari kayaknya lagi main petak umpet. Mungkin dia lagi ngopi atau malah udah pindah alamat tanpa kasih tau! 🏃‍♂️💨</p>
				</motion.div>

				{/* Buttons */}
				<motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
					<motion.button
						onClick={() => checkRoot(user)}
						className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium duration-500 ease-in cursor-pointer"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}>
						🏠 Balik ke Rumah
					</motion.button>

					<motion.button
						onClick={back}
						className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium duration-500 ease-in cursor-pointer"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}>
						↩️ Mundur Dulu
					</motion.button>
				</motion.div>
			</div>
		</Section>
	);
}
