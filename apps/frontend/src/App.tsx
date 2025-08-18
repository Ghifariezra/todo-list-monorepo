import Loader from '@/components/common/loading/loading';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Protected from '@/components/protected/protected';

const Main = lazy(() => import('@/router/main'));
const Home = lazy(() => import('@/components/layouts/home/home'));
const About = lazy(() => import('@/components/layouts/about'));
const Login = lazy(() => import('@/components/layouts/auth/login'));
const Signup = lazy(() => import('@/components/layouts/auth/signup'));
const Dashboard = lazy(() => import('@/components/layouts/auth/dashboard'));

const NotFound = lazy(() => import('@/components/common/not-found/not-found'));

const router = createBrowserRouter([
	{
		path: '/',
		Component: Main,
		children: [
			{ index: true, Component: Home },
			{ path: 'about', Component: About },
			{
				path: 'dashboard',
				children: [
					{
						index: true,
						element: (
							<Protected>
								<Dashboard />
							</Protected>
						),
					},
					{
						path: 'tasks',
						element: (
							<Protected>
								<Dashboard />
							</Protected>
						),
					},
					{
						path: 'projects',
						element: (
							<Protected>
								<Dashboard />
							</Protected>
						),
					},
				],
			},
			{
				path: 'auth',
				children: [
					{ path: 'login', Component: Login },
					{ path: 'signup', Component: Signup },
				],
			},
		],
	},
	{ path: '*', Component: NotFound },
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
