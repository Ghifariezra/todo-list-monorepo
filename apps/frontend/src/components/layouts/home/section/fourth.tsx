import { motion } from 'motion/react';
import { memo } from 'react';
import { Heading, Paragraph } from '@/components/common/text/text';
import { Button } from '@/components/ui/button';
import { useDirect } from '@/hooks/direction/useDirect';

function Fourth() {
    const { signup } = useDirect();
	return (
		<motion.div className="flex flex-col gap-6 bg-gray-50 dark:bg-slate-950 px-6 py-12">
			<motion.div className="flex flex-col items-center gap-4">
				<Heading>Siap Mencapai Tujuan Anda?</Heading>
				<Paragraph>Bergabunglah dengan ribuan orang yang telah mengubah cara mereka bekerja dengan Achievly.</Paragraph>
			</motion.div>
			<motion.div className="flex justify-center">
				<Button onClick={signup} className="cursor-pointer text-base font-bold duration-500 ease-in">Daftar Sekarang, Gratis!</Button>
			</motion.div>
		</motion.div>
	);
}

export default memo(Fourth);
