import { ThemeProvider } from '@/components/theme-provider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from '@/components/common/loading/loading';

const Main = lazy(() => import('@/router/main'));
const Home = lazy(() => import('@/components/layouts/home/home'));
const About = lazy(() => import('@/components/layouts/about'));

const router = createBrowserRouter([
	{
		path: '/',
		Component: Main,
		children: [
			{
				path: '/',
				Component: Home,
			},
			{
				path: '/about',
				Component: About,
			},
		],
	},
]);

export default function App() {
	return (
		<Suspense fallback={<Loader />}>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<RouterProvider router={router} />
			</ThemeProvider>
		</Suspense>
	);
}
