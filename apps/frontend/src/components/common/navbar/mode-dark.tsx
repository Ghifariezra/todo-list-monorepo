import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/theme/useTheme';
import { useDarkmode } from '@/hooks/theme/useDarkmode';
import { AnimatePresence, motion } from 'motion/react';

export default function ToggleDark() {
	const { theme, setTheme } = useTheme();
	const { toggleTheme } = useDarkmode({ theme, setTheme });

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button onClick={toggleTheme} variant="outline" size="icon" className="toggle-dark">
					<AnimatePresence initial={false} mode="wait">
						{theme === 'dark' ? (
							<motion.div key="up" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
								<Moon />
							</motion.div>
						) : (
							<motion.div key="down" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
								<Sun />
							</motion.div>
						)}
					</AnimatePresence>
				</Button>
			</DropdownMenuTrigger>
		</DropdownMenu>
	);
}
