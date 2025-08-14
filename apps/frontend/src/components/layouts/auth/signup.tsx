import { memo } from 'react';
import Section from '@/components/shared/section';
import { SignupForm } from '@/components/common/form/signup';
import { motion } from 'motion/react';

function SignupLayout() {
	return (
		<Section id="signup">
			<motion.div className="grid sm:grid-cols-2 items-center justify-center gap-8 sm:gap-4 min-w-sm max-w-4xl w-full px-8 py-8 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md border border-white/20 dark:border-slate-700/20 rounded-2xl shadow-lg duration-500 ease-in">
				<motion.div className="flex flex-col gap-4">
					<motion.h1 className="text-3xl sm:text-4xl text-center font-bold mb-4">Daftar</motion.h1>
					<SignupForm />
				</motion.div>
				<motion.div drag dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} className="aspect-square hidden sm:block">
					<motion.div className='bg-[url("https://cdn2.iconfinder.com/data/icons/business-1538/512/icbs01_6.png")] w-full h-full bg-cover bg-center' />
				</motion.div>
			</motion.div>
		</Section>
	);
}

export default memo(SignupLayout);
