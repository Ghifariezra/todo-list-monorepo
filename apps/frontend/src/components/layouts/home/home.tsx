import { motion } from 'motion/react';
import Section from '@/components/shared/section';
import Hero from '@/components/layouts/home/hero';
import Second from '@/components/layouts/home/second';
import Third from '@/components/layouts/home/third';

export default function HomeLayout() {
	return (
		<Section id="home">
			<motion.div className="flex flex-col gap-8">
				<Hero />
				<Second />
				<Third />
			</motion.div>
		</Section>
	);
}
