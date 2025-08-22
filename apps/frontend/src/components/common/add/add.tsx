import { CalendarPlus, X } from "lucide-react";
import { motion } from "motion/react";
import { useSot } from "@/hooks/sot/useSot";
import { PostForm } from "@/components/common/form/post";
import { Heading } from "@/components/common/text/text";

export function Add() {
	const { open, toggleOpen, sotRef, overlayRef } = useSot();

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 70 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				whileHover={{ cursor: "pointer" }}
				whileTap={{ scale: 0.95 }}
				className="fixed bottom-4 right-4 rounded-full bg-blue-500 dark:bg-yellow-500 hover:bg-blue-600 dark:hover:bg-yellow-600 w-12 h-12 duration-500 ease-in overflow-hidden z-50">
				<div
					className="relative inset-0 flex items-center justify-center h-full w-full text-white"
					onClick={toggleOpen}>
					<CalendarPlus className="size-6" />
				</div>
			</motion.div>
			{open && (
				<motion.div
					initial={{ opacity: 0, scaleX: 0 }}
					animate={{ opacity: 1, scaleX: 1 }}
					transition={{ duration: 0.6, ease: "easeInOut" }}
					className="fixed inset-0 bg-slate-500/50 dark:bg-slate-800/50 z-50">
					<div
						className="absolute inset-0 flex items-center justify-center"
						ref={overlayRef}>
						<motion.div
							initial={{ opacity: 0, scaleY: 0 }}
							animate={{ opacity: 1, scaleY: 1 }}
							transition={{
								duration: 0.6 * 2,
								ease: "easeInOut",
							}}
							ref={sotRef}
							className="flex items-center flex-col justify-center bg-white dark:bg-slate-800 p-6 rounded-md gap-6 w-full max-w-md">
							<div className="flex items-center justify-between w-full">
								<Heading>Tambah Tugas</Heading>
								<div
									onClick={toggleOpen}
									className="cursor-pointer">
									<X />
								</div>
							</div>
							<div className="w-full">
								<PostForm />
							</div>
						</motion.div>
					</div>
				</motion.div>
			)}
		</>
	);
}
