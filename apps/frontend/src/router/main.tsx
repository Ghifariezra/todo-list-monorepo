import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { Outlet } from 'react-router-dom';

export default function Main() {
	return (
		<div className="min-h-screen transition-all">
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}
