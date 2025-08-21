import { motion, AnimatePresence } from 'motion/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CalendarClock } from 'lucide-react';
import { cn } from '@/lib/utils';

type CardProps = { children?: React.ReactNode; name?: string; image?: string; description?: string; classNameDashboard?: string; date?: string; priority?: string };

export function Progress({ children, name, image, description, classNameDashboard, date, priority }: CardProps) {
	return (
		<Card className="w-full h-fit !flex flex-col px-6 py-10 gap-4 duration-500 ease-in">
			<CardHeader className={cn('w-full !flex !px-0')}>
				<motion.div className="flex items-center w-full gap-2">
					{image ? (
						<motion.div key={image} initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeInOut' }} className="aspect-square size-8">
							<motion.div
								key={image}
								initial={{ opacity: 0, y: -30 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -30 }}
								transition={{ duration: 0.7, ease: 'easeInOut' }}
								style={{ backgroundImage: `url(${image})` }}
								className="w-full h-full bg-contain bg-no-repeat bg-center"
							/>
						</motion.div>
					) : null}
					<AnimatePresence mode="wait">
						<motion.div
							key={name} // animasi kalau nama berubah
							initial={{ opacity: 0, y: -30 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -30 }}
							transition={{ duration: 0.7, ease: 'easeInOut' }}
							className={cn('flex flex-col gap-8 w-full font-bold items-start', classNameDashboard)}>
							{/* Title */}
							<div className="w-full min-w-0">
								<CardTitle className={`!text-xl ${classNameDashboard ? 'text-left' : 'text-center'} font-bold wrap-anywhere line-clamp-2`}>{name}</CardTitle>
							</div>
							{/* Date */}
							{date && (
								<motion.div
									key={date}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 30 }}
									transition={{ duration: 1, ease: 'easeInOut' }}
									className="flex justify-between items-center w-full text-sm font-normal">
									<div className="flex items-center justify-center gap-2 w-full font-semibold">
										<CalendarClock className="size-4 shrink-0" />
										<motion.span>{date}</motion.span>
									</div>
									<div className="border-r border-1 rounded h-4" />
									<div className="flex justify-center w-full">
										<div className="w-fit h-6 border-green-500 border text-green-500 rounded flex items-center p-2 sm:p-4">
											<span className=" font-semibold">{priority}</span>
										</div>
									</div>
								</motion.div>
							)}
						</motion.div>
					</AnimatePresence>
				</motion.div>
			</CardHeader>
			{description && (
				<motion.div className="flex flex-col gap-2 border-t-1 rounded pt-4">
					<motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeInOut' }} className="text-lg font-bold text-center">
						Notes
					</motion.h1>
					<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeInOut' }} className="text-sm text-gray-500 line-clamp-6 text-justify">
						{description}
					</motion.div>
				</motion.div>
			)}
			{children && <CardContent className="flex flex-col gap-2">{children}</CardContent>}
		</Card>
	);
}
