import {ProtectedRoute} from "./ProtectedRoute.tsx";
import Login from "../pages/Login.tsx";
import {createBrowserRouter, Navigate, RouteObject, RouterProvider} from "react-router-dom";
import Signup from "../pages/Signup.tsx";
import SidebarLayout from "../components/Sidebar/SidebarLayout.tsx";
import Auth from "./Auth.tsx";
import {Roles} from "../types/roles.ts";
import Logout from "../pages/Logout.tsx";
import Home from "../pages/Home.tsx";
import Classrooms from "../pages/Classrooms.tsx";
import Lessons from "../pages/Lessons.tsx";
import EditLesson from "../pages/EditLesson.tsx";
import useAuth from "../hooks/useAuth.tsx";

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
									element: <Home/>
								},
								{
									path: "/classrooms",
									element: <Classrooms/>,
									children: [
										{
											path: ":classroomId",
											element: <div>Classroom inside</div>
										}
									]
								},
								{
									path: "/logout",
									element: <Logout/>
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
								{
									path: "/classrooms/:classroomId",
									children: [
										{
											path: "lessons",
											element: <Lessons/>,
										},
										{
											path: "lessons/:lessonId/edit",
											element: <EditLesson/>,
										}
									]
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