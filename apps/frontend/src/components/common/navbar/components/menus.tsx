import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import type { Menus } from '@/types/navbar/menus';

export function Menus({ className, MenusData, logout }: { className?: string; MenusData: Array<Menus>; logout?: () => void }) {
	return (
		<>
			<motion.div className={`${className} gap-4 font-medium`}>
				{MenusData.map((menu, index) => {
					switch (menu.name) {
						case 'Logout':
							return (
								<NavLink key={index} to={'/'} className={({ isActive }) => (isActive ? 'bg-gray-200 dark:bg-gray-800 rounded-md duration-500 ease-in' : 'w-full')}>
									<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-center">
										<Button onClick={logout} variant="destructive" className="cursor-pointer w-fit sm:w-full font-bold">
											{menu.name}
										</Button>
									</motion.div>
								</NavLink>
							);
						case 'Login':
							return (
								<NavLink key={index} to={menu.href} className={({ isActive }) => (isActive ? 'bg-gray-200 dark:bg-gray-800 rounded-md duration-500 ease-in' : 'w-full')}>
									<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-center">
										<Button variant="outline" className="cursor-pointer w-fit sm:w-full font-bold">
											{menu.name}
										</Button>
									</motion.div>
								</NavLink>
							);
						case 'Sign Up':
							return (
								<NavLink key={index} to={menu.href} className={({ isActive }) => (isActive ? 'bg-gray-200 dark:bg-gray-800 rounded-md duration-500 ease-in' : 'w-full')}>
									<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-center">
										<Button className="cursor-pointer w-fit sm:w-full font-bold duration-500 ease-in">{menu.name}</Button>
									</motion.div>
								</NavLink>
							);
						default:
							return (
								<NavLink key={index} to={menu.href} className={({ isActive }) => (isActive ? 'bg-gray-200 dark:bg-gray-800 rounded-md duration-500 ease-in' : '')}>
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
										className="hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-1 rounded-md cursor-pointe font-semibold duration-500 ease-inr">
										{menu.name}
									</motion.div>
								</NavLink>
							);
					}
				})}
			</motion.div>
		</>
	);
}
