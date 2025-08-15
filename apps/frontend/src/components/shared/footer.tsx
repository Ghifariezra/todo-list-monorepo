import { motion } from 'motion/react';
import { Github, Linkedin, Mail } from 'lucide-react';
import Logo from '@/components/common/logo/logo';

export default function Footer() {
	return (
		<motion.footer id="contact" className="text-gray-700 dark:text-gray-300 p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
			<div className="w-full mx-auto grid sm:grid-cols-2 gap-6 items-center">
				{/* Kiri - Logo / Brand */}
				<div className="flex flex-col gap-2">
					<Logo letter="Achievly" />
					<p className="text-sm">© {new Date().getFullYear()} All rights reserved.</p>
				</div>

				{/* Kanan - Sosial Media */}
				<div className="flex sm:justify-end gap-4">
					<a href="https://github.com/Ghifariezra" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
						<Github size={20} />
					</a>
					<a href="https://www.linkedin.com/in/ghifariezraramadhan/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
						<Linkedin size={20} />
					</a>
					<a href="mailto:ghifariezraramadhan@gmail.com" className="hover:text-blue-500 transition">
						<Mail size={20} />
					</a>
				</div>
			</div>
		</motion.footer>
	);
}
