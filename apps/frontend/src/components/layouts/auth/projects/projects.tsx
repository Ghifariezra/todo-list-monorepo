import Section from '@/components/shared/section';
import { Dashboard } from '@/components/common/grid/dashboard';

export default function ProjectsLayout() {
	return (
		<Section id="dashboard" className="!justify-start !items-start">
			<Dashboard>
				<h1>Projects</h1>
			</Dashboard>
		</Section>
	);
}
