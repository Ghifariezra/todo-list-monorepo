import Loader from "@/components/common/loading/loading";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Protected from "@/components/protected/protected";
import ProtectedNotAuth from "@/components/protected/protected-not-auth";

const Main = lazy(() => import("@/router/main"));
const Home = lazy(() => import("@/components/layouts/home/home"));
const About = lazy(() => import("@/components/layouts/about"));
const Login = lazy(() => import("@/components/layouts/auth/login"));
const Signup = lazy(() => import("@/components/layouts/auth/signup"));
const Dashboard = lazy(
	() => import("@/components/layouts/auth/dashboard/dashboard")
);
const Tasks = lazy(() => import("@/components/layouts/auth/tasks/tasks"));
const Profile = lazy(
	() => import("@/components/layouts/auth/dashboard/profile")
);

const NotFound = lazy(() => import("@/components/common/not-found/not-found"));

const router = createBrowserRouter([
	{
		path: "/",
		Component: Main,
		children: [
			{
				index: true,
				element: (
					<ProtectedNotAuth>
						<Home />
					</ProtectedNotAuth>
				),
			},
			{
				path: "about",
				element: (
					<ProtectedNotAuth>
						<About />
					</ProtectedNotAuth>
				),
			},
			{
				path: "dashboard",
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
						path: "tasks",
						element: (
							<Protected>
								<Tasks />
							</Protected>
						),
					},
					{
						path: "profile",
						element: (
							<Protected>
								<Profile />
							</Protected>
						),
					},
				],
			},
			{
				path: "auth",
				children: [
					{
						path: "login",
						element: (
							<ProtectedNotAuth>
								<Login />
							</ProtectedNotAuth>
						),
					},
					{
						path: "signup",
						element: (
							<ProtectedNotAuth>
								<Signup />
							</ProtectedNotAuth>
						),
					},
				],
			},
			{ path: "*", Component: NotFound },
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
