import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export function Progress({ name, image, children }: { name?: string; image?: string, children?: React.ReactNode }) {
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
				{children}
			</CardHeader>
		</Card>
	);
}
