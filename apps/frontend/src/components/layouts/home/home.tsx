import { motion } from 'motion/react';
import Section from '@/components/shared/section';
import Hero from '@/components/layouts/home/section/hero';
import Second from '@/components/layouts/home/section/second';
import Third from '@/components/layouts/home/section/third';
import Fourth from '@/components/layouts/home/section/fourth';

const Home = ({ children }: { children: React.ReactNode }) => {
	return <motion.div className="flex flex-col gap-8">{children}</motion.div>;
};

export default function HomeLayout() {
	return (
		<Section id="home">
			<Home>
				<Hero />
				<Second />
				<Third />
				<Fourth />
			</Home>
		</Section>
	);
}
