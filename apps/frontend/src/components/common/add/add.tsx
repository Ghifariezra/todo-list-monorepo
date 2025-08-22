import { CalendarPlus } from "lucide-react";
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
				<div className="fixed inset-0 bg-black/50 z-50">
					<div
						className="absolute inset-0 flex items-center justify-center"
						ref={overlayRef}>
						<div
							ref={sotRef}
							className="flex items-center flex-col justify-center bg-white dark:bg-slate-800 p-6 rounded-md gap-6">
							<Heading>Tambah Tugas</Heading>
							<PostForm />
						</div>
					</div>
				</div>
			)}
		</>
	);
}
