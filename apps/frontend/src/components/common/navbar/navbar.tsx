import ToggleDark from '@/components/common/navbar/components/mode-dark';
import Logo from '@/components/common/logo/logo';
import ToggleMenus from '@/components/common/navbar/components/mode-menu';
import { useMenus } from '@/hooks/navbar/useMenus';
import { Menus } from '@/components/common/navbar/components/menus';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/hooks/auth/useAuth';

export default function Navbar() {
	const LogoName = 'Achievly';
	const { user, logout } = useAuth();
	const { open, toggleOpen, menus } = useMenus({ user });

	return (
		<motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="navbar">
			<motion.div className="wrapper-navbar">
				<Logo letter={LogoName} />
				<ToggleDark />
				<Menus className="hidden sm:flex flex-row items-center" MenusData={menus} logout={logout} />
				<motion.div className="relative sm:hidden">
					<ToggleMenus open={open} toggleOpen={toggleOpen} />
				</motion.div>
			</motion.div>
			<motion.div className={`${open ? 'relative sm:hidden' : 'hidden'} wrapper-navbar-mobile`}>
				<AnimatePresence initial={false} mode="wait">
					{open && (
						<motion.div key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
							<Menus className="flex flex-col items-center" MenusData={menus} logout={logout} />
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</motion.nav>
	);
}
