import {useAuth} from "../provider/AuthProvider.tsx";
import {ProtectedRoute} from "./ProtectedRoute.tsx";
import Login from "../pages/Login.tsx";
import {createBrowserRouter, Navigate, RouteObject, RouterProvider} from "react-router-dom";
import Signup from "../pages/Signup.tsx";
import SidebarLayout from "../components/sidebar/SidebarLayout.tsx";
import Auth from "./Auth.tsx";
import {Roles} from "../types/roles.ts";

const Routes = () => {
	const { token } = useAuth();

	const authOnlyRoutes: RouteObject[] = [
		{
			path: "/",
			element: <ProtectedRoute/>,
			children: [
				{
					path: "/",
					element: <SidebarLayout/>,
					children: [
						{
							path: "/",
							element: <Auth allowedRoles={[Roles.Admin, Roles.Teacher, Roles.Student]}/>,
							children: [
								{
									path: "/profile",
									element: <h1>Profile</h1>
								},
								{
									path: "/classrooms",
									element: <h1>Classrooms</h1>
								},
							]
						},
						{
							path: "/",
							element: <Auth allowedRoles={[Roles.Admin, Roles.Teacher]}/>,
							children: [
								{
									path: "/students",
									element: <h1>Students</h1>
								},
							]
						},
						{
							path: "/",
							element: <Auth allowedRoles={[Roles.Admin]}/>,
							children: [
								{
									path: "/institution",
									element: <h1>Institution</h1>
								},
								{
									path: "/teachers",
									element: <h1>Teachers</h1>
								},
							]
						},
					]
				},
			]
		},
		{
			path: "*",
			element: <Navigate to="/"/>
		}
	]

	const notAuthOnlyRoutes: RouteObject[] = [
		{
			path: "/login",
			element: <Login/>
		},
		{
			path: "/signup",
			element: <Signup/>
		},
		{
			path: "*",
			element: <Navigate to="/login"/>,
		}
	]

	const router = createBrowserRouter([
		...(!token ? notAuthOnlyRoutes : []),
		...authOnlyRoutes,
	]);

	return <RouterProvider router={router}/>;
}

export default Routes;