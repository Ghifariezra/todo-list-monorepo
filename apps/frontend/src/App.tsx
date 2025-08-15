import Loader from '@/components/common/loading/loading';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Main = lazy(() => import('@/router/main'));
const Home = lazy(() => import('@/components/layouts/home/home'));
const About = lazy(() => import('@/components/layouts/about'));
const Login = lazy(() => import('@/components/layouts/auth/login'));
const Signup = lazy(() => import('@/components/layouts/auth/signup'));

const router = createBrowserRouter([
	{
		path: '/',
		Component: Main,
		children: [
			{ path: '/', Component: Home },
			{ path: '/about', Component: About },
			{ path: '/login', Component: Login },
			{ path: '/signup', Component: Signup },
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
