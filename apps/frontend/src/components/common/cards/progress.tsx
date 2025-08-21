import { motion, AnimatePresence } from 'motion/react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export function Progress({ name, image, children }: { name?: string; image?: string; children?: React.ReactNode }) {
	return (
		<Card className="w-full px-4 py-8 duration-500 ease-in">
			<CardHeader>
				<motion.div className="flex items-center gap-2">
					<AnimatePresence mode="wait" initial={false}>
						{image ? (
							<motion.div key={image} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="aspect-square size-8">
								<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: 'easeInOut' }} style={{ backgroundImage: `url(${image})` }} className="w-full h-full bg-contain bg-no-repeat bg-center" />
							</motion.div>
						) : null}
						<CardTitle>{name}</CardTitle>
					</AnimatePresence>
				</motion.div>
				{children}
			</CardHeader>
		</Card>
	);
}