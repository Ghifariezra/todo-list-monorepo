import { motion, AnimatePresence } from 'motion/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function Progress({ name, image, children, description, className }: { name?: string; image?: string; children?: React.ReactNode; description?: string; className?: string }) {
	return (
		<Card className="w-full px-4 py-8 duration-500 ease-in">
			<CardHeader className="w-full !px-0">
				<motion.div className="flex items-center gap-2">
					<AnimatePresence mode="wait" initial={false}>
						{image ? (
							<motion.div key={image} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="aspect-square size-8">
								<motion.div
									initial={{ opacity: 0, x: -30 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 1, ease: 'easeInOut' }}
									style={{ backgroundImage: `url(${image})` }}
									className="w-full h-full bg-contain bg-no-repeat bg-center"
								/>
							</motion.div>
						) : null}
						<CardTitle className={className}>{name}</CardTitle>
					</AnimatePresence>
				</motion.div>
			</CardHeader>
			{description && (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-gray-500 line-clamp-3">
					{description}
				</motion.div>
			)}
			{children && <CardContent className="w-full !px-0">{children}</CardContent>}
		</Card>
	);
}
