import { motion } from 'motion/react';
import { CheckCheck } from 'lucide-react';
import { memo } from 'react';
import { useDirect } from '@/hooks/direction/useDirect';

function Logo({ letter, footer }: { letter: string, footer?: boolean }) {
	const { home } = useDirect();
	return (
		<motion.div className={`text-animate ${footer ? '' : 'cursor-pointer'}`} onClick={footer ? undefined : home}>
			<motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
				<CheckCheck className="text-icon" />
			</motion.div>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
				{letter.split('').map((letter, index) => (
					<motion.span key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }}>
						{letter}
					</motion.span>
				))}
			</motion.div>
		</motion.div>
	);
}

export default memo(Logo);
