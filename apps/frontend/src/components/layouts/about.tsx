import Section from '@/components/shared/section';
import { memo } from 'react';
import { motion } from 'motion/react';
import { Paragraph } from '@/components/common/home/text';

function AboutLayout() {
	return (
		<Section id="about">
			<motion.div className="grid sm:grid-cols-2 items-center justify-center gap-8 sm:gap-4 px-6 py-4">
				<motion.div className="aspect-square overflow-hidden">
					<motion.div className='bg-[url("https://cdn0.iconfinder.com/data/icons/team-work-office-3d-asset/512/Team_work_Discuss_About_work.png")] w-full h-full bg-contain bg-no-repeat bg-center' />
				</motion.div>
				<motion.div className="flex flex-col gap-4">
					<Paragraph className="sm:!text-justify">
						Achievly adalah proyek portofolio yang saya kembangkan untuk memecahkan masalah pribadi yang sering kita hadapi: bagaimana mengelola daftar tugas yang menumpuk dan rencana yang berantakan. Terinspirasi dari kebutuhan
						akan sebuah alat yang sederhana namun kuat, saya membangun Achievly sebagai bukti nyata bahwa produktivitas dapat diakses oleh semua orang. Proyek ini tidak hanya tentang membuat sebuah aplikasi, tetapi juga tentang
						<br />
						<br />
						sebuah visi. Visi saya adalah menciptakan platform di mana setiap tanda centang tidak hanya menandakan selesainya sebuah tugas, tetapi juga sebuah langkah kecil menuju pencapaian yang lebih besar.
					</Paragraph>
				</motion.div>
			</motion.div>
		</Section>
	);
}

export default memo(AboutLayout);
