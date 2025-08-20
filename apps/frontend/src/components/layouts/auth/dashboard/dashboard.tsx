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
				<div className="order-1 xl:order-2 xl:col-span-1 flex xl:flex-col gap-4">
					<Progress name="Tasks" image="https://cdn3.iconfinder.com/data/icons/3d-productivity/512/task_completion.png" />
					<Progress name="Projects" image="https://cdn1.iconfinder.com/data/icons/rocket-3d-rocket-business-illustration/256/Rocket_Illustration_11.png" />
				</div>
			</Dashboard>
		</Section>
	);
}
