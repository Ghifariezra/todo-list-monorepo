import{ memo } from 'react';
import { motion } from 'motion/react';

const Heading = memo(({ children, className }: { children: React.ReactNode, className?: string }) => {
	return (
		<motion.h1
			className={`text-2xl sm:text-3xl font-bold duration-500 ease-in ${className}`}>
			{children}
		</motion.h1>
	);
});

const Paragraph = memo(({ children, className }: { children: React.ReactNode, className?: string }) => {
	return <motion.p className={`text-sm sm:text-base max-w-3xl text-center ${className} duration-500 ease-in`}>{children}</motion.p>;
});

export { Heading, Paragraph };
