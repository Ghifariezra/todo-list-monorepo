import { memo } from 'react';
import Section from '@/components/shared/section';
import { LoginForm } from '@/components/common/form/login';
import { motion } from 'motion/react';

function LoginLayout() {
	return (
		<Section id="login">
			<motion.div className="grid sm:grid-cols-2 items-center justify-center gap-8 sm:gap-4 w-full max-w-4xl p-8 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md border border-white/20 dark:border-slate-700/20 rounded-2xl shadow-lg duration-500 ease-in">
				<motion.div className="flex flex-col gap-4">
					<motion.h1 className="text-3xl sm:text-4xl text-center font-bold mb-4">Masuk</motion.h1>
					<LoginForm />
				</motion.div>
				<motion.div drag dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} className="aspect-square hidden sm:block">
					<motion.div className='bg-[url("https://cdn4.iconfinder.com/data/icons/seo-3d-part-1/512/34_window_login.png")] w-full h-full bg-cover bg-center' />
				</motion.div>
			</motion.div>
		</Section>
	);
}

export default memo(LoginLayout);
