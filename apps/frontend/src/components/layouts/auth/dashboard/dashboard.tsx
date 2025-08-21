import Section from '@/components/shared/section';
import { Greeting } from '@/components/common/cards/greeting';
import { Progress } from '@/components/common/cards/progress';
// import DashedLineChart from '@/components/common/chart/chart';
import { Dashboard } from '@/components/common/grid/dashboard';

export default function DashboardLayout() {
	return (
		<Section id="dashboard" className="!justify-start !items-start">
			<Dashboard>
				<Greeting />
				<div className="flex sm:flex-row flex-col gap-4">
					<Progress name="Today's Task" classNameDashboard="items-start" image="https://cdn3.iconfinder.com/data/icons/3d-productivity/512/task_completion.png"></Progress>
					<Progress name="Upcoming Tasks" classNameDashboard="items-start"  image="https://cdn0.iconfinder.com/data/icons/data-information/512/Data-Informationv1_1.png"></Progress>
				</div>
			</Dashboard>
		</Section>
	);
}
