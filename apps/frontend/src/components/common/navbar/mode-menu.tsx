import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { memo } from 'react';

function ToggleMenus({ open, toggleOpen }: { open: boolean; toggleOpen: () => void }) {
	return (
		<motion.div className="relative cursor-pointer">
			<AnimatePresence initial={false} mode="wait">
				{open ? (
					<motion.div key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
						<X className="text-3xl" onClick={toggleOpen} />
					</motion.div>
				) : (
					<motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
						<Menu className="text-3xl" onClick={toggleOpen} />
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

export default memo(ToggleMenus);