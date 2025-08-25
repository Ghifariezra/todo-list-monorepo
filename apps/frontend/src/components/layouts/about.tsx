import Section from '@/components/shared/section';
import { memo } from 'react';
import { motion } from 'motion/react';
import { Paragraph } from '@/components/common/text/text';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Thumb } from '@radix-ui/react-scroll-area';

function AboutLayout() {
	return (
		<Section id="about">
			<motion.div className="grid sm:grid-cols-2 items-center justify-center gap-8 sm:gap-4 px-6 py-4">
				<motion.div className="aspect-square overflow-hidden">
					<motion.div className='bg-[url("https://cdn0.iconfinder.com/data/icons/team-work-office-3d-asset/512/Team_work_Discuss_About_work.png")] w-full h-full bg-contain bg-no-repeat bg-center' />
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, ease: "easeOut" }}>
					<ScrollArea className="max-h-[calc(100vh-10rem)] overflow-y-auto">
						<div className="p-4 sm:p-6">
							<Paragraph className="sm:!text-justify !text-sm sm:!text-xl leading-relaxed space-y-4">
								<span className="block text-base sm:text-2xl font-semibold mb-4">
									Achievly: Membuat Setiap Rencana Jadi
									Pencapaian Nyata
								</span>

								<p>
									Merasa kewalahan dengan banyaknya tugas yang
									harus diselesaikan? Atau sering lupa dengan
									rencana yang sudah disusun rapi? Achievly
									hadir untuk menyelesaikan masalah tersebut.
								</p>

								<p>
									Dengan <strong>Integrasi Email</strong>,
									semua pengingat tugas Anda dapat langsung
									tersampaikan ke inbox, sehingga informasi
									tersentralisasi dan mudah diakses.
									<b>Pengingat Cerdas</b> memastikan Anda
									tidak akan melewatkan deadline, memberikan
									notifikasi tepat waktu sehari sebelum tugas
									jatuh tempo.
								</p>

								<p>
									Kami percaya bahwa produktivitas harus
									sederhana. Oleh karena itu, Achievly
									menghadirkan{" "}
									<strong>
										Antarmuka Sederhana & Bersih
									</strong>{" "}
									agar Anda dapat fokus pada tugas penting
									tanpa gangguan. Desain yang minimalis dan
									intuitif membantu menjaga alur kerja tetap
									efisien.
								</p>

								<p>
									Siapapun Anda — pelajar, profesional, atau
									perencana pribadi — Achievly membantu
									mengatur jadwal, mengingatkan tugas, dan
									memastikan semua rencana terselesaikan tepat
									waktu. Kami menjadi mitra Anda untuk
									mengelola waktu dan mencapai tujuan dengan
									mudah.
								</p>

								<p>
									Bergabunglah dengan ribuan pengguna yang
									telah merasakan manfaat Achievly. Optimalkan
									produktivitas, wujudkan rencana, dan raih
									pencapaian Anda setiap hari.
								</p>
							</Paragraph>
						</div>
						<ScrollBar
							orientation="vertical"
							className="bg-muted/30 hover:bg-muted/50 transition-colors">
							<Thumb className="bg-primary rounded-full" />
						</ScrollBar>
					</ScrollArea>
				</motion.div>
			</motion.div>
		</Section>
	);
}

export default memo(AboutLayout);
