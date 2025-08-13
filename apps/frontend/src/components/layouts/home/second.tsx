import CardHome from '@/components/common/home/card';
import { memo } from 'react';
import { motion } from 'motion/react';
import { Benefits } from '@/utilities/home/benefits';
import { Heading, Paragraph } from '@/components/common/home/text';

function Second() {
	return (
		<motion.div className="flex flex-col gap-4 bg-gray-50 dark:bg-slate-950 px-6 py-12">
			<motion.div className="flex flex-col items-center gap-6">
				<Heading>Mengapa Achievly?</Heading>
				<Paragraph>Kami tahu bahwa manajemen tugas bisa membingungkan. Itulah mengapa Achievly hadir dengan fitur-fitur yang dibuat untuk membuat hidup Anda lebih teratur dan produktif.</Paragraph>
				<CardHome Categories={Benefits} className="max-w-3xl" />
			</motion.div>
		</motion.div>
	);
}

export default memo(Second);
