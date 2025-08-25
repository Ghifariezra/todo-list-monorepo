import type { Task } from "@/types/task/task";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Task>();

// Definisikan kolom untuk tabel "Today's Task"
const todayTaskColumns = [
	columnHelper.accessor("title", {
		header: () => <p className="text-center">Judul</p>,
		cell: (info) => <p className="text-center">{info.getValue()}</p>,
	}),
	columnHelper.accessor("schedule", {
		header: () => <p className="text-center">Jadwal</p>,
		cell: (info) => <p className="text-center">{info.getValue()}</p>,
	}),
	columnHelper.accessor("priority", {
		header: () => <p className="text-center">Prioritas</p>,
		cell: (info) => <p className="text-center">{info.getValue()}</p>,
	}),
	columnHelper.accessor("status", {
		header: () => <p className="text-center">Status</p>,
		cell: (info) => {
			return (
				info.getValue() && (
					<div className="bg-muted px-2 py-1 rounded">
						<p className="text-center">Selesai</p>
					</div>
				)
			);
		},
	}),
];

// Definisikan kolom untuk tabel "Upcoming Task"
const upcomingTaskColumns = [
	columnHelper.accessor("title", {
		header: () => <p className="text-center">Judul</p>,
		cell: (info) => <p className="text-center">{info.getValue()}</p>,
	}),
	columnHelper.accessor("schedule", {
		header: () => <p className="text-center">Jadwal</p>,
		cell: (info) => <p className="text-center">{info.getValue()}</p>,
	}),
	columnHelper.accessor("priority", {
		header: () => <p className="text-center">Prioritas</p>,
		cell: (info) => <p className="text-center">{info.getValue()}</p>,
	}),
	columnHelper.accessor("status", {
		header: () => <p className="text-center">Status</p>,
		cell: (info) => {
			return info.getValue() ? (
				<div className="bg-red-500 text-white px-2 py-1 rounded">
					<p className="text-center">Belum Selesai</p>
				</div>
			) : (
				<div className="bg-green-500 text-white px-2 py-1 rounded">
					<p className="text-center">Selesai</p>
				</div>
			);
		},
	}),
	columnHelper.accessor("reminder", {
		header: () => <p className="text-center">Reminder</p>,
		cell: (info) => {
			return info.getValue() ? (
				<div className="bg-green-500 text-white px-2 py-1 rounded">
					<p className="text-center">Ya</p>
				</div>
			) : (
				<div className="bg-red-500 text-white px-2 py-1 rounded">
					<p className="text-center">Tidak</p>
				</div>
			);
		},
	}),
];

export { todayTaskColumns, upcomingTaskColumns, columnHelper };
