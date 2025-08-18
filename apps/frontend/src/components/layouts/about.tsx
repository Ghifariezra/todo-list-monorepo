import Section from '@/components/shared/section';
import { memo } from 'react';
import { motion } from 'motion/react';
import { Paragraph } from '@/components/common/home/text';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Thumb } from '@radix-ui/react-scroll-area';

function AboutLayout() {
	return (
		<Section id="about">
			<motion.div className="grid sm:grid-cols-2 items-center justify-center gap-8 sm:gap-4 px-6 py-4">
				<motion.div className="aspect-square overflow-hidden">
					<motion.div className='bg-[url("https://cdn0.iconfinder.com/data/icons/team-work-office-3d-asset/512/Team_work_Discuss_About_work.png")] w-full h-full bg-contain bg-no-repeat bg-center' />
				</motion.div>
				<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
					<ScrollArea className="max-h-[calc(100vh-10rem)] overflow-y-auto">
						<div className="p-4 sm:p-6">
							<Paragraph className="sm:!text-justify !text-sm sm:!text-xl leading-relaxed space-y-4">
								<span className="block text-base sm:text-2xl font-semibold mb-4">Achievly: Mengubah Rencana Menjadi Pencapaian Nyata.</span>

								<p>
									Pernahkah Anda merasa kewalahan dengan banyaknya tugas yang harus diselesaikan? Atau, seringkali rencana yang sudah disusun rapi justru terlupakan begitu saja? Kami di Achievly memahami tantangan ini.
									Itulah mengapa kami menciptakan sebuah aplikasi to-do list yang lebih dari sekadar pengingat, melainkan sebuah alat untuk membantu Anda mengubah setiap rencana menjadi aksi nyata.
								</p>

								<p>
									Kami percaya bahwa produktivitas seharusnya tidak rumit. Dengan Achievly, kami menyederhanakan manajemen tugas Anda dengan antarmuka yang bersih dan intuitif, memungkinkan Anda untuk fokus pada hal-hal
									yang benar-benar penting tanpa gangguan. Fitur-fitur kami, seperti integrasi Google Calendar yang menyinkronkan tugas dengan jadwal Anda secara otomatis, dan Pengingat Cerdas yang memastikan Anda tidak
									akan pernah melewatkan deadline lagi, dirancang untuk mendukung alur kerja Anda dengan mulus.
								</p>

								<p>
									Siapa pun Anda—seorang pelajar yang sibuk mengatur jadwal ujian, seorang profesional yang mengelola proyek dan rapat, atau siapa pun yang ingin merencanakan liburan atau target pribadi—Achievly adalah
									solusi yang tepat. Kami di sini untuk menjadi mitra Anda dalam setiap langkah, membantu Anda mengelola waktu dan mencapai tujuan dengan mudah.
								</p>

								<p>Bergabunglah dengan ribuan orang yang telah merasakan manfaat Achievly. Ubah cara Anda bekerja, dan mulailah wujudkan pencapaian Anda hari ini.</p>
							</Paragraph>
						</div>
						<ScrollBar orientation="vertical" className="bg-muted/30 hover:bg-muted/50 transition-colors">
							<Thumb className="bg-primary rounded-full" />
						</ScrollBar>
					</ScrollArea>
				</motion.div>
			</motion.div>
		</Section>
	);
}

export default memo(AboutLayout);
