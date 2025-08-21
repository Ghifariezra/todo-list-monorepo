import Section from '@/components/shared/section';
import { Dashboard } from '@/components/common/grid/dashboard';

export default function TasksLayout() {
	return (
		<Section id="dashboard" className="!justify-start !items-start">
			<Dashboard>
				<h1>Tasks</h1>
			</Dashboard>
		</Section>
	);
}
