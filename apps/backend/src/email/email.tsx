import {
	Html,
	Tailwind,
	Container,
	Section,
	Text,
	Img,
	Button,
	Hr,
} from "@react-email/components";
import { render } from "@react-email/render";

export function normalizeDate(date: Date): Date {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
}

export function formatterDate(date: Date) {
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
interface TaskTitle {
  taskId: string[];
  title: string[];
  date: Date;
  reminder: boolean;
}
interface ReminderEmailProps {
	name: string;
	taskTitle: TaskTitle;
}



// ✅ perbaikan
export default async function Email({
  name,
  taskTitle,
}: ReminderEmailProps): Promise<string> {
  return await render(<ReminderEmail name={name} {...taskTitle} />);
}



function ReminderEmail({ name, title, date }: {
	name: string;
	title: TaskTitle["title"];
	date: TaskTitle["date"];}) {
	return (
		<Html>
			<Tailwind>
				<Container className="bg-gray-50 py-10 px-6 rounded-2xl max-w-xl mx-auto font-sans">
					{/* Header */}
					<Section className="text-center mb-6">
						<Img
							src="https://cdn1.iconfinder.com/data/icons/modern-3d-business-illustrations/512/Reminder.png"
							alt="Reminder"
							width="120"
							height="120"
							className="mx-auto"
						/>
						<Text className="text-2xl font-extrabold text-gray-900 mt-4">
							📌 Pengingat Tugas
						</Text>
					</Section>

					{/* Greeting */}
					<Text className="text-base text-gray-800 text-center mb-4">
						Hai <span className="font-semibold">{name}</span>,{" "}
						<br />
						Jangan lupa ada tugas yang harus kamu selesaikan! 🚀
					</Text>

					<Hr className="border-gray-300 my-6" />

					{/* Task Section */}
					<Section className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 mb-6">
						<Text className="text-sm text-gray-600 mt-2">
							📅 Jadwal:{" "}
							<span className="font-medium text-gray-900">
								{formatterDate(date)}
							</span>
						</Text>
						<Text className="text-lg font-semibold text-gray-900 mb-3">
							📝 Daftar Tugas:
							<ul className="list-decimal list-inside text-gray-700 leading-relaxed mb-4">
								{title.map((t, i) => (
									<li key={i} className="text-xl font-semibold">{t}</li>
								))}
							</ul>
						</Text>
					</Section>

					{/* Call to Action */}
					<Section className="text-center">
						<Button
							href="https://todo-list-monorepo.vercel.app/dashboard/tasks"
							target="_blank"
							className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold no-underline shadow-md">
							Lihat Detail Tugas
						</Button>
					</Section>

					{/* Footer */}
					<Text className="text-xs text-gray-500 text-center mt-8 leading-relaxed">
						Email ini dikirim otomatis oleh sistem reminder tugas.{" "}
						<br />
						Tetap semangat menyelesaikan aktivitasmu tepat waktu! 💪
					</Text>
				</Container>
			</Tailwind>
		</Html>
	);
}
