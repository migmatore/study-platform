import {useAuth} from "../provider/AuthProvider.tsx";
import {ProtectedRoute} from "./ProtectedRoute.tsx";
import Login from "../pages/Login.tsx";
import {createBrowserRouter, Navigate, RouteObject, RouterProvider} from "react-router-dom";
import Signup from "../pages/Signup.tsx";
import SidebarLayout from "../components/sidebar/SidebarLayout.tsx";
import Home from "../pages/Home.tsx";

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
							element: <Home/>
						}
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