import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Progress({ name, image }: { name?: string; image?: string }) {
	return (
		<Card className="w-full px-4 py-8 duration-500 ease-in">
			<CardHeader>
				<div className="flex items-center gap-2">
					{image ? (
						<div className="aspect-square size-6">
							<div style={{ backgroundImage: `url(${image})` }} className="w-full h-full bg-contain bg-no-repeat bg-center" />
						</div>
					) : null}
					<CardTitle>{name}</CardTitle>
				</div>
				<CardDescription className="font-bold text-4xl text-slate-900 dark:text-slate-50 w-full text-center">100%</CardDescription>

				<CardDescription className="text-sm text-gray-500 dark:text-gray-400 w-full text-justify">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis, dolores..</CardDescription>
			</CardHeader>
		</Card>
	);
}
