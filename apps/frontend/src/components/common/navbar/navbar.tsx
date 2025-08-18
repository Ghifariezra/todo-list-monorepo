import ToggleDark from '@/components/common/navbar/components/mode-dark';
import Logo from '@/components/common/logo/logo';
import ToggleMenus from '@/components/common/navbar/components/mode-menu';
import { useMenus } from '@/hooks/navbar/useMenus';
import { Menus } from '@/components/common/navbar/components/menus';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/hooks/auth/useAuth';
import { AvatarComponent } from '@/components/common/navbar/components/avatar';

export default function Navbar() {
	const LogoName = 'Achievly';
	const { user, loading, logout } = useAuth();
	const { open, toggleOpen, menus } = useMenus({ user });

	return (
		<motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="navbar shadow-md sticky top-0 bg-white dark:bg-gray-900 z-50">
			<motion.div className="wrapper-navbar">
				{/* Logo */}
				<Logo letter={LogoName} />

				{/* Dark mode toggle */}
				<ToggleDark />

				{/* Desktop Menu */}
				{!loading ? <Menus className="hidden sm:flex flex-row items-center gap-6" MenusData={menus} user={user} logout={logout} /> : <div className="hidden sm:flex animate-pulse w-32 h-6 bg-gray-300 dark:bg-gray-700 rounded" />}

				{/* Mobile Toggle */}
				<motion.div className="relative sm:hidden flex items-center gap-4">
					<ToggleMenus open={open} toggleOpen={toggleOpen} />
					<AvatarComponent user={user ?? null} logout={logout} />
				</motion.div>
			</motion.div>

			{/* Mobile Menu */}
			<AnimatePresence initial={false} mode="wait">
				{open && (
					<motion.div key="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="wrapper-navbar-mobile sm:hidden">
						<Menus className="flex flex-col items-center gap-4" MenusData={menus} />
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
}
